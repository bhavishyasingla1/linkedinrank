/**
 * STRENGTH TEST: All LinkedIn Tools
 * 
 * Tests:
 * 1. Basic functionality — do they return valid output?
 * 2. Context-driven dynamism — do outputs change meaningfully with different inputs?
 * 3. Edge cases — empty, minimal, unusual, very long inputs
 * 4. Scoring consistency — are scores reasonable and deterministic?
 * 5. Fallback functions from component files
 */

import {
    generateHeadlines, HeadlineInput,
    improveBullet,
    analyzeSEO,
    generateAbout, AboutInput,
    generatePostHooks, PostHookInput,
    calculateOpportunityScore,
} from '../lib/tools'

// ═══════════════════════════════════════════════════════════
// TEST INFRASTRUCTURE
// ═══════════════════════════════════════════════════════════

let passed = 0
let failed = 0
let warnings = 0
const failures: string[] = []
const warningsList: string[] = []

function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
        passed++
        console.log(`  ✅ ${testName}`)
    } else {
        failed++
        const msg = detail ? `${testName} — ${detail}` : testName
        failures.push(msg)
        console.log(`  ❌ ${testName}${detail ? ` (${detail})` : ''}`)
    }
}

function warn(testName: string, detail: string) {
    warnings++
    warningsList.push(`${testName}: ${detail}`)
    console.log(`  ⚠️  ${testName} — ${detail}`)
}

function section(name: string) {
    console.log(`\n${'═'.repeat(60)}`)
    console.log(`  ${name}`)
    console.log(`${'═'.repeat(60)}`)
}

// ═══════════════════════════════════════════════════════════
// 1. HEADLINE GENERATOR
// ═══════════════════════════════════════════════════════════

