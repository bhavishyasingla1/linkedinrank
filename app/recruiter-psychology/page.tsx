import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'

export const metadata: Metadata = {
    title: 'How Recruiters Actually View Your LinkedIn Profile (2026 Data)',
    description: 'Understand recruiter psychology on LinkedIn in 2026. What recruiters scan first, how they search, red flags they notice, and how to build trust in 10 seconds. Data-backed insights. Free scoring with LinkedInRank.',
    keywords: 'how recruiters use linkedin 2026, recruiter psychology linkedin, how recruiters search linkedin, what recruiters look for linkedin, linkedin recruiter tips, get noticed by recruiters linkedin, linkedin recruiter scan',
    alternates: { canonical: 'https://linkedinrank.com/recruiter-psychology' },
    openGraph: {
        title: 'How Recruiters Actually View Your LinkedIn Profile',
        description: 'What recruiters scan first and how to build trust in 10 seconds. Data-backed insights.',
        url: 'https://linkedinrank.com/recruiter-psychology',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'How Recruiters Actually View Your LinkedIn Profile',
            description: 'Understand how recruiters scan, search, and evaluate LinkedIn profiles. What they notice first, red flags, trust signals, and mental shortcuts.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/recruiter-psychology',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
                { '@type': 'ListItem', position: 2, name: 'Recruiter Psychology', item: 'https://linkedinrank.com/recruiter-psychology' },
            ],
        },
        {
            '@type': 'FAQPage',
            mainEntity: [
                { '@type': 'Question', name: 'How long do recruiters spend on a LinkedIn profile?', acceptedAnswer: { '@type': 'Answer', text: 'Most recruiters spend 10–30 seconds on an initial scan. They read headline, current role title, company, and location first. Only if those match do they read further.' } },
                { '@type': 'Question', name: 'Do recruiters use LinkedIn search or browse?', acceptedAnswer: { '@type': 'Answer', text: 'Over 90% of recruiter sourcing starts with LinkedIn Recruiter search. They type keywords and use filters. If your keywords do not match, you do not appear in results.' } },
                { '@type': 'Question', name: 'What are the biggest red flags recruiters look for?', acceptedAnswer: { '@type': 'Answer', text: 'Missing photo, vague headline, no About section, unexplained gaps, buzzwords without evidence, and inconsistent narrative are the most common red flags.' } },
                { '@type': 'Question', name: 'Can LinkedInRank help me understand what recruiters see?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. LinkedInRank scores the same signals recruiters evaluate: headline clarity, experience depth, skills relevance, and overall completeness.' } },
            ],
        },
    ],
}

