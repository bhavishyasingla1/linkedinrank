import { GoogleGenerativeAI } from '@google/generative-ai'
import { ProfileData } from './types'

const genAI = process.env.GEMINI_API_KEY
    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    : null

/**
 * AI-POWERED ANALYSIS ENGINE for LinkedIn Rank
 * 
 * PHILOSOPHY:
 * - You are a profile evaluator, NOT a chatbot
 * - Output must be: structured, fair, data-backed, personalized, actionable
 * - Transparent in scoring, not generic, not motivational fluff
 * - NEVER punish users for data LinkedIn PDFs do not include
 * - Adapt feedback to career stage: Student, Early-career, Mid-career, Senior/Founder/Academic
 * - Tone: Professional, calm, credible, helpful, non-judgmental, no emojis, no exaggeration
 */

const SYSTEM_CONTEXT = `You are the analysis engine behind LinkedIn Rank | a profile evaluator, not a chatbot.

CONSTRAINTS:
- Only judge what exists in LinkedIn PDFs (name, headline, summary, experience, education, top skills, certifications, languages, publications, patents, honors-awards)
- NEVER penalize for missing: profile picture, banner, engagement, followers, posting frequency
- Metrics and numbers are a BONUS, not a requirement
- Be fair to students and early-career professionals
- Tone: professional, calm, credible, helpful, non-judgmental. No emojis. No exaggeration.
- All suggestions must be SPECIFIC and PERSONALIZED | never generic advice
- Use BEFORE/AFTER examples when suggesting improvements`

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
    better_example: string
}

interface ExperienceAnalysis {
    score: number
    has_metrics: boolean
    issues: string[]
    improvement_tip: string
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

// PROMPT 1: Headline Analysis - PERSONALIZED
async function analyzeHeadline(name: string, headline: string, role: string, careerStage: string): Promise<HeadlineAnalysis | null> {
    if (!genAI || !headline) return null

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const prompt = `${SYSTEM_CONTEXT}

You are evaluating ${name}'s LinkedIn headline. Their career stage: ${careerStage}.

Current headline: "${headline}"
Current/latest role: ${role}

Score 0-100 on these criteria (20 points total weight in final score):
- Role clarity: Does it state what they do?
- Keywords: Are searchable, industry-relevant terms present?
- Specificity: Is it differentiated, not generic?
- Positioning: Does it convey value or expertise?

Full marks if: role + domain present, not generic, searchable keywords used.
Low marks if: "Student at XYZ" only, "Seeking opportunities", too vague.

Adapt expectations to ${careerStage} stage | a student headline like "CS Student | React Developer | Open Source Contributor" is strong for their stage.

CRITICAL for "improved_version":
1. Use ${name}'s actual role and context
2. Reference their specific field/industry
3. Under 120 characters
4. Must feel personal, not templated

Return ONLY valid JSON:
{
 "score": number,
 "verdict": "weak" | "average" | "strong",
 "issues": ["specific issue about THIS headline"],
 "improved_version": "personalized rewrite for ${name}"
}`

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 500,
                topP: 1,
            },
        })

        const response = result.response.text()
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0])
        }
        return null
    } catch (error) {
        console.error("Headline analysis error:")
        return null
    }
}

