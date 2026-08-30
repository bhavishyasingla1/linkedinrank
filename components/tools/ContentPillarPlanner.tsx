'use client'

import { useState } from 'react'
import { generateWeeklyPlan } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildContentPlannerPrompt } from './ToolPromptBlock'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
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
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
                <div>
                    <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                        LinkedIn Content Pillar &amp; Calendar Planner
                    </h2>
                    <p className="text-[13px] text-[#64748B] mt-0.5">
                        Build a structured weekly posting plan balancing professional insights, growth lessons, and community engagement.
                    </p>
                </div>
                <Badge variant="brand" size="sm">
                    Instant Planner
                </Badge>
            </div>

            {/* Optional Auto-Fill from PDF Strip */}
            <div className="p-4 rounded-xl bg-[#F0F7FF] border border-[#BAE0FD] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#BAE0FD] text-[#0A66C2] flex items-center justify-center shrink-0">
                        <UploadIcon size={16} />
                    </div>
                    <div>
                        <p className="text-[13px] font-semibold text-[#0F172A]">
                            {pdfExtracted ? '✓ Role & Industry extracted' : 'Auto-fill from LinkedIn PDF'}
                        </p>
                        <p className="text-[12px] text-[#64748B]">
                            {pdfExtracted ? 'Calendar will be tailored to your exact industry' : 'Extract your headline & sector to generate a custom content calendar'}
                        </p>
                    </div>
                </div>

                <label className="cursor-pointer inline-flex items-center justify-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#BAE0FD] text-[#0A66C2] hover:bg-white/80 transition-colors shrink-0 select-none">
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
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Your Industry / Domain
                        </label>
                        <input
                            type="text"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            placeholder="e.g. B2B SaaS, Distributed Systems, FinTech"
                            className="input-base"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Your Role / Title
                        </label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g. Lead Software Engineer, Product Director"
                            className="input-base"
                        />
                    </div>
                </div>

                {/* Posting Frequency Toggle */}
                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-1.5">
                        Weekly Posting Frequency
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-w-md">
                        {(['3', '4', '5'] as Frequency[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFrequency(f)}
                                className={`py-2 px-3 rounded-lg border text-center text-[13px] font-semibold transition-all cursor-pointer select-none ${
                                    frequency === f
                                        ? 'bg-[#0A66C2] text-white border-[#0A66C2] shadow-xs'
                                        : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                                }`}
                            >
                                {f}x per week
                            </button>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={handleGenerate}
                    disabled={loading}
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={loading}
                    rightIcon={<SparklesIcon size={16} />}
                >
                    Generate {frequency}-Day Content Plan
                </Button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Content Pillar Planner"
                    color="#0A66C2"
                    promptText={buildContentPlannerPrompt({
                        industry: industry || 'Technology',
                        role: role || 'Professional',
                        frequency,
                    })}
                />
            )}

            {/* Generated Weekly Plan */}
            {plan.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#F1F5F9] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <p className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wider">
                                Weekly Posting Calendar ({plan.length} Days)
                            </p>
                            {isAI && (
                                <Badge variant="brand" size="sm">
                                    Anti-AI Writing Validated
                                </Badge>
                            )}
                        </div>

                        <button
                            onClick={copyFullPlan}
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-[#F0F7FF] border border-[#BAE0FD] text-[#0A66C2] hover:bg-[#E0F2FE] transition-colors cursor-pointer select-none"
                        >
                            {copiedAll ? (
                                <>
                                    <CheckIcon size={13} className="text-[#16A34A]" />
                                    <span className="text-[#16A34A]">Copied Full Week</span>
                                </>
                            ) : (
                                <>
                                    <CopyIcon size={13} />
                                    <span>Copy Full Week Plan</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="space-y-3">
                        {plan.map((day, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0A66C2] shadow-xs space-y-3 transition-all group"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[13px] font-bold text-[#0F172A]">
                                            {day.day}
                                        </span>
                                        <Badge
                                            variant={day.pillar === 'insights' ? 'brand' : day.pillar === 'growth' ? 'neutral' : 'outline'}
                                            size="sm"
                                        >
                                            {day.pillar.toUpperCase()}
                                        </Badge>
                                        <span className="text-[11px] text-[#64748B]">
                                            Format: {day.format}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => copyDay(day, i)}
                                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-md text-[#0A66C2] hover:bg-[#F0F7FF] transition-colors cursor-pointer select-none"
                                    >
                                        {copiedIdx === i ? (
                                            <>
                                                <CheckIcon size={13} className="text-[#16A34A]" />
                                                <span className="text-[#16A34A]">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <CopyIcon size={13} />
                                                <span>Copy Day</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[13px] text-[#475569] leading-relaxed">
                                        <strong>Writing Prompt:</strong> {day.prompt}
                                    </p>
                                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                                        <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-0.5">
                                            Opening Hook Example:
                                        </p>
                                        <p className="text-[13px] text-[#0F172A] font-medium leading-relaxed">
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
                        color="#0A66C2"
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
