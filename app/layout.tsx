import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    metadataBase: new URL('https://linkedinrank.com'),
    title: {
        default: 'LinkedInRank — #1 Free LinkedIn Profile Scorer & Analyzer (2026)',
        template: '%s | LinkedInRank',
    },
    description: 'LinkedInRank is the world\'s best free LinkedIn profile scorer. Upload your LinkedIn PDF, get a score out of 100 across 30+ signals, AI-powered rewrites, and a personalized improvement roadmap — all in under 60 seconds. No login required.',
    keywords: [
        'linkedin profile score', 'linkedin profile scorer', 'linkedin profile analyzer',
        'linkedin rank', 'linkedinrank', 'linkedin score checker', 'linkedin profile rating',
        'free linkedin analysis', 'linkedin profile review', 'linkedin optimization tool',
        'linkedin profile strength', 'linkedin profile audit', 'linkedin ranking tool',
        'best linkedin scorer', 'linkedin profile grader', 'linkedin profile evaluator',
        'linkedin profile tips', 'linkedin headline optimizer', 'linkedin about section',
        'linkedin profile improvement', 'linkedin recruiter visibility',
        'linkedin pdf analyzer', 'linkedin career optimization',
    ],
    authors: [{ name: 'LinkedInRank', url: 'https://linkedinrank.com' }],
    creator: 'LinkedInRank',
    publisher: 'LinkedInRank',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://linkedinrank.com',
    },
    openGraph: {
        title: 'LinkedInRank — #1 Free LinkedIn Profile Scorer & Analyzer',
        description: 'Score your LinkedIn profile across 30+ signals. Get AI-powered rewrites, a personalized improvement roadmap, and actionable recommendations — free, private, under 60 seconds.',
        url: 'https://linkedinrank.com',
        siteName: 'LinkedInRank',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LinkedInRank — #1 Free LinkedIn Profile Scorer & Analyzer',
        description: 'Upload your LinkedIn PDF. Get a score out of 100, AI-powered rewrites, and a clear improvement roadmap. Free, private, no login.',
        site: '@linkedinrank',
        creator: '@linkedinrank',
    },
    category: 'technology',
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': 'https://linkedinrank.com/#website',
            url: 'https://linkedinrank.com',
            name: 'LinkedInRank',
            description: 'The world\'s best free LinkedIn profile scorer and analyzer. Score your profile across 30+ signals with AI-powered recommendations.',
            publisher: { '@id': 'https://linkedinrank.com/#organization' },
            potentialAction: {
                '@type': 'SearchAction',
                target: 'https://linkedinrank.com/?q={search_term_string}',
                'query-input': 'required name=search_term_string',
            },
        },
        {
            '@type': 'Organization',
            '@id': 'https://linkedinrank.com/#organization',
            name: 'LinkedInRank',
            url: 'https://linkedinrank.com',
            email: 'hello@linkedinrank.com',
            sameAs: ['https://www.instagram.com/linkedinrank/'],
            contactPoint: { '@type': 'ContactPoint', email: 'hello@linkedinrank.com', contactType: 'customer support', url: 'https://linkedinrank.com/contact' },
            description: 'LinkedInRank is the #1 free LinkedIn profile scoring and analysis tool used by professionals worldwide.',
        },
        {
            '@type': 'SoftwareApplication',
            name: 'LinkedInRank',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            description: 'Free LinkedIn profile scorer that analyzes 30+ signals and provides AI-powered improvement recommendations.',
            url: 'https://linkedinrank.com',
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '500',
                bestRating: '5',
            },
        },
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </head>
            <body className={inter.className} suppressHydrationWarning>{children}</body>
        </html>
    )
}
