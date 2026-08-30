import { GoogleGenerativeAI } from '@google/generative-ai'
import { ProfileData } from './types'

const apiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
    ? process.env.GEMINI_API_KEY
    : null

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

/**
 * AI-POWERED ANALYSIS ENGINE for LinkedIn Rank
 * 
 * Strict Anti-AI Writing Guidelines & Psychological Resonance Principles:
 * - High-signal, grounded, and human tone
 * - Explicit negative constraints against AI buzzwords, em dashes, and robotic formulas
 * - Plain "is" and "has" constructions
 * - Never fabricate achievements, metrics, or credentials not in the source profile
 * - Fair evaluation adapted to career stage (Student, Early-career, Mid-career, Senior/Executive)
 */

const SYSTEM_CONTEXT = `You are the LinkedIn profile analysis and evaluation engine for LinkedInRank.
You evaluate profiles with precision and write feedback that sounds like an expert human advisor, never AI.

CORE CONSTRAINTS & WRITING RULES:
- Only evaluate what exists in LinkedIn PDF exports (Name, Headline, About/Summary, Experience, Education, Skills, Certifications, Honors/Awards).
- NEVER penalize for data not found in PDFs (photos, banner, engagement, follower count, posting activity).
- Metrics and numbers are a bonus when available. Do not penalize students or early-career professionals for missing metrics.
- Tone: Professional, direct, human, grounded, credible, and non-judgmental. No hype, no cheerleading, no emojis.
- BANNED VOCABULARY (Never use these words): additionally, bolster, crucial, delve, emphasize, enhance, fostering, garner, highlight, intricate, intricacies, landscape, meticulous, pivotal, robust, showcase, tapestry, testament, underscore, valuable, vibrant, passionate, results-driven, team player, go-getter.
- SENTENCE RULES: Use plain "is" and "has". Do not use dangling "-ing" clauses. Do not force contrast ("not only X, but also Y"). Never use em dashes (—) or en dashes (–); use commas or periods instead.
- TRUTH INTEGRITY: Never invent achievements, metrics, degrees, or employers. Ground all suggestions in the user's actual profile context.
- Use concrete before/after examples quoting the user's actual words.`

const FALLBACK_MODELS = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-2.0-flash-lite',
    'gemini-3.1-flash-lite',
]

async function callGeminiJSON<T>(
    prompt: string,
    options: { temperature?: number; maxOutputTokens?: number } = {}
): Promise<T | null> {
    if (!genAI) return null

    const temperature = options.temperature ?? 0.2
    const maxOutputTokens = options.maxOutputTokens ?? 1000

    for (const modelName of FALLBACK_MODELS) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName })
            const result = await model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature,
                    maxOutputTokens,
                    responseMimeType: 'application/json',
                },
            })

            const text = result.response.text().trim()
            if (!text) continue

            try {
                return JSON.parse(text) as T
            } catch {
                const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim()
                const arrayMatch = cleaned.match(/\[[\s\S]*\]/)
                if (arrayMatch) {
                    return JSON.parse(arrayMatch[0]) as T
                }
                const objectMatch = cleaned.match(/\{[\s\S]*\}/)
                if (objectMatch) {
                    return JSON.parse(objectMatch[0]) as T
                }
            }
        } catch (err: any) {
            console.warn(`[AI Engine] Model ${modelName} failed:`, err?.message?.slice(0, 120))
            continue
        }
    }
    return null
}

interface HeadlineAnalysis {
    score: number
    verdict: 'weak' | 'average' | 'strong'
    issues: string[]
    improved_version: string
}

interface AboutAnalysis {
    score: number
    strengths: string[]
    issues: string[]
    improvement_tip: string
    weak_sentence?: string
    better_example: string
}

interface ExperienceAnalysis {
    score: number
    has_metrics: boolean
    issues: string[]
    improvement_tip: string
    weak_sentence?: string
    better_example: string
}