function testHeadlineGenerator() {
    section('HEADLINE GENERATOR')

    // --- Basic functionality ---
    console.log('\n--- Basic Functionality ---')

    const fullInput: HeadlineInput = {
        role: 'Senior Software Engineer',
        company: 'Google',
        industry: 'Technology',
        specialty: 'Cloud Architecture',
        skills: ['Python', 'Kubernetes', 'AWS', 'Terraform']
    }
    const fullResults = generateHeadlines(fullInput)

    assert(fullResults.length > 0, 'Full input produces headlines', `Got ${fullResults.length}`)
    assert(fullResults.length <= 8, 'Returns max 8 headlines', `Got ${fullResults.length}`)
    assert(fullResults.every(h => h.text.length >= 10), 'All headlines >= 10 chars')
    assert(fullResults.every(h => h.text.length <= 220), 'All headlines <= 220 chars')
    assert(fullResults.every(h => h.score >= 50 && h.score <= 98), 'All scores in 50-98 range')
    assert(fullResults.every(h => h.style.length > 0), 'All headlines have a style label')
    assert(fullResults.every(h => h.tip.length > 0), 'All headlines have a tip')

    // Sorted by score descending
    const sortedCorrectly = fullResults.every((h, i) => i === 0 || h.score <= fullResults[i - 1].score)
    assert(sortedCorrectly, 'Headlines sorted by score descending')

    // No duplicates
    const uniqueTexts = new Set(fullResults.map(h => h.text))
    assert(uniqueTexts.size === fullResults.length, 'No duplicate headline texts')

    // --- Context-driven dynamism ---
    console.log('\n--- Context-Driven Dynamism ---')

    const techInput: HeadlineInput = { role: 'Software Engineer', industry: 'Technology', skills: ['React', 'Node.js'] }
    const financeInput: HeadlineInput = { role: 'Financial Analyst', industry: 'Finance', skills: ['Excel', 'Bloomberg'] }
    const techHeadlines = generateHeadlines(techInput)
    const financeHeadlines = generateHeadlines(financeInput)

    // Headlines should be different for different roles
    const techTexts = new Set(techHeadlines.map(h => h.text))
    const financeTexts = new Set(financeHeadlines.map(h => h.text))
    const overlap = [...techTexts].filter(t => financeTexts.has(t))
    assert(overlap.length === 0, 'Different roles produce completely different headlines', `Overlap: ${overlap.length}`)

    // Headlines should contain the role
    assert(techHeadlines.some(h => h.text.includes('Software Engineer')), 'Tech headlines contain role')
    assert(financeHeadlines.some(h => h.text.includes('Financial Analyst')), 'Finance headlines contain role')

    // Headlines should contain industry
    assert(techHeadlines.some(h => h.text.includes('Technology')), 'Tech headlines contain industry')
    assert(financeHeadlines.some(h => h.text.includes('Finance')), 'Finance headlines contain industry')

    // Company presence changes output
    const withCompany = generateHeadlines({ role: 'Designer', company: 'Apple', industry: 'Technology' })
    const withoutCompany = generateHeadlines({ role: 'Designer', industry: 'Technology' })
    assert(withCompany.length > withoutCompany.length, 'Company adds more headline variants', `With: ${withCompany.length}, Without: ${withoutCompany.length}`)
    assert(withCompany.some(h => h.text.includes('Apple')), 'Company name appears in headlines')
    // Without company, "Open to Work" should appear; with company, it should not
    assert(withoutCompany.some(h => h.style === 'Open to Work'), 'No-company generates Open to Work headline')
    assert(!withCompany.some(h => h.style === 'Open to Work'), 'With-company suppresses Open to Work headline')

    // Skills presence changes output
    const withSkills = generateHeadlines({ role: 'Developer', skills: ['React', 'TypeScript', 'GraphQL', 'Docker'] })
    const withoutSkills = generateHeadlines({ role: 'Developer' })
    assert(withSkills.some(h => h.text.includes('React') || h.text.includes('TypeScript')), 'Skills appear in headlines')

    // Specialty changes output
    const withSpecialty = generateHeadlines({ role: 'Engineer', specialty: 'Machine Learning', industry: 'AI' })
    assert(withSpecialty.some(h => h.text.toLowerCase().includes('machine learning')), 'Specialty appears in headlines')

    // --- Edge Cases ---
    console.log('\n--- Edge Cases ---')

    assert(generateHeadlines({ role: '' }).length === 0, 'Empty role returns empty array')
    assert(generateHeadlines({}).length === 0, 'No role returns empty array')
    assert(generateHeadlines({ role: 'PM' }).length > 0, 'Very short role still works')

    const longRole = 'Senior Principal Staff Distinguished Software Engineering Technical Lead Manager'
    const longResults = generateHeadlines({ role: longRole })
    assert(longResults.length > 0, 'Very long role still produces results')
    assert(longResults.every(h => h.text.length <= 220), 'Long role headlines still within char limit')

    // Special characters
    const specialInput: HeadlineInput = { role: 'C++ Developer', company: 'AT&T', industry: 'Telecom' }
    const specialResults = generateHeadlines(specialInput)
    assert(specialResults.length > 0, 'Special characters in input work fine')

    // Clean function edge cases
    const cleanInput: HeadlineInput = { role: 'Engineer', company: 'N/A', industry: '0', specialty: '-' }
    const cleanResults = generateHeadlines(cleanInput)
    assert(!cleanResults.some(h => h.text.includes('N/A')), 'N/A company is cleaned out')
    assert(!cleanResults.some(h => h.text.includes(' 0')), '"0" industry is cleaned out')

    // --- Scoring Quality ---
    console.log('\n--- Scoring Quality ---')

    const richInput: HeadlineInput = {
        role: 'VP of Engineering',
        company: 'Stripe',
        industry: 'Fintech',
        specialty: 'Payment Infrastructure',
        skills: ['Distributed Systems', 'Team Building', 'Architecture', 'Go']
    }
    const richResults = generateHeadlines(richInput)
    const minimalResults = generateHeadlines({ role: 'Engineer' })

    const richAvgScore = richResults.reduce((s, h) => s + h.score, 0) / richResults.length
    const minAvgScore = minimalResults.reduce((s, h) => s + h.score, 0) / minimalResults.length
    assert(richAvgScore > minAvgScore, 'Rich input produces higher avg score than minimal', `Rich: ${richAvgScore.toFixed(1)}, Min: ${minAvgScore.toFixed(1)}`)

    // Determinism
    const run1 = generateHeadlines(fullInput)
    const run2 = generateHeadlines(fullInput)
    assert(JSON.stringify(run1) === JSON.stringify(run2), 'Same input produces identical output (deterministic)')
}

// ═══════════════════════════════════════════════════════════
// 2. BULLET IMPROVER
// ═══════════════════════════════════════════════════════════

