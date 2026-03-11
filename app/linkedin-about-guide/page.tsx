import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'

export const metadata: Metadata = {
    title: 'LinkedIn About Section Guide | How to Write a Powerful Summary (2026)',
    description: 'Write a LinkedIn About section that converts visitors into opportunities. Templates, real examples, and common mistakes to avoid for students, job seekers, founders, and professionals. Free scoring with LinkedInRank.',
    keywords: 'linkedin about section, linkedin summary examples, how to write linkedin summary, linkedin bio examples, linkedin about section examples 2026, linkedin summary for freshers, linkedin about section tips, linkedin summary template, linkedin about me examples',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-about-guide' },
    openGraph: {
        title: 'LinkedIn About Section Guide | How to Write a Powerful Summary',
        description: 'Templates, real examples, and tips to write a LinkedIn About section that converts visitors into opportunities.',
        url: 'https://linkedinrank.com/linkedin-about-guide',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'How to Write a LinkedIn About Section That Converts',
            description: 'Write a LinkedIn About section that converts profile visitors into opportunities. Templates for students, job seekers, founders, and professionals.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-about-guide',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
                { '@type': 'ListItem', position: 2, name: 'About Section Guide', item: 'https://linkedinrank.com/linkedin-about-guide' },
            ],
        },
        {
            '@type': 'FAQPage',
            mainEntity: [
                { '@type': 'Question', name: 'How long should my LinkedIn About section be?', acceptedAnswer: { '@type': 'Answer', text: 'Aim for 800–1,500 characters (roughly 150–250 words). Long enough to be substantive, short enough to be read. The maximum is 2,600 characters.' } },
                { '@type': 'Question', name: 'Should I include a call to action?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. End with a clear next step: "Reach out if you are hiring for X" or "Connect with me to discuss Y." It converts passive viewers into active contacts.' } },
                { '@type': 'Question', name: 'Can I use bullet points in the About section?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but sparingly. Use them for listing key skills or achievements. The main body should be conversational paragraphs.' } },
                { '@type': 'Question', name: 'How is the About section different from a resume summary?', acceptedAnswer: { '@type': 'Answer', text: 'A resume summary is formal and backward-looking. Your LinkedIn About should be conversational, forward-looking, and include personality.' } },
                { '@type': 'Question', name: 'What if I have no work experience for the About section?', acceptedAnswer: { '@type': 'Answer', text: 'Focus on what you are learning, projects you have built, skills you are developing, and where you want to go.' } },
            ],
        },
    ],
}

