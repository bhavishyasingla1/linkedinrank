import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HeroSlideshow from '@/components/HeroSlideshow'
import FaqAccordion from '@/components/FaqAccordion'
import CopyPromptButton from '@/components/CopyPromptButton'
import FileUploadWrapper from '@/components/FileUploadWrapper'

const AI_PROMPT = 'Here is my LinkedIn PDF and my LinkedInRank analysis report. Rewrite my headline, About section, and all experience descriptions based on the scoring feedback. Keep your voice authentic.'

export default function HomePage() {

    return (
        <main id="main-content" className="min-h-screen bg-white">
            <SiteHeader />

            {/* Hero */}
            <section className="bg-white pt-20 sm:pt-28 pb-20 sm:pb-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0A0F1C] leading-[1.15] mb-5 tracking-tight">
                                Most LinkedIn profiles look fine.<br />
                                But recruiters <span className="text-gradient-brand">skip them in seconds.</span>
                            </h1>
                            <p className="text-[17px] text-[#4B5563] max-w-md mb-10 leading-relaxed">
                                LinkedInRank analyzes your profile and shows exactly what recruiters see — with a score and specific fixes.
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <a href="#upload" className="btn-primary text-sm cursor-pointer">Analyze My Profile (Free)</a>
                                <span className="text-xs text-[#6B7280]">No login • PDF only • Results in under a minute</span>
                            </div>
                        </div>
                        <HeroSlideshow />
                    </div>
                </div>
            </section>

            {/* Social Proof Bar */}
            <section className="bg-[#F8FAFC] border-y border-gray-100 py-4">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
                        {[
                            { value: 'Multi-Stage', label: 'Career Profiles Analyzed' },
                            { value: '120+', label: 'Free Guides' },
                            { value: '12', label: 'Free LinkedIn Tools' },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="text-lg font-bold text-[#0A66C2]">{stat.value}</span>
                                <span className="text-xs text-[#6B7280] font-medium">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recognition Section — Why profiles get ignored */}
            <section className="bg-white py-16 sm:py-20 border-t border-gray-100">
                <div className="max-w-3xl mx-auto px-6">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">Sound Familiar?</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-4">Why LinkedIn profiles get ignored</h2>
                    <p className="text-[15px] text-[#4B5563] mb-8 leading-relaxed max-w-2xl">You might have:</p>
                    <div className="space-y-3 mb-8">
                        {[
                            'A headline that says what you are — but not why you\'re valuable',
                            'Experience that lists tasks instead of results',
                            'Skills that don\'t match what recruiters actually search for',
                            'An About section that doesn\'t explain your direction',
                            'A profile that looks complete — but isn\'t convincing',
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 bg-[#FEF2F2] border border-red-100 rounded-xl px-5 py-3.5">
                                <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                                <span className="text-sm text-[#4B5563] leading-relaxed">{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-[15px] text-[#0A0F1C] font-semibold">LinkedInRank shows exactly where your profile breaks.</p>
                </div>
            </section>

            {/* Before vs After Profile Breakdown */}
            <section className="bg-[#F8FAFC] py-16 sm:py-20 border-t border-gray-100">
                <div className="max-w-3xl mx-auto px-6">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">Real Example</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-8">See what a profile improvement looks like</h2>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                        {/* Score change */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="text-center">
                                <span className="text-3xl font-bold text-red-400">42</span>
                                <p className="text-[10px] text-[#6B7280] uppercase font-bold mt-1">Before</p>
                            </div>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full relative overflow-hidden">
                                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-300 via-amber-300 to-emerald-400 rounded-full" style={{ width: '71%' }} />
                            </div>
                            <div className="text-center">
                                <span className="text-3xl font-bold text-emerald-500">71</span>
                                <p className="text-[10px] text-[#6B7280] uppercase font-bold mt-1">After</p>
                            </div>
                        </div>

                        {/* Headline comparison */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">Headline</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                                        <p className="text-[10px] font-bold text-red-400 uppercase mb-1.5">Before</p>
                                        <p className="text-sm text-[#4B5563]">Student at XYZ University</p>
                                    </div>
                                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                                        <p className="text-[10px] font-bold text-emerald-500 uppercase mb-1.5">After</p>
                                        <p className="text-sm text-[#0A0F1C] font-medium">Computer Engineering Student | ML Projects | Python &amp; Data Analysis</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-4">
                                <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-wider mb-2">Why the score improved</p>
                                <ul className="space-y-1.5">
                                    {[
                                        'Clearer role positioning',
                                        'Added searchable keywords recruiters actually filter by',
                                        'Removed vague, generic wording',
                                    ].map((reason, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-[#4B5563]">
                                            <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                            {reason}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <a href="#upload" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] transition-colors inline-flex items-center gap-1.5">See your own score <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg></a>
                    </div>
                </div>
            </section>

            {/* Upload */}
            <section id="upload" className="bg-[#F8FAFC] py-16 scroll-mt-20">
                <div className="max-w-xl mx-auto px-6">
                    <FileUploadWrapper />
                    {/* PDF instructions */}
                    <div className="mt-5 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">How to export your LinkedIn PDF</p>
                        <ol className="space-y-2.5">
                            {[
                                'Go to your LinkedIn profile page',
                                'Click "More" or "Resources" → then "Save to PDF"',
                                'Upload the downloaded file above'
                            ].map((step, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-5 h-5 rounded-md bg-[#0A66C2] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                    <span className="text-sm text-[#4B5563] font-medium">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Popular LinkedIn Guides - SEO Internal Links */}
            <section className="bg-gradient-to-b from-white to-gray-50 py-16 border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-2">Popular Guides</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-3">Master LinkedIn Optimization</h2>
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
                            <Link key={i} href={guide.href} className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-[#0A66C2] hover:shadow-lg transition-all">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                                    <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={guide.icon} /></svg>
                                </div>
                                <h3 className="text-sm font-bold text-[#0A0F1C] mb-1 group-hover:text-[#0A66C2] transition-colors">{guide.title}</h3>
                                <p className="text-xs text-[#6B7280] leading-relaxed">{guide.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Free Tools Section | high on page for visibility */}
            <section className="below-fold bg-white py-16 sm:py-20 border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                        <div>
                            <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-2">Free Tools</p>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-2">Everything you need to improve your LinkedIn profile</h2>
                            <p className="text-sm text-[#6B7280] max-w-lg">These tools help you fix the exact sections recruiters scan first. Free, no signup required.</p>
                        </div>
                        <Link href="/tools" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1.5 shrink-0">
                            View all tools <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </Link>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                            { name: 'Headline Generator', slug: 'linkedin-headline-generator', color: '#0A66C2', tag: 'Most Popular' },
                            { name: 'About Section Generator', slug: 'linkedin-about-generator', color: '#10B981', tag: 'AI Powered' },
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
                                className="flex items-center gap-2.5 bg-[#F8FAFC] border border-gray-100 rounded-lg px-3.5 py-3 hover:border-[#0A66C2] hover:bg-white hover:shadow-sm transition-all group"
                            >
                                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: tool.color }} />
                                <span className="text-[13px] font-medium text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors">{tool.name}</span>
                                {tool.tag && <span className="text-[10px] font-medium text-[#6B7280] ml-auto whitespace-nowrap">{tool.tag}</span>}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-white py-24 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">How It Works</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-12">Three steps to get recruiter-ready</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {[
                            { step: '01', title: 'Upload your LinkedIn profile', desc: 'Export your LinkedIn profile as a PDF and upload it. No login, no signup, no data stored.', icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5' },
                            { step: '02', title: 'Profile signals evaluated', desc: 'Your profile is evaluated across 30+ signals that recruiters scan — keywords, clarity, structure, and completeness.', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
                            { step: '03', title: 'Get your score and fixes', desc: 'Receive your score, specific improvements you can apply immediately, and a prioritized roadmap.', icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white flex items-center justify-center mb-4 shadow-[0_4px_12px_rgba(10,102,194,0.25)]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                </div>
                                <span className="text-[10px] font-bold text-[#0A66C2] uppercase tracking-widest">Step {item.step}</span>
                                <h3 className="text-base font-bold text-[#0A0F1C] mb-2 mt-1">{item.title}</h3>
                                <p className="text-sm text-[#4B5563] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What You Get */}
            <section className="below-fold bg-[#F8FAFC] py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">What You Get</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-10">Your LinkedInRank report</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            { title: 'Score & Tier', desc: 'A score out of 100 across 6 categories: Headline, About, Experience, Skills, Education, and Completeness.', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
                            { title: 'What to Fix', desc: 'Signal-level feedback showing exactly which parts of each section passed and which need work.', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                            { title: 'How to Fix It', desc: 'Specific rewrites and a prioritized roadmap showing how many points each improvement adds.', icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center mb-4">
                                    <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                </div>
                                <h3 className="text-base font-bold text-[#0A0F1C] mb-1.5">{item.title}</h3>
                                <p className="text-sm text-[#4B5563] leading-relaxed">{item.desc}</p>
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

            {/* Learn More — SEO content, compact */}
            <section className="bg-white py-16 border-t border-gray-100 below-fold">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-lg font-bold text-[#0A0F1C] mb-2">What Is LinkedIn Ranking?</h2>
                            <p className="text-sm text-[#4B5563] leading-relaxed mb-3">
                                LinkedIn ranking refers to how your profile appears in search results when recruiters search for professionals with your skills. A higher-ranked profile gets more views, connection requests, and job opportunities. LinkedInRank evaluates 30+ of these signals to give you a concrete score.
                            </p>
                            <Link href="/what-is-linkedin-rank" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1">
                                Learn more <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                            </Link>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[#0A0F1C] mb-2">How LinkedIn SEO Works</h2>
                            <p className="text-sm text-[#4B5563] leading-relaxed mb-3">
                                LinkedIn ranks profiles based on keyword relevance and profile completeness. Place primary keywords in your headline and about section, use industry-specific terms in experience descriptions, and keep your profile 100% complete for algorithm preference.
                            </p>
                            <Link href="/linkedin-keywords-guide" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1">
                                SEO guide <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
                        {[
                            { title: 'For Job Seekers', href: '/for-jobseekers' },
                            { title: 'For Students', href: '/linkedin-profile-for-students' },
                            { title: 'For Founders', href: '/for-founders' },
                            { title: 'Why We Are Different', href: '/about' },
                        ].map((item, i) => (
                            <Link key={i} href={item.href} className="text-xs font-medium text-[#4B5563] bg-[#F8FAFC] border border-gray-200 px-3.5 py-2 rounded-lg no-underline hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who This Is For */}
            <section className="bg-[#F8FAFC] py-16 sm:py-20 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">Who This Is For</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-8">LinkedInRank is useful for</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { audience: 'Students', desc: 'Building their first professional profile', icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5' },
                            { audience: 'Job Seekers', desc: 'Improving recruiter visibility', icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' },
                            { audience: 'Early-Career Professionals', desc: 'Clarifying professional positioning', icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6' },
                            { audience: 'Founders', desc: 'Strengthening personal brand', icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center mb-3">
                                    <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                </div>
                                <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.audience}</p>
                                <p className="text-xs text-[#6B7280] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What LinkedInRank Does NOT Analyze */}
            <section className="bg-white py-16 sm:py-20 border-t border-gray-100">
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
            <section className="below-fold bg-[#F8FAFC] py-24">
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
                            <div key={item.step} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center mb-3">
                                    <svg className="w-4.5 h-4.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                </div>
                                <p className="text-xs font-bold text-[#0A66C2] mb-1">Step {item.step}</p>
                                <h3 className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</h3>
                                <p className="text-xs text-[#6B7280] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                            <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Ready-to-use prompt</p>
                            <CopyPromptButton />
                        </div>
                        <p className="text-[15px] text-[#0A0F1C] leading-relaxed font-medium italic">
                            &ldquo;{AI_PROMPT}&rdquo;
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-5">
                            {['ChatGPT', 'Claude', 'Gemini', 'Copilot', 'Perplexity'].map((name) => (
                                <span key={name} className="text-[11px] font-semibold text-[#0A66C2] bg-[#EFF6FF] border border-[#DBEAFE] px-2.5 py-1 rounded-full">{name}</span>
                            ))}
                            <span className="text-[10px] text-[#6B7280] ml-1">Works with any AI</span>
                        </div>
                        <div className="mt-5 pt-4 border-t border-gray-100">
                            <Link href="/ai-prompts-linkedin" className="text-sm font-semibold text-[#0A66C2] no-underline hover:underline inline-flex items-center gap-1">
                                Browse 26 more AI prompts for every profile section <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Privacy and Trust */}
            <section className="below-fold bg-[#EFF6FF] py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-[#DBEAFE] mb-5">
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
                            <div key={i} className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                                <div className="w-10 h-10 rounded-lg bg-white border border-[#DBEAFE] flex items-center justify-center mx-auto mb-3">
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
            <section className="below-fold bg-white py-24 border-t border-gray-100">
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

                    <div className="mt-8 text-center">
                        <Link href="/faq" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1.5">
                            See all FAQs <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Blog / Latest Articles */}
            <section className="below-fold py-20 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">Blog</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-4">LinkedIn tips and strategies</h2>
                    <p className="text-[15px] text-[#4B5563] mb-10 max-w-xl">120+ articles covering headlines, about sections, experience writing, content creation, and more. All free.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
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
                                className="group bg-white border border-gray-200 rounded-xl p-5 no-underline hover:border-gray-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all"
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
            <section className="below-fold py-16 bg-[#F8FAFC] border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-2">Guides</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-8">Level up your LinkedIn presence</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
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
                            <Link key={i} href={guide.href} className="group bg-white border border-gray-200 rounded-xl px-4 py-3.5 no-underline hover:border-gray-300 hover:shadow-sm transition-all">
                                <h3 className="text-sm font-semibold text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors">{guide.title}</h3>
                            </Link>
                        ))}
                    </div>

                    {/* Headline by profession — compact pills */}
                    <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">Headlines by profession</p>
                    <div className="flex flex-wrap gap-1.5 mb-8">
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

            <SiteFooter />
        </main>
    )
}
