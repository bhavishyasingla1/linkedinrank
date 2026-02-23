import pdf from 'pdf-parse'
import { ProfileData, ExperienceItem } from './types'
import { canonicalizeProfile, CanonicalResult } from './canonicalize'

/**
 * PIPELINE VERSION - increment on any parsing logic change
 */
export const PARSER_VERSION = 'v2.5.0'

/**
 * Parse confidence levels for diagnostics
 */
export interface ParseConfidence {
    overall: number
    headline: number
    about: number
    experience: number
    skills: number
    education: number
    certifications: number
}

/**
 * Extended profile data with diagnostics
 */
export interface ExtendedProfileData extends ProfileData {
    parse_confidence: ParseConfidence
    diagnostics: {
        missing_fields: string[]
        layout_type: 'single_column' | 'two_column' | 'unknown'
        extraction_warnings: string[]
    }
    canonical: CanonicalResult
}

/**
 * Layout detection result
 */
interface LayoutAnalysis {
    type: 'single_column' | 'two_column' | 'unknown'
    leftColumnEnd?: number
    rightColumnStart?: number
    confidence: number
}

/**
 * Parse LinkedIn PDF and extract structured profile data with layout awareness
 * Returns extended profile data with confidence scores and diagnostics
 */
export async function parseLinkedInPDF(buffer: Buffer): Promise<ExtendedProfileData> {
    try {
        // Parse PDF to text
        const data = await pdf(buffer)
        const text = data.text
        
        // Analyze layout to handle two-column LinkedIn PDFs
        const layout = analyzeLayout(text)
        
        // Reconstruct text in proper reading order if two-column
        const processedText = layout.type === 'two_column' 
            ? reconstructTwoColumnText(text, layout)
            : text

        // Extract structured data with confidence tracking
        // For name: try reconstructed text first, fall back to raw text
        let nameResult = extractNameWithConfidence(processedText)
        if (nameResult.value === 'LinkedIn User' && layout.type === 'two_column') {
            const rawNameResult = extractNameWithConfidence(text)
            if (rawNameResult.value !== 'LinkedIn User') {
                nameResult = rawNameResult
            }
        }

        const extractionResults = {
            name: nameResult,
            headline: extractHeadlineWithConfidence(processedText),
            about: extractAboutWithConfidence(processedText),
            experience: extractExperienceWithConfidence(processedText),
            skills: extractSkillsWithConfidence(processedText),
            education: extractEducationWithConfidence(processedText),
            certifications: extractCertificationsWithConfidence(processedText),
            honors: extractHonorsWithConfidence(processedText),
            recommendations: countRecommendations(processedText)
        }
        
        // Build confidence scores
        const parse_confidence: ParseConfidence = {
            headline: extractionResults.headline.confidence,
            about: extractionResults.about.confidence,
            experience: extractionResults.experience.confidence,
            skills: extractionResults.skills.confidence,
            education: extractionResults.education.confidence,
            certifications: extractionResults.certifications.confidence,
            overall: calculateOverallConfidence(extractionResults)
        }
        
        // Identify missing fields
        const missing_fields: string[] = []
        if (!extractionResults.headline.value) missing_fields.push('headline')
        if (!extractionResults.about.value) missing_fields.push('about')
        if (extractionResults.experience.value.length === 0) missing_fields.push('experience')
        if (extractionResults.skills.value.length === 0) missing_fields.push('skills')
        if (extractionResults.education.value.length === 0) missing_fields.push('education')
        
        // Collect extraction warnings
        const extraction_warnings: string[] = []
        if (layout.confidence < 0.7) {
            extraction_warnings.push('Layout detection uncertain - extraction may be incomplete')
        }
        if (parse_confidence.overall < 0.8) {
            extraction_warnings.push('Some fields may have parsing issues')
        }
        
        // Build profile data
        const profileData: ProfileData = {
            name: extractionResults.name.value,
            headline: extractionResults.headline.value,
            about: extractionResults.about.value,
            experience: extractionResults.experience.value,
            skills: extractionResults.skills.value,
            recommendations: extractionResults.recommendations,
            education: extractionResults.education.value,
            certifications: extractionResults.certifications.value,
            honors: extractionResults.honors.value
        }
        
        // Canonicalize for deterministic hashing
        const canonical = canonicalizeProfile(profileData)

        return {
            ...profileData,
            parse_confidence,
            diagnostics: {
                missing_fields,
                layout_type: layout.type,
                extraction_warnings
            },
            canonical
        }
    } catch (error) {
        throw new Error('Failed to parse PDF. Please ensure this is a valid LinkedIn profile PDF.')
    }
}

/**
 * Legacy function for backward compatibility
 */
export async function parseLinkedInPDFLegacy(buffer: Buffer): Promise<ProfileData> {
    const extended = await parseLinkedInPDF(buffer)
    return {
        name: extended.name,
        headline: extended.headline,
        about: extended.about,
        experience: extended.experience,
        skills: extended.skills,
        recommendations: extended.recommendations,
        education: extended.education,
        certifications: extended.certifications,
        honors: extended.honors
    }
}

/**
 * Analyze PDF text to detect layout type (single vs two-column)
 */
function analyzeLayout(text: string): LayoutAnalysis {
    const lines = text.split('\n')
    
    // LinkedIn two-column indicators:
    // - Sidebar sections: Contact, Top Skills, Languages, Certifications appear early
    // - Main content: Name, Headline, Summary, Experience appear after sidebar
    const sidebarHeaders = ['Contact', 'Top Skills', 'Languages', 'Certifications', 'Honors-Awards']
    const mainHeaders = ['Summary', 'Experience', 'Education', 'About']
    
    let sidebarFound = 0
    let mainFound = 0
    let sidebarBeforeMain = false
    let firstSidebarIndex = -1
    let firstMainIndex = -1
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        if (sidebarHeaders.some(h => line === h || line.startsWith(h))) {
            sidebarFound++
            if (firstSidebarIndex === -1) firstSidebarIndex = i
        }
        if (mainHeaders.some(h => line === h || line.startsWith(h))) {
            mainFound++
            if (firstMainIndex === -1) firstMainIndex = i
        }
    }
    
    // Two-column if sidebar headers appear before main headers
    if (firstSidebarIndex !== -1 && firstMainIndex !== -1) {
        sidebarBeforeMain = firstSidebarIndex < firstMainIndex
    }
    
    const isTwoColumn = sidebarFound >= 2 && sidebarBeforeMain
    const confidence = isTwoColumn ? Math.min(0.95, 0.5 + (sidebarFound * 0.15)) : 0.8
    
    return {
        type: isTwoColumn ? 'two_column' : 'single_column',
        confidence
    }
}

/**
 * Reconstruct text from two-column layout in proper reading order
 * 
 * LinkedIn PDF text stream (verified from real PDFs):
 *   LEFT SIDEBAR: Contact, Top Skills, Languages, Certifications, Honors-Awards
 *   RIGHT MAIN: Name, Headline, Location, Summary, Experience, Education
 * 
 * pdf-parse outputs: ALL sidebar first, THEN all main content.
 * The split point is: everything before the person's name = sidebar.
 * 
 * Strategy: Find the first main section header (Summary/About/Experience),
 * then work backwards to find the name+headline block. Everything before
 * that block is sidebar.
 */
