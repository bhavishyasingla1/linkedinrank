'use client'

import { useState } from 'react'

interface ToolPromptBlockProps {
    toolName: string
    promptText: string
    color?: string
}

export function AIFailedPromptBlock({ toolName, promptText, color = '#2f27ce' }: ToolPromptBlockProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        try {
            navigator.clipboard.writeText(promptText)
        } catch {
            const ta = document.createElement('textarea')
            ta.value = promptText
            ta.style.position = 'fixed'
            ta.style.opacity = '0'
            document.body.appendChild(ta)
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
    }

    return (
        <div className="mt-4 border border-amber-200 rounded-2xl bg-amber-50/80 overflow-hidden shadow-xs">
            <div className="p-5">
                <div className="flex items-center gap-2.5 mb-2">
                    <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <p className="text-[14px] font-bold text-amber-900">AI Service Offline (Rule-Based Fallback Active)</p>
                </div>
                <p className="text-[12.5px] text-amber-800 mb-3 leading-relaxed">
                    You can copy the engineered prompt below and paste it into <strong>ChatGPT</strong>, <strong>Claude</strong>, or <strong>Gemini</strong> for full AI generation.
                </p>
                <div className="bg-white border border-amber-200 rounded-xl p-3.5 mb-3 max-h-48 overflow-y-auto">
                    <pre className="text-[11px] text-[#050315]/80 whitespace-pre-wrap font-mono leading-relaxed">{promptText}</pre>
                </div>
                <button
                    onClick={handleCopy}
                    className="w-full py-3 rounded-xl font-bold text-[13.5px] transition-all cursor-pointer shadow-xs"
                    style={{
                        backgroundColor: copied ? '#ECFDF5' : color,
                        color: copied ? '#059669' : '#fff',
                    }}
                >
                    {copied ? '✓ Prompt Copied to Clipboard!' : 'Copy Pre-Formatted Prompt'}
                </button>
            </div>
        </div>
    )
}

