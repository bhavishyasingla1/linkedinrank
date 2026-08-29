'use client'

import { useState } from 'react'
import { CategoryScore } from '@/lib/types'
import { ChevronDownIcon, CheckCircleIcon, AlertTriangleIcon, AlertCircleIcon } from '@/components/ui/Icons'

interface CategoryScoresProps {
    categories: CategoryScore[]
}

export default function CategoryScores({ categories }: CategoryScoresProps) {
    const [expanded, setExpanded] = useState<number | null>(0)

    if (!categories || categories.length === 0) return null

    return (
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs">
            <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-[#F1F5F9]">
                <h3 className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider">
                    Section Breakdown &amp; Signals
                </h3>
            </div>

            <div className="divide-y divide-[#F1F5F9]">
                {categories.map((cat, i) => {
                    const isExpanded = expanded === i
                    const isStrong = cat.percentage >= 70
                    const isNeedsWork = cat.percentage >= 45 && cat.percentage < 70
                    const isWeak = cat.percentage < 45

                    const statusBadgeColor = isStrong
                        ? 'text-[#16A34A] bg-[#F0FDF4] border-[#BBF7D0]'
                        : isNeedsWork
                        ? 'text-[#D97706] bg-[#FFFBEB] border-[#FDE68A]'
                        : 'text-[#DC2626] bg-[#FEF2F2] border-[#FECACA]'

                    const barColor = isStrong
                        ? 'bg-[#0A66C2]'
                        : isNeedsWork
                        ? 'bg-[#D97706]'
                        : 'bg-[#DC2626]'

                    return (
                        <div key={i} className="transition-colors">
                            <button
                                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 hover:bg-[#FAFAFA] transition-colors cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]"
                                onClick={() => setExpanded(isExpanded ? null : i)}
                                aria-expanded={isExpanded}
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-[14px] font-semibold text-[#0F172A]">
                                            {cat.category}
                                        </span>
                                        <div className="flex items-center gap-2.5">
                                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${statusBadgeColor}`}>
                                                {isStrong ? 'Strong' : isNeedsWork ? 'Needs Polish' : 'Weak'}
                                            </span>
                                            <span className="text-[13px] font-bold tabular-nums text-[#0F172A]">
                                                {cat.earnedPoints}/{cat.maxPoints} pts
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
                                            style={{ width: `${Math.max(cat.percentage, 4)}%` }}
                                        />
                                    </div>
                                </div>

                                <ChevronDownIcon
                                    size={16}
                                    className={`text-[#64748B] transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180 text-[#0A66C2]' : ''}`}
                                />
                            </button>

                            {cat.breakdown && cat.breakdown.length > 0 && isExpanded && (
                                <div className="px-5 sm:px-6 pb-4 pt-1 bg-[#FAFAFA] border-t border-[#F1F5F9] animate-fade-in">
                                    <div className="space-y-2 pt-2">
                                        {cat.breakdown.map((item, j) => {
                                            const isPositive = item.startsWith('✓') || item.startsWith('✔')
                                            const isNegative = item.startsWith('○') || item.startsWith('✗') || item.startsWith('✘')
                                            const cleanItem = item.replace(/^[✓✔○✗✘]\s*/, '')

                                            return (
                                                <div key={j} className="flex items-start gap-2.5 text-[13px]">
                                                    {isPositive ? (
                                                        <CheckCircleIcon size={15} className="text-[#16A34A] shrink-0 mt-0.5" />
                                                    ) : isNegative ? (
                                                        <AlertTriangleIcon size={15} className="text-[#D97706] shrink-0 mt-0.5" />
                                                    ) : (
                                                        <span className="w-3.5 h-3.5 rounded-full bg-[#CBD5E1] shrink-0 mt-1" />
                                                    )}
                                                    <span className="text-[#334155] leading-relaxed">
                                                        {cleanItem}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
