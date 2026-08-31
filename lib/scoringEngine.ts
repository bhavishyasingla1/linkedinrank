import { ProfileData, CategoryScore, AnalysisResult, Archetype, ImprovementStep } from './types'

/**
 * STRICT RULE-BASED SCORING ENGINE
 * 
 * Rubric: Headline /20, About /20, Experience /25, Skills /15, Education /10, Completeness /10
 * Total = 100
 * 
 * RULES:
 * - Only score what is visible in the PDF data
 * - Missing sections are NOT penalized (neutral/skip)
 * - Average profiles: 55–70, Strong: 70–85, 80+ rare
 * - Metrics = bonus, NOT mandatory
 * - Fair to students, early-career, senior, academics
 * - DO NOT score: photo, banner, featured, recommendations, network, posts, engagement, creator mode
 * - NEVER penalize for missing: profile picture, banner, engagement, followers, posting frequency
 */

// User-facing max points per category (total = 100)
const MAX_POINTS = {
    headline: 20,
    about: 20,
    experience: 25,
    skills: 15,
    eduCerts: 10,
    completeness: 10
}

// Red flag phrases
const GENERIC_PHRASES = [
    'seeking opportunities', 'looking for', 'hardworking',
    'team player', 'passionate individual', 'motivated professional',
    'results-driven', 'detail-oriented', 'self-starter', 'go-getter'
]

// Action verbs indicating strong writing
const POWER_WORDS = [
    'led', 'managed', 'created', 'developed', 'launched',
    'scaled', 'grew', 'increased', 'decreased', 'improved',
    'optimized', 'built', 'designed', 'delivered', 'achieved',
    'generated', 'drove', 'spearheaded', 'pioneered', 'transformed',
    'directed', 'established', 'implemented', 'coordinated', 'executed'
]

// ──────────────────────────────────────────────
// MAIN ANALYSIS FUNCTION
// ──────────────────────────────────────────────

export function analyzeProfile(profile: ProfileData): AnalysisResult {

    // Score each section independently
    const headlineResult = scoreHeadline(profile.headline)
    const aboutResult = scoreAbout(profile.about)
    const experienceResult = scoreExperience(profile.experience)
    const skillsResult = scoreSkills(profile.skills, profile.headline)
    const eduCertsResult = scoreEducationAndCerts(profile.education, profile.certifications)

    // Score completeness & structure
    const completenessResult = scoreCompleteness(profile)

    // Build category scores with earned/max points
    const categoryScores: CategoryScore[] = [
        {
            category: 'Headline',
            percentage: headlineResult.total,
            weight: MAX_POINTS.headline,
            breakdown: headlineResult.breakdown,
            earnedPoints: Math.round((headlineResult.total / 100) * MAX_POINTS.headline),
            maxPoints: MAX_POINTS.headline
        },
        {
            category: 'About',
            percentage: aboutResult.total,
            weight: MAX_POINTS.about,
            breakdown: aboutResult.breakdown,
            earnedPoints: Math.round((aboutResult.total / 100) * MAX_POINTS.about),
            maxPoints: MAX_POINTS.about
        },
        {
            category: 'Experience',
            percentage: experienceResult.total,
            weight: MAX_POINTS.experience,
            breakdown: experienceResult.breakdown,
            earnedPoints: Math.round((experienceResult.total / 100) * MAX_POINTS.experience),
            maxPoints: MAX_POINTS.experience
        },
        {
            category: 'Skills',
            percentage: skillsResult.total,
            weight: MAX_POINTS.skills,
            breakdown: skillsResult.breakdown,
            earnedPoints: Math.round((skillsResult.total / 100) * MAX_POINTS.skills),
            maxPoints: MAX_POINTS.skills
        },
        {
            category: 'Education & Certifications',
            percentage: eduCertsResult.total,
            weight: MAX_POINTS.eduCerts,
            breakdown: eduCertsResult.breakdown,
            earnedPoints: Math.round((eduCertsResult.total / 100) * MAX_POINTS.eduCerts),
            maxPoints: MAX_POINTS.eduCerts
        },
        {
            category: 'Completeness & Structure',
            percentage: completenessResult.total,
            weight: MAX_POINTS.completeness,
            breakdown: completenessResult.breakdown,
            earnedPoints: Math.round((completenessResult.total / 100) * MAX_POINTS.completeness),
            maxPoints: MAX_POINTS.completeness
        }
    ]

    // Overall score = sum of earned points (already out of 100)
    const overallScore = categoryScores.reduce((sum, c) => sum + c.earnedPoints, 0)

    // Archetype
    const archetype = determineArchetype(profile, overallScore, categoryScores)

    // Recommendations
    const recommendations = generateRecommendations(profile, categoryScores)

    // Tier, peer context, improvement path
    const tier = getTier(overallScore)
    const careerStage = detectCareerStage(profile)
    const peerContext = getPeerContext(overallScore, careerStage)
    const improvementPath = calculateImprovementPath(categoryScores, overallScore)

    return {
        linkedInScore: overallScore,
        categoryScores,
        archetype,
        recommendations,
        potentialGain: calculatePotentialGain(categoryScores),
        tier,
        peerContext,
        improvementPath,
        careerStage
    }
}

// ──────────────────────────────────────────────
// 1. HEADLINE SCORING (/20 points → internal 0–100)
// ──────────────────────────────────────────────
// Evaluate: role identity, industry/niche, professional wording, specificity
// Do NOT penalize: short headlines, no emojis, no marketing language

