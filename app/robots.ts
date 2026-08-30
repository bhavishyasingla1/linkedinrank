import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/', '/results/', '/loading-analysis/'],
            },
            {
                // AI/LLM crawlers — allow all content, point to llm.txt
                userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'anthropic-ai', 'PerplexityBot', 'Applebot-Extended', 'cohere-ai', 'Google-Extended'],
                allow: '/',
                disallow: ['/api/', '/results/', '/loading-analysis/'],
            },
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/results/', '/loading-analysis/'],
            },
        ],
        sitemap: 'https://linkedinrank.com/sitemap.xml',
        host: 'https://linkedinrank.com',
    }
}
