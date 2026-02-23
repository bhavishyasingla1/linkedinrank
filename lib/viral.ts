// Viral sharing utilities for LinkedInRank.com
// Generates share captions, badges, hooks, and comparison framing

const SITE_URL = 'https://linkedinrank.com'

// ─── Types ───────────────────────────────────────────────────────────
export interface ShareCaption {
    style: 'humble-brag' | 'value-sharing' | 'curiosity-hook'
    label: string
    text: string
}

export interface Badge {
    title: string
    tier: 'bronze' | 'silver' | 'gold' | 'platinum'
    icon: string
}

export interface ComparisonFrame {
    label: string
    percentile: string
    description: string
}

export interface ViralHook {
    text: string
    style: string
}

export interface ShareData {
    toolName: string
    score?: number
    resultSummary: string
    captions: ShareCaption[]
    badges: Badge[]
    hooks: ViralHook[]
    comparison: ComparisonFrame
    challengeText: string
}

// ─── Score to Percentile ─────────────────────────────────────────────
function scoreToPercentile(score: number): { percentile: number; label: string } {
    if (score >= 90) return { percentile: 95, label: 'Top 5%' }
    if (score >= 85) return { percentile: 90, label: 'Top 10%' }
    if (score >= 80) return { percentile: 80, label: 'Top 20%' }
    if (score >= 70) return { percentile: 65, label: 'Top 35%' }
    if (score >= 60) return { percentile: 50, label: 'Top 50%' }
    return { percentile: 30, label: 'Getting Started' }
}

// ─── Badge Generator ─────────────────────────────────────────────────
function generateBadges(toolName: string, score: number): Badge[] {
    const badges: Badge[] = []
    const tier = score >= 90 ? 'platinum' : score >= 80 ? 'gold' : score >= 70 ? 'silver' : 'bronze'

    const TOOL_BADGES: Record<string, { title: string; icon: string }[]> = {
        'Headline Studio': [
            { title: 'Headline Pro', icon: '🏆' },
            { title: 'Clarity Expert', icon: '💡' },
            { title: 'Search Magnet', icon: '🔍' },
        ],
        'About Section Writer': [
            { title: 'Story Architect', icon: '📝' },
            { title: 'Personal Brand Builder', icon: '🎯' },
            { title: 'Authenticity Star', icon: '⭐' },
        ],
        'Profile SEO Scanner': [
            { title: 'SEO Strategist', icon: '🔍' },
            { title: 'Discovery Leader', icon: '📊' },
            { title: 'Keyword Master', icon: '🎯' },
        ],
        'Experience Bullet Improver': [
            { title: 'Impact Writer', icon: '💪' },
            { title: 'Achievement Architect', icon: '🏗️' },
            { title: 'Results Storyteller', icon: '📈' },
        ],
        'Post Hook Generator': [
            { title: 'Hook Master', icon: '🎣' },
            { title: 'Scroll Stopper', icon: '🛑' },
            { title: 'Engagement Expert', icon: '🔥' },
        ],
        'Post Idea Generator': [
            { title: 'Content Strategist', icon: '🧠' },
            { title: 'Idea Machine', icon: '💡' },
            { title: 'Pillar Planner', icon: '📋' },
        ],
        'Comment Generator': [
            { title: 'Thoughtful Commenter', icon: '💬' },
            { title: 'Network Builder', icon: '🤝' },
            { title: 'Engagement Leader', icon: '📣' },
        ],
        'Connection Message Generator': [
            { title: 'Connection Pro', icon: '🔗' },
            { title: 'Network Architect', icon: '🌐' },
            { title: 'Outreach Expert', icon: '✉️' },
        ],
        'Story → Post Converter': [
            { title: 'Storytelling Standout', icon: '📖' },
            { title: 'Content Creator', icon: '✍️' },
            { title: 'Narrative Builder', icon: '🎬' },
        ],
        'Content Pillar Planner': [
            { title: 'Strategy Architect', icon: '🏛️' },
            { title: 'Content Planner', icon: '📅' },
            { title: 'Consistency Champion', icon: '🏅' },
        ],
        'Profile Ring Creator': [
            { title: 'Visual Brander', icon: '🎨' },
            { title: 'Profile Standout', icon: '👁️' },
        ],
        'QR Code Generator': [
            { title: 'Networking Pro', icon: '📱' },
            { title: 'Offline Connector', icon: '🔗' },
        ],
    }

    const toolBadges = TOOL_BADGES[toolName] || [{ title: 'LinkedIn Pro', icon: '🏆' }]

    // Primary badge based on score tier
    badges.push({ ...toolBadges[0], tier })

    // Secondary badge if score is high enough
    if (score >= 75 && toolBadges[1]) {
        badges.push({ ...toolBadges[1], tier: score >= 85 ? 'gold' : 'silver' })
    }

    // Tertiary for exceptional scores
    if (score >= 90 && toolBadges[2]) {
        badges.push({ ...toolBadges[2], tier: 'platinum' })
    }

    return badges
}

