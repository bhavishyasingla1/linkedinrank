import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CopyHeadlineButton from '@/components/CopyHeadlineButton'

export const metadata: Metadata = {
    title: 'LinkedIn Headlines for Designers — 25+ Copy-Paste Examples (2026) | LinkedInRank',
    description: 'Copy professional LinkedIn headline templates for UX, UI, product, and graphic designers. Short, portfolio-focused, and recruiter-friendly examples you can paste now.',
    keywords: 'linkedin headline designer, linkedin headline ux designer 2026, linkedin headline ui designer, linkedin headline product designer, designer linkedin profile, linkedin headline graphic designer, best linkedin headline designer',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-designers' },
    openGraph: {
        title: 'LinkedIn Headlines for Designers — 25+ Copy-Paste Examples',
        description: 'Copy professional LinkedIn headline templates for UX, UI, product, and graphic designers. Paste-ready for recruiters.',
        url: 'https://linkedinrank.com/linkedin-headline-designers',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'Best LinkedIn Headlines for Designers | 25+ Examples',
            description: 'LinkedIn headline examples for UX designers, UI designers, product designers, graphic designers, and design leaders. Proven formulas that attract recruiters and clients.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-headline-designers',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        {
            '@type': 'BreadcrumbList', itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
                { '@type': 'ListItem', position: 2, name: 'Headline Guide', item: 'https://linkedinrank.com/linkedin-headline-guide' },
                { '@type': 'ListItem', position: 3, name: 'For Designers', item: 'https://linkedinrank.com/linkedin-headline-designers' },
            ]
        },
        {
            '@type': 'FAQPage', mainEntity: [
                { '@type': 'Question', name: 'Should I say "UX Designer" or "Product Designer"?', acceptedAnswer: { '@type': 'Answer', text: 'Use the title that matches your target role. "Product Designer" is more common in tech companies, while "UX Designer" is broader. Check job postings at your target companies.' } },
                { '@type': 'Question', name: 'Should I link my portfolio in my headline?', acceptedAnswer: { '@type': 'Answer', text: 'No | headlines should be text-optimized for search. Put portfolio links in your Featured section, About section, or contact info instead.' } },
                { '@type': 'Question', name: 'How important is the Featured section for designers?', acceptedAnswer: { '@type': 'Answer', text: 'Critical. Unlike other professions, designers can visually showcase their work. Add 3–5 case studies, top projects, or portfolio links.' } },
                { '@type': 'Question', name: 'Can LinkedInRank evaluate designer profiles?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. LinkedInRank scores headline clarity, About section quality, experience depth, and skills relevance. Designers benefit especially from headline and completeness scoring.' } },
            ]
        },
    ],
}

