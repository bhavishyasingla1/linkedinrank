/**
 * LINKEDIN OPTIMIZATION TOOLS
 * 
 * Tools (rule-based, no LLM required):
 * 1. Headline Studio - smart headline generation with scoring
 * 2. Achievement Writer - transform weak bullets into impactful statements
 * 3. Profile SEO Scanner - keyword & recruiter visibility analysis
 * 4. About Generator - LinkedIn summary/about section writer
 * 5. Post Hook Generator - attention-grabbing LinkedIn post openers
 */

// ============================================================
// 1. HEADLINE STUDIO
// ============================================================

export interface HeadlineInput {
    role?: string
    company?: string
    industry?: string
    specialty?: string
    skills?: string[]
}

interface GeneratedHeadline {
    text: string
    score: number
    style: string
    tip: string
}

function clean(s: string | undefined): string {
    if (!s) return ''
    const trimmed = s.trim()
    if (trimmed === '0' || trimmed === '-' || trimmed === 'N/A' || trimmed === 'n/a') return ''
    return trimmed
}

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function joinParts(parts: string[], sep = ' | '): string {
    return parts.filter(p => p.length > 0).join(sep)
}

export function generateHeadlines(input: HeadlineInput): GeneratedHeadline[] {
    const headlines: GeneratedHeadline[] = []

    const role = clean(input.role)
    const company = clean(input.company)
    const industry = clean(input.industry)
    const specialty = clean(input.specialty)
    const skills = (input.skills || []).map(s => s.trim()).filter(s => s.length > 1)

    if (!role) return []

    const topSkill = skills[0] || ''
    const skillDots = skills.slice(0, 4).join(' · ')
    const skillComma = skills.slice(0, 3).join(', ')

    // ── TIER 1: HIGH-IMPACT (score 88-95) ──────────────────────────
    // These require the most inputs but produce the strongest headlines

    if (company && specialty && industry) {
        headlines.push({
            text: `${role} at ${company} | Helping ${industry} teams with ${specialty}`,
            score: 95,
            style: 'Mission-Driven',
            tip: 'This headline tells visitors exactly who you help and how. Mission-driven headlines get 40% more profile views.'
        })
    }

    if (company && skills.length >= 2) {
        headlines.push({
            text: `${role} at ${company} → ${skillDots}`,
            score: 92,
            style: 'Arrow Format',
            tip: 'The arrow (→) draws the eye and implies progression. Modern format used by top creators.'
        })
    }

    if (specialty && industry) {
        headlines.push({
            text: `${role} | I help ${industry} companies ${specialty.toLowerCase().startsWith('build') || specialty.toLowerCase().startsWith('grow') || specialty.toLowerCase().startsWith('scale') ? specialty.toLowerCase() : `solve ${specialty.toLowerCase()} challenges`}`,
            score: 93,
            style: 'Value Proposition',
            tip: '"I help X do Y" is the highest-converting headline format on LinkedIn. Be specific about the outcome.'
        })
    }

    if (company && specialty) {
        headlines.push({
            text: `${specialty} @ ${company} | ${role}`,
            score: 90,
            style: 'Specialty-Led',
            tip: 'Leading with your specialty makes you stand out from others with the same job title.'
        })
    }

    // ── TIER 2: STRONG (score 82-89) ───────────────────────────────

    if (company) {
        const extra = specialty ? `Focused on ${specialty}` : industry ? `${industry}` : ''
        headlines.push({
            text: extra ? `${role} at ${company} | ${extra}` : `${role} at ${company}`,
            score: 88,
            style: 'Authority',
            tip: 'Company name adds instant credibility. Recruiters search by company | this helps you get found.'
        })
    }

    if (industry && skills.length >= 2) {
        headlines.push({
            text: `${industry} ${role} | ${skillDots}`,
            score: 87,
            style: 'Industry Expert',
            tip: 'Industry-first positioning helps recruiters filtering by sector. Skills make you searchable.'
        })
    }

    if (specialty) {
        const context = industry ? ` in ${industry}` : company ? ` at ${company}` : ''
        headlines.push({
            text: `${role}${context} | Building expertise in ${specialty}`,
            score: 86,
            style: 'Growth Mindset',
            tip: 'The dash (|) creates a natural pause. "Building expertise" shows ambition without overpromising.'
        })
    }

    if (skills.length >= 3) {
        headlines.push({
            text: `${role} | ${skillComma}${industry ? ` | ${industry}` : ''}`,
            score: 85,
            style: 'Skills Stack',
            tip: 'Each skill is a searchable keyword. Recruiters find you through these exact terms.'
        })
    }

    if (industry) {
        headlines.push({
            text: `${role} | Passionate about ${industry}${specialty ? ` · ${specialty}` : ''}`,
            score: 84,
            style: 'Passion-Driven',
            tip: 'Shows genuine interest in your field. Works well for people building a personal brand.'
        })
    }

    if (company && industry) {
        headlines.push({
            text: `${role} at ${company} | ${industry} enthusiast${skills.length > 0 ? ` · ${topSkill}` : ''}`,
            score: 83,
            style: 'Complete Profile',
            tip: 'Covers role, company, and industry | the three things recruiters scan for first.'
        })
    }

    // ── TIER 3: SOLID (score 76-82) ────────────────────────────────
    // These work with minimal input | just a role is enough

    if (industry) {
        headlines.push({
            text: `${role} | Writing about ${industry}${specialty ? `, ${specialty.toLowerCase()}` : ''}, and what I'm learning along the way`,
            score: 82,
            style: 'Creator Voice',
            tip: 'Positions you as a thought leader. LinkedIn rewards content creators with more reach.'
        })
    }

    {
        const what = specialty || (industry ? `${industry} challenges` : 'complex problems')
        headlines.push({
            text: `${role} who loves solving ${what.toLowerCase()}`,
            score: 80,
            style: 'Personality-Forward',
            tip: 'Adding personality makes you memorable. People connect with humans, not job titles.'
        })
    }

    if (!company) {
        const context = industry ? ` in ${industry}` : ''
        headlines.push({
            text: `${role}${context} | Open to new opportunities${topSkill ? ` · ${topSkill}` : ''}`,
            score: 78,
            style: 'Open to Work',
            tip: 'Signals availability. Recruiters search "open to" | this helps you appear in those results.'
        })
    }

    {
        const diff = specialty || topSkill || industry || ''
        headlines.push({
            text: diff ? `${role} | ${diff}` : role,
            score: 76,
            style: 'Clean & Minimal',
            tip: 'Simple and professional. Sometimes less is more | but adding context will help you rank higher.'
        })
    }

    // ── TIER 4: CREATIVE (score 80-90) ─────────────────────────────
    // Bold formats that stand out in the feed

    if (specialty && skills.length >= 1) {
        headlines.push({
            text: `${specialty} × ${topSkill} | ${role}${company ? ` at ${company}` : ''}`,
            score: 89,
            style: 'Intersection',
            tip: 'The "×" format highlights your unique combination. People at the intersection of skills are most valuable.'
        })
    }

    if (industry) {
        const outcome = specialty ? specialty.toLowerCase() : 'growth'
        headlines.push({
            text: `Helping ${industry} teams unlock ${outcome} | ${role}${company ? ` @ ${company}` : ''}`,
            score: 91,
            style: 'Outcome-Focused',
            tip: 'Leading with the outcome you deliver is the most compelling headline format. Top 5% of profiles use this.'
        })
    }

    if (skills.length >= 2 && !company) {
        headlines.push({
            text: `${role} | ${skills[0]} + ${skills[1]}${industry ? ` in ${industry}` : ''}`,
            score: 82,
            style: 'Skill Combo',
            tip: 'The "+" format shows you bring multiple strengths. Great for versatile professionals.'
        })
    }

    // ── Score Adjustments ───────────────────────────────────────────
    headlines.forEach(h => {
        let bonus = 0
        if (h.text.length >= 40 && h.text.length <= 120) bonus += 2
        else if (h.text.length < 20) bonus -= 5
        else if (h.text.length > 180) bonus -= 3
        if (h.text.includes('|') || h.text.includes('·') || h.text.includes('→')) bonus += 1
        if (skills.length >= 3) bonus += 1
        if (company && specialty) bonus += 2
        h.score = Math.max(50, Math.min(98, h.score + bonus))
    })

    // Deduplicate, filter, sort, return top 8
    return [...new Map(headlines.map(h => [h.text, h])).values()]
        .filter(h => h.text.length >= 10 && h.text.length <= 220)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
}

