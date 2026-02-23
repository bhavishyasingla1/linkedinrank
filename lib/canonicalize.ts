// Use Node.js crypto module for server-side hashing
// This file should only be imported in server-side code (API routes)

/**
 * CANONICALIZATION MODULE
 * 
 * Produces deterministic canonical_text and input_hash from extracted profile data.
 * Same input → identical hash across browsers/sessions.
 */

export interface CanonicalProfile {
    headline: string
    about: string
    experiences: CanonicalExperience[]
    skills: string[]
    education: string[]
    certifications: string[]
}

export interface CanonicalExperience {
    title: string
    company: string
    duration: string
    description: string
}

export interface CanonicalResult {
    canonical_text: string
    input_hash: string
    display_data: CanonicalProfile
}

/**
 * Normalize Unicode to NFC form
 */
function normalizeUnicode(text: string): string {
    return text.normalize('NFC')
}

/**
 * Remove control characters and collapse whitespace
 */
function cleanWhitespace(text: string): string {
    // Remove control chars except newlines
    let cleaned = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Collapse multiple spaces/tabs to single space
    cleaned = cleaned.replace(/[ \t]+/g, ' ')
    // Collapse multiple newlines to single newline
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n')
    return cleaned.trim()
}

/**
 * Normalize dates to YYYY[-MM] format
 */
function normalizeDate(dateStr: string): string {
    if (!dateStr) return ''
    
    const months: { [key: string]: string } = {
        'january': '01', 'jan': '01',
        'february': '02', 'feb': '02',
        'march': '03', 'mar': '03',
        'april': '04', 'apr': '04',
        'may': '05',
        'june': '06', 'jun': '06',
        'july': '07', 'jul': '07',
        'august': '08', 'aug': '08',
        'september': '09', 'sep': '09', 'sept': '09',
        'october': '10', 'oct': '10',
        'november': '11', 'nov': '11',
        'december': '12', 'dec': '12'
    }
    
    let normalized = dateStr.toLowerCase().trim()
    
    // Match patterns like "January 2020", "Jan 2020", "2020"
    const monthYearMatch = normalized.match(/([a-z]+)\s*(\d{4})/i)
    if (monthYearMatch) {
        const monthNum = months[monthYearMatch[1].toLowerCase()]
        const year = monthYearMatch[2]
        if (monthNum) {
            return `${year}-${monthNum}`
        }
        return year
    }
    
    // Match just year
    const yearMatch = normalized.match(/\b(\d{4})\b/)
    if (yearMatch) {
        return yearMatch[1]
    }
    
    // Handle "Present"
    if (normalized.includes('present')) {
        return 'present'
    }
    
    return normalized
}

/**
 * Normalize duration string for canonical representation
 */
function normalizeDuration(duration: string): string {
    if (!duration) return ''
    
    // Extract date range parts
    const parts = duration.split(/\s*[-–|]\s*/)
    if (parts.length === 2) {
        const start = normalizeDate(parts[0])
        const end = normalizeDate(parts[1])
        return `${start} - ${end}`
    }
    
    return normalizeDate(duration)
}

/**
 * Canonicalize a single text field
 */
function canonicalizeText(text: string): string {
    if (!text) return ''
    let result = normalizeUnicode(text)
    result = cleanWhitespace(result)
    return result
}

/**
 * Canonicalize text for hashing (lowercase)
 */
function canonicalizeForHash(text: string): string {
    return canonicalizeText(text).toLowerCase()
}

/**
 * Build canonical JSON with sorted keys
 */
function buildCanonicalJSON(profile: CanonicalProfile): string {
    const sortedProfile = {
        about: canonicalizeForHash(profile.about),
        certifications: profile.certifications
            .map(c => canonicalizeForHash(c))
            .sort(),
        education: profile.education
            .map(e => canonicalizeForHash(e))
            .sort(),
        experiences: profile.experiences
            .map(exp => ({
                company: canonicalizeForHash(exp.company),
                description: canonicalizeForHash(exp.description),
                duration: normalizeDuration(exp.duration),
                title: canonicalizeForHash(exp.title)
            }))
            .sort((a, b) => {
                // Sort by company, then title
                const compCompare = a.company.localeCompare(b.company)
                if (compCompare !== 0) return compCompare
                return a.title.localeCompare(b.title)
            }),
        headline: canonicalizeForHash(profile.headline),
        skills: profile.skills
            .map(s => canonicalizeForHash(s))
            .sort()
    }
    
    return JSON.stringify(sortedProfile, Object.keys(sortedProfile).sort())
}

/**
 * Compute SHA-256 hash of canonical text
 * Uses Node.js crypto module (server-side only)
 */
function computeHash(canonicalText: string): string {
    // Dynamic import for Node.js crypto - works in Next.js API routes
    const cryptoModule = eval('require')('crypto') as { createHash: (algo: string) => { update: (data: string, enc: string) => { digest: (fmt: string) => string } } }
    return cryptoModule.createHash('sha256').update(canonicalText, 'utf8').digest('hex')
}

/**
 * Main canonicalization function
 * Takes raw profile data and produces deterministic canonical_text + input_hash
 */
export function canonicalizeProfile(profile: {
    headline?: string
    about?: string
    experience?: Array<{
        title?: string
        company?: string
        duration?: string
        description?: string
    }>
    skills?: string[]
    education?: string[]
    certifications?: string[]
}): CanonicalResult {
    // Build canonical profile with display (non-lowercased) data
    const displayData: CanonicalProfile = {
        headline: canonicalizeText(profile.headline || ''),
        about: canonicalizeText(profile.about || ''),
        experiences: (profile.experience || []).map(exp => ({
            title: canonicalizeText(exp.title || ''),
            company: canonicalizeText(exp.company || ''),
            duration: normalizeDuration(exp.duration || ''),
            description: canonicalizeText(exp.description || '')
        })),
        skills: (profile.skills || []).map(s => canonicalizeText(s)),
        education: (profile.education || []).map(e => canonicalizeText(e)),
        certifications: (profile.certifications || []).map(c => canonicalizeText(c))
    }
    
    // Build canonical JSON for hashing
    const canonicalText = buildCanonicalJSON(displayData)
    
    // Compute hash
    const inputHash = computeHash(canonicalText)
    
    return {
        canonical_text: canonicalText,
        input_hash: inputHash,
        display_data: displayData
    }
}

/**
 * Generate a short hash for display purposes
 */
export function shortHash(hash: string): string {
    return hash.substring(0, 12)
}
