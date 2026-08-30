import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const maxDuration = 60 // Prevent Vercel timeout on production

const apiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
    ? process.env.GEMINI_API_KEY
    : null

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

// Models to try in order with fallback resilience
const MODELS = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-2.0-flash-lite',
    'gemini-3.1-flash-lite'
]
const MAX_RETRIES = 1
const RETRY_DELAY_MS = 1000

const BANNED_VOCABULARY_CLAUSE = `═══ STRICT WRITING & ANTI-AI CONSTRAINTS (HUMANS & WORLD-BUILDING RULES) ═══
1. BANNED VOCABULARY & PHRASES (NEVER use any of these words or stems):
   "additionally", "align with", "boasts", "bolstered", "crucial", "delve", "delving", "emphasize", "emphasizing", "enduring", "enhance", "enhancing", "fostering", "garner", "highlight", "highlighting", "interplay", "intricate", "intricacies", "key" (as filler adjective), "landscape" (as abstract noun), "meticulous", "meticulously", "pivotal", "robust", "showcase", "showcasing", "tapestry", "testament", "underscore", "valuable", "vibrant", "rich", "profound", "exemplifies", "commitment to", "groundbreaking", "renowned", "diverse array", "unlock", "supercharge", "transformative", "innovative", "passionate", "results-driven", "team player", "go-getter", "in today's fast-paced world", "not only X, but also Y".

2. SENTENCE CONSTRUCTION & COPULAS:
   - Use plain "is" and "has" constructions. Avoid dressed-up copula substitutes (serves as, stands as, marks, functions as, operates as, represents, boasts, features, maintains).
   - NEVER tack on a dangling "-ing" clause at sentence ends (e.g., "...creating a lively sense of community", "...cementing its place").
   - Do NOT force contrast ("It's not just X, it's Y", "X rather than Y").
   - Do NOT pad lists to three items artificially.
   - Do NOT cycle synonyms to dodge natural word repetition.

3. FORMATTING, PUNCTUATION & TONE:
   - NEVER use em dashes (—) or en dashes (–). Use commas, periods, colons, or | instead.
   - NO emojis or decorative characters anywhere in output text.
   - Sentence case for titles and headers (not title case).
   - Sparing bold; do NOT bold random buzzwords.
   - Sound like a credible, accomplished human with high signal, cognitive hospitality, and low decoding cost.

4. CONTENT & SOURCING INTEGRITY:
   - Ground all output in the user's actual context, skills, and industry terminology.
   - Do NOT invent fake metrics, companies, or credentials.
   - Do NOT manufacture significance ("marks a pivotal moment", "reflects broader trends").
   - Omit conversational asides ("I hope this helps", "Certainly", "Here are your options"). Deliver the output directly.`

async function callGeminiWithRetry(
    prompt: string,
    config: { temperature: number; maxOutputTokens: number; responseMimeType?: string }
): Promise<string | null> {
    if (!genAI) return null

    const enhancedConfig = {
        ...config,
        responseMimeType: config.responseMimeType || 'application/json'
    }

    for (const modelName of MODELS) {
        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName })
                const result = await model.generateContent({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig: enhancedConfig,
                })
                const text = result.response.text()
                if (text && text.trim().length > 0) {
                    return text
                }
            } catch (err: any) {
                const status = err?.status || err?.httpErrorCode || 0
                const msg = err?.message || ''
                const is429 = status === 429 || msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')
                
                console.warn(`[AI Tools] ${modelName} attempt ${attempt + 1} failed:`, is429 ? '429 quota' : msg.slice(0, 120))
                
                if (is429 && attempt < MAX_RETRIES) {
                    await new Promise(r => setTimeout(r, RETRY_DELAY_MS * (attempt + 1)))
                    continue
                }
                
                if (is429) {
                    break
                }
                
                break
            }
        }
    }
    return null
}

function parseJsonArray(text: string): any[] | null {
    try {
        return JSON.parse(text)
    } catch {
        const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim()
        const m = cleaned.match(/\[[\s\S]*\]/)
        if (m) { try { return JSON.parse(m[0]) } catch { return null } }
        return null
    }
}

function parseJsonObject(text: string): any | null {
    try {
        return JSON.parse(text)
    } catch {
        const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim()
        const m = cleaned.match(/\{[\s\S]*\}/)
        if (m) { try { return JSON.parse(m[0]) } catch { return null } }
        return null
    }
}

