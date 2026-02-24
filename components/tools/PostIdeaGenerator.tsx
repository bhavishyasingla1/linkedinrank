'use client'

import { useState } from 'react'
import ToolPromptBlock, { buildPostIdeaPrompt } from './ToolPromptBlock'

const INDUSTRIES = [
    'Technology', 'Finance', 'Healthcare', 'Marketing', 'Education',
    'Real Estate', 'Consulting', 'E-commerce', 'Media', 'Legal',
    'Design', 'Sales', 'HR', 'Product', 'Data Science', 'AI/ML',
    'SaaS', 'Cybersecurity', 'Manufacturing', 'Non-profit'
]

const GOALS = [
    { id: 'thought-leadership', label: 'Thought Leadership', desc: 'Establish expertise' },
    { id: 'job-search', label: 'Job Search', desc: 'Attract opportunities' },
    { id: 'build-audience', label: 'Build Audience', desc: 'Grow following' },
    { id: 'networking', label: 'Networking', desc: 'Build connections' },
]

interface AIPostIdea {
    pillar: string
    title: string
    hook: string
    angle: string
    format: string
}

// Fallback rule-based ideas
function buildFallbackIdeas(industry: string, goal: string): AIPostIdea[] {
    const goalTemplates: Record<string, AIPostIdea[]> = {
        'thought-leadership': [
            { pillar: 'insights', title: `${industry} trend most people are ignoring`, hook: `Everyone in ${industry} is talking about AI. But nobody's talking about this.`, angle: 'Contrarian take on industry trends', format: 'Text post' },
            { pillar: 'insights', title: `Framework for ${industry} success`, hook: `After working with 50+ ${industry} teams, here's the framework that works every time:`, angle: 'Actionable framework', format: 'Carousel / List' },
            { pillar: 'growth', title: `Biggest lesson from ${industry}`, hook: `I spent 3 years in ${industry} before I realized this one thing.`, angle: 'Personal growth reflection', format: 'Text post' },
            { pillar: 'engagement', title: `Unpopular opinion about ${industry}`, hook: `Unpopular opinion: The biggest problem in ${industry} isn't what you think.`, angle: 'Debate starter', format: 'Text post' },
            { pillar: 'growth', title: `Career mistake in ${industry}`, hook: `My worst career mistake? Saying yes to everything in my first ${industry} role.`, angle: 'Vulnerability + lesson', format: 'Storytelling' },
        ],
        'job-search': [
            { pillar: 'growth', title: `What I wish I knew before entering ${industry}`, hook: `If I could restart my ${industry} career, here's what I'd do differently.`, angle: 'Career pivot reflection', format: 'Storytelling' },
            { pillar: 'insights', title: `Skills that actually matter in ${industry}`, hook: `I've interviewed 100+ ${industry} candidates. These 3 skills matter more than your degree.`, angle: 'Hiring perspective', format: 'Carousel / List' },
            { pillar: 'engagement', title: `Is ${industry} still a good career bet?`, hook: `"${industry} is dead." I hear this weekly. Here's what the data actually says:`, angle: 'Myth-busting', format: 'Text post' },
            { pillar: 'growth', title: `How I landed my ${industry} role`, hook: `I got rejected 47 times before landing my dream ${industry} role. Here's what changed.`, angle: 'Personal story + tactics', format: 'Storytelling' },
            { pillar: 'insights', title: `${industry} resume mistakes`, hook: `Your ${industry} resume is probably doing this wrong. Here's a quick fix:`, angle: 'Practical advice', format: 'Text post' },
        ],
        'build-audience': [
            { pillar: 'engagement', title: `Ask me about ${industry}`, hook: `I've been in ${industry} for years. Ask me anything | no gatekeeping.`, angle: 'AMA / community builder', format: 'Text post' },
            { pillar: 'insights', title: `${industry} tools nobody talks about`, hook: `These 5 ${industry} tools saved me 10+ hours a week. And none of them are ChatGPT.`, angle: 'Curated resource list', format: 'Carousel / List' },
            { pillar: 'growth', title: `Day in the life: ${industry}`, hook: `Here's what a typical day looks like in ${industry}. Spoiler: it's not glamorous.`, angle: 'Behind-the-scenes', format: 'Storytelling' },
            { pillar: 'engagement', title: `${industry} hot take`, hook: `Hot take: Most people in ${industry} are solving the wrong problem.`, angle: 'Contrarian conversation starter', format: 'Text post' },
            { pillar: 'insights', title: `${industry} predictions`, hook: `3 predictions for ${industry} in the next 12 months (and one that's already happening):`, angle: 'Future-focused insights', format: 'Carousel / List' },
        ],
        'networking': [
            { pillar: 'engagement', title: `Shoutout to ${industry} professionals`, hook: `Let's build a thread: Drop your biggest ${industry} win from this year 👇`, angle: 'Community spotlight', format: 'Text post' },
            { pillar: 'growth', title: `Best ${industry} advice I received`, hook: `The best advice I ever got about ${industry} came from someone outside the field entirely.`, angle: 'Unexpected mentor story', format: 'Storytelling' },
            { pillar: 'insights', title: `${industry} networking mistakes`, hook: `I used to network wrong. Here are 3 things I stopped doing in ${industry}:`, angle: 'Anti-patterns', format: 'Text post' },
            { pillar: 'engagement', title: `Who should I follow in ${industry}?`, hook: `I'm looking for the best voices in ${industry}. Who are you learning from?`, angle: 'Recommendation crowdsource', format: 'Text post' },
            { pillar: 'growth', title: `Collaboration over competition in ${industry}`, hook: `My biggest ${industry} opportunity came from helping a competitor. Here's what happened:`, angle: 'Giving-first mindset', format: 'Storytelling' },
        ],
    }
    return goalTemplates[goal] || goalTemplates['thought-leadership']
}

