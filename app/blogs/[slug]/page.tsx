import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllBlogSlugs, getBlogBySlug, getRelatedBlogs, getBlogsByToolSlug } from '@/lib/blogData'
import { getToolBySlug, SITE_URL, SITE_NAME } from '@/lib/toolsConfig'
import { breadcrumbJsonLd, articleJsonLd, faqJsonLd } from '@/lib/jsonLd'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import GooglePreferredSource from '@/components/GooglePreferredSource'
import NewsletterCard from '@/components/NewsletterCard'
import { ArrowRightIcon, ChevronDownIcon, ClockIcon, SparklesIcon, ShieldCheckIcon, ToolIcon } from '@/components/ui/Icons'

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
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <SiteHeader />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
            {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

            <main id="main-content" className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10 sm:space-y-12">
                {/* ── Breadcrumb ────────────────────────────────── */}
                <nav aria-label="Breadcrumb" className="text-[13px] text-[#050315]/60 flex items-center gap-2 flex-wrap">
                    <Link href="/" className="hover:text-[#2f27ce] transition-colors no-underline">Home</Link>
                    <span>/</span>
                    <Link href="/blogs" className="hover:text-[#2f27ce] transition-colors no-underline">Articles</Link>
                    <span>/</span>
                    <span className="text-[#050315] font-semibold truncate max-w-md">{blog.title}</span>
                </nav>

                {/* ── Article Header (Aside Typography & Badges) ─── */}
                <header className="max-w-3xl space-y-4 pb-8 border-b-2 border-[#dedcff]">
                    <div className="flex items-center gap-2.5 flex-wrap">
                        {tool && (
                            <Link
                                href={`/tools/${tool.slug}`}
                                className="inline-block text-[11.5px] font-extrabold uppercase tracking-wider text-[#2f27ce] bg-[#dedcff] border border-[#dedcff] px-3.5 py-1 rounded-full hover:bg-[#2f27ce] hover:text-white transition-colors no-underline shadow-2xs"
                            >
                                {tool.name}
                            </Link>
                        )}
                        <span className="text-[12px] text-[#050315]/60 flex items-center gap-1">
                            <ClockIcon size={13} />
                            {readingTime} min read
                        </span>
                    </div>

                    <h1 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-[#050315] tracking-tight leading-[1.15]">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-3 text-[13px] text-[#050315]/60 pt-1 flex-wrap">
                        <Link href="/about" className="font-semibold text-[#050315] hover:text-[#2f27ce] transition-colors no-underline">
                            By Bhavishya Singla
                        </Link>
                        <span>•</span>
                        <time dateTime={blog.datePublished} className="font-medium">
                            {new Date(blog.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                        <span>•</span>
                        <span>Updated {new Date(blog.dateModified).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#2f27ce] font-bold">
                            <ShieldCheckIcon size={14} /> Verified 2026 Strategy
                        </span>
                    </div>
                </header>

                {/* ── Two-Column Layout: Article Body + Sidebar ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                    {/* Left/Main Column: Editorial Content */}
                    <article className="lg:col-span-8 space-y-10">
                        {/* Table of Contents */}
                        {blog.h2Outline.length > 2 && (
                            <nav
                                className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-[#dedcff] aside-card-shadow space-y-3.5"
                                aria-label="Table of contents"
                            >
                                <p className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider flex items-center gap-1.5">
                                    <SparklesIcon size={13} /> Table of Contents
                                </p>
                                <ol className="space-y-2.5">
                                    {blog.h2Outline.map((h2, i) => (
                                        <li key={i} className="flex items-start gap-2 text-[14px]">
                                            <span className="text-[12px] font-extrabold text-[#2f27ce] bg-[#dedcff] px-2 py-0.5 rounded-full tabular-nums mt-0.5 shrink-0">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <a
                                                href={`#section-${i}`}
                                                className="text-[#050315] hover:text-[#2f27ce] transition-colors no-underline font-semibold leading-snug"
                                            >
                                                {h2}
                                            </a>
                                        </li>
                                    ))}
                                    <li className="flex items-start gap-2 text-[14px]">
                                        <span className="text-[12px] font-extrabold text-[#2f27ce] bg-[#dedcff] px-2 py-0.5 rounded-full tabular-nums mt-0.5 shrink-0">
                                            {String(blog.h2Outline.length + 1).padStart(2, '0')}
                                        </span>
                                        <a
                                            href="#conclusion"
                                            className="text-[#050315] hover:text-[#2f27ce] transition-colors no-underline font-semibold leading-snug"
                                        >
                                            Conclusion &amp; Action Plan
                                        </a>
                                    </li>
                                </ol>
                            </nav>
                        )}

                        {/* Article Lead & Executive Summary Callout */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-[#dedcff]/35 border-2 border-[#dedcff] space-y-2.5">
                            <p className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider flex items-center gap-1.5">
                                <SparklesIcon size={13} /> Executive Takeaway
                            </p>
                            <p className="text-[15px] sm:text-[16px] text-[#050315] font-semibold leading-relaxed">
                                {blog.summary}
                            </p>
                        </div>

                        {/* H2 Editorial Sections */}
                        <div className="space-y-12 text-[15.5px] sm:text-[16.5px] text-[#050315]/80 leading-relaxed">
                            {blog.h2Outline.map((h2, i) => (
                                <section key={i} id={`section-${i}`} className="scroll-mt-28 space-y-4">
                                    <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#050315] tracking-tight border-b border-[#dedcff] pb-2">
                                        {h2}
                                    </h2>

                                    {blog.sections?.[i] ? (
                                        <div
                                            className="space-y-4 leading-relaxed [&_a]:text-[#2f27ce] [&_a]:font-bold [&_a]:underline hover:[&_a]:text-[#433bff] [&_strong]:text-[#050315] [&_blockquote]:border-l-4 [&_blockquote]:border-[#2f27ce] [&_blockquote]:bg-[#dedcff]/25 [&_blockquote]:p-4 [&_blockquote]:rounded-r-2xl [&_blockquote]:my-4"
                                            dangerouslySetInnerHTML={{ __html: blog.sections[i] }}
                                        />
                                    ) : (
                                        <p>{blog.summary}</p>
                                    )}

                                    {/* Inline contextual tool recommendation at section 0 */}
                                    {i === 0 && tool && (
                                        <div className="p-6 rounded-3xl bg-white border-2 border-[#dedcff] aside-card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                                            <div>
                                                <h4 className="text-[15px] font-bold text-[#050315]">
                                                    Generate your {tool.name} with AI
                                                </h4>
                                                <p className="text-[13px] text-[#050315]/65 mt-0.5">
                                                    Use our free generator to apply these techniques directly to your profile.
                                                </p>
                                            </div>
                                            <Link
                                                href={`/tools/${tool.slug}`}
                                                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#dedcff] hover:bg-[#2f27ce] text-[#2f27ce] hover:text-white text-[13px] font-bold transition-all no-underline shrink-0"
                                            >
                                                <span>Open Tool</span>
                                                <ArrowRightIcon size={13} />
                                            </Link>
                                        </div>
                                    )}
                                </section>
                            ))}

                            {/* Conclusion Section */}
                            <section id="conclusion" className="scroll-mt-28 space-y-3 pt-6 border-t-2 border-[#dedcff]">
                                <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#050315] tracking-tight">
                                    Conclusion &amp; Next Steps
                                </h2>
                                <p className="leading-relaxed">
                                    Optimizing your {blog.targetKeyword} directly influences how recruiter search algorithms rank your profile. Use structured data, clear keywords, and tangible proof of competence.
                                </p>
                            </section>
                        </div>

                        {/* Frequently Asked Questions */}
                        {faqsToUse.length > 0 && (
                            <section className="space-y-6 pt-6 border-t-2 border-[#dedcff]">
                                <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#050315] tracking-tight">
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-3">
                                    {faqsToUse.slice(0, 5).map((faq, i) => (
                                        <details key={i} className="group p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce]/60 shadow-xs" open={i === 0}>
                                            <summary className="cursor-pointer text-[15.5px] font-bold text-[#050315] list-none flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f27ce] rounded-xl">
                                                <span>{faq.question}</span>
                                                <div className="w-7 h-7 rounded-full bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform">
                                                    <ChevronDownIcon size={15} />
                                                </div>
                                            </summary>
                                            <div className="pt-3 text-[14px] text-[#050315]/75 leading-relaxed border-t border-[#dedcff]/60 mt-3">
                                                {faq.answer}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Author & Editorial Standards Box (E-E-A-T) */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-[#dedcff] aside-card-shadow flex flex-col sm:flex-row items-start sm:items-center gap-5">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#2f27ce] to-[#433bff] text-white flex items-center justify-center font-extrabold text-[18px] shrink-0 shadow-sm">
                                BS
                            </div>
                            <div className="space-y-1.5 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="text-[16px] font-extrabold text-[#050315]">
                                        Written by Bhavishya Singla
                                    </h4>
                                    <span className="text-[11px] font-bold text-[#2f27ce] bg-[#dedcff] px-2 py-0.5 rounded-full">
                                        Founder &amp; Author
                                    </span>
                                </div>
                                <p className="text-[13px] text-[#050315]/75 leading-relaxed">
                                    Creator of LinkedInRank. Specializes in ATS keyword calibration, recruiter search psychology, and data-backed profile optimization.
                                </p>
                                <div className="flex items-center gap-4 text-[12px] pt-1 flex-wrap">
                                    <Link href="/about" className="text-[#2f27ce] hover:underline font-bold no-underline">
                                        About the Author →
                                    </Link>
                                    <Link href="/methodology" className="text-[#050315]/60 hover:text-[#2f27ce] hover:underline no-underline">
                                        Methodology &amp; Scoring Criteria →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Google Preferred Source Banner */}
                        <GooglePreferredSource
                            variant="banner"
                            title="Add LinkedInRank as a Preferred Source on Google"
                            description="Never miss new LinkedIn algorithm shifts, recruiter search changes, and headline frameworks. Add LinkedInRank to your Google Search preferences."
                        />
                    </article>

                    {/* Right Column: Contextual Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* 1. Contextual Tool Card */}
                        {tool && (
                            <div className="p-6 rounded-3xl bg-white border-2 border-[#dedcff] aside-card-shadow space-y-4">
                                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-2.5 py-0.5 rounded-full">
                                    Recommended Free Tool
                                </span>
                                <h3 className="text-[17px] font-bold text-[#050315]">
                                    {tool.name}
                                </h3>
                                <p className="text-[13px] text-[#050315]/70 leading-relaxed">
                                    {tool.heroText.slice(0, 110)}...
                                </p>
                                <Link
                                    href={`/tools/${tool.slug}`}
                                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#dedcff] hover:bg-[#2f27ce] text-[#2f27ce] hover:text-white text-[13px] font-bold transition-all no-underline shadow-xs"
                                >
                                    <span>Try {tool.name}</span>
                                    <ArrowRightIcon size={13} />
                                </Link>
                            </div>
                        )}

                        {/* 2. AI This Week Newsletter Card */}
                        <NewsletterCard variant="card" />

                        {/* 3. Google Preferred Source Card */}
                        <GooglePreferredSource variant="card" />

                        {/* 3. Full Profile Score CTA (Radiant Card) */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#dedcff]/60 via-white to-[#dedcff]/40 border-2 border-[#dedcff] shadow-md shadow-[#2f27ce]/5 space-y-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-2.5 py-0.5 rounded-full">
                                Free LinkedIn Audit
                            </span>
                            <h3 className="text-[18px] font-extrabold text-[#050315] tracking-tight">
                                Score Your Entire Profile
                            </h3>
                            <p className="text-[13.5px] text-[#050315]/75 leading-relaxed">
                                Get your personalized score out of 100 and prioritized section improvements.
                            </p>
                            <Link
                                href="/#upload"
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[13.5px] font-bold shadow-md shadow-[#2f27ce]/20 transition-all no-underline cursor-pointer active:scale-95"
                            >
                                <span>Analyze Profile Free</span>
                                <ArrowRightIcon size={14} />
                            </Link>
                        </div>

                        {/* 4. Related Articles in Cluster */}
                        {related.length > 0 && (
                            <div className="bg-white border border-[#dedcff] rounded-3xl p-6 aside-card-shadow space-y-3.5">
                                <h4 className="text-[12.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                    Related Guides
                                </h4>
                                <div className="space-y-3">
                                    {related.map((r) => (
                                        <Link
                                            key={r.slug}
                                            href={`/blogs/${r.slug}`}
                                            className="block text-[13.5px] text-[#050315]/80 hover:text-[#2f27ce] transition-colors no-underline font-semibold leading-snug group"
                                        >
                                            <span className="group-hover:text-[#2f27ce] transition-colors">
                                                {r.title}
                                            </span>
                                            <span className="text-[#2f27ce] ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                &rarr;
                                            </span>
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
