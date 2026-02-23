/**
 * DETERMINISTIC SCORING ENGINE v2.0
 * 
 * Server-side only. Identical input → identical score.
 * 
 * Point Allocation (Total = 100):
 * - Headline: 25 pts max
 * - About: 20 pts max
 * - Experience: 25 pts max
 * - Skills: 15 pts max
 * - Education & Certifications: 10 pts max
 * - Completeness: 5 pts max
 */

import { ProfileData, ExperienceItem } from './types'
import { ParseConfidence } from './pdfParser'

export const SCORING_VERSION = 'v2.1.0'

// ============================================================
// TYPES
// ============================================================

export interface ScoringCheck {
    name: string
    ok: boolean
    points: number
    max_points: number
}

export interface SectionBreakdown {
    score: number
    max: number
    checks: ScoringCheck[]
}

export interface DeterministicScoreResult {
    score: number
    tier: 'platinum' | 'gold' | 'silver' | 'bronze'
    breakdown: {
        headline: SectionBreakdown
        about: SectionBreakdown
        experience: SectionBreakdown
        skills: SectionBreakdown
        education: SectionBreakdown
        completeness: SectionBreakdown
    }
    fixes: FixSuggestion[]
}

export interface FixSuggestion {
    section: string
    fix: string
    impact_pts: number
}

// ============================================================
// KEYWORD LISTS
// ============================================================

const ACTION_VERBS = [
    'led', 'managed', 'created', 'developed', 'launched', 'scaled', 'grew',
    'increased', 'decreased', 'improved', 'optimized', 'built', 'designed',
    'delivered', 'achieved', 'generated', 'drove', 'spearheaded', 'pioneered',
    'transformed', 'directed', 'established', 'implemented', 'coordinated',
    'executed', 'orchestrated', 'streamlined', 'accelerated', 'architected',
    'automated', 'championed', 'consolidated', 'cultivated', 'doubled',
    'tripled', 'expanded', 'facilitated', 'founded', 'hired', 'influenced',
    'initiated', 'integrated', 'mentored', 'modernized', 'negotiated',
    'overhauled', 'produced', 'reduced', 'revamped', 'saved', 'secured'
]

const INDUSTRY_KEYWORDS = [
    'tech', 'software', 'engineering', 'data', 'ai', 'machine learning',
    'cloud', 'devops', 'security', 'product', 'design', 'ux', 'ui',
    'marketing', 'sales', 'finance', 'consulting', 'healthcare', 'education',
    'legal', 'hr', 'operations', 'supply chain', 'logistics', 'retail',
    'ecommerce', 'saas', 'b2b', 'b2c', 'startup', 'enterprise', 'analytics',
    'digital', 'mobile', 'web', 'frontend', 'backend', 'fullstack'
]

const RECOGNIZED_CERTIFICATIONS = [
    'pmp', 'cissp', 'aws', 'azure', 'gcp', 'google', 'microsoft', 'cisco',
    'comptia', 'oracle', 'salesforce', 'scrum', 'agile', 'cpa', 'cfa',
    'cfp', 'six sigma', 'itil', 'prince2', 'togaf', 'capm', 'csm', 'safe'
]

// ============================================================
// MAIN SCORING FUNCTION
// ============================================================

