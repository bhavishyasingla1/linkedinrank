'use client'

import { useState } from 'react'
import { SparklesIcon, CopyIcon, CheckIcon } from '@/components/ui/Icons'

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
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs">
            <div className="p-5 sm:p-6 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-2 mb-1">
                    <SparklesIcon size={16} className="text-[#0A66C2]" />
                    <h3 className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider">
                        Headline Alternatives
                    </h3>
                </div>
                <p className="text-[13px] text-[#475569]">
                    Choose a headline that matches your current positioning and copy it directly to your LinkedIn profile.
                </p>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
                {currentHeadline && (
                    <div className="p-3.5 rounded-lg bg-[#FAFAFA] border border-[#E2E8F0]">
                        <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
                            Current Headline
                        </p>
                        <p className="text-[13px] text-[#475569] leading-relaxed">
                            {currentHeadline}
                        </p>
                    </div>
                )}

                <div className="space-y-2.5">
                    {rewrites.map((rewrite, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between gap-3 p-3.5 rounded-lg bg-[#F0F7FF]/60 border border-[#BAE0FD] hover:border-[#0A66C2] transition-colors"
                        >
                            <p className="text-[13px] font-medium text-[#0F172A] flex-1 leading-relaxed">
                                {rewrite}
                            </p>
                            <button
                                onClick={() => handleCopy(rewrite, i)}
                                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold bg-white border border-[#BAE0FD] text-[#0A66C2] hover:bg-[#F0F7FF] transition-colors cursor-pointer select-none"
                            >
                                {copiedIndex === i ? (
                                    <>
                                        <CheckIcon size={13} className="text-[#16A34A]" />
                                        <span className="text-[#16A34A]">Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <CopyIcon size={13} />
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
