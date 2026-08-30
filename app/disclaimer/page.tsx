import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import { SparklesIcon, ShieldCheckIcon } from '@/components/ui/Icons'

export const metadata: Metadata = {
    title: 'Disclaimer',
    description: 'Important disclaimers about LinkedInRank scoring, AI recommendations, and the limitations of automated LinkedIn profile analysis.',
    keywords: 'linkedinrank disclaimer, linkedin tool disclaimer, linkedin scoring limitations',
    alternates: { canonical: 'https://linkedinrank.com/disclaimer' },
    openGraph: {
        title: 'Disclaimer',
        description: 'Disclaimers about LinkedInRank scoring and AI recommendations.',
        url: 'https://linkedinrank.com/disclaimer',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Disclaimer',
    description: 'LinkedInRank disclaimer. Our tool provides guidance, not guarantees.',
    url: 'https://linkedinrank.com/disclaimer',
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
}

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            {/* Hero */}
            <section className="relative pt-16 pb-14 sm:pt-20 sm:pb-16 overflow-hidden aside-hero-glow">
                <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] text-[12px] font-extrabold text-[#2f27ce] shadow-2xs leading-none">
                        <SparklesIcon size={13} />
                        <span>Scope &amp; Limitations</span>
                    </div>
                    <h1 className="text-[32px] sm:text-[44px] font-extrabold text-[#050315] tracking-tight leading-tight">
                        Platform Disclaimer
                    </h1>
                    <p className="text-[15px] sm:text-[16.5px] text-[#050315]/75 max-w-lg mx-auto leading-relaxed">
                        Important details regarding the scope, algorithmic assumptions, and diagnostic boundaries of LinkedInRank.
                    </p>
                </div>
            </section>

            <main id="main-content" className="flex-1 max-w-3xl mx-auto px-6 py-12 sm:py-20 space-y-12 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {[
                        { title: 'Diagnostic Guidance, Not Professional Career Advice', desc: 'LinkedInRank is an automated algorithmic analysis engine. It provides heuristic benchmarking, not certified executive resume coaching or legal counsel.' },
                        { title: 'AI-Assisted Suggestions', desc: 'Rewrites and recommendations are synthesized using Google Gemini AI. Users should review and personalize suggestions to accurately reflect their real-world experience.' },
                        { title: 'Textual PDF Scope', desc: 'Calculations evaluate the textual signals contained in your exported LinkedIn PDF. It does not measure profile photos, endorsements, or real-time recruiter search intent.' },
                        { title: 'No Outcome Guarantees', desc: 'Higher algorithmic scores improve structural discoverability and readability, but cannot guarantee interviews, job placements, or hiring outcomes.' },
                        { title: 'Independent Project', desc: 'LinkedInRank is independent and is not affiliated with, endorsed by, or operated by LinkedIn Corporation or Microsoft Corporation.' },
                        { title: 'Algorithmic Calibration', desc: 'Rule-based scoring formulas are deterministic, while semantic analyses may reflect slight heuristic variations.' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-[#dedcff] rounded-2xl p-6 shadow-xs space-y-2 transition-all hover:border-[#2f27ce]/50">
                            <div className="flex items-center gap-2.5">
                                <span className="w-7 h-7 rounded-lg bg-[#dedcff] text-[#2f27ce] flex items-center justify-center text-[12px] font-extrabold shrink-0">
                                    i
                                </span>
                                <h2 className="text-[15.5px] font-bold text-[#050315] tracking-tight">
                                    {item.title}
                                </h2>
                            </div>
                            <p className="text-[13px] text-[#050315]/75 leading-relaxed pl-9">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Liability Box */}
                <div className="bg-[#dedcff]/30 border border-[#dedcff] rounded-3xl p-7 sm:p-8 space-y-3">
                    <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        Limitation of Liability
                    </h2>
                    <p className="text-[14px] text-[#050315]/80 leading-relaxed">
                        LinkedInRank and its developers assume no liability for career decisions, job applications, or profile alterations made in reliance upon scores or generated suggestions.
                    </p>
                </div>

                {/* Related Legal Links */}
                <div className="pt-8 border-t border-[#dedcff] space-y-3">
                    <p className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                        Related Resources
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                        {[
                            { label: 'Terms of Service', href: '/terms' },
                            { label: 'Privacy Policy', href: '/privacy' },
                            { label: 'Data Security', href: '/data-security' },
                            { label: 'Cookie Policy', href: '/cookie-policy' },
                            { label: 'Methodology', href: '/methodology' },
                            { label: 'FAQ', href: '/faq' },
                        ].map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className="text-[12.5px] font-semibold text-[#2f27ce] bg-white border border-[#dedcff] hover:border-[#2f27ce] hover:bg-[#dedcff]/40 px-3.5 py-1.5 rounded-full no-underline transition-all shadow-2xs leading-none"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}
