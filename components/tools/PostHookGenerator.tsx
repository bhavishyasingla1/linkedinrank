'use client'

import { useState } from 'react'
import { generatePostHooks } from '@/lib/tools'
import ToolPromptBlock, { buildHookPrompt } from './ToolPromptBlock'

interface GeneratedHook {
    text: string
    style: string
    why_it_works: string
}

export default function PostHookGeneratorTool() {
    const [formData, setFormData] = useState({
        topic: '',
        angle: '',
        audience: ''
    })
    const [results, setResults] = useState<GeneratedHook[]>([])
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [isAI, setIsAI] = useState(false)
    const [error, setError] = useState('')

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
                        topic: formData.topic,
                        angle: formData.angle || undefined,
                        audience: formData.audience || undefined,
                    }
                })
            })
            const data = await res.json()

            if (data.success && Array.isArray(data.data)) {
                setResults(data.data)
                setIsAI(true)
            } else {
                const generated = generatePostHooks({
                    topic: formData.topic,
                    angle: formData.angle || undefined,
                    audience: formData.audience || undefined
                })
                setResults(generated)
            }
        } catch {
            const generated = generatePostHooks({
                topic: formData.topic,
                angle: formData.angle || undefined,
                audience: formData.audience || undefined
            })
            setResults(generated)
        } finally {
            setLoading(false)
        }
    }

    const copyText = (text: string, index: number) => {
        try {
            navigator.clipboard.writeText(text)
        } catch {
            // Fallback for non-HTTPS or restricted contexts
            const ta = document.createElement('textarea')
            ta.value = text
            ta.style.position = 'fixed'
            ta.style.opacity = '0'
            document.body.appendChild(ta)
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
        }
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 pt-5 pb-2 border-b border-gray-100">
                <h2 className="font-semibold text-[#0A0F1C]">Scroll-Stopping Hook Writer</h2>
                <p className="text-xs text-[#6B7280] mt-1">Generate 6 opening lines built on applied psychology | not generic templates</p>
            </div>

            <div className="p-5 space-y-4">
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1.5">
                        Post Topic <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        placeholder="e.g., AI in marketing, Remote work, Career growth, Personal branding"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#F59E0B]"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-[#4B5563] mb-1.5">Your Angle (optional)</label>
                        <input
                            type="text"
                            value={formData.angle}
                            onChange={(e) => setFormData({ ...formData, angle: e.target.value })}
                            placeholder="e.g., I tried it for 30 days"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#F59E0B]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-[#4B5563] mb-1.5">Target Audience</label>
                        <input
                            type="text"
                            value={formData.audience}
                            onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                            placeholder="e.g., founders, marketers, students"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#F59E0B]"
                        />
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!formData.topic.trim() || loading}
                    className="w-full py-2.5 bg-[#F59E0B] text-white rounded-lg font-medium text-sm hover:bg-[#D97706] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            Generating…
                        </span>
                    ) : 'Generate Hooks'}
                </button>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-xs text-red-600">
                        {error}
                    </div>
                )}

                {/* Results */}
                {results.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-[#4B5563]">{results.length} hooks in different styles | pick your vibe:</p>
                            {isAI && (
                                <span className="text-[9px] font-bold text-white bg-gradient-to-r from-[#F59E0B] to-[#7C3AED] px-2 py-0.5 rounded-full">AI</span>
                            )}
                        </div>
                        {/* Copyable AI Prompt */}
                        <ToolPromptBlock
                            toolName="Hook Writer"
                            color="#F59E0B"
                            promptText={buildHookPrompt({
                                topic: formData.topic,
                                angle: formData.angle || undefined,
                                audience: formData.audience || undefined,
                            })}
                        />
                        {results.map((hook, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#F59E0B]/50 transition-colors">
                                <div className="px-4 py-3">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <span className="text-[10px] font-bold text-[#F59E0B] bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                                            {hook.style}
                                        </span>
                                        <button
                                            onClick={() => copyText(hook.text, i)}
                                            className="shrink-0 text-xs text-[#0A66C2] hover:underline font-medium"
                                        >
                                            {copiedIndex === i ? '✓ Copied' : 'Copy'}
                                        </button>
                                    </div>
                                    <pre className="text-sm text-[#0A0F1C] whitespace-pre-wrap font-sans leading-relaxed">{hook.text}</pre>
                                    <button
                                        onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                                        className="mt-2 text-[11px] text-[#6B7280] hover:text-[#6B7280] flex items-center gap-1"
                                    >
                                        <svg className={`w-3 h-3 transition-transform ${expandedIndex === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                        Why this works
                                    </button>
                                    {expandedIndex === i && (
                                        <p className="mt-2 text-xs text-[#6B7280] bg-[#F8FAFC] rounded-lg p-3 leading-relaxed">
                                            {hook.why_it_works}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
