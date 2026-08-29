import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllBlogSlugs, getBlogBySlug, getRelatedBlogs, getBlogsByToolSlug } from '@/lib/blogData'
import { getToolBySlug, SITE_URL, SITE_NAME } from '@/lib/toolsConfig'
import { breadcrumbJsonLd, articleJsonLd, faqJsonLd } from '@/lib/jsonLd'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ArrowRightIcon, ChevronDownIcon, ClockIcon, SparklesIcon, ShieldCheckIcon } from '@/components/ui/Icons'

export function generateStaticParams() {
    return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const blog = getBlogBySlug(slug)
    if (!blog) return { title: 'Article Not Found' }

    const canonical = `${SITE_URL}/blogs/${blog.slug}`

    return {
        title: blog.title,
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

    const faqsToUse = blog.faqs && blog.faqs.length > 0 ? blog.faqs : tool?.faqs || []
    const faqSchema = faqsToUse.length > 0 ? faqJsonLd(faqsToUse.slice(0, 5)) : null

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <SiteHeader />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
            {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

            <main id="main-content" className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
                {/* ── Breadcrumb ────────────────────────────────── */}
                <nav aria-label="Breadcrumb" className="text-[13px] text-[#64748B] flex items-center gap-1.5 flex-wrap">
                    <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                    <span>/</span>
                    <Link href="/blogs" className="hover:text-[#0A66C2] transition-colors no-underline">Articles</Link>
                    <span>/</span>
                    <span className="text-[#0F172A] font-medium truncate max-w-md">{blog.title}</span>
                </nav>

                {/* ── Article Header ───────────────────────────── */}
                <header className="max-w-3xl space-y-3 pb-6 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-3 flex-wrap">
                        {tool && (
                            <Link
                                href={`/tools/${tool.slug}`}
                                className="inline-block text-[12px] font-semibold text-[#0A66C2] bg-[#F0F7FF] border border-[#BAE0FD] px-2.5 py-0.5 rounded-md hover:bg-[#E0F2FE] transition-colors no-underline"
                            >
                                {tool.name}
                            </Link>
                        )}
                        <span className="text-[12px] text-[#64748B] flex items-center gap-1">
                            <ClockIcon size={13} />
                            {readingTime} min read
                        </span>
                    </div>

                    <h1 className="text-[26px] sm:text-[34px] lg:text-[38px] font-bold text-[#0F172A] tracking-tight leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-3 text-[13px] text-[#64748B] pt-1">
                        <time dateTime={blog.datePublished}>
                            {new Date(blog.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                        <span>•</span>
                        <span>Updated {new Date(blog.dateModified).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#16A34A] font-medium">
                            <ShieldCheckIcon size={14} /> Verified Strategy
                        </span>
                    </div>
                </header>

                {/* ── Two-Column Layout: Article Body + Sidebar ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left/Main Column: Editorial Content */}
                    <article className="lg:col-span-8 space-y-8">
                        {/* Table of Contents */}
                        {blog.h2Outline.length > 2 && (
                            <nav
                                className="p-5 sm:p-6 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-3"
                                aria-label="Table of contents"
                            >
                                <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                                    Table of Contents
                                </p>
                                <ol className="space-y-2">
                                    {blog.h2Outline.map((h2, i) => (
                                        <li key={i} className="flex items-start gap-2 text-[14px]">
                                            <span className="text-[12px] font-bold text-[#94A3B8] tabular-nums mt-0.5 shrink-0">
                                                {String(i + 1).padStart(2, '0')}.
                                            </span>
                                            <a
                                                href={`#section-${i}`}
                                                className="text-[#0F172A] hover:text-[#0A66C2] transition-colors no-underline font-medium"
                                            >
                                                {h2}
                                            </a>
                                        </li>
                                    ))}
                                    <li className="flex items-start gap-2 text-[14px]">
                                        <span className="text-[12px] font-bold text-[#94A3B8] tabular-nums mt-0.5 shrink-0">
                                            {String(blog.h2Outline.length + 1).padStart(2, '0')}.
                                        </span>
                                        <a
                                            href="#conclusion"
                                            className="text-[#0F172A] hover:text-[#0A66C2] transition-colors no-underline font-medium"
                                        >
                                            Conclusion
                                        </a>
                                    </li>
                                </ol>
                            </nav>
                        )}

                        {/* Article Lead & Summary Callout */}
                        <div className="p-5 rounded-xl bg-[#F0F7FF] border border-[#BAE0FD] space-y-2">
                            <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-wider flex items-center gap-1">
                                <SparklesIcon size={13} /> Executive Takeaway
                            </p>
                            <p className="text-[14px] sm:text-[15px] text-[#0F172A] font-medium leading-relaxed">
                                {blog.summary}
                            </p>
                        </div>

                        {/* H2 Editorial Sections */}
                        <div className="space-y-10 text-[15px] sm:text-[16px] text-[#334155] leading-relaxed">
                            {blog.h2Outline.map((h2, i) => (
                                <section key={i} id={`section-${i}`} className="scroll-mt-24 space-y-4">
                                    <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0F172A] tracking-tight">
                                        {h2}
                                    </h2>

                                    {blog.sections?.[i] ? (
                                        <div
                                            className="space-y-4 leading-relaxed [&_a]:text-[#0A66C2] [&_a]:font-semibold [&_a]:hover:underline"
                                            dangerouslySetInnerHTML={{ __html: blog.sections[i] }}
                                        />
                                    ) : (
                                        <p>{blog.summary}</p>
                                    )}

                                    {/* Inline contextual tool recommendation at section 0 */}
                                    {i === 0 && tool && (
                                        <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-between gap-4 mt-4">
                                            <div>
                                                <h4 className="text-[13px] font-bold text-[#0F172A]">
                                                    Generate your {tool.name} with AI
                                                </h4>
                                                <p className="text-[12px] text-[#64748B]">
                                                    Use our free generator to apply these techniques directly.
                                                </p>
                                            </div>
                                            <Button
                                                href={`/tools/${tool.slug}`}
                                                variant="secondary"
                                                size="sm"
                                            >
                                                Open Tool
                                            </Button>
                                        </div>
                                    )}
                                </section>
                            ))}

                            {/* Conclusion Section */}
                            <section id="conclusion" className="scroll-mt-24 space-y-3 pt-4 border-t border-[#E2E8F0]">
                                <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0F172A] tracking-tight">
                                    Conclusion &amp; Next Steps
                                </h2>
                                <p className="leading-relaxed">
                                    Optimizing your {blog.targetKeyword} directly influences how recruiter search algorithms rank your profile. Use structured data, clear keywords, and tangible proof of competence.
                                </p>
                            </section>
                        </div>

                        {/* Frequently Asked Questions */}
                        {faqsToUse.length > 0 && (
                            <section className="space-y-4 pt-6 border-t border-[#E2E8F0]">
                                <h2 className="text-[20px] font-bold text-[#0F172A] tracking-tight">
                                    Frequently Asked Questions
                                </h2>
                                <div className="bg-white border border-[#E2E8F0] rounded-xl divide-y divide-[#F1F5F9] shadow-xs">
                                    {faqsToUse.slice(0, 5).map((faq, i) => (
                                        <details key={i} className="group p-5" open={i === 0}>
                                            <summary className="cursor-pointer text-[15px] font-semibold text-[#0F172A] list-none flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] rounded-md">
                                                <span>{faq.question}</span>
                                                <ChevronDownIcon
                                                    size={16}
                                                    className="text-[#64748B] shrink-0 transition-transform group-open:rotate-180"
                                                />
                                            </summary>
                                            <div className="pt-3 text-[13px] text-[#475569] leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}
                    </article>

                    {/* Right Column: Contextual Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* 1. Contextual Tool Card */}
                        {tool && (
                            <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
                                <span className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-wider">
                                    Recommended Free Tool
                                </span>
                                <h3 className="text-[16px] font-bold text-[#0F172A]">
                                    {tool.name}
                                </h3>
                                <p className="text-[13px] text-[#475569] leading-relaxed">
                                    {tool.heroText.slice(0, 100)}...
                                </p>
                                <Button
                                    href={`/tools/${tool.slug}`}
                                    variant="primary"
                                    size="sm"
                                    fullWidth
                                    rightIcon={<ArrowRightIcon size={14} />}
                                >
                                    Try {tool.name}
                                </Button>
                            </div>
                        )}

                        {/* 2. Full Profile Score CTA (Solid Navy Card) */}
                        <div className="p-5 rounded-xl bg-[#0F172A] text-white border border-[#1E293B] shadow-sm space-y-3">
                            <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider">
                                Free LinkedIn Audit
                            </span>
                            <h3 className="text-[16px] font-semibold text-white tracking-tight">
                                Score Your Entire Profile
                            </h3>
                            <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                                Get your personalized score out of 100 and prioritized section improvements.
                            </p>
                            <Button
                                href="/#upload"
                                variant="primary"
                                size="sm"
                                fullWidth
                                rightIcon={<ArrowRightIcon size={14} />}
                            >
                                Analyze Profile
                            </Button>
                        </div>

                        {/* 3. Related Articles in Cluster */}
                        {related.length > 0 && (
                            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs space-y-3">
                                <h4 className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wider">
                                    Related Guides
                                </h4>
                                <div className="space-y-2.5">
                                    {related.map((r) => (
                                        <Link
                                            key={r.slug}
                                            href={`/blogs/${r.slug}`}
                                            className="block text-[13px] text-[#475569] hover:text-[#0A66C2] transition-colors no-underline font-medium leading-snug"
                                        >
                                            {r.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}
