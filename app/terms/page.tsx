import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'Terms of Service — LinkedInRank',
    description: 'Terms of Service for LinkedInRank. Understand the conditions of using our free LinkedIn profile evaluation tool.',
}
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service — LinkedInRank',
    description: 'Terms of Service for LinkedInRank, the free LinkedIn profile scoring tool.',
    url: 'https://linkedinrank.com/terms',
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
}
export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader navLinks={[{ href: '/privacy', label: 'Privacy' }, { href: '/faq', label: 'FAQ' }]} />

            <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-16 sm:py-20">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-sm mb-6">
                        <svg className="w-7 h-7 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-4">Terms of Service</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                        Last updated: February 2025. Please read these terms carefully before using LinkedInRank.
                    </p>
                </div>
            </section>

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <div className="space-y-10">
                    {[
                        { title: 'Acceptance of Terms', content: 'By accessing or using LinkedInRank (linkedinrank.com), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our service. LinkedInRank is a free tool and no account creation is required.' },
                        { title: 'Description of Service', content: 'LinkedInRank provides an automated LinkedIn profile evaluation service. Users upload a LinkedIn PDF export, which is analyzed using a combination of rule-based scoring and AI-powered content analysis. The service returns a score, category breakdown, and personalized recommendations. LinkedInRank is not affiliated with LinkedIn Corporation.' },
                        { title: 'User Responsibilities', content: 'You are responsible for ensuring you have the right to upload and analyze any LinkedIn PDF you submit. You should only upload your own profile or profiles you have explicit permission to analyze. You agree not to use the service for any unlawful purpose or to attempt to reverse-engineer, exploit, or abuse the service.' },
                        { title: 'Data Processing', content: 'Your LinkedIn PDF is processed entirely in server memory during analysis and is immediately discarded after results are generated. We do not store, log, or retain any uploaded files or analysis results. For complete details, see our Privacy Policy and Data Security pages.' },
                        { title: 'AI-Generated Content', content: 'Parts of the analysis use Google Gemini AI. AI-generated recommendations are suggestions only and should not be treated as professional career advice. You are responsible for reviewing and adapting any suggestions before implementing them on your LinkedIn profile.' },
                        { title: 'Accuracy & Limitations', content: 'LinkedInRank evaluates only the content present in your LinkedIn PDF export. It does not assess profile photos, engagement metrics, follower counts, or other non-PDF elements. Scores and recommendations are based on documented criteria but may not capture every nuance of your professional situation. See our Methodology page for full scoring details.' },
                        { title: 'Intellectual Property', content: 'All content on LinkedInRank — including text, design, scoring methodology, guides, and code — is the intellectual property of LinkedInRank. You may not reproduce, distribute, or create derivative works without written permission. Your uploaded PDF and resulting analysis remain your own.' },
                        { title: 'Limitation of Liability', content: 'LinkedInRank is provided "as is" without warranties of any kind. We are not responsible for any decisions made based on the analysis results. LinkedInRank is not a substitute for professional career coaching or recruiting services. See our Disclaimer for more details.' },
                        { title: 'Modifications', content: 'We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms. Material changes will be reflected in the "Last updated" date at the top of this page.' },
                        { title: 'Contact', content: 'For questions about these terms, please reach out via our Contact page or connect with the founder on LinkedIn.' },
                    ].map((section, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] text-[#0A66C2] text-xs font-bold flex items-center justify-center">{String(i + 1).padStart(2, '0')}</span>
                                <h2 className="text-base font-bold text-[#0A0F1C]">{section.title}</h2>
                            </div>
                            <p className="text-sm text-[#4B5563] leading-relaxed pl-11">{section.content}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'Privacy Policy', href: '/privacy' },
                            { label: 'Data Security', href: '/data-security' },
                            { label: 'Disclaimer', href: '/disclaimer' },
                            { label: 'Cookie Policy', href: '/cookie-policy' },
                            { label: 'Methodology', href: '/methodology' },
                            { label: 'FAQ', href: '/faq' },
                            { label: 'Contact', href: '/contact' },
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
                        <Link href="/disclaimer" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] transition-colors no-underline">Disclaimer</Link>
                        <Link href="/cookie-policy" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] transition-colors no-underline">Cookies</Link>
                        <Link href="/contact" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] transition-colors no-underline">Contact</Link>
                    </nav>
                </div>
            </footer>
        </main>
    )
}
