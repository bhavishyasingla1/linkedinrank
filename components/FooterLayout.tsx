'use client'
// SiteFooter v4 — dark premium footer (hydration-safe)

import { useRef, useEffect } from 'react'
import Link from 'next/link'

const CURRENT_YEAR = 2026

const TOOL_LINKS = [
    { href: '/tools/linkedin-headline-generator', name: 'Headline Generator' },
    { href: '/tools/linkedin-about-generator', name: 'About Generator' },
    { href: '/tools/linkedin-experience-generator', name: 'Experience Generator' },
    { href: '/tools/linkedin-profile-keyword-analyzer', name: 'Keyword Analyzer' },
    { href: '/tools/linkedin-post-idea-generator', name: 'Post Idea Generator' },
    { href: '/tools/linkedin-post-hook-generator', name: 'Post Hook Generator' },
    { href: '/tools/linkedin-comment-generator', name: 'Comment Generator' },
    { href: '/tools/linkedin-content-planner', name: 'Content Planner' },
    { href: '/tools/linkedin-connection-message-generator', name: 'Connection Messages' },
    { href: '/tools/linkedin-story-to-post-converter', name: 'Story to Post' },
    { href: '/tools/linkedin-profile-photo-ring', name: 'Profile Photo Ring' },
    { href: '/tools/linkedin-qr-code-generator', name: 'QR Code Generator' },
]

export default function FooterLayout() {
    const footerRef = useRef<HTMLElement>(null)

    // Re-apply footer styles after mount to fix any hydration recovery issues
    useEffect(() => {
        if (footerRef.current) {
            footerRef.current.style.backgroundColor = '#0f172a'
            footerRef.current.style.color = '#ffffff'
        }
    }, [])

    return (
        <footer ref={footerRef} suppressHydrationWarning className="bg-slate-900 text-white py-12" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
                    {/* Brand + socials */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="font-bold text-base text-white no-underline inline-block mb-3">
                            LinkedIn<span className="text-gradient-brand">Rank</span>
                        </Link>
                        <p className="text-xs text-gray-400 mb-4 leading-relaxed">See why recruiters skip your profile. Free LinkedIn score and AI-powered fixes.</p>
                        <div className="flex items-center gap-2">
                            <a href="https://www.linkedin.com/company/linkedin-rank/" target="_blank" rel="noopener noreferrer" aria-label="LinkedInRank on LinkedIn" className="text-gray-500 hover:text-[#0A66C2] transition-colors w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                            <a href="https://www.instagram.com/linkedinrank/" target="_blank" rel="noopener noreferrer" aria-label="LinkedInRank on Instagram" className="text-gray-500 hover:text-[#E4405F] transition-colors w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            </a>
                            <a href="mailto:hello@linkedinrank.com" aria-label="Email LinkedInRank" className="text-gray-500 hover:text-white transition-colors w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                            </a>
                        </div>
                        <div className="mt-5 pt-4 border-t border-white/5">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Google News</p>
                            <div {...({ 'google-add-preferred-source-btn': '', 'data-theme': 'dark' } as any)} />
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Product</p>
                        <div className="flex flex-col gap-2.5">
                            <Link href="/tools" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Free Tools</Link>
                            <Link href="/how-linkedin-rank-works" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">How It Works</Link>
                            <Link href="/methodology" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Methodology</Link>
                            <Link href="/faq" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">FAQ</Link>
                            <Link href="/compare-linkedin-review-tools" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Compare Tools</Link>
                            <Link href="/linkedinrank-vs-manual-audits" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">vs Manual Audits</Link>
                        </div>
                    </div>

                    {/* Guides */}
                    <div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Guides</p>
                        <div className="flex flex-col gap-2.5">
                            <Link href="/linkedin-optimization-guide" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Optimization Guide</Link>
                            <Link href="/linkedin-headline-guide" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Headline Guide</Link>
                            <Link href="/linkedin-about-guide" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">About Section Guide</Link>
                            <Link href="/linkedin-keywords-guide" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Keywords Guide</Link>
                            <Link href="/linkedin-profile-checklist" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Profile Checklist</Link>
                            <Link href="/recruiter-psychology" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Recruiter Psychology</Link>
                            <Link href="/get-noticed-recruiters" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Get Noticed</Link>
                            <Link href="/linkedin-mistakes" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Top 10 Mistakes</Link>
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Resources</p>
                        <div className="flex flex-col gap-2.5">
                            <Link href="/blogs" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Blog</Link>
                            <Link href="/for-jobseekers" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">For Job Seekers</Link>
                            <Link href="/linkedin-profile-for-students" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">For Students</Link>
                            <Link href="/for-founders" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">For Founders</Link>
                            <Link href="/ai-prompts-linkedin" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">AI Prompts</Link>
                            <Link href="/what-is-linkedin-rank" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">What Is LinkedIn Rank?</Link>
                            <Link href="/linkedin-rank-vs-ssi" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">LinkedIn Rank vs SSI</Link>
                            <Link href="/linkedin-content-strategy" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Content Strategy</Link>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Company</p>
                        <div className="flex flex-col gap-2.5">
                            <Link href="/about" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">About</Link>
                            <Link href="/contact" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Contact</Link>
                            <Link href="/privacy" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Privacy</Link>
                            <Link href="/terms" className="text-[13px] text-gray-400 hover:text-white no-underline transition-colors">Terms</Link>
                        </div>
                    </div>
                </div>

                {/* Tools row */}
                <div className="border-t border-white/10 pt-6 mb-6">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">Free LinkedIn Tools</p>
                    <div className="flex flex-wrap items-center gap-y-2">
                        {TOOL_LINKS.map((tool, i) => (
                            <span key={tool.href} className="flex items-center">
                                <Link href={tool.href} className="text-[12px] text-gray-500 hover:text-gray-300 no-underline transition-colors whitespace-nowrap">{tool.name}</Link>
                                {i < TOOL_LINKS.length - 1 && <span className="text-gray-700 text-[8px] mx-2.5" aria-hidden="true">•</span>}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-[11px] text-gray-500">&copy; {CURRENT_YEAR} LinkedInRank. Made by <a href="https://www.linkedin.com/in/bhavishyasingla1/" target="_blank" rel="noopener noreferrer" className="text-gray-400 underline decoration-gray-600 hover:text-white transition-colors">Bhavishya Singla</a></p>
                    <p className="text-[10px] text-gray-600">Not affiliated with LinkedIn Corporation.</p>
                </div>
            </div>
        </footer>
    )
}
