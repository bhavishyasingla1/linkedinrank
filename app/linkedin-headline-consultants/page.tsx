import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'
import { guidePageJsonLd } from '@/lib/jsonLd'

export const metadata: Metadata = {
    title: '25+ LinkedIn Headlines for Consultants (2026 Guide)',
    description: 'Build credibility before the first call. 25+ LinkedIn headlines for strategy, management, and tech consultants.',
    keywords: 'linkedin headline consultant 2026, linkedin headline management consultant, best linkedin headline for consultant, strategy consultant linkedin profile, freelance consultant linkedin, best consultant linkedin headline',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-consultants' },
    openGraph: {
        title: '25+ LinkedIn Headlines for Consultants (2026 Guide)',
        description: 'Build credibility before the first call. 25+ LinkedIn headlines for strategy, management, and tech consultants.',
        url: 'https://linkedinrank.com/linkedin-headline-consultants',
    },
}

const jsonLd = guidePageJsonLd({
    title: '25+ LinkedIn Headlines for Consultants',
    description: 'LinkedIn headline examples for management, strategy, technology, and freelance consultants.',
    url: 'https://linkedinrank.com/linkedin-headline-consultants',
    dateModified: '2026-03-24',
    breadcrumbs: [
        { name: 'Home', url: 'https://linkedinrank.com' },
        { name: 'Headline Guide', url: 'https://linkedinrank.com/linkedin-headline-guide' },
        { name: 'For Consultants', url: 'https://linkedinrank.com/linkedin-headline-consultants' },
    ],
    faqs: [
        { question: 'Should consultants lead with their firm name or their specialty?', answer: 'Lead with specialty unless your firm is in the top 3 (McKinsey, BCG, Bain). For most consultants, "Strategy Consultant | Growth & M&A" is more effective than "Consultant at [Firm]."' },
        { question: 'How should freelance consultants position their headline?', answer: 'Lead with the outcome you deliver, not your status. "Helping SaaS Startups Hit $1M ARR" is better than "Freelance Business Consultant." Specificity attracts clients.' },
        { question: 'Should I include Big 4 or MBB alumni status?', answer: 'Yes, if recent and relevant. "Ex-McKinsey" or "EY Alum" adds credibility. Place it as a suffix, not the main headline focus.' },
        { question: 'Can LinkedInRank help consultants improve their profile?', answer: 'Yes. Upload your LinkedIn PDF for a free headline and profile analysis. You will get positioning recommendations and AI-generated headline alternatives.' },
    ],
})

export default function HeadlineConsultantsPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5 flex-wrap mb-8">
                    <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                    <span aria-hidden="true">/</span>
                    <Link href="/linkedin-headline-guide" className="hover:text-[#0A66C2] transition-colors no-underline">Headline Guide</Link>
                    <span aria-hidden="true">/</span>
                    <span className="text-[#0A0F1C] font-medium">For Consultants</span>
                </nav>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Role-Specific Headlines</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">Best LinkedIn Headlines for Consultants</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    For consultants, LinkedIn is often the primary channel for attracting clients, partners, and opportunities. Your headline needs to signal expertise, credibility, and the specific value you deliver. This guide provides <strong className="text-[#0A0F1C]">25+ headline examples</strong> for every type of consultant.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The Consultant Headline Formula</h2>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6 mb-4">
                            <p className="text-lg font-bold text-[#0A0F1C] mb-4 text-center">[Consulting Specialty] | [Who You Help] | [Outcome You Deliver]</p>
                            <p className="text-sm text-[#4B5563] text-center">Clients hire consultants for results, not credentials. Lead with value.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">25+ Headlines by Type</h2>
                        {[
                            { spec: 'Management & Strategy Consultants', examples: [
                                'Management Consultant | Strategy & Operations | Helping Companies Scale Profitably',
                                'Strategy Consultant @ McKinsey | Growth Strategy & M&A | Fortune 500 Clients',
                                'Senior Consultant | Digital Transformation | EY | Retail & CPG',
                                'Business Consultant | Process Optimization | Saving Companies 20%+ in Operating Costs',
                                'Strategy & Operations | BCG Alum | Advising CEOs on Growth & Market Entry',
                            ]},
                            { spec: 'Technology & IT Consultants', examples: [
                                'IT Consultant | Cloud Migration & DevOps | AWS & Azure Certified',
                                'Technology Consultant | ERP Implementation | SAP & Salesforce',
                                'Cybersecurity Consultant | Risk Assessment & Compliance | SOC 2 & ISO 27001',
                                'AI/ML Consultant | Helping Companies Adopt AI Responsibly | Ex-Google',
                            ]},
                            { spec: 'Independent & Freelance Consultants', examples: [
                                'Freelance Growth Consultant | Helping SaaS Startups Hit $1M ARR',
                                'Independent Marketing Consultant | Brand Strategy & Go-to-Market | 50+ Clients Served',
                                'Fractional CMO | Demand Generation & Content Strategy | B2B SaaS',
                                'Fractional CTO | Tech Strategy for Non-Technical Founders | Pre-Seed to Series A',
                            ]},
                            { spec: 'HR & Organizational Consultants', examples: [
                                'HR Consultant | Talent Strategy & Culture Transformation | 100+ Engagements',
                                'Organizational Development Consultant | Change Management & Leadership Development',
                                'DEI Consultant | Building Inclusive Workplaces | Speaker & Workshop Facilitator',
                            ]},
                            { spec: 'Financial & Legal Consultants', examples: [
                                'Financial Consultant | CFO Advisory & FP&A | Startups & SMBs',
                                'Tax Consultant | International Tax Planning | CPA & Big 4 Alum',
                                'Regulatory Compliance Consultant | FinTech & Banking | Ex-Deloitte',
                                'M&A Advisory Consultant | Due Diligence & Valuation | Mid-Market Deals',
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
                                { bad: 'Consultant', why: 'Says nothing about your specialty, clients, or value. The word alone is meaningless.' },
                                { bad: 'Helping businesses grow', why: 'Every consultant says this. Specify how you help and who you help.' },
                                { bad: 'MBA | Ex-Big 4 | Strategy | Operations | Growth | M&A', why: 'Keyword stuffing without a clear proposition. Pick your strongest angle.' },
                                { bad: 'Open to new consulting opportunities', why: 'Signals desperation. Attract clients by showcasing your expertise, not your availability.' },
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

                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Get your headline scored</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF for a free headline analysis plus 3 AI-generated alternatives.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Headline | It's Free</Link>
                    </div>

                    <RelatedPages currentSlug="linkedin-headline-consultants" />
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
