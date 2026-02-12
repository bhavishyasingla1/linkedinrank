import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'AI Prompts for LinkedIn Skills Section — Keyword Optimization (2026)',
    description: 'AI prompts to identify the right skills for your LinkedIn profile in 2026. Optimize skill order and match recruiter search terms for maximum visibility. Free scoring with LinkedInRank.',
    keywords: 'ai prompts linkedin skills 2026, chatgpt linkedin skills optimization, linkedin skills keywords, linkedin skills section ai, best linkedin skills prompt, linkedin skills ai template',
    alternates: { canonical: 'https://linkedinrank.com/ai-prompts-linkedin-skills' },
    openGraph: {
        title: 'AI Prompts for LinkedIn Skills Section — Keyword Optimization',
        description: 'AI prompts to identify and optimize LinkedIn skills for maximum recruiter visibility.',
        url: 'https://linkedinrank.com/ai-prompts-linkedin-skills',
    },
}
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AI Prompts for LinkedIn Skills — Keyword Research & Optimization',
    description: '4 AI prompts to identify the right skills, optimize skill order, and match recruiter search terms.',
    author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
    mainEntityOfPage: 'https://linkedinrank.com/ai-prompts-linkedin-skills',
    datePublished: '2025-02-12',
    dateModified: '2025-02-12',
}
const PROMPTS = [
    {
        id: 'skill-audit',
        title: 'The Skills Audit Prompt',
        description: 'Analyzes your current skills list and tells you what to add, remove, and reorder for maximum recruiter visibility.',
        prompt: `Audit my LinkedIn skills section for recruiter search optimization.

My current role: [Your Job Title]
My target role (if different): [Target Job Title]
My industry: [Your Industry]
My current LinkedIn skills (paste all of them):
"""
[Paste your skills list here, separated by commas]
"""

Tasks:
1. KEEP: Which of my current skills should I keep? (relevant to my role/target)
2. REMOVE: Which skills are too generic, outdated, or hurting my positioning? (e.g., "Microsoft Office" for a senior engineer)
3. ADD: What skills am I missing that recruiters actively search for in my role?
4. REORDER: What should my Top 3 pinned skills be? (LinkedIn lets you pin 3 — these appear on your profile card)

For the skills to ADD, categorize them:
- Hard skills (technologies, tools, frameworks)
- Soft skills (leadership, communication — but only the ones recruiters actually filter by)
- Industry-specific skills (domain knowledge)
- Certifications that double as skills (e.g., "AWS Certified", "PMP")

Also answer: How many total skills should I have? (LinkedIn allows up to 50, but what's optimal?)

Format your response as a clear action plan I can implement in 10 minutes.`,
        tips: [
            'LinkedIn allows 50 skills but quality beats quantity — 20-30 well-chosen skills outperform 50 generic ones',
            'Your Top 3 pinned skills appear everywhere: profile card, search results, connection requests',
            'Skills are searchable keywords — treat them as SEO for your profile',
        ],
    },
    {
        id: 'keyword-research',
        title: 'The Recruiter Keyword Research Prompt',
        description: 'Reverse-engineers what recruiters actually search for when hiring someone like you.',
        prompt: `I want to know exactly what skills/keywords recruiters search for when looking for someone like me.

My role: [Your Job Title]
My industry: [Your Industry]
My seniority: [Junior / Mid / Senior / Lead / Director / VP]
My specialization: [e.g., "frontend development" or "B2B marketing"]
Companies I'd want to work at: [e.g., "Google, Stripe, Shopify" or "Series B fintech startups"]

Tasks:
1. List the TOP 20 skills/keywords that recruiters would type into LinkedIn Recruiter search to find someone like me
2. Rank them by search frequency (most searched → least searched)
3. For each skill, note:
   - Is this a "must-have" or "nice-to-have" in job descriptions?
   - Is this a LinkedIn filter option (recruiters can filter by it)?
   - Should this be a pinned skill, a listed skill, or just mentioned in my headline/About?
4. Identify any EMERGING skills in my field that are trending upward (early-adopter advantage)
5. Flag any skills that are DECLINING (should be deprioritized)

Also: Pull 3-5 actual job descriptions for [target role] and extract the most commonly repeated skills across them. These are the skills I need on my profile.`,
        tips: [
            'LinkedIn Recruiter has a "Skills" filter — skills listed on your profile directly affect whether you appear in searches',
            'Emerging skills (e.g., "AI/ML" in 2024-2025) have less competition — adding them early gives you an advantage',
            'Cross-reference with job descriptions — if a skill appears in 4/5 postings for your target role, it\'s a must-have',
        ],
    },
    {
        id: 'role-transition',
        title: 'The Role Transition Skills Prompt',
        description: 'Maps your current skills to a target role and identifies the gap you need to fill.',
        prompt: `I'm transitioning roles and need to update my LinkedIn skills section.

Current role: [e.g., "Software Engineer"]
Target role: [e.g., "Product Manager"]
Current skills on my profile:
"""
[Paste current skills]
"""

Tasks:
1. SKILLS MAP: Create a visual mapping of my current skills → how they translate to the target role
   Format: [Current Skill] → [How it applies to target role] → [What to rename it on LinkedIn]

2. GAP ANALYSIS: What skills does the target role require that I'm completely missing?
   For each gap:
   - Skill name
   - Why it matters for the target role
   - How to acquire it quickly (course, project, certification)
   - Whether I should add it now (if I have basic knowledge) or wait until I've built competency

3. BRIDGE SKILLS: Which of my current skills are uniquely valuable in the target role?
   (These are my differentiators — skills most people in the target role DON'T have)

4. UPDATED SKILLS LIST: Write my new recommended skills list (20-30 skills) organized as:
   - Top 3 pinned skills for the target role
   - Core technical skills
   - Transferable skills from current role
   - Domain knowledge

5. TIMELINE: A realistic 30-60-90 day plan to build the missing skills`,
        tips: [
            'Bridge skills are your superpower — an engineer becoming a PM has technical depth most PMs lack',
            'Don\'t remove all old skills immediately — they show your journey and provide keyword diversity',
            'Add skills you\'re actively learning with at least basic competency — don\'t wait for mastery',
        ],
    },
    {
        id: 'endorsement',
        title: 'The Endorsement Strategy Prompt',
        description: 'Creates a plan to get meaningful endorsements on your most important skills.',
        prompt: `Create a LinkedIn skill endorsement strategy for me.

My role: [Your Job Title]
My top 5 most important skills: [Skill 1, Skill 2, Skill 3, Skill 4, Skill 5]
Number of LinkedIn connections: [Approximate number]
Current endorsement counts for top skills: [e.g., "Python: 12, Machine Learning: 5, Data Analysis: 8"]

Tasks:
1. Which 5 skills should I prioritize getting endorsed for? (based on recruiter search value)

2. Write 3 different message templates I can send to colleagues/connections asking for endorsements:
   - Template 1: For close colleagues who know my work
   - Template 2: For former managers or mentors
   - Template 3: For connections I've collaborated with but aren't close friends
   
   Rules for the messages:
   - Keep each under 100 words
   - Be specific about which skills to endorse
   - Make it easy to say yes (include a direct link instruction)
   - Offer to endorse them back
   - Don't sound desperate or spammy

3. What's the minimum number of endorsements per skill that makes a difference in LinkedIn search?

4. Should I endorse others first as a strategy? If so, how many and who?

5. How often should I refresh my endorsement outreach?`,
        tips: [
            'Endorsements from people with the same skill carry more weight in LinkedIn\'s algorithm',
            'Quality matters more than quantity — 5 endorsements from respected professionals beat 50 from random connections',
            'Endorse others first — most people reciprocate within a week',
        ],
    },
]

