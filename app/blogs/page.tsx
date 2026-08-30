import { Metadata } from 'next'
import Link from 'next/link'
import { ALL_BLOG_POSTS } from '@/lib/blogData'
import { SITE_URL, SITE_NAME } from '@/lib/toolsConfig'
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/jsonLd'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import BlogIndexClient from '@/components/BlogIndexClient'
import GooglePreferredSource from '@/components/GooglePreferredSource'
import { ArrowRightIcon, SparklesIcon } from '@/components/ui/Icons'

export const metadata: Metadata = {
    title: 'LinkedIn Strategy & Profile Guides (2026)',
    description: '120+ expert LinkedIn guides, examples, and templates. Headline formulas, about section examples, experience descriptions, content strategies, and more. All free.',
    alternates: { canonical: `${SITE_URL}/blogs` },
    openGraph: {
        title: 'LinkedIn Strategy & Profile Guides (2026)',
        description: '120+ expert LinkedIn guides, examples, and templates for profile optimization and content creation.',
        url: `${SITE_URL}/blogs`,
        siteName: SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LinkedIn Strategy & Profile Guides (2026)',
        description: '120+ expert LinkedIn guides, examples, and templates.',
    },
}

const CATEGORIES = [
    { slug: 'hooks', name: 'Hooks & Copywriting' },
    { slug: 'headline', name: 'Headlines' },
    { slug: 'about', name: 'About Section' },
    { slug: 'experience', name: 'Experience & Bullets' },
    { slug: 'faq', name: 'LinkedIn Basics & FAQ' },
    { slug: 'privacy', name: 'Privacy & Safety' },
    { slug: 'students', name: 'Students & Internships' },
    { slug: 'seo', name: 'Keywords & SEO' },
    { slug: 'linkedin-connection-message-generator', name: 'Networking & Outreach' },
]

export default function BlogsDirectoryPage() {
    const breadcrumbs = breadcrumbJsonLd([
        { name: 'Home', url: SITE_URL },
        { name: 'Blog', url: `${SITE_URL}/blogs` },
    ])

    const blogList = itemListJsonLd(
        ALL_BLOG_POSTS.map((b) => ({
            name: b.title,
            url: `${SITE_URL}/blogs/${b.slug}`,
            description: b.metaDescription,
        }))
    )

    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <SiteHeader />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogList) }} />

            <main id="main-content" className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
                {/* ── Header Intro ──────────────────────────────── */}
                <div className="space-y-4">
                    <nav aria-label="Breadcrumb" className="text-[13px] text-[#050315]/60 flex items-center gap-2">
                        <Link href="/" className="hover:text-[#2f27ce] transition-colors no-underline">Home</Link>
                        <span>/</span>
                        <span className="text-[#050315] font-semibold">Articles</span>
                    </nav>

                    <div className="max-w-3xl space-y-2.5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] text-[12px] font-extrabold text-[#2f27ce] leading-none">
                            <span className="relative flex h-1.5 w-1.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2f27ce] opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2f27ce]" />
                            </span>
                            <span>Editorial Library • {ALL_BLOG_POSTS.length}+ Guides</span>
                        </div>
                        <h1 className="text-[28px] sm:text-[38px] font-extrabold text-[#050315] tracking-tight leading-tight">
                            LinkedIn Strategy &amp; Profile Guides
                        </h1>
                        <p className="text-[15px] sm:text-[16px] text-[#050315]/75 leading-relaxed">
                            Recruiter algorithm insights, keyword positioning, headline psychology, and career frameworks.
                        </p>
                    </div>
                </div>

                {/* ── Curated Core Guides Strip ─────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {[
                        { href: '/linkedin-profile-score', title: 'LinkedIn Profile Score Guide', desc: 'How profile scoring works and what moves your score.' },
                        { href: '/linkedin-keywords-guide', title: 'Recruiter Keyword SEO', desc: 'How LinkedIn algorithms match search terms with profiles.' },
                        { href: '/recruiter-psychology', title: 'The 7-Second Recruiter Scan', desc: 'Where hiring managers look first when reviewing profiles.' },
                    ].map((guide, i) => (
                        <Link
                            key={i}
                            href={guide.href}
                            className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow aside-card-hover transition-all no-underline group space-y-1"
                        >
                            <h2 className="text-[14.5px] font-bold text-[#050315] group-hover:text-[#2f27ce] transition-colors leading-snug">
                                {guide.title}
                            </h2>
                            <p className="text-[12px] text-[#050315]/70 leading-normal line-clamp-2">
                                {guide.desc}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* ── Interactive Blog Client (Carousel, Spotlight, Search, Filters, Grid) */}
                <BlogIndexClient allPosts={ALL_BLOG_POSTS} categories={CATEGORIES} />

                {/* ── Google Preferred Source Banner ── */}
                <GooglePreferredSource
                    variant="banner"
                    title="Follow LinkedInRank on Google Search"
                    description="Stay up to date with new recruiter algorithms, keyword blueprints, and profile hooks directly in Google Search."
                />

                {/* ── Bottom Conversion Banner (Aside Radiant Box) ── */}
                <div className="bg-gradient-to-r from-[#dedcff]/60 via-white to-[#dedcff]/60 border border-[#dedcff] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xs">
                    <div className="space-y-1.5 max-w-xl">
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-2.5 py-0.5 rounded-full leading-none">
                            Ready to test your profile?
                        </span>
                        <h3 className="text-[18px] sm:text-[22px] font-extrabold text-[#050315] tracking-tight">
                            Evaluate your LinkedIn profile against 30+ signals
                        </h3>
                        <p className="text-[13.5px] text-[#050315]/75 leading-normal">
                            Upload your LinkedIn export to uncover hidden gaps in keywords, experience, and completeness.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <Link
                            href="/#upload"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[14px] font-bold shadow-md shadow-[#2f27ce]/25 transition-all no-underline cursor-pointer active:scale-95"
                        >
                            <span>Analyze Profile Free</span>
                            <ArrowRightIcon size={14} />
                        </Link>
                    </div>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}
