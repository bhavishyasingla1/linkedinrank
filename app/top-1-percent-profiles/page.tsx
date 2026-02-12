import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'Top 1% LinkedIn Profiles — What They Do Differently | LinkedInRank',
    description: 'Breakdown of what top 1% LinkedIn profiles have in common. Clear positioning, metrics everywhere, focused narrative, personal brand consistency, and social proof. With a scoreable checklist.',
    keywords: 'top linkedin profiles, best linkedin profiles, linkedin profile examples, strong linkedin profile, linkedin profile tips, what makes a good linkedin profile, linkedin profile optimization',
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'What Top 1% LinkedIn Profiles Do Differently',
            description: 'Breakdown of what separates top 1% LinkedIn profiles from the rest. 7 traits, real patterns, and how to apply them to your own profile.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/top-1-percent-profiles',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
            { '@type': 'ListItem', position: 2, name: 'Top 1% Profiles', item: 'https://linkedinrank.com/top-1-percent-profiles' },
        ] },
        { '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'What score do top 1% profiles get on LinkedInRank?', acceptedAnswer: { '@type': 'Answer', text: 'Top 1% profiles typically score 85+ (Platinum tier) on LinkedInRank. They excel in every category: headline clarity, About section depth, quantified experience, and strategic skills.' } },
            { '@type': 'Question', name: 'How long does it take to reach top 1% on LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: 'With focused optimization, you can reach Platinum tier in 2–4 weeks. It requires strong content in every section plus strategic keyword placement and regular activity.' } },
            { '@type': 'Question', name: 'Do top profiles use LinkedIn Premium?', acceptedAnswer: { '@type': 'Answer', text: 'Many do, but Premium is not what makes them great. Their profile quality, content consistency, and strategic positioning are what set them apart — all achievable with a free account.' } },
        ] },
    ],
}