function scoreHeadline(headline: string | undefined): { total: number; breakdown: string[] } {
    if (!headline || headline.trim().length < 3) {
        // Missing headline → not penalized, neutral
        return { total: 0, breakdown: ['No headline detected in PDF: cannot score this section'] }
    }

    let score = 0
    const breakdown: string[] = []
    const lower = headline.toLowerCase()

    // (a) Role identity: does headline state what you do? (35 pts)
    const strongRolePatterns = /(?:engineer|developer|manager|designer|analyst|consultant|director|specialist|coordinator|lead|architect|scientist|researcher|professor|teacher|nurse|doctor|attorney|lawyer|accountant|marketer|strategist|executive|officer|founder|entrepreneur|editor|writer|producer|host|creator)/i
    if (strongRolePatterns.test(headline)) {
        score += 35
        breakdown.push('✓ Clear role identity')
    } else if (/(?:student|intern|trainee|fresher|apprentice|fellow)/i.test(headline)) {
        // Weak/vague role | legitimate but not specific enough for a strong headline
        score += 15
        breakdown.push('○ Role detected but vague: add your field (e.g., "CS Student | Aspiring Data Scientist")')
    } else {
        // No recognizable role at all
        const words = headline.split(/[\s|•·,]+/).filter(w => w.length > 2)
        if (words.length >= 2) {
            score += 8
            breakdown.push('○ Role could be clearer: consider adding your job title')
        } else {
            breakdown.push('○ Consider adding your role or title to your headline')
        }
    }

    // (b) Industry or niche mention (25 pts)
    const industryPatterns = /(?:tech|software|finance|health|education|marketing|sales|consulting|retail|energy|media|legal|pharma|biotech|automotive|aerospace|real estate|hospitality|logistics|supply chain|ai|machine learning|data|cloud|mobile|web|security|devops|ux|ui|digital|ecommerce|blockchain|product|operations|hr|human resources|sustainability|climate|nonprofit)/i
    if (industryPatterns.test(headline)) {
        score += 25
        breakdown.push('✓ Industry or niche mentioned')
    } else {
        breakdown.push('○ Adding your industry/niche would improve discoverability')
    }

    // (c) Professional wording: no red flags (20 pts)
    let hasGeneric = false
    for (const phrase of GENERIC_PHRASES) {
        if (lower.includes(phrase)) {
            hasGeneric = true
            breakdown.push(`○ Consider replacing "${phrase}" with something more specific`)
            break
        }
    }
    if (!hasGeneric) {
        score += 20
        breakdown.push('✓ Professional wording')
    } else {
        score += 5
    }

    // (d) Specificity: mentions a specialty, tool, or differentiator (20 pts)
    const hasSpecificity = headline.includes('|') || headline.includes('·') || headline.includes('|') ||
        /(?:helping|building|specializ|focus|expert|certified|working on|passionate about)/i.test(headline)
    if (hasSpecificity) {
        score += 20
        breakdown.push('✓ Specific and differentiated')
    } else if (headline.length > 40) {
        score += 8
        breakdown.push('○ Could be more specific: add what makes you unique')
    } else {
        breakdown.push('○ More detail would strengthen your headline')
    }

    // Bonus: quantified achievements or notable credentials in headline
    if (/\d+[kKmM]?\+?\s*(?:views|followers|subscribers|years|projects|clients)/i.test(headline)) {
        score = Math.min(100, score + 10)
        breakdown.push('✓ Bonus: quantified achievement in headline')
    }

    return { total: Math.max(0, Math.min(100, score)), breakdown }
}

// ──────────────────────────────────────────────
// 2. ABOUT / SUMMARY SCORING (/20 points → internal 0–100)
// ──────────────────────────────────────────────
// Evaluate: professional direction, skills/tools mentioned, specific interests, authenticity
// Do NOT penalize: short summaries, simple language, lack of storytelling

function scoreAbout(about: string | undefined): { total: number; breakdown: string[] } {
    if (!about || about.trim().length < 20) {
        return { total: 0, breakdown: ['No about/summary section detected in PDF: cannot score'] }
    }

    let score = 0
    const breakdown: string[] = []
    const lower = about.toLowerCase()
    const wordCount = about.split(/\s+/).length

    // (a) Clear professional direction: does it say what you do? (30 pts)
    // Word count is a strong signal of content depth
    if (wordCount >= 80) {
        score += 30
        breakdown.push(`✓ Detailed professional direction (${wordCount} words)`)
    } else if (wordCount >= 40) {
        score += 22
        breakdown.push(`✓ Professional direction present (${wordCount} words)`)
    } else if (wordCount >= 20) {
        score += 12
        breakdown.push(`○ Summary is brief (${wordCount} words): expanding to 50+ words would help`)
    } else {
        score += 5
        breakdown.push(`○ Summary is very brief (${wordCount} words): aim for at least 50 words`)
    }

    // (b) Skills or tools mentioned (25 pts)
    const skillMentions = (about.match(/(?:python|java|javascript|react|angular|node|aws|azure|gcp|sql|excel|figma|photoshop|tableau|power bi|machine learning|ai|analytics|marketing|seo|sales|strategy|management|leadership|communication|project management|agile|scrum|design thinking|research|writing|public speaking|consulting|fundraising|teaching|coaching)/gi) || []).length
    if (skillMentions >= 3) {
        score += 25
        breakdown.push(`✓ ${skillMentions} specific skills/tools mentioned`)
    } else if (skillMentions >= 1) {
        score += 12
        breakdown.push(`○ ${skillMentions} skill(s) mentioned: adding more specifics would help`)
    } else {
        breakdown.push('○ Consider mentioning specific skills or tools you use')
    }

    // (c) Specific interests or focus areas (25 pts)
    const hasSpecifics = /(?:focus|interest|speciali|passionate about|working on|currently|building|helping|research|studying)/i.test(about)
    if (hasSpecifics) {
        score += 25
        breakdown.push('✓ Specific focus areas mentioned')
    } else if (wordCount >= 30) {
        score += 10
        breakdown.push('○ Could mention specific interests or focus areas')
    } else {
        breakdown.push('○ Mention specific interests or focus areas to strengthen your summary')
    }

    // (d) Authenticity and clarity: first-person voice, clear sentences (20 pts)
    const hasFirstPerson = /\b(i |i'm|i've|my |me |i\b)/i.test(about)
    const sentences = about.split(/[.!?]+/).filter(s => s.trim().length > 10)
    if (hasFirstPerson && sentences.length >= 2) {
        score += 20
        breakdown.push('✓ Authentic voice and clear structure')
    } else if (sentences.length >= 2) {
        score += 10
        breakdown.push('○ Good structure: first-person voice tends to resonate better')
    } else {
        score += 3
        breakdown.push('○ A few more sentences would make your story clearer')
    }

    // Bonus: quantified achievements (not required, pure bonus)
    if (/\d+\s*(?:%|percent|million|thousand|k|years?|projects?|teams?|clients?|users?|revenue|growth)/i.test(about)) {
        score = Math.min(100, score + 8)
        breakdown.push('✓ Bonus: includes quantified results')
    }

    // Penalty: only for truly generic cliché-heavy summaries
    let clicheCount = 0
    for (const phrase of GENERIC_PHRASES) {
        if (lower.includes(phrase)) clicheCount++
    }
    if (clicheCount >= 3) {
        score = Math.max(0, score - 10)
        breakdown.push('○ Heavy use of clichés: replace with specific examples')
    }

    return { total: Math.max(0, Math.min(100, score)), breakdown }
}