interface SkillsAnalysis {
    score: number
    issues: string[]
    missing_common_skills: string[]
    tip: string
}

interface ArchetypeDetection {
    archetype: string
    reason: string
}

interface RecommendationCard {
    title: string
    why_it_matters: string
    fix: string
    impact: 'High' | 'Medium' | 'Low'
    before?: string
    after?: string
}

// PROMPT 1: Headline Analysis
async function analyzeHeadline(name: string, headline: string, role: string, careerStage: string): Promise<HeadlineAnalysis | null> {
    if (!genAI || !headline) return null

    const prompt = `${SYSTEM_CONTEXT}

You are evaluating ${name}'s LinkedIn headline. Career stage: ${careerStage}.

Current headline: "${headline}"
Current/latest role: ${role}

Score 0-100 on these criteria (20 points total weight in final score):
- Role clarity: Does it state what they do?
- Keywords: Are searchable, industry-relevant terms present?
- Specificity: Is it differentiated, not generic?
- Positioning: Does it convey value or focus?

Full marks if: role + domain present, not generic, searchable keywords used.
Low marks if: "Student at XYZ" only, "Seeking opportunities", too vague.

Adapt expectations to ${careerStage} stage. A student headline like "CS Student | React Developer | Open Source Contributor" is strong for their stage.

CRITICAL for "improved_version":
1. Use ${name}'s actual role and context
2. Reference their specific field or industry
3. Keep under 120 characters
4. Must feel human and personal, not templated
5. No buzzwords, no emojis, no em dashes

Return ONLY valid JSON:
{
 "score": number,
 "verdict": "weak" | "average" | "strong",
 "issues": ["specific issue about THIS headline"],
 "improved_version": "personalized rewrite for ${name}"
}`

    return callGeminiJSON<HeadlineAnalysis>(prompt, { temperature: 0.2, maxOutputTokens: 500 })
}

// PROMPT 2: About Section Analysis
async function analyzeAbout(name: string, about: string, headline: string, careerStage: string): Promise<AboutAnalysis | null> {
    if (!genAI || !about) return null

    const prompt = `${SYSTEM_CONTEXT}

Evaluate ${name}'s LinkedIn About/Summary section. Career stage: ${careerStage}.

${name}'s headline: "${headline}"

${name}'s About section:
"${about.slice(0, 2000)}"

Score 0-100 on these criteria (20 points total weight in final score):
- Clarity: Does it explain what they do and their professional direction?
- Structure: Is it readable, well-organized with clean paragraphs?
- Skills mention: Are specific skills, tools, or domains referenced?
- Direction: Does it show what they focus on?
- Credibility: Does it feel authentic, not copied fluff?

High score if: shows expertise or direction, mentions skills/tools/domains, authentic voice.
Low score if: missing, 2-3 lines only, purely buzzwords.

For ${careerStage} stage, adjust expectations. A student's About showing clear interests and projects is strong.

CRITICAL for "better_example":
1. Reference ${name} by name or role
2. Use their actual skills/experience from the about section
3. Keep their authentic voice
4. 2-3 lines max
5. No generic cliches, no em dashes

Return ONLY JSON:
{
 "score": number,
 "strengths": ["what ${name} does well"],
 "issues": ["specific issues in their about section"],
 "improvement_tip": "personalized advice for ${name}",
 "weak_sentence": "One weak or generic sentence from their current about section",
 "better_example": "A short, punchy rewrite of that specific sentence"
}`

    return callGeminiJSON<AboutAnalysis>(prompt, { temperature: 0.2, maxOutputTokens: 700 })
}