function reconstructTwoColumnText(text: string, layout: LayoutAnalysis): string {
    const lines = text.split('\n')
    
    const mainSectionHeaders = /^(Summary|About|Experience|Education)$/i
    
    // Step 1: Find the first main section header index
    let firstMainIdx = -1
    for (let i = 0; i < lines.length; i++) {
        if (mainSectionHeaders.test(lines[i].trim())) {
            firstMainIdx = i
            break
        }
    }
    
    if (firstMainIdx < 0) {
        // No main section found | can't reconstruct, return as-is
        return text
    }
    
    // Step 2: Work backwards from the first main section header to find
    // the name line. The structure before a main section is always:
    //   [Name]                 ← 2-4 capitalized words, short, no special chars
    //   [Headline | 1-3 lines] ← may have |, role keywords, longer text
    //   [Location]             ← city, state/country with comma
    //   [Summary/About/Experience]
    
    // Helper: does this line look like a person's name?
    const isNameLine = (line: string): boolean => {
        if (!line || line.length < 3 || line.length > 60) return false
        if (!/^[A-Z]/.test(line)) return false
        if (/\d/.test(line)) return false
        if (line.includes('|') || line.includes('@')) return false
        // Allow dots only in credential suffixes like "Jr." or degree abbrevs
        // But reject URLs
        if (line.includes('http') || line.includes('www.') || line.includes('.com') || line.includes('.org')) return false
        // Allow commas for credential suffixes: "Philippa Burgess, MA, MS", "John Smith, PhD"
        // But reject location patterns: "City, Country" where post-comma part is long
        if (/,\s*[A-Z]/.test(line)) {
            // Allow if all comma-separated parts after the first are short credential abbrevs (<=5 chars each)
            const parts = line.split(',')
            const suffixes = parts.slice(1).map(s => s.trim())
            const allCredentials = suffixes.every(s => s.length <= 6 && /^[A-Z]/.test(s))
            if (!allCredentials) return false
        }
        // Strip credential suffixes for word count check
        const nameCore = line.split(',')[0].trim()
        const words = nameCore.split(/\s+/)
        if (words.length < 2 || words.length > 5) return false
        // Skip bullet/org lines with special chars
        if (line.includes('•') || line.includes('★') || line.includes('☁')) return false
        // Skip role/headline keywords
        if (/(engineer|developer|manager|analyst|consultant|director|lead|specialist|founder|architect|designer|intern|student|professor|researcher|head\s+of|vp|chief|ceo|cto|host|ambassador|adoption|digital|growth|marketing|product|senior|junior|principal)/i.test(line)) return false
        // Skip company names
        if (/\b(LLC|Inc|Corp|Ltd|LLP|GmbH|Pvt|PLC|Co\b|Systems|Solutions|Technologies|Consulting|Consultants|Group|Partners|Services|Associates|Enterprises|Ventures|Labs|Studio|Agency|Foundation|Institute|Academy|Network|Media|Digital|Global|International)\b/i.test(line)) return false
        // Skip location names
        if (/\b(Metropolitan|Area|City|County|District|Province|Region|Township|Borough|Greater|Municipality)\b/i.test(line)) return false
        if (/\b(New York|Los Angeles|San Francisco|San Diego|San Jose|Las Vegas|New Delhi|New Jersey|United States|United Kingdom|South Africa|North Carolina|South Carolina)\b/i.test(line)) return false
        return true
    }
    
    // Scan backwards from the main section header to find the name line
    let nameLineIdx = -1
    for (let j = firstMainIdx - 1; j >= Math.max(0, firstMainIdx - 15); j--) {
        const line = lines[j].trim()
        if (!line) continue
        if (isNameLine(line)) {
            nameLineIdx = j
            break
        }
    }
    
    // Fallback: if no name found, use the first main section header as split point
    if (nameLineIdx < 0) {
        nameLineIdx = firstMainIdx
    }
    
    // Step 3: Split | everything before nameLineIdx is sidebar
    const sidebarLines = lines.slice(0, nameLineIdx)
    const mainLines = lines.slice(nameLineIdx)
    
    // Return main content first (name, headline, location, sections), then sidebar
    return [...mainLines, '\n--- SIDEBAR ---\n', ...sidebarLines].join('\n')
}

/**
 * Calculate overall confidence from individual field confidences
 */
function calculateOverallConfidence(results: any): number {
    const weights = {
        headline: 0.2,
        about: 0.15,
        experience: 0.3,
        skills: 0.15,
        education: 0.1,
        certifications: 0.1
    }
    
    let weightedSum = 0
    let totalWeight = 0
    
    if (results.headline.value) {
        weightedSum += results.headline.confidence * weights.headline
        totalWeight += weights.headline
    }
    if (results.about.value) {
        weightedSum += results.about.confidence * weights.about
        totalWeight += weights.about
    }
    if (results.experience.value.length > 0) {
        weightedSum += results.experience.confidence * weights.experience
        totalWeight += weights.experience
    }
    if (results.skills.value.length > 0) {
        weightedSum += results.skills.confidence * weights.skills
        totalWeight += weights.skills
    }
    if (results.education.value.length > 0) {
        weightedSum += results.education.confidence * weights.education
        totalWeight += weights.education
    }
    if (results.certifications.value.length > 0) {
        weightedSum += results.certifications.confidence * weights.certifications
        totalWeight += weights.certifications
    }
    
    return totalWeight > 0 ? weightedSum / totalWeight : 0.5
}

// ============================================================
// EXTRACTION FUNCTIONS WITH CONFIDENCE SCORING
// ============================================================

interface ExtractionResult<T> {
    value: T
    confidence: number
}

function extractNameWithConfidence(text: string): ExtractionResult<string> {
    let name = extractName(text)
    // Strip credential suffixes: "Philippa Burgess, MA, MS" → "Philippa Burgess"
    if (name && name.includes(',')) {
        const parts = name.split(',')
        const suffixes = parts.slice(1).map(s => s.trim())
        const allCredentials = suffixes.every(s => s.length <= 6 && /^[A-Z]/.test(s))
        if (allCredentials) {
            name = parts[0].trim()
        }
    }
    const confidence = name && name !== 'LinkedIn User' ? 0.9 : 0.3
    return { value: name, confidence }
}

function extractHeadlineWithConfidence(text: string): ExtractionResult<string> {
    const headline = extractHeadline(text)
    let confidence = 0.5
    
    if (headline) {
        // Higher confidence if headline has expected patterns
        if (headline.includes('|') || headline.includes(' at ')) {
            confidence = 0.95
        } else if (headline.length > 20 && headline.length < 200) {
            confidence = 0.85
        } else if (headline.length >= 10) {
            confidence = 0.7
        }
    } else {
        confidence = 0
    }
    
    return { value: headline, confidence }
}

function extractAboutWithConfidence(text: string): ExtractionResult<string> {
    const about = extractAbout(text)
    let confidence = 0.5
    
    if (about) {
        if (about.length > 200) {
            confidence = 0.95
        } else if (about.length > 100) {
            confidence = 0.85
        } else if (about.length > 50) {
            confidence = 0.7
        }
    } else {
        confidence = 0
    }
    
    return { value: about, confidence }
}

function extractExperienceWithConfidence(text: string): ExtractionResult<ExperienceItem[]> {
    const experience = extractExperience(text)
    let confidence = 0.5
    
    if (experience.length > 0) {
        // Check quality of extracted experiences
        const hasCompanies = experience.filter(e => e.company).length
        const hasTitles = experience.filter(e => e.title).length
        const hasDescriptions = experience.filter(e => e.description && e.description.length > 20).length
        
        const qualityScore = (hasCompanies + hasTitles + hasDescriptions) / (experience.length * 3)
        confidence = 0.5 + (qualityScore * 0.45)
    } else {
        confidence = 0
    }
    
    return { value: experience, confidence }
}