// ============================================================
// 2. ACHIEVEMENT WRITER (Rule-based bullet transformer)
// ============================================================

const ACTION_VERB_MAP: Record<string, string[]> = {
    build: ['Architected', 'Built', 'Developed', 'Engineered', 'Created'],
    manage: ['Led', 'Directed', 'Managed', 'Oversaw', 'Coordinated'],
    improve: ['Improved', 'Enhanced', 'Optimized', 'Elevated', 'Upgraded'],
    grow: ['Grew', 'Scaled', 'Expanded', 'Increased', 'Accelerated'],
    create: ['Designed', 'Crafted', 'Created', 'Produced', 'Launched'],
    analyze: ['Analyzed', 'Evaluated', 'Assessed', 'Identified', 'Researched'],
    communicate: ['Presented', 'Negotiated', 'Facilitated', 'Collaborated', 'Advocated'],
    strategy: ['Spearheaded', 'Pioneered', 'Championed', 'Drove', 'Initiated'],
    operate: ['Streamlined', 'Automated', 'Implemented', 'Executed', 'Delivered'],
    teach: ['Mentored', 'Trained', 'Coached', 'Guided', 'Developed'],
}

const WEAK_STARTERS = [
    'responsible for', 'helped with', 'helped', 'assisted with', 'assisted in', 'assisted',
    'worked on', 'was involved in', 'participated in', 'supported', 'handled',
    'tasked with', 'in charge of', 'duties included', 'did', 'made'
]

const CONTEXT_KEYWORDS: Record<string, string> = {
    develop: 'build', build: 'build', code: 'build', program: 'build', engineer: 'build', implement: 'build', deploy: 'build',
    manage: 'manage', lead: 'manage', team: 'manage', supervise: 'manage', oversee: 'manage', coordinate: 'manage',
    improve: 'improve', increase: 'improve', reduce: 'improve', optimize: 'improve', enhance: 'improve', boost: 'improve',
    grow: 'grow', scale: 'grow', expand: 'grow', revenue: 'grow', sales: 'grow', acquire: 'grow',
    create: 'create', design: 'create', write: 'create', draft: 'create', produce: 'create', launch: 'create',
    analyze: 'analyze', research: 'analyze', data: 'analyze', report: 'analyze', evaluate: 'analyze', audit: 'analyze',
    present: 'communicate', collaborate: 'communicate', negotiate: 'communicate', client: 'communicate', stakeholder: 'communicate',
    strategy: 'strategy', initiative: 'strategy', transform: 'strategy', pioneer: 'strategy', innovation: 'strategy',
    process: 'operate', automate: 'operate', streamline: 'operate', system: 'operate', workflow: 'operate',
    train: 'teach', mentor: 'teach', coach: 'teach', onboard: 'teach', educate: 'teach',
}

interface BulletImprovement {
    original: string
    improved: string
    alternatives: string[]
    suggestions: string[]
    has_action_verb: boolean
    has_metric: boolean
    has_result: boolean
    score: number
}

export function improveBullet(bullet: string): BulletImprovement {
    const original = bullet.trim()
    const lowerBullet = original.toLowerCase()
    const suggestions: string[] = []

    const normalizeCore = (s: string) => {
        let t = (s || '').trim()
        // Remove leading subject phrases that often appear in raw bullets
        // Example: "I collect and analyze data" -> "collect and analyze data"
        t = t.replace(/^(?:i|we)\s+/i, '')
        t = t.replace(/^my\s+team\s+/i, '')
        t = t.replace(/^our\s+team\s+/i, '')
        t = t.replace(/^my\s+/i, '')
        t = t.replace(/^our\s+/i, '')
        t = t.replace(/^(?:was|were|am|are|have|has|had|will|would|can|could)\s+/i, '')
        t = t.replace(/^to\s+/i, '')
        // Clean up punctuation/whitespace
        t = t.replace(/\s+/g, ' ').trim()
        // Avoid starting the final bullet with stray lowercase 'i'
        t = t.replace(/^i\b\s*/i, '')
        // Remove leading punctuation
        t = t.replace(/^[,.:;\-–|]+\s*/, '')
        return t
    }

    // Detect context category
    let category = 'operate'
    for (const [keyword, cat] of Object.entries(CONTEXT_KEYWORDS)) {
        if (lowerBullet.includes(keyword)) {
            category = cat
            break
        }
    }

    const verbs = ACTION_VERB_MAP[category] || ACTION_VERB_MAP.operate

    // Check qualities
    const allVerbs = Object.values(ACTION_VERB_MAP).flat()
    const hasActionVerb = allVerbs.some(v => lowerBullet.startsWith(v.toLowerCase()))
    const hasMetric = /\d+\s*%|\$[\d,.]+|\d+[kKmM]+|\d+\s*(times|x|users|clients|projects|teams?|people|members|accounts|customers|departments)/i.test(original)
    const hasResult = /resulting in|leading to|which (led|drove|increased|reduced|improved)|saving|generating|achieving|contributing to|enabling/i.test(original)
    const hasWeakStarter = WEAK_STARTERS.some(ws => lowerBullet.startsWith(ws))

    // Build improved version
    let improved = original
    let coreContent = original

    // Strip weak starter
    if (hasWeakStarter) {
        const ws = WEAK_STARTERS.find(w => lowerBullet.startsWith(w))!
        coreContent = original.substring(ws.length).trim()
        // Capitalize first letter
        coreContent = coreContent.charAt(0).toUpperCase() + coreContent.slice(1)
    }

    // Generate improved version
    if (hasWeakStarter || !hasActionVerb) {
        const normalizedCore = normalizeCore(coreContent)
        const coreLower = normalizedCore ? normalizedCore.charAt(0).toLowerCase() + normalizedCore.slice(1) : ''
        // Check if core starts with a gerund (-ing) | e.g., "managing a team"
        // In that case, don't prepend another verb; instead use the gerund's root as the verb
        const gerundMatch = coreLower.match(/^(\w+)ing\b/)
        if (gerundMatch && hasWeakStarter) {
            // Re-detect category from the gerund root for a better verb match
            const gerundRoot = gerundMatch[1].toLowerCase()
            let gerundCategory = category
            for (const [keyword, cat] of Object.entries(CONTEXT_KEYWORDS)) {
                if (gerundRoot.startsWith(keyword.slice(0, 4)) || keyword.startsWith(gerundRoot.slice(0, 4))) {
                    gerundCategory = cat
                    break
                }
            }
            const gerundVerbs = ACTION_VERB_MAP[gerundCategory] || ACTION_VERB_MAP.operate
            // Replace the gerund with the action verb and continue with the rest
            const restAfterGerund = coreLower.replace(/^\w+ing\s*/, '')
            improved = `${gerundVerbs[0]} ${restAfterGerund}`.replace(/\s+/g, ' ').trim()
        } else {
            // If the normalized core is empty (e.g. user pasted only a weak starter), keep original.
            if (!coreLower) {
                improved = original
            } else {
                improved = `${verbs[0]} ${coreLower}`
            }
            // Clean up double spaces
            improved = improved.replace(/\s+/g, ' ').trim()
        }
    }

    // Generate alternative versions
    const alternatives: string[] = []
    const core = hasWeakStarter ? coreContent : (hasActionVerb ? original.replace(/^\w+\s/, '') : original)
    const altCore = normalizeCore(core)
    const coreLower = altCore ? altCore.charAt(0).toLowerCase() + altCore.slice(1) : ''

    for (let i = 0; i < Math.min(3, verbs.length); i++) {
        if (!coreLower) continue
        const alt = `${verbs[i]} ${coreLower}`.replace(/\s+/g, ' ').trim()
        if (alt !== improved && alt !== original) {
            alternatives.push(alt)
        }
    }

    // Suggestions
    if (hasWeakStarter) {
        suggestions.push(`Replaced weak opener with strong action verb "${verbs[0]}"`)
    } else if (!hasActionVerb) {
        suggestions.push(`Start with a power verb like ${verbs.slice(0, 3).join(', ')}`)
    }

    if (!hasMetric) {
        suggestions.push('Add numbers: revenue generated, team size, % improvement, users impacted, or time saved')
    }

    if (!hasResult) {
        suggestions.push('Add the result: "...resulting in 30% faster onboarding" or "...saving $200K annually"')
    }

    if (original.length < 50) {
        suggestions.push('Too short | expand with context, scope, and measurable impact')
    }

    if (original.length > 200) {
        suggestions.push('Consider splitting into two focused bullets for readability')
    }

    // Score
    let score = 30
    if (hasActionVerb || hasWeakStarter) score += 20 // Will be fixed in improved version
    if (!hasWeakStarter && hasActionVerb) score += 10
    if (hasMetric) score += 25
    if (hasResult) score += 15
    if (original.length >= 50 && original.length <= 200) score += 10
    if (original.includes(',')) score += 5 // Some structure
    if (hasWeakStarter) score -= 15

    return {
        original,
        improved,
        alternatives,
        suggestions,
        has_action_verb: hasActionVerb,
        has_metric: hasMetric,
        has_result: hasResult,
        score: Math.max(0, Math.min(100, score))
    }
}

