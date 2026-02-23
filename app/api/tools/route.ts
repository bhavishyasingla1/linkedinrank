import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    : null

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

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const skillsText = input.skills?.slice(0, 8).join(', ') || ''

    const prompt = `You are an elite LinkedIn headline strategist. You don't write headlines | you engineer first impressions. Every headline must make a recruiter stop scrolling and click.

CONTEXT:
- Role: ${input.role}
${input.company ? `- Company: ${input.company}` : ''}
${input.industry ? `- Industry: ${input.industry}` : ''}
${input.specialty ? `- Specialty/Focus: ${input.specialty}` : ''}
${skillsText ? `- Key Skills: ${skillsText}` : ''}
${input.currentHeadline ? `- Current Headline: "${input.currentHeadline}"` : ''}
${input.about ? `- About (snippet): "${input.about.slice(0, 300)}"` : ''}

CORE PRINCIPLES:
- Start with attention, not information. The headline is a pattern interrupt.
- Use identity-based framing: position the person as the go-to expert, not just an employee.
- Front-load with exact keywords recruiters type into LinkedIn search.
- Create a curiosity gap | make them want to click the profile.
- Concrete > abstract. "Scaled 3 products to $10M ARR" beats "Experienced product leader."
- No clichés: zero tolerance for "passionate", "results-driven", "team player", "go-getter".
- Sound precise, deliberate, and human. Never sound like AI wrote it.

RULES:
1. Each headline MUST be under 120 characters
2. Each must use a DIFFERENT style/angle (see styles below)
3. Include 2-3 keywords recruiters actually search for in this industry
4. Be hyper-specific to THIS person's actual context and experience
5. Use separators like | · | for readability
6. No emojis, no hype language
7. Score each headline 75-98 based on: keyword density (30%), specificity (30%), positioning clarity (20%), curiosity factor (20%)
8. NEVER use em dashes (|) or en dashes (–). Use | or commas instead. Em dashes signal AI-generated text.

STYLES (use one per headline):
- "Value Proposition": "I help [specific audience] achieve [specific outcome]", makes the reader the hero
- "Authority": Role + Company + Domain expertise, positions as the go-to expert
- "Outcome-Focused": Lead with the measurable result you deliver, not your title
- "Intersection": Unique combo of skills/domains that nobody else has
- "Mission-Driven": Who you serve + why it matters, signals purpose
- "Builder": "Building [what] | [Role] | [Differentiator]", signals momentum and agency

Return ONLY valid JSON array:
[{"text": "headline", "score": number, "style": "style name", "tip": "1-line explanation of the psychology behind why this works"}]`

    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1200 },
    })

    const text = result.response.text()
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
        try { return JSON.parse(jsonMatch[0]) }
        catch { return null }
    }
    return null
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

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    // Detect if this is a student/early-career profile
    const isStudent = /\b(student|intern|fresher|graduate|undergraduate|freshman|sophomore|junior|senior)\b/i.test(input.role || '') || /\b(university|institute|college|school|bachelor|master|phd|pursuing|studying)\b/i.test(input.experience_summary || '')

    const prompt = `You are an elite LinkedIn About section writer. Write compelling About sections that make people want to connect.

PROFILE CONTEXT:
- Role: ${input.role}
${input.name ? `- Name: ${input.name}` : ''}
${input.experience_summary ? `- Experience: ${input.experience_summary}` : ''}
${input.passion ? `- What drives them: ${input.passion}` : ''}
${input.achievement ? `- Key achievement: ${input.achievement}` : ''}
${input.skills ? `- Core skills: ${input.skills}` : ''}
${input.audience ? `- Target audience: ${input.audience}` : ''}
${input.cta ? `- CTA: ${input.cta}` : ''}
${isStudent ? '\nNOTE: This is a student or early-career professional. Do NOT fabricate years of experience, fake metrics, or fake authority. Focus on what they are building, learning, and where they are headed. Highlight projects, skills they are developing, and genuine enthusiasm. Be authentic, not inflated.' : ''}

CORE PRINCIPLES:
- Open with a HOOK that makes people curious. Never start with "I am a..." or "With X years of experience..." or "I'm a [university name]..."
- NEVER use the university or institution name as a job title. If role says "Student at [University]", write about what they DO, not where they study.
- Use HOOK then PROOF then AUTHORITY then CTA structure.
- Write for the reader, not the writer. Focus on what value they bring.
- Use concrete specifics: real project names, real skills, real outcomes. Never make up metrics or achievements that aren't mentioned in the context.
- Short sentences. Simple words. One idea per paragraph.
- Weave in 3-5 industry keywords naturally for LinkedIn SEO.
- NEVER use these AI phrases: "It's not just X, it's Y", "In today's fast-paced world", "I don't just X, I Y", "passionate about leveraging"
- NEVER use em dashes or en dashes. Use commas, periods, or "and" instead.
- The reader should finish thinking "I want to connect with this person."

RULES:
1. Each About section must be 100-250 words
2. Write in FIRST PERSON ("I")
3. Each must use a DIFFERENT tone (see below)
4. Be hyper-specific to THIS person's actual skills and experience. Do not invent achievements.
5. If skills are listed, mention them naturally in the text (not as a raw comma list)
6. End with a clear, direct call-to-action
7. Use short paragraphs (2-3 sentences max) with blank lines between for mobile readability
8. Stay under 2,000 characters
9. If an achievement is provided, reference it properly with full context. Do not truncate names or add random commas.

TONES:
1. "Narrative Arc" | Hook with a surprising insight, weave in background, demonstrate expertise with proof, close with vision.
2. "Bold Opener" | Direct, confident. Lead with what makes them unique. No filler, no fluff, just impact.
3. "Conversational" | Warm, approachable, relatable. Sound like explaining what you do to a smart friend over coffee.

Return ONLY valid JSON array:
[{"text": "full about section text with \\n for line breaks between paragraphs", "style": "tone name", "word_count": number, "char_count": number}]`

    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 3000 },
    })

    const text = result.response.text()
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
        try { return JSON.parse(jsonMatch[0]) }
        catch { return null }
    }
    return null
}

