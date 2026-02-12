'use client'

import { useState } from 'react'

interface HeadlineRewriterProps {
    currentHeadline: string
    rewrites: string[]
}

export default function HeadlineRewriter({ currentHeadline, rewrites }: HeadlineRewriterProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    if (!rewrites || rewrites.length === 0) return null

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            <h3 className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-5">Headline Alternatives</h3>

            {currentHeadline && (
                <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-gray-100 mb-4">
                    <p className="text-xs font-semibold text-[#9CA3AF] mb-1">Current</p>
                    <p className="text-sm text-[#4B5563]">{currentHeadline}</p>
                </div>
            )}

            <div className="space-y-2.5">
                {rewrites.map((rewrite, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between gap-3 p-3.5 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] hover:border-[#0A66C2]/30 transition-all"
                    >
                        <p className="text-sm font-medium text-[#0A0F1C] flex-1">{rewrite}</p>
                        <button
                            onClick={() => handleCopy(rewrite, i)}
                            className="shrink-0 text-xs px-3.5 py-1.5 rounded-lg bg-white border border-gray-200 text-[#4B5563] hover:text-[#0A0F1C] hover:border-gray-300 hover:shadow-sm transition-all font-semibold"
                        >
                            {copiedIndex === i ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
