import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ALL_TOOLS, SITE_URL, SITE_NAME, getToolBySlug, getAllToolSlugs } from '@/lib/toolsConfig'
import { getBlogsByToolSlug } from '@/lib/blogData'
import { breadcrumbJsonLd, faqJsonLd, softwareApplicationJsonLd, howToToolJsonLd } from '@/lib/jsonLd'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import ToolPageClient from '@/components/tools/ToolPageClient'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ArrowRightIcon, ChevronDownIcon, CheckCircleIcon, SparklesIcon } from '@/components/ui/Icons'

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
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <SiteHeader />

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />

            <main id="main-content" className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
                {/* ── Breadcrumbs ───────────────────────────────── */}
                <nav aria-label="Breadcrumb" className="text-[13px] text-[#64748B] flex items-center gap-1.5 flex-wrap">
                    <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                    <span>/</span>
                    <Link href="/tools" className="hover:text-[#0A66C2] transition-colors no-underline">Tools</Link>
                    <span>/</span>
                    <span className="text-[#0F172A] font-medium">{tool.name}</span>
                </nav>

                {/* ── Page Header (Clean & Direct) ─────────────── */}
                <div className="max-w-3xl space-y-2">
                    {tool.tag && (
                        <Badge variant="brand" size="sm">
                            {tool.tag}
                        </Badge>
                    )}
                    <h1 className="text-[26px] sm:text-[34px] font-bold text-[#0F172A] tracking-tight leading-tight">
                        {tool.h1}
                    </h1>
                    <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed">
                        {tool.heroText}
                    </p>
                </div>

                {/* ── Two-Column Layout: Tool Interface (Hero) + Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: The Real Tool Interface (Hero) */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Tool Interactive App Container */}
                        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-7 shadow-xs">
                            <ToolPageClient toolId={tool.id} />
                        </div>

                        {/* Features / How It Works */}
                        {tool.features && tool.features.length > 0 && (
                            <section className="space-y-4">
                                <h2 className="text-[20px] font-bold text-[#0F172A] tracking-tight">
                                    How {tool.name} Works
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {tool.features.map((f, i) => (
                                        <div key={i} className="p-5 rounded-xl bg-white border border-[#E2E8F0] space-y-1.5 shadow-xs">
                                            <div className="flex items-center gap-2">
                                                <span className="w-5 h-5 rounded-md bg-[#F0F7FF] text-[#0A66C2] text-[11px] font-bold flex items-center justify-center">
                                                    {i + 1}
                                                </span>
                                                <h3 className="font-semibold text-[14px] text-[#0F172A]">
                                                    {f.title}
                                                </h3>
                                            </div>
                                            <p className="text-[13px] text-[#475569] leading-relaxed pl-7">
                                                {f.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Frequently Asked Questions */}
                        {tool.faqs && tool.faqs.length > 0 && (
                            <section className="space-y-4">
                                <h2 className="text-[20px] font-bold text-[#0F172A] tracking-tight">
                                    Frequently Asked Questions
                                </h2>
                                <div className="bg-white border border-[#E2E8F0] rounded-xl divide-y divide-[#F1F5F9] shadow-xs">
                                    {tool.faqs.map((faq, i) => (
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
                    </div>

                    {/* Right Column: Contextual Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* 1. Complete Profile Audit CTA (Solid Navy Card) */}
                        <div className="bg-[#0F172A] text-white p-5 rounded-xl border border-[#1E293B] shadow-sm space-y-3">
                            <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider">
                                Free Profile Audit
                            </span>
                            <h3 className="text-[16px] font-semibold text-white tracking-tight">
                                Audit Your Entire Profile
                            </h3>
                            <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                                Score your profile across 30+ signals and get prioritized recommendations in under 60 seconds.
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

                        {/* 2. Related Tools */}
                        {relatedTools.length > 0 && (
                            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs space-y-3">
                                <h4 className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wider">
                                    Related Tools
                                </h4>
                                <div className="space-y-2">
                                    {relatedTools.map((rt) => (
                                        <Link
                                            key={rt.slug}
                                            href={`/tools/${rt.slug}`}
                                            className="p-3 rounded-lg bg-[#FAFAFA] border border-[#E2E8F0] hover:border-[#0A66C2] flex items-center justify-between text-[13px] font-medium text-[#334155] hover:text-[#0A66C2] transition-colors no-underline group"
                                        >
                                            <span>{rt.name}</span>
                                            <span className="text-[#94A3B8] group-hover:text-[#0A66C2] group-hover:translate-x-0.5 transition-transform">
                                                →
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 3. Related Articles */}
                        {relatedBlogs.length > 0 && (
                            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs space-y-3">
                                <h4 className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wider">
                                    Relevant Guides
                                </h4>
                                <div className="space-y-2.5">
                                    {relatedBlogs.map((blog) => (
                                        <Link
                                            key={blog.slug}
                                            href={`/blogs/${blog.slug}`}
                                            className="block text-[13px] text-[#475569] hover:text-[#0A66C2] transition-colors no-underline space-y-0.5"
                                        >
                                            <p className="font-medium text-[#0F172A] hover:text-[#0A66C2] leading-snug">
                                                {blog.title}
                                            </p>
                                            <span className="text-[11px] text-[#0A66C2] font-semibold">
                                                Read guide →
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
