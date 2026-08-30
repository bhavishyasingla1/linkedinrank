import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import {
    ArrowRightIcon,
    ShieldCheckIcon,
    CheckCircleIcon,
    SparklesIcon,
    ClockIcon,
    FileTextIcon,
    WandIcon,
    FlameIcon,
    LayersIcon,
    TrendingUpIcon,
    UserCheckIcon,
    ZapIcon,
    SearchIcon,
} from '@/components/ui/Icons'

export const metadata: Metadata = {
    title: 'How LinkedIn Rank Works: The 30-Signal Algorithm Explained (2026)',
    description: 'Inside LinkedIn Rank\'s 30-signal algorithm. How you\'re scored, what recruiters see, and how to rank in the Platinum tier. Free check.',
    keywords: 'how linkedinrank works, linkedin profile analysis process, linkedin pdf scoring, linkedin score tool, linkedin profile scorer how it works, free linkedin analysis tool, linkedin scoring explained, linkedin ranking',
    alternates: { canonical: 'https://linkedinrank.com/how-linkedin-rank-works' },
    openGraph: {
        title: 'How LinkedIn Rank Works: The 30-Signal Algorithm Explained (2026)',
        description: 'Inside LinkedIn Rank\'s 30-signal algorithm. How you\'re scored, what recruiters see, and how to rank in the Platinum tier.',
        url: 'https://linkedinrank.com/how-linkedin-rank-works',
    },
}