// ──────────────────────────────────────────────
// 3. EXPERIENCE SCORING (/30 points → internal 0–100)
// ──────────────────────────────────────────────
// Evaluate: clear responsibilities, action verbs, ownership, impact
// Metrics = bonus, NOT requirement
// Students/interns NOT penalized for limited experience

function scoreExperience(experience: any[]): { total: number; breakdown: string[] } {
    if (!experience || experience.length === 0) {
        return { total: 0, breakdown: ['No experience section detected in PDF: cannot score'] }
    }

    let score = 0
    const breakdown: string[] = []

    // (a) Clear responsibilities: do descriptions explain what you did? (30 pts)
    const allDesc = experience.map(e => e.description || '').join(' ')
    const avgDescLength = allDesc.length / experience.length

    if (avgDescLength > 150) {
        score += 30
        breakdown.push('✓ Detailed role descriptions')
    } else if (avgDescLength > 60) {
        score += 18
        breakdown.push('○ Descriptions present: more detail would strengthen them')
    } else if (allDesc.trim().length > 0) {
        score += 8
        breakdown.push('○ Brief descriptions: expanding on responsibilities would help')
    } else {
        breakdown.push('○ Roles listed without descriptions: adding responsibilities would improve your score')
    }

    // (b) Action verbs: starts sentences with strong verbs (25 pts)
    const lowerDesc = allDesc.toLowerCase()
    let actionVerbCount = 0
    for (const verb of POWER_WORDS) {
        if (lowerDesc.includes(verb)) actionVerbCount++
    }

    if (actionVerbCount >= 6) {
        score += 25
        breakdown.push(`✓ ${actionVerbCount} strong action verbs used`)
    } else if (actionVerbCount >= 3) {
        score += 15
        breakdown.push(`○ ${actionVerbCount} action verbs: more power words would strengthen your descriptions`)
    } else if (actionVerbCount >= 1) {
        score += 8
        breakdown.push(`○ ${actionVerbCount} action verb(s): start more bullets with words like "Led", "Built", "Delivered"`)
    } else {
        breakdown.push('○ Consider starting descriptions with action verbs like "Led", "Built", "Managed"')
    }

    // (c) Demonstrated ownership: shows responsibility and initiative (25 pts)
    const ownershipPatterns = /(?:responsible for|in charge|own|led|managed|headed|oversaw|supervised|directed|mentored|reported to|team of|department)/i
    const hasOwnership = ownershipPatterns.test(allDesc)
    const hasBullets = /[•\-\*]|\n\d+\./.test(allDesc)

    if (hasOwnership && hasBullets) {
        score += 25
        breakdown.push('✓ Shows ownership and well-structured')
    } else if (hasOwnership) {
        score += 15
        breakdown.push('✓ Demonstrates ownership')
    } else if (hasBullets || avgDescLength > 100) {
        score += 8
        breakdown.push('○ Structured descriptions: add more ownership language')
    } else {
        breakdown.push('○ Showing ownership (leading, managing, being responsible for) strengthens credibility')
    }

    // (d) Impact or contribution (20 pts): NOT requiring numbers
    const hasImpactLanguage = /(?:impact|contribut|result|achiev|success|grew|improv|increas|deliver|launch|complet|awarded|recogni)/i.test(allDesc)

    if (hasImpactLanguage) {
        score += 20
        breakdown.push('✓ Impact/contribution described')
    } else if (experience.length >= 2 && allDesc.trim().length > 50) {
        score += 8
        breakdown.push('○ Multiple roles shown: describing impact would make them stronger')
    } else {
        breakdown.push('○ Adding what you contributed or achieved would strengthen this section')
    }

    // BONUS: Quantified metrics (not required but rewarded)
    const metricsPatterns = [
        /\d+\s*%/,
        /\d+[kKmM]\+?\s*(?:views|followers|subscribers|users|revenue|clients)/i,
        /[\d,]+\+?\s*(?:views|followers|subscribers|clients|users|members)/i,
        /\d+\s*(?:x|times)\s+(?:growth|increase|improvement)/i
    ]
    const hasMetrics = metricsPatterns.some(p => p.test(allDesc))
    if (hasMetrics) {
        score = Math.min(100, score + 8)
        breakdown.push('✓ Bonus: quantified achievements present')
    }

    // Note for early-career profiles: score is based on actual content quality,
    // not artificially inflated. A well-described internship will still score well.
    if (experience.length === 1) {
        const title = (experience[0].title || '').toLowerCase()
        if (/intern|trainee|student|apprentice|fellow/i.test(title)) {
            if (!breakdown.some(b => b.includes('early career'))) {
                breakdown.push('○ Early career: add detailed descriptions of your responsibilities to improve your score')
            }
        }
    }

    return { total: Math.max(0, Math.min(100, score)), breakdown }
}

// ──────────────────────────────────────────────
// 4. SKILLS SCORING (/15 points → internal 0–100)
// ──────────────────────────────────────────────
// Evaluate: relevance to role, specificity, alignment with career direction
// Do NOT penalize: small number of skills, lack of endorsements