// ============================================================
// 3. LINKEDIN SEO CHECKER
// ============================================================

const RECRUITER_KEYWORDS: Record<string, string[]> = {
    tech: ['software', 'engineer', 'developer', 'python', 'javascript', 'typescript', 'react', 'node', 'aws', 'azure', 'gcp', 'cloud', 'devops', 'agile', 'scrum', 'fullstack', 'full-stack', 'backend', 'frontend', 'data', 'machine learning', 'ai', 'artificial intelligence', 'api', 'microservices', 'docker', 'kubernetes', 'sql', 'database', 'architecture', 'ci/cd', 'git', 'linux', 'java', 'go', 'rust', 'scala', 'deep learning', 'nlp', 'computer vision', 'tensorflow', 'pytorch'],
    product: ['product manager', 'product management', 'roadmap', 'stakeholder', 'user research', 'agile', 'sprint', 'backlog', 'mvp', 'launch', 'metrics', 'analytics', 'a/b testing', 'customer', 'user experience', 'prioritization', 'strategy', 'discovery', 'okr', 'kpi', 'cross-functional'],
    marketing: ['marketing', 'digital marketing', 'seo', 'content', 'brand', 'growth', 'acquisition', 'campaign', 'analytics', 'social media', 'email marketing', 'paid media', 'ppc', 'google ads', 'facebook ads', 'copywriting', 'conversion', 'funnel', 'engagement', 'influencer', 'strategy', 'storytelling', 'audience'],
    design: ['design', 'ux', 'ui', 'user experience', 'user interface', 'figma', 'sketch', 'prototype', 'wireframe', 'design system', 'interaction', 'visual design', 'accessibility', 'user research', 'usability', 'responsive', 'typography', 'branding'],
    sales: ['sales', 'revenue', 'quota', 'pipeline', 'b2b', 'b2c', 'enterprise', 'account executive', 'business development', 'close', 'negotiation', 'crm', 'salesforce', 'hubspot', 'prospecting', 'cold outreach', 'relationship', 'client', 'territory'],
    finance: ['finance', 'accounting', 'cpa', 'audit', 'budget', 'forecast', 'financial analysis', 'investment', 'portfolio', 'risk', 'compliance', 'reporting', 'excel', 'modeling', 'valuation', 'treasury', 'banking'],
    hr: ['hr', 'human resources', 'recruiting', 'talent acquisition', 'talent', 'hiring', 'onboarding', 'culture', 'engagement', 'compensation', 'benefits', 'hris', 'dei', 'diversity', 'employer brand', 'performance management', 'workforce'],
    operations: ['operations', 'process', 'efficiency', 'logistics', 'supply chain', 'lean', 'six sigma', 'optimization', 'scalability', 'automation', 'procurement', 'vendor', 'quality', 'warehouse', 'inventory'],
    consulting: ['consulting', 'strategy', 'advisory', 'client', 'stakeholder', 'transformation', 'implementation', 'analysis', 'project management', 'change management', 'business process', 'due diligence', 'engagement'],
    creative: ['creative', 'content', 'storytelling', 'video', 'podcast', 'writing', 'editing', 'production', 'media', 'publishing', 'creator', 'audience', 'engagement', 'brand', 'narrative', 'digital', 'platform', 'community'],
    education: ['education', 'teaching', 'professor', 'lecturer', 'curriculum', 'pedagogy', 'training', 'learning', 'student', 'academic', 'school', 'university', 'college', 'faculty', 'course design', 'instructional design', 'edtech', 'classroom', 'mentoring', 'coaching', 'assessment', 'e-learning', 'workshop', 'seminar', 'educator', 'visiting professor'],
    healthcare: ['healthcare', 'medical', 'clinical', 'patient', 'hospital', 'physician', 'nurse', 'diagnosis', 'treatment', 'pharma', 'pharmaceutical', 'health', 'wellness', 'therapy', 'rehabilitation', 'public health', 'epidemiology', 'biomedical', 'mental health'],
    psychology: ['psychology', 'counseling', 'counselling', 'psychologist', 'therapist', 'mental health', 'cognitive', 'behavioral', 'assessment', 'intervention', 'psychotherapy', 'clinical psychology', 'organizational psychology', 'personality', 'well-being', 'resilience', 'mindfulness', 'emotional intelligence'],
    defense: ['defense', 'defence', 'military', 'armed forces', 'veteran', 'officer', 'security', 'intelligence', 'strategic', 'leadership', 'command', 'tactical', 'operations', 'personnel', 'discipline', 'mission', 'iaf', 'army', 'navy', 'air force'],
    legal: ['legal', 'law', 'attorney', 'lawyer', 'litigation', 'compliance', 'contract', 'regulatory', 'intellectual property', 'corporate law', 'dispute', 'arbitration', 'mediation', 'paralegal', 'jurisdiction'],
    'real-estate': ['real estate', 'property', 'commercial', 'residential', 'broker', 'leasing', 'development', 'construction', 'architecture', 'zoning', 'investment', 'valuation', 'appraisal', 'mortgage', 'rental'],
    nonprofit: ['nonprofit', 'non-profit', 'ngo', 'social impact', 'philanthropy', 'community', 'advocacy', 'fundraising', 'grant', 'volunteer', 'social enterprise', 'sustainability', 'csr', 'mission-driven'],
    'training-development': ['training', 'development', 'learning', 'coaching', 'mentoring', 'facilitation', 'workshop', 'leadership development', 'organizational development', 'talent development', 'soft skills', 'team building', 'executive coaching', 'capability building', 'upskilling', 'whitespace', 'potential', 'interviewing', 'assessment center', 'personnel selection'],
    research: ['research', 'academic', 'publication', 'journal', 'peer review', 'methodology', 'thesis', 'dissertation', 'grant', 'citation', 'literature review', 'qualitative', 'quantitative', 'hypothesis', 'experiment'],
    entrepreneurship: ['founder', 'startup', 'entrepreneur', 'ceo', 'co-founder', 'venture', 'bootstrap', 'scaling', 'mvp', 'pitch', 'investor', 'fundraising', 'incubator', 'accelerator', 'business model', 'disruption']
}

