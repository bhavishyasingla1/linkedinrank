import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import FaqAccordion from '@/components/FaqAccordion'
import HeroUploaderStudio from '@/components/HeroUploaderStudio'
import BenchmarkComparison from '@/components/BenchmarkComparison'
import LiveRecruiterSignalsMarquee from '@/components/LiveRecruiterSignalsMarquee'
import InteractiveAlgorithmPreview from '@/components/InteractiveAlgorithmPreview'
import { HOOK_CLUSTER_ARTICLES } from '@/lib/hookArticlesData'
import {
    ArrowRightIcon,
    CheckCircleIcon,
    ShieldCheckIcon,
    ClockIcon,
    SparklesIcon,
    FileTextIcon,
    SearchIcon,
    WandIcon,
    FlameIcon,
    LayersIcon,
    ZapIcon,
    TrendingUpIcon,
    UserCheckIcon,
    LightbulbIcon,
    PenLineIcon,
    MessageSquareIcon,
    UserPlusIcon,
    QrCodeIcon,
    CameraIcon,
    AlertTriangleIcon,
} from '@/components/ui/Icons'

const homepageFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'How does LinkedInRank score my profile?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'LinkedInRank evaluates your profile across 30+ signals that recruiters scan in seconds: headline positioning, keyword discoverability, About section structure, quantifiable experience metrics, and section completeness. Each category is weighted and totaled into a clear score out of 100.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is my LinkedIn data stored or shared?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Your PDF is parsed in temporary browser memory for scoring and never written to a permanent database or shared with third parties. No login, password, or LinkedIn connection required.',
            },
        },
        {
            '@type': 'Question',
            name: 'What file do I need to upload?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Your LinkedIn profile PDF export. In LinkedIn, go to your profile, click "More" or the "..." icon under your headline, and select "Save to PDF". The resulting file is typically under 1MB and contains all your public profile sections.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I use AI to improve my profile after the analysis?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. LinkedInRank gives you specific rewrites and diagnostic feedback. You can copy the recommendations directly or use our free prompt blocks with ChatGPT, Claude, or Gemini to rewrite any section while keeping your authentic voice.',
            },
        },
        {
            '@type': 'Question',
            name: 'Who is LinkedInRank built for?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Anyone looking to increase their professional visibility — job seekers optimizing for recruiter search filters, students crafting internship profiles, founders building industry credibility, and professionals auditing their personal brand.',
            },
        },
        {
            '@type': 'Question',
            name: 'How is LinkedInRank different from LinkedIn SSI?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'LinkedIn\'s Social Selling Index (SSI) measures your sales engagement and outreach activity. LinkedInRank specifically audits your profile content, keyword density, and search discoverability from a recruiter or client perspective.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is considered a good LinkedIn score?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Scores are structured into tiers: Bronze (0–54), Silver (55–69), Gold (70–84), and Platinum (85–100). Most unoptimized profiles score between 45–62. A score of 75+ puts your profile in the top tier for discoverability.',
            },
        },
    ],
}

