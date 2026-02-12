'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NavLink {
    href: string
    label: string
}

interface SiteHeaderProps {
    navLinks?: NavLink[]
    ctaLabel?: string
    ctaHref?: string
    maxWidth?: string
}

export default function SiteHeader({
    navLinks = [],
    ctaLabel = 'Analyze Profile',
    ctaHref = '/',
    maxWidth = 'max-w-5xl',
}: SiteHeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
            <div className={`${maxWidth} mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3`}>
                <Link href="/" className="font-bold text-base sm:text-lg md:text-xl tracking-tight text-[#0A0F1C] no-underline inline-block py-1 transition-all">
                    LinkedIn<span className="text-gradient-brand">Rank</span>
                </Link>
                <nav className="hidden sm:flex items-center gap-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-[#6B7280] hover:text-[#0A0F1C] transition-colors no-underline"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href={ctaHref}
                        className="text-sm font-semibold text-white bg-[#0A66C2] hover:bg-[#084E96] px-4 py-2 rounded-lg transition-colors no-underline"
                    >
                        {ctaLabel}
                    </Link>
                </nav>
                <div className="flex sm:hidden items-center gap-2">
                    <Link
                        href={ctaHref}
                        className="text-sm font-semibold text-white bg-[#0A66C2] hover:bg-[#084E96] px-3.5 py-1.5 rounded-lg transition-colors no-underline"
                    >
                        {ctaLabel}
                    </Link>
                    {navLinks.length > 0 && (
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-5 h-5 text-[#0A0F1C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-[#0A0F1C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>
            </div>
            {mobileMenuOpen && navLinks.length > 0 && (
                <div className="sm:hidden border-t border-gray-100 bg-white">
                    <nav className={`${maxWidth} mx-auto px-4 py-3 flex flex-col gap-1`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-sm font-medium text-[#6B7280] hover:text-[#0A0F1C] hover:bg-gray-50 rounded-lg px-3 py-2.5 transition-colors no-underline"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    )
}