const POST_TYPES = [
    { id: 'evergreen', label: 'Evergreen', desc: 'Timeless ideas that always work' },
    { id: 'trending', label: 'Trending / Viral', desc: 'Based on current industry buzz' },
    { id: 'custom', label: 'Custom Topic', desc: 'You pick the angle' },
]

export default function PostIdeaGenerator() {
    const [industry, setIndustry] = useState('')
    const [goal, setGoal] = useState('thought-leadership')
    const [niche, setNiche] = useState('')
    const [postType, setPostType] = useState('evergreen')
    const [customTopic, setCustomTopic] = useState('')
    const [ideas, setIdeas] = useState<AIPostIdea[]>([])
    const [loading, setLoading] = useState(false)
    const [isAI, setIsAI] = useState(false)
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
    const [error, setError] = useState('')
    const [activeIdea, setActiveIdea] = useState(0)

    // PDF upload
    const [pdfUploading, setPdfUploading] = useState(false)
    const [pdfExtracted, setPdfExtracted] = useState(false)

    const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setPdfUploading(true)
        try {
            const fd = new FormData()
            fd.append('file', file)
            const res = await fetch('/api/analyze', { method: 'POST', body: fd })
            const data = await res.json()
            const profile = data?.data?.profile || data?.profile
            if (profile) {
                if (profile.headline) {
                    const headlineLower = profile.headline.toLowerCase()
                    for (const ind of INDUSTRIES) {
                        if (headlineLower.includes(ind.toLowerCase())) { setIndustry(ind); break }
                    }
                    if (!industry) setNiche(profile.headline)
                }
                if (profile.experience?.[0]?.title) {
                    setNiche(prev => prev || profile.experience[0].title)
                }
                if (profile.skills?.length) {
                    setNiche(prev => prev || profile.skills.slice(0, 3).join(', '))
                }
                setPdfExtracted(true)
            }
        } catch (err) {
            console.error('PDF upload failed:', err)
        } finally {
            setPdfUploading(false)
        }
    }

    const doGenerate = async () => {
        if (!industry.trim()) return
        setLoading(true)
        setIdeas([])
        setError('')
        setActiveIdea(0)

        try {
            // Try AI first
            const res = await fetch('/api/tools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tool: 'post-ideas',
                    input: {
                        industry: industry.trim(),
                        goal,
                        niche: niche.trim() || undefined,
                        expertise: niche.trim() || undefined,
                        postType: postType === 'custom' ? `Custom: ${customTopic}` : postType === 'trending' ? 'trending/viral | reference current industry news and hot topics' : 'evergreen | timeless ideas',
                    }
                })
            })

            const data = await res.json()

            if (data.success && data.data) {
                setIdeas(data.data as AIPostIdea[])
                setIsAI(true)
                return
            }
        } catch {
            // Fall through to rule-based
        }

        // Fallback
        setIdeas(buildFallbackIdeas(industry, goal))
        setIsAI(false)
    }

    const handleGenerate = async () => {
        if (!industry.trim()) return
        try {
            await doGenerate()
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const copyHook = (hook: string, idx: number) => {
        try {
            navigator.clipboard.writeText(hook)
        } catch {
            const ta = document.createElement('textarea')
            ta.value = hook
            ta.style.position = 'fixed'
            ta.style.opacity = '0'
            document.body.appendChild(ta)
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
        }
        setCopiedIdx(idx)
        setTimeout(() => setCopiedIdx(null), 2000)
    }

    const pillarColors: Record<string, { bg: string; text: string; border: string }> = {
        growth: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
        insights: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
        engagement: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="font-semibold text-[#0A0F1C] text-[15px]">LinkedIn Post Idea Engine</h2>
                        <p className="text-[11px] text-[#6B7280]">5 scroll-stopping post ideas built on applied psychology | personalized to your industry</p>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-4">
                {/* Industry */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1.5">Your Industry *</label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                        {INDUSTRIES.slice(0, 12).map(ind => (
                            <button
                                key={ind}
                                onClick={() => setIndustry(ind)}
                                className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${industry === ind
                                    ? 'bg-[#F59E0B] text-white border-[#F59E0B]'
                                    : 'bg-white text-[#6B7280] border-gray-200 hover:border-[#F59E0B]'
                                    }`}
                            >
                                {ind}
                            </button>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="Or type your industry..."
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/20"
                    />
                </div>

                {/* Niche */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1">
                        Your niche or focus area <span className="text-[#6B7280] font-normal">(optional, helps AI personalize)</span>
                    </label>
                    <input
                        type="text"
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        placeholder="e.g., B2B SaaS growth, Frontend architecture, Startup fundraising"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/20"
                    />
                </div>

                {/* Post Type */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-2">Post Type</label>
                    <div className="flex gap-2">
                        {POST_TYPES.map(pt => (
                            <button
                                key={pt.id}
                                onClick={() => setPostType(pt.id)}
                                className={`flex-1 text-left px-3 py-2 rounded-lg border transition-all ${postType === pt.id
                                    ? 'border-[#F59E0B] bg-amber-50'
                                    : 'border-gray-200 hover:border-amber-200'
                                    }`}
                            >
                                <p className={`text-[11px] font-semibold ${postType === pt.id ? 'text-[#D97706]' : 'text-[#4B5563]'}`}>{pt.label}</p>
                                <p className="text-[9px] text-[#6B7280]">{pt.desc}</p>
                            </button>
                        ))}
                    </div>
                    {postType === 'custom' && (
                        <input
                            type="text"
                            value={customTopic}
                            onChange={(e) => setCustomTopic(e.target.value)}
                            placeholder="What topic do you want to post about?"
                            className="w-full mt-2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/20"
                        />
                    )}
                </div>

                {/* Goal */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-2">Content Goal</label>
                    <div className="grid grid-cols-2 gap-2">
                        {GOALS.map(g => (
                            <button
                                key={g.id}
                                onClick={() => setGoal(g.id)}
                                className={`text-left px-3 py-2 rounded-lg border transition-all ${goal === g.id
                                    ? 'border-[#F59E0B] bg-amber-50'
                                    : 'border-gray-200 hover:border-amber-200'
                                    }`}
                            >
                                <p className={`text-[11px] font-semibold ${goal === g.id ? 'text-[#D97706]' : 'text-[#4B5563]'}`}>{g.label}</p>
                                <p className="text-[9px] text-[#6B7280]">{g.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!industry.trim() || loading}
                    className="w-full py-3 bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            AI is generating ideas...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                            </svg>
                            Generate Post Ideas
                        </>
                    )}
                </button>

                {/* Results */}
                {ideas.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        {/* Copyable AI Prompt */}
                        <ToolPromptBlock
                            toolName="Post Idea Engine"
                            color="#F59E0B"
                            promptText={buildPostIdeaPrompt({
                                industry,
                                goal,
                                niche: niche || undefined,
                                postType: postType === 'custom' ? customTopic : postType,
                            })}
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                                    Idea {activeIdea + 1} of {ideas.length}
                                </p>
                                {isAI && (
                                    <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                        </svg>
                                        AI
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setActiveIdea(Math.max(0, activeIdea - 1))}
                                    disabled={activeIdea === 0}
                                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-[#6B7280] hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                                </button>
                                <button
                                    onClick={() => setActiveIdea(Math.min(ideas.length - 1, activeIdea + 1))}
                                    disabled={activeIdea === ideas.length - 1}
                                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-[#6B7280] hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                                </button>
                            </div>
                        </div>

                        {(() => {
                            const idea = ideas[activeIdea]
                            if (!idea) return null
                            const colors = pillarColors[idea.pillar] || pillarColors.insights
                            return (
                                <div className={`border rounded-xl overflow-hidden group hover:shadow-sm transition-all ${colors.border}`}>
                                    <div className="px-4 py-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${colors.bg} ${colors.text}`}>
                                                    {idea.pillar}
                                                </span>
                                                <span className="text-[9px] text-[#C4C9D4]">{idea.format}</span>
                                            </div>
                                            <button
                                                onClick={() => copyHook(idea.hook, activeIdea)}
                                                className="text-[11px] text-[#F59E0B] hover:underline font-semibold"
                                            >
                                                {copiedIdx === activeIdea ? '✓ Copied' : 'Copy Hook'}
                                            </button>
                                        </div>
                                        <h3 className="text-sm font-semibold text-[#0A0F1C] mb-1.5">{idea.title}</h3>
                                        <div className="bg-[#F8FAFC] rounded-lg px-3 py-2 mb-2">
                                            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-0.5">Hook</p>
                                            <p className="text-[13px] text-[#0A0F1C] italic leading-relaxed">&ldquo;{idea.hook}&rdquo;</p>
                                        </div>
                                        <p className="text-[10px] text-[#6B7280]">
                                            <strong className="text-[#4B5563]">Angle:</strong> {idea.angle}
                                        </p>
                                    </div>
                                </div>
                            )
                        })()}

                        {/* Dot indicators */}
                        <div className="flex items-center justify-center gap-1.5">
                            {ideas.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIdea(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === activeIdea ? 'bg-[#F59E0B] w-4' : 'bg-gray-200 hover:bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    </div>
                )}


            </div>
        </div>
    )
}