function extractSkillsWithConfidence(text: string): ExtractionResult<string[]> {
    const skills = extractSkills(text)
    let confidence = 0.5
    
    if (skills.length >= 5) {
        confidence = 0.95
    } else if (skills.length >= 3) {
        confidence = 0.85
    } else if (skills.length >= 1) {
        confidence = 0.7
    } else {
        confidence = 0
    }
    
    return { value: skills, confidence }
}

function extractEducationWithConfidence(text: string): ExtractionResult<string[]> {
    const education = extractEducation(text)
    let confidence = 0.5
    
    if (education.length > 0) {
        // Check if education entries look valid
        const hasInstitution = education.some(e => 
            /university|college|institute|school/i.test(e)
        )
        confidence = hasInstitution ? 0.9 : 0.7
    } else {
        confidence = 0
    }
    
    return { value: education, confidence }
}

function extractCertificationsWithConfidence(text: string): ExtractionResult<string[]> {
    const certifications = extractCertifications(text)
    const confidence = certifications.length > 0 ? 0.85 : 0
    return { value: certifications, confidence }
}

function extractHonorsWithConfidence(text: string): ExtractionResult<string[]> {
    const honors = extractHonors(text)
    const confidence = honors.length > 0 ? 0.85 : 0
    return { value: honors, confidence }
}

// Extract name from LinkedIn PDF
// NOTE: LinkedIn PDFs have two-column layout - sidebar (Contact, Skills) appears 
// BEFORE main content (Name, Headline) in the text stream
function extractName(text: string): string {
    const lines = text.split('\n').filter(line => line.trim().length > 0)

    // LinkedIn section headers that appear in sidebar AND main content
    const sidebarHeaders = /^(Contact|Top Skills?|Skills?|Languages?|Certifications?|Honors-Awards|Honors?|Awards?|Publications?|Patents?|www\.|http)/i
    const mainHeaders = /^(Summary|About|Experience|Education)/i

    // Helper: Check if text looks like a skill rather than a name
    const isSkillNotName = (t: string): boolean => {
        if (/\([A-Z]+\)$/.test(t)) return true
        const skillKeywords = [
            'intelligence', 'development', 'management', 'engineering', 'analytics',
            'marketing', 'communication', 'learning', 'computing', 'design',
            'programming', 'analysis', 'strategy', 'leadership', 'sales',
            'science', 'security', 'architecture', 'database', 'cloud',
            'artificial', 'machine', 'product', 'project', 'business'
        ]
        const lower = t.toLowerCase()
        if (skillKeywords.some(kw => lower === kw || (lower.split(/\s+/).length <= 2 && lower.includes(kw)))) return true
        return false
    }

    // Helper: Check if a line looks like a valid person's name
    const isValidName = (candidate: string): boolean => {
        if (!candidate) return false
        if (sidebarHeaders.test(candidate) || mainHeaders.test(candidate)) return false
        if (candidate.includes('@') || candidate.includes('http') ||
            candidate.includes('linkedin.com')) return false
        if (/^\+?\d[\d\s\-()]+$/.test(candidate) || /^\d+$/.test(candidate)) return false
        if (isSkillNotName(candidate)) return false
        if (!/^[A-Z]/.test(candidate)) return false
        if (/\d/.test(candidate)) return false
        if (candidate.length < 3 || candidate.length > 60) return false
        // Strip credential suffixes for word count: "Philippa Burgess, MA, MS" → "Philippa Burgess"
        const nameCore = candidate.split(',')[0].trim()
        const words = nameCore.split(/\s+/)
        if (words.length < 1 || words.length > 5) return false
        // Skip if contains pipe (headline)
        if (candidate.includes('|')) return false
        // Skip bullet/org lines with special chars
        if (candidate.includes('•') || candidate.includes('★') || candidate.includes('☁')) return false
        // Allow commas for credential suffixes: "Philippa Burgess, MA, MS"
        if (/,\s*[A-Z]/.test(candidate)) {
            const parts = candidate.split(',')
            const suffixes = parts.slice(1).map(s => s.trim())
            const allCredentials = suffixes.every(s => s.length <= 6 && /^[A-Z]/.test(s))
            if (!allCredentials) return false
        }
        // Skip company names (LLC, Inc, Corp, Ltd, etc.)
        if (/\b(LLC|Inc|Corp|Ltd|LLP|GmbH|Pvt|PLC|Co\b|S\.?A\.?|Systems|Solutions|Technologies|Consulting|Consultants|Group|Partners|Services|Associates|Enterprises|Ventures|Labs|Studio|Agency|Foundation|Institute|Academy|Network|Media|Digital|Global|International)\b/i.test(candidate)) return false
        // Skip location names
        if (/\b(Metropolitan|Area|City|County|District|Province|Region|Township|Borough|Greater|Municipality)\b/i.test(candidate)) return false
        // Skip well-known location patterns
        if (/\b(New York|Los Angeles|San Francisco|San Diego|San Jose|San Antonio|Las Vegas|New Delhi|New Jersey|New Zealand|United States|United Kingdom|South Africa|North Carolina|South Carolina|West Bengal|East London)\b/i.test(candidate)) return false
        // Skip if it looks like a role/headline (too many words or has role keywords)
        if (/(engineer|developer|manager|analyst|consultant|director|lead|specialist|founder|intern|student|professor|architect|head\s+of)/i.test(candidate)) return false
        return true
    }

    // Strategy 0: LinkedIn PDFs always start with the person's name as the very first line
    // In TWO-COLUMN PDFs, sidebar comes first. So the first non-sidebar line IS the name.
    // But in the RECONSTRUCTED text, name should appear at the top of main content.
    const firstLine = lines[0]?.trim()
    if (firstLine && isValidName(firstLine)) {
        // Verify it's not a sidebar header by checking if line 1/2 looks like sidebar content
        const secondLine = lines[1]?.trim() || ''
        const isSidebarStart = sidebarHeaders.test(secondLine) || 
            /^(Contact|Top Skills)$/i.test(secondLine) ||
            /\S+@\S+\.\S+/.test(secondLine)
        if (!isSidebarStart) {
            return firstLine
        }
    }

    // Strategy 1: Find headline (contains '|' or role keywords) and take line before it
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        const hasRoleKeywords = /(engineer|developer|manager|analyst|consultant|director|lead|specialist|founder|architect|head\s+of|vp|chief|ceo|cto)/i.test(line)
        const hasPipe = line.includes('|')
        if ((hasPipe && line.length > 15) || (hasRoleKeywords && line.length > 20)) {
            const candidate = lines[i - 1].trim()
            if (isValidName(candidate)) {
                return candidate
            }
        }
    }

    // Strategy 2: Look backwards from "Summary" or "About" or "Experience" section
    for (let i = 0; i < lines.length; i++) {
        if (mainHeaders.test(lines[i].trim())) {
            // Walk backwards, skip location, find name
            for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
                const candidate = lines[j].trim()
                // Skip location lines
                if (/,\s*[A-Z]/.test(candidate)) continue
                // Skip empty-ish lines
                if (candidate.length < 3) continue
                // Skip headline-like lines
                if (candidate.includes('|') || /(engineer|developer|manager|analyst|consultant|director|lead|specialist|founder)/i.test(candidate)) continue
                if (isValidName(candidate)) {
                    return candidate
                }
            }
        }
    }

    // Strategy 3: Find name after last sidebar section header
    let lastSidebarIdx = -1
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        if (/^(Contact|Top Skills?|Languages?|Certifications?|Honors-Awards|Honors?|Awards?|Publications?|Patents?)$/i.test(line)) {
            lastSidebarIdx = i
        }
    }
    if (lastSidebarIdx >= 0) {
        // Scan forward from end of sidebar for first valid name
        for (let i = lastSidebarIdx + 1; i < Math.min(lastSidebarIdx + 20, lines.length); i++) {
            const candidate = lines[i].trim()
            // Skip sidebar content (skills, contact info, etc.)
            if (candidate.includes('@') || candidate.includes('.com') || candidate.includes('.org')) continue
            if (/^\+?\d/.test(candidate)) continue
            if (candidate.length < 3) continue
            if (isSkillNotName(candidate)) continue
            if (isValidName(candidate)) {
                return candidate
            }
        }
    }

    // Strategy 4: Simple scan for first name-like line (excluding obvious non-names)
    for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed.length < 3) continue
        if (sidebarHeaders.test(trimmed)) continue
        if (trimmed.includes('@') || trimmed.includes('.com') || trimmed.includes('http')) continue
        if (/^\+?\d/.test(trimmed)) continue
        if (/\(.*proficiency\)/i.test(trimmed)) continue
        if (isSkillNotName(trimmed)) continue
        if (isValidName(trimmed)) {
            return trimmed
        }
    }

    return 'LinkedIn User'
}

