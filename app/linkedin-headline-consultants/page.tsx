import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'Best LinkedIn Headlines for Consultants — 25+ Examples (2026)',
    description: 'LinkedIn headline examples for management, strategy, and freelance consultants in 2026. Headlines that build credibility and attract clients. Free scoring with LinkedInRank.',
    keywords: 'linkedin headline consultant 2026, linkedin headline management consultant, best linkedin headline for consultant, strategy consultant linkedin profile, freelance consultant linkedin, best consultant linkedin headline',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-consultants' },
    openGraph: {
        title: 'Best LinkedIn Headlines for Consultants — 25+ Examples',
        description: 'Management, strategy, and freelance consultant headline formulas that build credibility.',
        url: 'https://linkedinrank.com/linkedin-headline-consultants',
    },
}

export default function HeadlineConsultantsPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader navLinks={[{ href: '/linkedin-headline-guide', label: 'Headline Guide' }]} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
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
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Headline — It's Free</Link>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'For MBA Students', href: '/linkedin-headline-mba' },
                                { label: 'For Finance', href: '/linkedin-headline-finance' },
                                { label: 'Recruiter Psychology', href: '/recruiter-psychology' },
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
                        <Link href="/linkedin-headline-guide" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Headline Guide</Link>
                    </nav>
                </div>
            </footer>
        </main>
    )
}
