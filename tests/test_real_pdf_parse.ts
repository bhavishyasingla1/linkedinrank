import fs from 'fs'
import { parseLinkedInPDF } from '../lib/pdfParser'
import { analyzeProfile } from '../lib/scoringEngine'

async function run() {
    const buffer = fs.readFileSync('test_linkedin_profile.pdf')
    console.log('Read test PDF buffer:', buffer.length, 'bytes')
    
    const parsed = await parseLinkedInPDF(buffer)
    console.log('Parsed Name:', parsed.name)
    console.log('Parsed Headline:', parsed.headline)
    console.log('Parsed Experience count:', parsed.experience.length)
    console.log('Parsed Skills count:', parsed.skills.length)
    console.log('Parsed Education count:', parsed.education.length)

    const analysis = analyzeProfile(parsed)
    console.log('Score:', analysis.linkedInScore)
    console.log('Category Scores:', analysis.categoryScores.map(c => `${c.category}: ${c.earnedPoints}/${c.maxPoints}`))
    console.log('✓ SUCCESS!')
}

run().catch(console.error)