// ============================================================
// AI TOOL PROMPTS
// ============================================================

async function aiGenerateHeadlines(input: {
    role: string
    company?: string
    industry?: string
    specialty?: string
    skills?: string[]
    currentHeadline?: string
    about?: string
}) {
    if (!genAI) return null
    const skillsText = input.skills?.slice(0, 8).join(', ') || ''

    const prompt = `You are an elite LinkedIn headline strategist. You write crisp, human, high-converting headlines that make recruiters click.

CONTEXT:
- Role: ${input.role}
${input.company ? `- Company: ${input.company}` : ''}
${input.industry ? `- Industry: ${input.industry}` : ''}
${input.specialty ? `- Specialty/Focus: ${input.specialty}` : ''}
${skillsText ? `- Key Skills: ${skillsText}` : ''}
${input.currentHeadline ? `- Current Headline: "${input.currentHeadline}"` : ''}
${input.about ? `- About (snippet): "${input.about.slice(0, 300)}"` : ''}

${BANNED_VOCABULARY_CLAUSE}

RULES:
1. Generate EXACTLY 6 headlines.
2. Each headline MUST be under 120 characters.
3. Each must use a DIFFERENT style/angle from the list below.
4. Include 2-3 searchable keywords recruiters search for in this industry.
5. Be specific to THIS person's background.
6. Use separators like | or · for readability.
7. Score each headline 75-98 based on: keyword density (30%), specificity (30%), positioning clarity (20%), curiosity factor (20%).

STYLES TO USE (Use exactly one per headline):
- "Value Proposition": "I help [specific audience] [specific outcome]"
- "Authority": Role + Company + Domain expertise
- "Outcome-Focused": Lead with the measurable result or function delivered
- "Intersection": Unique combination of skills or domains
- "Mission-Driven": Who you serve + the problem you solve
- "Builder": "Building [what] | [Role] | [Differentiator]"

Return ONLY valid JSON array (no markdown, no backticks). Schema:
[{"text": "headline", "score": number, "style": "style name", "tip": "1-line explanation of the psychology behind why this works"}]`

    const text = await callGeminiWithRetry(prompt, { temperature: 0.5, maxOutputTokens: 1200 })
    return text ? parseJsonArray(text) : null
}

async function aiGenerateAbout(input: {
    name?: string
    role: string
    experience_summary?: string
    passion?: string
    achievement?: string
    skills?: string
    audience?: string
    cta?: string
}) {
    if (!genAI) return null

    const isStudent = /\b(student|intern|fresher|graduate|undergraduate|freshman|sophomore|junior|senior)\b/i.test(input.role || '') || /\b(university|institute|college|school|bachelor|master|phd|pursuing|studying)\b/i.test(input.experience_summary || '')

    const prompt = `You are an elite LinkedIn About section writer. Write compelling, authentic About sections that build genuine credibility.

PROFILE CONTEXT:
- Role: ${input.role}
${input.name ? `- Name: ${input.name}` : ''}
${input.experience_summary ? `- Experience: ${input.experience_summary}` : ''}
${input.passion ? `- What drives them: ${input.passion}` : ''}
${input.achievement ? `- Key achievement: ${input.achievement}` : ''}
${input.skills ? `- Core skills: ${input.skills}` : ''}
${input.audience ? `- Target audience: ${input.audience}` : ''}
${input.cta ? `- CTA: ${input.cta}` : ''}
${isStudent ? '\nNOTE: This is a student or early-career professional. Do NOT fabricate years of experience, fake metrics, or fake authority. Focus on what they build, learn, and where they focus.' : ''}

${BANNED_VOCABULARY_CLAUSE}

CORE PRINCIPLES:
- Open with a hook that states what you do or build. Never start with "I am a..." or "With X years of experience...".
- NEVER use the university or institution name as a job title.
- Use Hook → Context → Proof → CTA structure.
- Write for the reader, not the writer.
- Use concrete specifics: real project names, real tools, real outcomes.
- Short sentences. Simple words. One idea per paragraph.
- Weave in 3-5 industry keywords naturally for LinkedIn search.

RULES:
1. Generate EXACTLY 3 variations of the About section.
2. Write in FIRST PERSON ("I").
3. Each variation MUST use a DIFFERENT tone from the list below.
4. If skills are listed, mention them naturally in the text.
5. End with a clear, direct call-to-action.
6. Use short paragraphs (2-3 sentences max) with blank lines between for mobile readability.
7. Stay under 2,000 characters per variation.

TONES TO USE (Use exactly one per variation):
1. "Narrative Arc" | Hook with a direct insight, share background, demonstrate expertise with proof, close with focus.
2. "Bold Opener" | Direct and confident. Lead with what makes you distinct. No filler, no fluff.
3. "Conversational" | Warm and approachable. Sound like explaining what you do to a smart colleague over coffee.

Return ONLY valid JSON array (no markdown, no backticks). Schema:
[{"text": "full about section text with \\n for line breaks between paragraphs", "style": "tone name", "word_count": number, "char_count": number}]`

    const text = await callGeminiWithRetry(prompt, { temperature: 0.5, maxOutputTokens: 3000 })
    return text ? parseJsonArray(text) : null
}

