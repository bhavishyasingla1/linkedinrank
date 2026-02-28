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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const blog = getBlogBySlug(slug)
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const blog = getBlogBySlug(slug)
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

    const faqSchema = null

    return (
        <main id="main-content" className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <SiteHeader />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
            {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

            <div className="flex-1 w-full">
                {/* Hero header */}
                <div className="bg-gradient-to-b from-[#F8FAFC] to-white border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-10">
                        <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5 flex-wrap mb-8">
                            <Link href="/" className="hover:text-[#0A66C2] transition-colors">Home</Link>
                            <span aria-hidden="true">/</span>
                            <Link href="/blogs" className="hover:text-[#0A66C2] transition-colors">Blog</Link>
                            <span aria-hidden="true">/</span>
                            <span className="text-[#0A0F1C] font-medium truncate max-w-xs">{blog.title}</span>
                        </nav>

                        <div className="flex items-center gap-3 flex-wrap mb-4">
                            {tool && (
                                <Link
                                    href={`/tools/${tool.slug}`}
                                    className="inline-block text-[11px] font-semibold px-3 py-1 rounded-lg bg-[#EFF6FF] text-[#0A66C2] border border-[#DBEAFE] hover:bg-[#DBEAFE] transition-colors no-underline"
                                >
                                    {tool.name}
                                </Link>
                            )}
                            <span className="text-[11px] text-[#6B7280] flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {readingTime} min read
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A0F1C] mb-4 leading-tight tracking-tight">{blog.title}</h1>

                        <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                            <time dateTime={blog.datePublished}>
                                {new Date(blog.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                            <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
                            <span>Updated {new Date(blog.dateModified).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
                    <div className="flex flex-col lg:flex-row gap-10 pt-8">
                        {/* Main content */}
                        <article className="flex-1 min-w-0">

                            {/* Table of Contents */}
                            {blog.h2Outline.length > 2 && (
                                <nav className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5 sm:p-6 mb-10" aria-label="Table of contents">
                                    <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-4">In This Article</p>
                                    <ol className="space-y-2">
                                        {blog.h2Outline.map((h2, i) => (
                                            <li key={i} className="flex items-start gap-2.5">
                                                <span className="text-[11px] font-bold text-[#D1D5DB] tabular-nums mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                                                <a href={`#section-${i}`} className="text-sm text-[#0A0F1C] hover:text-[#0A66C2] no-underline transition-colors">
                                                    {h2}
                                                </a>
                                            </li>
                                        ))}
                                        <li className="flex items-start gap-2.5">
                                            <span className="text-[11px] font-bold text-[#D1D5DB] tabular-nums mt-0.5 shrink-0">{String(blog.h2Outline.length + 1).padStart(2, '0')}</span>
                                            <a href="#conclusion" className="text-sm text-[#0A0F1C] hover:text-[#0A66C2] no-underline transition-colors">Conclusion</a>
                                        </li>
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

                                {/* H2 sections with real content */}
                                {blog.h2Outline.map((h2, i) => (
                                    <section key={i} id={`section-${i}`} className="scroll-mt-24">
                                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-4">{h2}</h2>
                                        {blog.sections?.[i] ? (
                                            <>
                                                <p className="text-[15px] text-[#4B5563] leading-relaxed">
                                                    {blog.sections[i]}
                                                </p>
                                                {i === 0 && tool && (
                                                    <p className="text-[15px] text-[#4B5563] leading-relaxed mt-3">
                                                        Our free <Link href={`/tools/${tool.slug}`} className="text-[#0A66C2] font-medium hover:underline">{tool.name}</Link> can help you apply these principles directly to your own profile in seconds.
                                                    </p>
                                                )}
                                                {i === 1 && (
                                                    <p className="text-[15px] text-[#4B5563] leading-relaxed mt-3">
                                                        For a broader view, explore our <Link href="/linkedin-optimization-guide" className="text-[#0A66C2] hover:underline">complete LinkedIn optimization guide</Link> covering every profile section.
                                                    </p>
                                                )}
                                                {i === 2 && (
                                                    <p className="text-[15px] text-[#4B5563] leading-relaxed mt-3">
                                                        Learn how <Link href="/what-is-linkedin-rank" className="text-[#0A66C2] hover:underline">LinkedIn rank</Link> is calculated and which signals move the needle most.
                                                    </p>
                                                )}
                                                {i === 3 && (
                                                    <p className="text-[15px] text-[#4B5563] leading-relaxed mt-3">
                                                        Check your current profile strength for free with our <Link href="/" className="text-[#0A66C2] hover:underline">LinkedIn rank checker</Link>.
                                                    </p>
                                                )}
                                            </>
                                        ) : (
                                            <p className="text-[15px] text-[#4B5563] leading-relaxed">
                                                {blog.summary}
                                            </p>
                                        )}
                                    </section>
                                ))}

                                {/* Conclusion with CTA linking back to tool */}
                                <section id="conclusion" className="scroll-mt-24">
                                    <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-4">Conclusion</h2>
                                    <p className="text-[15px] text-[#4B5563] leading-relaxed">
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
                                <section className="mt-12 bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6 sm:p-8">
                                    <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-1">FAQ</p>
                                    <h2 className="text-lg font-bold text-[#0A0F1C] mb-5">Frequently Asked Questions</h2>
                                    <div className="space-y-4">
                                        {tool.faqs.slice(0, 3).map((faq, i) => (
                                            <details key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                                                <summary className="cursor-pointer text-sm font-semibold text-[#0A0F1C] list-none flex items-center justify-between gap-3 p-4 hover:bg-[#FAFBFC] transition-colors">
                                                    {faq.question}
                                                    <svg className="w-4 h-4 text-[#6B7280] shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </summary>
                                                <p className="px-4 pb-4 text-sm text-[#4B5563] leading-relaxed">{faq.answer}</p>
                                            </details>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Guide links | internal linking boost */}
                            <section className="mt-8 border-t border-gray-100 pt-8">
                                <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Continue Learning</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {[
                                        { href: '/linkedin-optimization-guide', label: 'Full Optimization Guide' },
                                        { href: '/linkedin-headline-guide', label: 'Headline Guide' },
                                        { href: '/linkedin-about-guide', label: 'About Section Guide' },
                                        { href: '/linkedin-keywords-guide', label: 'Keywords Guide' },
                                        { href: '/recruiter-psychology', label: 'Recruiter Psychology' },
                                        { href: '/what-is-linkedin-rank', label: 'What Is LinkedIn Rank?' },
                                    ].map(g => (
                                        <Link key={g.href} href={g.href} className="text-xs font-medium text-[#4B5563] bg-[#F8FAFC] border border-gray-200 px-3 py-2 rounded-lg no-underline hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors">
                                            {g.label}
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:w-72 shrink-0 space-y-5">
                            {/* Tool CTA */}
                            {tool && (
                                <div className="bg-gradient-to-br from-[#0A66C2] to-[#084E96] rounded-2xl p-6 text-center shadow-[0_4px_20px_rgba(10,102,194,0.2)]">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                                    </div>
                                    <h3 className="text-white font-bold text-sm mb-1.5">Try {tool.name}</h3>
                                    <p className="text-blue-100/80 text-xs mb-4 leading-relaxed">{tool.heroText.slice(0, 80)}...</p>
                                    <Link
                                        href={`/tools/${tool.slug}`}
                                        className="inline-block bg-white text-[#0A66C2] px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors no-underline shadow-sm"
                                    >
                                        Use Free Tool
                                    </Link>
                                </div>
                            )}

                            {/* Related posts */}
                            {related.length > 0 && (
                                <div className="bg-white border border-gray-200 rounded-xl p-5">
                                    <h3 className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Related Articles</h3>
                                    <div className="space-y-3">
                                        {related.map(r => (
                                            <Link
                                                key={r.slug}
                                                href={`/blogs/${r.slug}`}
                                                className="block text-sm font-medium text-[#0A0F1C] hover:text-[#0A66C2] transition-colors leading-snug no-underline"
                                            >
                                                {r.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* All posts in cluster */}
                            {allToolBlogs.length > related.length && (
                                <div className="bg-white border border-gray-200 rounded-xl p-5">
                                    <h3 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-4">All {tool?.name} Articles</h3>
                                    <div className="space-y-2.5">
                                        {allToolBlogs.map(b => (
                                            <Link
                                                key={b.slug}
                                                href={`/blogs/${b.slug}`}
                                                className={`block text-xs transition-colors leading-snug no-underline ${b.slug === blog.slug ? 'text-[#0A66C2] font-bold' : 'text-[#6B7280] hover:text-[#0A66C2]'}`}
                                            >
                                                {b.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Full analysis CTA */}
                            <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5 text-center">
                                <p className="text-xs font-medium text-[#4B5563] mb-3">Check your LinkedIn profile</p>
                                <Link href="/" className="inline-block text-xs font-bold text-white bg-gradient-to-r from-[#0A66C2] to-[#084E96] px-5 py-2.5 rounded-lg hover:shadow-[0_4px_12px_rgba(10,102,194,0.3)] transition-all no-underline">
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