// Extract headline
function extractHeadline(text: string): string {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0)

    // LinkedIn PDFs have two-column layout:
    // LEFT SIDEBAR: Contact, Top Skills, Languages, Certifications, Honors-Awards
    // RIGHT MAIN: Name, Headline, Location, Summary, Experience, Education
    // Sidebar content appears BEFORE main content in text stream!

    // Helper: detect sidebar/noise lines
    const isSidebarOrNoise = (line: string): boolean => {
        if (line.match(/^(Contact|Top Skills?|Languages?|Certifications?|Honors|Awards|Honors-Awards|Publications?|Patents?)/i)) return true
        if (line.match(/\S+@\S+\.\S+/) || line.includes('linkedin.com') || line.match(/^https?:\/\//)) return true
        if (line.match(/^\+?\d[\d\s\-()]{5,}/) || line.match(/^\d{10}/)) return true
        if (line.includes('(Mobile)') || line.includes('(LinkedIn)') || line.includes('(Work)')) return true
        if (line.match(/\((Native|Bilingual|Professional|Limited|Elementary)\s*(or\s*)?(Native|Bilingual|Professional|Limited|Elementary)?\s*\w*\s*proficiency\)/i)) return true
        if (line.match(/\((Native|Bilingual|Professional|Limited|Elementary)\)/)) return true
        if (line.match(/\.(org|com|edu|io)\b/i)) return true
        if (line.match(/^(Program|Certificate|Certification|Course|Foundation)\b/i)) return true
        if (line.includes('by Microsoft') || line.includes('by LinkedIn') || line.includes('by Google')) return true
        if (line.match(/^(Top \d+|Winner|Award|Prize)/i)) return true
        return false
    }

    // Helper: detect location lines
    const isLocation = (line: string): boolean => {
        if (line.match(/,\s*(India|USA|US|UK|Canada|Australia|Germany|France|Singapore|UAE|China|Japan|Brazil|United States|United Kingdom|Netherlands|Spain|Italy|Ireland|Sweden|Norway|Denmark|Switzerland|Austria|Belgium|Poland|Czech|Portugal|Mexico|Argentina|Colombia|Chile|Peru|Indonesia|Malaysia|Thailand|Philippines|Vietnam|South Korea|Taiwan|New Zealand|South Africa|Nigeria|Kenya|Egypt|Israel|Turkey|Saudi Arabia|Qatar|Bahrain|Kuwait|Oman)/i)) return true
        if (line.match(/,\s*[A-Z][a-z]+(\s+[A-Z][a-z]+)?$/)) return true
        if (line.match(/^(Greater|Area|Metropolitan)\s/i)) return true
        if (line.match(/\b(Metropolitan)\s+(Area|Region)/i)) return true
        if (line.match(/,\s*(Haryana|Punjab|Maharashtra|Karnataka|Tamil Nadu|Telangana|Gujarat|Rajasthan|Uttar Pradesh|West Bengal|Madhya Pradesh|Bihar|Odisha|Kerala|Andhra Pradesh|Chhattisgarh|Jharkhand|Assam|Himachal Pradesh|Uttarakhand|Goa|Chandigarh|Delhi|NCR)/i)) return true
        if (line.match(/district/i)) return true
        // Catch standalone location patterns: "City Area", "City Metropolitan Area"
        if (line.length < 60 && /\b(Area|Metro|Region)$/i.test(line)) return true
        return false
    }

    // Helper: check if a line looks like a headline (descriptive professional text)
    const isHeadlineLike = (line: string): boolean => {
        if (line.length < 5 || line.length > 300) return false
        if (isSidebarOrNoise(line)) return false
        if (line.match(/^(Summary|Experience|Education|Publications?|Patents?|Page\s+\d)/i)) return false
        if (isLocation(line)) return false
        // Reject certification/award/course names
        if (/\b(certificate|certification|certified|course|diploma|badge|award|honor|prize|scholarship|licence|license)\b/i.test(line)) return false
        // Reject lines that are primarily a year + title (award pattern: "Codeavour 2022", "Dean's List 2021")
        if (/^[A-Z][\w\s]+\d{4}/.test(line) && line.length < 50) return false
        if (/\d{4}\s*[-–]\s*(\d{4}|present)/i.test(line)) return false
        const hasRoleKeywords = line.match(/(engineer|developer|designer|manager|analyst|consultant|intern|student|founder|director|lead|specialist|associate|executive|professor|researcher|scientist|architect|coordinator|officer|head\s+of|vp\s+of|chief|ceo|cto|cfo|coo|president|partner|advisor|freelanc|entrepreneur|creator|editor|writer|coach|trainer|mentor|advocate|volunteer|fellow|scholar|assistant|nurse|doctor|attorney|lawyer|accountant|marketer|strategist|producer|host)/i)
        const hasPipeSeparator = line.includes('|')
        const hasAtSymbol = line.includes(' at ') || line.includes(' @ ')
        const hasAtCompany = line.match(/\bat\s+[A-Z]/i)
        // Require actual headline signals | not just "any text"
        return !!(hasRoleKeywords || hasPipeSeparator || hasAtSymbol || hasAtCompany)
    }

    // Helper: check if line looks like a person's name
    const isNameLike = (line: string): boolean => {
        const words = line.split(/\s+/)
        if (words.length < 2 || words.length > 4) return false
        if (!/^[A-Z][a-z]/.test(line)) return false
        if (/\d/.test(line)) return false
        if (line.includes(',') || line.includes('|') || line.includes('@')) return false
        if (line.length < 5 || line.length > 50) return false
        if (isSidebarOrNoise(line)) return false
        return true
    }

    // Helper: check if line is a skill (short, single concept)
    const isSkillLine = (line: string): boolean => {
        if (line.length > 40) return false
        if (/\([A-Z]+\)$/.test(line)) return true
        const skillKeywords = ['intelligence', 'development', 'management', 'engineering', 'analytics',
            'marketing', 'communication', 'learning', 'computing', 'programming', 'analysis']
        const lower = line.toLowerCase()
        if (line.split(/\s+/).length <= 2 && skillKeywords.some(kw => lower.includes(kw))) return true
        return false
    }

    // ---- STRATEGY 1: Find name, then grab headline after it ----
    const name = extractName(text)
    if (name && name !== 'LinkedIn User') {
        // Use fuzzy matching | find last occurrence of name (main content, not sidebar)
        let lastNameIndex = -1
        const nameLower = name.toLowerCase()
        for (let i = 0; i < lines.length; i++) {
            const lineLower = lines[i].toLowerCase().trim()
            if (lineLower === nameLower || lines[i].trim() === name) {
                lastNameIndex = i
            }
        }
        // Also try partial match if exact fails
        if (lastNameIndex < 0) {
            for (let i = lines.length - 1; i >= 0; i--) {
                if (lines[i].includes(name) || name.includes(lines[i].trim())) {
                    if (isNameLike(lines[i])) {
                        lastNameIndex = i
                        break
                    }
                }
            }
        }
        if (lastNameIndex >= 0) {
            const headlineParts: string[] = []
            // LinkedIn PDF structure is STRICT: Name → Headline → Location → Summary → Experience
            // Whatever comes right after name and before location/section IS the headline.
            // We trust position, not content | headlines can be anything.
            let hitLocation = false
            for (let j = lastNameIndex + 1; j <= Math.min(lastNameIndex + 8, lines.length - 1); j++) {
                const candidate = lines[j]
                if (isSidebarOrNoise(candidate)) break
                if (candidate.match(/^(Summary|Experience|Education|Publications?|Patents?|Page\s+\d)/i)) break
                if (isLocation(candidate)) {
                    hitLocation = true
                    if (headlineParts.length > 0) break
                    continue
                }
                // If we already passed a location line, anything after is summary, not headline
                if (hitLocation) break
                if (isNameLike(candidate)) break
                if (isSkillLine(candidate)) break
                // Stop at org affiliation lines (primarily bullet points like "• WTM • NICE CC")
                if (/^[•·\-]/.test(candidate) || (candidate.match(/•/g) || []).length >= 2) break
                // Reject certification/award/course names that might appear after name in sidebar
                if (/\b(certificate|certification|certified|course|diploma|badge|award|honor|prize|scholarship|licence|license)\b/i.test(candidate)) break
                // Reject year+title patterns ("Codeavour 2022", "Dean's List 2021")
                if (/^[A-Z][\w\s]+\d{4}/.test(candidate) && candidate.length < 50) break
                // Reject date ranges
                if (/\d{4}\s*[-–]\s*(\d{4}|present)/i.test(candidate)) break
                if (candidate.length >= 3) {
                    headlineParts.push(candidate)
                    // Headlines are usually 1-3 lines; stop if we have enough
                    if (headlineParts.join(' ').length > 250) break
                }
            }
            if (headlineParts.length > 0) {
                const fullHeadline = headlineParts.join(' ').trim()
                if (fullHeadline.length >= 3) {
                    return fullHeadline
                }
            }
        }
    }

    // ---- STRATEGY 2: Look for pipe-separated headline (very common LinkedIn pattern) ----
    for (const line of lines) {
        if (line.includes('|') && line.length >= 15 && line.length <= 250) {
            if (!line.includes('@') && !line.includes('.com') && !line.includes('http')) {
                return line
            }
        }
    }

    // ---- STRATEGY 3: Look for headline-like line right before "Summary" or "About" ----
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/^(Summary|About)$/i)) {
            for (let j = i - 1; j >= Math.max(0, i - 5); j--) {
                const candidate = lines[j]
                if (isLocation(candidate)) continue
                if (isNameLike(candidate)) break
                if (isHeadlineLike(candidate)) {
                    return candidate
                }
            }
        }
    }

    // ---- STRATEGY 4: Look for headline-like line right before "Experience" ----
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/^Experience$/i)) {
            for (let j = i - 1; j >= Math.max(0, i - 6); j--) {
                const candidate = lines[j]
                if (isLocation(candidate)) continue
                if (isNameLike(candidate)) break
                if (isSidebarOrNoise(candidate)) break
                if (isHeadlineLike(candidate)) {
                    return candidate
                }
            }
        }
    }

    // ---- STRATEGY 5: Look for any headline-like line after sidebar ends ----
    let passedSidebar = false
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (line.match(/^(Certifications?|Honors-Awards|Honors|Awards|Publications?|Patents?)$/i)) {
            passedSidebar = true
            continue
        }
        if (passedSidebar) {
            if (isNameLike(line)) continue // Skip name, headline is after it
            if (isLocation(line)) continue
            if (isSkillLine(line)) continue
            if (line.match(/^(Summary|Experience|Education)/i)) break
            if (isHeadlineLike(line)) {
                return line
            }
        }
    }

    // ---- STRATEGY 6: Look for first non-noise, non-name, non-location line with role keywords ----
    // This catches cases where sidebar markers aren't detected
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (isSidebarOrNoise(line)) continue
        if (isNameLike(line)) continue
        if (isLocation(line)) continue
        if (isSkillLine(line)) continue
        if (line.match(/^(Summary|Experience|Education|Publications?|Patents?|Page\s+\d)/i)) continue
        const hasRole = line.match(/(engineer|developer|designer|manager|analyst|consultant|intern|student|founder|director|lead|specialist|associate|executive|professor|researcher|scientist|architect|coordinator|officer|head\s+of|vp\s+of|chief|ceo|cto|cfo|freelanc|entrepreneur|creator|editor|writer|coach|trainer|advisor|marketer|strategist)/i)
        if (hasRole && line.length >= 10 && line.length <= 200) {
            // Found headline via role keyword match
            return line
        }
    }

    // No headline detected
    return ''
}

