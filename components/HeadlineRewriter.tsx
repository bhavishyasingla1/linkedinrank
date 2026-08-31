'use client'

import { useState } from 'react'
import { HeadlineRewriteItem } from '@/lib/types'
import { CopyIcon, CheckIcon, SparklesIcon } from '@/components/ui/Icons'

interface HeadlineRewriterProps {
    currentHeadline: string
    rewrites: (string | HeadlineRewriteItem)[]
}

export default function HeadlineRewriter({ currentHeadline, rewrites }: HeadlineRewriterProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    if (!rewrites || !Array.isArray(rewrites) || rewrites.length === 0) return null

    // Normalize items to standard structured objects with clear titles and bulleted why-it-works
    const normalizedRewrites = rewrites.slice(0, 3).map((r, i) => {
        const optionTitles = [
            'Option 1: Role + Impact Focus',
            'Option 2: Industry Authority & Core Skills',
            'Option 3: Builder & Hands-On Specialization'
        ]

        if (typeof r === 'string') {
            return {
                title: optionTitles[i % optionTitles.length],
                text: r || 'Target Role | Specific Industry Skill & Measurable Outcome',
                bullets: [
                    'Features high-priority search terms recruiters filter for in candidate searches.',
                    'Engineered under 120 characters to prevent mobile preview truncation.'
                ]
            }
        }

        const safeObj = r || {}
        const rawText = typeof safeObj.text === 'string' ? safeObj.text : String(safeObj.text || '')
        const text = rawText.trim() || 'Target Role | Specific Industry Skill & Measurable Outcome'

        const bullets: string[] = []
        if (typeof safeObj.tip === 'string' && safeObj.tip.trim()) {
            bullets.push(safeObj.tip.trim())
        } else {
            bullets.push('Front-loads target job titles for recruiter search filters.')
        }
        bullets.push('Fits cleanly within standard LinkedIn mobile character limits.')

        return {
            title: safeObj.style ? `Option ${i + 1}: ${safeObj.style}` : optionTitles[i % optionTitles.length],
            text,
            bullets
        }
    })

    const handleCopy = (text: string, index: number) => {
        try {
            navigator.clipboard.writeText(text)
            setCopiedIndex(index)
            setTimeout(() => setCopiedIndex(null), 2500)
        } catch {
            setCopiedIndex(index)
            setTimeout(() => setCopiedIndex(null), 2500)
        }
    }

    return (
        <div className="bg-white border-2 border-[#dedcff] rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 space-y-5 sm:space-y-6 aside-card-shadow overflow-hidden">
            <div className="space-y-1 border-b border-[#dedcff]/70 pb-3.5 sm:pb-4">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 shadow-2xs">
                        <SparklesIcon size={16} />
                    </div>
                    <h3 className="text-[17px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        Recommended Headlines
                    </h3>
                </div>
                <p className="text-[13px] sm:text-[14.5px] text-[#050315]/75 leading-relaxed">
                    Click <strong>Copy</strong> to use any of these pre-optimized headlines on your LinkedIn profile.
                </p>
            </div>

            {/* Stacked Mobile Cards */}
            <div className="space-y-3.5 sm:space-y-4">
                {normalizedRewrites.map((item, i) => {
                    const isCopied = copiedIndex === i

                    return (
                        <div
                            key={i}
                            className="bg-[#fbfbfe] border border-[#dedcff] rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3.5 sm:space-y-4 transition-colors overflow-hidden"
                        >
                            {/* Option Title */}
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[12px] sm:text-[13.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider truncate">
                                    {item.title}
                                </span>
                                <span className="text-[11px] sm:text-[11.5px] font-mono text-[#050315]/60 tabular-nums font-semibold shrink-0">
                                    {item.text.length} / 120 chars
                                </span>
                            </div>

                            {/* Headline Text Chip */}
                            <div className="bg-white border border-[#dedcff] rounded-lg sm:rounded-xl p-3.5 sm:p-4 text-[13.5px] sm:text-[15.5px] font-bold text-[#050315] leading-relaxed select-all shadow-2xs break-words overflow-hidden">
                                {item.text}
                            </div>

                            {/* Why It Works (Bulleted) */}
                            <div className="space-y-1 pt-0.5">
                                <span className="text-[10.5px] sm:text-[11.5px] font-extrabold text-[#050315]/70 uppercase tracking-wider block">
                                    Why it works:
                                </span>
                                <ul className="space-y-1 text-[12.5px] sm:text-[14px] text-[#050315]/80 list-disc list-inside">
                                    {item.bullets.map((bullet, j) => (
                                        <li key={j} className="leading-relaxed break-words">
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Full-width touch-friendly button */}
                            <button
                                onClick={() => handleCopy(item.text, i)}
                                className="w-full min-h-[44px] py-3 px-5 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-white text-[13px] sm:text-[14.5px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
                            >
                                {isCopied ? (
                                    <>
                                        <CheckIcon size={16} />
                                        <span>Copied to Clipboard</span>
                                    </>
                                ) : (
                                    <>
                                        <CopyIcon size={16} />
                                        <span>Copy Headline</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
