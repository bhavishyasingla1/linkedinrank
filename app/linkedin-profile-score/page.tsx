import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'LinkedIn Profile Score: Check Your Score Free in 2026 (30+ Signals)',
    description: 'Get your free LinkedIn profile score from LinkedInRank. Score your profile across 30+ signals including headline, experience, skills, and completeness. AI-powered recommendations and improvement roadmap included.',
    keywords: 'linkedin profile score, linkedin score, linkedin rating, linkedin rater, rate your linkedin profile, linkedin profile score checker, linkedin score test, linkedin profile grader, check linkedin score free, linkedin profile rating',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-profile-score' },
    openGraph: {
        title: 'LinkedIn Profile Score: Check Yours Free (30+ Signals)',
        description: 'Score your LinkedIn profile across 30+ signals. Get your free score, tier placement, and AI-powered improvement roadmap from LinkedInRank.',
        url: 'https://linkedinrank.com/linkedin-profile-score',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'LinkedIn Profile Score: How to Check and Improve Your Score',
            description: 'Complete guide to LinkedIn profile scoring — how it works, what signals matter, and how to improve your score for better recruiter visibility.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-profile-score',
            datePublished: '2026-02-01',
            dateModified: '2026-02-23',
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
                { '@type': 'ListItem', position: 2, name: 'LinkedIn Profile Score', item: 'https://linkedinrank.com/linkedin-profile-score' },
            ],
        },
        {
            '@type': 'SoftwareApplication',
            name: 'LinkedInRank Profile Scorer',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '500', bestRating: '5' },
        },
        {
            '@type': 'FAQPage',
            mainEntity: [
                { '@type': 'Question', name: 'What is a LinkedIn profile score?', acceptedAnswer: { '@type': 'Answer', text: 'A LinkedIn profile score is a numerical rating of how effectively your profile communicates your professional value. LinkedInRank scores profiles out of 100 across 30+ signals including headline optimization, about section quality, experience impact, skills alignment, and overall completeness.' } },
                { '@type': 'Question', name: 'How is the LinkedIn profile score calculated?', acceptedAnswer: { '@type': 'Answer', text: 'LinkedInRank evaluates six categories: Headline (20 points), About/Summary (20 points), Experience (25 points), Skills (15 points), Education (10 points), and Completeness (10 points). Each category has multiple sub-signals that are individually scored and combined for your total score out of 100.' } },
                { '@type': 'Question', name: 'What is a good LinkedIn profile score?', acceptedAnswer: { '@type': 'Answer', text: 'Most professionals score 55-75 on their first analysis. Scores above 70 indicate a strong professional presence (Gold tier). Scores above 85 are rare and represent exceptionally well-crafted profiles (Platinum tier). A score below 55 (Bronze tier) means the profile needs significant work.' } },
                { '@type': 'Question', name: 'Why did LinkedIn remove its profile strength meter?', acceptedAnswer: { '@type': 'Answer', text: 'LinkedIn retired the Profile Strength indicator and All-Star badge in 2023. The feature was criticized for being vague and gameable — users could reach All-Star without actually having a strong profile. LinkedInRank provides what that meter could not: transparent, documented scoring with signal-level feedback.' } },
                { '@type': 'Question', name: 'Is the LinkedIn profile score free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. LinkedInRank is completely free with no premium tiers, paywalls, or upsells. You get your full score, tier placement, category breakdown, and AI-powered recommendations without creating an account or providing any personal information.' } },
                { '@type': 'Question', name: 'How do I improve my LinkedIn profile score?', acceptedAnswer: { '@type': 'Answer', text: 'Focus on the highest-impact areas first: (1) Optimize your headline with role title and keywords, (2) Write a compelling first-person About section, (3) Add achievement-focused experience bullets, (4) Add 15-25 relevant skills, (5) Complete all profile sections. LinkedInRank provides a prioritized improvement roadmap showing exact point gains per action.' } },
                { '@type': 'Question', name: 'Does a higher score mean more recruiter views?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Higher-scoring profiles are better optimized for LinkedIn search, meaning they appear more frequently in recruiter searches. Profiles in our Gold and Platinum tiers consistently report 3-5x more profile views and inbound opportunities compared to Bronze tier profiles.' } },
                { '@type': 'Question', name: 'How often should I check my LinkedIn score?', acceptedAnswer: { '@type': 'Answer', text: 'Check your score after making significant profile changes — updating your headline, rewriting your About section, or adding new experience. We recommend re-analyzing monthly to track improvement and identify new optimization opportunities.' } },
            ],
        },
    ],
}

