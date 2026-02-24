import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'Best LinkedIn Headlines for HR & Recruiters | 25+ Examples (2026)',
    description: 'LinkedIn headline examples for HR professionals, recruiters, talent acquisition specialists, and people leaders in 2026. Headlines that build trust. Free scoring with LinkedInRank.',
    keywords: 'linkedin headline HR 2026, linkedin headline recruiter, best linkedin headline for talent acquisition, HR manager linkedin profile, people operations linkedin headline, best hr linkedin headline',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-hr' },
    openGraph: {
        title: 'Best LinkedIn Headlines for HR & Recruiters | 25+ Examples',
        description: 'HR, recruiter, and talent acquisition headline formulas that build trust with candidates.',
        url: 'https://linkedinrank.com/linkedin-headline-hr',
    },
}

export default function HeadlineHRPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

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
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Headline | It's Free</Link>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Guides</p>
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

            <SiteFooter />
        </main>
    )
}
