import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'The Story Behind LinkedInRank | How the Best LinkedIn Scorer Was Built',
    description: 'How LinkedInRank started | from optimizing LinkedIn profiles for friends and family to building the world\'s best free LinkedIn profile scoring tool used by thousands of professionals.',
    keywords: 'linkedinrank story, linkedin profile tool origin, linkedin optimization journey, linkedinrank founder, why linkedinrank was built, linkedin scorer story',
    alternates: { canonical: 'https://linkedinrank.com/story' },
    openGraph: {
        title: 'The Story Behind LinkedInRank',
        description: 'From helping friends optimize their LinkedIn profiles to building the world\'s best free LinkedIn scorer.',
        url: 'https://linkedinrank.com/story',
    },
}

export default function StoryPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            {/* Hero */}
            <section className="relative bg-gradient-to-b from-[#F8FAFC] to-white pt-16 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%20fill%3D%22%23E5E7EB%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
                <div className="max-w-3xl mx-auto px-6 text-center relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                        <div className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                        <span className="text-xs font-semibold text-[#0A66C2]">Our Story</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">How LinkedIn Rank Started</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                        From optimizing my own profile to building a tool used by thousands. Here is the real story.
                    </p>
                </div>
            </section>

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                {/* Intro quote */}
                <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-2xl p-6 sm:p-8 mb-12">
                    <div className="flex gap-3 items-start">
                        <svg className="w-8 h-8 text-[#0A66C2] shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                        <div>
                            <p className="text-[15px] text-[#0A0F1C] leading-relaxed font-medium italic">
                                I did not set out to build a product. LinkedIn Rank started because I spent a long time trying to figure out my own LinkedIn profile, and eventually realized that what I had learned might be useful to other people too.
                            </p>
                            <p className="text-sm text-[#6B7280] mt-3 font-medium">Bhavishya Singla, Founder</p>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-[#0A66C2] via-[#DBEAFE] to-transparent hidden sm:block" />

                    <div className="space-y-12">
                        {/* Chapter 1 */}
                        <div className="relative flex gap-6 sm:gap-8">
                            <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] items-center justify-center">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">Going deep on LinkedIn</h2>
                                <p className="text-[15px] text-[#4B5563] leading-relaxed mb-3">
                                    My name is Bhavishya Singla. I have been actively using LinkedIn for over two years now. Not casually | actively. Rewriting my headline, restructuring my About section, reworking experience descriptions, testing what gets noticed and what gets ignored. I am interested in marketing, and LinkedIn felt like the most important platform to understand deeply. So I went deep.
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                                    {[
                                        { num: '2+', label: 'Years studying LinkedIn' },
                                        { num: '100+', label: 'Videos & courses' },
                                        { num: '30+', label: 'Signals identified' },
                                        { num: '6', label: 'Scoring categories' },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-3 text-center">
                                            <span className="text-lg font-bold text-[#0A66C2]">{stat.num}</span>
                                            <p className="text-[10px] text-[#6B7280] font-medium mt-0.5 uppercase tracking-wide">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Chapter 2 */}
                        <div className="relative flex gap-6 sm:gap-8">
                            <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] items-center justify-center">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">Learning from everywhere</h2>
                                <p className="text-[15px] text-[#4B5563] leading-relaxed mb-3">
                                    I watched more YouTube videos about LinkedIn optimization than I can count. I went through courses, read ebooks, followed creators who had built real audiences on the platform, and studied what made certain profiles stand out. Not in an abstract way | I would literally open two profiles side by side and compare them line by line.
                                </p>
                                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                                    <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Patterns that emerged</p>
                                    <div className="space-y-2">
                                        {[
                                            'What makes a headline searchable by recruiters',
                                            'What makes an About section actually get read',
                                            'How experience descriptions show impact vs. listing duties',
                                            'Which skills matter for visibility in search',
                                            'How completeness affects recruiter discovery',
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm text-[#4B5563]">
                                                <svg className="w-4 h-4 text-[#0A66C2] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-[15px] text-[#4B5563] leading-relaxed mt-3">
                                    None of this was secret knowledge. It was just scattered across dozens of sources, and putting it all together took real time.
                                </p>
                            </div>
                        </div>

                        {/* Chapter 3 */}
                        <div className="relative flex gap-6 sm:gap-8">
                            <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] items-center justify-center">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">Helping friends and family</h2>
                                <p className="text-[15px] text-[#4B5563] leading-relaxed mb-3">
                                    Once I had a decent understanding of what worked, friends started asking me to look at their profiles. Then family members. Then friends of friends. The conversations were always the same:
                                </p>
                                <div className="bg-[#F8FAFC] border-l-4 border-[#0A66C2] rounded-r-xl p-4 mb-3">
                                    <p className="text-[15px] text-[#0A0F1C] italic font-medium">&ldquo;Can you just take a look and tell me what to fix?&rdquo;</p>
                                </div>
                                <p className="text-[15px] text-[#4B5563] leading-relaxed mb-3">
                                    I would go through their profiles section by section | headline, about, experience, skills | and give them specific feedback. Not vague advice like &ldquo;make it more engaging.&rdquo; Actual rewrites. Before and after. Copy-paste ready suggestions they could use immediately.
                                </p>
                                <p className="text-[15px] text-[#4B5563] leading-relaxed">
                                    It was genuinely satisfying. But it was also clear that doing this manually, one profile at a time, did not scale. The same patterns came up again and again. The same mistakes, the same missed opportunities, the same low-hanging improvements that could make a real difference.
                                </p>
                            </div>
                        </div>

                        {/* Chapter 4 */}
                        <div className="relative flex gap-6 sm:gap-8">
                            <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] items-center justify-center">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 21h18" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 0h4.5m-4.5 0l5.25 5.25M14.25 18.75v-4.5m0 0h4.5m-4.5 0l5.25 5.25" /></svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">Turning it into a tool</h2>
                                <p className="text-[15px] text-[#4B5563] leading-relaxed mb-4">
                                    The idea was simple: take everything I had learned | from videos, courses, hands-on optimization, and reviewing dozens of profiles | and put it into a tool that could do the same analysis automatically. Not a chatbot. Not a vague score with no explanation. A structured, transparent evaluation.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                                    {[
                                        { icon: '01', title: 'Rule-based scoring', desc: '30+ signals across 6 categories with clear point allocation' },
                                        { icon: '02', title: 'AI analysis', desc: 'Content quality evaluation and personalized recommendations' },
                                        { icon: '03', title: 'Career detection', desc: 'Students are not judged the same as 15-year professionals' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                                            <span className="text-xs font-bold text-[#0A66C2] bg-[#EFF6FF] w-7 h-7 rounded-lg inline-flex items-center justify-center mb-2">{item.icon}</span>
                                            <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</p>
                                            <p className="text-xs text-[#6B7280] leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[15px] text-[#4B5563] leading-relaxed">
                                    I wanted it to feel like getting honest feedback from someone who knows what they are looking at | not like being sold something.
                                </p>
                            </div>
                        </div>

                        {/* Chapter 5 */}
                        <div className="relative flex gap-6 sm:gap-8">
                            <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] items-center justify-center">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">The domain</h2>
                                <div className="bg-gradient-to-r from-[#0A0F1C] to-[#1E293B] rounded-xl p-5 mb-3">
                                    <p className="text-center">
                                        <span className="text-2xl font-bold text-white tracking-tight">LinkedIn</span>
                                        <span className="text-2xl font-bold text-[#0A66C2] tracking-tight">Rank</span>
                                        <span className="text-lg text-gray-400 font-medium">.com</span>
                                    </p>
                                    <p className="text-xs text-gray-400 text-center mt-1">The name said exactly what the tool does</p>
                                </div>
                                <p className="text-[15px] text-[#4B5563] leading-relaxed">
                                    At some point during this process, I searched for LinkedInRank.com. It was available. That felt like a sign. The name said exactly what the tool does | it ranks the strength of your LinkedIn profile. No clever wordplay needed. I registered it and started building.
                                </p>
                            </div>
                        </div>

                        {/* Chapter 6 */}
                        <div className="relative flex gap-6 sm:gap-8">
                            <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] items-center justify-center">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">Where it is now</h2>
                                <p className="text-[15px] text-[#4B5563] leading-relaxed mb-3">
                                    LinkedIn Rank is live. You can upload your LinkedIn PDF and get a structured evaluation with a score breakdown, improvement path, headline alternatives, and personalized recommendations. No login, no data storage, no tracking.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {['Score breakdown', 'Improvement path', 'Signal-level feedback', 'Personalized recommendations', 'No login required', 'Zero data storage'].map((item, i) => (
                                        <span key={i} className="text-xs font-semibold text-[#0A66C2] bg-[#EFF6FF] border border-[#DBEAFE] px-3 py-1.5 rounded-full">{item}</span>
                                    ))}
                                </div>
                                <p className="text-[15px] text-[#4B5563] leading-relaxed">
                                    It is not perfect. It is a work in progress, and I expect it to keep evolving. The scoring will get more nuanced. The recommendations will get sharper. New features will come based on what people actually need.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thank you section */}
                <div className="mt-16 bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-2xl p-6 sm:p-8 text-center">
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">Thank you</h2>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed max-w-lg mx-auto mb-3">
                        If you have used LinkedIn Rank, thank you. Genuinely. Every person who uploads a profile and finds something useful in the results makes the time spent building this worth it.
                    </p>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed max-w-lg mx-auto mb-5">
                        If you have suggestions | things that could be better, signals I should evaluate differently, recommendations that felt off | I want to hear them. This tool is built for the people who use it, and your feedback directly shapes what comes next.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It's Free</Link>
                        <a href="https://www.linkedin.com/in/bhavishyasingla1/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors">Connect with me on LinkedIn</a>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#DBEAFE]">
                        <p className="text-sm text-[#6B7280] font-medium">| Bhavishya Singla, Founder of LinkedIn Rank</p>
                    </div>
                </div>
            </article>

            <SiteFooter />
        </main>
    )
}