const SCORE_CATEGORIES = [
    { cat: 'Headline', pts: 20, icon: '💼', signals: 'Role clarity, keyword presence, length optimization, positioning strength, separator usage', improvement: 'Add your target role title, 2-3 industry keywords, and a clear value proposition. Use separators (|) for readability.' },
    { cat: 'About / Summary', pts: 20, icon: '📝', signals: 'Professional direction, skills mentioned, structure quality, first-person voice, hook strength', improvement: 'Write 150-300 words in first person. Open with a hook, cover experience, skills, and end with a call-to-action.' },
    { cat: 'Experience', pts: 25, icon: '📊', signals: 'Action verbs, quantified outcomes, role description depth, keyword integration, bullet structure', improvement: 'Use the XYZ formula per bullet: "Accomplished [X] as measured by [Y], by doing [Z]". Include numbers wherever possible.' },
    { cat: 'Skills', pts: 15, icon: '🎯', signals: 'Relevance to role, specificity level, headline alignment, endorsement quality', improvement: 'Add 15-25 skills that match your headline keywords. Prioritize hard skills over soft skills. Get endorsements from colleagues.' },
    { cat: 'Education & Credentials', pts: 10, icon: '🎓', signals: 'Degree completeness, field alignment, certifications, relevant coursework', improvement: 'Complete all education fields. Add relevant certifications — they carry significant weight in search ranking.' },
    { cat: 'Completeness & Structure', pts: 10, icon: '✅', signals: 'Section coverage, content depth, logical flow, profile photo, banner image', improvement: 'Fill every available section. Add a professional photo and branded banner. Set a custom LinkedIn URL.' },
]

const BEFORE_AFTER = [
    {
        section: 'Headline',
        before: 'Marketing Professional | Looking for Opportunities',
        after: 'Growth Marketing Manager | B2B SaaS | Demand Gen & Content Strategy | 150% Pipeline Growth',
        gain: '+8 points',
    },
    {
        section: 'About (first line)',
        before: 'I am a passionate professional with experience in various domains.',
        after: 'I\'ve helped 3 SaaS startups go from $0 to $2M ARR through demand generation programs nobody else would greenlight.',
        gain: '+12 points',
    },
    {
        section: 'Experience',
        before: 'Responsible for managing marketing campaigns and team coordination.',
        after: 'Led 15-person marketing team that generated $4.2M pipeline through integrated ABM + content programs, achieving 150% quota attainment.',
        gain: '+15 points',
    },
]

