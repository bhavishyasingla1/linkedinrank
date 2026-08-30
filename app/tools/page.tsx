import { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import { ALL_TOOLS, SITE_URL, SITE_NAME } from '@/lib/toolsConfig'
import { breadcrumbJsonLd } from '@/lib/jsonLd'
import {
    ArrowRightIcon,
    ChevronRightIcon,
    SparklesIcon,
    ShieldCheckIcon,
    ToolIcon,
    UserCheckIcon,
    LayersIcon,
    UsersIcon,
    TrendingUpIcon,
    ZapIcon,
} from '@/components/ui/Icons'

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
    {
        key: 'profile-optimization',
        label: 'Profile Optimization',
        desc: 'Craft high-converting headlines, summaries, and experience descriptions.',
        icon: UserCheckIcon,
    },
    {
        key: 'content-creation',
        label: 'Content Creation',
        desc: 'Generate high-reach hooks, post ideas, and structured pillars.',
        icon: LayersIcon,
    },
    {
        key: 'networking',
        label: 'Networking & Engagement',
        desc: 'Personalized connection messages, comment formulas, and QR codes.',
        icon: UsersIcon,
    },
    {
        key: 'analytics',
        label: 'Keywords & Analytics',
        desc: 'Audit keyword search density and profile discoverability.',
        icon: TrendingUpIcon,
    },
]

