import FileUpload from '@/components/FileUpload'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HeroSlideshow from '@/components/HeroSlideshow'
import FaqAccordion from '@/components/FaqAccordion'
import CopyPromptButton from '@/components/CopyPromptButton'

const AI_PROMPT = 'Here is my LinkedIn PDF and my LinkedInRank analysis report. Rewrite my headline, About section, and all experience descriptions based on the scoring feedback. Keep your voice authentic.'

export default function HomePage() {

    return (
        <main id="main-content" className="min-h-screen bg-white">
            <SiteHeader />

            {/* Hero */}
            <section className="bg-white pt-16 sm:pt-24 pb-16 sm:pb-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left: Copy */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] mb-6">
                                <svg className="w-3.5 h-3.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
                                <span className="text-xs font-semibold text-[#0A66C2]">Free LinkedIn Rank Checker | No login required</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0A0F1C] leading-[1.15] mb-5 tracking-tight">
                                Check Your LinkedIn <span className="text-gradient-brand">Rank</span> for Free
                            </h1>
                            <p className="text-[16px] sm:text-[17px] text-[#4B5563] max-w-lg mb-8 leading-relaxed">
                                Upload your LinkedIn PDF and get your LinkedIn profile rank out of 100 across 30+ ranking signals. See exactly what&apos;s holding your profile back, get AI-powered rewrites, and improve your LinkedIn ranking in under 60 seconds.
                            </p>

                            {/* Trust row */}
                            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
                                {[
                                    'No login required',
                                    'Files auto-deleted',
                                    'Under 1 minute',
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                        <span className="text-sm text-[#4B5563]">{text}</span>
                                    </div>
                                ))}
                            </div>

                            <a href="#upload" className="btn-primary text-sm cursor-pointer">Analyze My Profile | It&apos;s Free</a>
                        </div>

                        {/* Right: Report Preview Slideshow */}
                        <HeroSlideshow />
                    </div>
                </div>
            </section>

            {/* Upload */}
            <section id="upload" className="bg-[#F8FAFC] py-16 scroll-mt-20">
                <div className="max-w-xl mx-auto px-6">
                    <FileUpload />
                    {/* PDF instructions */}
                    <div className="mt-5 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">How to export your LinkedIn PDF</p>
                        <ol className="space-y-2.5">
                            {[
                                'Go to your LinkedIn profile page',
                                'Click "More" then "Save to PDF"',
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

            {/* Free Tools Section | high on page for visibility */}
            <section className="below-fold bg-white py-16 sm:py-20 border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                        <div>
                            <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-2">Free Tools</p>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-2">12 Free LinkedIn Tools</h2>
                            <p className="text-sm text-[#6B7280] max-w-lg">AI-powered tools to optimize your profile, create content, and grow your network. No signup required.</p>
                        </div>
                        <Link href="/tools" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1.5 shrink-0">
                            View all tools <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </Link>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                            { name: 'Headline Generator', slug: 'linkedin-headline-generator', color: '#0A66C2', tag: 'Popular' },
                            { name: 'About Section Generator', slug: 'linkedin-about-generator', color: '#10B981', tag: null },
                            { name: 'Experience Generator', slug: 'linkedin-experience-generator', color: '#F59E0B', tag: null },
                            { name: 'Keyword Analyzer', slug: 'linkedin-profile-keyword-analyzer', color: '#8B5CF6', tag: null },
                            { name: 'Post Idea Generator', slug: 'linkedin-post-idea-generator', color: '#F97316', tag: null },
                            { name: 'Post Hook Generator', slug: 'linkedin-post-hook-generator', color: '#EF4444', tag: null },
                            { name: 'Story to Post', slug: 'linkedin-story-to-post-converter', color: '#06B6D4', tag: null },
                            { name: 'Content Planner', slug: 'linkedin-content-planner', color: '#6366F1', tag: null },
                            { name: 'Comment Generator', slug: 'linkedin-comment-generator', color: '#14B8A6', tag: null },
                            { name: 'Connection Messages', slug: 'linkedin-connection-message-generator', color: '#0EA5E9', tag: null },
                            { name: 'Profile Photo Ring', slug: 'linkedin-profile-photo-ring', color: '#EC4899', tag: null },
                            { name: 'QR Code Generator', slug: 'linkedin-qr-code-generator', color: '#0A0F1C', tag: null },
                        ].map(tool => (
                            <Link
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                className="flex items-center gap-2.5 bg-[#F8FAFC] border border-gray-100 rounded-lg px-3.5 py-3 hover:border-[#0A66C2] hover:bg-white hover:shadow-sm transition-all group"
                            >
                                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: tool.color }} />
                                <span className="text-[13px] font-medium text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors">{tool.name}</span>
                                {tool.tag && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 text-[#0A66C2] ml-auto">{tool.tag}</span>}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="below-fold bg-white py-24 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">How It Works</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-12">Three steps to a stronger profile</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { step: '01', title: 'Upload PDF', desc: 'Export your LinkedIn profile as a PDF and upload it. No login, no signup.' },
                            { step: '02', title: 'Signal Analysis', desc: 'AI + rule-based evaluation across 30+ visible profile signals, adapted to your career stage.' },
                            { step: '03', title: 'Improvement Roadmap', desc: 'Structured score breakdown with personalized recommendations and a prioritized path to a stronger profile.' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-shadow">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white text-sm font-bold flex items-center justify-center mb-4">{item.step}</div>
                                <h3 className="text-base font-bold text-[#0A0F1C] mb-2">{item.title}</h3>
                                <p className="text-sm text-[#4B5563] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Evaluation Framework | Card-based */}
            <section className="below-fold bg-[#F8FAFC] py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">Evaluation Framework</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-3">How your profile is evaluated</h2>
                    <p className="text-[15px] text-[#4B5563] mb-12 max-w-2xl">We evaluate 30+ visible profile signals across headline clarity, experience depth, keyword alignment, and structure. Only what appears in your LinkedIn PDF is scored.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            { label: 'Headline', weight: 20, signals: ['Role clarity', 'Keyword presence', 'Positioning strength'] },
                            { label: 'About / Summary', weight: 20, signals: ['Professional direction', 'Skills mentioned', 'Structure & readability'] },
                            { label: 'Experience', weight: 25, signals: ['Action verbs & impact', 'Role descriptions', 'Quantified outcomes'] },
                            { label: 'Skills', weight: 15, signals: ['Relevance to role', 'Specificity level', 'Tools & platforms'] },
                            { label: 'Education', weight: 10, signals: ['Degree completeness', 'Field alignment', 'Certifications'] },
                            { label: 'Completeness', weight: 10, signals: ['Section coverage', 'Content depth', 'Logical structure'] },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-bold text-[#0A0F1C]">{item.label}</h3>
                                    <span className="text-xs font-bold text-[#0A66C2] bg-[#EFF6FF] px-2 py-0.5 rounded-md">{item.weight} pts</span>
                                </div>
                                <ul className="space-y-1.5">
                                    {item.signals.map((s, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-[#6B7280]">
                                            <div className="w-1 h-1 rounded-full bg-[#0A66C2] shrink-0"></div>
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What You Get */}
            <section className="below-fold bg-white py-24 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">What You Get</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-12">Your complete LinkedInRank report includes</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            { title: 'Profile Score & Tier', desc: 'Score out of 100 with Bronze, Silver, Gold, or Platinum tier and peer context for your career stage.', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
                            { title: 'Category Breakdown', desc: 'Detailed scores for Headline, About, Experience, Skills, Education, and Completeness with signal-level feedback.', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
                            { title: 'Signal-Level Feedback', desc: 'See exactly which signals passed and which need work within each category | no guessing what to fix.', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                            { title: 'Personalized Recommendations', desc: 'Specific fixes for your weakest areas with before/after examples you can implement immediately.', icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' },
                            { title: 'Improvement Roadmap', desc: 'Prioritized steps showing exactly how many points each fix adds to your LinkedInRank score.', icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6' },
                            { title: 'Best Practices', desc: 'LinkedIn profile best practices based on your career stage | actionable tips you can apply right away.', icon: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-shadow">
                                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center mb-4">
                                    <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                </div>
                                <h3 className="text-base font-bold text-[#0A0F1C] mb-1.5">{item.title}</h3>
                                <p className="text-sm text-[#4B5563] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
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

            {/* Privacy */}
            <section className="below-fold bg-[#EFF6FF] py-20">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-[#DBEAFE] mb-5">
                        <svg className="w-6 h-6 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#0A0F1C] mb-3">Your data stays yours</h2>
                    <p className="text-[15px] text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                        Your file is processed in memory and never stored. No accounts, no cookies, no tracking.
                        Analysis runs entirely server-side and results are discarded after delivery.
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section className="below-fold bg-white py-24 border-t border-gray-100">
                <div className="max-w-2xl mx-auto px-6">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">FAQ</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-10">Common questions</h2>

                    <FaqAccordion />

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
                            { href: '/blogs/how-to-write-linkedin-headline', title: 'How to Write a LinkedIn Headline That Gets Clicks', tag: 'Headlines' },
                            { href: '/blogs/linkedin-about-section-examples', title: '20 LinkedIn About Section Examples by Industry', tag: 'About' },
                            { href: '/blogs/how-to-write-linkedin-experience', title: 'How to Write LinkedIn Experience That Stands Out', tag: 'Experience' },
                            { href: '/blogs/what-to-post-on-linkedin-2025', title: 'What to Post on LinkedIn in 2025', tag: 'Content' },
                            { href: '/blogs/linkedin-content-calendar-template', title: 'LinkedIn Content Calendar Template', tag: 'Planning' },
                            { href: '/blogs/linkedin-connection-request-message-templates', title: 'LinkedIn Connection Request Templates', tag: 'Networking' },
                        ].map((post, i) => (
                            <Link
                                key={i}
                                href={post.href}
                                className="group bg-[#F8FAFC] border border-gray-100 rounded-xl p-5 no-underline hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all"
                            >
                                <span className="text-[10px] font-bold text-[#0A66C2] uppercase tracking-wider">{post.tag}</span>
                                <h3 className="text-sm font-bold text-[#0A0F1C] mt-1.5 mb-1 group-hover:text-[#0A66C2] transition-colors leading-snug">{post.title}</h3>
                                <span className="text-[11px] text-[#6B7280]">3 min read</span>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/blogs" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1.5">
                            Browse all 120+ articles <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Guides */}
            <section className="below-fold py-20 bg-[#F8FAFC] border-t border-gray-100 border-b border-b-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3">Guides</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] mb-4">Level up your LinkedIn presence</h2>
                    <p className="text-[15px] text-[#4B5563] mb-10 max-w-xl">In-depth guides to help you optimize every section of your profile, avoid common mistakes, and stand out to recruiters.</p>

                    {/* Featured guides */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
                        {[
                            { href: '/linkedin-optimization-guide', title: 'Full Optimization Guide', desc: 'A complete walkthrough to optimize every section of your LinkedIn profile.', color: '#0A66C2' },
                            { href: '/linkedin-headline-guide', title: 'Headline Guide', desc: 'Craft a headline that gets you found and makes recruiters click.', color: '#2563EB' },
                            { href: '/linkedin-about-guide', title: 'About Section Guide', desc: 'Write a compelling About section that tells your professional story.', color: '#4F46E5' },
                            { href: '/linkedin-profile-checklist', title: 'Profile Checklist', desc: 'A section-by-section checklist to make sure nothing is missed.', color: '#7C3AED' },
                            { href: '/recruiter-psychology', title: 'Recruiter Psychology', desc: 'What recruiters actually look at and how they evaluate profiles.', color: '#9333EA' },
                            { href: '/linkedin-mistakes', title: 'Top 10 Mistakes', desc: 'The most common LinkedIn profile mistakes and how to fix them.', color: '#A855F7' },
                        ].map((guide, i) => (
                            <Link
                                key={i}
                                href={guide.href}
                                className="group bg-white border border-gray-200 rounded-xl p-5 no-underline hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:border-gray-300 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
                            >
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: guide.color + '12', color: guide.color }}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                                </div>
                                <h3 className="text-sm font-bold text-[#0A0F1C] mb-1 group-hover:text-[#0A66C2] transition-colors">{guide.title}</h3>
                                <p className="text-xs text-[#6B7280] leading-relaxed">{guide.desc}</p>
                            </Link>
                        ))}
                    </div>

                    {/* By role */}
                    <div className="mb-8">
                        <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">By Role</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { href: '/for-students', title: 'For Students', desc: 'Build a strong profile as a student or new graduate.', color: '#0A66C2' },
                                { href: '/for-jobseekers', title: 'For Job Seekers', desc: 'Get noticed by recruiters and hiring managers.', color: '#2563EB' },
                                { href: '/for-founders', title: 'For Founders', desc: 'Position yourself as a credible leader.', color: '#4F46E5' },
                            ].map((guide, i) => (
                                <Link key={i} href={guide.href} className="group flex items-center gap-3 p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-lg no-underline hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: guide.color + '12', color: guide.color }}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors">{guide.title}</p>
                                        <p className="text-[11px] text-[#6B7280]">{guide.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* By headline */}
                    <div className="mb-8">
                        <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">Headline By Profession</p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {[
                                { href: '/linkedin-headline-software-engineers', title: 'Software Engineers' },
                                { href: '/linkedin-headline-marketers', title: 'Marketers' },
                                { href: '/linkedin-headline-designers', title: 'Designers' },
                                { href: '/linkedin-headline-mba', title: 'MBA Graduates' },
                                { href: '/linkedin-headline-data-scientists', title: 'Data Scientists' },
                                { href: '/linkedin-headline-product-managers', title: 'Product Managers' },
                                { href: '/linkedin-headline-consultants', title: 'Consultants' },
                                { href: '/linkedin-headline-sales', title: 'Sales Professionals' },
                                { href: '/linkedin-headline-hr', title: 'HR & Recruiters' },
                                { href: '/linkedin-headline-finance', title: 'Finance & Accounting' },
                                { href: '/linkedin-headline-healthcare', title: 'Healthcare' },
                                { href: '/linkedin-headline-teachers', title: 'Educators' },
                            ].map((guide, i) => (
                                <Link key={i} href={guide.href} className="text-xs font-semibold text-[#0A66C2] bg-[#EFF6FF] border border-[#DBEAFE] px-3.5 py-2 rounded-lg no-underline hover:bg-[#DBEAFE] transition-colors">
                                    {guide.title} →
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* AI Prompts */}
                    <div className="mb-8">
                        <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">AI Prompt Guides</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[
                                { href: '/ai-prompts-linkedin', title: 'All AI Prompts', desc: '26 prompts for every section', color: '#0A66C2' },
                                { href: '/ai-prompts-linkedin-headline', title: 'Headline Prompts', desc: '6 headline templates', color: '#2563EB' },
                                { href: '/ai-prompts-linkedin-about', title: 'About Prompts', desc: '6 about section templates', color: '#4F46E5' },
                                { href: '/ai-prompts-linkedin-experience', title: 'Experience Prompts', desc: '5 experience templates', color: '#7C3AED' },
                                { href: '/ai-prompts-linkedin-skills', title: 'Skills Prompts', desc: '4 skills optimization templates', color: '#9333EA' },
                                { href: '/ai-prompts-linkedin-summary', title: 'Full Profile Rewrite', desc: '5 positioning templates', color: '#A855F7' },
                            ].map((guide, i) => (
                                <Link key={i} href={guide.href} className="group flex items-center gap-3 p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-lg no-underline hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: guide.color + '12', color: guide.color }}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors">{guide.title}</p>
                                        <p className="text-[11px] text-[#6B7280]">{guide.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* More guides */}
                    <div className="mb-8">
                        <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">More Guides</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {[
                                { href: '/linkedin-keywords-guide', title: 'Keywords & SEO Guide', icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' },
                                { href: '/linkedin-profile-photo-guide', title: 'Profile Photo Guide', icon: 'M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z' },
                                { href: '/linkedin-personal-branding', title: 'Personal Branding', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
                                { href: '/linkedin-content-strategy', title: 'Content Strategy', icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z' },
                                { href: '/linkedin-best-practices', title: 'Best Practices', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                                { href: '/linkedin-resume-vs-profile', title: 'Resume vs Profile', icon: 'M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5' },
                                { href: '/get-noticed-recruiters', title: 'Get Noticed by Recruiters', icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' },
                                { href: '/top-1-percent-profiles', title: 'Top 1% Profiles', icon: 'M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0' },
                                { href: '/viral-post-formulas', title: 'Viral Post Formulas', icon: 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z' },
                                { href: '/compare-linkedin-review-tools', title: 'Compare Review Tools', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
                                { href: '/linkedinrank-vs-manual-audits', title: 'LinkedInRank vs Manual Audits', icon: 'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z' },
                            ].map((guide, i) => (
                                <Link key={i} href={guide.href} className="group flex items-center gap-3 px-3.5 py-3 bg-white border border-gray-100 rounded-xl no-underline hover:border-[#DBEAFE] hover:shadow-sm transition-all">
                                    <div className="w-7 h-7 rounded-lg bg-[#F8FAFC] border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#EFF6FF] group-hover:border-[#DBEAFE] transition-colors">
                                        <svg className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-[#0A66C2] transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={guide.icon} /></svg>
                                    </div>
                                    <span className="text-xs font-medium text-[#4B5563] group-hover:text-[#0A66C2] transition-colors">{guide.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <Link href="/linkedin-optimization-guide" className="text-sm font-semibold text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors inline-flex items-center gap-1.5">
                            View complete guide directory <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </Link>
                    </div>
                </div>
            </section>

            <SiteFooter />
        </main>
    )
}
