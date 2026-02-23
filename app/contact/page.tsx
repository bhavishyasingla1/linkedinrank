import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'Contact LinkedInRank | Get in Touch',
    description: 'Have questions about LinkedInRank, LinkedIn profile scoring, or need help? Email us at hello@linkedinrank.com or connect via LinkedIn. We respond to every message.',
    keywords: 'contact linkedinrank, linkedinrank support, linkedin profile help, linkedinrank feedback',
    alternates: { canonical: 'https://linkedinrank.com/contact' },
    openGraph: {
        title: 'Contact LinkedInRank',
        description: 'Get in touch with the LinkedInRank team. We respond to every message.',
        url: 'https://linkedinrank.com/contact',
    },
}

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            {/* Hero */}
            <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-16 sm:py-20">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-sm mb-6">
                        <svg className="w-7 h-7 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-4">Get in Touch</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                        For questions, feedback, or partnership inquiries | reach the LinkedInRank team via email or LinkedIn.
                    </p>
                </div>
            </section>

            <article className="max-w-xl mx-auto px-6 py-16 sm:py-20">
                {/* Main CTA card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.06)] mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#0A66C2] flex items-center justify-center mx-auto mb-5 shadow-[0_4px_12px_rgba(10,102,194,0.3)]">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </div>
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-2">Connect with the Founder</h2>
                    <p className="text-sm text-[#6B7280] mb-6">Bhavishya Singla</p>
                    <a
                        href="https://www.linkedin.com/in/bhavishyasingla1/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#0A66C2] hover:bg-[#084E96] px-6 py-3 rounded-lg transition-colors no-underline shadow-[0_2px_8px_rgba(10,102,194,0.3)]"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        Message on LinkedIn
                    </a>
                    <p className="text-xs text-[#9CA3AF] mt-5">We aim to respond within 48 hours</p>
                </div>

                {/* Company LinkedIn page card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.06)] mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center mx-auto mb-5">
                        <svg className="w-8 h-8 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </div>
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-2">Follow LinkedIn Rank</h2>
                    <p className="text-sm text-[#6B7280] mb-6">Our company page for updates, tips, and announcements</p>
                    <a
                        href="https://www.linkedin.com/company/linkedin-rank/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A66C2] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#DBEAFE] px-6 py-3 rounded-lg transition-colors no-underline"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        Follow on LinkedIn
                    </a>
                </div>

                {/* Social links row | card style */}
                <div className="grid grid-cols-3 gap-3 mb-10">
                    <a href="https://www.linkedin.com/company/linkedin-rank/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-xl p-4 hover:border-[#0A66C2] hover:shadow-sm transition-all group">
                        <svg className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#0A66C2] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        <span className="text-xs font-medium text-[#6B7280] group-hover:text-[#0A66C2] transition-colors">LinkedIn</span>
                    </a>
                    <a href="https://www.instagram.com/linkedinrank/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-xl p-4 hover:border-[#E4405F] hover:shadow-sm transition-all group">
                        <svg className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#E4405F] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        <span className="text-xs font-medium text-[#6B7280] group-hover:text-[#E4405F] transition-colors">Instagram</span>
                    </a>
                    <a href="mailto:hello@linkedinrank.com" className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-xl p-4 hover:border-[#0A0F1C] hover:shadow-sm transition-all group">
                        <svg className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#0A0F1C] transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                        <span className="text-xs font-medium text-[#6B7280] group-hover:text-[#0A0F1C] transition-colors">Email</span>
                    </a>
                </div>

                {/* Email card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.06)] mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#0A0F1C] flex items-center justify-center mx-auto mb-5 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    </div>
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-2">Email Us</h2>
                    <p className="text-sm text-[#6B7280] mb-6">For general inquiries, feedback, or partnerships</p>
                    <a
                        href="mailto:hello@linkedinrank.com"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#0A0F1C] hover:bg-[#1a1f2e] px-6 py-3 rounded-lg transition-colors no-underline shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                        hello@linkedinrank.com
                    </a>
                    <p className="text-xs text-[#9CA3AF] mt-5">We typically reply within 24 hours</p>
                </div>

                {/* Helpful links */}
                <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-6">
                    <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-4">Before reaching out</p>
                    <div className="space-y-3">
                        {[
                            { label: 'Scoring or methodology questions', href: '/methodology', linkText: 'Read the Methodology' },
                            { label: 'Common questions answered', href: '/faq', linkText: 'Visit the FAQ' },
                            { label: 'How your data is handled', href: '/privacy', linkText: 'See our Privacy Policy' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-4 py-3">
                                <span className="text-sm text-[#4B5563]">{item.label}</span>
                                <Link href={item.href} className="text-xs font-semibold text-[#0A66C2] no-underline hover:underline shrink-0 ml-3">{item.linkText} →</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </article>

            <SiteFooter />
        </main>
    )
}
