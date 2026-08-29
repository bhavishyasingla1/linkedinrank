import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import HeroSlideshow from '@/components/HeroSlideshow'
import FaqAccordion from '@/components/FaqAccordion'
import FileUploadWrapper from '@/components/FileUploadWrapper'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
    ArrowRightIcon,
    CheckCircleIcon,
    ShieldCheckIcon,
    ClockIcon,
    SparklesIcon,
    FileTextIcon,
    SearchIcon,
    ChevronRightIcon,
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
            name: 'What is considered a good LinkedIn score?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Scores are structured into tiers: Bronze (0–54), Silver (55–69), Gold (70–84), and Platinum (85–100). Most unoptimized profiles score between 45–62. A score of 75+ puts your profile in the top tier for discoverability.',
            },
        },
    ],
}

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white flex flex-col selection:bg-[#F0F7FF] selection:text-[#0A66C2]">
            <SiteHeader />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
            />

            <main id="main-content" className="flex-1">
                {/* ── 1. HERO SECTION ────────────────────────────── */}
                <section className="pt-12 sm:pt-20 pb-14 sm:pb-20 border-b border-[#F1F5F9] bg-gradient-to-b from-[#FAFAFA] to-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
                            {/* Hero Copy (7 cols on lg) */}
                            <div className="lg:col-span-6 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F0F7FF] border border-[#BAE0FD]">
                                    <span className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                                    <span className="text-[12px] font-semibold text-[#0A66C2]">
                                        Free Profile Audit • No Login Required
                                    </span>
                                </div>

                                <h1 className="text-[34px] sm:text-[44px] lg:text-[48px] font-bold text-[#0F172A] tracking-tight leading-[1.12]">
                                    Analyze your <br className="hidden sm:inline" />
                                    LinkedIn profile.
                                </h1>

                                <p className="text-[16px] sm:text-[17px] text-[#475569] leading-relaxed max-w-lg">
                                    See what is working, what is holding your profile back, and what you should improve next — scored out of 100 across 30+ recruiter signals.
                                </p>

                                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                    <Button
                                        href="#upload"
                                        variant="primary"
                                        size="lg"
                                        rightIcon={<ArrowRightIcon size={16} />}
                                    >
                                        Analyze Your Profile
                                    </Button>
                                    <Button
                                        href="/tools"
                                        variant="secondary"
                                        size="lg"
                                    >
                                        Explore Free Tools
                                    </Button>
                                </div>
                            </div>

                            {/* Hero Visual (5 cols on lg) */}
                            <div className="lg:col-span-6">
                                <HeroSlideshow />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. TRUST STRIP ─────────────────────────────── */}
                <section className="py-6 border-b border-[#F1F5F9] bg-[#FAFAFA]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6 text-[13px] font-medium text-[#475569]">
                            <div className="flex items-center gap-2">
                                <CheckCircleIcon size={16} className="text-[#0A66C2]" />
                                <span>Free to analyze</span>
                            </div>
                            <div className="hidden sm:block text-[#CBD5E1]" aria-hidden="true">•</div>
                            <div className="flex items-center gap-2">
                                <ShieldCheckIcon size={16} className="text-[#0A66C2]" />
                                <span>No LinkedIn login required</span>
                            </div>
                            <div className="hidden sm:block text-[#CBD5E1]" aria-hidden="true">•</div>
                            <div className="flex items-center gap-2">
                                <FileTextIcon size={16} className="text-[#0A66C2]" />
                                <span>PDF-based analysis</span>
                            </div>
                            <div className="hidden sm:block text-[#CBD5E1]" aria-hidden="true">•</div>
                            <div className="flex items-center gap-2">
                                <ClockIcon size={16} className="text-[#0A66C2]" />
                                <span>Results in under 60 seconds</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. PROBLEM SECTION (Editorial Comparison) ──── */}
                <section className="py-16 sm:py-24 border-b border-[#F1F5F9] bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <div className="mb-10">
                            <Badge variant="neutral" size="sm" className="mb-3">
                                The Challenge
                            </Badge>
                            <h2 className="text-[26px] sm:text-[34px] font-bold text-[#0F172A] tracking-tight mb-4">
                                Most LinkedIn advice is too vague.
                            </h2>
                            <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed">
                                Most professionals know their profile could be stronger, but generic tips don’t provide actionable clarity.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Generic Advice */}
                            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                                <p className="text-[12px] font-bold text-[#DC2626] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                                    <span>✕</span> What you usually hear
                                </p>
                                <ul className="space-y-3.5 text-[14px] text-[#475569]">
                                    <li className="flex items-start gap-2.5">
                                        <span className="text-[#94A3B8] select-none">—</span>
                                        <span>&ldquo;Make your headline stand out.&rdquo;</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <span className="text-[#94A3B8] select-none">—</span>
                                        <span>&ldquo;Add more relevant keywords to your profile.&rdquo;</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <span className="text-[#94A3B8] select-none">—</span>
                                        <span>&ldquo;Optimize your About section for storytelling.&rdquo;</span>
                                    </li>
                                </ul>
                            </div>

                            {/* What LinkedInRank provides */}
                            <div className="p-6 rounded-xl border border-[#BAE0FD] bg-[#F0F7FF]">
                                <p className="text-[12px] font-bold text-[#0A66C2] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                                    <span>✓</span> What LinkedInRank answers
                                </p>
                                <ul className="space-y-3.5 text-[14px] text-[#0F172A] font-medium">
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircleIcon size={16} className="text-[#0A66C2] shrink-0 mt-0.5" />
                                        <span>What exact terms are missing from your headline?</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircleIcon size={16} className="text-[#0A66C2] shrink-0 mt-0.5" />
                                        <span>Which section is creating the largest friction?</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircleIcon size={16} className="text-[#0A66C2] shrink-0 mt-0.5" />
                                        <span>What specific copy should you replace first?</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 4. PRODUCT EXPERIENCE (How It Works) ────────── */}
                <section className="py-16 sm:py-24 border-b border-[#F1F5F9] bg-[#FAFAFA]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="max-w-2xl mb-12">
                            <Badge variant="brand" size="sm" className="mb-3">
                                Workflow
                            </Badge>
                            <h2 className="text-[26px] sm:text-[34px] font-bold text-[#0F172A] tracking-tight mb-3">
                                From PDF export to recruiter-ready profile.
                            </h2>
                            <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed">
                                A simple four-step process that evaluates your profile structure without sharing your credentials.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    step: '01',
                                    title: 'Upload PDF',
                                    description: 'Export your profile as a PDF from LinkedIn and drop it in. No passwords required.',
                                },
                                {
                                    step: '02',
                                    title: 'Analyze Signals',
                                    description: '30+ recruiter search signals, keyword densities, and structure are checked in memory.',
                                },
                                {
                                    step: '03',
                                    title: 'Understand Score',
                                    description: 'Get a clear score out of 100 with category breakdowns for Headline, About, and Experience.',
                                },
                                {
                                    step: '04',
                                    title: 'Apply Improvements',
                                    description: 'Review copy-pasteable rewrites and a step-by-step roadmap to boost your visibility.',
                                },
                            ].map((item, i) => (
                                <Card key={i} className="p-6 space-y-3 bg-white">
                                    <span className="text-[12px] font-bold text-[#0A66C2] tracking-wider uppercase">
                                        Step {item.step}
                                    </span>
                                    <h3 className="text-[16px] font-semibold text-[#0F172A] tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-[13px] text-[#475569] leading-relaxed">
                                        {item.description}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 5. SCORE & RECOMMENDATION SHOWCASE ─────────── */}
                <section className="py-16 sm:py-24 border-b border-[#F1F5F9] bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <div className="mb-12">
                            <Badge variant="neutral" size="sm" className="mb-3">
                                Real Report Breakdown
                            </Badge>
                            <h2 className="text-[26px] sm:text-[34px] font-bold text-[#0F172A] tracking-tight mb-3">
                                Context alongside every metric.
                            </h2>
                            <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed">
                                A score only matters if you know what caused it. LinkedInRank shows you the before, the after, and the reasoning behind each suggestion.
                            </p>
                        </div>

                        {/* Concrete Before / After Showcase */}
                        <div className="border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs bg-white">
                            <div className="p-6 sm:p-7 border-b border-[#F1F5F9] bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                                        Sample Improvement: Headline Optimization
                                    </span>
                                    <h3 className="text-[18px] font-semibold text-[#0F172A] tracking-tight mt-0.5">
                                        Computer Science Student Profile
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[13px] font-bold text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-2.5 py-1 rounded-md">
                                        +8 Points Expected Gain
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 sm:p-7 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Before */}
                                    <div className="p-4 rounded-lg bg-[#FEF2F2]/40 border border-[#FECACA] space-y-1.5">
                                        <p className="text-[11px] font-bold text-[#DC2626] uppercase tracking-wider">
                                            Original Headline
                                        </p>
                                        <p className="text-[14px] text-[#475569]">
                                            Computer Science Student | AI Enthusiast | Developer
                                        </p>
                                    </div>

                                    {/* After */}
                                    <div className="p-4 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] space-y-1.5">
                                        <p className="text-[11px] font-bold text-[#16A34A] uppercase tracking-wider flex items-center gap-1">
                                            <SparklesIcon size={12} />
                                            LinkedInRank Recommended Rewrite
                                        </p>
                                        <p className="text-[14px] font-medium text-[#0F172A]">
                                            Computer Science Student Building AI &amp; Automation Systems | Python · SEO · Product
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                                    <p className="text-[12px] font-semibold text-[#334155] uppercase tracking-wider mb-1.5">
                                        Why this recommendation works
                                    </p>
                                    <ul className="space-y-1.5 text-[13px] text-[#475569]">
                                        <li className="flex items-center gap-2">
                                            <span className="text-[#0A66C2]">✓</span>
                                            <span>Transitions from passive student labeling to proactive capability positioning.</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-[#0A66C2]">✓</span>
                                            <span>Includes exact indexed skills filtered by technical recruiters.</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-[#0A66C2]">✓</span>
                                            <span>Highlights concrete functional focus (Systems &amp; Automation).</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 6. "WHAT YOU GET" SECTION ──────────────────── */}
                <section className="py-16 sm:py-24 border-b border-[#F1F5F9] bg-[#FAFAFA]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                            {/* Left Big Statement */}
                            <div className="lg:col-span-5 space-y-4">
                                <Badge variant="brand" size="sm">
                                    Comprehensive Breakdown
                                </Badge>
                                <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0F172A] tracking-tight leading-[1.18]">
                                    You don&apos;t just get a score.
                                </h2>
                                <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed">
                                    Every report provides a structured audit designed to turn ambiguity into immediate profile improvements.
                                </p>
                            </div>

                            {/* Right 4 Strategic Deliverables */}
                            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        title: 'See what matters',
                                        description: 'Understand which sections carry the highest weight in recruiter search algorithms.',
                                    },
                                    {
                                        title: 'Find weak sections',
                                        description: 'Identify the exact phrases or missing elements reducing your reach.',
                                    },
                                    {
                                        title: 'Understand why',
                                        description: 'Learn the principles behind recruiter search psychology and filter preferences.',
                                    },
                                    {
                                        title: 'Know what to fix first',
                                        description: 'Follow a prioritized point roadmap that tells you where to invest your time.',
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="p-5 rounded-xl border border-[#E2E8F0] bg-white space-y-2 shadow-xs"
                                    >
                                        <h3 className="text-[15px] font-semibold text-[#0F172A] tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-[13px] text-[#475569] leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 7. LIVE UPLOADER SECTION ────────────────────── */}
                <section id="upload" className="py-16 sm:py-24 border-b border-[#F1F5F9] bg-white scroll-mt-20">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6">
                        <div className="text-center mb-8">
                            <Badge variant="brand" size="sm" className="mb-3">
                                Instant Analysis
                            </Badge>
                            <h2 className="text-[26px] sm:text-[34px] font-bold text-[#0F172A] tracking-tight mb-2">
                                Upload your LinkedIn profile
                            </h2>
                            <p className="text-[14px] sm:text-[15px] text-[#475569]">
                                Drop your LinkedIn PDF export to generate your comprehensive score and fixes.
                            </p>
                        </div>

                        {/* Uploader Dropzone Component */}
                        <div className="bg-white rounded-xl">
                            <FileUploadWrapper />
                        </div>

                        {/* 3-Step Guide on Exporting PDF */}
                        <div className="mt-8 p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                            <p className="text-[12px] font-bold text-[#334155] uppercase tracking-wider mb-3">
                                How to download your LinkedIn PDF export:
                            </p>
                            <ol className="space-y-2 text-[13px] text-[#475569]">
                                <li className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-[#E2E8F0] text-[#0F172A] font-bold text-[11px] flex items-center justify-center shrink-0">
                                        1
                                    </span>
                                    <span>Navigate to your LinkedIn profile in your browser.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-[#E2E8F0] text-[#0F172A] font-bold text-[11px] flex items-center justify-center shrink-0">
                                        2
                                    </span>
                                    <span>Click <strong>&ldquo;More&rdquo;</strong> (or the &ldquo;...&rdquo; button) under your profile headline.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-[#E2E8F0] text-[#0F172A] font-bold text-[11px] flex items-center justify-center shrink-0">
                                        3
                                    </span>
                                    <span>Select <strong>&ldquo;Save to PDF&rdquo;</strong> and upload that file here.</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </section>

                {/* ── 8. FEATURED TOOLS SECTION ──────────────────── */}
                <section className="py-16 sm:py-24 border-b border-[#F1F5F9] bg-[#FAFAFA]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                            <div>
                                <Badge variant="neutral" size="sm" className="mb-2">
                                    Focused Utilities
                                </Badge>
                                <h2 className="text-[24px] sm:text-[30px] font-bold text-[#0F172A] tracking-tight">
                                    Need to fix one section?
                                </h2>
                                <p className="text-[14px] text-[#475569] mt-1">
                                    Dedicated tools to generate and refine individual profile components.
                                </p>
                            </div>

                            <Link
                                href="/tools"
                                className="text-[14px] font-semibold text-[#0A66C2] hover:text-[#004182] inline-flex items-center gap-1.5 transition-colors no-underline shrink-0"
                            >
                                <span>Explore all tools</span>
                                <ArrowRightIcon size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                {
                                    name: 'Headline Generator',
                                    href: '/tools/linkedin-headline-generator',
                                    description: 'Generate recruiter-optimized headlines tailored to your industry and seniority level.',
                                },
                                {
                                    name: 'About Section Generator',
                                    href: '/tools/linkedin-about-generator',
                                    description: 'Turn your experience into an authentic, structured summary that engages readers.',
                                },
                                {
                                    name: 'Experience Generator',
                                    href: '/tools/linkedin-experience-generator',
                                    description: 'Convert basic bullet points into quantified achievement statements.',
                                },
                                {
                                    name: 'Keyword Analyzer',
                                    href: '/tools/linkedin-profile-keyword-analyzer',
                                    description: 'Discover high-intent recruiter search keywords missing from your profile.',
                                },
                            ].map((tool, i) => (
                                <Link
                                    key={i}
                                    href={tool.href}
                                    className="p-5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0A66C2] shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between no-underline group"
                                >
                                    <div className="space-y-2">
                                        <h3 className="text-[15px] font-semibold text-[#0F172A] group-hover:text-[#0A66C2] transition-colors">
                                            {tool.name}
                                        </h3>
                                        <p className="text-[13px] text-[#475569] leading-relaxed">
                                            {tool.description}
                                        </p>
                                    </div>
                                    <div className="pt-4 flex items-center text-[12px] font-semibold text-[#0A66C2]">
                                        <span>Use tool</span>
                                        <ChevronRightIcon size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 9. ARTICLES & GUIDES PREVIEW ───────────────── */}
                <section className="py-16 sm:py-24 border-b border-[#F1F5F9] bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                            <div>
                                <Badge variant="neutral" size="sm" className="mb-2">
                                    Editorial Insights
                                </Badge>
                                <h2 className="text-[24px] sm:text-[30px] font-bold text-[#0F172A] tracking-tight">
                                    Learn how to improve your LinkedIn presence.
                                </h2>
                                <p className="text-[14px] text-[#475569] mt-1">
                                    Practical guides on positioning, keywords, recruiter psychology, and job search strategy.
                                </p>
                            </div>

                            <Link
                                href="/blogs"
                                className="text-[14px] font-semibold text-[#0A66C2] hover:text-[#004182] inline-flex items-center gap-1.5 transition-colors no-underline shrink-0"
                            >
                                <span>Browse all articles</span>
                                <ArrowRightIcon size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    category: 'Optimization Guide',
                                    title: 'The Complete LinkedIn Profile Optimization Guide',
                                    excerpt: 'Step-by-step instructions on structuring your headline, summary, and experience to maximize recruiter reach.',
                                    meta: '8 min read',
                                    href: '/linkedin-optimization-guide',
                                },
                                {
                                    category: 'Keywords & SEO',
                                    title: 'How Recruiters Actually Search and Filter on LinkedIn',
                                    excerpt: 'Understand keyword matching, boolean search syntax, and placement strategies inside LinkedIn Recruiter.',
                                    meta: '6 min read',
                                    href: '/linkedin-keywords-guide',
                                },
                                {
                                    category: 'Headlines',
                                    title: '100+ Recruiter-Approved LinkedIn Headline Examples',
                                    excerpt: 'Formulas and proven templates for software engineers, marketers, founders, and students.',
                                    meta: '10 min read',
                                    href: '/linkedin-headline-examples',
                                },
                            ].map((article, i) => (
                                <Link
                                    key={i}
                                    href={article.href}
                                    className="p-6 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#0A66C2] shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between no-underline group"
                                >
                                    <div className="space-y-2.5">
                                        <span className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-wider">
                                            {article.category}
                                        </span>
                                        <h3 className="text-[16px] font-semibold text-[#0F172A] group-hover:text-[#0A66C2] transition-colors leading-snug">
                                            {article.title}
                                        </h3>
                                        <p className="text-[13px] text-[#475569] leading-relaxed">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                    <div className="pt-5 border-t border-[#F1F5F9] text-[12px] text-[#64748B] flex items-center justify-between">
                                        <span>{article.meta}</span>
                                        <span className="text-[#0A66C2] font-semibold group-hover:translate-x-0.5 transition-transform">
                                            Read article →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 10. FAQ SECTION ────────────────────────────── */}
                <section className="py-16 sm:py-24 border-b border-[#F1F5F9] bg-[#FAFAFA]">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6">
                        <div className="text-center mb-10">
                            <Badge variant="neutral" size="sm" className="mb-2">
                                FAQ
                            </Badge>
                            <h2 className="text-[26px] sm:text-[32px] font-bold text-[#0F172A] tracking-tight mb-2">
                                Questions, answered.
                            </h2>
                            <p className="text-[14px] text-[#475569]">
                                Everything you need to know about our analysis, scoring signals, and privacy.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
                            <FaqAccordion />
                        </div>
                    </div>
                </section>

                {/* ── 11. FINAL HOMEPAGE CTA ─────────────────────── */}
                <section className="py-16 sm:py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
                        <h2 className="text-[28px] sm:text-[38px] font-bold text-[#0F172A] tracking-tight">
                            See what your profile is really saying.
                        </h2>
                        <p className="text-[15px] sm:text-[16px] text-[#475569] max-w-xl mx-auto leading-relaxed">
                            Upload your LinkedIn PDF export and receive a comprehensive breakdown of what to improve in under a minute.
                        </p>
                        <div className="pt-3">
                            <Button
                                href="#upload"
                                variant="primary"
                                size="lg"
                                rightIcon={<ArrowRightIcon size={16} />}
                            >
                                Analyze Your Profile
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <FooterLayout />
        </div>
    )
}