// Extract about section
function extractAbout(text: string): string {
    // Look for "About" section | boundary must be a section header on its own line
    // to avoid matching words like "experience" or "education" mid-sentence
    const aboutMatch = text.match(/\nAbout\s*\n([\s\S]+?)(?=\n(?:Experience|Skills|Education|Licenses|Certifications?|Honors|Awards|Recommendations?|Volunteering|Publications?|Projects?|Languages?)\s*\n|--- SIDEBAR ---|$)/i)
    if (aboutMatch) {
        // Trim and limit to 3000 chars
        const about = aboutMatch[1].trim()
        // Remove page markers from about text
        const cleaned = about.replace(/\s*Page\s+\d+\s+of\s+\d+\s*/gi, ' ').replace(/\s+/g, ' ').trim()
        if (cleaned.length >= 50) return cleaned.slice(0, 3000)
    }

    // Alternative: Summary section
    const summaryMatch = text.match(/\nSummary\s*\n([\s\S]+?)(?=\n(?:Experience|Skills|Education|Licenses|Certifications?|Honors|Awards)\s*\n|--- SIDEBAR ---|$)/i)
    if (summaryMatch) {
        const summary = summaryMatch[1].trim()
        const cleaned = summary.replace(/\s*Page\s+\d+\s+of\s+\d+\s*/gi, ' ').replace(/\s+/g, ' ').trim()
        if (cleaned.length >= 50) return cleaned.slice(0, 3000)
    }

    return ''
}

