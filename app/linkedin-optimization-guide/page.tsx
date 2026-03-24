import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'
import { guidePageJsonLd, howToJsonLd } from '@/lib/jsonLd'

export const metadata: Metadata = {
    title: 'LinkedIn Profile Optimization (2026): 47 Expert Tips That Get Interviews',
    description: 'Score 85+ on LinkedIn: 47 optimization tips from headline to skills. Get recruiter messages in 7 days. Free score checker included.',
    keywords: 'linkedin optimization, linkedin profile optimization, optimize linkedin profile, linkedin optimization guide 2026, linkedin profile improvement, linkedin optimization tool free, linkedin profile makeover, linkedin profile audit, linkedin profile optimization tips, best linkedin optimization guide',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-optimization-guide' },
    openGraph: {
        title: 'Complete LinkedIn Profile Optimization Guide 2026',
        description: 'Step-by-step strategies for every section of your LinkedIn profile. Free score checker included.',
        url: 'https://linkedinrank.com/linkedin-optimization-guide',
    },
}

const howToSchema = howToJsonLd({
    name: 'How to Optimize Your LinkedIn Profile',
    description: 'Step-by-step guide to optimizing your LinkedIn profile for maximum recruiter visibility and job opportunities',
    totalTime: 'PT2H',
    steps: [
        {
            name: 'Optimize Your Headline',
            text: 'Write a keyword-rich headline under 120 characters that includes your role, value proposition, and 2-3 searchable keywords.',
            directions: [
                'Open your LinkedIn profile and click the edit icon on your headline',
                'Use the formula: [Role] | [Value Proposition] | [Key Skills]',
                'Include 2-3 keywords recruiters search for in your industry',
                'Keep it under 120 characters for full visibility in search results',
            ],
        },
        {
            name: 'Craft Your About Section',
            text: 'Write a compelling 150-300 word About section in first person with a hook, proof points, and clear CTA.',
            directions: [
                'Start with a hook that creates curiosity or establishes credibility',
                'Share 2-3 specific achievements with numbers',
                'Include 3-5 keywords naturally throughout',
                'End with a clear call-to-action for recruiters or connections',
            ],
        },
        {
            name: 'Rewrite Experience Descriptions',
            text: 'Transform job descriptions into achievement-focused bullet points using the XYZ formula.',
            directions: [
                'Edit each role to include 3-5 bullet points',
                'Use the XYZ formula: Accomplished [X] as measured by [Y] by doing [Z]',
                'Start each bullet with a strong action verb',
                'Include specific metrics and results',
            ],
        },
        {
            name: 'Optimize Skills Section',
            text: 'Add and prioritize 15-25 relevant skills, pinning your top 3 most important skills.',
            directions: [
                'Add skills recruiters search for in your industry',
                'Pin your top 3 most valuable skills to the top',
                'Ensure skills match your headline and experience descriptions',
                'Request endorsements from colleagues for key skills',
            ],
        },
        {
            name: 'Complete All Profile Sections',
            text: 'Fill out education, certifications, volunteering, and additional sections for 100% profile completeness.',
            directions: [
                'Add all degrees, certifications, and relevant courses',
                'Include volunteering and projects if applicable',
                'Add a professional profile photo and background image',
                'Enable Creator mode if you post content regularly',
            ],
        },
        {
            name: 'Test and Iterate',
            text: 'Upload your LinkedIn PDF to LinkedInRank to get your score and specific improvement recommendations.',
            directions: [
                'Export your LinkedIn profile as PDF',
                'Upload to LinkedInRank for instant scoring',
                'Review the 30+ signal analysis and recommendations',
                'Make improvements and re-test to track score increase',
            ],
        },
    ],
})

