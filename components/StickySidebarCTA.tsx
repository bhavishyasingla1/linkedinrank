'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRightIcon } from '@/components/ui/Icons'

export interface StickySidebarCTAProps {
    title?: string
    description?: string
    ctaText?: string
    ctaHref?: string
    relatedTools?: Array<{ name: string; href: string }>
}

export default function StickySidebarCTA({
    title = 'Analyze Your Profile',
    description = 'Score your LinkedIn profile across 30+ signals and get practical fixes.',
    ctaText = 'Get Free Score',
    ctaHref = '/#upload',
    relatedTools = [
        { name: 'Headline Generator', href: '/tools/linkedin-headline-generator' },
        { name: 'About Generator', href: '/tools/linkedin-about-generator' },
        { name: 'Experience Generator', href: '/tools/linkedin-experience-generator' },
        { name: 'Keyword Analyzer', href: '/tools/linkedin-profile-keyword-analyzer' },
    ],
}: StickySidebarCTAProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPercent =
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            setIsVisible(scrollPercent > 20)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!isVisible) return null

    return (
        <aside className="sticky top-24 hidden lg:block w-64 ml-8 animate-fade-in">
            {/* Main Action Box — Dark Navy Solid Product Card */}
            <div className="bg-[#0F172A] text-white p-5 rounded-xl border border-[#1E293B] shadow-sm mb-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#38BDF8] mb-1.5">Free Analysis</p>
                <h3 className="font-semibold text-[16px] text-white tracking-tight mb-2">{title}</h3>
                <p className="text-[13px] text-[#94A3B8] leading-relaxed mb-4">{description}</p>
                <Button
                    href={ctaHref}
                    variant="primary"
                    size="sm"
                    fullWidth
                    rightIcon={<ArrowRightIcon size={14} />}
                >
                    {ctaText}
                </Button>
                <p className="text-[11px] text-[#64748B] text-center mt-2.5">No login • PDF-based • 60s</p>
            </div>

            {/* Popular Tools List */}
            {relatedTools.length > 0 && (
                <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs">
                    <h4 className="font-semibold text-[13px] text-[#0F172A] mb-2.5 uppercase tracking-wide">
                        Popular Tools
                    </h4>
                    <ul className="space-y-1.5">
                        {relatedTools.map((tool, i) => (
                            <li key={i}>
                                <Link
                                    href={tool.href}
                                    className="text-[13px] text-[#475569] hover:text-[#0A66C2] flex items-center justify-between py-1 transition-colors no-underline group"
                                >
                                    <span>{tool.name}</span>
                                    <span className="text-[#94A3B8] group-hover:text-[#0A66C2] transition-transform group-hover:translate-x-0.5">
                                        →
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </aside>
    )
}
