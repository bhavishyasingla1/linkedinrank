import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'

export const metadata: Metadata = {
    title: 'AI Prompts for LinkedIn About Section | Templates for ChatGPT & Claude (2026)',
    description: 'Ready-to-use AI prompts to write a compelling LinkedIn About section in 2026. Templates for every career stage with before/after examples. Free scoring with LinkedInRank.',
    keywords: 'ai prompts linkedin about section 2026, chatgpt linkedin summary, claude linkedin about, linkedin about section generator, ai linkedin bio writer, linkedin about ai template',
    alternates: { canonical: 'https://linkedinrank.com/ai-prompts-linkedin-about' },
    openGraph: {
        title: 'AI Prompts for LinkedIn About Section | Templates',
        description: 'AI prompts to write a compelling LinkedIn About section. Templates for every career stage.',
        url: 'https://linkedinrank.com/ai-prompts-linkedin-about',
    },
}
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AI Prompts for LinkedIn About Section | Templates for Every Career Stage',
    description: '6 ready-to-use AI prompts to write a compelling LinkedIn About section with story, proof, and call-to-action.',
    author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
    publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
    mainEntityOfPage: 'https://linkedinrank.com/ai-prompts-linkedin-about',
    datePublished: '2025-02-12',
    dateModified: '2025-02-12',
}
const PROMPTS = [
    {
        id: 'first-person',
        title: 'The First-Person Story Prompt',
        description: 'Writes your About section in first person (which LinkedIn recommends) with a clear narrative arc: who you are, what you do, what makes you different.',
        prompt: `Write my LinkedIn About section in first person. Here's my information:

Name: [Your Name]
Current role: [Your Job Title at Company]
Industry: [Your Industry]
Years of experience: [Number]
Career journey in 2-3 sentences: [e.g., "Started in sales, moved to product marketing, now lead growth at a B2B SaaS startup"]
Top 3 skills/strengths: [Skill 1, Skill 2, Skill 3]
Biggest professional achievement: [One specific accomplishment with a number if possible]
What I'm passionate about in my work: [e.g., "turning complex data into stories that drive decisions"]
What I'm looking for / open to: [e.g., "connecting with product leaders" or "open to senior PM roles"]

Write a LinkedIn About section that:
1. Opens with a hook that makes someone want to keep reading (NOT "I am a...")
2. Is written entirely in first person ("I" not "they")
3. Tells a brief career story arc (where I started → what I learned → where I am now)
4. Mentions 3-5 specific skills or tools naturally (not a keyword dump)
5. Includes one concrete achievement with a number
6. Ends with a call-to-action (what to do next | connect, message, etc.)
7. Is 150-300 words (LinkedIn sweet spot)
8. Uses short paragraphs (2-3 sentences max per paragraph)
9. Sounds human and conversational, not corporate

Do NOT include:
- Third person language
- "Passionate professional with X years..."
- Bullet point lists of skills
- Emojis or hashtags`,
        tips: [
            'The first 2 lines are visible before "see more" | make them count',
            'Read it out loud. If it sounds like a robot wrote it, it\'s too formal',
            'Include your name naturally so it reads well when shared',
        ],
    },
    {
        id: 'problem-solver',
        title: 'The Problem-Solver Framework',
        description: 'Structures your About around the problems you solve. Especially powerful for consultants, freelancers, and anyone client-facing.',
        prompt: `Write my LinkedIn About section using the Problem → Solution → Proof framework.

My role: [Your Job Title]
The #1 problem my audience faces: [e.g., "SaaS companies struggle to convert free trial users to paid customers"]
How I solve it: [e.g., "I design onboarding flows that increase activation by mapping user behavior data to product triggers"]
Proof it works: [e.g., "At Company X, this approach increased trial-to-paid conversion by 34% in 6 months"]
Who I work with: [e.g., "Series A-C SaaS companies with 10K+ monthly signups"]
Tools/methods I use: [Tool 1, Tool 2, Method 1]
My unique angle: [What makes your approach different from others who do similar work]

Structure the About section as:
- Paragraph 1 (2-3 sentences): State the problem. Make the reader nod and think "yes, that's my challenge"
- Paragraph 2 (2-3 sentences): Describe your approach/solution. Be specific, not vague
- Paragraph 3 (2-3 sentences): Show proof | a result, a metric, a transformation
- Paragraph 4 (1-2 sentences): Call-to-action | what should someone do if they want to work with you or learn more

Keep it under 250 words. First person. Conversational tone. No buzzwords.`,
        tips: [
            'This framework works because it mirrors how buyers think: "Do they understand my problem? Can they fix it? Have they done it before?"',
            'The proof paragraph is what separates good profiles from great ones',
            'Even one specific number (34%, 2x, $500K) makes the whole section more credible',
        ],
    },
    {
        id: 'career-changer',
        title: 'The Career Changer Prompt',
        description: 'For anyone transitioning between industries or roles. Bridges your past experience with your future direction.',
        prompt: `Write my LinkedIn About section for a career transition.

Previous career: [e.g., "5 years as a mechanical engineer at Ford"]
New direction: [e.g., "transitioning into UX design"]
What I'm bringing from my old career: [e.g., "systems thinking, user research mindset, prototyping skills"]
What I've done to prepare for the switch: [e.g., "Completed Google UX Certificate, redesigned 3 apps as portfolio projects"]
Why I'm making this change: [e.g., "I realized I spent more time improving user interfaces for factory tools than the tools themselves"]
Target role: [e.g., "Junior UX Designer at a product-led company"]
Key skills for the new role: [Skill 1, Skill 2, Skill 3]

Write a LinkedIn About section that:
1. Opens by acknowledging the transition (don't hide it | own it)
2. Shows the BRIDGE between old and new (transferable skills, shared principles)
3. Demonstrates commitment (courses, projects, certifications you've completed)
4. Explains the "why" briefly | motivation, not life story
5. Ends with clear positioning: what role you want and what you bring
6. Is 150-250 words, first person, conversational
7. Makes the reader think "this person brings a unique perspective" not "this person is starting over"

Avoid: apologetic language, "I know I don't have traditional experience", or over-explaining`,
        tips: [
            'Career changers who own their transition confidently get more responses than those who apologize for it',
            'Your "bridge" is your superpower | the combination of old + new expertise is rare',
            'Link to portfolio projects or certifications to back up your claims',
        ],
    },
    {
        id: 'student',
        title: 'The Student & New Grad Prompt',
        description: 'For students, recent graduates, and early-career professionals with limited work experience.',
        prompt: `Write my LinkedIn About section as a student/new graduate.

Name: [Your Name]
Degree & University: [e.g., "B.S. Computer Science, University of Michigan, Class of 2025"]
Relevant coursework or projects: [e.g., "Built a machine learning model for predicting housing prices as a capstone project"]
Internship/work experience (if any): [e.g., "Summer intern at Google, worked on search ranking"]
Extracurriculars or leadership: [e.g., "President of the Data Science Club, organized 12 workshops"]
Skills being developed: [Skill 1, Skill 2, Skill 3]
Career interest: [e.g., "data science roles in healthcare or biotech"]
What excites me about this field: [One genuine sentence]

Write a LinkedIn About section that:
1. Opens with genuine enthusiasm for the field (not fake "passionate about leveraging...")
2. Highlights the best 2-3 things I've done (projects, internships, leadership)
3. Shows skills I'm actively building (not skills I've "mastered")
4. Mentions my career interest without being too narrow or too broad
5. Ends with openness to connect (mentors, opportunities, conversations)
6. Is 100-200 words (students don't need 300)
7. Sounds like a real person, not a resume robot
8. Uses honest language: "building," "learning," "exploring" | not "expert" or "seasoned"

Do NOT: claim expertise you don't have, use corporate jargon, or write in third person`,
        tips: [
            'Recruiters expect students to be learning | showing self-awareness is more impressive than faking expertise',
            'One great project described well beats five listed without context',
            'Mention specific technologies or tools you\'re learning | they\'re searchable keywords',
        ],
    },
    {
        id: 'rewrite',
        title: 'The About Section Rewriter',
        description: 'Already have an About section? Get it scored and rewritten with specific improvements explained.',
        prompt: `Score and rewrite my LinkedIn About section.

My current About section:
"""
[Paste your entire current About section here]
"""

My role: [Your Job Title]
My industry: [Your Industry]
What I want to be known for: [Your positioning goal]

Tasks:
1. Score my current About section out of 10 across these criteria:
   - Hook (do the first 2 lines grab attention?)
   - Story (is there a narrative arc?)
   - Specificity (are there concrete details/numbers?)
   - Keywords (are searchable skills mentioned naturally?)
   - Call-to-action (does it tell the reader what to do next?)
   - Length (is it in the 150-300 word sweet spot?)
   - Voice (does it sound human and first-person?)

2. List the top 3 specific problems with my current version

3. Write a complete rewritten version that fixes all the issues

4. Add a "Before → After" comparison showing the 3 biggest improvements you made and why each change matters

Keep the rewrite under 300 words. Maintain my authentic voice | improve the structure, not my personality.`,
        tips: [
            'This is the best prompt to use right after getting your LinkedInRank About section score',
            'If the AI rewrites it in a voice that doesn\'t feel like you, ask it to "make it more [casual/direct/warm]"',
            'Run the rewritten version through LinkedInRank to see the score improvement',
        ],
    },
    {
        id: 'executive',
        title: 'The Executive & Leader Prompt',
        description: 'For directors, VPs, C-suite, and senior leaders who need to project authority and vision.',
        prompt: `Write my LinkedIn About section as a senior leader / executive.

Name: [Your Name]
Title: [e.g., "VP of Engineering" or "Chief Marketing Officer"]
Company: [Your Company]
Industry: [Your Industry]
Scope of responsibility: [e.g., "Lead a team of 120 engineers across 4 product lines"]
Career highlights (pick top 3):
1. [e.g., "Scaled engineering team from 15 to 120 while maintaining 95% retention"]
2. [e.g., "Led the technical architecture for a product that reached $50M ARR"]
3. [e.g., "Built the company's first platform engineering function from zero"]
My leadership philosophy in one sentence: [e.g., "I believe the best engineering leaders remove obstacles, not add process"]
What I care about beyond my day job: [e.g., "mentoring first-generation tech workers"]
Speaking / board / advisory roles (if any): [e.g., "Advisory board member at TechStartup Inc."]

Write a LinkedIn About section that:
1. Opens with a leadership-level statement (not job description, but VISION)
2. Demonstrates scope and impact through 2-3 specific achievements
3. Shows leadership philosophy | what kind of leader are you?
4. Mentions one thing beyond the day job (mentoring, speaking, community)
5. Ends with what you're interested in (partnerships, board seats, speaking, talent)
6. Is 200-300 words
7. Sounds like a confident leader, not a humble-bragging list
8. Uses first person but with gravitas

Tone: authoritative but human. Think "CEO writing a letter" not "resume in paragraph form."`,
        tips: [
            'Executives who share their philosophy attract better talent and partnership opportunities',
            'Numbers at the leadership level should show SCALE: team size, revenue, market impact',
            'The "beyond the day job" line makes you 3D | people connect with humans, not titles',
        ],
    },
]

