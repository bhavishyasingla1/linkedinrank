import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'

export const metadata: Metadata = {
    title: 'AI Prompts for LinkedIn Headlines | Copy-Paste Templates (2026)',
    description: 'Ready-to-use AI prompts to write powerful LinkedIn headlines in 2026. Templates for ChatGPT, Claude, and Gemini organized by career stage, role, and goal. Free scoring with LinkedInRank.',
    keywords: 'ai prompts linkedin headline 2026, chatgpt linkedin headline, claude linkedin headline, linkedin headline generator prompt, ai headline writer linkedin, linkedin headline ai template',
    alternates: { canonical: 'https://linkedinrank.com/ai-prompts-linkedin-headline' },
    openGraph: {
        title: 'AI Prompts for LinkedIn Headlines | Copy-Paste Templates',
        description: 'Ready-to-use AI prompts for ChatGPT, Claude, and Gemini to write powerful LinkedIn headlines.',
        url: 'https://linkedinrank.com/ai-prompts-linkedin-headline',
    },
}
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AI Prompts for LinkedIn Headlines | Copy-Paste Templates',
    description: '6 ready-to-use AI prompts to write powerful LinkedIn headlines for every career stage and goal.',
    author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
    mainEntityOfPage: 'https://linkedinrank.com/ai-prompts-linkedin-headline',
    datePublished: '2025-02-12',
    dateModified: '2025-02-12',
}
const PROMPTS = [
    {
        id: 'basic',
        title: 'The Starter Prompt',
        description: 'Best for anyone who needs a quick, solid headline. Paste this into ChatGPT, Claude, or Gemini.',
        prompt: `I need a LinkedIn headline. Here's my info:

Current role: [Your Job Title]
Company: [Your Company]
Industry: [Your Industry]
Key skills: [Skill 1, Skill 2, Skill 3]
Who I help: [Target audience, e.g., "B2B SaaS companies"]
What I do best: [Your key value, e.g., "drive revenue through content marketing"]

Write 5 LinkedIn headlines under 120 characters each. Each should:
- Lead with my role or value proposition
- Include 1-2 searchable keywords recruiters would use
- Avoid buzzwords like "passionate" or "guru"
- Sound professional, not salesy
- Use pipes (|) or bullet points (·) to separate ideas

Format: Just the 5 headlines, numbered, nothing else.`,
        tips: [
            'Replace all [brackets] with your real info before pasting',
            'Pick the headline that feels most natural to your voice',
            'Test different headlines over 2-week periods to see which gets more profile views',
        ],
    },
    {
        id: 'career-stage',
        title: 'Career Stage Adapter',
        description: 'Adjusts the headline strategy based on where you are in your career | student, early-career, mid-career, or senior/executive.',
        prompt: `I need a LinkedIn headline optimized for my career stage.

My career stage: [student / early-career / mid-career / senior-executive / career-changer]
Current role: [Your Job Title]
Target role (if different): [Role you want next]
Industry: [Your Industry]
Top 3 skills: [Skill 1, Skill 2, Skill 3]
Years of experience: [Number]
Biggest achievement: [One sentence]

Rules based on career stage:
- STUDENT: Focus on aspiration + skills being built + domain interest. Don't fake seniority.
- EARLY-CAREER: Lead with role + specialization + eager-to-grow signal.
- MID-CAREER: Lead with expertise + proven results + niche.
- SENIOR/EXECUTIVE: Lead with leadership scope + industry impact + vision.
- CAREER-CHANGER: Bridge old expertise with new direction + transferable value.

Write 5 headlines under 120 characters. Each should match my career stage tone. Number them 1-5.`,
        tips: [
            'Be honest about your career stage | recruiters can tell when a headline oversells',
            'Students: "Aspiring" is fine, but pair it with a concrete skill',
            'Career changers: show the bridge, not just the destination',
        ],
    },
    {
        id: 'keyword',
        title: 'The Keyword-First Prompt',
        description: 'Designed to maximize your appearance in LinkedIn and Google search results. Focuses on recruiter search terms.',
        prompt: `I want a LinkedIn headline optimized for recruiter search.

My role: [Your Job Title]
Industry: [Your Industry]
Specialization: [Your niche, e.g., "cloud infrastructure" or "brand strategy"]
Target job titles I want to appear for: [Title 1, Title 2, Title 3]
Key tools/technologies: [Tool 1, Tool 2, Tool 3]
Certifications (if any): [Cert 1, Cert 2]

Write 5 LinkedIn headlines under 120 characters each. Requirements:
1. Front-load the most searchable keyword (job title or skill)
2. Include at least one tool/technology name
3. Add a differentiator (metric, niche, or unique angle)
4. Avoid filler words | every word must earn its place
5. Consider how recruiters actually search on LinkedIn

Also explain in one sentence WHY each headline would rank well in LinkedIn search.`,
        tips: [
            'Check what keywords appear in job descriptions you want | those are recruiter search terms',
            'Front-loading your job title is the single most impactful SEO move',
            'LinkedIn search weights headline text heavily | treat every character as prime real estate',
        ],
    },
    {
        id: 'value-prop',
        title: 'The Value Proposition Prompt',
        description: 'Shifts from "what you are" to "what you deliver." Perfect for consultants, freelancers, and founders.',
        prompt: `I need a LinkedIn headline focused on the value I deliver, not just my job title.

What I do: [Brief description of your work]
Who I help: [Target client/audience, e.g., "Series A startups"]
The problem I solve: [The pain point, e.g., "turn leads into customers"]
The result I deliver: [The outcome, e.g., "2-3x conversion rates"]
My method/approach: [How you do it, e.g., "through data-driven content funnels"]

Write 5 LinkedIn headlines under 120 characters each. Each should:
- Lead with the OUTCOME or VALUE, not the job title
- Make the reader think "I need this person"
- Include a specific niche or audience
- Avoid generic phrases like "helping businesses grow"
- Use concrete language over abstract claims

Format: 5 headlines, numbered. Then pick your top recommendation and explain why in 2 sentences.`,
        tips: [
            'This format works best for people who sell services | consultants, agency owners, freelancers',
            'The best value headlines make the reader self-identify: "That\'s exactly my problem"',
            'Combine with a keyword to get both search visibility and conversion',
        ],
    },
    {
        id: 'rewrite',
        title: 'The Headline Rewriter',
        description: 'Already have a headline? Paste it in and get improved versions with explanations of what changed and why.',
        prompt: `Rewrite my LinkedIn headline to be more effective.

My current headline: "[Paste your current headline here]"
My role: [Your Job Title]
My industry: [Your Industry]
What I want to be known for: [Your positioning goal]

Tasks:
1. Score my current headline out of 10 and explain what works and what doesn't
2. Write 5 improved versions (under 120 characters each)
3. For each rewrite, explain the specific change you made and why it's better
4. Rank your 5 rewrites from best to worst

Scoring criteria:
- Clarity (is the role immediately clear?)
- Searchability (would a recruiter find this?)
- Differentiation (does it stand out from 1000 other profiles?)
- Length efficiency (is every word earning its place?)
- Professional tone (no buzzwords, no hype?)`,
        tips: [
            'This is the best prompt to use right after getting your LinkedInRank score',
            'The scoring breakdown helps you understand WHY your headline is weak',
            'Ask for a second round of rewrites if the first batch doesn\'t feel right',
        ],
    },
    {
        id: 'industry',
        title: 'The Industry-Specific Prompt',
        description: 'Generates headlines calibrated to your industry\'s norms and language. What works in tech differs from healthcare or finance.',
        prompt: `Generate LinkedIn headlines specifically calibrated for my industry.

My industry: [e.g., Healthcare / Fintech / EdTech / Manufacturing / Legal / Real Estate]
My role: [Your Job Title]
My specialization within the industry: [Your niche]
Industry-specific tools or frameworks I use: [Tool 1, Tool 2]
Regulatory or compliance knowledge (if relevant): [e.g., HIPAA, SOX, GDPR]
My seniority level: [Junior / Mid / Senior / Executive]

Write 5 LinkedIn headlines under 120 characters. Requirements:
- Use terminology that professionals in my industry immediately recognize
- Include industry-specific keywords that recruiters in this field search for
- Match the tone conventions of my industry (formal for finance/legal, more casual for tech/creative)
- If I have regulatory/compliance expertise, signal it | it's a differentiator
- Each headline should work specifically for MY industry, not be generic

Also note: which of these headlines would work best if I'm targeting roles at [Fortune 500 / startups / agencies / consulting firms]?`,
        tips: [
            'Industry insiders can spot generic headlines instantly | specificity builds trust',
            'Compliance and regulatory keywords are massive differentiators in finance, healthcare, and legal',
            'Ask the AI to generate 5 more variations if the first batch feels too generic for your field',
        ],
    },
]

