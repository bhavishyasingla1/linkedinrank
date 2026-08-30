import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import { SparklesIcon } from '@/components/ui/Icons'

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
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            {/* Header Hero with Lavender Wash */}
            <section className="relative pt-16 pb-14 sm:pt-20 sm:pb-16 overflow-hidden aside-hero-glow">
                <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] text-[12px] font-extrabold text-[#2f27ce] shadow-2xs leading-none">
                        <SparklesIcon size={13} />
                        <span>Legal Agreement</span>
                    </div>
                    <h1 className="text-[32px] sm:text-[44px] font-extrabold text-[#050315] tracking-tight leading-tight">
                        Terms of Service
                    </h1>
                    <p className="text-[15px] sm:text-[16.5px] text-[#050315]/75 max-w-lg mx-auto leading-relaxed">
                        Last updated: February 2026. Please review these terms governing the use of LinkedInRank.
                    </p>
                </div>
            </section>

            <main id="main-content" className="flex-1 max-w-3xl mx-auto px-6 py-12 sm:py-20 space-y-12 w-full">
                <div className="space-y-5">
                    {[
                        { title: 'Acceptance of Terms', content: 'By accessing or using LinkedInRank (linkedinrank.com), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our service. LinkedInRank is a free diagnostic tool and no account creation is required.' },
                        { title: 'Description of Service', content: 'LinkedInRank provides an automated LinkedIn profile evaluation service. Users upload a LinkedIn PDF export, which is analyzed using rule-based scoring and content benchmarking. The service returns a diagnostic score, category breakdown, and actionable suggestions. LinkedInRank is independent and not affiliated with LinkedIn Corporation.' },
                        { title: 'User Responsibilities', content: 'You are responsible for ensuring you have the right to upload and analyze any LinkedIn PDF you submit. You should only upload your own profile or profiles you have explicit permission to evaluate. You agree not to use the service for unlawful purposes or attempt to reverse-engineer or abuse the system.' },
                        { title: 'Data Processing & Ephemerality', content: 'Your LinkedIn PDF is processed entirely in server memory during active analysis and is immediately discarded after results are calculated. We do not store, retain, or share uploaded files or profile data. For complete details, consult our Privacy Policy and Data Security documentation.' },
                        { title: 'AI-Generated Content', content: 'Sections of the analysis provide AI-assisted suggestions. These recommendations are informational suggestions and should not be treated as formal career advice. You are responsible for reviewing and tailoring suggestions before applying them to your profile.' },
                        { title: 'Accuracy & Diagnostic Scope', content: 'LinkedInRank evaluates the textual content present in your LinkedIn PDF export. It does not inspect profile photos, private network activity, or real-time recruiter searches. Scores reflect benchmarked algorithmic guidelines but cannot guarantee specific employment outcomes.' },
                        { title: 'Intellectual Property', content: 'All platform content—including interface designs, scoring methodologies, articles, and software—is the intellectual property of LinkedInRank. Your uploaded profile content and resulting score summaries remain your own.' },
                        { title: 'Limitation of Liability', content: 'LinkedInRank is provided "as is" without express or implied warranties. We are not liable for decisions made based on diagnostic scores or suggested copy improvements.' },
                        { title: 'Modifications', content: 'We may update these terms periodically to reflect service enhancements. Continued use of LinkedInRank constitutes agreement to updated terms.' },
                        { title: 'Contact', content: 'For inquiries regarding these terms, please connect via our Contact page or reach out directly to the founder on LinkedIn.' },
                    ].map((section, i) => (
                        <div key={i} className="bg-white border border-[#dedcff] rounded-2xl p-6 sm:p-7 shadow-xs space-y-2.5 transition-all hover:border-[#2f27ce]/50">
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-xl bg-[#dedcff] border border-[#dedcff] text-[#2f27ce] text-[12px] font-extrabold flex items-center justify-center shrink-0">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h2 className="text-[16px] sm:text-[17px] font-bold text-[#050315] tracking-tight">
                                    {section.title}
                                </h2>
                            </div>
                            <p className="text-[13.5px] sm:text-[14px] text-[#050315]/75 leading-relaxed pl-11">
                                {section.content}
                            </p>
                        </div>
                    ))}
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
                            { label: 'Disclaimer', href: '/disclaimer' },
                            { label: 'Cookie Policy', href: '/cookie-policy' },
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
