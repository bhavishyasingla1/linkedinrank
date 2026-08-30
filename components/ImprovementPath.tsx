'use client'

import { ImprovementStep } from '@/lib/types'
import { SparklesIcon, TrendingUpIcon } from '@/components/ui/Icons'

interface ImprovementPathProps {
    steps: ImprovementStep[]
    currentScore: number
}

export default function ImprovementPath({ steps, currentScore }: ImprovementPathProps) {
    if (!steps || steps.length === 0) return null

    const totalGain = steps.reduce((s, step) => s + step.gain, 0)
    const targetScore = Math.min(currentScore + totalGain, 100)

    return (
        <div className="bg-white border-2 border-[#dedcff] rounded-3xl overflow-hidden aside-card-shadow space-y-0">
            <div className="p-6 sm:p-8 border-b border-[#dedcff]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <TrendingUpIcon size={16} className="text-[#2f27ce]" />
                        <h3 className="text-[12px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                            Priority Improvement Roadmap
                        </h3>
                    </div>
                    <p className="text-[14px] text-[#050315]/70">
                        High-leverage fixes sorted by potential score gain
                    </p>
                </div>
                <span className="text-[12.5px] font-extrabold text-[#2f27ce] bg-[#dedcff] px-3.5 py-1 rounded-full shadow-2xs self-start sm:self-auto">
                    +{totalGain} pts possible
                </span>
            </div>

            <div className="p-6 sm:p-8 space-y-3.5">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-[#dedcff]/20 border border-[#dedcff] hover:border-[#2f27ce] transition-colors"
                    >
                        <span className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#2f27ce] to-[#433bff] text-[#fbfbfe] text-[12px] font-black flex items-center justify-center shrink-0 shadow-xs">
                            {i + 1}
                        </span>
                        <p className="text-[14px] font-bold text-[#050315] flex-1 leading-snug">
                            {step.action}
                        </p>
                        <span className="text-[12.5px] font-extrabold text-[#2f27ce] bg-[#dedcff] px-2.5 py-1 rounded-full tabular-nums shrink-0">
                            +{step.gain} pts
                        </span>
                    </div>
                ))}
            </div>

            {/* Potential Score Gain Comparison Bar */}
            <div className="px-6 sm:px-8 py-5 bg-[#dedcff]/25 border-t border-[#dedcff]/70">
                <div className="flex items-center justify-between text-[13px] text-[#050315]/70 mb-2 font-bold">
                    <span>Current: <strong className="text-[#050315]">{currentScore}/100</strong></span>
                    <span>Potential: <strong className="text-[#2f27ce]">{targetScore}/100</strong></span>
                </div>
                <div className="h-3 bg-white border border-[#dedcff] rounded-full overflow-hidden relative shadow-inner">
                    <div
                        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff]"
                        style={{ width: `${currentScore}%` }}
                    />
                    <div
                        className="absolute top-0 h-full rounded-full bg-[#dedcff] opacity-80"
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
