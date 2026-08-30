'use client'

import { useState } from 'react'
import { CheckIcon, ArrowRightIcon, ZapIcon, FlameIcon, SearchIcon } from '@/components/ui/Icons'

interface Scenario {
    id: string
    role: string
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
        highlights: string[]
        mobileSnippet: string
        rationale: string[]
    }
}

const SCENARIOS: Scenario[] = [
    {
        id: 'engineering',
        role: 'Staff Platform Engineer',
        category: 'Engineering & Systems',
        gain: 36,
        before: {
            headline: 'Software Engineer at Tech Corp | Passionate coder | Building stuff with cool tech',
            score: 58,
            flaws: [
                'Generic buzzwords ("passionate coder", "cool tech") ignored by recruiter filters',
                'Lacks exact searchable backend infrastructure technologies',
                'No scope or seniority differentiation'
            ]
        },
        after: {
            headline: 'Staff Platform Engineer | Distributed Systems · Go · Kubernetes · High-Scale Cloud Architecture',
            score: 94,
            highlights: ['Staff Platform Engineer', 'Distributed Systems', 'Go', 'Kubernetes', 'High-Scale Cloud Architecture'],
            mobileSnippet: 'Staff Platform Engineer | Distributed Systems · Go...',
            rationale: [
                'Front-loads verified top-tier job titles queried in recruiter talent search filters.',
                'Injects 4 standardized high-frequency keywords required for boolean candidate searches.',
                'Formatted specifically to retain core positioning within the 120-char mobile cutoff.'
            ]
        }
    },
    {
        id: 'product',
        role: 'Lead Growth Product Manager',
        category: 'Product & Strategy',
        gain: 32,
        before: {
            headline: 'Product Manager | Helping users solve problems | Innovator & Problem Solver',
            score: 62,
            flaws: [
                'Vague non-quantifiable value proposition without domain specialization',
                'Zero mentions of product metrics, B2B/B2C segment, or monetization',
                'Contains banned cliché filler ("Innovator & Problem Solver")'
            ]
        },
        after: {
            headline: 'Lead Growth Product Manager | B2B SaaS · PLG · Monetization & Funnel Conversion ($25M+ ARR)',
            score: 94,
            highlights: ['Lead Growth Product Manager', 'B2B SaaS', 'PLG', 'Monetization & Funnel Conversion', '$25M+ ARR'],
            mobileSnippet: 'Lead Growth Product Manager | B2B SaaS · PLG...',
            rationale: [
                'Clear domain focus (B2B SaaS, PLG) instantly matches recruiter job specs.',
                'Injects quantifiable business revenue metrics ($25M+ ARR) to establish credibility.',
                'Eliminates all AI clichés in favor of hard functional specialties.'
            ]
        }
    },
    {
        id: 'data',
        role: 'Senior Analytics & ML Engineer',
        category: 'Data & AI',
        gain: 34,
        before: {
            headline: 'Data Enthusiast & Analyst | SQL, Python, Excel | Looking for new opportunities',
            score: 60,
            flaws: [
                '"Looking for new opportunities" lowers perceived authority and search ranking',
                'Lists basic spreadsheet tools rather than high-leverage data stack keywords',
                'Missing domain outcomes (data modeling, pipeline scale, predictive AI)'
            ]
        },
        after: {
            headline: 'Senior Analytics & ML Engineer | dbt · Snowflake · Python · Predictive Modeling & Real-Time ETL',
            score: 94,
            highlights: ['Senior Analytics & ML Engineer', 'dbt', 'Snowflake', 'Python', 'Predictive Modeling & Real-Time ETL'],
            mobileSnippet: 'Senior Analytics & ML Engineer | dbt · Snowflake...',
            rationale: [
                'Removes passive status phrases that diminish algorithmic authority.',
                'Features modern data stack tools (dbt, Snowflake) targeted by high-budget teams.',
                'Highlights high-leverage production impact (Real-Time ETL, Predictive Modeling).'
            ]
        }
    }
]