const ALL_12_TOOLS = [
    {
        name: 'Headline Generator',
        slug: 'linkedin-headline-generator',
        tag: 'Search SEO',
        description: 'Recruiter-ranked search headlines',
        icon: <WandIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'About Section Generator',
        slug: 'linkedin-about-generator',
        tag: 'Storytelling',
        description: 'Authentic 3-tone story crafter',
        icon: <UserCheckIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Experience Rewriter',
        slug: 'linkedin-experience-generator',
        tag: 'ATS Metric',
        description: 'Quantified CAR impact bullets',
        icon: <FlameIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Profile Photo Ring',
        slug: 'linkedin-profile-photo-ring',
        tag: 'Visual Hook',
        description: 'Custom high-contrast avatar rings',
        icon: <CameraIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Keyword Analyzer',
        slug: 'linkedin-profile-keyword-analyzer',
        tag: 'Recruiter SEO',
        description: 'Search density & ATS skill audit',
        icon: <TrendingUpIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Post Idea Generator',
        slug: 'linkedin-post-idea-generator',
        tag: 'Viral Reach',
        description: 'Algorithm-tested topic ideas',
        icon: <LightbulbIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Story to Post Converter',
        slug: 'linkedin-story-to-post-converter',
        tag: 'Writing',
        description: 'Raw notes to structured posts',
        icon: <PenLineIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Post Hook Generator',
        slug: 'linkedin-post-hook-generator',
        tag: 'Viral Hook',
        description: 'Scroll-stopping opening lines',
        icon: <ZapIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Content Planner',
        slug: 'linkedin-content-planner',
        tag: 'Strategy',
        description: 'Weekly posting calendar planner',
        icon: <LayersIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Smart Comment Generator',
        slug: 'linkedin-comment-generator',
        tag: 'Engagement',
        description: 'High-authority discussion replies',
        icon: <MessageSquareIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Connection Note Crafter',
        slug: 'linkedin-connection-message-generator',
        tag: 'Outreach',
        description: 'Custom notes under 300 characters',
        icon: <UserPlusIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Profile QR Generator',
        slug: 'linkedin-qr-code-generator',
        tag: 'Brand Asset',
        description: 'Vector & PNG resume QR badges',
        icon: <QrCodeIcon size={18} className="text-[#2f27ce]" />,
    },
]

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <SiteHeader />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
            />

            <main id="main-content" className="flex-1">
                {/* ── 1. HERO SECTION — light bg with radial glow ── */}
                <section
                    id="hero-section"
                    className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden scroll-mt-20 section-light aside-hero-glow"
                >
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12 relative">
                        {/* Centered Hero Header */}
                        <div className="text-center max-w-3xl mx-auto space-y-4">
                            {/* Eyebrow Pill Badge */}
                            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#dedcff] border border-[#dedcff] shadow-2xs leading-none">
                                <span className="w-2 h-2 rounded-full bg-[#2f27ce]" />
                                <span className="text-xs sm:text-sm font-bold text-[#2f27ce] uppercase tracking-wider">
                                    Instant Recruiter-Grade Profile Audit
                                </span>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#050315] tracking-tight leading-[1.1]">
                                The most intelligent LinkedIn profile evaluator.
                            </h1>

                            {/* Supporting Text */}
                            <p className="text-base sm:text-lg lg:text-xl text-[#050315]/80 leading-relaxed max-w-2xl mx-auto font-normal">
                                Audit 30+ recruiter signals in seconds. Discover missing keywords, fix weak bullets, and get recruiter-ready rewrites.
                            </p>
                        </div>

                        {/* Floating App Window (PDF Dropzone) */}
                        <HeroUploaderStudio />
                    </div>
                </section>

                {/* ── LIVE RECRUITER ALGORITHM SIGNALS MARQUEE ─── */}
                <LiveRecruiterSignalsMarquee />

                {/* ── 2. PROBLEM STATEMENT — tinted secondary bg ── */}
                <section className="py-16 sm:py-24 border-t border-[#dedcff] section-tinted relative overflow-hidden">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 text-center relative z-10">
                        {/* Centered Pill Badge */}
                        <div>
                            <Link
                                href="/how-linkedin-rank-works"
                                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#2f27ce] hover:text-[#433bff] bg-white border border-[#dedcff] hover:border-[#2f27ce] px-4 py-1.5 rounded-full transition-all no-underline shadow-xs leading-none uppercase tracking-wider"
                            >
                                <span className="w-2 h-2 rounded-full bg-[#2f27ce]" />
                                <span>Diagnostic Precision</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>

                        {/* Centered Headline & Narrative */}
                        <div className="space-y-3.5 max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#050315] tracking-tight leading-tight">
                                Most LinkedIn advice is too vague. We give you exact metrics.
                            </h2>

                            <p className="text-base sm:text-lg text-[#050315]/80 leading-relaxed font-normal max-w-2xl mx-auto">
                                Vague advice won&apos;t get you noticed. LinkedInRank scores your profile against real recruiter search filters, keyword density, and quantifiable impact metrics.
                            </p>
                        </div>

                        {/* Centered Comparison Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left pt-2">
                            {/* Generic Advice */}
                            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#dedcff] space-y-4 shadow-sm flex flex-col justify-between aside-card-hover hover:scale-[1.01] transition-all">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-bold text-[#050315]/50 uppercase tracking-wider">
                                        Generic Advice
                                    </p>
                                    <span className="text-xs font-bold text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] px-3 py-1 rounded-full">
                                        Low Visibility
                                    </span>
                                </div>
                                <p className="text-base sm:text-lg text-[#050315]/80 leading-relaxed">
                                    &ldquo;Add buzzwords, write a long backstory, and tell recruiters you are a passionate team player.&rdquo;
                                </p>
                            </div>

                            {/* LinkedInRank Exact Metrics */}
                            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#2f27ce] shadow-lg shadow-[#2f27ce]/10 space-y-4 flex flex-col justify-between aside-card-hover hover:scale-[1.01] transition-all relative overflow-hidden group">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-bold text-[#2f27ce] uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#2f27ce]" />
                                        <span>LinkedInRank Algorithm</span>
                                    </p>
                                    <span className="text-xs font-bold text-[#2f27ce] bg-[#dedcff] px-3 py-1 rounded-full shadow-2xs">
                                        Top 1% Ranked
                                    </span>
                                </div>
                                <p className="text-base sm:text-lg text-[#050315] font-bold leading-relaxed">
                                    Target exact recruiter search queries, quantify business outcomes, and fit mobile character limits.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. CAPABILITIES CARDS — light bg ─────────── */}
                <section className="py-16 sm:py-24 border-t border-[#dedcff] section-light relative overflow-hidden">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12 relative z-10">
                        {/* Section Header */}
                        <div className="space-y-3">
                            <Link
                                href="/tools"
                                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#2f27ce] hover:text-[#433bff] bg-[#dedcff] border border-[#dedcff] px-4 py-1.5 rounded-full transition-colors no-underline shadow-2xs leading-none uppercase tracking-wider"
                            >
                                <span className="w-2 h-2 rounded-full bg-[#2f27ce]" />
                                <span>Optimization Studio</span>
                                <span>&rarr;</span>
                            </Link>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#050315] tracking-tight leading-tight">
                                Everything you need to rank higher in search results.
                            </h2>
                        </div>

                        {/* 3 Visual Cards with Floating UI Elements */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Card 1: Headline Rewriter */}
                            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow aside-card-hover space-y-5 flex flex-col justify-between transition-all duration-200">
                                <div className="space-y-3">
                                    <div className="w-10 h-10 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center font-bold shadow-xs">
                                        <WandIcon size={18} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#050315] tracking-tight">
                                        Headline Rewriter
                                    </h3>
                                    <p className="text-sm sm:text-base text-[#050315]/75 leading-relaxed">
                                        Instant before/after comparison with exact search keyword matching and mobile fit.
                                    </p>
                                </div>

                                <div className="space-y-2.5 pt-2">
                                    <div className="p-3 rounded-xl bg-[#dedcff]/30 border border-[#dedcff] text-xs sm:text-sm text-[#050315]/65 flex items-center justify-between gap-2 line-through">
                                        <span>Software Engineer at Tech Corp</span>
                                        <span className="text-xs font-bold uppercase text-[#050315]/40 shrink-0">Before</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-white border-2 border-[#2f27ce] text-xs sm:text-sm text-[#050315] font-bold flex items-center justify-between gap-2 shadow-sm">
                                        <span>Staff Platform Engineer | Go • K8s</span>
                                        <span className="text-xs font-bold uppercase text-[#2f27ce] bg-[#dedcff] px-2.5 py-1 rounded-full shrink-0">+14 pts</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Experience Metric Injection */}
                            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow aside-card-hover space-y-5 flex flex-col justify-between transition-all duration-200">
                                <div className="space-y-3">
                                    <div className="w-10 h-10 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center font-bold shadow-xs">
                                        <FlameIcon size={18} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#050315] tracking-tight">
                                        Experience Metric Injection
                                    </h3>
                                    <p className="text-sm sm:text-base text-[#050315]/75 leading-relaxed">
                                        Converts passive duties into quantifiable impact metrics with measurable outcomes.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    <span className="px-3 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] text-xs sm:text-sm font-bold text-[#2f27ce] shadow-2xs">
                                        +42% Pipeline
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] text-xs sm:text-sm font-bold text-[#2f27ce] shadow-2xs">
                                        14.2x Scale
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] text-xs sm:text-sm font-bold text-[#050315] shadow-2xs">
                                        $2.4M ARR
                                    </span>
                                </div>
                            </div>

                            {/* Card 3: ATS & Keyword Matcher */}
                            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow aside-card-hover space-y-5 flex flex-col justify-between transition-all duration-200">
                                <div className="space-y-3">
                                    <div className="w-10 h-10 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center font-bold shadow-xs">
                                        <LayersIcon size={18} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#050315] tracking-tight">
                                        ATS &amp; Skill Matcher
                                    </h3>
                                    <p className="text-sm sm:text-base text-[#050315]/75 leading-relaxed">
                                        Surfaces high-intent search criteria and standardized skills required to pass recruiter filters.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {['Distributed Systems', 'Go / Golang', 'Kubernetes', 'System Design'].map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 rounded-full bg-[#dedcff]/60 border border-[#dedcff] text-xs sm:text-sm font-bold text-[#050315] shadow-2xs"
                                        >
                                            ✓ {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 4. BENCHMARK — tinted secondary bg ─────────── */}
                <section className="py-16 sm:py-24 border-t border-[#dedcff] section-tinted relative overflow-hidden">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12 relative z-10">
                        <div className="text-center max-w-2xl mx-auto space-y-3">
                            <Link
                                href="/how-linkedin-rank-works"
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#dedcff] hover:border-[#2f27ce] text-[#2f27ce] text-xs sm:text-sm font-bold shadow-xs transition-all group no-underline leading-none uppercase tracking-wider"
                            >
                                <span className="w-2 h-2 rounded-full bg-[#2f27ce]" />
                                <span>Algorithmic Precision</span>
                                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                            </Link>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#050315] tracking-tight leading-tight">
                                Built on real recruiter signals.
                            </h2>
                            <p className="text-base sm:text-lg text-[#050315]/80 leading-relaxed max-w-xl mx-auto">
                                Compare your profile against top-performing benchmark standards.
                            </p>
                        </div>

                        {/* Interactive Dynamic Benchmark Bar Component */}
                        <BenchmarkComparison />
                    </div>
                </section>

                {/* ── 5. ALGORITHM PREVIEW — light bg ─────────────── */}
                <section className="py-16 sm:py-24 border-t border-[#dedcff] section-light relative overflow-hidden">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 relative z-10">
                        <div className="text-center max-w-2xl mx-auto space-y-3">
                            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2f27ce] bg-[#dedcff] border border-[#dedcff] px-4 py-1.5 rounded-full shadow-2xs leading-none uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-[#2f27ce]" />
                                <span>Algorithmic Reasoning</span>
                                <span>&rarr;</span>
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#050315] tracking-tight leading-tight">
                                Before &amp; After Breakdown
                            </h2>
                            <p className="text-base sm:text-lg text-[#050315]/80 leading-relaxed max-w-xl mx-auto">
                                Toggle roles below to inspect exact algorithmic fixes.
                            </p>
                        </div>

                        {/* Live Interactive Algorithm Previewer */}
                        <InteractiveAlgorithmPreview />
                    </div>
                </section>

                {/* ── 6. FEATURE GRID — tinted secondary bg ────────── */}
                <section className="py-16 sm:py-24 border-t border-[#dedcff] section-tinted relative overflow-hidden">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12 relative z-10">
                        <div className="text-center max-w-2xl mx-auto space-y-3">
                            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2f27ce] bg-white border border-[#dedcff] px-4 py-1.5 rounded-full shadow-2xs leading-none uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-[#2f27ce]" />
                                <span>Core Guarantees</span>
                                <span>&rarr;</span>
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#050315] tracking-tight leading-tight">
                                Built for speed, privacy, and impact.
                            </h2>
                        </div>

                        {/* 4-Column Light Card Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                            {[
                                {
                                    title: '100% Private',
                                    description: 'Processed in temporary RAM. Zero database storage or logins required.',
                                    icon: <ShieldCheckIcon size={18} className="text-[#2f27ce]" />,
                                },
                                {
                                    title: 'Zero AI Buzzwords',
                                    description: 'Natural, human tone. Free from robotic clichés and corporate fluff.',
                                    icon: <ZapIcon size={18} className="text-[#2f27ce]" />,
                                },
                                {
                                    title: '30+ Recruiter Signals',
                                    description: 'Audits search keyword indexing, title discoverability, and metrics.',
                                    icon: <SearchIcon size={18} className="text-[#2f27ce]" />,
                                },
                                {
                                    title: 'Instant Fix Templates',
                                    description: 'Ready-to-use headline formulas and quantified bullet rewrites.',
                                    icon: <FileTextIcon size={18} className="text-[#2f27ce]" />,
                                },
                            ].map((card, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 sm:p-7 rounded-3xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow aside-card-hover space-y-4 flex flex-col justify-between transition-all duration-200"
                                >
                                    <div className="space-y-3">
                                        <div className="w-10 h-10 rounded-2xl bg-[#dedcff] flex items-center justify-center shadow-xs">
                                            {card.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-[#050315] tracking-tight">
                                            {card.title}
                                        </h3>
                                        <p className="text-sm text-[#050315]/75 leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                    <div className="pt-2 text-xs font-bold text-[#2f27ce] uppercase tracking-wider">
                                        Guaranteed
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 7. ALL 12 FREE TOOLS — light bg ─────────────── */}
                <section className="py-16 sm:py-24 border-t border-[#dedcff] section-light relative overflow-hidden">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12 relative z-10">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                                <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2f27ce] bg-[#dedcff] border border-[#dedcff] px-4 py-1.5 rounded-full shadow-2xs mb-3 leading-none uppercase tracking-wider">
                                    <span className="w-2 h-2 rounded-full bg-[#2f27ce]" />
                                    <span>Complete Tool Suite</span>
                                    <span>&rarr;</span>
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#050315] tracking-tight leading-tight">
                                    12 Free LinkedIn Generators
                                </h2>
                                <p className="text-base text-[#050315]/75 mt-2 max-w-xl leading-relaxed">
                                    Instant standalone generators built for every profile section and content strategy.
                                </p>
                            </div>

                            <Link
                                href="/tools"
                                className="inline-flex items-center gap-2 text-sm font-bold text-[#2f27ce] hover:text-[#433bff] transition-colors no-underline shrink-0"
                            >
                                <span>Explore all 12 tools</span>
                                <ArrowRightIcon size={15} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {ALL_12_TOOLS.map((tool) => (
                                <Link
                                    key={tool.slug}
                                    href={`/tools/${tool.slug}`}
                                    className="p-5 sm:p-6 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] hover:shadow-lg hover:shadow-[#2f27ce]/8 aside-card-hover flex flex-col justify-between no-underline group transition-all duration-200"
                                >
                                    <div className="space-y-3.5">
                                        <div className="flex items-center justify-between">
                                            <div className="w-9 h-9 rounded-xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center group-hover:scale-105 transition-transform">
                                                {tool.icon}
                                            </div>
                                            <span className="text-xs font-bold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff]/70 px-2.5 py-1 rounded-full leading-none">
                                                {tool.tag}
                                            </span>
                                        </div>

                                        <div className="space-y-1 pt-1">
                                            <h3 className="text-base font-bold text-[#050315] group-hover:text-[#2f27ce] transition-colors leading-snug">
                                                {tool.name}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-[#050315]/70 leading-normal">
                                                {tool.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-3.5 border-t border-[#dedcff]/60 mt-3.5 flex items-center justify-between text-xs sm:text-sm font-bold text-[#2f27ce]">
                                        <span>Open Tool</span>
                                        <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 8. TRENDING ARTICLES — tinted secondary bg ──── */}
                <section className="py-16 sm:py-24 border-t border-[#dedcff] section-tinted relative overflow-hidden">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 relative z-10">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div className="space-y-3">
                                <Link
                                    href="/blogs"
                                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#dedcff] hover:border-[#2f27ce] text-[#2f27ce] text-xs sm:text-sm font-bold shadow-xs transition-all group no-underline leading-none uppercase tracking-wider"
                                >
                                    <span className="w-2 h-2 rounded-full bg-[#2f27ce]" />
                                    <span>Editorial Strategy</span>
                                    <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                                </Link>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#050315] tracking-tight leading-tight">
                                    Trending Strategy Guides
                                </h2>
                                <p className="text-base text-[#050315]/80 max-w-xl leading-relaxed">
                                    Algorithm-tested copywriting playbooks and growth teardowns.
                                </p>
                            </div>

                            <Link
                                href="/blogs"
                                className="inline-flex items-center gap-2 text-sm font-bold text-[#2f27ce] hover:text-[#433bff] transition-colors no-underline shrink-0"
                            >
                                <span>Browse all articles</span>
                                <ArrowRightIcon size={14} />
                            </Link>
                        </div>

                        {/* Top 4 Curated Article Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {HOOK_CLUSTER_ARTICLES.slice(0, 4).map((art, idx) => {
                                const readTime = Math.max(4, Math.ceil((art.h2Outline.length * 150 + 200) / 200))

                                return (
                                    <Link
                                        key={art.slug}
                                        href={`/blogs/${art.slug}`}
                                        className="p-5 sm:p-6 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow aside-card-hover flex flex-col justify-between group transition-all duration-200 no-underline"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="inline-flex items-center justify-center text-xs font-bold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff]/70 px-2.5 py-1 rounded-full text-center leading-none">
                                                    {idx === 0 ? 'Pillar Guide' : art.targetKeyword}
                                                </span>
                                                <span className="text-xs text-[#050315]/65 flex items-center gap-1 shrink-0 font-bold">
                                                    <ClockIcon size={12} /> {readTime}m
                                                </span>
                                            </div>

                                            <h3 className="text-base font-bold text-[#050315] group-hover:text-[#2f27ce] transition-colors leading-snug pt-1">
                                                {art.title}
                                            </h3>
                                        </div>

                                        <div className="pt-3.5 border-t border-[#dedcff]/60 mt-3.5 flex items-center justify-between text-xs sm:text-sm font-bold text-[#2f27ce]">
                                            <span>Read Guide</span>
                                            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* ── 9. FAQ ACCORDION — light bg ─────────────────── */}
                <section className="py-16 sm:py-24 border-t border-[#dedcff] section-light">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
                        <div className="text-center max-w-xl mx-auto space-y-3">
                            <Link
                                href="/faq"
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#dedcff] hover:border-[#2f27ce] text-[#2f27ce] text-xs sm:text-sm font-bold shadow-xs transition-all group no-underline leading-none uppercase tracking-wider"
                            >
                                <span className="w-2 h-2 rounded-full bg-[#2f27ce]" />
                                <span>FAQ &amp; Knowledge Base</span>
                                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                            </Link>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#050315] tracking-tight leading-tight">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-base text-[#050315]/80 leading-relaxed max-w-lg mx-auto">
                                Clear answers about scoring criteria, data privacy, and profile optimization.
                            </p>
                        </div>

                        <FaqAccordion />

                        {/* Centered Explore More FAQs CTA Button */}
                        <div className="text-center pt-3">
                            <Link
                                href="/faq"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border-2 border-[#dedcff] hover:border-[#2f27ce] text-[#2f27ce] text-sm sm:text-base font-bold shadow-xs hover:shadow-md transition-all no-underline group cursor-pointer"
                            >
                                <span>Browse All Questions</span>
                                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── 10. BOTTOM CTA — bold primary dark bg ─────────── */}
                <section className="relative py-20 sm:py-28 overflow-hidden section-primary">
                    {/* Decorative glow orbs */}
                    <div className="absolute inset-0 pointer-events-none" aria-hidden>
                        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#433bff]/20 blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#2f27ce]/30 blur-3xl" />
                    </div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
                        <div className="space-y-3.5">
                            <span className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#dedcff] bg-white/10 border border-white/20 px-4 py-1.5 rounded-full shadow-2xs leading-none uppercase tracking-wider backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-[#dedcff]" />
                                <span>Built for Professionals</span>
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                Ready to improve your LinkedIn rank?
                            </h2>
                            <p className="text-base sm:text-lg text-white/80 max-w-lg mx-auto leading-relaxed">
                                Run a free recruiter-grade audit or explore 12 standalone optimization tools.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
                            <Link
                                href="/#upload"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-white hover:bg-[#fbfbfe] text-[#2f27ce] text-base font-bold shadow-xl shadow-black/20 transition-all cursor-pointer no-underline active:scale-95 hover:-translate-y-0.5"
                            >
                                <span>Try Free Audit Studio</span>
                                <ArrowRightIcon size={16} />
                            </Link>

                            <Link
                                href="/tools"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-base font-bold transition-all no-underline cursor-pointer active:scale-95 backdrop-blur-sm"
                            >
                                <span>Explore 12 Free Tools</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <FooterLayout />
        </div>
    )
}