interface SEOAnalysis {
    keyword_density: number
    found_keywords: string[]
    missing_keywords: string[]
    industry_match: string
    recruiter_score: number
    headline_score: number
    about_score: number
    skills_score: number
    recommendations: string[]
}

export function analyzeSEO(
    headline: string,
    about: string,
    skills: string[],
    targetIndustry?: string
): SEOAnalysis {
    const headlineLower = headline.toLowerCase()
    const aboutLower = about.toLowerCase()
    const skillsText = skills.join(' ').toLowerCase()
    const fullText = `${headlineLower} ${aboutLower} ${skillsText}`

    // Determine best-fit industry using weighted scoring
    let bestIndustry = targetIndustry || 'tech'
    let maxScore = 0

    for (const [industry, keywords] of Object.entries(RECRUITER_KEYWORDS)) {
        let score = 0
        for (const kw of keywords) {
            if (headlineLower.includes(kw)) score += 3
            else if (skillsText.includes(kw)) score += 2
            else if (aboutLower.includes(kw)) score += 1
        }
        if (score > maxScore) {
            maxScore = score
            bestIndustry = industry
        }
    }

    const targetKeywords = RECRUITER_KEYWORDS[bestIndustry] || RECRUITER_KEYWORDS.tech

    // --- Niche / subdomain detection (context-driven keyword narrowing) ---
    // Goal: if someone is "tech", don't recommend unrelated tech keywords.
    // We infer a niche by scoring matches against subdomain keyword groups.
    const NICHE_KEYWORDS: Record<string, Record<string, string[]>> = {
        tech: {
            frontend: ['frontend', 'react', 'typescript', 'javascript', 'ui', 'web', 'next.js', 'css', 'html', 'redux', 'vite'],
            backend: ['backend', 'api', 'microservices', 'database', 'sql', 'node', 'python', 'java', 'go', 'architecture', 'distributed', 'scalability'],
            devops: ['devops', 'ci/cd', 'kubernetes', 'docker', 'cloud', 'aws', 'azure', 'gcp', 'terraform', 'linux', 'observability', 'sre'],
            data_ml: ['data', 'analytics', 'machine learning', 'ai', 'deep learning', 'nlp', 'computer vision', 'tensorflow', 'pytorch', 'model', 'ml'],
            security: ['security', 'cybersecurity', 'iam', 'oauth', 'threat', 'vulnerability', 'compliance', 'zero trust'],
            mobile: ['mobile', 'ios', 'android', 'swift', 'kotlin', 'react native', 'flutter'],
        },
        marketing: {
            seo: ['seo', 'search', 'keyword', 'content', 'backlinks', 'serp', 'technical seo'],
            paid: ['paid media', 'ppc', 'google ads', 'facebook ads', 'paid', 'cpc', 'roas'],
            lifecycle: ['email marketing', 'crm', 'retention', 'activation', 'lifecycle', 'drip', 'segmentation'],
            social: ['social media', 'creator', 'community', 'linkedin', 'twitter', 'engagement'],
        },
        product: {
            b2b: ['b2b', 'enterprise', 'saas', 'platform', 'integrations'],
            growth_pm: ['growth', 'activation', 'retention', 'funnel', 'conversion', 'experimentation', 'a/b testing'],
            discovery: ['discovery', 'user research', 'customer', 'interviews', 'insights'],
        },
    }

    const detectNiche = () => {
        const nichesForIndustry = NICHE_KEYWORDS[bestIndustry]
        if (!nichesForIndustry) return { niche: null as string | null, nicheKeywords: null as string[] | null }
        let bestNiche: string | null = null
        let bestNicheScore = 0
        for (const [niche, kws] of Object.entries(nichesForIndustry)) {
            let score = 0
            for (const kw of kws) {
                if (headlineLower.includes(kw)) score += 3
                else if (skillsText.includes(kw)) score += 2
                else if (aboutLower.includes(kw)) score += 1
            }
            if (score > bestNicheScore) {
                bestNicheScore = score
                bestNiche = niche
            }
        }
        // Require at least some evidence; otherwise keep broad industry.
        if (bestNicheScore < 3) return { niche: null as string | null, nicheKeywords: null as string[] | null }
        // Niche keywords are intersection of industry keywords and niche signals, plus niche-only tokens.
        const nicheSet = new Set((bestNiche ? nichesForIndustry[bestNiche] || [] : []).map((s: string) => s.toLowerCase()))
        const narrowed = targetKeywords.filter(kw => nicheSet.has(kw.toLowerCase()))
        return { niche: bestNiche, nicheKeywords: narrowed.length > 0 ? narrowed : null }
    }

    const nicheInfo = detectNiche()
    const effectiveTargetKeywords = nicheInfo.nicheKeywords || targetKeywords

    // Find keywords | check in headline, about, and skills separately for weighting
    const foundInHeadline = effectiveTargetKeywords.filter(kw => headlineLower.includes(kw))
    const foundInAbout = effectiveTargetKeywords.filter(kw => aboutLower.includes(kw))
    const foundInSkills = effectiveTargetKeywords.filter(kw => skillsText.includes(kw))
    const allFoundSet = new Set([...foundInHeadline, ...foundInAbout, ...foundInSkills])
    const foundKeywords = [...allFoundSet]
    const missingKeywords = effectiveTargetKeywords.filter(kw => !allFoundSet.has(kw))

    // Keyword coverage percentage
    const keywordDensity = effectiveTargetKeywords.length > 0
        ? Math.round((foundKeywords.length / effectiveTargetKeywords.length) * 100)
        : 0

    // --- HEADLINE SCORE (0-30) ---
    let headlineScore = 0
    if (headline.length > 0) {
        if (headline.length >= 40) headlineScore += 8
        else if (headline.length >= 20) headlineScore += 4
        if (/[|·|]/.test(headline)) headlineScore += 5
        if (foundInHeadline.length >= 3) headlineScore += 10
        else if (foundInHeadline.length >= 1) headlineScore += 5
        const hasRole = /(?:engineer|developer|manager|designer|analyst|consultant|director|specialist|lead|architect|founder|creator|strategist|writer|coach|host)/i.test(headline)
        if (hasRole) headlineScore += 7
    }
    headlineScore = Math.min(30, headlineScore)

    // --- ABOUT SCORE (0-30) ---
    let aboutScore = 0
    if (about.length > 0) {
        const aboutWords = about.split(/\s+/).length
        if (aboutWords >= 80) aboutScore += 10
        else if (aboutWords >= 40) aboutScore += 6
        else if (aboutWords >= 15) aboutScore += 3
        if (foundInAbout.length >= 5) aboutScore += 10
        else if (foundInAbout.length >= 2) aboutScore += 5
        else if (foundInAbout.length >= 1) aboutScore += 2
        const hasFirstPerson = /\b(i |i'm|i've|my |me )\b/i.test(about)
        if (hasFirstPerson) aboutScore += 3
        const sentences = about.split(/[.!?]+/).filter(s => s.trim().length > 10)
        if (sentences.length >= 3) aboutScore += 4
        else if (sentences.length >= 2) aboutScore += 2
        if (/\d+\s*(%|percent|years?|projects?|clients?|users?|companies)/i.test(about)) aboutScore += 3
    }
    aboutScore = Math.min(30, aboutScore)

    // --- SKILLS SCORE (0-20) ---
    let skillsScore = 0
    if (skills.length > 0) {
        if (skills.length >= 8) skillsScore += 8
        else if (skills.length >= 5) skillsScore += 5
        else if (skills.length >= 3) skillsScore += 3
        if (foundInSkills.length >= 4) skillsScore += 8
        else if (foundInSkills.length >= 2) skillsScore += 5
        else if (foundInSkills.length >= 1) skillsScore += 2
        const specificSkills = skills.filter(s => s.length > 3 && !/^(leadership|communication|teamwork|management|problem solving)$/i.test(s.trim()))
        if (specificSkills.length >= 3) skillsScore += 4
    }
    skillsScore = Math.min(20, skillsScore)

    // --- KEYWORD SPREAD BONUS (0-20) ---
    let spreadBonus = 0
    if (foundInHeadline.length > 0 && foundInAbout.length > 0) spreadBonus += 8
    if (foundInHeadline.length > 0 && foundInSkills.length > 0) spreadBonus += 4
    if (foundInAbout.length > 0 && foundInSkills.length > 0) spreadBonus += 4
    if (foundKeywords.length >= 6) spreadBonus += 4
    spreadBonus = Math.min(20, spreadBonus)

    const recruiterScore = Math.min(100, headlineScore + aboutScore + skillsScore + spreadBonus)

    // --- RECOMMENDATIONS ---
    const recommendations: string[] = []

    if (headlineScore < 15) {
        if (foundInHeadline.length === 0) {
            recommendations.push(`Add ${bestIndustry} keywords to your headline | recruiters search by headline first`)
        }
        if (!/[|·|]/.test(headline) && headline.length > 0) {
            recommendations.push('Use separators (|) in your headline to pack in more keywords, e.g., "Role | Skill | Industry"')
        }
        if (headline.length < 40 && headline.length > 0) {
            recommendations.push('Your headline is short | use all 220 characters to maximize keyword visibility')
        }
    }

    if (aboutScore < 15) {
        const aboutWords = about.split(/\s+/).length
        if (aboutWords < 40) {
            recommendations.push('Expand your About section to 100+ words | longer summaries rank higher in LinkedIn search')
        }
        if (foundInAbout.length < 3 && about.length > 0) {
            recommendations.push(`Weave more ${bestIndustry} keywords naturally into your About section`)
        }
    }

    if (skillsScore < 10) {
        if (skills.length < 5) {
            recommendations.push('Add more skills | profiles with 5+ skills get significantly more recruiter views')
        }
        if (foundInSkills.length < 2) {
            const topMissing = missingKeywords.slice(0, 3).join(', ')
            recommendations.push(`Add industry-relevant skills like: ${topMissing}`)
        }
    }

    if (spreadBonus < 10) {
        recommendations.push('Repeat your top keywords across headline, about, AND skills for stronger search ranking')
    }

    if (missingKeywords.length > 0 && recommendations.length < 5) {
        const priority = missingKeywords.slice(0, 4).join(', ')
        recommendations.push(`High-value keywords to add${nicheInfo.niche ? ` (${nicheInfo.niche})` : ''}: ${priority}`)
    }

    return {
        keyword_density: keywordDensity,
        found_keywords: foundKeywords,
        missing_keywords: missingKeywords.slice(0, 12),
        industry_match: bestIndustry,
        recruiter_score: recruiterScore,
        headline_score: headlineScore,
        about_score: aboutScore,
        skills_score: skillsScore,
        recommendations: recommendations.slice(0, 5)
    }
}

