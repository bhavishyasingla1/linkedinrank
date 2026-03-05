import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'Disclaimer',
    description: 'Important disclaimers about LinkedInRank scoring, AI recommendations, and the limitations of automated LinkedIn profile analysis.',
    keywords: 'linkedinrank disclaimer, linkedin tool disclaimer, linkedin scoring limitations',
    alternates: { canonical: 'https://linkedinrank.com/disclaimer' },
    openGraph: {
        title: 'Disclaimer',
        description: 'Disclaimers about LinkedInRank scoring and AI recommendations.',
        url: 'https://linkedinrank.com/disclaimer',
    },
}
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Disclaimer',
    description: 'LinkedInRank disclaimer. Our tool provides guidance, not guarantees.',
    url: 'https://linkedinrank.com/disclaimer',
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
}
export default function DisclaimerPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <section className="bg-[#EFF6FF] py-16 sm:py-20">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-[#DBEAFE] shadow-sm mb-6">
                        <svg className="w-7 h-7 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-4">Disclaimer</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                        Important information about the scope and limitations of LinkedInRank&apos;s profile analysis service.
                    </p>
                </div>
            </section>

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
                    {[
                        { icon: 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z', title: 'Not Professional Advice', desc: 'LinkedInRank is an automated analysis tool. It is not a substitute for professional career coaching, resume writing services, or recruiting expertise. Always use your own judgment when implementing changes.' },
                        { icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z', title: 'AI-Generated Content', desc: 'Recommendations are partially generated using Google Gemini AI. While designed to be helpful and specific, AI outputs may occasionally be inaccurate, incomplete, or not perfectly suited to your situation. Review all suggestions critically.' },
                        { icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z', title: 'PDF-Only Analysis', desc: 'We only evaluate data present in your LinkedIn PDF export. Profile photos, featured posts, recommendations from others, engagement metrics, and follower counts are not included in PDFs and therefore not scored. See our Methodology for full details.' },
                        { icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z', title: 'No Guarantees', desc: 'A higher LinkedInRank score does not guarantee increased recruiter interest, job offers, or professional outcomes. LinkedIn search algorithms and recruiter preferences are outside our control and may change.' },
                        { icon: 'M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5', title: 'No LinkedIn Affiliation', desc: 'LinkedInRank is an independent project and is not affiliated with, endorsed by, or connected to LinkedIn Corporation, Microsoft, or any of their subsidiaries. "LinkedIn" is a trademark of LinkedIn Corporation.' },
                        { icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z', title: 'Score Variability', desc: 'Scores may vary slightly between analyses due to the AI component. Rule-based scoring is deterministic, but AI-powered content assessment may produce minor variations. This is normal and expected behavior.' },
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
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-4">Limitation of Liability</h2>
                    <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                        LinkedInRank and its creator shall not be held liable for any direct, indirect, incidental, consequential, or special damages arising from the use of this service. This includes, but is not limited to, damages related to career decisions, profile changes, or reliance on AI-generated recommendations.
                    </p>
                    <p className="text-sm text-[#4B5563] leading-relaxed">
                        The service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                    </p>
                </div>

                <div className="text-center">
                    <p className="text-sm text-[#6B7280] mb-3">Have questions about this disclaimer?</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A66C2] bg-[#EFF6FF] border border-[#DBEAFE] px-5 py-2.5 rounded-lg hover:bg-[#DBEAFE] transition-colors no-underline">Contact Us →</Link>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'Terms of Service', href: '/terms' },
                            { label: 'Privacy Policy', href: '/privacy' },
                            { label: 'Data Security', href: '/data-security' },
                            { label: 'Cookie Policy', href: '/cookie-policy' },
                            { label: 'Methodology', href: '/methodology' },
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