export default function HeadlineDesignersPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Role-Specific Headlines</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">Best LinkedIn Headlines for Designers</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Design is a visual field, but your LinkedIn headline is pure text. The strongest designer headlines communicate your specialization, tools, and the type of problems you solve. &ldquo;Designer&rdquo; alone is too broad | recruiters search for specific design roles and tools. Here are <strong className="text-[#0A0F1C]">25+ proven examples</strong> by design discipline.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The Designer Headline Formula</h2>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6 mb-4">
                            <p className="text-lg font-bold text-[#0A0F1C] mb-4 text-center">[Design Role] | [Specialization or Industry] | [Key Tools or Approach]</p>
                            <p className="text-sm text-[#4B5563] text-center">Show what you design, for whom, and how.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">25+ Designer Headlines by Discipline</h2>
                        {[
                            {
                                spec: 'UX Design', examples: [
                                    'UX Designer | Conversion-Focused Design for SaaS | Figma & Framer',
                                    'Senior UX Designer | Research-Driven Design | HealthTech & FinTech',
                                    'UX Designer | User Research & Interaction Design | Enterprise Products',
                                    'UX/UI Designer | Mobile-First Design | E-Commerce & Marketplaces',
                                    'UX Researcher | Usability Testing & Journey Mapping | B2B SaaS',
                                ]
                            },
                            {
                                spec: 'Product Design', examples: [
                                    'Product Designer | End-to-End Design | Figma & Prototyping | Series B Startup',
                                    'Senior Product Designer | Design Systems & Component Libraries | FinTech',
                                    'Product Designer | 0→1 Product Design | Consumer Apps',
                                    'Lead Product Designer | Cross-Platform Design | Web & Mobile',
                                    'Product Designer | Accessibility & Inclusive Design | Enterprise',
                                ]
                            },
                            {
                                spec: 'UI & Visual Design', examples: [
                                    'UI Designer | Design Systems & Visual Identity | Figma & Sketch',
                                    'Visual Designer | Brand & Marketing Design | SaaS & Startups',
                                    'UI Designer | Motion Design & Micro-Interactions | Consumer Tech',
                                    'Interface Designer | Dashboard & Data Visualization | Analytics',
                                ]
                            },
                            {
                                spec: 'Graphic & Brand Design', examples: [
                                    'Graphic Designer | Brand Identity & Print | Adobe Creative Suite',
                                    'Brand Designer | Visual Identity & Packaging | FMCG & D2C',
                                    'Creative Director | Brand Strategy & Visual Design | Agency-Side',
                                    'Graphic Designer | Social Media & Campaign Design | Fashion',
                                ]
                            },
                            {
                                spec: 'Design Leadership', examples: [
                                    'Head of Design | Building Design Teams | B2B SaaS | Ex-Spotify',
                                    'VP of Design | Product & Brand Design | FinTech Scale-Up',
                                    'Design Manager | Leading 8+ Designers | Enterprise Products',
                                    'Director of UX | Design Strategy & Operations | Healthcare',
                                ]
                            },
                            {
                                spec: 'Students & Entry Level', examples: [
                                    'UX Design Student | HCI @ Carnegie Mellon | Figma & User Research',
                                    'Junior Product Designer | Bootcamp Graduate | Portfolio: [link]',
                                    'Aspiring UX Designer | Visual Communication Major | Figma & Sketch',
                                    'Design Intern @ Airbnb | Interaction Design | Stanford HCI 2026',
                                ]
                            },
                        ].map((section, i) => (
                            <div key={i} className="mb-10">
                                <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">{section.spec}</h3>
                                <div className="space-y-2">
                                    {section.examples.map((ex, j) => (
                                        <div key={j} className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-100 rounded-lg p-3.5 hover:border-[#DBEAFE] transition-colors">
                                            <p className="flex-1 text-sm text-[#0A0F1C] font-medium">{ex}</p>
                                            <CopyHeadlineButton text={ex} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Design Tools Recruiters Search For</h2>
                        <div className="flex flex-wrap gap-2">
                            {['Figma', 'Sketch', 'Adobe XD', 'Framer', 'InVision', 'Principle', 'After Effects', 'Illustrator', 'Photoshop', 'Webflow', 'Miro', 'FigJam', 'Zeplin', 'Abstract', 'Storybook', 'Design Systems', 'Prototyping', 'User Research', 'Usability Testing', 'Interaction Design', 'Motion Design', 'Accessibility'].map((tool, i) => (
                                <span key={i} className="text-xs bg-[#F8FAFC] border border-gray-200 px-2.5 py-1 rounded-md text-[#0A0F1C] font-medium">{tool}</span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Designer Profile Tips</h2>
                        <ul className="space-y-2">
                            {[
                                'Use the Featured section for portfolio links | this is critical for designers',
                                'Include your design process in the About section, not just your tools',
                                'Mention the industries you have designed for | recruiters filter by domain',
                                'Add metrics where possible: "Redesigned checkout flow, increasing conversion 25%"',
                                'Include a custom banner that showcases your design aesthetic',
                                'Link to case studies, Dribbble, Behance, or your personal portfolio site',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'Should I say "UX Designer" or "Product Designer"?', a: 'Use the title that matches your target role. Currently, "Product Designer" is more common in tech companies, while "UX Designer" is broader. Check job postings at your target companies to see which title they use.' },
                                { q: 'Should I link my portfolio in my headline?', a: 'No | headlines should be text-optimized for search. Put portfolio links in your Featured section, About section, or contact info instead.' },
                                { q: 'How important is the Featured section for designers?', a: 'Critical. Unlike other professions, designers can visually showcase their work. Add 3–5 case studies, top projects, or portfolio links. This is often what differentiates designer profiles.' },
                                { q: 'Can LinkedInRank evaluate designer profiles?', a: 'Yes. LinkedInRank scores headline clarity, About section quality, experience depth, and skills relevance. Designers benefit especially from the headline and completeness scoring.' },
                            ].map((item, i) => (
                                <div key={i} className="border-b border-gray-100 pb-4">
                                    <h3 className="text-sm font-bold text-[#0A0F1C] mb-1">{item.q}</h3>
                                    <p className="text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Get your designer profile scored</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF for a free score with headline analysis and improvement recommendations.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It's Free</Link>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'For Software Engineers', href: '/linkedin-headline-software-engineers' },
                                { label: 'For MBA Students', href: '/linkedin-headline-mba' },
                                { label: 'For Marketers', href: '/linkedin-headline-marketers' },
                                { label: 'Personal Branding', href: '/linkedin-personal-branding' },
                                { label: 'Profile Photo Guide', href: '/linkedin-profile-photo-guide' },
                                { label: 'Keywords Guide', href: '/linkedin-keywords-guide' },
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