async function aiGeneratePostIdeas(input: {
    industry: string
    goal: string
    niche?: string
    expertise?: string
}) {
    if (!genAI) return null

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const goalMap: Record<string, string> = {
        'thought-leadership': 'establishing themselves as a thought leader',
        'job-search': 'finding their next role through strategic content',
        'build-audience': 'growing their LinkedIn following and engagement',
        'networking': 'building meaningful professional relationships',
    }

    const prompt = `You are a LinkedIn content strategist who engineers posts for maximum perception impact. Every post idea must be built on applied psychology, not self-expression.

CONTEXT:
- Industry: ${input.industry}
- Goal: ${goalMap[input.goal] || input.goal}
${input.niche ? `- Specific niche/focus: ${input.niche}` : ''}
${input.expertise ? `- Their expertise: ${input.expertise}` : ''}

CORE PRINCIPLES:
- Start with ATTENTION, not information. Every hook must be a pattern interrupt.
- Use the Emotion Formula: Relevance + Tension + Identity = Engagement.
- Attack core assumptions, not surface points. One sharp insight > ten weak ones.
- Introduce cognitive dissonance: show two beliefs the reader holds that conflict.
- People share content that validates beliefs, attacks common enemies, makes them look smart, or signals status.
- End with psychological closure: a reframing, sharp question, or mic-drop line.
- Avoid over-explaining. Leave space for comments.

RULES:
1. Each idea must include a SPECIFIC hook (first line of the post) that creates instant curiosity or tension
2. Each idea must target a DIFFERENT content pillar: growth, insights, or engagement
3. Hooks must stop the scroll | use pattern interrupts, contrarian takes, or curiosity gaps
4. Ideas must be DEEPLY SPECIFIC to ${input.industry}, referencing real trends, tools, challenges
5. Include the FORMAT (text, carousel, poll, list, storytelling)
6. Include a specific ANGLE that makes the post unique | no one else could write this
7. Reference specific trends, tools, or concepts in ${input.industry}
8. NEVER use em dashes (|) or en dashes (–). Use commas or periods instead.

CONTENT PILLARS:
- "growth" | Personal development, lessons learned, career reflections
- "insights" | Industry expertise, frameworks, analysis, predictions
- "engagement" | Questions, debates, community building, shoutouts

Return ONLY valid JSON array:
[{"pillar": "growth|insights|engagement", "title": "post title", "hook": "exact first line of the post", "angle": "what makes this post unique", "format": "post format"}]`

    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 1500 },
    })

    const text = result.response.text()
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
        try { return JSON.parse(jsonMatch[0]) }
        catch { return null }
    }
    return null
}

