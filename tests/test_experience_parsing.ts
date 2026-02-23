/**
 * Quick test: Parse a LinkedIn PDF and print extracted experience entries
 * Usage: npx ts-node tests/test_experience_parsing.ts <path-to-pdf>
 */

import * as fs from 'fs'
import { parseLinkedInPDF } from '../lib/pdfParser'

async function main() {
    const pdfPath = process.argv[2] || '/Users/bhavishyasingla/Downloads/Profile (3).pdf'
    
    if (!fs.existsSync(pdfPath)) {
        console.error('PDF not found:', pdfPath)
        process.exit(1)
    }

    const buffer = fs.readFileSync(pdfPath)
    console.log('=== Parsing:', pdfPath, '===\n')

    const result = await parseLinkedInPDF(buffer)

    console.log('\n========== PARSED RESULTS ==========')
    console.log('Name:', result.name)
    console.log('Headline:', result.headline)
    console.log('Layout:', result.diagnostics.layout_type)
    console.log('Missing fields:', result.diagnostics.missing_fields)
    console.log('Confidence:', JSON.stringify(result.parse_confidence, null, 2))
    
    console.log('\n--- About (first 200 chars) ---')
    console.log(result.about?.slice(0, 200) || '(empty)')
    
    console.log('\n--- Experience (' + result.experience.length + ' entries) ---')
    result.experience.forEach((exp, i) => {
        console.log(`\n  [${i + 1}] Company: "${exp.company}"`)
        console.log(`      Title:   "${exp.title}"`)
        console.log(`      Duration: "${exp.duration}"`)
        console.log(`      Desc:    "${(exp.description || '').slice(0, 120)}${(exp.description || '').length > 120 ? '...' : ''}"`)
    })
    
    console.log('\n--- Skills (' + result.skills.length + ') ---')
    console.log(result.skills.join(', '))
    
    console.log('\n--- Education (' + result.education.length + ') ---')
    result.education.forEach(e => console.log(' ', e))
    
    console.log('\n--- Certifications (' + result.certifications.length + ') ---')
    result.certifications.forEach(c => console.log(' ', c))

    console.log('\n--- Honors (' + result.honors.length + ') ---')
    result.honors.forEach(h => console.log(' ', h))
    
    console.log('\n========== SUMMARY ==========')
    console.log('Experience entries:', result.experience.length)
    console.log('Overall confidence:', (result.parse_confidence.overall * 100).toFixed(1) + '%')
    
    if (result.experience.length === 0) {
        console.error('\n❌ FAIL: No experience entries extracted!')
        process.exit(1)
    } else {
        console.log('\n✅ PASS: Extracted', result.experience.length, 'experience entries')
    }
}

main().catch(err => {
    console.error('Error:', err.message)
    process.exit(1)
})