// PROMPT 3: Experience Quality
async function analyzeExperience(name: string, latestRole: string, company: string, description: string, careerStage: string): Promise<ExperienceAnalysis | null> {
    if (!genAI || !description) return null

    const prompt = `${SYSTEM_CONTEXT}

Evaluate ${name}'s LinkedIn experience entry. Career stage: ${careerStage}.

Role: ${latestRole} at ${company}

Current description:
"${description.slice(0, 1500)}"

Score 0-100 on these criteria (25 points total weight in final score):
- Role descriptions: Are responsibilities and outcomes clear?
- Action verbs: Does it start with strong active verbs (Led, Built, Designed)?
- Impact shown: Are contributions and scope described?
- Quantification: Are there numbers? (BONUS, not strictly required)

IMPORTANT: Do not expect enterprise metrics from ${careerStage} professionals unless realistic. Students should not be penalized for fewer roles.

CRITICAL for "better_example":
1. Keep the same role (${latestRole}) and company (${company})
2. Use actual responsibilities from their description
3. Rewrite ONE specific bullet point or sentence, NOT the entire description
4. Add quantifiable metrics only if inferable from context
5. Never invent fake companies or data

Return ONLY JSON:
{
 "score": number,
 "has_metrics": true/false,
 "issues": ["specific issues in this description"],
 "improvement_tip": "advice specific to ${name}'s ${latestRole} role",
 "weak_sentence": "One specific sentence from their description that needs work",
 "better_example": "A single short, punchy bullet point replacing that weak sentence"
}`

    return callGeminiJSON<ExperienceAnalysis>(prompt, { temperature: 0.2, maxOutputTokens: 600 })
}

// PROMPT 4: Skills Relevance
async function analyzeSkills(name: string, role: string, skills: string[], careerStage: string): Promise<SkillsAnalysis | null> {
    if (!genAI || skills.length === 0) return null

    const prompt = `${SYSTEM_CONTEXT}

Evaluate ${name}'s LinkedIn skills section. Career stage: ${careerStage}.

${name}'s role: ${role}

${name}'s current skills:
${skills.join(', ')}

Score 0-100 on these criteria (15 points total weight in final score):
- Relevance to their role as ${role}
- Specificity: tools, technologies, and platforms vs generic terms

Note: LinkedIn PDFs only show top skills. Do not over-penalize for a small list.

CRITICAL:
- "missing_common_skills" must be specific to ${role}
- "tip" must reference ${name} by name and their specific role

Return ONLY JSON:
{
 "score": number,
 "issues": ["issues with ${name}'s skill list"],
 "missing_common_skills": ["skills relevant to ${role} that ${name} should add"],
 "tip": "personalized advice for ${name} as a ${role}"
}`

    return callGeminiJSON<SkillsAnalysis>(prompt, { temperature: 0.2, maxOutputTokens: 500 })
}

// PROMPT 5: Archetype Detection
async function detectArchetype(
    name: string,
    headline: string,
    about: string,
    experienceSummary: string,
    careerStage: string
): Promise<ArchetypeDetection | null> {
    if (!genAI) return null

    const prompt = `${SYSTEM_CONTEXT}

Based on ${name}'s LinkedIn profile, assign ONE archetype. Career stage: ${careerStage}.

Headline: ${headline}
About (partial): ${about.slice(0, 500)}
Experience: ${experienceSummary.slice(0, 500)}

Choose ONE archetype:
- Emerging Professional (beginning career journey, mostly education + internships)
- Developing Specialist (building focused expertise, 1-5 years)
- Multi-Potential Generalist (diverse skills across areas)
- Domain-Focused Operator (proven track record in a specific domain)
- Experienced Leader (12+ years, leadership roles)
- Academic / Research Profile (professor, researcher, publications)
- Founder / Builder Profile (entrepreneur, startup founder, CEO)

CRITICAL: The "reason" MUST:
1. Reference ${name} by name
2. Cite specific elements from their profile (headline, roles, skills)
3. Be 2-3 sentences explaining why this archetype fits
4. Be professional and human in tone

Return ONLY JSON:
{
 "archetype": "one of the 7 options above",
 "reason": "2-3 sentence explanation mentioning ${name} and their specific background"
}`

    return callGeminiJSON<ArchetypeDetection>(prompt, { temperature: 0.3, maxOutputTokens: 400 })
}