// ============================================================
// 4. OPPORTUNITY SCORE
// ============================================================

interface OpportunityScore {
    total_score: number
    visibility_score: number
    authority_score: number
    engagement_potential: number
    breakdown: {
        headline_strength: number
        keyword_coverage: number
        experience_depth: number
        skill_relevance: number
        completeness: number
    }
    recommendations: string[]
}

export function calculateOpportunityScore(
    profile: {
        headline?: string
        about?: string
        experience?: any[]
        skills?: string[]
        education?: string[]
        certifications?: string[]
    }
): OpportunityScore {
    const breakdown = {
        headline_strength: 0,
        keyword_coverage: 0,
        experience_depth: 0,
        skill_relevance: 0,
        completeness: 0
    }

    const recommendations: string[] = []

    // Headline strength (0-20)
    if (profile.headline) {
        if (profile.headline.length >= 30) breakdown.headline_strength += 10
        if (profile.headline.includes('|')) breakdown.headline_strength += 5
        if (/\d/.test(profile.headline)) breakdown.headline_strength += 5
    } else {
        recommendations.push('Add a headline with your role, industry, and value proposition')
    }

    // Keyword coverage (0-20)
    const seoAnalysis = analyzeSEO(
        profile.headline || '',
        profile.about || '',
        profile.skills || []
    )
    breakdown.keyword_coverage = Math.round(seoAnalysis.recruiter_score * 0.2)

    // Experience depth (0-25)
    if (profile.experience) {
        const expWithDesc = profile.experience.filter(e =>
            e.description && e.description.length > 50
        ).length
        breakdown.experience_depth = Math.min(25, expWithDesc * 8)

        if (expWithDesc < profile.experience.length) {
            recommendations.push('Add detailed descriptions to all experience entries')
        }
    }

    // Skill relevance (0-15)
    if (profile.skills) {
        breakdown.skill_relevance = Math.min(15, profile.skills.length * 1.5)
        if (profile.skills.length < 10) {
            recommendations.push('Add more relevant skills (aim for 10+)')
        }
    }

    // Completeness (0-20)
    let completeness = 0
    if (profile.headline) completeness += 4
    if (profile.about && profile.about.length > 50) completeness += 4
    if (profile.experience && profile.experience.length > 0) completeness += 4
    if (profile.skills && profile.skills.length > 0) completeness += 4
    if (profile.education && profile.education.length > 0) completeness += 2
    if (profile.certifications && profile.certifications.length > 0) completeness += 2
    breakdown.completeness = completeness

    // Calculate totals
    const total = Object.values(breakdown).reduce((a, b) => a + b, 0)
    const visibility = breakdown.headline_strength + breakdown.keyword_coverage
    const authority = breakdown.experience_depth + breakdown.skill_relevance
    const engagement = Math.round(total * 0.6) // Engagement potential based on profile strength

    return {
        total_score: total,
        visibility_score: visibility,
        authority_score: authority,
        engagement_potential: engagement,
        breakdown,
        recommendations
    }
}

