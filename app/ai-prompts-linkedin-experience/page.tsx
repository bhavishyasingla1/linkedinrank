import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'AI Prompts for LinkedIn Experience Section | Action Verbs & Metrics (2026)',
    description: 'Ready-to-use AI prompts to rewrite your LinkedIn experience bullets in 2026. Action verbs, quantified impact, and recruiter-friendly language. Free scoring with LinkedInRank.',
    keywords: 'ai prompts linkedin experience 2026, chatgpt linkedin job description, linkedin experience bullet points ai, linkedin work experience generator, linkedin experience ai rewrite',
    alternates: { canonical: 'https://linkedinrank.com/ai-prompts-linkedin-experience' },
    openGraph: {
        title: 'AI Prompts for LinkedIn Experience Section | Action Verbs & Metrics',
        description: 'AI prompts to rewrite experience bullets with action verbs and quantified impact.',
        url: 'https://linkedinrank.com/ai-prompts-linkedin-experience',
    },
}
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AI Prompts for LinkedIn Experience | Action Verbs & Metrics Templates',
    description: '5 ready-to-use AI prompts to rewrite LinkedIn experience bullets with action verbs, quantified impact, and recruiter-friendly language.',
    author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
    mainEntityOfPage: 'https://linkedinrank.com/ai-prompts-linkedin-experience',
    datePublished: '2025-02-12',
    dateModified: '2025-02-12',
}
const PROMPTS = [
    {
        id: 'bullet-rewriter',
        title: 'The Bullet Point Rewriter',
        description: 'Takes your existing job descriptions and rewrites them with action verbs, metrics, and impact statements.',
        prompt: `Rewrite my LinkedIn experience bullets to be more impactful.

My job title: [Your Job Title]
Company: [Your Company]
Duration: [e.g., "Jan 2022 – Present"]
Industry: [Your Industry]

My current bullet points (paste as-is):
"""
[Paste your current experience description here | even if it's just responsibilities]
"""

Rewrite each bullet following these rules:
1. Start every bullet with a strong ACTION VERB (Led, Built, Designed, Increased, Reduced, Launched, etc.)
2. Add a METRIC or NUMBER wherever possible (even estimates are better than nothing)
3. Show IMPACT | not just what you did, but the result it produced
4. Keep each bullet to 1-2 lines max
5. Use the format: [Action Verb] + [What you did] + [Scale/Scope] + [Result/Impact]
6. Include tools, technologies, or methodologies where relevant
7. Write 4-6 bullets per role (quality over quantity)

For each rewrite, show:
- BEFORE: [original bullet]
- AFTER: [improved version]
- WHY: [one sentence explaining the change]

If my original description has no numbers, suggest realistic metrics I could add based on the role.`,
        tips: [
            'Even estimates work: "managed a team" → "Led a cross-functional team of ~8 engineers"',
            'The Experience section is worth 25/100 points on LinkedInRank | the highest-weighted section',
            'Recruiters scan bullets in 6 seconds | front-load the most impressive part',
        ],
    },
    {
        id: 'responsibility-to-achievement',
        title: 'The Responsibility → Achievement Converter',
        description: 'Most people list responsibilities. This prompt converts them into achievements that show impact.',
        prompt: `Convert my job responsibilities into achievement statements for LinkedIn.

My role: [Your Job Title] at [Company]
Industry: [Your Industry]
Team size I worked with/managed: [Number or "individual contributor"]

Here are my responsibilities (I'll list them as plain statements):
1. [e.g., "Managed the social media accounts"]
2. [e.g., "Created reports for the leadership team"]
3. [e.g., "Handled customer complaints"]
4. [e.g., "Trained new employees"]
5. [e.g., "Worked on the product launch"]

For each responsibility, transform it into an ACHIEVEMENT using this formula:
[Action Verb] + [Specific Task] + [Scale] + [Measurable Result]

Example transformation:
- Responsibility: "Managed social media accounts"
- Achievement: "Grew LinkedIn following from 2K to 15K in 8 months by publishing a weekly content series on industry trends, generating 40+ inbound leads"

Rules:
- Every achievement must answer: "So what? What was the result?"
- If I can't provide exact numbers, suggest realistic ranges I could use
- Use industry-appropriate action verbs
- Each should be 1-2 sentences max
- Don't exaggerate | suggest metrics that sound credible for my role level

Show all transformations in a clear BEFORE → AFTER format.`,
        tips: [
            'The "So what?" test: after reading each bullet, a recruiter should understand the business impact',
            'If you genuinely don\'t know the metrics, ask your manager or check internal dashboards before making up numbers',
            'Action verbs by category: Growth (Grew, Expanded, Scaled), Efficiency (Streamlined, Automated, Reduced), Leadership (Led, Mentored, Directed)',
        ],
    },
    {
        id: 'gap-filler',
        title: 'The Experience Gap Filler',
        description: 'For roles where you have the title but wrote little or nothing in the description. Generates contextual bullets.',
        prompt: `I have experience entries on LinkedIn with missing or minimal descriptions. Help me write them.

Roles that need descriptions:

Role 1:
- Title: [Job Title]
- Company: [Company Name]
- Duration: [Start – End]
- What I remember doing: [Even vague is fine, e.g., "worked on frontend stuff" or "helped with marketing campaigns"]
- Tools I used: [Any tools, software, frameworks]

Role 2:
- Title: [Job Title]
- Company: [Company Name]
- Duration: [Start – End]
- What I remember doing: [Brief description]
- Tools I used: [Any tools]

[Add more roles as needed]

For each role, write 3-5 bullet points that:
1. Are realistic for that job title at that type of company
2. Start with action verbs
3. Include likely tools/technologies used in that role
4. Mention plausible scope (team sizes, project sizes, user counts)
5. Sound specific enough to be credible but don't fabricate impossible claims
6. Are tailored to my industry

Important: I want bullets that I can HONESTLY claim. Flag anything where you're making assumptions so I can verify or adjust.`,
        tips: [
            'Empty experience entries actively hurt your LinkedIn score | even 2-3 bullets per role makes a difference',
            'When the AI flags assumptions, take 5 minutes to verify them. Accuracy matters more than impressiveness',
            'Old roles matter less than recent ones | 2 bullets for a role 5+ years ago is perfectly fine',
        ],
    },
    {
        id: 'tech-specific',
        title: 'The Technical Role Prompt',
        description: 'Optimized for software engineers, data scientists, product managers, and other technical roles.',
        prompt: `Write LinkedIn experience bullets for my technical role.

Role: [e.g., Senior Software Engineer]
Company: [Company Name]
Type: [Startup / Enterprise / Agency / FAANG]
Duration: [Start – End]
Tech stack: [e.g., React, Node.js, PostgreSQL, AWS, Docker]
Team structure: [e.g., "5-person squad within a 40-person engineering org"]

Key things I worked on:
1. [e.g., "Built the checkout flow for our e-commerce platform"]
2. [e.g., "Migrated the monolith to microservices"]
3. [e.g., "Set up CI/CD pipeline"]
4. [e.g., "Mentored 2 junior developers"]

For each item, write a bullet that includes:
- The technical WHAT (specific technology + what you built/improved)
- The business WHY (why it mattered to the company)
- The measurable IMPACT (performance improvement, time saved, users affected)
- The scale (data volume, request throughput, team size, user count)

Format each as a single, dense, recruiter-ready bullet. Technical enough to impress engineers, clear enough for non-technical recruiters to understand value.

Example:
"Architected and deployed a real-time notification microservice (Node.js, Redis, WebSocket) serving 200K+ daily active users, reducing notification delivery latency from 8s to <500ms and decreasing support tickets by 35%"

Write 5-7 bullets for this role.`,
        tips: [
            'Technical recruiters search for specific technologies | name them explicitly',
            'The best tech bullets show both the engineering complexity AND business impact',
            'For FAANG-style roles, include scale metrics: QPS, data volume, uptime percentages',
        ],
    },
    {
        id: 'internship',
        title: 'The Internship & First Job Prompt',
        description: 'For students and early-career professionals with limited experience. Makes small roles sound meaningful (honestly).',
        prompt: `Write LinkedIn experience bullets for my internship / first job.

Role: [e.g., Marketing Intern]
Company: [Company Name]
Duration: [e.g., "May 2024 – Aug 2024 (3 months)"]
What I actually did day-to-day: [Be honest, e.g., "helped write blog posts, updated spreadsheets, sat in on client calls"]
Tools I used: [e.g., Canva, Google Analytics, HubSpot]
One thing I'm most proud of from this role: [e.g., "wrote a blog post that got 500 views"]
Skills I developed: [e.g., "content writing, basic data analysis, client communication"]

Write 3-4 LinkedIn bullets that:
1. Accurately represent my contributions WITHOUT inflating them
2. Use professional language that makes the role sound meaningful (because it was)
3. Highlight any INITIATIVE I showed (even small things like suggesting an idea)
4. Mention specific tools to build keyword density
5. Show what I LEARNED or skills I developed
6. Are 1 line each | concise and punchy

Rules:
- Do NOT use words like "spearheaded" or "orchestrated" for intern work | it's dishonest
- Good intern verbs: Assisted, Contributed, Supported, Created, Analyzed, Researched, Drafted, Coordinated
- Show growth: what could I do at the end that I couldn't do at the start?
- It's okay to be honest about scope | "Supported a team of 5" is better than "Led cross-functional initiatives"`,
        tips: [
            'Honest intern descriptions impress recruiters more than inflated ones | they can tell the difference',
            'One genuine project with a real outcome beats five generic "assisted with various tasks" bullets',
            'Mention what you learned | showing growth mindset is valued at the early-career stage',
        ],
    },
]

