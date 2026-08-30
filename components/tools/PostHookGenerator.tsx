'use client'

import { useState } from 'react'
import { generatePostHooks } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildHookPrompt } from './ToolPromptBlock'
import { UploadIcon, CheckIcon, CopyIcon, SparklesIcon } from '@/components/ui/Icons'

interface GeneratedHook {
    text: string
    style: string
    why_it_works: string
}

const TOPIC_SUGGESTIONS = [
    'Why traditional career advice fails in 2026',
    'What we learned after scaling to 1M users',
    'The biggest misconception about AI in production',
    '3 systems that transformed our engineering velocity',
    'Why most high-performers eventually burnout'
]

export default function PostHookGeneratorTool() {
    const [formData, setFormData] = useState({
        topic: '',
        angle: '',
        audience: ''
    })
    const [results, setResults] = useState<GeneratedHook[]>([])
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
    const [copiedAll, setCopiedAll] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isAI, setIsAI] = useState(false)
    const [error, setError] = useState('')

    // PDF extraction
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
                    setFormData(prev => ({
                        ...prev,
                        topic: prev.topic || `Key lessons for ${profile.headline.split(/[|,·]/)[0].trim()}s`,
                        audience: prev.audience || profile.headline.split(/[|,·]/)[0].trim()
                    }))
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
        if (!formData.topic.trim()) return
        setLoading(true)
        setIsAI(false)
        setError('')
        setResults([])

        try {
            const res = await fetch('/api/tools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tool: 'post-hooks',
                    input: {
                        topic: formData.topic.trim(),
                        angle: formData.angle.trim() || undefined,
                        audience: formData.audience.trim() || undefined,
                    }
                })
            })
            const data = await res.json()

            if (data.success && Array.isArray(data.data)) {
                setResults(data.data)
                setIsAI(true)
                setLoading(false)
                return
            }
        } catch {}

        try {
            const fallbackResults = generatePostHooks({
                topic: formData.topic.trim(),
                angle: formData.angle.trim() || undefined,
                audience: formData.audience.trim() || undefined,
            })
            if (fallbackResults.length > 0) {
                setResults(fallbackResults)
                setIsAI(false)
                setLoading(false)
                return
            }
        } catch {}

        setError('ai_failed')
        setLoading(false)
    }

    const copyText = (text: string, index: number) => {
        navigator.clipboard.writeText(text)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
    }

    const copyAllHooks = () => {
        const text = results.map((h, i) => `${i + 1}. [${h.style}]\n"${h.text}"\nWhy it works: ${h.why_it_works}\n`).join('\n')
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
                        Scroll-Stopping Hook Generator
                    </h2>
                    <p className="text-[13.5px] text-[#050315]/70 mt-1">
                        Generate 6 opening lines built on pattern interrupts, curiosity gaps, and applied perception psychology.
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3.5 py-1.5 rounded-full shadow-2xs whitespace-nowrap shrink-0">
                        6 Psychological Angles
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
                            {pdfExtracted ? '✓ Profile extracted successfully' : 'Auto-fill domain from LinkedIn PDF'}
                        </p>
                        <p className="text-[12px] text-[#050315]/60">
                            {pdfExtracted ? 'Audience and domain context imported' : 'Upload your PDF to import domain context for targeted hooks'}
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

            {/* Quick Suggestions */}
            <div>
                <label className="block text-[12px] font-bold text-[#050315]/70 uppercase tracking-wider mb-2">
                    Quick Topic Inspirations
                </label>
                <div className="flex flex-wrap gap-2">
                    {TOPIC_SUGGESTIONS.map((topic, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setFormData({ ...formData, topic })}
                            className="text-[12px] px-3 py-1.5 rounded-xl border border-[#dedcff] bg-white text-[#050315]/80 hover:border-[#2f27ce] hover:text-[#2f27ce] transition-all cursor-pointer"
                        >
                            + {topic}
                        </button>
                    ))}
                </div>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                        Post Topic / Core Concept <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        placeholder="e.g. Why microservices architecture fails for early-stage startups"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Your Personal Angle / Experience
                        </label>
                        <input
                            type="text"
                            value={formData.angle}
                            onChange={(e) => setFormData({ ...formData, angle: e.target.value })}
                            placeholder="e.g. Spent $80K on AWS before rewriting back to monolith"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Target Audience
                        </label>
                        <input
                            type="text"
                            value={formData.audience}
                            onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                            placeholder="e.g. Startup Founders, CTOs, Staff Engineers"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!formData.topic.trim() || loading}
                    className="w-full py-3.5 rounded-2xl bg-[#2f27ce] hover:bg-[#433bff] disabled:opacity-50 text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                    {loading ? (
                        <span>Crafting Psychological Hooks...</span>
                    ) : (
                        <>
                            <span>Generate 6 Scroll-Stopping Hooks</span>
                            <SparklesIcon size={18} />
                        </>
                    )}
                </button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Hook Generator"
                    color="#2f27ce"
                    promptText={buildHookPrompt({
                        topic: formData.topic,
                        angle: formData.angle || undefined,
                        audience: formData.audience || undefined,
                    })}
                />
            )}

            {/* Generated Results */}
            {results.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#dedcff] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <p className="text-[13px] font-extrabold text-[#050315] uppercase tracking-wider">
                                Generated Hooks ({results.length})
                            </p>
                            {isAI && (
                                <span className="inline-flex items-center justify-center text-center leading-none text-[11px] font-bold text-[#2f27ce] bg-[#dedcff] px-2.5 py-1 rounded-full shadow-2xs">
                                    Anti-AI Validated
                                </span>
                            )}
                        </div>

                        <button
                            onClick={copyAllHooks}
                            className="text-[12.5px] font-bold text-[#2f27ce] hover:underline cursor-pointer"
                        >
                            {copiedAll ? '✓ All Copied' : 'Copy All Hooks'}
                        </button>
                    </div>

                    <div className="space-y-3">
                        {results.map((hook, i) => (
                            <div
                                key={i}
                                className="p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow space-y-3 transition-all group"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="inline-flex items-center justify-center text-center leading-none text-[11.5px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3 py-1 rounded-full shadow-2xs">
                                        {hook.style}
                                    </span>

                                    <button
                                        onClick={() => copyText(hook.text, i)}
                                        className="inline-flex items-center gap-1.5 text-[12.5px] font-bold px-3 py-1 rounded-xl text-[#2f27ce] bg-[#dedcff]/40 hover:bg-[#dedcff] transition-colors cursor-pointer select-none"
                                    >
                                        {copiedIndex === i ? (
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

                                <p className="text-[14.5px] font-medium text-[#050315] leading-relaxed whitespace-pre-wrap bg-[#fbfbfe] p-4 rounded-2xl border border-[#dedcff]">
                                    &ldquo;{hook.text}&rdquo;
                                </p>

                                {hook.why_it_works && (
                                    <p className="text-[12.5px] text-[#050315]/75 leading-relaxed">
                                        💡 <strong>Psychological Mechanism:</strong> {hook.why_it_works}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Hook Generator"
                        color="#2f27ce"
                        promptText={buildHookPrompt({
                            topic: formData.topic,
                            angle: formData.angle || undefined,
                            audience: formData.audience || undefined,
                        })}
                    />
                </div>
            )}
        </div>
    )
}