function testBulletImprover() {
    section('BULLET IMPROVER (Achievement Writer)')

    // --- Basic functionality ---
    console.log('\n--- Basic Functionality ---')

    const weakBullet = 'Responsible for managing a team of 5 engineers'
    const result = improveBullet(weakBullet)

    assert(result.original === weakBullet, 'Original preserved')
    assert(result.improved !== weakBullet, 'Improved version differs from original')
    assert(!result.improved.toLowerCase().startsWith('responsible for'), 'Weak starter removed from improved')
    assert(result.has_action_verb === false || result.improved !== result.original, 'Action verb detection works')
    assert(result.suggestions.length > 0, 'Suggestions provided')
    assert(result.score >= 0 && result.score <= 100, 'Score in valid range')

    // --- Context-driven dynamism ---
    console.log('\n--- Context-Driven Dynamism ---')

    // Different contexts should produce different verbs
    const buildBullet = improveBullet('Responsible for developing the new payment system')
    const manageBullet = improveBullet('Responsible for managing the sales team')
    const analyzeBullet = improveBullet('Responsible for analyzing customer data')

    assert(buildBullet.improved !== manageBullet.improved, 'Build vs manage context produces different output')
    assert(manageBullet.improved !== analyzeBullet.improved, 'Manage vs analyze context produces different output')

    // Check correct verb categories
    const buildVerbs = ['Architected', 'Built', 'Developed', 'Engineered', 'Created']
    const manageVerbs = ['Led', 'Directed', 'Managed', 'Oversaw', 'Coordinated']
    const analyzeVerbs = ['Analyzed', 'Evaluated', 'Assessed', 'Identified', 'Researched']

    assert(
        buildVerbs.some(v => buildBullet.improved.startsWith(v)),
        'Build context uses build verbs',
        `Got: "${buildBullet.improved.split(' ')[0]}"`
    )
    assert(
        manageVerbs.some(v => manageBullet.improved.startsWith(v)),
        'Manage context uses manage verbs',
        `Got: "${manageBullet.improved.split(' ')[0]}"`
    )
    assert(
        analyzeVerbs.some(v => analyzeBullet.improved.startsWith(v)),
        'Analyze context uses analyze verbs',
        `Got: "${analyzeBullet.improved.split(' ')[0]}"`
    )

    // --- Weak starter detection ---
    console.log('\n--- Weak Starter Detection ---')

    const weakStarters = [
        'Responsible for managing projects',
        'Helped with customer onboarding',
        'Assisted in developing features',
        'Worked on the marketing campaign',
        'Was involved in product launches',
        'Participated in code reviews',
        'Supported the design team',
        'Handled client communications',
        'Tasked with building dashboards',
        'In charge of hiring new engineers',
        'Duties included writing reports',
    ]

    for (const ws of weakStarters) {
        const r = improveBullet(ws)
        const starterWord = ws.split(' ').slice(0, 2).join(' ').toLowerCase()
        assert(
            !r.improved.toLowerCase().startsWith(starterWord.slice(0, 6)),
            `Weak starter removed: "${ws.slice(0, 40)}..."`,
            `Improved starts with: "${r.improved.slice(0, 30)}"`
        )
    }

    // --- Metric detection ---
    console.log('\n--- Metric Detection ---')

    const withMetric = improveBullet('Led a team that increased revenue by 30%')
    const withDollar = improveBullet('Saved the company $500,000 annually')
    const withUsers = improveBullet('Built a platform serving 10000 users')
    const noMetric = improveBullet('Managed a team and handled projects')

    assert(withMetric.has_metric === true, 'Detects percentage metric')
    assert(withDollar.has_metric === true, 'Detects dollar metric')
    assert(withUsers.has_metric === true, 'Detects user count metric')
    assert(noMetric.has_metric === false, 'No false positive on metric detection')

    // --- Result detection ---
    console.log('\n--- Result Detection ---')

    const withResult = improveBullet('Redesigned the onboarding flow resulting in 50% faster activation')
    const withResult2 = improveBullet('Automated testing pipeline leading to 80% fewer bugs')
    const noResult = improveBullet('Built a new dashboard for the team')

    assert(withResult.has_result === true, 'Detects "resulting in" pattern')
    assert(withResult2.has_result === true, 'Detects "leading to" pattern')
    assert(noResult.has_result === false, 'No false positive on result detection')

    // --- Scoring logic ---
    console.log('\n--- Scoring Logic ---')

    const perfectBullet = improveBullet('Architected a microservices platform serving 2M users, resulting in 99.9% uptime and $3M annual savings')
    const terribleBullet = improveBullet('Did stuff')

    assert(perfectBullet.score > terribleBullet.score, 'Perfect bullet scores higher than terrible', `Perfect: ${perfectBullet.score}, Terrible: ${terribleBullet.score}`)
    assert(perfectBullet.has_action_verb === true, 'Perfect bullet has action verb')
    assert(perfectBullet.has_metric === true, 'Perfect bullet has metric')
    assert(perfectBullet.has_result === true, 'Perfect bullet has result')
    assert(terribleBullet.suggestions.length > perfectBullet.suggestions.length, 'Terrible bullet gets more suggestions')

    // --- Edge Cases ---
    console.log('\n--- Edge Cases ---')

    const singleWord = improveBullet('Engineering')
    assert(singleWord.improved.length > 0, 'Single word input still works')
    assert(singleWord.suggestions.some(s => s.includes('Too short')), 'Short bullet gets length warning')

    const veryLong = improveBullet('Responsible for ' + 'managing various cross-functional teams across multiple departments including engineering, design, product, and marketing to deliver complex enterprise software solutions that serve Fortune 500 clients globally '.repeat(2))
    assert(veryLong.suggestions.some(s => s.includes('splitting')), 'Very long bullet gets split suggestion')

    const alreadyGood = improveBullet('Architected a distributed caching system reducing latency by 40%, serving 5M daily requests')
    assert(alreadyGood.has_action_verb === true, 'Already-good bullet recognized as having action verb')
    assert(alreadyGood.score >= 60, 'Already-good bullet gets decent score', `Score: ${alreadyGood.score}`)

    // Gerund handling
    const gerundBullet = improveBullet('Responsible for managing a team of 10 engineers')
    assert(!gerundBullet.improved.toLowerCase().includes('managing'), 'Gerund replaced with proper verb', `Got: "${gerundBullet.improved}"`)

    // Determinism
    const r1 = improveBullet(weakBullet)
    const r2 = improveBullet(weakBullet)
    assert(JSON.stringify(r1) === JSON.stringify(r2), 'Same input produces identical output (deterministic)')
}