// ============================================================
// 5. ABOUT SECTION GENERATOR
// ============================================================

export interface AboutInput {
    name?: string
    role: string
    experience_summary?: string
    experience?: string
    passion?: string
    achievement?: string
    skills?: string
    audience?: string
    cta?: string
}

interface GeneratedAbout {
    text: string
    style: string
    word_count: number
    char_count: number
}

export function generateAbout(input: AboutInput): GeneratedAbout[] {
    const results: GeneratedAbout[] = []
    const role = input.role
    const exp = input.experience_summary || ''
    const passion = input.passion || ''
    const achievement = input.achievement || ''
    const skills = input.skills || ''
    const audience = input.audience || ''
    const cta = input.cta || ''

    // Helper: ensure sentence ends properly
    const endSentence = (s: string) => {
        const t = s.trim()
        return t && !t.endsWith('.') && !t.endsWith('!') && !t.endsWith('?') ? t + '.' : t
    }

    // Extract keywords from experience for richer output
    const expSentences = exp.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10)
    const firstExp = expSentences[0] || ''
    const restExp = expSentences.slice(1).map(s => endSentence(s)).join(' ')
    const skillList = skills.split(/[,·•]+/).map(s => s.trim()).filter(s => s.length > 1)

    // Style 1: Narrative Arc | hook → background → depth → future
    {
        const lines: string[] = []

        // Opening: use their experience as the hook, not a generic intro
        if (firstExp) {
            lines.push(endSentence(firstExp))
        } else {
            lines.push(`I'm a ${role} | and I take that title seriously.`)
        }
        lines.push('')

        // Body: weave in experience depth
        if (restExp) {
            lines.push(restExp)
            lines.push('')
        }

        // Passion as a natural bridge, not a label
        if (passion) {
            lines.push(`What keeps me going: ${passion.toLowerCase().startsWith('i ') ? passion : passion.charAt(0).toLowerCase() + passion.slice(1)}. It's not just something I do | it's how I think about every problem I tackle.`)
            lines.push('')
        }

        // Achievement woven in naturally
        if (achievement) {
            lines.push(`Something I'm proud of: ${achievement.charAt(0).toLowerCase() + achievement.slice(1).replace(/\.$/, '')}. It taught me that the best work happens when you care about the outcome, not just the output.`)
            lines.push('')
        }

        // Skills as context, not a grocery list
        if (skillList.length > 0) {
            if (skillList.length <= 3) {
                lines.push(`Day to day, I work with ${skillList.join(' and ')} | but I'm always picking up new tools when the problem demands it.`)
            } else {
                lines.push(`My core stack: ${skillList.slice(0, 4).join(', ')}${skillList.length > 4 ? `, and more` : ''}. I pick up new tools fast when the problem demands it.`)
            }
            lines.push('')
        }

        // Audience-aware closing
        if (audience) {
            lines.push(`I work best with ${audience.toLowerCase()}.`)
            lines.push('')
        }

        // CTA
        if (cta) {
            lines.push(cta)
        } else {
            lines.push(`If any of this resonates, let's connect. I'm always up for a good conversation about ${passion ? passion.toLowerCase().replace(/^i /, '').split(' ').slice(0, 4).join(' ') : 'what we can build together'}.`)
        }

        const text = lines.filter(l => l !== undefined).join('\n')
        results.push({ text, style: 'Narrative Arc', word_count: text.split(/\s+/).length, char_count: text.length })
    }

    // Style 2: Bold Opener | punchy first line → credentials → value
    {
        const lines: string[] = []

        // Hook: start with their strongest signal
        if (achievement) {
            lines.push(endSentence(achievement.charAt(0).toUpperCase() + achievement.slice(1)))
            lines.push('')
            if (exp) {
                lines.push(endSentence(exp))
                lines.push('')
            }
        } else if (passion) {
            lines.push(`Most ${role.toLowerCase()}s focus on the task. I focus on ${passion.toLowerCase().startsWith('i ') ? passion.toLowerCase().replace(/^i /, 'the ').split(' ').slice(0, 5).join(' ') : passion.toLowerCase()}.`)
            lines.push('')
            if (exp) {
                lines.push(endSentence(exp))
                lines.push('')
            }
        } else if (exp) {
            lines.push(`Here's what you should know about me:`)
            lines.push('')
            lines.push(endSentence(exp))
            lines.push('')
        } else {
            lines.push(`${role}. Builder. Problem-solver.`)
            lines.push('')
        }

        // Skills as value, not list
        if (skillList.length > 0) {
            lines.push(`What I work with: ${skillList.join(', ')}.`)
            lines.push('')
        }

        // Passion as depth
        if (passion && !achievement) {
            lines.push(`What drives me: ${endSentence(passion)}`)
            lines.push('')
        } else if (passion && achievement) {
            lines.push(`Beyond the work, I care deeply about ${passion.toLowerCase().startsWith('i ') ? passion.toLowerCase().replace(/^i /, '') : passion.toLowerCase()}.`)
            lines.push('')
        }

        if (audience) {
            lines.push(`If you're ${audience.toLowerCase()}, we should talk.`)
        }

        if (cta) {
            lines.push('')
            lines.push(cta)
        } else {
            lines.push('')
            lines.push(`Let's connect | I don't bite.`)
        }

        const text = lines.filter(l => l !== undefined).join('\n')
        results.push({ text, style: 'Bold Opener', word_count: text.split(/\s+/).length, char_count: text.length })
    }

    // Style 3: Scannable | short paragraphs, easy to skim on mobile
    {
        const lines: string[] = []

        lines.push(`📌 ${role}`)
        lines.push('')

        if (exp) {
            lines.push(endSentence(exp))
            lines.push('')
        }

        if (achievement) {
            lines.push(`🏆 ${endSentence(achievement)}`)
            lines.push('')
        }

        if (skillList.length > 0) {
            lines.push(`🛠 ${skillList.join(' · ')}`)
            lines.push('')
        }

        if (passion) {
            lines.push(`🔥 ${endSentence(passion.charAt(0).toUpperCase() + passion.slice(1))}`)
            lines.push('')
        }

        if (audience) {
            lines.push(`🤝 I work best with ${audience.toLowerCase()}.`)
            lines.push('')
        }

        if (cta) {
            lines.push(cta)
        } else {
            lines.push(`📩 Always open to connect | send me a message.`)
        }

        const text = lines.filter(l => l !== undefined).join('\n')
        results.push({ text, style: 'Scannable', word_count: text.split(/\s+/).length, char_count: text.length })
    }

    return results
}

// ============================================================
// 6. POST HOOK GENERATOR
// ============================================================

export interface PostHookInput {
    topic: string
    angle?: string
    audience?: string
}

