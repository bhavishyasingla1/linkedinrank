import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'LinkedIn Headline Writing Guide | 50+ Examples & Formulas (2026)',
    description: 'Write a LinkedIn headline that attracts recruiters. 50+ proven examples and formulas for students, job seekers, founders, and professionals. Free headline scoring with LinkedInRank | the #1 LinkedIn profile scorer.',
    keywords: 'linkedin headline examples, linkedin headline generator, best linkedin headlines 2026, linkedin headline for freshers, linkedin headline for students, linkedin headline for job seekers, linkedin headline formula, linkedin headline tips, linkedin headline optimization, linkedin headline ideas',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-guide' },
    openGraph: {
        title: 'LinkedIn Headline Writing Guide | 50+ Examples & Formulas',
        description: '50+ proven headline examples and formulas. Write a headline that attracts recruiters and drives profile views.',
        url: 'https://linkedinrank.com/linkedin-headline-guide',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'LinkedIn Headline Writing Guide | 50+ Examples & Formulas',
            description: 'Learn how to write a LinkedIn headline that gets noticed. 50+ examples by role, 5 proven formulas, common mistakes, and how recruiters search.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-headline-guide',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
                { '@type': 'ListItem', position: 2, name: 'Headline Guide', item: 'https://linkedinrank.com/linkedin-headline-guide' },
            ],
        },
        {
            '@type': 'FAQPage',
            mainEntity: [
                { '@type': 'Question', name: 'How long should my LinkedIn headline be?', acceptedAnswer: { '@type': 'Answer', text: 'LinkedIn allows 220 characters, but only ~60 show in search results. Front-load your strongest keywords in the first 60 characters. Use the remaining space for secondary positioning.' } },
                { '@type': 'Question', name: 'Should I include my company name in my headline?', acceptedAnswer: { '@type': 'Answer', text: 'Only if your company is well-known and adds credibility. Otherwise, use that space for skills and value statements that help recruiters find you.' } },
                { '@type': 'Question', name: 'Can I use emojis in my LinkedIn headline?', acceptedAnswer: { '@type': 'Answer', text: 'Sparingly. One or two relevant emojis can add visual distinction, but overuse looks unprofessional. Many recruiters and hiring managers prefer clean, text-only headlines.' } },
                { '@type': 'Question', name: 'How does LinkedInRank score my headline?', acceptedAnswer: { '@type': 'Answer', text: 'LinkedInRank evaluates headline clarity, keyword presence, role specificity, and positioning strength. It also generates 3 AI-powered headline alternatives based on your profile.' } },
            ],
        },
    ],
}