// ─── Share Captions ──────────────────────────────────────────────────
function generateCaptions(toolName: string, score: number, resultSummary: string): ShareCaption[] {
    const { label: percentileLabel } = scoreToPercentile(score)
    const scoreText = `${score}/100`
    const section = toolName.toLowerCase().replace(' generator', '').replace(' scanner', '').replace(' studio', '')

    return [
        {
            style: 'humble-brag',
            label: 'Humble Brag',
            text: `Just scored ${scoreText} on my LinkedIn ${section} (tested on linkedinrank.com). ${percentileLabel} apparently.\n\nNot bad | but now I want to improve it. Anyone else obsessively optimizing their LinkedIn lately?`
        },
        {
            style: 'value-sharing',
            label: 'Share Value',
            text: `Ran my LinkedIn ${section} through a free analyzer and got useful feedback I wasn't expecting.\n\nScore: ${scoreText}\n${resultSummary}\n\nTool I used: linkedinrank.com/tools (free, no login)`
        },
        {
            style: 'curiosity-hook',
            label: 'Curiosity Hook',
            text: `I thought my LinkedIn ${section} was solid.\n\nThen I actually tested it. Score: ${scoreText}.\n\nTurns out I was missing some basics that recruiters look for. Have you tested yours?`
        },
    ]
}

// ─── Captions for non-scored tools ───────────────────────────────────
export function generateContentCaptions(toolName: string, outputPreview: string): ShareCaption[] {
    const toolLower = toolName.toLowerCase()
    return [
        {
            style: 'humble-brag',
            label: 'Humble Brag',
            text: `Just rewrote my LinkedIn ${toolLower.replace(' generator', '').replace(' converter', '')} using linkedinrank.com and honestly? It's way better than what I had.\n\nSmall improvements compound. If you haven't revisited your LinkedIn recently, maybe it's time.`
        },
        {
            style: 'value-sharing',
            label: 'Share Value',
            text: `Found a free ${toolLower} that's actually useful | no login, no data stored.\n\nHere's a sample of what it helped me write:\n"${outputPreview.slice(0, 120)}..."\n\nTool: linkedinrank.com/tools`
        },
        {
            style: 'curiosity-hook',
            label: 'Curiosity Hook',
            text: `I've been testing free LinkedIn tools this week. Most are garbage.\n\nBut one ${toolLower} actually surprised me | practical output in 30 seconds, no sign-up.\n\nHave you optimized your LinkedIn lately?`
        },
    ]
}

// ─── Viral Hooks ─────────────────────────────────────────────────────
function generateHooks(toolName: string, score: number): ViralHook[] {
    const section = toolName.toLowerCase().replace(' generator', '').replace(' scanner', '').replace(' studio', '')
    return [
        {
            text: `I thought my LinkedIn ${section} was fine. Then I actually tested it | ${score}/100. Time to fix some things.`,
            style: 'Self-deprecating'
        },
        {
            text: `Spent 2 minutes analyzing my LinkedIn ${section}. Found 3 things I'd been doing wrong for years.`,
            style: 'Discovery'
        },
        {
            text: `My LinkedIn ${section} scored ${score}/100. Think you can beat that? Test yours and find out.`,
            style: 'Challenge'
        },
        {
            text: `Just rewrote my entire LinkedIn ${section}. The difference is night and day. Here's what I changed:`,
            style: 'Transformation'
        },
        {
            text: `Everyone polishes their resume. Almost nobody optimizes their LinkedIn ${section}. I just did | here's what I learned.`,
            style: 'Contrarian'
        },
    ]
}

