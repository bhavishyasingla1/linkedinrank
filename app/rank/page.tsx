import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'Rank Your LinkedIn Profile | Free LinkedIn Ranking Tool (2026)',
    description: 'Rank your LinkedIn profile against 30+ professional signals with the world\'s best LinkedIn ranking tool. Get Bronze, Silver, Gold, or Platinum tier with AI-powered recommendations. Free, no login required.',
    keywords: 'rank linkedin profile, linkedin ranking tool, linkedin profile rank, linkedinrank, linkedin tier, linkedin profile rating free, linkedin profile ranker, linkedin rank checker, best linkedin ranking tool, linkedin profile benchmark',
    alternates: { canonical: 'https://linkedinrank.com/rank' },
    openGraph: {
        title: 'Rank Your LinkedIn Profile | Free LinkedIn Ranking Tool',
        description: 'Get your LinkedIn tier: Bronze, Silver, Gold, or Platinum. AI-powered recommendations included. Free, no login.',
        url: 'https://linkedinrank.com/rank',
    },
}

export default function RankPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">LinkedIn Rank</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">How to Rank Your LinkedIn Profile</h1>
                <p className="text-[15px] text-[#4B5563] mb-12 leading-relaxed max-w-2xl">
                    LinkedIn removed its profile strength meter in 2023. LinkedInRank is a free, independent tool that fills that gap | giving you a <strong className="text-[#0A0F1C]">transparent score out of 100</strong> based on documented criteria, not vague progress bars.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    <section aria-labelledby="what-rank">
                        <h2 id="what-rank" className="text-2xl font-bold text-[#0A0F1C] mb-6">What Does It Mean to Rank Your Profile?</h2>
                        <p className="mb-4">Ranking your LinkedIn profile means evaluating how effectively it communicates your professional value. A high-ranking profile is one that:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z', text: 'Appears in recruiter searches for relevant keywords' },
                                { icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z', text: 'Communicates value within 7 seconds of scanning' },
                                { icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Has clear, specific content across all key sections' },
                                { icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', text: 'Demonstrates impact with action verbs and outcomes' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                                    <svg className="w-5 h-5 text-[#0A66C2] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                    <p className="text-sm text-[#4B5563]">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section aria-labelledby="how-rank">
                        <h2 id="how-rank" className="text-2xl font-bold text-[#0A0F1C] mb-6">How LinkedInRank Ranks Your Profile</h2>
                        <p className="mb-4">LinkedInRank uses a hybrid approach combining rule-based analysis with AI-powered content evaluation:</p>
                        <div className="space-y-5">
                            {[
                                { step: '01', title: 'Upload your LinkedIn PDF', desc: 'Export your profile from LinkedIn and upload it to LinkedInRank. No login, no signup, no data stored.' },
                                { step: '02', title: 'Rule-based signal analysis', desc: 'Our scoring engine evaluates 30+ signals across headline, about, experience, skills, education, and completeness using documented, transparent criteria.' },
                                { step: '03', title: 'AI content quality analysis', desc: 'Google Gemini AI evaluates content quality, relevance, and positioning | generating personalized recommendations with before/after examples.' },
                                { step: '04', title: 'Career stage adaptation', desc: 'Your score is calibrated to your career stage. A student, job seeker, mid-career professional, and founder are each evaluated with appropriate expectations.' },
                                { step: '05', title: 'Score, tier, and roadmap', desc: 'You receive a score out of 100, tier placement, category breakdown, recommendations, and a prioritized improvement roadmap.' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white text-xs font-bold flex items-center justify-center shrink-0">{item.step}</div>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C]">{item.title}</p>
                                        <p className="text-sm text-[#4B5563]">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section aria-labelledby="why-rank">
                        <h2 id="why-rank" className="text-2xl font-bold text-[#0A0F1C] mb-6">Why Ranking Your Profile Matters</h2>
                        <p className="mb-3">LinkedIn is the world's largest professional network with over 1 billion members. Standing out requires more than just having a profile | it requires having a <em>strong</em> profile. Here is why ranking matters:</p>
                        <div className="space-y-3">
                            {[
                                { title: 'Recruiter visibility', desc: 'Higher-quality profiles with relevant keywords appear more often in recruiter searches. Every improvement to your profile increases discoverability.' },
                                { title: 'First impressions', desc: 'Hiring managers, investors, clients, and partners check LinkedIn before meetings. A strong profile builds credibility before you even speak.' },
                                { title: 'Career progression', desc: 'Professionals who regularly optimize their LinkedIn profiles report more inbound opportunities, better networking outcomes, and faster career growth.' },
                                { title: 'Competitive advantage', desc: 'Most people never optimize their LinkedIn beyond the basics. A well-ranked profile puts you ahead of 80% of professionals in your field.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</p>
                                    <p className="text-sm text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section aria-labelledby="free-tools">
                        <h2 id="free-tools" className="text-2xl font-bold text-[#0A0F1C] mb-6">LinkedInRank vs Other Profile Tools</h2>
                        <p className="mb-3">Unlike other LinkedIn profile tools, LinkedInRank is:</p>
                        <ul className="space-y-2">
                            {[
                                'Completely free | no premium tiers, no paywalls, no upsells',
                                'Privacy-first | no login, no data storage, no cookies',
                                'Transparent | every scoring criterion is documented and explained',
                                'Career-stage adaptive | students, job seekers, and executives are evaluated appropriately',
                                'AI-enhanced | personalized recommendations powered by Google Gemini',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                    <span className="text-sm text-[#4B5563]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Rank your LinkedIn profile now</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF and get your free ranking with a detailed breakdown and improvement roadmap.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Get Your Free Rank</Link>
                    </div>

                    <div className="pt-8 border-t border-gray-100 mt-6">
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/linkedin-optimization-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Full Optimization Guide</Link>
                            <Link href="/top-1-percent-profiles" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Top 1% Profiles</Link>
                            <Link href="/linkedin-headline-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Headline Guide</Link>
                            <Link href="/recruiter-psychology" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Recruiter Psychology</Link>
                            <Link href="/linkedin-mistakes" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Top 10 Mistakes</Link>
                            <Link href="/for-students" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">For Students</Link>
                            <Link href="/for-jobseekers" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">For Job Seekers</Link>
                        </div>
                    </div>
                </div>
            </article>

            <SiteFooter />
        </main>
    )
}
