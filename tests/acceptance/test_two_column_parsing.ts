/**
 * ACCEPTANCE TEST: Two-Column PDF Parsing
 * 
 * Verifies: Two-column LinkedIn PDF extracts fields correctly with parse_confidence >= 0.8
 */

import { parseLinkedInPDF, ExtendedProfileData } from '../../lib/pdfParser'

interface TestResult {
    passed: boolean
    parse_confidence: number
    layout_type: string
    fields_extracted: {
        headline: boolean
        about: boolean
        experience: boolean
        skills: boolean
        education: boolean
    }
    missing_fields: string[]
    message: string
}

async function testTwoColumnParsing(pdfBuffer: Buffer): Promise<TestResult> {
    try {
        const profileData = await parseLinkedInPDF(pdfBuffer) as ExtendedProfileData
        
        const fieldsExtracted = {
            headline: !!profileData.headline && profileData.headline.length > 5,
            about: !!profileData.about && profileData.about.length > 20,
            experience: profileData.experience && profileData.experience.length > 0,
            skills: profileData.skills && profileData.skills.length > 0,
            education: profileData.education && profileData.education.length > 0
        }
        
        const parseConfidence = profileData.parse_confidence?.overall || 0
        const layoutType = profileData.diagnostics?.layout_type || 'unknown'
        const missingFields = profileData.diagnostics?.missing_fields || []
        
        const passed = parseConfidence >= 0.8 && 
            fieldsExtracted.headline && 
            fieldsExtracted.about && 
            fieldsExtracted.experience
        
        return {
            passed,
            parse_confidence: parseConfidence,
            layout_type: layoutType,
            fields_extracted: fieldsExtracted,
            missing_fields: missingFields,
            message: passed 
                ? `✓ Two-column parsing successful. Confidence: ${(parseConfidence * 100).toFixed(1)}%`
                : `✗ Parsing issues. Confidence: ${(parseConfidence * 100).toFixed(1)}%. Missing: ${missingFields.join(', ')}`
        }
    } catch (error: any) {
        return {
            passed: false,
            parse_confidence: 0,
            layout_type: 'error',
            fields_extracted: {
                headline: false,
                about: false,
                experience: false,
                skills: false,
                education: false
            },
            missing_fields: ['all'],
            message: `✗ Parsing failed: ${error.message}`
        }
    }
}

export { testTwoColumnParsing }

// Example usage and assertions
export function assertTwoColumnParsing(result: TestResult): void {
    if (!result.passed) {
        throw new Error(`Two-column parsing test failed: ${result.message}`)
    }
    
    if (result.parse_confidence < 0.8) {
        throw new Error(`Parse confidence too low: ${result.parse_confidence}. Expected >= 0.8`)
    }
    
    if (!result.fields_extracted.headline) {
        throw new Error('Headline not extracted from two-column PDF')
    }
    
    if (!result.fields_extracted.about) {
        throw new Error('About section not extracted from two-column PDF')
    }
    
    if (!result.fields_extracted.experience) {
        throw new Error('Experience not extracted from two-column PDF')
    }
    
    console.log('✓ All two-column parsing assertions passed')
}
