'use client'

import { useState } from 'react'

interface ToolPromptBlockProps {
    toolName: string
    promptText: string
    color?: string
}

export function AIFailedPromptBlock({ toolName, promptText, color = '#0A66C2' }: ToolPromptBlockProps) {
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
        <div className="mt-2 border border-amber-200 rounded-xl bg-amber-50 overflow-hidden">
            <div className="px-4 py-3">
                <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <p className="text-sm font-semibold text-amber-800">AI is not available right now</p>
                </div>
                <p className="text-xs text-amber-700 mb-3 leading-relaxed">
                    Copy the prompt below and paste it into <strong>ChatGPT</strong>, <strong>Claude</strong>, or <strong>Gemini</strong> to get your results.
                </p>
                <div className="bg-white border border-amber-100 rounded-lg p-3 mb-3 max-h-48 overflow-y-auto">
                    <pre className="text-[10px] text-[#4B5563] whitespace-pre-wrap font-sans leading-relaxed">{promptText}</pre>
                </div>
                <button
                    onClick={handleCopy}
                    className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all"
                    style={{
                        backgroundColor: copied ? '#ECFDF5' : color,
                        color: copied ? '#059669' : '#fff',
                    }}
                >
                    {copied ? '✓ Prompt Copied! Paste it in any AI chatbot' : 'Copy Prompt'}
                </button>
            </div>
        </div>
    )
}

export default function ToolPromptBlock({ toolName, promptText, color = '#0A66C2' }: ToolPromptBlockProps) {
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
        <div className="mt-4 border border-dashed border-gray-200 rounded-xl bg-[#FAFBFC] overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                    <svg className="w-4 h-4 shrink-0" style={{ color }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-[#0A0F1C]">Want even better results?</p>
                        <p className="text-[10px] text-[#6B7280] truncate">Copy this prompt → paste into ChatGPT / Claude / Gemini</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-[10px] text-[#6B7280] hover:text-[#0A0F1C] transition-colors flex items-center gap-1"
                    >
                        <svg className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        {expanded ? 'Hide' : 'Preview'}
                    </button>
                    <button
                        onClick={handleCopy}
                        className="text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all"
                        style={{
                            backgroundColor: copied ? '#ECFDF5' : `${color}10`,
                            color: copied ? '#059669' : color,
                        }}
                    >
                        {copied ? '✓ Copied!' : 'Copy Prompt'}
                    </button>
                </div>
            </div>
            {expanded && (
                <div className="border-t border-gray-100 px-4 py-3 max-h-56 overflow-y-auto">
                    <pre className="text-[10px] text-[#4B5563] whitespace-pre-wrap font-sans leading-relaxed">{promptText}</pre>
                </div>
            )}
        </div>
    )
}

// ── Prompt builders for each tool ──────────────────────────

const CORE_PRINCIPLES = `CORE PRINCIPLES (apply to every section):
1. Start with ATTENTION, not information. Open with pattern interruption.
2. Emotion Formula: Relevance + Tension + Identity = Engagement.
3. Write for RECEPTION, not expression. Focus on what the reader experiences.
4. Use CONCRETE specifics over abstract claims. Stories beat statistics.
5. Engineer COGNITIVE EASE: short sentences, simple words, one idea per paragraph.
6. Identity-based framing: position the person as someone others want to work with.
7. Avoid generic AI tone: no "In today's world...", no "It's not just X, it's Y".
8. Attack core assumptions, not surface points. High leverage > high volume.
9. Introduce cognitive dissonance: show two beliefs that conflict.
10. Anchor with proof: reference results, case studies, specific outcomes.
11. Optimize for share psychology: validates beliefs, signals status, makes reader look smart.
12. End with psychological closure: powerful reframing, sharp question, or mic-drop line.
13. LinkedIn context: frame through growth, leverage, career mobility, authority, skill edge.
14. Make the reader the hero, not the author.
15. Engineer memory: clean structure, clear thesis, strong contrast, repeatable phrases.
16. NEVER use em dashes or en dashes. Use commas, periods, or conjunctions instead. Dashes signal AI-generated text.`

