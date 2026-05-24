/**
 * AI SUGGESTIONS MODULE v2.0
 * 
 * Deterministic LLM wrapper with caching for LinkedIn profile rewrites.
 * 
 * Rules:
 * - LLMs ONLY for human-style rewrites (headlines/about/experience)
 * - NOT for numeric scoring
 * - temperature=0, top_p=0.0, max_tokens=400
 * - Cache keyed by input_hash + prompt_signature
 * - Queue/batch LLM calls, return immediately with "queued_rewrite" indicator
 */

import { GoogleGenerativeAI } from '@google/generative-ai'
import { ProfileData } from './types'
import { 
    getCachedLLMResponse, 
    setCachedLLMResponse, 
    generatePromptSignature,
    hasLLMCache,
    llmQueue,
    PIPELINE_VERSION 
} from './cache'

const genAI = process.env.GEMINI_API_KEY
    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    : null

// ============================================================
// DETERMINISTIC LLM CONFIG
// ============================================================

const LLM_CONFIG = {
    temperature: 0,
    topP: 0.0,
    maxOutputTokens: 400
}

const MODEL_NAME = 'gemini-3.1-flash-lite'

// ============================================================
// PROMPT TEMPLATES
// ============================================================

const PROMPT_TEMPLATES = {
    headline_rewrite: `You are a LinkedIn profile optimizer. Rewrite the headline to be more compelling and searchable.

Current headline: "{headline}"
User's role: {role}
Key skills: {skills}

Rules:
- Keep under 120 characters
- Include role + domain/industry
- Add value proposition if possible
- Professional tone, no emojis
- Make it specific to their background

Return ONLY the new headline text, nothing else.`,

    about_rewrite: `You are a LinkedIn profile optimizer. Improve the About section.

Current About: "{about}"
Headline: {headline}
Role: {role}

Rules:
- Start with a compelling hook
- Keep first-person voice
- Mention specific skills/achievements
- Add a call-to-action at the end
- 3-4 paragraphs max
- Professional but authentic tone

Return ONLY the improved About text, nothing else.`,

    bullet_improve: `You are a LinkedIn profile optimizer. Improve this experience bullet point.

Current bullet: "{bullet}"
Role context: {role} at {company}

Rules:
- Start with action verb
- Add quantifiable metrics if inferable
- Use XYZ format: Accomplished X, measured by Y, by doing Z
- Keep under 200 characters
- Be specific, not generic

Return ONLY the improved bullet text, nothing else.`
}

// ============================================================
// CACHED LLM CALL WRAPPER
// ============================================================

interface LLMRewriteResult {
    rewrite: string | null
    cached: boolean
    queued: boolean
    error?: string
}

async function callLLMWithCache(
    inputHash: string,
    promptTemplate: keyof typeof PROMPT_TEMPLATES,
    variables: Record<string, string>
): Promise<LLMRewriteResult> {
    // Generate cache key
    const promptSignature = generatePromptSignature(
        PROMPT_TEMPLATES[promptTemplate],
        JSON.stringify(variables)
    )
    
    // Check cache first
    const cached = getCachedLLMResponse<string>(inputHash, promptSignature)
    if (cached !== null) {
        return { rewrite: cached, cached: true, queued: false }
    }
    
    // Check if we can process (daily limit)
    if (!llmQueue.canProcess()) {
        return { 
            rewrite: null, 
            cached: false, 
            queued: true, 
            error: 'Daily LLM quota reached. Rewrite queued for later.' 
        }
    }
    
    // Make actual LLM call
    if (!genAI) {
        return { rewrite: null, cached: false, queued: false, error: 'AI not configured' }
    }
    
    try {
        const model = genAI.getGenerativeModel({ model: MODEL_NAME })
        
        // Build prompt from template
        let prompt = PROMPT_TEMPLATES[promptTemplate]
        for (const [key, value] of Object.entries(variables)) {
            prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), value)
        }
        
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: LLM_CONFIG.temperature,
                topP: LLM_CONFIG.topP,
                maxOutputTokens: LLM_CONFIG.maxOutputTokens
            }
        })
        
        const response = result.response.text().trim()
        
        // Cache the result
        setCachedLLMResponse(inputHash, promptSignature, response)
        llmQueue.incrementCount()
        
        return { rewrite: response, cached: false, queued: false }
        
    } catch (error: any) {
        console.error('LLM call failed:', error.message)
        return { 
            rewrite: null, 
            cached: false, 
            queued: false, 
            error: 'LLM call failed' 
        }
    }
}

