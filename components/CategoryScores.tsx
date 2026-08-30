'use client'

import { useState } from 'react'
import { CategoryScore } from '@/lib/types'
import { ChevronDownIcon, CheckCircleIcon, AlertTriangleIcon, AlertCircleIcon, LayersIcon } from '@/components/ui/Icons'

interface CategoryScoresProps {
    categories: CategoryScore[]
}

export default function CategoryScores({ categories }: CategoryScoresProps) {
    const [expanded, setExpanded] = useState<number | null>(0)

    if (!categories || categories.length === 0) return null

    return (
        <div className="bg-white border-2 border-[#dedcff] rounded-3xl overflow-hidden aside-card-shadow">
            <div className="px-6 sm:px-8 py-5 border-b border-[#dedcff]/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <LayersIcon size={16} className="text-[#2f27ce]" />
                    <h3 className="text-[12px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                        Section Breakdown &amp; Algorithmic Signals
                    </h3>
                </div>
                <span className="text-[11.5px] font-bold text-[#050315]/60">
                    {categories.length} Categories Audited
                </span>
            </div>

            <div className="divide-y divide-[#dedcff]/60">
                {categories.map((cat, i) => {
                    const isExpanded = expanded === i
                    const isStrong = cat.percentage >= 70
                    const isNeedsWork = cat.percentage >= 45 && cat.percentage < 70
                    const isWeak = cat.percentage < 45

                    return (
                        <div key={i} className="transition-colors">
                            <button
                                className="w-full flex items-center justify-between gap-4 px-6 sm:px-8 py-5 hover:bg-[#dedcff]/15 transition-colors cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f27ce]"
                                onClick={() => setExpanded(isExpanded ? null : i)}
                                aria-expanded={isExpanded}
                            >
                                <div className="flex-1 min-w-0 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[15px] font-bold text-[#050315]">
                                            {cat.category}
                                        </span>
                                        <div className="flex items-center gap-2.5">
                                            <span className={`inline-flex items-center justify-center text-center leading-none text-[11.5px] font-bold px-3 py-1.5 rounded-full shadow-2xs ${
                                                isStrong
                                                    ? 'bg-[#dedcff] text-[#2f27ce]'
                                                    : isNeedsWork
                                                    ? 'bg-amber-100 text-amber-800'
                                                    : 'bg-rose-100 text-rose-700'
                                            }`}>
                                                {isStrong ? 'Strong' : isNeedsWork ? 'Needs Polish' : 'Weak'}
                                            </span>
                                            <span className="text-[13.5px] font-extrabold tabular-nums text-[#050315]">
                                                {cat.earnedPoints}/{cat.maxPoints} pts
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-[#dedcff]/50 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ease-out ${
                                                isStrong
                                                    ? 'bg-gradient-to-r from-[#2f27ce] to-[#433bff]'
                                                    : isNeedsWork
                                                    ? 'bg-amber-500'
                                                    : 'bg-rose-500'
                                            }`}
                                            style={{ width: `${Math.max(cat.percentage, 5)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className={`w-8 h-8 rounded-full bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 ml-3 transition-transform duration-200 ${isExpanded ? 'rotate-180 bg-[#2f27ce] text-white' : ''}`}>
                                    <ChevronDownIcon size={16} />
                                </div>
                            </button>

                            {cat.breakdown && cat.breakdown.length > 0 && isExpanded && (
                                <div className="px-6 sm:px-8 pb-5 pt-2 bg-[#dedcff]/10 border-t border-[#dedcff]/60 animate-fade-in space-y-2.5">
                                    {cat.breakdown.map((item, j) => {
                                        const isPositive = item.startsWith('✓') || item.startsWith('✔')
                                        const isNegative = item.startsWith('○') || item.startsWith('✗') || item.startsWith('✘')
                                        const cleanItem = item.replace(/^[✓✔○✗✘]\s*/, '')

                                        return (
                                            <div key={j} className="flex items-start gap-2.5 text-[13.5px]">
                                                {isPositive ? (
                                                    <CheckCircleIcon size={16} className="text-[#2f27ce] shrink-0 mt-0.5" />
                                                ) : isNegative ? (
                                                    <AlertTriangleIcon size={16} className="text-amber-600 shrink-0 mt-0.5" />
                                                ) : (
                                                    <span className="w-2 h-2 rounded-full bg-[#2f27ce] shrink-0 mt-1.5" />
                                                )}
                                                <span className="text-[#050315]/80 leading-relaxed">
                                                    {cleanItem}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
