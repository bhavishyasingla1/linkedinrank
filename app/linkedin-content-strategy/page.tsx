import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'LinkedIn Content Strategy — What to Post, When & How Often (2026)',
    description: 'Practical LinkedIn content strategy for 2026: posting cadence, content types that get reach, algorithm tips, and hooks that stop the scroll. Works for any career stage.',
    keywords: 'linkedin content strategy 2026, what to post on linkedin, linkedin posting tips, linkedin algorithm, linkedin engagement, linkedin content ideas, how often to post on linkedin, linkedin posting strategy, linkedin content calendar',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-content-strategy' },
    openGraph: {
        title: 'LinkedIn Content Strategy — What to Post, When & How Often',
        description: 'Posting cadence, content types, algorithm tips, and engagement tactics for LinkedIn in 2026.',
        url: 'https://linkedinrank.com/linkedin-content-strategy',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'LinkedIn Content Strategy Guide | What to Post and When',
            description: 'Build a LinkedIn content strategy that grows your visibility. Content pillars, posting frequency, format selection, and engagement tactics.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-content-strategy',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        {
            '@type': 'BreadcrumbList', itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
                { '@type': 'ListItem', position: 2, name: 'Content Strategy', item: 'https://linkedinrank.com/linkedin-content-strategy' },
            ]
        },
        {
            '@type': 'FAQPage', mainEntity: [
                { '@type': 'Question', name: 'How often should I post on LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: '3–4 times per week is optimal. Consistency matters more than volume. Even 2 quality posts per week will compound over time.' } },
                { '@type': 'Question', name: 'What type of content performs best on LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: 'Personal stories with professional insights, contrarian takes, how-to breakdowns, and data-driven posts consistently outperform promotional content.' } },
                { '@type': 'Question', name: 'Should I use LinkedIn articles or posts?', acceptedAnswer: { '@type': 'Answer', text: 'Posts get significantly more reach than articles. Use posts for regular content (under 3,000 characters). Save articles for deep-dive, evergreen content you want to be searchable.' } },
            ]
        },
    ],
}

