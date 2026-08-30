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
        category: 'Engineering',
        gain: 36,
        before: {
            headline: 'Software Engineer at Tech Corp | Passionate coder | Building cool tech & solving problems',
            score: 58,
            flaws: [
                'Generic buzzwords ("passionate coder") ignored by recruiter search filters',
                'Missing high-intent core skills (Go, Kubernetes, Cloud Architecture)'
            ]
        },
        after: {
            headline: 'Staff Platform Engineer | Distributed Systems · Go · Kubernetes · Cloud Architecture',
            score: 94,
            mobileSnippet: 'Staff Platform Engineer | Distributed Systems · Go...',
            improvements: [
                'Front-loads target executive job title in first 30 characters',
                'Injects 4 standardized recruiter search skill categories'
            ]
        }
    },
    {
        id: 'product',
        category: 'Product',
        gain: 32,
        before: {
            headline: 'Product Manager | Helping users solve problems | Innovator & Customer Champion',
            score: 62,
            flaws: [
                'Vague generalist proposition without domain specialization',
                'Zero commercial metrics or quantifiable business proof'
            ]
        },
        after: {
            headline: 'Lead Growth Product Manager | B2B SaaS · PLG · Monetization ($25M+ ARR)',
            score: 94,
            mobileSnippet: 'Lead Growth Product Manager | B2B SaaS · PLG...',
            improvements: [
                'Precise domain specialization (B2B SaaS & Product-Led Growth)',
                'Injects high-signal commercial revenue proof ($25M+ ARR)'
            ]
        }
    },
    {
        id: 'data',
        category: 'Data & AI',
        gain: 34,
        before: {
            headline: 'Data Analyst | SQL, Python, Excel | Open to work and looking for new opportunities',
            score: 60,
            flaws: [
                '"Looking for opportunities" lowers recruiter algorithmic ranking weight',
                'Missing modern data stack infrastructure (dbt, Snowflake, ETL)'
            ]
        },
        after: {
            headline: 'Senior Analytics Engineer | dbt · Snowflake · Python · Real-Time ETL & ML',
            score: 94,
            mobileSnippet: 'Senior Analytics Engineer | dbt · Snowflake...',
            improvements: [
                'Standardized against modern high-leverage data stack queries',
                'Highlights production ETL and machine learning capability'
            ]
        }
    }
]

export default function InteractiveAlgorithmPreview() {
    const [activeScenarioId, setActiveScenarioId] = useState('engineering')
    const scenario = SCENARIOS.find(s => s.id === activeScenarioId) || SCENARIOS[0]

    return (
        <div className="rounded-3xl bg-white border-2 border-[#dedcff] shadow-xl shadow-[#2f27ce]/5 overflow-hidden">
            {/* ── Top Bar Controls ───────────────────────────── */}
            <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-[#dedcff] bg-[#dedcff]/20 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2f27ce] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2f27ce]" />
                    </span>
                    <span className="text-[12.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                        Live Algorithmic Diagnosis
                    </span>
                </div>

                {/* Segmented Category Filter */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#dedcff] shadow-xs">
                    {SCENARIOS.map((s) => {
                        const isActive = s.id === activeScenarioId
                        return (
                            <button
                                key={s.id}
                                onClick={() => setActiveScenarioId(s.id)}
                                className={`
                                    px-4 py-2 rounded-lg text-[13px] font-extrabold transition-all cursor-pointer select-none leading-none
                                    ${isActive
                                        ? 'bg-gradient-to-r from-[#2f27ce] to-[#433bff] text-[#fbfbfe] shadow-sm shadow-[#2f27ce]/25'
                                        : 'text-[#050315]/75 hover:text-[#2f27ce] hover:bg-[#dedcff]/40'
                                    }
                                `}
                            >
                                {s.category}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* ── 2-Column Comparison ────────────────────── */}
            <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Before Card */}
                    <div className="p-6 sm:p-7 rounded-2xl bg-[#fbfbfe] border border-[#dedcff] flex flex-col justify-between space-y-4 shadow-xs">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-extrabold text-[#DC2626] uppercase tracking-wider bg-[#FEF2F2] border border-[#FECACA] px-3 py-1 rounded-full leading-none">
                                    Before Optimization
                                </span>
                                <span className="text-[13.5px] font-extrabold text-[#DC2626]">
                                    Score: {scenario.before.score}/100
                                </span>
                            </div>

                            <p className="text-[15px] sm:text-[16px] text-[#050315]/80 font-medium leading-relaxed line-through decoration-[#DC2626]/50 pt-1">
                                {scenario.before.headline}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-[#dedcff] space-y-2 text-[13px] text-[#050315]/80">
                            {scenario.before.flaws.map((flaw, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 leading-snug">
                                    <span className="text-[#DC2626] font-extrabold text-[15px] shrink-0 leading-none">✕</span>
                                    <span>{flaw}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* After Card */}
                    <div className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#2f27ce] shadow-lg shadow-[#2f27ce]/10 flex flex-col justify-between space-y-4 relative overflow-hidden group">
                        {/* Subtle Scanner Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2f27ce] to-transparent animate-scan-beam pointer-events-none" />

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-3 py-1 rounded-full leading-none shadow-2xs">
                                    <span className="relative flex h-2 w-2 shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2f27ce] opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2f27ce]" />
                                    </span>
                                    <span>Rank #1 Optimized</span>
                                </span>
                                <span className="text-[13.5px] font-extrabold text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-3 py-1 rounded-full leading-none shadow-2xs">
                                    Score: {scenario.after.score}/100 (+{scenario.gain} pts)
                                </span>
                            </div>

                            <p className="text-[15.5px] sm:text-[16.5px] font-extrabold text-[#050315] leading-relaxed pt-1">
                                {scenario.after.headline}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-[#dedcff] space-y-2 text-[13px] text-[#050315] font-medium">
                            {scenario.after.improvements.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 leading-snug">
                                    <span className="text-[#2f27ce] font-black text-[15px] shrink-0 leading-none">✓</span>
                                    <span>{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Mobile Snippet Footer Bar ──────────────── */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#dedcff]/30 border border-[#dedcff] flex flex-col sm:flex-row items-center justify-between gap-3 text-[13.5px]">
                    <div className="flex items-center gap-2 text-[#050315]">
                        <span className="font-extrabold text-[#2f27ce]">Mobile Preview:</span>
                        <span className="font-semibold text-[#050315]">&ldquo;{scenario.after.mobileSnippet}&rdquo;</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 font-extrabold text-[#2f27ce] bg-white px-3.5 py-1.5 rounded-full border border-[#dedcff] shadow-xs leading-none shrink-0">
                        <CheckIcon size={13} />
                        <span>Fits 120-Char Mobile Cutoff</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
