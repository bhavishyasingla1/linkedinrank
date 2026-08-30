import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import { SparklesIcon, ShieldCheckIcon } from '@/components/ui/Icons'

export const metadata: Metadata = {
    title: 'Cookie Policy',
    description: 'LinkedInRank cookie policy: we do not use cookies, trackers, or analytics scripts. Learn about our zero-tracking approach to LinkedIn profile analysis.',
    keywords: 'linkedinrank cookie policy, linkedinrank cookies, linkedin tool tracking, linkedinrank no cookies',
    alternates: { canonical: 'https://linkedinrank.com/cookie-policy' },
    openGraph: {
        title: 'Cookie Policy',
        description: 'No cookies, no trackers, no analytics scripts. Zero-tracking LinkedIn analysis.',
        url: 'https://linkedinrank.com/cookie-policy',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cookie Policy',
    description: 'LinkedInRank cookie policy. We use zero cookies and zero tracking.',
    url: 'https://linkedinrank.com/cookie-policy',
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
}

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            {/* Hero Section */}
            <section className="relative pt-16 pb-14 sm:pt-20 sm:pb-16 overflow-hidden aside-hero-glow">
                <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] text-[12px] font-extrabold text-[#2f27ce] shadow-2xs leading-none">
                        <ShieldCheckIcon size={13} />
                        <span>Zero-Tracking Standard</span>
                    </div>
                    <h1 className="text-[32px] sm:text-[44px] font-extrabold text-[#050315] tracking-tight leading-tight">
                        Cookie Policy
                    </h1>
                    <p className="text-[15px] sm:text-[16.5px] text-[#050315]/75 max-w-lg mx-auto leading-relaxed">
                        The short version: we don&apos;t use cookies. Here are the exact technical specifications.
                    </p>
                </div>
            </section>

            <main id="main-content" className="flex-1 max-w-3xl mx-auto px-6 py-12 sm:py-20 space-y-12 w-full">
                {/* Zero Cookies Highlight */}
                <div className="bg-gradient-to-br from-[#dedcff]/50 via-white to-[#dedcff]/30 border-2 border-[#dedcff] rounded-3xl p-8 sm:p-10 text-center shadow-sm space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#dedcff] shadow-xs flex items-center justify-center mx-auto text-[#2f27ce]">
                        <ShieldCheckIcon size={28} />
                    </div>
                    <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#050315] tracking-tight">
                        Zero Cookies. Zero Tracking.
                    </h2>
                    <p className="text-[14.5px] text-[#050315]/75 max-w-md mx-auto leading-relaxed">
                        LinkedInRank does not set any cookies on your browser. We do not use first-party cookies, third-party cookies, session cookies, or persistent cookies of any kind.
                    </p>
                </div>

                {/* 4 Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {[
                        { title: 'No Analytics Trackers', desc: 'We do not load third-party analytics pixels or behavioral screen recorders. Your session remains strictly between your device and our server.' },
                        { title: 'No Advertising Scripts', desc: 'LinkedInRank is completely ad-free. We do not run remarketing tags, cross-site trackers, or commercial pixels.' },
                        { title: 'No Browser Fingerprinting', desc: 'We do not inspect browser hardware canvas or store identifying tokens in local storage to track repeat visits.' },
                        { title: 'No Account Data Required', desc: 'Since there are no user logins or passwords required, no session auth cookies are created or stored.' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-[#dedcff] rounded-2xl p-6 shadow-xs space-y-2 transition-all hover:border-[#2f27ce]/50">
                            <div className="flex items-center gap-2.5">
                                <span className="w-7 h-7 rounded-lg bg-[#dedcff] text-[#2f27ce] flex items-center justify-center text-[12px] font-extrabold shrink-0">
                                    ✓
                                </span>
                                <h3 className="text-[15.5px] font-bold text-[#050315] tracking-tight">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-[13px] text-[#050315]/75 leading-relaxed pl-9">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Why No Cookie Banner Box */}
                <div className="bg-[#dedcff]/30 border border-[#dedcff] rounded-3xl p-7 sm:p-8 space-y-3">
                    <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        Why is there no annoying cookie consent banner?
                    </h2>
                    <p className="text-[14px] text-[#050315]/80 leading-relaxed">
                        You may have noticed that LinkedInRank does not show a cookie pop-up or consent banner. That is because we have nothing to consent to—we genuinely do not set cookies or track you.
                    </p>
                    <p className="text-[14px] text-[#050315]/80 leading-relaxed">
                        We believe utility tools should respect user privacy by default. For more details on how files are processed, review our <Link href="/privacy" className="text-[#2f27ce] font-bold hover:underline">Privacy Policy</Link> and <Link href="/data-security" className="text-[#2f27ce] font-bold hover:underline">Data Security</Link> documentation.
                    </p>
                </div>

                {/* Related Legal Links */}
                <div className="pt-8 border-t border-[#dedcff] space-y-3">
                    <p className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                        Related Resources
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                        {[
                            { label: 'Privacy Policy', href: '/privacy' },
                            { label: 'Data Security', href: '/data-security' },
                            { label: 'Terms of Service', href: '/terms' },
                            { label: 'Disclaimer', href: '/disclaimer' },
                            { label: 'Scoring Methodology', href: '/methodology' },
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