async function aiGeneratePostIdeas(input: {
    industry: string
    goal: string
    niche?: string
    expertise?: string
}) {
    if (!genAI) return null

    const goalMap: Record<string, string> = {
        'thought-leadership': 'establishing credibility as an industry specialist',
        'job-search': 'finding their next role through high-signal content',
        'build-audience': 'growing professional reach and engagement',
        'networking': 'building meaningful professional relationships',
    }

    const prompt = `You are a LinkedIn content strategist who designs posts for maximum professional impact and perception.

CONTEXT:
- Industry: ${input.industry}
- Goal: ${goalMap[input.goal] || input.goal}
${input.niche ? `- Specific niche/focus: ${input.niche}` : ''}
${input.expertise ? `- Their expertise: ${input.expertise}` : ''}

${BANNED_VOCABULARY_CLAUSE}

CORE PRINCIPLES:
- Open with attention and a clean pattern interrupt.
- Address core industry challenges, not surface symptoms.
- Concrete specifics beat generic advice.
- End with a sharp question or clear takeaway.

RULES:
1. Generate EXACTLY 5 post ideas.
2. Each idea must include a specific hook (first line of the post) that creates instant curiosity.
3. The 5 ideas must cover different content pillars: ensure at least one 'growth', one 'insights', and one 'engagement'.
4. Ideas must be specific to ${input.industry}, referencing real trends, tools, or workflows.
5. Include the format (text, carousel, poll, list, storytelling).
6. Include a specific angle that makes the post unique.

CONTENT PILLARS:
- "growth" | Practical lessons learned, career observations
- "insights" | Industry analysis, frameworks, workflow breakdowns
- "engagement" | Specific debates, thoughtful questions, community discussions

Return ONLY valid JSON array (no markdown, no backticks). Schema:
[{"pillar": "growth|insights|engagement", "title": "post title", "hook": "exact first line of the post", "angle": "what makes this post unique", "format": "post format"}]`

    const text = await callGeminiWithRetry(prompt, { temperature: 0.6, maxOutputTokens: 1500 })
    return text ? parseJsonArray(text) : null
}

async function aiStoryToPost(input: {
    story: string
    tone?: string
    audience?: string
    goal?: string
}) {
    if (!genAI) return null

    const prompt = `You are an elite LinkedIn ghostwriter who turns raw experiences into compelling, high-signal LinkedIn posts.

RAW STORY:
"${input.story.slice(0, 2000)}"

${input.tone ? `TONE: ${input.tone}` : 'TONE: Professional, direct, human'}
${input.audience ? `TARGET AUDIENCE: ${input.audience}` : ''}
${input.goal ? `GOAL/LESSON: ${input.goal}` : ''}

${BANNED_VOCABULARY_CLAUSE}

CORE PRINCIPLES:
- Hook: Open with a pattern interrupt. The first line must make the reader want to continue.
- Structure: Hook → Context → Concrete Example → Key Insight → Strong Close.
- Short sentences, simple words, one idea per paragraph.
- End with a sharp takeaway or question.
- Keep it grounded in the user's actual story.

RULES:
1. Write a complete, ready-to-post LinkedIn post.
2. Use short paragraphs (1-2 sentences) for mobile readability.
3. Include a clear takeaway.
4. End with a question or statement that invites discussion.
5. Add 3-5 relevant hashtags.
6. Keep it 150-250 words.
7. Write in first person.

Return ONLY valid JSON object (no markdown, no backticks). Schema:
{
    "hook": "the first line of the post",
    "body": "the full post text including hook",
    "takeaway": "the core lesson/insight",
    "hashtags": ["tag1", "tag2", "tag3"],
    "word_count": number,
    "tone_used": "description of tone"
}`

    const text = await callGeminiWithRetry(prompt, { temperature: 0.5, maxOutputTokens: 1500 })
    return text ? parseJsonObject(text) : null
}

