import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'

export const metadata: Metadata = {
    title: 'LinkedIn Profile Optimization | Complete Guide 2026',
    description: 'The complete guide to optimizing your LinkedIn profile in 2026. Learn what recruiters look for, how the LinkedIn algorithm works, and how to improve your profile score with LinkedInRank | the #1 free LinkedIn scorer.',
    keywords: 'linkedin profile optimization, linkedin tips 2026, linkedin algorithm, linkedin profile guide, linkedinrank, improve linkedin profile, linkedin optimization tips, linkedin profile makeover, linkedin seo',
    alternates: { canonical: 'https://linkedinrank.com/linkedin' },
    openGraph: {
        title: 'LinkedIn Profile Optimization | Complete Guide 2026',
        description: 'Everything you need to optimize your LinkedIn profile. Recruiter insights, algorithm tips, and free scoring with LinkedInRank.',
        url: 'https://linkedinrank.com/linkedin',
    },
}

export default function LinkedInPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">LinkedIn Guide</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">The Complete LinkedIn Profile Optimization Guide</h1>
                <p className="text-[15px] text-[#4B5563] mb-12 leading-relaxed max-w-2xl">
                    LinkedIn has over <strong className="text-[#0A0F1C]">1 billion members</strong> across 200 countries. With 87% of recruiters using it as their primary sourcing tool, your profile is often your first impression. This guide covers everything you need to know to stand out.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    <section aria-labelledby="why-linkedin">
                        <h2 id="why-linkedin" className="text-2xl font-bold text-[#0A0F1C] mb-6">Why Your LinkedIn Profile Matters</h2>
                        <p className="mb-4">Your LinkedIn profile is more than a digital resume. It is a searchable, always-on professional presence that works for you 24/7. According to LinkedIn's own data:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                            {[
                                { stat: '87%', desc: 'of recruiters use LinkedIn to find candidates' },
                                { stat: '7.4s', desc: 'average time a recruiter spends on a profile' },
                                { stat: '5x', desc: 'more connection requests with a complete About section' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5 text-center">
                                    <p className="text-2xl font-bold text-[#0A66C2] mb-1">{item.stat}</p>
                                    <p className="text-xs text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p>Whether you are job hunting, building a personal brand, fundraising, or networking | your profile needs to communicate your value clearly and quickly.</p>
                    </section>

                    <section aria-labelledby="algo">
                        <h2 id="algo" className="text-2xl font-bold text-[#0A0F1C] mb-6">How the LinkedIn Algorithm Works</h2>
                        <p className="mb-3">LinkedIn's search algorithm determines who appears in recruiter searches. The key factors include:</p>
                        <div className="space-y-3">
                            {[
                                { title: 'Headline keywords', desc: 'Your headline is the most heavily weighted field in LinkedIn search. Include your job title, industry, and specialization.' },
                                { title: 'Skills section', desc: 'LinkedIn matches skills to search queries. Profiles with relevant skills are up to 27x more likely to appear in search results.' },
                                { title: 'Keyword consistency', desc: 'The algorithm favors profiles where the same keywords appear across headline, About, experience, and skills sections.' },
                                { title: 'Profile completeness', desc: 'Complete profiles rank higher. LinkedIn considers headline, About, experience (with descriptions), skills, and education as core sections.' },
                                { title: 'Connection degree', desc: '1st and 2nd degree connections rank higher in search results. Building a relevant network improves discoverability.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</p>
                                    <p className="text-sm text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section aria-labelledby="sections">
                        <h2 id="sections" className="text-2xl font-bold text-[#0A0F1C] mb-6">The 6 Profile Sections That Matter Most</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { name: 'Headline', weight: '20%', tip: 'Include role + industry + value prop. Keep under 120 characters.' },
                                { name: 'About / Summary', weight: '20%', tip: 'Write in first person. Cover what you do, your skills, and your goals.' },
                                { name: 'Experience', weight: '25%', tip: 'Start bullets with action verbs. Show impact and outcomes.' },
                                { name: 'Skills', weight: '15%', tip: 'Add specific tools and technologies. Pin your top 3 strategically.' },
                                { name: 'Education', weight: '10%', tip: 'Include degree, field of study, and relevant certifications.' },
                                { name: 'Completeness', weight: '10%', tip: 'Fill every section. Even brief content beats empty sections.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-bold text-[#0A0F1C]">{item.name}</h3>
                                        <span className="text-xs font-bold text-[#0A66C2] bg-[#EFF6FF] px-2 py-0.5 rounded-md">{item.weight}</span>
                                    </div>
                                    <p className="text-sm text-[#4B5563]">{item.tip}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm text-[#6B7280]">These weights reflect how LinkedInRank scores profiles. They are based on research into what correlates with recruiter engagement and profile views.</p>
                    </section>

                    <section aria-labelledby="mistakes">
                        <h2 id="mistakes" className="text-2xl font-bold text-[#0A0F1C] mb-6">Common LinkedIn Mistakes to Avoid</h2>
                        <div className="space-y-3">
                            {[
                                'Using "Open to opportunities" as your entire headline | it wastes your most valuable real estate',
                                'Writing About in third person | it feels impersonal and less authentic',
                                'Listing duties instead of achievements in Experience | recruiters want impact',
                                'Adding only generic skills like "Leadership" | be specific with tools and technologies',
                                'Leaving sections empty | incomplete profiles rank lower in search results',
                                'Ignoring your headline keywords | they are the #1 factor in LinkedIn search',
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0 mt-0.5">
                                        <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </div>
                                    <p className="text-sm text-[#4B5563]">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section aria-labelledby="measure">
                        <h2 id="measure" className="text-2xl font-bold text-[#0A0F1C] mb-6">How to Measure Your Profile Strength</h2>
                        <p className="mb-4">LinkedIn removed its own "Profile Strength" meter in 2023. LinkedInRank fills that gap with a more transparent, signal-based approach. We evaluate 30+ visible signals across 6 categories and provide:</p>
                        <ul className="space-y-2 mb-4">
                            {[
                                'A score out of 100 with tier placement (Bronze through Platinum)',
                                'Category-by-category breakdown with signal-level pass/fail feedback',
                                'Personalized best practices based on your career stage',
                                'Personalized recommendations with before/after examples',
                                'An improvement roadmap showing exactly where to focus',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                    <span className="text-sm text-[#4B5563]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Get your free LinkedIn profile score</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF to LinkedInRank and see exactly where your profile stands | with a clear roadmap to improve it.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It's Free</Link>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/linkedin-profile-for-students" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">For Students</Link>
                            <Link href="/for-jobseekers" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">For Job Seekers</Link>
                            <Link href="/for-founders" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">For Founders</Link>
                            <Link href="/linkedin-headline-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Headline Guide</Link>
                            <Link href="/linkedin-about-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">About Section Guide</Link>
                            <Link href="/linkedin-keywords-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Keywords Guide</Link>
                            <Link href="/recruiter-psychology" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Recruiter Psychology</Link>
                            <Link href="/linkedin-best-practices" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Best Practices</Link>
                            <Link href="/linkedin-profile-checklist" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Profile Checklist</Link>
                            <Link href="/linkedin-optimization-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Full Optimization Guide</Link>
                        </div>
                    </div>
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
