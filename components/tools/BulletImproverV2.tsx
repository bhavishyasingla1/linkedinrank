'use client'

import { useState } from 'react'
import { improveBullet } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildBulletPrompt } from './ToolPromptBlock'

type OutputStyle = 'concise' | 'storytelling' | 'ats'

interface BulletResult {
    label: string
    text: string
    checks?: { label: string; pass: boolean }[]
    suggestions?: string[]
}

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
        } catch {
            // AI failed
        }

        // Fallback: use rule-based improver
        try {
            const fallback = improveBullet(bullet.trim())
            if (fallback && fallback.improved?.length > 0) {
                const improvedList = [fallback.improved, ...(fallback.alternatives || [])]
                const mapped = improvedList.map((text: string, i: number) => ({
                    label: i === 0 ? 'Rewritten' : `Version ${i + 1}`,
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
        try { navigator.clipboard.writeText(text) } catch {
            const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'
            document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta)
        }
        setCopiedIdx(id)
        setTimeout(() => setCopiedIdx(null), 2000)
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#3730A3] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="font-semibold text-[#0A0F1C] text-[15px]">Experience Bullet Rewriter</h2>
                        <p className="text-[11px] text-[#6B7280]">Paste weak descriptions, get achievement-driven bullets with metrics</p>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-4">
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1.5">
                        Paste your experience bullet
                    </label>
                    <textarea
                        value={bullet}
                        onChange={(e) => setBullet(e.target.value)}
                        placeholder="e.g., Responsible for managing a team and handling customer issues"
                        rows={3}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 resize-none transition-all"
                    />
                </div>

                {/* Style selector */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-2">Output Style</label>
                    <div className="flex gap-1 p-1 bg-[#F1F5F9] rounded-xl">
                        {([
                            { id: 'concise' as OutputStyle, label: 'Concise', desc: 'Short & punchy' },
                            { id: 'storytelling' as OutputStyle, label: 'Storytelling', desc: 'Context + result' },
                            { id: 'ats' as OutputStyle, label: 'ATS-Friendly', desc: 'Keyword-rich' },
                        ]).map(s => (
                            <button
                                key={s.id}
                                onClick={() => setStyle(s.id)}
                                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${style === s.id
                                    ? 'bg-white text-[#0A0F1C] shadow-sm'
                                    : 'text-[#6B7280] hover:text-[#4B5563]'
                                    }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={!bullet.trim() || loading}
                    className="w-full py-3 bg-[#4F46E5] text-white rounded-xl font-semibold text-sm hover:bg-[#4338CA] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Rewriting...
                        </>
                    ) : 'Rewrite Bullet'}
                </button>

                {/* AI Failed - show prompt */}
                {error === 'ai_failed' && !loading && (
                    <AIFailedPromptBlock
                        toolName="Bullet Rewriter"
                        color="#4F46E5"
                        promptText={buildBulletPrompt({ bullet })}
                    />
                )}

                {results && results.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                                {results.length} Versions
                            </p>
                            {isAI && (
                                <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                    </svg>
                                    AI-Generated
                                </span>
                            )}
                        </div>

                        {/* Copyable AI Prompt */}
                        <ToolPromptBlock
                            toolName="Bullet Rewriter"
                            color="#4F46E5"
                            promptText={buildBulletPrompt({
                                bullet,
                            })}
                        />

                        {/* Quality checks (rule-based only) */}
                        {!isAI && results[0]?.checks && (
                            <div className="flex flex-wrap gap-2">
                                {results[0].checks.map((check: { label: string; pass: boolean }, i: number) => (
                                    <div key={i} className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-lg ${check.pass ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                                        }`}>
                                        {check.pass ? '✓' : '✗'} {check.label}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Improved versions */}
                        {results.map((r, i) => (
                            <div key={i} className="group">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">{r.label}</span>
                                    <button
                                        onClick={() => copyText(r.text, `v-${i}`)}
                                        className="text-[11px] text-[#4F46E5] hover:underline font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        {copiedIdx === `v-${i}` ? '✓ Copied' : 'Copy'}
                                    </button>
                                </div>
                                <div className={`p-3 rounded-xl border text-sm leading-relaxed ${i === 0 ? 'bg-[#EEF2FF] border-[#C7D2FE] text-[#3730A3]' : 'bg-[#F8FAFC] border-gray-100 text-[#374151]'
                                    }`}>
                                    {r.text}
                                </div>
                            </div>
                        ))}

                        {/* Suggestions (rule-based only) */}
                        {!isAI && results[0]?.suggestions && results[0].suggestions.length > 0 && (
                            <div className="bg-[#F8FAFC] rounded-xl p-4">
                                <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">Tips</p>
                                <div className="space-y-1.5">
                                    {results[0].suggestions.map((s: string, i: number) => (
                                        <p key={i} className="text-xs text-[#4B5563] leading-relaxed flex items-start gap-2">
                                            <span className="text-[#4F46E5] shrink-0">→</span> {s}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    )
}

