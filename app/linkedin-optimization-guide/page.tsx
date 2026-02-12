import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'Complete LinkedIn Profile Optimization Guide 2026 | LinkedInRank',
    description: 'The definitive guide to optimizing your LinkedIn profile. Step-by-step strategies for headline, about section, experience, skills, keywords, and personal branding. Free LinkedIn score checker included.',
    keywords: 'linkedin optimization, linkedin profile optimization, optimize linkedin profile, linkedin optimization guide, linkedin profile improvement, linkedin optimization tool free, linkedin profile makeover, linkedin profile audit',
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'Complete LinkedIn Profile Optimization Guide 2026',
            description: 'The definitive guide to optimizing your LinkedIn profile. Step-by-step strategies for headline, about section, experience, skills, keywords, and personal branding.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-optimization-guide',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
                { '@type': 'ListItem', position: 2, name: 'LinkedIn Optimization Guide', item: 'https://linkedinrank.com/linkedin-optimization-guide' },
            ],
        },
        {
            '@type': 'FAQPage',
            mainEntity: [
                { '@type': 'Question', name: 'How long does it take to optimize a LinkedIn profile?', acceptedAnswer: { '@type': 'Answer', text: 'A thorough optimization takes 2–3 hours for the initial setup. After that, quarterly reviews of 30–60 minutes keep your profile current. Focus on headline and About section first — they have the highest impact.' } },
                { '@type': 'Question', name: 'What is the most important section to optimize?', acceptedAnswer: { '@type': 'Answer', text: 'The headline. It appears in every search result, connection request, and comment. A clear, keyword-rich headline directly impacts how often recruiters find you.' } },
                { '@type': 'Question', name: 'Should I use LinkedIn Premium for optimization?', acceptedAnswer: { '@type': 'Answer', text: 'Premium is not required. The most impactful optimizations — headline, About, experience, skills — are available on free accounts.' } },
                { '@type': 'Question', name: 'How do I know if my profile is optimized?', acceptedAnswer: { '@type': 'Answer', text: 'Upload your LinkedIn PDF to LinkedInRank for a free score across 30+ signals. You will get a score out of 100 with specific recommendations for each section.' } },
                { '@type': 'Question', name: 'Do keywords really matter on LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. LinkedIn search works similarly to Google. Recruiters search using job titles, skills, and industry terms. If those keywords are not in your profile, you will not appear in search results.' } },
                { '@type': 'Question', name: 'How often should I update my LinkedIn profile?', acceptedAnswer: { '@type': 'Answer', text: 'Every 3 months at minimum. Update after any role change, new certification, major project, or career direction shift.' } },
            ],
        },
    ],
}

