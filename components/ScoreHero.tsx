'use client'

import { useEffect, useState } from 'react'
import { ShieldCheckIcon, CheckCircleIcon, SparklesIcon } from '@/components/ui/Icons'

interface ScoreHeroProps {
    score: number
    name: string
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'bronze' | 'silver' | 'gold' | 'platinum'
    peerContext: string
    role?: string
    archetype?: string
}

export default function ScoreHero({
    score,
    name,
    tier,
    peerContext,
    role,
    archetype,
}: ScoreHeroProps) {
    const [displayScore, setDisplayScore] = useState(0)

    useEffect(() => {
        const duration = 600
        const start = performance.now()

        const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplayScore(Math.round(score * eased))

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [score])

    const displayTier = tier ? tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase() : 'Gold'

    return (
        <div className="bg-white border border-[#dedcff] rounded-lg p-5 space-y-4 text-left">
            {/* Identity Header */}
            <div className="border-b border-[#dedcff] pb-3.5 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#050315]/60 font-semibold">
                        Diagnostic Audit
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2f27ce] bg-[#fbfbfe] border border-[#dedcff] px-2 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2f27ce]" />
                        <span>Live Match</span>
                    </span>
                </div>
                <h2 className="text-[17px] font-bold text-[#050315] tracking-tight truncate">
                    {name || 'LinkedIn User'}
                </h2>
                <p className="text-[12.5px] text-[#050315]/70 truncate">
                    {archetype || role || 'Multi-Potential Generalist'}
                </p>
            </div>

            {/* Score Metric Block */}
            <div className="bg-[#fbfbfe] border border-[#dedcff] rounded-md p-4 space-y-2.5">
                <div className="flex items-baseline justify-between">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#050315]/60 block mb-1">
                            Overall Score
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="font-mono text-4xl sm:text-5xl font-black text-[#050315] tracking-tight tabular-nums leading-none">
                                {displayScore}
                            </span>
                            <span className="font-mono text-sm font-semibold text-[#050315]/50">
                                /100
                            </span>
                        </div>
                    </div>

                    <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2f27ce] bg-white border border-[#dedcff] px-2 py-0.5 rounded shadow-2xs">
                            <ShieldCheckIcon size={11} /> {displayTier}
                        </span>
                        <span className="block text-[11px] text-[#050315]/60 font-mono mt-1">
                            Rank #{score >= 90 ? 'Top 5%' : score >= 80 ? 'Top 15%' : 'Top 35%'}
                        </span>
                    </div>
                </div>

                {/* Score bar */}
                <div className="space-y-1">
                    <div className="h-2 w-full bg-[#dedcff] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#2f27ce] rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${Math.max(displayScore, 4)}%` }}
                        />
                    </div>
                </div>

                {peerContext && (
                    <p className="text-[12px] text-[#050315]/75 leading-relaxed pt-1">
                        {peerContext}
                    </p>
                )}
            </div>

            {/* Meta status info */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-[#050315]/65">
                <span className="flex items-center gap-1 font-medium">
                    <CheckCircleIcon size={12} className="text-[#2f27ce]" />
                    <span>30+ Boolean Signals</span>
                </span>
                <span className="font-mono text-[#050315]/50">In-Memory Safe</span>
            </div>
        </div>
    )
}
