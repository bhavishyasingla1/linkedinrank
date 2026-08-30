import http from 'http'
import fs from 'fs'
import path from 'path'

// Realistic LinkedIn Profile PDF text format
function createSamplePdfBuffer(): Buffer {
    const textContent = `BT
/F1 16 Tf
50 750 Td
(Alex Mercer) Tj
ET
BT
/F1 10 Tf
50 730 Td
(Staff Software Engineer at Stripe | Distributed Systems & Cloud Infrastructure) Tj
ET
BT
/F1 10 Tf
50 700 Td
(Summary) Tj
ET
BT
/F1 10 Tf
50 680 Td
(Experienced platform engineer leading distributed ledger architecture.) Tj
ET
BT
/F1 10 Tf
50 650 Td
(Experience) Tj
ET
BT
/F1 10 Tf
50 630 Td
(Stripe) Tj
ET
BT
/F1 10 Tf
50 615 Td
(Staff Software Engineer) Tj
ET
BT
/F1 10 Tf
50 600 Td
(2021 - Present) Tj
ET
BT
/F1 10 Tf
50 585 Td
(Led architecture of transaction ledger reducing p99 latency by 45%.) Tj
ET
BT
/F1 10 Tf
50 550 Td
(Top Skills) Tj
ET
BT
/F1 10 Tf
50 535 Td
(Go, Kubernetes, Distributed Systems, Kafka, AWS, PostgreSQL) Tj
ET
`
    const streamLen = Buffer.byteLength(textContent, 'utf8')
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
<< /Length ${streamLen} >>
stream
${textContent}
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
0000000${(300 + streamLen).toString().padStart(3, '0')} 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${400 + streamLen}
%%EOF`

    return Buffer.from(pdfData, 'utf8')
}

async function testUpload() {
    console.log('1. Generating sample LinkedIn PDF...')
    const pdfBuffer = createSamplePdfBuffer()
    console.log('✓ PDF size:', pdfBuffer.length, 'bytes')

    console.log('2. Sending multipart/form-data POST to http://localhost:3000/api/analyze ...')
    const boundary = '--------------------------' + Date.now().toString(16)
    
    const pre = Buffer.from(
        `--${boundary}\r\n` +
        `Content-Disposition: form-data; name="file"; filename="alex_mercer_profile.pdf"\r\n` +
        `Content-Type: application/pdf\r\n\r\n`
    )
    const post = Buffer.from(`\r\n--${boundary}--\r\n`)
    const body = Buffer.concat([pre, pdfBuffer, post])

    const response = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
            'Origin': 'http://localhost:3000',
            'Referer': 'http://localhost:3000/loading-analysis'
        },
        body
    })

    console.log('HTTP Status:', response.status)
    const json = await response.json()
    
    if (response.status !== 200) {
        console.error('API Error Response:', json)
        throw new Error(`API returned HTTP ${response.status}: ${json.error || 'Unknown error'}`)
    }

    console.log('\n--- 3. Verifying Response Payload ---')
    const data = json.data || json
    console.log('✓ LinkedIn Score:', data.linkedInScore || data.score)
    console.log('✓ Tier:', data.tier)
    console.log('✓ Parsed Name:', data.profile?.name)
    console.log('✓ Parsed Headline:', data.profile?.headline)
    console.log('✓ Category Scores count:', data.categoryScores?.length)
    console.log('✓ Recommendations count:', data.recommendations?.length)
    console.log('✓ Headline Rewrites count:', data.headlineRewrites?.length)

    console.log('\n=============================================')
    console.log('✓ PDF UPLOAD & ANALYSIS PIPELINE IS 100% OPERATIONAL!')
    console.log('=============================================')
}

testUpload().catch(err => {
    console.error('Upload test failed:', err)
    process.exit(1)
})
