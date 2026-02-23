import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'Best LinkedIn Profile Review Tools Compared (2026) | LinkedInRank',
    description: 'Compare the best LinkedIn profile review and optimization tools in 2026. Side-by-side comparison of features, pricing, privacy, methodology, and accuracy. See why LinkedInRank is the #1 free LinkedIn scorer.',
    keywords: 'linkedin profile review tools, best linkedin optimizer, linkedin profile tools comparison, linkedin scorer comparison, linkedinrank vs competitors, free linkedin profile review, linkedin profile audit tools',
    alternates: { canonical: 'https://linkedinrank.com/compare-linkedin-review-tools' },
    openGraph: {
        title: 'Best LinkedIn Profile Review Tools Compared (2026)',
        description: 'Side-by-side comparison of LinkedIn profile review tools. Features, pricing, privacy, and accuracy.',
        url: 'https://linkedinrank.com/compare-linkedin-review-tools',
    },
}

export default function CompareToolsPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            {/* Hero */}
            <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-16 sm:py-20">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                        <svg className="w-3.5 h-3.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
                        <span className="text-xs font-semibold text-[#0A66C2]">Comparison</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-5">Comparing LinkedIn Profile Review Tools</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                        A neutral comparison of common approaches so you can make an informed choice about how to evaluate your LinkedIn profile.
                    </p>
                </div>
            </section>

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <div className="space-y-12 text-[15px] text-[#4B5563] leading-relaxed">
                    {/* Tool types */}
                    <section>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-[#0A0F1C]">Types of tools available</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: 'Profile scorers', desc: 'Analyze your profile and return a score. Quality varies | some use keyword matching, others use AI content analysis. Key differentiators: methodology transparency, privacy, and recommendation depth.', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
                                { title: 'AI rewriters', desc: 'Rewrite your profile sections using AI. Can produce polished text but may lose your authentic voice. Best used as a starting point, not a final draft.', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
                                { title: 'Automation tools', desc: 'Focused on connection requests, messaging, and engagement. Fundamentally different from profile evaluation and often violate LinkedIn terms of service.', icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182' },
                                { title: 'Professional services', desc: 'Human experts who review your profile manually. Higher cost but potentially more nuanced. Quality depends entirely on the reviewer.', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                    <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center mb-3">
                                        <svg className="w-4.5 h-4.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                    </div>
                                    <h3 className="text-sm font-bold text-[#0A0F1C] mb-1.5">{item.title}</h3>
                                    <p className="text-sm text-[#4B5563] leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* What to look for */}
                    <section>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-[#0A0F1C]">What to look for</h2>
                        </div>
                        <div className="space-y-3">
                            {[
                                { label: 'Transparent methodology', desc: 'Can you see exactly how your score is calculated? Are the criteria documented?' },
                                { label: 'Privacy practices', desc: 'Does the tool store your data? Does it require login? Does it share data with third parties?' },
                                { label: 'Actionable output', desc: 'Does the tool tell you specifically what to change, or just give a number?' },
                                { label: 'Career stage awareness', desc: 'Does it judge a student the same way as a VP? Good tools adapt expectations.' },
                                { label: 'No dark patterns', desc: 'Does it create urgency or fear to upsell? Does it make inflated claims?' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-start gap-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <div className="w-6 h-6 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0 mt-0.5">
                                        <svg className="w-3 h-3 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C] mb-0.5">{item.label}</p>
                                        <p className="text-sm text-[#4B5563]">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Where LR fits */}
                    <section>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-[#0A0F1C]">Where LinkedInRank fits</h2>
                        </div>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-2xl p-6 sm:p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    'Fully transparent scoring methodology',
                                    'No data storage, no accounts, no cookies',
                                    'Personalized recommendations with examples',
                                    'Career stage detection and adapted expectations',
                                    'Completely free with no upsell',
                                    'Rule-based + AI analysis for depth',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-white border border-[#DBEAFE] flex items-center justify-center shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                        </div>
                                        <span className="text-sm text-[#0A0F1C] font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Honest position */}
                    <section>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-[#0A0F1C]">Our honest position</h2>
                        </div>
                        <p className="text-[15px] text-[#4B5563] leading-relaxed">No single tool can replace thoughtful, intentional profile building. LinkedInRank aims to provide a structured starting point | showing you what is working, what is not, and what to prioritize. The best results come from combining automated analysis with your own judgment about your career narrative.</p>
                    </section>
                </div>

                {/* CTA */}
                <div className="mt-16 bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-2xl p-8 sm:p-10 text-center">
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">Try the evaluation yourself</h2>
                    <p className="text-sm text-[#4B5563] mb-5 max-w-md mx-auto">Upload your LinkedIn PDF and see how your profile scores | free, private, under 60 seconds.</p>
                    <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It&apos;s Free</Link>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'Methodology', href: '/methodology' },
                            { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            { label: 'Profile Checklist', href: '/linkedin-profile-checklist' },
                            { label: 'Recruiter Psychology', href: '/recruiter-psychology' },
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
