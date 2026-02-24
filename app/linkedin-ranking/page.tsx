import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'LinkedIn Ranking Explained: How to Rank Higher in 2026 (Free Tool)',
    description: 'Learn how LinkedIn ranking works and how to improve your LinkedIn profile ranking. Understand the algorithm, ranking factors, and get a free LinkedIn rank score with LinkedInRank.',
    keywords: 'linkedin ranking, linkedin rank, linkedin ranking profile, linkedin profile ranking, how to rank on linkedin, linkedin ranking factors, linkedin algorithm ranking, linkedin search ranking, improve linkedin ranking',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-ranking' },
    openGraph: {
        title: 'LinkedIn Ranking Explained: How to Rank Higher in 2026',
        description: 'Master LinkedIn ranking factors, understand the algorithm, and improve your LinkedIn profile ranking with a free tool. No login required.',
        url: 'https://linkedinrank.com/linkedin-ranking',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'LinkedIn Ranking: How to Rank Higher on LinkedIn in 2026',
            description: 'Complete guide to LinkedIn ranking factors, algorithm breakdown, and how to improve your profile ranking in LinkedIn search results.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-ranking',
            datePublished: '2026-02-01',
            dateModified: '2026-02-23',
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
                { '@type': 'ListItem', position: 2, name: 'LinkedIn Ranking', item: 'https://linkedinrank.com/linkedin-ranking' },
            ],
        },
        {
            '@type': 'HowTo',
            name: 'How to Rank Higher on LinkedIn',
            description: 'Step-by-step guide to improving your LinkedIn profile ranking.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Optimize Your Headline', text: 'Include your target role title, 2-3 industry keywords, and a clear value proposition in under 120 characters.' },
                { '@type': 'HowToStep', position: 2, name: 'Strengthen Your About Section', text: 'Write a first-person narrative with 3-5 keywords, covering your experience, skills, and professional direction.' },
                { '@type': 'HowToStep', position: 3, name: 'Add Impact to Experience', text: 'Rewrite bullets with action verbs, quantified outcomes, and role-specific keywords.' },
                { '@type': 'HowToStep', position: 4, name: 'Add Relevant Skills', text: 'Add 15-25 skills aligned with your headline and target role. Get endorsements from connections.' },
                { '@type': 'HowToStep', position: 5, name: 'Analyze Your Profile', text: 'Upload your LinkedIn PDF to LinkedInRank for a free score across 30+ signals with personalized recommendations.' },
            ],
        },
        {
            '@type': 'FAQPage',
            mainEntity: [
                { '@type': 'Question', name: 'What is LinkedIn ranking?', acceptedAnswer: { '@type': 'Answer', text: 'LinkedIn ranking refers to how your profile appears in LinkedIn search results when recruiters, hiring managers, or connections search for people with your skills and experience. A higher-ranking profile appears closer to the top of search results, increasing visibility and opportunities.' } },
                { '@type': 'Question', name: 'How does the LinkedIn algorithm rank profiles?', acceptedAnswer: { '@type': 'Answer', text: 'LinkedIn uses multiple ranking signals including keyword relevance in your headline and about section, profile completeness, connection proximity to the searcher, engagement activity, skills endorsements, and content quality. Profiles that match more of these signals rank higher in search results.' } },
                { '@type': 'Question', name: 'What is the difference between LinkedIn Rank and SSI?', acceptedAnswer: { '@type': 'Answer', text: 'LinkedIn SSI (Social Selling Index) measures social selling behavior — posting, engaging, connecting. LinkedInRank measures your actual profile quality across 30+ ranking signals that determine how you appear in search results. LinkedInRank is free, requires no login, and provides actionable profile-level recommendations.' } },
                { '@type': 'Question', name: 'How can I check my LinkedIn ranking?', acceptedAnswer: { '@type': 'Answer', text: 'You can check your LinkedIn ranking by uploading your LinkedIn PDF export to LinkedInRank. You will receive a score out of 100, tier placement (Bronze/Silver/Gold/Platinum), and personalized recommendations to improve your profile ranking. It is free and requires no login.' } },
                { '@type': 'Question', name: 'What are the most important LinkedIn ranking factors?', acceptedAnswer: { '@type': 'Answer', text: 'The most important ranking factors are: (1) Headline keywords matching search queries, (2) About section with relevant industry terms, (3) Experience descriptions with action verbs and outcomes, (4) Skills that align with your target role, and (5) Overall profile completeness and depth.' } },
                { '@type': 'Question', name: 'How long does it take to improve LinkedIn ranking?', acceptedAnswer: { '@type': 'Answer', text: 'Profile optimization changes can start affecting search visibility within 1-2 weeks. However, sustained improvement requires consistent activity — posting, engaging, and updating your profile regularly. Most users see measurable ranking improvement within 30-60 days of implementing LinkedInRank recommendations.' } },
                { '@type': 'Question', name: 'Does posting on LinkedIn affect my ranking?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. LinkedIn considers activity signals when ranking profiles. Regular posting, commenting, and engaging with content signals to the algorithm that you are an active, credible professional. However, profile quality (headline, about, experience) has a much larger impact than posting alone.' } },
                { '@type': 'Question', name: 'Is LinkedIn ranking the same for everyone?', acceptedAnswer: { '@type': 'Answer', text: 'No. LinkedIn search results are personalized based on the searcher\'s network, location, industry, and connection proximity to you. Two recruiters searching the same keywords may see different rankings. However, strong profile optimization improves your ranking across all searchers.' } },
            ],
        },
    ],
}

