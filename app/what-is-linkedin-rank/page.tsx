import { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'

export const metadata: Metadata = {
    title: 'What Is LinkedIn Rank? How LinkedIn Profile Ranking Works (2026 Guide)',
    description: 'Learn what LinkedIn rank means, how LinkedIn profile ranking works, and how to check your LinkedIn rank for free. Complete guide to LinkedIn ranking factors, scoring, and visibility.',
    alternates: { canonical: 'https://linkedinrank.com/what-is-linkedin-rank' },
    openGraph: {
        title: 'What Is LinkedIn Rank? How LinkedIn Profile Ranking Works',
        description: 'Complete guide to LinkedIn rank: what it means, how it works, how to check your LinkedIn profile rank, and how to improve your LinkedIn ranking.',
        url: 'https://linkedinrank.com/what-is-linkedin-rank',
        siteName: 'LinkedInRank',
        type: 'article',
    },
}

const faqs = [
    { q: 'What is LinkedIn rank?', a: 'LinkedIn rank refers to how your LinkedIn profile compares to others in terms of quality, completeness, and search visibility. Your LinkedIn rank determines how high you appear in LinkedIn search results when recruiters, hiring managers, or connections search for professionals in your field. A higher LinkedIn rank means more profile views, connection requests, and job opportunities.' },
    { q: 'How do I check my LinkedIn rank?', a: 'You can check your LinkedIn rank for free using LinkedInRank at linkedinrank.com. Upload your LinkedIn PDF export and get a score out of 100 across 30+ ranking signals. No login required and no data is stored. LinkedInRank analyzes your headline, about section, experience, skills, and overall profile structure to calculate your LinkedIn profile rank.' },
    { q: 'What is a good LinkedIn rank score?', a: 'LinkedIn rank scores are categorized into tiers: Bronze (0-54) means your profile needs work, Silver (55-69) indicates a solid foundation, Gold (70-84) shows a strong professional presence, and Platinum (85-100) represents an exceptionally well-crafted profile. Most professionals score between 45-65 on their first check.' },
    { q: 'Is LinkedIn rank the same as Social Selling Index?', a: 'No. LinkedIn rank (as measured by LinkedInRank) evaluates your profile quality across 30+ signals like headline optimization, experience descriptions, and keyword coverage. LinkedIn Social Selling Index (SSI) measures your social selling behavior like posting, engaging, and connecting. They measure different things and are complementary metrics.' },
    { q: 'What factors affect my LinkedIn rank?', a: 'Key LinkedIn ranking factors include: headline keyword optimization (20% weight), about section quality and completeness (20%), experience descriptions with quantified achievements (25%), skills relevance and endorsements (15%), education completeness (10%), and overall profile structure (10%). Each factor contains multiple sub-signals.' },
    { q: 'How often should I check my LinkedIn rank?', a: 'Check your LinkedIn rank after making significant profile changes, such as updating your headline, rewriting your about section, or adding new experience. Most professionals benefit from checking monthly to track improvement. LinkedInRank is free and instant, so you can check as often as you like.' },
    { q: 'Does LinkedIn rank affect recruiter search results?', a: 'Yes. Your LinkedIn profile ranking directly impacts where you appear in recruiter searches. Recruiters use LinkedIn search to find candidates, and profiles with stronger keywords, more complete sections, and better-optimized content rank higher in these results. Improving your LinkedIn rank increases your visibility to recruiters.' },
    { q: 'Is LinkedInRank free to use?', a: 'Yes, LinkedInRank is completely free. There are no paid plans, no upsells, no login required, and no data stored. You simply upload your LinkedIn PDF export and receive your LinkedIn rank score with personalized recommendations in under 60 seconds.' },
    { q: 'Is LinkedInRank safe?', a: 'Yes, LinkedInRank is safe to use. It does not access your LinkedIn account. It only reads your exported LinkedIn PDF file. The PDF is processed in memory and deleted immediately after analysis. No data is stored, no cookies are used, and no tracking occurs.' },
    { q: 'How can I improve my LinkedIn rank?', a: 'To improve your LinkedIn rank: 1) Optimize your headline with role-specific keywords, 2) Write a compelling about section with a hook, proof, and call-to-action, 3) Add quantified achievements to experience descriptions, 4) Include relevant skills that match your target roles, 5) Complete all profile sections including education and certifications. LinkedInRank provides specific, personalized recommendations for each area.' },
]

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
}

