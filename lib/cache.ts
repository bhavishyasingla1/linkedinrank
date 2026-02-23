/**
 * CACHING MODULE
 * 
 * In-memory cache with optional Redis fallback.
 * Used for:
 * - Analysis results keyed by input_hash
 * - LLM responses keyed by input_hash + prompt_signature
 */

interface CacheEntry<T> {
    value: T
    timestamp: number
    ttl: number
}

interface CacheStats {
    hits: number
    misses: number
    size: number
}

class InMemoryCache {
    private store: Map<string, CacheEntry<any>> = new Map()
    private stats: CacheStats = { hits: 0, misses: 0, size: 0 }
    private maxSize: number
    private defaultTTL: number
    
    constructor(maxSize: number = 1000, defaultTTL: number = 3600000) {
        this.maxSize = maxSize
        this.defaultTTL = defaultTTL // 1 hour default
        
        // Cleanup expired entries every 5 minutes
        setInterval(() => this.cleanup(), 5 * 60 * 1000)
    }
    
    get<T>(key: string): T | null {
        const entry = this.store.get(key)
        
        if (!entry) {
            this.stats.misses++
            return null
        }
        
        // Check if expired
        if (Date.now() - entry.timestamp > entry.ttl) {
            this.store.delete(key)
            this.stats.misses++
            return null
        }
        
        this.stats.hits++
        return entry.value as T
    }
    
    set<T>(key: string, value: T, ttl?: number): void {
        // Evict oldest entries if at capacity
        if (this.store.size >= this.maxSize) {
            this.evictOldest()
        }
        
        this.store.set(key, {
            value,
            timestamp: Date.now(),
            ttl: ttl || this.defaultTTL
        })
        this.stats.size = this.store.size
    }
    
    has(key: string): boolean {
        const entry = this.store.get(key)
        if (!entry) return false
        
        // Check if expired
        if (Date.now() - entry.timestamp > entry.ttl) {
            this.store.delete(key)
            return false
        }
        
        return true
    }
    
    delete(key: string): boolean {
        return this.store.delete(key)
    }
    
    clear(): void {
        this.store.clear()
        this.stats = { hits: 0, misses: 0, size: 0 }
    }
    
    getStats(): CacheStats {
        return { ...this.stats }
    }
    
    private cleanup(): void {
        const now = Date.now()
        for (const [key, entry] of this.store.entries()) {
            if (now - entry.timestamp > entry.ttl) {
                this.store.delete(key)
            }
        }
        this.stats.size = this.store.size
    }
    
    private evictOldest(): void {
        // Find and remove oldest entry
        let oldestKey: string | null = null
        let oldestTime = Infinity
        
        for (const [key, entry] of this.store.entries()) {
            if (entry.timestamp < oldestTime) {
                oldestTime = entry.timestamp
                oldestKey = key
            }
        }
        
        if (oldestKey) {
            this.store.delete(oldestKey)
        }
    }
}

// Singleton instances
const analysisCache = new InMemoryCache(500, 24 * 60 * 60 * 1000) // 24 hour TTL for analysis
const llmCache = new InMemoryCache(1000, 7 * 24 * 60 * 60 * 1000) // 7 day TTL for LLM responses

/**
 * Get cached analysis result by input_hash
 */
export function getCachedAnalysis<T>(inputHash: string): T | null {
    return analysisCache.get<T>(`analysis:${inputHash}`)
}

/**
 * Cache analysis result
 */
export function setCachedAnalysis<T>(inputHash: string, result: T): void {
    analysisCache.set(`analysis:${inputHash}`, result)
}

/**
 * Generate prompt signature for LLM cache key
 */
export function generatePromptSignature(promptTemplate: string, section: string): string {
    // Simple hash of prompt template + section
    let hash = 0
    const str = `${promptTemplate}:${section}`
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }
    return Math.abs(hash).toString(36)
}

/**
 * Get cached LLM response
 */
export function getCachedLLMResponse<T>(inputHash: string, promptSignature: string): T | null {
    return llmCache.get<T>(`llm:${inputHash}:${promptSignature}`)
}

/**
 * Cache LLM response
 */
export function setCachedLLMResponse<T>(inputHash: string, promptSignature: string, response: T): void {
    llmCache.set(`llm:${inputHash}:${promptSignature}`, response)
}

/**
 * Check if LLM response is cached
 */
export function hasLLMCache(inputHash: string, promptSignature: string): boolean {
    return llmCache.has(`llm:${inputHash}:${promptSignature}`)
}

/**
 * Get cache statistics
 */
export function getCacheStats(): { analysis: CacheStats; llm: CacheStats } {
    return {
        analysis: analysisCache.getStats(),
        llm: llmCache.getStats()
    }
}

/**
 * LLM Request Queue for batching
 */
interface QueuedRequest {
    inputHash: string
    promptSignature: string
    prompt: string
    resolve: (value: any) => void
    reject: (error: any) => void
    timestamp: number
}

class LLMRequestQueue {
    private queue: QueuedRequest[] = []
    private processing: boolean = false
    private dailyCount: number = 0
    private dailyLimit: number = 1000
    private lastReset: number = Date.now()
    
    constructor() {
        // Reset daily count at midnight
        setInterval(() => {
            const now = Date.now()
            if (now - this.lastReset > 24 * 60 * 60 * 1000) {
                this.dailyCount = 0
                this.lastReset = now
            }
        }, 60 * 60 * 1000) // Check every hour
    }
    
    enqueue(request: Omit<QueuedRequest, 'timestamp'>): void {
        this.queue.push({ ...request, timestamp: Date.now() })
    }
    
    canProcess(): boolean {
        return this.dailyCount < this.dailyLimit
    }
    
    incrementCount(): void {
        this.dailyCount++
    }
    
    getQueueLength(): number {
        return this.queue.length
    }
    
    getDailyUsage(): { count: number; limit: number } {
        return { count: this.dailyCount, limit: this.dailyLimit }
    }
}

export const llmQueue = new LLMRequestQueue()

/**
 * Pipeline version for tracking
 */
export const PIPELINE_VERSION = 'v2.0.0'