export function buildAboutPrompt(inputs: {
    role: string; experience?: string; passion?: string;
    achievement?: string; skills?: string; audience?: string;
    currentAbout?: string; education?: string[];
}): string {
    return `You are an elite LinkedIn About section strategist. You engineer perception, not bios.

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
1. Narrative Arc: Hook with surprising insight, background, proof, vision
2. Authority & Expertise: Direct, data-backed, credential-led
3. Conversational: Warm but smart, like a brilliant colleague over coffee

WORD LIMIT: 150-250 words per version. Under 2,600 characters (LinkedIn limit).

RULES:
- First person ("I"), under 2,600 characters
- Open with a PATTERN INTERRUPT (never "I am a..." or "With X years...")
- Structure: Hook, Proof, Authority, CTA
- Include 2+ quantified achievements per version
- Weave in 5+ industry keywords for SEO
- End with a clear, direct call-to-action
- The reader should finish thinking "I want to work with this person"
- NEVER use em dashes. Use commas or periods instead.

Format each with the style name as a header.`
}

export function buildCommentPrompt(inputs: {
    postContent: string; style: string; expertise?: string; length?: string;
}): string {
    return `You are a LinkedIn authority-building strategist. Write comments that build the commenter's reputation.

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
- Reference SPECIFIC points from the post (not vague generalizations)
- NO generic openers ("Great post!", "Love this!", "Totally agree!")
- Each takes a DIFFERENT angle on the post
- Sound like a real human who deeply read the post
- Position the commenter as someone worth following
- At least one ends with a follow-up question
- NEVER use em dashes. Use commas or periods.

Format: Give each a 2-5 word label describing the angle.`
}

export function buildHeadlinePrompt(inputs: {
    role: string; company?: string; industry?: string;
    skills?: string[]; currentHeadline?: string; about?: string;
}): string {
    return `You are an elite LinkedIn headline strategist. Engineer first impressions.

MY PROFILE:
- Role: ${inputs.role}
${inputs.company ? `- Company: ${inputs.company}` : ''}
${inputs.industry ? `- Industry: ${inputs.industry}` : ''}
${inputs.skills?.length ? `- Skills: ${inputs.skills.join(', ')}` : ''}
${inputs.currentHeadline ? `- Current headline: "${inputs.currentHeadline}"` : ''}
${inputs.about ? `- About snippet: "${inputs.about.slice(0, 300)}"` : ''}

${CORE_PRINCIPLES}

TASK: Write 6 headlines (under 120 chars each) in these styles:
1. Value Proposition: "I help [audience] achieve [outcome]"
2. Authority: Role + Company + Domain expertise
3. Outcome-Focused: Lead with measurable results
4. Intersection: Unique combo of skills/domains
5. Mission-Driven: Who you serve + why it matters
6. Builder: "Building [what] | [Role] | [Differentiator]"

CHARACTER LIMIT: Each headline MUST be under 120 characters.

RULES:
- Front-load recruiter search keywords
- Create curiosity gap, make them click
- Zero clichés: no "passionate", "results-driven", "team player"
- NEVER use em dashes. Use | or commas instead.
- Score each 75-98 based on keyword density, specificity, positioning, curiosity`
}

export function buildPostIdeaPrompt(inputs: {
    industry: string; goal: string; niche?: string;
    expertise?: string; postType?: string;
}): string {
    return `You are a LinkedIn content strategist who engineers posts for perception impact.

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

Each idea must be deeply specific to ${inputs.industry}, referencing real trends, tools, challenges. No generic ideas.`
}

export function buildStoryToPostPrompt(inputs: {
    story: string; tone?: string; audience?: string; goal?: string;
}): string {
    return `You are an elite LinkedIn ghostwriter who engineers posts for perception and influence.

RAW STORY:
"${inputs.story}"

${inputs.tone ? `Tone: ${inputs.tone}` : 'Tone: Professional but human'}
${inputs.audience ? `Audience: ${inputs.audience}` : ''}
${inputs.goal ? `Goal/Lesson: ${inputs.goal}` : ''}

${CORE_PRINCIPLES}

TASK: Transform this into a ready-to-post LinkedIn post.

WORD LIMIT: 150-250 words. No longer.

STRUCTURE: Hook, Tension, Story, Concrete Example, Insight, Strong Close
- First person, short paragraphs (1-2 sentences each)
- Hook must be a pattern interrupt
- End with psychological closure (reframing, sharp question, or mic-drop)
- Add 3-5 relevant hashtags
- Make it SPECIFIC with real details from the story
- NEVER use em dashes. Use commas or periods.`
}