async function aiStoryToPost(input: {
    story: string
    tone?: string
    audience?: string
    goal?: string
}) {
    if (!genAI) return null

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const prompt = `You are an elite LinkedIn ghostwriter who engineers posts for perception and influence. You don't write to inform | you write to capture attention, shape perception, and create engagement.

RAW STORY:
"${input.story.slice(0, 2000)}"

${input.tone ? `TONE: ${input.tone}` : 'TONE: Professional but human'}
${input.audience ? `TARGET AUDIENCE: ${input.audience}` : ''}
${input.goal ? `GOAL/LESSON: ${input.goal}` : ''}

CORE PRINCIPLES:
- Hook: Open with a pattern interrupt. The first line must make the reader stop and think "Wait, what?" or "That sounds wrong... but I want to read."
- Tension: Introduce contradiction or challenge an assumption early.
- Structure: Hook → Tension → Explanation/Story → Concrete Example → Insight → Strong Close.
- Use identity-based framing: make the reader the hero, not the author.
- Engineer cognitive ease: short sentences, simple words, one idea per paragraph.
- End with psychological closure: a powerful reframing, sharp question, or distilled insight. The ending should feel like a mic drop.
- Avoid generic AI tone: no "It's not just X, it's Y", no "In today's world...", no corporate filler.
- Optimize for share psychology: people share what validates their beliefs, makes them look smart, or signals status.

RULES:
1. Write a complete, ready-to-post LinkedIn post
2. Start with a HOOK | a scroll-stopping pattern interrupt
3. Use short paragraphs (1-2 sentences) | LinkedIn is mobile-first
4. Include a clear TAKEAWAY that reframes how the reader thinks
5. End with a question or bold statement that drives comments
6. Add 3-5 relevant hashtags
7. Keep it 150-250 words
8. NO emoji overuse (max 2-3 if any)
9. Write in first person
10. Make it SPECIFIC, reference real details from their story
11. NEVER use em dashes (|) or en dashes (–). Use commas or periods. Em dashes signal AI text.

Return ONLY valid JSON:
{
    "hook": "the first line of the post",
    "body": "the full post text including hook",
    "takeaway": "the core lesson/insight",
    "hashtags": ["tag1", "tag2", "tag3"],
    "word_count": number,
    "tone_used": "description of tone"
}`

    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
    })

    const text = result.response.text()
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
        try { return JSON.parse(jsonMatch[0]) }
        catch { return null }
    }
    return null
}

// ============================================================
// AI TOOL PROMPTS | CONTEXT-DRIVEN TOOLS
// ============================================================

