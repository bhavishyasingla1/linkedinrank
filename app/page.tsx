import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import HeroSlideshow from '@/components/HeroSlideshow'
import FaqAccordion from '@/components/FaqAccordion'
import CopyPromptButton from '@/components/CopyPromptButton'
import FileUploadWrapper from '@/components/FileUploadWrapper'

const AI_PROMPT = 'Here is my LinkedIn PDF and my LinkedInRank analysis report. Rewrite my headline, About section, and all experience descriptions based on the scoring feedback. Keep your voice authentic.'

const homepageFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'How does LinkedInRank score my profile?', acceptedAnswer: { '@type': 'Answer', text: 'LinkedInRank looks at the same things recruiters scan quickly — your headline, about section, experience, skills, education, and overall completeness. Each section is scored individually across 30+ signals. Your total is out of 100.' } },
        { '@type': 'Question', name: 'Is my LinkedIn data stored or shared?', acceptedAnswer: { '@type': 'Answer', text: 'No. Your file is analyzed in memory and deleted right away. We don\'t store anything, don\'t create accounts, and don\'t track you. Your data stays yours — always.' } },
        { '@type': 'Question', name: 'What file do I need to upload?', acceptedAnswer: { '@type': 'Answer', text: 'Your LinkedIn profile PDF export. To get it: go to your LinkedIn profile → click "More" → select "Save to PDF." The file is usually under 1MB. We only accept PDF format.' } },
        { '@type': 'Question', name: 'Can I use AI to improve my profile after the analysis?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Download your LinkedInRank report and upload it alongside your LinkedIn PDF to ChatGPT, Claude, or Gemini. Ask the AI to rewrite your sections based on the scoring feedback. We also have 26 ready-to-use AI prompts for every profile section.' } },
        { '@type': 'Question', name: 'Who is LinkedInRank for?', acceptedAnswer: { '@type': 'Answer', text: 'Anyone with a LinkedIn profile — students building their first profile, job seekers optimizing for recruiters, founders establishing credibility, and experienced professionals auditing their presence. Scoring adapts to your career stage automatically.' } },
        { '@type': 'Question', name: 'How is this different from other LinkedIn tools?', acceptedAnswer: { '@type': 'Answer', text: 'Most tools give generic tips. LinkedInRank gives you a structured score with section-by-section breakdowns, specific improvements you can apply immediately, and concrete before/after rewrites. It\'s free, private, and takes under 60 seconds.' } },
        { '@type': 'Question', name: 'What\'s a good LinkedIn score?', acceptedAnswer: { '@type': 'Answer', text: 'Scores are tiered: Bronze (0-54), Silver (55-69), Gold (70-84), and Platinum (85-100). Most profiles score between 40-65. A score above 70 puts you in the top tier of optimized profiles.' } },
    ],
}