export default function AIPromptsSkillsPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader navLinks={[{ href: '/ai-prompts-linkedin', label: 'All AI Prompts' }]} />

            <section className="relative bg-gradient-to-b from-[#F8FAFC] to-white pt-16 sm:pt-20 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%20fill%3D%22%23E5E7EB%22%2F%3E%3C%2Fsvg%3E')] opacity-40" />
                <div className="max-w-3xl mx-auto px-6 text-center relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                        <svg className="w-3.5 h-3.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                        <span className="text-xs font-semibold text-[#0A66C2]">AI Prompts</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-5">AI Prompts for LinkedIn Skills</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-xl mx-auto leading-relaxed">
                        Your skills section is how recruiters find you. These prompts help you pick the right keywords, order them strategically, and close skill gaps.
                    </p>
                </div>
            </section>

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
                <div className="space-y-10">
                    {PROMPTS.map((p, i) => (
                        <section key={p.id} id={p.id} className="scroll-mt-24">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">{i + 1}</div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#0A0F1C]">{p.title}</h2>
                                    <p className="text-sm text-[#6B7280] mt-1">{p.description}</p>
                                </div>
                            </div>
                            <div className="bg-[#0A0F1C] rounded-xl p-5 sm:p-6 mb-4 overflow-x-auto">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Prompt — Copy &amp; Paste</span>
                                    <span className="text-[10px] font-medium text-[#4B5563] bg-[#1a1f2e] px-2 py-0.5 rounded">ChatGPT / Claude / Gemini</span>
                                </div>
                                <pre className="text-[13px] text-[#E5E7EB] whitespace-pre-wrap font-mono leading-relaxed">{p.prompt}</pre>
                            </div>
                            <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-5">
                                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-wider mb-2">Pro Tips</p>
                                <ul className="space-y-1.5">
                                    {p.tips.map((tip, ti) => (
                                        <li key={ti} className="flex items-start gap-2 text-sm text-[#1E40AF]">
                                            <svg className="w-3.5 h-3.5 text-[#0A66C2] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                            <span>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    ))}
                </div>

                <div className="mt-16 bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-2xl p-8 sm:p-10 text-center">
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">Check your skills score</h2>
                    <p className="text-sm text-[#4B5563] mb-5 max-w-md mx-auto">LinkedInRank evaluates your skills section across multiple signals. See where you stand.</p>
                    <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile — It&apos;s Free</Link>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">More AI Prompt Guides</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'All AI Prompts (Pillar Guide)', href: '/ai-prompts-linkedin' },
                            { label: 'Headline Prompts', href: '/ai-prompts-linkedin-headline' },
                            { label: 'About Section Prompts', href: '/ai-prompts-linkedin-about' },
                            { label: 'Experience Prompts', href: '/ai-prompts-linkedin-experience' },
                            { label: 'Summary & Positioning', href: '/ai-prompts-linkedin-summary' },
                            { label: 'LinkedIn Keywords Guide', href: '/linkedin-keywords-guide' },
                        ].map((item, i) => (
                            <Link key={i} href={item.href} className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">{item.label}</Link>
                        ))}
                    </div>
                </div>
            </article>

            <footer className="border-t border-gray-100 bg-[#F8FAFC] py-8">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="font-bold text-sm text-[#0A0F1C] no-underline">LinkedIn<span className="text-gradient-brand">Rank</span></Link>
                        <a href="https://www.instagram.com/linkedinrank/" target="_blank" rel="noopener noreferrer" className="text-[#6B7280] hover:text-[#0A0F1C] transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
                        
                    </div>
                    <nav className="flex flex-wrap gap-x-6 gap-y-2">
                        <Link href="/" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Home</Link>
                        <Link href="/ai-prompts-linkedin" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">AI Prompts</Link>
                        <Link href="/privacy" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Privacy</Link>
                        <Link href="/contact" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Contact</Link>
                    </nav>
                </div>
            </footer>
        </main>
    )
}