export default function LinkedInAboutGuidePage() {
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
                        <span className="text-[#0A0F1C] font-medium">About Section Guide</span>
                    </nav>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-[#EFF6FF] text-[#0A66C2] border border-[#DBEAFE]">Guide</span>
                        <span className="text-[11px] text-[#6B7280] flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            10 min read
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight tracking-tight mb-5">How to Write a LinkedIn About Section That Converts</h1>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed max-w-2xl">
                        Your About section is where profile visitors decide whether to connect, message, or move on. LinkedIn gives you 2,600 characters | but only the first 300 are visible before the &ldquo;see more&rdquo; fold. This guide covers the exact structure, templates for every career stage, and the mistakes that cost you opportunities.
                    </p>
                </div>
            </div>

            <article className="max-w-3xl mx-auto px-6 py-10 sm:py-14">

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The 3-Part About Section Formula</h2>
                        <p className="mb-4">Every effective LinkedIn About section answers three questions in this order:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                            {[
                                { num: '1', q: 'Who are you?', detail: 'Your role, expertise, and professional identity' },
                                { num: '2', q: 'What do you do?', detail: 'Your skills, focus areas, and current work' },
                                { num: '3', q: 'Where are you going?', detail: 'Your career direction and what you are looking for' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4 text-center">
                                    <span className="w-8 h-8 rounded-full bg-[#0A66C2] text-white text-sm font-bold flex items-center justify-center mx-auto mb-2">{item.num}</span>
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.q}</p>
                                    <p className="text-xs text-[#6B7280]">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                        <p>Write in first person | it builds trust and feels personal. Keep paragraphs to 2–3 sentences maximum. Use line breaks between sections for readability. The first 300 characters must hook the reader because that is all they see before clicking &ldquo;see more.&rdquo;</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">About Section Templates by Career Stage</h2>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">For Students & Freshers</h3>
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)] mb-6">
                            <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-wider mb-3">Template</p>
                            <div className="text-sm text-[#4B5563] space-y-3">
                                <p><strong className="text-[#0A0F1C]">Paragraph 1 | Current focus:</strong> I am a [Year] [Major] student at [University], focused on [area of interest]. I am currently building skills in [tool/technology 1], [tool/technology 2], and [tool/technology 3].</p>
                                <p><strong className="text-[#0A0F1C]">Paragraph 2 | Experience & projects:</strong> Through [internship/project/club], I have worked on [specific project] where I [specific contribution with result]. I also [another relevant experience].</p>
                                <p><strong className="text-[#0A0F1C]">Paragraph 3 | Direction:</strong> I am looking for opportunities in [target role/industry] where I can apply my skills in [specific area] and contribute to [type of work].</p>
                            </div>
                        </div>
                        <p className="text-sm mb-6">More student-specific strategies in our <Link href="/linkedin-profile-for-students" className="text-[#0A66C2] hover:underline">LinkedIn Guide for Students</Link>.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">For Job Seekers</h3>
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)] mb-6">
                            <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-wider mb-3">Template</p>
                            <div className="text-sm text-[#4B5563] space-y-3">
                                <p><strong className="text-[#0A0F1C]">Paragraph 1 | What you do:</strong> I am a [Role] with [X years] of experience in [industry/niche]. I specialize in [skill 1], [skill 2], and [skill 3].</p>
                                <p><strong className="text-[#0A0F1C]">Paragraph 2 | Proof:</strong> In my most recent role at [Company], I [achievement with metric]. Before that, I [another achievement with metric]. I have worked with [types of companies/clients].</p>
                                <p><strong className="text-[#0A0F1C]">Paragraph 3 | What you bring:</strong> I am currently exploring opportunities in [target area] where I can bring my expertise in [specific skills] to drive [specific outcomes].</p>
                            </div>
                        </div>
                        <p className="text-sm mb-6">Full job seeker playbook in our <Link href="/for-jobseekers" className="text-[#0A66C2] hover:underline">LinkedIn Guide for Job Seekers</Link>.</p>

                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">For Founders & Leaders</h3>
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)] mb-4">
                            <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-wider mb-3">Template</p>
                            <div className="text-sm text-[#4B5563] space-y-3">
                                <p><strong className="text-[#0A0F1C]">Paragraph 1 | Mission:</strong> I founded [Company] to solve [problem] for [audience]. We [what you do in one sentence].</p>
                                <p><strong className="text-[#0A0F1C]">Paragraph 2 | Traction:</strong> Since launching, we have [key metric: users, revenue, growth]. Our team of [size] serves [customer type] across [markets].</p>
                                <p><strong className="text-[#0A0F1C]">Paragraph 3 | Vision:</strong> I write about [topics] and am always open to conversations about [areas of interest]. Reach out if you are working on [relevant area].</p>
                            </div>
                        </div>
                        <p className="text-sm">Founder-specific strategies in our <Link href="/for-founders" className="text-[#0A66C2] hover:underline">LinkedIn Guide for Founders</Link>.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The First 300 Characters Rule</h2>
                        <p className="mb-4">LinkedIn only displays the first ~300 characters of your About section before the &ldquo;see more&rdquo; button. This means your opening lines must immediately communicate value. If the first paragraph is generic, most visitors will never click to read the rest.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                                <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2">Weak opening</p>
                                <p className="text-xs text-[#4B5563]">&ldquo;I am a passionate and motivated professional seeking new opportunities. I believe in teamwork, innovation, and making a difference.&rdquo;</p>
                            </div>
                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-2">Strong opening</p>
                                <p className="text-xs text-[#4B5563]">&ldquo;I help B2B SaaS companies increase organic traffic through SEO and content strategy. In my last role, I grew blog traffic from 10K to 100K monthly visitors in 8 months.&rdquo;</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">About Section Mistakes to Avoid</h2>
                        <div className="space-y-2">
                            {[
                                { mistake: 'Writing in third person', fix: 'Use first person (I/my) | it feels authentic and builds connection' },
                                { mistake: 'Using only buzzwords', fix: 'Replace "passionate leader" with specific achievements and metrics' },
                                { mistake: 'Writing a wall of text', fix: 'Use short paragraphs (2–3 sentences) with line breaks between them' },
                                { mistake: 'Leaving it empty', fix: 'Even 3–4 sentences is better than nothing | start with the 3-part formula above' },
                                { mistake: 'Copying your resume summary', fix: 'LinkedIn is more personal | write conversationally and add context your resume cannot' },
                                { mistake: 'No keywords', fix: 'Include role titles, skills, and industry terms naturally | recruiters search these' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-[#F8FAFC] border border-gray-200 rounded-xl p-3">
                                    <span className="text-red-500 shrink-0 mt-0.5 text-sm">✗</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C]">{item.mistake}</p>
                                        <p className="text-xs text-[#4B5563]">{item.fix}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">How LinkedInRank Scores Your About Section</h2>
                        <p className="mb-4"><Link href="/" className="text-[#0A66C2] hover:underline">LinkedInRank</Link> evaluates your About section on several signals including:</p>
                        <ul className="space-y-1.5">
                            {['Presence and length (minimum 150 characters for a score)', 'Keyword density and relevance', 'Readability and structure', 'Specificity vs. vagueness', 'Alignment with headline and experience'].map((item, i) => (
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
                                { q: 'How long should my LinkedIn About section be?', a: 'Aim for 800–1,500 characters (roughly 150–250 words). Long enough to be substantive, short enough to be read. The maximum is 2,600 characters, but most readers will not read that far.' },
                                { q: 'Should I include a call to action?', a: 'Yes. End with a clear next step: "Reach out if you are hiring for X" or "Connect with me to discuss Y." It converts passive viewers into active contacts.' },
                                { q: 'Can I use bullet points in the About section?', a: 'Yes, but sparingly. Use them for listing key skills or achievements. The main body should be conversational paragraphs | bullet-only About sections feel impersonal.' },
                                { q: 'How is the About section different from a resume summary?', a: 'A resume summary is formal and backward-looking. Your LinkedIn About should be conversational, forward-looking, and include personality. Think of it as a professional introduction at a networking event.' },
                                { q: 'What if I have no work experience for the About section?', a: 'Focus on what you are learning, projects you have built, skills you are developing, and where you want to go. Students and career changers can write compelling About sections by emphasizing direction and initiative.' },
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

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-[#0A66C2] to-[#084E96] rounded-2xl p-8 sm:p-10 text-center shadow-[0_4px_20px_rgba(10,102,194,0.2)]">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                        </div>
                        <h2 className="text-lg font-bold text-white mb-2">Get your About section scored</h2>
                        <p className="text-sm text-blue-100/80 mb-5 max-w-md mx-auto">Upload your LinkedIn PDF and see how your About section compares. Free analysis with specific improvement tips.</p>
                        <Link href="/" className="inline-block bg-white text-[#0A66C2] px-6 py-3 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors no-underline shadow-sm">Analyze Your Profile</Link>
                    </div>

                    {/* Related Guides */}
                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'Keywords Guide', href: '/linkedin-keywords-guide' },
                                { label: 'For Students', href: '/for-students' },
                                { label: 'For Job Seekers', href: '/for-jobseekers' },
                                { label: 'For Founders', href: '/for-founders' },
                                { label: 'Top 10 Mistakes', href: '/linkedin-mistakes' },
                                { label: 'Resume vs Profile', href: '/linkedin-resume-vs-profile' },
                                { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="text-xs font-medium text-[#4B5563] bg-[#F8FAFC] border border-gray-200 px-3 py-1.5 rounded-lg no-underline hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