// ═══════════════════════════════════════════════════════════
// 3. SEO CHECKER
// ═══════════════════════════════════════════════════════════

function testSEOChecker() {
    section('SEO CHECKER')

    // --- Basic functionality ---
    console.log('\n--- Basic Functionality ---')

    const techResult = analyzeSEO(
        'Senior Software Engineer | Python | Cloud Architecture',
        'I am a software engineer with 8 years of experience building scalable cloud systems. I specialize in Python, AWS, and microservices architecture. I have led teams of 10+ engineers.',
        ['Python', 'AWS', 'Docker', 'Kubernetes', 'React', 'Node.js', 'SQL', 'Git']
    )

    assert(techResult.industry_match === 'tech', 'Correctly identifies tech industry')
    assert(techResult.recruiter_score >= 0 && techResult.recruiter_score <= 100, 'Score in valid range')
    assert(techResult.headline_score >= 0 && techResult.headline_score <= 30, 'Headline score in range')
    assert(techResult.about_score >= 0 && techResult.about_score <= 30, 'About score in range')
    assert(techResult.skills_score >= 0 && techResult.skills_score <= 20, 'Skills score in range')
    assert(techResult.found_keywords.length > 0, 'Found keywords not empty')
    assert(techResult.keyword_density > 0, 'Keyword density > 0')
    assert(techResult.recommendations.length <= 5, 'Max 5 recommendations')

    // --- Context-driven dynamism ---
    console.log('\n--- Context-Driven Dynamism ---')

    const marketingResult = analyzeSEO(
        'Digital Marketing Manager | Growth | Content Strategy',
        'I drive growth through data-driven marketing campaigns. Expert in SEO, content marketing, and paid media. Built audiences of 100K+ across social media platforms.',
        ['SEO', 'Content Marketing', 'Google Ads', 'Social Media', 'Analytics', 'Email Marketing', 'Copywriting', 'Brand Strategy']
    )

    assert(marketingResult.industry_match === 'marketing', 'Correctly identifies marketing industry')
    assert(marketingResult.found_keywords.some(k => k.includes('seo') || k.includes('marketing')), 'Marketing keywords found')

    // Different industries should produce different results
    assert(techResult.industry_match !== marketingResult.industry_match, 'Different profiles get different industry matches')
    assert(
        JSON.stringify(techResult.found_keywords) !== JSON.stringify(marketingResult.found_keywords),
        'Different profiles get different found keywords'
    )

    // Test all industry detections
    const industries: [string, string, string[], string][] = [
        ['Product Manager | Roadmap | Strategy', 'I manage product roadmaps and run sprints with cross-functional teams.', ['Product Management', 'Agile', 'User Research', 'Analytics', 'Strategy'], 'product'],
        ['UX Designer | Figma | Design Systems', 'I design user experiences and build design systems for accessibility.', ['Figma', 'UX', 'UI', 'Wireframe', 'Prototype', 'User Research'], 'design'],
        ['Sales Director | Enterprise | B2B', 'I drive revenue through enterprise sales and pipeline management using Salesforce.', ['Sales', 'Salesforce', 'B2B', 'Pipeline', 'Negotiation', 'CRM'], 'sales'],
        ['HR Manager | Talent Acquisition | DEI', 'I lead recruiting and talent acquisition programs focused on diversity and employer brand.', ['Recruiting', 'Talent Acquisition', 'DEI', 'Onboarding', 'HRIS'], 'hr'],
    ]

    for (const [headline, about, skills, expected] of industries) {
        const r = analyzeSEO(headline, about, skills)
        assert(r.industry_match === expected, `Industry detection: ${expected}`, `Got: ${r.industry_match}`)
    }

    // --- Scoring quality ---
    console.log('\n--- Scoring Quality ---')

    const strongProfile = analyzeSEO(
        'Software Engineer | Python | AWS | Cloud Architecture | Microservices',
        'I am a software engineer with 10 years of experience. I have built distributed systems at scale using Python, AWS, Docker, and Kubernetes. I specialize in cloud architecture and have led teams of 15+ engineers. My work has reduced infrastructure costs by 40% and improved system reliability to 99.99% uptime.',
        ['Python', 'AWS', 'Docker', 'Kubernetes', 'React', 'Node.js', 'SQL', 'Git', 'Linux', 'Architecture']
    )

    const weakProfile = analyzeSEO(
        'Engineer',
        'I work in tech.',
        ['Leadership']
    )

    assert(strongProfile.recruiter_score > weakProfile.recruiter_score, 'Strong profile scores higher', `Strong: ${strongProfile.recruiter_score}, Weak: ${weakProfile.recruiter_score}`)
    assert(weakProfile.recommendations.length > 0, 'Weak profile gets recommendations')
    assert(strongProfile.found_keywords.length > weakProfile.found_keywords.length, 'Strong profile has more found keywords')

    // --- Edge Cases ---
    console.log('\n--- Edge Cases ---')

    const emptyResult = analyzeSEO('', '', [])
    assert(emptyResult.recruiter_score === 0, 'Empty input gets 0 score', `Got: ${emptyResult.recruiter_score}`)

    const headlineOnly = analyzeSEO('Software Engineer | Python | React', '', [])
    assert(headlineOnly.recruiter_score > 0, 'Headline-only still gets some score')
    assert(headlineOnly.headline_score > 0, 'Headline-only has headline score')

    const aboutOnly = analyzeSEO('', 'I am a software engineer with experience in Python and React development.', [])
    assert(aboutOnly.recruiter_score > 0, 'About-only still gets some score')

    // Target industry override
    const overrideResult = analyzeSEO('Manager', 'I manage things.', [], 'finance')
    // When no keywords match, the target industry should be used as default
    assert(overrideResult.industry_match !== undefined, 'Target industry parameter accepted')

    // Determinism
    const seo1 = analyzeSEO('Engineer | Python', 'I code.', ['Python'])
    const seo2 = analyzeSEO('Engineer | Python', 'I code.', ['Python'])
    assert(JSON.stringify(seo1) === JSON.stringify(seo2), 'Same input produces identical output (deterministic)')
}

