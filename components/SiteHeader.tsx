'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { ArrowRightIcon } from '@/components/ui/Icons'

const NAV_LINKS = [
    { href: '/#upload', label: 'Analyze' },
    { href: '/tools', label: 'Tools' },
    { href: '/blogs', label: 'Articles' },
    { href: '/how-linkedin-rank-works', label: 'How It Works' },
    { href: '/faq', label: 'FAQ' },
]

export default function SiteHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const headerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [mobileMenuOpen])

    const isActive = (href: string) => {
        if (href === '/#upload') return false
        if (href === '/blogs' && pathname?.startsWith('/blogs')) return true
        if (href === '/tools' && pathname?.startsWith('/tools')) return true
        return pathname === href
    }

    return (
        <header
            ref={headerRef}
            className={`
                sticky top-0 z-50 w-full transition-all duration-150 ease-out
                bg-white/95 backdrop-blur-md
                border-b ${scrolled ? 'border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(15,23,42,0.04)]' : 'border-[#F1F5F9]'}
            `}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                {/* Brand Logo */}
                <Link
                    href="/"
                    className="font-bold text-[17px] sm:text-[18px] tracking-tight text-[#0F172A] no-underline shrink-0 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2 rounded-md"
                >
                    <span>LinkedIn</span>
                    <span className="text-[#0A66C2]">Rank</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map((link) => {
                        const active = isActive(link.href)
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`
                                    text-[14px] font-medium px-3.5 py-2 rounded-md transition-colors duration-150 no-underline
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]
                                    ${active
                                        ? 'text-[#0F172A] bg-[#F1F5F9] font-semibold'
                                        : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Right Action Area */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <Button
                        href="/#upload"
                        variant="primary"
                        size="md"
                        className="hidden sm:inline-flex"
                        rightIcon={<ArrowRightIcon size={14} />}
                    >
                        Analyze Profile
                    </Button>

                    {/* Mobile Compact CTA */}
                    <Button
                        href="/#upload"
                        variant="primary"
                        size="sm"
                        className="sm:hidden text-[13px]"
                    >
                        Analyze
                    </Button>

                    {/* Mobile Hamburger Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label="Toggle navigation menu"
                        className="md:hidden p-2 rounded-lg text-[#334155] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]"
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div
                    id="mobile-menu"
                    className="md:hidden border-t border-[#E2E8F0] bg-white px-4 py-4 animate-fade-in shadow-[0_10px_20px_-5px_rgba(15,23,42,0.08)]"
                >
                    <nav className="flex flex-col gap-1">
                        {NAV_LINKS.map((link) => {
                            const active = isActive(link.href)
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`
                                        text-[15px] font-medium px-3 py-2.5 rounded-lg transition-colors no-underline
                                        ${active
                                            ? 'text-[#0A66C2] bg-[#F0F7FF] font-semibold'
                                            : 'text-[#334155] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                                        }
                                    `}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex flex-col gap-3">
                        <Button
                            href="/#upload"
                            variant="primary"
                            size="md"
                            fullWidth
                            onClick={() => setMobileMenuOpen(false)}
                            rightIcon={<ArrowRightIcon size={15} />}
                        >
                            Analyze LinkedIn Profile
                        </Button>

                        <div className="flex items-center justify-between pt-2 px-1 text-[12px] text-[#64748B]">
                            <span>Free • No login • PDF-based</span>
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-[#0A66C2] hover:underline"
                            >
                                Contact support
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