export default function HomePage() {

    return (
        <main id="main-content" className="min-h-screen bg-white">
            <SiteHeader />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
            />

            {/* Hero */}
            <section className="hero-glow relative overflow-hidden pt-24 sm:pt-32 pb-24 sm:pb-32" style={{ background: 'linear-gradient(180deg, #F0F4FA 0%, #F8FAFC 40%, #FFFFFF 100%)' }}>
                {/* Dot pattern overlay */}
                <div className="absolute inset-0 opacity-[0.35]" style={{ backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)", backgroundSize: '24px 24px' }} />
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-8">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.4)]" />
                                <span className="text-xs font-semibold text-[#374151]">Free • No signup • Under 60 seconds</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#0A0F1C] leading-[1.15] mb-8 tracking-tight">
                                Most LinkedIn profiles look fine.<br />
                                But recruiters <span className="text-gradient-brand">skip them in seconds.</span>
                            </h1>
                            <p className="text-[17px] text-[#4B5563] max-w-md mb-10 leading-[1.75]">
                                LinkedInRank analyzes your profile across 30+ recruiter signals and shows exactly what to fix — with a score out of 100.
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                                <a href="#upload" className="btn-primary text-sm cursor-pointer">Analyze My Profile (Free)</a>
                                <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                                    <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>No login</span>
                                    <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>PDF only</span>
                                    <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>Under 60s</span>
                                </div>
                            </div>
                        </div>
                        <HeroSlideshow />
                    </div>
                </div>
            </section>

            {/* Social Proof Bar */}
            <section className="bg-white py-8">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 sm:divide-x sm:divide-gray-200">
                        {[
                            { value: '30+', label: 'Ranking Signals', color: '#0A66C2' },
                            { value: '120+', label: 'Free Guides', color: '#7C3AED' },
                            { value: '12', label: 'Free Tools', color: '#059669' },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-3 sm:px-12">
                                <div className="min-w-[44px] h-11 rounded-xl flex items-center justify-center px-2" style={{ backgroundColor: stat.color + '0D' }}>
                                    <span className="text-lg font-extrabold tabular-nums whitespace-nowrap" style={{ color: stat.color }}>{stat.value}</span>
                                </div>
                                <span className="text-sm text-[#374151] font-medium whitespace-nowrap">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="section-divider max-w-5xl mx-auto mt-8" />
            </section>

            {/* Recognition Section — Why profiles get ignored */}
            <section className="bg-white py-20 sm:py-24">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 mb-6">
                            <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></svg>
                            <span className="text-xs font-semibold text-red-500">Sound Familiar?</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0F1C] mb-4">Why LinkedIn profiles get ignored</h2>
                        <p className="text-[15px] text-[#6B7280] leading-relaxed max-w-lg mx-auto">You might have one of these issues — and not even know it.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                        {[
                            { num: '01', text: 'A headline that says what you are — but not why you\'re valuable' },
                            { num: '02', text: 'Experience that lists tasks instead of results' },
                            { num: '03', text: 'Skills that don\'t match what recruiters actually search for' },
                            { num: '04', text: 'An About section that doesn\'t explain your direction' },
                            { num: '05', text: 'A profile that looks complete — but isn\'t convincing', full: true },
                        ].map((item, i) => (
                            <div key={i} className={`flex items-start gap-4 bg-white border border-gray-200 rounded-xl px-5 py-5 border-l-[3px] border-l-red-300 hover:border-l-red-500 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 ${item.full ? 'sm:col-span-2 sm:max-w-[50%]' : ''}`}>
                                <span className="w-7 h-7 rounded-lg bg-red-50 text-red-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{item.num}</span>
                                <span className="text-sm text-[#4B5563] leading-relaxed">{item.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <p className="text-[15px] text-[#0A0F1C] font-semibold mb-4">LinkedInRank shows exactly where your profile breaks.</p>
                        <a href="#upload" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] inline-flex items-center gap-1.5 transition-colors cursor-pointer">
                            Check yours free <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Before vs After Profile Breakdown */}
            <section className="py-20 sm:py-28" style={{ background: 'linear-gradient(180deg, #F0F4FA 0%, #F8FAFC 100%)' }}>
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                            <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
                            <span className="text-xs font-semibold text-[#374151]">Real Example</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0F1C]">See what a profile improvement looks like</h2>
                    </div>

                    <div className="bg-white border border-gray-200/80 rounded-2xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_12px_48px_rgba(0,0,0,0.04)]">
                        {/* Score change */}
                        <div className="flex items-center gap-4 sm:gap-6 mb-8">
                            <div className="text-center shrink-0">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-2">
                                    <span className="text-2xl sm:text-3xl font-extrabold text-red-400 tabular-nums">42</span>
                                </div>
                                <p className="text-[10px] text-[#6B7280] uppercase font-bold tracking-wide">Before</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-3">
                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-red-300 via-amber-300 to-emerald-400 rounded-full" style={{ width: '71%' }} />
                                </div>
                                <span className="text-[11px] font-bold text-white bg-gradient-to-r from-[#0A66C2] to-[#4F46E5] px-4 py-1.5 rounded-full shadow-[0_2px_8px_rgba(10,102,194,0.3)]">+29 points</span>
                            </div>
                            <div className="text-center shrink-0">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-2">
                                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-500 tabular-nums">71</span>
                                </div>
                                <p className="text-[10px] text-[#6B7280] uppercase font-bold tracking-wide">After</p>
                            </div>
                        </div>

                        {/* Headline comparison */}
                        <div className="space-y-5">
                            <div>
                                <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-4">Headline</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-red-50/50 border border-red-100 rounded-xl p-5 border-l-[3px] border-l-red-300">
                                        <p className="text-[10px] font-bold text-red-400 uppercase mb-2">Before</p>
                                        <p className="text-sm text-[#6B7280]">Student at XYZ University</p>
                                    </div>
                                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5 border-l-[3px] border-l-emerald-400">
                                        <p className="text-[10px] font-bold text-emerald-500 uppercase mb-2">After</p>
                                        <p className="text-sm text-[#0A0F1C] font-semibold">Computer Engineering Student | ML Projects | Python &amp; Data Analysis</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] border border-blue-100 rounded-xl p-6">
                                <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-wider mb-4">Why the score improved</p>
                                <ul className="space-y-3">
                                    {[
                                        'Clearer role positioning',
                                        'Added searchable keywords recruiters actually filter by',
                                        'Removed vague, generic wording',
                                    ].map((reason, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-[#4B5563]">
                                            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                                <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                            </div>
                                            {reason}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 text-center">
                        <a href="#upload" className="btn-primary text-sm cursor-pointer">See your own score</a>
                    </div>
                </div>
            </section>

            {/* Upload */}
            <section id="upload" className="bg-white py-16 sm:py-20 scroll-mt-20">
                <div className="max-w-lg mx-auto px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0F1C]">Upload your LinkedIn PDF</h2>
                        <p className="text-sm text-[#6B7280] mt-2">Get your score in under 60 seconds</p>
                    </div>
                    <div className="gradient-border p-[2px] rounded-2xl">
                        <div className="bg-white rounded-[14px]">
                            <FileUploadWrapper />
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-5 text-xs text-[#6B7280]">
                        <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                        <span className="font-medium">Your data is never stored — processed in memory only</span>
                    </div>
                    {/* PDF instructions */}
                    <div className="mt-8 bg-[#F8FAFC] border border-gray-200 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">How to export your LinkedIn PDF</p>
                        <ol className="space-y-3">
                            {[
                                'Go to your LinkedIn profile page',
                                'Click "More" or "Resources" → then "Save to PDF"',
                                'Upload the downloaded file above'
                            ].map((step, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-[0_2px_6px_rgba(10,102,194,0.25)]">{i + 1}</span>
                                    <span className="text-sm text-[#4B5563] font-medium">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Popular LinkedIn Guides - SEO Internal Links */}
            <section className="bg-gradient-to-b from-white to-gray-50 py-20 sm:py-24 border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">Popular Guides</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-4">Master LinkedIn Optimization</h2>
                        <p className="text-sm text-[#6B7280] max-w-2xl mx-auto">Expert guides covering everything from profile optimization to recruiter psychology. All free, actionable advice.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { href: '/linkedin-optimization-guide', title: 'Complete Optimization Guide', desc: '47 expert tips that get interviews', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                            { href: '/linkedin-keywords-guide', title: 'Keyword Strategy Guide', desc: 'How recruiters search LinkedIn', icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' },
                            { href: '/get-noticed-recruiters', title: 'Get Noticed by Recruiters', desc: 'Visibility tactics that work', icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' },
                            { href: '/linkedin-profile-for-students', title: 'Guide for Students', desc: '31 examples that land internships', icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5' },
                            { href: '/for-founders', title: 'Guide for Founders', desc: '23 examples from funded startups', icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418' },
                            { href: '/linkedin-headline-guide', title: 'Headline Writing Guide', desc: '50+ examples and formulas', icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z' },
                            { href: '/linkedin-about-guide', title: 'About Section Guide', desc: 'Write an About that converts', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
                            { href: '/recruiter-psychology', title: 'Recruiter Psychology', desc: 'How recruiters view profiles', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
                        ].map((guide, i) => (
                            <Link key={i} href={guide.href} className="group bg-white border border-gray-200 rounded-xl p-5 accent-border-left hover:border-[#0A66C2] hover:shadow-[0_8px_24px_rgba(10,102,194,0.1)] hover:-translate-y-0.5 transition-all duration-200">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-3 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
                                    <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={guide.icon} /></svg>
                                </div>
                                <h3 className="text-sm font-bold text-[#0A0F1C] mb-1 group-hover:text-[#0A66C2] transition-colors">{guide.title}</h3>
                                <p className="text-xs text-[#6B7280] leading-relaxed">{guide.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Guides Section */}
            <section className="bg-white py-16 sm:py-20 border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-2">Most Popular Guides</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-2">Step-by-step guides for every section</h2>
                        <p className="text-sm text-[#6B7280] max-w-2xl mx-auto">Complete optimization guides with copy-paste examples, formulas, and recruiter-approved templates.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { title: '100+ Headline Examples', desc: 'Copy-paste templates for all roles and industries', href: '/linkedin-headline-examples', tag: 'Pillar Guide', color: '#0A66C2' },
                            { title: 'Complete Optimization Guide', desc: 'Step-by-step guide for every profile section', href: '/linkedin-optimization-guide', tag: 'Most Popular', color: '#10B981' },
                            { title: 'LinkedIn Keywords Guide', desc: 'Get found by recruiters with keyword placement strategy', href: '/linkedin-keywords-guide', tag: 'SEO', color: '#8B5CF6' },
                            { title: 'Content Strategy Guide', desc: 'What to post, when, and how to get 10x reach', href: '/linkedin-content-strategy', tag: 'New', color: '#F59E0B' },
                            { title: 'Headlines for Software Engineers', desc: '50+ examples for developers and tech professionals', href: '/linkedin-headline-software-engineers', tag: 'Role-Specific', color: '#06B6D4' },
                            { title: 'Headlines for Marketers', desc: '50+ examples for digital marketers and growth pros', href: '/linkedin-headline-marketers', tag: 'Role-Specific', color: '#EC4899' },
                        ].map((guide, i) => (
                            <Link key={i} href={guide.href} className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#0A66C2] hover:shadow-[0_8px_24px_rgba(10,102,194,0.12)] hover:-translate-y-1 transition-all duration-200 no-underline">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ color: guide.color, backgroundColor: guide.color + '14' }}>{guide.tag}</span>
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#0A66C2] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                </div>
                                <h3 className="text-base font-bold text-[#0A0F1C] mb-2 group-hover:text-[#0A66C2] transition-colors">{guide.title}</h3>
                                <p className="text-sm text-[#6B7280] leading-relaxed">{guide.desc}</p>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link href="/blogs" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1.5">
                            View all 120+ guides <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Free Tools Section | high on page for visibility */}
            <section className="below-fold bg-gradient-to-b from-[#F8FAFC] to-white py-20 sm:py-24 border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                        <div>
                            <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-2">Free Tools</p>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-2">Everything you need to improve your LinkedIn profile</h2>
                            <p className="text-sm text-[#6B7280] max-w-lg">These tools help you fix the exact sections recruiters scan first. Free, no signup required.</p>
                        </div>
                        <Link href="/tools" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1.5 shrink-0">
                            View all tools <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            { name: 'Headline Generator', slug: 'linkedin-headline-generator', color: '#0A66C2', tag: 'Most Popular' },
                            { name: 'About Generator', slug: 'linkedin-about-generator', color: '#10B981', tag: 'AI Powered' },
                            { name: 'Experience Generator', slug: 'linkedin-experience-generator', color: '#F59E0B', tag: 'AI Powered' },
                            { name: 'Keyword Analyzer', slug: 'linkedin-profile-keyword-analyzer', color: '#8B5CF6', tag: 'Beginner Friendly' },
                            { name: 'Post Idea Generator', slug: 'linkedin-post-idea-generator', color: '#F97316', tag: 'AI Powered' },
                            { name: 'Post Hook Generator', slug: 'linkedin-post-hook-generator', color: '#EF4444', tag: 'Templates' },
                            { name: 'Story to Post', slug: 'linkedin-story-to-post-converter', color: '#06B6D4', tag: 'New' },
                            { name: 'Content Planner', slug: 'linkedin-content-planner', color: '#6366F1', tag: 'Templates' },
                            { name: 'Comment Generator', slug: 'linkedin-comment-generator', color: '#14B8A6', tag: 'AI Powered' },
                            { name: 'Connection Messages', slug: 'linkedin-connection-message-generator', color: '#0EA5E9', tag: 'Templates' },
                            { name: 'Profile Photo Ring', slug: 'linkedin-profile-photo-ring', color: '#EC4899', tag: 'Beginner Friendly' },
                            { name: 'QR Code Generator', slug: 'linkedin-qr-code-generator', color: '#0A0F1C', tag: 'New' },
                        ].map(tool => (
                            <Link
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3.5 hover:border-[#0A66C2] hover:shadow-[0_4px_16px_rgba(10,102,194,0.08)] hover:-translate-y-0.5 transition-all duration-200 group min-w-0"
                            >
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: tool.color + '14' }}>
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tool.color }} />
                                </div>
                                <span className="text-[13px] font-medium text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors truncate">{tool.name}</span>
                                {tool.tag && <span className="text-[10px] font-semibold ml-auto whitespace-nowrap shrink-0 px-2 py-0.5 rounded-full" style={{ color: tool.color, backgroundColor: tool.color + '10' }}>{tool.tag}</span>}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-[#F8FAFC] py-20 sm:py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-5">
                            <svg className="w-3.5 h-3.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                            <span className="text-xs font-semibold text-[#374151]">How It Works</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0F1C]">Three steps to get recruiter-ready</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {[
                            { step: '01', title: 'Upload your LinkedIn profile', desc: 'Export your LinkedIn profile as a PDF and upload it. No login, no signup, no data stored.', icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5' },
                            { step: '02', title: 'Profile signals evaluated', desc: 'Your profile is evaluated across 30+ signals that recruiters scan — keywords, clarity, structure, and completeness.', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
                            { step: '03', title: 'Get your score and fixes', desc: 'Receive your score, specific improvements you can apply immediately, and a prioritized roadmap.', icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6' },
                        ].map((item, i) => (
                            <div key={i} className="step-connector bg-white border border-gray-200 rounded-2xl p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white flex items-center justify-center mb-5 shadow-[0_4px_16px_rgba(10,102,194,0.3)]">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                </div>
                                <span className="text-[10px] font-bold text-[#0A66C2] uppercase tracking-widest">Step {item.step}</span>
                                <h3 className="text-base font-bold text-[#0A0F1C] mb-2 mt-1.5">{item.title}</h3>
                                <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What You Get */}
            <section className="below-fold bg-white py-20 sm:py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] mb-5">
                            <svg className="w-3.5 h-3.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                            <span className="text-xs font-semibold text-[#0A66C2]">What You Get</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0F1C]">Your LinkedInRank report</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            { title: 'Score & Tier', desc: 'A score out of 100 across 6 categories: Headline, About, Experience, Skills, Education, and Completeness.', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', color: '#D97706' },
                            { title: 'What to Fix', desc: 'Signal-level feedback showing exactly which parts of each section passed and which need work.', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: '#059669' },
                            { title: 'How to Fix It', desc: 'Specific rewrites and a prioritized roadmap showing how many points each improvement adds.', icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10', color: '#0A66C2' },
                        ].map((item, i) => (
                            <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6 hover:bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: item.color + '12' }}>
                                    <svg className="w-5.5 h-5.5" style={{ color: item.color }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                </div>
                                <h3 className="text-base font-bold text-[#0A0F1C] mb-2">{item.title}</h3>
                                <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    {/* Score Tiers */}
                    <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                        <h3 className="text-sm font-bold text-[#0A0F1C] mb-4">What your score means</h3>
                        <div className="space-y-3">
                            {[
                                { range: '85–100', tier: 'Platinum', desc: 'Top 5% — recruiter magnet', color: '#7C3AED', bg: '#F5F3FF' },
                                { range: '70–84', tier: 'Gold', desc: 'Strong profile — visible in searches', color: '#D97706', bg: '#FFFBEB' },
                                { range: '55–69', tier: 'Silver', desc: 'Average — being overlooked', color: '#6B7280', bg: '#F9FAFB' },
                                { range: '0–54', tier: 'Bronze', desc: 'Weak — invisible to recruiters', color: '#DC2626', bg: '#FEF2F2' },
                            ].map((t, i) => (
                                <div key={i} className="flex items-center gap-3 rounded-lg px-4 py-2.5" style={{ backgroundColor: t.bg }}>
                                    <span className="text-xs font-bold tabular-nums w-12" style={{ color: t.color }}>{t.range}</span>
                                    <span className="text-xs font-bold w-16" style={{ color: t.color }}>{t.tier}</span>
                                    <span className="text-xs text-[#4B5563]">{t.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <Link href="/methodology" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1.5">
                            See full scoring methodology <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Learn More — SEO content, keyword-dense sections */}
            <section className="bg-white py-16 border-t border-gray-100 below-fold">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-lg font-bold text-[#0A0F1C] mb-2">What Is LinkedIn Ranking?</h2>
                            <p className="text-sm text-[#4B5563] leading-relaxed mb-3">
                                LinkedIn ranking refers to how your profile appears in search results when recruiters search for professionals with your skills. A higher-ranked profile gets more profile views, connection requests, and job opportunities. LinkedIn&apos;s algorithm considers headline keywords, profile completeness, skills relevance, and engagement signals. LinkedInRank evaluates 30+ of these ranking signals to give you a concrete LinkedIn profile score.
                            </p>
                            <Link href="/what-is-linkedin-rank" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1">Learn about LinkedIn ranking <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></Link>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[#0A0F1C] mb-2">How LinkedIn SEO Works</h2>
                            <p className="text-sm text-[#4B5563] leading-relaxed mb-3">
                                LinkedIn SEO is the practice of optimizing your profile to rank higher in LinkedIn search results. LinkedIn ranks profiles based on keyword relevance, profile completeness, and professional authority. Place primary keywords in your headline and about section, use industry-specific terms in experience descriptions, and keep your profile 100% complete. LinkedIn keyword optimization is one of the fastest ways to improve recruiter visibility.
                            </p>
                            <Link href="/linkedin-keywords-guide" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1">LinkedIn keyword optimization guide <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></Link>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[#0A0F1C] mb-2">What Is a LinkedIn Profile Score?</h2>
                            <p className="text-sm text-[#4B5563] leading-relaxed mb-3">
                                A LinkedIn profile score is a numerical rating that measures how well your profile is optimized for recruiter visibility and professional positioning. LinkedInRank scores your profile out of 100 across six categories: Headline, About, Experience, Skills, Education, and Completeness. Scores are tiered as Bronze (0-54), Silver (55-69), Gold (70-84), and Platinum (85-100). Most professionals score between 40-65 on their first analysis.
                            </p>
                            <Link href="/linkedin-profile-score" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1">Check your LinkedIn profile score <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></Link>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[#0A0F1C] mb-2">LinkedIn Headline Optimization</h2>
                            <p className="text-sm text-[#4B5563] leading-relaxed mb-3">
                                Your LinkedIn headline is the single most important field for search visibility. Recruiters use Boolean searches with job titles, skills, and industry terms. If those keywords aren&apos;t in your headline, you won&apos;t appear in results. The best LinkedIn headlines follow the formula: Role + Niche/Industry + Value. Use pipes (|) for separation and keep your headline under 120 characters for mobile optimization.
                            </p>
                            <Link href="/linkedin-headline-guide" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1">50+ headline examples and formulas <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></Link>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-2">LinkedIn Profile Optimization Tips</h2>
                        <p className="text-sm text-[#4B5563] leading-relaxed mb-3">
                            LinkedIn profile optimization is the process of improving every section of your profile to maximize recruiter visibility, search ranking, and professional credibility. The most impactful improvements are: writing a keyword-rich headline, crafting a first-person About section with a clear value proposition, adding quantified achievements to Experience, and selecting skills that match your target roles. A fully optimized LinkedIn profile can increase profile views by 3-5x and InMails by 40%.
                        </p>
                        <Link href="/linkedin-optimization-guide" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1">Complete LinkedIn optimization guide <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></Link>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
                        {[
                            { title: 'For Job Seekers', href: '/for-jobseekers' },
                            { title: 'For Students', href: '/linkedin-profile-for-students' },
                            { title: 'For Founders', href: '/for-founders' },
                            { title: 'Why We Are Different', href: '/about' },
                            { title: 'LinkedIn Best Practices', href: '/linkedin-best-practices' },
                            { title: 'LinkedIn Mistakes', href: '/linkedin-mistakes' },
                        ].map((item, i) => (
                            <Link key={i} href={item.href} className="text-xs font-medium text-[#4B5563] bg-[#F8FAFC] border border-gray-200 px-3.5 py-2 rounded-lg no-underline hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who This Is For */}
            <section className="py-16 sm:py-20" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #F0F4FA 100%)' }}>
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-5">
                            <svg className="w-3.5 h-3.5 text-[#7C3AED]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                            <span className="text-xs font-semibold text-[#374151]">Who This Is For</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0F1C]">LinkedInRank adapts to your career stage</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { audience: 'Students', desc: 'Building their first professional profile', color: '#0A66C2', icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5' },
                            { audience: 'Job Seekers', desc: 'Improving recruiter visibility', color: '#059669', icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' },
                            { audience: 'Early-Career', desc: 'Clarifying professional positioning', color: '#D97706', icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6' },
                            { audience: 'Founders', desc: 'Strengthening personal brand', color: '#7C3AED', icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-t-[3px] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200" style={{ borderTopColor: item.color }}>
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: item.color + '12' }}>
                                    <svg className="w-5 h-5" style={{ color: item.color }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                </div>
                                <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.audience}</p>
                                <p className="text-xs text-[#6B7280] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What LinkedInRank Does NOT Analyze */}
            <section className="bg-white py-14 sm:py-16 border-t border-gray-100">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6 sm:p-8">
                        <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">Transparency</p>
                        <h3 className="text-lg font-bold text-[#0A0F1C] mb-2">What LinkedInRank does NOT analyze</h3>
                        <p className="text-sm text-[#4B5563] mb-5 leading-relaxed">LinkedInRank only evaluates information visible in your LinkedIn PDF. It does NOT evaluate:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {[
                                'Follower count',
                                'Engagement metrics',
                                'Posting frequency',
                                'Connection count',
                                'Profile or banner photo',
                                'Recommendations from others',
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2.5">
                                    <svg className="w-4 h-4 text-[#D1D5DB] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                    <span className="text-sm text-[#4B5563]">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Guidance */}
            <section className="below-fold bg-[#F8FAFC] py-16 sm:py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-5">
                            <svg className="w-3.5 h-3.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                            <span className="text-xs font-semibold text-[#0A66C2]">After Your Report</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-3">Let AI rewrite your profile</h2>
                        <p className="text-[15px] text-[#4B5563] max-w-xl mx-auto leading-relaxed">
                            Get your LinkedInRank report, then hand it to any AI assistant with your LinkedIn PDF. It rewrites every section using your scores.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                        {[
                            { step: '1', title: 'Analyze your profile', desc: 'Upload your LinkedIn PDF and get your score with section-by-section feedback.', icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5' },
                            { step: '2', title: 'Copy the AI prompt', desc: 'One click copies a ready-made prompt. Paste it into ChatGPT, Claude, or Gemini.', icon: 'M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184' },
                            { step: '3', title: 'Get a rewritten profile', desc: 'The AI rewrites your headline, about, experience | everything, based on real data.', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
                        ].map((item) => (
                            <div key={item.step} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-3">
                                    <svg className="w-4.5 h-4.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                </div>
                                <p className="text-xs font-bold text-[#0A66C2] mb-1">Step {item.step}</p>
                                <h3 className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</h3>
                                <p className="text-xs text-[#6B7280] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-[14px] p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)]" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: '#E2E8F0', fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace", border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                                </div>
                                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider ml-2">Ready-to-use prompt</p>
                            </div>
                            <CopyPromptButton />
                        </div>
                        <p className="text-[15px] text-[#CBD5E1] leading-relaxed font-medium italic">
                            &ldquo;{AI_PROMPT}&rdquo;
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-5">
                            {['ChatGPT', 'Claude', 'Gemini', 'Copilot', 'Perplexity'].map((name) => (
                                <span key={name} className="text-[11px] font-semibold text-[#94A3B8] bg-white/10 border border-white/10 px-2.5 py-1 rounded-full">{name}</span>
                            ))}
                            <span className="text-[10px] text-[#64748B] ml-1">Works with any AI</span>
                        </div>
                        <div className="mt-5 pt-4 border-t border-white/10">
                            <Link href="/ai-prompts-linkedin" className="text-sm font-semibold text-[#60A5FA] no-underline hover:text-[#93C5FD] inline-flex items-center gap-1">
                                Browse 26 more AI prompts for every profile section <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Privacy and Trust */}
            <section className="below-fold bg-gradient-to-br from-[#EFF6FF] to-[#E0ECFF] py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-[#DBEAFE] mb-5 shadow-sm">
                            <svg className="w-6 h-6 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-3">Your data stays yours</h2>
                        <p className="text-[15px] text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                            Your file is processed in memory and never stored. No accounts, no cookies, no tracking.
                            Analysis runs entirely server-side and results are discarded after delivery.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { icon: 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z', label: 'Zero Login Required', desc: 'No signup, no account needed' },
                            { icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z', label: 'Hybrid AI + Rules', desc: 'Gemini AI + deterministic scoring' },
                            { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', label: 'Privacy-First', desc: 'No data stored, ever' },
                            { icon: 'M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0', label: 'Files Auto-Deleted', desc: 'Processed in memory only' },
                        ].map((item, i) => (
                            <div key={i} className="text-center glass-card rounded-xl p-4 border border-blue-100 hover:shadow-md transition-all duration-200">
                                <div className="w-10 h-10 rounded-lg bg-white border border-[#DBEAFE] flex items-center justify-center mx-auto mb-3 shadow-sm">
                                    <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                </div>
                                <p className="text-sm font-bold text-[#0A0F1C] mb-0.5">{item.label}</p>
                                <p className="text-[11px] text-[#6B7280]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="below-fold bg-white py-16 border-t border-gray-100">
                <div className="max-w-2xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] mb-4">
                            <svg className="w-6 h-6 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
                        </div>
                        <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">FAQ</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C]">Common questions</h2>
                    </div>

                    <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-5 sm:p-6">
                        <FaqAccordion />
                    </div>

                    <div className="mt-6 text-center">
                        <Link href="/faq" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1.5">
                            See all FAQs <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Blog / Latest Articles */}
            <section className="below-fold py-14 sm:py-16 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-8">
                        <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">Blog</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-3">LinkedIn tips and strategies</h2>
                        <p className="text-[15px] text-[#4B5563] max-w-xl mx-auto">120+ articles covering headlines, about sections, experience writing, content creation, and more. All free.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
                        {[
                            { href: '/blogs/how-to-write-linkedin-headline', title: 'How to Write a LinkedIn Headline That Gets Clicks', tag: 'Headlines', color: '#0A66C2', icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z' },
                            { href: '/blogs/linkedin-about-section-examples', title: '20 LinkedIn About Section Examples by Industry', tag: 'About', color: '#047857', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
                            { href: '/blogs/how-to-write-linkedin-experience', title: 'How to Write LinkedIn Experience That Stands Out', tag: 'Experience', color: '#B45309', icon: 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z' },
                            { href: '/blogs/what-to-post-on-linkedin-2025', title: 'What to Post on LinkedIn in 2025', tag: 'Content', color: '#7C3AED', icon: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18' },
                            { href: '/blogs/linkedin-content-calendar-template', title: 'LinkedIn Content Calendar Template', tag: 'Planning', color: '#BE185D', icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5' },
                            { href: '/blogs/linkedin-connection-request-message-templates', title: 'LinkedIn Connection Request Templates', tag: 'Networking', color: '#0E7490', icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' },
                        ].map((post, i) => (
                            <Link
                                key={i}
                                href={post.href}
                                className="group bg-white border border-gray-200 rounded-xl p-5 no-underline hover:border-gray-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: post.color + '12', color: post.color }}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={post.icon} /></svg>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: post.color }}>{post.tag}</span>
                                <h3 className="text-sm font-bold text-[#0A0F1C] mt-1.5 mb-1 group-hover:text-[#0A66C2] transition-colors leading-snug">{post.title}</h3>
                                <span className="text-[11px] text-[#6B7280]">3 min read</span>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/blogs" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1.5 py-3">
                            Browse all 120+ articles <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Guides & Resources */}
            <section className="below-fold py-12 sm:py-14 bg-[#F8FAFC] border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-6">
                        <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-2">Guides</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C]">Level up your LinkedIn presence</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                        {[
                            { href: '/linkedin-optimization-guide', title: 'Full Optimization Guide' },
                            { href: '/linkedin-headline-guide', title: 'Headline Guide' },
                            { href: '/linkedin-about-guide', title: 'About Section Guide' },
                            { href: '/linkedin-profile-checklist', title: 'Profile Checklist' },
                            { href: '/linkedin-headline-designers', title: 'Designer Headlines' },
                            { href: '/linkedin-headline-marketers', title: 'Marketer Headlines' },
                            { href: '/recruiter-psychology', title: 'Recruiter Psychology' },
                            { href: '/linkedin-mistakes', title: 'Top 10 Mistakes' },
                        ].map((guide, i) => (
                            <Link key={i} href={guide.href} className="group bg-white border border-gray-200 rounded-xl px-4 py-3 no-underline hover:border-[#0A66C2] hover:shadow-sm transition-all">
                                <h3 className="text-[13px] font-semibold text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors">{guide.title}</h3>
                            </Link>
                        ))}
                    </div>

                    {/* Headline by profession — compact pills */}
                    <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">Headlines by profession</p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {[
                            { href: '/linkedin-headline-for-graphic-designer', title: 'Graphic Designers' },
                            { href: '/linkedin-headline-software-engineers', title: 'Software Engineers' },
                            { href: '/linkedin-headline-marketers', title: 'Marketers' },
                            { href: '/linkedin-headline-designers', title: 'Designers' },
                            { href: '/linkedin-headline-mba', title: 'MBA Graduates' },
                            { href: '/linkedin-headline-data-scientists', title: 'Data Scientists' },
                            { href: '/linkedin-headline-product-managers', title: 'Product Managers' },
                            { href: '/linkedin-headline-consultants', title: 'Consultants' },
                            { href: '/linkedin-headline-sales', title: 'Sales' },
                            { href: '/linkedin-headline-hr', title: 'HR & Recruiters' },
                            { href: '/linkedin-headline-finance', title: 'Finance' },
                            { href: '/linkedin-headline-healthcare', title: 'Healthcare' },
                            { href: '/linkedin-headline-teachers', title: 'Educators' },
                        ].map((guide, i) => (
                            <Link key={i} href={guide.href} className="text-xs text-[#4B5563] bg-white border border-gray-200 px-3 py-1.5 rounded-md no-underline hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors">
                                {guide.title}
                            </Link>
                        ))}
                    </div>

                    {/* Quick links to more resources */}
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/ai-prompts-linkedin', title: 'AI Prompts' },
                            { href: '/linkedin-keywords-guide', title: 'Keywords & SEO' },
                            { href: '/linkedin-content-strategy', title: 'Content Strategy' },
                            { href: '/linkedin-personal-branding', title: 'Personal Branding' },
                            { href: '/get-noticed-recruiters', title: 'Get Noticed by Recruiters' },
                            { href: '/top-1-percent-profiles', title: 'Top 1% Profiles' },
                            { href: '/viral-post-formulas', title: 'Viral Post Formulas' },
                            { href: '/compare-linkedin-review-tools', title: 'Compare Tools' },
                        ].map((guide, i) => (
                            <Link key={i} href={guide.href} className="text-xs text-[#6B7280] bg-white border border-gray-100 px-3 py-1.5 rounded-md no-underline hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors">
                                {guide.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-r from-[#0A66C2] to-[#4F46E5] py-12 sm:py-14">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Ready to see how your profile ranks?</h2>
                    <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">Upload your LinkedIn PDF and get your score in under a minute. Free, no signup required.</p>
                    <a href="#upload" className="inline-flex items-center gap-2 bg-white text-[#0A66C2] font-semibold text-sm px-6 py-3 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                        Analyze My Profile
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </a>
                </div>
            </section>

            <FooterLayout />
        </main>
    )
}

// Ensure full invalidation