// PROMPT 2: About Section Analysis - PERSONALIZED
async function analyzeAbout(name: string, about: string, headline: string, careerStage: string): Promise<AboutAnalysis | null> {
    if (!genAI || !about) return null

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const prompt = `${SYSTEM_CONTEXT}

Evaluate ${name}'s LinkedIn About/Summary section. Career stage: ${careerStage}.

${name}'s headline: "${headline}"

${name}'s About section:
"${about.slice(0, 2000)}"

Score 0-100 on these criteria (20 points total weight in final score):
- Clarity: Does it explain what they do and their professional direction?
- Structure: Is it readable, well-organized?
- Skills mention: Are specific skills, tools, or domains referenced?
- Direction: Does it show where they're headed or what they focus on?
- Credibility: Does it feel authentic, not copied fluff?

High score if: shows expertise or direction, mentions skills/tools/domains, not copied fluff.
Low score if: missing, 2-3 lines only, purely emotional language.

For ${careerStage} stage, adjust expectations | a student's About showing clear interests and skills is strong.

CRITICAL for "better_example":
1. Reference ${name} BY NAME
2. Use THEIR actual skills/experience from the about section
3. Keep their authentic voice
4. 3-4 lines max
5. Must feel like THEIR profile, not a template

Return ONLY JSON:
{
 "score": number,
 "strengths": ["what ${name} does well"],
 "issues": ["specific issues in THEIR about section"],
 "improvement_tip": "personalized advice for ${name}",
 "better_example": "improved version using ${name}'s ACTUAL content"
}`

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 700,
                topP: 1,
            },
        })

        const response = result.response.text()
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0])
        }
        return null
    } catch (error) {
        console.error("About analysis error:")
        return null
    }
}

// PROMPT 3: Experience Quality - PERSONALIZED
async function analyzeExperience(name: string, latestRole: string, company: string, description: string, careerStage: string): Promise<ExperienceAnalysis | null> {
    if (!genAI || !description) return null

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const prompt = `${SYSTEM_CONTEXT}

Evaluate ${name}'s LinkedIn experience entry. Career stage: ${careerStage}.

Role: ${latestRole} at ${company}

Current description:
"${description.slice(0, 1500)}"

Score 0-100 on these criteria (25 points total weight in final score):
- Number of roles relative to career stage
- Role descriptions: Are responsibilities clear?
- Action verbs: Does it start with strong verbs (Led, Built, Managed)?
- Impact shown: Are contributions and outcomes described?
- Quantification: Are there numbers? (BONUS, not required)

High score if: responsibilities + outcomes shown, some metrics present.
Low score if: only job titles, no description.

IMPORTANT: Do NOT expect metrics from ${careerStage} professionals unless realistic. Students should NOT be penalized for fewer roles.

CRITICAL for "better_example":
1. Keep the same role (${latestRole}) and company (${company})
2. Use ACTUAL responsibilities from their description
3. Add quantifiable metrics only IF inferable from context
4. Write as BEFORE/AFTER | show what they wrote vs what's better
5. NOT a generic template

Return ONLY JSON:
{
 "score": number,
 "has_metrics": true/false,
 "issues": ["specific issues in THIS description"],
 "improvement_tip": "advice specific to ${name}'s ${latestRole} role",
 "better_example": "improved version using ${name}'s ACTUAL work at ${company}"
}`

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 600,
                topP: 1,
            },
        })

        const response = result.response.text()
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0])
        }
        return null
    } catch (error) {
        console.error("Experience analysis error:")
        return null
    }
}

// PROMPT 4: Skills Relevance - PERSONALIZED
async function analyzeSkills(name: string, role: string, skills: string[], careerStage: string): Promise<SkillsAnalysis | null> {
    if (!genAI || skills.length === 0) return null

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const prompt = `${SYSTEM_CONTEXT}

Evaluate ${name}'s LinkedIn skills section. Career stage: ${careerStage}.

${name}'s role: ${role}

${name}'s current skills:
${skills.join(', ')}

Score 0-100 on these criteria (15 points total weight in final score):
- Enough skills listed for their career stage
- Relevance to their role as ${role}
- Specificity: tools/platforms vs generic terms

High score if: domain-specific skills, tools/platforms included.
Low score if: very few skills, generic skills only.

Note: LinkedIn PDFs only show top skills. Do not over-penalize for a small list.

CRITICAL:
- "missing_common_skills" must be SPECIFIC to ${role} | not generic
- "tip" must reference ${name} by name and their specific role

Return ONLY JSON:
{
 "score": number,
 "issues": ["issues with ${name}'s skill list"],
 "missing_common_skills": ["skills relevant to ${role} that ${name} should add"],
 "tip": "personalized advice for ${name} as a ${role}"
}`

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 500,
                topP: 1,
            },
        })

        const response = result.response.text()
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0])
        }
        return null
    } catch (error) {
        console.error("Skills analysis error:")
        return null
    }
}

