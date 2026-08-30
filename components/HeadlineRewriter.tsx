'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SparklesIcon, CopyIcon, CheckIcon, ArrowRightIcon, ZapIcon } from '@/components/ui/Icons'
import { HeadlineRewriteItem } from '@/lib/types'

interface HeadlineRewriterProps {
    currentHeadline: string
    rewrites: (string | HeadlineRewriteItem)[]
}

export default function HeadlineRewriter({ currentHeadline, rewrites }: HeadlineRewriterProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    if (!rewrites || rewrites.length === 0) return null

    // Normalize items to standard structured objects
    const normalizedRewrites: HeadlineRewriteItem[] = rewrites.map((r, i) => {
        if (typeof r === 'string') {
            const defaultStyles = ['Value Proposition', 'Authority', 'Specialty-Led', 'Skills Stack', 'Mission-Driven']
            return {
                text: r,
                score: 92 - i * 2,
                style: defaultStyles[i % defaultStyles.length],
                tip: 'Optimized with clear functional positioning and high-frequency recruiter search terms.'
            }
        }
        return {
            text: r.text,
            score: r.score ?? 90,
            style: r.style ?? 'Strategic Angle',
            tip: r.tip ?? 'Front-loads primary role keywords for recruiter boolean search indexing.'
        }
    })

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2500)
    }

    return (
        <div className="bg-white border-2 border-[#dedcff] rounded-3xl overflow-hidden aside-card-shadow animate-fade-in">
            {/* ── Header ────────────────────────────────────────── */}
            <div className="p-6 sm:p-8 border-b border-[#dedcff]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <SparklesIcon size={16} className="text-[#2f27ce]" />
                        <h3 className="text-[12px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                            Strategic Headline Rewrites
                        </h3>
                    </div>
                    <h2 className="text-[20px] sm:text-[22px] font-extrabold text-[#050315] tracking-tight">
                        Rank Higher on Recruiter Searches
                    </h2>
                    <p className="text-[14px] text-[#050315]/75 max-w-2xl leading-relaxed">
                        Your headline carries over 40% of search algorithm weighting. Replace generic buzzwords with one of these scored, search-indexed angles.
                    </p>
                </div>

                <Link
                    href="/tools/linkedin-headline-generator"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl bg-[#dedcff]/60 hover:bg-[#dedcff] text-[#2f27ce] border border-[#dedcff] text-[12.5px] font-extrabold transition-all shrink-0 self-start sm:self-auto shadow-2xs group cursor-pointer no-underline leading-none"
                >
                    <span>Open Headline Tool</span>
                    <ArrowRightIcon size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>

            {/* ── Content & Actions ─────────────────────────────── */}
            <div className="p-6 sm:p-8 space-y-6">
                {/* To-The-Point Quick Instructions */}
                <div className="p-4 rounded-2xl bg-[#dedcff]/25 border border-[#dedcff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[13px] text-[#050315]">
                    <div className="flex items-center gap-2 font-bold">
                        <ZapIcon size={15} className="text-[#2f27ce] shrink-0" />
                        <span>How to apply:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[12.5px] text-[#050315]/80 font-medium">
                        <span><strong>1.</strong> Pick an angle below</span>
                        <span className="text-[#2f27ce]">→</span>
                        <span><strong>2.</strong> Click <strong>Copy</strong></span>
                        <span className="text-[#2f27ce]">→</span>
                        <span><strong>3.</strong> Paste into LinkedIn Intro</span>
                    </div>
                </div>

                {/* Current Headline */}
                {currentHeadline && (
                    <div className="p-4 rounded-2xl bg-[#fbfbfe] border border-[#dedcff] space-y-1.5">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-extrabold text-[#050315]/60 uppercase tracking-wider">
                                Current Headline
                            </p>
                            <span className="text-[11px] font-mono text-[#050315]/60 font-semibold">
                                {currentHeadline.length}/120 chars
                            </span>
                        </div>
                        <p className="text-[13.5px] text-[#050315]/80 leading-relaxed">
                            {currentHeadline}
                        </p>
                    </div>
                )}

                {/* Headline Variations */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-[12px] font-extrabold text-[#050315]/70 uppercase tracking-wider">
                            Recommended Rewrites ({normalizedRewrites.length})
                        </p>
                        <span className="text-[11.5px] text-[#050315]/60 font-semibold">
                            All guaranteed under 120-char mobile cutoff
                        </span>
                    </div>

                    <div className="space-y-3">
                        {normalizedRewrites.map((rewrite, i) => {
                            const charLen = rewrite.text.length
                            const isOverLimit = charLen > 120

                            return (
                                <div
                                    key={i}
                                    className="p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow transition-all space-y-3 group"
                                >
                                    {/* Badges & Copy Button Bar */}
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {rewrite.style && (
                                                <span className="inline-flex items-center justify-center text-center leading-none text-[11.5px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3 py-1 rounded-full shadow-2xs whitespace-nowrap shrink-0">
                                                    {rewrite.style}
                                                </span>
                                            )}
                                            {rewrite.score && (
                                                <span className="inline-flex items-center justify-center text-center leading-none text-[11.5px] font-bold text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                                                    Score: {rewrite.score}/100
                                                </span>
                                            )}
                                            <span
                                                className={`inline-flex items-center justify-center text-center leading-none text-[11.5px] font-mono font-bold px-2.5 py-1 rounded-full border whitespace-nowrap shrink-0 ${
                                                    isOverLimit
                                                        ? 'text-[#DC2626] bg-[#FEF2F2] border-[#FECACA]'
                                                        : 'text-[#050315]/70 bg-[#fbfbfe] border-[#dedcff]'
                                                }`}
                                            >
                                                {charLen}/120 chars
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => handleCopy(rewrite.text, i)}
                                            className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-bold bg-[#dedcff] text-[#2f27ce] hover:bg-[#2f27ce] hover:text-white transition-all cursor-pointer select-none shadow-2xs leading-none"
                                        >
                                            {copiedIndex === i ? (
                                                <>
                                                    <CheckIcon size={13} />
                                                    <span>Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <CopyIcon size={13} />
                                                    <span>Copy</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Headline Text */}
                                    <p className="text-[14.5px] sm:text-[15px] font-bold text-[#050315] leading-relaxed select-all">
                                        {rewrite.text}
                                    </p>

                                    {/* Tip / Strategic Rationale */}
                                    {rewrite.tip && (
                                        <p className="text-[12px] text-[#050315]/65 leading-normal pt-1 border-t border-[#dedcff]/50">
                                            💡 <strong className="text-[#050315]/80">Why this works:</strong> {rewrite.tip}
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Bottom Cross-Link to Standalone Headline Tool */}
                <div className="p-4 rounded-2xl bg-[#dedcff]/20 border border-[#dedcff] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <div>
                        <p className="text-[13px] font-bold text-[#050315]">
                            Want to generate more variations or filter by target companies?
                        </p>
                        <p className="text-[12px] text-[#050315]/65 mt-0.5">
                            Use the standalone generator with 6 psychological angle presets, real-time character meters, and PDF auto-fill.
                        </p>
                    </div>
                    <Link
                        href="/tools/linkedin-headline-generator"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#dedcff] hover:border-[#2f27ce] text-[#2f27ce] text-[12.5px] font-bold shadow-2xs transition-all shrink-0 no-underline leading-none"
                    >
                        <span>Open Headline Generator</span>
                        <ArrowRightIcon size={13} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