const pageSchema = guidePageJsonLd({
    title: 'Complete LinkedIn Profile Optimization Guide 2026',
    description: 'The definitive guide to optimizing your LinkedIn profile. Step-by-step strategies for headline, about section, experience, skills, keywords, and personal branding.',
    url: 'https://linkedinrank.com/linkedin-optimization-guide',
    datePublished: '2025-01-01',
    dateModified: '2026-03-24',
    breadcrumbs: [
        { name: 'Home', url: 'https://linkedinrank.com' },
        { name: 'LinkedIn Optimization Guide', url: 'https://linkedinrank.com/linkedin-optimization-guide' },
    ],
    faqs: [
        { question: 'How long does it take to optimize a LinkedIn profile?', answer: 'A thorough optimization takes 2–3 hours for the initial setup. After that, quarterly reviews of 30–60 minutes keep your profile current. Focus on headline and About section first — they have the highest impact.' },
        { question: 'What is the most important section to optimize?', answer: 'The headline. It appears in every search result, connection request, and comment. A clear, keyword-rich headline directly impacts how often recruiters find you.' },
        { question: 'Should I use LinkedIn Premium for optimization?', answer: 'Premium is not required. The most impactful optimizations — headline, About, experience, skills — are available on free accounts. Premium adds InMail and profile viewer insights, which help with networking but not profile quality.' },
        { question: 'How do I know if my profile is optimized?', answer: 'Upload your LinkedIn PDF to LinkedInRank for a free score across 30+ signals. You will get a score out of 100 with specific recommendations for each section.' },
        { question: 'Do keywords really matter on LinkedIn?', answer: 'Yes. LinkedIn search works similarly to Google. Recruiters search using job titles, skills, and industry terms. If those keywords are not in your profile, you will not appear in search results regardless of your qualifications.' },
        { question: 'How often should I update my LinkedIn profile?', answer: 'Every 3 months at minimum. Update after any role change, new certification, major project, or career direction shift. Regular updates signal to the algorithm that your profile is active.' },
    ],
})

