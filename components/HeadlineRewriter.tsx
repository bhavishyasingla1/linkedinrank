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
        <div className="bg-white border-2 border-[#dedcff] rounded-3xl overflow-hidden aside-card-shadow">
            <div className="p-6 sm:p-8 border-b border-[#dedcff]/70 space-y-1">
                <div className="flex items-center gap-2">
                    <SparklesIcon size={16} className="text-[#2f27ce]" />
                    <h3 className="text-[12px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                        High-Converting Headline Rewrites
                    </h3>
                </div>
                <p className="text-[14px] text-[#050315]/70">
                    Choose a tailored formula that matches your target positioning and copy it directly to LinkedIn.
                </p>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
                {currentHeadline && (
                    <div className="p-4 rounded-2xl bg-[#dedcff]/20 border border-[#dedcff] space-y-1">
                        <p className="text-[11px] font-extrabold text-[#050315]/60 uppercase tracking-wider">
                            Current Headline
                        </p>
                        <p className="text-[13.5px] text-[#050315]/80 leading-relaxed">
                            {currentHeadline}
                        </p>
                    </div>
                )}

                <div className="space-y-3">
                    {rewrites.map((rewrite, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] transition-all shadow-xs group"
                        >
                            <p className="text-[14px] font-bold text-[#050315] flex-1 leading-relaxed">
                                {rewrite}
                            </p>
                            <button
                                onClick={() => handleCopy(rewrite, i)}
                                className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold bg-[#dedcff] text-[#2f27ce] hover:bg-[#2f27ce] hover:text-white transition-all cursor-pointer select-none shadow-2xs"
                            >
                                {copiedIndex === i ? (
                                    <>
                                        <CheckIcon size={13} />
                                        <span>Copied</span>
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