async function aiGenerateComments(input: {
    postContent: string
    style: string
    expertise?: string
    length?: string
}) {
    if (!genAI) return null

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const styleGuide: Record<string, string> = {
        'insightful': 'Add a deeper layer of insight the author didn\'t cover. Build on their argument with a new dimension | connect it to a broader trend, share a framework, or introduce an adjacent concept. Don\'t just agree or paraphrase.',
        'supportive': 'Strongly validate their point with conviction and specificity. Don\'t be sycophantic | ground your support in real experience. Make them feel seen AND respected as a thinker.',
        'question': 'Ask a genuinely thought-provoking question that advances the discussion. Not surface-level | demonstrate you deeply understood their argument and are probing the edges of it. The question should make readers think.',
        'story': 'Share a vivid, specific personal experience that connects meaningfully to their point. Use concrete details (timeframes, places, outcomes). The story should illustrate, not just echo.',
        'contrarian': 'Offer a respectful counter-perspective. Acknowledge their strongest point first, then introduce nuance, a counter-example, or an edge case. You\'re disagreeing with the argument, never the person.',
    }

    const prompt = `You are a LinkedIn authority-building strategist who writes comments designed to build the commenter's reputation and influence. Every comment must position the commenter as someone worth following.

POST BEING COMMENTED ON:
"""
${input.postContent.slice(0, 2000)}
"""

COMMENT STYLE: ${input.style} | ${styleGuide[input.style] || 'Be thoughtful and specific.'}
${input.expertise ? `COMMENTER'S EXPERTISE/BACKGROUND: ${input.expertise} | weave this perspective in naturally. A teacher's voice is different from an engineer's or a founder's.` : ''}
${input.length ? `TARGET LENGTH: ${input.length}` : 'TARGET LENGTH: medium (50-100 words)'}

CORE PRINCIPLES:
- Comments are micro-content. They should demonstrate expertise, not just agreement.
- Use the commenter's unique lens to add a dimension the author missed.
- Create cognitive dissonance or introduce a new frame | don't just echo.
- Sound like a smart colleague who genuinely engaged with the ideas, not a bot.
- Each comment should make OTHER readers think "I want to follow this person too."

CRITICAL RULES:
1. Each comment MUST reference specific points, phrases, or arguments from the actual post
2. ABSOLUTELY NO generic openers like "Great post!", "Totally agree!", "Love this!"
3. Match the TARGET LENGTH precisely
4. Write in FIRST PERSON, natural conversational tone
5. Each comment must take a DIFFERENT angle/lens on the post content
6. ADAPT to the commenter's background naturally
7. End at least one comment with a specific follow-up question to the author
8. Comments must feel like they came from a REAL person
9. Give each a label (2-5 words) describing the angle taken
10. Vary sentence structure, mix short punchy sentences with longer ones. No formulaic patterns.
11. NEVER use em dashes (|) or en dashes (–). Use commas or periods instead.

Return ONLY valid JSON array:
[{"text": "comment text", "label": "approach label"}]`

    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 1500 },
    })

    const text = result.response.text()
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
        try { return JSON.parse(jsonMatch[0]) }
        catch { return null }
    }
    return null
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

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const typeGuide: Record<string, string> = {
        'cold': 'Cold outreach to someone you have never interacted with. Must feel warm, genuine, and specific. Give them a concrete reason to accept. Reference something specific about them.',
        'same-industry': 'Connecting with someone in the same industry/field. Leverage shared professional context, common challenges, or industry trends. Make it feel like a natural peer connection.',
        'alumni': 'Connecting with a fellow alumni. Leverage the shared school/program bond. Reference specific shared experiences, programs, years, or campus culture.',
        'recruiter': 'Reaching out to a recruiter about opportunities. Sound selectively open and confident, not desperate. Lead with your specific value and expertise.',
        'founder': 'Connecting with a founder/CEO. Lead with genuine, specific admiration for their company, product, or recent milestone. Offer value, not just flattery.',
        'liked-content': 'You saw their LinkedIn post/article and want to connect. Reference the SPECIFIC content, share a genuine reaction or add your perspective on it.',
        'mutual-connection': 'You share a mutual connection. Name the mutual contact and explain why that shared relationship makes this connection valuable.',
        'event': 'You attended the same event or conference. Reference the specific event, a talk, or a conversation topic to make it personal.',
        'mentor': 'Seeking mentorship or guidance. Be humble but specific about what you admire and what you want to learn. Show you have done your homework on them.',
        'collaboration': 'Proposing a collaboration like a podcast, article, webinar, or project. Be specific about the idea and why THEY are the right person for it.',
        'followup-noreply': 'Following up after no reply. Add new value or context. Never guilt-trip. Keep it light, warm, and bring something fresh.',
        'followup-call': 'Following up after a phone/video call. Reference specific topics discussed to show genuine engagement. Be warm and forward-looking.',
        'followup-application': 'Following up after submitting a job application. Show knowledge of the team/company, reference something specific about the role.',
        'followup-event': 'Following up after meeting briefly at an event. Reference where you met, what you discussed, and why you want to stay connected.',
    }

    // Extract a usable first name from the full name
    const fullName = input.name || 'there'
    const nameParts = fullName.trim().split(/\s+/)
    // Skip prefixes like Dr., Mr., Mrs., Prof., etc.
    const prefixes = ['dr', 'dr.', 'mr', 'mr.', 'mrs', 'mrs.', 'ms', 'ms.', 'prof', 'prof.', 'sir', 'shri']
    let firstName = nameParts[0]
    if (nameParts.length > 1 && prefixes.includes(nameParts[0].toLowerCase())) {
        firstName = nameParts[1]
    }

    // Shorten the role/headline to the core role only (not the full LinkedIn headline)
    const shortenRole = (headline: string) => {
        if (!headline) return ''
        // Take just the first segment before | or , or ·
        const firstPart = headline.split(/[|,·•]/)[0].trim()
        // If still too long, truncate
        return firstPart.length > 60 ? firstPart.slice(0, 57) + '...' : firstPart
    }
    const senderShort = input.yourRole ? shortenRole(input.yourRole) : ''
    const recipientShort = input.recipientRole ? shortenRole(input.recipientRole) : ''

    const prompt = `You are a LinkedIn connection message expert. Your job is to write the "Add a note" message that appears when someone clicks "Connect" on a LinkedIn profile. These messages must be SHORT, HUMAN, and EFFECTIVE.

SCENARIO:
- Message type: ${input.type} | ${typeGuide[input.type] || input.type}
- Recipient full name: ${fullName}
- Recipient first name (USE THIS in messages): ${firstName}
${recipientShort ? `- Recipient's role (summarized): ${recipientShort}` : ''}
${input.recipientRole ? `- Recipient's full headline (for context only, do NOT copy this into the message): ${input.recipientRole}` : ''}
${senderShort ? `- Sender's role (summarized): ${senderShort}` : ''}
${input.yourRole ? `- Sender's full headline (for context only, do NOT copy this into the message): ${input.yourRole}` : ''}
${input.context ? `- Specific context: ${input.context}` : ''}
${input.intent ? `- Sender's goal/intent: ${input.intent}` : ''}