export default function Top1PercentProfilesPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader navLinks={[{ href: '/linkedin-optimization-guide', label: 'Full Guide' }]} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Profile Analysis</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">What Top 1% LinkedIn Profiles Do Differently</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Top LinkedIn profiles are not fancy. They are <strong className="text-[#0A0F1C]">clear, focused, and credible</strong>. After analyzing thousands of profiles through <Link href="/" className="text-[#0A66C2] hover:underline">LinkedInRank</Link>, consistent patterns emerge. This guide breaks down exactly what separates the top 1% from everyone else — and how you can apply the same principles.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">6 Traits Every Top 1% Profile Shares</h2>
                        <div className="space-y-5">
                            {[
                                { title: 'Clear Positioning', bad: 'Open to opportunities', good: 'Frontend Developer specializing in React & performance optimization', desc: 'Top profiles scream one thing. Not marketing + design + coding + finance. One clear theme that runs through every section.' },
                                { title: 'Strong Headline Formula', bad: 'Software Engineer', good: 'UX Designer for SaaS | Conversion-Focused Design | Figma & Framer', desc: 'The formula is always: Role + niche + value. Every word earns its place. No fluff, no buzzwords.' },
                                { title: 'Metrics Everywhere', bad: 'Improved company performance', good: 'Increased revenue by 20%. Reduced churn by 30%. Served 50+ enterprise clients.', desc: 'Numbers are the language of credibility. Top profiles quantify everything — revenue, users, growth rates, team sizes, cost savings.' },
                                { title: 'Focused Narrative', bad: 'Jack of all trades', good: 'Every role, skill, and post reinforces "content marketing specialist"', desc: 'Consistency builds trust. When your headline, About, experience, and skills all point in the same direction, recruiters trust you more.' },
                                { title: 'Featured Section Used Well', bad: 'Empty or default', good: 'Portfolio, case studies, top posts, media mentions', desc: 'The Featured section is prime real estate. Top profiles use it to showcase their best work, not leave it blank.' },
                                { title: 'Social Proof', bad: 'Zero recommendations', good: '5+ recommendations from colleagues, managers, and clients', desc: 'Recommendations, endorsements, and testimonials provide third-party validation that you cannot create yourself.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <p className="text-base font-bold text-[#0A0F1C] mb-2">{item.title}</p>
                                    <p className="text-sm text-[#4B5563] mb-3">{item.desc}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                                            <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Avoid</p>
                                            <p className="text-xs text-[#4B5563]">{item.bad}</p>
                                        </div>
                                        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1">Top 1%</p>
                                            <p className="text-xs text-[#4B5563]">{item.good}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Hidden Patterns in Top Profiles</h2>
                        <p className="mb-4">Beyond the obvious elements, top 1% profiles share subtle patterns that most people miss:</p>
                        <ul className="space-y-2">
                            {[
                                'They write like humans, not resumes — conversational tone builds connection',
                                'They show personality — a unique voice makes profiles memorable',
                                'They teach something — sharing knowledge positions them as experts',
                                'They share insights regularly — even commenting counts as activity',
                                'They have a custom URL — small detail that signals professionalism',
                                'Their photo, banner, and tone are aligned — visual consistency matters',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="text-[#0A66C2] mt-0.5 shrink-0">&#8226;</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Top 1% Profile Checklist</h2>
                        <p className="mb-4"><Link href="/" className="text-[#0A66C2] hover:underline">LinkedInRank</Link> can score many of these signals. Use this checklist to assess your own profile:</p>

                        <div className="space-y-5">
                            {[
                                { category: 'Profile Basics', items: ['Professional headshot photo', 'Custom banner image', 'Custom URL (linkedin.com/in/yourname)'] },
                                { category: 'Positioning', items: ['Clear niche in headline', 'Keyword-rich headline with role + industry', 'Defined target audience'] },
                                { category: 'Credibility', items: ['Metrics in every experience entry', 'Case studies or portfolio in Featured', 'At least 3 recommendations'] },
                                { category: 'Discoverability', items: ['15–25 relevant skills added', 'Keywords repeated naturally across sections', 'Job titles match industry standards'] },
                                { category: 'Authority Signals', items: ['Regular content posting (2–3x/week)', 'Thoughtful comments on industry posts', 'Active engagement with network'] },
                            ].map((section, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-2">{section.category}</p>
                                    <div className="space-y-1.5">
                                        {section.items.map((item, j) => (
                                            <div key={j} className="flex items-start gap-2 text-sm text-[#4B5563]">
                                                <span className="text-emerald-500 shrink-0 mt-0.5">&#9744;</span>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm">For a more detailed section-by-section checklist, see our <Link href="/linkedin-profile-checklist" className="text-[#0A66C2] hover:underline">LinkedIn Profile Checklist</Link>.</p>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'What score do top 1% profiles get on LinkedInRank?', a: 'Profiles in the Platinum tier (80+/100) consistently exhibit the traits described above. However, a high score is achievable at any career stage — a student with a clear headline, relevant projects, and well-described skills can score 75+.' },
                                { q: 'Do I need a large following to have a top profile?', a: 'No. Follower count is not a profile quality signal. Many professionals with fewer than 1,000 connections have Platinum-tier profiles because their content and positioning are excellent.' },
                                { q: 'How long does it take to build a top 1% profile?', a: 'The profile itself can be optimized in 2–3 hours. Building credibility signals (recommendations, content history, metrics) takes 3–6 months of consistent effort.' },
                                { q: 'Can LinkedInRank help me reach the top 1%?', a: 'Yes. LinkedInRank scores your profile across the same dimensions that define top profiles: headline clarity, experience depth, skills relevance, and overall completeness. Upload your PDF for a free analysis with specific improvement recommendations.' },
                                { q: 'What is the biggest difference between average and top profiles?', a: 'Specificity. Average profiles use vague language ("hardworking professional"). Top profiles use specific evidence ("increased organic traffic 60% in 5 months using SEO and content strategy"). Every claim is backed by proof.' },
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
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">How close are you to the top 1%?</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF and get a free score with a detailed breakdown of every section.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Get Your LinkedIn Score — It&apos;s Free</Link>
                    </div>

                    {/* Related Guides */}
                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'About Section Guide', href: '/linkedin-about-guide' },
                                { label: 'Recruiter Psychology', href: '/recruiter-psychology' },
                                { label: 'Personal Branding', href: '/linkedin-personal-branding' },
                                { label: 'Profile Checklist', href: '/linkedin-profile-checklist' },
                                { label: 'Keywords Guide', href: '/linkedin-keywords-guide' },
                                { label: 'Top 10 Mistakes', href: '/linkedin-mistakes' },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <footer className="border-t border-gray-100 bg-[#F8FAFC] py-8">
                <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4"><Link href="/" className="font-bold text-sm text-[#0A0F1C] no-underline">LinkedIn<span className="text-gradient-brand">Rank</span></Link><a href="https://www.instagram.com/linkedinrank/" target="_blank" rel="noopener noreferrer" className="text-[#6B7280] hover:text-[#0A0F1C] transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a></div>
                    <nav className="flex flex-wrap gap-x-6 gap-y-2">
                        <Link href="/" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Home</Link>
                        <Link href="/linkedin-optimization-guide" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Optimization Guide</Link>
                        <Link href="/recruiter-psychology" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Recruiter Psychology</Link>
                        <Link href="/faq" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">FAQ</Link>
                    </nav>
                </div>
            </footer>
        </main>
    )
}