interface GeneratedHook {
    text: string
    style: string
    why_it_works: string
}

export function generatePostHooks(input: PostHookInput): GeneratedHook[] {
    const topic = input.topic
    const angle = input.angle || ''
    const audience = input.audience || 'professionals'

    if (!topic) return []

    // Smart topic analysis: extract actionable keywords
    const topicLower = topic.toLowerCase()
    const topicWords = topicLower.split(/\s+/).filter(w => w.length > 3)
    const coreTopic = topicWords.slice(0, 3).join(' ')

    // Detect domain for richer context
    const domainMap: [RegExp, string, string][] = [
        [/\b(ai|machine learning|automation|chatgpt|llm|data|algorithm)\b/, 'the AI wave', 'tech-savvy'],
        [/\b(leadership|manage|team|culture|hiring|talent)\b/, 'leadership circles', 'leader'],
        [/\b(career|job|interview|resume|promotion|salary|hiring)\b/, 'career growth', 'career-driven'],
        [/\b(startup|founder|entrepreneur|venture|fundrais|bootstrap)\b/, 'startup culture', 'builder'],
        [/\b(marketing|brand|content|social media|audience|growth|seo)\b/, 'growth circles', 'growth-focused'],
        [/\b(sales|revenue|pipeline|deal|closing|cold call)\b/, 'sales floors', 'revenue-minded'],
        [/\b(design|ux|ui|creative|visual|product design)\b/, 'creative spaces', 'design-thinking'],
        [/\b(health|wellness|mental|burnout|stress|balance|fitness)\b/, 'wellness conversations', 'health-conscious'],
        [/\b(finance|invest|money|wealth|trading|crypto|budget)\b/, 'financial circles', 'financially literate'],
        [/\b(remote|hybrid|wfh|distributed|async|flexible)\b/, 'the future-of-work debate', 'location-independent'],
        [/\b(education|teach|learn|student|course|skill|training)\b/, 'learning communities', 'growth-oriented'],
        [/\b(writing|content|blog|newsletter|storytelling|author)\b/, 'content circles', 'storytelling-driven'],
    ]
    let domain = 'the professional world'
    let audienceAdj = 'ambitious'
    for (const [regex, d, adj] of domainMap) {
        if (regex.test(topicLower)) { domain = d; audienceAdj = adj; break }
    }

    // Seeded pick for deterministic variety
    let seed = 0
    for (let i = 0; i < topic.length; i++) seed = ((seed << 5) - seed) + topic.charCodeAt(i)
    const pick = <T,>(arr: T[], offset: number = 0): T => arr[Math.abs(seed + offset) % arr.length]

    const hooks: GeneratedHook[] = []

    // Style 1: Pattern Interrupt
    hooks.push({
        text: `Everyone in ${domain} is talking about ${topic}.\n\nAlmost nobody is doing it right.\n\nHere is the difference between the signal and the noise:`,
        style: 'Pattern Interrupt',
        why_it_works: 'Pattern interrupts work because they break the expected narrative. The reader assumes agreement, then gets challenged | creating cognitive tension that demands resolution.'
    })

    // Style 2: Curiosity Gap
    hooks.push({
        text: `I spent ${pick(['6 months', '200+ hours', '3 years', 'the last quarter'], 1)} studying how top ${audience} approach ${topic}.\n\n${pick(['One pattern kept showing up.', 'The #1 factor was not what I expected.', 'Three insights changed my entire perspective.', 'What I found surprised me.'], 2)}`,
        style: 'Curiosity Gap',
        why_it_works: 'Curiosity gaps exploit the information gap theory | when people feel they are missing key information, the discomfort drives them to keep reading to close the loop.'
    })

    // Style 3: Contrarian
    hooks.push({
        text: `${pick(['Unpopular opinion', 'Hot take', 'Controversial thought', 'I will probably get pushback for this, but'], 3)}: ${angle ? angle : `The most common advice about ${topic} is actively hurting ${audience}`}.\n\n${pick(['Here is what actually works:', 'Let me explain why:', 'And I have the receipts:', 'Here is what I mean:'], 4)}`,
        style: 'Contrarian',
        why_it_works: 'Contrarian hooks trigger the instinct to defend or validate beliefs. Either way, the reader engages | to argue or to learn.'
    })

    // Style 4: Story Hook (in medias res)
    hooks.push({
        text: `${pick(['"You are making a huge mistake."', '"This is not going to work."', '"Why would you try that?"', '"Nobody does it that way."'], 5)}\n\nThat is what I was told when I started approaching ${topic} differently.\n\n${pick(['12 months later, here is what happened:', 'Fast forward to today:', 'They were wrong. Here is why:', 'The results proved everyone wrong:'], 6)}`,
        style: 'Story Hook',
        why_it_works: 'In medias res drops readers into a dramatic moment. The emotional tension of a quoted dismissal creates narrative investment | readers need to see the resolution.'
    })

    // Style 5: Data-Led
    hooks.push({
        text: `${pick(['Only 3%', 'Less than 1 in 10', 'Fewer than 5%', 'A recent study found that 8%'], 7)} of ${audience} ${pick(['actually understand', 'consistently apply', 'get meaningful results from', 'have mastered'], 8)} ${coreTopic}.\n\nThe gap between knowing and doing is where the opportunity lives.`,
        style: 'Data-Led',
        why_it_works: 'Specific numbers create instant credibility and anchor the reader in concrete reality. The low percentage creates both urgency and aspiration | nobody wants to be in the majority failing.'
    })

    // Style 6: Confession
    hooks.push({
        text: `I used to be terrible at ${topic}.\n\nNot "learning curve" terrible. I mean ${pick(['embarrassingly, publicly bad', 'so bad my colleagues noticed', 'failing at the basics', "'how-did-I-get-this-job' bad"], 9)}.\n\n${pick(['Here is how I turned it around:', 'What changed everything was surprisingly simple:', 'The turning point was not a course or a book:', 'Then one conversation changed my entire approach:'], 10)}`,
        style: 'Confession',
        why_it_works: 'Vulnerability builds trust instantly. When someone admits failure on LinkedIn | a platform of curated success | it creates a powerful authenticity signal that stops the scroll.'
    })

    return hooks
}

// ============================================================
// 7. PROFILE ARCHETYPE (Already in deterministicScoring.ts)
// Re-export for convenience
// ============================================================

export { classifyArchetype } from './deterministicScoring'
export type { ProfileArchetype } from './deterministicScoring'

// ============================================================
// 8. POST IDEA GENERATOR (Rule-based fallback)
// ============================================================

export interface PostIdeaInput {
    industry: string
    goal: string
    niche?: string
    postType?: string
}

