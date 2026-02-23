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
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 pt-5 pb-4">
                <h3 className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-4">Headline Alternatives</h3>

                {currentHeadline && (
                    <div className="px-3.5 py-3 rounded-lg bg-[#F8FAFC] border border-gray-100 mb-3">
                        <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-1">Current</p>
                        <p className="text-sm text-[#4B5563] leading-relaxed">{currentHeadline}</p>
                    </div>
                )}

                <div className="space-y-2">
                    {rewrites.map((rewrite, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] hover:border-[#0A66C2]/40 transition-all"
                        >
                            <p className="text-sm font-medium text-[#0A0F1C] flex-1 leading-relaxed">{rewrite}</p>
                            <button
                                onClick={() => handleCopy(rewrite, i)}
                                className="shrink-0 text-xs text-[#0A66C2] hover:underline font-medium"
                            >
                                {copiedIndex === i ? '✓ Copied' : 'Copy'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
