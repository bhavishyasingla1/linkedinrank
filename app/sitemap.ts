import { MetadataRoute } from 'next'
import { ALL_TOOLS } from '@/lib/toolsConfig'
import { ALL_BLOG_POSTS } from '@/lib/blogData'

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

    return [
        { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
        // Directory pages
        { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
        { url: `${baseUrl}/blogs`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
        // All tool pages
        ...toolPages,
        // All blog pages
        ...blogPages,
        // Pillar pages (high priority for primary keyword targeting)
        { url: `${baseUrl}/what-is-linkedin-rank`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
        { url: `${baseUrl}/linkedin-rank-vs-ssi`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
        // Core pages
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
        // Audience pages
        { url: `${baseUrl}/for-jobseekers`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/for-founders`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        // Comparison pages
        { url: `${baseUrl}/linkedin-profile-checklist`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/compare-linkedin-review-tools`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/linkedinrank-vs-manual-audits`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        // SEO landing pages
        { url: `${baseUrl}/linkedin-best-practices`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/score`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/rank`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        // Core SEO pillar pages (SOP keyword clusters)
        { url: `${baseUrl}/linkedin-ranking`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
        { url: `${baseUrl}/linkedin-profile-score`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
        { url: `${baseUrl}/linkedin-headline-for-graphic-designer`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
        { url: `${baseUrl}/linkedin-profile-for-students`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
        // Pillar guide
        { url: `${baseUrl}/linkedin-optimization-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        // Section guides
        { url: `${baseUrl}/linkedin-headline-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/linkedin-about-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/linkedin-keywords-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/linkedin-profile-photo-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        // Strategy guides
        { url: `${baseUrl}/linkedin-personal-branding`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/linkedin-content-strategy`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/viral-post-formulas`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        // Recruiter & career guides
        { url: `${baseUrl}/recruiter-psychology`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/get-noticed-recruiters`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/top-1-percent-profiles`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/linkedin-mistakes`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/linkedin-resume-vs-profile`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        // Role-specific headline guides
        { url: `${baseUrl}/linkedin-headline-software-engineers`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-mba`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-marketers`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-designers`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-data-scientists`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-product-managers`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-consultants`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-sales`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-hr`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-finance`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-healthcare`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-teachers`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        // AI Prompt guides
        { url: `${baseUrl}/ai-prompts-linkedin`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/ai-prompts-linkedin-headline`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/ai-prompts-linkedin-about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/ai-prompts-linkedin-experience`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/ai-prompts-linkedin-skills`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/ai-prompts-linkedin-summary`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ]
}
