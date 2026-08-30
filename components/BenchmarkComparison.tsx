'use client'

import { useState } from 'react'
import { SparklesIcon, CheckCircleIcon, ShieldCheckIcon } from '@/components/ui/Icons'

interface TabBenchmark {
    id: string
    label: string
    tagline: string
    scores: {
        optimized: number
        genericAi: number
        average: number
    }
    signals: string[]
    diagnosticRule: string
}

const BENCHMARKS: TabBenchmark[] = [
    {
        id: 'headline',
        label: 'Headline Score',
        tagline: 'Recruiter search indexing, job title exact matching, and mobile 120-char cutoff',
        scores: {
            optimized: 98.5,
            genericAi: 61.5,
            average: 42.0,
        },
        signals: [
            'Front-loaded exact job title filter keywords',
            '3 core high-demand technical capabilities',
            'Zero empty filler words ("passionate", "aspiring")',
            'Full mobile feed visibility before truncation',
        ],
        diagnosticRule: 'Recruiters filter profiles by exact keyword title match. Generic headlines lose 58% of recruiter impressions.',
    },
    {
        id: 'about',
        label: 'About Section',
        tagline: 'Hook strength, quantifiable business impact, and executive positioning',
        scores: {
            optimized: 96.0,
            genericAi: 58.0,
            average: 39.5,
        },
        signals: [
            '2-line scroll-stopping narrative hook',
            'Quantifiable career metrics ($ ARR, scale, efficiency)',
            'Clear domain expertise & key competencies list',
            'Direct CTA for opportunities and networking',
        ],
        diagnosticRule: '82% of recruiters read the About section to verify cultural and technical seniority depth.',
    },
    {
        id: 'experience',
        label: 'Work Experience',
        tagline: 'Context-Action-Result (CAR) bullet architecture & metric density',
        scores: {
            optimized: 97.5,
            genericAi: 54.0,
            average: 36.0,
        },
        signals: [
            'Every bullet begins with strong power action verbs',
            'Numerical proof of outcome & performance scale',
            'Technology stack & methodology integration',
            'Zero passive duty descriptions ("responsible for")',
        ],
        diagnosticRule: 'Quantified bullet points increase recruiter response rates by 3.4x over passive task lists.',
    },
    {
        id: 'keywords',
        label: 'Keyword Density',
        tagline: 'ATS discoverability, LinkedIn search algorithm ranking, and skill completeness',
        scores: {
            optimized: 99.0,
            genericAi: 65.0,
            average: 45.0,
        },
        signals: [
            'Top 50 standardized LinkedIn skill categories mapped',
            'High-intent recruiter search terms distributed naturally',
            'No keyword-stuffing penalties or awkward syntax',
            'Verified ATS machine-readable text structure',
        ],
        diagnosticRule: 'Profiles with 40+ standardized skills appear 17x more frequently in recruiter search queries.',
    },
]