const RANKING_FACTORS = [
    { category: 'Headline', weight: '20%', icon: '💼', signals: ['Role title clarity', 'Keyword presence and density', 'Specificity and positioning', 'Length optimization (under 120 chars)'], impact: 'Highest-weight ranking signal. Recruiters search by job title and skills — your headline must contain these exact terms.' },
    { category: 'About / Summary', weight: '20%', icon: '📝', signals: ['Professional direction statement', 'Keyword density (3-5 terms)', 'Structural quality', 'First-person voice and credibility'], impact: 'Second most important section. LinkedIn indexes your About section for search queries and uses it to understand your professional identity.' },
    { category: 'Experience', weight: '25%', icon: '📊', signals: ['Action verb usage', 'Quantified outcomes and metrics', 'Role description depth', 'Keyword integration per role'], impact: 'Largest scoring category. Detailed, achievement-focused experience descriptions signal expertise and professionalism to both algorithms and recruiters.' },
    { category: 'Skills', weight: '15%', icon: '🎯', signals: ['Relevance to target role', 'Specificity level', 'Alignment with headline', 'Endorsement count'], impact: 'LinkedIn uses your skills section for search matching. Add 15-25 skills that recruiters actively search for in your industry.' },
    { category: 'Education & Credentials', weight: '10%', icon: '🎓', signals: ['Degree completeness', 'Field alignment', 'Certifications present', 'Relevant coursework'], impact: 'Contributes to profile completeness. Certifications are especially valuable for search ranking in technical fields.' },
    { category: 'Completeness & Structure', weight: '10%', icon: '✅', signals: ['Section coverage', 'Content depth per section', 'Logical flow', 'Profile photo and banner'], impact: 'LinkedIn explicitly favors complete profiles in search results. Missing sections significantly reduce your visibility.' },
]

const CHECKLIST_ITEMS = [
    { text: 'Headline contains your target role title and 2-3 keywords', section: 'Headline' },
    { text: 'Headline is under 120 characters for full search visibility', section: 'Headline' },
    { text: 'About section is 150-300 words, written in first person', section: 'About' },
    { text: 'About section contains 3-5 industry keywords naturally integrated', section: 'About' },
    { text: 'Each experience role has 3-5 bullet points with action verbs', section: 'Experience' },
    { text: 'Experience bullets include quantified outcomes (numbers, percentages)', section: 'Experience' },
    { text: '15-25 skills added and aligned with target role', section: 'Skills' },
    { text: 'Top 3 skills match your headline keywords', section: 'Skills' },
    { text: 'Education section is complete with degree and field of study', section: 'Education' },
    { text: 'Profile photo is professional and high-resolution', section: 'Completeness' },
    { text: 'Banner image is present and branded', section: 'Completeness' },
    { text: 'Custom LinkedIn URL is set', section: 'Completeness' },
]

