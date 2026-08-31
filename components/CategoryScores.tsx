'use client'

import { CategoryScore } from '@/lib/types'
import { LayersIcon } from '@/components/ui/Icons'

interface CategoryScoresProps {
    categories: CategoryScore[]
}

export default function CategoryScores({ categories }: CategoryScoresProps) {
    if (!categories || !Array.isArray(categories) || categories.length === 0) return null

    return (
        <div className="bg-white border-2 border-[#dedcff] rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 space-y-4 sm:space-y-5 aside-card-shadow overflow-hidden">
            <div className="space-y-1 border-b border-[#dedcff]/70 pb-3.5 sm:pb-4">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 shadow-2xs">
                        <LayersIcon size={16} />
                    </div>
                    <h3 className="text-[17px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        Section Health Breakdown
                    </h3>
                </div>
                <p className="text-[13px] sm:text-[14.5px] text-[#050315]/75 leading-relaxed">
                    How each section of your LinkedIn profile scores against recruiter search algorithms.
                </p>
            </div>

            <div className="space-y-3.5 sm:space-y-4 pt-0.5">
                {categories.map((cat, i) => {
                    const rawPct = typeof cat.percentage === 'number' ? cat.percentage : 0
                    const pct = Math.max(0, Math.min(100, Math.round(rawPct)))
                    const earned = typeof cat.earnedPoints === 'number' ? cat.earnedPoints : Math.round((pct / 100) * (cat.maxPoints || 20))
                    const max = typeof cat.maxPoints === 'number' ? cat.maxPoints : 20

                    const isHigh = pct >= 80
                    const isMed = pct >= 60 && pct < 80

                    const badgeColor = isHigh
                        ? 'bg-[#dedcff] text-[#2f27ce] border-[#dedcff]'
                        : isMed
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'

                    return (
                        <div key={i} className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center justify-between gap-2 text-[13px] sm:text-[14.5px]">
                                <span className="font-bold text-[#050315] truncate">
                                    {cat.category || 'Profile Section'}
                                </span>
                                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                                    <span className="font-semibold text-[#050315]/70 tabular-nums text-[12px] sm:text-[14px]">
                                        {earned} / {max} pts
                                    </span>
                                    <span className={`text-[10.5px] sm:text-[11.5px] font-extrabold px-2 py-0.5 sm:px-2.5 rounded-full border tabular-nums shadow-2xs ${badgeColor}`}>
                                        {pct}%
                                    </span>
                                </div>
                            </div>

                            {/* Thin, clean progress bar */}
                            <div className="h-2 sm:h-2.5 w-full bg-[#dedcff]/50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${Math.max(pct, 4)}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