const CATEGORY_WEIGHTS = [
    {
        name: 'Work Experience',
        points: '25 Pts',
        weight: '25%',
        icon: <FlameIcon size={20} className="text-[#2f27ce]" />,
        desc: 'Quantifiable achievements, Context-Action-Result (CAR) bullet structure, and active power verb density.',
        checks: ['Action verb front-loading', 'Numerical metrics ($ ARR, scale, %)', 'Tools & methodology tags'],
    },
    {
        name: 'Headline Optimization',
        points: '20 Pts',
        weight: '20%',
        icon: <WandIcon size={20} className="text-[#2f27ce]" />,
        desc: 'Exact job title matching, top 3 skill keywords, and mobile snippet limit compliance (120 chars).',
        checks: ['Boolean filter keyword match', 'No empty adjectives ("passionate")', 'Mobile cutoff fit'],
    },
    {
        name: 'About / Summary Section',
        points: '20 Pts',
        weight: '20%',
        icon: <UserCheckIcon size={20} className="text-[#2f27ce]" />,
        desc: 'Opening hook strength, career narrative structure, domain expertise, and clear call to action.',
        checks: ['2-line scroll-stopping hook', 'First-person authentic voice', 'Direct networking CTA'],
    },
    {
        name: 'Searchable Skills',
        points: '15 Pts',
        weight: '15%',
        icon: <TrendingUpIcon size={20} className="text-[#2f27ce]" />,
        desc: 'Alignment with standard LinkedIn taxonomy, recruiter query frequency, and skill volume.',
        checks: ['Top 50 standardized taxonomy', 'Core technical skill presence', 'No outdated duplicate tags'],
    },
    {
        name: 'Education & Certs',
        points: '10 Pts',
        weight: '10%',
        icon: <LayersIcon size={20} className="text-[#2f27ce]" />,
        desc: 'Accredited degrees, verified professional certifications, institutions, and graduation chronology.',
        checks: ['Degree & field of study', 'Active industry certifications', 'Structured chronology'],
    },
    {
        name: 'Profile Completeness',
        points: '10 Pts',
        weight: '10%',
        icon: <CheckCircleIcon size={20} className="text-[#2f27ce]" />,
        desc: 'Custom profile URL vanity handle, complete location data, industry categorization, and language tags.',
        checks: ['Clean vanity profile URL', 'Standardized metro location', 'Industry classification'],
    },
]

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <SiteHeader />

            {/* ── 1. Hero Section ────────────────────────────── */}
            <section className="relative pt-16 pb-14 overflow-hidden aside-hero-glow border-b border-[#dedcff]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
                    <nav aria-label="Breadcrumb" className="text-[13px] text-[#050315]/60 flex items-center gap-2">
                        <Link href="/" className="hover:text-[#2f27ce] transition-colors no-underline">Home</Link>
                        <span>/</span>
                        <span className="text-[#050315] font-semibold">How It Works</span>
                    </nav>

                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#dedcff] border border-[#dedcff] text-[12.5px] font-extrabold text-[#2f27ce] shadow-xs">
                            <SparklesIcon size={14} /> 30-Signal Diagnostic Architecture (2026)
                        </div>
                        <h1 className="text-[36px] sm:text-[50px] font-extrabold text-[#050315] tracking-tight leading-[1.1]">
                            How LinkedInRank Evaluates Profiles
                        </h1>
                        <p className="text-[16px] sm:text-[18px] text-[#050315]/75 leading-relaxed max-w-2xl">
                            Most LinkedIn advice is subjective. LinkedInRank transforms your profile PDF into structured tokens and benchmarks them against verified recruiter search indexing algorithms.
                        </p>
                    </div>

                    {/* Quick Specs Microbar */}
                    <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: 'Evaluation Signals', value: '30+ Criteria' },
                            { label: 'Scoring Architecture', value: '6 Categories' },
                            { label: 'Privacy Engine', value: '100% In-Memory' },
                            { label: 'Processing Speed', value: '~10 Seconds' },
                        ].map((stat, i) => (
                            <div key={i} className="p-3.5 rounded-2xl bg-white border border-[#dedcff] shadow-xs space-y-0.5">
                                <p className="text-[11px] font-bold text-[#050315]/50 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-[14.5px] font-black text-[#2f27ce]">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <main id="main-content" className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20 space-y-16">
                {/* ── 2. The 5-Stage Execution Pipeline ──────────── */}
                <section className="space-y-6">
                    <div className="space-y-1.5">
                        <span className="text-[12px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                            Execution Lifecycle
                        </span>
                        <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#050315] tracking-tight">
                            The 5-Stage Audit Pipeline
                        </h2>
                        <p className="text-[15px] text-[#050315]/70">
                            From file drop to recruiter diagnostic breakdown in five distinct processing phases.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                step: '01',
                                badge: 'Ingestion & Tokenization',
                                title: 'In-Memory PDF Parsing & Entity Extraction',
                                desc: 'When you upload your official LinkedIn export PDF, our parser extracts clean structured tokens: full name, headline, About summary, chronological work history (titles, companies, dates, bullet descriptions), skills list, education, certifications, and languages.',
                                pills: ['Zero Persistent Storage', 'Client Memory Buffer', 'Strict Garbage Collection'],
                            },
                            {
                                step: '02',
                                badge: 'Algorithmic Diagnostics',
                                title: 'Deterministic 30-Signal Scoring Engine',
                                desc: 'Our rule-based engine tests your extracted data against 30+ criteria across 6 weighted categories. Checks include exact recruiter boolean keyword matching, headline character budget, action-verb density in experience bullets, and skills alignment.',
                                pills: ['Boolean Search Filters', 'Keyword Density Map', '120-Char Snippet Rule'],
                            },
                            {
                                step: '03',
                                badge: 'Qualitative Evaluation',
                                title: 'Semantic Context & Positioning Review',
                                desc: 'Google Gemini AI evaluates the qualitative persuasiveness of your copy: positioning clarity in your headline, narrative pacing in your About section, and the strength of your achievement metrics using the CAR (Context-Action-Result) formula.',
                                pills: ['Anti-AI Human Voice', 'CAR Metric Formula', 'Tailored Before/After Rewrites'],
                            },
                            {
                                step: '04',
                                badge: 'Context Calibration',
                                title: 'Career Stage & Seniority Calibration',
                                desc: 'Evaluation expectations adapt dynamically based on your detected career stage. A student is evaluated on coursework, projects, and internships, while an executive is evaluated on leadership scope and P&L scale.',
                                pills: ['Student / Intern', 'Early Career', 'Mid-Level', 'Executive / Founder'],
                            },
                            {
                                step: '05',
                                badge: 'Prioritization',
                                title: 'Score Calculation, Tiering & Impact Roadmap',
                                desc: 'You receive a composite score out of 100, tier classification (Bronze, Silver, Gold, Platinum), and a prioritized improvement roadmap ranked by estimated point gain (+6 pts, +4 pts, etc.) so you know what to optimize first.',
                                pills: ['Bronze / Silver / Gold / Platinum', 'Point Gain Estimates', '1-Click AI Prompts'],
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#dedcff] aside-card-shadow space-y-4 hover:border-[#2f27ce] transition-all duration-200"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dedcff]/70 pb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="w-9 h-9 rounded-2xl bg-[#dedcff] text-[#2f27ce] text-[13px] font-black flex items-center justify-center shrink-0 shadow-2xs">
                                            {item.step}
                                        </span>
                                        <h3 className="text-[18px] font-bold text-[#050315]">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <span className="text-[11px] font-extrabold uppercase tracking-wider bg-[#dedcff]/60 text-[#2f27ce] px-3 py-1 rounded-full self-start sm:self-auto">
                                        {item.badge}
                                    </span>
                                </div>

                                <p className="text-[14.5px] text-[#050315]/75 leading-relaxed pl-0 sm:pl-12">
                                    {item.desc}
                                </p>

                                <div className="flex flex-wrap gap-2 pl-0 sm:pl-12 pt-1">
                                    {item.pills.map((pill, pi) => (
                                        <span
                                            key={pi}
                                            className="px-3 py-1 rounded-full bg-[#dedcff]/35 border border-[#dedcff] text-[11.5px] font-semibold text-[#050315]"
                                        >
                                            ✓ {pill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 3. 6-Category Scoring Matrix ───────────────── */}
                <section className="space-y-6">
                    <div className="space-y-1.5">
                        <span className="text-[12px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                            Weighting Hierarchy
                        </span>
                        <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#050315] tracking-tight">
                            The 6 Scoring Categories (100 Points Total)
                        </h2>
                        <p className="text-[15px] text-[#050315]/70">
                            How each profile section contributes to your overarching discoverability score.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {CATEGORY_WEIGHTS.map((cat, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-3xl bg-white border border-[#dedcff] aside-card-shadow space-y-4 flex flex-col justify-between"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="w-10 h-10 rounded-2xl bg-[#dedcff] flex items-center justify-center">
                                            {cat.icon}
                                        </div>
                                        <span className="text-[12px] font-black text-[#2f27ce] bg-[#dedcff] px-3 py-1 rounded-full">
                                            {cat.points} ({cat.weight})
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-[17px] font-bold text-[#050315]">
                                            {cat.name}
                                        </h3>
                                        <p className="text-[13px] text-[#050315]/70 mt-1 leading-relaxed">
                                            {cat.desc}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-[#dedcff]/70 space-y-1.5">
                                    {cat.checks.map((chk, ci) => (
                                        <p key={ci} className="text-[12px] text-[#050315]/80 flex items-center gap-2">
                                            <span className="text-[#2f27ce] font-extrabold">✓</span>
                                            <span>{chk}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 4. Scoring Scope & Transparency ────────────── */}
                <section className="bg-white border-2 border-[#dedcff] rounded-3xl p-7 sm:p-10 aside-card-shadow space-y-6">
                    <div>
                        <span className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                            Trust &amp; Calibration
                        </span>
                        <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#050315] tracking-tight mt-1">
                            Scoring Scope &amp; Transparency
                        </h2>
                        <p className="text-[14px] text-[#050315]/70 mt-1">
                            We believe in 100% transparent evaluation without arbitrary black-box criteria.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="p-6 rounded-2xl bg-[#dedcff]/30 border border-[#dedcff] space-y-3">
                            <h3 className="text-[13px] font-extrabold text-[#2f27ce] uppercase tracking-wider flex items-center gap-1.5">
                                <CheckCircleIcon size={16} /> What We Evaluate
                            </h3>
                            <ul className="space-y-2 text-[13.5px] text-[#050315]">
                                <li>• Headline keywords, role clarity, character usage</li>
                                <li>• About section hook, first-person voice, competencies</li>
                                <li>• Experience role descriptions, action verbs, outcomes</li>
                                <li>• Searchable skills alignment with job titles</li>
                                <li>• Degree, institution, field of study, and certs</li>
                                <li>• Profile structure and overall completeness</li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl bg-white border border-[#dedcff] space-y-3">
                            <h3 className="text-[13px] font-extrabold text-[#050315]/60 uppercase tracking-wider flex items-center gap-1.5">
                                <ShieldCheckIcon size={16} /> Never Penalized
                            </h3>
                            <ul className="space-y-2 text-[13.5px] text-[#050315]/75">
                                <li>• Profile photo or banner aesthetics (not in PDF)</li>
                                <li>• Follower or connection count</li>
                                <li>• Daily posting frequency or viral engagement</li>
                                <li>• Recommendations or endorsement counts</li>
                                <li>• Creator mode status or newsletter subs</li>
                                <li>• Premium LinkedIn badge status</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ── 5. Bottom Conversion CTA (Aside Radiant Box) ─ */}
                <div className="bg-gradient-to-r from-[#dedcff]/60 via-white to-[#dedcff]/60 border-2 border-[#dedcff] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md shadow-[#2f27ce]/5">
                    <div className="space-y-2 max-w-xl">
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-2.5 py-0.5 rounded-full">
                            Ready to try it?
                        </span>
                        <h3 className="text-[20px] sm:text-[24px] font-extrabold text-[#050315] tracking-tight">
                            Get your free LinkedIn score in under 60 seconds
                        </h3>
                        <p className="text-[14px] text-[#050315]/75 leading-relaxed">
                            Export your PDF from LinkedIn, drop it in the analyzer, and receive your comprehensive diagnosis.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <Link
                            href="/#upload"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[14.5px] font-bold shadow-lg shadow-[#2f27ce]/25 transition-all duration-150 no-underline cursor-pointer active:scale-95"
                        >
                            <span>Analyze Profile Free</span>
                            <ArrowRightIcon size={14} />
                        </Link>
                    </div>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}
