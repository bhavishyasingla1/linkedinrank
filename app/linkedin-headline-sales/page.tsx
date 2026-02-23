import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'Best LinkedIn Headlines for Sales Professionals | 25+ Examples (2026)',
    description: 'LinkedIn headline examples for sales reps, AEs, SDRs, BDRs, and sales leaders in 2026. Headlines that build trust and generate inbound leads. Free scoring with LinkedInRank.',
    keywords: 'linkedin headline sales 2026, linkedin headline account executive, best linkedin headline for sales, SDR linkedin headline, sales manager linkedin profile, best sales linkedin headline',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-sales' },
    openGraph: {
        title: 'Best LinkedIn Headlines for Sales Professionals | 25+ Examples',
        description: 'Sales rep, AE, SDR, and sales leader headline formulas that generate inbound leads.',
        url: 'https://linkedinrank.com/linkedin-headline-sales',
    },
}

export default function HeadlineSalesPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Role-Specific Headlines</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">Best LinkedIn Headlines for Sales Professionals</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    In sales, your LinkedIn headline is your first cold outreach | it determines whether prospects open your message or ignore it. A headline that screams &ldquo;I&apos;m selling to you&rdquo; gets blocked. One that signals expertise and value gets conversations. Here are <strong className="text-[#0A0F1C]">25+ proven examples</strong>.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The Sales Headline Formula</h2>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6 mb-4">
                            <p className="text-lg font-bold text-[#0A0F1C] mb-4 text-center">Helping [Who] achieve [Outcome] | [Role] @ [Company]</p>
                            <p className="text-sm text-[#4B5563] text-center">Lead with the value you bring to prospects, not your quota.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">25+ Headlines by Role</h2>
                        {[
                            { spec: 'Account Executives', examples: [
                                'Helping SaaS Companies Reduce Churn by 40% | Account Executive @ [Company]',
                                'Enterprise AE | Helping CIOs Modernize IT Infrastructure | Cloud & Security',
                                'Account Executive | FinTech Solutions for Mid-Market Banks | $2M+ Quota Club',
                                'Senior AE | Helping HR Teams Automate Hiring | 130% of Quota in 2024',
                                'Strategic Account Executive | Selling to Fortune 500 | Data & Analytics Solutions',
                            ]},
                            { spec: 'SDRs & BDRs', examples: [
                                'SDR | Connecting CTOs with DevOps Solutions That Save 20+ Hours/Week',
                                'Business Development Rep | Opening Doors for Enterprise Sales | SaaS',
                                'SDR @ [Company] | Helping Marketing Teams Get 3x More Qualified Leads',
                                'BDR | Outbound Specialist | Building Pipeline for Cloud Security Solutions',
                            ]},
                            { spec: 'Sales Leadership', examples: [
                                'VP of Sales | Scaling Revenue Teams from $5M to $50M ARR | B2B SaaS',
                                'Sales Director | Building & Leading High-Performance Sales Teams | HealthTech',
                                'Head of Sales | PLG + Sales-Assisted GTM | Series B–D Startups',
                                'Regional Sales Manager | APAC | Enterprise Software | Team of 15',
                                'CRO | Revenue Strategy & Operations | Took 3 Companies from $10M to $100M',
                            ]},
                            { spec: 'Sales Engineering & Solutions', examples: [
                                'Sales Engineer | Translating Complex Tech into Business Value | APIs & Cloud',
                                'Solutions Consultant | Pre-Sales Engineering | Cybersecurity & Compliance',
                                'Solutions Architect | Helping Enterprise Clients Design Cloud Infrastructure',
                                'Technical Sales | Demo Expert | Turning POCs into $500K+ Deals',
                            ]},
                            { spec: 'Channel & Partnership Sales', examples: [
                                'Channel Sales Manager | Building Partner Ecosystems | 200+ Partner Network',
                                'Partnership Lead | Strategic Alliances & Co-Selling | SaaS & Cloud',
                                'Alliance Manager | AWS & Microsoft Partnerships | Driving Co-Sell Revenue',
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
                                { bad: 'Sales Representative at [Company]', why: 'Screams "I will pitch you." Prospects avoid this. Lead with the value you provide.' },
                                { bad: 'Passionate about helping customers succeed', why: 'Generic and expected. Every sales rep says this. Be specific about how you help.' },
                                { bad: 'Quota Crusher | Top Performer | President\'s Club', why: 'Impresses sales managers, not prospects. Your headline should attract buyers, not hiring managers (unless you\'re job hunting).' },
                                { bad: 'Open to new opportunities | Sales Professional', why: 'Weak positioning. If you\'re job hunting, still lead with your expertise and results.' },
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
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'For Marketers', href: '/linkedin-headline-marketers' },
                                { label: 'For Consultants', href: '/linkedin-headline-consultants' },
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