export default function LinkedInOptimizationGuidePage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader navLinks={[{ href: '/methodology', label: 'Methodology' }]} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Pillar Guide</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">Complete LinkedIn Profile Optimization Guide</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Your LinkedIn profile is a search engine and a trust platform. This guide covers every section of your profile with actionable strategies — whether you are a student, job seeker, founder, or experienced professional. Each recommendation is based on the same <strong className="text-[#0A0F1C]">30+ signals</strong> that <Link href="/" className="text-[#0A66C2] hover:underline">LinkedInRank</Link> uses to score profiles.
                </p>

                {/* Table of Contents */}
                <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-6 mb-10">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">In This Guide</p>
                    <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                            { label: '1. Foundation: Photo, Headline, About', anchor: '#foundation' },
                            { label: '2. Building Credibility', anchor: '#credibility' },
                            { label: '3. Discoverability & Keywords', anchor: '#discoverability' },
                            { label: '4. Networking Strategy', anchor: '#networking' },
                            { label: '5. Content & Visibility', anchor: '#content' },
                            { label: '6. Review Cycle', anchor: '#review' },
                        ].map((item, i) => (
                            <a key={i} href={item.anchor} className="text-sm text-[#0A66C2] hover:underline no-underline">{item.label}</a>
                        ))}
                    </nav>
                </div>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    {/* Step 1 */}
                    <section id="foundation" aria-labelledby="h-foundation">
                        <h2 id="h-foundation" className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 1 — Foundation: Photo, Headline, About, Experience, Skills</h2>
                        <p className="mb-4">These five elements form the core of every LinkedIn profile. Recruiters scan them in under 30 seconds. If any one is weak, the entire profile loses credibility.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">Profile Photo</h3>
                        <p className="mb-4">Use a clear, professional headshot with a neutral background. Your face should take up 60–70% of the frame. Avoid group photos, heavy filters, or casual selfies. A strong photo increases profile views by up to 21x according to LinkedIn data. Read our <Link href="/linkedin-profile-photo-guide" className="text-[#0A66C2] hover:underline">complete profile photo guide</Link> for detailed tips.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">Headline</h3>
                        <p className="mb-4">Your headline is the most important line on your profile. It appears in search results, connection requests, and every comment you leave. The best headlines follow a clear formula: <strong className="text-[#0A0F1C]">Role + Niche + Value</strong>. For example: &ldquo;Frontend Developer | React & Performance Optimization | Building Fast UIs&rdquo;. Avoid vague titles like &ldquo;Student&rdquo; or &ldquo;Seeking Opportunities.&rdquo; See our <Link href="/linkedin-headline-guide" className="text-[#0A66C2] hover:underline">headline writing guide</Link> for 50+ examples.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">About Section</h3>
                        <p className="mb-4">Your About section should answer three questions: What do you do? Who do you help? What results do you create? Structure it in 3–4 short paragraphs. Include 2–3 measurable achievements. Write in first person — it builds trust. Our <Link href="/linkedin-about-guide" className="text-[#0A66C2] hover:underline">About section guide</Link> has templates for every career stage.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">Experience</h3>
                        <p className="mb-4">Each role should have 3–5 bullet points using action verbs and measurable outcomes. Instead of &ldquo;Managed social media,&rdquo; write &ldquo;Grew Instagram from 2K to 10K followers in 4 months through data-driven content strategy.&rdquo; Numbers build credibility and make your profile recruiter-ready.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">Skills</h3>
                        <p className="mb-4">Add 15–25 relevant skills. Your top 3 pinned skills should match your target role exactly — recruiters use skill filters in LinkedIn search. Include a mix of technical skills, tools, and domain expertise. Read our <Link href="/linkedin-keywords-guide" className="text-[#0A66C2] hover:underline">keywords guide</Link> to understand how skills impact search visibility.</p>
                    </section>

                    {/* Step 2 */}
                    <section id="credibility" aria-labelledby="h-credibility">
                        <h2 id="h-credibility" className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 2 — Building Credibility</h2>
                        <p className="mb-4">Credibility separates average profiles from strong ones. Recruiters and hiring managers subconsciously look for proof that you can deliver.</p>
                        <div className="space-y-3">
                            {[
                                { title: 'Metrics in every role', desc: 'Revenue generated, users served, percentage improvements, team sizes managed. Quantify wherever possible.' },
                                { title: 'Certifications', desc: 'Industry certifications validate your expertise. Google, AWS, HubSpot, and similar certifications carry weight.' },
                                { title: 'Proof of work', desc: 'Projects, case studies, publications, and portfolio pieces in your Featured section demonstrate what you have built.' },
                                { title: 'Recommendations', desc: 'Social proof from colleagues and managers is underrated. Even 2–3 genuine recommendations strengthen your profile significantly.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</p>
                                    <p className="text-sm text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4">Want to see how your credibility signals score? <Link href="/" className="text-[#0A66C2] hover:underline">Run a free LinkedInRank analysis</Link> to get a signal-level breakdown.</p>
                    </section>

                    {/* Step 3 */}
                    <section id="discoverability" aria-labelledby="h-discoverability">
                        <h2 id="h-discoverability" className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 3 — Discoverability & Keywords</h2>
                        <p className="mb-4">LinkedIn is a search engine. If the right keywords are not in your profile, recruiters cannot find you — no matter how qualified you are.</p>
                        <p className="mb-4">Place keywords strategically in your headline, About section, job titles, and skills. Use role-specific terms (e.g., &ldquo;Product Manager&rdquo; not &ldquo;PM&rdquo;), industry terms, and tool names. Our <Link href="/linkedin-keywords-guide" className="text-[#0A66C2] hover:underline">LinkedIn Keywords Guide</Link> covers exactly how recruiters search and which keywords matter most for your role.</p>
                        <p className="mb-4">Key placement areas for keywords:</p>
                        <ul className="space-y-2 mb-4">
                            {['Headline (highest weight in LinkedIn search)', 'About section (first 300 characters matter most)', 'Job titles in Experience section', 'Skills section (used as search filters)', 'Certifications and course names'].map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                                    <span className="text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Step 4 */}
                    <section id="networking" aria-labelledby="h-networking">
                        <h2 id="h-networking" className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 4 — Networking Strategy</h2>
                        <p className="mb-4">A strong profile without an active network is like a billboard in an empty room. Networking on LinkedIn should be intentional and consistent.</p>
                        <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5 mb-4">
                            <p className="text-sm font-bold text-[#0A0F1C] mb-3">Daily networking routine (15 minutes)</p>
                            <ul className="space-y-2">
                                {['Send 5 targeted connection requests with personalized notes', 'Leave 3 thoughtful comments on posts in your industry', 'Send 1 direct message per week to a recruiter or hiring manager', 'Engage with alumni from your university or past companies'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-[#4B5563]">
                                        <span className="w-5 h-5 rounded-md bg-[#0A66C2] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p>Learn what recruiters actually look for in our <Link href="/recruiter-psychology" className="text-[#0A66C2] hover:underline">Recruiter Psychology Guide</Link>.</p>
                    </section>

                    {/* Step 5 */}
                    <section id="content" aria-labelledby="h-content">
                        <h2 id="h-content" className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 5 — Content & Visibility</h2>
                        <p className="mb-4">Posting content on LinkedIn signals seriousness to recruiters and builds authority in your niche. You do not need to post daily — consistency matters more than frequency.</p>
                        <p className="mb-4">Effective content types:</p>
                        <ul className="space-y-2 mb-4">
                            {['Learnings from your work or projects', 'Frameworks and actionable advice', 'Industry opinions and takes', 'Personal stories with professional lessons', 'Breakdowns of what worked (and what did not)'].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-[#4B5563]">
                                    <span className="text-[#0A66C2] mt-0.5 shrink-0">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p>For proven post templates and hook formulas, read our <Link href="/viral-post-formulas" className="text-[#0A66C2] hover:underline">Viral LinkedIn Post Formulas</Link> guide. For a full content strategy, see our <Link href="/linkedin-content-strategy" className="text-[#0A66C2] hover:underline">LinkedIn Content Strategy Guide</Link>.</p>
                    </section>

                    {/* Step 6 */}
                    <section id="review" aria-labelledby="h-review">
                        <h2 id="h-review" className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 6 — Review Cycle (Every 3 Months)</h2>
                        <p className="mb-4">Your profile is not a set-it-and-forget-it page. The best professionals review and update their LinkedIn every quarter.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { label: 'Update skills', desc: 'Add new tools and remove outdated ones' },
                                { label: 'Add achievements', desc: 'New metrics, projects, or certifications' },
                                { label: 'Refresh headline', desc: 'Align with current career direction' },
                                { label: 'Improve About', desc: 'Sharpen positioning and add recent results' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.label}</p>
                                    <p className="text-xs text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4">Use <Link href="/" className="text-[#0A66C2] hover:underline">LinkedInRank</Link> every time you update your profile to track your progress and see which sections improved.</p>
                    </section>

                    {/* Golden Rule */}
                    <section>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6">
                            <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">The Golden Rule of LinkedIn Optimization</h2>
                            <p className="text-sm text-[#4B5563] mb-3">LinkedIn is a <strong className="text-[#0A0F1C]">search engine + trust platform</strong>. Every optimization should serve two goals:</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 bg-white rounded-lg p-3 border border-gray-100">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">1. Being found</p>
                                    <p className="text-xs text-[#4B5563]">Right keywords, clear titles, optimized skills</p>
                                </div>
                                <div className="flex-1 bg-white rounded-lg p-3 border border-gray-100">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">2. Being trusted</p>
                                    <p className="text-xs text-[#4B5563]">Metrics, consistency, proof of work, clear narrative</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Audience-Specific Guides */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Optimization by Career Stage</h2>
                        <p className="mb-4">Different career stages require different optimization strategies. We have created specialized guides for each:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { title: 'Students & Freshers', href: '/for-students', desc: 'Projects as experience, headline positioning, building from zero' },
                                { title: 'Job Seekers', href: '/for-jobseekers', desc: 'Keyword strategy, recruiter visibility, metrics-driven experience' },
                                { title: 'Founders & Entrepreneurs', href: '/for-founders', desc: 'Authority building, traction showcasing, investor credibility' },
                                { title: 'Personal Brand Builders', href: '/linkedin-personal-branding', desc: 'Niche ownership, content strategy, audience building' },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="block bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow no-underline">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</p>
                                    <p className="text-xs text-[#4B5563]">{item.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'How long does it take to optimize a LinkedIn profile?', a: 'A thorough optimization takes 2–3 hours for the initial setup. After that, quarterly reviews of 30–60 minutes keep your profile current. Focus on headline and About section first — they have the highest impact.' },
                                { q: 'What is the most important section to optimize?', a: 'The headline. It appears in every search result, connection request, and comment. A clear, keyword-rich headline directly impacts how often recruiters find you.' },
                                { q: 'Should I use LinkedIn Premium for optimization?', a: 'Premium is not required. The most impactful optimizations — headline, About, experience, skills — are available on free accounts. Premium adds InMail and profile viewer insights, which help with networking but not profile quality.' },
                                { q: 'How do I know if my profile is optimized?', a: 'Upload your LinkedIn PDF to LinkedInRank for a free score across 30+ signals. You will get a score out of 100 with specific recommendations for each section.' },
                                { q: 'Do keywords really matter on LinkedIn?', a: 'Yes. LinkedIn search works similarly to Google. Recruiters search using job titles, skills, and industry terms. If those keywords are not in your profile, you will not appear in search results regardless of your qualifications.' },
                                { q: 'How often should I update my LinkedIn profile?', a: 'Every 3 months at minimum. Update after any role change, new certification, major project, or career direction shift. Regular updates signal to the algorithm that your profile is active.' },
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
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">See how optimized your profile is</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF and get a free score with personalized recommendations for every section.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Check Your LinkedIn Score — It&apos;s Free</Link>
                    </div>

                    {/* Complete Guide Directory */}
                    <div className="pt-10 border-t border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-[#0A0F1C]">All LinkedIn Guides</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                                <thead>
                                    <tr className="bg-[#F8FAFC]">
                                        <th className="text-left text-xs font-bold text-[#6B7280] uppercase tracking-wider py-3 px-4 rounded-l-lg">Guide</th>
                                        <th className="text-left text-xs font-bold text-[#6B7280] uppercase tracking-wider py-3 px-4">Category</th>
                                        <th className="text-left text-xs font-bold text-[#6B7280] uppercase tracking-wider py-3 px-4 rounded-r-lg">Best For</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'LinkedIn Headline Guide', href: '/linkedin-headline-guide', cat: 'Profile Section', audience: 'Everyone' },
                                        { name: 'LinkedIn About Section Guide', href: '/linkedin-about-guide', cat: 'Profile Section', audience: 'Everyone' },
                                        { name: 'LinkedIn Keywords Guide', href: '/linkedin-keywords-guide', cat: 'SEO & Search', audience: 'Job seekers' },
                                        { name: 'Profile Photo Guide', href: '/linkedin-profile-photo-guide', cat: 'Profile Section', audience: 'Everyone' },
                                        { name: 'LinkedIn Profile Checklist', href: '/linkedin-profile-checklist', cat: 'Tool', audience: 'Everyone' },
                                        { name: 'Personal Branding on LinkedIn', href: '/linkedin-personal-branding', cat: 'Strategy', audience: 'Professionals' },
                                        { name: 'LinkedIn Content Strategy', href: '/linkedin-content-strategy', cat: 'Strategy', audience: 'Thought leaders' },
                                        { name: 'Viral Post Formulas', href: '/viral-post-formulas', cat: 'Strategy', audience: 'Content creators' },
                                        { name: 'Recruiter Psychology', href: '/recruiter-psychology', cat: 'Career', audience: 'Job seekers' },
                                        { name: 'Get Noticed by Recruiters', href: '/get-noticed-recruiters', cat: 'Career', audience: 'Job seekers' },
                                        { name: 'Top 1% LinkedIn Profiles', href: '/top-1-percent-profiles', cat: 'Inspiration', audience: 'Everyone' },
                                        { name: 'Top 10 LinkedIn Mistakes', href: '/linkedin-mistakes', cat: 'Improvement', audience: 'Everyone' },
                                        { name: 'LinkedIn vs Resume', href: '/linkedin-resume-vs-profile', cat: 'Career', audience: 'Job seekers' },
                                        { name: 'LinkedInRank vs Manual Audits', href: '/linkedinrank-vs-manual-audits', cat: 'Comparison', audience: 'Everyone' },
                                        { name: 'Compare LinkedIn Tools', href: '/compare-linkedin-review-tools', cat: 'Comparison', audience: 'Everyone' },
                                        { name: 'For Students', href: '/for-students', cat: 'Audience', audience: 'Students' },
                                        { name: 'For Job Seekers', href: '/for-jobseekers', cat: 'Audience', audience: 'Job seekers' },
                                        { name: 'For Founders', href: '/for-founders', cat: 'Audience', audience: 'Entrepreneurs' },
                                        { name: 'Headlines: Software Engineers', href: '/linkedin-headline-software-engineers', cat: 'Role-Specific', audience: 'Engineers' },
                                        { name: 'Headlines: Product Managers', href: '/linkedin-headline-product-managers', cat: 'Role-Specific', audience: 'PMs' },
                                        { name: 'Headlines: Data Scientists', href: '/linkedin-headline-data-scientists', cat: 'Role-Specific', audience: 'Data pros' },
                                        { name: 'Headlines: Marketers', href: '/linkedin-headline-marketers', cat: 'Role-Specific', audience: 'Marketers' },
                                        { name: 'Headlines: Designers', href: '/linkedin-headline-designers', cat: 'Role-Specific', audience: 'Designers' },
                                        { name: 'Headlines: MBA Graduates', href: '/linkedin-headline-mba', cat: 'Role-Specific', audience: 'MBA grads' },
                                        { name: 'Headlines: Sales Professionals', href: '/linkedin-headline-sales', cat: 'Role-Specific', audience: 'Sales' },
                                        { name: 'Headlines: Consultants', href: '/linkedin-headline-consultants', cat: 'Role-Specific', audience: 'Consultants' },
                                        { name: 'Headlines: HR Professionals', href: '/linkedin-headline-hr', cat: 'Role-Specific', audience: 'HR' },
                                        { name: 'Headlines: Finance', href: '/linkedin-headline-finance', cat: 'Role-Specific', audience: 'Finance' },
                                        { name: 'Headlines: Healthcare', href: '/linkedin-headline-healthcare', cat: 'Role-Specific', audience: 'Healthcare' },
                                        { name: 'Headlines: Teachers', href: '/linkedin-headline-teachers', cat: 'Role-Specific', audience: 'Educators' },
                                        { name: 'AI Prompts — All Sections', href: '/ai-prompts-linkedin', cat: 'AI Prompts', audience: 'Everyone' },
                                        { name: 'AI Prompts: Headlines', href: '/ai-prompts-linkedin-headline', cat: 'AI Prompts', audience: 'Everyone' },
                                        { name: 'AI Prompts: About Section', href: '/ai-prompts-linkedin-about', cat: 'AI Prompts', audience: 'Everyone' },
                                        { name: 'AI Prompts: Experience', href: '/ai-prompts-linkedin-experience', cat: 'AI Prompts', audience: 'Everyone' },
                                        { name: 'AI Prompts: Skills', href: '/ai-prompts-linkedin-skills', cat: 'AI Prompts', audience: 'Everyone' },
                                        { name: 'AI Prompts: Summary & Positioning', href: '/ai-prompts-linkedin-summary', cat: 'AI Prompts', audience: 'Everyone' },
                                    ].map((guide, i) => (
                                        <tr key={i} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'} hover:bg-[#EFF6FF] transition-colors`}>
                                            <td className="py-2.5 px-4"><Link href={guide.href} className="text-[#0A66C2] font-medium no-underline hover:underline">{guide.name}</Link></td>
                                            <td className="py-2.5 px-4"><span className="text-xs text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded-full">{guide.cat}</span></td>
                                            <td className="py-2.5 px-4 text-[#4B5563]">{guide.audience}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                        <Link href="/for-students" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">For Students</Link>
                        <Link href="/faq" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">FAQ</Link>
                    </nav>
                </div>
            </footer>
        </main>
    )
}