function scoreSkills(skills: string[], headline: string = ''): { total: number; breakdown: string[] } {
    if (!skills || skills.length === 0) {
        return { total: 0, breakdown: ['No skills detected in PDF: cannot score this section'] }
    }

    let score = 0
    const breakdown: string[] = []

    // (a) Relevance & Completeness (35 pts)
    // LinkedIn PDFs only show "Top Skills" (typically 3-5 skills).
    // Having 3+ skills in PDF indicates a complete skills setup on profile.
    if (skills.length >= 3) {
        score += 35
        breakdown.push(`✓ ${skills.length} top skills listed (LinkedIn PDF exports display selected top skills)`)
    } else if (skills.length >= 1) {
        score += 30
        breakdown.push(`✓ ${skills.length} skill(s) listed (adding more to your LinkedIn profile strengthens search presence)`)
    } else {
        score += 20
        breakdown.push(`○ Few skills detected from export`)
    }

    // (b) Specificity: tools/technologies vs generic words (35 pts)
    const specificToolRegex = /(?:python|golang|go\b|rust|java|javascript|typescript|c\+\+|c#|\.net|kotlin|swift|ruby|php|react|angular|vue|next\.js|node|express|django|flask|spring|fastapi|sql|postgres|postgresql|mysql|mongodb|redis|cassandra|elasticsearch|dynamodb|aws|azure|gcp|docker|kubernetes|terraform|ansible|jenkins|ci\/cd|git|linux|microservices|distributed systems|system design|graphql|rest|api|kafka|rabbitmq|spark|hadoop|airflow|pandas|numpy|scipy|scikit|tensorflow|pytorch|keras|llm|nlp|machine learning|deep learning|data modeling|data engineering|tableau|power bi|looker|excel|metabase|figma|sketch|adobe|photoshop|illustrator|after effects|wireframing|prototyping|design system|ui\/ux|user research|product management|agile|scrum|kanban|jira|confluence|roadmapping|a\/b testing|prfaq|seo|sem|google analytics|hubspot|salesforce|copywriting|content strategy|growth marketing|financial modeling|valuation|accounting|quickbooks|sap|supply chain|logistics|crm|b2b|lead generation|sales management|negotiation|devops|security|penetration testing|cybersecurity)/i

    const specificSkills = skills.filter(s => {
        const lower = s.toLowerCase()
        return specificToolRegex.test(lower) || (s.length >= 4 && !/^(hardworking|motivated|team player|passionate|dedicated|punctual)$/i.test(lower))
    })

    if (specificSkills.length >= 2 || skills.length >= 3) {
        score += 35
        breakdown.push('✓ Specific tools, technologies, and domain capabilities listed')
    } else if (specificSkills.length >= 1) {
        score += 30
        breakdown.push('✓ Professional skills listed (pairing broad domains with exact tooling names enhances search matching)')
    } else {
        score += 28
        breakdown.push('✓ Core skills listed: adding specific tools or frameworks can further improve recruiter discoverability')
    }

    // (c) Alignment with career direction (30 pts)
    const headlineLower = headline.toLowerCase()
    
    // Domain cluster checks
    const techHeadline = /(?:engineer|developer|architect|software|frontend|backend|full\s*stack|devops|cloud|platform|systems|infrastructure|qa|sre|programmer|coder|tech|web)/i.test(headlineLower)
    const techSkills = skills.some(s => /(?:go|golang|python|java|react|node|cloud|aws|azure|gcp|kubernetes|docker|sql|api|system|distributed|devops|git|linux|database|c\+\+|rust|typescript|javascript|software|backend|frontend)/i.test(s))

    const productHeadline = /(?:product|pm|program|project|scrum|agile|owner)/i.test(headlineLower)
    const productSkills = skills.some(s => /(?:product|agile|scrum|roadmap|research|strategy|feature|lifecycle|user|analytics|jira|management)/i.test(s))

    const dataHeadline = /(?:data|analytics|analyst|scientist|bi|machine learning|ai|ml|intelligence)/i.test(headlineLower)
    const dataSkills = skills.some(s => /(?:data|python|sql|tableau|power bi|pandas|pytorch|tensorflow|analytics|statistics|modeling|etl|ml|ai)/i.test(s))

    const designHeadline = /(?:designer|design|ux|ui|creative|art director)/i.test(headlineLower)
    const designSkills = skills.some(s => /(?:design|figma|ui|ux|prototype|sketch|adobe|wireframe|user research|visual|graphic)/i.test(s))

    const marketingHeadline = /(?:marketing|growth|content|seo|social media|brand|copywriter|communications)/i.test(headlineLower)
    const marketingSkills = skills.some(s => /(?:marketing|seo|growth|content|social|campaign|brand|copywriting|ads|analytics|hubspot)/i.test(s))

    const financeHeadline = /(?:finance|financial|accountant|accounting|banking|investment|audit)/i.test(headlineLower)
    const financeSkills = skills.some(s => /(?:finance|financial|modeling|excel|accounting|audit|tax|valuation|budget|sap|quickbooks)/i.test(s))

    const isDomainAligned = 
        (techHeadline && techSkills) ||
        (productHeadline && productSkills) ||
        (dataHeadline && dataSkills) ||
        (designHeadline && designSkills) ||
        (marketingHeadline && marketingSkills) ||
        (financeHeadline && financeSkills)

    if (headlineLower.length > 3) {
        const directAlignedSkills = skills.filter(s => {
            const skillWords = s.toLowerCase().split(/\W+/).filter(w => w.length > 2)
            return skillWords.some(word => headlineLower.includes(word))
        })

        if (directAlignedSkills.length >= 1 || isDomainAligned) {
            score += 30
            breakdown.push('✓ Skills align directly with your target role and industry')
        } else {
            // General professional alignment with mild optimization tip
            score += 26
            breakdown.push('✓ Relevant professional skills (mirroring top 3 skills into your headline title optimizes search SEO)')
        }
    } else {
        score += 26
        breakdown.push('✓ Skills detected (aligning headline keywords with top skills reinforces profile clarity)')
    }

    return { total: Math.max(0, Math.min(100, score)), breakdown }
}

// ──────────────────────────────────────────────
// 5. EDUCATION & CERTIFICATIONS SCORING (/15 points → internal 0–100)
// ──────────────────────────────────────────────
// Evaluate: completeness, field relevance, certifications if present
// Do NOT penalize: college tier, lack of certifications, graduation year

function scoreEducationAndCerts(education: any[], certifications: string[]): { total: number; breakdown: string[] } {
    const hasEdu = education && education.length > 0
    const hasCerts = certifications && certifications.length > 0

    if (!hasEdu && !hasCerts) {
        return { total: 0, breakdown: ['No education or certifications detected in PDF: cannot score'] }
    }

    let score = 0
    const breakdown: string[] = []

    // --- Education ---
    if (hasEdu) {
        const eduText = education.join(' ').toLowerCase()

        // (a) Completeness: is education listed with institution and field? (40 pts)
        const hasDegree = /(?:bachelor|master|mba|phd|doctorate|b\.?s\.?|m\.?s\.?|b\.?a\.?|m\.?a\.?|b\.?e\.?|b\.?tech|m\.?tech|diploma|associate)/i.test(eduText)
        const hasInstitution = /(?:university|college|institute|school|academy)/i.test(eduText)

        if (hasDegree && hasInstitution) {
            score += 40
            breakdown.push('✓ Degree and institution listed')
        } else if (hasDegree || hasInstitution) {
            score += 22
            breakdown.push('○ Education partially complete: add both degree type and institution name')
        } else {
            score += 10
            breakdown.push('○ Education listed: adding degree type and institution name would help')
        }

        // (b) Field relevance: is field of study mentioned? (20 pts)
        const hasField = /(?:computer|engineering|business|science|arts|economics|finance|marketing|psychology|medicine|law|design|architecture|mathematics|physics|chemistry|biology|political|sociology|philosophy|education|nursing|pharmacy|communications)/i.test(eduText)
        if (hasField) {
            score += 20
            breakdown.push('✓ Field of study mentioned')
        } else {
            score += 3
            breakdown.push('○ Adding your field of study would strengthen this section')
        }

        // Advanced degree bonus
        if (/(?:master|mba|phd|doctorate|m\.?s\.?|m\.?a\.?|m\.?tech)/i.test(eduText)) {
            score = Math.min(100, score + 10)
            breakdown.push('✓ Advanced degree')
        }

        // Honors bonus
        if (/(?:honors|summa|magna|cum laude|dean|scholarship|award|distinction|first class|gold medal)/i.test(eduText)) {
            score = Math.min(100, score + 8)
            breakdown.push('✓ Academic honors/distinctions')
        }
    }

    // --- Certifications ---
    if (hasCerts) {
        const certCount = certifications.length
        const certText = certifications.join(' ').toLowerCase()

        if (!hasEdu) {
            // If no education, certs carry more weight
            score += 30
        }

        if (certCount >= 3) {
            score += 25
            breakdown.push(`✓ ${certCount} certifications: strong commitment to learning`)
        } else if (certCount >= 1) {
            score += 15
            breakdown.push(`✓ ${certCount} certification(s) listed`)
        }

        // Recognizable certifications bonus
        if (/(?:pmp|cissp|aws|google|microsoft|azure|certified|professional|scrum|agile|cpa|cfa|comptia|cisco|oracle|salesforce)/i.test(certText)) {
            score = Math.min(100, score + 10)
            breakdown.push('✓ Industry-recognized certification(s)')
        }
    } else if (hasEdu) {
        // No certs but has education: that's perfectly fine, no penalty
        breakdown.push('No certifications listed: optional but can strengthen your profile')
    }

    return { total: Math.max(0, Math.min(100, score)), breakdown }
}

// ──────────────────────────────────────────────
// 6. COMPLETENESS & STRUCTURE SCORING (/10 points → internal 0–100)
// ──────────────────────────────────────────────
// Evaluate: profile not empty, sections filled, logical structure

function scoreCompleteness(profile: ProfileData): { total: number; breakdown: string[] } {
    let score = 0
    const breakdown: string[] = []
    let sectionsPresent = 0
    const totalSections = 5 // headline, about, experience, skills, education

    if (profile.headline && profile.headline.trim().length > 3) sectionsPresent++
    if (profile.about && profile.about.trim().length > 20) sectionsPresent++
    if (profile.experience && profile.experience.length > 0) sectionsPresent++
    if (profile.skills && profile.skills.length > 0) sectionsPresent++
    if ((profile.education && profile.education.length > 0) || (profile.certifications && profile.certifications.length > 0)) sectionsPresent++

    // (a) Section coverage (50 pts)
    const coverage = sectionsPresent / totalSections
    if (coverage >= 1) {
        score += 50
        breakdown.push('✓ All major sections present')
    } else if (coverage >= 0.8) {
        score += 35
        breakdown.push(`✓ ${sectionsPresent}/${totalSections} sections filled`)
    } else if (coverage >= 0.6) {
        score += 20
        breakdown.push(`○ ${sectionsPresent}/${totalSections} sections filled: completing more would strengthen your profile`)
    } else {
        score += 5
        breakdown.push(`○ Only ${sectionsPresent}/${totalSections} sections filled: many key sections are missing`)
    }

    // (b) Content depth (30 pts)
    const hasDetailedExp = profile.experience?.some(e => (e.description || '').length > 50)
    const hasSubstantialAbout = (profile.about || '').length > 100
    if (hasDetailedExp && hasSubstantialAbout) {
        score += 30
        breakdown.push('✓ Good content depth across sections')
    } else if (hasDetailedExp || hasSubstantialAbout) {
        score += 15
        breakdown.push('○ Some sections have good depth: aim for detail in all sections')
    } else {
        breakdown.push('○ Most sections need more detail and substance')
    }

    // (c) Logical structure (20 pts)
    const hasName = profile.name && profile.name !== 'LinkedIn User'
    const hasLogicalFlow = profile.headline && profile.experience?.length > 0
    if (hasName && hasLogicalFlow) {
        score += 20
        breakdown.push('✓ Profile has logical structure')
    } else if (hasName) {
        score += 8
        breakdown.push('○ Basic structure present: adding experience strengthens the narrative')
    } else {
        score += 2
    }

    return { total: Math.max(0, Math.min(100, score)), breakdown }
}

// ──────────────────────────────────────────────
// CAREER STAGE DETECTION
// ──────────────────────────────────────────────

function detectCareerStage(profile: ProfileData): string {
    const headline = (profile.headline || '').toLowerCase()
    const expCount = profile.experience?.length || 0
    const allTitles = profile.experience?.map(e => (e.title || '').toLowerCase()).join(' ') || ''
    const allDurations = profile.experience?.map(e => (e.duration || '').toLowerCase()).join(' ') || ''

    // Student signals: headline or titles contain student/intern keywords
    // BUT exclude compound titles: "Student Ambassador", "Student Leader", "Fellow at X"
    const studentKeywords = /\b(fresher|intern\b|undergraduate|pursuing|aspiring|trainee|apprentice)\b/
    const studentStandalone = /\bstudent\b/
    const studentExclusions = /\b(ambassador|leader|mentor|volunteer|fellow|researcher|organizer|chapter)\b/
    
    const isStudentHeadline = (studentKeywords.test(headline) || 
        (studentStandalone.test(headline) && !studentExclusions.test(headline)))
    const isStudentTitle = expCount <= 1 && (studentKeywords.test(allTitles) ||
        (studentStandalone.test(allTitles) && !studentExclusions.test(allTitles)))
    
    if (isStudentHeadline || isStudentTitle) {
        return 'student'
    }

    // Estimate total career span from durations
    // Use max span (earliest start → latest end) to avoid double-counting overlapping roles
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
        if (startYear >= 1970 && startYear <= latestYear) {
            earliestYear = Math.min(earliestYear, startYear)
            foundYearRange = true
        }
        if (endYear >= 1970) {
            latestYear = Math.max(latestYear, endYear)
        }
    }
    
    if (foundYearRange && earliestYear < 9999) {
        estimatedYears = latestYear - earliestYear
    } else {
        // Fallback: sum year mentions in duration strings but cap at reasonable max
        const yearMatches = allDurations.match(/(\d+)\s*(?:yr|year)/gi)
        if (yearMatches) {
            // Take the largest single duration as a floor, add partial credit for others
            const years = yearMatches.map(m => parseInt(m)).sort((a, b) => b - a)
            estimatedYears = years[0] || 0
            // Add ~30% of remaining durations to account for some overlap
            for (let i = 1; i < years.length; i++) {
                estimatedYears += Math.round(years[i] * 0.3)
            }
        }
    }
    
    // Fallback: estimate from number of roles (conservative: 1.5 years per role)
    if (estimatedYears === 0) {
        estimatedYears = Math.round(expCount * 1.5)
    }

    // Senior/Founder/Academic signals
    const seniorKeywords = /\b(founder|co-founder|ceo|cto|coo|cfo|vp|vice president|director|head of|principal|professor|associate professor|senior director|managing director|partner|chief)\b/
    if (seniorKeywords.test(headline) || seniorKeywords.test(allTitles) || estimatedYears >= 12) {
        return 'senior'
    }

    // Mid-career: 5-12 years
    if (estimatedYears >= 5 || expCount >= 4) {
        return 'mid-career'
    }

    // Early career: 1-5 years
    if (expCount >= 1) {
        return 'early-career'
    }

    return 'student'
}

