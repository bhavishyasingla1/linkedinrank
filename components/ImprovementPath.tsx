'use client'

import { ImprovementStep } from '@/lib/types'
import { TrendingUpIcon } from '@/components/ui/Icons'

interface ImprovementPathProps {
    steps: ImprovementStep[]
    currentScore: number
}

export default function ImprovementPath({ steps, currentScore }: ImprovementPathProps) {
    if (!steps || steps.length === 0) return null

    const totalGain = steps.reduce((s, step) => s + step.gain, 0)
    const targetScore = Math.min(currentScore + totalGain, 100)

    return (
        <div id="roadmap" className="bg-white border border-[#dedcff] rounded-lg overflow-hidden space-y-0">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#dedcff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <TrendingUpIcon size={15} className="text-[#2f27ce]" />
                    <div>
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#050315]">
                            Priority Improvement Roadmap
                        </h3>
                    </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#2f27ce] bg-[#fbfbfe] border border-[#dedcff] px-2.5 py-0.5 rounded">
                    +{totalGain} pts Potential Gain
                </span>
            </div>

            {/* Roadmap Steps */}
            <div className="p-4 sm:p-5 space-y-2.5">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between gap-3 p-3 rounded-md bg-[#fbfbfe] border border-[#dedcff] hover:border-[#2f27ce] transition-colors"
                    >
                        <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded bg-white border border-[#dedcff] text-[#2f27ce] text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                                {i + 1}
                            </span>
                            <p className="text-[12.5px] font-semibold text-[#050315] leading-snug">
                                {step.action}
                            </p>
                        </div>
                        <span className="text-[11.5px] font-mono font-bold text-[#2f27ce] bg-white border border-[#dedcff] px-2 py-0.5 rounded shrink-0 tabular-nums">
                            +{step.gain} pts
                        </span>
                    </div>
                ))}
            </div>

            {/* Potential Score Gain Bar */}
            <div className="p-4 sm:p-5 bg-[#fbfbfe] border-t border-[#dedcff] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#050315]/75">
                    <span>Baseline: <strong className="text-[#050315]">{currentScore}/100</strong></span>
                    <span>Target Potential: <strong className="text-[#2f27ce]">{targetScore}/100</strong></span>
                </div>
                <div className="h-2 bg-white border border-[#dedcff] rounded-full overflow-hidden relative">
                    <div
                        className="absolute top-0 left-0 h-full rounded-full bg-[#2f27ce]"
                        style={{ width: `${currentScore}%` }}
                    />
                    <div
                        className="absolute top-0 h-full rounded-full bg-[#dedcff]"
                        style={{
                            left: `${currentScore}%`,
                            width: `${Math.min(totalGain, 100 - currentScore)}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
