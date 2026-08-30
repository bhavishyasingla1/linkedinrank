import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import FaqAccordion from '@/components/FaqAccordion'
import HeroUploaderStudio from '@/components/HeroUploaderStudio'
import BenchmarkComparison from '@/components/BenchmarkComparison'
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
        tag: 'Search Visibility',
        description: 'Generate 5 recruiter-indexed headlines tailored to your industry, skills, and seniority level.',
        icon: <WandIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'About Section Generator',
        slug: 'linkedin-about-generator',
        tag: 'Storytelling',
        description: 'Craft authentic, high-converting About sections in 3 distinct tones with natural keyword integration.',
        icon: <UserCheckIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Experience Bullet Rewriter',
        slug: 'linkedin-experience-generator',
        tag: 'ATS Optimization',
        description: 'Transform passive job responsibilities into quantified achievement bullets with active power verbs.',
        icon: <FlameIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Profile Photo Ring Creator',
        slug: 'linkedin-profile-photo-ring',
        tag: 'Visual Hook',
        description: 'Add high-contrast gradient rings, Open-To-Work rings, and hiring borders to your avatar.',
        icon: <CameraIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Profile Keyword Analyzer',
        slug: 'linkedin-profile-keyword-analyzer',
        tag: 'Recruiter SEO',
        description: 'Audit keyword discoverability, recruiter search density, and missing high-demand industry skills.',
        icon: <TrendingUpIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Post Idea Generator',
        slug: 'linkedin-post-idea-generator',
        tag: 'Viral Reach',
        description: 'Generate 10 algorithm-optimized post topics based on trending industry themes and audience pain points.',
        icon: <LightbulbIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Story to Post Converter',
        slug: 'linkedin-story-to-post-converter',
        tag: 'Content Writing',
        description: 'Turn rough notes or career milestones into engaging, formatted LinkedIn posts with punchy pacing.',
        icon: <PenLineIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Post Hook Generator',
        slug: 'linkedin-post-hook-generator',
        tag: 'Viral Reach',
        description: 'Generate 6 scroll-stopping opening hooks built on pattern interrupts and curiosity gaps.',
        icon: <SparklesIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Content Pillar Planner',
        slug: 'linkedin-content-planner',
        tag: 'Thought Leadership',
        description: 'Build a structured weekly posting calendar balancing industry insights and growth lessons.',
        icon: <LayersIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Smart Comment Generator',
        slug: 'linkedin-comment-generator',
        tag: 'Engagement',
        description: 'Generate thoughtful, value-add comments that build authority and attract profile views.',
        icon: <MessageSquareIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Connection Note Crafter',
        slug: 'linkedin-connection-message-generator',
        tag: 'Outreach',
        description: 'Write personalized invitations for 14 scenarios strictly under LinkedIn’s 300 character cutoff.',
        icon: <UserPlusIcon size={18} className="text-[#2f27ce]" />,
    },
    {
        name: 'Profile QR Code Generator',
        slug: 'linkedin-qr-code-generator',
        tag: 'Brand Assets',
        description: 'Create high-resolution vector and PNG QR codes for resumes, business cards, and slide decks.',
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
                {/* ── 1. HERO SECTION ────────────────────────────── */}
                <section
                    id="upload"
                    className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden scroll-mt-20 aside-hero-glow"
                >
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
                        {/* Centered Hero Header */}
                        <div className="text-center max-w-3xl mx-auto space-y-4">
                            {/* Floating Pill Badge in Soft Lavender */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dedcff]/70 border border-[#dedcff] shadow-xs">
                                <span className="text-[13px] font-bold text-[#2f27ce] flex items-center gap-1.5">
                                    <SparklesIcon size={14} /> Instant Recruiter-Grade Audit
                                </span>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-[38px] sm:text-[52px] lg:text-[58px] font-extrabold text-[#050315] tracking-tight leading-[1.1]">
                                The most intelligent LinkedIn profile evaluator.
                            </h1>

                            {/* Minimalist Supporting Text */}
                            <p className="text-[16px] sm:text-[18px] text-[#050315]/75 leading-relaxed max-w-2xl mx-auto font-normal">
                                Audit your profile across 30+ signals in seconds. Discover missing keywords, fix weak experience bullet points, and generate recruiter-ready rewrites.
                            </p>
                        </div>

                        {/* Floating App Window (PDF Dropzone) */}
                        <HeroUploaderStudio />
                    </div>
                </section>

                {/* ── 2. PROBLEM STATEMENT & PHILOSOPHY SECTION (Soft Lavender Wash) ─── */}
                <section className="py-20 sm:py-28 border-t border-[#dedcff] bg-[#dedcff]/30">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-center">
                        {/* Centered Pill Badge */}
                        <div>
                            <Link
                                href="/how-linkedin-rank-works"
                                className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#2f27ce] hover:text-[#433bff] bg-[#dedcff] border border-[#dedcff] px-4 py-1.5 rounded-full transition-colors no-underline shadow-2xs"
                            >
                                <span>Diagnostic Precision</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>

                        {/* Centered Headline & Narrative */}
                        <div className="space-y-4 max-w-3xl mx-auto">
                            <h2 className="text-[28px] sm:text-[38px] font-extrabold text-[#050315] tracking-tight leading-tight">
                                Most LinkedIn advice is too vague. We give you exact metrics.
                            </h2>

                            <p className="text-[16px] sm:text-[18px] text-[#050315]/80 leading-relaxed">
                                Generic career influencers tell you to &ldquo;make your headline pop&rdquo; or &ldquo;be passionate.&rdquo; In reality, recruiters search via exact boolean filters, ATS parsers, and strict algorithmic keyword weights.
                            </p>
                        </div>

                        {/* Centered Comparison Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left pt-2">
                            {/* Generic Advice */}
                            <div className="p-7 rounded-3xl bg-white/80 border border-[#dedcff] space-y-3.5 shadow-xs flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <p className="text-[11.5px] font-extrabold text-[#050315]/50 uppercase tracking-wider">
                                        Generic Advice
                                    </p>
                                    <span className="text-[10.5px] font-bold text-[#DC2626] bg-[#FEF2F2] px-2.5 py-0.5 rounded-full">
                                        Low Visibility
                                    </span>
                                </div>
                                <p className="text-[14.5px] text-[#050315]/70 leading-relaxed">
                                    &ldquo;Add more buzzwords, write a dramatic journey, and tell recruiters you are a passionate multitasker.&rdquo;
                                </p>
                            </div>

                            {/* LinkedInRank Exact Metrics */}
                            <div className="p-7 rounded-3xl bg-white border-2 border-[#2f27ce] shadow-xl shadow-[#2f27ce]/10 space-y-3.5 flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <p className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider flex items-center gap-1.5">
                                        <SparklesIcon size={14} /> LinkedInRank Algorithm
                                    </p>
                                    <span className="text-[11px] font-extrabold text-[#2f27ce] bg-[#dedcff] px-3 py-0.5 rounded-full shadow-2xs">
                                        Top 1% Ranked
                                    </span>
                                </div>
                                <p className="text-[14.5px] text-[#050315] font-semibold leading-relaxed">
                                    Inject exact high-intent search terms tailored to recruiter search filters, calibrate quantifiable outcome metrics, and fit mobile line limits.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. INTERACTIVE CAPABILITIES & VISUAL CARDS ──── */}
                <section className="py-20 sm:py-28 border-t border-[#dedcff] bg-[#fbfbfe]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
                        {/* Section Header */}
                        <div className="space-y-2">
                            <Link
                                href="/tools"
                                className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#2f27ce] hover:text-[#433bff] bg-[#dedcff]/60 border border-[#dedcff] px-4 py-1.5 rounded-full transition-colors no-underline shadow-2xs"
                            >
                                <span>Unlimited Optimization</span>
                                <span>&rarr;</span>
                            </Link>
                            <h2 className="text-[28px] sm:text-[38px] font-extrabold text-[#050315] tracking-tight">
                                Everything you need to rank higher on recruiter searches.
                            </h2>
                        </div>

                        {/* 3 Visual Cards with Floating UI Elements */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Card 1: Headline Rewriter */}
                            <div className="p-7 rounded-3xl bg-white border-2 border-[#dedcff] aside-card-shadow aside-card-hover space-y-5 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="w-10 h-10 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center font-bold shadow-xs">
                                        <WandIcon size={20} />
                                    </div>
                                    <h3 className="text-[20px] font-extrabold text-[#050315] tracking-tight">
                                        Headline Rewriter
                                    </h3>
                                    <p className="text-[14px] text-[#050315]/70 leading-relaxed">
                                        Live before/after chip comparison showing exact keyword matching and mobile snippet preservation.
                                    </p>
                                </div>

                                <div className="space-y-2.5 pt-2">
                                    <div className="p-3 rounded-xl bg-[#dedcff]/30 border border-[#dedcff] text-[12px] text-[#050315]/60 flex items-center justify-between gap-2 line-through">
                                        <span>Software Engineer at Tech Corp</span>
                                        <span className="text-[10px] font-bold uppercase text-[#050315]/40 shrink-0">Before</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-white border-2 border-[#2f27ce] text-[12.5px] text-[#050315] font-bold flex items-center justify-between gap-2 shadow-xs">
                                        <span>Staff Platform Engineer | Go • K8s</span>
                                        <span className="text-[10.5px] font-extrabold uppercase text-[#2f27ce] bg-[#dedcff] px-2.5 py-0.5 rounded-full shrink-0">+14 pts</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Experience Metric Injection */}
                            <div className="p-7 rounded-3xl bg-white border-2 border-[#dedcff] aside-card-shadow aside-card-hover space-y-5 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="w-10 h-10 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center font-bold shadow-xs">
                                        <FlameIcon size={20} />
                                    </div>
                                    <h3 className="text-[20px] font-extrabold text-[#050315] tracking-tight">
                                        Experience Metric Injection
                                    </h3>
                                    <p className="text-[14px] text-[#050315]/70 leading-relaxed">
                                        Converts passive job descriptions into quantitative impact metrics using the Context-Action-Result framework.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    <span className="px-3.5 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] text-[12px] font-bold text-[#2f27ce]">
                                        +42% Pipeline
                                    </span>
                                    <span className="px-3.5 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] text-[12px] font-bold text-[#2f27ce]">
                                        14.2x Scale
                                    </span>
                                    <span className="px-3.5 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] text-[12px] font-bold text-[#050315]">
                                        $2.4M ARR
                                    </span>
                                </div>
                            </div>

                            {/* Card 3: ATS & Keyword Matcher */}
                            <div className="p-7 rounded-3xl bg-white border-2 border-[#dedcff] aside-card-shadow aside-card-hover space-y-5 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="w-10 h-10 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center font-bold shadow-xs">
                                        <LayersIcon size={20} />
                                    </div>
                                    <h3 className="text-[20px] font-extrabold text-[#050315] tracking-tight">
                                        ATS &amp; Keyword Matcher
                                    </h3>
                                    <p className="text-[14px] text-[#050315]/70 leading-relaxed">
                                        Surfaces high-intent search criteria and standardized skills required to pass automated recruiter filtering queries.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-1.5 pt-2">
                                    {['Distributed Systems', 'Go / Golang', 'Kubernetes', 'System Design'].map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 rounded-full bg-[#dedcff]/50 border border-[#dedcff] text-[11.5px] font-bold text-[#050315]"
                                        >
                                            ✓ {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 4. BENCHMARK & SCORE COMPARISON SECTION (Soft Lavender Wash) ─────── */}
                <section className="py-20 sm:py-28 border-t border-[#dedcff] bg-[#dedcff]/30">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
                        <div className="text-center max-w-2xl mx-auto space-y-3">
                            <Link
                                href="/how-linkedin-rank-works"
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#dedcff] hover:border-[#2f27ce] text-[#2f27ce] text-[13.5px] font-extrabold shadow-sm hover:shadow-md transition-all duration-200 group no-underline"
                            >
                                <span className="w-2 h-2 rounded-full bg-[#2f27ce]" />
                                <SparklesIcon size={14} />
                                <span>Algorithmic Precision</span>
                                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </Link>
                            <h2 className="text-[28px] sm:text-[38px] font-extrabold text-[#050315] tracking-tight leading-tight">
                                Built on real recruiter signals.
                            </h2>
                            <p className="text-[16px] text-[#050315]/75 leading-relaxed">
                                LinkedInRank evaluates your profile against industry benchmark standards.
                            </p>
                        </div>

                        {/* Interactive Dynamic Benchmark Bar Component */}
                        <BenchmarkComparison />
                    </div>
                </section>

                {/* ── 5. WORKFLOW & ALGORITHMIC REASONING SHOWCASE ── */}
                <section className="py-20 sm:py-28 border-t border-[#dedcff] bg-[#fbfbfe]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
                        <div className="text-center max-w-2xl mx-auto space-y-2">
                            <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#2f27ce] bg-[#dedcff]/60 border border-[#dedcff] px-4 py-1.5 rounded-full shadow-2xs">
                                <span>Algorithmic Reasoning</span>
                                <span>&rarr;</span>
                            </span>
                            <h2 className="text-[28px] sm:text-[38px] font-extrabold text-[#050315] tracking-tight">
                                See the before, after, and reasoning.
                            </h2>
                            <p className="text-[15.5px] text-[#050315]/75">
                                A score only matters if you know what caused it. Here is how our engine reconstructs a low-performing headline.
                            </p>
                        </div>

                        {/* Split Card UI */}
                        <div className="rounded-3xl bg-white border-2 border-[#dedcff] shadow-xl shadow-[#2f27ce]/5 overflow-hidden">
                            <div className="p-6 sm:p-7 border-b border-[#dedcff] bg-[#dedcff]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <span className="text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                        Live Rewrite Transformation
                                    </span>
                                    <h3 className="text-[19px] font-extrabold text-[#050315] mt-0.5">
                                        Software Engineer &rarr; Staff Platform Engineer
                                    </h3>
                                </div>
                                <span className="px-4 py-1 rounded-full bg-[#2f27ce] text-[#fbfbfe] text-[12.5px] font-extrabold shadow-sm shrink-0 self-start sm:self-auto">
                                    +14 Points Expected Gain
                                </span>
                            </div>

                            <div className="p-6 sm:p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Original Headline */}
                                    <div className="p-4 rounded-2xl bg-[#dedcff]/20 border border-[#dedcff] space-y-1.5">
                                        <p className="text-[11px] font-extrabold text-[#050315]/50 uppercase tracking-wider">
                                            Original Headline (Low Search Reach)
                                        </p>
                                        <p className="text-[14px] text-[#050315]/70 line-through">
                                            Software Engineer at Stripe | Building stuff | Tech enthusiast
                                        </p>
                                    </div>

                                    {/* LinkedInRank Recommended Rewrite */}
                                    <div className="p-4 rounded-2xl bg-white border-2 border-[#2f27ce] space-y-1.5 shadow-sm">
                                        <p className="text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider flex items-center gap-1">
                                            <SparklesIcon size={12} />
                                            LinkedInRank Recommended Rewrite
                                        </p>
                                        <p className="text-[14px] font-bold text-[#050315]">
                                            Staff Platform Engineer | Distributed Systems • Go • Kubernetes • High-Scale Infrastructure
                                        </p>
                                    </div>
                                </div>

                                {/* Reasoning Box in Electric Accent Border */}
                                <div className="p-6 rounded-2xl bg-[#dedcff]/40 border-2 border-[#433bff] space-y-2.5">
                                    <p className="text-[12.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                        Algorithmic Reasoning Breakdown
                                    </p>
                                    <ul className="space-y-2 text-[14px] text-[#050315]">
                                        <li className="flex items-center gap-2.5">
                                            <span className="text-[#2f27ce] font-black">✓</span>
                                            <span>Transitions generic terms to high-demand technical job titles.</span>
                                        </li>
                                        <li className="flex items-center gap-2.5">
                                            <span className="text-[#2f27ce] font-black">✓</span>
                                            <span>Front-loads top 4 technologies queried in recruiter filters.</span>
                                        </li>
                                        <li className="flex items-center gap-2.5">
                                            <span className="text-[#2f27ce] font-black">✓</span>
                                            <span>Fits strictly within the 120-character mobile snippet cutoff.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 6. FEATURE GRID (Sub-features & Privacy) ─────── */}
                <section className="py-20 sm:py-28 border-t border-[#dedcff] bg-[#dedcff]/30">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
                        <div className="text-center max-w-2xl mx-auto space-y-2">
                            <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#2f27ce] bg-[#dedcff] border border-[#dedcff] px-4 py-1.5 rounded-full shadow-2xs">
                                <span>Core Guarantees</span>
                                <span>&rarr;</span>
                            </span>
                            <h2 className="text-[28px] sm:text-[38px] font-extrabold text-[#050315] tracking-tight">
                                Built for speed, privacy, and impact.
                            </h2>
                        </div>

                        {/* 4-Column Light Card Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                {
                                    title: '100% Private & Ephemeral',
                                    description: 'Data is processed locally in temporary memory. Zero persistent database storage, zero logins.',
                                    icon: <ShieldCheckIcon size={20} className="text-[#2f27ce]" />,
                                },
                                {
                                    title: 'Anti-AI Natural Tone',
                                    description: 'Crafted for human recruiters. We eliminate robotic AI cliches and corporate jargon.',
                                    icon: <SparklesIcon size={20} className="text-[#2f27ce]" />,
                                },
                                {
                                    title: '30+ Recruiter Signals',
                                    description: 'Audits real search keyword indexing, title discoverability, and metric density.',
                                    icon: <SearchIcon size={20} className="text-[#2f27ce]" />,
                                },
                                {
                                    title: 'Instant Fix Templates',
                                    description: 'Copy-pasteable headline formulas and CAR experience bullet rewrites ready to deploy.',
                                    icon: <FileTextIcon size={20} className="text-[#2f27ce]" />,
                                },
                            ].map((card, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 rounded-2xl bg-white border border-[#dedcff] aside-card-shadow aside-card-hover space-y-3 flex flex-col justify-between"
                                >
                                    <div className="space-y-3">
                                        <div className="w-11 h-11 rounded-2xl bg-[#dedcff] flex items-center justify-center shadow-xs">
                                            {card.icon}
                                        </div>
                                        <h3 className="text-[16px] font-extrabold text-[#050315] tracking-tight">
                                            {card.title}
                                        </h3>
                                        <p className="text-[13.5px] text-[#050315]/70 leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                    <div className="pt-2 text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                        Guaranteed
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 7. ALL 12 FREE TOOLS SUITE ──────────────────── */}
                <section className="py-20 sm:py-28 border-t border-[#dedcff] bg-[#fbfbfe]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                                <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#2f27ce] bg-[#dedcff]/60 border border-[#dedcff] px-4 py-1.5 rounded-full shadow-2xs mb-2">
                                    <span>Complete Tool Suite</span>
                                    <span>&rarr;</span>
                                </span>
                                <h2 className="text-[28px] sm:text-[38px] font-extrabold text-[#050315] tracking-tight">
                                    12 Free LinkedIn Generators
                                </h2>
                                <p className="text-[15px] text-[#050315]/70 mt-1">
                                    Instant standalone generators built for every profile section and content strategy.
                                </p>
                            </div>

                            <Link
                                href="/tools"
                                className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#2f27ce] hover:text-[#433bff] transition-colors no-underline shrink-0"
                            >
                                <span>Explore all 12 tools</span>
                                <ArrowRightIcon size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {ALL_12_TOOLS.map((tool) => (
                                <Link
                                    key={tool.slug}
                                    href={`/tools/${tool.slug}`}
                                    className="p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow aside-card-hover flex flex-col justify-between no-underline group"
                                >
                                    <div className="space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center justify-center text-[10.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-3 py-1 rounded-full text-center leading-none shadow-2xs">
                                                {tool.tag}
                                            </span>
                                            <div className="w-7 h-7 rounded-full bg-[#dedcff] text-[#2f27ce] flex items-center justify-center">
                                                {tool.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-[15px] font-bold text-[#050315] group-hover:text-[#2f27ce] transition-colors leading-snug">
                                            {tool.name}
                                        </h3>
                                        <p className="text-[12.5px] text-[#050315]/70 leading-relaxed line-clamp-2">
                                            {tool.description}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-[#dedcff]/70 mt-3 flex items-center justify-between text-[12.5px] font-bold text-[#2f27ce]">
                                        <span>Use Free Tool</span>
                                        <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 8. TRENDING ARTICLES CLUSTER (Soft Lavender Wash) ─ */}
                <section className="py-20 sm:py-28 border-t border-[#dedcff] bg-[#dedcff]/30">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div className="space-y-2">
                                <Link
                                    href="/blogs"
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#dedcff] hover:border-[#2f27ce] text-[#2f27ce] text-[13.5px] font-extrabold shadow-sm hover:shadow-md transition-all duration-200 group no-underline"
                                >
                                    <span className="w-2 h-2 rounded-full bg-[#2f27ce]" />
                                    <SparklesIcon size={14} />
                                    <span>Editorial Strategy</span>
                                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                </Link>
                                <h2 className="text-[28px] sm:text-[38px] font-extrabold text-[#050315] tracking-tight">
                                    Trending LinkedIn Hooks &amp; Strategy Guides
                                </h2>
                                <p className="text-[15px] text-[#050315]/75 max-w-2xl leading-relaxed">
                                    Psychological frameworks, scroll-stopping opening lines, and algorithm-tested playbooks.
                                </p>
                            </div>

                            <Link
                                href="/blogs"
                                className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#2f27ce] hover:text-[#433bff] transition-colors no-underline shrink-0"
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
                                    <div
                                        key={art.slug}
                                        className="p-6 rounded-3xl bg-white border-2 border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow aside-card-hover flex flex-col justify-between group transition-all duration-200"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="inline-flex items-center justify-center text-[10.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-3 py-1 rounded-full text-center leading-none shadow-2xs">
                                                    {idx === 0 ? '★ Pillar Guide' : art.targetKeyword}
                                                </span>
                                                <span className="text-[11.5px] text-[#050315]/60 flex items-center gap-1 shrink-0 font-medium">
                                                    <ClockIcon size={12} /> {readTime} min
                                                </span>
                                            </div>

                                            <Link
                                                href={`/blogs/${art.slug}`}
                                                className="block no-underline pt-1"
                                            >
                                                <h3 className="text-[15.5px] font-bold text-[#050315] group-hover:text-[#2f27ce] transition-colors leading-snug">
                                                    {art.title}
                                                </h3>
                                            </Link>

                                            <p className="text-[13px] text-[#050315]/70 leading-relaxed line-clamp-3">
                                                {art.summary}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-[#dedcff]/70 mt-4 flex items-center justify-between text-[13px]">
                                            <Link
                                                href={`/blogs/${art.slug}`}
                                                className="font-bold text-[#2f27ce] group-hover:text-[#433bff] transition-colors no-underline inline-flex items-center gap-1"
                                            >
                                                <span>Continue reading</span>
                                                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* ── 9. FAQ ACCORDION ───────────────────────────── */}
                <section className="py-20 sm:py-28 border-t border-[#dedcff] bg-[#fbfbfe]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
                        <div className="text-center max-w-xl mx-auto space-y-3">
                            <Link
                                href="/faq"
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#dedcff] hover:border-[#2f27ce] text-[#2f27ce] text-[13.5px] font-extrabold shadow-sm hover:shadow-md transition-all duration-200 group no-underline"
                            >
                                <span className="w-2 h-2 rounded-full bg-[#2f27ce]" />
                                <SparklesIcon size={14} />
                                <span>FAQ &amp; Knowledge Base</span>
                                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </Link>
                            <h2 className="text-[28px] sm:text-[38px] font-extrabold text-[#050315] tracking-tight">
                                Everything you need to know.
                            </h2>
                            <p className="text-[16px] text-[#050315]/75 leading-relaxed">
                                Clear answers about scoring criteria, data privacy, PDF exports, and profile optimization strategies.
                            </p>
                        </div>

                        <FaqAccordion />

                        {/* Centered Explore More FAQs CTA Button */}
                        <div className="text-center pt-2">
                            <Link
                                href="/faq"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border-2 border-[#dedcff] hover:border-[#2f27ce] text-[#2f27ce] text-[14px] font-extrabold shadow-xs hover:shadow-md hover:bg-[#dedcff]/30 transition-all duration-150 no-underline group cursor-pointer"
                            >
                                <span>Explore all FAQs &amp; Knowledge Base</span>
                                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── 10. BOTTOM CTA HERO SECTION ────────────────── */}
                <section className="relative py-24 sm:py-32 overflow-hidden bg-[#fbfbfe] border-t border-[#dedcff] aside-bottom-glow">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
                        <div className="space-y-3">
                            <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#2f27ce] bg-[#dedcff] border border-[#dedcff] px-4 py-1.5 rounded-full shadow-xs">
                                <SparklesIcon size={13} /> Built for Ambitious Professionals
                            </span>
                            <h2 className="text-[32px] sm:text-[46px] font-extrabold text-[#050315] tracking-tight leading-tight">
                                Crafted for ambitious professionals. Start your audit today.
                            </h2>
                            <p className="text-[16px] sm:text-[17.5px] text-[#050315]/75 max-w-xl mx-auto leading-relaxed">
                                Join thousands of job seekers, creators, and founders optimizing their LinkedIn discoverability with algorithmic precision.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                            <Link
                                href="/#upload"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[15px] font-bold shadow-lg shadow-[#2f27ce]/25 hover:shadow-xl hover:shadow-[#433bff]/35 transition-all duration-150 cursor-pointer no-underline active:scale-95"
                            >
                                <span>Try Free Audit Studio</span>
                                <ArrowRightIcon size={15} />
                            </Link>

                            <Link
                                href="/tools"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#dedcff] hover:bg-[#dedcff]/70 text-[#050315] border border-[#dedcff] text-[15px] font-bold transition-all duration-150 no-underline cursor-pointer active:scale-95"
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
