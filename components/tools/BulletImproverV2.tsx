'use client'

import { useState } from 'react'
import { improveBullet } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildBulletPrompt } from './ToolPromptBlock'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CheckIcon, CopyIcon, SparklesIcon } from '@/components/ui/Icons'

type OutputStyle = 'concise' | 'storytelling' | 'ats'

interface BulletResult {
    label: string
    text: string
    checks?: { label: string; pass: boolean }[]
    suggestions?: string[]
}

const STYLES: { id: OutputStyle; label: string; desc: string }[] = [
    { id: 'concise', label: 'Concise', desc: 'Active power verb + specific metric' },
    { id: 'storytelling', label: 'Context-Rich', desc: 'Problem context + action + business result' },
    { id: 'ats', label: 'ATS Search Keyword', desc: 'Dense technical terms & recruiter keywords' },
]

export default function BulletImproverV2() {
    const [bullet, setBullet] = useState('')
    const [style, setStyle] = useState<OutputStyle>('concise')
    const [results, setResults] = useState<BulletResult[] | null>(null)
    const [copiedIdx, setCopiedIdx] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [isAI, setIsAI] = useState(false)
    const [error, setError] = useState('')

    const handleAnalyze = async () => {
        if (!bullet.trim()) return
        setLoading(true)
        setIsAI(false)
        setResults(null)
        setError('')

        try {
            const res = await fetch('/api/tools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tool: 'bullet-improve',
                    input: { bullet: bullet.trim(), style }
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
            const fallback = improveBullet(bullet.trim())
            if (fallback && fallback.improved?.length > 0) {
                const improvedList = [fallback.improved, ...(fallback.alternatives || [])]
                const mapped = improvedList.map((text: string, i: number) => ({
                    label: i === 0 ? 'Achievement-Focused' : i === 1 ? 'Scope & Scale' : 'Execution-Focused',
                    text,
                    checks: (fallback as any).checks,
                    suggestions: fallback.suggestions,
                }))
                setResults(mapped)
                setIsAI(false)
                setLoading(false)
                return
            }
        } catch {}

        setError('ai_failed')
        setLoading(false)
    }

    const copyText = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopiedIdx(id)
        setTimeout(() => setCopiedIdx(null), 2000)
    }

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
                <div>
                    <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                        Experience Bullet Point Rewriter
                    </h2>
                    <p className="text-[13px] text-[#64748B] mt-0.5">
                        Transform passive job descriptions into quantified achievement bullets that pass ATS filters.
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
                        Paste Your Current Experience Bullet / Job Description <span className="text-[#DC2626]">*</span>
                    </label>
                    <textarea
                        value={bullet}
                        onChange={(e) => setBullet(e.target.value)}
                        placeholder="e.g. Responsible for leading frontend architecture and fixing performance bottlenecks across payment flows"
                        rows={3}
                        className="input-base resize-none"
                    />
                </div>

                {/* Style Selector */}
                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-2">
                        Rewrite Style Angle
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {STYLES.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setStyle(s.id)}
                                className={`p-3 rounded-xl border text-left transition-all cursor-pointer select-none ${
                                    style === s.id
                                        ? 'bg-[#F0F7FF] border-[#0A66C2] shadow-xs'
                                        : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                                }`}
                            >
                                <p className={`text-[13px] font-semibold ${style === s.id ? 'text-[#0A66C2]' : 'text-[#0F172A]'}`}>
                                    {s.label}
                                </p>
                                <p className="text-[11px] text-[#64748B] mt-0.5">{s.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={handleAnalyze}
                    disabled={!bullet.trim() || loading}
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={loading}
                    rightIcon={<SparklesIcon size={16} />}
                >
                    Rewrite into 3 Achievement Bullets
                </Button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Bullet Rewriter"
                    color="#0A66C2"
                    promptText={buildBulletPrompt({ bullet })}
                />
            )}

            {/* Generated Results */}
            {results && results.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#F1F5F9] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wider">
                            Rewritten Variations ({results.length})
                        </p>
                        {isAI && (
                            <Badge variant="brand" size="sm">
                                Anti-AI Writing Validated
                            </Badge>
                        )}
                    </div>

                    <div className="space-y-3">
                        {results.map((r, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0A66C2] shadow-xs space-y-2.5 transition-all group"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="brand" size="sm">
                                            {r.label}
                                        </Badge>
                                        <span className="text-[11px] text-[#64748B]">
                                            {r.text.length} chars · {r.text.split(/\s+/).length} words
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => copyText(r.text, `v-${i}`)}
                                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-md text-[#0A66C2] hover:bg-[#F0F7FF] transition-colors cursor-pointer select-none"
                                    >
                                        {copiedIdx === `v-${i}` ? (
                                            <>
                                                <CheckIcon size={13} className="text-[#16A34A]" />
                                                <span className="text-[#16A34A]">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <CopyIcon size={13} />
                                                <span>Copy Bullet</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <p className="text-[14px] font-medium text-[#0F172A] leading-relaxed bg-[#F8FAFC] p-3.5 rounded-lg border border-[#E2E8F0]">
                                    {r.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Bullet Rewriter"
                        color="#0A66C2"
                        promptText={buildBulletPrompt({ bullet })}
                    />
                </div>
            )}
        </div>
    )
}