export function buildHookPrompt(inputs: {
    topic: string; angle?: string; audience?: string;
}): string {
    return `You are a scroll-psychology expert who engineers LinkedIn opening lines.

POST CONTEXT:
- Topic: ${inputs.topic}
${inputs.angle ? `- My angle: ${inputs.angle}` : ''}
${inputs.audience ? `- Audience: ${inputs.audience}` : ''}

${CORE_PRINCIPLES}

TASK: Generate 6 hooks using these psychological techniques:
1. Pattern Interrupt: say something unexpected
2. Curiosity Gap: open a loop they must close
3. Contrarian: challenge the popular belief with evidence
4. Story Hook: drop into the middle of a compelling moment
5. Data-Led: lead with a surprising statistic
6. Confession: vulnerable admission that builds trust

WORD LIMIT: Each hook must be 10-30 words (1-3 lines). Each explanation: 15-25 words.

RULES:
- Hyper-specific to the topic. Generic hooks = failure.
- Include why each works psychologically.
- NEVER use em dashes. Use commas or periods.`
}

export function buildConnectionPrompt(inputs: {
    type: string; name: string; context?: string;
    yourRole?: string; recipientRole?: string; intent?: string;
}): string {
    return `You are a LinkedIn connection message expert. Write the "Add a note" message for a connection request.

SCENARIO:
- Message type: ${inputs.type}
- Recipient name: ${inputs.name}
${inputs.recipientRole ? `- Recipient's role: ${inputs.recipientRole}` : ''}
${inputs.yourRole ? `- Sender's role: ${inputs.yourRole}` : ''}
${inputs.context ? `- Context: ${inputs.context}` : ''}
${inputs.intent ? `- Intent: ${inputs.intent}` : ''}

${CORE_PRINCIPLES}

TASK: Write 3 connection messages.

CHARACTER LIMIT: Each message MUST be under 300 characters (LinkedIn limit).

RULES:
- Use their FIRST NAME naturally, not their full name or title
- NEVER copy-paste full headlines into messages. Paraphrase roles in 3-5 words max
- Each with a DIFFERENT tone: one direct, one warm, one value-offering
- Be specific about WHY you want to connect
- NO generic filler like "I'd love to connect" without a reason
- Sound like a real person typing a quick note, not a formal letter
- Include 1 tip per message on why that approach works
- NEVER use em dashes or en dashes. Use commas or periods.`
}

export function buildContentPlannerPrompt(inputs: {
    industry: string; role: string; frequency: string;
}): string {
    return `You are a LinkedIn content calendar expert.

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
- Example HOOK for each day (scroll-stopping)

Every prompt must reference real trends, tools, or challenges in ${inputs.industry}.
NEVER use em dashes. Use commas or periods.`
}

export function buildBulletPrompt(inputs: {
    bullet: string; role?: string; industry?: string;
}): string {
    return `You are a LinkedIn experience section expert. Rewrite weak job descriptions into achievement bullets.

ORIGINAL BULLET:
"${inputs.bullet}"

${inputs.role ? `Role context: ${inputs.role}` : ''}
${inputs.industry ? `Industry: ${inputs.industry}` : ''}

${CORE_PRINCIPLES}

TASK: Rewrite into 3 achievement-driven bullet styles:
1. Metrics-Heavy: Lead with numbers (%, $, team size, time saved)
2. Impact-Focused: Emphasize the business outcome
3. Leadership-Framed: Show scope and responsibility

WORD LIMIT: Each bullet should be 15-30 words. One sentence max.

RULES:
- Start with power verb (Led, Built, Designed, Shipped, Automated, Scaled)
- Format: "[Power verb] + [specific action] + [measurable result]"
- NEVER start with "Enhanced", "Utilized", or "Assisted"
- If no metrics given, use realistic placeholders: "[X]%"
- Each bullet should make a recruiter think "I need to interview this person"
- NEVER use em dashes. Use commas.`
}

export function buildSEOPrompt(inputs: {
    headline: string; about: string; skills: string;
}): string {
    return `You are a LinkedIn SEO and recruiter-visibility expert.

MY CURRENT PROFILE:
- Headline: "${inputs.headline}"
- About: "${inputs.about}"
- Skills: ${inputs.skills}

${CORE_PRINCIPLES}

TASK: Analyze my profile's keyword coverage.

KEEP OUTPUT CONCISE. Total response: under 400 words.

Provide:
1. MISSING KEYWORDS: Top 10 keywords recruiters search for in my industry that I'm missing
2. KEYWORD PLACEMENT: Where each keyword should go (headline, about, experience, skills)
3. SEARCH VISIBILITY SCORE: Rate my current discoverability 1-100
4. REWRITE SUGGESTIONS: Show me exactly how to weave missing keywords naturally
5. COMPETITOR KEYWORDS: What do top profiles in my field include that I don't?`
}
