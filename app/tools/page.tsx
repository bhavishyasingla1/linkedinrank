import { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { ALL_TOOLS, SITE_URL, SITE_NAME } from '@/lib/toolsConfig'
import { breadcrumbJsonLd } from '@/lib/jsonLd'

export const metadata: Metadata = {
    title: '12 Free LinkedIn Tools & Templates (2026) | LinkedInRank',
    description: '12 free AI-powered LinkedIn tools: headline generator, about section writer, keyword analyzer, post ideas, content planner, and more. No signup required.',
    alternates: { canonical: `${SITE_URL}/tools` },
    openGraph: {
        title: '12 Free LinkedIn Tools & Templates (2026) | LinkedInRank',
        description: '12 free AI-powered LinkedIn tools for profile optimization, content creation, and networking.',
        url: `${SITE_URL}/tools`,
        siteName: SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '12 Free LinkedIn Tools & Templates (2026)',
        description: '12 free AI-powered LinkedIn tools for profile optimization and content creation.',
    },
}

const CATEGORIES = [
    { key: 'profile-optimization', label: 'Profile Optimization' },
    { key: 'content-creation', label: 'Content Creation' },
    { key: 'networking', label: 'Networking & Engagement' },
    { key: 'analytics', label: 'Analytics & Optimization' },
]

const TOOL_COLORS: Record<string, string> = {
    headline: '#0A66C2', about: '#10B981', bullets: '#F59E0B', ring: '#EC4899',
    seo: '#8B5CF6', postideas: '#F97316', storytopost: '#06B6D4', hooks: '#EF4444',
    pillars: '#6366F1', comments: '#14B8A6', messages: '#0EA5E9', qrcode: '#0A0F1C',
}

export default function ToolsPage() {
    const breadcrumbs = breadcrumbJsonLd([
        { name: 'Home', url: SITE_URL },
        { name: 'Tools', url: `${SITE_URL}/tools` },
    ])

    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <SiteHeader />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <div className="flex-1 w-full">
                {/* Breadcrumbs */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
                    <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5">
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-[#0A0F1C] font-medium">Tools</span>
                    </nav>
                </div>

                {/* Hero */}
                <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-2">Free LinkedIn Tools</h1>
                    <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-2xl">
                        12 free tools to optimize your LinkedIn profile, create engaging content, and grow your professional network. Each tool uses AI to deliver personalized, recruiter-ready results.
                    </p>
                </section>

                {/* Tool grid by category */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 space-y-8">
                    {CATEGORIES.map(cat => {
                        const tools = ALL_TOOLS.filter(t => t.category === cat.key)
                        if (tools.length === 0) return null
                        return (
                            <section key={cat.key}>
                                <h2 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">{cat.label}</h2>
                                <div className="grid gap-3">
                                    {tools.map(tool => {
                                        const color = TOOL_COLORS[tool.id] || '#0A66C2'
                                        return (
                                            <Link
                                                key={tool.slug}
                                                href={`/tools/${tool.slug}`}
                                                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#0A66C2] hover:shadow-md transition-all group block"
                                            >
                                                <div className="flex items-start gap-3.5">
                                                    <div
                                                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                                                        style={{ backgroundColor: color + '12', color }}
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="font-semibold text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors text-sm">
                                                                {tool.name}
                                                            </h3>
                                                            {tool.tag && (
                                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tool.tag === 'Most Popular' ? 'bg-blue-50 text-[#0A66C2]' : 'bg-emerald-50 text-emerald-600'
                                                                    }`}>
                                                                    {tool.tag}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">{tool.heroText.slice(0, 120)}...</p>
                                                    </div>
                                                    <svg className="w-4 h-4 text-[#D1D5DB] group-hover:text-[#0A66C2] transition-colors shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </section>
                        )
                    })}

                    {/* Trust Section */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
                        <h2 className="text-base font-bold text-[#0A0F1C] mb-2">Why Trust These Tools?</h2>
                        <p className="text-sm text-[#4B5563] mb-6 leading-relaxed">
                            Every tool in this suite is built on the same <strong className="text-[#0A0F1C]">30+ signal methodology</strong> that powers LinkedInRank&apos;s profile ranking engine. Our recommendations are grounded in real LinkedIn ranking factors — not guesswork or generic templates.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                            {[
                                { stat: '30+', label: 'Signals Evaluated', desc: 'Proven methodology' },
                                { stat: '10K+', label: 'Profiles Analyzed', desc: 'Trusted globally' },
                                { stat: '0', label: 'Login Required', desc: 'Instant access' },
                                { stat: 'AI+Rules', label: 'Hybrid Engine', desc: 'Not a black box' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-3 text-center">
                                    <p className="text-lg font-bold text-[#0A66C2]">{item.stat}</p>
                                    <p className="text-xs font-semibold text-[#0A0F1C] mt-0.5">{item.label}</p>
                                    <p className="text-[10px] text-[#6B7280] mt-0.5">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/linkedin-ranking" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">LinkedIn Ranking Guide →</Link>
                            <Link href="/linkedin-profile-score" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Profile Score Checker →</Link>
                            <Link href="/methodology" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Our Methodology →</Link>
                        </div>
                    </div>

                    {/* Blog directory link */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <h2 className="text-base font-bold text-[#0A0F1C] mb-2">LinkedIn Tips Blog</h2>
                        <p className="text-sm text-[#4B5563] mb-3">
                            Expert guides, examples, and strategies for every tool. 120+ articles covering headline optimization, about section writing, content creation, and more.
                        </p>
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] transition-colors"
                        >
                            Browse All Articles
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-[#0A66C2] to-[#004182] rounded-xl p-6 text-center">
                        <h3 className="text-white font-semibold mb-2">Want a complete profile analysis?</h3>
                        <p className="text-blue-100 text-sm mb-4">Upload your LinkedIn PDF and get your score with personalized recommendations</p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-white text-[#0A66C2] px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors"
                        >
                            Analyze My Profile
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            <SiteFooter />
        </main>
    )
}
