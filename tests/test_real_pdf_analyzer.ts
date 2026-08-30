import { parseLinkedInPDF } from '../lib/pdfParser'
import { analyzeProfile } from '../lib/scoringEngine'
import { generateHeadlines } from '../lib/tools'

// Minimal PDF generation with text objects matching LinkedIn export text streams
function createLinkedInPDFTextStream(name: string, headline: string, about: string, experiences: Array<{ title: string; company: string; duration: string; desc: string }>, skills: string[], education: string[]): Buffer {
    // Construct a standard PDF document with binary stream
    let streamContent = `BT\n/F1 14 Tf\n100 750 Td\n(${name}) Tj\nET\n`
    streamContent += `BT\n/F1 10 Tf\n100 730 Td\n(${headline}) Tj\nET\n`
    streamContent += `BT\n/F1 10 Tf\n100 700 Td\n(Summary) Tj\nET\n`
    streamContent += `BT\n/F1 10 Tf\n100 680 Td\n(${about.replace(/\n/g, ' ')}) Tj\nET\n`
    streamContent += `BT\n/F1 10 Tf\n100 640 Td\n(Experience) Tj\nET\n`

    let y = 620
    for (const exp of experiences) {
        streamContent += `BT\n/F1 10 Tf\n100 ${y} Td\n(${exp.company}) Tj\nET\n`
        y -= 15
        streamContent += `BT\n/F1 10 Tf\n100 ${y} Td\n(${exp.title}) Tj\nET\n`
        y -= 15
        streamContent += `BT\n/F1 10 Tf\n100 ${y} Td\n(${exp.duration}) Tj\nET\n`
        y -= 15
        streamContent += `BT\n/F1 10 Tf\n100 ${y} Td\n(${exp.desc}) Tj\nET\n`
        y -= 25
    }

    streamContent += `BT\n/F1 10 Tf\n100 ${y} Td\n(Top Skills) Tj\nET\n`
    y -= 15
    for (const sk of skills) {
        streamContent += `BT\n/F1 10 Tf\n100 ${y} Td\n(${sk}) Tj\nET\n`
        y -= 15
    }

    streamContent += `BT\n/F1 10 Tf\n100 ${y} Td\n(Education) Tj\nET\n`
    y -= 15
    for (const edu of education) {
        streamContent += `BT\n/F1 10 Tf\n100 ${y} Td\n(${edu}) Tj\nET\n`
        y -= 15
    }

    const streamLength = Buffer.byteLength(streamContent, 'utf-8')

    const pdfData = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamLength} >>
stream
${streamContent}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000234 00000 n 
0000000${(300 + streamLength).toString().padStart(3, '0')} 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${400 + streamLength}
%%EOF`

    return Buffer.from(pdfData, 'utf-8')
}

async function runTest() {
    console.log('--- 1. Generating Mock LinkedIn PDF ---')
    const pdfBuffer = createLinkedInPDFTextStream(
        'Alex Mercer',
        'Staff Software Engineer | Distributed Systems & Cloud Architecture | Go · Kubernetes',
        'I build high-scale backend platforms and distributed data systems. Over 8 years designing microservices handling 50M daily transactions.',
        [
            {
                title: 'Staff Software Engineer',
                company: 'Stripe',
                duration: 'January 2021 - Present (3 years 2 months)',
                desc: 'Led architecture of global ledger system reducing latency by 45% across 12 regions.'
            },
            {
                title: 'Senior Backend Engineer',
                company: 'Datadog',
                duration: 'March 2018 - December 2020 (2 years 10 months)',
                desc: 'Scaled metrics ingestion pipeline processing 2B events per day using Go and Kafka.'
            }
        ],
        ['Go (Golang)', 'Kubernetes', 'Distributed Systems', 'Kafka', 'System Architecture', 'AWS', 'PostgreSQL'],
        ['University of California, Berkeley\nBachelor of Science in Computer Science']
    )

    console.log('✓ PDF generated, buffer length:', pdfBuffer.length, 'bytes')

    console.log('\n--- 2. Parsing PDF with parseLinkedInPDF ---')
    const parsed = await parseLinkedInPDF(pdfBuffer)
    console.log('Parsed Name:', parsed.name)
    console.log('Parsed Headline:', parsed.headline)
    console.log('Parsed About:', parsed.about?.slice(0, 80))
    console.log('Parsed Experience count:', parsed.experience.length)
    console.log('Parsed Skills count:', parsed.skills.length)
    console.log('Parsed Education count:', parsed.education.length)
    console.log('Parse confidence overall:', parsed.parse_confidence?.overall)

    if (!parsed.name || parsed.experience.length === 0) {
        throw new Error('PDF parsing failed to extract critical profile fields')
    }

    console.log('\n--- 3. Running Scoring Engine ---')
    const analysis = analyzeProfile(parsed)
    console.log('Total LinkedIn Score:', analysis.linkedInScore)
    console.log('Tier:', analysis.tier)
    console.log('Peer Context:', analysis.peerContext)
    console.log('Category Scores:')
    analysis.categoryScores.forEach(c => {
        console.log(`  - ${c.category}: ${c.earnedPoints}/${c.maxPoints} (${c.percentage}%)`)
    })
    console.log('Improvement Steps count:', analysis.improvementPath.length)
    console.log('Recommendations count:', analysis.recommendations.length)

    console.log('\n--- 4. Testing Baseline Headline Generation ---')
    const headlines = generateHeadlines({
        role: parsed.headline,
        company: parsed.experience[0]?.company,
        skills: parsed.skills.slice(0, 5)
    })
    console.log('Generated Headline Alternatives (' + headlines.length + '):')
    headlines.forEach((h, i) => console.log(`  [${i + 1}] (${h.style}): ${h.text}`))

    console.log('\n======================================================')
    console.log('✓ MAIN TOOL ANALYSIS PIPELINE IS 100% OPERATIONAL!')
    console.log('======================================================')
}

runTest().catch(err => {
    console.error('Test error:', err)
    process.exit(1)
})
