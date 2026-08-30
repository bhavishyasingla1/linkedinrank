import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'
import { SparklesIcon, ArrowRightIcon, ShieldCheckIcon, ClockIcon, CheckCircleIcon } from '@/components/ui/Icons'

export const metadata: Metadata = {
    title: 'LinkedIn Keywords Guide | How to Get Found by Recruiters (2026)',
    description: 'Master LinkedIn keyword optimization in 2026. Learn where to place keywords, which ones matter for your role, and how recruiters search. Keyword placement checklist and role-specific examples included.',
    keywords: 'linkedin keywords, linkedin seo, linkedin keyword optimization 2026, linkedin search optimization, linkedin profile keywords, how to get found on linkedin, linkedin recruiter search, linkedin keyword strategy, linkedin search ranking',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-keywords-guide' },
    openGraph: {
        title: 'LinkedIn Keywords Guide | How to Get Found by Recruiters',
        description: 'Master keyword placement to get found by recruiters. Checklist and role-specific examples included.',
        url: 'https://linkedinrank.com/linkedin-keywords-guide',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'LinkedIn Keywords Guide | How to Get Found by Recruiters',
            description: 'Master LinkedIn keyword optimization. Where to place keywords, how recruiters search, keyword research methods, and common mistakes.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-keywords-guide',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
            { '@type': 'ListItem', position: 2, name: 'Keywords Guide', item: 'https://linkedinrank.com/linkedin-keywords-guide' },
        ] },
        { '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'Where should I put keywords on LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: 'Headline (highest weight), About section, Experience titles and descriptions, Skills section, and Education. Repeat your primary keyword 3–5 times naturally across these sections.' } },
            { '@type': 'Question', name: 'How do I find the right keywords for my profile?', acceptedAnswer: { '@type': 'Answer', text: 'Study 10–15 job postings for your target role. Note recurring terms for titles, skills, and tools. These are the keywords recruiters use to search.' } },
            { '@type': 'Question', name: 'Can I have too many keywords?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Keyword stuffing makes your profile read poorly. Use keywords naturally within context. Quality of placement matters more than quantity.' } },
            { '@type': 'Question', name: 'Does LinkedInRank check for keywords?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. LinkedInRank evaluates keyword presence in your headline, About section, and skills. It flags when critical keywords for your role are missing.' } },
        ] },
    ],
}

