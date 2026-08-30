'use client'

import { useState } from 'react'
import { generateWeeklyPlan } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildContentPlannerPrompt } from './ToolPromptBlock'
import { UploadIcon, CheckIcon, CopyIcon, SparklesIcon } from '@/components/ui/Icons'

type Frequency = '3' | '4' | '5'

interface DayPlan {
    day: string
    pillar: string
    format: string
    prompt: string
    example: string
}

export default function ContentPillarPlanner() {
    const [industry, setIndustry] = useState('')
    const [role, setRole] = useState('')
    const [frequency, setFrequency] = useState<Frequency>('3')
    const [plan, setPlan] = useState<DayPlan[]>([])
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
    const [copiedAll, setCopiedAll] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isAI, setIsAI] = useState(false)
    const [pdfUploading, setPdfUploading] = useState(false)
    const [pdfExtracted, setPdfExtracted] = useState(false)
    const [error, setError] = useState('')

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
            if (e.target) e.target.value = ''
        }
    }

    const handleGenerate = async () => {
        setLoading(true)
        setIsAI(false)
        setPlan([])
        setError('')

        try {
            const res = await fetch('/api/tools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tool: 'content-planner',
                    input: { industry: industry.trim() || 'Technology & Engineering', role: role.trim() || 'Specialist', frequency }
                })
            })
            const data = await res.json()

            if (data.success && Array.isArray(data.data)) {
                setPlan(data.data)
                setIsAI(true)
                setLoading(false)
                return
            }
        } catch {}

        try {
            const fallback = generateWeeklyPlan({
                industry: industry.trim() || 'Technology',
                role: role.trim() || 'Professional',
                frequency,
            })
            if (fallback.length > 0) {
                setPlan(fallback)
                setIsAI(false)
                setLoading(false)
                return
            }
        } catch {}

        setError('ai_failed')
        setLoading(false)
    }

    const copyDay = (day: DayPlan, idx: number) => {
        const text = `[${day.day} - ${day.pillar.toUpperCase()}]\nFormat: ${day.format}\nPrompt: ${day.prompt}\nExample Hook: "${day.example}"`
        navigator.clipboard.writeText(text)
        setCopiedIdx(idx)
        setTimeout(() => setCopiedIdx(null), 2000)
    }

    const copyFullPlan = () => {
        const text = plan.map(d => `## ${d.day} (${d.pillar.toUpperCase()})\nFormat: ${d.format}\nPrompt: ${d.prompt}\nExample Hook: "${d.example}"`).join('\n\n')
        navigator.clipboard.writeText(text)
        setCopiedAll(true)
        setTimeout(() => setCopiedAll(false), 2000)
    }

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dedcff]">
                <div>
                    <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        LinkedIn Content Pillar &amp; Calendar Planner
                    </h2>
                    <p className="text-[13.5px] text-[#050315]/70 mt-1">
                        Build a structured weekly posting plan balancing professional insights, growth lessons, and community engagement.
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3.5 py-1.5 rounded-full shadow-2xs whitespace-nowrap shrink-0">
                        Growth · Insights · Engagement
                    </span>
                </div>
            </div>

            {/* Optional Auto-Fill from PDF Strip */}
            <div className="p-4 rounded-2xl bg-[#dedcff]/30 border border-[#dedcff] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 shadow-xs">
                        <UploadIcon size={18} />
                    </div>
                    <div>
                        <p className="text-[13.5px] font-bold text-[#050315]">
                            {pdfExtracted ? '✓ Role & Industry extracted' : 'Auto-fill from LinkedIn PDF'}
                        </p>
                        <p className="text-[12px] text-[#050315]/60">
                            {pdfExtracted ? 'Calendar will be tailored to your exact industry' : 'Extract your headline & sector to generate a custom content calendar'}
                        </p>
                    </div>
                </div>

                <label className="cursor-pointer inline-flex items-center justify-center gap-1.5 text-[12.5px] font-bold px-3.5 py-1.5 rounded-xl bg-white border border-[#dedcff] hover:border-[#2f27ce] text-[#2f27ce] shadow-xs transition-all shrink-0 select-none">
                    {pdfUploading ? 'Extracting...' : pdfExtracted ? 'Re-upload PDF' : 'Upload PDF'}
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfUpload}
                        className="hidden"
                        disabled={pdfUploading}
                    />
                </label>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Your Industry / Domain
                        </label>
                        <input
                            type="text"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            placeholder="e.g. B2B SaaS, Distributed Systems, FinTech"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Your Role / Title
                        </label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g. Lead Software Engineer, Product Director"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                </div>

                {/* Posting Frequency Toggle */}
                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-2">
                        Weekly Posting Frequency
                    </label>
                    <div className="grid grid-cols-3 gap-3 max-w-md">
                        {(['3', '4', '5'] as Frequency[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFrequency(f)}
                                className={`py-2.5 px-3 rounded-2xl border text-center text-[13.5px] font-bold transition-all cursor-pointer select-none ${
                                    frequency === f
                                        ? 'bg-[#2f27ce] text-white border-[#2f27ce] shadow-sm'
                                        : 'bg-white text-[#050315]/80 border-[#dedcff] hover:border-[#2f27ce]'
                                }`}
                            >
                                {f}x per week
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-[#2f27ce] hover:bg-[#433bff] disabled:opacity-50 text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                    {loading ? (
                        <span>Crafting Your Strategic Calendar...</span>
                    ) : (
                        <>
                            <span>Generate {frequency}-Day Content Plan</span>
                            <SparklesIcon size={18} />
                        </>
                    )}
                </button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Content Pillar Planner"
                    color="#2f27ce"
                    promptText={buildContentPlannerPrompt({
                        industry: industry || 'Technology',
                        role: role || 'Professional',
                        frequency,
                    })}
                />
            )}

            {/* Generated Weekly Plan */}
            {plan.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#dedcff] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <p className="text-[13px] font-extrabold text-[#050315] uppercase tracking-wider">
                                Weekly Posting Calendar ({plan.length} Days)
                            </p>
                            {isAI && (
                                <span className="inline-flex items-center justify-center text-center leading-none text-[11px] font-bold text-[#2f27ce] bg-[#dedcff] px-2.5 py-1 rounded-full shadow-2xs">
                                    Anti-AI Validated
                                </span>
                            )}
                        </div>

                        <button
                            onClick={copyFullPlan}
                            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold px-3.5 py-1.5 rounded-xl bg-[#2f27ce] text-white hover:bg-[#433bff] transition-colors cursor-pointer select-none shadow-xs"
                        >
                            {copiedAll ? (
                                <>
                                    <CheckIcon size={14} />
                                    <span>Copied Full Week</span>
                                </>
                            ) : (
                                <>
                                    <CopyIcon size={14} />
                                    <span>Copy Full Week Plan</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="space-y-3">
                        {plan.map((day, i) => (
                            <div
                                key={i}
                                className="p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow space-y-3 transition-all group"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[14px] font-extrabold text-[#050315]">
                                            {day.day}
                                        </span>
                                        <span className="inline-flex items-center justify-center text-center leading-none text-[11.5px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3 py-1 rounded-full uppercase shadow-2xs">
                                            {day.pillar}
                                        </span>
                                        <span className="text-[11.5px] font-semibold text-[#050315]/65">
                                            Format: {day.format}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => copyDay(day, i)}
                                        className="inline-flex items-center gap-1.5 text-[12.5px] font-bold px-3 py-1 rounded-xl text-[#2f27ce] bg-[#dedcff]/40 hover:bg-[#dedcff] transition-colors cursor-pointer select-none"
                                    >
                                        {copiedIdx === i ? (
                                            <>
                                                <CheckIcon size={14} className="text-[#16A34A]" />
                                                <span className="text-[#16A34A]">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <CopyIcon size={14} />
                                                <span>Copy Day</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="space-y-2.5">
                                    <p className="text-[13.5px] text-[#050315]/80 leading-relaxed">
                                        <strong>Writing Prompt:</strong> {day.prompt}
                                    </p>
                                    <div className="p-3.5 bg-[#fbfbfe] border border-[#dedcff] rounded-xl space-y-1">
                                        <p className="text-[11px] font-extrabold text-[#050315]/60 uppercase tracking-wider">
                                            Opening Hook Example:
                                        </p>
                                        <p className="text-[13.5px] text-[#050315] font-medium leading-relaxed italic">
                                            &ldquo;{day.example}&rdquo;
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Content Pillar Planner"
                        color="#2f27ce"
                        promptText={buildContentPlannerPrompt({
                            industry: industry || 'Technology',
                            role: role || 'Professional',
                            frequency,
                        })}
                    />
                </div>
            )}
        </div>
    )
}