export default function LinkedInHeadlineGuidePage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            {/* Hero header */}
            <div className="bg-gradient-to-b from-[#F8FAFC] to-white border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-6 pt-6 pb-10">
                    <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5 flex-wrap mb-8">
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-[#0A0F1C] font-medium">Headline Guide</span>
                    </nav>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-[#EFF6FF] text-[#0A66C2] border border-[#DBEAFE]">Guide</span>
                        <span className="text-[11px] text-[#9CA3AF] flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            12 min read
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight tracking-tight mb-5">How to Write a LinkedIn Headline That Attracts Recruiters</h1>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed max-w-2xl">
                        Your headline is the single most important line on your LinkedIn profile. It appears in search results, connection requests, and every comment you post. Recruiters use headline keywords to filter candidates. A strong headline can increase your profile views by 3–5x. This guide covers proven formulas, 50+ real examples, and common mistakes to avoid.
                    </p>
                </div>
            </div>

            <article className="max-w-3xl mx-auto px-6 py-10 sm:py-14">

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Why Your Headline Matters More Than You Think</h2>
                        <p className="mb-4">LinkedIn gives you 220 characters for your headline. Most people waste it with &ldquo;Student at XYZ University&rdquo; or &ldquo;Seeking Opportunities.&rdquo; These tell recruiters nothing about your skills, value, or direction.</p>
                        <p className="mb-4">Your headline serves three critical functions:</p>
                        <div className="space-y-2">
                            {[
                                { title: 'Search visibility', desc: 'LinkedIn search heavily weights headline keywords. If a recruiter searches "Product Manager SaaS" and those words are not in your headline, you will not appear.' },
                                { title: 'First impression', desc: 'Before anyone clicks your profile, they see your name, photo, and headline. It is your 3-second pitch.' },
                                { title: 'Professional positioning', desc: 'Your headline frames how people perceive your entire profile. It sets expectations for everything that follows.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</p>
                                    <p className="text-sm text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The Core Headline Formula</h2>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6 mb-4">
                            <p className="text-lg font-bold text-[#0A0F1C] mb-4 text-center">Role + Niche/Industry + Value or Differentiator</p>
                            <p className="text-sm text-[#4B5563] text-center">This structure works for every career stage.</p>
                        </div>
                        <p className="mb-4">Variations of this formula:</p>
                        <ul className="space-y-2">
                            {[
                                'Role | Industry | Key Skill | "Data Analyst | FinTech | SQL & Python"',
                                'Role at Company | Helping [Audience] with [Outcome] | "PM at Stripe | Helping teams ship faster"',
                                'Aspiring [Role] | [Credential] | Interested in [Field] | "Aspiring UX Designer | HCI @ Stanford | Accessibility"',
                                'I help [Audience] achieve [Result] using [Method] | "I help SaaS founders get leads using LinkedIn content"',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="w-5 h-5 rounded-md bg-[#0A66C2] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">50+ LinkedIn Headline Examples by Role</h2>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4 mt-6">For Students & Freshers</h3>
                        <div className="space-y-2 mb-6">
                            {[
                                'Aspiring Product Manager | Computer Engineering @ Thapar | AI & EdTech',
                                'Computer Science Student | Full-Stack Developer | React & Node.js',
                                'Marketing Intern @ HubSpot | Digital Strategy | SEO & Content',
                                'Mechanical Engineering 2025 | Interested in Robotics & Automation',
                                'Data Science Student | Python & SQL | Building ML Projects',
                                'Finance Major | CFA Level I Candidate | Equity Research',
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium">{item}</div>
                            ))}
                        </div>
                        <p className="text-sm mb-4">More student-specific strategies in our <Link href="/for-students" className="text-[#0A66C2] hover:underline">LinkedIn Guide for Students</Link> and <Link href="/linkedin-headline-software-engineers" className="text-[#0A66C2] hover:underline">headline examples for software engineers</Link>.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4 mt-6">For Job Seekers</h3>
                        <div className="space-y-2 mb-6">
                            {[
                                'Digital Marketer | SEO & Performance Marketing | Google Ads Certified',
                                'Frontend Developer | React & TypeScript | Building Fast UIs',
                                'Project Manager | PMP Certified | IT & Financial Services',
                                'Sales Development Rep | B2B SaaS | 150% Quota Achievement',
                                'UX Researcher | User Interviews & Usability Testing | HealthTech',
                                'Operations Manager | Supply Chain Optimization | Reduced Costs 30%',
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium">{item}</div>
                            ))}
                        </div>
                        <p className="text-sm mb-4">Read our <Link href="/for-jobseekers" className="text-[#0A66C2] hover:underline">LinkedIn Guide for Job Seekers</Link> for the full keyword strategy.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4 mt-6">For Founders & Executives</h3>
                        <div className="space-y-2 mb-6">
                            {[
                                'Founder @ Codju | AI-First EdTech | Helping Students Learn to Code',
                                'CEO @ [Startup] | Scaling B2B SaaS from 0 to $5M ARR',
                                'Co-Founder | Building the Future of Remote Hiring',
                                'VP of Engineering | Leading 50+ Engineers | Cloud Infrastructure',
                                'CTO | AI/ML in Healthcare | Ex-Google',
                                'Director of Product | Marketplace & Platform Strategy',
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium">{item}</div>
                            ))}
                        </div>
                        <p className="text-sm mb-4">Founder-specific strategies in our <Link href="/for-founders" className="text-[#0A66C2] hover:underline">LinkedIn Guide for Founders</Link>.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4 mt-6">For Creators & Personal Brand Builders</h3>
                        <div className="space-y-2">
                            {[
                                'Helping marketers grow on LinkedIn | 50K+ followers | Content Strategy',
                                'Writing about product management | PM @ Notion | Building in public',
                                'AI educator | Breaking down complex tech for beginners',
                                'Leadership coach | Helping first-time managers succeed',
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium">{item}</div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Headlines to Avoid</h2>
                        <div className="space-y-2">
                            {[
                                { bad: 'Student at XYZ University', why: 'Says nothing about skills, direction, or value' },
                                { bad: 'Seeking Opportunities', why: 'Signals desperation rather than capability' },
                                { bad: 'Passionate about technology', why: 'Generic | applies to millions of people' },
                                { bad: 'Hardworking professional', why: 'Buzzword with no proof or specificity' },
                                { bad: 'Open to Work', why: 'Use the LinkedIn Open to Work badge instead' },
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
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">How LinkedInRank Scores Your Headline</h2>
                        <p className="mb-4"><Link href="/" className="text-[#0A66C2] hover:underline">LinkedInRank</Link> evaluates headlines on role clarity, keyword presence, length optimization, and professional positioning. The headline category is worth 20 points out of 100 in your total score. Our scoring engine checks for:</p>
                        <ul className="space-y-1.5">
                            {['Clear role identification', 'Industry or niche keywords', 'Appropriate length (40–120 characters optimal)', 'Pipe separator usage for readability', 'Absence of vague buzzwords', 'Specificity and unique value proposition'].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* FAQ */}
                    <section>
                        <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-1">FAQ</p>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-3">
                            {[
                                { q: 'How long should my LinkedIn headline be?', a: 'LinkedIn allows 220 characters. The sweet spot is 80–150 characters | long enough to include keywords but short enough to display fully on mobile.' },
                                { q: 'Should I use emojis in my headline?', a: 'Avoid emojis in professional contexts. They can make your profile appear less serious. Use pipe separators (|) instead for visual separation.' },
                                { q: 'How many keywords should I include?', a: 'Include 2–3 relevant keywords that match your target role. Do not keyword-stuff | it looks unnatural and hurts credibility.' },
                                { q: 'Should my headline match my job title?', a: 'Not necessarily. Your headline should communicate your value and direction, not just your current title. A Marketing Coordinator can headline as "Digital Marketing Specialist | SEO & Content Strategy" if that reflects their expertise.' },
                                { q: 'How often should I update my headline?', a: 'Update it whenever you change roles, shift career direction, learn a significant new skill, or want to target a different type of opportunity.' },
                                { q: 'Can LinkedInRank check my headline?', a: 'Yes. Upload your LinkedIn PDF and LinkedInRank will score your headline on clarity, keywords, and positioning | plus generate 3 AI-powered headline alternatives.' },
                            ].map((item, i) => (
                                <details key={i} className="group bg-[#F8FAFC] border border-gray-200 rounded-xl overflow-hidden">
                                    <summary className="cursor-pointer text-sm font-semibold text-[#0A0F1C] list-none flex items-center justify-between gap-3 p-4 hover:bg-white transition-colors">
                                        {item.q}
                                        <svg className="w-4 h-4 text-[#9CA3AF] shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                    </summary>
                                    <p className="px-4 pb-4 text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-[#0A66C2] to-[#084E96] rounded-2xl p-8 sm:p-10 text-center shadow-[0_4px_20px_rgba(10,102,194,0.2)]">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                        </div>
                        <h2 className="text-lg font-bold text-white mb-2">Get your headline scored instantly</h2>
                        <p className="text-sm text-blue-100/80 mb-5 max-w-md mx-auto">Upload your LinkedIn PDF and get a free headline score plus 3 AI-generated headline alternatives.</p>
                        <Link href="/" className="inline-block bg-white text-[#0A66C2] px-6 py-3 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors no-underline shadow-sm">Check Your Headline Score</Link>
                    </div>

                    {/* Related Guides */}
                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'About Section Guide', href: '/linkedin-about-guide' },
                                { label: 'Keywords Guide', href: '/linkedin-keywords-guide' },
                                { label: 'For Students', href: '/for-students' },
                                { label: 'For Job Seekers', href: '/for-jobseekers' },
                                { label: 'For Founders', href: '/for-founders' },
                                { label: 'Recruiter Psychology', href: '/recruiter-psychology' },
                                { label: 'Top 10 Mistakes', href: '/linkedin-mistakes' },
                                { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                                { label: 'For Software Engineers', href: '/linkedin-headline-software-engineers' },
                                { label: 'For MBA Students', href: '/linkedin-headline-mba' },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="text-xs font-medium text-[#4B5563] bg-[#F8FAFC] border border-gray-200 px-3 py-1.5 rounded-lg no-underline hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <SiteFooter />
        </main>
    )
}
