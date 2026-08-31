'use client'

import React from 'react'
import Image from 'next/image'
import { LinkedInIcon } from '@/components/ui/Icons'

const NEWSLETTER_URL = 'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7353859555715436544'

interface NewsletterCardProps {
    variant?: 'footer' | 'banner' | 'card' | 'compact'
    className?: string
}

export default function NewsletterCard({ variant = 'card', className = '' }: NewsletterCardProps) {
    if (variant === 'banner' || variant === 'footer') {
        return (
            <div className={`p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#dedcff] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs ${className}`}>
                <div className="flex items-center gap-3.5">
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-[#dedcff]">
                        <Image
                            src="/ai-this-week.jpg"
                            alt="AI This Week Newsletter"
                            width={44}
                            height={44}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2f27ce]">
                                AI This Week
                            </span>
                            <span className="text-[10.5px] text-[#050315]/60 border border-[#dedcff] px-2 py-0.5 rounded-full font-semibold">
                                Newsletter
                            </span>
                        </div>
                        <p className="text-[13.5px] sm:text-[14px] text-[#050315]/75 leading-relaxed">
                            Weekly tactical breakdowns for ambitious professionals thriving in the AI era.
                        </p>
                    </div>
                </div>

                <div className="shrink-0">
                    <a
                        href={NEWSLETTER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2f27ce] hover:bg-[#433bff] text-white text-[13px] sm:text-[14px] font-extrabold transition-all no-underline cursor-pointer shadow-xs active:scale-[0.98]"
                    >
                        <LinkedInIcon size={14} className="text-white" />
                        <span>Subscribe on LinkedIn</span>
                    </a>
                </div>
            </div>
        )
    }

    // Default: 'card' / 'compact'
    return (
        <div className={`p-5 rounded-2xl bg-white border-2 border-[#dedcff] space-y-3.5 shadow-xs ${className}`}>
            <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#dedcff]">
                    <Image
                        src="/ai-this-week.jpg"
                        alt="AI This Week Newsletter"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="space-y-0.5">
                    <span className="text-[11px] font-extrabold uppercase text-[#2f27ce] tracking-wider block">
                        AI This Week
                    </span>
                    <h4 className="text-[13.5px] sm:text-[14px] font-extrabold text-[#050315]">
                        Weekly AI Playbook
                    </h4>
                </div>
            </div>

            <p className="text-[13px] sm:text-[13.5px] text-[#050315]/75 leading-relaxed">
                Practical strategies and AI workflows to advance your career.
            </p>

            <a
                href={NEWSLETTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#2f27ce] hover:bg-[#433bff] text-white text-[13px] sm:text-[14px] font-extrabold transition-all no-underline cursor-pointer shadow-xs active:scale-[0.98]"
            >
                <LinkedInIcon size={13} className="text-white" />
                <span>Subscribe on LinkedIn</span>
            </a>
        </div>
    )
}
