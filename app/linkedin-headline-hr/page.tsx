import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'Best LinkedIn Headlines for HR & Recruiters — 25+ Examples | LinkedInRank',
    description: 'LinkedIn headline examples for HR professionals, recruiters, talent acquisition specialists, and people leaders. Headlines that build trust with candidates and employers.',
    keywords: 'linkedin headline HR, linkedin headline recruiter, best linkedin headline for talent acquisition, HR manager linkedin profile, people operations linkedin headline',
}

export default function HeadlineHRPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader navLinks={[{ href: '/linkedin-headline-guide', label: 'Headline Guide' }]} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Role-Specific Headlines</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">Best LinkedIn Headlines for HR & Recruiters</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    For HR professionals and recruiters, your LinkedIn headline is how candidates judge whether to respond to your outreach. A clear, trustworthy headline gets higher response rates and better talent. Here are <strong className="text-[#0A0F1C]">25+ proven headline examples</strong> for every HR role.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The HR & Recruiter Headline Formula</h2>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6 mb-4">
                            <p className="text-lg font-bold text-[#0A0F1C] mb-4 text-center">[Role] | [Industry/Specialty] | [What You Help With]</p>
                            <p className="text-sm text-[#4B5563] text-center">Signal what roles you hire for or what HR problems you solve.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">25+ Headlines by Specialization</h2>
                        {[
                            { spec: 'Recruiters & Talent Acquisition', examples: [
                                'Tech Recruiter | Hiring Engineers, PMs & Designers | 500+ Hires Made',
                                'Senior Talent Acquisition Partner | FinTech & SaaS | Building World-Class Teams',
                                'Recruiter @ Google | Connecting Top Talent with Moonshot Opportunities',
                                'Executive Recruiter | C-Suite & VP-Level Search | Healthcare & Biotech',
                                'Campus Recruiter | University Relations & Early Career Programs | Fortune 100',
                            ]},
                            { spec: 'Agency & Independent Recruiters', examples: [
                                'Headhunter | Placing Senior Engineers at Top Startups | 95% Offer Acceptance Rate',
                                'Founder @ [Agency] | Executive Search in FinTech & Crypto',
                                'Independent Recruiter | Contract & Permanent Placement | Data & AI Roles',
                                'Recruitment Consultant | RPO & Talent Advisory | Scaling Teams from 10 to 100',
                            ]},
                            { spec: 'HR Business Partners', examples: [
                                'HR Business Partner | Supporting Engineering & Product Teams | 500+ Employees',
                                'Senior HRBP | Organizational Design & Change Management | Tech Industry',
                                'HRBP | Employee Relations & Performance Management | Remote-First Companies',
                                'Strategic HR Partner | Aligning People Strategy with Business Goals | SaaS',
                            ]},
                            { spec: 'People Operations & Culture', examples: [
                                'Head of People | Building Culture at Scale | Series B–D Startups',
                                'People Operations Manager | Onboarding, Engagement & Retention | 200+ Team',
                                'Chief People Officer | Talent Strategy, DEI & Culture | Public Company',
                                'VP of People | Remote Work Strategy & Employee Experience | Global Teams',
                            ]},
                            { spec: 'HR Specialists', examples: [
                                'Compensation & Benefits Manager | Total Rewards Strategy | Tech & Finance',
                                'Learning & Development Lead | Leadership Training & Upskilling Programs',
                                'HR Analytics Manager | People Data & Workforce Planning | Python & Tableau',
                                'Employee Experience Designer | Building Workplaces People Love',
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
                                { bad: 'Recruiter at [Company]', why: 'Says nothing about what roles you hire for. Candidates want to know if you recruit in their field.' },
                                { bad: 'Connecting great people with great opportunities', why: 'Every recruiter says this. Specify the industry, roles, and level you recruit for.' },
                                { bad: 'HR Professional | People Person', why: '"People person" is not a credential. State your HR specialty and the problems you solve.' },
                                { bad: 'Talent Ninja | Culture Champion | Hiring Rockstar', why: 'Unprofessional titles undermine credibility. Use standard industry terms.' },
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
                                { label: 'For Sales', href: '/linkedin-headline-sales' },
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