const MISTAKES = [
    { mistake: 'Using "Open to Work" as your entire headline', fix: 'Lead with your role title and value proposition. Add "Open to Work" as a secondary element or use LinkedIn\'s visibility feature instead.' },
    { mistake: 'Writing the About section in third person', fix: 'Switch to first person — it is more authentic and engaging. "I build..." beats "John is a..." every time.' },
    { mistake: 'Listing job duties instead of achievements', fix: 'Use the XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]". Lead with impact, not responsibilities.' },
    { mistake: 'Having fewer than 10 skills listed', fix: 'Add 15-25 relevant skills. Include both broad category skills (e.g., "Data Analysis") and specific tools (e.g., "Tableau").' },
    { mistake: 'Leaving sections empty or incomplete', fix: 'Fill every available section — LinkedIn penalizes incomplete profiles in search rankings. Even a brief entry is better than nothing.' },
    { mistake: 'Using buzzwords like "passionate" or "motivated"', fix: 'Replace with specific, searchable terms. "Passionate marketer" becomes "Growth Marketing Manager | B2B SaaS | Demand Generation".' },
]

export default function LinkedInRankingPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />
            <Script id="jsonld-linkedin-ranking" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-8">
                    <Link href="/" className="hover:text-[#0A66C2] no-underline transition-colors">Home</Link>
                    <span>›</span>
                    <span className="text-[#0A0F1C] font-medium">LinkedIn Ranking</span>
                </nav>

                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">LinkedIn Ranking Guide</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">LinkedIn Ranking: How to Rank Higher on LinkedIn in 2026</h1>

                {/* Intro — 120-150 words, problem-focused */}
                <p className="text-[15px] text-[#4B5563] mb-12 leading-relaxed max-w-2xl">
                    Most LinkedIn profiles are invisible. Out of over 1 billion members, only a fraction appear on the first page of recruiter searches. The difference between being found and being ignored comes down to your <strong className="text-[#0A0F1C]">LinkedIn ranking</strong> — how the algorithm evaluates and positions your profile relative to others. LinkedIn does not publish its ranking criteria publicly, which means most professionals optimize blindly. This guide breaks down exactly how LinkedIn ranking works, what specific factors determine your position in search results, and how you can use <Link href="/" className="text-[#0A66C2] underline decoration-[#DBEAFE] hover:decoration-[#0A66C2] transition-colors">LinkedInRank&apos;s free ranking tool</Link> to score your profile across 30+ signals and get a personalized roadmap to rank higher.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    {/* Section 1: Definition */}
                    <section aria-labelledby="what-is">
                        <h2 id="what-is" className="text-2xl font-bold text-[#0A0F1C] mb-6">What Is LinkedIn Ranking?</h2>
                        <p className="mb-4">LinkedIn ranking refers to the position your profile occupies in search results when someone searches for professionals with your skills, job title, or industry. Think of it as SEO for your professional identity — the better optimized your profile, the higher you appear when recruiters, hiring managers, and potential clients search LinkedIn.</p>
                        <p className="mb-4">Unlike traditional SEO where you optimize a webpage, LinkedIn ranking requires optimizing a structured profile across multiple sections: headline, about, experience, skills, education, and activity. Each section contributes different ranking signals that LinkedIn&apos;s algorithm weighs when determining search results.</p>
                        <p>LinkedIn ranking is distinct from your Social Selling Index (SSI). SSI measures social selling behavior — how you engage, connect, and post. LinkedIn ranking, as evaluated by <Link href="/" className="text-[#0A66C2] underline decoration-[#DBEAFE] hover:decoration-[#0A66C2] transition-colors">LinkedInRank</Link>, measures your profile&apos;s actual quality and keyword optimization across the signals that determine search visibility.</p>
                    </section>

                    {/* Section 2: How the Algorithm Works */}
                    <section aria-labelledby="algorithm">
                        <h2 id="algorithm" className="text-2xl font-bold text-[#0A0F1C] mb-6">How the LinkedIn Algorithm Ranks Profiles</h2>
                        <p className="mb-4">LinkedIn&apos;s search algorithm evaluates profiles using a multi-signal approach. When a recruiter searches for &quot;Senior Data Engineer&quot;, LinkedIn does not just check job titles — it scans headlines, about sections, experience descriptions, skills, endorsements, and activity to determine which profiles are the best match.</p>
                        <div className="space-y-3 mb-4">
                            {[
                                { title: 'Keyword Relevance', desc: 'How closely your profile content matches the search query. Profiles with exact-match keywords in the headline rank highest.' },
                                { title: 'Profile Completeness', desc: 'LinkedIn explicitly boosts complete profiles. Missing sections (no about, no skills) significantly hurt ranking.' },
                                { title: 'Connection Proximity', desc: 'First-degree connections and people in your extended network are ranked higher. This is why networking matters for visibility.' },
                                { title: 'Activity Signals', desc: 'Posting, commenting, and engaging regularly tells LinkedIn you are an active, credible professional worth surfacing in results.' },
                                { title: 'Endorsements & Recommendations', desc: 'Skills endorsements and written recommendations serve as social proof that boosts your credibility score in the algorithm.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</p>
                                    <p className="text-sm text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p>The key insight: <strong className="text-[#0A0F1C]">profile quality accounts for 70-80% of your ranking</strong>, while activity accounts for the remaining 20-30%. This means optimizing your headline, about, and experience has a far greater impact than posting frequency alone.</p>
                    </section>

                    {/* Section 3: Ranking Factors Breakdown */}
                    <section aria-labelledby="factors">
                        <h2 id="factors" className="text-2xl font-bold text-[#0A0F1C] mb-6">LinkedIn Ranking Factors: Complete Breakdown</h2>
                        <p className="mb-6">LinkedInRank evaluates your profile across 30+ signals grouped into six categories. Here is how each category affects your LinkedIn ranking:</p>
                        <div className="space-y-4">
                            {RANKING_FACTORS.map((factor, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xl">{factor.icon}</span>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-[#0A0F1C]">{factor.category}</p>
                                            <p className="text-xs text-[#0A66C2] font-medium">{factor.weight} of total score</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1.5 mb-3">
                                        {factor.signals.map((signal, j) => (
                                            <div key={j} className="flex items-center gap-1.5">
                                                <svg className="w-3 h-3 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                                <span className="text-xs text-[#6B7280]">{signal}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-[#4B5563] italic">{factor.impact}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 4: LinkedIn Rank vs SSI */}
                    <section aria-labelledby="vs-ssi">
                        <h2 id="vs-ssi" className="text-2xl font-bold text-[#0A0F1C] mb-6">LinkedIn Rank vs Social Selling Index (SSI)</h2>
                        <p className="mb-4">Many professionals confuse LinkedIn ranking with LinkedIn&apos;s Social Selling Index. Here is how they differ:</p>
                        <div className="overflow-x-auto mb-4">
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-[#0A0F1C] font-bold">Feature</th>
                                        <th className="text-left py-3 px-4 text-[#0A66C2] font-bold">LinkedInRank</th>
                                        <th className="text-left py-3 px-4 text-[#6B7280] font-bold">LinkedIn SSI</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[#4B5563]">
                                    {[
                                        ['What it measures', 'Profile quality across 30+ signals', 'Social selling behavior (4 pillars)'],
                                        ['Focus area', 'Content quality & keyword optimization', 'Posting, engaging, connecting'],
                                        ['Login required?', 'No — just upload your PDF', 'Yes — requires LinkedIn login'],
                                        ['Data stored?', 'Never — in-memory processing only', 'Yes — tied to your account'],
                                        ['Actionable feedback?', 'Before/after examples & roadmap', 'General pilllar scores only'],
                                        ['Cost', 'Completely free', 'Free (part of LinkedIn)'],
                                        ['Best for', 'Profile optimization & recruiter visibility', 'Sales prospecting metrics'],
                                    ].map((row, i) => (
                                        <tr key={i} className="border-b border-gray-100">
                                            <td className="py-2.5 px-4 font-medium text-[#0A0F1C]">{row[0]}</td>
                                            <td className="py-2.5 px-4">{row[1]}</td>
                                            <td className="py-2.5 px-4">{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p>Learn more in our detailed <Link href="/linkedin-rank-vs-ssi" className="text-[#0A66C2] underline decoration-[#DBEAFE] hover:decoration-[#0A66C2] transition-colors">LinkedIn Rank vs SSI comparison</Link>.</p>
                    </section>

                    {/* Section 5: Ranking Checklist */}
                    <section aria-labelledby="checklist">
                        <h2 id="checklist" className="text-2xl font-bold text-[#0A0F1C] mb-6">LinkedIn Ranking Checklist</h2>
                        <p className="mb-4">Use this checklist to audit your profile against the most important ranking signals:</p>
                        <div className="space-y-2">
                            {CHECKLIST_ITEMS.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-[#F8FAFC] border border-gray-200 rounded-lg p-3">
                                    <div className="w-5 h-5 rounded border-2 border-gray-300 shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm text-[#4B5563]">{item.text}</p>
                                        <p className="text-[10px] text-[#6B7280] font-medium uppercase tracking-wider mt-0.5">{item.section}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 6: Common Mistakes */}
                    <section aria-labelledby="mistakes">
                        <h2 id="mistakes" className="text-2xl font-bold text-[#0A0F1C] mb-6">LinkedIn Ranking Mistakes to Avoid</h2>
                        <p className="mb-4">These are the most common mistakes that hurt your LinkedIn ranking — and how to fix each one:</p>
                        <div className="space-y-3">
                            {MISTAKES.map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-4 h-4 text-red-400 shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                        <div>
                                            <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.mistake}</p>
                                            <p className="text-sm text-[#4B5563]"><span className="text-emerald-600 font-medium">Fix:</span> {item.fix}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 7: Tool Integration CTA */}
                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-3">Check your LinkedIn ranking for free</h2>
                        <p className="text-sm text-[#4B5563] mb-2 max-w-md mx-auto">Upload your LinkedIn PDF and get your ranking across 30+ signals with a personalized improvement roadmap.</p>
                        <p className="text-xs text-[#6B7280] mb-5">Free · No login · No data stored · Under 60 seconds</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Get Your Free LinkedIn Ranking</Link>
                    </div>

                    {/* Section 8: FAQs */}
                    <section aria-labelledby="faq">
                        <h2 id="faq" className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                { q: 'What is LinkedIn ranking?', a: 'LinkedIn ranking refers to how your profile appears in LinkedIn search results when recruiters, hiring managers, or connections search for people with your skills and experience. A higher-ranking profile appears closer to the top of search results, increasing visibility and opportunities.' },
                                { q: 'How does the LinkedIn algorithm rank profiles?', a: 'LinkedIn uses multiple ranking signals including keyword relevance in your headline and about section, profile completeness, connection proximity to the searcher, engagement activity, skills endorsements, and content quality. Profiles that match more of these signals rank higher.' },
                                { q: 'What is the difference between LinkedIn Rank and SSI?', a: 'SSI measures social selling behavior. LinkedInRank measures your actual profile quality across 30+ ranking signals. LinkedInRank is free, requires no login, and provides actionable profile-level recommendations.' },
                                { q: 'How can I check my LinkedIn ranking?', a: 'Upload your LinkedIn PDF export to LinkedInRank. You will receive a score out of 100, tier placement, and personalized recommendations. Free with no login required.' },
                                { q: 'What are the most important ranking factors?', a: 'Headline keywords, about section density, experience achievement descriptions, skills alignment, and profile completeness — in that order of impact.' },
                                { q: 'How long does it take to improve LinkedIn ranking?', a: 'Profile changes can start affecting visibility within 1-2 weeks, with measurable ranking improvements typically within 30-60 days of implementing LinkedInRank recommendations.' },
                                { q: 'Does posting on LinkedIn affect my ranking?', a: 'Yes, but profile quality accounts for 70-80% of your ranking while activity accounts for 20-30%. Optimize your profile first, then build a posting habit.' },
                                { q: 'Is LinkedIn ranking the same for everyone?', a: 'No. Results are personalized based on the searcher\'s network, location, and industry. However, strong profile optimization improves your ranking across all searchers.' },
                            ].map((item, i) => (
                                <details key={i} className="group bg-white border border-gray-200 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-bold text-[#0A0F1C] list-none">
                                        {item.q}
                                        <svg className="w-4 h-4 text-[#6B7280] group-open:rotate-180 transition-transform shrink-0 ml-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                    </summary>
                                    <p className="px-4 pb-4 text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Internal Links */}
                    <div className="pt-8 border-t border-gray-100 mt-6">
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/linkedin-profile-score" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Check Your LinkedIn Score</Link>
                            <Link href="/linkedin-optimization-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Full Optimization Guide</Link>
                            <Link href="/linkedin-rank-vs-ssi" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">LinkedIn Rank vs SSI</Link>
                            <Link href="/linkedin-headline-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Headline Guide</Link>
                            <Link href="/tools" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Free LinkedIn Tools</Link>
                            <Link href="/what-is-linkedin-rank" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">What Is LinkedIn Rank?</Link>
                            <Link href="/linkedin-mistakes" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Top 10 Profile Mistakes</Link>
                        </div>
                    </div>
                </div>
            </article>

            <SiteFooter />
        </main>
    )
}
