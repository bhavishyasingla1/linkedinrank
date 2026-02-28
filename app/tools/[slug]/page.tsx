import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ALL_TOOLS, SITE_URL, SITE_NAME, getToolBySlug, getAllToolSlugs } from '@/lib/toolsConfig'
import { getBlogsByToolSlug } from '@/lib/blogData'
import { breadcrumbJsonLd, faqJsonLd, softwareApplicationJsonLd, howToToolJsonLd } from '@/lib/jsonLd'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ToolPageClient from '@/components/tools/ToolPageClient'

// ── SSG: prerender all tool pages ──────────────────────────
export function generateStaticParams() {
    return getAllToolSlugs().map(slug => ({ slug }))
}

// ── Metadata per tool ──────────────────────────────────────
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

// ── Page ───────────────────────────────────────────────────
export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const tool = getToolBySlug(slug)
    if (!tool) notFound()

    const canonical = `${SITE_URL}/tools/${tool.slug}`
    const relatedTools = ALL_TOOLS.filter(t => tool.relatedTools.includes(t.slug))
    const relatedBlogs = getBlogsByToolSlug(tool.slug).slice(0, 6)

    const breadcrumbs = breadcrumbJsonLd([
        { name: 'Home', url: SITE_URL },
        { name: 'Tools', url: `${SITE_URL}/tools` },
        { name: tool.name, url: canonical },
    ])
    const faqSchema = faqJsonLd(tool.faqs)
    const appSchema = softwareApplicationJsonLd(tool)
    const howTo = howToToolJsonLd(tool)

    return (
        <main id="main-content" className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <SiteHeader />

            {/* JSON-LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />

            <div className="flex-1 w-full">
                {/* Breadcrumbs */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
                    <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5 flex-wrap">
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/tools" className="hover:text-[#0A66C2] transition-colors">Tools</Link>
                        <span>/</span>
                        <span className="text-[#0A0F1C] font-medium">{tool.name}</span>
                    </nav>
                </div>

                {/* Hero */}
                <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-8">
                    <div className="max-w-3xl">
                        {tool.tag && (
                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0A66C2] mb-3">
                                {tool.tag}
                            </span>
                        )}
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-3 leading-tight">{tool.h1}</h1>
                        <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">{tool.heroText}</p>
                    </div>
                </section>

                {/* Two-column layout: Tool UI + Sidebar */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left: Tool UI */}
                        <div className="flex-1 min-w-0">
                            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                                <ToolPageClient toolId={tool.id} />
                            </div>

                            {/* Features / How It Works */}
                            <section className="mt-10">
                                <h2 className="text-xl font-bold text-[#0A0F1C] mb-5">How {tool.name} Works</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {tool.features.map((f, i) => (
                                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0A66C2] flex items-center justify-center shrink-0 text-xs font-bold">{i + 1}</div>
                                                <div>
                                                    <h3 className="font-semibold text-[#0A0F1C] text-sm">{f.title}</h3>
                                                    <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">{f.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* FAQ Section */}
                            <section className="mt-10">
                                <h2 className="text-xl font-bold text-[#0A0F1C] mb-5">Frequently Asked Questions</h2>
                                <div className="space-y-4">
                                    {tool.faqs.map((faq, i) => (
                                        <details key={i} className="bg-white border border-gray-200 rounded-xl group" open={i === 0}>
                                            <summary className="px-5 py-4 cursor-pointer text-sm font-semibold text-[#0A0F1C] list-none flex items-center justify-between gap-3">
                                                {faq.question}
                                                <svg className="w-4 h-4 text-[#6B7280] shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </summary>
                                            <div className="px-5 pb-4 text-sm text-[#4B5563] leading-relaxed">{faq.answer}</div>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Sidebar — ordered per SOP: CTA → Related Tools → Tips → Articles → Social */}
                        <aside className="lg:w-72 shrink-0 space-y-6">
                            {/* 1. Want Even Better Results? CTA (FIRST) */}
                            <div className="bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-xl p-5 text-center">
                                <h3 className="text-white font-semibold text-sm mb-2">Want Even Better Results?</h3>
                                <p className="text-blue-100 text-xs mb-3">Get your full LinkedIn profile score with AI-powered recommendations for every section</p>
                                <Link
                                    href="/"
                                    className="inline-block bg-white text-[#0A66C2] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-50 transition-colors"
                                >
                                    Analyze My Profile — Free
                                </Link>
                            </div>

                            {/* 2. WhatsApp Community (Testing Phase) */}
                            <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">💬</span>
                                    <h3 className="text-green-900 font-bold text-sm">Join Our Community</h3>
                                </div>
                                <p className="text-green-800 text-xs mb-3 leading-relaxed">This site is in testing phases. Join our WhatsApp group to contribute ideas and share your reviews!</p>
                                <a
                                    href="https://chat.whatsapp.com/LmkxIQwlO4dFqhmFfyxOMB?mode=hqctcla"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors w-full justify-center"
                                >
                                    <span className="text-base">📱</span>
                                    Join WhatsApp Group
                                </a>
                            </div>

                            {/* 3. Related Tools */}
                            {relatedTools.length > 0 && (
                                <div className="bg-white border border-gray-200 rounded-xl p-4">
                                    <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Tools</h3>
                                    <div className="space-y-2.5">
                                        {relatedTools.map(rt => (
                                            <Link
                                                key={rt.slug}
                                                href={`/tools/${rt.slug}`}
                                                className="block text-sm font-medium text-[#0A66C2] hover:text-[#084E96] transition-colors"
                                            >
                                                {rt.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 4. Quick Tips */}
                            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-4">
                                <h3 className="text-xs font-bold text-[#0A66C2] uppercase tracking-wider mb-3">Quick Tips</h3>
                                <ul className="space-y-2 text-xs text-[#4B5563] leading-relaxed">
                                    <li className="flex gap-2"><span className="text-[#0A66C2]">1.</span> Upload your LinkedIn PDF for personalized results</li>
                                    <li className="flex gap-2"><span className="text-[#0A66C2]">2.</span> Try multiple generations for variety</li>
                                    <li className="flex gap-2"><span className="text-[#0A66C2]">3.</span> Always personalize AI output with your voice</li>
                                    <li className="flex gap-2"><span className="text-[#0A66C2]">4.</span> Use the copy button for instant clipboard access</li>
                                </ul>
                            </div>

                            {/* 5. Related Blog Articles */}
                            {relatedBlogs.length > 0 && (
                                <div className="bg-white border border-gray-200 rounded-xl p-4">
                                    <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Articles</h3>
                                    <div className="space-y-2.5">
                                        {relatedBlogs.map(blog => (
                                            <Link
                                                key={blog.slug}
                                                href={`/blogs/${blog.slug}`}
                                                className="block text-sm font-medium text-[#0A66C2] hover:text-[#084E96] transition-colors leading-snug"
                                            >
                                                {blog.title}
                                            </Link>
                                        ))}
                                    </div>
                                    <Link
                                        href="/blogs"
                                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6B7280] hover:text-[#0A66C2] mt-3 transition-colors"
                                    >
                                        View all articles
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                    </Link>
                                </div>
                            )}

                            {/* 6. Follow LinkedInRank */}
                            <div className="bg-white border border-gray-200 rounded-xl p-4">
                                <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Follow LinkedInRank</h3>
                                <div className="flex flex-col gap-2">
                                    <a href="https://www.linkedin.com/company/linkedin-rank/" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#0A66C2] hover:underline">
                                        LinkedIn
                                    </a>
                                    <a href="https://www.instagram.com/linkedinrank/" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#E4405F] hover:underline">
                                        Instagram
                                    </a>
                                </div>
                            </div>

                        </aside>
                    </div>
                </div>

                {/* SEO Content | guide links + internal linking */}
                <section className="bg-white border-t border-gray-200 py-10">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <div className="max-w-3xl mb-8">
                            <h2 className="text-lg font-bold text-[#0A0F1C] mb-3">Why Use {tool.name}?</h2>
                            <p className="text-sm text-[#4B5563] leading-relaxed mb-3">
                                {tool.name} is part of the <Link href="/tools" className="text-[#0A66C2] hover:underline font-medium">LinkedInRank free tools suite</Link> | 12 AI-powered tools designed to help you optimize your LinkedIn profile and content strategy. Whether you&apos;re a job seeker, recruiter, founder, or student, these tools adapt to your goals.
                            </p>
                            <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                                For a comprehensive approach, combine this tool with your <Link href="/" className="text-[#0A66C2] hover:underline font-medium">LinkedInRank score</Link> to identify which sections need the most improvement. Read our <Link href="/linkedin-optimization-guide" className="text-[#0A66C2] hover:underline font-medium">complete optimization guide</Link> for step-by-step strategies, or check <Link href="/what-is-linkedin-rank" className="text-[#0A66C2] hover:underline font-medium">what LinkedIn rank means</Link> and how it differs from <Link href="/linkedin-rank-vs-ssi" className="text-[#0A66C2] hover:underline font-medium">LinkedIn&apos;s Social Selling Index</Link>.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-3 mb-8">
                            {[
                                { href: '/linkedin-optimization-guide', label: 'Full Optimization Guide', desc: 'Optimize every LinkedIn section' },
                                { href: '/linkedin-headline-guide', label: 'Headline Guide', desc: 'Craft headlines that get clicks' },
                                { href: '/linkedin-about-guide', label: 'About Section Guide', desc: 'Write a compelling About' },
                                { href: '/recruiter-psychology', label: 'Recruiter Psychology', desc: 'What recruiters look for' },
                                { href: '/linkedin-keywords-guide', label: 'Keywords Guide', desc: 'Get found in LinkedIn search' },
                                { href: '/blogs', label: 'All Blog Posts', desc: '120+ LinkedIn tips & strategies' },
                            ].map(g => (
                                <Link key={g.href} href={g.href} className="flex items-start gap-3 p-3 bg-[#F8FAFC] border border-gray-100 rounded-lg hover:border-[#0A66C2] hover:bg-white transition-all group">
                                    <svg className="w-4 h-4 text-[#0A66C2] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                                    <div>
                                        <p className="text-xs font-semibold text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors">{g.label}</p>
                                        <p className="text-[10px] text-[#6B7280] mt-0.5">{g.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Cross-tool internal linking */}
                <section className="bg-[#F8FAFC] border-t border-gray-200 py-10">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-5">Explore All Free LinkedIn Tools</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {ALL_TOOLS.filter(t => t.id !== tool.id).map(t => (
                                <Link
                                    key={t.slug}
                                    href={`/tools/${t.slug}`}
                                    className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-200 rounded-lg p-3 hover:border-[#0A66C2] hover:shadow-sm transition-all group"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors truncate">{t.name}</p>
                                        <p className="text-[10px] text-[#6B7280] mt-0.5 truncate">{t.primaryKeyword}</p>
                                    </div>
                                    <svg className="w-4 h-4 text-[#D1D5DB] group-hover:text-[#0A66C2] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
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