export function computeDeterministicScore(
    profile: ProfileData,
    parseConfidence?: ParseConfidence,
    profileGoalMode: 'profile_only' | 'current_role' | 'career_switch' | 'freelance' | 'personal_brand' = 'profile_only'
): DeterministicScoreResult {
    
    // Score each section
    const headlineBreakdown = scoreHeadline(profile.headline, parseConfidence?.headline)
    const aboutBreakdown = scoreAbout(profile.about, profile.headline, parseConfidence?.about)
    const experienceBreakdown = scoreExperience(profile.experience, parseConfidence?.experience)
    const skillsBreakdown = scoreSkills(profile.skills, profile.headline, profileGoalMode, parseConfidence?.skills)
    const educationBreakdown = scoreEducation(profile.education, profile.certifications, parseConfidence?.education)
    const completenessBreakdown = scoreCompleteness(profile)
    
    // Sum total score
    const totalScore = 
        headlineBreakdown.score +
        aboutBreakdown.score +
        experienceBreakdown.score +
        skillsBreakdown.score +
        educationBreakdown.score +
        completenessBreakdown.score
    
    // Determine tier
    const tier = getTier(totalScore)
    
    // Generate fix suggestions
    const fixes = generateFixes({
        headline: headlineBreakdown,
        about: aboutBreakdown,
        experience: experienceBreakdown,
        skills: skillsBreakdown,
        education: educationBreakdown,
        completeness: completenessBreakdown
    })
    
    return {
        score: totalScore,
        tier,
        breakdown: {
            headline: headlineBreakdown,
            about: aboutBreakdown,
            experience: experienceBreakdown,
            skills: skillsBreakdown,
            education: educationBreakdown,
            completeness: completenessBreakdown
        },
        fixes
    }
}

// ============================================================
// HEADLINE SCORING (max 25)
// ============================================================
// - keywords_present (>=2): +12
// - value_proposition: +5
// - metrics_or_proof: +3
// - clarity/length: +3
// - specificity mention: +2

function scoreHeadline(headline: string | undefined, confidence?: number): SectionBreakdown {
    const checks: ScoringCheck[] = []
    let rawScore = 0
    const MAX = 25
    
    if (!headline || headline.trim().length < 3) {
        return {
            score: 0,
            max: MAX,
            checks: [{ name: 'headline_present', ok: false, points: 0, max_points: MAX }]
        }
    }
    
    const lower = headline.toLowerCase()
    
    // Check 1: Keywords present (>=2 industry keywords) → +12
    const keywordsFound = INDUSTRY_KEYWORDS.filter(kw => lower.includes(kw)).length
    const keywordsOk = keywordsFound >= 2
    const keywordsPoints = keywordsOk ? 12 : Math.min(keywordsFound * 6, 12)
    checks.push({ name: 'keywords', ok: keywordsOk, points: keywordsPoints, max_points: 12 })
    rawScore += keywordsPoints
    
    // Check 2: Value proposition (helping, building, enabling, driving) → +5
    const valuePatterns = /(help|build|driv|enabl|grow|scal|transform|creat|deliver|solv)/i
    const valueOk = valuePatterns.test(headline)
    const valuePoints = valueOk ? 5 : 0
    checks.push({ name: 'value_proposition', ok: valueOk, points: valuePoints, max_points: 5 })
    rawScore += valuePoints
    
    // Check 3: Metrics or proof (numbers, achievements) → +3
    const metricsPattern = /\d+[kKmM%]?|\b\d+\s*(years?|yrs?|clients?|users?|projects?|companies)/i
    const metricsOk = metricsPattern.test(headline)
    const metricsPoints = metricsOk ? 3 : 0
    checks.push({ name: 'metrics_or_proof', ok: metricsOk, points: metricsPoints, max_points: 3 })
    rawScore += metricsPoints
    
    // Check 4: Clarity/length (20-120 chars optimal) → +3
    const len = headline.trim().length
    const clarityOk = len >= 20 && len <= 120
    const clarityPoints = clarityOk ? 3 : (len >= 10 ? 1 : 0)
    checks.push({ name: 'clarity_length', ok: clarityOk, points: clarityPoints, max_points: 3 })
    rawScore += clarityPoints
    
    // Check 5: Specificity (| separator, niche mention, role + domain) → +2
    const hasSpecificity = headline.includes('|') || headline.includes('·') || 
        /\bat\b|\bfor\b|\bspecializ/i.test(headline)
    const specificityPoints = hasSpecificity ? 2 : 0
    checks.push({ name: 'specificity', ok: hasSpecificity, points: specificityPoints, max_points: 2 })
    rawScore += specificityPoints
    
    // Apply parse confidence penalty if needed
    const finalScore = applyConfidencePenalty(rawScore, confidence)
    
    return { score: Math.min(finalScore, MAX), max: MAX, checks }
}