export default function LinkedInProfileScorePage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />
            <Script id="jsonld-profile-score" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-8">
                    <Link href="/" className="hover:text-[#0A66C2] no-underline transition-colors">Home</Link>
                    <span>›</span>
                    <span className="text-[#0A0F1C] font-medium">LinkedIn Profile Score</span>
                </nav>

                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">LinkedIn Profile Score</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">LinkedIn Profile Score: Check Your Score for Free</h1>

                {/* Intro */}
                <p className="text-[15px] text-[#4B5563] mb-12 leading-relaxed max-w-2xl">
                    Your LinkedIn profile either works for you or against you — and most people have no idea which. Since LinkedIn removed its profile strength meter in 2023, there has been no official way to measure your profile quality. <strong className="text-[#0A0F1C]">LinkedInRank fills that gap</strong> with a transparent scoring system that evaluates your profile across 30+ documented signals and gives you a score out of 100. No login, no data stored, and completely free. Upload your <Link href="/" className="text-[#0A66C2] underline decoration-[#DBEAFE] hover:decoration-[#0A66C2] transition-colors">LinkedIn PDF and get your score</Link> in under 60 seconds.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    {/* Section 1: What is a profile score */}
                    <section aria-labelledby="what-is">
                        <h2 id="what-is" className="text-2xl font-bold text-[#0A0F1C] mb-6">What Is a LinkedIn Profile Score?</h2>
                        <p className="mb-4">A LinkedIn profile score is a numerical evaluation of how well your profile communicates your professional value to recruiters, hiring managers, and professional connections. Unlike LinkedIn&apos;s deprecated &quot;All-Star&quot; system, LinkedInRank provides a granular score out of 100 based on documented, transparent criteria.</p>
                        <p className="mb-4">Your score reflects two things: <strong className="text-[#0A0F1C]">how well your profile is optimized for LinkedIn search</strong> (keyword presence, section completeness, content structure) and <strong className="text-[#0A0F1C]">how compelling your profile is to human readers</strong> (achievement framing, positioning clarity, credibility signals).</p>
                        <p>Think of it as a health check for your professional online presence — one that tells you exactly where you stand and precisely what to improve to climb higher.</p>
                    </section>

                    {/* Section 2: How scoring works */}
                    <section aria-labelledby="how-scored">
                        <h2 id="how-scored" className="text-2xl font-bold text-[#0A0F1C] mb-6">How Your LinkedIn Profile Score Is Calculated</h2>
                        <p className="mb-6">LinkedInRank evaluates six core categories, each weighted by its impact on recruiter engagement and search discoverability:</p>
                        <div className="space-y-4">
                            {SCORE_CATEGORIES.map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xl">{item.icon}</span>
                                        <p className="text-sm font-bold text-[#0A0F1C] flex-1">{item.cat}</p>
                                        <span className="text-lg font-bold text-[#0A66C2] tabular-nums">{item.pts}</span>
                                        <span className="text-xs text-[#9CA3AF]">pts</span>
                                    </div>
                                    <p className="text-xs text-[#6B7280] mb-2"><span className="font-medium">Signals:</span> {item.signals}</p>
                                    <p className="text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2"><span className="font-medium">How to improve:</span> {item.improvement}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 3: Tier System */}
                    <section aria-labelledby="tiers">
                        <h2 id="tiers" className="text-2xl font-bold text-[#0A0F1C] mb-6">LinkedInRank Tier System</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                            {[
                                { tier: 'Bronze', range: '0–54', color: '#92400E', bg: '#FEF3C7', desc: 'Profile needs significant work', pct: '~30% of users' },
                                { tier: 'Silver', range: '55–69', color: '#6B7280', bg: '#F3F4F6', desc: 'Solid foundation', pct: '~35% of users' },
                                { tier: 'Gold', range: '70–84', color: '#92400E', bg: '#FEF3C7', desc: 'Strong professional presence', pct: '~25% of users' },
                                { tier: 'Platinum', range: '85–100', color: '#5B21B6', bg: '#EDE9FE', desc: 'Exceptionally well-crafted', pct: '~10% of users' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2" style={{ color: item.color, backgroundColor: item.bg }}>{item.tier}</span>
                                    <p className="text-lg font-bold text-[#0A0F1C] tabular-nums">{item.range}</p>
                                    <p className="text-xs text-[#6B7280] mt-1">{item.desc}</p>
                                    <p className="text-[10px] text-[#9CA3AF] mt-1">{item.pct}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-[#6B7280]">Most professionals score 55–75 on their first analysis. Reaching Gold requires targeted optimization of your headline, about, and experience sections. Platinum-level profiles are rare and indicate mastery of LinkedIn profile optimization.</p>
                    </section>

                    {/* Section 4: Before & After */}
                    <section aria-labelledby="before-after">
                        <h2 id="before-after" className="text-2xl font-bold text-[#0A0F1C] mb-6">Before &amp; After: Real Score Improvements</h2>
                        <p className="mb-4">Here are examples of changes that produce the biggest score improvements:</p>
                        <div className="space-y-4">
                            {BEFORE_AFTER.map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-wider">{item.section}</p>
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{item.gain}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                            <p className="text-sm text-[#6B7280] line-through decoration-red-200">{item.before}</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                            <p className="text-sm text-[#0A0F1C] font-medium">{item.after}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 5: Recruiter Impact */}
                    <section aria-labelledby="recruiter">
                        <h2 id="recruiter" className="text-2xl font-bold text-[#0A0F1C] mb-6">How Your Score Affects Recruiter Visibility</h2>
                        <p className="mb-4">Recruiters on LinkedIn use keyword searches to find candidates. Your profile score directly correlates with how often you appear in these searches:</p>
                        <div className="space-y-3">
                            {[
                                { title: 'Search appearance frequency', desc: 'Higher-scoring profiles have better keyword optimization, which means they match more recruiter search queries and appear more often in search results.' },
                                { title: 'First impression impact', desc: 'Recruiter search results show your headline, profile photo, and current title. A high-scoring headline converts search impressions into profile views at 3-5x higher rates.' },
                                { title: 'InMail response expectations', desc: 'Recruiters can see profile completeness signals. Well-optimized profiles receive more personalized InMails because recruiters can understand your expertise and tailor their outreach.' },
                                { title: 'Shortlist probability', desc: 'Profiles with clear positioning, specific achievements, and relevant skills are easier for recruiters to evaluate — increasing your chances of making the initial shortlist.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</p>
                                    <p className="text-sm text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 6: Common Mistakes */}
                    <section aria-labelledby="mistakes">
                        <h2 id="mistakes" className="text-2xl font-bold text-[#0A0F1C] mb-6">Mistakes That Lower Your LinkedIn Score</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { mistake: 'Generic headline without keywords', impact: 'Loses up to 15 points' },
                                { mistake: 'Empty or one-line About section', impact: 'Loses up to 18 points' },
                                { mistake: 'Job duties instead of achievements', impact: 'Loses up to 20 points' },
                                { mistake: 'Fewer than 10 skills listed', impact: 'Loses up to 10 points' },
                                { mistake: 'Missing profile photo or banner', impact: 'Loses up to 5 points' },
                                { mistake: 'No certifications or courses', impact: 'Loses up to 8 points' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-3 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                                    <div>
                                        <p className="text-sm font-medium text-[#0A0F1C]">{item.mistake}</p>
                                        <p className="text-xs text-red-500">{item.impact}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-3">Check your LinkedIn profile score</h2>
                        <p className="text-sm text-[#4B5563] mb-2 max-w-md mx-auto">Upload your LinkedIn PDF and get your free score with personalized recommendations and a prioritized improvement roadmap.</p>
                        <p className="text-xs text-[#9CA3AF] mb-5">Free · No login · No data stored · Under 60 seconds</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Get Your Free Score</Link>
                    </div>

                    {/* FAQs */}
                    <section aria-labelledby="faq">
                        <h2 id="faq" className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                { q: 'What is a LinkedIn profile score?', a: 'A numerical rating (out of 100) of how effectively your profile communicates professional value. LinkedInRank evaluates 30+ signals across headline, about, experience, skills, education, and completeness.' },
                                { q: 'How is the score calculated?', a: 'Six categories with weighted scores: Headline (20), About (20), Experience (25), Skills (15), Education (10), Completeness (10). Each has multiple sub-signals combined for your total score.' },
                                { q: 'What is a good score?', a: 'Most professionals score 55-75. Gold tier (70-84) indicates a strong profile. Platinum (85+) is exceptional and rare. Bronze (below 55) means significant work is needed.' },
                                { q: 'Why did LinkedIn remove its profile strength meter?', a: 'LinkedIn retired it in 2023 because it was vague and gameable. LinkedInRank provides what it could not: transparent, documented scoring with signal-level feedback.' },
                                { q: 'Is it free?', a: 'Yes. Completely free with no premium tiers, paywalls, or account required. Your full score, breakdown, and AI recommendations are all free.' },
                                { q: 'How do I improve my score?', a: 'Focus on high-impact areas: headline keywords, About section depth, experience achievements, skills coverage. LinkedInRank provides a prioritized roadmap showing exact point gains per action.' },
                                { q: 'Does a higher score mean more recruiter views?', a: 'Yes. Higher-scoring profiles have better keyword optimization and completeness, which directly increases appearance frequency in recruiter searches.' },
                                { q: 'How often should I check?', a: 'After making significant profile changes. We recommend re-analyzing monthly to track improvement and find new optimization opportunities.' },
                            ].map((item, i) => (
                                <details key={i} className="group bg-white border border-gray-200 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-bold text-[#0A0F1C] list-none">
                                        {item.q}
                                        <svg className="w-4 h-4 text-[#9CA3AF] group-open:rotate-180 transition-transform shrink-0 ml-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                    </summary>
                                    <p className="px-4 pb-4 text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Internal Links */}
                    <div className="pt-8 border-t border-gray-100 mt-6">
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/linkedin-ranking" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Improve Your LinkedIn Ranking</Link>
                            <Link href="/linkedin-optimization-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Full Optimization Guide</Link>
                            <Link href="/linkedin-headline-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Headline Guide</Link>
                            <Link href="/tools" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Free LinkedIn Tools</Link>
                            <Link href="/linkedin-mistakes" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Top 10 Mistakes</Link>
                            <Link href="/linkedin-profile-checklist" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Profile Checklist</Link>
                            <Link href="/for-students" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">For Students</Link>
                        </div>
                    </div>
                </div>
            </article>

            <SiteFooter />
        </main>
    )
}
