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
            <div className={`p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#dedcff] shadow-md shadow-[#2f27ce]/5 flex flex-col md:flex-row md:items-center justify-between gap-6 ${className}`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 text-left">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-[#dedcff] shadow-sm">
                        <Image
                            src="/ai-this-week.jpg"
                            alt="AI This Week Newsletter"
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2f27ce] bg-[#dedcff] px-3 py-1 rounded-full leading-none">
                                LinkedIn Newsletter
                            </span>
                        </div>
                        <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#050315] tracking-tight">
                            AI This Week
                        </h3>
                        <p className="text-[14px] sm:text-[15px] text-[#050315]/75 max-w-xl leading-relaxed">
                            Helping ambitious professionals thrive in the AI era.
                        </p>
                    </div>
                </div>

                <div className="shrink-0 pt-2 md:pt-0">
                    <a
                        href={NEWSLETTER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[14.5px] font-bold shadow-md shadow-[#2f27ce]/25 hover:shadow-lg hover:shadow-[#433bff]/25 transition-all no-underline cursor-pointer active:scale-95 leading-none"
                    >
                        <LinkedInIcon size={16} className="text-white" />
                        <span>Subscribe on LinkedIn</span>
                    </a>
                </div>
            </div>
        )
    }

    if (variant === 'banner') {
        return (
            <div className={`p-7 sm:p-9 rounded-3xl bg-gradient-to-r from-white via-[#fbfbfe] to-[#dedcff]/40 border-2 border-[#dedcff] shadow-lg shadow-[#2f27ce]/5 flex flex-col md:flex-row md:items-center justify-between gap-6 ${className}`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shrink-0 border border-[#dedcff] shadow-md">
                        <Image
                            src="/ai-this-week.jpg"
                            alt="AI This Week Newsletter"
                            width={88}
                            height={88}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 text-[11.5px] font-extrabold uppercase tracking-wider text-[#2f27ce] bg-[#dedcff] px-3 py-1 rounded-full leading-none">
                            Official LinkedIn Newsletter
                        </div>
                        <h3 className="text-[22px] sm:text-[26px] font-extrabold text-[#050315] tracking-tight">
                            AI This Week
                        </h3>
                        <p className="text-[15px] sm:text-[16px] text-[#050315]/80 max-w-xl leading-relaxed">
                            Helping ambitious professionals thrive in the AI era.
                        </p>
                    </div>
                </div>

                <div className="shrink-0 pt-2 md:pt-0">
                    <a
                        href={NEWSLETTER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[15px] font-bold shadow-md shadow-[#2f27ce]/25 hover:shadow-xl hover:shadow-[#433bff]/35 transition-all no-underline cursor-pointer active:scale-95 leading-none"
                    >
                        <LinkedInIcon size={16} className="text-white" />
                        <span>Subscribe on LinkedIn</span>
                    </a>
                </div>
            </div>
        )
    }

    // Default: 'card' (for blog sidebars & resource cards)
    return (
        <div className={`p-6 sm:p-7 rounded-3xl bg-white border-2 border-[#dedcff] shadow-sm shadow-[#2f27ce]/5 space-y-4 ${className}`}>
            <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-[#dedcff] shadow-xs">
                    <Image
                        src="/ai-this-week.jpg"
                        alt="AI This Week Newsletter"
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="space-y-1">
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#2f27ce] bg-[#dedcff] px-2.5 py-0.5 rounded-full leading-none">
                        LinkedIn Newsletter
                    </span>
                    <h4 className="text-[17px] sm:text-[18px] font-extrabold text-[#050315] tracking-tight">
                        AI This Week
                    </h4>
                </div>
            </div>

            <p className="text-[13.5px] sm:text-[14px] text-[#050315]/75 leading-relaxed">
                Helping ambitious professionals thrive in the AI era.
            </p>

            <div className="pt-1">
                <a
                    href={NEWSLETTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[13.5px] font-bold shadow-sm shadow-[#2f27ce]/20 hover:shadow-md hover:shadow-[#433bff]/25 transition-all no-underline cursor-pointer active:scale-95 leading-none"
                >
                    <LinkedInIcon size={15} className="text-white" />
                    <span>Subscribe on LinkedIn</span>
                </a>
            </div>
        </div>
    )
}