// ============================================================
// ABOUT SCORING (max 20)
// ============================================================
// - hook_present: +4
// - structured_paragraphs: +3
// - value_and_results mention: +4
// - keyword_overlap_with_headline: +4
// - CTA_present: +2
// - first_person_personality: +3

function scoreAbout(about: string | undefined, headline: string | undefined, confidence?: number): SectionBreakdown {
    const checks: ScoringCheck[] = []
    let rawScore = 0
    const MAX = 20
    
    if (!about || about.trim().length < 20) {
        return {
            score: 0,
            max: MAX,
            checks: [{ name: 'about_present', ok: false, points: 0, max_points: MAX }]
        }
    }
    
    const lower = about.toLowerCase()
    const sentences = about.split(/[.!?]+/).filter(s => s.trim().length > 10)
    
    // Check 1: Hook present (engaging first sentence, question, or statement) → +4
    const firstSentence = sentences[0] || ''
    const hasHook = firstSentence.length > 30 || /\?|!|passionate|driven|dedicated|love|excited/i.test(firstSentence)
    const hookPoints = hasHook ? 4 : (firstSentence.length > 15 ? 2 : 0)
    checks.push({ name: 'hook_present', ok: hasHook, points: hookPoints, max_points: 4 })
    rawScore += hookPoints
    
    // Check 2: Structured paragraphs (multiple sentences, clear structure) → +3
    const hasStructure = sentences.length >= 3 || about.includes('\n\n')
    const structurePoints = hasStructure ? 3 : (sentences.length >= 2 ? 1 : 0)
    checks.push({ name: 'structured_paragraphs', ok: hasStructure, points: structurePoints, max_points: 3 })
    rawScore += structurePoints
    
    // Check 3: Value and results mention → +4
    const valuePattern = /(result|impact|achiev|success|deliver|grew|increas|improv|built|launch|led|manag|creat|develop|transform)/i
    const hasValue = valuePattern.test(about)
    const valuePoints = hasValue ? 4 : 0
    checks.push({ name: 'value_and_results', ok: hasValue, points: valuePoints, max_points: 4 })
    rawScore += valuePoints
    
    // Check 4: Keyword overlap with headline → +4
    let keywordOverlap = 0
    if (headline) {
        const headlineWords = headline.toLowerCase().split(/\W+/).filter(w => w.length > 3)
        keywordOverlap = headlineWords.filter(w => lower.includes(w)).length
    }
    const overlapOk = keywordOverlap >= 2
    const overlapPoints = overlapOk ? 4 : Math.min(keywordOverlap * 2, 4)
    checks.push({ name: 'keyword_overlap', ok: overlapOk, points: overlapPoints, max_points: 4 })
    rawScore += overlapPoints
    
    // Check 5: CTA present (reach out, connect, contact, email, message) → +2
    const ctaPattern = /(reach out|connect|contact|email|message|let'?s talk|get in touch|dm|feel free)/i
    const hasCta = ctaPattern.test(about)
    const ctaPoints = hasCta ? 2 : 0
    checks.push({ name: 'cta_present', ok: hasCta, points: ctaPoints, max_points: 2 })
    rawScore += ctaPoints
    
    // Check 6: First person personality (I, my, me) → +3
    const firstPersonPattern = /\b(i |i'm|i've|my |me |i\b)/i
    const hasFirstPerson = firstPersonPattern.test(about)
    const personalityPoints = hasFirstPerson ? 3 : 0
    checks.push({ name: 'first_person_personality', ok: hasFirstPerson, points: personalityPoints, max_points: 3 })
    rawScore += personalityPoints
    
    // Apply confidence penalty
    const finalScore = applyConfidencePenalty(rawScore, confidence)
    
    return { score: Math.min(finalScore, MAX), max: MAX, checks }
}

// ============================================================
// EXPERIENCE SCORING (max 25)
// ============================================================
// - percent_bullets_with_action_verbs >= 60%: +7
// - bullets_with_metrics >= 30%: +7
// - XYZ formula presence in any bullet: +5
// - specificity/tools/tech mention: +3
// - proper bullet formatting: +3

function scoreExperience(experience: ExperienceItem[] | undefined, confidence?: number): SectionBreakdown {
    const checks: ScoringCheck[] = []
    let rawScore = 0
    const MAX = 25
    
    if (!experience || experience.length === 0) {
        return {
            score: 0,
            max: MAX,
            checks: [{ name: 'experience_present', ok: false, points: 0, max_points: MAX }]
        }
    }
    
    // Collect all description text and bullets
    const allDescriptions = experience.map(e => e.description || '').join(' ')
    const bullets = allDescriptions.split(/[•\-\n]/).filter(b => b.trim().length > 10)
    const bulletCount = Math.max(bullets.length, 1)
    
    // Check 1: Action verbs in bullets (>=60% → +7) 
    const bulletsWithActionVerbs = bullets.filter(b => {
        const lower = b.toLowerCase()
        return ACTION_VERBS.some(verb => {
            const regex = new RegExp(`\\b${verb}`, 'i')
            return regex.test(lower)
        })
    }).length
    const actionVerbPercent = (bulletsWithActionVerbs / bulletCount) * 100
    const actionVerbOk = actionVerbPercent >= 60
    const actionVerbPoints = actionVerbOk ? 7 : Math.floor((actionVerbPercent / 60) * 7)
    checks.push({ name: 'action_verbs_60pct', ok: actionVerbOk, points: actionVerbPoints, max_points: 7 })
    rawScore += actionVerbPoints
    
    // Check 2: Metrics in bullets (>=30% → +7)
    const metricsPattern = /\d+\s*%|\d+[kKmM]|\$\d+|\d+\s*(times|x|users?|clients?|projects?|team|people|revenue|growth)/i
    const bulletsWithMetrics = bullets.filter(b => metricsPattern.test(b)).length
    const metricsPercent = (bulletsWithMetrics / bulletCount) * 100
    const metricsOk = metricsPercent >= 30
    const metricsPoints = metricsOk ? 7 : Math.floor((metricsPercent / 30) * 7)
    checks.push({ name: 'metrics_30pct', ok: metricsOk, points: metricsPoints, max_points: 7 })
    rawScore += metricsPoints
    
    // Check 3: XYZ formula (Accomplished X, as measured by Y, by doing Z) → +5
    const xyzPattern = /(by|through|via|resulting in|leading to|which|that)\s+\w+.*(by|using|with|through)/i
    const hasXyz = bullets.some(b => xyzPattern.test(b)) || 
        bullets.some(b => metricsPattern.test(b) && ACTION_VERBS.some(v => b.toLowerCase().includes(v)))
    const xyzPoints = hasXyz ? 5 : 0
    checks.push({ name: 'xyz_formula', ok: hasXyz, points: xyzPoints, max_points: 5 })
    rawScore += xyzPoints
    
    // Check 4: Specificity/tools/tech mention → +3
    const techPattern = /(python|java|javascript|react|angular|vue|node|aws|azure|gcp|sql|kubernetes|docker|terraform|figma|tableau|salesforce|hubspot|jira|git|agile|scrum)/i
    const hasTools = techPattern.test(allDescriptions)
    const toolsPoints = hasTools ? 3 : 0
    checks.push({ name: 'tools_tech_mention', ok: hasTools, points: toolsPoints, max_points: 3 })
    rawScore += toolsPoints
    
    // Check 5: Proper bullet formatting → +3
    const hasBullets = /[•\-\*]/.test(allDescriptions) || bullets.length >= 3
    const bulletPoints = hasBullets ? 3 : (bullets.length >= 1 ? 1 : 0)
    checks.push({ name: 'bullet_formatting', ok: hasBullets, points: bulletPoints, max_points: 3 })
    rawScore += bulletPoints
    
    // Apply confidence penalty
    const finalScore = applyConfidencePenalty(rawScore, confidence)
    
    return { score: Math.min(finalScore, MAX), max: MAX, checks }
}

// ============================================================
// SKILLS SCORING (max 15)
// ============================================================
// - count >= 10: +6
// - top3 match headline keywords: +5
// - relevance vs profile_goal_mode: +4

function scoreSkills(
    skills: string[] | undefined, 
    headline: string | undefined,
    profileGoalMode: string,
    confidence?: number
): SectionBreakdown {
    const checks: ScoringCheck[] = []
    let rawScore = 0
    const MAX = 15
    
    if (!skills || skills.length === 0) {
        return {
            score: 0,
            max: MAX,
            checks: [{ name: 'skills_present', ok: false, points: 0, max_points: MAX }]
        }
    }
    
    // Check 1: Count >= 10 → +6
    const countOk = skills.length >= 10
    const countPoints = countOk ? 6 : Math.floor((skills.length / 10) * 6)
    checks.push({ name: 'skill_count_10', ok: countOk, points: countPoints, max_points: 6 })
    rawScore += countPoints
    
    // Check 2: Top 3 match headline keywords → +5
    let headlineMatches = 0
    if (headline) {
        const headlineWords = headline.toLowerCase().split(/\W+/).filter(w => w.length > 3)
        const topSkills = skills.slice(0, 3).map(s => s.toLowerCase())
        headlineMatches = topSkills.filter(skill => 
            headlineWords.some(word => skill.includes(word) || word.includes(skill))
        ).length
    }
    const matchOk = headlineMatches >= 2
    const matchPoints = matchOk ? 5 : Math.floor((headlineMatches / 2) * 5)
    checks.push({ name: 'top3_headline_match', ok: matchOk, points: matchPoints, max_points: 5 })
    rawScore += matchPoints
    
    // Check 3: Relevance to profile goal mode → +4
    // In profile_only mode, just check if skills are professional
    const professionalSkills = skills.filter(s => 
        INDUSTRY_KEYWORDS.some(kw => s.toLowerCase().includes(kw)) ||
        /programming|management|analysis|design|development|strategy|communication|leadership/i.test(s)
    ).length
    const relevanceOk = professionalSkills >= 3
    const relevancePoints = relevanceOk ? 4 : Math.floor((professionalSkills / 3) * 4)
    checks.push({ name: 'relevance', ok: relevanceOk, points: relevancePoints, max_points: 4 })
    rawScore += relevancePoints
    
    // Apply confidence penalty
    const finalScore = applyConfidencePenalty(rawScore, confidence)
    
    return { score: Math.min(finalScore, MAX), max: MAX, checks }
}

// ============================================================
// EDUCATION & CERTIFICATIONS SCORING (max 10)
// ============================================================
// - education_present: +3
// - completeness (dates/institutions): +4
// - recognized_certifications: +3

function scoreEducation(
    education: string[] | undefined, 
    certifications: string[] | undefined,
    confidence?: number
): SectionBreakdown {
    const checks: ScoringCheck[] = []
    let rawScore = 0
    const MAX = 10
    
    const hasEdu = !!(education && education.length > 0)
    const hasCerts = !!(certifications && certifications.length > 0)
    
    if (!hasEdu && !hasCerts) {
        return {
            score: 0,
            max: MAX,
            checks: [{ name: 'education_or_certs_present', ok: false, points: 0, max_points: MAX }]
        }
    }
    
    // Check 1: Education present → +3
    const eduPoints = hasEdu ? 3 : 0
    checks.push({ name: 'education_present', ok: hasEdu, points: eduPoints, max_points: 3 })
    rawScore += eduPoints
    
    // Check 2: Completeness (dates/institutions) → +4
    let completenessScore = 0
    if (hasEdu) {
        const eduText = education!.join(' ').toLowerCase()
        const hasInstitution = /university|college|institute|school|academy/i.test(eduText)
        const hasDegree = /bachelor|master|mba|phd|b\.?s\.?|m\.?s\.?|b\.?a\.?|m\.?a\.?|diploma/i.test(eduText)
        const hasDate = /\d{4}/.test(eduText)
        
        if (hasInstitution) completenessScore += 2
        if (hasDegree) completenessScore += 1
        if (hasDate) completenessScore += 1
    }
    const completenessOk = completenessScore >= 3
    checks.push({ name: 'completeness', ok: completenessOk, points: completenessScore, max_points: 4 })
    rawScore += completenessScore
    
    // Check 3: Recognized certifications → +3
    let certScore = 0
    if (hasCerts) {
        const certText = certifications!.join(' ').toLowerCase()
        const hasRecognized = RECOGNIZED_CERTIFICATIONS.some(cert => certText.includes(cert))
        certScore = hasRecognized ? 3 : (certifications!.length >= 1 ? 1 : 0)
    }
    checks.push({ name: 'recognized_certifications', ok: certScore === 3, points: certScore, max_points: 3 })
    rawScore += certScore
    
    // Apply confidence penalty
    const finalScore = applyConfidencePenalty(rawScore, confidence)
    
    return { score: Math.min(finalScore, MAX), max: MAX, checks }
}

// ============================================================
// COMPLETENESS SCORING (max 5)
// ============================================================
// - contact info + location + linkedin url + 8/8 sections filled => up to 5

function scoreCompleteness(profile: ProfileData): SectionBreakdown {
    const checks: ScoringCheck[] = []
    let score = 0
    const MAX = 5
    
    // Count filled sections (out of 8 key sections)
    const sections = [
        { name: 'name', filled: !!profile.name && profile.name !== 'LinkedIn User' },
        { name: 'headline', filled: !!profile.headline && profile.headline.length > 5 },
        { name: 'about', filled: !!profile.about && profile.about.length > 20 },
        { name: 'experience', filled: !!(profile.experience && profile.experience.length > 0) },
        { name: 'skills', filled: !!(profile.skills && profile.skills.length > 0) },
        { name: 'education', filled: !!(profile.education && profile.education.length > 0) },
        { name: 'certifications', filled: !!(profile.certifications && profile.certifications.length > 0) },
        { name: 'honors', filled: !!(profile.honors && profile.honors.length > 0) }
    ]
    
    const filledCount = sections.filter(s => s.filled).length
    
    // Score: 5 pts if 8/8, 4 pts if 7/8, 3 pts if 6/8, 2 pts if 5/8, 1 pt if 4/8
    if (filledCount >= 8) score = 5
    else if (filledCount >= 7) score = 4
    else if (filledCount >= 6) score = 3
    else if (filledCount >= 5) score = 2
    else if (filledCount >= 4) score = 1
    else score = 0
    
    const completenessOk = filledCount >= 6
    checks.push({ 
        name: 'sections_filled', 
        ok: completenessOk, 
        points: score, 
        max_points: MAX 
    })
    
    return { score, max: MAX, checks }
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function applyConfidencePenalty(rawScore: number, confidence?: number): number {
    if (confidence === undefined || confidence >= 0.8) {
        return rawScore
    }
    // If parse_confidence < 0.8, reduce score proportionally
    return Math.floor(rawScore * confidence)
}

function getTier(score: number): 'platinum' | 'gold' | 'silver' | 'bronze' {
    if (score >= 85) return 'platinum'
    if (score >= 70) return 'gold'
    if (score >= 55) return 'silver'
    return 'bronze'
}

function generateFixes(breakdown: {
    headline: SectionBreakdown
    about: SectionBreakdown
    experience: SectionBreakdown
    skills: SectionBreakdown
    education: SectionBreakdown
    completeness: SectionBreakdown
}): FixSuggestion[] {
    const fixes: FixSuggestion[] = []
    
    // Analyze each section for improvement opportunities
    const analyzeSection = (section: string, data: SectionBreakdown) => {
        for (const check of data.checks) {
            if (!check.ok && check.max_points - check.points >= 2) {
                const fix = getFixForCheck(section, check.name)
                if (fix) {
                    fixes.push({
                        section,
                        fix,
                        impact_pts: check.max_points - check.points
                    })
                }
            }
        }
    }
    
    analyzeSection('headline', breakdown.headline)
    analyzeSection('about', breakdown.about)
    analyzeSection('experience', breakdown.experience)
    analyzeSection('skills', breakdown.skills)
    analyzeSection('education', breakdown.education)
    
    // Sort by impact and return top 5
    return fixes.sort((a, b) => b.impact_pts - a.impact_pts).slice(0, 5)
}

function getFixForCheck(section: string, checkName: string): string | null {
    const fixMap: Record<string, Record<string, string>> = {
        headline: {
            keywords: 'Add 2+ industry keywords (e.g., "Software Engineer", "Product Manager", "Data Scientist")',
            value_proposition: 'Include a value statement (e.g., "Helping companies scale...", "Building...")',
            metrics_or_proof: 'Add a quantified achievement (e.g., "10+ years", "500K users")',
            clarity_length: 'Aim for 20-120 characters with clear role identity',
            specificity: 'Add specificity with separators like | or your niche focus'
        },
        about: {
            hook_present: 'Start with an engaging hook or compelling statement',
            structured_paragraphs: 'Organize into 2-3 clear paragraphs with distinct themes',
            value_and_results: 'Mention specific results or impact from your work',
            keyword_overlap: 'Reinforce headline keywords in your About section',
            cta_present: 'Add a call-to-action (e.g., "Let\'s connect..." or "Reach out to discuss...")',
            first_person_personality: 'Write in first person (I, my) to show authenticity'
        },
        experience: {
            action_verbs_60pct: 'Start bullets with action verbs (Led, Built, Managed, Increased)',
            metrics_30pct: 'Add metrics to 30%+ of bullets (e.g., "Increased X by Y%")',
            xyz_formula: 'Use XYZ formula: Accomplished [X] measured by [Y] by doing [Z]',
            tools_tech_mention: 'Mention specific tools and technologies you used',
            bullet_formatting: 'Format achievements as bullet points for readability'
        },
        skills: {
            skill_count_10: 'Add at least 10 relevant skills to your profile',
            top3_headline_match: 'Ensure your top 3 skills align with your headline',
            relevance: 'Add industry-specific professional skills'
        },
        education: {
            education_present: 'Add your educational background',
            completeness: 'Include institution name, degree type, and graduation year',
            recognized_certifications: 'Add industry-recognized certifications (AWS, PMP, etc.)'
        }
    }
    
    return fixMap[section]?.[checkName] || null
}

// ============================================================
// ARCHETYPE CLASSIFICATION (Rule-based)
// ============================================================

export type ProfileArchetype = 'Specialist' | 'Builder' | 'Operator' | 'Storyteller' | 'Emerging'

export function classifyArchetype(profile: ProfileData): {
    label: string
    description: string
} {
    const headline = (profile.headline || '').toLowerCase()
    const about = (profile.about || '').toLowerCase()
    const expCount = profile.experience?.length || 0
    const hasFounderTerms = /(founder|co-founder|ceo|startup|entrepreneur|building)/i.test(headline + ' ' + about)
    const hasLeaderTerms = /(director|vp|head of|chief|lead|manager|managing)/i.test(headline)
    const hasSpecialistTerms = /(specialist|expert|consultant|architect|principal|senior)/i.test(headline)
    const hasStoryTerms = /(creator|writer|speaker|coach|mentor|influencer|thought leader)/i.test(headline + ' ' + about)
    
    if (hasFounderTerms) {
        return {
            label: 'Builder',
            description: 'Entrepreneurial profile focused on creating and scaling ventures'
        }
    }
    
    if (hasStoryTerms) {
        return {
            label: 'Storyteller',
            description: 'Personal brand profile focused on content and influence'
        }
    }
    
    if (hasSpecialistTerms || (profile.certifications && profile.certifications.length >= 3)) {
        return {
            label: 'Specialist',
            description: 'Deep expertise profile focused on specialized domain knowledge'
        }
    }
    
    if (hasLeaderTerms || expCount >= 5) {
        return {
            label: 'Operator',
            description: 'Execution-focused profile demonstrating operational excellence'
        }
    }
    
    return {
        label: 'Emerging',
        description: 'Growing professional building foundational experience'
    }
}