// ═══════════════════════════════════════════════════════════
// 4. ABOUT GENERATOR
// ═══════════════════════════════════════════════════════════

function testAboutGenerator() {
    section('ABOUT GENERATOR')

    // --- Basic functionality ---
    console.log('\n--- Basic Functionality ---')

    const fullInput: AboutInput = {
        role: 'Senior Product Designer',
        experience: '8 years in B2B SaaS. Previously at Stripe and Notion. Led design systems team.',
        passion: 'Making complex tools simple and delightful',
        achievement: 'Led a redesign that boosted user adoption by 40%',
        skills: 'Figma, Design Systems, Prototyping, User Research',
        audience: 'Startup founders and product teams',
        cta: 'DM me if you want to chat about design systems.'
    }
    const results = generateAbout(fullInput)

    assert(results.length === 3, 'Generates exactly 3 styles', `Got ${results.length}`)
    assert(results.every(r => r.text.length > 50), 'All results have substantial text')
    assert(results.every(r => r.style.length > 0), 'All results have a style label')
    assert(results.every(r => r.word_count > 0), 'All results have word count')
    assert(results.every(r => r.char_count > 0), 'All results have char count')

    // Verify 3 different styles
    const styles = results.map(r => r.style)
    assert(styles.includes('Narrative Arc'), 'Has Narrative Arc style')
    assert(styles.includes('Bold Opener'), 'Has Bold Opener style')
    assert(styles.includes('Scannable'), 'Has Scannable style')

    // Check content references input
    const allText = results.map(r => r.text).join(' ').toLowerCase()
    assert(allText.includes('product designer') || allText.includes('senior product designer'), 'About mentions role')
    assert(allText.includes('figma') || allText.includes('design systems') || allText.includes('prototyping'), 'About mentions skills')
    assert(allText.includes('adoption') || allText.includes('40%') || allText.includes('redesign'), 'About mentions achievement')

    // --- Context-driven dynamism ---
    console.log('\n--- Context-Driven Dynamism ---')

    const engineerAbout = generateAbout({ role: 'Software Engineer', experience: 'Built distributed systems at Google for 5 years', skills: 'Go, Kubernetes, gRPC' })
    const teacherAbout = generateAbout({ role: 'High School Teacher', experience: '12 years teaching AP Physics', passion: 'Making science accessible to all students' })

    const engText = engineerAbout.map(r => r.text).join(' ').toLowerCase()
    const teachText = teacherAbout.map(r => r.text).join(' ').toLowerCase()

    assert(engText.includes('software engineer'), 'Engineer about mentions role')
    assert(teachText.includes('teacher'), 'Teacher about mentions role')
    assert(engText !== teachText, 'Different roles produce different about sections')

    // Passion changes output
    const withPassion = generateAbout({ role: 'Designer', passion: 'Creating beautiful user experiences' })
    const withoutPassion = generateAbout({ role: 'Designer' })
    const passionText = withPassion.map(r => r.text).join(' ')
    const noPassionText = withoutPassion.map(r => r.text).join(' ')
    assert(passionText !== noPassionText, 'Passion input changes output')
    assert(passionText.toLowerCase().includes('beautiful') || passionText.toLowerCase().includes('user experience'), 'Passion content reflected in output')

    // --- Edge Cases ---
    console.log('\n--- Edge Cases ---')

    const minimalAbout = generateAbout({ role: 'Engineer' })
    assert(minimalAbout.length === 3, 'Minimal input still produces 3 styles')
    assert(minimalAbout.every(r => r.text.length > 20), 'Minimal input still produces meaningful text')

    // Scannable style should have emojis
    const scannable = minimalAbout.find(r => r.style === 'Scannable')
    assert(scannable !== undefined && scannable.text.includes('📌'), 'Scannable style uses emoji formatting')

    // Word/char counts should be accurate
    for (const r of results) {
        const actualWords = r.text.split(/\s+/).length
        const actualChars = r.text.length
        assert(r.word_count === actualWords, `Word count accurate for ${r.style}`, `Reported: ${r.word_count}, Actual: ${actualWords}`)
        assert(r.char_count === actualChars, `Char count accurate for ${r.style}`, `Reported: ${r.char_count}, Actual: ${actualChars}`)
    }

    // CTA handling
    const customCTA = generateAbout({ role: 'Engineer', cta: 'Book a call at calendly.com/me' })
    assert(customCTA.some(r => r.text.includes('calendly.com/me')), 'Custom CTA appears in output')

    // Determinism
    const a1 = generateAbout(fullInput)
    const a2 = generateAbout(fullInput)
    assert(JSON.stringify(a1) === JSON.stringify(a2), 'Same input produces identical output (deterministic)')
}

