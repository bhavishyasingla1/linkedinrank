/**
 * ACCEPTANCE TEST: Score Determinism
 * 
 * test_score_determinism.py equivalent in TypeScript
 * Verifies: reprocess same file 50x → identical scores
 */

import { parseLinkedInPDF } from '../../lib/pdfParser'
import { computeDeterministicScore } from '../../lib/deterministicScoring'
import { canonicalizeProfile } from '../../lib/canonicalize'
import * as fs from 'fs'
import * as path from 'path'

interface TestResult {
    passed: boolean
    iterations: number
    unique_scores: number[]
    unique_hashes: string[]
    message: string
}

async function testScoreDeterminism(pdfPath: string, iterations: number = 50): Promise<TestResult> {
    const scores: number[] = []
    const hashes: string[] = []
    
    // Read PDF file
    const buffer = fs.readFileSync(pdfPath)
    
    for (let i = 0; i < iterations; i++) {
        try {
            // Parse PDF
            const profileData = await parseLinkedInPDF(buffer)
            
            // Compute score
            const result = computeDeterministicScore(profileData, profileData.parse_confidence)
            scores.push(result.score)
            
            // Get input hash
            const canonical = canonicalizeProfile(profileData)
            hashes.push(canonical.input_hash)
            
        } catch (error: any) {
            return {
                passed: false,
                iterations: i,
                unique_scores: [...new Set(scores)],
                unique_hashes: [...new Set(hashes)],
                message: `Failed at iteration ${i}: ${error.message}`
            }
        }
    }
    
    const uniqueScores = [...new Set(scores)]
    const uniqueHashes = [...new Set(hashes)]
    
    const passed = uniqueScores.length === 1 && uniqueHashes.length === 1
    
    return {
        passed,
        iterations,
        unique_scores: uniqueScores,
        unique_hashes: uniqueHashes,
        message: passed 
            ? `✓ All ${iterations} iterations produced identical score (${uniqueScores[0]}) and hash` 
            : `✗ Found ${uniqueScores.length} unique scores and ${uniqueHashes.length} unique hashes`
    }
}

// Export for use in test runner
export { testScoreDeterminism }

// CLI execution
if (require.main === module) {
    const pdfPath = process.argv[2] || './test-data/sample-linkedin.pdf'
    
    console.log('=== Score Determinism Test ===')
    console.log(`PDF: ${pdfPath}`)
    console.log(`Running 50 iterations...\n`)
    
    testScoreDeterminism(pdfPath, 50)
        .then(result => {
            console.log(result.message)
            console.log(`Unique scores: ${result.unique_scores.join(', ')}`)
            console.log(`Unique hashes: ${result.unique_hashes.length}`)
            process.exit(result.passed ? 0 : 1)
        })
        .catch(err => {
            console.error('Test failed:', err)
            process.exit(1)
        })
}