export default function InteractiveAlgorithmPreview() {
    const [activeScenarioId, setActiveScenarioId] = useState('engineering')
    const scenario = SCENARIOS.find(s => s.id === activeScenarioId) || SCENARIOS[0]

    return (
        <div className="rounded-3xl bg-white border-2 border-[#dedcff] shadow-lg shadow-[#2f27ce]/5 overflow-hidden">
            {/* ── Compact Scenario Selection Tabs ────────────────── */}
            <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-[#dedcff] bg-[#dedcff]/30 flex flex-wrap items-center justify-between gap-2.5">
                <div className="inline-flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2f27ce] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2f27ce]" />
                    </span>
                    <span className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                        Interactive Algorithm Simulator
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white border border-[#dedcff] shadow-2xs">
                    {SCENARIOS.map((s) => {
                        const isActive = s.id === activeScenarioId
                        return (
                            <button
                                key={s.id}
                                onClick={() => setActiveScenarioId(s.id)}
                                className={`
                                    px-3 py-1 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer select-none leading-none
                                    ${isActive
                                        ? 'bg-[#2f27ce] text-white shadow-xs'
                                        : 'text-[#050315]/70 hover:text-[#2f27ce] hover:bg-[#dedcff]/50'
                                    }
                                `}
                            >
                                {s.category}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* ── Compact Comparison Workspace ───────────────────── */}
            <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left: Before Transformation */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#fbfbfe] border border-[#dedcff] flex flex-col justify-between space-y-3.5 transition-all">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-[10.5px] font-extrabold text-[#DC2626] uppercase tracking-wider bg-[#FEF2F2] border border-[#FECACA] px-2.5 py-0.5 rounded-full leading-none">
                                    Before · Low Recruiter Visibility
                                </span>
                                <span className="text-[11.5px] font-bold text-[#DC2626]">
                                    Score: {scenario.before.score}/100
                                </span>
                            </div>

                            <p className="text-[13.5px] text-[#050315]/75 font-medium leading-relaxed line-through decoration-[#DC2626]/50">
                                {scenario.before.headline}
                            </p>
                        </div>

                        <div className="pt-2.5 border-t border-[#dedcff]/60 space-y-1.5">
                            <p className="text-[10.5px] font-extrabold text-[#050315]/50 uppercase tracking-wider">
                                Algorithmic Penalties
                            </p>
                            <ul className="space-y-1 text-[12px] text-[#050315]/75">
                                {scenario.before.flaws.map((flaw, idx) => (
                                    <li key={idx} className="flex items-start gap-1.5">
                                        <span className="text-[#DC2626] font-bold shrink-0">✕</span>
                                        <span>{flaw}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right: After Transformation */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#2f27ce] shadow-sm shadow-[#2f27ce]/10 flex flex-col justify-between space-y-3.5 relative overflow-hidden group">
                        {/* Subtle Scanner Line Animation */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#2f27ce] to-transparent animate-scan-beam pointer-events-none" />

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center justify-center gap-1.5 text-[10.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] border border-[#dedcff] px-2.5 py-0.5 rounded-full leading-none shadow-2xs">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2f27ce] opacity-75" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2f27ce]" />
                                    </span>
                                    <span>Optimized · Top 1%</span>
                                </span>
                                <span className="inline-flex items-center gap-1 text-[11.5px] font-extrabold text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 rounded-full leading-none">
                                    Score: {scenario.after.score}/100 (+{scenario.gain} pts)
                                </span>
                            </div>

                            <p className="text-[14px] font-bold text-[#050315] leading-relaxed">
                                {scenario.after.headline}
                            </p>
                        </div>

                        <div className="pt-2.5 border-t border-[#dedcff] space-y-1.5">
                            <p className="text-[10.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                Algorithmic Improvements Applied
                            </p>
                            <ul className="space-y-1 text-[12px] text-[#050315]">
                                {scenario.after.rationale.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-1.5">
                                        <span className="text-[#2f27ce] font-extrabold shrink-0">✓</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ── Compact Mobile Simulation Bar ──────────────────── */}
                <div className="px-4 py-2.5 rounded-xl bg-[#dedcff]/20 border border-[#dedcff] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-[#2f27ce] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                            in
                        </div>
                        <div>
                            <span className="text-[10px] font-extrabold text-[#050315]/60 uppercase tracking-wider mr-2">
                                Mobile Cutoff Check:
                            </span>
                            <span className="text-[12.5px] font-bold text-[#050315]">
                                {scenario.after.mobileSnippet}
                            </span>
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#dedcff] text-[11px] font-extrabold text-[#2f27ce] shadow-2xs whitespace-nowrap leading-none">
                        <span>Zero Cutoff Risk</span>
                        <CheckIcon size={12} />
                    </div>
                </div>
            </div>
        </div>
    )
}
