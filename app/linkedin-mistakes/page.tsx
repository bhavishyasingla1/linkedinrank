import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'

export const metadata: Metadata = {
    title: 'Top 10 LinkedIn Profile Mistakes That Cost You Opportunities (2026)',
    description: 'The 10 most common LinkedIn profile mistakes in 2026 that hurt your visibility and credibility. Each mistake explained with the exact fix. Based on analysis of thousands of profiles. Free scoring with LinkedInRank.',
    keywords: 'linkedin mistakes 2026, linkedin profile mistakes, common linkedin errors, linkedin profile tips, linkedin profile problems, what not to do on linkedin, linkedin profile fix, linkedin profile common mistakes',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-mistakes' },
    openGraph: {
        title: 'Top 10 LinkedIn Profile Mistakes That Cost You Opportunities',
        description: 'Common LinkedIn mistakes explained with exact fixes. Based on analysis of thousands of profiles.',
        url: 'https://linkedinrank.com/linkedin-mistakes',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'Top 10 LinkedIn Profile Mistakes That Cost You Opportunities',
            description: 'The 10 most common LinkedIn profile mistakes and how to fix them. From vague headlines to missing keywords, learn what is holding your profile back.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-mistakes',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
            { '@type': 'ListItem', position: 2, name: 'Top 10 Mistakes', item: 'https://linkedinrank.com/linkedin-mistakes' },
        ] },
        { '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'What is the biggest mistake on LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: 'Using the default headline. Your headline is the most visible element on LinkedIn | it appears in every search result, comment, and connection request. A vague headline means recruiters skip your profile.' } },
            { '@type': 'Question', name: 'How do I know if my profile has mistakes?', acceptedAnswer: { '@type': 'Answer', text: 'Upload your LinkedIn PDF to LinkedInRank for a free audit. It evaluates 30+ signals and flags specific issues with actionable fixes for each section.' } },
            { '@type': 'Question', name: 'Can LinkedIn mistakes hurt my job search?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Missing keywords mean you do not appear in recruiter searches. A vague headline means recruiters skip you. No About section means you miss the chance to tell your story.' } },
        ] },
    ],
}

