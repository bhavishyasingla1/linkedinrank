import { NextRequest, NextResponse } from 'next/server'
import { parseLinkedInPDF, PARSER_VERSION, ExtendedProfileData } from '@/lib/pdfParser'

export const maxDuration = 60 // Prevent Vercel timeout on production
import { analyzeProfile } from '@/lib/scoringEngine'
import { enhanceWithAI } from '@/lib/aiSuggestions'
import { computeDeterministicScore, classifyArchetype, SCORING_VERSION } from '@/lib/deterministicScoring'
import { getCachedAnalysis, setCachedAnalysis, getCacheStats, PIPELINE_VERSION } from '@/lib/cache'
import { getRewriteSuggestions, getLLMUsageStats } from '@/lib/aiSuggestionsV2'

// Response type matching exact spec
interface AnalyzeResponse {
    input_hash: string
    score: number
    tier: 'platinum' | 'gold' | 'silver' | 'bronze'
    breakdown: {
        headline: { score: number; max: number; checks: Array<{ name: string; ok: boolean }> }
        about: { score: number; max: number; checks: Array<{ name: string; ok: boolean }> }
        experience: { score: number; max: number; checks: Array<{ name: string; ok: boolean }> }
        skills: { score: number; max: number; checks: Array<{ name: string; ok: boolean }> }
        education: { score: number; max: number; checks: Array<{ name: string; ok: boolean }> }
        completeness: { score: number; max: number }
    }
    fixes: Array<{ section: string; fix: string; impact_pts: number }>
    diagnostics: {
        parse_confidence: number
        missing_fields: string[]
        layout_type: string
    }
    meta: {
        processed_at: string
        pipeline_version: string
        parser_version: string
        scoring_version: string
        cached: boolean
    }
    profile?: any
    archetype?: { label: string; description: string }
    rewrite_suggestions?: any
}

// ============================================================
// RATE LIMITING | in-memory sliding window per IP
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
// ORIGIN VALIDATION | only allow requests from our own domain
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

    // Allow static list
    if (ALLOWED_ORIGINS.some(allowed =>
        origin.startsWith(allowed) || referer.startsWith(allowed)
    )) return true

    // Allow Vercel preview/production deployments
    if (process.env.VERCEL_URL) {
        const vercelOrigin = `https://${process.env.VERCEL_URL}`
        if (origin.startsWith(vercelOrigin) || referer.startsWith(vercelOrigin)) return true
    }

    // Allow any *.vercel.app deployment
    if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return true

    return false
}

