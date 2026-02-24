'use client'

import { useState } from 'react'
import ToolPromptBlock, { buildContentPlannerPrompt } from './ToolPromptBlock'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

type Frequency = '3' | '4' | '5'

const PILLAR_COLORS: Record<string, { bg: string; border: string; text: string; label: string }> = {
    growth: { bg: '#EEF2FF', border: '#C7D2FE', text: '#4F46E5', label: 'Personal Growth' },
    insights: { bg: '#F0F7FF', border: '#BFDBFE', text: '#0A66C2', label: 'Professional Insights' },
    engagement: { bg: '#ECFDF5', border: '#A7F3D0', text: '#059669', label: 'Community Engagement' },
}

interface DayPlan {
    day: string
    pillar: string
    format: string
    prompt: string
    example: string
}

// ── Template fallback ──────────────────────────────────────
function fallbackFormatOptions(industry: string, role: string) {
    const ind = industry || 'your field'
    const r = role || 'professional'
    return {
        growth: [
            { format: 'Personal Story', prompt: `Share a career lesson you learned the hard way as a ${r} in ${ind}`, example: `The worst advice I ever received about ${ind} | and why I'm glad I ignored it.` },
            { format: 'Skill Update', prompt: `Talk about a new skill you're building that's relevant to ${ind}`, example: `I've been learning a new skill for my ${ind} work. 30 days in | here's what surprised me.` },
            { format: 'Before/After', prompt: `Show how you've grown as a ${r} | pick one specific transformation`, example: `2 years ago I was struggling as a ${r}. Today everything is different. Here's what changed.` },
        ],
        insights: [
            { format: 'Industry Take', prompt: `Share a strong opinion about ${ind} that others might disagree with`, example: `Unpopular opinion: the biggest problem in ${ind} right now is one nobody wants to address.` },
            { format: 'Framework Share', prompt: `Teach a framework you use as a ${r}`, example: `The simple framework I use for every major ${ind} decision.` },
            { format: 'Trend Analysis', prompt: `Break down a current ${ind} trend with your unique ${r} perspective`, example: `3 things changing in ${ind} right now that most ${r}s aren't talking about.` },
        ],
        engagement: [
            { format: 'Question Post', prompt: `Ask your ${ind} network a thought-provoking question`, example: `What's the best ${ind} advice you've ever received? I'll go first.` },
            { format: 'Shoutout', prompt: `Celebrate someone in your ${ind} network doing great work`, example: `Shoutout to a fellow ${r} who taught me something invaluable about ${ind}.` },
        ],
    }
}

function fallbackWeeklyPlan(frequency: Frequency, industry: string, role: string): DayPlan[] {
    const freq = parseInt(frequency)
    const selectedDays = DAYS.slice(0, freq)
    const formatOptions = fallbackFormatOptions(industry, role)
    type PillarKey = 'growth' | 'insights' | 'engagement'

    const pillarAssignment: PillarKey[] = []
    if (freq === 3) pillarAssignment.push('growth', 'insights', 'engagement')
    else if (freq === 4) pillarAssignment.push('growth', 'insights', 'insights', 'engagement')
    else pillarAssignment.push('growth', 'insights', 'growth', 'insights', 'engagement')

    return selectedDays.map((day, i) => {
        const pillar = pillarAssignment[i]
        const options = formatOptions[pillar]
        const selected = options[Math.floor(Math.random() * options.length)]
        return { day, pillar, format: selected.format, prompt: selected.prompt, example: selected.example }
    })
}

