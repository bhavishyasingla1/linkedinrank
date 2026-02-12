import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'LinkedIn Profile vs Resume — Key Differences & How to Optimize Both (2026)',
    description: 'Understand the key differences between a LinkedIn profile and a resume in 2026. What to include on each, how they complement each other, and common mistakes. Free scoring with LinkedInRank.',
    keywords: 'linkedin vs resume 2026, linkedin profile vs resume, resume vs linkedin, linkedin resume differences, linkedin profile tips, should my linkedin match my resume, linkedin and resume comparison',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-resume-vs-profile' },
    openGraph: {
        title: 'LinkedIn Profile vs Resume — Key Differences',
        description: 'What to include on each, how they complement each other, and common mistakes to avoid.',
        url: 'https://linkedinrank.com/linkedin-resume-vs-profile',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'LinkedIn Profile vs Resume — Key Differences and How to Optimize Both',
            description: 'Understand the differences between your LinkedIn profile and resume. What to include in each, how they complement each other, and common mistakes.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-resume-vs-profile',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
            { '@type': 'ListItem', position: 2, name: 'Resume vs Profile', item: 'https://linkedinrank.com/linkedin-resume-vs-profile' },
        ] },
        { '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'Should my LinkedIn match my resume?', acceptedAnswer: { '@type': 'Answer', text: 'They should be consistent in job titles, dates, and companies but not identical. LinkedIn should be more conversational and include elements resumes lack: About section, Featured content, recommendations.' } },
            { '@type': 'Question', name: 'Which is more important, LinkedIn or resume?', acceptedAnswer: { '@type': 'Answer', text: 'Both serve different purposes. Your resume is for applications. LinkedIn is for being found by recruiters and building your professional brand. Over 90% of recruiters use LinkedIn to source candidates.' } },
            { '@type': 'Question', name: 'Can I put more on LinkedIn than my resume?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. LinkedIn has no page limit. Include your full career history, volunteer work, certifications, projects, publications, and recommendations. More content means more keyword matches for recruiter searches.' } },
        ] },
    ],
}

