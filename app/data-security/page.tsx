import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'Data Security — How LinkedInRank Protects Your Information',
    description: 'Learn how LinkedInRank ensures your data security: in-memory processing, zero storage, encrypted transfers, and privacy-first architecture. Your LinkedIn PDF is never stored.',
    keywords: 'linkedinrank data security, linkedin profile data protection, linkedin tool privacy, secure linkedin analysis, is linkedinrank safe, linkedinrank encryption',
    alternates: { canonical: 'https://linkedinrank.com/data-security' },
    openGraph: {
        title: 'Data Security — How LinkedInRank Protects Your Information',
        description: 'In-memory processing, zero storage, encrypted transfers. Your LinkedIn PDF is never stored.',
        url: 'https://linkedinrank.com/data-security',
    },
}
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Data Security — LinkedInRank',
    description: 'How LinkedInRank handles your data: in-memory processing, zero storage, zero tracking.',
    url: 'https://linkedinrank.com/data-security',
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
}
export default function DataSecurityPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader navLinks={[{ href: '/privacy', label: 'Privacy' }, { href: '/faq', label: 'FAQ' }]} />

            <section className="relative bg-gradient-to-b from-[#F8FAFC] to-white pt-16 sm:pt-20 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%20fill%3D%22%23E5E7EB%22%2F%3E%3C%2Fsvg%3E')] opacity-40" />
                <div className="max-w-3xl mx-auto px-6 text-center relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                        <svg className="w-3.5 h-3.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                        <span className="text-xs font-semibold text-[#0A66C2]">Security</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-5">How We Protect Your Data</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-xl mx-auto leading-relaxed">
                        A detailed look at the security architecture behind LinkedInRank — from upload to analysis to results delivery.
                    </p>
                </div>
            </section>

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                {/* Security flow */}
                <div className="space-y-6 mb-16">
                    {[
                        { step: '01', title: 'Encrypted Upload', desc: 'Your LinkedIn PDF is uploaded over HTTPS (TLS 1.2+), ensuring the file is encrypted in transit. No unencrypted connections are accepted.', icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5' },
                        { step: '02', title: 'In-Memory Processing', desc: 'Your PDF is processed entirely in server RAM. It is never written to disk, never stored in a database, and never logged. The file exists only for the duration of analysis.', icon: 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z' },
                        { step: '03', title: 'AI Analysis via Secure API', desc: 'Profile content is sent to Google Gemini API over encrypted channels. Google processes data per their enterprise API terms and does not use it for model training. No identifiable data is retained post-call.', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
                        { step: '04', title: 'Immediate Disposal', desc: 'Once your results are generated and sent to your browser, all server-side data is automatically garbage collected. We have no mechanism to retrieve your file or results after the fact.', icon: 'M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' },
                        { step: '05', title: 'Browser-Only Results', desc: 'Your analysis results exist only in your browser session. Close the tab and they are gone. We cannot access, recover, or share your results because we never store them.', icon: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] transition-shadow">
                            <div className="flex items-start gap-5">
                                <div className="shrink-0">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white text-sm font-bold flex items-center justify-center shadow-[0_2px_8px_rgba(10,102,194,0.3)]">{item.step}</div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center">
                                            <svg className="w-4 h-4 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                        </div>
                                        <h2 className="text-lg font-bold text-[#0A0F1C]">{item.title}</h2>
                                    </div>
                                    <p className="text-[15px] text-[#4B5563] leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust signals */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
                    {[
                        { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', title: 'Zero Storage', desc: 'No files, no databases, no logs' },
                        { icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z', title: 'No Accounts', desc: 'No login, no signup, no email' },
                        { icon: 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88', title: 'Zero Tracking', desc: 'No cookies, no analytics, no ads' },
                    ].map((item, i) => (
                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-5 text-center">
                            <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center mx-auto mb-3">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                            </div>
                            <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</p>
                            <p className="text-xs text-[#6B7280]">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-2xl p-8 sm:p-10 text-center">
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">Analyze your profile with confidence</h2>
                    <p className="text-sm text-[#4B5563] mb-5 max-w-md mx-auto">Your data is processed securely and never stored. Try LinkedInRank — free, private, and under 60 seconds.</p>
                    <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile — It&apos;s Free</Link>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'Privacy Policy', href: '/privacy' },
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

            <footer className="border-t border-gray-100 bg-[#F8FAFC] py-8">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="font-bold text-sm text-[#0A0F1C] no-underline">LinkedIn<span className="text-gradient-brand">Rank</span></Link>
                        <a href="https://www.instagram.com/linkedinrank/" target="_blank" rel="noopener noreferrer" className="text-[#6B7280] hover:text-[#0A0F1C] transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
                        
                    </div>
                    <nav className="flex flex-wrap gap-x-6 gap-y-2">
                        <Link href="/" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] transition-colors no-underline">Home</Link>
                        <Link href="/privacy" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] transition-colors no-underline">Privacy</Link>
                        <Link href="/terms" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] transition-colors no-underline">Terms</Link>
                        <Link href="/cookie-policy" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] transition-colors no-underline">Cookies</Link>
                        <Link href="/contact" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] transition-colors no-underline">Contact</Link>
                    </nav>
                </div>
            </footer>
        </main>
    )
}