// ── Component ──────────────────────────────────────────────
export default function ContentPillarPlanner() {
    const [industry, setIndustry] = useState('')
    const [role, setRole] = useState('')
    const [frequency, setFrequency] = useState<Frequency>('3')
    const [plan, setPlan] = useState<DayPlan[]>([])
    const [copiedAll, setCopiedAll] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isAI, setIsAI] = useState(false)
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
                if (profile.headline) setRole(profile.headline)
                else if (profile.experience?.[0]?.title) setRole(profile.experience[0].title)
                const headlineText = (profile.headline || '').toLowerCase()
                const industries = ['technology', 'finance', 'healthcare', 'marketing', 'education', 'consulting', 'design', 'sales', 'legal', 'media', 'product', 'ai', 'saas', 'engineering']
                const found = industries.find((i: string) => headlineText.includes(i))
                if (found) setIndustry(found.charAt(0).toUpperCase() + found.slice(1))
                setPdfExtracted(true)
            }
        } catch (err) {
            console.error('PDF upload failed:', err)
        } finally {
            setPdfUploading(false)
        }
    }

    const handleGenerate = async () => {
        setLoading(true)
        setIsAI(false)
        setPlan([])

        try {
            const res = await fetch('/api/tools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tool: 'content-planner',
                    input: { industry: industry || 'general', role: role || 'professional', frequency }
                })
            })
            const data = await res.json()

            if (data.success && Array.isArray(data.data)) {
                setPlan(data.data)
                setIsAI(true)
            } else {
                setPlan(fallbackWeeklyPlan(frequency, industry, role))
            }
        } catch {
            setPlan(fallbackWeeklyPlan(frequency, industry, role))
        } finally {
            setLoading(false)
        }
    }

    const copyFullPlan = () => {
        const text = plan.map(p => {
            const colors = PILLAR_COLORS[p.pillar]
            return `${p.day} | ${colors?.label || p.pillar}\nFormat: ${p.format}\nPrompt: ${p.prompt}\nExample hook: "${p.example}"\n`
        }).join('\n')
        navigator.clipboard.writeText(text)
        setCopiedAll(true)
        setTimeout(() => setCopiedAll(false), 2000)
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="font-semibold text-[#0A0F1C] text-[15px]">Weekly Content Calendar</h2>
                        <p className="text-[11px] text-[#6B7280]">Get a full week of posting prompts with hooks | personalized to your role</p>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-4">
                {/* Pillar Legend */}
                <div className="flex items-center gap-3 px-3 py-2.5 bg-[#F8FAFC] rounded-xl">
                    {Object.values(PILLAR_COLORS).map(p => (
                        <div key={p.label} className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.text }} />
                            <span className="text-[10px] font-medium" style={{ color: p.text }}>{p.label}</span>
                        </div>
                    ))}
                </div>

                {/* PDF Upload */}
                <div className="flex items-center justify-between bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 rounded-xl px-3 py-2.5">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#7C3AED]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                        <p className="text-[11px] text-[#4B5563] font-medium">{pdfExtracted ? 'Profile extracted' : 'Upload LinkedIn PDF to auto-fill'}</p>
                    </div>
                    <label className={`cursor-pointer text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                        pdfExtracted ? 'bg-green-100 border-green-200 text-green-700' : 'border-violet-200 text-violet-600 hover:bg-violet-100'
                    }`}>
                        {pdfUploading ? (
                            <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                        ) : null}
                        {pdfExtracted ? '✓ Done' : pdfUploading ? 'Extracting...' : 'Upload PDF'}
                        <input type="file" accept=".pdf" onChange={handlePdfUpload} className="hidden" disabled={pdfUploading} />
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-[#4B5563] mb-1.5">Your Industry</label>
                        <input
                            type="text"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            placeholder="e.g., Tech, Marketing"
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-[#4B5563] mb-1.5">Your Role</label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g., Product Manager"
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all"
                        />
                    </div>
                </div>

                {/* Frequency */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-2">Posts per week</label>
                    <div className="flex gap-1 p-1 bg-[#F1F5F9] rounded-xl">
                        {(['3', '4', '5'] as Frequency[]).map(f => (
                            <button
                                key={f}
                                onClick={() => setFrequency(f)}
                                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${frequency === f
                                        ? 'bg-white text-[#0A0F1C] shadow-sm'
                                        : 'text-[#6B7280] hover:text-[#4B5563]'
                                    }`}
                            >
                                {f}x / week
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full py-3 bg-[#7C3AED] text-white rounded-xl font-semibold text-sm hover:bg-[#6D28D9] transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            Generating…
                        </span>
                    ) : 'Generate Weekly Plan'}
                </button>

                {/* Results */}
                {plan.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Your week</p>
                                {isAI && (
                                    <span className="text-[9px] font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#0A66C2] px-2 py-0.5 rounded-full">AI</span>
                                )}
                            </div>
                            <button
                                onClick={copyFullPlan}
                                className="text-[11px] text-[#7C3AED] hover:underline font-semibold"
                            >
                                {copiedAll ? '✓ Copied all' : 'Copy full plan'}
                            </button>
                        </div>

                        {/* Copyable AI Prompt */}
                        <ToolPromptBlock
                            toolName="Content Calendar"
                            color="#7C3AED"
                            promptText={buildContentPlannerPrompt({
                                industry,
                                role,
                                frequency,
                            })}
                        />

                        {plan.map((p, i) => {
                            const colors = PILLAR_COLORS[p.pillar] || PILLAR_COLORS.insights
                            return (
                                <div
                                    key={i}
                                    className="rounded-xl border overflow-hidden"
                                    style={{ borderColor: colors.border, backgroundColor: colors.bg }}
                                >
                                    <div className="px-4 py-3">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold" style={{ color: colors.text }}>{p.day}</span>
                                                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/70" style={{ color: colors.text }}>
                                                    {colors.label}
                                                </span>
                                            </div>
                                            <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-white/70 text-[#6B7280]">{p.format}</span>
                                        </div>
                                        <p className="text-xs text-[#4B5563] mb-1"><strong>Prompt:</strong> {p.prompt}</p>
                                        <p className="text-[11px] text-[#6B7280] italic">&ldquo;{p.example}&rdquo;</p>
                                    </div>
                                </div>
                            )
                        })}

                        <p className="text-[10px] text-center text-[#C4C9D4] leading-relaxed">
                            Consistency beats perfection. Imperfect posts &gt; no posts.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
