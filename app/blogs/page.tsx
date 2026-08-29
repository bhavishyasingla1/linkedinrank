import { Metadata } from 'next'
import Link from 'next/link'
import { ALL_BLOG_POSTS } from '@/lib/blogData'
import { SITE_URL, SITE_NAME } from '@/lib/toolsConfig'
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/jsonLd'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import BlogIndexClient from '@/components/BlogIndexClient'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ArrowRightIcon } from '@/components/ui/Icons'

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
    { slug: 'headline', name: 'Headlines' },
    { slug: 'about', name: 'About Section' },
    { slug: 'experience', name: 'Experience & Bullets' },
    { slug: 'seo', name: 'Keywords & SEO' },
    { slug: 'linkedin-post-ideas-generator', name: 'Content & Posts' },
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
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <SiteHeader />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogList) }} />

            <main id="main-content" className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
                {/* ── Header Intro ──────────────────────────────── */}
                <div className="space-y-3">
                    <nav aria-label="Breadcrumb" className="text-[13px] text-[#64748B] flex items-center gap-1.5">
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                        <span>/</span>
                        <span className="text-[#0F172A] font-medium">Articles</span>
                    </nav>

                    <div className="max-w-3xl pt-2 space-y-2">
                        <Badge variant="brand" size="sm">
                            Editorial Library • {ALL_BLOG_POSTS.length}+ Guides
                        </Badge>
                        <h1 className="text-[28px] sm:text-[36px] font-bold text-[#0F172A] tracking-tight">
                            LinkedIn Optimization &amp; Strategy Guides
                        </h1>
                        <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed">
                            Tested advice on recruiter algorithms, keyword positioning, headline psychology, and career storytelling.
                        </p>
                    </div>
                </div>

                {/* ── Curated Core Guides Strip ─────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { href: '/linkedin-profile-score', title: 'LinkedIn Profile Score Guide', desc: 'How profile scoring works and what moves your score.' },
                        { href: '/linkedin-keywords-guide', title: 'Recruiter Keyword SEO', desc: 'How LinkedIn algorithms match search terms with profiles.' },
                        { href: '/recruiter-psychology', title: 'The 7-Second Recruiter Scan', desc: 'Where hiring managers look first when reviewing profiles.' },
                    ].map((guide, i) => (
                        <Link
                            key={i}
                            href={guide.href}
                            className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0A66C2] shadow-xs hover:shadow-sm transition-all no-underline group space-y-1"
                        >
                            <h2 className="text-[14px] font-semibold text-[#0F172A] group-hover:text-[#0A66C2] transition-colors">
                                {guide.title}
                            </h2>
                            <p className="text-[12px] text-[#64748B] leading-relaxed">
                                {guide.desc}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* ── Interactive Blog Client (Search, Filters, Grid) */}
                <BlogIndexClient allPosts={ALL_BLOG_POSTS} categories={CATEGORIES} />

                {/* ── Bottom Conversion Banner ──────────────────── */}
                <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
                    <div className="space-y-1 max-w-xl">
                        <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider">
                            Ready to test your profile?
                        </span>
                        <h3 className="text-[18px] sm:text-[20px] font-bold text-white tracking-tight">
                            Evaluate your LinkedIn profile against 30+ signals
                        </h3>
                        <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                            Upload your LinkedIn export to uncover hidden gaps in keywords, experience, and completeness.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <Button
                            href="/#upload"
                            variant="primary"
                            size="md"
                            rightIcon={<ArrowRightIcon size={14} />}
                        >
                            Analyze Profile Free
                        </Button>
                    </div>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}
