'use client'

import React from 'react'
import { GoogleIcon } from '@/components/ui/Icons'

const PREFERRED_SOURCE_DEEPLINK = 'https://www.google.com/preferences/source?q=linkedinrank.com'

interface GooglePreferredSourceProps {
    variant?: 'card' | 'banner' | 'footer' | 'button' | 'inline'
    theme?: 'light' | 'dark'
    className?: string
    title?: string
    description?: string
}

export default function GooglePreferredSource({
    variant = 'button',
    className = '',
    title,
    description,
}: GooglePreferredSourceProps) {
    const handleAddClick = (e: React.MouseEvent) => {
        if (typeof window !== 'undefined' && window.preferredSource?.addPreferredSource) {
            e.preventDefault()
            window.preferredSource.addPreferredSource()
        }
    }

    // 1. Standalone / Badge / Button variant
    if (variant === 'button') {
        return (
            <div className={`inline-flex flex-col items-start ${className}`}>
                <a
                    href={PREFERRED_SOURCE_DEEPLINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleAddClick}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#f8f9fa] border border-[#dadce0] text-[#3c4043] hover:text-[#202124] text-[12.5px] font-medium transition-all shadow-2xs hover:shadow-xs no-underline cursor-pointer select-none leading-none"
                >
                    <GoogleIcon size={14} />
                    <span>Add to Preferred Sources</span>
                </a>
            </div>
        )
    }

    // 2. Footer variant
    if (variant === 'footer') {
        return (
            <div className={`space-y-2.5 ${className}`}>
                <div className="flex items-center gap-1.5 text-[12px] font-extrabold text-[#050315] uppercase tracking-wider">
                    <GoogleIcon size={14} />
                    <span>Google Search</span>
                </div>
                <p className="text-[12.5px] text-[#050315]/70 leading-relaxed max-w-xs">
                    Add LinkedInRank as a preferred source to see verified recruiter algorithm updates in Google Search.
                </p>
                <div className="pt-0.5">
                    <a
                        href={PREFERRED_SOURCE_DEEPLINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleAddClick}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#f8f9fa] border border-[#dadce0] text-[#3c4043] hover:text-[#202124] text-[12px] font-medium transition-all shadow-2xs hover:shadow-xs no-underline cursor-pointer select-none leading-none"
                    >
                        <GoogleIcon size={14} />
                        <span>Add to Preferred Sources</span>
                    </a>
                </div>
            </div>
        )
    }

    // 3. Banner / Inline variant (for bottoms of articles and tool landing pages)
    if (variant === 'banner' || variant === 'inline') {
        return (
            <div
                className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#fbfbfe] via-white to-[#dedcff]/30 border border-[#dedcff] aside-card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4 ${className}`}
            >
                <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2f27ce] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2f27ce]" />
                        </span>
                        <span className="text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                            Google Search
                        </span>
                    </div>
                    <h4 className="text-[16px] sm:text-[18px] font-extrabold text-[#050315] tracking-tight">
                        {title || 'Add LinkedInRank to Preferred Sources'}
                    </h4>
                    <p className="text-[13px] text-[#050315]/75 leading-relaxed">
                        {description ||
                            'Get recruiter algorithm teardowns, ATS scoring benchmarks, and headline formulas highlighted directly in your Google Search and AI Overviews.'}
                    </p>
                </div>

                <div className="shrink-0">
                    <a
                        href={PREFERRED_SOURCE_DEEPLINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleAddClick}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#f8f9fa] border border-[#dadce0] text-[#202124] text-[13px] font-medium transition-all shadow-2xs hover:shadow-xs no-underline cursor-pointer select-none leading-none"
                    >
                        <GoogleIcon size={16} />
                        <span>Add to Preferred Sources</span>
                    </a>
                </div>
            </div>
        )
    }

    // 4. Card variant (for blog & guide sidebars)
    return (
        <div
            className={`p-5 rounded-2xl bg-gradient-to-br from-white via-[#fbfbfe] to-[#dedcff]/30 border border-[#dedcff] aside-card-shadow space-y-3.5 ${className}`}
        >
            <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-2.5 py-0.5 rounded-full leading-none">
                    <GoogleIcon size={12} />
                    <span>Preferred Source</span>
                </span>
                <span className="text-[11px] text-[#050315]/50 font-medium">Google Search</span>
            </div>

            <div className="space-y-1">
                <h3 className="text-[15.5px] font-extrabold text-[#050315] tracking-tight">
                    {title || 'Follow on Google Search'}
                </h3>
                <p className="text-[12.5px] text-[#050315]/70 leading-relaxed">
                    {description ||
                        'Add LinkedInRank to your preferred sources in Google Search to get verified recruiter algorithm teardowns & profile guides highlighted in Top Stories.'}
                </p>
            </div>

            <div className="pt-0.5">
                <a
                    href={PREFERRED_SOURCE_DEEPLINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleAddClick}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#f8f9fa] border border-[#dadce0] text-[#202124] text-[12.5px] font-medium transition-all shadow-2xs hover:shadow-xs no-underline cursor-pointer select-none leading-none"
                >
                    <GoogleIcon size={15} />
                    <span>Add to Preferred Sources</span>
                </a>
            </div>
        </div>
    )
}