// ──────────────────────────────────────────────
// ARCHETYPE DETERMINATION
// ──────────────────────────────────────────────

function determineArchetype(profile: ProfileData, score: number, categories: CategoryScore[]): Archetype {
    const name = profile.name || 'This professional'
    const careerStage = detectCareerStage(profile)
    const headline = (profile.headline || '').toLowerCase()
    const allTitles = profile.experience?.map(e => (e.title || '').toLowerCase()).join(' ') || ''
    const expCount = profile.experience?.length || 0
    const skillsCount = profile.skills?.length || 0
    // Founder/Builder: headline or titles suggest entrepreneurship
    // 'building' alone is too broad | require it alongside startup/company context
    if (/\b(founder|co-founder|ceo|entrepreneur|startup)\b/i.test(headline)) {
        return {
            label: 'Founder / Builder',
            description: `${name} shows an entrepreneurial trajectory. The profile reflects initiative and ownership, which is valuable for building credibility with investors and partners.`
        }
    }

    // Academic/Research: professor, researcher | based on headline/title keywords ONLY
    // Honors/awards are NOT publications | don't use them as academic signal
    if (/\b(professor|researcher|phd|doctoral|postdoc|academic|research\s+scientist|research\s+fellow|research\s+associate)\b/i.test(headline) ||
        /\b(professor|researcher|phd|doctoral|postdoc|research\s+scientist)\b/i.test(allTitles)) {
        return {
            label: 'Academic / Research Profile',
            description: `${name}'s profile reflects a research or academic focus. Highlighting publications, grants, and teaching experience will strengthen visibility in this space.`
        }
    }

    // Experienced Leader: senior stage with high score
    if (careerStage === 'senior' && score >= 60) {
        return {
            label: 'Experienced Leader',
            description: `${name} has a seasoned profile with leadership experience. The depth of experience is evident, and refining positioning could further elevate professional presence.`
        }
    }

    // Domain-Focused Operator: mid-career with good skills alignment
    const skillsScore = categories.find(c => c.category === 'Skills')?.percentage || 0
    if (careerStage === 'mid-career' && skillsScore >= 60) {
        return {
            label: 'Domain-Focused Operator',
            description: `${name} demonstrates focused expertise in their domain. A proven track record with clear specialization makes this profile credible and recruiter-friendly.`
        }
    }

    // Multi-Potential Generalist: diverse experience across areas
    if (expCount >= 3 && skillsCount >= 5) {
        const uniqueCompanies = new Set(profile.experience?.map(e => e.company)).size
        if (uniqueCompanies >= 3) {
            return {
                label: 'Multi-Potential Generalist',
                description: `${name} has diverse experience across multiple roles and organizations. Highlighting a unifying theme or core strength would help focus the narrative.`
            }
        }
    }

    // Developing Specialist: early-career with some focus
    if (careerStage === 'early-career' && score >= 45) {
        return {
            label: 'Developing Specialist',
            description: `${name} is building focused expertise early in their career. Continuing to deepen skills and present specific contributions will accelerate professional growth.`
        }
    }

    // Emerging Professional: student or very early with potential
    if (careerStage === 'student' || (careerStage === 'early-career' && score < 45)) {
        return {
            label: 'Emerging Professional',
            description: `${name} is at the beginning of their professional journey. Focusing on a clear headline, detailed experience descriptions, and relevant skills will build a strong foundation.`
        }
    }

    // Default fallback
    if (score >= 70) {
        return {
            label: 'Domain-Focused Operator',
            description: `${name} has a well-structured profile with clear professional direction. Targeted refinements could push it into the top tier.`
        }
    }

    return {
        label: 'Developing Specialist',
        description: `${name}'s profile shows potential. Adding more detail and specificity to key sections will meaningfully strengthen professional presence.`
    }
}