export default function AIPromptsAboutPage() {
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
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-5">AI Prompts for Your LinkedIn About Section</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-xl mx-auto leading-relaxed">
                        Your About section is your personal pitch. These prompts help you write one that&apos;s authentic, specific, and impossible to ignore.
                    </p>
                </div>
            </section>

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
                <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6 sm:p-8 mb-12">
                    <h2 className="text-base font-bold text-[#0A0F1C] mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                        Why the About section matters
                    </h2>
                    <p className="text-sm text-[#4B5563] leading-relaxed">Your About section is worth <strong>20 out of 100 points</strong> on LinkedInRank. It&apos;s the first thing people read after your headline | and the section where most profiles fail. The most common mistake? Writing in third person or leaving it completely blank. These prompts fix that. <Link href="/linkedin-about-guide" className="text-[#0A66C2] hover:underline font-medium">Read our full About section guide →</Link></p>
                </div>

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
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">Score your new About section</h2>
                    <p className="text-sm text-[#4B5563] mb-5 max-w-md mx-auto">Update your LinkedIn profile, export a new PDF, and see how your About section score improves.</p>
                    <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It&apos;s Free</Link>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">More AI Prompt Guides</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'All AI Prompts (Pillar Guide)', href: '/ai-prompts-linkedin' },
                            { label: 'Headline Prompts', href: '/ai-prompts-linkedin-headline' },
                            { label: 'Experience Prompts', href: '/ai-prompts-linkedin-experience' },
                            { label: 'Skills Prompts', href: '/ai-prompts-linkedin-skills' },
                            { label: 'Summary & Positioning', href: '/ai-prompts-linkedin-summary' },
                            { label: 'About Section Guide', href: '/linkedin-about-guide' },
                            { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
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