export default function LinkedInMistakesPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Profile Mistakes</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">10 LinkedIn Profile Mistakes That Are Costing You Opportunities</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Most LinkedIn profiles have the same fixable problems. After scoring thousands of profiles through <Link href="/" className="text-[#0A66C2] hover:underline">LinkedInRank</Link>, these 10 mistakes appear repeatedly. Each one reduces your visibility, credibility, or both. The good news: every mistake has a clear, actionable fix.
                </p>

                <div className="space-y-6 text-[15px] text-[#4B5563] leading-relaxed">
                    {[
                        { num: 1, title: 'Vague or default headline', problem: 'Using "Student at XYZ" or your job title alone tells recruiters nothing about your value, skills, or direction. LinkedIn auto-generates a headline from your latest role | most people never change it.', fix: 'Use the formula: Role + Niche + Value. Example: "Frontend Developer | React & TypeScript | Building Fast UIs." Include keywords recruiters actually search for.', link: '/linkedin-headline-guide', linkText: 'Read our Headline Writing Guide' },
                        { num: 2, title: 'Empty or generic About section', problem: 'An empty About section wastes your best opportunity to tell your story. A generic one filled with buzzwords like "passionate, motivated, hardworking" says nothing specific.', fix: 'Follow the 3-part formula: Who you are, what you do, where you are going. Include 2–3 metrics. Write in first person. Keep the first 300 characters strong | they show above the fold.', link: '/linkedin-about-guide', linkText: 'Read our About Section Guide' },
                        { num: 3, title: 'No profile photo', problem: 'Profiles without photos get significantly fewer views. A missing photo signals either inactivity or lack of professionalism. Recruiters are less likely to trust or contact a faceless profile.', fix: 'Use a clear, professional headshot. Neutral background, natural expression, face taking up 60–70% of the frame. No group photos, no heavy filters.', link: '/linkedin-profile-photo-guide', linkText: 'Read our Profile Photo Guide' },
                        { num: 4, title: 'Experience without metrics', problem: '"Managed social media" tells a recruiter nothing. Without numbers, your experience entries are just job descriptions | identical to every other candidate with the same title.', fix: 'Add metrics to every role: percentages, revenue, users, team sizes, timelines. "Managed Instagram growth from 2K to 10K in 4 months" is 10x more credible than "Managed social media."', link: '/linkedin-optimization-guide', linkText: 'Full Optimization Guide' },
                        { num: 5, title: 'Too few or irrelevant skills', problem: 'Skills are used as search filters by recruiters. Having fewer than 10 skills | or skills that do not match your target role | means you appear in fewer searches.', fix: 'Add 15–25 relevant skills. Pin your top 3 to match your target role. Include a mix of technical skills, tools, and domain expertise. Remove outdated or irrelevant ones.', link: '/linkedin-keywords-guide', linkText: 'Read our Keywords Guide' },
                        { num: 6, title: 'No keywords in profile', problem: 'LinkedIn works like a search engine. If recruiters search "Data Analyst SQL Python" and those words are not in your profile, you will not appear in results regardless of your qualifications.', fix: 'Place target keywords in your headline, About, job titles, and skills section. Use full role names (not abbreviations). Repeat key terms naturally across sections.', link: '/linkedin-keywords-guide', linkText: 'Read our Keywords Guide' },
                        { num: 7, title: 'Inconsistent narrative', problem: 'When your headline says "Marketing" but your experience shows engineering, design, and sales | recruiters lose trust. A scattered profile looks unfocused.', fix: 'Choose one clear positioning theme and ensure every section reinforces it. If you are pivoting careers, lead with your target direction in the headline and About, then frame past experience as transferable.', link: '/linkedin-personal-branding', linkText: 'Read our Personal Branding Guide' },
                        { num: 8, title: 'Zero activity or engagement', problem: 'A completely inactive profile signals disinterest. Recruiters check recent activity to gauge how engaged you are with your industry. Dead profiles get fewer messages.', fix: 'Post 2–3 times per month at minimum. Comment on industry posts. Share learnings from your work. Even minimal engagement signals that you are active and current.', link: '/linkedin-content-strategy', linkText: 'Read our Content Strategy Guide' },
                        { num: 9, title: 'Using buzzwords without proof', problem: '"Results-driven," "passionate," "dynamic" | these words appear on millions of profiles and mean nothing without evidence. They actively hurt credibility because they signal lack of self-awareness.', fix: 'Replace every buzzword with a specific example or metric. Instead of "results-driven," write "Increased team output by 40% through process optimization." Show, do not tell.', link: '/top-1-percent-profiles', linkText: 'See what top profiles do differently' },
                        { num: 10, title: 'Not using the Featured section', problem: 'The Featured section is prime visual real estate on your profile. Leaving it empty wastes an opportunity to showcase your best work, build credibility, and differentiate yourself.', fix: 'Add 2–4 items: portfolio projects, top LinkedIn posts, case studies, media mentions, your website, or published work. This section provides visual proof of your expertise.', link: '/linkedin-optimization-guide', linkText: 'Full Optimization Guide' },
                    ].map((item) => (
                        <div key={item.num} className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                            <div className="flex items-start gap-3 mb-3">
                                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white text-sm font-bold flex items-center justify-center shrink-0">{item.num}</span>
                                <h2 className="text-lg font-bold text-[#0A0F1C]">{item.title}</h2>
                            </div>
                            <div className="ml-11">
                                <p className="text-sm text-[#4B5563] mb-3"><strong className="text-[#0A0F1C]">The problem:</strong> {item.problem}</p>
                                <p className="text-sm text-[#4B5563] mb-2"><strong className="text-emerald-600">The fix:</strong> {item.fix}</p>
                                <Link href={item.link} className="text-xs text-[#0A66C2] hover:underline">{item.linkText} →</Link>
                            </div>
                        </div>
                    ))}

                    {/* FAQ */}
                    <section className="pt-4">
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'How do I know which mistakes my profile has?', a: 'Upload your LinkedIn PDF to LinkedInRank for a free score. The analysis identifies specific weaknesses across headline, about, experience, skills, education, and completeness categories.' },
                                { q: 'Which mistake is the most damaging?', a: 'A vague headline (#1) is the most damaging because it affects search visibility. If recruiters cannot find you, nothing else matters. Fix your headline first.' },
                                { q: 'Can I fix all 10 mistakes in one sitting?', a: 'Yes. Most profile optimizations take 2–3 hours for a thorough overhaul. Start with headline and About section, then work through experience and skills.' },
                                { q: 'Do these mistakes apply to all career stages?', a: 'Yes, though the specifics vary. A student will not have extensive metrics, but they should still have a clear headline, filled About section, and relevant skills. Each career stage has adapted expectations.' },
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
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Find out which mistakes your profile has</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">LinkedInRank scores 30+ signals and highlights exactly where to improve. Free, no login required.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It's Free</Link>
                    </div>

                    {/* Related Guides */}
                    <RelatedPages currentSlug="linkedin-mistakes" />
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
