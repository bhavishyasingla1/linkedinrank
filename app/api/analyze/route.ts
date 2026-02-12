import { NextRequest, NextResponse } from 'next/server'
import { parseLinkedInPDF } from '@/lib/pdfParser'
import { analyzeProfile } from '@/lib/scoringEngine'
import { enhanceWithAI } from '@/lib/aiSuggestions'

// ============================================================
// RATE LIMITING — in-memory sliding window per IP
// ============================================================
const RATE_LIMIT_WINDOW_MS = 60 * 1000   // 1 minute window
const RATE_LIMIT_MAX_REQUESTS = 5        // max 5 analyses per minute per IP
const requestLog = new Map<string, number[]>()

// Cleanup stale entries every 5 minutes to prevent memory leak
setInterval(() => {
    const now = Date.now()
    for (const [ip, timestamps] of requestLog.entries()) {
        const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
        if (recent.length === 0) requestLog.delete(ip)
        else requestLog.set(ip, recent)
    }
}, 5 * 60 * 1000)

function isRateLimited(ip: string): boolean {
    const now = Date.now()
    const timestamps = requestLog.get(ip) || []
    const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
    if (recent.length >= RATE_LIMIT_MAX_REQUESTS) return true
    recent.push(now)
    requestLog.set(ip, recent)
    return false
}

// ============================================================
// ORIGIN VALIDATION — only allow requests from our own domain
// ============================================================
const ALLOWED_ORIGINS = [
    'https://linkedinrank.com',
    'https://www.linkedinrank.com',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]

function isAllowedOrigin(request: NextRequest): boolean {
    // In development, allow all origins
    if (process.env.NODE_ENV === 'development') return true
    const origin = request.headers.get('origin') || ''
    const referer = request.headers.get('referer') || ''
    return ALLOWED_ORIGINS.some(allowed =>
        origin.startsWith(allowed) || referer.startsWith(allowed)
    )
}

// ============================================================
// PDF MAGIC BYTES VALIDATION — verify it's a real PDF
// ============================================================
function isValidPDF(buffer: Buffer): boolean {
    // PDF files start with %PDF
    return buffer.length > 4 && buffer.slice(0, 5).toString('ascii').startsWith('%PDF')
}

// ============================================================
// MAIN API HANDLER
// ============================================================
export async function POST(request: NextRequest) {
    const startTime = Date.now()

    // --- Guard: Origin check ---
    if (!isAllowedOrigin(request)) {
        return NextResponse.json(
            { error: 'Unauthorized request origin' },
            { status: 403 }
        )
    }

    // --- Guard: Rate limiting ---
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || request.headers.get('x-real-ip')
        || 'unknown'

    if (isRateLimited(clientIP)) {
        return NextResponse.json(
            { error: 'Too many requests. Please wait a minute before trying again.' },
            { status: 429 }
        )
    }

    try {
        // --- Guard: Parse form data safely ---
        let formData: FormData
        try {
            formData = await request.formData()
        } catch {
            return NextResponse.json(
                { error: 'Invalid request format' },
                { status: 400 }
            )
        }

        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        // --- Guard: File type validation ---
        if (file.type !== 'application/pdf') {
            return NextResponse.json(
                { error: 'Please upload a PDF file' },
                { status: 400 }
            )
        }

        // --- Guard: File size (5MB max — LinkedIn PDFs are tiny) ---
        const MAX_SIZE = 5 * 1024 * 1024
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: 'File too large. Maximum size: 5MB' },
                { status: 400 }
            )
        }

        // --- Guard: Minimum file size (empty/corrupt check) ---
        if (file.size < 100) {
            return NextResponse.json(
                { error: 'File appears to be empty or corrupted' },
                { status: 400 }
            )
        }

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // --- Guard: PDF magic bytes validation ---
        if (!isValidPDF(buffer)) {
            return NextResponse.json(
                { error: 'File is not a valid PDF. Please upload your LinkedIn profile PDF.' },
                { status: 400 }
            )
        }

        // Parse PDF (extract text and structure data)
        let profileData
        try {
            profileData = await parseLinkedInPDF(buffer)
        } catch (error) {
            console.error('PDF parsing failed')
            return NextResponse.json(
                { error: 'Failed to parse LinkedIn PDF. Please ensure this is a valid LinkedIn profile PDF.' },
                { status: 400 }
            )
        }

        // --- Guard: Sanity check parsed data ---
        if (!profileData.name && !profileData.headline && profileData.experience.length === 0) {
            return NextResponse.json(
                { error: 'This does not appear to be a LinkedIn profile PDF. Please export your profile from LinkedIn using "Save to PDF".' },
                { status: 400 }
            )
        }

        // PRIMARY: Rule-based scoring (instant, deterministic)
        const analysis = analyzeProfile(profileData)

        // SECONDARY: AI enhancement (with timeout + graceful fallback)
        const aiStart = Date.now()

        const aiEnhancement = await enhanceWithAI(profileData, {
            headline: analysis.categoryScores.find(c => c.category === 'Headline')?.percentage || 50,
            about: analysis.categoryScores.find(c => c.category === 'About')?.percentage || 50,
            experience: analysis.categoryScores.find(c => c.category === 'Experience')?.percentage || 50,
            skills: analysis.categoryScores.find(c => c.category === 'Skills')?.percentage || 50,
        }).catch(() => {
            // Graceful fallback — rule-based analysis still works perfectly
            return { aiEnhanced: false, archetype: null, recommendations: [], headlineRewrites: [] as string[] }
        })

        const aiDuration = Date.now() - aiStart

        // Merge: prefer AI recommendations if available, else use rule-based
        const finalRecommendations = aiEnhancement.recommendations.length > 0
            ? aiEnhancement.recommendations
            : analysis.recommendations

        const finalArchetype = aiEnhancement.archetype || analysis.archetype

        // File buffer is automatically garbage collected — zero persistence
        return NextResponse.json({
            success: true,
            data: {
                ...analysis,
                profile: {
                    name: profileData.name,
                    headline: profileData.headline,
                    about: profileData.about,
                    experience: profileData.experience,
                    skills: profileData.skills,
                    certifications: profileData.certifications,
                    honors: profileData.honors
                },
                archetype: finalArchetype,
                recommendations: finalRecommendations,
                headlineRewrites: aiEnhancement.headlineRewrites || [],
                aiEnhanced: aiEnhancement.aiEnhanced,
            }
        })

    } catch (error: any) {
        console.error('Analysis error:', error?.message || 'Unknown error')
        return NextResponse.json(
            { error: 'An error occurred during analysis. Please try again.' },
            { status: 500 }
        )
    }
}

// Block all other HTTP methods
export async function GET() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
export async function PUT() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
export async function DELETE() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