// PROMPT 5: Archetype Detection - PERSONALIZED
async function detectArchetype(
    name: string,
    headline: string,
    about: string,
    experienceSummary: string,
    careerStage: string
): Promise<ArchetypeDetection | null> {
    if (!genAI) return null

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

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
1. Reference ${name} BY NAME
2. Cite specific elements from THEIR profile (headline, roles, skills)
3. Be 2-3 sentences explaining WHY this archetype fits
4. Be professional and non-judgmental in tone

Return ONLY JSON:
{
 "archetype": "one of the 7 options above",
 "reason": "2-3 sentence explanation mentioning ${name} and their specific background"
}`

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 400,
                topP: 1,
            },
        })

        const response = result.response.text()
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0])
        }
        return null
    } catch (error) {
        console.error("Archetype detection error:")
        return null
    }
}

// PROMPT 6: Final Recommendation Cards - HIGHLY PERSONALIZED
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
        headline?: string,
        about?: string,
        experience?: any[],
        education?: any,
        certifications?: string[],
        skills?: string[]
    }
): Promise<RecommendationCard[]> {
    if (!genAI) return []

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        // Build rich profile context
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
7. Each "fix" must be a specific action with example text they can copy-paste
8. Include a "before" (from their actual profile) and "after" (improved rewrite) for each
9. Focus on LOW-SCORING areas first
10. Be specific, practical, and non-judgmental | no generic advice
11. Use professional, calm tone | no emojis, no hype

Return EXACTLY 5 recommendations as JSON array:
[
 {
   "title": "Specific improvement for ${name}",
   "why_it_matters": "Why this matters for a ${role} at ${careerStage} stage",
   "fix": "Exact action step with copy-paste example",
   "impact": "High" | "Medium" | "Low",
   "before": "Current text from their profile",
   "after": "Improved rewrite ${name} can copy-paste"
 }
]`

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 2000,
                topP: 1,
            },
        })

        const response = result.response.text()
        const jsonMatch = response.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0])
        }
        return []
    } catch (error) {
        console.error("Recommendations generation error:")
        return []
    }
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
                fix: aboutAnalysis.better_example,
                impact: 'High' as const
            })
        }

        if (experienceAnalysis && !experienceAnalysis.has_metrics) {
            aiRecommendations.push({
                title: `${name}, add specifics to your experience`,
                whyItMatters: experienceAnalysis.improvement_tip,
                fix: `For your ${latestExperience?.title || role} role: ${experienceAnalysis.better_example}`,
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

// HEADLINE REWRITER: Generate 3 copy-paste-ready headline rewrites
async function generateHeadlineRewrites(
    name: string, role: string, currentHeadline: string, skills: string[], careerStage: string
): Promise<string[]> {
    if (!genAI || !currentHeadline) return []

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
        const topSkills = skills.slice(0, 5).join(', ')

        const prompt = `${SYSTEM_CONTEXT}

Generate exactly 3 improved LinkedIn headlines for ${name}. Career stage: ${careerStage}.

Current headline: "${currentHeadline}"
Role: ${role}
Key skills: ${topSkills}

Rules:
- Each headline must be under 120 characters
- Professional, LinkedIn-appropriate tone
- Include role + niche + value or unique angle
- No emojis, no hype language
- Each should take a different angle (authority, value prop, niche)
- Adapt to ${careerStage} stage | a student headline should reflect growth, not fake seniority

Return ONLY a JSON array of 3 strings, nothing else:
["headline 1", "headline 2", "headline 3"]`

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.5,
                maxOutputTokens: 300,
            },
        })

        const text = result.response.text()
        const jsonMatch = text.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0])
        }
        return []
    } catch {
        return []
    }
}
