import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'LinkedIn Profile Tips for Founders & Entrepreneurs | Free Guide (2026)',
    description: 'Position your LinkedIn profile for credibility, fundraising, and talent acquisition in 2026. Data-backed strategies for founder headlines, About narratives, and experience framing. Free scoring with LinkedInRank.',
    keywords: 'linkedin for founders 2026, founder linkedin profile, entrepreneur linkedin tips, linkedinrank founder guide, startup linkedin profile, ceo linkedin profile tips, founder personal branding linkedin',
    alternates: { canonical: 'https://linkedinrank.com/for-founders' },
    openGraph: {
        title: 'LinkedIn Profile Tips for Founders & Entrepreneurs',
        description: 'Position your LinkedIn for credibility, fundraising, and talent acquisition. Free scoring with LinkedInRank.',
        url: 'https://linkedinrank.com/for-founders',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'LinkedIn Profile Optimization for Founders & Entrepreneurs',
            description: 'Position your founder profile for credibility, hiring, fundraising, and thought leadership. Headline formulas, narrative structure, content strategy, and traction showcasing.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/for-founders',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
            { '@type': 'ListItem', position: 2, name: 'For Founders', item: 'https://linkedinrank.com/for-founders' },
        ] },
        { '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'Should founders use their personal profile or company page?', acceptedAnswer: { '@type': 'Answer', text: 'Both, but your personal profile is more important. LinkedIn algorithm favors personal content over company page posts. Most founder-led brands grow through personal presence.' } },
            { '@type': 'Question', name: 'How should founders handle the About section?', acceptedAnswer: { '@type': 'Answer', text: 'Tell your founding story: what problem you noticed, why you decided to solve it, and what traction you have achieved. Include metrics. End with what you are looking for.' } },
            { '@type': 'Question', name: 'How often should founders post on LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: '3–4 times per week is optimal for growth. Consistency matters more than frequency. Mix between company updates, industry insights, and personal founder stories.' } },
            { '@type': 'Question', name: 'Does LinkedInRank work for founder profiles?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. LinkedInRank recognizes founder profiles and adjusts scoring to evaluate positioning clarity, domain credibility, and narrative strength.' } },
            { '@type': 'Question', name: 'Should I mention funding on my profile?', acceptedAnswer: { '@type': 'Answer', text: 'If you have notable funding, yes | it adds credibility. If bootstrapped, lead with traction metrics instead: users, revenue, customers served.' } },
            { '@type': 'Question', name: 'How do I attract investors through LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: 'Build in public consistently. Share traction updates, insights, and lessons. Your profile should make it easy for investors to understand your company in 10 seconds.' } },
        ] },
    ],
}

