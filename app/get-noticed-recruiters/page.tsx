import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'How to Get Noticed by Recruiters on LinkedIn | Actionable Guide (2026)',
    description: 'Practical strategies to get found and contacted by recruiters on LinkedIn in 2026. Keyword optimization, Open to Work settings, networking tactics, and profile signals. Free scoring with LinkedInRank.',
    keywords: 'get noticed by recruiters linkedin 2026, how to attract recruiters on linkedin, linkedin recruiter visibility, linkedin job search tips, how to get recruited on linkedin, linkedin recruiter outreach, linkedin visibility tips',
    alternates: { canonical: 'https://linkedinrank.com/get-noticed-recruiters' },
    openGraph: {
        title: 'How to Get Noticed by Recruiters on LinkedIn',
        description: 'Practical strategies to get found and contacted by recruiters. Keywords, settings, and profile signals.',
        url: 'https://linkedinrank.com/get-noticed-recruiters',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'How to Get Noticed by Recruiters on LinkedIn',
            description: 'Actionable strategies to increase recruiter visibility on LinkedIn. Profile optimization, keyword placement, activity signals, and Open to Work settings.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/get-noticed-recruiters',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
            { '@type': 'ListItem', position: 2, name: 'Get Noticed by Recruiters', item: 'https://linkedinrank.com/get-noticed-recruiters' },
        ] },
        { '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'How do I appear in more recruiter searches?', acceptedAnswer: { '@type': 'Answer', text: 'Use keywords that match job titles recruiters search for. Place them in your headline, About section, experience descriptions, and skills. Enable Open to Work in recruiter-only mode.' } },
            { '@type': 'Question', name: 'Should I accept all connection requests?', acceptedAnswer: { '@type': 'Answer', text: 'Accept connections from recruiters, industry peers, and professionals in your target field. A larger relevant network increases your search visibility.' } },
            { '@type': 'Question', name: 'Does LinkedIn activity affect recruiter visibility?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. LinkedIn algorithm boosts active profiles in search results. Regular posting, commenting, and engagement signal that you are current and engaged.' } },
        ] },
    ],
}