// ──────────────────────────────────────────────
// RECOMMENDATIONS
// ──────────────────────────────────────────────

function generateRecommendations(profile: ProfileData, categories: CategoryScore[]): any[] {
    const recommendations: any[] = []
    const sorted = [...categories].sort((a, b) => a.percentage - b.percentage)

    // Get weakest areas (only suggest improvements where score < 80%)
    sorted.forEach(cat => {
        if (cat.percentage < 80 && recommendations.length < 5) {
            const rec = getCategoryRecommendation(cat.category, profile, cat.percentage)
            if (rec) recommendations.push(rec)
        }
    })

    // Ensure at least 2 recommendations
    if (recommendations.length < 2) {
        sorted.forEach(cat => {
            if (recommendations.length < 2) {
                const rec = getCategoryRecommendation(cat.category, profile, cat.percentage)
                if (rec && !recommendations.find(r => r.title === rec.title)) {
                    recommendations.push(rec)
                }
            }
        })
    }

    return recommendations.slice(0, 5)
}

function getCategoryRecommendation(category: string, profile: ProfileData, score: number): any {
    const name = profile.name || 'You'
    const firstJob = profile.experience?.[0]?.title || ''
    const firstCompany = profile.experience?.[0]?.company || ''

    switch (category) {
        case 'Headline':
            const actualHeadline = profile.headline || ''
            const hasHeadline = actualHeadline.length > 0

            let headlineFix = ''
            let headlineTitle = `${name}, your headline could be stronger`
            let headlineBefore = actualHeadline || 'No headline detected'
            let headlineAfter = firstJob
                ? `${firstJob} | ${profile.skills?.[0] ? `${profile.skills[0]} & ` : ''}${firstCompany ? `${firstCompany} • ` : ''}Growth & Innovation`
                : 'Product Engineer & Strategist | Building High-Velocity Growth Systems'

            if (!hasHeadline) {
                headlineFix = firstJob
                    ? `(1) No headline detected. Your most recent role is "${firstJob}"${firstCompany ? ` at ${firstCompany}` : ''} | lead with that.\n(2) Follow the pattern: [Role] | [Specialization] | [Value/Outcome].`
                    : `(1) No headline detected. Add your target role title.\n(2) Follow the pattern: [Your Role] | [Your Specialization] | [Value you bring].`
            } else {
                const issues: string[] = []
                const hasPipe = actualHeadline.includes('|')
                const hasRole = /\b(engineer|developer|designer|manager|analyst|consultant|founder|director|lead|specialist|professor|researcher|scientist|architect|coordinator|officer|head|chief|ceo|cto|vp|president|advisor|creator|writer|coach|trainer|strategist|marketer|intern|student)\b/i.test(actualHeadline)
                const isVague = /\b(passionate|driven|motivated|dedicated|experienced|results-oriented|dynamic|innovative|creative|hardworking|self-starter)\b/i.test(actualHeadline)
                const isTooGeneric = !hasRole && !hasPipe && actualHeadline.length < 60

                if (!hasRole && firstJob) {
                    issues.push(`It doesn't include a clear role. Your current title is "${firstJob}" | lead with that`)
                }
                if (isVague) {
                    issues.push('It uses filler words like "passionate" or "driven" | replace them with specific skills or outcomes')
                }
                if (!hasPipe && actualHeadline.length > 30) {
                    issues.push('Use pipe separators (|) to make it scannable | recruiters skim headlines in 2-3 seconds')
                }
                if (isTooGeneric) {
                    issues.push('It reads as a tagline, not a professional headline | add your role and what you specialize in')
                }

                if (issues.length > 0) {
                    headlineFix = issues.map((issue, i) => `(${i + 1}) ${issue}`).join('\n')
                } else if (score >= 80) {
                    headlineTitle = `${name}, your headline is strong`
                    headlineFix = `(1) Your headline is well-structured.\n(2) Review it periodically when your target roles or specialties change.`
                } else {
                    headlineFix = `(1) Follow the high-conversion formula: [Target Role] | [Core Technical Skills] | [Measurable Outcome].\n(2) Place key search terms in the first 60 characters.`
                }
            }

            return {
                title: headlineTitle,
                whyItMatters: 'Your headline is the first thing recruiters see. A clear headline with your role and niche gets significantly more profile views.',
                before: headlineBefore,
                after: headlineAfter,
                fix: headlineFix,
                impact: 'High' as const
            }

        case 'About':
            const hasAbout = profile.about && profile.about.length > 0
            const aboutLength = profile.about?.length || 0

            let aboutBefore = profile.about ? (profile.about.length > 120 ? profile.about.slice(0, 120) + '...' : profile.about) : 'No summary section detected.'
            let aboutAfter = `I am a ${firstJob || 'Professional'} specializing in ${profile.skills?.slice(0, 3).join(', ') || 'modern industry workflows'}. I focus on delivering scalable, high-impact results.`
            let aboutFix = ''

            if (!hasAbout) {
                aboutFix = `(1) Add an About section to introduce your expertise.\n(2) Explain who you are, the tools you use, and what you are currently working on.`
            } else if (aboutLength < 150) {
                aboutFix = `(1) Expand your summary from ${aboutLength} characters to 200-400 characters.\n(2) Outline your core tools, methodologies, and career accomplishments.`
            } else {
                aboutFix = `(1) Open with a scroll-stopping first line stating what you build or solve.\n(2) Weave in 3+ specific technical skills or tools.\n(3) End with a clear call-to-action to connect.`
            }

            return {
                title: `${name}, your professional summary could be more compelling`,
                whyItMatters: `Your About section is your elevator pitch. It should clearly explain what you do, what you're good at, and what drives you.`,
                before: aboutBefore,
                after: aboutAfter,
                fix: aboutFix,
                impact: 'High' as const
            }

        case 'Experience':
            return {
                title: 'Your experience descriptions could show more impact',
                whyItMatters: 'Clear responsibilities and demonstrated ownership make your experience credible. Action verbs and specific contributions stand out.',
                before: profile.experience?.[0]?.description ? (profile.experience[0].description.length > 120 ? profile.experience[0].description.slice(0, 120) + '...' : profile.experience[0].description) : 'Worked on projects and supported team operations.',
                after: 'Architected core systems and automated diagnostic workflows, improving team efficiency by 35% across key projects.',
                fix: '(1) Start bullet points with strong action verbs (Led, Built, Scaled).\n(2) Add at least 1 measurable metric or scale indicator.\n(3) Clearly state your direct ownership and team impact.',
                impact: 'High' as const
            }

        case 'Skills':
            const userSkills = profile.skills || []
            const skillsCount = userSkills.length
            const userRole = firstJob || 'your role'

            let skillsBefore = skillsCount > 0 ? userSkills.join(', ') : 'No skills detected in PDF export.'
            let skillsAfter = `Pinned: ${userSkills.slice(0, 3).join(', ') || 'Next.js, System Architecture, LLMs'}`
            let skillsFix = ''

            if (skillsCount === 0) {
                skillsFix = `(1) Add technical and domain skills relevant to ${userRole}.\n(2) Include specific tools, frameworks, and methodologies you use.`
            } else {
                skillsFix = `(1) Pin your top 3 most relevant domain skills to the top of your profile.\n(2) Replace generic terms like "Management" with specific tools like "Product Strategy" or "Agile Scrum".\n(3) Align skills directly with keywords in your headline and experience.`
            }

            return {
                title: `${name}, refine your skills section`,
                whyItMatters: 'Your top skills are what recruiters see first. LinkedIn only shows a few in your PDF | make sure they are relevant, specific, and aligned with your role.',
                before: skillsBefore,
                after: skillsAfter,
                fix: skillsFix,
                impact: 'Medium' as const
            }

        case 'Education & Certifications':
            return {
                title: 'Strengthen your education section',
                whyItMatters: 'Complete education details with field of study and institution make your profile more credible.',
                before: profile.education?.[0] ? String(profile.education[0]) : 'Partial education details or missing certifications.',
                after: `${profile.education?.[0] || 'B.S. in Computer Science'} | Industry Certified`,
                fix: '(1) Ensure degree type, field of study, and institution name are listed.\n(2) Add active industry certifications or accredited coursework.',
                impact: 'Medium' as const
            }

        default:
            return null
    }
}

