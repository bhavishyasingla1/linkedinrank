import pdf from 'pdf-parse'
import { ProfileData, ExperienceItem } from './types'

/**
 * Parse LinkedIn PDF and extract structured profile data
 */
export async function parseLinkedInPDF(buffer: Buffer): Promise<ProfileData> {
    try {
        // Parse PDF to text
        const data = await pdf(buffer)
        const text = data.text

        // Debug: dump first 40 lines of raw PDF text
        const rawLines = text.split('\n').filter(l => l.trim().length > 0)
        rawLines.slice(0, 40).forEach((line, i) => {
        })

        // Extract structured data
        const name = extractName(text)
        const headline = extractHeadline(text)
        const about = extractAbout(text)
        const experience = extractExperience(text)
        const skills = extractSkills(text)
        const recommendations = countRecommendations(text)
        const education = extractEducation(text)
        const certifications = extractCertifications(text)
        const honors = extractHonors(text)

        return {
            name,
            headline,
            about,
            experience,
            skills,
            recommendations,
            education,
            certifications,
            honors
        }
    } catch (error) {
        throw new Error('Failed to parse PDF. Please ensure this is a valid LinkedIn profile PDF.')
    }
}

// Extract name from LinkedIn PDF
// NOTE: LinkedIn PDFs have two-column layout - sidebar (Contact, Skills) appears 
// BEFORE main content (Name, Headline) in the text stream
function extractName(text: string): string {
    const lines = text.split('\n').filter(line => line.trim().length > 0)

    // LinkedIn section headers that appear in sidebar AND main content
    const sidebarHeaders = /^(Contact|Top Skills?|Skills?|Languages?|Certifications?|Honors-Awards|Honors?|Awards?|Publications?|Patents?)/i
    const mainHeaders = /^(Summary|Experience|Education)/i

    // Helper: Check if text looks like a skill rather than a name
    const isSkillNotName = (text: string): boolean => {
        // Skills often end with (AI), (ML), etc.
        if (/\([A-Z]+\)$/.test(text)) return true
        // Common skill keywords
        const skillKeywords = [
            'intelligence', 'development', 'management', 'engineering', 'analytics',
            'marketing', 'communication', 'learning', 'computing', 'design',
            'programming', 'analysis', 'strategy', 'leadership', 'sales',
            'science', 'security', 'architecture', 'database', 'cloud'
        ]
        const lower = text.toLowerCase()
        if (skillKeywords.some(kw => lower.includes(kw))) return true
        return false
    }

    // Helper: Check if a line looks like a valid person's name
    const isValidName = (candidate: string): boolean => {
        if (!candidate) return false
        // Skip section headers
        if (sidebarHeaders.test(candidate) || mainHeaders.test(candidate)) return false
        // Skip URLs, emails, phone numbers, locations
        if (candidate.includes('@') || candidate.includes('http') ||
            candidate.includes('linkedin.com') || candidate.includes(',')) return false
        if (/^\+?\d[\d\s\-()]+$/.test(candidate) || /^\d+$/.test(candidate)) return false
        // Skip skills
        if (isSkillNotName(candidate)) return false
        // Name pattern: 2-4 words, starts with capital, no numbers, reasonable length
        const words = candidate.split(/\s+/)
        if (words.length < 2 || words.length > 4) return false
        if (!/^[A-Z][a-z]/.test(candidate)) return false
        if (/\d/.test(candidate)) return false
        if (candidate.length < 5 || candidate.length > 50) return false
        return true
    }

    // Strategy 1: Find headline (contains '|') and take line before it
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        // Headline is usually long text with | separator
        if (line.includes('|') && line.length > 30) {
            const candidate = lines[i - 1].trim()
            if (isValidName(candidate)) {
                return candidate
            }
        }
    }

    // Strategy 2: Look backwards from "Summary" section
    for (let i = 0; i < lines.length; i++) {
        if (mainHeaders.test(lines[i].trim())) {
            for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
                const candidate = lines[j].trim()
                if (isValidName(candidate)) {
                    return candidate
                }
            }
        }
    }

    // Strategy 3: Find any valid name that appears after the last sidebar section ends
    let afterSidebar = false
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        if (/^(Certifications?|Honors-Awards|Publications?|Patents?)$/i.test(line)) {
            afterSidebar = true
            continue
        }
        if (afterSidebar && isValidName(line)) {
            return line
        }
    }

    // Fallback: look through all lines
    for (const line of lines) {
        if (isValidName(line.trim())) {
            return line.trim()
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
        if (line.match(/,\s*(Haryana|Punjab|Maharashtra|Karnataka|Tamil Nadu|Telangana|Gujarat|Rajasthan|Uttar Pradesh|West Bengal|Madhya Pradesh|Bihar|Odisha|Kerala|Andhra Pradesh|Chhattisgarh|Jharkhand|Assam|Himachal Pradesh|Uttarakhand|Goa|Chandigarh|Delhi|NCR)/i)) return true
        if (line.match(/district/i)) return true
        return false
    }

    // Helper: check if a line looks like a headline (descriptive professional text)
    const isHeadlineLike = (line: string): boolean => {
        if (line.length < 5 || line.length > 300) return false
        if (isSidebarOrNoise(line)) return false
        if (line.match(/^(Summary|Experience|Education|Publications?|Patents?|Page\s+\d)/i)) return false
        if (isLocation(line)) return false
        const hasRoleKeywords = line.match(/(engineer|developer|designer|manager|analyst|consultant|intern|student|founder|director|lead|specialist|associate|executive|professor|researcher|scientist|architect|coordinator|officer|head\s+of|vp\s+of|chief|ceo|cto|cfo|coo|president|partner|advisor|freelanc|entrepreneur|creator|editor|writer|coach|trainer|mentor|advocate|volunteer|fellow|scholar|assistant|nurse|doctor|attorney|lawyer|accountant|marketer|strategist|producer|host)/i)
        const hasPipeSeparator = line.includes('|')
        const hasAtSymbol = line.includes(' at ') || line.includes(' @ ')
        const hasAtCompany = line.match(/\bat\s+[A-Z]/i)
        const isDescriptive = line.length >= 10 && line.split(/\s+/).length >= 2
        return !!(hasRoleKeywords || hasPipeSeparator || hasAtSymbol || hasAtCompany || isDescriptive)
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
        // Use fuzzy matching — find last occurrence of name (main content, not sidebar)
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
            // We trust position, not content — headlines can be anything.
            let hitLocation = false
            for (let j = lastNameIndex + 1; j <= Math.min(lastNameIndex + 5, lines.length - 1); j++) {
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
                if (candidate.length >= 3) {
                    headlineParts.push(candidate)
                    // Headlines are usually 1-2 lines; stop if we have enough
                    if (headlineParts.join(' ').length > 200) break
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
    // Look for "About" section
    const aboutMatch = text.match(/About\s*\n([\s\S]{100,3000}?)(?:\n\n|Experience|Skills|Education)/i)
    if (aboutMatch) {
        return aboutMatch[1].trim()
    }

    // Alternative: Summary section
    const summaryMatch = text.match(/Summary\s*\n([\s\S]{100,3000}?)(?:\n\n|Experience|Skills)/i)
    if (summaryMatch) {
        return summaryMatch[1].trim()
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

    // Look for Experience section
    const expMatch = text.match(/\nExperience\s*\n([\s\S]+?)(?:\nEducation\b|\nSkills\b|\nCertifications?\b|$)/i)
    if (!expMatch) return experiences

    const expSection = expMatch[1]
    const lines = expSection.split('\n').map(l => l.trim()).filter(l => l.length > 0)

    // Helper: detect date/duration lines
    const isDateLine = (line: string): boolean => {
        return /(?:january|february|march|april|may|june|july|august|september|october|november|december|present)\s+\d{4}/i.test(line) ||
            /\d{4}\s*-\s*(?:present|\d{4})/i.test(line) ||
            /\(\d+\s*(?:year|month|yr|mo)/i.test(line)
    }

    // Helper: detect duration-only lines (e.g., "2 years 8 months")
    const isDurationOnly = (line: string): boolean => {
        return /^\d+\s*(?:year|month|yr|mo)/i.test(line) && line.length < 30
    }

    // Helper: detect location lines
    const isLocationLine = (line: string): boolean => {
        if (line.match(/,\s*[A-Z][a-z]+/)) return true
        if (line.match(/(India|USA|US|UK|Canada|Australia|United States|United Kingdom)/i)) return true
        if (line.match(/^(Greater|Metropolitan)/i)) return true
        if (line.match(/district/i)) return true
        return false
    }

    // Helper: detect section headers
    const isSectionHeader = (line: string): boolean => {
        return /^(Education|Skills|Certifications?|Licenses?|Publications?|Patents?|Page\s+\d)/i.test(line)
    }

    // Helper: check if a line at index is followed by a date (meaning it's a title or company name, not description)
    const isFollowedByDate = (idx: number): boolean => {
        if (idx + 1 >= lines.length) return false
        return isDateLine(lines[idx + 1]) || isDurationOnly(lines[idx + 1])
    }

    // Helper: is this a plain text line (not structural)?
    const isPlainText = (line: string): boolean => {
        if (isDateLine(line) || isDurationOnly(line) || isLocationLine(line)) return false
        if (isSectionHeader(line)) return false
        if (/^Page\s+\d/i.test(line)) return false
        return line.length >= 2
    }

    // Collect description lines after a role's date+location
    const collectDescription = (startIdx: number): { desc: string; nextIdx: number } => {
        const descLines: string[] = []
        let idx = startIdx
        while (idx < lines.length) {
            const dl = lines[idx]
            if (isSectionHeader(dl)) break
            if (isDateLine(dl) || isDurationOnly(dl)) break
            if (/^Page\s+\d/i.test(dl)) { idx++; continue }
            // If this line is followed by a date, it's a new title/company, stop
            if (isFollowedByDate(idx) && !dl.startsWith('•') && !dl.startsWith('-')) break
            // Skip location lines
            if (isLocationLine(dl)) { idx++; continue }
            // Collect anything else as description
            if (dl.length > 2) {
                descLines.push(dl)
            }
            idx++
        }
        return { desc: descLines.join(' ').replace(/^[•\-]\s*/gm, '').slice(0, 500), nextIdx: idx }
    }

    // Parse: walk through lines and detect company → title → date → description pattern
    let i = 0
    while (i < lines.length) {
        const line = lines[i]

        // Skip section headers, page numbers
        if (isSectionHeader(line)) break
        if (/^Page\s+\d/i.test(line)) { i++; continue }
        if (isDateLine(line) || isDurationOnly(line) || isLocationLine(line)) { i++; continue }
        if (line.startsWith('•') || line.startsWith('-')) { i++; continue }

        // A company/title block starts with a plain text line
        if (isPlainText(line)) {
            const firstLine = line
            i++

            // Check if next line is a total duration (multi-role company)
            let isMultiRole = false
            if (i < lines.length && isDurationOnly(lines[i])) {
                isMultiRole = true
                i++ // skip total duration
            }

            // Check if the first line is actually a company (followed by titles with dates)
            // or a title itself (directly followed by a date)
            if (!isMultiRole && i < lines.length && (isDateLine(lines[i]) || isDurationOnly(lines[i]))) {
                // firstLine is a TITLE, and there's no separate company
                // This handles "Title \n Date" format (company = title)
                const duration = lines[i]
                i++
                if (i < lines.length && isLocationLine(lines[i])) i++
                const { desc, nextIdx } = collectDescription(i)
                i = nextIdx

                experiences.push({
                    title: firstLine.slice(0, 100),
                    company: '',
                    duration: duration.slice(0, 50),
                    description: desc
                })
                continue
            }

            // firstLine is a company name; now collect roles under it
            const company = firstLine
            let foundRole = false

            while (i < lines.length) {
                if (isSectionHeader(lines[i])) break
                if (/^Page\s+\d/i.test(lines[i])) { i++; continue }

                // Check for a title line: a plain text line followed by a date
                if (isPlainText(lines[i]) && isFollowedByDate(i)) {
                    const title = lines[i]
                    i++

                    // Collect date
                    let duration = ''
                    if (i < lines.length && (isDateLine(lines[i]) || isDurationOnly(lines[i]))) {
                        duration = lines[i]
                        i++
                    }

                    // Skip location
                    if (i < lines.length && isLocationLine(lines[i])) i++

                    // Collect description
                    const { desc, nextIdx } = collectDescription(i)
                    i = nextIdx

                    experiences.push({
                        title: title.slice(0, 100),
                        company: company.slice(0, 100),
                        duration: duration.slice(0, 50),
                        description: desc
                    })
                    foundRole = true
                } else if (isPlainText(lines[i]) && !lines[i].startsWith('•') && !lines[i].startsWith('-')) {
                    // Not followed by a date — could be description or a new company
                    if (foundRole || isMultiRole) {
                        // We already found roles, this is a new company block
                        break
                    } else {
                        // Unknown line, skip
                        i++
                    }
                } else {
                    // Date, location, bullet, or other — skip
                    i++
                }
            }

            if (!foundRole && !isMultiRole) {
                // Company line with nothing useful after it — skip
                continue
            }
        } else {
            i++
        }
    }
    return experiences.slice(0, 10)
}

// Extract skills
function extractSkills(text: string): string[] {
    // LinkedIn sidebar has "Top Skills" section
    // Try multiple patterns to catch variations in PDF text extraction

    // Pattern 1: "Top Skills" with boundary
    const p1 = text.match(/Top Skills?\s*\n([\s\S]{5,800}?)(?:\n(?:Languages?|Certifications?|Honors|Awards|Publications?|Patents?|Contact|Education)\b)/i)
    if (p1) return parseSkillsSection(p1[1])

    // Pattern 2: "Top Skills" until end of sidebar (double newline or end)
    const p2 = text.match(/Top Skills?\s*\n([\s\S]{5,800}?)(?:\n\n)/i)
    if (p2) return parseSkillsSection(p2[1])

    // Pattern 3: "Top Skills" to end
    const p3 = text.match(/Top Skills?\s*\n([\s\S]{5,400}?)$/im)
    if (p3) return parseSkillsSection(p3[1])

    // Pattern 4: General "Skills" section (not "Top Skills")
    const p4 = text.match(/\nSkills?\s*\n([\s\S]{5,800}?)(?:\n(?:Languages?|Education|Certifications?|Honors|Awards|Recommendations?)\b)/i)
    if (p4) return parseSkillsSection(p4[1])

    // Pattern 5: "Skills" with looser boundary
    const p5 = text.match(/\nSkills?\s*\n([\s\S]{5,800}?)(?:\n\n)/i)
    if (p5) return parseSkillsSection(p5[1])

    // Pattern 6: Bullet-style skills anywhere (• Skill1 • Skill2)
    const bulletSkills = text.match(/(?:^|\n)\s*[•·]\s*(.+)/gm)
    if (bulletSkills && bulletSkills.length >= 3) {
        const extracted = bulletSkills
            .map(s => s.replace(/^[\s•·]+/, '').trim())
            .filter(s => s.length >= 2 && s.length <= 60 && s.split(/\s+/).length <= 6)
        if (extracted.length >= 3) return [...new Set(extracted)].slice(0, 30)
    }

    return []
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

    const eduMatch = text.match(/Education\s*\n([\s\S]{20,2000}?)(?:\n\n|Licenses|Certifications|$)/i)
    if (!eduMatch) return education

    const eduSection = eduMatch[1]
    const lines = eduSection.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 5)

    // Look for university/college names or degrees
    lines.forEach(line => {
        if (line.length >= 10 && line.length <= 150) {
            // Skip date lines
            if (!/^\d{4}/.test(line)) {
                education.push(line)
            }
        }
    })

    return [...new Set(education)].slice(0, 5)
}

// Extract certifications
function extractCertifications(text: string): string[] {
    const certifications: string[] = []

    const certMatch = text.match(/(?:Certifications?|Licenses?)\s*\n([\s\S]{20,2000}?)(?:\n\n|Honors|Awards|Honors-Awards|Publications?|Patents?|$)/i)
    if (!certMatch) return certifications

    const certSection = certMatch[1]
    const lines = certSection.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 5)

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
