import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'

export const metadata: Metadata = {
    title: 'Viral LinkedIn Post Formulas — 5 Templates That Actually Work (2026)',
    description: '5 copy-paste LinkedIn post formulas that drive engagement: Hard Truth, Mini-Story, Breakdown, Steal-This, and Identity posts. Includes hook frameworks and real examples.',
    keywords: 'viral linkedin post 2026, linkedin post formula, linkedin content strategy, linkedin post template, linkedin engagement tips, how to go viral on linkedin, linkedin hook examples, linkedin viral content',
    alternates: { canonical: 'https://linkedinrank.com/viral-post-formulas' },
    openGraph: {
        title: 'Viral LinkedIn Post Formulas — 5 Templates That Actually Work',
        description: '5 proven post formulas with real examples and hook frameworks that drive LinkedIn engagement.',
        url: 'https://linkedinrank.com/viral-post-formulas',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: '5 Viral LinkedIn Post Formulas That Actually Work',
            description: 'Learn 5 proven LinkedIn post formulas that drive engagement. Includes templates for hard truth posts, mini-stories, breakdowns, steal-this posts, and identity posts.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/viral-post-formulas',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        {
            '@type': 'BreadcrumbList', itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
                { '@type': 'ListItem', position: 2, name: 'Viral Post Formulas', item: 'https://linkedinrank.com/viral-post-formulas' },
            ]
        },
        {
            '@type': 'FAQPage', mainEntity: [
                { '@type': 'Question', name: 'How many followers do I need to go viral on LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: 'Follower count matters less than content quality on LinkedIn. Posts from accounts with 500 connections can reach 50K+ impressions if the content resonates.' } },
                { '@type': 'Question', name: 'What is the best time to post on LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: 'Tuesday through Thursday, 8–10 AM in your target audience timezone. However, consistency matters more than timing.' } },
                { '@type': 'Question', name: 'Should I use hashtags on LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: 'Use 3–5 relevant hashtags at the end of your post. Do not over-hashtag. LinkedIn hashtags help with discoverability but are less important than the content itself.' } },
                { '@type': 'Question', name: 'What if I have nothing to post about?', acceptedAnswer: { '@type': 'Answer', text: 'Share learnings from your work, summarize articles you read, comment on industry trends, or document your career journey. Everyone has insights worth sharing.' } },
            ]
        },
    ],
}

export default function ViralPostFormulasPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Content Guide</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">5 Viral LinkedIn Post Formulas That Actually Work</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Viral on LinkedIn is not entertainment virality. It is <strong className="text-[#0A0F1C]">relatable + useful + identity-driven</strong>. People share posts that make them look smart, relatable, or insightful. These five formulas are repeatable frameworks used by the most successful LinkedIn creators. Each includes a template you can adapt immediately.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    {/* Formula 1 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white text-sm font-bold flex items-center justify-center shrink-0">1</span>
                            <h2 className="text-2xl font-bold text-[#0A0F1C]">The &ldquo;Hard Truth&rdquo; Formula</h2>
                        </div>
                        <p className="mb-4">This formula triggers curiosity by challenging a common belief. It works because people stop scrolling when they see an opinion that contradicts what they assume is true.</p>
                        <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5 mb-4">
                            <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Structure</p>
                            <ol className="space-y-2 text-sm">
                                {['Bold contrarian hook', 'Reality check with evidence', 'The real lesson', 'Soft, relatable takeaway'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="w-5 h-5 rounded-md bg-[#0A66C2] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                            <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-wider mb-3">Template</p>
                            <div className="text-sm text-[#0A0F1C] space-y-2 italic">
                                <p>Unpopular opinion:</p>
                                <p>[Industry belief] is overrated.</p>
                                <p>I have seen people with [X] fail because of [Y].</p>
                                <p>What actually works is:</p>
                                <p>&#8226; A<br />&#8226; B<br />&#8226; C</p>
                                <p>Learned this the hard way.</p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm"><strong className="text-[#0A0F1C]">Why it works:</strong> Triggers curiosity, challenges beliefs, feels authentic.</p>
                    </section>

                    {/* Formula 2 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white text-sm font-bold flex items-center justify-center shrink-0">2</span>
                            <h2 className="text-2xl font-bold text-[#0A0F1C]">Mini-Story → Lesson</h2>
                        </div>
                        <p className="mb-4">Stories are the most engaging content format on LinkedIn. This formula pairs a short personal experience with a clear professional takeaway.</p>
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                            <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-wider mb-3">Template</p>
                            <div className="text-sm text-[#0A0F1C] space-y-2 italic">
                                <p>Last year I applied to 50+ jobs.</p>
                                <p>Got 3 replies.</p>
                                <p>Then one recruiter told me something that changed everything:</p>
                                <p>&ldquo;[Insight].&rdquo;</p>
                                <p>I fixed my profile and got 5 calls in 2 weeks.</p>
                                <p>Sometimes it is not your skills. It is how you present them.</p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm"><strong className="text-[#0A0F1C]">Why it works:</strong> Story creates an emotional hook. Lesson delivers value. Easy to share and relate to.</p>
                    </section>

                    {/* Formula 3 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white text-sm font-bold flex items-center justify-center shrink-0">3</span>
                            <h2 className="text-2xl font-bold text-[#0A0F1C]">The Breakdown Post</h2>
                        </div>
                        <p className="mb-4">Breakdown posts share tactical, actionable advice in a skimmable format. They perform well because readers can quickly extract value without reading a wall of text.</p>
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                            <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-wider mb-3">Template</p>
                            <div className="text-sm text-[#0A0F1C] space-y-2 italic">
                                <p>My LinkedIn profile brought me [result].</p>
                                <p>Here is what I optimized:</p>
                                <p>1. Headline → [specific tip]<br />2. About → [specific tip]<br />3. Experience → [specific tip]</p>
                                <p>Most people ignore these.</p>
                                <p>Which one are you fixing first?</p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm"><strong className="text-[#0A0F1C]">Why it works:</strong> Tactical, skimmable, and ends with a question that drives comments.</p>
                    </section>

                    {/* Formula 4 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white text-sm font-bold flex items-center justify-center shrink-0">4</span>
                            <h2 className="text-2xl font-bold text-[#0A0F1C]">The &ldquo;Steal This&rdquo; Post</h2>
                        </div>
                        <p className="mb-4">These posts offer a ready-to-use framework or template that readers can immediately apply. They are highly saveable and build creator authority.</p>
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                            <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-wider mb-3">Template</p>
                            <div className="text-sm text-[#0A0F1C] space-y-2 italic">
                                <p>Steal my LinkedIn headline formula:</p>
                                <p>I help [who] achieve [result] using [method].</p>
                                <p>Example: &ldquo;I help SaaS founders get leads using LinkedIn content.&rdquo;</p>
                                <p>Simple &gt; clever.</p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm"><strong className="text-[#0A0F1C]">Why it works:</strong> Highly saveable, immediately practical, positions you as an authority.</p>
                    </section>

                    {/* Formula 5 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white text-sm font-bold flex items-center justify-center shrink-0">5</span>
                            <h2 className="text-2xl font-bold text-[#0A0F1C]">The Identity Post</h2>
                        </div>
                        <p className="mb-4">People share posts that match their self-image. Identity posts are emotionally resonant and get the highest share rates on LinkedIn.</p>
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                            <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-wider mb-3">Template</p>
                            <div className="text-sm text-[#0A0F1C] space-y-2 italic">
                                <p>You are not behind.</p>
                                <p>You are just early in your career.</p>
                                <p>Everyone you admire started with:<br />&#8226; zero connections<br />&#8226; weak profiles<br />&#8226; self-doubt</p>
                                <p>Progress &gt; perfection.</p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm"><strong className="text-[#0A0F1C]">Why it works:</strong> Emotional, deeply relatable, highest share rate among all formats.</p>
                    </section>

                    {/* Hook Frameworks */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Hook Frameworks That Stop the Scroll</h2>
                        <p className="mb-4">Your first two lines determine whether anyone reads the rest. LinkedIn truncates posts after ~210 characters. These hook frameworks consistently generate high engagement:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                'Nobody tells students this about LinkedIn...',
                                'I reviewed 100 LinkedIn profiles. Here is the pattern.',
                                'If your LinkedIn is not working, read this.',
                                'Most job seekers are doing this wrong.',
                                'I got rejected from 50 jobs. Then I changed one thing.',
                                'Stop writing your LinkedIn like a resume.',
                                'Your LinkedIn headline is costing you interviews.',
                                'The biggest LinkedIn mistake I see professionals make:',
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium">{item}</div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Content Strategy Quick Tips</h2>
                        <p className="mb-4">You do not need to post daily. Consistency matters more than frequency. Here is a practical cadence:</p>
                        <ul className="space-y-2">
                            {[
                                '2–3 posts per week is the sweet spot for growth',
                                'Rotate between education, storytelling, opinions, and frameworks',
                                'Reply to every comment on your posts (boosts algorithm reach)',
                                'Comment on 5–10 posts daily in your niche before posting',
                                'Write hooks first, then fill in the body',
                                'Use line breaks generously | no walls of text',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4">For a complete content playbook, read our <Link href="/linkedin-content-strategy" className="text-[#0A66C2] hover:underline">LinkedIn Content Strategy Guide</Link>. To understand how content impacts your profile strength, see our <Link href="/linkedin-personal-branding" className="text-[#0A66C2] hover:underline">Personal Branding Guide</Link>.</p>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'How many followers do I need to go viral on LinkedIn?', a: 'Follower count matters less than content quality on LinkedIn. Posts from accounts with 500 connections can reach 50K+ impressions if the content resonates. Focus on writing strong hooks and valuable content.' },
                                { q: 'What is the best time to post on LinkedIn?', a: 'Tuesday through Thursday, 8–10 AM in your target audience timezone. However, consistency matters more than timing. Pick a schedule and stick to it.' },
                                { q: 'Should I use hashtags on LinkedIn?', a: 'Use 3–5 relevant hashtags at the end of your post. Do not over-hashtag. LinkedIn hashtags help with discoverability but are less important than the content itself.' },
                                { q: 'How does posting help my LinkedIn profile score?', a: 'Active posting signals engagement to recruiters and strengthens your professional presence. While LinkedInRank scores your static profile, a strong content presence complements a high profile score.' },
                                { q: 'What if I have nothing to post about?', a: 'Share learnings from your work, summarize articles you read, comment on industry trends, or document your career journey. Everyone has insights worth sharing | the key is specificity.' },
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
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Strong content starts with a strong profile</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Before you post, make sure your profile converts visitors into followers. Get your free LinkedInRank score.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Check Your Profile Score | It&apos;s Free</Link>
                    </div>

                    {/* Related Guides */}
                    <RelatedPages currentSlug="viral-post-formulas" />
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
