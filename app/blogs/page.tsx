import { Metadata } from 'next'
import Link from 'next/link'
import { ALL_BLOG_POSTS } from '@/lib/blogData'
import { ALL_TOOLS, SITE_URL, SITE_NAME } from '@/lib/toolsConfig'
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/jsonLd'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'

export const metadata: Metadata = {
    title: 'LinkedIn Tips Blog | 120+ Guides, Examples & Templates (2026)',
    description: '120+ expert LinkedIn guides, examples, and templates. Headline formulas, about section examples, experience descriptions, content strategies, and more. All free.',
    alternates: { canonical: `${SITE_URL}/blogs` },
    openGraph: {
        title: 'LinkedIn Tips Blog | 120+ Guides, Examples & Templates (2026)',
        description: '120+ expert LinkedIn guides, examples, and templates for profile optimization and content creation.',
        url: `${SITE_URL}/blogs`,
        siteName: SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LinkedIn Tips Blog | 120+ Guides & Templates (2026)',
        description: '120+ expert LinkedIn guides, examples, and templates.',
    },
}

export default function BlogsDirectoryPage() {
    const breadcrumbs = breadcrumbJsonLd([
        { name: 'Home', url: SITE_URL },
        { name: 'Blog', url: `${SITE_URL}/blogs` },
    ])

    const blogList = itemListJsonLd(
        ALL_BLOG_POSTS.slice(0, 50).map(b => ({
            name: b.title,
            url: `${SITE_URL}/blogs/${b.slug}`,
            description: b.metaDescription,
        }))
    )

    // Group blogs by tool
    const toolGroups = ALL_TOOLS.map(tool => ({
        tool,
        blogs: ALL_BLOG_POSTS.filter(b => b.toolSlug === tool.slug),
    })).filter(g => g.blogs.length > 0)

    return (
        <main id="main-content" className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <SiteHeader />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogList) }} />

            <div className="flex-1 w-full">
                {/* Hero */}
                <section className="bg-gradient-to-b from-[#F8FAFC] to-white border-b border-gray-100">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-10">
                        <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5 mb-6">
                            <Link href="/" className="hover:text-[#0A66C2] transition-colors">Home</Link>
                            <span aria-hidden="true">/</span>
                            <span className="text-[#0A0F1C] font-medium">Blog</span>
                        </nav>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-2">
                            <div className="max-w-2xl">
                                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] mb-3 tracking-tight">Everything we&apos;ve learned about how LinkedIn profiles get noticed</h1>
                                <p className="text-[15px] sm:text-base text-[#4B5563] leading-relaxed">
                                    Organized by the exact sections recruiters scan first. {ALL_BLOG_POSTS.length}+ expert articles, all free.
                                </p>
                            </div>
                            <Link href="/" className="shrink-0 text-sm font-semibold text-[#0A66C2] bg-[#EFF6FF] border border-[#DBEAFE] px-5 py-2.5 rounded-lg no-underline hover:bg-[#DBEAFE] transition-colors whitespace-nowrap">
                                Check Your Profile Score
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Start Here */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">Start Here</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                        {[
                            { href: '/linkedin-profile-score', title: 'LinkedIn Profile Score Explained', desc: 'What your score means and how to improve it' },
                            { href: '/linkedin-keywords-guide', title: 'LinkedIn SEO Guide', desc: 'How recruiters search and which keywords matter' },
                            { href: '/recruiter-psychology', title: 'How Recruiters Actually Read Profiles', desc: 'What they look for in the first 7 seconds' },
                        ].map((guide, i) => (
                            <Link key={i} href={guide.href} className="group bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-4 no-underline hover:shadow-md transition-all">
                                <p className="text-sm font-bold text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors mb-1">{guide.title}</p>
                                <p className="text-xs text-[#6B7280] leading-relaxed">{guide.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Tool filter tags */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sticky top-[57px] z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
                    <div className="flex flex-wrap items-center gap-3" role="navigation" aria-label="Filter by tool">
                        {toolGroups.map(({ tool, blogs }) => (
                            <a
                                key={tool.slug}
                                href={`#${tool.slug}`}
                                className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full bg-white border border-gray-200 text-[#4B5563] hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#EFF6FF] hover:shadow-sm transition-all"
                            >
                                <span>{tool.name.replace('LinkedIn ', '')}</span>
                                <span className="text-[#9CA3AF] text-[10px] bg-gray-50 px-1.5 py-0.5 rounded-full">{blogs.length}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Blog clusters by tool */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-14">
                    {toolGroups.map(({ tool, blogs }) => (
                        <section key={tool.slug} id={tool.slug} aria-labelledby={`heading-${tool.slug}`} className="scroll-mt-32">
                            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                                <div className="w-2 h-2 rounded-full bg-[#0A66C2] shrink-0" />
                                <h2 id={`heading-${tool.slug}`} className="text-xl font-bold text-[#0A0F1C]">{tool.name}</h2>
                                <Link
                                    href={`/tools/${tool.slug}`}
                                    className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-[#EFF6FF] text-[#0A66C2] hover:bg-[#DBEAFE] transition-colors no-underline ml-auto"
                                >
                                    Try Free Tool
                                </Link>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {blogs.map((blog, idx) => (
                                    <Link
                                        key={blog.slug}
                                        href={`/blogs/${blog.slug}`}
                                        className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-[#DBEAFE] hover:shadow-[0_4px_20px_rgba(10,102,194,0.08)] transition-all"
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="text-[11px] font-bold text-[#D1D5DB] mt-0.5 shrink-0 tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                                            <div className="min-w-0">
                                                <h3 className="text-sm font-semibold text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors mb-1.5 leading-snug">
                                                    {blog.title}
                                                </h3>
                                                <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2 mb-3">{blog.summary}</p>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-medium text-[#6B7280]">{blog.targetKeyword}</span>
                                                    <span className="text-[10px] text-[#D1D5DB] flex items-center gap-1 ml-auto">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        {Math.max(3, Math.ceil((blog.h2Outline.length * 150 + 200) / 200))} min
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Guide links | internal linking */}
                <section className="bg-gradient-to-b from-white to-[#F8FAFC] border-t border-gray-200 py-12">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-2">Keep Learning</p>
                        <h2 className="text-xl font-bold text-[#0A0F1C] mb-6">Explore Our Guides</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { href: '/linkedin-optimization-guide', label: 'Full Optimization Guide', desc: 'Complete walkthrough for every section' },
                                { href: '/linkedin-headline-guide', label: 'Headline Guide', desc: 'Craft headlines that get recruiter clicks' },
                                { href: '/linkedin-about-guide', label: 'About Section Guide', desc: 'Write a compelling professional story' },
                                { href: '/what-is-linkedin-rank', label: 'What Is LinkedIn Rank?', desc: 'Understand profile ranking signals' },
                                { href: '/linkedin-rank-vs-ssi', label: 'LinkedIn Rank vs SSI', desc: 'How we differ from LinkedIn SSI' },
                                { href: '/tools', label: 'All Free Tools', desc: '12 AI-powered LinkedIn tools' },
                            ].map(g => (
                                <Link key={g.href} href={g.href} className="group bg-white border border-gray-200 rounded-xl p-4 no-underline hover:border-[#DBEAFE] hover:shadow-[0_4px_16px_rgba(10,102,194,0.06)] transition-all">
                                    <p className="text-sm font-semibold text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors mb-1">{g.label}</p>
                                    <p className="text-xs text-[#6B7280] leading-relaxed">{g.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <FooterLayout />
        </main>
    )
}
