import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Terms of Service for LinkedInRank. Understand the conditions of using our free LinkedIn profile scoring and analysis tool.',
    keywords: 'linkedinrank terms of service, linkedinrank terms, linkedin tool terms',
    alternates: { canonical: 'https://linkedinrank.com/terms' },
    openGraph: {
        title: 'Terms of Service',
        description: 'Terms and conditions for using LinkedInRank\'s free LinkedIn profile scoring tool.',
        url: 'https://linkedinrank.com/terms',
    },
}
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service',
    description: 'Terms of Service for LinkedInRank, the free LinkedIn profile scoring tool.',
    url: 'https://linkedinrank.com/terms',
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
}
export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

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
                        { title: 'Intellectual Property', content: 'All content on LinkedInRank | including text, design, scoring methodology, guides, and code | is the intellectual property of LinkedInRank. You may not reproduce, distribute, or create derivative works without written permission. Your uploaded PDF and resulting analysis remain your own.' },
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
                    <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related</p>
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

            <SiteFooter />
        </main>
    )
}