export function generatePostIdeas(input: PostIdeaInput) {
    const { industry, goal, niche } = input
    const focus = niche || industry

    const pillars = ['growth', 'insights', 'engagement', 'growth', 'insights']
    const formats = ['Text post', 'Carousel', 'Poll', 'Storytelling', 'How-to']
    const templates = [
        {
            title: `The #1 mistake most ${industry} professionals make`,
            hook: `I've been in ${industry} for years. The biggest mistake I see? Confusing activity with progress.`,
            angle: 'Contrarian insight that challenges conventional wisdom',
        },
        {
            title: `3 ${focus} lessons I learned the hard way`,
            hook: `Nobody told me these three things when I started in ${focus}. I wish they had.`,
            angle: 'Personal experience turned into actionable advice',
        },
        {
            title: `Why ${industry} is about to change completely`,
            hook: `The ${industry} landscape in 2025 looks nothing like 2023. Here is what is shifting and why it matters for your career.`,
            angle: 'Industry trend analysis with career implications',
        },
        {
            title: `My unpopular opinion about ${focus}`,
            hook: `I will probably get pushback for this, but the most common advice about ${focus} is actively hurting people.`,
            angle: 'Provocative take that sparks meaningful debate',
        },
        {
            title: `How I would build a ${industry} career from scratch today`,
            hook: `If I were starting over in ${industry} today, here is exactly what I would do differently.`,
            angle: 'Practical roadmap based on hindsight and experience',
        },
    ]

    return templates.map((t, i) => ({
        pillar: pillars[i],
        title: t.title,
        hook: t.hook,
        angle: t.angle,
        format: formats[i],
    }))
}

// ============================================================
// 9. STORY TO POST (Rule-based fallback)
// ============================================================

export interface StoryToPostInput {
    story: string
    tone?: string
    goal?: string
}

export function convertStoryToPost(input: StoryToPostInput) {
    const { story, goal } = input
    const sentences = story.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 5)
    const firstSentence = sentences[0] || story.slice(0, 80)
    const lesson = goal || 'Sometimes the best lessons come from unexpected places.'

    const hook = `${firstSentence.slice(0, 60)}...`
    const body = `${firstSentence}.\n\nBut here is the thing nobody talks about:\n\n${sentences.slice(1, 3).join('. ')}.\n\nThe lesson?\n\n${lesson}\n\nIf you have been through something similar, you know exactly what I mean.\n\nThe experience taught me that growth does not come from comfort. It comes from the moments that challenge everything you thought you knew.`
    const hashtags = ['careers', 'growth', 'lessons', 'linkedin', 'professionaldevelopment']

    return {
        hook,
        body,
        takeaway: lesson,
        hashtags,
        word_count: body.split(/\s+/).length,
        tone_used: 'Reflective and authentic',
    }
}

// ============================================================
// 10. COMMENT GENERATOR (Rule-based fallback)
// ============================================================

export interface CommentInput {
    postContent: string
    style: string
    expertise?: string
}

export function generateComments(input: CommentInput) {
    const { postContent, style, expertise } = input
    const words = postContent.split(/\s+/).filter(Boolean)
    const topicWords = words.filter(w => w.length > 5).slice(0, 3).join(' ')
    const expertiseNote = expertise ? ` From my experience in ${expertise},` : ''

    const comments = [
        {
            text: `This resonates.${expertiseNote} the point about ${topicWords || 'this topic'} is especially relevant right now. What I have found is that the people who understand this early gain a significant edge. Thanks for sharing this perspective.`,
            label: 'Thoughtful Agreement',
        },
        {
            text: `${expertiseNote ? expertiseNote.trim() : 'Interesting perspective.'} I would add one nuance: the challenge most people face is not understanding the concept, it is implementing it consistently. Have you found any specific approach that makes this easier to sustain long-term?`,
            label: 'Adds Nuance + Question',
        },
        {
            text: `This reminded me of a similar situation I encountered.${expertiseNote} The insight about ${topicWords || 'this'} mirrors exactly what I saw play out. The key difference was in the execution. Great framing of a complex topic.`,
            label: 'Personal Experience',
        },
    ]

    return comments
}

// ============================================================
// 11. CONNECTION MESSAGE GENERATOR (Rule-based fallback)
// ============================================================

export interface ConnectionMessageInput {
    type: string
    name: string
    context?: string
    yourRole?: string
    recipientRole?: string
    intent?: string
}

export function generateConnectionMessages(input: ConnectionMessageInput) {
    const { type, name, context, yourRole, recipientRole } = input
    const firstName = name.split(' ')[0] || 'there'

    const templates: Record<string, { tone: string; message: string; tip: string }[]> = {
        default: [
            {
                tone: 'Direct',
                message: `Hi ${firstName}, I came across your profile${recipientRole ? ` (${recipientRole.slice(0, 30)})` : ''} and your work caught my attention.${context ? ` ${context.slice(0, 80)}.` : ''} Would love to connect${yourRole ? ` (I'm a ${yourRole.split(' ').slice(0, 4).join(' ')})` : ''}.`,
                tip: 'Short, specific, and gives them a reason to accept.',
            },
            {
                tone: 'Warm',
                message: `Hey ${firstName}! Really enjoyed seeing your perspective${context ? ` on ${context.slice(0, 50)}` : ''}. I think we have a lot of shared interests${recipientRole ? ` in the ${recipientRole.split(' ').slice(0, 3).join(' ')} space` : ''}. Would be great to be connected!`,
                tip: 'Warm tone builds rapport and feels personal.',
            },
            {
                tone: 'Value-First',
                message: `Hi ${firstName}, ${yourRole ? `I'm a ${yourRole.split(' ').slice(0, 4).join(' ')} and ` : ''}I think we could learn a lot from each other's experiences${context ? ` around ${context.slice(0, 50)}` : ''}. Happy to share what I've been working on too.`,
                tip: 'Offering value upfront increases acceptance rate.',
            },
        ],
    }

    const messages = templates[type] || templates.default
    return messages.map(m => ({
        ...m,
        charCount: m.message.length,
    }))
}

// ============================================================
// 12. CONTENT PLANNER (Rule-based fallback)
// ============================================================

export interface ContentPlannerInput {
    industry: string
    role: string
    frequency: string
}

export function generateWeeklyPlan(input: ContentPlannerInput) {
    const { industry, role, frequency } = input
    const freq = parseInt(frequency) || 3
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].slice(0, freq)
    const pillars = ['growth', 'insights', 'engagement', 'growth', 'insights']
    const formats = ['Storytelling', 'How-to/Carousel', 'Poll/Question', 'Case Study', 'Listicle']

    const prompts = [
        `Share a lesson from your journey as a ${role} in ${industry}. What did you learn the hard way that you wish someone told you earlier?`,
        `Break down a process or framework from your ${industry} experience. What does a day/week look like for a ${role}? Share behind-the-scenes.`,
        `Ask your network a thought-provoking question about ${industry}. Something that sparks genuine discussion, not just "agree/disagree."`,
        `Share a specific result or outcome from your work as a ${role}. What was the challenge, what did you do, and what happened?`,
        `List 3-5 tools, books, or resources that have made a real difference in your ${industry} career. Explain why each matters.`,
    ]

    const examples = [
        `"After ${Math.floor(Math.random() * 5 + 3)} years as a ${role}, here is the one thing I would change if I started over..."`,
        `"Most ${industry} professionals overcomplicate this. Here is my simple ${Math.floor(Math.random() * 3 + 3)}-step framework..."`,
        `"Honest question for ${industry} professionals: Is [common practice] actually worth the effort? Here is what I have seen..."`,
        `"We went from [before] to [after] in ${Math.floor(Math.random() * 6 + 3)} months. Here is exactly how we did it..."`,
        `"${Math.floor(Math.random() * 3 + 3)} ${industry} tools I cannot live without in 2025. Number ${Math.floor(Math.random() * 2 + 2)} changed everything..."`,
    ]

    return days.map((day, i) => ({
        day,
        pillar: pillars[i],
        format: formats[i],
        prompt: prompts[i],
        example: examples[i],
    }))
}
