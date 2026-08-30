'use client'

import React from 'react'
import Link from 'next/link'
import { LinkedInIcon, SparklesIcon } from '@/components/ui/Icons'
import GooglePreferredSource from '@/components/GooglePreferredSource'

const CURRENT_YEAR = 2026

const PRODUCT_LINKS = [
    { href: '/#upload', label: 'Analyze Profile' },
    { href: '/tools', label: 'Free Tools' },
    { href: '/how-linkedin-rank-works', label: 'How It Works' },
    { href: '/methodology', label: 'Methodology' },
    { href: '/compare-linkedin-review-tools', label: 'Compare Review Tools' },
    { href: '/faq', label: 'FAQ' },
]

const TOOL_LINKS = [
    { href: '/tools/linkedin-headline-generator', label: 'Headline Generator' },
    { href: '/tools/linkedin-about-generator', label: 'About Generator' },
    { href: '/tools/linkedin-experience-generator', label: 'Experience Generator' },
    { href: '/tools/linkedin-profile-keyword-analyzer', label: 'Keyword Analyzer' },
    { href: '/tools/linkedin-post-hook-generator', label: 'Post Hook Generator' },
    { href: '/tools', label: 'All 12 Tools →' },
]

const LEARN_LINKS = [
    { href: '/blogs', label: 'Articles & Guides' },
    { href: '/blogs/linkedin-hooks', label: 'LinkedIn Hooks Masterclass' },
    { href: '/blogs/relatability-hooks', label: 'Relatability Hooks' },
    { href: '/blogs/authority-hooks', label: 'Authority Hooks' },
    { href: '/blogs/curiosity-hooks', label: 'Curiosity Hooks' },
    { href: '/for-jobseekers', label: 'For Job Seekers' },
    { href: '/recruiter-psychology', label: 'Recruiter Psychology' },
]

const COMPANY_LINKS = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/for-founders', label: 'For Founders' },
    { href: '/for-students', label: 'For Students' },
]

const LEGAL_LINKS = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookie-policy', label: 'Cookie Policy' },
    { href: '/data-security', label: 'Data Security' },
    { href: '/disclaimer', label: 'Disclaimer' },
]

export default function FooterLayout() {
    return (
        <footer className="bg-[#fbfbfe] text-[#050315] border-t border-[#dedcff] pt-16 pb-12 transition-colors">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
                {/* 5-Column Minimalist Layout */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 pb-12 border-b border-[#dedcff]/70">
                    {/* Brand Column (Spans 2 on large screens) */}
                    <div className="col-span-2 space-y-4 pr-4">
                        <Link
                            href="/"
                            className="font-bold text-[19px] tracking-tight text-[#050315] inline-flex items-center gap-2 no-underline"
                        >
                            <span className="w-7 h-7 rounded-full bg-[#2f27ce] text-[#fbfbfe] flex items-center justify-center shadow-xs">
                                <SparklesIcon size={14} />
                            </span>
                            <span className="font-extrabold tracking-tight">
                                LinkedIn<span className="text-[#2f27ce]">Rank</span>
                            </span>
                        </Link>
                        <p className="text-[13.5px] text-[#050315]/70 leading-relaxed max-w-sm">
                            The intelligent profile evaluator. Discover missing keywords, fix weak experience bullets, and calibrate your profile against 30+ recruiter search signals.
                        </p>

                        <div className="pt-2 flex items-center gap-2">
                            <a
                                href="https://www.linkedin.com/company/linkedin-rank/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedInRank on LinkedIn"
                                className="w-9 h-9 rounded-full bg-[#dedcff]/40 text-[#2f27ce] hover:text-[#fbfbfe] hover:bg-[#2f27ce] flex items-center justify-center transition-all duration-150 border border-[#dedcff]"
                            >
                                <LinkedInIcon size={15} />
                            </a>
                            <a
                                href="https://www.instagram.com/linkedinrank/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedInRank on Instagram"
                                className="w-9 h-9 rounded-full bg-[#dedcff]/40 text-[#2f27ce] hover:text-[#fbfbfe] hover:bg-[#2f27ce] flex items-center justify-center transition-all duration-150 border border-[#dedcff]"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                            <a
                                href="mailto:hello@linkedinrank.com"
                                aria-label="Email LinkedInRank"
                                className="w-9 h-9 rounded-full bg-[#dedcff]/40 text-[#2f27ce] hover:text-[#fbfbfe] hover:bg-[#2f27ce] flex items-center justify-center transition-all duration-150 border border-[#dedcff]"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </a>
                        </div>

                        <div className="pt-2">
                            <GooglePreferredSource variant="footer" />
                        </div>
                    </div>

                    {/* Column 1: Product */}
                    <div className="space-y-3">
                        <h4 className="text-[12px] font-extrabold text-[#050315] uppercase tracking-wider">Product</h4>
                        <ul className="space-y-2">
                            {PRODUCT_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[13px] text-[#050315]/70 hover:text-[#433bff] transition-colors no-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Tools */}
                    <div className="space-y-3">
                        <h4 className="text-[12px] font-extrabold text-[#050315] uppercase tracking-wider">Tools</h4>
                        <ul className="space-y-2">
                            {TOOL_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[13px] text-[#050315]/70 hover:text-[#433bff] transition-colors no-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Learn */}
                    <div className="space-y-3">
                        <h4 className="text-[12px] font-extrabold text-[#050315] uppercase tracking-wider">Learn</h4>
                        <ul className="space-y-2">
                            {LEARN_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[13px] text-[#050315]/70 hover:text-[#433bff] transition-colors no-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Company & Legal */}
                    <div className="space-y-3">
                        <h4 className="text-[12px] font-extrabold text-[#050315] uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-2">
                            {LEGAL_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[13px] text-[#050315]/70 hover:text-[#433bff] transition-colors no-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar: Copyright + Disclaimer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#050315]/60 pt-2">
                    <p>© {CURRENT_YEAR} LinkedInRank. Built with diagnostic precision.</p>
                    <p className="text-center sm:text-right max-w-md">
                        Not affiliated with, endorsed by, or sponsored by LinkedIn Corporation.
                    </p>
                </div>
            </div>
        </footer>
    )
}
