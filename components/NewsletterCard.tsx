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
    if (variant === 'footer') {
        return (
            <div className={`p-4 sm:p-5 rounded-2xl bg-white border border-[#dedcff] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
                <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#dedcff] shadow-2xs">
                        <Image
                            src="/ai-this-week.jpg"
                            alt="AI This Week Newsletter"
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2f27ce] bg-[#dedcff]/70 px-2 py-0.5 rounded-full leading-none">
                                LinkedIn Newsletter
                            </span>
                        </div>
                        <h4 className="text-[14.5px] font-extrabold text-[#050315] tracking-tight truncate mt-0.5">
                            AI This Week
                        </h4>
                        <p className="text-[12px] text-[#050315]/70 truncate">
                            Helping ambitious professionals thrive in the AI era.
                        </p>
                    </div>
                </div>

                <a
                    href={NEWSLETTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[13px] font-bold shadow-sm shadow-[#2f27ce]/20 hover:shadow-md hover:shadow-[#433bff]/25 transition-all no-underline shrink-0 cursor-pointer active:scale-95 leading-none"
                >
                    <LinkedInIcon size={14} className="text-white" />
                    <span>Subscribe on LinkedIn</span>
                </a>
            </div>
        )
    }

    if (variant === 'banner') {
        return (
            <div className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-white via-[#fbfbfe] to-[#dedcff]/30 border border-[#dedcff] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${className}`}>
                <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 border border-[#dedcff] shadow-xs">
                        <Image
                            src="/ai-this-week.jpg"
                            alt="AI This Week Newsletter"
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="space-y-0.5">
                        <div className="inline-flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-wider text-[#2f27ce] bg-[#dedcff] px-2.5 py-0.5 rounded-full leading-none">
                            Official LinkedIn Newsletter
                        </div>
                        <h3 className="text-[16.5px] sm:text-[18px] font-extrabold text-[#050315] tracking-tight">
                            AI This Week
                        </h3>
                        <p className="text-[13px] text-[#050315]/75 leading-normal">
                            Helping ambitious professionals thrive in the AI era.
                        </p>
                    </div>
                </div>

                <a
                    href={NEWSLETTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[13.5px] font-bold shadow-md shadow-[#2f27ce]/25 hover:shadow-lg hover:shadow-[#433bff]/25 transition-all no-underline shrink-0 cursor-pointer active:scale-95 leading-none"
                >
                    <LinkedInIcon size={15} className="text-white" />
                    <span>Subscribe on LinkedIn</span>
                </a>
            </div>
        )
    }

    // Default: 'card' (for blog sidebars & resource cards)
    return (
        <div className={`p-4 sm:p-5 rounded-2xl bg-white border border-[#dedcff] shadow-xs space-y-3 ${className}`}>
            <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#dedcff]">
                    <Image
                        src="/ai-this-week.jpg"
                        alt="AI This Week Newsletter"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="min-w-0">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2f27ce] bg-[#dedcff]/70 px-2 py-0.5 rounded-full leading-none">
                        LinkedIn Newsletter
                    </span>
                    <h4 className="text-[15px] font-extrabold text-[#050315] tracking-tight truncate mt-0.5">
                        AI This Week
                    </h4>
                </div>
            </div>

            <p className="text-[12px] text-[#050315]/70 leading-normal">
                Helping ambitious professionals thrive in the AI era.
            </p>

            <a
                href={NEWSLETTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[12.5px] font-bold shadow-sm shadow-[#2f27ce]/20 hover:shadow-md hover:shadow-[#433bff]/25 transition-all no-underline cursor-pointer active:scale-95 leading-none"
            >
                <LinkedInIcon size={14} className="text-white" />
                <span>Subscribe on LinkedIn</span>
            </a>
        </div>
    )
}