export default function LinkedInContentStrategyPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Content Strategy</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">LinkedIn Content Strategy: What to Post, When, and How</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Content is the fastest way to build visibility on LinkedIn. But most professionals either do not post at all, or post without a strategy. This guide gives you a practical, repeatable content framework | whether you are a student posting your first update or a founder building thought leadership.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Why Content Matters for Your Profile</h2>
                        <p className="mb-4">Your LinkedIn profile is your static presence. Content is your dynamic presence. Posting regularly does three things:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { title: 'Signals activity', desc: 'Recruiters check recent activity. A dead profile suggests low engagement with your industry.' },
                                { title: 'Builds authority', desc: 'Sharing insights positions you as a knowledgeable professional in your niche.' },
                                { title: 'Expands reach', desc: 'Every post is seen by your network and can reach their networks through engagement.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</p>
                                    <p className="text-xs text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Content by Career Stage</h2>
                        <div className="space-y-5">
                            {[
                                { stage: 'Students', frequency: '1–2 posts/month', topics: ['Project learnings and hackathon experiences', 'Internship takeaways', 'Course completions and new skills', 'Industry observations from a fresh perspective'], link: '/for-students' },
                                { stage: 'Job Seekers', frequency: '2–3 posts/week', topics: ['Job search learnings and insights', 'Industry analysis and trends', 'Skills demonstrations and case studies', 'Networking tips and experiences'], link: '/for-jobseekers' },
                                { stage: 'Founders', frequency: '3–4 posts/week', topics: ['Building in public | wins and lessons', 'Industry insights and opinions', 'Team and culture stories', 'Customer success and traction updates'], link: '/for-founders' },
                                { stage: 'Creators / Brand Builders', frequency: '4–5 posts/week', topics: ['Educational content in your niche', 'Frameworks and actionable advice', 'Personal stories with professional lessons', 'Contrarian takes and opinion pieces'], link: '/linkedin-personal-branding' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-base font-bold text-[#0A0F1C]">{item.stage}</p>
                                        <span className="text-xs font-bold text-[#0A66C2] bg-[#EFF6FF] px-2.5 py-1 rounded-full">{item.frequency}</span>
                                    </div>
                                    <ul className="space-y-1 mb-2">
                                        {item.topics.map((topic, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-[#4B5563]">
                                                <span className="text-[#0A66C2] mt-0.5 shrink-0">&#8226;</span>
                                                <span>{topic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href={item.link} className="text-xs text-[#0A66C2] hover:underline">Read the {item.stage.toLowerCase()} guide →</Link>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">How the LinkedIn Algorithm Works</h2>
                        <p className="mb-4">LinkedIn's algorithm prioritizes posts that generate early engagement. Here is how it evaluates your content:</p>
                        <div className="space-y-2">
                            {[
                                { step: '1', title: 'Initial distribution', desc: 'Your post is shown to a small segment of your network (5–10%). Performance in the first 60–90 minutes determines further reach.' },
                                { step: '2', title: 'Engagement signals', desc: 'Comments > shares > reactions. Longer comments with replies are the strongest signal. The algorithm favors posts that generate conversations.' },
                                { step: '3', title: 'Extended reach', desc: 'If early engagement is strong, LinkedIn shows your post to more people, including second-degree connections. High-performing posts can reach 10–50x your follower count.' },
                                { step: '4', title: 'Content type bonus', desc: 'Text-only posts and document/carousel posts tend to get more reach than link posts. LinkedIn prefers to keep users on the platform.' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-[#F8FAFC] border border-gray-200 rounded-xl p-3">
                                    <span className="w-6 h-6 rounded-md bg-[#0A66C2] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{item.step}</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C]">{item.title}</p>
                                        <p className="text-xs text-[#4B5563]">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Practical Tips for Better Engagement</h2>
                        <ul className="space-y-2">
                            {[
                                'Write the first line as a hook | it must create curiosity before the "see more" truncation',
                                'Use short paragraphs and line breaks | walls of text get skipped on mobile',
                                'End with a question | it invites comments which boost algorithmic reach',
                                'Reply to every comment within 1–2 hours | it doubles the engagement signal',
                                'Post between 8–10 AM in your target timezone | this is when LinkedIn activity peaks',
                                'Avoid external links in the post body | link posts get deprioritized by the algorithm',
                                'Use 3–5 relevant hashtags at the end of your post for discoverability',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4">For ready-to-use post templates, see our <Link href="/viral-post-formulas" className="text-[#0A66C2] hover:underline">Viral LinkedIn Post Formulas</Link> guide.</p>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'How often should I post on LinkedIn?', a: '2–3 times per week is the sweet spot for most professionals. Students can start with 1–2 per month. Creators aiming for growth should target 4–5 times per week. Consistency matters more than frequency.' },
                                { q: 'What content gets the most engagement on LinkedIn?', a: 'Personal stories with professional lessons, contrarian opinions, and actionable how-to posts perform best. Educational content that teaches something specific also does well consistently.' },
                                { q: 'Should I post articles or short posts?', a: 'Short posts (text-only) consistently outperform long articles in reach and engagement. Save articles for deep-dive topics. For most content, a well-structured post of 100–300 words is optimal.' },
                                { q: 'Does content posting affect my LinkedInRank score?', a: 'LinkedInRank primarily scores your static profile (headline, About, experience, skills). However, content activity complements a strong profile by increasing visibility and demonstrating expertise.' },
                                { q: 'What if nobody engages with my posts?', a: 'Start by engaging with others first. Comment on 10+ posts daily for 2 weeks before expecting engagement on your own content. Build relationships through comments, and your own posts will gradually gain traction.' },
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
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Great content needs a great profile foundation</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Make sure your profile converts visitors from your content. Get your free LinkedInRank score.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It's Free</Link>
                    </div>

                    {/* Related Guides */}
                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Viral Post Formulas', href: '/viral-post-formulas' },
                                { label: 'Personal Branding', href: '/linkedin-personal-branding' },
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'For Students', href: '/for-students' },
                                { label: 'For Job Seekers', href: '/for-jobseekers' },
                                { label: 'For Founders', href: '/for-founders' },
                                { label: 'Recruiter Psychology', href: '/recruiter-psychology' },
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
