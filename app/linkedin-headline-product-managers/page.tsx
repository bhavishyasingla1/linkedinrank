import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'

export const metadata: Metadata = {
    title: 'Best LinkedIn Headlines for Product Managers | 25+ Examples (2026)',
    description: 'LinkedIn headline examples for product managers, PMs, TPMs, and product leaders in 2026. Formulas that attract recruiters and showcase impact. Free scoring with LinkedInRank.',
    keywords: 'linkedin headline product manager 2026, linkedin headline PM, best linkedin headline for product manager, product manager linkedin profile, TPM linkedin headline, best pm linkedin headline',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-product-managers' },
    openGraph: {
        title: 'Best LinkedIn Headlines for Product Managers | 25+ Examples',
        description: 'PM, TPM, and product leader headline formulas that attract recruiters and showcase impact.',
        url: 'https://linkedinrank.com/linkedin-headline-product-managers',
    },
}

export default function HeadlineProductManagersPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Role-Specific Headlines</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">Best LinkedIn Headlines for Product Managers</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Product management is one of the most sought-after roles on LinkedIn. Recruiters look for domain expertise, product sense, and leadership experience. This guide provides <strong className="text-[#0A0F1C]">25+ proven headline examples</strong> for every PM level and specialization.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The Product Manager Headline Formula</h2>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6 mb-4">
                            <p className="text-lg font-bold text-[#0A0F1C] mb-4 text-center">[PM Level] | [Product Domain] | [Impact or Company]</p>
                            <p className="text-sm text-[#4B5563] text-center">Highlight the type of products you build and the outcomes you drive.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">25+ Headlines by Specialization</h2>
                        {[
                            { spec: 'Product Managers (IC)', examples: [
                                'Product Manager | B2B SaaS | Driving Growth Through Data-Informed Decisions',
                                'Senior Product Manager | Payments & FinTech | Scaled Revenue 3x in 18 Months',
                                'Product Manager | E-Commerce & Marketplace | User Experience & Conversion',
                                'PM | AI/ML Products | Building Intelligent Search @ [Company]',
                                'Product Manager | Mobile Apps & Consumer Tech | 10M+ Users',
                            ]},
                            { spec: 'Technical Product Managers', examples: [
                                'Technical Product Manager | Platform & Infrastructure | Developer Tools',
                                'TPM | API Strategy & Integrations | Connecting Systems at Scale',
                                'Technical PM | Data Platform | Enabling ML at Production Scale',
                                'Senior TPM | Cloud Infrastructure | AWS & Microservices Architecture',
                            ]},
                            { spec: 'Product Leadership', examples: [
                                'Director of Product | Growth & Monetization | Scaled ARR to $50M',
                                'VP of Product | HealthTech | Building Products That Improve Patient Outcomes',
                                'Head of Product | EdTech | 0→1 Product Builder | Ex-Google PM',
                                'Chief Product Officer | B2B SaaS | PLG & Enterprise Strategy',
                                'Group PM | Marketplace & Payments | Leading a Team of 8 PMs',
                            ]},
                            { spec: 'Growth & Analytics PMs', examples: [
                                'Growth PM | Activation & Retention | A/B Testing & Experimentation',
                                'Product Manager, Growth | User Acquisition & Onboarding | Mobile-First',
                                'Analytics PM | Product Analytics & Experimentation | SQL & Amplitude',
                            ]},
                            { spec: 'Students & Aspiring PMs', examples: [
                                'MBA Candidate @ Wharton | Aspiring PM | Ex-Consultant at McKinsey',
                                'Product Management Fellow | APM Program @ Google | Stanford CS 2026',
                                'Transitioning to Product | 5 Years in Engineering | Building Side Projects',
                                'Product Intern | B2B SaaS | Data-Driven Decision Making',
                            ]},
                        ].map((section, i) => (
                            <div key={i} className="mb-10">
                                <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">{section.spec}</h3>
                                <div className="space-y-2">
                                    {section.examples.map((ex, j) => (
                                        <div key={j} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium">{ex}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Headlines to Avoid</h2>
                        <div className="space-y-2">
                            {[
                                { bad: 'Product Manager', why: 'Millions share this headline. Add your domain, product type, or impact.' },
                                { bad: 'Passionate about building great products', why: 'Every PM says this. Show what you build and for whom.' },
                                { bad: 'PM | MBA | Ex-Consultant | Strategy', why: 'Credential-heavy but lacks product specificity. What products do you ship?' },
                                { bad: 'Aspiring Product Manager | Looking for opportunities', why: 'Signals inexperience. Lead with what you can do, not what you want.' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-3">
                                    <span className="text-red-500 shrink-0 mt-0.5 text-sm">✗</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C]">&ldquo;{item.bad}&rdquo;</p>
                                        <p className="text-xs text-[#4B5563]">{item.why}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Keywords Recruiters Search For</h2>
                        <div className="flex flex-wrap gap-2">
                            {['Product Manager', 'Senior PM', 'TPM', 'Product Strategy', 'Roadmap', 'A/B Testing', 'PLG', 'B2B SaaS', 'Growth', 'User Research', 'Agile', 'Scrum', 'OKRs', 'SQL', 'Data-Driven', 'PRD', 'Go-to-Market', 'Monetization', 'Platform', 'API'].map((tech, i) => (
                                <span key={i} className="text-xs bg-[#F8FAFC] border border-gray-200 px-2.5 py-1 rounded-md text-[#0A0F1C] font-medium">{tech}</span>
                            ))}
                        </div>
                    </section>

                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Get your headline scored</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF for a free headline analysis plus 3 AI-generated alternatives.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Headline | It's Free</Link>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'For Software Engineers', href: '/linkedin-headline-software-engineers' },
                                { label: 'For Data Scientists', href: '/linkedin-headline-data-scientists' },
                                { label: 'For MBA Students', href: '/linkedin-headline-mba' },
                                { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
