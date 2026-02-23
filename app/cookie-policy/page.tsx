import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'Cookie Policy | LinkedInRank',
    description: 'LinkedInRank cookie policy: we do not use cookies, trackers, or analytics scripts. Learn about our zero-tracking approach to LinkedIn profile analysis.',
    keywords: 'linkedinrank cookie policy, linkedinrank cookies, linkedin tool tracking, linkedinrank no cookies',
    alternates: { canonical: 'https://linkedinrank.com/cookie-policy' },
    openGraph: {
        title: 'Cookie Policy | LinkedInRank',
        description: 'No cookies, no trackers, no analytics scripts. Zero-tracking LinkedIn analysis.',
        url: 'https://linkedinrank.com/cookie-policy',
    },
}
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cookie Policy | LinkedInRank',
    description: 'LinkedInRank cookie policy. We use zero cookies and zero tracking.',
    url: 'https://linkedinrank.com/cookie-policy',
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
}
export default function CookiePolicyPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-16 sm:py-20">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-sm mb-6">
                        <svg className="w-7 h-7 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" /></svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-4">Cookie Policy</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                        The short version: we don&apos;t use cookies. Here are the details.
                    </p>
                </div>
            </section>

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                {/* Zero cookies highlight */}
                <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-2xl p-8 sm:p-10 text-center mb-16">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-[#DBEAFE] shadow-sm flex items-center justify-center mx-auto mb-5">
                        <svg className="w-8 h-8 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#0A0F1C] mb-3">Zero Cookies. Zero Tracking.</h2>
                    <p className="text-[15px] text-[#4B5563] max-w-md mx-auto leading-relaxed">
                        LinkedInRank does not set any cookies on your browser. We do not use first-party cookies, third-party cookies, session cookies, or persistent cookies of any kind.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
                    {[
                        { icon: 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88', title: 'No Analytics Trackers', desc: 'We do not use Google Analytics, Mixpanel, Hotjar, or any other analytics service. Your browsing behavior on LinkedInRank is not tracked or recorded.' },
                        { icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636', title: 'No Third-Party Scripts', desc: 'We do not load any third-party tracking scripts, advertising pixels, social media widgets, or remarketing tags. Your visit is completely private.' },
                        { icon: 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z', title: 'No Fingerprinting', desc: 'We do not use browser fingerprinting, local storage tracking, or any other technique to identify or track individual users across sessions.' },
                        { icon: 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5', title: 'No Advertising', desc: 'LinkedInRank is ad-free. We do not display advertisements and therefore have no need for advertising cookies or conversion tracking.' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                            <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                            </div>
                            <h3 className="text-sm font-bold text-[#0A0F1C] mb-2">{item.title}</h3>
                            <p className="text-sm text-[#4B5563] leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-8 sm:p-10 mb-16">
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-4">Why no cookie banner?</h2>
                    <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                        You may have noticed that LinkedInRank does not display a cookie consent banner. That is because we have nothing to consent to | we genuinely do not set any cookies or use any tracking technology.
                    </p>
                    <p className="text-sm text-[#4B5563] leading-relaxed">
                        This is a deliberate design decision aligned with our <Link href="/privacy" className="text-[#0A66C2] hover:underline">privacy-first approach</Link>. We believe you should be able to use a tool without being tracked, profiled, or followed across the web. For more on how we handle your data, see our <Link href="/data-security" className="text-[#0A66C2] hover:underline">Data Security</Link> page.
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'Privacy Policy', href: '/privacy' },
                            { label: 'Data Security', href: '/data-security' },
                            { label: 'Terms of Service', href: '/terms' },
                            { label: 'Disclaimer', href: '/disclaimer' },
                            { label: 'How It Works', href: '/how-linkedin-rank-works' },
                            { label: 'FAQ', href: '/faq' },
                        ].map((item, i) => (
                            <Link key={i} href={item.href} className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">{item.label}</Link>
                        ))}
                    </div>
                </div>
            </article>

            <SiteFooter />
        </main>
    )
}
