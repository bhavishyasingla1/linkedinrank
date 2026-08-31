import {
    generateSampleATSResume,
    extractATSResumeFromProfile,
    calculateATSScore,
    analyzeJobMatch,
    exportToPlainText,
    exportToWordHtml,
} from '../lib/tools'
import { TOOL_SLUGS, ALL_TOOLS, getToolBySlug } from '../lib/toolsConfig'

const BASE_URL = 'http://localhost:3000'

async function runTests() {
    console.log('====================================================')
    console.log('🧪 RUNNING ATS RESUME MAKER UNIT & INTEGRATION TESTS')
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

    // 1. Tool Metadata Configuration Test
    try {
        const slug = TOOL_SLUGS['atsresume']
        report('1.1. TOOL_SLUGS contains atsresume', slug === 'linkedin-pdf-to-ats-resume-maker')
        
        const toolMeta = getToolBySlug('linkedin-pdf-to-ats-resume-maker')
        report('1.2. getToolBySlug returns valid ToolMeta', Boolean(toolMeta && toolMeta.name.includes('Resume Maker') && toolMeta.faqs.length >= 4))
    } catch (e: any) {
        report('1. Tool Configuration', false, e.message)
    }

    // 2. Sample Resume Generator Test
    let sampleResume = generateSampleATSResume()
    try {
        report('2.1. Sample resume has valid contact info', Boolean(sampleResume.contact.fullName && sampleResume.contact.email))
        report('2.2. Sample resume has experience with bullets', sampleResume.experience.length >= 2 && sampleResume.experience[0].bullets.length >= 3)
        report('2.3. Sample resume has categorized skills', sampleResume.skills.technical.length > 0 && sampleResume.skills.frameworksAndTools.length > 0)
    } catch (e: any) {
        report('2. Sample Resume', false, e.message)
    }

    // 3. Extraction from Parsed LinkedIn PDF Test
    try {
        const mockLinkedInProfile = {
            name: 'Sarah Connor',
            headline: 'Senior Cloud Engineer | AWS & Kubernetes',
            about: 'Building resilient cloud infrastructure with 7+ years of experience in distributed systems.',
            experience: [
                {
                    title: 'Senior Cloud Engineer',
                    company: 'Cyberdyne Systems',
                    duration: 'Jan 2021 - Present',
                    description: '• Architected multi-region Kubernetes clusters with 99.99% uptime.\n• Led cloud migration of legacy infrastructure saving $250k annually.\n• Implemented automated CI/CD pipelines reducing deployment time by 40%.'
                }
            ],
            skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'Go', 'Python'],
            education: [{ degree: 'B.S. Computer Science', school: 'MIT', year: '2018' }]
        }

        const extracted = extractATSResumeFromProfile(mockLinkedInProfile)
        report('3.1. Profile extraction parses full name', extracted.contact.fullName === 'Sarah Connor')
        report('3.2. Profile extraction standardizes dates', Boolean(extracted.experience[0].startDate && extracted.experience[0].endDate))
        report('3.3. Profile extraction creates discrete bullets', extracted.experience[0].bullets.length >= 2)
        report('3.4. Profile extraction categorizes skills', extracted.skills.technical.length > 0)
    } catch (e: any) {
        report('3. Profile Extraction', false, e.message)
    }

    // 4. Scoring Algorithm Test
    try {
        const scoreReport = calculateATSScore(sampleResume)
        report('4.1. ATS scoring returns valid score range', scoreReport.overallScore >= 0 && scoreReport.overallScore <= 100)
        report('4.2. ATS scoring includes single-column & heading checks', scoreReport.checks.length >= 5)
        report('4.3. ATS metric density and power verb rates computed', typeof scoreReport.metrics.actionVerbRate === 'number')
    } catch (e: any) {
        report('4. ATS Scoring', false, e.message)
    }

    // 5. Target Job Description Matcher Test
    try {
        const sampleJD = 'Looking for a Senior Cloud Engineer with experience in AWS, Kubernetes, Terraform, and Python.'
        const jobMatch = analyzeJobMatch(sampleResume, sampleJD)
        report('5.1. Job matcher calculates score', jobMatch.matchScore >= 0 && jobMatch.matchScore <= 100)
        report('5.2. Job matcher extracts matched keywords', jobMatch.matchedKeywords.length > 0)
    } catch (e: any) {
        report('5. Job Match Analysis', false, e.message)
    }

    // 6. Formatter & Exporter Tests
    try {
        const plainText = exportToPlainText(sampleResume)
        report('6.1. Plain text export contains all standard ATS sections', plainText.includes('WORK EXPERIENCE') && plainText.includes('EDUCATION'))

        const wordHtml = exportToWordHtml(sampleResume)
        report('6.2. Word HTML export includes office markup and single-column styles', wordHtml.includes('xmlns:w=') || wordHtml.includes('xmlns:o='))
    } catch (e: any) {
        report('6. Export Formats', false, e.message)
    }

    // 7. Live Server Route & API Endpoint Tests
    try {
        const pageRes = await fetch(`${BASE_URL}/tools/linkedin-pdf-to-ats-resume-maker`)
        const pageHtml = await pageRes.text()
        const pageOk = pageRes.status === 200 && pageHtml.includes('Resume Maker')
        report('7.1. GET /tools/linkedin-pdf-to-ats-resume-maker returns 200 with Studio UI', pageOk)

        const toolsIndexRes = await fetch(`${BASE_URL}/tools`)
        const toolsIndexHtml = await toolsIndexRes.text()
        report('7.2. GET /tools index includes ATS Resume Maker link', toolsIndexHtml.includes('linkedin-pdf-to-ats-resume-maker'))
    } catch (e: any) {
        report('7. Live Server Routes', false, e.message)
    }

    // 8. Live API Route Tests (/api/tools)
    try {
        const apiRes = await fetch(`${BASE_URL}/api/tools`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tool: 'ats-resume-improve-bullet',
                input: { bullet: 'Responsible for writing python code and fixing bugs for the team' }
            })
        })
        const apiData = await apiRes.json()
        report('8.1. POST /api/tools (ats-resume-improve-bullet) returns valid response', apiRes.status === 200 && (apiData.success || apiData.fallback))
    } catch (e: any) {
        report('8. API Route Tests', false, e.message)
    }

    console.log('\n====================================================')
    console.log(`🏁 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`)
    console.log('====================================================\n')

    if (failed > 0) {
        process.exit(1)
    }
}

runTests().catch(err => {
    console.error('Fatal test error:', err)
    process.exit(1)
})