function calculatePotentialGain(categories: CategoryScore[]): number {
    const weakest = categories.filter(c => c.percentage < 75)
    if (weakest.length === 0) return 3

    const totalGain = weakest.reduce((sum, cat) => {
        const potentialImprovement = Math.min(80, cat.percentage + 15) - cat.percentage
        return sum + Math.round((potentialImprovement / 100) * cat.maxPoints)
    }, 0)

    return Math.min(totalGain, 20) // Cap at realistic gain
}

// ──────────────────────────────────────────────
// TIER SYSTEM (calibrated to new score ranges)
// ──────────────────────────────────────────────
// Average: 55–70, Strong: 70–85, 80+ rare

function getTier(score: number): 'Bronze' | 'Silver' | 'Gold' | 'Platinum' {
    if (score >= 85) return 'Platinum'
    if (score >= 70) return 'Gold'
    if (score >= 55) return 'Silver'
    return 'Bronze'
}

// Peer context: honest framing, no fake percentiles
function getPeerContext(score: number, careerStage: string): string {
    const stageLabels: Record<string, string> = {
        'student': 'a student / fresh graduate',
        'early-career': 'an early-career professional',
        'mid-career': 'a mid-career professional',
        'senior': 'a senior professional',
        'experienced': 'an experienced professional'
    }
    const label = stageLabels[careerStage] || 'a professional'

    if (score >= 80) return `Exceptionally well-crafted profile for ${label}`
    if (score >= 70) return `Strong professional presence | well above average for ${label}`
    if (score >= 60) return `Good foundation for ${label} | a few targeted improvements will make it stand out`
    if (score >= 50) return `Solid start for ${label} | completing key sections will boost your visibility`
    if (score >= 40) return `Your profile has potential | filling in missing sections will help recruiters find you`
    return `Your profile needs some work | adding detail to key sections will make a big difference`
}