export default function LinkedInResumeVsProfilePage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader navLinks={[{ href: '/linkedin-optimization-guide', label: 'Full Guide' }]} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Comparison Guide</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">LinkedIn Profile vs Resume: Key Differences and How to Optimize Both</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Your LinkedIn profile and resume serve different purposes, reach different audiences, and should be written differently. Treating them as identical copies is one of the most common mistakes professionals make. This guide breaks down the key differences and shows you how to optimize each for maximum impact.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Side-by-Side Comparison</h2>
                        <div className="overflow-x-auto">
                            <div className="space-y-2 min-w-[300px]">
                                {[
                                    { aspect: 'Purpose', resume: 'Apply to a specific job', linkedin: 'Be discovered by multiple opportunities' },
                                    { aspect: 'Audience', resume: 'One hiring manager at a time', linkedin: 'Recruiters, clients, partners, network' },
                                    { aspect: 'Tone', resume: 'Formal, third person', linkedin: 'Conversational, first person' },
                                    { aspect: 'Length', resume: '1–2 pages', linkedin: 'No strict limit (but concise sections)' },
                                    { aspect: 'Customization', resume: 'Tailored per application', linkedin: 'One version for all audiences' },
                                    { aspect: 'Content', resume: 'Only relevant experience', linkedin: 'Full career story + personality' },
                                    { aspect: 'Keywords', resume: 'Match the job description', linkedin: 'Match industry-wide search terms' },
                                    { aspect: 'Multimedia', resume: 'Text only', linkedin: 'Links, media, Featured section' },
                                    { aspect: 'Social proof', resume: 'References on request', linkedin: 'Recommendations, endorsements visible' },
                                    { aspect: 'Activity', resume: 'Static document', linkedin: 'Dynamic — posts, comments, engagement' },
                                ].map((item, i) => (
                                    <div key={i} className="grid grid-cols-3 gap-2 bg-[#F8FAFC] border border-gray-200 rounded-lg p-3">
                                        <p className="text-xs font-bold text-[#0A0F1C]">{item.aspect}</p>
                                        <p className="text-xs text-[#4B5563]">{item.resume}</p>
                                        <p className="text-xs text-[#0A66C2]">{item.linkedin}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">What LinkedIn Has That Resumes Do Not</h2>
                        <div className="space-y-3">
                            {[
                                { feature: 'About section', desc: 'Your personal narrative and professional story. Resumes have a summary line; LinkedIn gives you 2,600 characters to build connection.', link: '/linkedin-about-guide' },
                                { feature: 'Featured section', desc: 'Showcase portfolio work, media mentions, top posts, and case studies visually. Resumes cannot embed multimedia.', link: '/linkedin-optimization-guide' },
                                { feature: 'Recommendations', desc: 'Public testimonials from colleagues and managers. More credible than "references available upon request."', link: '/top-1-percent-profiles' },
                                { feature: 'Activity feed', desc: 'Your posts and comments demonstrate expertise and engagement. There is no resume equivalent.', link: '/linkedin-content-strategy' },
                                { feature: 'Skills with endorsements', desc: 'Validated skills with peer endorsements add credibility that a bullet-point skills list cannot match.', link: '/linkedin-keywords-guide' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.feature}</p>
                                    <p className="text-sm text-[#4B5563] mb-1">{item.desc}</p>
                                    <Link href={item.link} className="text-xs text-[#0A66C2] hover:underline">Learn more →</Link>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Should My LinkedIn Match My Resume Exactly?</h2>
                        <p className="mb-4"><strong className="text-[#0A0F1C]">No.</strong> They should be consistent but not identical. Here is the key distinction:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-2">Should match</p>
                                <ul className="space-y-1 text-xs text-[#4B5563]">
                                    <li>&#8226; Job titles and company names</li>
                                    <li>&#8226; Employment dates (approximately)</li>
                                    <li>&#8226; Core skills and qualifications</li>
                                    <li>&#8226; Education details</li>
                                </ul>
                            </div>
                            <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-4">
                                <p className="text-[10px] font-bold text-[#0A66C2] uppercase tracking-wider mb-2">Can differ</p>
                                <ul className="space-y-1 text-xs text-[#4B5563]">
                                    <li>&#8226; Tone and writing style (LinkedIn is more personal)</li>
                                    <li>&#8226; Amount of detail per role</li>
                                    <li>&#8226; Personal narrative and career story</li>
                                    <li>&#8226; Older roles (LinkedIn can include more history)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">How Recruiters Use Both</h2>
                        <p className="mb-4">Understanding the recruiter workflow helps you optimize both documents:</p>
                        <div className="space-y-2">
                            {[
                                { step: '1', text: 'Recruiter searches LinkedIn for candidates using keywords and filters' },
                                { step: '2', text: 'Scans your LinkedIn profile for 10–30 seconds to decide if you fit' },
                                { step: '3', text: 'If interested, requests your resume for detailed role-specific review' },
                                { step: '4', text: 'Compares resume against the specific job requirements' },
                                { step: '5', text: 'May check LinkedIn again for recommendations and activity' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                    <span className="w-5 h-5 rounded-md bg-[#0A66C2] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{item.step}</span>
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4">For more on how recruiters evaluate profiles, read our <Link href="/recruiter-psychology" className="text-[#0A66C2] hover:underline">Recruiter Psychology Guide</Link>.</p>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'Can I copy my resume into LinkedIn?', a: 'You can use it as a starting point, but adapt the tone to first person and add LinkedIn-specific elements: About section narrative, Featured content, skills with endorsements, and a more conversational style.' },
                                { q: 'Should I include all jobs on LinkedIn?', a: 'Include all relevant roles. Unlike a resume which should be 1–2 pages, LinkedIn has no strict length limit. Older or less relevant roles can have shorter descriptions.' },
                                { q: 'Which is more important for job search?', a: 'LinkedIn is more important for being discovered. Your resume is more important for the application stage. Both need to be strong — LinkedIn gets you found, the resume gets you the interview.' },
                                { q: 'Do I need different keywords for LinkedIn vs resume?', a: 'LinkedIn keywords should be broader (industry-wide terms). Resume keywords should match the specific job description. There will be significant overlap, but the emphasis differs.' },
                                { q: 'Can LinkedInRank help me optimize my LinkedIn differently from my resume?', a: 'Yes. LinkedInRank scores LinkedIn-specific signals: headline positioning, About section quality, skills relevance, and profile completeness — elements that do not exist on a resume.' },
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
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Optimize your LinkedIn profile</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF and get a free score with section-by-section recommendations.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile — It's Free</Link>
                    </div>

                    {/* Related Guides */}
                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'About Section Guide', href: '/linkedin-about-guide' },
                                { label: 'Keywords Guide', href: '/linkedin-keywords-guide' },
                                { label: 'Recruiter Psychology', href: '/recruiter-psychology' },
                                { label: 'For Job Seekers', href: '/for-jobseekers' },
                                { label: 'Get Noticed by Recruiters', href: '/get-noticed-recruiters' },
                                { label: 'Profile Checklist', href: '/linkedin-profile-checklist' },
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
                        <Link href="/linkedin-optimization-guide" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Optimization Guide</Link>
                        <Link href="/get-noticed-recruiters" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Get Noticed</Link>
                        <Link href="/faq" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">FAQ</Link>
                    </nav>
                </div>
            </footer>
        </main>
    )
}