export default function LinkedInOptimizationGuidePage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <SiteHeader />

            {/* Hero header */}
            <div className="bg-gradient-to-b from-[#F8FAFC] to-white border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-6 pt-6 pb-10">
                    <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5 flex-wrap mb-8">
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-[#0A0F1C] font-medium">Optimization Guide</span>
                    </nav>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-[#EFF6FF] text-[#0A66C2] border border-[#DBEAFE]">Pillar Guide</span>
                        <span className="text-[11px] text-[#6B7280] flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            15 min read
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight tracking-tight mb-5">Complete LinkedIn Profile Optimization Guide</h1>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed max-w-2xl">
                        A recruiter opens your LinkedIn profile. They scan it for about 7 seconds. If they can&apos;t immediately see your value, they move on.
                    </p>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed max-w-2xl mt-3">
                        This guide covers every section of your profile with actionable strategies — whether you are a student, job seeker, founder, or experienced professional. Each recommendation is based on the same <strong className="text-[#0A0F1C]">30+ signals</strong> that <Link href="/" className="text-[#0A66C2] hover:underline">LinkedInRank</Link> uses to score profiles.
                    </p>
                </div>
            </div>

            <article className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
                {/* Table of Contents */}
                <nav className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5 sm:p-6 mb-12">
                    <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-4">In This Guide</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                            { label: 'Foundation: Photo, Headline, About', anchor: '#foundation', step: '01' },
                            { label: 'Building Credibility', anchor: '#credibility', step: '02' },
                            { label: 'Discoverability & Keywords', anchor: '#discoverability', step: '03' },
                            { label: 'Networking Strategy', anchor: '#networking', step: '04' },
                            { label: 'Content & Visibility', anchor: '#content', step: '05' },
                            { label: 'Review Cycle', anchor: '#review', step: '06' },
                        ].map((item, i) => (
                            <a key={i} href={item.anchor} className="flex items-start gap-2.5 text-sm text-[#0A0F1C] hover:text-[#0A66C2] no-underline transition-colors">
                                <span className="text-[11px] font-bold text-[#D1D5DB] tabular-nums mt-0.5 shrink-0">{item.step}</span>
                                {item.label}
                            </a>
                        ))}
                    </div>
                </nav>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    {/* Step 1 */}
                    <section id="foundation" aria-labelledby="h-foundation" className="scroll-mt-24">
                        <h2 id="h-foundation" className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 1 | Foundation: Photo, Headline, About, Experience, Skills</h2>
                        <p className="mb-4">These five elements form the core of every LinkedIn profile. Recruiters scan them in under 30 seconds. If any one is weak, the entire profile loses credibility.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">Profile Photo</h3>
                        <p className="mb-4">Use a clear, professional headshot with a neutral background. Your face should take up 60–70% of the frame. Avoid group photos, heavy filters, or casual selfies. A strong photo increases profile views by up to 21x according to LinkedIn data. Read our <Link href="/linkedin-profile-photo-guide" className="text-[#0A66C2] hover:underline">complete profile photo guide</Link> for detailed tips.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">Headline</h3>
                        <p className="mb-4">Your headline is the most important line on your profile. It appears in search results, connection requests, and every comment you leave. The best headlines follow a clear formula: <strong className="text-[#0A0F1C]">Role + Niche + Value</strong>. For example: &ldquo;Frontend Developer | React & Performance Optimization | Building Fast UIs&rdquo;. Avoid vague titles like &ldquo;Student&rdquo; or &ldquo;Seeking Opportunities.&rdquo; See our <Link href="/linkedin-headline-guide" className="text-[#0A66C2] hover:underline">headline writing guide</Link> for 50+ examples.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">About Section</h3>
                        <p className="mb-4">Your About section should answer three questions: What do you do? Who do you help? What results do you create? Structure it in 3–4 short paragraphs. Include 2–3 measurable achievements. Write in first person | it builds trust. Our <Link href="/linkedin-about-guide" className="text-[#0A66C2] hover:underline">About section guide</Link> has templates for every career stage.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">Experience</h3>
                        <p className="mb-4">Each role should have 3–5 bullet points using action verbs and measurable outcomes. Instead of &ldquo;Managed social media,&rdquo; write &ldquo;Grew Instagram from 2K to 10K followers in 4 months through data-driven content strategy.&rdquo; Numbers build credibility and make your profile recruiter-ready.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">Skills</h3>
                        <p className="mb-4">Add 15–25 relevant skills. Your top 3 pinned skills should match your target role exactly | recruiters use skill filters in LinkedIn search. Include a mix of technical skills, tools, and domain expertise. Read our <Link href="/linkedin-keywords-guide" className="text-[#0A66C2] hover:underline">keywords guide</Link> to understand how skills impact search visibility.</p>
                    </section>

                    {/* Step 2 */}
                    <section id="credibility" aria-labelledby="h-credibility" className="scroll-mt-24">
                        <h2 id="h-credibility" className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 2 | Building Credibility</h2>
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
                    <section id="discoverability" aria-labelledby="h-discoverability" className="scroll-mt-24">
                        <h2 id="h-discoverability" className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 3 | Discoverability & Keywords</h2>
                        <p className="mb-4">LinkedIn is a search engine. If the right keywords are not in your profile, recruiters cannot find you | no matter how qualified you are.</p>
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
                    <section id="networking" aria-labelledby="h-networking" className="scroll-mt-24">
                        <h2 id="h-networking" className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 4 | Networking Strategy</h2>
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
                    <section id="content" aria-labelledby="h-content" className="scroll-mt-24">
                        <h2 id="h-content" className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 5 | Content & Visibility</h2>
                        <p className="mb-4">Posting content on LinkedIn signals seriousness to recruiters and builds authority in your niche. You do not need to post daily | consistency matters more than frequency.</p>
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
                    <section id="review" aria-labelledby="h-review" className="scroll-mt-24">
                        <h2 id="h-review" className="text-2xl font-bold text-[#0A0F1C] mb-6">Step 6 | Review Cycle (Every 3 Months)</h2>
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
                        <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-1">FAQ</p>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-3">
                            {[
                                { q: 'How long does it take to optimize a LinkedIn profile?', a: 'A thorough optimization takes 2–3 hours for the initial setup. After that, quarterly reviews of 30–60 minutes keep your profile current. Focus on headline and About section first | they have the highest impact.' },
                                { q: 'What is the most important section to optimize?', a: 'The headline. It appears in every search result, connection request, and comment. A clear, keyword-rich headline directly impacts how often recruiters find you.' },
                                { q: 'Should I use LinkedIn Premium for optimization?', a: 'Premium is not required. The most impactful optimizations | headline, About, experience, skills | are available on free accounts. Premium adds InMail and profile viewer insights, which help with networking but not profile quality.' },
                                { q: 'How do I know if my profile is optimized?', a: 'Upload your LinkedIn PDF to LinkedInRank for a free score across 30+ signals. You will get a score out of 100 with specific recommendations for each section.' },
                                { q: 'Do keywords really matter on LinkedIn?', a: 'Yes. LinkedIn search works similarly to Google. Recruiters search using job titles, skills, and industry terms. If those keywords are not in your profile, you will not appear in search results regardless of your qualifications.' },
                                { q: 'How often should I update my LinkedIn profile?', a: 'Every 3 months at minimum. Update after any role change, new certification, major project, or career direction shift. Regular updates signal to the algorithm that your profile is active.' },
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

                    {/* Common Mistakes */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Common LinkedIn Profile Mistakes to Avoid</h2>
                        <p className="mb-4">After analyzing thousands of profiles, these are the most frequent optimization mistakes we see:</p>
                        <div className="space-y-3 mb-6">
                            {[
                                { mistake: 'Generic headline like "Open to Work" or "Student"', fix: 'Use Role + Niche + Value formula. Example: "Frontend Developer | React & Performance | Building Fast UIs"' },
                                { mistake: 'Empty or one-sentence About section', fix: 'Write 150–300 words: Hook → Background → Achievements → CTA. Include 3–5 keywords naturally.' },
                                { mistake: 'Job descriptions instead of achievements', fix: 'Replace "Managed team" with "Led 8-person team to deliver 3 product launches, reducing time-to-market by 40%."' },
                                { mistake: 'No profile photo or casual selfie', fix: 'Use a professional headshot with neutral background. Face should fill 60–70% of the frame.' },
                                { mistake: 'Too few or irrelevant skills listed', fix: 'Add 15–25 role-relevant skills. Pin top 3 most searchable skills. Remove outdated tools.' },
                                { mistake: 'Ignoring the Featured section', fix: 'Add 2–3 portfolio pieces, case studies, or published articles. Visual proof builds instant credibility.' },
                                { mistake: 'No keywords in headline or About', fix: 'Include exact terms recruiters search for: job titles, tools, certifications, and industry terms.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#FEF2F2] border border-red-100 rounded-xl p-4">
                                    <p className="text-sm font-bold text-red-700 mb-1">❌ {item.mistake}</p>
                                    <p className="text-sm text-[#4B5563]">✅ <strong>Fix:</strong> {item.fix}</p>
                                </div>
                            ))}
                        </div>
                        <p>For a complete deep dive, read our <Link href="/linkedin-mistakes" className="text-[#0A66C2] hover:underline">10 LinkedIn Mistakes Costing You Interviews</Link> guide.</p>
                    </section>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-[#0A66C2] to-[#084E96] rounded-2xl p-8 sm:p-10 text-center shadow-[0_4px_20px_rgba(10,102,194,0.2)]">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                        </div>
                        <h2 className="text-lg font-bold text-white mb-2">See how optimized your profile is</h2>
                        <p className="text-sm text-blue-100/80 mb-5 max-w-md mx-auto">Upload your LinkedIn PDF and get a free score with personalized recommendations for every section.</p>
                        <Link href="/" className="inline-block bg-white text-[#0A66C2] px-6 py-3 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors no-underline shadow-sm">Check Your LinkedIn Score</Link>
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
                                        { name: 'AI Prompts | All Sections', href: '/ai-prompts-linkedin', cat: 'AI Prompts', audience: 'Everyone' },
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

                {/* RelatedPages for programmatic internal linking */}
                <RelatedPages currentSlug="linkedin-optimization-guide" />
            </article>

            <FooterLayout />
        </main>
    )
}
