import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'How LinkedInRank Works | Free Profile Scoring in 3 Steps (2026)',
    description: 'Upload your LinkedIn PDF, get scored across 30+ signals, and receive AI-powered improvement recommendations in under 60 seconds. Free, no login required.',
    keywords: 'how linkedinrank works, linkedin profile analysis process, linkedin pdf scoring, linkedin score tool, linkedin profile scorer how it works, free linkedin analysis tool, linkedin scoring explained, linkedin ranking, linkedin profile score, linkedin rank checker',
    alternates: { canonical: 'https://linkedinrank.com/how-linkedin-rank-works' },
    openGraph: {
        title: 'How LinkedInRank Works | Free Profile Scoring in 3 Steps (2026)',
        description: 'Upload PDF → Get scored across 30+ signals → Receive AI-powered recommendations. Under 60 seconds, completely free.',
        url: 'https://linkedinrank.com/how-linkedin-rank-works',
    },
}

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            {/* Hero */}
            <section className="relative bg-gradient-to-b from-[#F8FAFC] to-white pt-16 sm:pt-20 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%20fill%3D%22%23E5E7EB%22%2F%3E%3C%2Fsvg%3E')] opacity-40" />
                <div className="max-w-3xl mx-auto px-6 text-center relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                        <svg className="w-3.5 h-3.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="text-xs font-semibold text-[#0A66C2]">Under the Hood</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-5">How LinkedInRank Evaluates Your Profile</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-xl mx-auto leading-relaxed">
                        A transparent, step-by-step look at what happens when you upload your LinkedIn PDF | from parsing to your personalized report.
                    </p>
                </div>
            </section>

            {/* Steps */}
            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <div className="space-y-8">
                    {[
                        {
                            step: '01', title: 'PDF Upload & Parsing',
                            desc: 'Our parser extracts structured data from your LinkedIn PDF: name, headline, about section, experience entries (titles, companies, descriptions, durations), education, skills, certifications, and honors.',
                            detail: 'The PDF is processed entirely in server memory and never stored. Your file is discarded immediately after analysis.',
                            icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5',
                            color: '#0A66C2',
                        },
                        {
                            step: '02', title: 'Rule-Based Signal Scoring',
                            desc: 'A deterministic engine evaluates your profile across 30+ signals in six categories: Headline, About, Experience, Skills, Education, and Completeness.',
                            detail: 'Each signal is transparent and documented. The engine checks headline clarity, keyword density, action verbs in experience, skills specificity, education completeness, and overall profile structure.',
                            icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z',
                            color: '#2563EB',
                        },
                        {
                            step: '03', title: 'AI Content Quality Analysis',
                            desc: 'Google Gemini AI evaluates content quality in parallel | analyzing headline positioning, about section effectiveness, experience impact, and skills alignment.',
                            detail: 'The AI is instructed to be fair, specific, and non-judgmental. It adapts its evaluation to your career stage and generates personalized recommendations with before/after examples.',
                            icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z',
                            color: '#4F46E5',
                        },
                        {
                            step: '04', title: 'Career Stage Adaptation',
                            desc: 'The system detects your career stage from headline, job titles, and experience duration | then calibrates expectations accordingly.',
                            detail: 'Students, early-career professionals, mid-career operators, and senior leaders are each evaluated against appropriate benchmarks. A student is never judged by executive standards.',
                            icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
                            color: '#7C3AED',
                        },
                        {
                            step: '05', title: 'Your Personalized Report',
                            desc: 'You receive a structured report with your overall score out of 100, tier placement, category breakdown with signal-level feedback, and an improvement roadmap.',
                            detail: 'The report includes personalized recommendations with before/after examples, best practices for your career stage, and a prioritized improvement path showing exactly how many points each fix adds.',
                            icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25',
                            color: '#9333EA',
                        },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] transition-shadow">
                            <div className="flex items-start gap-5">
                                <div className="shrink-0">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white text-sm font-bold flex items-center justify-center shadow-[0_2px_8px_rgba(10,102,194,0.3)]">{item.step}</div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.color + '12', color: item.color }}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                        </div>
                                        <h2 className="text-lg font-bold text-[#0A0F1C]">{item.title}</h2>
                                    </div>
                                    <p className="text-[15px] text-[#4B5563] leading-relaxed mb-3">{item.desc}</p>
                                    <p className="text-sm text-[#6B7280] leading-relaxed">{item.detail}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust signals */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', title: 'Privacy-first', desc: 'No storage, no tracking, no accounts' },
                        { icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', title: 'Under 60 seconds', desc: 'Full analysis in under a minute' },
                        { icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z', title: 'Fully transparent', desc: 'Every criterion is documented' },
                    ].map((item, i) => (
                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-5 text-center">
                            <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center mx-auto mb-3">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                            </div>
                            <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</p>
                            <p className="text-xs text-[#6B7280]">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* What to do after */}
                <div className="mt-16">
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-4">What You Can Do After Your Report</h2>
                    <p className="text-sm text-[#4B5563] mb-6 leading-relaxed">Your LinkedInRank report gives you the diagnosis. These guides give you the prescription:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { title: 'Improve Your LinkedIn Ranking', desc: 'Understand every ranking factor and how to optimize each one for maximum visibility.', href: '/linkedin-ranking', color: '#0A66C2' },
                            { title: 'Understand Your Profile Score', desc: 'Learn what your score means, how it compares, and which signals matter most.', href: '/linkedin-profile-score', color: '#2563EB' },
                            { title: 'Student Profile Guide', desc: 'Step-by-step guide for building a strong LinkedIn profile as a student.', href: '/linkedin-profile-for-students', color: '#4F46E5' },
                            { title: 'Headline for Graphic Designers', desc: '150+ headline examples organized by specialization and career stage.', href: '/linkedin-headline-for-graphic-designer', color: '#7C3AED' },
                        ].map((item, i) => (
                            <Link key={i} href={item.href} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#0A66C2] hover:shadow-md transition-all group block no-underline">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + '12', color: item.color }}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors">{item.title}</p>
                                        <p className="text-xs text-[#6B7280] mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-2xl p-8 sm:p-10 text-center">
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">Ready to see your evaluation?</h2>
                    <p className="text-sm text-[#4B5563] mb-5 max-w-md mx-auto">Upload your LinkedIn PDF and get your personalized score, breakdown, and improvement roadmap in under a minute.</p>
                    <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It&apos;s Free</Link>
                </div>

                {/* Related */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'LinkedIn Ranking', href: '/linkedin-ranking' },
                            { label: 'Profile Score', href: '/linkedin-profile-score' },
                            { label: 'Methodology', href: '/methodology' },
                            { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                            { label: 'Student Guide', href: '/linkedin-profile-for-students' },
                            { label: 'Recruiter Psychology', href: '/recruiter-psychology' },
                            { label: 'Profile Checklist', href: '/linkedin-profile-checklist' },
                            { label: 'FAQ', href: '/faq' },
                        ].map((item, i) => (
                            <Link key={i} href={item.href} className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">{item.label}</Link>
                        ))}
                    </div>
                </div>
            </article>

            <SiteFooter />
        </main>
    )
}
