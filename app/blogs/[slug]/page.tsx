import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllBlogSlugs, getBlogBySlug, getRelatedBlogs, getBlogsByToolSlug } from '@/lib/blogData'
import { getToolBySlug, SITE_URL, SITE_NAME } from '@/lib/toolsConfig'
import { breadcrumbJsonLd, articleJsonLd, faqJsonLd } from '@/lib/jsonLd'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export function generateStaticParams() {
    return getAllBlogSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const blog = getBlogBySlug(params.slug)
    if (!blog) return { title: 'Article Not Found' }

    const canonical = `${SITE_URL}/blogs/${blog.slug}`

    return {
        title: `${blog.title} | ${SITE_NAME}`,
        description: blog.metaDescription,
        keywords: [blog.targetKeyword],
        alternates: { canonical },
        openGraph: {
            title: blog.title,
            description: blog.metaDescription,
            url: canonical,
            siteName: SITE_NAME,
            type: 'article',
            locale: 'en_US',
            publishedTime: blog.datePublished,
            modifiedTime: blog.dateModified,
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: blog.metaDescription,
        },
    }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const blog = getBlogBySlug(params.slug)
    if (!blog) notFound()

    const canonical = `${SITE_URL}/blogs/${blog.slug}`
    const tool = getToolBySlug(blog.toolSlug)
    const related = getRelatedBlogs(blog.slug, 5)
    const allToolBlogs = getBlogsByToolSlug(blog.toolSlug)
    const readingTime = Math.max(3, Math.ceil((blog.h2Outline.length * 150 + 200) / 200))

    const breadcrumbs = breadcrumbJsonLd([
        { name: 'Home', url: SITE_URL },
        { name: 'Blog', url: `${SITE_URL}/blogs` },
        { name: blog.title, url: canonical },
    ])

    const article = articleJsonLd({
        title: blog.title,
        description: blog.metaDescription,
        url: canonical,
        datePublished: blog.datePublished,
        dateModified: blog.dateModified,
        keywords: blog.targetKeyword,
    })

    const faqSchema = tool && tool.faqs.length > 0 ? faqJsonLd(tool.faqs.slice(0, 3)) : null

    return (
        <main id="main-content" className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <SiteHeader />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
            {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

            <div className="flex-1 w-full">
                {/* Breadcrumbs */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
                    <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5 flex-wrap">
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors">Home</Link>
                        <span aria-hidden="true">/</span>
                        <Link href="/blogs" className="hover:text-[#0A66C2] transition-colors">Blog</Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-[#0A0F1C] font-medium truncate max-w-xs">{blog.title}</span>
                    </nav>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
                    <div className="flex flex-col lg:flex-row gap-8 pt-6">
                        {/* Main content */}
                        <article className="flex-1 min-w-0">
                            {/* Tag + reading time */}
                            <div className="flex items-center gap-2 flex-wrap mb-4">
                                {tool && (
                                    <Link
                                        href={`/tools/${tool.slug}`}
                                        className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0A66C2] hover:bg-blue-100 transition-colors"
                                    >
                                        {tool.name}
                                    </Link>
                                )}
                                <span className="text-[10px] text-[#9CA3AF] flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {readingTime} min read
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-3 leading-tight">{blog.title}</h1>

                            <div className="flex items-center gap-3 text-xs text-[#9CA3AF] mb-6">
                                <time dateTime={blog.datePublished}>
                                    {new Date(blog.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </time>
                                <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
                                <span>Updated {new Date(blog.dateModified).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                            </div>

                            {/* Table of Contents */}
                            {blog.h2Outline.length > 2 && (
                                <nav className="bg-white border border-gray-200 rounded-xl p-5 mb-8" aria-label="Table of contents">
                                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">In This Article</p>
                                    <ol className="space-y-1.5">
                                        {blog.h2Outline.map((h2, i) => (
                                            <li key={i}>
                                                <a href={`#section-${i}`} className="text-sm text-[#0A66C2] hover:text-[#084E96] hover:underline transition-colors">
                                                    {h2}
                                                </a>
                                            </li>
                                        ))}
                                        <li><a href="#conclusion" className="text-sm text-[#0A66C2] hover:text-[#084E96] hover:underline transition-colors">Conclusion</a></li>
                                    </ol>
                                </nav>
                            )}

                            {/* Intro paragraph with primary keyword and internal link to tool */}
                            <div className="prose prose-sm max-w-none text-[#374151] leading-relaxed space-y-6">
                                <p className="text-base leading-relaxed">
                                    {blog.summary}
                                    {tool && (
                                        <> Use our free <Link href={`/tools/${tool.slug}`} className="text-[#0A66C2] font-medium hover:underline">{tool.name}</Link> to put these tips into practice instantly.</>
                                    )}
                                </p>

                                {/* H2 sections with SEO-optimized content */}
                                {blog.h2Outline.map((h2, i) => (
                                    <section key={i} id={`section-${i}`}>
                                        <h2 className="text-lg font-bold text-[#0A0F1C] mt-8 mb-3">{h2}</h2>
                                        <p className="text-sm text-[#4B5563] leading-relaxed">
                                            This section covers key insights about {h2.toLowerCase()} as it relates to {blog.targetKeyword}.
                                            Understanding this aspect is crucial for anyone looking to optimize their LinkedIn presence and stand out to recruiters and connections.
                                            {i === 0 && tool && (
                                                <> Our <Link href={`/tools/${tool.slug}`} className="text-[#0A66C2] hover:underline">{tool.name.toLowerCase()}</Link> can help you apply these principles directly to your profile.</>
                                            )}
                                        </p>
                                        <p className="text-sm text-[#4B5563] leading-relaxed mt-3">
                                            The most effective approach combines strategic thinking with practical execution.
                                            Focus on specificity over generality, and always tailor your content to your target audience and industry.
                                            {i === 1 && <> For deeper strategies, explore our <Link href="/linkedin-optimization-guide" className="text-[#0A66C2] hover:underline">complete LinkedIn optimization guide</Link>.</>}
                                            {i === 2 && <> Learn what <Link href="/what-is-linkedin-rank" className="text-[#0A66C2] hover:underline">LinkedIn rank</Link> means and how it impacts your visibility.</>}
                                            {i === 3 && <> Check your current profile strength with our free <Link href="/" className="text-[#0A66C2] hover:underline">LinkedIn rank checker</Link>.</>}
                                        </p>
                                    </section>
                                ))}

                                {/* Conclusion with CTA linking back to tool */}
                                <section id="conclusion">
                                    <h2 className="text-lg font-bold text-[#0A0F1C] mt-8 mb-3">Conclusion</h2>
                                    <p className="text-sm text-[#4B5563] leading-relaxed">
                                        Mastering {blog.targetKeyword} takes practice, but the strategies outlined above give you a clear framework to follow.
                                        Start with the fundamentals, test different approaches, and refine based on results.
                                        {tool && (
                                            <> Ready to apply these insights? Try our free <Link href={`/tools/${tool.slug}`} className="text-[#0A66C2] font-medium hover:underline">{tool.name}</Link> and see the difference it makes for your LinkedIn profile.</>
                                        )}
                                    </p>
                                </section>
                            </div>

                            {/* FAQ snippet */}
                            {tool && tool.faqs.length > 0 && (
                                <section className="mt-10 bg-white border border-gray-200 rounded-xl p-5">
                                    <h2 className="text-base font-bold text-[#0A0F1C] mb-4">Frequently Asked Questions</h2>
                                    <div className="space-y-4">
                                        {tool.faqs.slice(0, 3).map((faq, i) => (
                                            <details key={i} className="group">
                                                <summary className="cursor-pointer text-sm font-semibold text-[#0A0F1C] list-none flex items-center justify-between gap-3">
                                                    {faq.question}
                                                    <svg className="w-4 h-4 text-[#9CA3AF] shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </summary>
                                                <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">{faq.answer}</p>
                                            </details>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Guide links | internal linking boost */}
                            <section className="mt-8 bg-[#F8FAFC] border border-gray-100 rounded-xl p-5">
                                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Continue Learning</p>
                                <div className="grid sm:grid-cols-2 gap-2">
                                    {[
                                        { href: '/linkedin-optimization-guide', label: 'Full Optimization Guide' },
                                        { href: '/linkedin-headline-guide', label: 'Headline Guide' },
                                        { href: '/linkedin-about-guide', label: 'About Section Guide' },
                                        { href: '/linkedin-keywords-guide', label: 'Keywords Guide' },
                                        { href: '/recruiter-psychology', label: 'Recruiter Psychology' },
                                        { href: '/what-is-linkedin-rank', label: 'What Is LinkedIn Rank?' },
                                    ].map(g => (
                                        <Link key={g.href} href={g.href} className="flex items-center gap-2 text-xs font-medium text-[#0A66C2] hover:text-[#084E96] hover:underline transition-colors py-1">
                                            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                            {g.label}
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:w-64 shrink-0 space-y-6">
                            {/* Tool CTA */}
                            {tool && (
                                <div className="bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-xl p-5 text-center">
                                    <h3 className="text-white font-semibold text-sm mb-2">Try {tool.name}</h3>
                                    <p className="text-blue-100 text-xs mb-3">{tool.heroText.slice(0, 100)}...</p>
                                    <Link
                                        href={`/tools/${tool.slug}`}
                                        className="inline-block bg-white text-[#0A66C2] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-50 transition-colors"
                                    >
                                        Use Free Tool
                                    </Link>
                                </div>
                            )}

                            {/* Follow / Social */}
                            <div className="bg-white border border-gray-200 rounded-xl p-4">
                                <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Follow LinkedInRank</h3>
                                <div className="flex items-center gap-3">
                                    <a href="https://www.linkedin.com/company/linkedin-rank/" target="_blank" rel="noopener noreferrer" aria-label="LinkedInRank on LinkedIn" className="flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#0A66C2] transition-colors">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                        LinkedIn
                                    </a>
                                    <a href="https://www.instagram.com/linkedinrank/" target="_blank" rel="noopener noreferrer" aria-label="LinkedInRank on Instagram" className="flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#E4405F] transition-colors">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                        Instagram
                                    </a>
                                </div>
                            </div>

                            {/* Related posts */}
                            {related.length > 0 && (
                                <div className="bg-white border border-gray-200 rounded-xl p-4">
                                    <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Articles</h3>
                                    <div className="space-y-3">
                                        {related.map(r => (
                                            <Link
                                                key={r.slug}
                                                href={`/blogs/${r.slug}`}
                                                className="block text-sm font-medium text-[#0A66C2] hover:text-[#084E96] transition-colors leading-snug"
                                            >
                                                {r.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* All posts in cluster */}
                            {allToolBlogs.length > related.length && (
                                <div className="bg-white border border-gray-200 rounded-xl p-4">
                                    <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">All {tool?.name} Articles</h3>
                                    <div className="space-y-2">
                                        {allToolBlogs.map(b => (
                                            <Link
                                                key={b.slug}
                                                href={`/blogs/${b.slug}`}
                                                className={`block text-xs transition-colors leading-snug ${b.slug === blog.slug ? 'text-[#0A0F1C] font-semibold' : 'text-[#6B7280] hover:text-[#0A66C2]'}`}
                                            >
                                                {b.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Full analysis CTA */}
                            <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 text-center">
                                <p className="text-xs text-[#6B7280] mb-2">Check your LinkedIn profile</p>
                                <Link href="/" className="inline-block text-xs font-semibold text-[#0A66C2] bg-white border border-[#DBEAFE] px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                                    Get Your LinkedIn Rank
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            <SiteFooter />
        </main>
    )
}
