'use client'

import { useState } from 'react'
import { generatePostHooks } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildHookPrompt } from './ToolPromptBlock'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CheckIcon, CopyIcon, SparklesIcon } from '@/components/ui/Icons'

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

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
                <div>
                    <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                        Scroll-Stopping Hook Generator
                    </h2>
                    <p className="text-[13px] text-[#64748B] mt-0.5">
                        Generate 6 opening lines built on pattern interrupts, curiosity gaps, and applied perception psychology.
                    </p>
                </div>
                <Badge variant="brand" size="sm">
                    Instant Tool
                </Badge>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                        Post Topic / Core Concept <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        placeholder="e.g. Why microservices architecture fails for early-stage startups"
                        className="input-base"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Your Personal Angle / Experience
                        </label>
                        <input
                            type="text"
                            value={formData.angle}
                            onChange={(e) => setFormData({ ...formData, angle: e.target.value })}
                            placeholder="e.g. Spent $80K on AWS before rewriting back to monolith"
                            className="input-base"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Target Audience
                        </label>
                        <input
                            type="text"
                            value={formData.audience}
                            onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                            placeholder="e.g. Startup Founders, CTOs, Staff Engineers"
                            className="input-base"
                        />
                    </div>
                </div>

                <Button
                    onClick={handleGenerate}
                    disabled={!formData.topic.trim() || loading}
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={loading}
                    rightIcon={<SparklesIcon size={16} />}
                >
                    Generate 6 Scroll-Stopping Hooks
                </Button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Hook Generator"
                    color="#0A66C2"
                    promptText={buildHookPrompt({
                        topic: formData.topic,
                        angle: formData.angle || undefined,
                        audience: formData.audience || undefined,
                    })}
                />
            )}

            {/* Generated Results */}
            {results.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#F1F5F9] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wider">
                            Generated Hooks ({results.length})
                        </p>
                        {isAI && (
                            <Badge variant="brand" size="sm">
                                Anti-AI Writing Validated
                            </Badge>
                        )}
                    </div>

                    <div className="space-y-3">
                        {results.map((hook, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0A66C2] shadow-xs space-y-2.5 transition-all group"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <Badge variant="brand" size="sm">
                                        {hook.style}
                                    </Badge>

                                    <button
                                        onClick={() => copyText(hook.text, i)}
                                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-md text-[#0A66C2] hover:bg-[#F0F7FF] transition-colors cursor-pointer select-none"
                                    >
                                        {copiedIndex === i ? (
                                            <>
                                                <CheckIcon size={13} className="text-[#16A34A]" />
                                                <span className="text-[#16A34A]">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <CopyIcon size={13} />
                                                <span>Copy Hook</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <p className="text-[14px] font-medium text-[#0F172A] leading-relaxed whitespace-pre-wrap bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
                                    &ldquo;{hook.text}&rdquo;
                                </p>

                                {hook.why_it_works && (
                                    <p className="text-[12px] text-[#64748B]">
                                        💡 {hook.why_it_works}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Hook Generator"
                        color="#0A66C2"
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