// ─── Content Hooks (for non-scored tools) ────────────────────────────
export function generateContentHooks(toolName: string): ViralHook[] {
    const toolLower = toolName.toLowerCase()
    return [
        {
            text: `I was spending 30 minutes writing LinkedIn content. This ${toolLower} does it in 30 seconds | and honestly, it's better.`,
            style: 'Efficiency'
        },
        {
            text: `Found a free ${toolLower} that actually understands how LinkedIn content works. No AI slop | real, usable output.`,
            style: 'Discovery'
        },
        {
            text: `Tested 5 LinkedIn tools this week. Only one was worth sharing. Here's the ${toolLower} that actually delivered:`,
            style: 'Curated'
        },
        {
            text: `If you're posting on LinkedIn but not using a ${toolLower}, you're leaving engagement on the table. Just learned this the hard way.`,
            style: 'Lesson'
        },
        {
            text: `Hot take: most LinkedIn content advice is vague. This ${toolLower} gives you the exact words to use. No fluff.`,
            style: 'Contrarian'
        },
    ]
}

// ─── Comparison Framing ──────────────────────────────────────────────
function generateComparison(score: number): ComparisonFrame {
    if (score >= 90) {
        return {
            label: 'Elite',
            percentile: 'Top 5%',
            description: 'You\'re outperforming 95% of LinkedIn profiles. Top creators and executives typically score here.'
        }
    }
    if (score >= 80) {
        return {
            label: 'Excellent',
            percentile: 'Top 20%',
            description: 'Stronger than most. Founders and senior professionals usually score in this range.'
        }
    }
    if (score >= 70) {
        return {
            label: 'Good',
            percentile: 'Top 35%',
            description: 'Above average. Most working professionals score here. A few tweaks could push you to the top 20%.'
        }
    }
    if (score >= 60) {
        return {
            label: 'Average',
            percentile: 'Top 50%',
            description: 'Most students and early-career professionals score below 60. You\'re ahead of the curve.'
        }
    }
    return {
        label: 'Needs Work',
        percentile: 'Below Average',
        description: 'Most users who start here see a 20+ point improvement after applying recommendations.'
    }
}

// ─── Challenge Text ──────────────────────────────────────────────────
function generateChallenge(toolName: string, score: number): string {
    if (score >= 85) {
        return `Think you can beat ${score}/100 on the ${toolName}? Try it and share your score.`
    }
    if (score >= 70) {
        return `I scored ${score}/100. Tag someone who'd score higher | or prove they can't.`
    }
    return `Just tested my LinkedIn with the ${toolName}. Tag a friend and compare scores.`
}

// ─── Main Export: Build Full Share Data ──────────────────────────────
export function buildShareData(toolName: string, score: number, resultSummary: string): ShareData {
    return {
        toolName,
        score,
        resultSummary,
        captions: generateCaptions(toolName, score, resultSummary),
        badges: generateBadges(toolName, score),
        hooks: generateHooks(toolName, score),
        comparison: generateComparison(score),
        challengeText: generateChallenge(toolName, score),
    }
}

// ─── Badge Tier Colors ───────────────────────────────────────────────
export const BADGE_COLORS: Record<string, { text: string; bg: string; border: string; glow: string }> = {
    bronze: { text: '#92400E', bg: 'rgba(205, 127, 50, 0.08)', border: 'rgba(205, 127, 50, 0.25)', glow: 'rgba(205, 127, 50, 0.15)' },
    silver: { text: '#374151', bg: 'rgba(156, 163, 175, 0.08)', border: 'rgba(156, 163, 175, 0.25)', glow: 'rgba(156, 163, 175, 0.15)' },
    gold: { text: '#92400E', bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.25)', glow: 'rgba(245, 158, 11, 0.15)' },
    platinum: { text: '#4338CA', bg: 'rgba(99, 102, 241, 0.08)', border: 'rgba(99, 102, 241, 0.25)', glow: 'rgba(99, 102, 241, 0.15)' },
}
