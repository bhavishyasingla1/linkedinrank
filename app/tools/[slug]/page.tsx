import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ALL_TOOLS, SITE_URL, SITE_NAME, getToolBySlug, getAllToolSlugs } from '@/lib/toolsConfig'
import { getBlogsByToolSlug } from '@/lib/blogData'
import { breadcrumbJsonLd, faqJsonLd, softwareApplicationJsonLd, howToToolJsonLd } from '@/lib/jsonLd'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import ToolPageClient from '@/components/tools/ToolPageClient'
import { ArrowRightIcon, ChevronDownIcon, SparklesIcon, ToolIcon } from '@/components/ui/Icons'

export function generateStaticParams() {
    return getAllToolSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const tool = getToolBySlug(slug)
    if (!tool) return { title: 'Tool Not Found' }

    const canonical = `${SITE_URL}/tools/${tool.slug}`

    return {
        title: tool.seoTitle,
        description: tool.metaDescription,
        keywords: [tool.primaryKeyword, ...tool.secondaryKeywords],
        alternates: { canonical },
        openGraph: {
            title: tool.seoTitle,
            description: tool.metaDescription,
            url: canonical,
            siteName: SITE_NAME,
            type: 'website',
            locale: 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title: tool.seoTitle,
            description: tool.metaDescription,
        },
    }
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const tool = getToolBySlug(slug)
    if (!tool) notFound()

    const canonical = `${SITE_URL}/tools/${tool.slug}`
    const relatedTools = ALL_TOOLS.filter((t) => tool.relatedTools.includes(t.slug))
    const relatedBlogs = getBlogsByToolSlug(tool.slug).slice(0, 4)

    const breadcrumbs = breadcrumbJsonLd([
        { name: 'Home', url: SITE_URL },
        { name: 'Tools', url: `${SITE_URL}/tools` },
        { name: tool.name, url: canonical },
    ])
    const faqSchema = faqJsonLd(tool.faqs)
    const appSchema = softwareApplicationJsonLd(tool)
    const howTo = howToToolJsonLd(tool)

    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <SiteHeader />

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />

            <main id="main-content" className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12 sm:space-y-16">
                {/* ── Breadcrumbs & Page Header ─────────────────── */}
                <div className="space-y-4 pb-6 border-b border-[#dedcff]">
                    <nav aria-label="Breadcrumb" className="text-[13px] text-[#050315]/60 flex items-center gap-2 flex-wrap">
                        <Link href="/" className="hover:text-[#2f27ce] transition-colors no-underline">Home</Link>
                        <span>/</span>
                        <Link href="/tools" className="hover:text-[#2f27ce] transition-colors no-underline">Tools</Link>
                        <span>/</span>
                        <span className="text-[#050315] font-semibold">{tool.name}</span>
                    </nav>

                    <div className="max-w-3xl space-y-3.5">
                        <div className="flex items-start gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 mt-0.5 shadow-xs font-bold">
                                <ToolIcon id={tool.id} size={24} />
                            </div>
                            <div className="space-y-1">
                                {tool.tag && (
                                    <span className="inline-flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider bg-[#dedcff] text-[#2f27ce] px-3 py-1 rounded-full mb-1 leading-none shadow-2xs">
                                        <SparklesIcon size={12} /> {tool.tag}
                                    </span>
                                )}
                                <h1 className="text-[26px] sm:text-[36px] font-extrabold text-[#050315] tracking-tight leading-tight">
                                    {tool.h1}
                                </h1>
                            </div>
                        </div>
                        <p className="text-[15.5px] sm:text-[17px] text-[#050315]/75 leading-relaxed pl-0 sm:pl-16">
                            {tool.heroText}
                        </p>
                    </div>
                </div>

                {/* ── Two-Column Layout: Tool Interface + Sidebar ─ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Left Column: The Real Tool Interface (Hero) */}
                    <div className="lg:col-span-8 space-y-12 sm:space-y-14">
                        {/* Tool Interactive App Container */}
                        <div className="bg-white border-2 border-[#dedcff] rounded-3xl p-5 sm:p-9 aside-card-shadow">
                            <ToolPageClient toolId={tool.id} />
                        </div>

                        {/* Features / How It Works */}
                        {tool.features && tool.features.length > 0 && (
                            <section className="space-y-6 pt-4">
                                <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#050315] tracking-tight border-b border-[#dedcff] pb-3">
                                    How {tool.name} Works
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    {tool.features.map((f, i) => (
                                        <div key={i} className="p-6 rounded-3xl bg-white border border-[#dedcff] aside-card-shadow space-y-2">
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-6 h-6 rounded-xl bg-[#dedcff] text-[#2f27ce] text-[12px] font-extrabold flex items-center justify-center shrink-0">
                                                    {i + 1}
                                                </span>
                                                <h3 className="font-bold text-[15px] text-[#050315]">
                                                    {f.title}
                                                </h3>
                                            </div>
                                            <p className="text-[13.5px] text-[#050315]/70 leading-relaxed pl-8">
                                                {f.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Frequently Asked Questions */}
                        {tool.faqs && tool.faqs.length > 0 && (
                            <section className="space-y-6 pt-4">
                                <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#050315] tracking-tight border-b border-[#dedcff] pb-3">
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-3">
                                    {tool.faqs.map((faq, i) => (
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
                    </div>

                    {/* Right Column: Contextual Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* 1. Complete Profile Audit CTA */}
                        <div className="bg-gradient-to-br from-[#dedcff]/50 via-white to-[#dedcff]/30 text-[#050315] p-6 sm:p-7 rounded-3xl border-2 border-[#dedcff] shadow-md shadow-[#2f27ce]/5 space-y-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-2.5 py-0.5 rounded-full">
                                <SparklesIcon size={12} /> Complete Audit
                            </span>
                            <h3 className="text-[18px] font-extrabold text-[#050315] tracking-tight">
                                Audit Your Entire Profile
                            </h3>
                            <p className="text-[13.5px] text-[#050315]/75 leading-relaxed">
                                Score your profile across 30+ signals and get prioritized recommendations in under 60 seconds.
                            </p>
                            <Link
                                href="/#upload"
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[13.5px] font-bold shadow-md shadow-[#2f27ce]/20 transition-all no-underline cursor-pointer active:scale-95"
                            >
                                <span>Analyze Profile Free</span>
                                <ArrowRightIcon size={14} />
                            </Link>
                        </div>

                        {/* 2. Related Tools */}
                        {relatedTools.length > 0 && (
                            <div className="bg-white border border-[#dedcff] rounded-3xl p-6 aside-card-shadow space-y-3.5">
                                <h4 className="text-[12.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                    Related Tools
                                </h4>
                                <div className="space-y-2">
                                    {relatedTools.map((rt) => (
                                        <Link
                                            key={rt.slug}
                                            href={`/tools/${rt.slug}`}
                                            className="p-3 rounded-2xl bg-[#dedcff]/30 border border-[#dedcff] hover:border-[#2f27ce] hover:bg-[#dedcff]/60 flex items-center justify-between text-[13px] font-bold text-[#050315] hover:text-[#2f27ce] transition-colors no-underline group"
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <div className="w-7 h-7 rounded-xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 group-hover:bg-[#2f27ce] group-hover:text-white transition-colors shadow-2xs">
                                                    <ToolIcon id={rt.id} size={14} />
                                                </div>
                                                <span className="truncate">{rt.name}</span>
                                            </div>
                                            <span className="text-[#2f27ce] group-hover:translate-x-0.5 transition-transform shrink-0 ml-2 font-bold">
                                                →
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 3. Related Articles */}
                        {relatedBlogs.length > 0 && (
                            <div className="bg-white border border-[#dedcff] rounded-3xl p-6 aside-card-shadow space-y-3.5">
                                <h4 className="text-[12.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                    Relevant Guides
                                </h4>
                                <div className="space-y-3">
                                    {relatedBlogs.map((blog) => (
                                        <Link
                                            key={blog.slug}
                                            href={`/blogs/${blog.slug}`}
                                            className="block text-[13px] text-[#050315]/75 hover:text-[#2f27ce] transition-colors no-underline space-y-1 group"
                                        >
                                            <p className="font-bold text-[#050315] group-hover:text-[#2f27ce] leading-snug">
                                                {blog.title}
                                            </p>
                                            <span className="text-[11.5px] text-[#2f27ce] font-extrabold inline-flex items-center gap-0.5">
                                                Read guide &rarr;
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