WRITE 3 CONNECTION MESSAGES. Each must be a different approach.

CRITICAL RULES:
1. HARD LIMIT: Each message MUST be under 300 characters. LinkedIn cuts off at 300. Count carefully.
2. These are "Add a note" messages, NOT emails. They should feel like a quick, genuine note, not a formal letter.
3. Use their FIRST NAME "${firstName}" once, naturally. Do NOT use their full headline or full name in the message.
4. NEVER copy-paste the sender's or recipient's full headline into the message. Paraphrase their role in 3-5 words max. e.g., "structural engineering researcher" not the full headline.
5. Each message MUST reference something SPECIFIC about the recipient: their field, a post, a shared connection, an event, their expertise area. NEVER be vague.
6. NO generic phrases: "I'd love to connect", "Let's network", "I came across your profile" are BANNED unless followed by a specific reason.
7. Sound like a real person typing a quick note on their phone. Natural, conversational, zero corporate speak.
8. Adapt the VOICE to the sender's background: a student sounds different from a VP, a teacher sounds different from a founder.
9. If intent is provided, weave it in naturally without being transactional. Show, don't tell.
10. Each message must use a DIFFERENT strategy: one direct, one warm/personal, one value-offering.
11. NEVER use em dashes, en dashes, semicolons, or ellipsis. Use commas and periods only. These punctuation marks signal AI text.
12. No exclamation marks in every sentence. Max 1 per message.
13. Include a practical tip explaining WHY this approach works for this specific scenario.