// PROMPT 6: Final Recommendation Cards
async function generateRecommendations(
    name: string,
    role: string,
    headlineScore: number,
    aboutScore: number,
    experienceScore: number,
    skillsScore: number,
    hasMetrics: boolean,
    skillsCount: number,
    careerStage: string,
    profileData?: {
        headline?: string
        about?: string
        experience?: any[]
        education?: any
        certifications?: string[]
        skills?: string[]
    }
): Promise<RecommendationCard[]> {
    if (!genAI) return []

    const experienceContext = profileData?.experience?.slice(0, 3).map(e =>
        `${e.title || 'Role'} at ${e.company || 'Company'}: ${(e.description || '').slice(0, 100)}`
    ).join('\n') || 'Not specified'

    const skillsList = profileData?.skills?.slice(0, 10).join(', ') || 'Not specified'
    const certsList = profileData?.certifications?.slice(0, 5).join(', ') || 'None listed'
    const headlineText = profileData?.headline || 'Not specified'
    const aboutSnippet = profileData?.about?.slice(0, 500) || 'Missing'

    const prompt = `${SYSTEM_CONTEXT}

You are evaluating ${name}'s LinkedIn profile and generating actionable improvement recommendations.

## ${name}'s Profile:
- Role: ${role}
- Headline: "${headlineText}"
- Career Stage: ${careerStage}
- Experience:
${experienceContext}
- Skills: ${skillsList}
- Certifications: ${certsList}
- About: "${aboutSnippet}"

## Current Section Scores (out of 100 each):
- Headline: ${headlineScore}
- About: ${aboutScore}
- Experience: ${experienceScore}
- Skills: ${skillsScore}

## RULES FOR RECOMMENDATIONS:
1. Address ${name} BY NAME in each recommendation title
2. Reference their SPECIFIC role as a ${role}
3. Adapt to ${careerStage} career stage | be fair, do not over-expect
4. Give ACTIONABLE advice they can implement TODAY
5. NEVER say "This is bad" | instead say "This could be stronger by..."
6. Metrics are a BONUS, not a requirement | do NOT penalize for missing numbers
7. "fix" MUST be concise (1-2 sentences max). Explain what to change. Do NOT include before/after examples inside the "fix" field!
8. ALWAYS use the separate "before" and "after" JSON fields for examples. The "after" should be a short, punchy rewrite of just one sentence or bullet point, NOT the entire profile section! Keep it small and valuable.
9. Focus on LOW-SCORING areas first
10. Be specific, practical, and non-judgmental | no generic advice
11. Use professional, calm tone | no emojis, no hype, no em dashes

Return EXACTLY 5 recommendations as JSON array:
[
 {
   "title": "Specific improvement for ${name}",
   "why_it_matters": "Why this matters for a ${role} at ${careerStage} stage (1 sentence max)",
   "fix": "Concise action step (1-2 sentences max). NO examples here.",
   "impact": "High" | "Medium" | "Low",
   "before": "One specific weak sentence from their profile",
   "after": "A short, punchy, high-value rewrite of that specific sentence"
 }
]`

    const result = await callGeminiJSON<RecommendationCard[]>(prompt, { temperature: 0.35, maxOutputTokens: 2000 })
    return result || []
}