async function aiGenerateComments(input: {
    postContent: string
    style: string
    expertise?: string
    length?: string
}) {
    if (!genAI) return null

    const styleGuide: Record<string, string> = {
        'insightful': 'Add a deeper layer of insight the author did not cover. Connect it to an adjacent workflow or practical principle. Do not simply repeat or praise.',
        'supportive': 'Validate their point with concrete grounding. Reference real work context.',
        'question': 'Ask a thoughtful, high-signal question that advances the discussion.',
        'story': 'Share a brief, specific personal observation that illustrates the point.',
        'contrarian': 'Offer a respectful counter-perspective, noting nuance or edge cases.',
    }

    const prompt = `You are a LinkedIn strategist who writes high-signal comments that build reputation and demonstrate genuine domain expertise.

POST BEING COMMENTED ON:
"""
${input.postContent.slice(0, 2000)}
"""

COMMENT STYLE: ${input.style} | ${styleGuide[input.style] || 'Be thoughtful and specific.'}
${input.expertise ? `COMMENTER'S BACKGROUND: ${input.expertise}` : ''}
${input.length ? `TARGET LENGTH: ${input.length}` : 'TARGET LENGTH: medium (50-100 words)'}

${BANNED_VOCABULARY_CLAUSE}

CRITICAL RULES:
1. Each comment MUST reference specific points from the actual post.
2. ABSOLUTELY NO generic openers like "Great post!", "Totally agree!", "Love this!".
3. Match the target length.
4. Write in FIRST PERSON, natural conversational tone.
5. Each comment must take a DIFFERENT angle.
6. Sound like a real colleague who genuinely engaged with the content.

Return ONLY valid JSON array (no markdown, no backticks). Schema:
[{"text": "comment text", "label": "approach label"}]`

    const text = await callGeminiWithRetry(prompt, { temperature: 0.6, maxOutputTokens: 1500 })
    return text ? parseJsonArray(text) : null
}

async function aiGenerateConnectionMessages(input: {
    type: string
    name: string
    context?: string
    intent?: string
    yourRole?: string
    recipientRole?: string
}) {
    if (!genAI) return null

    const typeGuide: Record<string, string> = {
        'cold': 'Cold outreach. Warm, genuine, and specific. Give a clear, low-friction reason to connect.',
        'same-industry': 'Connecting with an industry peer. Reference shared domain focus or challenges.',
        'alumni': 'Connecting with an alumni. Reference shared university or program.',
        'recruiter': 'Reaching out to a recruiter. Direct and confident, stating your core specialization.',
        'founder': 'Connecting with a founder. Reference their product, company, or problem area directly.',
        'liked-content': 'Referencing a recent post or discussion of theirs.',
        'mutual-connection': 'Referencing a mutual connection or community.',
        'event': 'Referencing an event or conference you both attended.',
        'mentor': 'Seeking guidance or advice with clear humility and specific focus.',
        'collaboration': 'Proposing a clear, specific project or collaboration idea.',
        'followup-noreply': 'Polite follow-up adding a fresh point of value.',
        'followup-call': 'Follow-up referencing a specific topic discussed.',
        'followup-application': 'Follow-up on a submitted application stating key fit.',
        'followup-event': 'Follow-up after meeting briefly at an event.',
    }

    const fullName = input.name || 'there'
    const nameParts = fullName.trim().split(/\s+/)
    const prefixes = ['dr', 'dr.', 'mr', 'mr.', 'mrs', 'mrs.', 'ms', 'ms.', 'prof', 'prof.', 'sir', 'shri']
    let firstName = nameParts[0]
    if (nameParts.length > 1 && prefixes.includes(nameParts[0].toLowerCase())) {
        firstName = nameParts[1]
    }

    const shortenRole = (headline: string) => {
        if (!headline) return ''
        const firstPart = headline.split(/[|,·•]/)[0].trim()
        return firstPart.length > 60 ? firstPart.slice(0, 57) + '...' : firstPart
    }
    const senderShort = input.yourRole ? shortenRole(input.yourRole) : ''
    const recipientShort = input.recipientRole ? shortenRole(input.recipientRole) : ''

    const prompt = `You are a LinkedIn connection note expert. Write the short "Add a note" message (under 300 chars) for a connection request.

SCENARIO:
- Message type: ${input.type} | ${typeGuide[input.type] || input.type}
- Recipient full name: ${fullName}
- Recipient first name: ${firstName}
${recipientShort ? `- Recipient's role (summary): ${recipientShort}` : ''}
${senderShort ? `- Sender's role (summary): ${senderShort}` : ''}
${input.context ? `- Specific context: ${input.context}` : ''}
${input.intent ? `- Sender's intent: ${input.intent}` : ''}

${BANNED_VOCABULARY_CLAUSE}

CRITICAL RULES:
1. HARD LIMIT: Each message MUST be STRICTLY under 300 characters. Aim for 240-280 characters.
2. Use their first name "${firstName}" once naturally.
3. NEVER copy full headlines into the text.
4. Reference a specific reason for connecting.
5. NO generic openers like "I'd love to connect" or "I came across your profile".
6. Max 1 exclamation mark per message.
7. Include 1 practical tip explaining why this note works.

Return ONLY valid JSON array (no markdown, no backticks). Schema:
[{"tone": "2-3 word tone label", "message": "the connection note text", "charCount": number, "tip": "1-line tip on why this works for this scenario"}]`

    const text = await callGeminiWithRetry(prompt, { temperature: 0.5, maxOutputTokens: 1400 })
    return text ? parseJsonArray(text) : null
}

async function aiGeneratePostHooks(input: {
    topic: string
    angle?: string
    audience?: string
}) {
    if (!genAI) return null

    const prompt = `You are a LinkedIn hook strategist who writes opening lines that stop the scroll and earn attention.

POST CONTEXT:
- Topic: ${input.topic}
${input.angle ? `- Personal angle: ${input.angle}` : ''}
${input.audience ? `- Target audience: ${input.audience}` : ''}

${BANNED_VOCABULARY_CLAUSE}

CRITICAL RULES:
1. Generate EXACTLY 5 hooks.
2. Each hook must be 1-3 lines that create immediate curiosity or attention.
3. Each must use a DIFFERENT technique (Pattern Interrupt, Curiosity Gap, Contrarian, Story Hook, Data-Led).
4. Be specific to "${input.topic}".
5. No misleading clickbait. The hook must be honest and defensible.
6. Include a 1-2 sentence explanation of the psychology behind each hook.

STYLES:
- "Pattern Interrupt" | Breaks expectations on this topic
- "Curiosity Gap" | Opens a loop the reader wants to complete
- "Contrarian" | Questions a common industry practice with logic
- "Story Hook" | Starts in the middle of a concrete situation
- "Data-Led" | Leads with a specific, surprising number or timeframe

Return ONLY valid JSON array (no markdown, no backticks). Schema:
[{"text": "hook text (use \\n for line breaks)", "style": "style name", "why_it_works": "1-2 sentence psychology explanation"}]`

    const text = await callGeminiWithRetry(prompt, { temperature: 0.6, maxOutputTokens: 1800 })
    return text ? parseJsonArray(text) : null
}

async function aiGenerateWeeklyPlan(input: {
    industry: string
    role: string
    frequency: string
}) {
    if (!genAI) return null

    const freq = parseInt(input.frequency) || 3
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].slice(0, freq)

    const prompt = `You are a LinkedIn content planner creating a weekly posting calendar.

PROFESSIONAL CONTEXT:
- Industry: ${input.industry}
- Role: ${input.role}
- Frequency: ${freq}x per week (${days.join(', ')})

${BANNED_VOCABULARY_CLAUSE}

CRITICAL RULES:
1. Generate exactly ${freq} day plans for: ${days.join(', ')}.
2. Assign each day a content pillar ("insights", "growth", or "engagement").
3. Each plan MUST include:
   - FORMAT: specific format (text post, breakdown list, how-to, case study, question)
   - PROMPT: specific writing prompt tailored to ${input.industry} and ${input.role}
   - EXAMPLE: concrete, scroll-stopping example hook
4. No generic prompts like "share an insight" | every prompt must reference real problems in ${input.industry}.

Return ONLY valid JSON array (no markdown, no backticks). Schema:
[{"day": "Monday", "pillar": "growth|insights|engagement", "format": "post format", "prompt": "detailed writing prompt", "example": "example hook/first line"}]`

    const text = await callGeminiWithRetry(prompt, { temperature: 0.6, maxOutputTokens: 2000 })
    return text ? parseJsonArray(text) : null
}

async function aiImproveBullets(input: {
    bullet: string
    style?: string
}) {
    if (!genAI) return null

    const styleGuide: Record<string, string> = {
        'concise': 'Short, action-focused. 1 sentence with power verb + scope + outcome.',
        'storytelling': 'Context-rich with problem context + action + result.',
        'ats': 'Keyword-rich for recruiter search systems with specific technologies and tools.',
    }

    const prompt = `You are an executive resume and LinkedIn experience editor. Rewrite weak job bullet points into clear achievement statements.

ORIGINAL TEXT:
"${input.bullet.slice(0, 1500)}"

STYLE: ${input.style || 'concise'} - ${styleGuide[input.style || 'concise'] || styleGuide.concise}

${BANNED_VOCABULARY_CLAUSE}

RULES:
1. Start every bullet with an ACTIVE POWER VERB (Led, Built, Designed, Shipped, Automated, Scaled, Launched, Reduced, Increased).
2. Format: "[Power verb] [specific action/scope], [resulting in/achieving] [outcome/impact]".
3. Never start with "Enhanced", "Utilized", "Assisted", or passive verbs.
4. Use realistic metric placeholders like [X]% or [X] users if numbers are not specified.
5. Keep each bullet under 160 characters.
6. Generate EXACTLY 3 rewritten options with distinct angles.

Return ONLY valid JSON array (no markdown, no backticks). Schema:
[{"label": "style label (e.g. Metrics-Focused, Execution, Leadership)", "text": "rewritten bullet text"}]`

    const text = await callGeminiWithRetry(prompt, { temperature: 0.4, maxOutputTokens: 1200 })
    return text ? parseJsonArray(text) : null
}

// ============================================================
// MAIN API HANDLER
// ============================================================

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { tool, input } = body

        if (!tool || !input) {
            return NextResponse.json({ error: 'Missing tool or input' }, { status: 400 })
        }

        if (!genAI) {
            return NextResponse.json({
                error: 'AI not configured',
                fallback: true,
                message: 'GEMINI_API_KEY not set. Using rule-based fallback.'
            }, { status: 200 })
        }

        let result = null

        switch (tool) {
            case 'headline':
                result = await aiGenerateHeadlines(input)
                break
            case 'about':
                result = await aiGenerateAbout(input)
                break
            case 'post-ideas':
                result = await aiGeneratePostIdeas(input)
                break
            case 'story-to-post':
                result = await aiStoryToPost(input)
                break
            case 'comment':
                result = await aiGenerateComments(input)
                break
            case 'connection-message':
                result = await aiGenerateConnectionMessages(input)
                break
            case 'post-hooks':
                result = await aiGeneratePostHooks(input)
                break
            case 'content-planner':
                result = await aiGenerateWeeklyPlan(input)
                break
            case 'bullet-improve':
                result = await aiImproveBullets(input)
                break
            default:
                return NextResponse.json({ error: `Unknown tool: ${tool}` }, { status: 400 })
        }

        if (!result) {
            return NextResponse.json({
                error: 'AI generation failed',
                fallback: true
            }, { status: 200 })
        }

        return NextResponse.json({ success: true, data: result })
    } catch (error: any) {
        console.error('[AI Tools Error]', error?.message || error)
        return NextResponse.json({
            error: 'AI generation failed',
            message: error?.message || 'Unknown error',
            fallback: true
        }, { status: 200 })
    }
}

export async function GET() {
    return NextResponse.json({
        available: !!genAI,
        tools: ['headline', 'about', 'post-ideas', 'story-to-post', 'comment', 'connection-message', 'post-hooks', 'content-planner', 'bullet-improve']
    })
}