Return ONLY valid JSON array:
[{"tone": "2-3 word tone label", "message": "the connection note text", "charCount": number, "tip": "1-line tip on why this works for this scenario"}]`

    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.75, maxOutputTokens: 1400 },
    })

    const text = result.response.text()
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
        try { return JSON.parse(jsonMatch[0]) }
        catch { return null }
    }
    return null
}

async function aiGeneratePostHooks(input: {
    topic: string
    angle?: string
    audience?: string
}) {
    if (!genAI) return null

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const prompt = `You are a scroll-psychology expert who engineers LinkedIn opening lines that hijack attention. Your hooks are built on applied psychology | pattern interrupts, curiosity gaps, and cognitive dissonance.

POST CONTEXT:
- Topic: ${input.topic}
${input.angle ? `- Author's personal angle/experience: ${input.angle}` : ''}
${input.audience ? `- Target audience: ${input.audience}` : ''}

CORE PRINCIPLES:
- Attention precedes authority. Your first job is to earn the scroll-stop.
- Use the Emotion Formula: Relevance + Tension + Identity = engagement.
- Introduce cognitive dissonance: present two beliefs the reader holds, then show they conflict.
- Make the reader feel something in the first 2 lines: surprise, disagreement, curiosity, or recognition.
- Avoid generic openings: "In today's world...", "Here are 5 tips...", "I'm excited to share..."
- Concrete > abstract: real numbers, timeframes, specific scenarios beat vague claims.

CRITICAL RULES:
1. Each hook must be 1-3 lines that create INSTANT curiosity, tension, or surprise
2. Each must use a DIFFERENT psychological technique (see styles below)
3. Be hyper-SPECIFIC to "${input.topic}" | every hook should only work for this exact topic
4. Use concrete details: real numbers, timeframes, specific scenarios, named tools/concepts
5. No clickbait that doesn't deliver | the hook must be defensible and honest
6. Sound like a real LinkedIn creator, NOT AI-generated
7. VARY the emotional register: analytical, vulnerable, provocative, warm
8. Include a 1-2 sentence explanation of the psychology behind each hook
9. Work for any professional background: student, executive, freelancer, teacher, etc.
10. Mix up formatting: some single-line, some multi-line with line breaks
11. NEVER use em dashes (|) or en dashes (–). Use commas or periods instead.

STYLES (use one per hook):
- "Pattern Interrupt" | break expectations, say something the reader wouldn't expect on this topic
- "Curiosity Gap" | open a loop the reader MUST close by reading more
- "Contrarian" | challenge the most popular belief about this topic with evidence
- "Story Hook" | drop the reader into the MIDDLE of a compelling moment (in medias res)
- "Data-Led" | lead with a surprising, specific statistic or number that reframes the topic
- "Confession" | a vulnerable, honest admission that builds trust and relatability

Return ONLY valid JSON array:
[{"text": "hook text (use \\n for line breaks)", "style": "style name", "why_it_works": "1-2 sentence psychology explanation"}]`

    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.9, maxOutputTokens: 1800 },
    })

    const text = result.response.text()
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
        try { return JSON.parse(jsonMatch[0]) }
        catch { return null }
    }
    return null
}

async function aiGenerateWeeklyPlan(input: {
    industry: string
    role: string
    frequency: string
}) {
    if (!genAI) return null

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const freq = parseInt(input.frequency) || 3
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].slice(0, freq)

    const prompt = `You are a LinkedIn content calendar expert who creates posting plans for professionals across ALL industries | from healthcare to education, finance to creative arts, engineering to non-profit work.

Create a ${freq}-day weekly posting plan.