// PROMPT 7: Headline Rewrites
async function generateHeadlineRewrites(
    name: string, role: string, currentHeadline: string, skills: string[], careerStage: string
): Promise<string[]> {
    if (!genAI || !currentHeadline) return []

    const topSkills = skills.slice(0, 5).join(', ')

    const prompt = `${SYSTEM_CONTEXT}

Generate exactly 3 improved LinkedIn headlines for ${name}. Career stage: ${careerStage}.

Current headline: "${currentHeadline}"
Role: ${role}
Key skills: ${topSkills}

Rules:
- Each headline must be under 120 characters
- Professional, human LinkedIn tone
- Include role + niche + value or unique angle
- No emojis, no hype language, no em dashes (use | or commas)
- Each should take a different angle (Value Proposition, Authority, Niche/Builder)
- Adapt to ${careerStage} stage

Return ONLY a JSON array of 3 strings, nothing else:
["headline 1", "headline 2", "headline 3"]`

    const result = await callGeminiJSON<string[]>(prompt, { temperature: 0.45, maxOutputTokens: 400 })
    return result || []
}

// Main AI Analysis Function - FULLY PERSONALIZED
export async function enhanceWithAI(profile: ProfileData, ruleBasedScores: any) {
    if (!genAI) {
        return {
            aiEnhanced: false,
            archetype: null,
            recommendations: [],
            headlineRewrites: []
        }
    }

    const name = profile.name || 'User'
    const headline = profile.headline || ''
    const role = (profile.experience[0]?.title || headline.split('|')[0] || 'Professional').trim()
    const latestExperience = profile.experience[0]

    // Detect career stage
    const careerStage = inferCareerStage(profile)

    try {
        const timeout = (ms: number) => new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), ms)
        )

        const [
            headlineAnalysis,
            aboutAnalysis,
            experienceAnalysis,
            skillsAnalysis,
            archetypeDetection,
        ] = await Promise.race([
            Promise.all([
                analyzeHeadline(name, headline, role, careerStage),
                analyzeAbout(name, profile.about || '', headline, careerStage),
                analyzeExperience(
                    name,
                    latestExperience?.title || role,
                    latestExperience?.company || 'Company',
                    latestExperience?.description || '',
                    careerStage
                ),
                analyzeSkills(name, role, profile.skills, careerStage),
                detectArchetype(
                    name,
                    headline,
                    profile.about || '',
                    profile.experience.map(e => `${e.title} at ${e.company}`).join('. '),
                    careerStage
                ),
            ]),
            timeout(15000) // 15 second timeout for all AI calls
        ]) as any

        // Generate final recommendations with full profile context
        const recommendations = await generateRecommendations(
            name,
            role,
            headlineAnalysis?.score || ruleBasedScores.headline || 50,
            aboutAnalysis?.score || ruleBasedScores.about || 50,
            experienceAnalysis?.score || ruleBasedScores.experience || 50,
            skillsAnalysis?.score || ruleBasedScores.skills || 50,
            experienceAnalysis?.has_metrics || false,
            profile.skills.length,
            careerStage,
            {
                headline: profile.headline,
                about: profile.about,
                experience: profile.experience,
                education: profile.education,
                certifications: profile.certifications,
                skills: profile.skills
            }
        )

        // Build personalized recommendations
        const aiRecommendations = []

        // Use AI-generated improved versions for weak sections
        if (headlineAnalysis && headlineAnalysis.score < 75) {
            aiRecommendations.push({
                title: `${name}, your headline could be stronger`,
                whyItMatters: headlineAnalysis.issues.join('. '),
                fix: `Try this instead: "${headlineAnalysis.improved_version}"`,
                impact: 'High' as const
            })
        }

        if (aboutAnalysis && aboutAnalysis.score < 75) {
            aiRecommendations.push({
                title: aboutAnalysis.issues[0] || `${name}, strengthen your About section`,
                whyItMatters: aboutAnalysis.improvement_tip,
                fix: `Here is a stronger way to frame your experience.`,
                before: aboutAnalysis.weak_sentence || undefined,
                after: aboutAnalysis.better_example || undefined,
                impact: 'High' as const
            })
        }

        if (experienceAnalysis && !experienceAnalysis.has_metrics) {
            aiRecommendations.push({
                title: `${name}, add specifics to your experience`,
                whyItMatters: experienceAnalysis.improvement_tip,
                fix: `For your ${latestExperience?.title || role} role, replace general responsibilities with specific, quantifiable achievements.`,
                before: experienceAnalysis.weak_sentence || undefined,
                after: experienceAnalysis.better_example || undefined,
                impact: 'High' as const
            })
        }

        // Add AI-generated recommendations with before/after
        recommendations.forEach((rec: RecommendationCard) => {
            aiRecommendations.push({
                title: rec.title,
                whyItMatters: rec.why_it_matters,
                fix: rec.fix,
                impact: rec.impact,
                before: rec.before,
                after: rec.after
            })
        })

        // Generate headline rewrites
        const headlineRewrites = await generateHeadlineRewrites(
            name, role, headline, profile.skills, careerStage
        ).catch(() => [] as string[])

        return {
            aiEnhanced: true,
            archetype: archetypeDetection ? {
                label: archetypeDetection.archetype,
                description: archetypeDetection.reason
            } : null,
            recommendations: aiRecommendations.slice(0, 5),
            headlineRewrites
        }
    } catch (error) {
        return {
            aiEnhanced: false,
            archetype: null,
            recommendations: [],
            headlineRewrites: []
        }
    }
}

