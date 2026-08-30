import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import { SparklesIcon, ShieldCheckIcon, ArrowRightIcon } from '@/components/ui/Icons'

export const metadata: Metadata = {
    title: 'Data Security | How LinkedInRank Protects Your Information',
    description: 'Learn how LinkedInRank ensures your data security: in-memory processing, zero storage, encrypted transfers, and privacy-first architecture. Your LinkedIn PDF is never stored.',
    keywords: 'linkedinrank data security, linkedin profile data protection, linkedin tool privacy, secure linkedin analysis, is linkedinrank safe, linkedinrank encryption',
    alternates: { canonical: 'https://linkedinrank.com/data-security' },
    openGraph: {
        title: 'Data Security | How LinkedInRank Protects Your Information',
        description: 'In-memory processing, zero storage, encrypted transfers. Your LinkedIn PDF is never stored.',
        url: 'https://linkedinrank.com/data-security',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Data Security | LinkedInRank',
    description: 'How LinkedInRank handles your data: in-memory processing, zero storage, zero tracking.',
    url: 'https://linkedinrank.com/data-security',
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
}

export default function DataSecurityPage() {
    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            {/* Hero */}
            <section className="relative pt-16 pb-14 sm:pt-20 sm:pb-16 overflow-hidden aside-hero-glow">
                <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] text-[12px] font-extrabold text-[#2f27ce] shadow-2xs leading-none">
                        <ShieldCheckIcon size={13} />
                        <span>Security Architecture</span>
                    </div>
                    <h1 className="text-[32px] sm:text-[44px] font-extrabold text-[#050315] tracking-tight leading-tight">
                        How We Protect Your Data
                    </h1>
                    <p className="text-[15px] sm:text-[16.5px] text-[#050315]/75 max-w-lg mx-auto leading-relaxed">
                        A detailed breakdown of our security posture from upload to diagnostic delivery.
                    </p>
                </div>
            </section>

            <main id="main-content" className="flex-1 max-w-3xl mx-auto px-6 py-12 sm:py-20 space-y-12 w-full">
                {/* 5-Step Security Flow */}
                <div className="space-y-4">
                    {[
                        { step: '01', title: 'TLS Encrypted Upload', desc: 'Your LinkedIn PDF is uploaded exclusively over HTTPS (TLS 1.2+), ensuring complete encryption in transit.' },
                        { step: '02', title: 'In-Memory Runtime', desc: 'Your PDF exists solely in ephemeral server RAM during calculation. It is never written to disk or stored in any database.' },
                        { step: '03', title: 'Stateless Evaluation Pipeline', desc: 'Profile content is evaluated against standardized ranking rules and secure enterprise API channels with zero data retention.' },
                        { step: '04', title: 'Instant Memory Garbage Collection', desc: 'The moment your diagnostic audit is returned, server memory is immediately freed and all runtime traces are purged.' },
                        { step: '05', title: 'Browser-Only Persistence', desc: 'Your score and recommendations live only in your active browser tab. Once closed, they cannot be recovered by anyone.' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-[#dedcff] rounded-2xl p-5 sm:p-6 shadow-xs flex items-start gap-4 transition-all hover:border-[#2f27ce]/50">
                            <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2f27ce] to-[#433bff] text-white text-[13px] font-extrabold flex items-center justify-center shrink-0 shadow-xs shadow-[#2f27ce]/20">
                                {item.step}
                            </span>
                            <div className="space-y-1 min-w-0">
                                <h2 className="text-[16px] font-bold text-[#050315] tracking-tight">
                                    {item.title}
                                </h2>
                                <p className="text-[13.5px] text-[#050315]/75 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3 Pillar Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {[
                        { title: 'Zero Storage', desc: 'No databases, no file logs, no server disks' },
                        { title: 'Zero Accounts', desc: 'No signup, no emails, no passwords' },
                        { title: 'Zero Tracking', desc: 'No third-party trackers, pixels, or ad cookies' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-[#dedcff] rounded-2xl p-5 text-center shadow-xs space-y-1">
                            <span className="w-7 h-7 rounded-full bg-[#dedcff] text-[#2f27ce] flex items-center justify-center mx-auto text-[11px] font-extrabold mb-2">
                                ✓
                            </span>
                            <h3 className="text-[14px] font-bold text-[#050315]">{item.title}</h3>
                            <p className="text-[12px] text-[#050315]/70 leading-normal">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Box */}
                <div className="bg-gradient-to-r from-[#dedcff]/60 via-white to-[#dedcff]/60 border border-[#dedcff] rounded-2xl p-7 sm:p-9 text-center space-y-3 shadow-xs">
                    <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#050315] tracking-tight">
                        Analyze your profile with confidence
                    </h2>
                    <p className="text-[14px] text-[#050315]/75 max-w-md mx-auto leading-relaxed">
                        Your profile is processed securely and never saved. Try LinkedInRank—free, private, and instant.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/#upload"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[14px] font-bold shadow-md shadow-[#2f27ce]/25 transition-all no-underline cursor-pointer active:scale-95 leading-none"
                        >
                            <span>Analyze Profile Free</span>
                            <ArrowRightIcon size={14} />
                        </Link>
                    </div>
                </div>

                {/* Related Legal Links */}
                <div className="pt-8 border-t border-[#dedcff] space-y-3">
                    <p className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                        Related Resources
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                        {[
                            { label: 'Privacy Policy', href: '/privacy' },
                            { label: 'Cookie Policy', href: '/cookie-policy' },
                            { label: 'Terms of Service', href: '/terms' },
                            { label: 'Disclaimer', href: '/disclaimer' },
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
