'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRightIcon } from '@/components/ui/Icons'

const NAV_LINKS = [
    { href: '/tools', label: 'Tools' },
    { href: '/blogs', label: 'Articles' },
    { href: '/how-linkedin-rank-works', label: 'How It Works' },
]

export default function SiteHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const headerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        let lastScrollY = window.scrollY

        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setScrolled(currentScrollY > 60)
            lastScrollY = currentScrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
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
        if (href === '/blogs' && pathname?.startsWith('/blogs')) return true
        if (href === '/tools' && pathname?.startsWith('/tools')) return true
        return pathname === href
    }

    const handleAnalyzeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            e.preventDefault()
            const uploadEl = document.getElementById('upload')
            if (uploadEl) {
                uploadEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }
    }

    const handleMobileAnalyzeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setMobileMenuOpen(false)
        if (pathname === '/') {
            e.preventDefault()
            const uploadEl = document.getElementById('upload')
            if (uploadEl) {
                uploadEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }
    }

    return (
        <header
            ref={headerRef}
            suppressHydrationWarning
            className={`
                sticky top-0 z-50 w-full transition-all duration-200
                ${scrolled
                    ? 'bg-[#fbfbfe]/95 backdrop-blur-xl border-b border-[#dedcff] shadow-sm shadow-[#2f27ce]/5 py-2 sm:py-2.5'
                    : 'bg-[#fbfbfe]/90 backdrop-blur-md border-b border-[#dedcff]/70 py-2.5 sm:py-3'
                }
            `}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between gap-4">
                {/* Brand Logo: Clean text-only */}
                <div className="flex items-center">
                    <Link
                        href="/"
                        className="text-[20px] sm:text-[22px] font-extrabold tracking-tight text-[#050315] no-underline shrink-0 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f27ce] rounded-lg"
                    >
                        <span>LinkedIn</span><span className="text-[#2f27ce]">Rank</span>
                    </Link>
                </div>

                {/* Floating Circular Pill Navigation */}
                <div className="hidden md:flex flex-1 justify-center">
                    <nav className="flex items-center gap-1 rounded-full bg-white/90 border border-[#dedcff] px-2.5 py-1 shadow-2xs">
                        {NAV_LINKS.map((link) => {
                            const active = isActive(link.href)
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`
                                        text-[13px] font-bold px-3.5 py-1.5 rounded-full transition-all duration-150 no-underline leading-none
                                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f27ce]
                                        ${active
                                            ? 'text-[#fbfbfe] bg-[#2f27ce] shadow-xs'
                                            : 'text-[#050315]/80 hover:text-[#2f27ce] hover:bg-[#dedcff]/50'
                                        }
                                    `}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Right Action Button: Always visible */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/#upload"
                        onClick={handleAnalyzeClick}
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] px-4.5 py-2 rounded-full text-[13px] font-bold transition-all duration-150 shadow-sm shadow-[#2f27ce]/20 hover:shadow-md hover:shadow-[#433bff]/25 no-underline cursor-pointer group active:scale-95 leading-none"
                    >
                        <span>Analyze Profile</span>
                        <ArrowRightIcon size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                {/* Mobile Hamburger Toggle */}
                <div className="flex items-center md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label="Toggle navigation menu"
                        className="p-2 rounded-full text-[#050315] bg-[#dedcff]/50 hover:bg-[#dedcff] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f27ce]"
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
                    className="md:hidden border-t border-[#dedcff] bg-[#fbfbfe] px-4 py-4 animate-fade-in shadow-xl shadow-[#2f27ce]/10"
                >
                    <nav className="flex flex-col gap-1.5">
                        {NAV_LINKS.map((link) => {
                            const active = isActive(link.href)
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`
                                        text-[14.5px] font-semibold px-4 py-2.5 rounded-full transition-colors no-underline
                                        ${active
                                            ? 'text-[#fbfbfe] bg-[#2f27ce]'
                                            : 'text-[#050315] hover:text-[#2f27ce] hover:bg-[#dedcff]/50'
                                        }
                                    `}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="mt-4 pt-4 border-t border-[#dedcff] flex flex-col gap-3">
                        <Link
                            href="/#upload"
                            onClick={handleMobileAnalyzeClick}
                            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2f27ce] to-[#433bff] text-[#fbfbfe] px-5 py-2.5 rounded-full text-[14px] font-bold transition-all no-underline cursor-pointer shadow-md shadow-[#2f27ce]/20"
                        >
                            <span>Analyze Profile</span>
                            <ArrowRightIcon size={14} />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