export default function ToolPromptBlock({ toolName, promptText, color = '#2f27ce' }: ToolPromptBlockProps) {
    const [copied, setCopied] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const handleCopy = () => {
        try {
            navigator.clipboard.writeText(promptText)
        } catch {
            const ta = document.createElement('textarea')
            ta.value = promptText
            ta.style.position = 'fixed'
            ta.style.opacity = '0'
            document.body.appendChild(ta)
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
    }

    return (
        <div className="mt-5 border border-dashed border-[#dedcff] rounded-2xl bg-[#fbfbfe] overflow-hidden">
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 shadow-2xs">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="text-[13px] font-bold text-[#050315]">Copy Engineered AI Prompt</p>
                        <p className="text-[11.5px] text-[#050315]/60 truncate">Paste into ChatGPT, Claude, or Gemini for custom variations</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-[12px] font-semibold text-[#050315]/70 hover:text-[#050315] transition-colors flex items-center gap-1 cursor-pointer px-2.5 py-1.5"
                    >
                        <svg className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        {expanded ? 'Hide Prompt' : 'Preview Prompt'}
                    </button>
                    <button
                        onClick={handleCopy}
                        className="text-[12px] font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                        style={{
                            backgroundColor: copied ? '#ECFDF5' : '#2f27ce',
                            color: copied ? '#059669' : '#fff',
                        }}
                    >
                        {copied ? '✓ Copied!' : 'Copy Prompt'}
                    </button>
                </div>
            </div>
            {expanded && (
                <div className="border-t border-[#dedcff] p-4 bg-white max-h-60 overflow-y-auto">
                    <pre className="text-[11px] text-[#050315]/80 whitespace-pre-wrap font-mono leading-relaxed">{promptText}</pre>
                </div>
            )}
        </div>
    )
}

const CORE_PRINCIPLES = `═══ STRICT WRITING & ANTI-AI CONSTRAINTS (HUMANS & WORLD-BUILDING FRAMEWORK) ═══
1. BANNED VOCABULARY (Never use any of these words or stems):
   additionally, align with, boasts, bolstered, crucial, delve, delving, emphasize, emphasizing, enduring, enhance, enhancing, fostering, garner, highlight, highlighting, interplay, intricate, intricacies, key (as filler), landscape (abstract noun), meticulous, meticulously, pivotal, robust, showcase, showcasing, tapestry, testament, underscore, valuable, vibrant, rich, profound, exemplifies, commitment to, groundbreaking, renowned, diverse array, unlock, supercharge, transformative, innovative, passionate, results-driven, team player, go-getter, in today's fast-paced world, not only X but also Y.

2. SENTENCE CONSTRUCTION & COPULAS:
   - Use plain "is" and "has" constructions. Avoid dressed-up copula substitutes (serves as, stands as, marks, functions as, operates as, represents, boasts, features, maintains).
   - NEVER tack on a dangling "-ing" clause at sentence ends (e.g., "...creating a lively community", "...cementing its position").
   - Do NOT force contrast ("It's not X, it's Y", "X rather than Y").
   - Do NOT pad examples to three artificially.
   - Do NOT cycle synonyms to dodge natural word repetition.

3. FORMATTING, PUNCTUATION & TONE:
   - NEVER use em dashes (—) or en dashes (–). Use commas, periods, colons, or | instead.
   - NO emojis, no hype language, no corporate cheerleading, no inflated claims.
   - Sentence case for titles and headings (not title case).
   - Sparing bold; do not bold random filler words.
   - High cognitive hospitality: short clean sentences, ordinary words, low decoding cost.

4. SOURCING & GROUND TRUTH INTEGRITY:
   - Ground all output in the user's specific background, domain tools, and industry terms.
   - Never fabricate metrics, companies, or credentials.
   - Do not manufacture significance ("marks a turning point", "reflects broader trends").
   - Omit conversational asides ("I hope this helps", "Certainly"). Deliver deliverables directly.`

export function buildAboutPrompt(inputs: {
    role: string; experience?: string; passion?: string;
    achievement?: string; skills?: string; audience?: string;
    currentAbout?: string; education?: string[];
}): string {
    return `You are an elite LinkedIn About section strategist. You write authentic, high-converting profiles that build genuine authority.

MY PROFILE:
- Role: ${inputs.role}
${inputs.experience ? `- Experience: ${inputs.experience}` : ''}
${inputs.passion ? `- What drives me: ${inputs.passion}` : ''}
${inputs.achievement ? `- Key achievement: ${inputs.achievement}` : ''}
${inputs.skills ? `- Core skills: ${inputs.skills}` : ''}
${inputs.audience ? `- Target audience: ${inputs.audience}` : ''}
${inputs.education?.length ? `- Education: ${inputs.education.join(', ')}` : ''}
${inputs.currentAbout ? `- Current About (rewrite this): "${inputs.currentAbout}"` : ''}

${CORE_PRINCIPLES}

TASK: Write 3 LinkedIn About sections in these styles:
1. Narrative Arc: Hook with clear insight, background, proof, vision
2. Authority & Expertise: Direct, data-backed, credential-led
3. Conversational: Warm and smart, like explaining what you do to a colleague over coffee

WORD LIMIT: 150-250 words per version. Under 2,000 characters.

RULES:
- First person ("I")
- Open with a hook stating what you do or build (never "I am a..." or "With X years...")
- Structure: Hook, Proof, Focus, CTA
- Weave in 5+ industry keywords for SEO
- End with a clean, direct call-to-action

Format each with the style name as a header.`
}

export function buildCommentPrompt(inputs: {
    postContent: string; style: string; expertise?: string; length?: string;
}): string {
    return `You are a LinkedIn strategist. Write high-signal comments that build reputation and demonstrate genuine domain expertise.

POST TO COMMENT ON:
"""
${inputs.postContent}
"""

Comment style: ${inputs.style}
${inputs.expertise ? `Commenter's background: ${inputs.expertise}` : ''}
Approximate length: ${inputs.length || 'medium (50-100 words)'}

${CORE_PRINCIPLES}

TASK: Write 3 comments.

WORD LIMIT: Match the requested length exactly. Short = 30-50 words. Medium = 50-80 words. Detailed = 80-120 words.

RULES:
- Reference SPECIFIC points from the post
- NO generic openers ("Great post!", "Love this!", "Totally agree!")
- Each takes a DIFFERENT angle on the post
- Sound like a real human who deeply read the post
- Position the commenter as someone worth following
- At least one ends with a follow-up question

Format: Give each a 2-5 word label describing the angle.`
}

export function buildHeadlinePrompt(inputs: {
    role: string; company?: string; industry?: string;
    skills?: string[]; currentHeadline?: string; about?: string;
}): string {
    return `You are an elite LinkedIn headline strategist. You write crisp, human, high-converting headlines.

MY PROFILE:
- Role: ${inputs.role}
${inputs.company ? `- Company: ${inputs.company}` : ''}
${inputs.industry ? `- Industry: ${inputs.industry}` : ''}
${inputs.skills?.length ? `- Skills: ${inputs.skills.join(', ')}` : ''}
${inputs.currentHeadline ? `- Current headline: "${inputs.currentHeadline}"` : ''}
${inputs.about ? `- About snippet: "${inputs.about.slice(0, 300)}"` : ''}

${CORE_PRINCIPLES}

TASK: Write 6 headlines (under 120 chars each) in these styles:
1. Value Proposition: "I help [audience] [outcome]"
2. Authority: Role + Company + Domain expertise
3. Outcome-Focused: Lead with measurable results
4. Intersection: Unique combo of skills/domains
5. Mission-Driven: Who you serve + problem you solve
6. Builder: "Building [what] | [Role] | [Differentiator]"

CHARACTER LIMIT: Each headline MUST be under 120 characters.

RULES:
- Front-load recruiter search keywords
- Create curiosity gap
- Score each 75-98 based on keyword density, specificity, positioning, curiosity`
}

export function buildPostIdeaPrompt(inputs: {
    industry: string; goal: string; niche?: string;
    expertise?: string; postType?: string;
}): string {
    return `You are a LinkedIn content strategist who designs posts for maximum professional perception.

CONTEXT:
- Industry: ${inputs.industry}
- Goal: ${inputs.goal}
${inputs.niche ? `- Niche: ${inputs.niche}` : ''}
${inputs.expertise ? `- My expertise: ${inputs.expertise}` : ''}
${inputs.postType ? `- Post type preference: ${inputs.postType}` : ''}

${CORE_PRINCIPLES}

TASK: Generate 5 unique LinkedIn post ideas.

WORD LIMIT: Each hook should be 10-25 words. Each angle description: 10-20 words.

For each idea provide:
- A scroll-stopping HOOK (first line of post)
- The ANGLE that makes it unique
- The FORMAT (text, carousel, poll, storytelling, etc.)
- Content PILLAR (growth, insights, or engagement)

Each idea must be deeply specific to ${inputs.industry}, referencing real trends, tools, or challenges.`
}

export function buildStoryToPostPrompt(inputs: {
    story: string; tone?: string; audience?: string; goal?: string;
}): string {
    return `You are an elite LinkedIn ghostwriter who turns real experiences into high-signal LinkedIn posts.

RAW STORY:
"${inputs.story}"

${inputs.tone ? `Tone: ${inputs.tone}` : 'Tone: Professional, direct, human'}
${inputs.audience ? `Audience: ${inputs.audience}` : ''}
${inputs.goal ? `Goal/Lesson: ${inputs.goal}` : ''}

${CORE_PRINCIPLES}

TASK: Transform this into a ready-to-post LinkedIn post.

WORD LIMIT: 150-250 words.

STRUCTURE: Hook, Tension, Story, Concrete Example, Insight, Strong Close
- First person, short paragraphs (1-2 sentences each)
- Hook must be a pattern interrupt
- End with a sharp takeaway or question
- Add 3-5 relevant hashtags`
}

export function buildHookPrompt(inputs: {
    topic: string; angle?: string; audience?: string;
}): string {
    return `You are a scroll-psychology expert who writes LinkedIn opening lines that stop the scroll.

POST CONTEXT:
- Topic: ${inputs.topic}
${inputs.angle ? `- My angle: ${inputs.angle}` : ''}
${inputs.audience ? `- Audience: ${inputs.audience}` : ''}

${CORE_PRINCIPLES}

TASK: Generate 6 hooks using these psychological techniques:
1. Pattern Interrupt: say something unexpected
2. Curiosity Gap: open a loop they want to close
3. Contrarian: question a common belief with evidence
4. Story Hook: drop into the middle of a concrete moment
5. Data-Led: lead with a surprising statistic
6. Confession: honest admission that builds trust

WORD LIMIT: Each hook must be 10-30 words (1-3 lines). Each explanation: 15-25 words.

RULES:
- Hyper-specific to the topic.
- Include why each works psychologically.`
}

export function buildConnectionPrompt(inputs: {
    type: string; name: string; context?: string;
    yourRole?: string; recipientRole?: string; intent?: string;
}): string {
    return `You are a LinkedIn connection message expert. Write the short "Add a note" message for a connection request.

SCENARIO:
- Message type: ${inputs.type}
- Recipient name: ${inputs.name}
${inputs.recipientRole ? `- Recipient's role: ${inputs.recipientRole}` : ''}
${inputs.yourRole ? `- Sender's role: ${inputs.yourRole}` : ''}
${inputs.context ? `- Context: ${inputs.context}` : ''}
${inputs.intent ? `- Intent: ${inputs.intent}` : ''}

${CORE_PRINCIPLES}

TASK: Write 3 connection messages.

CHARACTER LIMIT: Each message MUST be strictly under 300 characters (LinkedIn limit). Aim for 240-280 characters.

RULES:
- Use their FIRST NAME naturally
- NEVER copy full headlines into messages. Paraphrase roles in 3-5 words max
- Each with a DIFFERENT tone: one direct, one warm, one value-offering
- Specific reason for connecting
- NO generic filler like "I'd love to connect" without a reason`
}

export function buildContentPlannerPrompt(inputs: {
    industry: string; role: string; frequency: string;
}): string {
    return `You are a LinkedIn content calendar expert creating a weekly plan.

CONTEXT:
- Industry: ${inputs.industry}
- Role: ${inputs.role}
- Frequency: ${inputs.frequency}x per week

${CORE_PRINCIPLES}

TASK: Create a ${inputs.frequency}-day weekly posting plan.

WORD LIMIT: Each prompt: 20-40 words. Each hook: 10-25 words.

For each day provide:
- Content PILLAR (growth ~40%, insights ~40%, engagement ~20%)
- FORMAT (text, carousel, poll, storytelling, how-to, etc.)
- Detailed PROMPT specific to ${inputs.industry} + ${inputs.role}
- Example HOOK for each day

Every prompt must reference real trends, tools, or challenges in ${inputs.industry}.`
}

export function buildBulletPrompt(inputs: {
    bullet: string; role?: string; industry?: string;
}): string {
    return `You are a LinkedIn experience section editor. Rewrite weak job descriptions into clear achievement statements.

ORIGINAL BULLET:
"${inputs.bullet}"

${inputs.role ? `Role context: ${inputs.role}` : ''}
${inputs.industry ? `Industry: ${inputs.industry}` : ''}

${CORE_PRINCIPLES}

TASK: Rewrite into 3 achievement-driven bullet styles:
1. Metrics-Focused: Lead with numbers (%, $, team size, time saved)
2. Impact-Focused: Emphasize the functional outcome
3. Execution-Focused: Show scope and responsibility

WORD LIMIT: Each bullet should be 15-30 words. One sentence max.

RULES:
- Start with an active power verb (Led, Built, Designed, Shipped, Automated, Scaled)
- Format: "[Power verb] + [specific action] + [measurable result]"
- NEVER start with "Enhanced", "Utilized", or "Assisted"`
}

export function buildSEOPrompt(inputs: {
    headline: string; about: string; skills: string;
}): string {
    return `You are a LinkedIn SEO and recruiter-visibility strategist.

MY CURRENT PROFILE:
- Headline: "${inputs.headline}"
- About: "${inputs.about}"
- Skills: ${inputs.skills}

${CORE_PRINCIPLES}

TASK: Analyze my profile's keyword discoverability.

KEEP OUTPUT CONCISE. Total response: under 400 words.

Provide:
1. MISSING KEYWORDS: Top 10 searchable keywords recruiters use in my industry that I am missing
2. KEYWORD PLACEMENT: Where each keyword should go (headline, about, experience, skills)
3. SEARCH VISIBILITY SCORE: Rate my current discoverability 1-100
4. REWRITE SUGGESTIONS: Show me how to weave missing keywords naturally
5. TOP COMPETITOR PATTERNS: What do top-ranked profiles in my field include that I do not?`
}