// ============================================================
// PUBLIC API
// ============================================================

export interface RewriteSuggestions {
    headline_rewrites: string[]
    about_rewrite: string | null
    bullet_improvements: Array<{ original: string; improved: string }>
    cached: boolean
    queued_count: number
}

/**
 * Generate AI-powered rewrite suggestions with caching
 * Returns immediately - queues requests if needed
 */
export async function getRewriteSuggestions(
    profile: ProfileData,
    inputHash: string
): Promise<RewriteSuggestions> {
    const results: RewriteSuggestions = {
        headline_rewrites: [],
        about_rewrite: null,
        bullet_improvements: [],
        cached: false,
        queued_count: 0
    }
    
    const role = profile.experience[0]?.title || 
        profile.headline?.split('|')[0]?.trim() || 
        'Professional'
    
    const skills = profile.skills?.slice(0, 5).join(', ') || 'Not specified'
    
    // Headline rewrite
    if (profile.headline) {
        const headlineResult = await callLLMWithCache(inputHash, 'headline_rewrite', {
            headline: profile.headline,
            role,
            skills
        })
        
        if (headlineResult.rewrite) {
            results.headline_rewrites.push(headlineResult.rewrite)
            results.cached = results.cached || headlineResult.cached
        }
        if (headlineResult.queued) {
            results.queued_count++
        }
    }
    
    // About rewrite
    if (profile.about && profile.about.length > 50) {
        const aboutResult = await callLLMWithCache(inputHash, 'about_rewrite', {
            about: profile.about.slice(0, 1000),
            headline: profile.headline || '',
            role
        })
        
        if (aboutResult.rewrite) {
            results.about_rewrite = aboutResult.rewrite
            results.cached = results.cached || aboutResult.cached
        }
        if (aboutResult.queued) {
            results.queued_count++
        }
    }
    
    // Experience bullet improvements (top 2 bullets from first experience)
    if (profile.experience && profile.experience.length > 0) {
        const firstExp = profile.experience[0]
        if (firstExp.description) {
            const bullets = firstExp.description
                .split(/[•\-\n]/)
                .filter(b => b.trim().length > 20)
                .slice(0, 2)
            
            for (const bullet of bullets) {
                const bulletResult = await callLLMWithCache(inputHash, 'bullet_improve', {
                    bullet: bullet.trim(),
                    role: firstExp.title || role,
                    company: firstExp.company || 'Company'
                })
                
                if (bulletResult.rewrite) {
                    results.bullet_improvements.push({
                        original: bullet.trim(),
                        improved: bulletResult.rewrite
                    })
                    results.cached = results.cached || bulletResult.cached
                }
                if (bulletResult.queued) {
                    results.queued_count++
                }
            }
        }
    }
    
    return results
}

/**
 * Check if rewrites are available in cache (no LLM call)
 */
export function hasRewritesInCache(inputHash: string, section: string): boolean {
    const template = section === 'headline' ? 'headline_rewrite' : 
                     section === 'about' ? 'about_rewrite' : 
                     'bullet_improve'
    const sig = generatePromptSignature(PROMPT_TEMPLATES[template as keyof typeof PROMPT_TEMPLATES], section)
    return hasLLMCache(inputHash, sig)
}

/**
 * Get LLM usage stats
 */
export function getLLMUsageStats() {
    return {
        daily_usage: llmQueue.getDailyUsage(),
        queue_length: llmQueue.getQueueLength(),
        pipeline_version: PIPELINE_VERSION
    }
}
