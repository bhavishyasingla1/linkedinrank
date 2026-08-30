import React from 'react'
import { ShieldCheckIcon, AlertCircleIcon, CheckCircleIcon, SparklesIcon } from '@/components/ui/Icons'

export interface FactCheckCardProps {
    claim: string
    claimant?: string
    rating: 'False' | 'Mostly false' | 'Half true' | 'Mostly true' | 'True'
    explanation: string
    keyTakeaway?: string
    methodology?: string
    className?: string
}

export default function FactCheckCard({
    claim,
    claimant = 'Common Profile Myth',
    rating,
    explanation,
    keyTakeaway,
    methodology = 'Evaluated against LinkedIn search indexing data & 30+ recruiter search signals.',
    className = '',
}: FactCheckCardProps) {
    const isFalse = rating === 'False' || rating === 'Mostly false'
    const isTrue = rating === 'True' || rating === 'Mostly true'

    const badgeStyles = isFalse
        ? 'bg-rose-50 border-rose-200 text-rose-700'
        : isTrue
        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
        : 'bg-amber-50 border-amber-200 text-amber-700'

    const badgeDot = isFalse
        ? 'bg-rose-600'
        : isTrue
        ? 'bg-emerald-600'
        : 'bg-amber-500'

    return (
        <div
            className={`my-8 p-6 sm:p-7 rounded-3xl bg-white border-2 border-[#dedcff] aside-card-shadow space-y-4 ${className}`}
        >
            {/* Header: Fact Check Badge & Review Rating */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#dedcff]/70">
                <div className="inline-flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#dedcff] text-[#2f27ce] flex items-center justify-center">
                        <ShieldCheckIcon size={14} />
                    </span>
                    <div>
                        <span className="text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider block">
                            Algorithm Fact Check
                        </span>
                        <span className="text-[12px] text-[#050315]/60">
                            Claim origin: <strong className="text-[#050315]">{claimant}</strong>
                        </span>
                    </div>
                </div>

                <div
                    className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[12.5px] font-bold shadow-2xs ${badgeStyles}`}
                >
                    <span className={`w-2 h-2 rounded-full ${badgeDot} animate-pulse`} />
                    <span>Verdict: {rating}</span>
                </div>
            </div>

            {/* The Evaluated Claim */}
            <div className="space-y-1.5">
                <p className="text-[11.5px] font-bold text-[#050315]/60 uppercase tracking-wider">
                    Claim Reviewed
                </p>
                <blockquote className="p-3.5 sm:p-4 rounded-2xl bg-[#dedcff]/20 border-l-4 border-[#2f27ce] text-[15px] sm:text-[16px] text-[#050315] font-semibold italic leading-snug">
                    &ldquo;{claim}&rdquo;
                </blockquote>
            </div>

            {/* The Assessment / Explanation */}
            <div className="space-y-1.5 pt-1">
                <p className="text-[11.5px] font-bold text-[#050315]/60 uppercase tracking-wider">
                    Diagnostic Finding
                </p>
                <p className="text-[14px] sm:text-[14.5px] text-[#050315]/80 leading-relaxed">
                    {explanation}
                </p>
            </div>

            {/* Key Takeaway / Action */}
            {keyTakeaway && (
                <div className="p-4 rounded-2xl bg-[#fbfbfe] border border-[#dedcff] flex items-start gap-2.5">
                    <span className="text-[#2f27ce] mt-0.5 shrink-0">
                        <SparklesIcon size={14} />
                    </span>
                    <p className="text-[13px] text-[#050315] font-medium leading-relaxed">
                        <strong className="text-[#2f27ce]">The Fix:</strong> {keyTakeaway}
                    </p>
                </div>
            )}

            {/* Footer Methodology & Transparency */}
            <div className="pt-2 flex items-center justify-between text-[11.5px] text-[#050315]/50 flex-wrap gap-2">
                <span>{methodology}</span>
                <span className="font-semibold text-[#2f27ce]">Verified by LinkedInRank</span>
            </div>
        </div>
    )
}
