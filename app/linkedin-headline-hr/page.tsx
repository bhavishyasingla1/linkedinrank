import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'
import { guidePageJsonLd } from '@/lib/jsonLd'

export const metadata: Metadata = {
    title: 'LinkedIn Headline Examples for HR Professionals (40+ Copy-Paste Templates)',
    description: 'Copy-paste LinkedIn headline templates for HR managers, recruiters, and talent acquisition specialists. 40+ proven examples that build trust with candidates. Free analyzer tool included.',
    keywords: 'linkedin headline HR 2026, linkedin headline recruiter, best linkedin headline for talent acquisition, HR manager linkedin profile, people operations linkedin headline, best hr linkedin headline',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-hr' },
    openGraph: {
        title: 'LinkedIn Headline Examples for HR Professionals (40+ Copy-Paste Templates)',
        description: 'Copy-paste LinkedIn headline templates for HR managers, recruiters, and talent acquisition specialists. 40+ proven examples that build trust with candidates.',
        url: 'https://linkedinrank.com/linkedin-headline-hr',
    },
}

const jsonLd = guidePageJsonLd({
    title: '25+ LinkedIn Headlines for HR & Recruiters',
    description: 'Proven LinkedIn headline examples for HR professionals, recruiters, talent acquisition specialists, and people leaders.',
    url: 'https://linkedinrank.com/linkedin-headline-hr',
    dateModified: '2026-03-24',
    breadcrumbs: [
        { name: 'Home', url: 'https://linkedinrank.com' },
        { name: 'Headline Guide', url: 'https://linkedinrank.com/linkedin-headline-guide' },
        { name: 'For HR & Recruiters', url: 'https://linkedinrank.com/linkedin-headline-hr' },
    ],
    faqs: [
        { question: 'Should HR professionals include certifications like SHRM-CP in their headline?', answer: 'Yes. Certifications like SHRM-CP, SHRM-SCP, and PHR add immediate credibility. Place them after your role title for maximum search visibility.' },
        { question: 'What makes a good recruiter headline on LinkedIn?', answer: 'A strong recruiter headline specifies the roles you hire for and the industry. "Tech Recruiter | Hiring Engineers & PMs | SaaS" is far more effective than "Recruiter at [Company]."' },
        { question: 'Should I mention my company in my HR headline?', answer: 'Only if your company is well-known. Otherwise, use the space for your HR specialty, the problems you solve, or the scale you operate at (e.g., "500+ Employees").' },
        { question: 'How can I check if my HR headline is optimised?', answer: 'Upload your LinkedIn PDF to LinkedInRank for a free headline analysis. You will get a clarity score, keyword assessment, and 3 AI-generated headline alternatives.' },
    ],
})

export default function HeadlineHRPage() {
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
                    <span className="text-[#0A0F1C] font-medium">For HR & Recruiters</span>
                </nav>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Role-Specific Headlines</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">40+ LinkedIn Headline Examples for HR & Recruiters</h1>
                <p className="text-[15px] text-[#4B5563] mb-6 leading-relaxed max-w-2xl">
                    For HR professionals and recruiters, your LinkedIn headline is how candidates judge whether to respond to your outreach. A clear, trustworthy headline gets higher response rates and better talent. Here are <strong className="text-[#0A0F1C]">40+ proven headline examples</strong> for every HR role.
                </p>
                <div className="bg-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-4 mb-14">
                    <p className="text-sm text-[#4B5563] mb-2">Looking for examples from other industries?</p>
                    <Link href="/linkedin-headline-examples" className="text-sm font-semibold text-[#0A66C2] hover:underline">→ View 100+ headline examples for all roles (software engineers, marketers, finance, students, and more)</Link>
                </div>

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

                    {/* Quick Templates */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Quick-Copy HR Headline Templates</h2>
                        <div className="space-y-2">
                            {[
                                '[Your Role] | Hiring [Roles You Recruit] | [Industry]',
                                '[Your Role] | [HR Specialty] | [Company Size or Scale]',
                                'Helping [Who] with [HR Problem] | [Your Title] @ [Company]',
                                '[Certification] | [Role] | [What You Deliver]',
                            ].map((t, i) => (
                                <div key={i} className="bg-gradient-to-r from-[#EFF6FF] to-white border border-[#DBEAFE] rounded-lg p-4 text-sm text-[#0A0F1C] font-medium">{t}</div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ section */}
                    <section>
                        <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-1">FAQ</p>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-3">
                            {[
                                { q: 'Should HR professionals include certifications like SHRM-CP in their headline?', a: 'Yes. Certifications like SHRM-CP, SHRM-SCP, and PHR add immediate credibility. Place them after your role title for maximum search visibility.' },
                                { q: 'What makes a good recruiter headline on LinkedIn?', a: 'A strong recruiter headline specifies the roles you hire for and the industry. "Tech Recruiter | Hiring Engineers & PMs | SaaS" is far more effective than "Recruiter at [Company]."' },
                                { q: 'Should I mention my company in my HR headline?', a: 'Only if your company is well-known. Otherwise, use the space for your HR specialty, the problems you solve, or the scale you operate at (e.g., "500+ Employees").' },
                                { q: 'How can I check if my HR headline is optimised?', a: 'Upload your LinkedIn PDF to LinkedInRank for a free headline analysis. You will get a clarity score, keyword assessment, and 3 AI-generated headline alternatives.' },
                            ].map((item, i) => (
                                <details key={i} className="group bg-[#F8FAFC] border border-gray-200 rounded-xl overflow-hidden">
                                    <summary className="cursor-pointer text-sm font-semibold text-[#0A0F1C] list-none flex items-center justify-between gap-3 p-4 hover:bg-white transition-colors">
                                        {item.q}
                                        <svg className="w-4 h-4 text-[#6B7280] shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                    </summary>
                                    <p className="px-4 pb-4 text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Get your headline scored</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF for a free headline analysis plus 3 AI-generated alternatives.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Headline | It&apos;s Free</Link>
                    </div>

                    <RelatedPages currentSlug="linkedin-headline-hr" />
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
