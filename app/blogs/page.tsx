import { Metadata } from 'next'
import Link from 'next/link'
import { ALL_BLOG_POSTS } from '@/lib/blogData'
import { ALL_TOOLS, SITE_URL, SITE_NAME } from '@/lib/toolsConfig'
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/jsonLd'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'LinkedIn Tips Blog | Guides, Examples & Strategies | LinkedInRank',
    description: 'Expert LinkedIn guides, examples, and strategies. Learn how to optimize your profile, write engaging posts, and grow your professional network. 120+ articles across 12 tools.',
    alternates: { canonical: `${SITE_URL}/blogs` },
    openGraph: {
        title: 'LinkedIn Tips Blog | Guides, Examples & Strategies | LinkedInRank',
        description: 'Expert LinkedIn guides, examples, and strategies for profile optimization and content creation.',
        url: `${SITE_URL}/blogs`,
        siteName: SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LinkedIn Tips Blog | LinkedInRank',
        description: 'Expert LinkedIn guides, examples, and strategies.',
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
                {/* Breadcrumbs */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
                    <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5">
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors">Home</Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-[#0A0F1C] font-medium">Blog</span>
                    </nav>
                </div>

                {/* Hero */}
                <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-3">LinkedIn Tips Blog</h1>
                            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-2xl">
                                Expert guides, examples, and strategies to optimize your LinkedIn profile, write engaging content, and grow your professional network. {ALL_BLOG_POSTS.length}+ articles across {toolGroups.length} tools.
                            </p>
                        </div>
                        {/* Social follow */}
                        <div className="flex items-center gap-3 shrink-0">
                            <a href="https://www.linkedin.com/company/linkedin-rank/" target="_blank" rel="noopener noreferrer" aria-label="LinkedInRank on LinkedIn" className="text-[#9CA3AF] hover:text-[#0A66C2] transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                            <a href="https://www.instagram.com/linkedinrank/" target="_blank" rel="noopener noreferrer" aria-label="LinkedInRank on Instagram" className="text-[#9CA3AF] hover:text-[#E4405F] transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Tool filter tags */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-6">
                    <div className="flex flex-wrap gap-2" role="navigation" aria-label="Filter by tool">
                        {toolGroups.map(({ tool, blogs }) => (
                            <a
                                key={tool.slug}
                                href={`#${tool.slug}`}
                                className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[#4B5563] hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors"
                            >
                                {tool.name.replace('LinkedIn ', '')} <span className="text-[#D1D5DB] ml-0.5">{blogs.length}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Blog clusters by tool */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 space-y-12">
                    {toolGroups.map(({ tool, blogs }) => (
                        <section key={tool.slug} id={tool.slug} aria-labelledby={`heading-${tool.slug}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <h2 id={`heading-${tool.slug}`} className="text-lg font-bold text-[#0A0F1C]">{tool.name}</h2>
                                <Link
                                    href={`/tools/${tool.slug}`}
                                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#0A66C2] hover:bg-blue-100 transition-colors"
                                >
                                    Use Free Tool →
                                </Link>
                                <span className="text-[10px] text-[#9CA3AF] ml-auto">{blogs.length} articles</span>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {blogs.map(blog => (
                                    <Link
                                        key={blog.slug}
                                        href={`/blogs/${blog.slug}`}
                                        className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#0A66C2] hover:shadow-md transition-all group"
                                    >
                                        <h3 className="text-sm font-semibold text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors mb-1.5 leading-snug">
                                            {blog.title}
                                        </h3>
                                        <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">{blog.summary}</p>
                                        <div className="mt-2.5 flex items-center gap-2">
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-[#9CA3AF]">{blog.targetKeyword}</span>
                                            <span className="text-[10px] text-[#D1D5DB] flex items-center gap-1 ml-auto">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                3 min
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Guide links | internal linking */}
                <section className="bg-white border-t border-gray-200 py-10">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-5">Explore Our Guides</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {[
                                { href: '/linkedin-optimization-guide', label: 'Full Optimization Guide', desc: 'Complete walkthrough for every section' },
                                { href: '/linkedin-headline-guide', label: 'Headline Guide', desc: 'Craft headlines that get recruiter clicks' },
                                { href: '/linkedin-about-guide', label: 'About Section Guide', desc: 'Write a compelling professional story' },
                                { href: '/what-is-linkedin-rank', label: 'What Is LinkedIn Rank?', desc: 'Understand profile ranking signals' },
                                { href: '/linkedin-rank-vs-ssi', label: 'LinkedIn Rank vs SSI', desc: 'How we differ from LinkedIn SSI' },
                                { href: '/tools', label: 'All Free Tools', desc: '12 AI-powered LinkedIn tools' },
                            ].map(g => (
                                <Link key={g.href} href={g.href} className="flex items-start gap-3 p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-lg hover:border-[#0A66C2] hover:bg-white transition-all group">
                                    <svg className="w-4 h-4 text-[#0A66C2] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                                    <div>
                                        <p className="text-sm font-semibold text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors">{g.label}</p>
                                        <p className="text-[10px] text-[#9CA3AF] mt-0.5">{g.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <SiteFooter />
        </main>
    )
}