export default function ToolsPage() {
    const breadcrumbs = breadcrumbJsonLd([
        { name: 'Home', url: SITE_URL },
        { name: 'Tools', url: `${SITE_URL}/tools` },
    ])

    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <SiteHeader />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <main id="main-content" className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-20 space-y-12 sm:space-y-24">
                {/* ── 1. Centered Hero Header ───────────────────── */}
                <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
                    <nav aria-label="Breadcrumb" className="text-[13px] text-[#050315]/60 flex items-center justify-center gap-2">
                        <Link href="/" className="hover:text-[#2f27ce] transition-colors no-underline">Home</Link>
                        <span>/</span>
                        <span className="text-[#050315] font-semibold">Tools</span>
                    </nav>

                    <div className="space-y-2.5 sm:space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#dedcff] border border-[#dedcff] text-[11.5px] sm:text-[12.5px] font-extrabold text-[#2f27ce] shadow-xs">
                            <SparklesIcon size={14} /> 100% Free Suite • Zero Logins Required
                        </div>
                        <h1 className="text-[28px] sm:text-[50px] font-extrabold text-[#050315] tracking-tight leading-[1.15]">
                            Free LinkedIn Tools &amp; Generators
                        </h1>
                        <p className="text-[15px] sm:text-[18px] text-[#050315]/75 leading-relaxed max-w-2xl mx-auto">
                            Focused standalone utilities to optimize individual profile sections, inject searchable recruiter keywords, and craft high-performing content.
                        </p>
                    </div>

                    {/* Category Quick Jump Pills (Centered & Wrapped) */}
                    <div className="pt-2 sm:pt-3 flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
                        {CATEGORIES.map((cat) => {
                            const CatIcon = cat.icon
                            const count = ALL_TOOLS.filter((t) => t.category === cat.key).length
                            return (
                                <a
                                    key={cat.key}
                                    href={`#${cat.key}`}
                                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-[#dedcff] hover:border-[#2f27ce] hover:bg-[#dedcff]/30 text-[12px] sm:text-[13px] font-bold text-[#050315] hover:text-[#2f27ce] transition-all no-underline shadow-xs shrink-0 group"
                                >
                                    <CatIcon size={14} className="text-[#2f27ce]" />
                                    <span>{cat.label}</span>
                                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#dedcff] text-[#2f27ce] font-extrabold">
                                        {count}
                                    </span>
                                </a>
                            )
                        })}
                    </div>
                </div>

                {/* ── 2. Category Sections with Spacious Layout ─── */}
                <div className="space-y-12 sm:space-y-24">
                    {CATEGORIES.map((cat, idx) => {
                        const tools = ALL_TOOLS.filter((t) => t.category === cat.key)
                        if (tools.length === 0) return null
                        const CatIcon = cat.icon

                        return (
                            <section key={cat.key} id={cat.key} className="space-y-8 scroll-mt-28">
                                {/* Category Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dedcff] pb-4">
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-10 h-10 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 shadow-xs">
                                            <CatIcon size={20} />
                                        </div>
                                        <div>
                                            <h2 className="text-[22px] sm:text-[24px] font-extrabold text-[#050315] tracking-tight">
                                                {cat.label}
                                            </h2>
                                            <p className="text-[13.5px] text-[#050315]/65">
                                                {cat.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-[12px] font-bold text-[#2f27ce] bg-[#dedcff] px-3 py-1 rounded-full self-start sm:self-auto">
                                        {tools.length} Tools Available
                                    </span>
                                </div>

                                {/* Tool Cards Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {tools.map((tool) => (
                                        <Link
                                            key={tool.slug}
                                            href={`/tools/${tool.slug}`}
                                            className="p-7 rounded-3xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow aside-card-hover flex flex-col justify-between no-underline group transition-all duration-200"
                                        >
                                            <div className="space-y-4">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="w-12 h-12 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center group-hover:bg-[#2f27ce] group-hover:text-white transition-all duration-200 shrink-0 shadow-xs">
                                                        <ToolIcon id={tool.id} size={22} />
                                                    </div>
                                                    {tool.tag && (
                                                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#dedcff] text-[#2f27ce] px-2.5 py-0.5 rounded-full">
                                                            {tool.tag}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="space-y-1.5">
                                                    <h3 className="text-[17px] font-bold text-[#050315] group-hover:text-[#2f27ce] transition-colors leading-snug">
                                                        {tool.name}
                                                    </h3>
                                                    <p className="text-[13.5px] text-[#050315]/70 leading-relaxed line-clamp-2">
                                                        {tool.shortDesc || tool.heroText}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-[#dedcff]/60 mt-5 flex items-center justify-between text-[13px] font-bold text-[#2f27ce]">
                                                <span>Open free tool</span>
                                                <ChevronRightIcon size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )
                    })}
                </div>

                {/* ── 3. Methodology & Standards Strip ──────────── */}
                <div className="bg-white border-2 border-[#dedcff] rounded-3xl p-8 sm:p-10 shadow-lg shadow-[#2f27ce]/5 space-y-6">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <span className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-3 py-0.5 rounded-full">
                            Methodology &amp; Standards
                        </span>
                        <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#050315] tracking-tight">
                            Why Trust These LinkedIn Generators?
                        </h2>
                        <p className="text-[14.5px] text-[#050315]/75 leading-relaxed">
                            Every generator is built directly on LinkedInRank&apos;s <strong className="text-[#050315]">30+ signal scoring methodology</strong>. Outputs are engineered to pass recruiter search filters and keyword indexers.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                        {[
                            { icon: TrendingUpIcon, stat: '30+', label: 'Scoring Signals', desc: 'Algorithmic alignment' },
                            { icon: ZapIcon, stat: '0', label: 'Login Required', desc: 'Instant browser access' },
                            { icon: SparklesIcon, stat: '100%', label: 'Free Forever', desc: 'No paywalls or upsells' },
                            { icon: ShieldCheckIcon, stat: 'In-Memory', label: 'Privacy Safe', desc: 'Zero data retention' },
                        ].map((item, i) => {
                            const ItemIcon = item.icon
                            return (
                                <div key={i} className="p-4 rounded-2xl bg-[#dedcff]/30 border border-[#dedcff] text-center flex flex-col items-center space-y-1">
                                    <div className="w-9 h-9 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center mb-1">
                                        <ItemIcon size={17} />
                                    </div>
                                    <p className="text-[22px] font-black text-[#2f27ce] tabular-nums leading-none">{item.stat}</p>
                                    <p className="text-[13px] font-bold text-[#050315]">{item.label}</p>
                                    <p className="text-[11px] text-[#050315]/60">{item.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* ── 4. Radiant Profile Analysis Box ───────────── */}
                <div className="bg-gradient-to-r from-[#dedcff]/60 via-white to-[#dedcff]/60 border-2 border-[#dedcff] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md shadow-[#2f27ce]/5">
                    <div className="space-y-2 max-w-xl">
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-2.5 py-0.5 rounded-full">
                            Complete Profile Audit
                        </span>
                        <h3 className="text-[20px] sm:text-[24px] font-extrabold text-[#050315] tracking-tight">
                            Want a holistic evaluation of your entire profile?
                        </h3>
                        <p className="text-[14px] text-[#050315]/75 leading-relaxed">
                            Upload your LinkedIn PDF export to score your profile across 30+ signals and get prioritized recommendations.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <Link
                            href="/#upload"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[14.5px] font-bold shadow-lg shadow-[#2f27ce]/25 transition-all duration-150 no-underline cursor-pointer active:scale-95 whitespace-nowrap"
                        >
                            <span>Analyze Full Profile</span>
                            <ArrowRightIcon size={14} />
                        </Link>
                    </div>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}
