import { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'LinkedIn Rank vs Social Selling Index (SSI): Complete Comparison (2026)',
    description: 'Compare LinkedIn Rank vs LinkedIn Social Selling Index (SSI). Learn the differences between LinkedInRank profile scoring and LinkedIn SSI, which one to use, and how they affect your LinkedIn visibility.',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-rank-vs-ssi' },
    openGraph: {
        title: 'LinkedIn Rank vs Social Selling Index (SSI): Complete Comparison',
        description: 'Compare LinkedIn Rank and LinkedIn SSI. Two different metrics that measure different aspects of your LinkedIn presence.',
        url: 'https://linkedinrank.com/linkedin-rank-vs-ssi',
        siteName: 'LinkedInRank',
        type: 'article',
    },
}

const faqs = [
    { q: 'What is the difference between LinkedIn Rank and SSI?', a: 'LinkedIn Rank (as measured by LinkedInRank) evaluates your profile quality across 30+ signals like headline optimization, experience descriptions, and keyword coverage. LinkedIn Social Selling Index (SSI) measures social selling behavior: establishing your professional brand, finding the right people, engaging with insights, and building relationships. They measure fundamentally different things.' },
    { q: 'Which is better: LinkedIn Rank or SSI?', a: 'Neither is "better" | they complement each other. LinkedIn Rank tells you how well-optimized your profile is for search visibility. SSI tells you how actively you are using LinkedIn for social selling. For job seekers and passive candidates, LinkedIn Rank is more important. For salespeople and business developers, both matter equally.' },
    { q: 'Do I need LinkedIn Premium for SSI?', a: 'No, LinkedIn SSI is free, but it requires you to be logged into your LinkedIn account. LinkedInRank is also free and does not require any login or LinkedIn account access. You simply upload your exported PDF.' },
    { q: 'Can I improve both my LinkedIn Rank and SSI at the same time?', a: 'Yes. Improving your profile quality (LinkedIn Rank) naturally helps your SSI score because a stronger profile attracts more views and connections. Conversely, being more active on LinkedIn (improving SSI) generates engagement signals that can boost your search visibility.' },
    { q: 'What is a good LinkedIn SSI score?', a: 'LinkedIn SSI scores range from 0-100. A score above 70 is considered good, and above 80 is excellent. The average SSI score is around 40-50. However, SSI does not measure profile quality | only social selling activity.' },
    { q: 'What is a good LinkedIn Rank score?', a: 'LinkedIn Rank scores on LinkedInRank range from 0-100. Bronze (0-54) needs improvement, Silver (55-69) is a solid foundation, Gold (70-84) is strong, and Platinum (85-100) is exceptional. Most professionals score 45-65 on their first check.' },
    { q: 'Does LinkedIn SSI affect my search ranking?', a: 'LinkedIn has not confirmed that SSI directly affects search rankings. However, the behaviors that improve SSI (posting content, building connections, engaging with others) do generate signals that LinkedIn algorithm considers when ranking profiles in search results.' },
    { q: 'Is LinkedInRank affiliated with LinkedIn?', a: 'No. LinkedInRank is an independent tool that is not affiliated with, endorsed by, or connected to LinkedIn Corporation or Microsoft Corporation. It analyzes your exported LinkedIn PDF data to calculate your profile rank score.' },
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
        { '@type': 'ListItem', position: 2, name: 'LinkedIn Rank vs SSI', item: 'https://linkedinrank.com/linkedin-rank-vs-ssi' },
    ],
}

