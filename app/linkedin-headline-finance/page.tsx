import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'Best LinkedIn Headlines for Finance & Accounting — 25+ Examples | LinkedInRank',
    description: 'LinkedIn headline examples for finance professionals, accountants, CFOs, investment bankers, financial analysts, and auditors. Headlines that signal expertise and attract opportunities.',
    keywords: 'linkedin headline finance, linkedin headline accountant, best linkedin headline for CPA, investment banker linkedin headline, financial analyst linkedin profile',
}

export default function HeadlineFinancePage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader navLinks={[{ href: '/linkedin-headline-guide', label: 'Headline Guide' }]} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Role-Specific Headlines</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">Best LinkedIn Headlines for Finance & Accounting</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Finance and accounting professionals need headlines that convey trust, precision, and domain expertise. Whether you&apos;re in corporate finance, investment banking, audit, or FP&A, your headline should signal your specialty clearly. Here are <strong className="text-[#0A0F1C]">25+ proven examples</strong>.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The Finance Headline Formula</h2>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6 mb-4">
                            <p className="text-lg font-bold text-[#0A0F1C] mb-4 text-center">[Role] | [Specialty or Certification] | [Industry or Impact]</p>
                            <p className="text-sm text-[#4B5563] text-center">Certifications matter in finance — include CPA, CFA, CA if you have them.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">25+ Headlines by Specialization</h2>
                        {[
                            { spec: 'Corporate Finance & FP&A', examples: [
                                'FP&A Manager | Financial Planning & Budgeting | SaaS & Tech',
                                'Senior Financial Analyst | Revenue Forecasting & Business Intelligence | $500M+ Portfolio',
                                'Director of Finance | Strategic Planning & Cash Flow Optimization | Series C Startup',
                                'Finance Manager | FP&A & Investor Relations | Scaling from Seed to IPO',
                                'Corporate Finance Lead | M&A Integration & Financial Modeling | Fortune 500',
                            ]},
                            { spec: 'Investment Banking & Private Equity', examples: [
                                'Investment Banking Analyst | M&A & Capital Markets | TMT Sector',
                                'Associate @ Goldman Sachs | Leveraged Finance & Debt Capital Markets',
                                'Private Equity Associate | Growth Equity | Healthcare & Life Sciences',
                                'VP, Investment Banking | Cross-Border M&A | $10B+ Deal Experience',
                            ]},
                            { spec: 'Accounting & Audit', examples: [
                                'CPA | Audit Manager @ Deloitte | Financial Services & Insurance',
                                'Senior Accountant | Tax Planning & Compliance | CPA Licensed',
                                'Chartered Accountant | Statutory Audit & Internal Controls | Big 4 Trained',
                                'Tax Manager | International Tax & Transfer Pricing | KPMG Alum',
                                'Controller | Financial Reporting & SOX Compliance | Public Company',
                            ]},
                            { spec: 'Wealth Management & Advisory', examples: [
                                'Financial Advisor | Retirement Planning & Wealth Management | CFP',
                                'Portfolio Manager | Equity Research & Asset Allocation | CFA Charterholder',
                                'Wealth Manager | High-Net-Worth Clients | Estate & Tax Planning',
                                'Investment Analyst | ESG & Sustainable Investing | $2B AUM',
                            ]},
                            { spec: 'FinTech & Emerging Roles', examples: [
                                'Finance Lead @ [FinTech] | Payments & Digital Banking | CPA',
                                'Blockchain Finance Analyst | DeFi & Tokenomics | CFA Level III',
                                'Revenue Operations Manager | SaaS Metrics & Financial Systems | Stripe & Netsuite',
                                'Crypto Fund Accountant | NAV Reporting & Fund Administration | Big 4 Background',
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
                                { bad: 'Accountant', why: 'Too generic. Specify your type (tax, audit, advisory) and any certifications.' },
                                { bad: 'Finance Professional | Numbers Guy', why: '"Numbers guy" undermines credibility. Use professional terms and certifications.' },
                                { bad: 'CPA, CFA, MBA, CA, ACCA', why: 'A credential dump without context. What do you actually do with those credentials?' },
                                { bad: 'Experienced finance professional seeking new opportunities', why: 'Weak positioning. Lead with your expertise, not your job search status.' },
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
                            {['CPA', 'CFA', 'CA', 'FP&A', 'Financial Modeling', 'M&A', 'Audit', 'Tax', 'SOX', 'GAAP', 'IFRS', 'Revenue Recognition', 'Treasury', 'Valuation', 'Due Diligence', 'ERP', 'SAP', 'NetSuite', 'Excel', 'Power BI'].map((tech, i) => (
                                <span key={i} className="text-xs bg-[#F8FAFC] border border-gray-200 px-2.5 py-1 rounded-md text-[#0A0F1C] font-medium">{tech}</span>
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
                                { label: 'For Consultants', href: '/linkedin-headline-consultants' },
                                { label: 'For MBA Students', href: '/linkedin-headline-mba' },
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