// Extract experience entries
// LinkedIn PDF format (verified from real PDFs):
//   Company Name
//   Job Title
//   Date Range (Duration)
//   Location (optional, in gray)
//   Description bullets (optional)
// Multi-role at same company:
//   Company Name
//   Total Duration
//   Job Title 1
//   Date Range 1
//   Job Title 2
//   Date Range 2
function extractExperience(text: string): ExperienceItem[] {
    const experiences: ExperienceItem[] = []

    // Look for Experience section | use greedy match with robust boundary detection
    // The section ends at the next major LinkedIn section header on its own line
    const expMatch = text.match(/\nExperience\s*\n([\s\S]+?)(?=\n(?:Education|Skills|Licenses? & Certifications?|Certifications?|Licenses?|Honors-Awards|Honors|Awards|Accomplishments?|Publications?|Patents?|Recommendations?|Interests?|Volunteering|Organizations?|Courses|Projects?|Languages?)\s*\n|--- SIDEBAR ---|$)/i)
    if (!expMatch) return experiences

    let expSection = expMatch[1]

    // Handle double "Experience" header: some multi-page PDFs have "Experience" at the
    // bottom of page 1 as a section label, then summary continuation text, then another
    // "Experience" header on page 2 where the actual entries begin.
    // If the section contains another "Experience" line, use content after the LAST one.
    const innerExpIdx = expSection.lastIndexOf('\nExperience\n')
    if (innerExpIdx > 0) {
        expSection = expSection.slice(innerExpIdx + '\nExperience\n'.length)
    } else {
        // Also try case-insensitive search for "Experience" on its own line
        const innerMatch = expSection.match(/^Experience$/im)
        if (innerMatch && innerMatch.index && innerMatch.index > 0) {
            expSection = expSection.slice(innerMatch.index + innerMatch[0].length)
        }
    }

    // Filter out page markers entirely before processing
    const lines = expSection.split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0 && !/^Page\s+\d+/i.test(l))

    // Helper: detect date/duration lines
    // Matches: "September 2023 - Present (2 years 8 months)", "1995 - 2016 (21 years)",
    // "August 2010 - November 2013 (3 years 4 months)", "April 2007 - August 2010 (3 years 5 months)"
    const isDateLine = (line: string): boolean => {
        // Reject lines with pipe characters | these are "Company | Location | Date" combos from summaries
        if (line.includes('|')) return false
        // Month Year pattern starting or near start: "September 2023 - Present (...)"
        if (/^(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{4}/i.test(line)) return true
        // Year-range pattern at start: "1995 - 2016 (21 years)"
        if (/^\d{4}\s*[-–|]\s*(?:present|\d{4})/i.test(line)) return true
        // Duration in parentheses at start or as the whole line: "(21 years)", "(3 years 4 months)"
        if (/^\(\d+\s*(?:year|month|yr|mo)/i.test(line)) return true
        // Short abbreviated date at start: "Dec 2024", "Apr 2007"
        if (/^(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+\d{4}/i.test(line)) return true
        // Date range NOT at start but line is short and date-dominated (e.g. after some whitespace artifact)
        if (line.length < 60 && /(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{4}\s*[-–|]\s*(?:present|(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{4})/i.test(line)) return true
        return false
    }

    // Helper: detect duration-only lines (e.g., "2 years 8 months", "13 years 1 month")
    const isDurationOnly = (line: string): boolean => {
        return /^\d+\s*(?:year|month|yr|mo)/i.test(line) && line.length < 40
    }

    // Helper: detect if a line is PRIMARILY a date/duration (vs description that mentions a year)
    const isDateOrDuration = (line: string): boolean => {
        if (isDurationOnly(line)) return true
        // Reject lines with pipes | they're compound lines, not pure dates
        if (line.includes('|')) return false
        // A line is a "date line" only if it's short and date-dominated
        if (line.length > 80) return false
        if (isDateLine(line)) {
            // Make sure it's not a long description that happens to mention a date
            const words = line.split(/\s+/)
            if (words.length <= 12) return true
        }
        return false
    }

    // Helper: detect location lines (precise to avoid false positives)
    // MUST contain a comma before the location word to distinguish "Chandigarh, India" from "TiE Chandigarh"
    const isLocationLine = (line: string): boolean => {
        // Must be short (locations are typically < 50 chars)
        if (line.length > 60) return false
        // Must contain a comma | "City, State/Country" is the standard LinkedIn format
        // This prevents matching "TiE Chandigarh" or "Government of India" as locations
        if (line.includes(',')) {
            const locationCountries = /,\s*(India|USA|US|UK|Canada|Australia|United States|United Kingdom|Germany|France|Singapore|UAE|China|Japan|Brazil|Netherlands|Spain|Italy|Ireland|Sweden|Norway|Denmark|Switzerland|Belgium|New Zealand|South Africa|Israel|Turkey)\b/i
            const locationStates = /,\s*(Haryana|Punjab|Maharashtra|Karnataka|Tamil Nadu|Telangana|Gujarat|Rajasthan|Uttar Pradesh|West Bengal|Madhya Pradesh|Bihar|Odisha|Kerala|Andhra Pradesh|Uttarakhand|Goa|Chandigarh|Delhi|NCR|Himachal Pradesh|California|Texas|New York|Florida|Illinois|Washington|Massachusetts|Virginia|Georgia|Pennsylvania|Ohio|Michigan|Colorado|Arizona|Oregon|Minnesota|Wisconsin|Connecticut|Maryland|New Jersey|North Carolina|Tennessee)\b/i
            if (locationCountries.test(line)) return true
            if (locationStates.test(line)) return true
            // Generic "City, Region" pattern: "Nainital, Uttarakhand, India", "Bangalore, India"
            if (/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*,\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:,\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)?$/.test(line)) return true
        }
        // Standalone patterns without comma
        if (/^(Greater|Metropolitan)\s/i.test(line) && line.length < 60) return true
        return false
    }

    // Helper: detect section headers (NOT page numbers | those are filtered out above)
    const isSectionHeader = (line: string): boolean => {
        return /^(Education|Skills|Licenses? & Certifications?|Certifications?|Licenses?|Publications?|Patents?|Honors-Awards|Honors|Awards|Accomplishments?|Recommendations?|Interests?|Volunteering|Organizations?|Courses|Projects?|Languages?)$/i.test(line)
    }

    // Helper: check if a line at index is followed by a date within the next 1-2 lines
    // Used at top-level to detect Company → Title → Date patterns
    const isFollowedByDate = (idx: number): boolean => {
        // Check next line
        if (idx + 1 < lines.length && isDateOrDuration(lines[idx + 1])) return true
        // Check 2 lines ahead (in case there's a subtitle between title and date)
        if (idx + 2 < lines.length && isDateOrDuration(lines[idx + 2])) {
            // Only if the middle line is short (could be a sub-title or role type)
            if (lines[idx + 1].length < 50) return true
        }
        return false
    }

    // Helper: check if IMMEDIATELY followed by a date (next line only)
    // Used inside company blocks where title → date is always adjacent
    const isImmediatelyFollowedByDate = (idx: number): boolean => {
        return idx + 1 < lines.length && isDateOrDuration(lines[idx + 1])
    }

    // Helper: is this a plain text line (not structural)?
    const isPlainText = (line: string): boolean => {
        if (isDateOrDuration(line)) return false
        if (isSectionHeader(line)) return false
        return line.length >= 2
    }

    // Helper: detect bullet/description lines
    const isBulletLine = (line: string): boolean => {
        return line.startsWith('•') || line.startsWith('-') || line.startsWith('·') ||
            line.startsWith('*') || line.startsWith('▪') || line.startsWith('→')
    }

    // Collect description lines after a role's date+location
    const collectDescription = (startIdx: number): { desc: string; nextIdx: number } => {
        const descLines: string[] = []
        let idx = startIdx
        while (idx < lines.length) {
            const dl = lines[idx]
            if (isSectionHeader(dl)) break
            // If this is a date/duration, it's the start of a new role
            if (isDateOrDuration(dl)) break
            // If this line is followed by a date AND is short AND not a bullet, it's a new title/company
            if (isFollowedByDate(idx) && !isBulletLine(dl) && dl.length < 100) break
            // Skip pure location lines
            if (isLocationLine(dl) && descLines.length === 0) { idx++; continue }
            // Collect description text
            if (dl.length > 2) {
                descLines.push(dl)
            }
            idx++
        }
        // Join and clean up description
        const rawDesc = descLines.join(' ')
            .replace(/[•\-·▪→]\s*/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
        return { desc: rawDesc.slice(0, 1000), nextIdx: idx }
    }

    // Parse: walk through lines and detect company → title → date → description pattern
    let i = 0
    while (i < lines.length) {
        const line = lines[i]

        // Stop at section headers
        if (isSectionHeader(line)) break

        // Skip orphan date/duration/location/bullet lines at top level
        if (isDateOrDuration(line)) { i++; continue }
        if (isLocationLine(line)) { i++; continue }
        if (isBulletLine(line)) { i++; continue }

        // A company/title block starts with a plain text line
        if (isPlainText(line)) {
            const firstLine = line
            i++

            // Check if next line is a total duration (multi-role company)
            // e.g., "Government of India\n13 years 1 month"
            let isMultiRole = false
            if (i < lines.length && isDurationOnly(lines[i]) && !isDateLine(lines[i])) {
                // Duration-only without a date range = multi-role total duration
                isMultiRole = true
                i++ // skip total duration
            }

            // Determine if firstLine is a title (directly followed by date) or company name
            if (!isMultiRole && i < lines.length && isDateOrDuration(lines[i])) {
                // firstLine is a TITLE (no separate company line)
                // This handles: "Title\nDate Range" or "Title\nDuration"
                const duration = lines[i]
                i++
                // Skip location
                if (i < lines.length && isLocationLine(lines[i])) i++
                const { desc, nextIdx } = collectDescription(i)
                i = nextIdx

                experiences.push({
                    title: firstLine.slice(0, 150),
                    company: '',
                    duration: duration.slice(0, 80),
                    description: desc
                })
                continue
            }

            // Detect multi-line titles: if firstLine looks like a title/role (ALL CAPS or
            // contains role keywords) and the next line is immediately followed by a date,
            // join them as a single title instead of company→title.
            // e.g., "SENIOR EDUCATION OFFICER AND EXECUTIVE DIRECTOR A F\nSCHOOLS,"
            // or "President, Examination Board and Director of Studies. Senior Education\nofficer"
            if (i < lines.length && isPlainText(lines[i]) && isImmediatelyFollowedByDate(i)) {
                const isFirstLineTitle = /\b(officer|director|president|manager|head\b|chief|executive|secretary|chairman|coordinator|superintendent|commandant|instructor|professor|headmaster|principal|education)\b/i.test(firstLine)
                if (isFirstLineTitle) {
                    // Join as multi-line title
                    const combinedTitle = (firstLine + ' ' + lines[i]).replace(/\s+/g, ' ').trim()
                    i++
                    let duration = ''
                    if (i < lines.length && isDateOrDuration(lines[i])) {
                        duration = lines[i]
                        i++
                        if (i < lines.length && /^\(\d+\s*(?:year|month)/i.test(lines[i])) {
                            duration += ' ' + lines[i]
                            i++
                        }
                    }
                    if (i < lines.length && isLocationLine(lines[i])) i++
                    const { desc, nextIdx } = collectDescription(i)
                    i = nextIdx
                    experiences.push({
                        title: combinedTitle.slice(0, 200),
                        company: '',
                        duration: duration.slice(0, 80),
                        description: desc
                    })
                    continue
                }
            }

            // firstLine is a company name with roles underneath
            const company = firstLine
            let foundRole = false

            while (i < lines.length) {
                if (isSectionHeader(lines[i])) break

                // Skip location/bullet lines within company block
                if (isLocationLine(lines[i]) && !isImmediatelyFollowedByDate(i)) { i++; continue }

                // Within a company, a title is IMMEDIATELY followed by a date range.
                // A plain text line followed by duration-only signals a NEW multi-role company.
                // A plain text line followed by date 2 lines ahead (not immediately) is Company→Title→Date.
                if (isPlainText(lines[i]) && isImmediatelyFollowedByDate(i)) {
                    // Check: is the next line a duration-only (not a date range)?
                    // If so, this is a new multi-role company, not a title under current company.
                    if (foundRole && i + 1 < lines.length && isDurationOnly(lines[i + 1]) && !isDateLine(lines[i + 1])) {
                        // New multi-role company block detected (e.g., "Kumaon University\n1 year 11 months")
                        break
                    }

                    // This line is a title within the current company
                    const title = lines[i]
                    i++

                    // Collect date/duration (may span 1-2 lines)
                    let duration = ''
                    if (i < lines.length && isDateOrDuration(lines[i])) {
                        duration = lines[i]
                        i++
                        // Sometimes duration is on a separate line: "Sep 2023 - Present\n(2 years 8 months)"
                        if (i < lines.length && /^\(\d+\s*(?:year|month)/i.test(lines[i])) {
                            duration += ' ' + lines[i]
                            i++
                        }
                    }

                    // Skip location
                    if (i < lines.length && isLocationLine(lines[i])) i++

                    // Collect description
                    const { desc, nextIdx } = collectDescription(i)
                    i = nextIdx

                    experiences.push({
                        title: title.slice(0, 150),
                        company: company.slice(0, 150),
                        duration: duration.slice(0, 80),
                        description: desc
                    })
                    foundRole = true
                } else if (isPlainText(lines[i]) && !isBulletLine(lines[i])) {
                    // Plain text NOT immediately followed by a date.
                    // Check for multi-line title within the company: if NEXT plain text line
                    // IS immediately followed by a date, and current line has role keywords,
                    // join them as a multi-line title under this company.
                    if (isMultiRole && i + 1 < lines.length && isPlainText(lines[i + 1]) && isImmediatelyFollowedByDate(i + 1)) {
                        const hasRoleKeywords = /\b(officer|director|president|manager|head\b|chief|executive|secretary|chairman|coordinator|superintendent|commandant|instructor|professor|headmaster|principal|education)\b/i.test(lines[i])
                        if (hasRoleKeywords) {
                            // Multi-line title under this company
                            const combinedTitle = (lines[i] + ' ' + lines[i + 1]).replace(/\s+/g, ' ').trim()
                            i += 2
                            let duration = ''
                            if (i < lines.length && isDateOrDuration(lines[i])) {
                                duration = lines[i]
                                i++
                                if (i < lines.length && /^\(\d+\s*(?:year|month)/i.test(lines[i])) {
                                    duration += ' ' + lines[i]
                                    i++
                                }
                            }
                            if (i < lines.length && isLocationLine(lines[i])) i++
                            const { desc, nextIdx } = collectDescription(i)
                            i = nextIdx
                            experiences.push({
                                title: combinedTitle.slice(0, 200),
                                company: company.slice(0, 150),
                                duration: duration.slice(0, 80),
                                description: desc
                            })
                            foundRole = true
                            continue
                        }
                    }
                    if (foundRole || isMultiRole) {
                        // We already found roles under this company, so this is a new company block
                        break
                    } else {
                        // Could be a second line of company name or subtitle, skip
                        i++
                    }
                } else if (isDateOrDuration(lines[i])) {
                    // Orphan date | skip
                    i++
                } else {
                    // Bullet, location, or other | skip
                    i++
                }
            }

            if (!foundRole && !isMultiRole) {
                // Company line with nothing useful after it | skip
                continue
            }
        } else {
            i++
        }
    }

    return experiences.slice(0, 25)
}

// Extract skills | combines Top Skills (sidebar) + Skills section (main) for comprehensive coverage
function extractSkills(text: string): string[] {
    const allSkills: string[] = []

    // Helper: extract skill lines after a section header
    const extractSkillLines = (startText: string, maxLines: number): string[] => {
        const lines = startText.split('\n')
        const skillLines: string[] = []
        for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed) continue
            if (/^(Contact|Languages?|Certifications?|Honors|Awards|Honors-Awards|Publications?|Patents?|Summary|About|Experience|Education|Recommendations?|Interests?|Volunteering|---\s*SIDEBAR)$/i.test(trimmed)) break
            if (/\S+@\S+\.\S+/.test(trimmed)) break
            if (trimmed.includes('linkedin.com') || /^https?:\/\//.test(trimmed)) break
            if (/^\+?\d[\d\s\-()]{5,}/.test(trimmed)) break
            if (trimmed.includes('(Mobile)') || trimmed.includes('(LinkedIn)') || trimmed.includes('(Company)')) break
            if (/\((Native|Bilingual|Professional|Limited|Elementary)/i.test(trimmed)) break
            if (/^Page\s+\d+/i.test(trimmed)) continue
            if (trimmed.length >= 2 && trimmed.length <= 80 && trimmed.split(/\s+/).length <= 8) {
                skillLines.push(trimmed)
            }
            if (skillLines.length >= maxLines) break
        }
        return skillLines
    }

    // Source 1: "Top Skills" section (sidebar | usually 3-5 skills)
    const topSkillsIdx = text.search(/Top Skills?\s*\n/i)
    if (topSkillsIdx >= 0) {
        const afterHeader = text.slice(topSkillsIdx).replace(/^Top Skills?\s*\n/i, '')
        const lines = extractSkillLines(afterHeader, 10)
        if (lines.length > 0) {
            allSkills.push(...parseSkillsSection(lines.join('\n')))
        }
    }

    // Source 2: Main "Skills" section (can have many more skills)
    const skillsMatch = text.match(/\nSkills?\s*\n/i)
    if (skillsMatch && skillsMatch.index !== undefined) {
        const afterHeader = text.slice(skillsMatch.index + skillsMatch[0].length)
        const lines = extractSkillLines(afterHeader, 30)
        if (lines.length > 0) {
            allSkills.push(...parseSkillsSection(lines.join('\n')))
        }
    }

    // Source 3: Bullet-style skills (• Skill1 • Skill2)
    if (allSkills.length < 3) {
        const bulletSkills = text.match(/(?:^|\n)\s*[•·]\s*(.+)/gm)
        if (bulletSkills && bulletSkills.length >= 3) {
            const extracted = bulletSkills
                .map(s => s.replace(/^[\s•·]+/, '').trim())
                .filter(s => s.length >= 2 && s.length <= 60 && s.split(/\s+/).length <= 6)
            allSkills.push(...extracted)
        }
    }

    // Deduplicate (case-insensitive) and return
    const seen = new Set<string>()
    const unique: string[] = []
    for (const skill of allSkills) {
        const lower = skill.toLowerCase()
        if (!seen.has(lower)) {
            seen.add(lower)
            unique.push(skill)
        }
    }
    return unique.slice(0, 30)
}

function parseSkillsSection(skillsSection: string): string[] {
    const skills: string[] = []

    // Split into lines and clean
    const lines = skillsSection.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 1)

    // Filter out non-skill lines
    const isValidSkill = (line: string): boolean => {
        // Skip empty, too short, or too long
        if (line.length < 2 || line.length > 60) return false

        // Skip lines with unwanted patterns
        if (line.match(/Endorse|endorse/i)) return false
        if (line.match(/Show|See|View/i)) return false
        if (/^\d+$/.test(line)) return false // Just numbers
        if (line.includes('@') || line.includes('.com')) return false
        if (line.match(/http/i)) return false

        // Skip section headers that might bleed in
        if (line.match(/^(Languages?|Certifications?|Honors|Awards|Summary|Experience)/i)) return false

        // Skip language proficiency indicators
        if (line.match(/\((Native|Bilingual|Professional|Limited)\)/)) return false

        // Skills shouldn't be full sentences
        const words = line.split(/\s+/)
        if (words.length > 6) return false

        return true
    }

    lines.forEach(line => {
        // Remove bullets, numbers, and clean
        const cleaned = line.replace(/^[•\-\d\.]+\s*/, '').trim()

        if (isValidSkill(cleaned)) {
            skills.push(cleaned)
        }
    })
    return [...new Set(skills)].slice(0, 30) // Unique, max 30
}

// Count recommendations
function countRecommendations(text: string): number {
    // Look for "Recommendations" section
    const recMatch = text.match(/Recommendations?\s*\n([\s\S]{20,3000}?)(?:\n\n|Accomplishments|$)/i)
    if (!recMatch) return 0

    const recSection = recMatch[1]

    // Count instances of recommendation patterns
    // LinkedIn recommendations usually have quoted text or names
    const quoteCount = (recSection.match(/[""][\s\S]{20,}/g) || []).length
    const receivedCount = (recSection.match(/received?/gi) || []).length

    return Math.max(quoteCount, Math.floor(receivedCount / 2))
}

// Extract education
function extractEducation(text: string): string[] {
    const education: string[] = []

    const eduMatch = text.match(/\nEducation\s*\n([\s\S]+?)(?=\n(?:Skills|Licenses? & Certifications?|Certifications?|Licenses?|Honors-Awards|Honors|Awards|Accomplishments?|Publications?|Patents?|Recommendations?|Interests?|Volunteering|Organizations?|Courses|Projects?|Languages?)\s*\n|--- SIDEBAR ---|$)/i)
    if (!eduMatch) return education

    const eduSection = eduMatch[1]
    const lines = eduSection.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 5 && !/^Page\s+\d+/i.test(line))

    // Look for university/college names or degrees
    lines.forEach(line => {
        if (line.length >= 10 && line.length <= 150) {
            // Skip date lines and page markers
            if (!/^\d{4}/.test(line)) {
                education.push(line)
            }
        }
    })

    return [...new Set(education)].slice(0, 10)
}

// Extract certifications
function extractCertifications(text: string): string[] {
    const certifications: string[] = []

    const certMatch = text.match(/\n(?:Certifications?|Licenses? & Certifications?|Licenses?)\s*\n([\s\S]+?)(?=\n(?:Education|Skills|Honors-Awards|Honors|Awards|Accomplishments?|Publications?|Patents?|Recommendations?|Interests?|Volunteering|Organizations?|Courses|Projects?|Languages?)\s*\n|--- SIDEBAR ---|$)/i)
    if (!certMatch) return certifications

    const certSection = certMatch[1]
    const lines = certSection.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 5 && !/^Page\s+\d+/i.test(line))

    lines.forEach(line => {
        if (line.length >= 10 && line.length <= 150 && !/^\d{4}/.test(line)) {
            certifications.push(line)
        }
    })

    return [...new Set(certifications)].slice(0, 10)
}

// Extract honors and awards
function extractHonors(text: string): string[] {
    const honors: string[] = []

    // Look for Honors, Awards, or Accomplishments section
    const honorsMatch = text.match(/(?:Honors?|Awards?|Honors-Awards|Accomplishments?)\s*\n([\s\S]{20,1500}?)(?:\n\n|Publications?|Patents?|Languages|$)/i)
    if (!honorsMatch) return honors

    const honorsSection = honorsMatch[1]
    const lines = honorsSection.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 5)

    lines.forEach(line => {
        if (line.length >= 10 && line.length <= 200 && !/^\d{4}/.test(line)) {
            honors.push(line)
        }
    })

    return [...new Set(honors)].slice(0, 10)
}