export default function LinkedInRankVsSSIPage() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <SiteHeader />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

            <div className="flex-1 w-full">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
                    <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5">
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-[#0A0F1C] font-medium">LinkedIn Rank vs SSI</span>
                    </nav>
                </div>

                <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A0F1C] mb-4 leading-tight">
                        LinkedIn Rank vs Social Selling Index (SSI): Complete Comparison
                    </h1>
                    <p className="text-sm text-[#9CA3AF] mb-8">Last updated: February 2025 | 8 min read</p>

                    <div className="prose prose-sm sm:prose max-w-none text-[#374151] leading-relaxed space-y-5">
                        <p className="text-base leading-relaxed">
                            <strong>LinkedIn Rank</strong> and <strong>LinkedIn Social Selling Index (SSI)</strong> are two different metrics that measure different aspects of your LinkedIn presence. LinkedIn Rank (as calculated by <Link href="/" className="text-[#0A66C2] font-medium hover:underline">LinkedInRank</Link>) measures your <em>profile quality and optimization</em>. LinkedIn SSI measures your <em>social selling behavior and activity</em>. Understanding the difference is key to improving your LinkedIn profile visibility.
                        </p>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3">Quick Comparison: LinkedIn Rank vs SSI</h2>
                        <div className="overflow-x-auto my-6">
                            <table className="w-full text-sm border border-gray-200 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-[#0A0F1C]">Feature</th>
                                        <th className="px-4 py-3 text-left font-semibold text-[#0A66C2]">LinkedIn Rank (LinkedInRank)</th>
                                        <th className="px-4 py-3 text-left font-semibold text-[#0A0F1C]">Social Selling Index (SSI)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr><td className="px-4 py-3 font-medium">What it measures</td><td className="px-4 py-3">Profile quality and optimization across 30+ signals</td><td className="px-4 py-3">Social selling behavior across 4 pillars</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Score range</td><td className="px-4 py-3">0-100 (Bronze/Silver/Gold/Platinum tiers)</td><td className="px-4 py-3">0-100 (25 points per pillar)</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Login required</td><td className="px-4 py-3">No | upload PDF only</td><td className="px-4 py-3">Yes | requires LinkedIn login</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Data stored</td><td className="px-4 py-3">No data stored, PDF deleted immediately</td><td className="px-4 py-3">Uses LinkedIn account data</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Cost</td><td className="px-4 py-3">100% free, no upsells</td><td className="px-4 py-3">Free with LinkedIn account</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Actionable advice</td><td className="px-4 py-3">Yes | personalized recommendations with AI rewrites</td><td className="px-4 py-3">Generic tips only</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Signals analyzed</td><td className="px-4 py-3">30+ profile signals (headline, about, experience, skills, structure)</td><td className="px-4 py-3">4 pillars (brand, people, insights, relationships)</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Best for</td><td className="px-4 py-3">Profile optimization, job seekers, recruiters</td><td className="px-4 py-3">Sales professionals, business developers</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Update frequency</td><td className="px-4 py-3">Instant | check anytime</td><td className="px-4 py-3">Updated daily by LinkedIn</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Privacy</td><td className="px-4 py-3">Privacy-first: no cookies, no tracking</td><td className="px-4 py-3">LinkedIn account-based</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3">What Is LinkedIn Rank?</h2>
                        <p>
                            <Link href="/what-is-linkedin-rank" className="text-[#0A66C2] font-medium hover:underline">LinkedIn rank</Link> is a measure of how well your LinkedIn profile is optimized for search visibility. The <Link href="/" className="text-[#0A66C2] font-medium hover:underline">LinkedInRank checker</Link> evaluates your profile across 30+ ranking signals organized into 6 categories: Headline (20%), About Section (20%), Experience (25%), Skills (15%), Education (10%), and Structure (10%).
                        </p>
                        <p>
                            Your LinkedIn rank score tells you how effectively your profile communicates your professional value and how likely it is to appear in recruiter searches. A higher LinkedIn rank means better visibility in LinkedIn search results.
                        </p>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3">What Is LinkedIn Social Selling Index (SSI)?</h2>
                        <p>
                            LinkedIn Social Selling Index is a metric created by LinkedIn that measures how effectively you use LinkedIn for social selling. SSI scores are based on four pillars, each worth 25 points:
                        </p>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li><strong>Establish your professional brand:</strong> Completing your profile and publishing meaningful posts</li>
                            <li><strong>Find the right people:</strong> Using LinkedIn search tools to identify prospects</li>
                            <li><strong>Engage with insights:</strong> Discovering and sharing conversation-worthy updates</li>
                            <li><strong>Build relationships:</strong> Strengthening your network with decision makers</li>
                        </ol>
                        <p>
                            SSI is available to all LinkedIn users for free at linkedin.com/sales/ssi, but requires logging into your LinkedIn account.
                        </p>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3">When to Use LinkedIn Rank vs SSI</h2>
                        <div className="grid sm:grid-cols-2 gap-4 my-6">
                            <div className="bg-white border border-blue-200 rounded-xl p-5">
                                <h3 className="text-sm font-bold text-[#0A66C2] mb-2">Use LinkedIn Rank (LinkedInRank) when:</h3>
                                <ul className="text-sm text-[#4B5563] space-y-1.5">
                                    <li>You want to know if your profile is well-optimized</li>
                                    <li>You are job seeking and want to rank higher in recruiter searches</li>
                                    <li>You want specific, actionable profile improvement advice</li>
                                    <li>You want to check without logging in or sharing account data</li>
                                    <li>You want AI-powered rewrite suggestions</li>
                                    <li>You are a student or early-career professional building your profile</li>
                                </ul>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-xl p-5">
                                <h3 className="text-sm font-bold text-[#0A0F1C] mb-2">Use LinkedIn SSI when:</h3>
                                <ul className="text-sm text-[#4B5563] space-y-1.5">
                                    <li>You are in sales and want to measure social selling activity</li>
                                    <li>You want to benchmark against your industry peers</li>
                                    <li>You want to track your engagement consistency</li>
                                    <li>You want to measure your networking activity level</li>
                                    <li>You already have LinkedIn Sales Navigator</li>
                                </ul>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3">Can I Use Both?</h2>
                        <p>
                            Yes, and you should. LinkedIn Rank and SSI are complementary metrics. Think of it this way:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>LinkedIn Rank</strong> tells you <em>how good your profile looks</em> when someone finds you</li>
                            <li><strong>LinkedIn SSI</strong> tells you <em>how actively you are being found</em> and engaging</li>
                        </ul>
                        <p>
                            The best LinkedIn strategy optimizes both: a great profile (high LinkedIn Rank) combined with consistent activity (high SSI) creates maximum visibility.
                        </p>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 my-8">
                            <p className="text-sm font-semibold text-[#0A66C2] mb-2">Check Your LinkedIn Rank Now</p>
                            <p className="text-sm text-[#4B5563] mb-3">Free, no login, no data stored. Get your LinkedIn profile rank score in under 60 seconds.</p>
                            <Link href="/" className="inline-block bg-[#0A66C2] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#084E96] transition-colors">Check My LinkedIn Rank</Link>
                        </div>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3">How LinkedIn Rank Signals Differ from SSI Pillars</h2>
                        <p>
                            LinkedIn Rank evaluates the <em>static quality</em> of your profile content, while SSI evaluates your <em>dynamic behavior</em> on the platform. Here is a detailed signal comparison:
                        </p>
                        <div className="overflow-x-auto my-6">
                            <table className="w-full text-sm border border-gray-200 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-[#0A0F1C]">LinkedIn Rank Signals</th>
                                        <th className="px-4 py-3 text-left font-semibold text-[#0A0F1C]">SSI Pillars</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr><td className="px-4 py-3">Headline keyword optimization</td><td className="px-4 py-3">Professional brand establishment</td></tr>
                                    <tr><td className="px-4 py-3">About section structure and quality</td><td className="px-4 py-3">Content publishing frequency</td></tr>
                                    <tr><td className="px-4 py-3">Experience description impact</td><td className="px-4 py-3">Search tool usage</td></tr>
                                    <tr><td className="px-4 py-3">Skills relevance and alignment</td><td className="px-4 py-3">Engagement with posts</td></tr>
                                    <tr><td className="px-4 py-3">Profile completeness score</td><td className="px-4 py-3">Connection building activity</td></tr>
                                    <tr><td className="px-4 py-3">Keyword density and placement</td><td className="px-4 py-3">InMail response rate</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-xl font-bold text-[#0A0F1C] mt-10 mb-3">Bottom Line</h2>
                        <p>
                            LinkedIn Rank and LinkedIn SSI serve different purposes. If your goal is to have a profile that ranks well in LinkedIn search and impresses recruiters, focus on your LinkedIn Rank first. If your goal is to be more active in social selling and engagement, focus on your SSI.
                        </p>
                        <p>
                            For most professionals, starting with your <Link href="/" className="text-[#0A66C2] font-medium hover:underline">LinkedIn Rank</Link> is the best first step because a well-optimized profile is the foundation of all LinkedIn success. Once your profile is strong, improving your SSI through consistent activity will amplify your results.
                        </p>
                    </div>

                    {/* FAQ */}
                    <section className="mt-12">
                        <h2 className="text-xl font-bold text-[#0A0F1C] mb-5">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <details key={i} className="bg-white border border-gray-200 rounded-xl group" open={i === 0}>
                                    <summary className="px-5 py-4 cursor-pointer text-sm font-semibold text-[#0A0F1C] list-none flex items-center justify-between gap-3">
                                        {faq.q}
                                        <svg className="w-4 h-4 text-[#9CA3AF] shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                    </summary>
                                    <div className="px-5 pb-4 text-sm text-[#4B5563] leading-relaxed">{faq.a}</div>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Internal links */}
                    <section className="mt-12 bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-base font-bold text-[#0A0F1C] mb-4">Related Guides</h2>
                        <div className="grid sm:grid-cols-2 gap-3">
                            <Link href="/what-is-linkedin-rank" className="text-sm text-[#0A66C2] hover:underline font-medium">What Is LinkedIn Rank?</Link>
                            <Link href="/linkedin-optimization-guide" className="text-sm text-[#0A66C2] hover:underline font-medium">Complete LinkedIn Profile Optimization Guide</Link>
                            <Link href="/compare-linkedin-review-tools" className="text-sm text-[#0A66C2] hover:underline font-medium">Compare LinkedIn Review Tools</Link>
                            <Link href="/linkedin-keywords-guide" className="text-sm text-[#0A66C2] hover:underline font-medium">LinkedIn Keywords and SEO Guide</Link>
                            <Link href="/recruiter-psychology" className="text-sm text-[#0A66C2] hover:underline font-medium">How Recruiters View Your Profile</Link>
                            <Link href="/tools" className="text-sm text-[#0A66C2] hover:underline font-medium">Free LinkedIn Tools</Link>
                        </div>
                    </section>
                </article>
            </div>

            <SiteFooter />
        </main>
    )
}
