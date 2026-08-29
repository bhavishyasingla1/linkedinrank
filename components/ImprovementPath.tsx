'use client'

import { ImprovementStep } from '@/lib/types'
import { SparklesIcon } from '@/components/ui/Icons'

interface ImprovementPathProps {
    steps: ImprovementStep[]
    currentScore: number
}

export default function ImprovementPath({ steps, currentScore }: ImprovementPathProps) {
    if (!steps || steps.length === 0) return null

    const totalGain = steps.reduce((s, step) => s + step.gain, 0)
    const targetScore = Math.min(currentScore + totalGain, 100)

    return (
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs">
            <div className="p-5 sm:p-6 border-b border-[#F1F5F9] flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider">
                        Priority Improvement Roadmap
                    </h3>
                    <p className="text-[13px] text-[#475569] mt-0.5">
                        High-leverage fixes sorted by potential score gain
                    </p>
                </div>
                <span className="text-[12px] font-bold text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-2.5 py-1 rounded-md">
                    +{totalGain} pts possible
                </span>
            </div>

            <div className="p-5 sm:p-6 space-y-3">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3.5 p-3.5 rounded-lg bg-[#FAFAFA] border border-[#E2E8F0]"
                    >
                        <span className="w-6 h-6 rounded-md bg-[#0F172A] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                        </span>
                        <p className="text-[13px] font-medium text-[#0F172A] flex-1 leading-snug">
                            {step.action}
                        </p>
                        <span className="text-[12px] font-bold text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 rounded tabular-nums shrink-0">
                            +{step.gain} pts
                        </span>
                    </div>
                ))}
            </div>

            {/* Potential Score Gain Comparison Bar */}
            <div className="px-5 sm:px-6 py-4 bg-[#FAFAFA] border-t border-[#F1F5F9]">
                <div className="flex items-center justify-between text-[12px] text-[#64748B] mb-2 font-medium">
                    <span>Current: <strong className="text-[#0F172A]">{currentScore}/100</strong></span>
                    <span>Potential: <strong className="text-[#0A66C2]">{targetScore}/100</strong></span>
                </div>
                <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden relative">
                    <div
                        className="absolute top-0 left-0 h-full rounded-full bg-[#0A66C2]"
                        style={{ width: `${currentScore}%` }}
                    />
                    <div
                        className="absolute top-0 h-full rounded-full bg-[#38BDF8]"
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
