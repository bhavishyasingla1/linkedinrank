/**
 * ACCEPTANCE TEST: LLM Cache
 * 
 * Verifies: Request rewrite twice for same input_hash → second served from cache
 */

import { getRewriteSuggestions } from '../../lib/aiSuggestionsV2'
import { getCachedLLMResponse, hasLLMCache, generatePromptSignature } from '../../lib/cache'
import { ProfileData } from '../../lib/types'

interface CacheTestResult {
    passed: boolean
    first_call_cached: boolean
    second_call_cached: boolean
    cache_hit: boolean
    message: string
}

async function testLLMCache(profile: ProfileData, inputHash: string): Promise<CacheTestResult> {
    try {
        // First call - should not be cached
        const firstResult = await getRewriteSuggestions(profile, inputHash)
        const firstCallCached = firstResult.cached
        
        // Second call - should be cached
        const secondResult = await getRewriteSuggestions(profile, inputHash)
        const secondCallCached = secondResult.cached
        
        // Check if cache was actually used
        const cacheHit = secondCallCached || 
            (firstResult.headline_rewrites.length > 0 && 
             firstResult.headline_rewrites[0] === secondResult.headline_rewrites[0])
        
        const passed = !firstCallCached && secondCallCached
        
        return {
            passed,
            first_call_cached: firstCallCached,
            second_call_cached: secondCallCached,
            cache_hit: cacheHit,
            message: passed
                ? '✓ LLM cache working: first call fresh, second call from cache'
                : `✗ Cache issue: first=${firstCallCached}, second=${secondCallCached}`
        }
    } catch (error: any) {
        return {
            passed: false,
            first_call_cached: false,
            second_call_cached: false,
            cache_hit: false,
            message: `✗ Test failed: ${error.message}`
        }
    }
}

// Test with mock profile
async function runLLMCacheTest(): Promise<CacheTestResult> {
    const mockProfile: ProfileData = {
        name: 'Test User',
        headline: 'Software Engineer | Building scalable systems',
        about: 'Passionate about technology and building great products.',
        experience: [{
            title: 'Senior Engineer',
            company: 'Tech Corp',
            duration: '2020 - Present',
            description: 'Led development of microservices architecture'
        }],
        skills: ['JavaScript', 'Python', 'AWS', 'React'],
        recommendations: 0,
        education: ['MIT - Computer Science'],
        certifications: ['AWS Certified'],
        honors: []
    }
    
    const inputHash = 'test-cache-' + Date.now()
    
    return testLLMCache(mockProfile, inputHash)
}

export { testLLMCache, runLLMCacheTest }

// Assertions
export function assertLLMCache(result: CacheTestResult): void {
    if (!result.passed) {
        throw new Error(`LLM cache test failed: ${result.message}`)
    }
    
    if (result.first_call_cached) {
        throw new Error('First call should not be cached')
    }
    
    if (!result.second_call_cached && !result.cache_hit) {
        throw new Error('Second call should be served from cache')
    }
    
    console.log('✓ All LLM cache assertions passed')
}
