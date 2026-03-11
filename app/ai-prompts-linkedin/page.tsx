import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'

export const metadata: Metadata = {
    title: 'AI Prompts for LinkedIn | 26+ Copy-Paste Templates for Every Section (2026)',
    description: 'The complete collection of AI prompts for optimizing every section of your LinkedIn profile in 2026. Ready-to-use templates for ChatGPT, Claude, and Gemini. Used with LinkedInRank for best results.',
    keywords: 'ai prompts linkedin 2026, chatgpt linkedin prompts, claude linkedin prompts, gemini linkedin prompts, linkedin profile ai, linkedin optimization prompts, ai linkedin generator, linkedin ai rewrite prompts',
    alternates: { canonical: 'https://linkedinrank.com/ai-prompts-linkedin' },
    openGraph: {
        title: 'AI Prompts for LinkedIn | 26+ Copy-Paste Templates',
        description: 'Ready-to-use AI prompts for ChatGPT, Claude, and Gemini to optimize every LinkedIn section.',
        url: 'https://linkedinrank.com/ai-prompts-linkedin',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AI Prompts for Every LinkedIn Profile Section | Complete Prompt Library',
    description: 'The complete collection of 26 AI prompts for optimizing every section of your LinkedIn profile. Ready-to-use templates for ChatGPT, Claude, and Gemini.',
    author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
    mainEntityOfPage: 'https://linkedinrank.com/ai-prompts-linkedin',
    datePublished: '2025-02-12',
    dateModified: '2025-02-12',
}

const GUIDE_SECTIONS = [
    {
        title: 'Headline Prompts',
        href: '/ai-prompts-linkedin-headline',
        count: 6,
        icon: '💼',
        description: 'Starter, keyword-first, value-prop, career-stage, rewriter, and industry-specific headline prompts.',
        highlights: ['Front-load searchable keywords', 'Career stage adaptation', 'Before/after rewriting'],
    },
    {
        title: 'About Section Prompts',
        href: '/ai-prompts-linkedin-about',
        count: 6,
        icon: '📝',
        description: 'First-person story, problem-solver framework, career changer, student, executive, and rewriter prompts.',
        highlights: ['Hook + Story + Proof + CTA structure', 'Career-stage specific templates', 'Scoring and rewriting existing About'],
    },
    {
        title: 'Experience Prompts',
        href: '/ai-prompts-linkedin-experience',
        count: 5,
        icon: '🏆',
        description: 'Bullet rewriter, responsibility-to-achievement converter, gap filler, technical role, and internship prompts.',
        highlights: ['Action Verb + Metric + Impact formula', 'Responsibility → Achievement conversion', 'Technical and non-technical variants'],
    },
    {
        title: 'Skills Prompts',
        href: '/ai-prompts-linkedin-skills',
        count: 4,
        icon: '🎯',
        description: 'Skills audit, recruiter keyword research, role transition mapping, and endorsement strategy prompts.',
        highlights: ['Recruiter search term reverse-engineering', 'Top 3 pinned skills strategy', 'Skill gap analysis for career changers'],
    },
    {
        title: 'Summary & Positioning Prompts',
        href: '/ai-prompts-linkedin-summary',
        count: 5,
        icon: '🧭',
        description: 'Full profile rewrite, positioning statement, LinkedIn-to-resume adapter, thought leader, and LinkedInRank audit prompts.',
        highlights: ['Complete profile overhaul in one prompt', 'Personal positioning framework', 'LinkedInRank report → action plan'],
    },
]

const WORKFLOW_STEPS = [
    { step: '1', title: 'Score your profile', description: 'Upload your LinkedIn PDF to LinkedInRank and get your baseline score across all sections.', link: '/', linkText: 'Analyze now →' },
    { step: '2', title: 'Identify weak sections', description: 'Your report shows exactly which sections need work | Headline, About, Experience, Skills, or Completeness.' },
    { step: '3', title: 'Pick the right prompts', description: 'Use the section-specific prompt guides below to generate improved content with ChatGPT, Claude, or Gemini.' },
    { step: '4', title: 'Update your profile', description: 'Implement the AI-generated improvements on your actual LinkedIn profile. Edit each section one at a time.' },
    { step: '5', title: 'Re-analyze', description: 'Export a new LinkedIn PDF and re-analyze with LinkedInRank. Track your score improvement and repeat.', link: '/', linkText: 'Re-analyze →' },
]

export default function AIPromptsLinkedInPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <section className="relative bg-gradient-to-b from-[#F8FAFC] to-white pt-16 sm:pt-24 pb-14 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%20fill%3D%22%23E5E7EB%22%2F%3E%3C%2Fsvg%3E')] opacity-40" />
                <div className="max-w-3xl mx-auto px-6 text-center relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                        <svg className="w-3.5 h-3.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                        <span className="text-xs font-semibold text-[#0A66C2]">Complete Prompt Library</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-[#0A0F1C] leading-tight mb-5">AI Prompts for Every LinkedIn Section</h1>
                    <p className="text-[16px] sm:text-[17px] text-[#4B5563] max-w-xl mx-auto leading-relaxed">
                        26 copy-paste prompts for ChatGPT, Claude, and Gemini | organized by profile section, career stage, and goal. Turn your LinkedInRank score into a Platinum profile.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <span className="text-xs font-medium text-[#0A66C2] bg-[#EFF6FF] border border-[#DBEAFE] px-3 py-1.5 rounded-full">26 prompts</span>
                        <span className="text-xs font-medium text-[#0A66C2] bg-[#EFF6FF] border border-[#DBEAFE] px-3 py-1.5 rounded-full">5 profile sections</span>
                        <span className="text-xs font-medium text-[#0A66C2] bg-[#EFF6FF] border border-[#DBEAFE] px-3 py-1.5 rounded-full">All career stages</span>
                        <span className="text-xs font-medium text-[#0A66C2] bg-[#EFF6FF] border border-[#DBEAFE] px-3 py-1.5 rounded-full">100% free</span>
                    </div>
                </div>
            </section>

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
                {/* Workflow */}
                <div className="mb-16">
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                        </div>
                        The 5-Step Workflow
                    </h2>
                    <div className="space-y-3">
                        {WORKFLOW_STEPS.map((s) => (
                            <div key={s.step} className="flex items-start gap-4 bg-[#F8FAFC] border border-gray-100 rounded-xl p-4">
                                <div className="w-8 h-8 rounded-full bg-[#0A66C2] text-white text-sm font-bold flex items-center justify-center shrink-0">{s.step}</div>
                                <div>
                                    <p className="text-sm font-bold text-[#0A0F1C]">{s.title}</p>
                                    <p className="text-sm text-[#4B5563] mt-0.5">{s.description} {s.link && <Link href={s.link} className="text-[#0A66C2] hover:underline font-medium">{s.linkText}</Link>}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section guides */}
                <div className="mb-16">
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                        </div>
                        Prompt Guides by Section
                    </h2>
                    <div className="space-y-4">
                        {GUIDE_SECTIONS.map((section) => (
                            <Link key={section.href} href={section.href} className="block bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#DBEAFE] hover:shadow-[0_4px_16px_rgba(10,102,194,0.08)] transition-all no-underline group">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{section.icon}</span>
                                        <div>
                                            <h3 className="text-base font-bold text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors">{section.title}</h3>
                                            <span className="text-xs text-[#6B7280]">{section.count} prompts</span>
                                        </div>
                                    </div>
                                    <svg className="w-5 h-5 text-[#6B7280] group-hover:text-[#0A66C2] transition-colors shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                                </div>
                                <p className="text-sm text-[#4B5563] mb-3">{section.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {section.highlights.map((h, hi) => (
                                        <span key={hi} className="text-[11px] text-[#0A66C2] bg-[#EFF6FF] px-2 py-0.5 rounded-full">{h}</span>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Quick reference table */}
                <div className="mb-16">
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>
                        </div>
                        Which Prompt Should I Use?
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-[#F8FAFC]">
                                    <th className="text-left text-xs font-bold text-[#6B7280] uppercase tracking-wider py-3 px-4 rounded-l-lg">If you want to...</th>
                                    <th className="text-left text-xs font-bold text-[#6B7280] uppercase tracking-wider py-3 px-4 rounded-r-lg">Use this prompt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { goal: 'Get found by recruiters on LinkedIn', prompt: 'Keyword-First Headline', href: '/ai-prompts-linkedin-headline#keyword' },
                                    { goal: 'Write a compelling About section from scratch', prompt: 'First-Person Story', href: '/ai-prompts-linkedin-about#first-person' },
                                    { goal: 'Turn job responsibilities into achievements', prompt: 'Responsibility → Achievement Converter', href: '/ai-prompts-linkedin-experience#responsibility-to-achievement' },
                                    { goal: 'Know what skills recruiters search for', prompt: 'Recruiter Keyword Research', href: '/ai-prompts-linkedin-skills#keyword-research' },
                                    { goal: 'Rewrite your entire profile at once', prompt: 'Full Profile Rewrite', href: '/ai-prompts-linkedin-summary#full-profile' },
                                    { goal: 'Position yourself as an industry expert', prompt: 'Thought Leader Positioning', href: '/ai-prompts-linkedin-summary#thought-leader' },
                                    { goal: 'Optimize as a student or new grad', prompt: 'Student & New Grad', href: '/ai-prompts-linkedin-about#student' },
                                    { goal: 'Transition to a new career', prompt: 'Career Changer', href: '/ai-prompts-linkedin-about#career-changer' },
                                    { goal: 'Use your LinkedInRank report to improve', prompt: 'Complete LinkedIn Audit', href: '/ai-prompts-linkedin-summary#complete-audit' },
                                    { goal: 'Improve existing content (not start fresh)', prompt: 'Headline / About Rewriter', href: '/ai-prompts-linkedin-headline#rewrite' },
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}>
                                        <td className="py-2.5 px-4 text-[#4B5563]">{row.goal}</td>
                                        <td className="py-2.5 px-4"><Link href={row.href} className="text-[#0A66C2] font-medium no-underline hover:underline">{row.prompt} →</Link></td>
                                    </tr>
                                ))}
                                </tbody>
                        </table>
                    </div>
                </div>

                {/* Tips section */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)] mb-16">
                    <h2 className="text-lg font-bold text-[#0A0F1C] mb-5">Getting the best results from AI prompts</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { title: 'Be specific with your inputs', text: 'The more detail you provide in the [brackets], the better the output. Vague inputs = generic results.' },
                            { title: 'Don\'t accept the first output', text: 'Ask for 2-3 variations. Say "make it more concise" or "make it sound more like me" to refine.' },
                            { title: 'Verify before publishing', text: 'AI can fabricate metrics or exaggerate. Always fact-check numbers and claims before posting to LinkedIn.' },
                            { title: 'Keep your authentic voice', text: 'If the AI output doesn\'t sound like you, tell it your preferred tone: casual, formal, direct, warm, etc.' },
                            { title: 'Use LinkedInRank as your benchmark', text: 'Analyze before AND after changes. The score delta tells you exactly how much you improved.' },
                            { title: 'Update one section at a time', text: 'Don\'t change everything at once. Update, re-analyze, learn what works, then move to the next section.' },
                        ].map((tip, i) => (
                            <div key={i} className="bg-[#F8FAFC] rounded-xl p-4">
                                <p className="text-sm font-bold text-[#0A0F1C] mb-1">{tip.title}</p>
                                <p className="text-xs text-[#4B5563] leading-relaxed">{tip.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-2xl p-8 sm:p-10 text-center">
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">Start with your score</h2>
                    <p className="text-sm text-[#4B5563] mb-5 max-w-md mx-auto">Know exactly which sections need work before using these prompts. Analyze your profile in under 60 seconds.</p>
                    <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It&apos;s Free</Link>
                </div>

                {/* Related guides */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Guides</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                            { label: 'About Section Guide', href: '/linkedin-about-guide' },
                            { label: 'Keywords Guide', href: '/linkedin-keywords-guide' },
                            { label: 'Profile Checklist', href: '/linkedin-profile-checklist' },
                            { label: 'Top 10 Mistakes', href: '/linkedin-mistakes' },
                            { label: 'Recruiter Psychology', href: '/recruiter-psychology' },
                            { label: 'Personal Branding', href: '/linkedin-personal-branding' },
                            { label: 'Content Strategy', href: '/linkedin-content-strategy' },
                            { label: 'For Students', href: '/for-students' },
                            { label: 'For Job Seekers', href: '/for-jobseekers' },
                        ].map((item, i) => (
                            <Link key={i} href={item.href} className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">{item.label}</Link>
                        ))}
                    </div>
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