export default function BenchmarkComparison() {
    const [activeTabId, setActiveTabId] = useState<string>('headline')

    const currentBenchmark = BENCHMARKS.find((b) => b.id === activeTabId) || BENCHMARKS[0]

    return (
        <div className="w-full space-y-6">
            {/* ── Interactive Segmented Tabs (Placed on Top for Clarity) ──── */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                {BENCHMARKS.map((tab) => {
                    const isActive = tab.id === activeTabId
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            className={`
                                px-6 py-2.5 rounded-full text-[13.5px] font-bold transition-all duration-200 cursor-pointer select-none
                                ${isActive
                                    ? 'bg-gradient-to-r from-[#2f27ce] to-[#433bff] text-[#fbfbfe] shadow-md shadow-[#2f27ce]/25 scale-105'
                                    : 'bg-white text-[#050315] hover:bg-[#dedcff]/50 border border-[#dedcff] shadow-xs'
                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            {/* ── Dynamic Bar Chart Card Visual ──────────────── */}
            <div className="p-7 sm:p-10 rounded-3xl bg-white border-2 border-[#dedcff] shadow-xl shadow-[#2f27ce]/5 space-y-8">
                {/* Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#dedcff] pb-6">
                    <div>
                        <span className="inline-flex items-center gap-1 text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-2.5 py-0.5 rounded-full">
                            SOTA Recruiter Diagnostic Benchmark
                        </span>
                        <h3 className="text-[22px] sm:text-[26px] font-extrabold text-[#050315] tracking-tight mt-2">
                            {currentBenchmark.label} Benchmark Analysis
                        </h3>
                        <p className="text-[14px] text-[#050315]/70 mt-1 max-w-2xl leading-relaxed">
                            {currentBenchmark.tagline}
                        </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                        <span className="px-4 py-1.5 rounded-full bg-[#dedcff] border border-[#dedcff] text-[12px] font-extrabold text-[#2f27ce] flex items-center gap-1.5 shadow-2xs">
                            <SparklesIcon size={14} /> Verified 2026 Recruiter Standard
                        </span>
                    </div>
                </div>

                {/* Animated Horizontal Progress Bars */}
                <div className="space-y-6">
                    {/* 1. LinkedInRank Optimized Profile (Top Tier) */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-[14px]">
                            <span className="font-bold text-[#050315] flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#433bff] shadow-xs" />
                                <span>LinkedInRank Optimized Profile</span>
                            </span>
                            <span className="font-black text-[#2f27ce] text-[16px]">
                                {currentBenchmark.scores.optimized}%
                            </span>
                        </div>
                        <div className="w-full h-4 rounded-full bg-[#dedcff] p-0.5 overflow-hidden border border-[#dedcff]">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] shadow-sm shadow-[#433bff]/50 transition-all duration-700 ease-out"
                                style={{ width: `${currentBenchmark.scores.optimized}%` }}
                            />
                        </div>
                        <p className="text-[12.5px] text-[#050315]/75 flex items-center gap-1.5 font-medium">
                            <CheckCircleIcon size={14} className="text-[#2f27ce]" />
                            Top 1% discoverability across LinkedIn Recruiter &amp; enterprise ATS search
                        </p>
                    </div>

                    {/* 2. Generic AI Prompt Draft (Mid Tier) */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-[14px]">
                            <span className="font-semibold text-[#050315]/80 flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#dedcff]" />
                                <span>Generic AI Prompt Draft (ChatGPT / Gemini)</span>
                            </span>
                            <span className="font-bold text-[#050315]/70 text-[15px]">
                                {currentBenchmark.scores.genericAi}%
                            </span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-[#dedcff]/50 overflow-hidden border border-[#dedcff]">
                            <div
                                className="h-full rounded-full bg-[#dedcff] border border-[#2f27ce]/30 transition-all duration-700 ease-out"
                                style={{ width: `${currentBenchmark.scores.genericAi}%` }}
                            />
                        </div>
                    </div>

                    {/* 3. Average Applicant Profile (Low Tier) */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-[14px]">
                            <span className="font-medium text-[#050315]/60 flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#dedcff]/60" />
                                <span>Average Unoptimized Applicant Profile</span>
                            </span>
                            <span className="font-semibold text-[#050315]/50 text-[14.5px]">
                                {currentBenchmark.scores.average}%
                            </span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-[#dedcff]/30 overflow-hidden border border-[#dedcff]/50">
                            <div
                                className="h-full rounded-full bg-[#dedcff]/80 transition-all duration-700 ease-out"
                                style={{ width: `${currentBenchmark.scores.average}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Diagnostic Signal Chips */}
                <div className="pt-6 border-t border-[#dedcff] grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentBenchmark.signals.map((sig, idx) => (
                        <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-[#dedcff]/40 border border-[#dedcff] flex items-start gap-2.5 text-[13px] text-[#050315]"
                        >
                            <span className="text-[#2f27ce] font-black">✓</span>
                            <span className="font-medium">{sig}</span>
                        </div>
                    ))}
                </div>

                {/* Bottom Takeaway */}
                <div className="p-4 rounded-2xl bg-[#dedcff]/60 border border-[#dedcff] text-[13.5px] text-[#050315] flex items-center gap-3">
                    <ShieldCheckIcon size={18} className="text-[#2f27ce] shrink-0" />
                    <span><strong>Diagnostic Rule:</strong> {currentBenchmark.diagnosticRule}</span>
                </div>
            </div>
        </div>
    )
}
