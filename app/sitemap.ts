import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://linkedinrank.com'

    return [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
        // Core pages
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/methodology`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/how-linkedin-rank-works`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/story`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
        // Legal & trust pages
        { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
        { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
        { url: `${baseUrl}/cookie-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
        { url: `${baseUrl}/data-security`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        // Audience pages
        { url: `${baseUrl}/for-students`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/for-jobseekers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/for-founders`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        // Tool & comparison pages
        { url: `${baseUrl}/linkedin-profile-checklist`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/compare-linkedin-review-tools`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/linkedinrank-vs-manual-audits`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        // SEO landing pages
        { url: `${baseUrl}/linkedin-best-practices`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/linkedin`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/score`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/rank`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        // Pillar guide
        { url: `${baseUrl}/linkedin-optimization-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
        // Section guides
        { url: `${baseUrl}/linkedin-headline-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/linkedin-about-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/linkedin-keywords-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/linkedin-profile-photo-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        // Strategy guides
        { url: `${baseUrl}/linkedin-personal-branding`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/linkedin-content-strategy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/viral-post-formulas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        // Recruiter & career guides
        { url: `${baseUrl}/recruiter-psychology`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/get-noticed-recruiters`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/top-1-percent-profiles`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/linkedin-mistakes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/linkedin-resume-vs-profile`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        // Role-specific headline guides
        { url: `${baseUrl}/linkedin-headline-software-engineers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-mba`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-marketers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-designers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-data-scientists`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-product-managers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-consultants`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-sales`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-hr`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-finance`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-healthcare`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/linkedin-headline-teachers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        // AI Prompt guides
        { url: `${baseUrl}/ai-prompts-linkedin`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/ai-prompts-linkedin-headline`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/ai-prompts-linkedin-about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/ai-prompts-linkedin-experience`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/ai-prompts-linkedin-skills`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/ai-prompts-linkedin-summary`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ]
}