// ═══════════════════════════════════════════════════════════
// 5. POST HOOK GENERATOR
// ═══════════════════════════════════════════════════════════

function testPostHookGenerator() {
    section('POST HOOK GENERATOR')

    // --- Basic functionality ---
    console.log('\n--- Basic Functionality ---')

    const result = generatePostHooks({ topic: 'AI in marketing', audience: 'marketers' })

    assert(result.length === 6, 'Generates exactly 6 hooks', `Got ${result.length}`)
    assert(result.every(h => h.text.length > 20), 'All hooks have substantial text')
    assert(result.every(h => h.style.length > 0), 'All hooks have a style label')
    assert(result.every(h => h.why_it_works.length > 0), 'All hooks have explanation')

    // Check all 6 styles present
    const hookStyles = result.map(h => h.style)
    assert(hookStyles.includes('Pattern Interrupt'), 'Has Pattern Interrupt style')
    assert(hookStyles.includes('Curiosity Gap'), 'Has Curiosity Gap style')
    assert(hookStyles.includes('Contrarian'), 'Has Contrarian style')
    assert(hookStyles.includes('Story Hook'), 'Has Story Hook style')
    assert(hookStyles.includes('Data-Led'), 'Has Data-Led style')
    assert(hookStyles.includes('Confession'), 'Has Confession style')

    // --- Context-driven dynamism ---
    console.log('\n--- Context-Driven Dynamism ---')

    const aiHooks = generatePostHooks({ topic: 'AI in marketing' })
    const leadershipHooks = generatePostHooks({ topic: 'leadership in remote teams' })
    const careerHooks = generatePostHooks({ topic: 'career change at 40' })

    // Different topics should produce different hooks
    assert(aiHooks[0].text !== leadershipHooks[0].text, 'Different topics produce different hooks')
    assert(leadershipHooks[0].text !== careerHooks[0].text, 'Different topics produce different hooks (2)')

    // Topic should appear in hooks
    assert(aiHooks.some(h => h.text.toLowerCase().includes('ai') || h.text.toLowerCase().includes('marketing')), 'AI topic reflected in hooks')
    assert(leadershipHooks.some(h => h.text.toLowerCase().includes('leadership') || h.text.toLowerCase().includes('remote')), 'Leadership topic reflected in hooks')

    // Domain detection should work
    const startupHooks = generatePostHooks({ topic: 'startup fundraising strategies' })
    assert(startupHooks.some(h => h.text.includes('startup')), 'Startup domain detected and used')

    // Angle parameter changes output
    const withAngle = generatePostHooks({ topic: 'productivity', angle: 'I tried it for 30 days' })
    const withoutAngle = generatePostHooks({ topic: 'productivity' })
    // Contrarian hook uses angle if provided
    const contrarianWith = withAngle.find(h => h.style === 'Contrarian')
    const contrarianWithout = withoutAngle.find(h => h.style === 'Contrarian')
    assert(contrarianWith?.text !== contrarianWithout?.text, 'Angle parameter changes contrarian hook')

    // Audience parameter
    const forFounders = generatePostHooks({ topic: 'growth hacking', audience: 'startup founders' })
    assert(forFounders.some(h => h.text.includes('startup founders') || h.text.includes('founders')), 'Audience appears in hooks')

    // --- Edge Cases ---
    console.log('\n--- Edge Cases ---')

    assert(generatePostHooks({ topic: '' }).length === 0, 'Empty topic returns empty array')

    const shortTopic = generatePostHooks({ topic: 'AI' })
    assert(shortTopic.length === 6, 'Very short topic still produces 6 hooks')

    const longTopic = generatePostHooks({ topic: 'The intersection of artificial intelligence and sustainable energy in developing nations with limited infrastructure' })
    assert(longTopic.length === 6, 'Very long topic still produces 6 hooks')

    // Determinism (seeded randomizer)
    const h1 = generatePostHooks({ topic: 'remote work' })
    const h2 = generatePostHooks({ topic: 'remote work' })
    assert(JSON.stringify(h1) === JSON.stringify(h2), 'Same input produces identical output (deterministic)')

    // Different topics produce different seeded picks
    const topicA = generatePostHooks({ topic: 'sales' })
    const topicB = generatePostHooks({ topic: 'design' })
    const curiosityA = topicA.find(h => h.style === 'Curiosity Gap')
    const curiosityB = topicB.find(h => h.style === 'Curiosity Gap')
    // The seeded pick should vary
    assert(curiosityA?.text !== curiosityB?.text, 'Seeded randomizer produces different picks for different topics')
}