export default function RecruiterPsychologyPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Recruiter Insights</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">How Recruiters Actually View Your LinkedIn Profile</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Recruiters do not read profiles. They <strong className="text-[#0A0F1C]">scan</strong>. The average recruiter spends 10–30 seconds on a profile before deciding to reach out or move on. Understanding this psychology is the key to getting more recruiter messages, interviews, and opportunities.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The 3 Questions Recruiters Answer in 10 Seconds</h2>
                        <p className="mb-4">Every recruiter is subconsciously answering these three questions when they land on your profile:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { num: '1', q: 'What do you do?', signal: 'Headline + current role' },
                                { num: '2', q: 'Are you credible?', signal: 'Metrics + experience depth' },
                                { num: '3', q: 'Do you fit the role?', signal: 'Skills + keywords match' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4 text-center">
                                    <span className="w-8 h-8 rounded-full bg-[#0A66C2] text-white text-sm font-bold flex items-center justify-center mx-auto mb-2">{item.num}</span>
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.q}</p>
                                    <p className="text-xs text-[#6B7280]">{item.signal}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4">If your profile does not answer all three instantly, the recruiter moves on. There is no second chance.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">How Recruiters Search on LinkedIn</h2>
                        <p className="mb-4">Before a recruiter even sees your profile, they need to find you. LinkedIn Recruiter search works like a search engine. Recruiters type queries like:</p>
                        <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5 mb-4">
                            <div className="space-y-2">
                                {[
                                    '"Marketing Intern SEO Content"',
                                    '"Software Engineer React TypeScript"',
                                    '"Product Manager SaaS B2B"',
                                    '"Data Analyst SQL Python FinTech"',
                                ].map((item, i) => (
                                    <p key={i} className="text-sm font-mono text-[#0A66C2]">{item}</p>
                                ))}
                            </div>
                        </div>
                        <p className="mb-4">If those keywords are not in your headline, About section, experience titles, or skills | <strong className="text-[#0A0F1C]">you do not exist</strong> to that recruiter. Your qualifications are irrelevant if you cannot be found. Our <Link href="/linkedin-keywords-guide" className="text-[#0A66C2] hover:underline">LinkedIn Keywords Guide</Link> covers exactly how to optimize for recruiter search.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">What Recruiters Notice First (In Order)</h2>
                        <div className="space-y-5">
                            {[
                                { rank: '1st', title: 'Headline', desc: 'Signals your positioning. A vague headline like "Student at XYZ" tells the recruiter nothing. A specific headline like "Aspiring Data Analyst | SQL, Excel, Python" immediately communicates value.', link: '/linkedin-headline-guide', linkText: 'Headline Writing Guide' },
                                { rank: '2nd', title: 'Experience section', desc: 'Recruiters look for action verbs, measurable impact, and relevant skills. "Worked on social media" tells them nothing. "Managed Instagram growth from 2K to 10K in 4 months" tells them everything.', link: '/linkedin-optimization-guide', linkText: 'Full Optimization Guide' },
                                { rank: '3rd', title: 'Skills section', desc: 'Used as search filters. Your top 3 pinned skills are the most visible. They must match the roles you are targeting.', link: '/linkedin-keywords-guide', linkText: 'Keywords Guide' },
                                { rank: '4th', title: 'Activity & engagement', desc: 'A dead profile signals low interest. Even minimal activity | a few comments or shares per month | shows the recruiter you are active and engaged.', link: '/linkedin-content-strategy', linkText: 'Content Strategy' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white text-xs font-bold flex items-center justify-center shrink-0">{item.rank}</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</p>
                                        <p className="text-sm text-[#4B5563] mb-2">{item.desc}</p>
                                        <Link href={item.link} className="text-xs text-[#0A66C2] hover:underline">{item.linkText} →</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Red Flags Recruiters Notice Immediately</h2>
                        <p className="mb-4">These are profile elements that make recruiters lose trust or skip your profile entirely:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                'Buzzwords without proof (motivated, hardworking, passionate)',
                                'No profile photo',
                                'Empty or one-line About section',
                                'No metrics or quantified results',
                                'Overuse of emojis or hashtags',
                                'Long, unformatted paragraphs',
                                'Job titles that do not match industry standards',
                                'Gaps with no explanation',
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg p-3">
                                    <span className="text-red-500 shrink-0 mt-0.5 text-xs">✗</span>
                                    <p className="text-xs text-[#4B5563]">{item}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4">See our <Link href="/linkedin-mistakes" className="text-[#0A66C2] hover:underline">Top 10 LinkedIn Mistakes</Link> guide for how to fix each of these.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">What Makes Recruiters Trust You</h2>
                        <p className="mb-4">Trust is built through specificity, consistency, and proof. The profiles that get the most recruiter messages share these traits:</p>
                        <div className="space-y-3">
                            {[
                                { title: 'Specificity over vagueness', desc: 'Every claim is backed by a number, a result, or a concrete example. "Increased organic traffic 60% in 5 months" builds more trust than "improved company performance."' },
                                { title: 'Consistent narrative', desc: 'Everything on the profile points to one clear theme. If your headline says "Product Marketing" but your experience is scattered across unrelated roles, trust decreases.' },
                                { title: 'Clear trajectory', desc: 'Recruiters want to see progression | growth in responsibility, skills, or impact over time. Even lateral moves should show intentional direction.' },
                                { title: 'Social proof', desc: 'Recommendations, endorsements, and featured work provide third-party validation. Even 2–3 genuine recommendations significantly boost credibility.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</p>
                                    <p className="text-sm text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The Recruiter Mental Shortcut</h2>
                        <p className="mb-4">When a recruiter finds your profile, they subconsciously ask three deeper questions before reaching out:</p>
                        <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                            <div className="space-y-3">
                                {[
                                    'Does this person look hireable? (Professional presentation, clear role)',
                                    'Can I pitch them to a hiring manager? (Specific skills, relevant experience)',
                                    'Is this a safe bet? (Consistency, social proof, no red flags)',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm">
                                        <span className="w-5 h-5 rounded-md bg-[#0A66C2] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="mt-4"><Link href="/" className="text-[#0A66C2] hover:underline">LinkedInRank</Link> scores your profile on exactly these dimensions: clarity, focus, and proof. Upload your PDF for a free analysis.</p>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'How long do recruiters spend on a LinkedIn profile?', a: 'Most recruiters spend 10–30 seconds on an initial scan. If your headline, photo, and experience section pass the scan, they may spend 1–2 minutes reading in detail.' },
                                { q: 'Do recruiters actually use LinkedIn to find candidates?', a: 'Yes. Over 90% of recruiters use LinkedIn as their primary sourcing tool. LinkedIn Recruiter is the most widely used professional recruiting platform globally.' },
                                { q: 'What keywords should I use to get found by recruiters?', a: 'Use your exact target job title, relevant technical skills, industry terms, and tool names. Place them in your headline, About section, and skills. See our Keywords Guide for details.' },
                                { q: 'Does the "Open to Work" badge help?', a: 'The recruiter-only visibility option is useful and does not carry stigma. The public green banner is more polarizing | some recruiters view it positively, others are neutral.' },
                                { q: 'How important is my profile photo for recruiters?', a: 'Very important. Profiles with professional photos get significantly more views. It signals professionalism and approachability. A missing photo is a red flag.' },
                                { q: 'Can LinkedInRank tell me if my profile is recruiter-ready?', a: 'Yes. LinkedInRank evaluates the same signals recruiters scan: headline clarity, experience depth, skills relevance, and overall completeness. Upload your PDF for a free score.' },
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
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">See your profile through a recruiter's eyes</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">LinkedInRank scores the exact signals recruiters scan. Get your free analysis in under a minute.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It's Free</Link>
                    </div>

                    {/* Related Guides */}
                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'Keywords Guide', href: '/linkedin-keywords-guide' },
                                { label: 'Top 10 Mistakes', href: '/linkedin-mistakes' },
                                { label: 'For Job Seekers', href: '/for-jobseekers' },
                                { label: 'Get Noticed by Recruiters', href: '/get-noticed-recruiters' },
                                { label: 'Top 1% Profiles', href: '/top-1-percent-profiles' },
                                { label: 'Profile Photo Guide', href: '/linkedin-profile-photo-guide' },
                                { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
