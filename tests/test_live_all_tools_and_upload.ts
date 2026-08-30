import fs from 'fs'
import path from 'path'
import { TOOL_SLUGS, ALL_TOOLS } from '../lib/toolsConfig'
import {
    generateHeadlines,
    generateAbout,
    improveBullet,
    analyzeSEO,
    generatePostIdeas,
    convertStoryToPost,
    generatePostHooks,
    generateWeeklyPlan,
    generateComments,
    generateConnectionMessages
} from '../lib/tools'

const BASE_URL = 'http://localhost:3000'

async function runFullIntegrationTest() {
    console.log('====================================================')
    console.log('🚀 RUNNING COMPREHENSIVE E2E & TOOLS INTEGRATION TEST')
    console.log('====================================================\n')

    let passed = 0
    let failed = 0

    function report(name: string, ok: boolean, extra?: any) {
        if (ok) {
            passed++
            console.log(`✅ PASS: ${name}`)
        } else {
            failed++
            console.error(`❌ FAIL: ${name}`, extra || '')
        }
    }

    // 1. Homepage
    try {
        const res = await fetch(`${BASE_URL}/`)
        const html = await res.text()
        const ok = res.status === 200 && html.includes('LinkedIn') && html.includes('Drop your LinkedIn PDF')
        report('1. Homepage (GET /) loads with upload studio', ok, { status: res.status })
    } catch (e: any) {
        report('1. Homepage (GET /)', false, e.message)
    }

    // 2. Tools Index Page
    try {
        const res = await fetch(`${BASE_URL}/tools`)
        const html = await res.text()
        const allSlugsPresent = Object.values(TOOL_SLUGS).every(slug => html.includes(`/tools/${slug}`))
        report('2. Tools Index (GET /tools) contains all 12 tools', res.status === 200 && allSlugsPresent)
    } catch (e: any) {
        report('2. Tools Index (GET /tools)', false, e.message)
    }

    // 3. Individual Tool Pages (All 12)
    for (const [toolId, slug] of Object.entries(TOOL_SLUGS)) {
        try {
            const res = await fetch(`${BASE_URL}/tools/${slug}`)
            const html = await res.text()
            const ok = res.status === 200 && html.length > 500 && !html.includes('Tool not found')
            report(`3. Tool Page [${toolId}]: /tools/${slug}`, ok, { status: res.status })
        } catch (e: any) {
            report(`3. Tool Page [${toolId}]`, false, e.message)
        }
    }

    // 4. PDF Upload & Analysis API
    try {
        const pdfPath = path.join(process.cwd(), 'test_linkedin_profile.pdf')
        const pdfBuffer = fs.readFileSync(pdfPath)
        const blob = new Blob([pdfBuffer], { type: 'application/pdf' })
        const formData = new FormData()
        formData.append('file', blob, 'test_linkedin_profile.pdf')

        const res = await fetch(`${BASE_URL}/api/analyze`, {
            method: 'POST',
            body: formData
        })

        const data = await res.json()
        const payload = data?.data || data
        const ok = res.status === 200 && payload.linkedInScore > 0 && Array.isArray(payload.categoryScores) && payload.categoryScores.length >= 4
        report('4. PDF Upload & Analysis (POST /api/analyze)', ok, {
            score: payload?.linkedInScore,
            name: payload?.profile?.name,
            tier: payload?.tier,
            categories: payload?.categoryScores?.length
        })
    } catch (e: any) {
        report('4. PDF Upload & Analysis API', false, e.message)
    }

    // 5. API Tools Endpoint Tests (AI or Fallback)
    const toolTestCases: Array<{ tool: string; input: any }> = [
        { tool: 'headline', input: { role: 'Software Engineer', industry: 'Tech', skills: ['React', 'TypeScript'] } },
        { tool: 'about', input: { role: 'Product Manager', experience_summary: '5 yrs leading teams', skills: 'Roadmapping, Data' } },
        { tool: 'post-ideas', input: { industry: 'Technology', goal: 'thought-leadership', niche: 'Cloud Architecture' } },
        { tool: 'story-to-post', input: { story: 'We migrated our db and had an outage. Learned to test failovers.', tone: 'classic' } },
        { tool: 'comment', input: { postContent: 'Great post on distributed caching.', style: 'insightful' } },
        { tool: 'connection-message', input: { type: 'cold', name: 'Alex', context: 'Loved your post on Go' } },
        { tool: 'post-hooks', input: { topic: 'Microservices vs Monoliths' } },
        { tool: 'content-planner', input: { industry: 'FinTech', role: 'Staff Engineer', frequency: '3' } },
        { tool: 'bullet-improve', input: { bullet: 'Responsible for leading backend team and speeding up APIs.', style: 'concise' } },
    ]

    for (const testCase of toolTestCases) {
        try {
            const res = await fetch(`${BASE_URL}/api/tools`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testCase)
            })
            const data = await res.json()
            const ok = res.status === 200 && (data.success || data.fallback)
            report(`5. API Tool Endpoint: [${testCase.tool}]`, ok, { status: res.status, fallback: data.fallback })
        } catch (e: any) {
            report(`5. API Tool Endpoint: [${testCase.tool}]`, false, e.message)
        }
    }

    // 6. Direct Client-side Generator Engine Tests (Ensure all 12 tool engines work perfectly)
    console.log('\n--- Testing Client-Side Tool Engines ---')
    
    // Headline
    const hlRes = generateHeadlines({ role: 'Lead Architect', industry: 'SaaS' })
    report('6.1 Client generateHeadlines', hlRes.length > 0)

    // About
    const abRes = generateAbout({ role: 'Engineering Manager', skills: ['Go', 'Kubernetes'] })
    report('6.2 Client generateAbout', abRes.length === 3)

    // Bullets
    const bRes = improveBullet('Built new CI/CD pipeline reducing build times by 40%.')
    report('6.3 Client improveBullet', !!bRes.improved)

    // SEO
    const seoRes = analyzeSEO('Staff Engineer | Cloud Infrastructure', 'Over 8 years scaling cloud platforms with Terraform and AWS.', ['AWS', 'Terraform', 'Kubernetes'])
    report('6.4 Client analyzeSEO', seoRes.recruiter_score > 0 && seoRes.keyword_density >= 0)

    // Post Ideas
    const piRes = generatePostIdeas({ industry: 'Technology', goal: 'thought-leadership' })
    report('6.5 Client generatePostIdeas', piRes.length === 5)

    // Story to Post
    const stpRes = convertStoryToPost({ story: 'Shipped a major release today after 3 months of refactoring.' })
    report('6.6 Client convertStoryToPost', !!stpRes.body)

    // Post Hooks
    const phRes = generatePostHooks({ topic: 'System Design Interview Tips' })
    report('6.7 Client generatePostHooks', phRes.length === 6)

    // Content Planner
    const cpRes = generateWeeklyPlan({ industry: 'Technology', role: 'Staff Engineer', frequency: '3' })
    report('6.8 Client generateWeeklyPlan', cpRes.length === 3)

    // Comments
    const cmRes = generateComments({ postContent: 'Why testing in production is a real engineering practice.' })
    report('6.9 Client generateComments', cmRes.length > 0)

    // Connection Message
    const cnRes = generateConnectionMessages({ type: 'cold', name: 'Jordan', context: 'Loved your talk' })
    report('6.10 Client generateConnectionMessages', cnRes.length > 0 && cnRes.every(m => m.message.length <= 300))

    console.log('\n====================================================')
    console.log(`🏁 INTEGRATION TEST RESULTS: ${passed} PASSED, ${failed} FAILED`)
    console.log('====================================================\n')

    if (failed > 0) {
        process.exit(1)
    }
}

runFullIntegrationTest().catch(err => {
    console.error('Fatal test error:', err)
    process.exit(1)
})