// Career stage inference (mirrors scoringEngine detectCareerStage logic)
function inferCareerStage(profile: ProfileData): string {
    const headline = (profile.headline || '').toLowerCase()
    const expCount = profile.experience?.length || 0
    const allTitles = profile.experience?.map(e => (e.title || '').toLowerCase()).join(' ') || ''
    const allDurations = profile.experience?.map(e => (e.duration || '').toLowerCase()).join(' ') || ''

    // Student signals | exclude compound titles like "Student Ambassador"
    const studentKeywords = /\b(fresher|intern\b|undergraduate|pursuing|aspiring|trainee|apprentice)\b/
    const studentStandalone = /\bstudent\b/
    const studentExclusions = /\b(ambassador|leader|mentor|volunteer|fellow|researcher|organizer|chapter)\b/
    
    const isStudentHeadline = (studentKeywords.test(headline) || 
        (studentStandalone.test(headline) && !studentExclusions.test(headline)))
    const isStudentTitle = expCount <= 1 && (studentKeywords.test(allTitles) ||
        (studentStandalone.test(allTitles) && !studentExclusions.test(allTitles)))
    
    if (isStudentHeadline || isStudentTitle) return 'student'

    // Estimate career span from year ranges in durations
    let estimatedYears = 0
    const allDurationText = allDurations + ' ' + profile.experience?.map(e => (e.duration || '')).join(' ')
    const yearRangePattern = /(\d{4})\s*[-–|]\s*(present|\d{4})/gi
    let match
    let earliestYear = 9999
    let latestYear = new Date().getFullYear()
    let foundYearRange = false
    while ((match = yearRangePattern.exec(allDurationText)) !== null) {
        const startYear = parseInt(match[1])
        const endYear = match[2].toLowerCase() === 'present' ? new Date().getFullYear() : parseInt(match[2])
        if (startYear >= 1970 && startYear <= latestYear) { earliestYear = Math.min(earliestYear, startYear); foundYearRange = true }
        if (endYear >= 1970) latestYear = Math.max(latestYear, endYear)
    }
    if (foundYearRange && earliestYear < 9999) {
        estimatedYears = latestYear - earliestYear
    } else if (estimatedYears === 0) {
        estimatedYears = Math.round(expCount * 1.5)
    }

    const seniorKeywords = /\b(founder|co-founder|ceo|cto|coo|cfo|vp|vice president|director|head of|principal|professor|senior director|managing director|partner|chief)\b/
    if (seniorKeywords.test(headline) || seniorKeywords.test(allTitles) || estimatedYears >= 12) return 'senior'
    if (estimatedYears >= 5 || expCount >= 4) return 'mid-career'
    if (expCount >= 1) return 'early-career'
    return 'student'
}