PROFESSIONAL CONTEXT:
- Industry: ${input.industry}
- Role: ${input.role}
- Posting frequency: ${freq}x per week (${days.join(', ')})

CRITICAL RULES:
1. Generate exactly ${freq} day plans, one for each day: ${days.join(', ')}
2. Assign each day a content pillar: "growth", "insights", or "engagement"
3. Balance: ~40% insights, ~40% growth, ~20% engagement
4. Each plan MUST include:
   - FORMAT: specific post type (text, carousel, poll, list, storytelling, how-to, before/after, myth-busting, day-in-the-life)
   - PROMPT: a detailed, actionable writing prompt tailored to "${input.industry}" + "${input.role}" | reference REAL challenges, trends, tools, or concepts specific to this field
   - EXAMPLE: a scroll-stopping hook/first line that demonstrates the prompt in action
5. DO NOT use generic prompts like "share an industry insight" | every prompt must be specific enough that only someone in ${input.industry} as a ${input.role} would write it
6. Reference real trends, tools, methodologies, challenges, or concepts in ${input.industry}
7. Example hooks must be vivid, specific, and scroll-stopping | not corporate filler
8. Vary formats across the week, no two days should have the same format
9. The plan should work whether the person is early-career or senior, in a big company or freelancing
10. NEVER use em dashes (|) or en dashes (–). Use commas or periods.

Return ONLY valid JSON array:
[{"day": "Monday", "pillar": "growth|insights|engagement", "format": "post format", "prompt": "detailed writing prompt", "example": "example hook/first line"}]`

    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.85, maxOutputTokens: 2000 },
    })

    const text = result.response.text()
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
        try { return JSON.parse(jsonMatch[0]) }
        catch { return null }
    }
    return null
}

async function aiImproveBullets(input: {
    bullet: string
    style?: string
}) {
    if (!genAI) return null

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const styleGuide: Record<string, string> = {
        'concise': 'Short, punchy, achievement-focused. Each bullet should be 1 sentence with a power verb + action + measurable result.',
        'storytelling': 'Context-rich with narrative flow. Format: What you did + the challenge + the measurable outcome.',
        'ats': 'Keyword-dense for ATS systems. Mirror exact job posting language, include technical terms and industry-specific keywords.',
    }

    const prompt = `You are a resume and LinkedIn experience section expert. Rewrite this weak job description into powerful achievement bullets.

ORIGINAL TEXT:
"${input.bullet.slice(0, 1500)}"

STYLE: ${input.style || 'concise'} - ${styleGuide[input.style || 'concise'] || styleGuide.concise}

RULES:
1. Start every bullet with a POWER VERB (Led, Built, Designed, Shipped, Automated, Scaled, Drove, Launched, Reduced, Increased)
2. Format: "[Power verb] [specific action] [for/across scope], [resulting in/achieving] [measurable result]"
3. If the original has multiple bullet points or responsibilities, rewrite EACH one separately
4. Add realistic metric placeholders like [X]%, [X] users, $[X]K where no numbers are given
5. NEVER start with "Enhanced", "Utilized", "Assisted", or weak verbs
6. Each bullet must make a recruiter think "I need to interview this person"
7. Keep each bullet under 150 characters for readability
8. Do NOT add generic filler. Every word must earn its place.
9. Generate exactly 3 rewritten versions with different angles

Return ONLY valid JSON array:
[{"label": "style label (e.g. Metrics-Heavy, Impact-Focused, Leadership)", "text": "rewritten bullet text"}]`

    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1200 },
    })

    const text = result.response.text()
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
        try { return JSON.parse(jsonMatch[0]) }
        catch { return null }
    }
    return null
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
            fallback: true
        }, { status: 200 })
    }
}

export async function GET() {
    return NextResponse.json({
        available: !!genAI,
        tools: ['headline', 'about', 'post-ideas', 'story-to-post', 'comment', 'connection-message', 'post-hooks', 'content-planner']
    })
}