// ============================================================
// PDF MAGIC BYTES VALIDATION | verify it's a real PDF
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

        // --- Guard: File size (5MB max | LinkedIn PDFs are tiny) ---
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

        // Debug: log parsed fields to verify extraction
        console.log('[PARSE DEBUG] Name:', profileData.name)
        console.log('[PARSE DEBUG] Headline:', profileData.headline)
        console.log('[PARSE DEBUG] Skills:', profileData.skills)
        console.log('[PARSE DEBUG] Experience count:', profileData.experience?.length)
        console.log('[PARSE DEBUG] Education:', profileData.education)

        // --- Guard: Sanity check parsed data ---
        if (!profileData.name && !profileData.headline && profileData.experience.length === 0) {
            return NextResponse.json(
                { error: 'This does not appear to be a LinkedIn profile PDF. Please export your profile from LinkedIn using "Save to PDF".' },
                { status: 400 }
            )
        }

        // Cast to extended profile data with diagnostics
        const extendedProfile = profileData as ExtendedProfileData
        const inputHash = extendedProfile.canonical?.input_hash || 'unknown'
        
        // Check cache | but only if same pipeline version (invalidate on code changes)
        const cacheKey = `${inputHash}:${PIPELINE_VERSION}:${PARSER_VERSION}:${SCORING_VERSION}`
        const cachedResult = getCachedAnalysis<any>(cacheKey)
        if (cachedResult && cachedResult.profile?.skills) {
            // Return cached result with updated meta
            console.log('[CACHE HIT] Returning cached result for', cacheKey)
            return NextResponse.json({
                success: true,
                data: {
                    ...cachedResult,
                    meta: {
                        ...cachedResult.meta,
                        cached: true,
                        processed_at: new Date().toISOString()
                    }
                }
            })
        }
        
        // PRIMARY: Rule-based analysis (single source of truth for score + tier)
        const analysis = analyzeProfile(profileData)
        
        // Archetype classification (rule-based, no LLM)
        const archetype = classifyArchetype(profileData)

        // Compute tier from the SAME score the UI will display
        const score = analysis.linkedInScore
        const tier = score >= 85 ? 'platinum' : score >= 70 ? 'gold' : score >= 55 ? 'silver' : 'bronze'

        // Build diagnostics
        const diagnostics = {
            parse_confidence: extendedProfile.parse_confidence?.overall || 0.8,
            missing_fields: extendedProfile.diagnostics?.missing_fields || [],
            layout_type: extendedProfile.diagnostics?.layout_type || 'unknown'
        }
        const meta = {
            processed_at: new Date().toISOString(),
            pipeline_version: PIPELINE_VERSION,
            parser_version: PARSER_VERSION,
            scoring_version: SCORING_VERSION,
            cached: false
        }
        
        const profile = {
            name: profileData.name,
            headline: profileData.headline,
            about: profileData.about,
            experience: profileData.experience,
            skills: profileData.skills,
            education: profileData.education,
            certifications: profileData.certifications,
            honors: profileData.honors
        }

        // Build unified response | ONE score, ONE tier, everywhere
        const responseData = {
            // New fields
            input_hash: inputHash,
            score,
            diagnostics,
            meta,
            archetype,
            // Legacy fields used by existing UI components (single source of truth)
            linkedInScore: score,
            tier,
            categoryScores: analysis.categoryScores,
            recommendations: analysis.recommendations,
            improvementPath: analysis.improvementPath,
            peerContext: analysis.peerContext,
            careerStage: analysis.careerStage,
            potentialGain: analysis.potentialGain,
            headlineRewrites: [] as string[],
            aiEnhanced: false,
            profile
        }

        // Cache the result (versioned key to invalidate on code changes)
        setCachedAnalysis(cacheKey, responseData)

        // OPTIONAL: AI enhancement (async, cached, graceful fallback)
        if (genAIAvailable()) {
            try {
                const aiEnhancement = await enhanceWithAI(profileData, {
                    headline: analysis.categoryScores.find(c => c.category === 'Headline')?.percentage || 50,
                    about: analysis.categoryScores.find(c => c.category === 'About')?.percentage || 50,
                    experience: analysis.categoryScores.find(c => c.category === 'Experience')?.percentage || 50,
                    skills: analysis.categoryScores.find(c => c.category === 'Skills')?.percentage || 50,
                }).catch(() => ({ aiEnhanced: false, archetype: null, recommendations: [], headlineRewrites: [] as string[] }))

                if (aiEnhancement.aiEnhanced) {
                    responseData.aiEnhanced = true
                    if (aiEnhancement.headlineRewrites?.length > 0) {
                        responseData.headlineRewrites = aiEnhancement.headlineRewrites
                    }
                    if (aiEnhancement.recommendations?.length > 0) {
                        responseData.recommendations = aiEnhancement.recommendations
                    }
                    if (aiEnhancement.archetype) {
                        responseData.archetype = aiEnhancement.archetype
                    }
                }
            } catch {
                // Graceful fallback | rule-based analysis still works
            }
        }

        // File buffer is automatically garbage collected | zero persistence
        return NextResponse.json({
            success: true,
            data: responseData
        })

    } catch (error: any) {
        console.error('Analysis error:', error?.message || 'Unknown error')
        return NextResponse.json(
            { error: 'An error occurred during analysis. Please try again.' },
            { status: 500 }
        )
    }
}

function genAIAvailable(): boolean {
    return !!process.env.GEMINI_API_KEY
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
