import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import { SparklesIcon, ShieldCheckIcon } from '@/components/ui/Icons'

export const metadata: Metadata = {
    title: 'Privacy Policy | How LinkedInRank Handles Your Data',
    description: 'How LinkedInRank handles your data: in-memory processing, zero storage, no tracking, no accounts required. Your LinkedIn PDF is never stored or shared.',
    keywords: 'linkedinrank privacy, linkedin profile tool privacy, linkedinrank data policy, is linkedinrank safe, linkedin analysis privacy',
    alternates: { canonical: 'https://linkedinrank.com/privacy' },
    openGraph: {
        title: 'Privacy Policy | How LinkedInRank Handles Your Data',
        description: 'In-memory processing, zero storage, no tracking. Your LinkedIn PDF is never stored or shared.',
        url: 'https://linkedinrank.com/privacy',
    },
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <SiteHeader />

            {/* Hero Section */}
            <section className="relative pt-16 pb-14 sm:pt-20 sm:pb-16 overflow-hidden aside-hero-glow">
                <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] text-[12px] font-extrabold text-[#2f27ce] shadow-2xs leading-none">
                        <ShieldCheckIcon size={13} />
                        <span>Privacy By Design</span>
                    </div>
                    <h1 className="text-[32px] sm:text-[44px] font-extrabold text-[#050315] tracking-tight leading-tight">
                        Your Data Stays Yours
                    </h1>
                    <p className="text-[15px] sm:text-[16.5px] text-[#050315]/75 max-w-lg mx-auto leading-relaxed">
                        Privacy is an immutable architectural choice at LinkedInRank. Here is exactly how your data is handled.
                    </p>
                </div>
            </section>

            <main id="main-content" className="flex-1 max-w-3xl mx-auto px-6 py-12 sm:py-20 space-y-12 w-full">
                {/* Core Policy Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {[
                        { title: 'No Data Storage', desc: 'Your uploaded PDF is processed entirely in ephemeral memory. Never saved to disk, never cached, never written to a database.' },
                        { title: 'Zero Accounts Required', desc: 'No email requirements, no passwords, no logins. You get your audit without surrendering personal identifiers.' },
                        { title: 'No Cookies or Tracking', desc: 'Zero third-party advertising cookies, zero behavioral fingerprinting. Your browsing session remains strictly confidential.' },
                        { title: 'Stateless AI Analysis', desc: 'Evaluations use secured API endpoints governed by strict privacy agreements. Data is never used to train public models.' },
                        { title: 'Direct Results Delivery', desc: 'Diagnostic results are rendered straight to your browser session. Once you close the tab, all runtime state vanishes.' },
                        { title: 'No LinkedIn Connection', desc: 'We never ask for your LinkedIn login or OAuth credentials. Analysis operates exclusively on the PDF export you provide.' },
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

                {/* What We Do Not Do */}
                <div className="bg-[#dedcff]/30 border border-[#dedcff] rounded-3xl p-7 sm:p-8 space-y-4">
                    <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        What We Guarantee We Will Never Do
                    </h2>
                    <div className="space-y-3">
                        {[
                            'We do not sell, rent, or monetize your resume or career data.',
                            'We do not build commercial user profiles or track search history.',
                            'We do not retain uploaded PDF files after the analysis response is sent.',
                            'We do not connect to your personal LinkedIn account or message your network.',
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-white border border-[#dedcff] text-[#2f27ce] flex items-center justify-center text-[11px] font-black shrink-0">
                                    ✕
                                </span>
                                <p className="text-[13.5px] font-medium text-[#050315]/80 leading-normal">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related Legal Links */}
                <div className="pt-8 border-t border-[#dedcff] space-y-3">
                    <p className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                        Related Resources
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                        {[
                            { label: 'Data Security', href: '/data-security' },
                            { label: 'Terms of Service', href: '/terms' },
                            { label: 'Cookie Policy', href: '/cookie-policy' },
                            { label: 'Disclaimer', href: '/disclaimer' },
                            { label: 'Scoring Methodology', href: '/methodology' },
                            { label: 'FAQ', href: '/faq' },
                            { label: 'Contact', href: '/contact' },
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
