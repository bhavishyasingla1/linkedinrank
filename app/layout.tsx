import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getDynamicHomepageTitle } from '@/lib/titleExperiment'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
    themeColor: '#2f27ce',
}

export async function generateMetadata(): Promise<Metadata> {
    const dynamicTitle = getDynamicHomepageTitle();
    
    return {
        metadataBase: new URL('https://linkedinrank.com'),
        title: {
            default: dynamicTitle,
            template: '%s | LinkedInRank',
        },
        description: 'Check your LinkedIn profile rank for free. Score your profile out of 100 across 30+ signals, get AI-powered recommendations, and see exactly what recruiters see. No login required — results in under 60 seconds.',
        keywords: [
            'linkedin rank', 'linkedin rank checker', 'linkedin profile rank',
            'free linkedin profile checker', 'linkedin ranking tool', 'linkedin profile ranking',
            'linkedin profile score', 'linkedin profile scorer', 'linkedin profile analyzer',
            'linkedinrank', 'linkedin score checker', 'linkedin profile rating',
            'how to rank on linkedin', 'linkedin search ranking', 'linkedin profile visibility',
            'linkedin seo', 'linkedin algorithm ranking', 'linkedin profile score checker',
            'linkedin ranking factors', 'improve linkedin profile ranking',
            'linkedin recruiter search ranking', 'linkedin social selling index',
            'free linkedin analysis', 'linkedin profile review', 'linkedin optimization tool',
            'linkedin profile audit', 'linkedin profile grader',
        ],
        authors: [{ name: 'LinkedInRank', url: 'https://linkedinrank.com' }],
        creator: 'LinkedInRank',
        publisher: 'LinkedInRank',
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: 'https://linkedinrank.com',
        },
        openGraph: {
            title: dynamicTitle,
            description: 'Check your LinkedIn profile rank for free. Score your profile out of 100 across 30+ signals, get AI-powered recommendations, and see exactly what recruiters see. No login required.',
            url: 'https://linkedinrank.com',
            siteName: 'LinkedInRank',
            type: 'website',
            locale: 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title: dynamicTitle,
            description: 'Check your LinkedIn rank for free. Score your profile across 30+ signals, get AI-powered fixes, and see what recruiters see. No login required.',
            site: '@linkedinrank',
            creator: '@linkedinrank',
        },
        category: 'technology',
    }
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': 'https://linkedinrank.com/#website',
            url: 'https://linkedinrank.com',
            name: 'LinkedInRank',
            alternateName: ['LinkedIn Rank', 'LinkedIn Rank Checker', 'LinkedIn Profile Rank Checker', 'linkedinrank.com'],
            description: 'LinkedInRank is the #1 free LinkedIn rank checker and LinkedIn profile ranking tool. Check your LinkedIn rank, get a score out of 100 across 30+ signals, and improve your LinkedIn profile ranking with AI-powered recommendations.',
            publisher: { '@id': 'https://linkedinrank.com/#organization' },
            inLanguage: 'en-US',
            potentialAction: {
                '@type': 'SearchAction',
                target: {
                    '@type': 'EntryPoint',
                    urlTemplate: 'https://linkedinrank.com/?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
            },
        },
        {
            '@type': 'Organization',
            '@id': 'https://linkedinrank.com/#organization',
            name: 'LinkedInRank',
            alternateName: 'LinkedIn Rank',
            url: 'https://linkedinrank.com',
            logo: {
                '@type': 'ImageObject',
                url: 'https://linkedinrank.com/icon.png',
                width: 512,
                height: 512,
            },
            email: 'hello@linkedinrank.com',
            sameAs: [
                'https://www.linkedin.com/company/linkedin-rank/',
                'https://www.instagram.com/linkedinrank/',
            ],
            founder: {
                '@type': 'Person',
                name: 'Bhavishya Singla',
                url: 'https://www.linkedin.com/in/bhavishyasingla1/',
            },
            foundingDate: '2024',
            contactPoint: {
                '@type': 'ContactPoint',
                email: 'hello@linkedinrank.com',
                contactType: 'customer support',
                url: 'https://linkedinrank.com/contact',
            },
            description: 'LinkedInRank is the #1 free LinkedIn rank checker and LinkedIn profile ranking tool. Used by professionals, students, and job seekers worldwide to check their LinkedIn rank and improve their LinkedIn profile visibility.',
            knowsAbout: [
                'LinkedIn profile optimization',
                'LinkedIn SEO',
                'LinkedIn profile ranking',
                'LinkedIn search ranking',
                'LinkedIn recruiter visibility',
                'LinkedIn algorithm ranking factors',
            ],
        },
        {
            '@type': 'WebApplication',
            '@id': 'https://linkedinrank.com/#webapp',
            name: 'LinkedInRank — Free LinkedIn Profile Score Tool',
            alternateName: ['LinkedIn Rank Checker', 'LinkedIn Profile Score Tool', 'Free LinkedIn Profile Checker'],
            url: 'https://linkedinrank.com',
            applicationCategory: 'BusinessApplication',
            applicationSubCategory: 'LinkedIn Profile Analysis Tool',
            operatingSystem: 'Any',
            browserRequirements: 'Requires a modern web browser',
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
            },
            featureList: [
                'LinkedIn profile rank checking',
                'LinkedIn profile scoring across 30+ signals',
                'AI-powered profile recommendations',
                'LinkedIn headline analysis and rewriting',
                'LinkedIn about section optimization',
                'Experience description improvement',
                'LinkedIn keyword optimization',
                'Personalized improvement roadmap',
                'Career stage adaptive scoring',
                'Privacy-first: no login, no data storage',
            ],
            description: 'Free LinkedIn rank checker that scores your LinkedIn profile across 30+ ranking signals. Get your LinkedIn profile rank, AI-powered recommendations, and a personalized improvement roadmap. No login required, no data stored.',
            creator: { '@id': 'https://linkedinrank.com/#organization' },
        },
        {
            '@type': 'SiteNavigationElement',
            name: 'Main Navigation',
            url: 'https://linkedinrank.com',
            hasPart: [
                { '@type': 'WebPage', name: 'Free LinkedIn Tools', url: 'https://linkedinrank.com/tools' },
                { '@type': 'WebPage', name: 'Blog', url: 'https://linkedinrank.com/blogs' },
                { '@type': 'WebPage', name: 'LinkedIn Optimization Guide', url: 'https://linkedinrank.com/linkedin-optimization-guide' },
                { '@type': 'WebPage', name: 'How It Works', url: 'https://linkedinrank.com/how-linkedin-rank-works' },
                { '@type': 'WebPage', name: 'FAQ', url: 'https://linkedinrank.com/faq' },
                { '@type': 'WebPage', name: 'What Is LinkedIn Rank', url: 'https://linkedinrank.com/what-is-linkedin-rank' },
                { '@type': 'WebPage', name: 'LinkedIn Rank vs SSI', url: 'https://linkedinrank.com/linkedin-rank-vs-ssi' },
                { '@type': 'WebPage', name: 'LinkedIn Profile Checklist', url: 'https://linkedinrank.com/linkedin-profile-checklist' },
                { '@type': 'WebPage', name: 'AI Prompts for LinkedIn', url: 'https://linkedinrank.com/ai-prompts-linkedin' },
                { '@type': 'WebPage', name: 'About', url: 'https://linkedinrank.com/about' },
                { '@type': 'WebPage', name: 'Contact', url: 'https://linkedinrank.com/contact' },
            ],
        },
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" dir="ltr">
            <head>
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="format-detection" content="telephone=no" />

                <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
            </head>
            <body className={inter.className} suppressHydrationWarning>
                {/* Skip to content | accessibility */}
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#2f27ce] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
                >
                    Skip to main content
                </a>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {children}
                <Analytics />
                <SpeedInsights />
                <Script
                    src="https://news.google.com/swg/js/v1/publisher.js"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    )
}