export default function GetNoticedRecruitersPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Recruiter Visibility</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">How to Get Noticed by Recruiters on LinkedIn</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Getting recruiter messages on LinkedIn is not luck | it is the result of specific, optimizable profile signals. Over 90% of recruiters use LinkedIn as their primary sourcing tool. This guide covers the exact steps to make your profile recruiter-visible and recruiter-ready.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The 5-Step Recruiter Visibility Framework</h2>
                        <div className="space-y-5">
                            {[
                                { step: '1', title: 'Optimize your headline for search', desc: 'Recruiters find you through keyword searches. Your headline must contain the exact job title and key skills they search for. "Digital Marketer | SEO & Performance Marketing | Google Ads Certified" will appear in searches. "Marketing Enthusiast" will not.', link: '/linkedin-headline-guide', linkText: 'Headline Writing Guide' },
                                { step: '2', title: 'Turn on Open to Work', desc: 'LinkedIn offers two visibility modes: recruiter-only (recommended if employed) and public green banner. The recruiter-only option signals availability to LinkedIn Recruiter users without alerting your current employer. This single setting can increase recruiter outreach by 40%.', link: null, linkText: null },
                                { step: '3', title: 'Add 15–25 relevant skills', desc: 'Recruiters use skill filters to narrow search results. If you have fewer than 10 skills, you are invisible in filtered searches. Your top 3 pinned skills should exactly match your target role.', link: '/linkedin-keywords-guide', linkText: 'Keywords Guide' },
                                { step: '4', title: 'Add metrics to every role', desc: 'When a recruiter clicks your profile, they scan experience for impact. "Increased organic traffic 60% in 5 months" makes them reach out. "Responsible for SEO" makes them scroll past.', link: '/linkedin-optimization-guide', linkText: 'Full Optimization Guide' },
                                { step: '5', title: 'Be active on the platform', desc: 'Recruiters notice activity. Commenting on industry posts, sharing insights, and engaging with content shows you are active and engaged. Even 3 comments per week makes a difference.', link: '/linkedin-content-strategy', linkText: 'Content Strategy' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <div className="flex items-start gap-3 mb-2">
                                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white text-sm font-bold flex items-center justify-center shrink-0">{item.step}</span>
                                        <h3 className="text-base font-bold text-[#0A0F1C]">{item.title}</h3>
                                    </div>
                                    <p className="text-sm text-[#4B5563] ml-11 mb-2">{item.desc}</p>
                                    {item.link && <Link href={item.link} className="text-xs text-[#0A66C2] hover:underline ml-11">{item.linkText} →</Link>}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Daily Networking Routine (15 Minutes)</h2>
                        <p className="mb-4">Recruiters are more likely to reach out to people they recognize from the feed or who have mutual connections. This 15-minute daily routine builds that visibility:</p>
                        <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                            <div className="space-y-3">
                                {[
                                    'Send 5 targeted connection requests with personalized notes',
                                    'Leave 3 thoughtful comments on posts from people in your target industry',
                                    'Send 1 DM per week to a recruiter at a company you are interested in',
                                    'Engage with alumni from your university or past companies',
                                    'React to or share 2–3 relevant industry posts',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm">
                                        <span className="w-5 h-5 rounded-md bg-[#0A66C2] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Recruiter-Ready Profile Checklist</h2>
                        <div className="space-y-2">
                            {[
                                'Keyword-rich headline with target role + skills',
                                'Professional headshot (profiles with photos get 21x more views)',
                                'About section with metrics and clear positioning',
                                'Quantified results in every experience entry',
                                '15–25 relevant skills with top 3 pinned to target role',
                                'Open to Work enabled (recruiter-only recommended)',
                                'Custom LinkedIn URL',
                                'Active engagement (posts or comments within last 30 days)',
                                'At least 2–3 recommendations from colleagues or managers',
                                'Education section completed with relevant coursework or projects',
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                    <span className="text-emerald-500 mt-0.5 shrink-0">&#9744;</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4">For a comprehensive section-by-section audit, see our <Link href="/linkedin-profile-checklist" className="text-[#0A66C2] hover:underline">LinkedIn Profile Checklist</Link>.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">What NOT to Do When Trying to Get Noticed</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                'Mass-connecting without personalized notes',
                                'Messaging recruiters with "Do you have any openings?"',
                                'Using the public Open to Work banner while employed',
                                'Spamming posts with irrelevant hashtags',
                                'Having a headline that says "Seeking Opportunities"',
                                'Sending copy-paste InMail to every recruiter',
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg p-3">
                                    <span className="text-red-500 shrink-0 mt-0.5 text-xs">✗</span>
                                    <p className="text-xs text-[#4B5563]">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'How long before recruiters start contacting me?', a: 'If your profile is well-optimized with the right keywords and Open to Work is enabled, you may see increased outreach within 2–4 weeks. Results depend on your industry, location, and role demand.' },
                                { q: 'Should I reach out to recruiters first?', a: 'Yes, but be strategic. Send a personalized connection request mentioning a specific role or company. Share something relevant to their industry. Never open with "Do you have any jobs?"' },
                                { q: 'Does LinkedIn Premium help with recruiter visibility?', a: 'Premium provides InMail credits and shows you who viewed your profile. However, the most impactful changes are free: headline optimization, keyword placement, skills, and Open to Work settings.' },
                                { q: 'How do I know if my profile is recruiter-ready?', a: 'Upload your LinkedIn PDF to LinkedInRank. Our scoring engine evaluates the same signals recruiters scan: headline clarity, experience depth, skills relevance, and overall completeness.' },
                                { q: 'What is the difference between this guide and the Recruiter Psychology guide?', a: 'This guide focuses on actionable steps you can take. The Recruiter Psychology guide explains how recruiters think and search, helping you understand the "why" behind each recommendation.' },
                            ].map((item, i) => (
                                <div key={i} className="border-b border-gray-100 pb-4">
                                    <h3 className="text-sm font-bold text-[#0A0F1C] mb-1">{item.q}</h3>
                                    <p className="text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Is your profile recruiter-ready?</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">LinkedInRank evaluates the exact signals recruiters scan. Get your free score in under a minute.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It's Free</Link>
                    </div>

                    {/* Related Guides */}
                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Recruiter Psychology', href: '/recruiter-psychology' },
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'Keywords Guide', href: '/linkedin-keywords-guide' },
                                { label: 'For Job Seekers', href: '/for-jobseekers' },
                                { label: 'Top 10 Mistakes', href: '/linkedin-mistakes' },
                                { label: 'Profile Checklist', href: '/linkedin-profile-checklist' },
                                { label: 'Resume vs Profile', href: '/linkedin-resume-vs-profile' },
                                { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <SiteFooter />
        </main>
    )
}
