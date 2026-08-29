import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ArrowRightIcon, ShieldCheckIcon, CheckCircleIcon, SparklesIcon } from '@/components/ui/Icons'

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

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <SiteHeader />

            <main id="main-content" className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-12">
                {/* ── Header ───────────────────────────────────── */}
                <div className="space-y-3">
                    <nav aria-label="Breadcrumb" className="text-[13px] text-[#64748B] flex items-center gap-1.5">
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                        <span>/</span>
                        <span className="text-[#0F172A] font-medium">How It Works</span>
                    </nav>

                    <div className="max-w-2xl pt-2 space-y-2">
                        <Badge variant="brand" size="sm">
                            System Architecture &amp; Execution Pipeline
                        </Badge>
                        <h1 className="text-[28px] sm:text-[36px] font-bold text-[#0F172A] tracking-tight">
                            How LinkedInRank Evaluates Profiles
                        </h1>
                        <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed">
                            Most LinkedIn advice is subjective. LinkedInRank transforms your profile PDF into structured data and evaluates it across the exact keyword, structure, and depth signals used in modern recruiter workflows.
                        </p>
                    </div>
                </div>

                {/* ── 5-Step Execution Pipeline ─────────────────── */}
                <div className="space-y-4">
                    <h2 className="text-[18px] font-bold text-[#0F172A] tracking-tight">
                        The 5-Stage Audit Pipeline
                    </h2>

                    <div className="space-y-4">
                        {[
                            {
                                step: '01',
                                title: 'PDF Parsing & In-Memory Extraction',
                                desc: 'When you upload your standard LinkedIn export PDF, our parsing layer extracts structured text tokens: full name, headline, summary/about, chronological work history (roles, companies, dates, bullet descriptions), skills list, education, certifications, and languages.',
                                detail: 'Privacy Guarantee: Your file is parsed directly in server RAM. It is never written to persistent disk storage and is immediately garbage-collected once your report is calculated.',
                            },
                            {
                                step: '02',
                                title: 'Deterministic 30-Signal Scoring Engine',
                                desc: 'Our rule-based engine tests your profile against 30+ documented criteria across 6 categories: Headline (20 pts), About (20 pts), Experience (25 pts), Skills (15 pts), Education (10 pts), and Completeness (10 pts).',
                                detail: 'Checks include search keyword presence, headline character budget, action-verb density in experience bullets, skills alignment with role titles, and section completeness.',
                            },
                            {
                                step: '03',
                                title: 'AI Qualitative Content Review',
                                desc: 'Google Gemini AI evaluates the semantic strength of your copy: headline positioning clarity, storytelling coherence in your About section, and the persuasiveness of your experience accomplishments.',
                                detail: 'The AI generates concrete before-and-after rewrite examples tailored specifically to your target niche and industry.',
                            },
                            {
                                step: '04',
                                title: 'Career Stage Calibration',
                                desc: 'Expectations are dynamically calibrated based on your detected career stage. A university student is evaluated on projects, coursework, and internships, while an executive is evaluated on leadership scope and strategic impact.',
                                detail: 'Eliminates unfair penalties so early-career candidates receive realistic, actionable benchmarks.',
                            },
                            {
                                step: '05',
                                title: 'Score, Tier & Prioritized Improvement Path',
                                desc: 'You receive an overarching score out of 100, tier classification (Bronze, Silver, Gold, Platinum), signal-level breakdown, and a prioritized point-gain roadmap.',
                                detail: 'Every recommendation is ranked by estimated point impact (+6 pts, +4 pts, etc.) so you know what to fix first.',
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-3"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-[#0F172A] text-white text-[13px] font-bold flex items-center justify-center shrink-0">
                                        {item.step}
                                    </span>
                                    <h3 className="text-[16px] font-bold text-[#0F172A]">
                                        {item.title}
                                    </h3>
                                </div>

                                <p className="text-[14px] text-[#334155] leading-relaxed pl-11">
                                    {item.desc}
                                </p>

                                <div className="ml-11 p-3 rounded-lg bg-[#FAFAFA] border border-[#E2E8F0] text-[12px] text-[#64748B] leading-relaxed">
                                    {item.detail}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── What We Analyze vs Never Penalize ─────────── */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
                    <div>
                        <h2 className="text-[18px] font-bold text-[#0F172A] tracking-tight">
                            Scoring Scope &amp; Transparency
                        </h2>
                        <p className="text-[13px] text-[#64748B] mt-0.5">
                            We believe in 100% transparent evaluation without arbitrary black-box criteria.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-3">
                            <h3 className="text-[13px] font-bold text-[#16A34A] uppercase tracking-wider flex items-center gap-1.5">
                                <CheckCircleIcon size={16} /> What We Evaluate
                            </h3>
                            <ul className="space-y-2 text-[13px] text-[#166534]">
                                <li>• Headline keywords, role clarity, character usage</li>
                                <li>• About section hook, first-person voice, competencies</li>
                                <li>• Experience role descriptions, action verbs, outcomes</li>
                                <li>• Searchable skills alignment with job titles</li>
                                <li>• Degree, institution, field of study, and certs</li>
                                <li>• Profile structure and overall completeness</li>
                            </ul>
                        </div>

                        <div className="p-5 rounded-xl bg-[#FAFAFA] border border-[#E2E8F0] space-y-3">
                            <h3 className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                                <ShieldCheckIcon size={16} /> Never Penalized
                            </h3>
                            <ul className="space-y-2 text-[13px] text-[#475569]">
                                <li>• Profile photo or banner aesthetics (not in PDF)</li>
                                <li>• Follower or connection count</li>
                                <li>• Daily posting frequency or viral engagement</li>
                                <li>• Recommendations or endorsement counts</li>
                                <li>• Creator mode status or newsletter subs</li>
                                <li>• Premium LinkedIn badge status</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ── Ready to Analyze Profile CTA ──────────────── */}
                <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
                    <div className="space-y-1 max-w-xl">
                        <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider">
                            Ready to try it?
                        </span>
                        <h3 className="text-[18px] sm:text-[20px] font-bold text-white tracking-tight">
                            Get your free LinkedIn score in under 60 seconds
                        </h3>
                        <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                            Export your PDF from LinkedIn, drop it in the analyzer, and receive your comprehensive diagnosis.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <Button
                            href="/#upload"
                            variant="primary"
                            size="md"
                            rightIcon={<ArrowRightIcon size={14} />}
                        >
                            Analyze Profile Free
                        </Button>
                    </div>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}
