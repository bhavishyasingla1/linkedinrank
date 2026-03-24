// JSON-LD structured data helpers
import { SITE_URL, SITE_NAME, ToolMeta, ToolFAQ } from './toolsConfig'

const ORGANIZATION_REF = {
    '@type': 'Organization' as const,
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
        '@type': 'ImageObject' as const,
        url: `${SITE_URL}/icon.svg`,
        width: 512,
        height: 512,
    },
    sameAs: [
        'https://www.linkedin.com/company/linkedin-rank/',
        'https://www.instagram.com/linkedinrank/',
    ],
}

const AUTHOR_PERSON = {
    '@type': 'Person' as const,
    name: 'Bhavishya Singla',
    url: 'https://www.linkedin.com/in/bhavishyasingla1/',
    jobTitle: 'Founder',
    worksFor: { '@type': 'Organization' as const, name: SITE_NAME },
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

export interface HowToStep {
    name: string
    text: string
    directions?: string[]
}

export function howToJsonLd(params: {
    name: string
    description: string
    totalTime?: string
    steps: HowToStep[]
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: params.name,
        description: params.description,
        totalTime: params.totalTime || 'PT2H',
        step: params.steps.map((step, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: step.name,
            text: step.text,
            itemListElement: step.directions?.map(dir => ({
                '@type': 'HowToDirection',
                text: dir,
            })),
        })),
    }
}

export function faqJsonLd(faqs: ToolFAQ[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }
}

export function softwareApplicationJsonLd(tool: ToolMeta) {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.metaDescription,
        url: `${SITE_URL}/tools/${tool.slug}`,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'LinkedIn Profile Optimization',
        operatingSystem: 'Web',
        inLanguage: 'en-US',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
        },
        creator: ORGANIZATION_REF,
        publisher: ORGANIZATION_REF,
        featureList: tool.features.map(f => f.title),
        keywords: [tool.primaryKeyword, ...tool.secondaryKeywords].join(', '),
    }
}

export function howToToolJsonLd(tool: ToolMeta) {
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to Use ${tool.name}`,
        description: tool.heroText,
        url: `${SITE_URL}/tools/${tool.slug}`,
        totalTime: 'PT2M',
        tool: { '@type': 'HowToTool', name: 'LinkedIn Profile PDF' },
        step: tool.features.map((f, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: f.title,
            text: f.description,
            url: `${SITE_URL}/tools/${tool.slug}#step-${i + 1}`,
        })),
    }
}

export function articleJsonLd(blog: {
    title: string
    description: string
    url: string
    datePublished: string
    dateModified: string
    keywords?: string
    image?: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: blog.title,
        description: blog.description,
        url: blog.url,
        datePublished: blog.datePublished,
        dateModified: blog.dateModified,
        inLanguage: 'en-US',
        author: AUTHOR_PERSON,
        publisher: ORGANIZATION_REF,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': blog.url,
        },
        isPartOf: {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: SITE_NAME,
        },
        ...(blog.keywords ? { keywords: blog.keywords } : {}),
        ...(blog.image ? { image: blog.image } : {}),
    }
}

export function webPageJsonLd(page: { title: string; description: string; url: string }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.title,
        description: page.description,
        url: page.url,
        inLanguage: 'en-US',
        isPartOf: {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: SITE_URL,
        },
        publisher: ORGANIZATION_REF,
    }
}

export function itemListJsonLd(items: { name: string; url: string; description: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            url: item.url,
            description: item.description,
        })),
    }
}

/**
 * Combined JSON-LD for guide/profession pages:
 * Produces a single @graph with Article + BreadcrumbList + FAQPage.
 * This ensures exactly one schema block per page.
 */
export function guidePageJsonLd(params: {
    title: string
    description: string
    url: string
    datePublished?: string
    dateModified?: string
    breadcrumbs: { name: string; url: string }[]
    faqs: { question: string; answer: string }[]
}) {
    const graph: Record<string, unknown>[] = [
        {
            '@type': 'Article',
            headline: params.title,
            description: params.description,
            author: ORGANIZATION_REF,
            publisher: ORGANIZATION_REF,
            mainEntityOfPage: params.url,
            datePublished: params.datePublished || '2025-01-01',
            dateModified: params.dateModified || '2026-03-24',
            inLanguage: 'en-US',
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: params.breadcrumbs.map((item, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: item.name,
                item: item.url,
            })),
        },
    ]

    if (params.faqs.length > 0) {
        graph.push({
            '@type': 'FAQPage',
            mainEntity: params.faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            })),
        })
    }

    return {
        '@context': 'https://schema.org',
        '@graph': graph,
    }
}
