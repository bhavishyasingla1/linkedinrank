import { MetadataRoute } from 'next'
import { ALL_TOOLS } from '@/lib/toolsConfig'
import { ALL_BLOG_POSTS } from '@/lib/blogData'
import { ALL_PAGES } from '@/lib/seoConfig'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://linkedinrank.com'
    const now = new Date()

    // Tool pages: /tools/<slug>
    const toolPages: MetadataRoute.Sitemap = ALL_TOOLS.map(tool => ({
        url: `${baseUrl}/tools/${tool.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // Blog pages: /blogs/<slug>
    const blogPages: MetadataRoute.Sitemap = ALL_BLOG_POSTS.map(blog => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: new Date(blog.dateModified),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Content pages from SEO registry (with real lastModified dates)
    const priorityMap: Record<string, number> = {
        pillar: 0.95,
        guide: 0.8,
        profession: 0.7,
        audience: 0.7,
        comparison: 0.6,
        tool: 0.9,
        legal: 0.4,
    }
    const contentPages: MetadataRoute.Sitemap = ALL_PAGES.map(page => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(page.lastModified),
        changeFrequency: (page.type === 'pillar' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
        priority: priorityMap[page.type] ?? 0.7,
    }))

    return [
        { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
        // Directory pages
        { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
        { url: `${baseUrl}/blogs`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
        // All tool pages
        ...toolPages,
        // All blog pages
        ...blogPages,
        // All content pages from SEO registry
        ...contentPages,
        // Core pages (not in SEO registry)
        { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/methodology`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/how-linkedin-rank-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/story`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
        // Legal & trust pages
        { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
        { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
        { url: `${baseUrl}/cookie-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
        { url: `${baseUrl}/data-security`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        // Score / rank / linkedin alias pages
        { url: `${baseUrl}/score`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/rank`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/linkedin`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ]
}
