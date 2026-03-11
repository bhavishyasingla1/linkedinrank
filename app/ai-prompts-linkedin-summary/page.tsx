import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'

export const metadata: Metadata = {
    title: 'AI Prompts for LinkedIn Profile Rewrite & Positioning (2026)',
    description: 'AI prompts to position your entire LinkedIn profile strategically in 2026. Full-profile rewrites, personal branding prompts, and positioning frameworks for ChatGPT & Claude. Free scoring with LinkedInRank.',
    keywords: 'ai prompts linkedin profile 2026, chatgpt linkedin rewrite, linkedin positioning prompt, linkedin personal brand ai, full linkedin profile prompt, linkedin full rewrite ai template',
    alternates: { canonical: 'https://linkedinrank.com/ai-prompts-linkedin-summary' },
    openGraph: {
        title: 'AI Prompts for LinkedIn Profile Rewrite & Positioning',
        description: 'Full-profile rewrite prompts and positioning frameworks for ChatGPT & Claude.',
        url: 'https://linkedinrank.com/ai-prompts-linkedin-summary',
    },
}
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AI Prompts for LinkedIn Profile Summary & Positioning',
    description: '5 AI prompts for full-profile rewrites, personal positioning, thought leadership, and LinkedIn audit action plans.',
    author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
    mainEntityOfPage: 'https://linkedinrank.com/ai-prompts-linkedin-summary',
    datePublished: '2025-02-12',
    dateModified: '2025-02-12',
}
const PROMPTS = [
    {
        id: 'full-profile',
        title: 'The Full Profile Rewrite Prompt',
        description: 'One mega-prompt that rewrites your entire LinkedIn profile | headline, About, experience, and skills strategy | in one shot.',
        prompt: `Rewrite my entire LinkedIn profile for maximum professional impact.

Here is my current LinkedIn profile (paste everything):
"""
Name: [Your Name]
Current Headline: [Your current headline]
About Section: [Paste your entire About section]
Experience:
- [Job Title] at [Company] ([Dates]): [Current description]
- [Job Title] at [Company] ([Dates]): [Current description]
- [Add more roles as needed]
Skills: [List your current skills]
Education: [Degree, University, Year]
Certifications: [Any certifications]
"""

My goal: [e.g., "land a senior PM role at a top tech company" or "attract consulting clients in fintech"]
My target audience: [e.g., "hiring managers at FAANG" or "CFOs at mid-market companies"]
My unique value: [What makes you different from others with similar titles]

Rewrite the following sections:

1. HEADLINE (under 120 chars, keyword-rich, specific)
2. ABOUT SECTION (150-300 words, first person, hook + story + proof + CTA)
3. EXPERIENCE | top 2 roles only (4-6 bullets each, action verb + metric + impact)
4. SKILLS RECOMMENDATION (Top 3 pinned + 15 additional, ordered by recruiter search value)

For each section, show:
- BEFORE: [my current version]
- AFTER: [your improved version]
- KEY CHANGES: [2-3 bullet points explaining what changed and why]

Overall positioning strategy: In 3-4 sentences, explain the strategic narrative tying all sections together. What story does this profile tell?`,
        tips: [
            'This is the "nuclear option" | use it when you want a complete overhaul, not a tweak',
            'After implementing, run your new PDF through LinkedInRank to measure the improvement',
            'Ask the AI for a second pass if any section feels inauthentic to your voice',
        ],
    },
    {
        id: 'positioning',
        title: 'The Personal Positioning Statement',
        description: 'Creates a clear positioning statement that serves as the foundation for every section of your profile.',
        prompt: `Help me create a personal positioning statement for my LinkedIn profile.

About me:
- Name: [Your Name]
- Current role: [Job Title at Company]
- Industry: [Your Industry]
- Years of experience: [Number]
- What I'm best at: [Your #1 professional strength]
- Who benefits most from my work: [Your ideal audience/client/employer]
- What makes me different from others with similar titles: [Your unique angle]
- My career ambition in 1 sentence: [Where you're heading]

Tasks:
1. Write a POSITIONING STATEMENT in this format:
   "I help [specific audience] achieve [specific outcome] through [your unique approach/skill]."
   
   Write 3 versions: conservative, confident, and bold.

2. Show how this positioning statement translates into:
   - A headline (under 120 chars)
   - The opening line of an About section
   - A tagline for outreach messages
   - A one-sentence intro for networking events

3. POSITIONING AUDIT: Answer these questions about my positioning:
   - Is my positioning SPECIFIC enough? (Would someone know exactly what I do?)
   - Is it DIFFERENTIATED? (Does it separate me from 1000 similar professionals?)
   - Is it CREDIBLE? (Can I back it up with evidence?)
   - Is it RELEVANT? (Does my target audience care about this?)
   - Is it MEMORABLE? (Would someone remember it after a 30-second conversation?)

4. If any answer is "no," suggest how to fix it.`,
        tips: [
            'Your positioning statement is the DNA of your entire profile | get this right and everything else follows',
            'The best positioning is narrow: "I help B2B SaaS startups reduce churn" beats "I help companies grow"',
            'Test your positioning: tell 3 people and ask what they think you do. If they get it right, it works.',
        ],
    },
    {
        id: 'linkedin-to-resume',
        title: 'The LinkedIn-to-Resume Adapter',
        description: 'Takes your optimized LinkedIn profile and adapts it for a resume | different format, different rules.',
        prompt: `Adapt my LinkedIn profile content for a resume.

My LinkedIn profile:
"""
Headline: [Your LinkedIn headline]
About: [Your LinkedIn About section]
Experience:
[Paste your LinkedIn experience section]
Skills: [Your LinkedIn skills]
"""

Target job: [Job title you're applying for]
Target company type: [e.g., "Fortune 500 enterprise" or "Series A startup"]

Tasks:
1. Convert my LinkedIn headline into a resume PROFESSIONAL SUMMARY (2-3 sentences, third person or no-pronoun style)

2. Convert my LinkedIn About section into a resume SUMMARY (condensed to 3-4 lines, removing the conversational tone, keeping the strongest proof points)

3. Adapt my LinkedIn experience bullets for a resume:
   - More formal tone (no first person)
   - Tighter formatting (one line per bullet if possible)
   - Tailor to the target job description keywords
   - Lead with the most relevant achievements for this specific role

4. Create a SKILLS section formatted for ATS (Applicant Tracking Systems):
   - Categorize as: Technical Skills | Tools | Methodologies | Certifications
   - Remove soft skills (put those in the summary instead)

5. KEY DIFFERENCES to explain:
   - What works on LinkedIn but NOT on a resume
   - What works on a resume but NOT on LinkedIn
   - How the tone should shift between the two

Format the resume sections as copy-paste ready text.`,
        tips: [
            'LinkedIn = conversational, first person, story-driven. Resume = formal, achievement-dense, ATS-optimized',
            'Your LinkedIn About ≠ your resume summary. They serve different audiences at different stages',
            'Read our detailed comparison: LinkedIn vs Resume guide',
        ],
    },
    {
        id: 'thought-leader',
        title: 'The Thought Leader Positioning Prompt',
        description: 'For professionals who want to be recognized as experts in their field. Builds a content + profile strategy.',
        prompt: `Position me as a thought leader on LinkedIn.

My expertise area: [e.g., "AI in healthcare" or "remote team management"]
My current role: [Job Title]
My unique perspective: [What do you believe about your field that others don't? e.g., "Most AI in healthcare is solving the wrong problems | we need to focus on preventive, not diagnostic"]
My credentials in this area: [e.g., "10 years in healthcare tech, 3 published papers, built 2 AI products used by 50+ hospitals"]
Content I've created (if any): [Blog posts, talks, articles]
My target audience on LinkedIn: [e.g., "healthcare CTOs and health-tech founders"]

Tasks:
1. PROFILE POSITIONING: Rewrite my headline and About section to position me as a thought leader (not just a practitioner)
   - Headline should signal expertise + niche + authority
   - About should establish credibility + share a point of view + invite engagement

2. CONTENT PILLARS: Define 3-4 content topics I should consistently post about
   For each pillar:
   - Topic name
   - Why it matters to my audience
   - 3 specific post ideas
   - The unique angle only I can bring

3. AUTHORITY SIGNALS: What should I add to my profile to build authority?
   - Featured section ideas
   - Recommendations to request (from whom?)
   - Publications or projects to highlight
   - Speaking opportunities to pursue

4. 30-DAY CONTENT PLAN: 
   - Week 1-4 posting schedule (2-3 posts per week)
   - Mix of post formats: text posts, carousels, polls, articles
   - One "signature post" idea that could go viral in my niche

5. ENGAGEMENT STRATEGY: How to build visibility beyond posting
   - Who to comment on (5 specific types of creators)
   - How to comment (formula for high-value comments)
   - LinkedIn groups or newsletters to participate in`,
        tips: [
            'Thought leadership ≠ posting motivational quotes. It means having a specific, defensible point of view',
            'The fastest path to authority: pick a narrow niche and own it completely',
            'Consistency beats virality: 2 good posts/week for 6 months outperforms 1 viral post',
        ],
    },
    {
        id: 'complete-audit',
        title: 'The Complete LinkedIn Audit Prompt',
        description: 'Upload your LinkedInRank report and this prompt gives you a prioritized action plan based on your actual scores.',
        prompt: `I just analyzed my LinkedIn profile with LinkedInRank and got my scores. Help me create a prioritized improvement plan.

My LinkedInRank Results:
- Overall Score: [X]/100
- Tier: [Bronze/Silver/Gold/Platinum]
- Headline Score: [X]/20
- About Score: [X]/20
- Experience Score: [X]/25
- Skills Score: [X]/15
- Education Score: [X]/10
- Completeness Score: [X]/10

Key feedback from the report:
"""
[Paste any specific recommendations or feedback from your LinkedInRank report]
"""

My goal: [e.g., "reach Gold tier (70+)" or "maximize my score before a job search"]

Tasks:
1. PRIORITY MATRIX: Rank my sections from "fix first" to "fix last" based on:
   - Which section has the most room for improvement (biggest gap from max)
   - Which section has the highest point weight
   - Which fixes are quickest to implement

2. QUICK WINS (can do in 30 minutes):
   List 3-5 changes I can make right now that will boost my score the most

3. DEEP FIXES (need 1-2 hours):
   List 2-3 sections that need more substantial rewriting

4. For each section below my potential:
   - Current score and max possible
   - Specific issue to fix
   - Write the improved version for me
   - Expected point gain

5. MILESTONE PLAN:
   - What score can I realistically reach this week?
   - What score can I reach in 2 weeks?
   - What would it take to reach [target tier]?

Give me a numbered action checklist I can follow step by step.`,
        tips: [
            'Use this prompt AFTER getting your LinkedInRank score | the specificity makes the AI output much better',
            'Focus on the highest-weighted sections first: Experience (25pts), then Headline and About (20pts each)',
            'Re-analyze after implementing changes to track your progress and discover remaining gaps',
        ],
    },
]

export default function AIPromptsSummaryPage() {
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
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-5">AI Prompts for Profile Summary &amp; Positioning</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-xl mx-auto leading-relaxed">
                        Strategic prompts for full-profile rewrites, personal positioning, thought leadership, and turning your LinkedInRank report into an action plan.
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
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">Get your baseline score first</h2>
                    <p className="text-sm text-[#4B5563] mb-5 max-w-md mx-auto">The Complete Audit prompt works best with your actual LinkedInRank scores. Analyze first, then optimize.</p>
                    <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It&apos;s Free</Link>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">More AI Prompt Guides</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'All AI Prompts (Pillar Guide)', href: '/ai-prompts-linkedin' },
                            { label: 'Headline Prompts', href: '/ai-prompts-linkedin-headline' },
                            { label: 'About Section Prompts', href: '/ai-prompts-linkedin-about' },
                            { label: 'Experience Prompts', href: '/ai-prompts-linkedin-experience' },
                            { label: 'Skills Prompts', href: '/ai-prompts-linkedin-skills' },
                            { label: 'Personal Branding', href: '/linkedin-personal-branding' },
                            { label: 'Content Strategy', href: '/linkedin-content-strategy' },
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
