/**
 * AI SUGGESTIONS MODULE v2.0
 * 
 * Deterministic LLM wrapper with caching for LinkedIn profile rewrites.
 * 
 * Rules:
 * - LLMs ONLY for human-style rewrites (headlines/about/experience)
 * - NOT for numeric scoring
 * - Fallback models with resilient error handling
 * - Cache keyed by input_hash + prompt_signature
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

const apiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
    ? process.env.GEMINI_API_KEY
    : null

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

// ============================================================
// DETERMINISTIC LLM CONFIG & MODELS
// ============================================================

const LLM_CONFIG = {
    temperature: 0,
    topP: 0.0,
    maxOutputTokens: 400
}

const FALLBACK_MODELS = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-2.0-flash-lite',
    'gemini-3.1-flash-lite',
]

// ============================================================
// PROMPT TEMPLATES (Strict Anti-AI and High-Signal)
// ============================================================

const PROMPT_TEMPLATES = {
    headline_rewrite: `You are an elite LinkedIn headline optimizer writing with a crisp, human voice. Rewrite the headline to be searchable, differentiated, and high-signal.

Current headline: "{headline}"
User's role: {role}
Key skills: {skills}

═══ STRICT WRITING & ANTI-AI RULES ═══
- Keep strictly under 120 characters.
- Include the exact target role and core domain skills.
- Use plain "is" and "has" constructions; avoid corporate jargon and filler.
- BANNED WORDS: additionally, bolster, crucial, delve, emphasize, enhance, fostering, garner, highlight, intricate, landscape, meticulous, pivotal, robust, showcase, tapestry, testament, underscore, valuable, vibrant, passionate, results-driven, team player, go-getter, unlock, supercharge.
- NEVER use em dashes (—) or en dashes (–). Use | or commas instead.
- NO emojis, no hype language, no corporate cheerleading.
- Return ONLY the new headline text, nothing else.`,

    about_rewrite: `You are a LinkedIn profile strategist writing with an authentic, authoritative human voice. Improve this About section.

Current About: "{about}"
Headline: {headline}
Role: {role}

═══ STRICT WRITING & ANTI-AI RULES ═══
- Start with a clear hook explaining what you build, solve, or lead (avoid generic openers like "I am a passionate...").
- Write in first-person ("I").
- 2-3 short, punchy paragraphs separated by line breaks for cognitive hospitality and mobile readability.
- Mention specific tools, methodologies, and outcomes.
- End with a clean, direct call-to-action to connect.
- BANNED WORDS: additionally, bolster, crucial, delve, emphasize, enhance, fostering, garner, highlight, intricate, landscape, meticulous, pivotal, robust, showcase, tapestry, testament, underscore, valuable, vibrant, passionate, results-driven, team player, go-getter, in today's fast-paced world.
- No dangling "-ing" clauses at sentence ends.
- NEVER use em dashes (—) or en dashes (–). Use commas, periods, or | instead.
- NO emojis, no fake metrics, no conversational asides.
- Return ONLY the improved About text, nothing else.`,

    bullet_improve: `You are a resume and LinkedIn experience optimizer. Transform this experience bullet into a high-impact achievement statement.

Current bullet: "{bullet}"
Role context: {role} at {company}

═══ STRICT WRITING & ANTI-AI RULES ═══
- Format: [Active Power Verb] + [Specific Action/Scope] + [Measurable Outcome/Impact].
- Active verbs: Led, Built, Designed, Shipped, Automated, Scaled, Calibrated, Engineered, Deployed.
- Keep under 200 characters.
- Be concrete and grounded; do NOT invent fake metrics.
- BANNED WORDS: helped, assisted, responsible for, spearheaded, revolutionized, pivotal, robust, crucial, passionate, results-driven.
- NEVER use em dashes (—) or en dashes (–).
- Return ONLY the improved bullet text, nothing else.`
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
    
    let prompt = PROMPT_TEMPLATES[promptTemplate]
    for (const [key, value] of Object.entries(variables)) {
        prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), value)
    }

    for (const modelName of FALLBACK_MODELS) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName })
            const result = await model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: LLM_CONFIG.temperature,
                    topP: LLM_CONFIG.topP,
                    maxOutputTokens: LLM_CONFIG.maxOutputTokens
                }
            })
            
            const response = result.response.text().trim()
            if (response) {
                // Cache the result
                setCachedLLMResponse(inputHash, promptSignature, response)
                llmQueue.incrementCount()
                return { rewrite: response, cached: false, queued: false }
            }
        } catch (error: any) {
            console.warn(`[LLM V2] Model ${modelName} failed:`, error?.message?.slice(0, 120))
            continue
        }
    }

    return { 
        rewrite: null, 
        cached: false, 
        queued: false, 
        error: 'LLM call failed across all models' 
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