// ──────────────────────────────────────────────
// IMPROVEMENT PATH
// ──────────────────────────────────────────────

function calculateImprovementPath(categories: CategoryScore[], currentScore: number): ImprovementStep[] {
    const steps: ImprovementStep[] = []

    const sorted = [...categories].sort((a, b) => {
        const aImpact = ((100 - a.percentage) / 100) * a.maxPoints
        const bImpact = ((100 - b.percentage) / 100) * b.maxPoints
        return bImpact - aImpact
    })

    for (const cat of sorted) {
        if (steps.length >= 5) break
        const gap = 100 - cat.percentage
        if (gap < 15) continue // Skip categories already scoring well

        if (cat.category === 'Headline') {
            steps.push({
                action: 'Add your role + industry + what makes you unique to your headline',
                gain: Math.min(4, Math.round(gap * 0.2 * cat.maxPoints / 100) + 1),
                area: 'Headline'
            })
        }

        if (cat.category === 'About') {
            steps.push({
                action: 'Write a summary covering what you do, your key skills, and your focus area',
                gain: Math.min(5, Math.round(gap * 0.2 * cat.maxPoints / 100) + 1),
                area: 'About'
            })
        }

        if (cat.category === 'Experience') {
            steps.push({
                action: 'Add detailed descriptions with action verbs and specific contributions to each role',
                gain: Math.min(8, Math.round(gap * 0.2 * cat.maxPoints / 100) + 1),
                area: 'Experience'
            })
        }

        if (cat.category === 'Skills') {
            steps.push({
                action: 'Add specific, relevant skills (tools and technologies over generic terms)',
                gain: Math.min(4, Math.round(gap * 0.15 * cat.maxPoints / 100) + 1),
                area: 'Skills'
            })
        }

        if (cat.category === 'Education & Certifications') {
            steps.push({
                action: 'Complete education details and add any relevant certifications',
                gain: Math.min(3, Math.round(gap * 0.15 * cat.maxPoints / 100) + 1),
                area: 'Education & Certifications'
            })
        }

        if (cat.category === 'Completeness & Structure') {
            steps.push({
                action: 'Fill in missing profile sections and add more detail to existing ones',
                gain: Math.min(3, Math.round(gap * 0.15 * cat.maxPoints / 100) + 1),
                area: 'Completeness & Structure'
            })
        }
    }

    // Cap total gains
    let totalGain = steps.reduce((s, step) => s + step.gain, 0)
    const maxTarget = 82
    if (currentScore + totalGain > maxTarget) {
        const scale = Math.max(0.3, (maxTarget - currentScore) / totalGain)
        steps.forEach(s => { s.gain = Math.max(1, Math.round(s.gain * scale)) })
    }

    return steps.slice(0, 5)
}
