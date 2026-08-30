import pdf from 'pdf-parse'
import { parseLinkedInPDF } from '../lib/pdfParser'

async function debug() {
    // Generate simple PDF buffer
    const textContent = `BT /F1 12 Tf 100 700 Td (Jane Doe) Tj ET`
    const streamLen = Buffer.byteLength(textContent, 'utf8')
    const pdfData = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >> endobj
4 0 obj << /Length ${streamLen} >> stream
${textContent}
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000056 00000 n 
0000000111 00000 n 
0000000201 00000 n 
trailer << /Size 5 /Root 1 0 R >>
startxref
${300 + streamLen}
%%EOF`

    const buffer = Buffer.from(pdfData, 'utf8')
    console.log('Testing pdf-parse directly...')
    try {
        const res = await pdf(buffer)
        console.log('pdf-parse output text:', JSON.stringify(res.text))
    } catch (e) {
        console.error('pdf-parse threw:', e)
    }

    console.log('\nTesting parseLinkedInPDF...')
    try {
        const parsed = await parseLinkedInPDF(buffer)
        console.log('parseLinkedInPDF output:', parsed)
    } catch (e) {
        console.error('parseLinkedInPDF threw:', e)
    }
}

debug().catch(console.error)
