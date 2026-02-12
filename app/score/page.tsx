import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'LinkedIn Profile Score — Check Your Score Free | LinkedInRank',
    description: 'Get your free LinkedIn profile score from LinkedInRank. See how you rank across 30+ signals including headline clarity, experience depth, skills relevance, and profile completeness. No login required.',
    keywords: 'linkedin profile score, linkedin score checker, linkedin profile rating, linkedinrank score, check linkedin profile strength, free linkedin score',
}

export default function ScorePage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader navLinks={[{ href: '/methodology', label: 'Methodology' }]} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">LinkedIn Score</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">What Is a LinkedIn Profile Score?</h1>
                <p className="text-[15px] text-[#4B5563] mb-12 leading-relaxed max-w-2xl">
                    A LinkedIn profile score is a numerical evaluation of how well your profile communicates your professional value. LinkedInRank scores profiles out of 100 using <strong className="text-[#0A0F1C]">30+ transparent, documented signals</strong> — giving you a clear picture of where you stand and how to improve.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    <section aria-labelledby="how-scored">
                        <h2 id="how-scored" className="text-2xl font-bold text-[#0A0F1C] mb-6">How Your LinkedIn Score Is Calculated</h2>
                        <p className="mb-4">LinkedInRank evaluates six core areas of your profile, each weighted by its impact on recruiter engagement and profile discoverability:</p>
                        <div className="space-y-2">
                            {[
                                { cat: 'Headline', pts: 20, signals: 'Role clarity, keyword presence, length, positioning strength' },
                                { cat: 'About / Summary', pts: 20, signals: 'Professional direction, skills mentioned, structure, first-person voice' },
                                { cat: 'Experience', pts: 25, signals: 'Action verbs, role descriptions, quantified outcomes, description depth' },
                                { cat: 'Skills', pts: 15, signals: 'Relevance to role, specificity, alignment with headline and experience' },
                                { cat: 'Education', pts: 10, signals: 'Degree completeness, field alignment, certifications present' },
                                { cat: 'Completeness', pts: 10, signals: 'Section coverage, content depth, logical structure' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex items-start gap-4">
                                    <span className="text-lg font-bold text-[#0A66C2] tabular-nums shrink-0 w-8">{item.pts}</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C]">{item.cat}</p>
                                        <p className="text-xs text-[#6B7280]">{item.signals}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section aria-labelledby="tiers">
                        <h2 id="tiers" className="text-2xl font-bold text-[#0A0F1C] mb-6">LinkedInRank Tier System</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                { tier: 'Bronze', range: '0–54', color: '#92400E', bg: '#FEF3C7', desc: 'Profile needs work' },
                                { tier: 'Silver', range: '55–69', color: '#6B7280', bg: '#F3F4F6', desc: 'Solid foundation' },
                                { tier: 'Gold', range: '70–84', color: '#92400E', bg: '#FEF3C7', desc: 'Strong presence' },
                                { tier: 'Platinum', range: '85–100', color: '#5B21B6', bg: '#EDE9FE', desc: 'Exceptional' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2" style={{ color: item.color, backgroundColor: item.bg }}>{item.tier}</span>
                                    <p className="text-lg font-bold text-[#0A0F1C] tabular-nums">{item.range}</p>
                                    <p className="text-xs text-[#6B7280] mt-1">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm text-[#6B7280]">Most professionals score 55–75 on their first analysis. Scores above 85 are rare and indicate an exceptionally well-crafted profile.</p>
                    </section>

                    <section aria-labelledby="why-no-linkedin">
                        <h2 id="why-no-linkedin" className="text-2xl font-bold text-[#0A0F1C] mb-6">Why LinkedIn Removed Profile Strength</h2>
                        <p className="mb-3">LinkedIn retired its "Profile Strength" indicator and the "All-Star" profile badge in 2023. The feature was criticized for being vague and gameable — users could reach "All-Star" without actually having a strong profile.</p>
                        <p>LinkedInRank provides what LinkedIn's meter could not: <strong className="text-[#0A0F1C]">transparent, documented scoring criteria</strong> with signal-level feedback and actionable recommendations. Every point is earned based on clear criteria explained in our methodology.</p>
                    </section>

                    <section aria-labelledby="what-good">
                        <h2 id="what-good" className="text-2xl font-bold text-[#0A0F1C] mb-6">What Makes a High-Scoring Profile?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { label: 'Clear, keyword-rich headline', desc: 'Role + industry + specialization in under 120 characters' },
                                { label: 'Compelling About section', desc: 'First-person narrative covering skills, experience, and goals' },
                                { label: 'Impact-driven experience', desc: 'Action verbs, specific contributions, and measurable outcomes' },
                                { label: 'Relevant, specific skills', desc: 'Tools and technologies aligned with your headline and target role' },
                                { label: 'Complete education', desc: 'Degree, field of study, and relevant certifications' },
                                { label: 'Full profile coverage', desc: 'Every section filled with substantive, relevant content' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C]">{item.label}</p>
                                        <p className="text-xs text-[#6B7280]">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Check your LinkedIn profile score</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF and get your free score with personalized recommendations in under a minute.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Get Your Free Score</Link>
                    </div>

                    <div className="pt-8 border-t border-gray-100 mt-6">
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/linkedin-optimization-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Full Optimization Guide</Link>
                            <Link href="/linkedin-headline-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Headline Guide</Link>
                            <Link href="/top-1-percent-profiles" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Top 1% Profiles</Link>
                            <Link href="/linkedin-mistakes" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Top 10 Mistakes</Link>
                            <Link href="/for-students" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">For Students</Link>
                            <Link href="/for-jobseekers" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">For Job Seekers</Link>
                            <Link href="/linkedin-profile-checklist" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Profile Checklist</Link>
                        </div>
                    </div>
                </div>
            </article>

            <footer className="border-t border-gray-100 bg-[#F8FAFC] py-8">
                <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4"><Link href="/" className="font-bold text-sm text-[#0A0F1C] no-underline">LinkedIn<span className="text-gradient-brand">Rank</span></Link><a href="https://www.instagram.com/linkedinrank/" target="_blank" rel="noopener noreferrer" className="text-[#6B7280] hover:text-[#0A0F1C] transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a></div>
                    <nav className="flex flex-wrap gap-x-6 gap-y-2">
                        <Link href="/" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Home</Link>
                        <Link href="/methodology" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Methodology</Link>
                        <Link href="/linkedin-best-practices" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Best Practices</Link>
                        <Link href="/faq" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">FAQ</Link>
                    </nav>
                </div>
            </footer>
        </main>
    )
}