// ═══════════════════════════════════════════════════════════
// 6. OPPORTUNITY SCORE
// ═══════════════════════════════════════════════════════════

function testOpportunityScore() {
    section('OPPORTUNITY SCORE')

    // --- Basic functionality ---
    console.log('\n--- Basic Functionality ---')

    const fullProfile = {
        headline: 'Senior Software Engineer | Python | Cloud Architecture',
        about: 'I am a software engineer with 10 years of experience building scalable distributed systems. I specialize in Python, AWS, and Kubernetes. I have led teams of 15+ engineers and reduced infrastructure costs by 40%.',
        experience: [
            { title: 'Senior Engineer', company: 'Google', description: 'Led cloud infrastructure team. Built microservices platform serving 10M users.' },
            { title: 'Engineer', company: 'Startup', description: 'Full-stack development with React and Node.js. Shipped 3 products from 0 to 1.' },
        ],
        skills: ['Python', 'AWS', 'Kubernetes', 'Docker', 'React', 'Node.js', 'SQL', 'Git', 'Linux', 'Architecture'],
        education: ['MS Computer Science, Stanford'],
        certifications: ['AWS Solutions Architect'],
    }
    const score = calculateOpportunityScore(fullProfile)

    assert(score.total_score >= 0 && score.total_score <= 100, 'Total score in valid range')
    assert(score.visibility_score >= 0, 'Visibility score >= 0')
    assert(score.authority_score >= 0, 'Authority score >= 0')
    assert(score.engagement_potential >= 0, 'Engagement potential >= 0')
    assert(score.breakdown.headline_strength >= 0 && score.breakdown.headline_strength <= 20, 'Headline strength in range')
    assert(score.breakdown.keyword_coverage >= 0 && score.breakdown.keyword_coverage <= 20, 'Keyword coverage in range')
    assert(score.breakdown.experience_depth >= 0 && score.breakdown.experience_depth <= 25, 'Experience depth in range')
    assert(score.breakdown.skill_relevance >= 0 && score.breakdown.skill_relevance <= 15, 'Skill relevance in range')
    assert(score.breakdown.completeness >= 0 && score.breakdown.completeness <= 20, 'Completeness in range')

    // --- Context-driven dynamism ---
    console.log('\n--- Context-Driven Dynamism ---')

    const emptyProfile = calculateOpportunityScore({})
    assert(score.total_score > emptyProfile.total_score, 'Full profile scores higher than empty', `Full: ${score.total_score}, Empty: ${emptyProfile.total_score}`)
    assert(emptyProfile.recommendations.length > 0, 'Empty profile gets recommendations')

    // Partial profiles
    const headlineOnlyScore = calculateOpportunityScore({ headline: 'Software Engineer | Python | AWS' })
    const skillsOnlyScore = calculateOpportunityScore({ skills: ['Python', 'AWS', 'React', 'Node.js', 'Docker'] })
    assert(headlineOnlyScore.breakdown.headline_strength > 0, 'Headline-only profile has headline score')
    assert(skillsOnlyScore.breakdown.skill_relevance > 0, 'Skills-only profile has skill score')

    // --- Edge Cases ---
    console.log('\n--- Edge Cases ---')

    const noExpDesc = calculateOpportunityScore({
        experience: [{ title: 'Engineer', company: 'Co' }, { title: 'Dev', company: 'Co2' }]
    })
    assert(noExpDesc.breakdown.experience_depth === 0, 'Experience without descriptions gets 0 depth')
    assert(noExpDesc.recommendations.some(r => r.includes('descriptions')), 'Recommends adding descriptions')

    const fewSkills = calculateOpportunityScore({ skills: ['Python', 'React'] })
    assert(fewSkills.recommendations.some(r => r.includes('skills')), 'Few skills gets recommendation to add more')
}

// ═══════════════════════════════════════════════════════════
// 7. CROSS-TOOL CONSISTENCY
// ═══════════════════════════════════════════════════════════