export default function AIPromptsExperiencePage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <section className="relative bg-gradient-to-b from-[#F8FAFC] to-white pt-16 sm:pt-20 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%20fill%3D%22%23E5E7EB%22%2F%3E%3C%2Fsvg%3E')] opacity-40" />
                <div className="max-w-3xl mx-auto px-6 text-center relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                        <svg className="w-3.5 h-3.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                        <span className="text-xs font-semibold text-[#0A66C2]">AI Prompts</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-5">AI Prompts for LinkedIn Experience</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-xl mx-auto leading-relaxed">
                        Transform job descriptions into achievement-driven bullets that make recruiters stop scrolling. The Experience section is worth <strong>25 points</strong> | the highest-weighted on LinkedInRank.
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
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Prompt | Copy &amp; Paste</span>
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
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">See your improved Experience score</h2>
                    <p className="text-sm text-[#4B5563] mb-5 max-w-md mx-auto">Update your experience bullets, export a new PDF, and watch your score climb.</p>
                    <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It&apos;s Free</Link>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">More AI Prompt Guides</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'All AI Prompts (Pillar Guide)', href: '/ai-prompts-linkedin' },
                            { label: 'Headline Prompts', href: '/ai-prompts-linkedin-headline' },
                            { label: 'About Section Prompts', href: '/ai-prompts-linkedin-about' },
                            { label: 'Skills Prompts', href: '/ai-prompts-linkedin-skills' },
                            { label: 'Summary & Positioning', href: '/ai-prompts-linkedin-summary' },
                            { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            { label: 'LinkedIn Mistakes', href: '/linkedin-mistakes' },
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