export default function AIPromptsHeadlinePage() {
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
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-5">AI Prompts for LinkedIn Headlines</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-xl mx-auto leading-relaxed">
                        Copy-paste these prompts into ChatGPT, Claude, or Gemini to generate headlines that get you found by recruiters and make visitors click &quot;Connect.&quot;
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <span className="text-xs font-medium text-[#6B7280] bg-[#F3F4F6] px-3 py-1 rounded-full">{PROMPTS.length} ready-to-use prompts</span>
                        <span className="text-xs font-medium text-[#6B7280] bg-[#F3F4F6] px-3 py-1 rounded-full">Works with ChatGPT, Claude, Gemini</span>
                        <span className="text-xs font-medium text-[#6B7280] bg-[#F3F4F6] px-3 py-1 rounded-full">All career stages</span>
                    </div>
                </div>
            </section>

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
                {/* How to use */}
                <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6 sm:p-8 mb-12">
                    <h2 className="text-base font-bold text-[#0A0F1C] mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
                        How to use these prompts
                    </h2>
                    <ol className="space-y-2 text-sm text-[#4B5563]">
                        <li className="flex gap-2"><span className="font-bold text-[#0A66C2] shrink-0">1.</span> First, <Link href="/" className="text-[#0A66C2] hover:underline font-medium">analyze your current profile</Link> with LinkedInRank to know your baseline score</li>
                        <li className="flex gap-2"><span className="font-bold text-[#0A66C2] shrink-0">2.</span> Pick the prompt that matches your goal (starter, keyword-focused, value-prop, etc.)</li>
                        <li className="flex gap-2"><span className="font-bold text-[#0A66C2] shrink-0">3.</span> Replace all [bracketed placeholders] with your real information</li>
                        <li className="flex gap-2"><span className="font-bold text-[#0A66C2] shrink-0">4.</span> Paste into ChatGPT, Claude, or Gemini and review the output</li>
                        <li className="flex gap-2"><span className="font-bold text-[#0A66C2] shrink-0">5.</span> Update your LinkedIn headline, then re-analyze with LinkedInRank to see your score improve</li>
                    </ol>
                </div>

                {/* Prompts */}
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

                {/* CTA */}
                <div className="mt-16 bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-2xl p-8 sm:p-10 text-center">
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">Test your new headline</h2>
                    <p className="text-sm text-[#4B5563] mb-5 max-w-md mx-auto">After updating your headline, export a new LinkedIn PDF and re-analyze to see your improved score.</p>
                    <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It&apos;s Free</Link>
                </div>

                {/* Other prompt guides */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">More AI Prompt Guides</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'All AI Prompts (Pillar Guide)', href: '/ai-prompts-linkedin' },
                            { label: 'About Section Prompts', href: '/ai-prompts-linkedin-about' },
                            { label: 'Experience Prompts', href: '/ai-prompts-linkedin-experience' },
                            { label: 'Skills Prompts', href: '/ai-prompts-linkedin-skills' },
                            { label: 'Summary & Positioning', href: '/ai-prompts-linkedin-summary' },
                            { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                            { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            { label: 'Profile Checklist', href: '/linkedin-profile-checklist' },
                        ].map((item, i) => (
                            <Link key={i} href={item.href} className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">{item.label}</Link>
                        ))}
                    </div>
                </div>
            </article>

            <RelatedPages currentSlug="ai-prompts-linkedin-headline" />
            <FooterLayout />
        </main>
    )
}
