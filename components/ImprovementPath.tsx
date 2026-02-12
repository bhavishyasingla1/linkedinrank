'use client'

import { ImprovementStep } from '@/lib/types'

interface ImprovementPathProps {
    steps: ImprovementStep[]
    currentScore: number
}

export default function ImprovementPath({ steps, currentScore }: ImprovementPathProps) {
    if (!steps || steps.length === 0) return null

    const totalGain = steps.reduce((s, step) => s + step.gain, 0)
    const targetScore = Math.min(currentScore + totalGain, 100)

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 pt-5 pb-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">Improvement Path</h3>
                    <span className="text-[11px] font-bold text-emerald-600">+{totalGain} pts possible</span>
                </div>

                <div className="space-y-2">
                    {steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#F8FAFC]">
                            <span className="w-5 h-5 rounded-full bg-[#0A66C2] text-white text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                            <p className="text-xs font-medium text-[#0A0F1C] flex-1 leading-snug">{step.action}</p>
                            <span className="text-[11px] font-bold text-emerald-600 tabular-nums shrink-0">+{step.gain}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-100 px-5 py-3.5">
                <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="text-[#6B7280]">Now <strong className="text-[#0A0F1C]">{currentScore}</strong></span>
                    <span className="text-[#6B7280]">Potential <strong className="text-[#0A0F1C]">{targetScore}</strong></span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden relative">
                    <div
                        className="absolute top-0 left-0 h-full rounded-full bg-[#0A66C2]"
                        style={{ width: `${currentScore}%` }}
                    />
                    <div
                        className="absolute top-0 h-full rounded-full bg-[#0A66C2]/15"
                        style={{ left: `${currentScore}%`, width: `${Math.min(totalGain, 100 - currentScore)}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
