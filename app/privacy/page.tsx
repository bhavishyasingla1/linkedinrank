import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'Privacy Policy | How LinkedInRank Handles Your Data',
    description: 'How LinkedInRank handles your data: in-memory processing, zero storage, no tracking, no accounts required. Your LinkedIn PDF is never stored or shared.',
    keywords: 'linkedinrank privacy, linkedin profile tool privacy, linkedinrank data policy, is linkedinrank safe, linkedin analysis privacy',
    alternates: { canonical: 'https://linkedinrank.com/privacy' },
    openGraph: {
        title: 'Privacy Policy | LinkedInRank',
        description: 'In-memory processing, zero storage, no tracking. Your LinkedIn PDF is never stored or shared.',
        url: 'https://linkedinrank.com/privacy',
    },
}

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            {/* Hero */}
            <section className="bg-[#EFF6FF] py-16 sm:py-20">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-[#DBEAFE] shadow-sm mb-6">
                        <svg className="w-7 h-7 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-4">Your Data Stays Yours</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                        Privacy is a core principle at LinkedInRank, not an afterthought. Here is exactly how your data is handled.
                    </p>
                </div>
            </section>

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                {/* Policy cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
                    {[
                        { icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125', title: 'No Data Storage', desc: 'Your uploaded PDF is processed entirely in server memory. Never written to disk, never stored in a database, never cached.' },
                        { icon: 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z', title: 'No Accounts Required', desc: 'No sign-up, no login, no personal information beyond the PDF you choose to upload.' },
                        { icon: 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88', title: 'No Cookies or Tracking', desc: 'Zero cookies, zero analytics trackers, zero third-party scripts. No behavioral data is collected.' },
                        { icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z', title: 'AI Processing', desc: 'Google Gemini API processes data per their terms but does not use it for model training. No data retained after the call.' },
                        { icon: 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5', title: 'Results Delivery', desc: 'Results are returned to your browser session only. Close the tab and they are gone | we cannot retrieve them.' },
                        { icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z', title: 'No LinkedIn Connection', desc: 'We never connect to your LinkedIn account. We only read the PDF file you manually upload.' },
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

                {/* What we don't do */}
                <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-8 sm:p-10 mb-16">
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-6">What we do not do</h2>
                    <div className="space-y-4">
                        {[
                            'We do not sell, share, or transfer any user data',
                            'We do not build user profiles or track usage patterns',
                            'We do not store uploaded files or analysis results',
                            'We do not use dark patterns to collect information',
                            'We do not connect to your LinkedIn account in any way',
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                </div>
                                <p className="text-[15px] text-[#4B5563] leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div className="text-center">
                    <p className="text-sm text-[#6B7280] mb-3">Questions about data handling?</p>
                    <a href="https://www.linkedin.com/in/bhavishyasingla1/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A66C2] bg-[#EFF6FF] border border-[#DBEAFE] px-5 py-2.5 rounded-lg hover:bg-[#DBEAFE] transition-colors no-underline">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        Reach out on LinkedIn
                    </a>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'Data Security', href: '/data-security' },
                            { label: 'Cookie Policy', href: '/cookie-policy' },
                            { label: 'Terms of Service', href: '/terms' },
                            { label: 'Disclaimer', href: '/disclaimer' },
                            { label: 'How It Works', href: '/how-linkedin-rank-works' },
                            { label: 'Methodology', href: '/methodology' },
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
