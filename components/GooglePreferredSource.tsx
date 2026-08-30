'use client'

import React from 'react'
import { GoogleIcon, SparklesIcon } from '@/components/ui/Icons'

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
    theme = 'light',
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
            <div className={`inline-flex flex-col items-start gap-1.5 ${className}`}>
                {/* Official Google Preferred Source Container */}
                <div
                    {...{ 'google-add-preferred-source-btn': '' }}
                    data-theme={theme}
                    data-lang="en"
                    className="min-h-[38px] flex items-center"
                >
                    {/* Fallback Deeplink if script is not yet loaded or blocked */}
                    <a
                        href={PREFERRED_SOURCE_DEEPLINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleAddClick}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#f8f9fa] border border-[#dadce0] text-[#3c4043] hover:text-[#202124] text-[12.5px] font-medium transition-all shadow-2xs hover:shadow-xs no-underline"
                    >
                        <GoogleIcon size={15} />
                        <span>Add as Preferred Source</span>
                    </a>
                </div>
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
                    Add LinkedInRank as a preferred source to see verified 2026 ranking teardowns and algorithm updates in your Google Search.
                </p>
                <div className="pt-1">
                    <div
                        {...{ 'google-add-preferred-source-btn': '' }}
                        data-theme="light"
                        data-lang="en"
                        className="min-h-[36px] flex items-center"
                    >
                        <a
                            href={PREFERRED_SOURCE_DEEPLINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleAddClick}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#f8f9fa] border border-[#dadce0] text-[#3c4043] hover:text-[#202124] text-[12px] font-medium transition-all shadow-2xs no-underline"
                        >
                            <GoogleIcon size={14} />
                            <span>Add on Google Search</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    // 3. Banner / Inline variant (for bottoms of articles and tool landing pages)
    if (variant === 'banner' || variant === 'inline') {
        return (
            <div
                className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#fbfbfe] via-white to-[#dedcff]/30 border-2 border-[#dedcff] aside-card-shadow flex flex-col md:flex-row md:items-center justify-between gap-5 ${className}`}
            >
                <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#dedcff] text-[#2f27ce] flex items-center justify-center">
                            <SparklesIcon size={12} />
                        </span>
                        <span className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                            Stay Ahead in 2026
                        </span>
                    </div>
                    <h4 className="text-[17px] sm:text-[19px] font-extrabold text-[#050315] tracking-tight">
                        {title || 'Help your Google Search find LinkedInRank as a Preferred Source'}
                    </h4>
                    <p className="text-[13.5px] text-[#050315]/75 leading-relaxed">
                        {description ||
                            'Get our latest LinkedIn recruiter insights, ATS algorithm teardowns, and headline formulas highlighted directly in Google Search and AI Overviews.'}
                    </p>
                </div>

                <div className="shrink-0">
                    <div
                        {...{ 'google-add-preferred-source-btn': '' }}
                        data-theme={theme}
                        data-lang="en"
                        className="min-h-[40px] flex items-center"
                    >
                        <a
                            href={PREFERRED_SOURCE_DEEPLINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleAddClick}
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white hover:bg-[#f8f9fa] border-2 border-[#dadce0] text-[#202124] text-[13.5px] font-semibold transition-all shadow-xs hover:shadow-md no-underline"
                        >
                            <GoogleIcon size={18} />
                            <span>Add as Preferred Source</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    // 4. Card variant (for blog & guide sidebars)
    return (
        <div
            className={`p-6 rounded-3xl bg-gradient-to-br from-white via-[#fbfbfe] to-[#dedcff]/30 border-2 border-[#dedcff] aside-card-shadow space-y-4 ${className}`}
        >
            <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-2.5 py-0.5 rounded-full">
                    <GoogleIcon size={12} />
                    <span>Preferred Source</span>
                </span>
                <span className="text-[11px] text-[#050315]/50 font-medium">Google Search</span>
            </div>

            <div className="space-y-1.5">
                <h3 className="text-[17px] font-extrabold text-[#050315] tracking-tight">
                    {title || 'Follow on Google Search'}
                </h3>
                <p className="text-[13px] text-[#050315]/70 leading-relaxed">
                    {description ||
                        'Add LinkedInRank to your preferred sources in Google Search to get verified recruiter algorithm teardowns & profile guides highlighted in Top Stories & AI Overviews.'}
                </p>
            </div>

            <div className="pt-1">
                <div
                    {...{ 'google-add-preferred-source-btn': '' }}
                    data-theme={theme}
                    data-lang="en"
                    className="min-h-[40px] flex items-center"
                >
                    <a
                        href={PREFERRED_SOURCE_DEEPLINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleAddClick}
                        className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-full bg-white hover:bg-[#f8f9fa] border-2 border-[#dadce0] text-[#202124] text-[13px] font-bold transition-all shadow-xs hover:shadow-sm no-underline"
                    >
                        <GoogleIcon size={16} />
                        <span>Add as Preferred Source</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
