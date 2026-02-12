import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'LinkedIn Headline Writing Guide — 50+ Examples & Formulas | LinkedInRank',
    description: 'Write a LinkedIn headline that attracts recruiters. Proven formulas, 50+ examples for students, job seekers, founders, and professionals. Free headline analysis with LinkedInRank.',
    keywords: 'linkedin headline examples, linkedin headline generator, best linkedin headlines, linkedin headline for freshers, linkedin headline for students, linkedin headline for job seekers, linkedin headline formula',
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'LinkedIn Headline Writing Guide — 50+ Examples & Formulas',
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
            <SiteHeader navLinks={[{ href: '/linkedin-optimization-guide', label: 'Full Guide' }]} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">LinkedIn Headline Guide</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">How to Write a LinkedIn Headline That Attracts Recruiters</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Your headline is the single most important line on your LinkedIn profile. It appears in search results, connection requests, and every comment you post. Recruiters use headline keywords to filter candidates. A strong headline can increase your profile views by 3–5x. This guide covers proven formulas, 50+ real examples, and common mistakes to avoid.
                </p>

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
                                'Role | Industry | Key Skill — "Data Analyst | FinTech | SQL & Python"',
                                'Role at Company | Helping [Audience] with [Outcome] — "PM at Stripe | Helping teams ship faster"',
                                'Aspiring [Role] | [Credential] | Interested in [Field] — "Aspiring UX Designer | HCI @ Stanford | Accessibility"',
                                'I help [Audience] achieve [Result] using [Method] — "I help SaaS founders get leads using LinkedIn content"',
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
                                { bad: 'Passionate about technology', why: 'Generic — applies to millions of people' },
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
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'How long should my LinkedIn headline be?', a: 'LinkedIn allows 220 characters. The sweet spot is 80–150 characters — long enough to include keywords but short enough to display fully on mobile.' },
                                { q: 'Should I use emojis in my headline?', a: 'Avoid emojis in professional contexts. They can make your profile appear less serious. Use pipe separators (|) instead for visual separation.' },
                                { q: 'How many keywords should I include?', a: 'Include 2–3 relevant keywords that match your target role. Do not keyword-stuff — it looks unnatural and hurts credibility.' },
                                { q: 'Should my headline match my job title?', a: 'Not necessarily. Your headline should communicate your value and direction, not just your current title. A Marketing Coordinator can headline as "Digital Marketing Specialist | SEO & Content Strategy" if that reflects their expertise.' },
                                { q: 'How often should I update my headline?', a: 'Update it whenever you change roles, shift career direction, learn a significant new skill, or want to target a different type of opportunity.' },
                                { q: 'Can LinkedInRank check my headline?', a: 'Yes. Upload your LinkedIn PDF and LinkedInRank will score your headline on clarity, keywords, and positioning — plus generate 3 AI-powered headline alternatives.' },
                            ].map((item, i) => (
                                <div key={i} className="border-b border-gray-100 pb-4">
                                    <h3 className="text-sm font-bold text-[#0A0F1C] mb-1">{item.q}</h3>
                                    <p className="text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Get your headline scored instantly</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF and get a free headline score plus 3 AI-generated headline alternatives.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Check Your Headline Score — It&apos;s Free</Link>
                    </div>

                    {/* Related Guides */}
                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
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
                        <Link href="/linkedin-optimization-guide" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Optimization Guide</Link>
                        <Link href="/linkedin-about-guide" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">About Section Guide</Link>
                        <Link href="/faq" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">FAQ</Link>
                    </nav>
                </div>
            </footer>
        </main>
    )
}
