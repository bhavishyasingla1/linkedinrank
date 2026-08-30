'use client'

import { useState } from 'react'
import { CheckCircleIcon, ShieldCheckIcon } from '@/components/ui/Icons'

interface BenchmarkData {
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

const BENCHMARKS: BenchmarkData[] = [
    {
        id: 'headline',
        label: 'Headline Discoverability',
        tagline: 'Recruiter algorithm keyword density and mobile truncation rules',
        scores: {
            optimized: 96,
            genericAi: 64,
            average: 48,
        },
        signals: [
            'Target role title matches recruiter exact search query',
            'Core keywords front-loaded in first 30 characters for mobile',
            'Eliminates filler ("Passionate", "Aspiring", "Helping")',
            'Standardized skill taxonomy recognized by LinkedIn ATS',
        ],
        diagnosticRule: 'Headlines with front-loaded executive keywords receive 4.2x higher recruiter click-through rates.',
    },
    {
        id: 'about',
        label: 'About Section Impact',
        tagline: 'Hook structure, readability scoring, and quantifiable proof points',
        scores: {
            optimized: 92,
            genericAi: 58,
            average: 42,
        },
        signals: [
            'First 3 lines create high-retention curiosity hook before "...see more"',
            'Bulletized commercial impact metrics with quantifiable revenue or scale proof',
            'Clear call-to-action with direct contact methodology',
            'Natural keyword distribution without keyword stuffing penalties',
        ],
        diagnosticRule: 'Recruiters spend an average of 6 seconds on About sections before deciding to read experience.',
    },
    {
        id: 'experience',
        label: 'Experience Bullet Strength',
        tagline: 'Action verb power, outcome framing, and commercial metrics',
        scores: {
            optimized: 94,
            genericAi: 60,
            average: 45,
        },
        signals: [
            'Every bullet begins with a high-leverage power action verb',
            'Outcomes structured as: Action + Scope + Quantifiable Metric',
            'Zero passive duty descriptions ("Responsible for...", "Assisted with...")',
            'Contextual scope ($ARR, user scale, latency reductions, pipeline value)',
        ],
        diagnosticRule: 'Quantified bullets increase recruiter interview invitation conversion by 68%.',
    },
    {
        id: 'skills',
        label: 'ATS & Skill Match Index',
        tagline: 'Standardized skill taxonomy and recruiter search alignment',
        scores: {
            optimized: 98,
            genericAi: 62,
            average: 50,
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
            {/* ── Segmented Tabs ──── */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                {BENCHMARKS.map((tab) => {
                    const isActive = tab.id === activeTabId
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            className={`
                                px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer select-none
                                ${isActive
                                    ? 'bg-[#2f27ce] text-white shadow-md shadow-[#2f27ce]/25'
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
            <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-[#dedcff] shadow-xl shadow-[#2f27ce]/5 space-y-8">
                {/* Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#dedcff] pb-6">
                    <div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-3 py-1 rounded-full">
                            Recruiter Diagnostic Benchmark
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#050315] tracking-tight mt-2">
                            {currentBenchmark.label} Benchmark Analysis
                        </h3>
                        <p className="text-sm sm:text-base text-[#050315]/75 mt-1 max-w-2xl leading-relaxed">
                            {currentBenchmark.tagline}
                        </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                        <span className="px-4 py-1.5 rounded-full bg-[#dedcff] border border-[#dedcff] text-xs sm:text-sm font-bold text-[#2f27ce] flex items-center gap-1.5 shadow-2xs">
                            <ShieldCheckIcon size={16} /> Verified 2026 Recruiter Standard
                        </span>
                    </div>
                </div>

                {/* Animated Horizontal Progress Bars */}
                <div className="space-y-6">
                    {/* 1. LinkedInRank Optimized Profile (Top Tier) */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm sm:text-base">
                            <span className="font-bold text-[#050315] flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#2f27ce]" />
                                <span>LinkedInRank Optimized Profile</span>
                            </span>
                            <span className="font-extrabold text-[#2f27ce] text-base sm:text-lg">
                                {currentBenchmark.scores.optimized}%
                            </span>
                        </div>
                        <div className="w-full h-4 rounded-full bg-[#dedcff] p-0.5 overflow-hidden border border-[#dedcff]">
                            <div
                                className="h-full rounded-full bg-[#2f27ce] shadow-sm shadow-[#2f27ce]/50 transition-all duration-700 ease-out"
                                style={{ width: `${currentBenchmark.scores.optimized}%` }}
                            />
                        </div>
                        <p className="text-xs sm:text-sm text-[#050315]/75 flex items-center gap-1.5 font-medium">
                            <CheckCircleIcon size={15} className="text-[#2f27ce]" />
                            Top 1% discoverability across LinkedIn Recruiter &amp; enterprise ATS search
                        </p>
                    </div>

                    {/* 2. Generic AI Prompt Draft (Mid Tier) */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm sm:text-base">
                            <span className="font-semibold text-[#050315]/80 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#dedcff]" />
                                <span>Generic AI Prompt Draft (ChatGPT / Gemini)</span>
                            </span>
                            <span className="font-bold text-[#050315]/70 text-sm sm:text-base">
                                {currentBenchmark.scores.genericAi}%
                            </span>
                        </div>
                        <div className="w-full h-3.5 rounded-full bg-[#dedcff]/50 overflow-hidden border border-[#dedcff]">
                            <div
                                className="h-full rounded-full bg-[#dedcff] border border-[#2f27ce]/30 transition-all duration-700 ease-out"
                                style={{ width: `${currentBenchmark.scores.genericAi}%` }}
                            />
                        </div>
                    </div>

                    {/* 3. Average Applicant Profile (Low Tier) */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm sm:text-base">
                            <span className="font-medium text-[#050315]/60 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#dedcff]/60" />
                                <span>Average Unoptimized Applicant Profile</span>
                            </span>
                            <span className="font-semibold text-[#050315]/50 text-sm">
                                {currentBenchmark.scores.average}%
                            </span>
                        </div>
                        <div className="w-full h-3.5 rounded-full bg-[#dedcff]/30 overflow-hidden border border-[#dedcff]/50">
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
                            className="p-4 rounded-2xl bg-[#dedcff]/40 border border-[#dedcff] flex items-start gap-2.5 text-sm text-[#050315]"
                        >
                            <span className="text-[#2f27ce] font-extrabold">✓</span>
                            <span className="font-medium">{sig}</span>
                        </div>
                    ))}
                </div>

                {/* Bottom Takeaway */}
                <div className="p-4.5 rounded-2xl bg-[#dedcff]/60 border border-[#dedcff] text-sm sm:text-base text-[#050315] flex items-center gap-3">
                    <ShieldCheckIcon size={20} className="text-[#2f27ce] shrink-0" />
                    <span><strong>Diagnostic Rule:</strong> {currentBenchmark.diagnosticRule}</span>
                </div>
            </div>
        </div>
    )
}