export default function ForFoundersPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <article className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">For Founders</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">How to Position Your LinkedIn Profile as a Founder</h1>
                <p className="text-[15px] text-[#4B5563] mb-10 leading-relaxed max-w-xl">
                    As a founder, your LinkedIn profile is a trust signal for investors, potential hires, partners, and customers. Research from First Round Capital shows that <strong className="text-[#0A0F1C]">over 80% of VCs review founder LinkedIn profiles before taking meetings</strong>. Here is what matters most.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    <section aria-labelledby="f-headline">
                        <h2 id="f-headline" className="text-xl font-bold text-[#0A0F1C] mb-3">1. Your headline is your positioning statement</h2>
                        <p className="mb-4">Investors and potential hires see your headline before anything else. "CEO & Founder" tells them nothing. A strong founder headline communicates what you are building, for whom, and your domain credibility | all in under 120 characters.</p>
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-3">
                            <div>
                                <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Generic</p>
                                <p className="text-[#6B7280] line-through opacity-70">"CEO & Founder"</p>
                            </div>
                            <div className="border-t border-gray-100 pt-3">
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1">Positioned</p>
                                <p className="text-[#0A0F1C] font-medium">"Founder at Acme | Building AI-powered supply chain tools for mid-market logistics"</p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-[#6B7280]">Include your company name, what it does, and who it serves. This helps with both investor searches and inbound talent.</p>
                    </section>

                    <section aria-labelledby="f-about">
                        <h2 id="f-about" className="text-xl font-bold text-[#0A0F1C] mb-3">2. About section: your founder narrative</h2>
                        <p className="mb-3">Your About section should tell the story investors and hires want to hear. Structure it around these elements:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            {[
                                { label: 'The Problem', desc: 'What pain point did you discover?' },
                                { label: 'The Insight', desc: 'Why are you uniquely positioned to solve it?' },
                                { label: 'The Company', desc: 'What does your startup actually do?' },
                                { label: 'The Traction', desc: 'What milestones signal you are on the right track?' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.label}</p>
                                    <p className="text-sm text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p>Write in first person. Investors want to understand founder-market fit. Potential hires want to understand the mission. Keep it under 300 words but make every sentence earn its place.</p>
                    </section>

                    <section aria-labelledby="f-experience">
                        <h2 id="f-experience" className="text-xl font-bold text-[#0A0F1C] mb-3">3. Experience: show the trajectory to founding</h2>
                        <p className="mb-4">Your experience section should show a logical path to founding your company. Previous roles, relevant industry experience, and domain expertise all build credibility. A clear trajectory answers the investor question: "Why this person for this problem?"</p>
                        <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-5">
                            <p className="text-sm font-bold text-[#0A66C2] mb-2">For your current company entry</p>
                            <p className="text-sm text-[#4B5563]">Describe what the company does, key milestones achieved (revenue, users, funding, partnerships), and your specific role in building it. This is not a job description | it is a company pitch combined with your leadership contribution.</p>
                        </div>
                    </section>

                    <section aria-labelledby="f-skills">
                        <h2 id="f-skills" className="text-xl font-bold text-[#0A0F1C] mb-3">4. Skills that signal domain expertise</h2>
                        <p className="mb-3">List skills that demonstrate you deeply understand the space you are building in. A fintech founder should have skills like "Payment Processing," "Financial Modeling," and "Regulatory Compliance" | not generic terms like "Leadership" or "Strategy."</p>
                        <p>Pin the 3 skills most relevant to your company's domain. This signals to both algorithms and humans that you are a domain expert, not just a generalist executive.</p>
                    </section>

                    <section aria-labelledby="f-network">
                        <h2 id="f-network" className="text-xl font-bold text-[#0A0F1C] mb-3">5. Leverage LinkedIn for fundraising and hiring</h2>
                        <p className="mb-3">Your profile is often the first touchpoint for cold outreach | to investors, advisors, and candidates. A profile that clearly communicates what you are building, your background, and your traction makes warm intros more effective and cold outreach more credible.</p>
                        <p>Consider adding certifications, publications, or speaking engagements that demonstrate thought leadership in your vertical.</p>
                    </section>

                    <section aria-labelledby="f-adapt">
                        <h2 id="f-adapt" className="text-xl font-bold text-[#0A0F1C] mb-3">6. LinkedInRank adapts for founders</h2>
                        <p>Our scoring engine recognizes founder profiles and adjusts evaluation accordingly. We look for clear positioning, domain credibility, and a compelling narrative rather than traditional career progression signals. Founders with strong headlines, clear narratives, and relevant skills consistently score in the Gold and Platinum tiers.</p>
                    </section>

                    <section aria-labelledby="f-content">
                        <h2 id="f-content" className="text-xl font-bold text-[#0A0F1C] mb-3">7. Build in public with LinkedIn content</h2>
                        <p className="mb-3">Content is how founders build trust at scale. Unlike paid advertising, LinkedIn content compounds | every post builds your reputation and your company&apos;s brand simultaneously. The most effective founder content falls into four categories:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { type: 'Behind the scenes', desc: 'Share wins, failures, and real decisions. Authenticity builds trust faster than polished marketing.' },
                                { type: 'Industry insights', desc: 'Share your perspective on trends, data, or news in your space. Positions you as a domain expert.' },
                                { type: 'Customer stories', desc: 'Showcase how your product solves real problems. Social proof without feeling like an ad.' },
                                { type: 'Lessons learned', desc: 'Share mistakes and what they taught you. High engagement because founders relate to the struggle.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.type}</p>
                                    <p className="text-xs text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-3 text-sm">For ready-to-use templates, see our <Link href="/viral-post-formulas" className="text-[#0A66C2] hover:underline">Viral Post Formulas</Link> guide. For a complete strategy, read our <Link href="/linkedin-content-strategy" className="text-[#0A66C2] hover:underline">Content Strategy Guide</Link>.</p>
                    </section>

                    <section aria-labelledby="f-headline-examples">
                        <h2 id="f-headline-examples" className="text-xl font-bold text-[#0A0F1C] mb-3">8. Founder headline examples</h2>
                        <p className="mb-4">Your headline should position you as the person solving a specific problem, not just &ldquo;Founder.&rdquo; Here are examples by company stage:</p>
                        <div className="space-y-2">
                            {[
                                'CEO @ [Company] | Helping SMBs automate accounting | Serving 500+ businesses',
                                'Founder @ [Company] | Building the future of remote hiring | YC W24',
                                'Co-Founder & CTO @ [Company] | AI-Powered Customer Support | Ex-Google',
                                'Founder | Turning LinkedIn profiles into opportunities | 10K+ profiles scored',
                                'Serial Entrepreneur | 3 exits | Now building in HealthTech | Angel investor',
                                'Founder @ [Company] | D2C wellness brand | $2M ARR | Forbes 30 Under 30',
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium">{item}</div>
                            ))}
                        </div>
                        <p className="mt-3 text-sm">For more headline formulas, read our <Link href="/linkedin-headline-guide" className="text-[#0A66C2] hover:underline">Headline Writing Guide</Link>.</p>
                    </section>

                    <section aria-labelledby="f-faq">
                        <h2 id="f-faq" className="text-xl font-bold text-[#0A0F1C] mb-3">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'Should founders use their personal profile or company page?', a: 'Both, but your personal profile is more important. LinkedIn algorithm favors personal content over company page posts. Most founder-led brands grow through the founder personal presence. Use the company page for official updates and job posts.' },
                                { q: 'How should founders handle the About section?', a: 'Tell your founding story: what problem you noticed, why you decided to solve it, and what traction you have achieved. Include metrics (users, revenue, growth). End with what you are looking for (partners, hires, investors, customers).' },
                                { q: 'How often should founders post on LinkedIn?', a: '3–4 times per week is optimal for growth. Consistency matters more than frequency. Mix between company updates, industry insights, and personal founder stories.' },
                                { q: 'Does LinkedInRank work for founder profiles?', a: 'Yes. LinkedInRank recognizes founder profiles and adjusts scoring to evaluate positioning clarity, domain credibility, and narrative strength rather than traditional career progression signals.' },
                                { q: 'Should I mention funding on my profile?', a: 'If you have notable funding (YC, known investors, significant rounds), yes | it adds credibility. If you are bootstrapped, lead with traction metrics instead: users, revenue, customers served.' },
                                { q: 'How do I attract investors through LinkedIn?', a: 'Build in public consistently. Share traction updates, insights, and lessons. Investors follow founders who demonstrate clear thinking and market expertise. Your profile should make it easy for them to understand your company in 10 seconds.' },
                            ].map((item, i) => (
                                <div key={i} className="border-b border-gray-100 pb-4">
                                    <h3 className="text-sm font-bold text-[#0A0F1C] mb-1">{item.q}</h3>
                                    <p className="text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center mt-4">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">See how your founder profile reads</h2>
                        <p className="text-sm text-[#4B5563] mb-4">Upload your LinkedIn PDF and get a free score with recommendations tailored to founder profiles.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It's Free</Link>
                    </div>

                    <div className="pt-8 border-t border-gray-100 mt-6">
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/for-students" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">For Students</Link>
                            <Link href="/for-jobseekers" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">For Job Seekers</Link>
                            <Link href="/linkedin-personal-branding" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Personal Branding</Link>
                            <Link href="/linkedin-headline-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Headline Guide</Link>
                            <Link href="/linkedin-content-strategy" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Content Strategy</Link>
                            <Link href="/viral-post-formulas" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Viral Post Formulas</Link>
                            <Link href="/top-1-percent-profiles" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Top 1% Profiles</Link>
                            <Link href="/linkedin-optimization-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Full Optimization Guide</Link>
                        </div>
                    </div>
                </div>
            </article>

            <SiteFooter />
        </main>
    )
}
