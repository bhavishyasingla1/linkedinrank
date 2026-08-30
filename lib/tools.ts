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
            text: `${role} | Specializing in ${industry}${specialty ? ` · ${specialty}` : ''}`,
            score: 84,
            style: 'Industry-Focused',
            tip: 'Shows clear domain focus. Works well for people building targeted authority.'
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
            text: `Helping ${industry} teams achieve ${outcome} | ${role}${company ? ` @ ${company}` : ''}`,
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
    improve: ['Improved', 'Strengthened', 'Optimized', 'Elevated', 'Refined'],
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

export interface BulletImprovement {
    original: string
    improved: string
    alternatives: string[]
    suggestions: string[]
    has_action_verb: boolean
    has_metric: boolean
    has_result: boolean
    score: number
}

export function improveBullet(bullet: string, style: 'concise' | 'storytelling' | 'ats' = 'concise'): BulletImprovement {
    const original = bullet.trim()
    const lowerBullet = original.toLowerCase()
    const suggestions: string[] = []

    const normalizeCore = (s: string) => {
        let t = (s || '').trim()
        t = t.replace(/^(?:i|we)\s+/i, '')
        t = t.replace(/^my\s+team\s+/i, '')
        t = t.replace(/^our\s+team\s+/i, '')
        t = t.replace(/^my\s+/i, '')
        t = t.replace(/^our\s+/i, '')
        t = t.replace(/^(?:was|were|am|are|have|has|had|will|would|can|could)\s+/i, '')
        t = t.replace(/^to\s+/i, '')
        t = t.replace(/\s+/g, ' ').trim()
        t = t.replace(/^i\b\s*/i, '')
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

    let coreContent = original
    if (hasWeakStarter) {
        const ws = WEAK_STARTERS.find(w => lowerBullet.startsWith(w))!
        coreContent = original.substring(ws.length).trim()
        coreContent = coreContent.charAt(0).toUpperCase() + coreContent.slice(1)
    }

    const normalizedCore = normalizeCore(coreContent)
    const coreLower = normalizedCore ? normalizedCore.charAt(0).toLowerCase() + normalizedCore.slice(1) : 'key initiatives and workflows'

    let v1 = `${verbs[0]} ${coreLower}`
    let v2 = `${verbs[1] || 'Drove'} ${coreLower}`
    let v3 = `${verbs[2] || 'Delivered'} ${coreLower}`

    if (style === 'concise') {
        v1 = `${verbs[0]} ${coreLower}${hasMetric ? '' : ', accelerating delivery by 35%'}`
        v2 = `${verbs[1] || 'Optimized'} ${coreLower}${hasMetric ? '' : ', driving 2x improvement across core KPIs'}`
        v3 = `${verbs[2] || 'Executed'} ${coreLower}${hasMetric ? '' : ' with zero downtime'}`
    } else if (style === 'storytelling') {
        v1 = `Spearheaded ${coreLower}, resolving legacy bottlenecks and achieving measurable business impact.`
        v2 = `Identified key inefficiencies in current workflow, then ${verbs[0].toLowerCase()} ${coreLower} to unlock cross-functional scale.`
        v3 = `Championed ${coreLower} from inception to deployment, partnering with stakeholders to deliver high-priority milestones.`
    } else if (style === 'ats') {
        v1 = `${verbs[0]} ${coreLower} utilizing modern best practices, automated tooling, and end-to-end performance monitoring.`
        v2 = `Architected and executed ${coreLower} with scalable frameworks, reducing operational overhead and standardizing team processes.`
        v3 = `Directed ${coreLower} across enterprise lifecycle, aligning technical deliverables with strategic roadmap targets.`
    }

    // Clean up punctuation
    v1 = v1.replace(/\s+/g, ' ').replace(/\.+$/, '').trim()
    v2 = v2.replace(/\s+/g, ' ').replace(/\.+$/, '').trim()
    v3 = v3.replace(/\s+/g, ' ').replace(/\.+$/, '').trim()

    // Suggestions
    if (hasWeakStarter) {
        suggestions.push(`Replaced weak starter phrase with power verb "${verbs[0]}"`)
    } else if (!hasActionVerb) {
        suggestions.push(`Start directly with a power action verb (${verbs.slice(0, 3).join(', ')})`)
    }

    if (!hasMetric) {
        suggestions.push('Add specific numbers: revenue generated, team size, % improvement, or latency reduction')
    }

    if (!hasResult) {
        suggestions.push('Specify the concrete business result (e.g. "...resulting in 35% faster delivery")')
    }

    if (original.length < 40) {
        suggestions.push('Bullet is very brief — add scope, methodology, and outcome for maximum impact')
    }

    let score = 35
    if (hasActionVerb) score += 20
    if (hasMetric) score += 25
    if (hasResult) score += 20
    if (original.length >= 50 && original.length <= 180) score += 10
    if (hasWeakStarter) score -= 15

    return {
        original,
        improved: v1,
        alternatives: [v2, v3],
        suggestions,
        has_action_verb: hasActionVerb,
        has_metric: hasMetric,
        has_result: hasResult,
        score: Math.max(20, Math.min(98, score))
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
    experience_summary?: string | string[]
    experience?: string
    passion?: string
    achievement?: string
    skills?: string | string[]
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
    const exp = typeof input.experience_summary === 'string'
        ? input.experience_summary
        : Array.isArray(input.experience_summary)
        ? (input.experience_summary as string[]).join('. ')
        : typeof input.experience === 'string'
        ? input.experience
        : ''
    const passion = input.passion || ''
    const achievement = input.achievement || ''
    const rawSkills = input.skills
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
    const skillList = Array.isArray(rawSkills)
        ? rawSkills.map(s => String(s).trim()).filter(Boolean)
        : typeof rawSkills === 'string'
        ? rawSkills.split(/[,·•\n]+/).map(s => s.trim()).filter(s => s.length > 1)
        : []

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

    // Style 3: Conversational | warm, approachable, relatable colleague tone
    {
        const lines: string[] = []

        lines.push(`I build and scale solutions as a ${role}.`)
        lines.push('')

        if (exp) {
            lines.push(endSentence(exp))
            lines.push('')
        }

        if (achievement) {
            lines.push(`Over the course of this work, ${achievement.charAt(0).toLowerCase() + achievement.slice(1).replace(/\.$/, '')}.`)
            lines.push('')
        }

        if (skillList.length > 0) {
            lines.push(`My core toolkit centers around ${skillList.slice(0, 4).join(', ')}${skillList.length > 4 ? ', and related tools' : ''}.`)
            lines.push('')
        }

        if (passion) {
            lines.push(`What genuinely excites me is ${passion.toLowerCase().startsWith('i ') ? passion.toLowerCase().replace(/^i /, '') : passion.toLowerCase()}.`)
            lines.push('')
        }

        if (audience) {
            lines.push(`I love collaborating with ${audience.toLowerCase()}.`)
            lines.push('')
        }

        if (cta) {
            lines.push(cta)
        } else {
            lines.push(`Always happy to connect with fellow builders and curious minds — feel free to reach out.`)
        }

        const text = lines.filter(l => l !== undefined).join('\n')
        results.push({ text, style: 'Conversational', word_count: text.split(/\s+/).length, char_count: text.length })
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
    const coreTopic = topicWords.slice(0, 3).join(' ') || topic

    // Detect domain for richer context
    const domainMap: [RegExp, string, string][] = [
        [/\b(ai|machine learning|automation|chatgpt|llm|data|algorithm)\b/, 'the AI space', 'tech leaders'],
        [/\b(leadership|manage|team|culture|hiring|talent)\b/, 'leadership circles', 'managers'],
        [/\b(career|job|interview|resume|promotion|salary|hiring)\b/, 'career development', 'ambitious professionals'],
        [/\b(startup|founder|entrepreneur|venture|fundrais|bootstrap)\b/, 'startup ecosystems', 'founders'],
        [/\b(marketing|brand|content|social media|audience|growth|seo)\b/, 'growth strategy', 'marketers'],
        [/\b(sales|revenue|pipeline|deal|closing|cold call)\b/, 'B2B sales', 'sales professionals'],
        [/\b(design|ux|ui|creative|visual|product design)\b/, 'product design', 'designers'],
        [/\b(health|wellness|mental|burnout|stress|balance|fitness)\b/, 'workplace wellness', 'high performers'],
        [/\b(finance|invest|money|wealth|trading|crypto|budget)\b/, 'modern finance', 'investors'],
        [/\b(remote|hybrid|wfh|distributed|async|flexible)\b/, 'future of work', 'remote teams'],
        [/\b(education|teach|learn|student|course|skill|training)\b/, 'skills education', 'continuous learners'],
        [/\b(writing|content|blog|newsletter|storytelling|author)\b/, 'content strategy', 'creators'],
    ]
    let domain = 'our industry'
    let audienceAdj = audience
    for (const [regex, d, adj] of domainMap) {
        if (regex.test(topicLower)) { domain = d; audienceAdj = adj; break }
    }

    let seed = 0
    for (let i = 0; i < topic.length; i++) seed = ((seed << 5) - seed) + topic.charCodeAt(i)
    const pick = <T,>(arr: T[], offset: number = 0): T => arr[Math.abs(seed + offset) % arr.length]

    const hooks: GeneratedHook[] = []

    // Style 1: Pattern Interrupt
    hooks.push({
        text: `Most people in ${domain} approach ${topic} backwards.\n\nThey optimize for activity instead of leverage.\n\nHere is the mental model shift that changes everything:`,
        style: 'Pattern Interrupt',
        why_it_works: 'Disrupts the reader’s expected timeline and triggers curiosity to evaluate their own methods.'
    })

    // Style 2: Curiosity Gap
    hooks.push({
        text: `I spent ${pick(['3 months', '6 months', '2 years'], 1)} analyzing how top ${audienceAdj} master ${topic}.\n\n${pick(['The #1 differentiator was not what I expected.', 'One non-obvious pattern separated the top 1% from everyone else.'], 2)}\n\nHere is what I found:`,
        style: 'Curiosity Gap',
        why_it_works: 'Opens an unresolved information loop that compels the reader to expand "see more".'
    })

    // Style 3: Contrarian
    hooks.push({
        text: `Unpopular opinion on ${topic}:\n\nThe conventional playbook is actively holding ${audienceAdj} back.\n\n${angle ? `Here is the real truth about ${angle}:` : 'Here is the counter-intuitive approach that actually drives compounding results:'}`,
        style: 'Contrarian',
        why_it_works: 'Challenges common dogma with intellectual honesty, prompting engagement from both supporters and skeptics.'
    })

    // Style 4: Story Hook (In Medias Res)
    hooks.push({
        text: `"That will never scale in production."\n\nThat was the feedback when we first tested a new approach to ${topic}.\n\n12 months later, here is what the data proved:`,
        style: 'Story Hook',
        why_it_works: 'Opens with direct dialogue and stakes, creating instant narrative investment.'
    })

    // Style 5: Data-Led
    hooks.push({
        text: `Only 4% of ${audienceAdj} successfully implement ${coreTopic} on their first attempt.\n\nThe difference between failure and sustainable growth comes down to 3 core guardrails:`,
        style: 'Data-Led',
        why_it_works: 'Specific numbers signal authority and create urgency around avoiding common pitfalls.'
    })

    // Style 6: Confession / Vulnerability
    hooks.push({
        text: `My biggest career mistake was misunderstanding ${topic}.\n\nI wasted months fixing symptoms before realizing the root issue.\n\nIf I had to start over today, here is the exact 3-step checklist I would follow:`,
        style: 'Confession',
        why_it_works: 'Authentic vulnerability disarms corporate cynicism and positions the author as a helpful mentor.'
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
    const formats = ['Text Breakdown', 'Carousel / Slide Deck', 'Structured Case Study', 'Contrarian Take', 'Step-by-Step Guide']
    const templates = [
        {
            title: `The 3 Biggest Misconceptions About ${focus}`,
            hook: `Most professionals in ${industry} overcomplicate ${focus}. Here are the 3 assumptions holding teams back:`,
            angle: 'Debunks conventional assumptions with practical first-principles thinking',
        },
        {
            title: `How We Solved A Critical ${focus} Bottleneck`,
            hook: `When faced with scaling ${focus}, conventional advice told us to add more headcount. Here is what we built instead:`,
            angle: 'Behind-the-scenes engineering and workflow case study',
        },
        {
            title: `The ${industry} Playbook For 2026`,
            hook: `The landscape in ${industry} has shifted drastically. Here is the framework high-performing teams are using to stay ahead:`,
            angle: 'Forward-looking strategic perspective highlighting modern tools and workflows',
        },
        {
            title: `Why Traditional Approaches to ${focus} Fail`,
            hook: `I will probably get pushback from industry veterans for saying this, but the old ${focus} methodology is obsolete.`,
            angle: 'High-signal debate starter grounded in real production observations',
        },
        {
            title: `5 Tools & Mental Models That Accelerated My ${industry} Career`,
            hook: `If I had to restart my journey in ${industry} with zero network, these are the 5 systems I would double down on:`,
            angle: 'Actionable mentorship guide with zero fluff or generic platitudes',
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
    const { story, tone = 'classic', goal } = input
    const cleanStory = story.replace(/\s+/g, ' ').trim()
    const sentences = cleanStory.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 5)
    const firstSentence = sentences[0] || cleanStory.slice(0, 80)
    const lesson = goal || 'Compounding progress rarely comes from comfort; it comes from learning in production.'

    let hook = ''
    let body = ''
    const tags = ['growth', 'leadership', 'careertips', 'productivity', 'lessons']

    if (tone === 'listicle') {
        hook = `A critical lesson from ${firstSentence.toLowerCase().startsWith('i ') ? firstSentence.slice(2) : firstSentence.slice(0, 60)}:`
        const points = sentences.slice(1, 4).length > 0 
            ? sentences.slice(1, 4).map((s, idx) => `${idx + 1}. ${s}.`).join('\n\n')
            : `1. Define the actual constraint early.\n\n2. Iterate in small, defensible milestones.\n\n3. Protect the team from premature optimization.`
        
        body = `${hook}\n\n${points}\n\nThe core takeaway:\n${lesson}\n\nWhat is your team's experience with this?`
    } else if (tone === 'micro') {
        hook = `${firstSentence}.`
        body = `${hook}\n\nMost teams treat this as a surface problem. It is almost always an architecture or process constraint.\n\n${lesson}\n\nAgree or disagree?`
    } else {
        hook = `${firstSentence}.\n\nHere is what happened next:`
        const context = sentences.slice(1, 3).join('. ') || 'We had to re-evaluate our assumptions under real conditions.'
        body = `${hook}\n\n${context}.\n\nWhat this taught me:\n\n${lesson}\n\nWhen was the last time a setback became your team's biggest advantage?`
    }

    return {
        hook: body.split('\n')[0] || hook,
        body,
        takeaway: lesson,
        hashtags: tags,
        word_count: body.split(/\s+/).length,
        tone_used: tone === 'micro' ? 'Micro Insight' : tone === 'listicle' ? 'Numbered Takeaways' : 'Classic Narrative',
    }
}

// ============================================================
// 10. COMMENT GENERATOR (Rule-based fallback)
// ============================================================

export interface CommentInput {
    postContent: string
    style?: string
    expertise?: string
    length?: string
}

export function generateComments(input: CommentInput) {
    const { postContent, style = 'insightful', expertise, length = 'medium' } = input
    const cleanPost = postContent.replace(/\s+/g, ' ').trim()
    const words = cleanPost.split(/\s+/).filter(Boolean)
    const topicWords = words.filter(w => w.length > 5).slice(0, 3).join(' ') || 'this operational challenge'
    const expNote = expertise ? ` Drawing from my background in ${expertise}, ` : ''

    const isShort = length.includes('short') || length === 'short'
    const isDetailed = length.includes('detailed') || length === 'detailed'

    if (style === 'question') {
        return [
            {
                text: `${expNote}This highlights a critical point regarding ${topicWords}. How do you balance the trade-off between rapid iteration and long-term maintainability when executing this?`,
                label: 'Trade-Off Question',
            },
            {
                text: `Spot on observation about ${topicWords}. What guardrails have worked best for your team when rolling this out across cross-functional stakeholders?`,
                label: 'Implementation Probe',
            },
            {
                text: `Terrific breakdown. From your experience, at what team size or inflection point does this shift from a nice-to-have to a non-negotiable requirement?`,
                label: 'Scale & Milestone Question',
            },
        ]
    }

    if (style === 'contrarian') {
        return [
            {
                text: `${expNote}Interesting perspective on ${topicWords}. One nuance I have seen: while this works well in mature environments, early-stage teams often find that excessive structure here creates unwanted friction before product-market fit is established.`,
                label: 'Nuance on Stage & Context',
            },
            {
                text: `A valuable viewpoint, though in production we often found the inverse to be true: over-indexing on ${topicWords} can mask deeper architectural debt if the fundamentals are not stabilized first.`,
                label: 'Root Cause Perspective',
            },
            {
                text: `Appreciate you sharing this. The counter-argument worth weighing is whether the maintenance overhead of this approach justifies the marginal efficiency gains for smaller teams.`,
                label: 'Cost-Benefit Analysis',
            },
        ]
    }

    if (style === 'story') {
        return [
            {
                text: `${expNote}This reminded me of a project last year where we tackled ${topicWords}. We initially resisted changing our process, but embracing this exact shift reduced our turnaround time by nearly 40%.`,
                label: 'Quantified Case Study',
            },
            {
                text: `Seeing this in writing mirrors a lesson our team learned the hard way with ${topicWords}. The moment we codified this standard, communication bottlenecks dropped substantially.`,
                label: 'Team Experience',
            },
            {
                text: `Very relatable. We ran into this exact hurdle during our last migration. Prioritizing ${topicWords} early saved us weeks of painful refactoring down the line.`,
                label: 'Migration Observation',
            },
        ]
    }

    if (style === 'supportive') {
        return [
            {
                text: `${expNote}Completely agree with this framing on ${topicWords}. Having clear, transparent principles here simplifies decision-making across the board. Thank you for articulating this so clearly.`,
                label: 'Grounded Validation',
            },
            {
                text: `Such a clean summary of ${topicWords}. The emphasis on execution over theory is something more organizations need to embrace.`,
                label: 'Execution Affirmation',
            },
            {
                text: `Strongly endorse this. It is rare to see the reality of ${topicWords} explained with this degree of practical clarity.`,
                label: 'Clarity Endorsement',
            },
        ]
    }

    // Default: 'insightful'
    return [
        {
            text: `${expNote}The key insight here on ${topicWords} is that systemic constraints always trump individual effort. When you align incentives around this workflow, compounding velocity naturally follows.`,
            label: 'Systems Thinking Angle',
        },
        {
            text: `High-value perspective. What often gets overlooked with ${topicWords} is second-order effects: getting this right does not just save time, it dramatically increases psychological safety across teams.`,
            label: 'Second-Order Impact',
        },
        {
            text: `${expNote}Terrific framing. I would add that automating the feedback loops around ${topicWords} is what transforms this from a one-off win into an institutional superpower.`,
            label: 'Leverage & Automation',
        },
    ]
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
    const { type, name, context, yourRole, recipientRole, intent } = input
    const cleanName = (name || '').trim().replace(/^(dr|mr|mrs|ms|prof|sir)\.?\s+/i, '')
    const firstName = cleanName.split(/\s+/)[0] || 'there'

    const sender = yourRole ? yourRole.split(/[|,·]/)[0].trim() : ''
    const recipient = recipientRole ? recipientRole.split(/[|,·]/)[0].trim() : ''

    const templates: Record<string, { tone: string; message: string; tip: string }[]> = {
        'cold': [
            {
                tone: 'Direct & Specific',
                message: `Hi ${firstName}, saw your work${recipient ? ` in ${recipient}` : ''}${context ? ` regarding ${context.slice(0, 45)}` : ''}. ${sender ? `I'm a ${sender} and ` : ''}would love to connect and follow your journey.`,
                tip: 'Direct, polite, and references their actual domain without generic fluff.',
            },
            {
                tone: 'Warm & Relatable',
                message: `Hey ${firstName}! Really appreciate your perspective${context ? ` on ${context.slice(0, 45)}` : ''}. Always keen to connect with fellow builders in the space.`,
                tip: 'Warm peer-to-peer tone that feels personal and unforced.',
            },
            {
                tone: 'Value-First',
                message: `Hi ${firstName}, loved your recent insights${context ? ` on ${context.slice(0, 40)}` : ''}. ${sender ? `I focus on ${sender} and ` : ''}hope we can exchange ideas down the road.`,
                tip: 'Positions you as a thoughtful peer offering mutual value.',
            }
        ],
        'same-industry': [
            {
                tone: 'Direct Peer',
                message: `Hi ${firstName}, fellow ${sender || 'specialist'} here. Really impressed by your focus on ${recipient || context || 'the space'}. Would love to connect!`,
                tip: 'Establishes immediate common ground based on your shared domain.',
            },
            {
                tone: 'Shared Workflow',
                message: `Hey ${firstName}, noticed we're both tackling challenges in ${recipient || 'the industry'}${context ? ` like ${context.slice(0, 40)}` : ''}. Let's stay connected!`,
                tip: 'Highlights shared technical or market challenges.',
            },
            {
                tone: 'Discussion-Oriented',
                message: `Hi ${firstName}, great to find another ${sender || 'practitioner'} building in this space. Would love to stay in touch and swap notes.`,
                tip: 'Low friction invite that encourages future collaboration.',
            }
        ],
        'alumni': [
            {
                tone: 'School Pride',
                message: `Hi ${firstName}, great to connect with a fellow alum${context ? ` (${context.slice(0, 35)})` : ''}! Inspiring to see what you've built${recipient ? ` in ${recipient}` : ''}. Let's connect!`,
                tip: 'Shared alma mater establishes instant rapport and high acceptance.',
            },
            {
                tone: 'Casual Alum',
                message: `Hey ${firstName}! Came across your profile while exploring alumni paths${recipient ? ` in ${recipient}` : ''}. Would love to stay connected!`,
                tip: 'Friendly and straightforward outreach to fellow graduates.',
            },
            {
                tone: 'Mentorship / Shared Roots',
                message: `Hi ${firstName}, noticed we share the same background${context ? ` from ${context.slice(0, 30)}` : ''}. Would love to connect and follow your trajectory!`,
                tip: 'Expresses admiration without creating immediate pressure.',
            }
        ],
        'recruiter': [
            {
                tone: 'High-Signal Direct',
                message: `Hi ${firstName}, I'm a ${sender || 'specialist'}${context ? ` specializing in ${context.slice(0, 45)}` : ''}. Stumbled upon your talent focus and wanted to connect for future alignment.`,
                tip: 'Recruiters appreciate crisp clarity on your core seniority and focus.',
            },
            {
                tone: 'Warm & Open',
                message: `Hi ${firstName}, love the roles your team is building for${recipient ? ` at ${recipient}` : ''}. ${sender ? `As a ${sender}, ` : ''}let's connect to stay on each other's radar!`,
                tip: 'Proactive networking that plants a seed for current or future hiring.',
            },
            {
                tone: 'Specialization Fit',
                message: `Hey ${firstName}, saw you recruit for top teams${recipient ? ` at ${recipient}` : ''}. ${sender ? `I specialize in ${sender}` : 'Wanted to connect'} and expand my network with great recruiters.`,
                tip: 'Keeps it concise and professional within the 300-char cutoff.',
            }
        ],
        'founder': [
            {
                tone: 'Product-Focused',
                message: `Hi ${firstName}, big fan of what you're building${recipient ? ` at ${recipient}` : ''}${context ? ` around ${context.slice(0, 40)}` : ''}. Would love to connect and follow your growth!`,
                tip: 'Founders love hearing genuine appreciation for their product.',
            },
            {
                tone: 'Peer Builder',
                message: `Hey ${firstName}, really admire your journey with ${recipient || 'your venture'}. ${sender ? `As a fellow builder in ${sender}, ` : ''}wanted to connect!`,
                tip: 'Treats the founder as an equal builder in the broader ecosystem.',
            },
            {
                tone: 'Mission Alignment',
                message: `Hi ${firstName}, the problem you're tackling${context ? ` in ${context.slice(0, 40)}` : ''} is super timely. Hope to stay connected as you scale!`,
                tip: 'Validates their company mission with authentic enthusiasm.',
            }
        ],
        'liked-content': [
            {
                tone: 'Content Reference',
                message: `Hi ${firstName}, really enjoyed your recent post${context ? ` on ${context.slice(0, 45)}` : ''}. Great perspective on the real trade-offs. Let's connect!`,
                tip: 'Referencing a specific post proves you actually read their thoughts.',
            },
            {
                tone: 'Shared Takeaway',
                message: `Hey ${firstName}! Your post${context ? ` regarding ${context.slice(0, 40)}` : ''} was spot on. Wanted to connect and follow more of your insights.`,
                tip: 'Encourages the creator and shows you appreciate their public writing.',
            },
            {
                tone: 'Discussion Extension',
                message: `Hi ${firstName}, loved your breakdown${context ? ` on ${context.slice(0, 35)}` : ''}. Looking forward to seeing your future thoughts on the feed!`,
                tip: 'Polite and easy for any active content creator to accept.',
            }
        ],
        'mutual-connection': [
            {
                tone: 'Mutual Contact Mention',
                message: `Hi ${firstName}, noticed we're both connected with ${context || 'mutual colleagues in the space'}. Inspiring work${recipient ? ` in ${recipient}` : ''}—let's connect!`,
                tip: 'Leverages social proof to dramatically increase trust.',
            },
            {
                tone: 'Shared Community',
                message: `Hey ${firstName}! Saw that we share mutual circles${context ? ` around ${context.slice(0, 40)}` : ''}. Would be great to connect directly!`,
                tip: 'Warm and natural way to bridge second-degree networks.',
            },
            {
                tone: 'Peer Introduction',
                message: `Hi ${firstName}, came across your profile via mutual connections. ${sender ? `I'm a ${sender} and ` : ''}would love to be connected!`,
                tip: 'Crisp, courteous note that establishes mutual network overlap.',
            }
        ],
        'event': [
            {
                tone: 'Event Follow-Up',
                message: `Hi ${firstName}, great meeting you at ${context || 'the event'}${recipient ? ` and discussing ${recipient}` : ''}! Let's stay in touch here on LinkedIn.`,
                tip: 'Quickly reconnects within 24-48 hours of meeting in person.',
            },
            {
                tone: 'Shared Session',
                message: `Hey ${firstName}! Really enjoyed our brief chat at ${context || 'the conference'}. Excited to follow your progress${recipient ? ` in ${recipient}` : ''}!`,
                tip: 'Re-ignites the positive momentum from a live conference or meetup.',
            },
            {
                tone: 'Key Takeaway Mention',
                message: `Hi ${firstName}, great speaking at ${context || 'the meetup'}. Loved your take on the space—let's keep the conversation going!`,
                tip: 'Reinforces the relationship right after an offline interaction.',
            }
        ],
        'mentor': [
            {
                tone: 'Humble & Focused',
                message: `Hi ${firstName}, really admire your career trajectory${recipient ? ` as ${recipient}` : ''}. ${context ? `Your insights on ${context.slice(0, 40)} resonate deeply. ` : ''}Would be honored to connect!`,
                tip: 'Respectful without being overly transactional or demanding of their time.',
            },
            {
                tone: 'Specific Guidance',
                message: `Hey ${firstName}, as someone building towards ${intent || 'the same path'}, your journey${recipient ? ` in ${recipient}` : ''} is super inspiring. Let's connect!`,
                tip: 'Shows genuine alignment with their professional milestones.',
            },
            {
                tone: 'Learner Mindset',
                message: `Hi ${firstName}, loved your advice${context ? ` on ${context.slice(0, 40)}` : ''}. Hope to learn from your shared perspective here on LinkedIn.`,
                tip: 'Clear and respectful request with zero pressure for immediate calls.',
            }
        ],
        'collaboration': [
            {
                tone: 'Collaborative Idea',
                message: `Hi ${firstName}, love what you're doing${recipient ? ` with ${recipient}` : ''}. ${intent ? `Had an idea around ${intent.slice(0, 45)} ` : ''}and would love to connect and chat!`,
                tip: 'Piques curiosity about a specific potential partnership.',
            },
            {
                tone: 'Mutual Synergies',
                message: `Hey ${firstName}, ${sender ? `I'm a ${sender} and ` : ''}see great overlap between our work${context ? ` in ${context.slice(0, 35)}` : ''}. Let's connect!`,
                tip: 'Frames the connection as mutually beneficial from day one.',
            },
            {
                tone: 'Joint Project',
                message: `Hi ${firstName}, would love to connect${context ? ` regarding ${context.slice(0, 40)}` : ''}. Think we could create something great together!`,
                tip: 'Direct invitation to explore joint content or project ideas.',
            }
        ],
        'followup-noreply': [
            {
                tone: 'Fresh Value Addition',
                message: `Hi ${firstName}, wanted to follow up with a quick thought${context ? ` on ${context.slice(0, 45)}` : ''}. No pressure at all—hope you're having a great week!`,
                tip: 'Low pressure note that adds value rather than asking for things.',
            },
            {
                tone: 'Polite Bump',
                message: `Hey ${firstName}! Circling back in case my last note got buried. Would still love to connect${recipient ? ` and follow your work in ${recipient}` : ''}!`,
                tip: 'Acknowledges how busy inboxes get with polite, warm phrasing.',
            },
            {
                tone: 'Brief Reconnect',
                message: `Hi ${firstName}, know you're super busy. Just wanted to keep this on your radar whenever you have a moment. Cheers!`,
                tip: 'Super short, humble note that gives them a comfortable out.',
            }
        ],
        'followup-call': [
            {
                tone: 'Post-Call Recap',
                message: `Hi ${firstName}, really enjoyed our conversation yesterday${context ? ` around ${context.slice(0, 45)}` : ''}! Let's stay closely connected here.`,
                tip: 'Solidifies the relationship right after an intro call or zoom.',
            },
            {
                tone: 'Action Item Note',
                message: `Hey ${firstName}, thanks for the great call! Excited to follow up on ${intent || 'the next steps we discussed'}. Great to connect!`,
                tip: 'Keeps momentum moving forward on agreed topics.',
            },
            {
                tone: 'Warm Gratitude',
                message: `Hi ${firstName}, appreciated your time and insights today. Let's definitely keep in touch as things progress!`,
                tip: 'Gracious thank-you note that strengthens the connection.',
            }
        ],
        'followup-application': [
            {
                tone: 'Job Applicant Note',
                message: `Hi ${firstName}, just applied for the ${context || 'open role'}${recipient ? ` at ${recipient}` : ''}. ${sender ? `As a ${sender}, ` : ''}I'm super excited about the mission!`,
                tip: 'Puts a human face and enthusiasm behind your resume submission.',
            },
            {
                tone: 'Hiring Manager Touch',
                message: `Hey ${firstName}, submitted my application for your team's opening${context ? ` (${context.slice(0, 30)})` : ''}. Would love to connect and follow your team's work!`,
                tip: 'Polite touchpoint that doesn’t demand immediate review.',
            },
            {
                tone: 'Direct Alignment',
                message: `Hi ${firstName}, love what your team is building${recipient ? ` at ${recipient}` : ''}. Applied for the opening and wanted to introduce myself directly!`,
                tip: 'Shows proactive initiative and genuine interest in the company.',
            }
        ],
        'followup-event': [
            {
                tone: 'Post-Event Touch',
                message: `Hi ${firstName}, wonderful meeting you at ${context || 'the gathering'}. Loved hearing your perspective${recipient ? ` on ${recipient}` : ''}. Let's stay in touch!`,
                tip: 'Personalized recap of an informal or social networking meetup.',
            },
            {
                tone: 'Event Recap',
                message: `Hey ${firstName}! Great chat at the event. Hope you had safe travels back. Looking forward to staying connected here!`,
                tip: 'Warm and thoughtful touchpoint following a dinner or conference.',
            },
            {
                tone: 'Topic Follow-Up',
                message: `Hi ${firstName}, loved discussing ${context || 'our shared interests'} yesterday. Let's keep the dialogue going on LinkedIn!`,
                tip: 'Bridges the offline conversation to online professional updates.',
            }
        ]
    }

    const messages = templates[type] || templates.cold
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
    const pillars = ['growth', 'insights', 'engagement', 'growth', 'insights'].slice(0, freq)
    const formats = ['Storytelling & Lessons', 'Process Breakdown / Carousel', 'Open Question / Debate', 'Case Study & Metrics', 'Tooling & Mental Models'].slice(0, freq)

    const prompts = [
        `Share a pivotal lesson from your journey as a ${role} in ${industry}. What did you learn the hard way that you wish someone told you earlier?`,
        `Break down a concrete process or workflow from your ${industry} experience. What does a high-efficiency sprint look like for a ${role}?`,
        `Ask your network a thought-provoking question about ${industry}. Challenge a common industry trend and invite diverse perspectives.`,
        `Share a quantified result from your recent work as a ${role}. What was the challenge, what did you implement, and what was the outcome?`,
        `List 3-5 tools, frameworks, or resources that have transformed your productivity as a ${role} in ${industry}.`,
    ]

    const examples = [
        `"After years working as a ${role}, here is the #1 lesson that changed how I approach ${industry}:"`,
        `"Most ${industry} teams overcomplicate this process. Here is our simple 4-step framework:"`,
        `"Honest question for fellow ${role}s: Is the industry standard for [common practice] actually working for you?"`,
        `"We cut our delivery time in half last quarter. Here is the exact breakdown of what we fixed:"`,
        `"3 underrated tools every ${role} in ${industry} should have in their stack in 2026:"`,
    ]

    return days.map((day, i) => ({
        day,
        pillar: pillars[i] || 'insights',
        format: formats[i] || 'Text Post',
        prompt: prompts[i] || `Share a practical insight from ${industry}.`,
        example: examples[i] || `"Here is what top ${role}s know about ${industry}:"`,
    }))
}
