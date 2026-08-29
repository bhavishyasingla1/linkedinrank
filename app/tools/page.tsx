import { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import { ALL_TOOLS, SITE_URL, SITE_NAME } from '@/lib/toolsConfig'
import { breadcrumbJsonLd } from '@/lib/jsonLd'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ArrowRightIcon, ChevronRightIcon, SparklesIcon, ShieldCheckIcon } from '@/components/ui/Icons'

export const metadata: Metadata = {
    title: '12 Free LinkedIn Tools & Generators (2026)',
    description: 'Free AI-powered LinkedIn tools: headline generator, about section writer, keyword analyzer, post ideas, content planner, and more. No signup required.',
    alternates: { canonical: `${SITE_URL}/tools` },
    openGraph: {
        title: '12 Free LinkedIn Tools & Generators (2026)',
        description: 'Free AI-powered LinkedIn tools for profile optimization, content creation, and networking.',
        url: `${SITE_URL}/tools`,
        siteName: SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '12 Free LinkedIn Tools & Generators (2026)',
        description: 'Free AI-powered LinkedIn tools for profile optimization and content creation.',
    },
}

const CATEGORIES = [
    { key: 'profile-optimization', label: 'Profile Optimization', desc: 'Craft high-converting headlines, summaries, and experience descriptions.' },
    { key: 'content-creation', label: 'Content Creation', desc: 'Generate high-reach hooks, post ideas, and structured pillars.' },
    { key: 'networking', label: 'Networking & Engagement', desc: 'Personalized connection messages, comment formulas, and QR codes.' },
    { key: 'analytics', label: 'Keywords & Analytics', desc: 'Audit keyword search density and profile discoverability.' },
]

export default function ToolsPage() {
    const breadcrumbs = breadcrumbJsonLd([
        { name: 'Home', url: SITE_URL },
        { name: 'Tools', url: `${SITE_URL}/tools` },
    ])

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <SiteHeader />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <main id="main-content" className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
                {/* ── Breadcrumb & Page Intro ───────────────────── */}
                <div className="space-y-3">
                    <nav aria-label="Breadcrumb" className="text-[13px] text-[#64748B] flex items-center gap-1.5">
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                        <span>/</span>
                        <span className="text-[#0F172A] font-medium">Tools</span>
                    </nav>

                    <div className="max-w-2xl pt-2 space-y-2">
                        <Badge variant="brand" size="sm">
                            100% Free Tools
                        </Badge>
                        <h1 className="text-[28px] sm:text-[36px] font-bold text-[#0F172A] tracking-tight">
                            Free LinkedIn Tools &amp; Generators
                        </h1>
                        <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed">
                            Focused utilities to optimize individual profile sections, generate searchable copy, and craft high-performing content. No login required.
                        </p>
                    </div>
                </div>

                {/* ── Categories & Tool Cards ───────────────────── */}
                <div className="space-y-10">
                    {CATEGORIES.map((cat) => {
                        const tools = ALL_TOOLS.filter((t) => t.category === cat.key)
                        if (tools.length === 0) return null

                        return (
                            <section key={cat.key} className="space-y-4">
                                <div>
                                    <h2 className="text-[18px] font-bold text-[#0F172A] tracking-tight">
                                        {cat.label}
                                    </h2>
                                    <p className="text-[13px] text-[#64748B] mt-0.5">
                                        {cat.desc}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {tools.map((tool) => (
                                        <Link
                                            key={tool.slug}
                                            href={`/tools/${tool.slug}`}
                                            className="p-5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0A66C2] shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between no-underline group"
                                        >
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h3 className="text-[15px] font-semibold text-[#0F172A] group-hover:text-[#0A66C2] transition-colors leading-snug">
                                                        {tool.name}
                                                    </h3>
                                                    {tool.tag && (
                                                        <Badge
                                                            variant={tool.tag === 'Most Popular' ? 'brand' : 'neutral'}
                                                            size="sm"
                                                        >
                                                            {tool.tag}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-[13px] text-[#475569] leading-relaxed line-clamp-2">
                                                    {tool.heroText}
                                                </p>
                                            </div>

                                            <div className="pt-4 flex items-center text-[12px] font-semibold text-[#0A66C2]">
                                                <span>Open tool</span>
                                                <ChevronRightIcon size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )
                    })}
                </div>

                {/* ── Methodology / Trust Strip ─────────────────── */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
                    <div>
                        <span className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-wider">
                            Methodology &amp; Standards
                        </span>
                        <h2 className="text-[18px] sm:text-[20px] font-bold text-[#0F172A] tracking-tight mt-1">
                            Why Trust These LinkedIn Generators?
                        </h2>
                        <p className="text-[14px] text-[#475569] mt-2 leading-relaxed">
                            Every generator is built directly on LinkedInRank&apos;s <strong className="text-[#0F172A]">30+ signal scoring methodology</strong>. Outputs are engineered to pass recruiter search filters and keyword indexers.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { stat: '30+', label: 'Scoring Signals', desc: 'Algorithmic alignment' },
                            { stat: '0', label: 'Login Required', desc: 'Instant browser access' },
                            { stat: '100%', label: 'Free Forever', desc: 'No paywalls or upsells' },
                            { stat: 'In-Memory', label: 'Privacy Safe', desc: 'Zero data retention' },
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#E2E8F0] text-center space-y-0.5">
                                <p className="text-[20px] font-bold text-[#0A66C2] tabular-nums">{item.stat}</p>
                                <p className="text-[13px] font-semibold text-[#0F172A]">{item.label}</p>
                                <p className="text-[11px] text-[#64748B]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Full Profile Analysis CTA ─────────────────── */}
                <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
                    <div className="space-y-1 max-w-xl">
                        <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider">
                            Complete Profile Audit
                        </span>
                        <h3 className="text-[18px] sm:text-[20px] font-bold text-white tracking-tight">
                            Want a holistic evaluation of your entire profile?
                        </h3>
                        <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                            Upload your LinkedIn PDF export to score your profile across 30+ signals and get prioritized recommendations.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <Button
                            href="/#upload"
                            variant="primary"
                            size="md"
                            rightIcon={<ArrowRightIcon size={14} />}
                        >
                            Analyze Full Profile
                        </Button>
                    </div>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}
