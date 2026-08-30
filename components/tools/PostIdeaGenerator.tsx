'use client'

import { useState } from 'react'
import { generatePostIdeas } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildPostIdeaPrompt } from './ToolPromptBlock'
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
    const [selectedPillar, setSelectedPillar] = useState('all')
    const [loading, setLoading] = useState(false)
    const [isAI, setIsAI] = useState(false)
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
    const [copiedAll, setCopiedAll] = useState(false)
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

    const copyAllIdeas = () => {
        const text = ideas.map((idea, i) => `${i + 1}. [${idea.pillar.toUpperCase()} PILLAR - ${idea.format}]\nTitle: ${idea.title}\nHook: "${idea.hook}"\nAngle: ${idea.angle}\n`).join('\n')
        navigator.clipboard.writeText(text)
        setCopiedAll(true)
        setTimeout(() => setCopiedAll(false), 2000)
    }

    const filteredIdeas = selectedPillar === 'all'
        ? ideas
        : ideas.filter(i => (i.pillar || '').toLowerCase() === selectedPillar)

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dedcff]">
                <div>
                    <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        AI LinkedIn Post Idea Generator
                    </h2>
                    <p className="text-[13.5px] text-[#050315]/70 mt-1">
                        Generate 5 distinct post concepts with scroll-stopping hooks mapped across key content pillars.
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
                            {pdfExtracted ? '✓ Profile extracted successfully' : 'Auto-fill niche from LinkedIn PDF'}
                        </p>
                        <p className="text-[12px] text-[#050315]/60">
                            {pdfExtracted ? 'Industry & focus populated from your experience' : 'Upload your export to automatically detect industry & specialty'}
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
                            Primary Industry / Sector <span className="text-[#DC2626]">*</span>
                        </label>
                        <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        >
                            {INDUSTRIES.map((ind) => (
                                <option key={ind} value={ind}>{ind}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Specific Niche / Focus Area
                        </label>
                        <input
                            type="text"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                            placeholder="e.g. Distributed Database Architecture"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                </div>

                {/* Primary Content Goal */}
                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-2">
                        Primary Content Objective
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {GOALS.map((g) => (
                            <button
                                key={g.id}
                                onClick={() => setGoal(g.id)}
                                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer select-none ${
                                    goal === g.id
                                        ? 'bg-[#dedcff]/40 border-[#2f27ce] shadow-sm'
                                        : 'bg-white border-[#dedcff] hover:border-[#2f27ce]'
                                }`}
                            >
                                <p className={`text-[13.5px] font-bold ${goal === g.id ? 'text-[#2f27ce]' : 'text-[#050315]'}`}>
                                    {g.label}
                                </p>
                                <p className="text-[11.5px] text-[#050315]/65 mt-1 leading-snug">{g.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!industry.trim() || loading}
                    className="w-full py-3.5 rounded-2xl bg-[#2f27ce] hover:bg-[#433bff] disabled:opacity-50 text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                    {loading ? (
                        <span>Generating High-Converting Post Ideas...</span>
                    ) : (
                        <>
                            <span>Generate 5 Post Ideas</span>
                            <SparklesIcon size={18} />
                        </>
                    )}
                </button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Post Idea Generator"
                    color="#2f27ce"
                    promptText={buildPostIdeaPrompt({
                        industry,
                        goal,
                        niche: niche || undefined,
                    })}
                />
            )}

            {/* Generated Results */}
            {ideas.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#dedcff] animate-fade-in">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <p className="text-[13px] font-extrabold text-[#050315] uppercase tracking-wider">
                                Generated Post Ideas ({ideas.length})
                            </p>
                            {isAI && (
                                <span className="inline-flex items-center justify-center text-center leading-none text-[11px] font-bold text-[#2f27ce] bg-[#dedcff] px-2.5 py-1 rounded-full shadow-2xs">
                                    Anti-AI Validated
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Pillar Filter */}
                            <div className="flex gap-1 bg-[#dedcff]/30 p-1 rounded-xl border border-[#dedcff]">
                                {['all', 'growth', 'insights', 'engagement'].map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setSelectedPillar(p)}
                                        className={`text-[11.5px] px-2.5 py-1 rounded-lg capitalize font-bold transition-all cursor-pointer select-none ${
                                            selectedPillar === p
                                                ? 'bg-[#2f27ce] text-white shadow-2xs'
                                                : 'text-[#050315]/70 hover:text-[#050315]'
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={copyAllIdeas}
                                className="text-[12.5px] font-bold text-[#2f27ce] hover:underline cursor-pointer"
                            >
                                {copiedAll ? '✓ All Copied' : 'Copy All Ideas'}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {filteredIdeas.map((idea, i) => (
                            <div
                                key={i}
                                className="p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow space-y-3 transition-all group"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="inline-flex items-center justify-center text-center leading-none text-[11.5px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3 py-1 rounded-full uppercase shadow-2xs">
                                            {idea.pillar || 'INSIGHTS'} PILLAR
                                        </span>
                                        {idea.format && (
                                            <span className="text-[11.5px] font-semibold text-[#050315]/65">
                                                Format: {idea.format}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => copyHook(idea.hook || idea.title, i)}
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
                                                <span>Copy Hook</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div>
                                    <p className="text-[15px] font-bold text-[#050315]">
                                        {idea.title}
                                    </p>
                                    <div className="mt-2.5 p-3.5 bg-[#fbfbfe] border border-[#dedcff] rounded-xl space-y-1">
                                        <p className="text-[11px] font-extrabold text-[#050315]/60 uppercase tracking-wider">
                                            Scroll-Stopping Opening Hook:
                                        </p>
                                        <p className="text-[13.5px] text-[#050315] font-medium leading-relaxed italic">
                                            &ldquo;{idea.hook}&rdquo;
                                        </p>
                                    </div>
                                </div>

                                {idea.angle && (
                                    <p className="text-[12.5px] text-[#050315]/80">
                                        🎯 <strong>Strategic Angle:</strong> {idea.angle}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Post Idea Generator"
                        color="#2f27ce"
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