export default function LinkedInKeywordsGuidePage() {
    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            {/* Hero Header with Aside Aesthetic */}
            <div className="border-b-2 border-[#dedcff] bg-gradient-to-b from-[#dedcff]/30 via-white to-[#fbfbfe]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-6">
                    <nav aria-label="Breadcrumb" className="text-[13px] text-[#050315]/60 flex items-center gap-2 flex-wrap">
                        <Link href="/" className="hover:text-[#2f27ce] transition-colors no-underline">Home</Link>
                        <span>/</span>
                        <Link href="/blogs" className="hover:text-[#2f27ce] transition-colors no-underline">Articles</Link>
                        <span>/</span>
                        <span className="text-[#050315] font-semibold">Keywords Guide</span>
                    </nav>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="inline-flex items-center gap-1 text-[11.5px] font-extrabold uppercase tracking-wider bg-[#dedcff] text-[#2f27ce] px-3.5 py-1 rounded-full shadow-2xs">
                                ★ Pillar Guide
                            </span>
                            <span className="text-[12px] text-[#050315]/60 flex items-center gap-1 font-medium">
                                <ClockIcon size={13} /> 10 min read
                            </span>
                            <span className="flex items-center gap-1 text-[#2f27ce] text-[12px] font-bold">
                                <ShieldCheckIcon size={14} /> 2026 Recruiter Algorithm Tested
                            </span>
                        </div>

                        <h1 className="text-[32px] sm:text-[46px] font-extrabold text-[#050315] leading-[1.12] tracking-tight">
                            LinkedIn Keywords Guide: How to Get Found by Recruiters
                        </h1>

                        <p className="text-[16px] sm:text-[17.5px] text-[#050315]/75 leading-relaxed max-w-3xl">
                            LinkedIn is a semantic search engine. Recruiters type exact keywords—job titles, core frameworks, tools, and methodologies—to find candidates. If those keywords are not indexed in your profile, <strong className="text-[#050315]">you do not exist</strong> in their search results.
                        </p>
                    </div>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="space-y-16 text-[15.5px] sm:text-[16.5px] text-[#050315]/80 leading-relaxed">

                    {/* Section 1 */}
                    <section className="space-y-6">
                        <div className="space-y-2">
                            <span className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                Algorithmic Weights
                            </span>
                            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                                How LinkedIn Recruiter Search Matches Your Profile
                            </h2>
                        </div>
                        <p>
                            LinkedIn Recruiter search parses your profile into high-priority tokens. Each section carries different algorithmic weight when ranking search results:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {[
                                { section: 'Headline', weight: 'Highest Weight (30%)', desc: 'Most heavily indexed in search. Keywords here have the strongest impact on recruiter discoverability.' },
                                { section: 'Job Titles', weight: 'Very High (25%)', desc: 'Current and past job titles are used as primary matching criteria in Boolean searches.' },
                                { section: 'Skills Section', weight: 'High (20%)', desc: 'Used as exact search filters. Recruiters filter candidate pools by specific skills tags.' },
                                { section: 'About Section', weight: 'Medium (15%)', desc: 'Full-text searchable. The first 300 characters carry significant indexer weight.' },
                                { section: 'Experience Bullets', weight: 'Medium (7%)', desc: 'Keywords inside outcome-driven bullet points contribute to overall relevance score.' },
                                { section: 'Education & Certs', weight: 'Lower (3%)', desc: 'Useful for filtering by university, degree level, or certified industry accreditations.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border-2 border-[#dedcff] rounded-3xl p-6 aside-card-shadow space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[16px] font-bold text-[#050315]">{item.section}</h3>
                                        <span className="text-[11px] font-extrabold text-[#2f27ce] bg-[#dedcff] px-2.5 py-0.5 rounded-full">
                                            {item.weight}
                                        </span>
                                    </div>
                                    <p className="text-[13.5px] text-[#050315]/70 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-6">
                        <div className="space-y-2">
                            <span className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                Keyword Taxonomy
                            </span>
                            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                                3 Types of Keywords Every Top 1% Profile Includes
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            {[
                                { type: '1. Role Keywords', examples: 'Product Manager, Software Engineer, Data Analyst, UX Designer, Growth Lead', tip: 'Use exact standard titles recruiters search for, not obscure internal tiers.' },
                                { type: '2. Tool & Skill Keywords', examples: 'React, Python, SQL, Figma, Salesforce, AWS, Tableau, System Design', tip: 'Include both specific tools and the umbrella category it belongs to.' },
                                { type: '3. Domain Keywords', examples: 'SaaS, FinTech, HealthTech, B2B Enterprise, E-commerce, Marketplace', tip: 'Helps recruiters searching within high-growth verticals.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border-2 border-[#dedcff] rounded-3xl p-6 aside-card-shadow flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="text-[16px] font-extrabold text-[#050315]">{item.type}</h3>
                                        <p className="text-[13px] text-[#050315]/75 leading-relaxed font-mono bg-[#dedcff]/20 p-3 rounded-xl border border-[#dedcff]/60">
                                            {item.examples}
                                        </p>
                                    </div>
                                    <p className="text-[12px] text-[#2f27ce] font-bold bg-[#dedcff]/40 p-2.5 rounded-xl border border-[#dedcff]">
                                        💡 {item.tip}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-6">
                        <div className="space-y-2">
                            <span className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                Implementation Map
                            </span>
                            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                                Keyword Placement Checklist
                            </h2>
                        </div>
                        <p>For maximum discoverability, your target keywords should appear across these primary touchpoints:</p>
                        <div className="space-y-3">
                            {[
                                { where: 'Headline', example: '"Data Analyst | SQL, Python & Tableau | FinTech Analytics & ETL Pipelines"' },
                                { where: 'About Section (First 300 Chars)', example: '"I am a Data Analyst specializing in SQL, Python, and automated reporting pipelines..."' },
                                { where: 'Current & Past Job Titles', example: '"Senior Product Manager" (avoid "Product Lead Level IV" or internal codes)' },
                                { where: 'Experience Bullet Points', example: '"Engineered SQL queries and automated dbt models processing 2.5M+ daily transaction records..."' },
                                { where: 'Skills Section (15–25 Skills)', example: 'SQL, Python, Data Modeling, Tableau, Snowflake, AWS, ETL, Business Intelligence' },
                                { where: 'Certifications', example: '"Google Data Analytics Professional Certificate", "AWS Certified Data Analytics"' },
                            ].map((item, i) => (
                                <div key={i} className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow flex items-start gap-3.5 transition-all">
                                    <div className="w-6 h-6 rounded-full bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircleIcon size={14} />
                                    </div>
                                    <div className="space-y-0.5 flex-1">
                                        <p className="text-[14.5px] font-bold text-[#050315]">{item.where}</p>
                                        <p className="text-[13px] text-[#050315]/75 font-mono leading-relaxed">{item.example}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 4: Mistakes to Avoid */}
                    <section className="space-y-6">
                        <div className="space-y-2">
                            <span className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                Common Pitfalls
                            </span>
                            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                                Keyword Mistakes That Harm Your Search Ranking
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {[
                                { mistake: 'Keyword stuffing', desc: 'Repeating "Product Manager" 15 times looks spammy and triggers quality penalties. Use natural contextual phrasing.' },
                                { mistake: 'Using abbreviations only', desc: 'Writing "PM" or "SE" exclusively hurts discovery. Recruiters usually search full industry terms.' },
                                { mistake: 'Internal non-standard job titles', desc: '"Associate Level 3" or "Ninja" means nothing to search filters. Use industry-standard titles.' },
                                { mistake: 'Listing unverifiable skills', desc: 'Only include technologies and methodologies you can defend in technical recruiter screenings.' },
                                { mistake: 'Ignoring the Skills section', desc: 'Leaving fewer than 10 skills on your profile prevents you from matching mandatory recruiter filters.' },
                            ].map((item, i) => (
                                <div key={i} className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-start gap-3.5">
                                    <span className="w-6 h-6 rounded-full bg-rose-200 text-rose-800 text-[12px] font-black flex items-center justify-center shrink-0 mt-0.5">✗</span>
                                    <div className="space-y-0.5">
                                        <p className="text-[14.5px] font-bold text-rose-950">{item.mistake}</p>
                                        <p className="text-[13px] text-rose-900/80 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="space-y-6 pt-6 border-t-2 border-[#dedcff]">
                        <div className="space-y-2">
                            <span className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                FAQ
                            </span>
                            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                                Frequently Asked Questions
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {[
                                { q: 'How many keywords should I include in my profile?', a: 'Focus on 5–8 core keywords and weave them naturally across all sections. Your headline should contain 2–3, About section 4–6, and skills section 15–25 relevant skills.' },
                                { q: 'Does keyword placement affect LinkedIn SSI score?', a: 'LinkedIn SSI measures engagement and network activity. Keywords directly affect search visibility, which is the primary driver of inbound recruiter profile views.' },
                                { q: 'Should I use the exact same keywords in every section?', a: 'Use consistent core terms but vary the context naturally (e.g. "Data Analyst" in headline, "analyzing high-volume datasets" in experience).' },
                                { q: 'How does LinkedInRank evaluate keywords?', a: 'LinkedInRank cross-references your headline, about, and skills against benchmark recruiter search databases, highlighting missing high-demand keywords.' },
                                { q: 'Do hashtags in posts count as profile keywords?', a: 'Post hashtags only affect post discovery, not candidate recruiter search. For candidate search, optimize headline, About, and job titles.' },
                            ].map((item, i) => (
                                <details key={i} className="group p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow transition-all" open={i === 0}>
                                    <summary className="cursor-pointer text-[15px] font-bold text-[#050315] list-none flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f27ce] rounded-xl">
                                        <span>{item.q}</span>
                                        <div className="w-7 h-7 rounded-full bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                        </div>
                                    </summary>
                                    <p className="pt-3 text-[13.5px] text-[#050315]/75 leading-relaxed border-t border-[#dedcff]/60 mt-3">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Bottom Radiant CTA */}
                    <div className="bg-gradient-to-r from-[#dedcff]/60 via-white to-[#dedcff]/60 border-2 border-[#dedcff] rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-md shadow-[#2f27ce]/5">
                        <div className="w-12 h-12 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center mx-auto shadow-xs">
                            <SparklesIcon size={22} />
                        </div>
                        <h2 className="text-[22px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                            Check if your keywords are indexed by recruiters
                        </h2>
                        <p className="text-[14.5px] text-[#050315]/75 max-w-md mx-auto leading-relaxed">
                            LinkedInRank evaluates keyword density across your headline, summary, and experience in 60 seconds.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/#upload"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[14.5px] font-bold shadow-lg shadow-[#2f27ce]/25 transition-all no-underline cursor-pointer active:scale-95"
                            >
                                <span>Analyze Your Keywords Free</span>
                                <ArrowRightIcon size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* Related Guides */}
                    <RelatedPages currentSlug="linkedin-keywords-guide" />
                </div>
            </article>

            <FooterLayout />
        </div>
    )
}
