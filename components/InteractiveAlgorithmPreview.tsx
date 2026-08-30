'use client'

import { useState } from 'react'
import { CheckIcon } from '@/components/ui/Icons'

interface Scenario {
    id: string
    category: string
    gain: number
    before: {
        headline: string
        score: number
        flaws: string[]
    }
    after: {
        headline: string
        score: number
        mobileSnippet: string
        improvements: string[]
    }
}

const SCENARIOS: Scenario[] = [
    {
        id: 'engineering',
        category: 'Engineering & Systems',
        gain: 36,
        before: {
            headline: 'Software Engineer at Tech Corp | Passionate coder | Building stuff with cool tech',
            score: 58,
            flaws: [
                'Generic buzzwords ("passionate coder", "cool tech") ignored by search filters',
                'Missing high-intent technologies (Go, Kubernetes, Distributed Systems)'
            ]
        },
        after: {
            headline: 'Staff Platform Engineer | Distributed Systems · Go · Kubernetes · Cloud Scale Architecture',
            score: 94,
            mobileSnippet: 'Staff Platform Engineer | Distributed Systems · Go...',
            improvements: [
                'Front-loads verified job titles queried in recruiter talent searches',
                'Injects 4 standardized keywords required for boolean recruiter queries'
            ]
        }
    },
    {
        id: 'product',
        category: 'Product & Strategy',
        gain: 32,
        before: {
            headline: 'Product Manager | Helping users solve problems | Innovator & Problem Solver',
            score: 62,
            flaws: [
                'Vague non-quantifiable proposition without domain specialization',
                'Zero metrics, B2B/B2C segment differentiation, or monetization proof'
            ]
        },
        after: {
            headline: 'Lead Growth Product Manager | B2B SaaS · PLG · Funnel Monetization ($25M+ ARR)',
            score: 94,
            mobileSnippet: 'Lead Growth Product Manager | B2B SaaS · PLG...',
            improvements: [
                'Specific domain specialization (B2B SaaS, PLG) matches recruiter job specs',
                'Injects hard revenue metrics ($25M+ ARR) for instant credibility'
            ]
        }
    },
    {
        id: 'data',
        category: 'Data & AI',
        gain: 34,
        before: {
            headline: 'Data Enthusiast & Analyst | SQL, Python, Excel | Looking for new opportunities',
            score: 60,
            flaws: [
                '"Looking for new opportunities" lowers perceived authority in ranking algorithms',
                'Lacks production-grade stack keywords (dbt, Snowflake, Real-Time ETL)'
            ]
        },
        after: {
            headline: 'Senior Analytics & ML Engineer | dbt · Snowflake · Python · Predictive Modeling & Real-Time ETL',
            score: 94,
            mobileSnippet: 'Senior Analytics & ML Engineer | dbt · Snowflake...',
            improvements: [
                'Features modern data stack tools (dbt, Snowflake) targeted by hiring teams',
                'Highlights high-leverage production impact (Real-Time ETL, Predictive Modeling)'
            ]
        }
    }
]

export default function InteractiveAlgorithmPreview() {
    const [activeScenarioId, setActiveScenarioId] = useState('engineering')
    const scenario = SCENARIOS.find(s => s.id === activeScenarioId) || SCENARIOS[0]

    return (
        <div className="rounded-2xl bg-white border border-[#dedcff] shadow-sm shadow-[#2f27ce]/5 overflow-hidden">
            {/* ── Compact Top Controls ───────────────────────────── */}
            <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 border-b border-[#dedcff] bg-[#dedcff]/20 flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2f27ce] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2f27ce]" />
                    </span>
                    <span className="text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                        Interactive Simulation
                    </span>
                </div>

                {/* Segmented Category Filter */}
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white border border-[#dedcff] shadow-2xs">
                    {SCENARIOS.map((s) => {
                        const isActive = s.id === activeScenarioId
                        return (
                            <button
                                key={s.id}
                                onClick={() => setActiveScenarioId(s.id)}
                                className={`
                                    px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer select-none leading-none
                                    ${isActive
                                        ? 'bg-[#2f27ce] text-white shadow-xs'
                                        : 'text-[#050315]/70 hover:text-[#2f27ce] hover:bg-[#dedcff]/40'
                                    }
                                `}
                            >
                                {s.category}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* ── Compact 2-Column Comparison ────────────────────── */}
            <div className="p-3.5 sm:p-5 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {/* Before Card */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-[#fbfbfe] border border-[#dedcff] flex flex-col justify-between space-y-2.5">
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-extrabold text-[#DC2626] uppercase tracking-wider bg-[#FEF2F2] border border-[#FECACA] px-2 py-0.5 rounded-full leading-none">
                                    Before
                                </span>
                                <span className="text-[11px] font-bold text-[#DC2626]">
                                    Score: {scenario.before.score}/100
                                </span>
                            </div>

                            <p className="text-[12.5px] text-[#050315]/75 font-medium leading-snug line-through decoration-[#DC2626]/40">
                                {scenario.before.headline}
                            </p>
                        </div>

                        <div className="pt-2 border-t border-[#dedcff]/50 space-y-1 text-[11.5px] text-[#050315]/75">
                            {scenario.before.flaws.map((flaw, idx) => (
                                <div key={idx} className="flex items-start gap-1.5 leading-snug">
                                    <span className="text-[#DC2626] font-bold shrink-0">✕</span>
                                    <span>{flaw}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* After Card */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-white border-2 border-[#2f27ce] shadow-xs flex flex-col justify-between space-y-2.5 relative overflow-hidden group">
                        {/* Subtle Scanner Line */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#2f27ce] to-transparent animate-scan-beam pointer-events-none" />

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-2 py-0.5 rounded-full leading-none">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2f27ce] opacity-75" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2f27ce]" />
                                    </span>
                                    <span>Optimized · Top 1%</span>
                                </span>
                                <span className="text-[11px] font-extrabold text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 rounded-full leading-none">
                                    Score: {scenario.after.score}/100 (+{scenario.gain} pts)
                                </span>
                            </div>

                            <p className="text-[13px] font-bold text-[#050315] leading-snug">
                                {scenario.after.headline}
                            </p>
                        </div>

                        <div className="pt-2 border-t border-[#dedcff] space-y-1 text-[11.5px] text-[#050315]">
                            {scenario.after.improvements.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-1.5 leading-snug">
                                    <span className="text-[#2f27ce] font-extrabold shrink-0">✓</span>
                                    <span>{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Compact Mobile Snippet Footer Bar ──────────────── */}
                <div className="px-3 py-1.5 rounded-lg bg-[#dedcff]/20 border border-[#dedcff] flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 text-[#050315]/80">
                        <span className="font-bold text-[#2f27ce]">Mobile Preview:</span>
                        <span className="font-semibold text-[#050315]">&ldquo;{scenario.after.mobileSnippet}&rdquo;</span>
                    </div>

                    <div className="inline-flex items-center gap-1 font-bold text-[#2f27ce] bg-white px-2 py-0.5 rounded-full border border-[#dedcff] shadow-2xs leading-none">
                        <CheckIcon size={10} />
                        <span>Fits 120-Char Cutoff</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
