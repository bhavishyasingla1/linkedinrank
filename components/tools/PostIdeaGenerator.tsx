'use client'

import { useState } from 'react'
import { generatePostIdeas } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildPostIdeaPrompt } from './ToolPromptBlock'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { UploadIcon, CheckIcon, CopyIcon, SparklesIcon } from '@/components/ui/Icons'

const INDUSTRIES = [
    'Technology', 'Finance', 'Healthcare', 'Marketing', 'Education',
    'Real Estate', 'Consulting', 'E-commerce', 'Media', 'Legal',
    'Design', 'Sales', 'HR', 'Product', 'Data Science', 'AI & Machine Learning',
    'SaaS', 'Cybersecurity', 'Engineering', 'Founders & Startups'
]

const GOALS = [
    { id: 'thought-leadership', label: 'Thought Leadership', desc: 'Build domain authority' },
    { id: 'job-search', label: 'Job Search', desc: 'Attract recruiters and hiring leads' },
    { id: 'build-audience', label: 'Audience Growth', desc: 'Expand reach with high-share insights' },
    { id: 'networking', label: 'Networking', desc: 'Drive conversations and engagement' },
]

interface AIPostIdea {
    pillar: string
    title: string
    hook: string
    angle: string
    format: string
}

export default function PostIdeaGenerator() {
    const [industry, setIndustry] = useState('Technology')
    const [goal, setGoal] = useState('thought-leadership')
    const [niche, setNiche] = useState('')
    const [ideas, setIdeas] = useState<AIPostIdea[]>([])
    const [loading, setLoading] = useState(false)
    const [isAI, setIsAI] = useState(false)
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
    const [error, setError] = useState('')

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
                    if (!niche) setNiche(profile.headline)
                }
                if (profile.experience?.[0]?.title) {
                    setNiche(prev => prev || profile.experience[0].title)
                }
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
        if (!industry.trim()) return
        setLoading(true)
        setIdeas([])
        setError('')

        try {
            const res = await fetch('/api/tools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tool: 'post-ideas',
                    input: {
                        industry: industry.trim(),
                        goal,
                        niche: niche.trim() || undefined,
                    }
                })
            })
            const data = await res.json()

            if (data.success && Array.isArray(data.data)) {
                setIdeas(data.data)
                setIsAI(true)
                setLoading(false)
                return
            }
        } catch {}

        try {
            const fallback = generatePostIdeas({
                industry: industry.trim(),
                goal,
                niche: niche.trim() || undefined,
            })
            if (fallback && fallback.length > 0) {
                setIdeas(fallback)
                setIsAI(false)
                setLoading(false)
                return
            }
        } catch {}

        setError('ai_failed')
        setLoading(false)
    }

    const copyHook = (text: string, idx: number) => {
        navigator.clipboard.writeText(text)
        setCopiedIdx(idx)
        setTimeout(() => setCopiedIdx(null), 2000)
    }

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
                <div>
                    <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                        AI LinkedIn Post Idea Generator
                    </h2>
                    <p className="text-[13px] text-[#64748B] mt-0.5">
                        Generate 5 distinct post concepts with scroll-stopping hooks mapped across key content pillars.
                    </p>
                </div>
                <Badge variant="brand" size="sm">
                    Instant Tool
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
                            {pdfExtracted ? '✓ Profile extracted successfully' : 'Auto-fill niche from LinkedIn PDF'}
                        </p>
                        <p className="text-[12px] text-[#64748B]">
                            {pdfExtracted ? 'Industry & focus populated from your experience' : 'Upload your export to automatically detect industry & specialty'}
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
                            Primary Industry / Sector <span className="text-[#DC2626]">*</span>
                        </label>
                        <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="input-base bg-white"
                        >
                            {INDUSTRIES.map((ind) => (
                                <option key={ind} value={ind}>{ind}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Specific Niche / Focus Area
                        </label>
                        <input
                            type="text"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                            placeholder="e.g. Distributed Database Architecture"
                            className="input-base"
                        />
                    </div>
                </div>

                {/* Primary Content Goal */}
                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-2">
                        Primary Content Objective
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {GOALS.map((g) => (
                            <button
                                key={g.id}
                                onClick={() => setGoal(g.id)}
                                className={`p-3 rounded-xl border text-left transition-all cursor-pointer select-none ${
                                    goal === g.id
                                        ? 'bg-[#F0F7FF] border-[#0A66C2] shadow-xs'
                                        : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                                }`}
                            >
                                <p className={`text-[13px] font-semibold ${goal === g.id ? 'text-[#0A66C2]' : 'text-[#0F172A]'}`}>
                                    {g.label}
                                </p>
                                <p className="text-[11px] text-[#64748B] mt-0.5">{g.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={handleGenerate}
                    disabled={!industry.trim() || loading}
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={loading}
                    rightIcon={<SparklesIcon size={16} />}
                >
                    Generate 5 Post Ideas
                </Button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Post Idea Generator"
                    color="#0A66C2"
                    promptText={buildPostIdeaPrompt({
                        industry,
                        goal,
                        niche: niche || undefined,
                    })}
                />
            )}

            {/* Generated Results */}
            {ideas.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#F1F5F9] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wider">
                            Generated Post Ideas ({ideas.length})
                        </p>
                        {isAI && (
                            <Badge variant="brand" size="sm">
                                Anti-AI Writing Validated
                            </Badge>
                        )}
                    </div>

                    <div className="space-y-3">
                        {ideas.map((idea, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0A66C2] shadow-xs space-y-3 transition-all group"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant={idea.pillar === 'insights' ? 'brand' : idea.pillar === 'growth' ? 'neutral' : 'outline'}
                                            size="sm"
                                        >
                                            {idea.pillar ? `${idea.pillar.toUpperCase()} PILLAR` : 'IDEA'}
                                        </Badge>
                                        {idea.format && (
                                            <span className="text-[11px] text-[#64748B]">
                                                Format: {idea.format}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => copyHook(idea.hook || idea.title, i)}
                                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-md text-[#0A66C2] hover:bg-[#F0F7FF] transition-colors cursor-pointer select-none"
                                    >
                                        {copiedIdx === i ? (
                                            <>
                                                <CheckIcon size={13} className="text-[#16A34A]" />
                                                <span className="text-[#16A34A]">Copied Hook</span>
                                            </>
                                        ) : (
                                            <>
                                                <CopyIcon size={13} />
                                                <span>Copy Hook</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div>
                                    <p className="text-[14px] font-bold text-[#0F172A]">
                                        {idea.title}
                                    </p>
                                    <div className="mt-2 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                                        <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
                                            Scroll-Stopping Opening Hook:
                                        </p>
                                        <p className="text-[13px] text-[#0F172A] font-medium leading-relaxed">
                                            &ldquo;{idea.hook}&rdquo;
                                        </p>
                                    </div>
                                </div>

                                {idea.angle && (
                                    <p className="text-[12px] text-[#475569]">
                                        🎯 <strong>Angle:</strong> {idea.angle}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Post Idea Generator"
                        color="#0A66C2"
                        promptText={buildPostIdeaPrompt({
                            industry,
                            goal,
                            niche: niche || undefined,
                        })}
                    />
                </div>
            )}
        </div>
    )
}
