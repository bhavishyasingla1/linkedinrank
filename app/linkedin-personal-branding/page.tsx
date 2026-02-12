import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'LinkedIn Personal Branding Guide — Build Authority & Visibility | LinkedInRank',
    description: 'Build a powerful personal brand on LinkedIn. Niche clarity, positioning headlines, content frameworks, engagement strategy, and creator checklist. For professionals, creators, and founders.',
    keywords: 'linkedin personal branding, linkedin personal brand, linkedin creator, linkedin thought leadership, linkedin visibility, linkedin authority, linkedin brand building',
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'LinkedIn Personal Branding Guide — Build Authority in Your Niche',
            description: 'Build a personal brand on LinkedIn that attracts opportunities. Niche selection, profile optimization, content strategy, and consistency framework.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-personal-branding',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
            { '@type': 'ListItem', position: 2, name: 'Personal Branding', item: 'https://linkedinrank.com/linkedin-personal-branding' },
        ] },
        { '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'How long does it take to build a personal brand on LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: 'Expect 3–6 months of consistent effort before seeing significant traction. The compound effect kicks in around month 4–5 with regular posting and engagement.' } },
            { '@type': 'Question', name: 'Do I need a niche to build a personal brand?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The narrower your niche, the faster you build authority. "Marketing" is too broad. "B2B SaaS content marketing" is specific enough to own.' } },
            { '@type': 'Question', name: 'How often should I post for personal branding?', acceptedAnswer: { '@type': 'Answer', text: '3–4 times per week is optimal. Consistency matters more than frequency. Even 2 quality posts per week will build momentum over time.' } },
        ] },
    ],
}

export default function LinkedInPersonalBrandingPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader navLinks={[{ href: '/linkedin-optimization-guide', label: 'Full Guide' }]} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Personal Branding</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">LinkedIn Personal Branding Guide for Professionals</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Personal branding on LinkedIn is not about self-promotion. It is about becoming the go-to person in your niche. The professionals who attract the best opportunities are those who consistently demonstrate expertise, share value, and build trust through their profile and content. This guide covers the complete framework.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 1: Niche Clarity</h2>
                        <p className="mb-4">The foundation of every strong personal brand is <strong className="text-[#0A0F1C]">owning one topic</strong>. Not three, not five — one. The tighter your niche, the faster you build authority.</p>
                        <p className="mb-4">Ask yourself: &ldquo;When someone sees my name, what one thing should they immediately associate with me?&rdquo;</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                                <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2">Too broad</p>
                                <p className="text-xs text-[#4B5563]">&ldquo;I write about marketing, leadership, AI, career advice, and startups&rdquo;</p>
                            </div>
                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-2">Focused</p>
                                <p className="text-xs text-[#4B5563]">&ldquo;I help B2B SaaS companies grow through content marketing&rdquo;</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 2: Position Your Profile</h2>
                        <p className="mb-4">Your profile is your landing page. Every element should reinforce your niche positioning.</p>
                        <div className="space-y-3">
                            {[
                                { element: 'Headline', tip: 'Use a positioning statement: "Helping [Audience] with [Outcome]." Example: "Helping developers build better careers through LinkedIn."', link: '/linkedin-headline-guide' },
                                { element: 'About section', tip: 'Tell your story through the lens of your niche. What problem do you solve? What is your unique angle? Include social proof.', link: '/linkedin-about-guide' },
                                { element: 'Featured section', tip: 'Showcase your best content, case studies, or portfolio. This is visual proof of your expertise.', link: '/linkedin-optimization-guide' },
                                { element: 'Banner image', tip: 'Use a custom banner that reinforces your positioning — your tagline, website, or a visual representation of your niche.', link: '/linkedin-profile-photo-guide' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.element}</p>
                                    <p className="text-sm text-[#4B5563] mb-1">{item.tip}</p>
                                    <Link href={item.link} className="text-xs text-[#0A66C2] hover:underline">Learn more →</Link>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 3: Content Framework</h2>
                        <p className="mb-4">Content is how you build visibility. Rotate between four content types to keep your audience engaged while establishing authority:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { type: 'Education', desc: 'Teach something actionable. Frameworks, how-tos, checklists.', example: '"5 headline formulas that work for job seekers"' },
                                { type: 'Storytelling', desc: 'Share personal experiences with professional lessons.', example: '"I got rejected from 50 jobs. Then I changed one thing."' },
                                { type: 'Opinions', desc: 'Take a stand on an industry topic. Contrarian views perform well.', example: '"Unpopular opinion: LinkedIn Premium is not worth it for most people."' },
                                { type: 'Frameworks', desc: 'Share reusable mental models and templates.', example: '"My 3-step process for writing LinkedIn headlines"' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.type}</p>
                                    <p className="text-xs text-[#4B5563] mb-2">{item.desc}</p>
                                    <p className="text-xs text-[#0A66C2] italic">{item.example}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4">For ready-to-use post templates, see our <Link href="/viral-post-formulas" className="text-[#0A66C2] hover:underline">Viral LinkedIn Post Formulas</Link> guide.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 4: Hook Writing</h2>
                        <p className="mb-4">The first two lines of your post determine whether anyone reads the rest. LinkedIn truncates posts early — your hook must create curiosity instantly.</p>
                        <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                            <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Hooks that work</p>
                            <div className="space-y-2">
                                {[
                                    'Open with a surprising number or result',
                                    'Start with a contrarian statement',
                                    'Ask a question the reader wants answered',
                                    'Use a personal moment that creates empathy',
                                    'Promise a specific, useful takeaway',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm">
                                        <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 5: Engagement Strategy</h2>
                        <p className="mb-4">Posting is only half the equation. Engagement amplifies your reach and builds relationships:</p>
                        <ul className="space-y-2">
                            {[
                                'Reply to every comment on your posts — this boosts algorithmic reach and builds loyalty',
                                'Comment on 5–10 posts daily from people in your niche — become a familiar name',
                                'Start conversations through DMs — share relevant resources, ask thoughtful questions',
                                'Engage with creators slightly ahead of you — their audience becomes your audience',
                                'Be consistent — showing up regularly matters more than occasional viral posts',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="w-5 h-5 rounded-md bg-[#0A66C2] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Personal Brand Builder Checklist</h2>
                        <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                            <div className="space-y-2">
                                {[
                                    'Clear niche — one topic you own',
                                    'Positioning headline that communicates your value',
                                    'About section tells your story through your niche',
                                    'Featured section showcases best work',
                                    'Consistent content (2–3 posts/week)',
                                    'Strong hooks on every post',
                                    'Active engagement (comments, DMs, replies)',
                                    'Visual consistency (photo, banner, tone)',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-[#4B5563]">
                                        <span className="text-emerald-500 shrink-0 mt-0.5">&#9744;</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'How long does it take to build a personal brand on LinkedIn?', a: 'Most people see meaningful results (increased profile views, inbound messages, follower growth) within 3–6 months of consistent posting and engagement. The compound effect is real — month 1 is the hardest.' },
                                { q: 'Do I need to post every day?', a: 'No. 2–3 quality posts per week is the sweet spot. Consistency matters more than frequency. It is better to post 3 times a week for a year than daily for a month.' },
                                { q: 'What if my niche is too narrow?', a: 'Narrow niches actually grow faster because you face less competition and your content is more relevant to your audience. You can always expand later once you have established authority.' },
                                { q: 'Does personal branding help with job search?', a: 'Absolutely. A strong personal brand means recruiters come to you instead of you chasing them. It also makes you a more attractive candidate because you have public proof of your expertise.' },
                                { q: 'How does LinkedInRank relate to personal branding?', a: 'Your profile is the foundation of your personal brand. LinkedInRank scores the profile elements that make your brand credible: headline positioning, About section quality, experience depth, and overall completeness.' },
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
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Your brand starts with a strong profile</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Get your free LinkedInRank score and see how your profile foundation measures up.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Check Your Profile Score — It&apos;s Free</Link>
                    </div>

                    {/* Related Guides */}
                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Viral Post Formulas', href: '/viral-post-formulas' },
                                { label: 'Content Strategy', href: '/linkedin-content-strategy' },
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'About Section Guide', href: '/linkedin-about-guide' },
                                { label: 'Top 1% Profiles', href: '/top-1-percent-profiles' },
                                { label: 'For Founders', href: '/for-founders' },
                                { label: 'Profile Photo Guide', href: '/linkedin-profile-photo-guide' },
                                { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
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
                        <Link href="/viral-post-formulas" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Viral Post Formulas</Link>
                        <Link href="/linkedin-optimization-guide" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Optimization Guide</Link>
                        <Link href="/faq" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">FAQ</Link>
                    </nav>
                </div>
            </footer>
        </main>
    )
}
