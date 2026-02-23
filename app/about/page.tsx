import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'About LinkedInRank | The World\'s Best Free LinkedIn Profile Scorer',
    description: 'LinkedInRank is a free, privacy-first LinkedIn profile scoring tool built to help professionals optimize their profiles. Learn about our mission, scoring methodology, and why thousands trust us.',
    keywords: 'about linkedinrank, linkedin profile scorer, linkedin analysis tool, free linkedin profile review, linkedin optimization, who built linkedinrank',
    alternates: { canonical: 'https://linkedinrank.com/about' },
    openGraph: {
        title: 'About LinkedInRank | The World\'s Best Free LinkedIn Profile Scorer',
        description: 'Learn why LinkedInRank was built and how it helps professionals optimize their LinkedIn profiles with data-driven scoring.',
        url: 'https://linkedinrank.com/about',
    },
}

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            {/* Hero */}
            <section className="relative bg-gradient-to-b from-[#F8FAFC] to-white pt-16 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%20fill%3D%22%23E5E7EB%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
                <div className="max-w-3xl mx-auto px-6 text-center relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                        <div className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                        <span className="text-xs font-semibold text-[#0A66C2]">About LinkedInRank</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">Why LinkedIn Rank Exists</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                        Honest, structured feedback on the most important career asset you own | your LinkedIn profile.
                    </p>
                </div>
            </section>

            <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                {/* The problem */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-[#0A0F1C]">The problem</h2>
                    </div>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed mb-4">
                        LinkedIn is the most important professional platform in the world | over 1 billion members, and recruiters spend an average of just 7.4 seconds scanning a profile before deciding to reach out or move on. Yet most people have no idea how their profile actually reads to recruiters, hiring managers, or potential collaborators.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        {[
                            { stat: '1B+', label: 'LinkedIn members worldwide' },
                            { stat: '7.4s', label: 'Average recruiter scan time' },
                            { stat: '87%', label: 'Of recruiters use LinkedIn' },
                        ].map((item, i) => (
                            <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 text-center">
                                <span className="text-2xl font-bold text-[#0A66C2]">{item.stat}</span>
                                <p className="text-[10px] text-[#6B7280] font-medium mt-1 uppercase tracking-wide">{item.label}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed">
                        The feedback gap is real. Most professionals either get no feedback on their profile, or they get vague advice like &ldquo;make it more engaging&rdquo; | which is not actionable. LinkedIn itself gives you a profile strength meter, but it rewards completion, not quality. You can have a &ldquo;complete&rdquo; profile that still gets ignored by every recruiter in your industry.
                    </p>
                </section>

                {/* The solution */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-[#0A0F1C]">The solution</h2>
                    </div>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed mb-4">
                        LinkedIn Rank provides a structured, transparent evaluation of your LinkedIn profile based on what is actually visible in your exported PDF | not vanity metrics, not engagement data, not follower counts. It evaluates the same signals that recruiters and hiring managers evaluate when they decide whether to reach out.
                    </p>
                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-2xl p-6 mb-4">
                        <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-wider mb-4">What you get</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { title: 'Score out of 100', desc: 'Across 6 categories with 30+ signals evaluated', icon: <svg className="w-4 h-4 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
                                { title: 'Category breakdown', desc: 'Headline, About, Experience, Skills, Education, Completeness', icon: <svg className="w-4 h-4 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
                                { title: 'Improvement path', desc: 'Specific next steps ranked by impact for your career stage', icon: <svg className="w-4 h-4 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" /></svg> },
                            ].map((item, i) => (
                                <div key={i} className="bg-white/70 border border-[#DBEAFE] rounded-xl p-4 flex gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">{item.icon}</div>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C] mb-0.5">{item.title}</p>
                                        <p className="text-xs text-[#4B5563] leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-[#0A0F1C]">How it works</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { step: '01', title: 'Export your PDF', desc: 'Go to your LinkedIn profile, click More, and select "Save to PDF." This is the standard export that captures all your profile content.' },
                            { step: '02', title: 'Upload to LinkedInRank', desc: 'Drop your PDF on the analyzer. No login, no account creation. Your file is processed in memory and never stored.' },
                            { step: '03', title: 'Get your report', desc: 'Receive a detailed score breakdown, tier placement, AI-powered headline alternatives, and a prioritized improvement path.' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] relative">
                                <span className="text-xs font-bold text-[#0A66C2] bg-[#EFF6FF] w-8 h-8 rounded-lg inline-flex items-center justify-center mb-3">{item.step}</span>
                                <p className="text-sm font-bold text-[#0A0F1C] mb-1.5">{item.title}</p>
                                <p className="text-xs text-[#4B5563] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Principles */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-[#0A0F1C]">Our principles</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { title: 'Transparency over mystery', desc: 'Every scoring criterion is documented. No hidden algorithms, no black boxes. You can read exactly how each point is awarded on our methodology page.', icon: <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
                            { title: 'Fairness across career stages', desc: 'A student is not judged by the same standards as a VP. LinkedInRank detects your career stage and adjusts expectations. Everyone gets a fair score.', icon: <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg> },
                            { title: 'Privacy by design', desc: 'No accounts, no storage, no tracking, no cookies. Your PDF is processed entirely in memory and discarded immediately. We never see your data after you close the tab.', icon: <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg> },
                            { title: 'Actionable, not aspirational', desc: 'Every recommendation is specific enough to implement today. Not "improve your headline" | instead, you get 3 ready-to-use headline alternatives generated from your actual profile.', icon: <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg> },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center mb-3">{item.icon}</div>
                                <p className="text-sm font-bold text-[#0A0F1C] mb-1.5">{item.title}</p>
                                <p className="text-xs text-[#4B5563] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* What we do NOT do */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-[#0A0F1C]">What we do NOT do</h2>
                    </div>
                    <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                'We do not store your PDF or any personal data',
                                'We do not require login or account creation',
                                'We do not sell your information to third parties',
                                'We do not track you with cookies or analytics',
                                'We do not penalize for things outside your control',
                                'We do not use engagement metrics in scoring',
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-[#4B5563]">
                                    <div className="w-4 h-4 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0 mt-0.5">
                                        <svg className="w-2.5 h-2.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                    </div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Who built this */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-[#0A0F1C]">Who built this</h2>
                    </div>
                    <div className="bg-gradient-to-r from-[#0A0F1C] to-[#1E293B] rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-full bg-[#0A66C2] flex items-center justify-center shrink-0">
                                <span className="text-xl font-bold text-white">BS</span>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-white mb-1">Bhavishya Singla</p>
                                <p className="text-sm text-gray-300 mb-3">Founder, LinkedInRank</p>
                                <p className="text-sm text-gray-400 leading-relaxed mb-3">
                                    After two years of obsessively studying LinkedIn optimization | watching hundreds of videos, reading courses, reviewing dozens of profiles for friends and family | I built LinkedInRank to make that knowledge accessible to everyone. Not as vague advice, but as structured, actionable scoring anyone can use.
                                </p>
                                <div className="flex gap-3">
                                    <a href="https://www.linkedin.com/in/bhavishyasingla1/" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#0A66C2] bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full no-underline transition-colors">Connect on LinkedIn</a>
                                    <Link href="/story" className="text-xs font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded-full no-underline transition-colors">Read the full story</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                    <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">See how your profile really ranks</h2>
                    <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF and get a data-backed score with personalized recommendations. Free, private, and instant.</p>
                    <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It's Free</Link>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'Our Story', href: '/story' },
                            { label: 'Methodology', href: '/methodology' },
                            { label: 'How It Works', href: '/how-linkedin-rank-works' },
                            { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            { label: 'For Students', href: '/for-students' },
                            { label: 'For Job Seekers', href: '/for-jobseekers' },
                            { label: 'For Founders', href: '/for-founders' },
                            { label: 'Privacy Policy', href: '/privacy' },
                            { label: 'Data Security', href: '/data-security' },
                            { label: 'Terms', href: '/terms' },
                            { label: 'FAQ', href: '/faq' },
                        ].map((item, i) => (
                            <Link key={i} href={item.href} className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">{item.label}</Link>
                        ))}
                    </div>
                </div>
            </div>

            <SiteFooter />
        </main>
    )
}