const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
        { '@type': 'ListItem', position: 2, name: 'What Is LinkedIn Rank', item: 'https://linkedinrank.com/what-is-linkedin-rank' },
    ],
}

const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Is LinkedIn Rank? How LinkedIn Profile Ranking Works',
    description: 'Complete guide to LinkedIn rank: what it means, how it works, and how to improve your LinkedIn profile ranking.',
    url: 'https://linkedinrank.com/what-is-linkedin-rank',
    datePublished: '2025-01-15',
    dateModified: '2025-02-23',
    author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
}

export default function WhatIsLinkedInRankPage() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <SiteHeader />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <div className="flex-1 w-full">
                {/* Breadcrumbs */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
                    <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5">
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-[#0A0F1C] font-medium">What Is LinkedIn Rank</span>
                    </nav>
                </div>

                <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A0F1C] mb-4 leading-tight">
                        What Is LinkedIn Rank? How LinkedIn Profile Ranking Works
                    </h1>
                    <p className="text-sm text-[#6B7280] mb-8">Last updated: February 2025 | 10 min read</p>

                    {/* Intro | primary keyword in first 100 words */}
                    <div className="prose prose-sm sm:prose max-w-none text-[#374151] leading-relaxed space-y-5">
                        <p className="text-base leading-relaxed">
                            <strong>LinkedIn rank</strong> refers to how your LinkedIn profile compares to other professionals in terms of quality, optimization, and search visibility. Your LinkedIn profile rank determines where you appear in LinkedIn search results when recruiters, hiring managers, and potential connections search for people with your skills and experience. Understanding your LinkedIn rank is the first step to improving your LinkedIn profile visibility and getting more opportunities.
                        </p>
                        <p>
                            In this guide, we explain everything you need to know about LinkedIn ranking: what it means, how it works, what factors affect your LinkedIn rank, and how to check and improve your LinkedIn profile ranking using free tools like <Link href="/" className="text-[#0A66C2] font-medium hover:underline">LinkedInRank</Link>.
                        </p>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 my-6">
                            <p className="text-sm font-semibold text-[#0A66C2] mb-2">Check Your LinkedIn Rank for Free</p>
                            <p className="text-sm text-[#4B5563] mb-3">Upload your LinkedIn PDF and get your profile rank score out of 100 in under 60 seconds. No login required.</p>
                            <Link href="/" className="inline-block bg-[#0A66C2] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#084E96] transition-colors">Check My LinkedIn Rank</Link>
                        </div>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3" id="what-does-linkedin-rank-mean">What Does LinkedIn Rank Mean?</h2>
                        <p>
                            LinkedIn rank is a measure of how well your LinkedIn profile is optimized compared to other professionals. While LinkedIn does not publish an official "rank number," your profile quality directly determines your position in LinkedIn search results. A higher-quality profile appears more frequently and more prominently when people search for professionals in your field.
                        </p>
                        <p>
                            Think of your LinkedIn rank like Google rankings for websites. Just as Google ranks web pages based on content quality, relevance, and authority, LinkedIn ranks profiles based on completeness, keyword optimization, engagement signals, and content quality.
                        </p>
                        <p>
                            <Link href="/" className="text-[#0A66C2] font-medium hover:underline">LinkedInRank</Link> is a free LinkedIn rank checker that quantifies this into a score out of 100, so you can see exactly where your profile stands and what to improve.
                        </p>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3" id="how-linkedin-ranking-works">How LinkedIn Profile Ranking Works</h2>
                        <p>
                            LinkedIn uses an algorithm to rank profiles in search results. When someone searches for "software engineer in San Francisco" or "marketing manager," LinkedIn evaluates all matching profiles and ranks them based on multiple factors. The profiles that rank highest get seen first by recruiters and hiring managers.
                        </p>
                        <p>Here is how LinkedIn profile ranking works:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li><strong>Keyword matching:</strong> LinkedIn scans your headline, about section, experience, and skills for keywords that match the search query. Profiles with exact and related keyword matches rank higher.</li>
                            <li><strong>Profile completeness:</strong> LinkedIn favors profiles that have all sections filled out. Incomplete profiles rank lower in search results.</li>
                            <li><strong>Connection proximity:</strong> LinkedIn weights 1st, 2nd, and 3rd degree connections. Profiles closer to the searcher in the connection graph rank higher.</li>
                            <li><strong>Engagement signals:</strong> Profiles of people who are active on LinkedIn (posting, commenting, sharing) get a ranking boost.</li>
                            <li><strong>Content quality:</strong> Well-written headlines, detailed experience descriptions, and compelling about sections signal quality to the algorithm.</li>
                        </ol>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3" id="linkedin-ranking-factors">LinkedIn Ranking Factors: The 30+ Signals That Matter</h2>
                        <p>
                            <Link href="/" className="text-[#0A66C2] font-medium hover:underline">LinkedInRank</Link> evaluates your profile across 30+ ranking signals organized into 6 categories. Here is the breakdown:
                        </p>

                        {/* Table for featured snippet targeting */}
                        <div className="overflow-x-auto my-6">
                            <table className="w-full text-sm border border-gray-200 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-[#0A0F1C]">Category</th>
                                        <th className="px-4 py-3 text-left font-semibold text-[#0A0F1C]">Weight</th>
                                        <th className="px-4 py-3 text-left font-semibold text-[#0A0F1C]">Key Signals</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr><td className="px-4 py-3 font-medium">Headline</td><td className="px-4 py-3">20%</td><td className="px-4 py-3">Role clarity, keywords, specificity, positioning</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">About Section</td><td className="px-4 py-3">20%</td><td className="px-4 py-3">Direction, skills mention, structure, credibility</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Experience</td><td className="px-4 py-3">25%</td><td className="px-4 py-3">Descriptions, action verbs, impact, quantification</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Skills</td><td className="px-4 py-3">15%</td><td className="px-4 py-3">Relevance, specificity, role alignment</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Education</td><td className="px-4 py-3">10%</td><td className="px-4 py-3">Completeness, field alignment, certifications</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Structure</td><td className="px-4 py-3">10%</td><td className="px-4 py-3">Section coverage, content depth, logical flow</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            For a detailed breakdown of each ranking factor, see our <Link href="/linkedin-optimization-guide" className="text-[#0A66C2] font-medium hover:underline">Complete LinkedIn Profile Optimization Guide</Link>.
                        </p>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3" id="how-to-check-linkedin-rank">How to Check Your LinkedIn Rank</h2>
                        <p>
                            The easiest way to check your LinkedIn rank is to use the free <Link href="/" className="text-[#0A66C2] font-medium hover:underline">LinkedInRank checker</Link>. Here is how:
                        </p>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li><strong>Export your LinkedIn PDF:</strong> Go to your LinkedIn profile, click "More," then "Save to PDF."</li>
                            <li><strong>Upload to LinkedInRank:</strong> Visit <Link href="/" className="text-[#0A66C2] hover:underline">linkedinrank.com</Link> and upload your PDF. No login or signup needed.</li>
                            <li><strong>Get your rank score:</strong> In under 60 seconds, you receive a score out of 100, tier placement, category breakdown, and personalized recommendations.</li>
                            <li><strong>Follow the recommendations:</strong> LinkedInRank provides specific, actionable advice for each section of your profile.</li>
                        </ol>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3" id="linkedin-rank-vs-ssi">LinkedIn Rank vs Social Selling Index (SSI)</h2>
                        <p>
                            Many people confuse LinkedIn rank with LinkedIn Social Selling Index (SSI). They are different metrics that measure different things:
                        </p>
                        <div className="overflow-x-auto my-6">
                            <table className="w-full text-sm border border-gray-200 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-[#0A0F1C]">Feature</th>
                                        <th className="px-4 py-3 text-left font-semibold text-[#0A0F1C]">LinkedIn Rank (LinkedInRank)</th>
                                        <th className="px-4 py-3 text-left font-semibold text-[#0A0F1C]">Social Selling Index (SSI)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr><td className="px-4 py-3 font-medium">What it measures</td><td className="px-4 py-3">Profile quality and optimization</td><td className="px-4 py-3">Social selling behavior</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Login required</td><td className="px-4 py-3">No</td><td className="px-4 py-3">Yes</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Cost</td><td className="px-4 py-3">Free</td><td className="px-4 py-3">Free (with LinkedIn login)</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Signals analyzed</td><td className="px-4 py-3">30+ profile signals</td><td className="px-4 py-3">4 social selling pillars</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Actionable advice</td><td className="px-4 py-3">Yes, with AI rewrites</td><td className="px-4 py-3">Limited</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Privacy</td><td className="px-4 py-3">No data stored</td><td className="px-4 py-3">Uses LinkedIn account data</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3" id="improve-linkedin-rank">How to Improve Your LinkedIn Rank</h2>
                        <p>Here are the most impactful actions to improve your LinkedIn profile ranking:</p>
                        <ol className="list-decimal pl-5 space-y-3">
                            <li><strong>Optimize your headline with keywords:</strong> Your headline carries the most weight in LinkedIn search. Include your role, industry, and 2-3 keywords recruiters search for. Use our <Link href="/tools/linkedin-headline-generator" className="text-[#0A66C2] hover:underline">LinkedIn Headline Generator</Link> for AI-powered suggestions.</li>
                            <li><strong>Write a compelling about section:</strong> Open with a hook, include your background, key achievements, and a call-to-action. Use our <Link href="/tools/linkedin-about-generator" className="text-[#0A66C2] hover:underline">LinkedIn About Section Generator</Link>.</li>
                            <li><strong>Quantify your experience:</strong> Replace vague descriptions with specific, measurable achievements. "Increased sales by 34%" ranks better than "Managed sales team."</li>
                            <li><strong>Add relevant skills:</strong> Include 15-25 skills that match your target roles. Prioritize skills that appear in job postings you want.</li>
                            <li><strong>Complete every section:</strong> Fill out education, certifications, volunteer work, and publications. Profile completeness is a ranking factor.</li>
                            <li><strong>Use industry keywords naturally:</strong> Weave keywords into all sections without stuffing. Use our <Link href="/tools/linkedin-profile-keyword-analyzer" className="text-[#0A66C2] hover:underline">LinkedIn Profile Keyword Analyzer</Link> to find gaps.</li>
                        </ol>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 my-8">
                            <p className="text-sm font-semibold text-[#0A66C2] mb-2">Ready to Improve Your LinkedIn Rank?</p>
                            <p className="text-sm text-[#4B5563] mb-3">Get your free LinkedIn rank score with personalized recommendations. No login, no data stored, under 60 seconds.</p>
                            <Link href="/" className="inline-block bg-[#0A66C2] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#084E96] transition-colors">Check My LinkedIn Rank Free</Link>
                        </div>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3" id="linkedin-rank-tiers">LinkedIn Rank Tiers Explained</h2>
                        <p>When you check your LinkedIn rank with LinkedInRank, your profile is placed into one of four tiers based on your score:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Bronze (0-54):</strong> Your profile needs significant improvement. Common issues include a generic headline, missing about section, or sparse experience descriptions. Most profiles start here.</li>
                            <li><strong>Silver (55-69):</strong> You have a solid foundation but are missing optimization opportunities. Typically, the headline or about section needs refinement.</li>
                            <li><strong>Gold (70-84):</strong> Strong professional presence. Your profile is well-written but may lack keyword optimization or quantified achievements.</li>
                            <li><strong>Platinum (85-100):</strong> Exceptionally well-crafted profile. You are in the top tier of LinkedIn profiles and likely rank highly in recruiter searches.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3" id="who-should-check">Who Should Check Their LinkedIn Rank?</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Job seekers:</strong> Your LinkedIn rank directly affects how many recruiters find you. A higher rank means more interview opportunities.</li>
                            <li><strong>Students and graduates:</strong> Building a strong LinkedIn rank early gives you a head start. LinkedInRank adapts scoring for students.</li>
                            <li><strong>Professionals in career transitions:</strong> When changing industries, your LinkedIn rank helps you understand how well your profile positions you for your new target role.</li>
                            <li><strong>Freelancers and consultants:</strong> Clients search LinkedIn for service providers. A higher LinkedIn rank means more inbound leads.</li>
                            <li><strong>Sales professionals:</strong> LinkedIn is the primary B2B sales platform. Your profile rank affects your ability to connect with prospects.</li>
                        </ul>
                    </div>

                    {/* FAQ Section */}
                    <section className="mt-12">
                        <h2 className="text-xl font-bold text-[#0A0F1C] mb-5">Frequently Asked Questions About LinkedIn Rank</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <details key={i} className="bg-white border border-gray-200 rounded-xl group" open={i === 0}>
                                    <summary className="px-5 py-4 cursor-pointer text-sm font-semibold text-[#0A0F1C] list-none flex items-center justify-between gap-3">
                                        {faq.q}
                                        <svg className="w-4 h-4 text-[#6B7280] shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </summary>
                                    <div className="px-5 pb-4 text-sm text-[#4B5563] leading-relaxed">{faq.a}</div>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Related pages for internal linking */}
                    <RelatedPages currentSlug="what-is-linkedin-rank" />
                </article>
            </div>

            <FooterLayout />
        </main>
    )
}