function testCrossToolConsistency() {
    section('CROSS-TOOL CONSISTENCY')

    // A profile that scores well on SEO should also score well on Opportunity
    const goodProfile = {
        headline: 'Senior Software Engineer | Python | AWS | Cloud Architecture | Microservices',
        about: 'I am a software engineer with 10 years of experience. I specialize in Python, AWS, Docker, and Kubernetes. I have led teams and built scalable distributed systems.',
        skills: ['Python', 'AWS', 'Docker', 'Kubernetes', 'React', 'Node.js', 'SQL', 'Git', 'Linux', 'Architecture'],
    }

    const seoScore = analyzeSEO(goodProfile.headline, goodProfile.about, goodProfile.skills)
    const oppScore = calculateOpportunityScore({
        headline: goodProfile.headline,
        about: goodProfile.about,
        skills: goodProfile.skills,
    })

    assert(seoScore.recruiter_score > 50, 'Good profile gets decent SEO score', `Got: ${seoScore.recruiter_score}`)
    assert(oppScore.total_score > 20, 'Good profile gets decent opportunity score', `Got: ${oppScore.total_score}`)

    // Headlines generated for this profile should contain keywords that SEO would find
    const headlines = generateHeadlines({
        role: 'Senior Software Engineer',
        industry: 'Technology',
        skills: ['Python', 'AWS', 'Kubernetes']
    })
    const headlineTexts = headlines.map(h => h.text.toLowerCase()).join(' ')
    assert(headlineTexts.includes('python') || headlineTexts.includes('aws'), 'Generated headlines contain SEO-relevant keywords')

    // About sections should be within LinkedIn limits
    const aboutResults = generateAbout({
        role: 'Engineer',
        experience: '10 years in tech',
        skills: 'Python, AWS, React',
        passion: 'Building scalable systems'
    })
    for (const r of aboutResults) {
        if (r.char_count > 2600) {
            warn('About char limit', `${r.style} is ${r.char_count} chars (limit: 2600)`)
        }
    }
}

// ═══════════════════════════════════════════════════════════
// 8. STRESS TEST — DIVERSE PERSONAS
// ═══════════════════════════════════════════════════════════

function testDiversePersonas() {
    section('DIVERSE PERSONA STRESS TEST')

    const personas = [
        { role: 'Nurse Practitioner', industry: 'Healthcare', skills: ['Patient Care', 'EMR', 'Clinical Research'] },
        { role: 'High School Teacher', industry: 'Education', skills: ['Curriculum Design', 'AP Physics', 'EdTech'] },
        { role: 'Freelance Graphic Designer', industry: 'Design', skills: ['Illustrator', 'Branding', 'Typography'] },
        { role: 'Military Veteran transitioning to Tech', industry: 'Technology', skills: ['Leadership', 'Project Management', 'Cybersecurity'] },
        { role: 'Non-profit Program Director', industry: 'Social Impact', skills: ['Grant Writing', 'Community Outreach', 'Fundraising'] },
        { role: 'Real Estate Agent', industry: 'Real Estate', skills: ['Negotiation', 'CRM', 'Market Analysis'] },
        { role: 'PhD Researcher in Computational Biology', industry: 'Biotech', skills: ['Python', 'R', 'Genomics', 'Machine Learning'] },
        { role: 'Executive Chef', industry: 'Hospitality', skills: ['Menu Development', 'Team Management', 'Food Safety'] },
        { role: 'Blockchain Developer', industry: 'Web3', skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'DeFi'] },
        { role: 'Content Creator', industry: 'Media', skills: ['Video Production', 'Storytelling', 'Audience Growth'] },
    ]

    for (const persona of personas) {
        const headlines = generateHeadlines(persona)
        assert(headlines.length > 0, `Headlines generated for: ${persona.role}`, `Got ${headlines.length}`)
        assert(headlines.every(h => h.text.includes(persona.role) || h.text.length > 10), `Headlines relevant for: ${persona.role}`)

        const about = generateAbout({ role: persona.role, skills: persona.skills.join(', ') })
        assert(about.length === 3, `About generated for: ${persona.role}`)

        const hooks = generatePostHooks({ topic: `${persona.industry} trends` })
        assert(hooks.length === 6, `Hooks generated for: ${persona.role}`)

        const bullet = improveBullet(`Responsible for ${persona.skills[0]?.toLowerCase() || 'various tasks'} at the organization`)
        assert(bullet.improved !== bullet.original, `Bullet improved for: ${persona.role}`)
    }
}

// ═══════════════════════════════════════════════════════════
// RUN ALL TESTS
// ═══════════════════════════════════════════════════════════

console.log('\n🔬 LINKEDIN TOOLS — STRENGTH TEST SUITE')
console.log('=' .repeat(60))

testHeadlineGenerator()
testBulletImprover()
testSEOChecker()
testAboutGenerator()
testPostHookGenerator()
testOpportunityScore()
testCrossToolConsistency()
testDiversePersonas()

// ═══════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════

console.log('\n' + '═'.repeat(60))
console.log('  RESULTS')
console.log('═'.repeat(60))
console.log(`\n  ✅ Passed: ${passed}`)
console.log(`  ❌ Failed: ${failed}`)
console.log(`  ⚠️  Warnings: ${warnings}`)
console.log(`  📊 Total: ${passed + failed}`)
console.log(`  📈 Pass Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`)

if (failures.length > 0) {
    console.log('\n--- FAILURES ---')
    failures.forEach((f, i) => console.log(`  ${i + 1}. ${f}`))
}

if (warningsList.length > 0) {
    console.log('\n--- WARNINGS ---')
    warningsList.forEach((w, i) => console.log(`  ${i + 1}. ${w}`))
}

console.log('\n' + '═'.repeat(60))

// Exit with error code if any failures
if (failed > 0) {
    process.exit(1)
}
