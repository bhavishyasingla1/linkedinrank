import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

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
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            {/* Hero header */}
            <div className="bg-gradient-to-b from-[#F8FAFC] to-white border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-6 pt-6 pb-10">
                    <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5 flex-wrap mb-8">
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-[#0A0F1C] font-medium">Keywords Guide</span>
                    </nav>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-[#EFF6FF] text-[#0A66C2] border border-[#DBEAFE]">Guide</span>
                        <span className="text-[11px] text-[#6B7280] flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            10 min read
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight tracking-tight mb-5">LinkedIn Keywords Guide: How to Get Found by Recruiters</h1>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed max-w-2xl">
                        LinkedIn is a search engine. Recruiters type keywords | job titles, skills, tools, industries | to find candidates. If those keywords are not in your profile, <strong className="text-[#0A0F1C]">you do not exist</strong> in their search results. This guide covers where to place keywords, which ones matter most, and how to optimize without keyword stuffing.
                    </p>
                </div>
            </div>

            <article className="max-w-3xl mx-auto px-6 py-10 sm:py-14">

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">How LinkedIn Search Works</h2>
                        <p className="mb-4">LinkedIn Recruiter search matches your query against profile content. Each section of your profile carries different weight in search results:</p>
                        <div className="space-y-2">
                            {[
                                { section: 'Headline', weight: 'Highest', desc: 'Most heavily weighted in search. Keywords here have the strongest impact on discoverability.' },
                                { section: 'Job titles', weight: 'Very High', desc: 'Current and past job titles are used as primary matching criteria.' },
                                { section: 'Skills section', weight: 'High', desc: 'Used as search filters. Recruiters can filter results by specific skills.' },
                                { section: 'About section', weight: 'Medium', desc: 'Full-text searchable. First 300 characters carry slightly more weight.' },
                                { section: 'Experience descriptions', weight: 'Medium', desc: 'Keywords in bullet points contribute to search relevance.' },
                                { section: 'Education & certifications', weight: 'Lower', desc: 'Useful for filtering by degree, institution, or certification.' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-[#F8FAFC] border border-gray-200 rounded-xl p-3">
                                    <span className="shrink-0 text-xs font-bold text-white bg-[#0A66C2] px-2 py-0.5 rounded">{item.weight}</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C]">{item.section}</p>
                                        <p className="text-xs text-[#4B5563]">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">3 Types of Keywords to Include</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { type: 'Role keywords', examples: 'Product Manager, Software Engineer, Data Analyst, UX Designer, Marketing Manager', tip: 'Use the exact title recruiters search for, not internal company titles' },
                                { type: 'Skill & tool keywords', examples: 'React, Python, SQL, Figma, Google Ads, Salesforce, AWS, Excel', tip: 'Include both the tool name and the skill category it belongs to' },
                                { type: 'Industry keywords', examples: 'SaaS, FinTech, HealthTech, E-commerce, B2B, Enterprise, Startup', tip: 'These help recruiters who search within specific industries' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-2">{item.type}</p>
                                    <p className="text-xs text-[#4B5563] mb-2">{item.examples}</p>
                                    <p className="text-[11px] text-[#0A66C2] font-medium">{item.tip}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Keyword Placement Checklist</h2>
                        <p className="mb-4">For maximum discoverability, your target keywords should appear in all of these locations:</p>
                        <div className="space-y-2">
                            {[
                                { where: 'Headline', example: '"Data Analyst | SQL & Python | FinTech"' },
                                { where: 'About section (first 300 chars)', example: '"I am a Data Analyst specializing in SQL, Python, and financial data..."' },
                                { where: 'Current job title', example: '"Data Analyst" (not "Analyst II" or internal codes)' },
                                { where: 'Experience bullet points', example: '"Built SQL queries to analyze 1M+ transaction records..."' },
                                { where: 'Skills section (15–25 skills)', example: 'SQL, Python, Data Visualization, Tableau, Excel, Statistical Analysis' },
                                { where: 'Certifications', example: '"Google Data Analytics Professional Certificate"' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                                    <span><strong className="text-[#0A0F1C]">{item.where}:</strong> {item.example}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Keyword Mistakes to Avoid</h2>
                        <div className="space-y-2">
                            {[
                                { mistake: 'Keyword stuffing', desc: 'Repeating "Data Analyst" 15 times looks spammy. Use natural variations.' },
                                { mistake: 'Using abbreviations only', desc: 'Write "Product Manager" not "PM." Recruiters search full terms.' },
                                { mistake: 'Internal company titles', desc: '"Associate Level 3" means nothing outside your company. Use industry-standard titles.' },
                                { mistake: 'Listing skills you cannot demonstrate', desc: 'Only include skills you can discuss in an interview. Credibility matters more than volume.' },
                                { mistake: 'Ignoring the Skills section', desc: 'Many profiles have fewer than 5 skills. Aim for 15–25 relevant, current skills.' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-3">
                                    <span className="text-red-500 shrink-0 mt-0.5 text-sm">✗</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C]">{item.mistake}</p>
                                        <p className="text-xs text-[#4B5563]">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">How to Find the Right Keywords for Your Role</h2>
                        <p className="mb-4">Here is a practical method to identify which keywords to target:</p>
                        <div className="space-y-2">
                            {[
                                'Search for your target job title on LinkedIn Jobs | note recurring skills and requirements',
                                'Look at profiles of people currently in your target role | what keywords do they use?',
                                'Check job descriptions for your target role | extract the most-repeated terms',
                                'Use LinkedIn Skills assessments to identify in-demand skills in your field',
                                'Review the Skills & Endorsements of top-performing professionals in your niche',
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                    <span className="w-5 h-5 rounded-md bg-[#0A66C2] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ */}
                    <section>
                        <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-1">FAQ</p>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-3">
                            {[
                                { q: 'How many keywords should I include in my profile?', a: 'Focus on 5–8 core keywords and use them naturally across all sections. Quality placement matters more than quantity. Your headline should have 2–3, About section 4–6, and skills section 15–25.' },
                                { q: 'Does keyword placement affect LinkedIn SSI score?', a: 'LinkedIn SSI (Social Selling Index) measures different factors like network growth and engagement. Keywords primarily affect search visibility, which is separate from SSI but arguably more important for job seekers.' },
                                { q: 'Should I use the same keywords in every section?', a: 'Use your core keywords consistently but vary the context. Your headline might say "Data Analyst," your About might say "data analysis," and your experience might say "analyzed data." Natural variation is better than exact repetition.' },
                                { q: 'How does LinkedInRank evaluate keywords?', a: 'LinkedInRank checks for keyword presence in your headline, role clarity, skills relevance to your career stage, and overall consistency across sections. Upload your PDF for a free analysis.' },
                                { q: 'Do LinkedIn hashtags count as keywords?', a: 'Hashtags on posts help with content discoverability but do not affect profile search. For profile search, focus on the sections listed in this guide: headline, About, job titles, and skills.' },
                            ].map((item, i) => (
                                <details key={i} className="group bg-[#F8FAFC] border border-gray-200 rounded-xl overflow-hidden">
                                    <summary className="cursor-pointer text-sm font-semibold text-[#0A0F1C] list-none flex items-center justify-between gap-3 p-4 hover:bg-white transition-colors">
                                        {item.q}
                                        <svg className="w-4 h-4 text-[#6B7280] shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                    </summary>
                                    <p className="px-4 pb-4 text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-[#0A66C2] to-[#084E96] rounded-2xl p-8 sm:p-10 text-center shadow-[0_4px_20px_rgba(10,102,194,0.2)]">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                        </div>
                        <h2 className="text-lg font-bold text-white mb-2">Check if your keywords are working</h2>
                        <p className="text-sm text-blue-100/80 mb-5 max-w-md mx-auto">LinkedInRank analyzes keyword presence across your entire profile. Get your free score.</p>
                        <Link href="/" className="inline-block bg-white text-[#0A66C2] px-6 py-3 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors no-underline shadow-sm">Analyze Your Keywords</Link>
                    </div>

                    {/* Related Guides */}
                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'About Section Guide', href: '/linkedin-about-guide' },
                                { label: 'Recruiter Psychology', href: '/recruiter-psychology' },
                                { label: 'Get Noticed by Recruiters', href: '/get-noticed-recruiters' },
                                { label: 'For Job Seekers', href: '/for-jobseekers' },
                                { label: 'Top 10 Mistakes', href: '/linkedin-mistakes' },
                                { label: 'Profile Checklist', href: '/linkedin-profile-checklist' },
                                { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="text-xs font-medium text-[#4B5563] bg-[#F8FAFC] border border-gray-200 px-3 py-1.5 rounded-lg no-underline hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <SiteFooter />
        </main>
    )
}
