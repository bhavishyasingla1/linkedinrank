import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'

export const metadata: Metadata = {
    title: 'LinkedIn Profile vs Resume | Key Differences & How to Optimize Both (2026)',
    description: 'Understand the key differences between a LinkedIn profile and a resume in 2026. What to include on each, how they complement each other, and common mistakes. Free scoring with LinkedInRank.',
    keywords: 'linkedin vs resume 2026, linkedin profile vs resume, resume vs linkedin, linkedin resume differences, linkedin profile tips, should my linkedin match my resume, linkedin and resume comparison',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-resume-vs-profile' },
    openGraph: {
        title: 'LinkedIn Profile vs Resume | Key Differences',
        description: 'What to include on each, how they complement each other, and common mistakes to avoid.',
        url: 'https://linkedinrank.com/linkedin-resume-vs-profile',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'LinkedIn Profile vs Resume | Key Differences and How to Optimize Both',
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
            <SiteHeader />

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
                                    { aspect: 'Activity', resume: 'Static document', linkedin: 'Dynamic | posts, comments, engagement' },
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
                                { q: 'Which is more important for job search?', a: 'LinkedIn is more important for being discovered. Your resume is more important for the application stage. Both need to be strong | LinkedIn gets you found, the resume gets you the interview.' },
                                { q: 'Do I need different keywords for LinkedIn vs resume?', a: 'LinkedIn keywords should be broader (industry-wide terms). Resume keywords should match the specific job description. There will be significant overlap, but the emphasis differs.' },
                                { q: 'Can LinkedInRank help me optimize my LinkedIn differently from my resume?', a: 'Yes. LinkedInRank scores LinkedIn-specific signals: headline positioning, About section quality, skills relevance, and profile completeness | elements that do not exist on a resume.' },
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
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It's Free</Link>
                    </div>

                    {/* Related Guides */}
                    <RelatedPages currentSlug="linkedin-resume-vs-profile" />
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
