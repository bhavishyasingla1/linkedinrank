'use client'

import { useState } from 'react'
import { improveBullet } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildBulletPrompt } from './ToolPromptBlock'
import { UploadIcon, CheckIcon, CopyIcon, SparklesIcon } from '@/components/ui/Icons'

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

    // PDF extraction state
    const [pdfUploading, setPdfUploading] = useState(false)
    const [pdfExtracted, setPdfExtracted] = useState(false)
    const [extractedBullets, setExtractedBullets] = useState<string[]>([])

    const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setPdfUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch('/api/analyze', { method: 'POST', body: formData })
            const data = await res.json()
            const profile = data?.data?.profile || data?.profile
            if (profile && profile.experience?.length) {
                const bulletsFound: string[] = []
                profile.experience.forEach((exp: any) => {
                    if (exp.description) {
                        const lines = exp.description.split(/[\n•\-\*]+/).map((l: string) => l.trim()).filter((l: string) => l.length > 25)
                        bulletsFound.push(...lines)
                    }
                })

                if (bulletsFound.length > 0) {
                    setExtractedBullets(bulletsFound.slice(0, 5))
                    setBullet(bulletsFound[0])
                    setPdfExtracted(true)
                } else if (profile.experience[0]?.title) {
                    setBullet(`Worked as ${profile.experience[0].title} at ${profile.experience[0].company || 'company'} handling day-to-day operations and team goals`)
                    setPdfExtracted(true)
                }
            }
        } catch (err) {
            console.error('PDF upload failed:', err)
        } finally {
            setPdfUploading(false)
            if (e.target) e.target.value = ''
        }
    }

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
            const fallback = improveBullet(bullet.trim(), style)
            if (fallback && fallback.improved?.length > 0) {
                const improvedList = [fallback.improved, ...(fallback.alternatives || [])]
                const labels = style === 'concise' 
                    ? ['Metrics-Focused', 'Efficiency & Velocity', 'Execution Clarity']
                    : style === 'storytelling'
                    ? ['Strategic Initiative', 'Problem-Solving Narrative', 'Cross-Functional Scale']
                    : ['ATS Keyword Dense', 'Infrastructure & Scalability', 'Enterprise Standards']

                const mapped = improvedList.map((text: string, i: number) => ({
                    label: labels[i] || `Version ${i + 1}`,
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dedcff]">
                <div>
                    <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        Experience Bullet Point Rewriter
                    </h2>
                    <p className="text-[13.5px] text-[#050315]/70 mt-1">
                        Transform passive job descriptions into quantified achievement bullets that pass ATS filters.
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3.5 py-1.5 rounded-full shadow-2xs whitespace-nowrap shrink-0">
                        ATS &amp; Action-Verb Optimized
                    </span>
                </div>
            </div>

            {/* Auto-Fill from PDF Strip */}
            <div className="p-4 rounded-2xl bg-[#dedcff]/30 border border-[#dedcff] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 shadow-xs">
                        <UploadIcon size={18} />
                    </div>
                    <div>
                        <p className="text-[13.5px] font-bold text-[#050315]">
                            {pdfExtracted ? '✓ Experience extracted from PDF' : 'Auto-fill from LinkedIn / Resume PDF'}
                        </p>
                        <p className="text-[12px] text-[#050315]/60">
                            {pdfExtracted ? 'Loaded experience bullets from your document' : 'Upload your PDF to import experience bullets directly'}
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

            {/* Quick bullet selector if PDF uploaded */}
            {extractedBullets.length > 1 && (
                <div className="p-4 rounded-2xl bg-white border border-[#dedcff] space-y-2">
                    <p className="text-[12px] font-bold text-[#050315]/70 uppercase tracking-wider">
                        Extracted Bullets from PDF — Click to rewrite:
                    </p>
                    <div className="space-y-1.5">
                        {extractedBullets.map((b, idx) => (
                            <button
                                key={idx}
                                onClick={() => setBullet(b)}
                                className={`w-full text-left text-[12.5px] p-2.5 rounded-xl border transition-all truncate block ${
                                    bullet === b
                                        ? 'bg-[#dedcff]/40 border-[#2f27ce] font-bold text-[#2f27ce]'
                                        : 'bg-[#fbfbfe] border-[#dedcff] text-[#050315]/80 hover:border-[#2f27ce]'
                                }`}
                            >
                                • {b}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Form Inputs */}
            <div className="space-y-4">
                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                        Paste Your Current Experience Bullet / Job Description <span className="text-[#DC2626]">*</span>
                    </label>
                    <textarea
                        value={bullet}
                        onChange={(e) => setBullet(e.target.value)}
                        placeholder="e.g. Responsible for leading frontend architecture and fixing performance bottlenecks across payment flows"
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315] resize-none"
                    />
                </div>

                {/* Style Selector */}
                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-2">
                        Rewrite Style Angle
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {STYLES.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setStyle(s.id)}
                                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer select-none ${
                                    style === s.id
                                        ? 'bg-[#dedcff]/40 border-[#2f27ce] shadow-sm'
                                        : 'bg-white border-[#dedcff] hover:border-[#2f27ce]'
                                }`}
                            >
                                <p className={`text-[13.5px] font-bold ${style === s.id ? 'text-[#2f27ce]' : 'text-[#050315]'}`}>
                                    {s.label}
                                </p>
                                <p className="text-[11.5px] text-[#050315]/65 mt-1 leading-snug">{s.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={!bullet.trim() || loading}
                    className="w-full py-3.5 rounded-2xl bg-[#2f27ce] hover:bg-[#433bff] disabled:opacity-50 text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                    {loading ? (
                        <span>Transforming with Power Verbs...</span>
                    ) : (
                        <>
                            <span>Rewrite into 3 Achievement Bullets</span>
                            <SparklesIcon size={18} />
                        </>
                    )}
                </button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Bullet Rewriter"
                    color="#2f27ce"
                    promptText={buildBulletPrompt({ bullet })}
                />
            )}

            {/* Generated Results */}
            {results && results.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#dedcff] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <p className="text-[13px] font-extrabold text-[#050315] uppercase tracking-wider">
                                Rewritten Variations ({results.length})
                            </p>
                            {isAI && (
                                <span className="inline-flex items-center justify-center text-center leading-none text-[11px] font-bold text-[#2f27ce] bg-[#dedcff] px-2.5 py-1 rounded-full shadow-2xs">
                                    Anti-AI Validated
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        {results.map((r, i) => (
                            <div
                                key={i}
                                className="p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow space-y-3 transition-all group"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3.5 py-1 rounded-full shadow-2xs">
                                            {r.label}
                                        </span>
                                        <span className="text-[11.5px] font-mono text-[#050315]/70">
                                            {r.text.length} chars · {r.text.split(/\s+/).length} words
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => copyText(r.text, `v-${i}`)}
                                        className="inline-flex items-center gap-1.5 text-[12.5px] font-bold px-3 py-1 rounded-xl text-[#2f27ce] bg-[#dedcff]/40 hover:bg-[#dedcff] transition-colors cursor-pointer select-none"
                                    >
                                        {copiedIdx === `v-${i}` ? (
                                            <>
                                                <CheckIcon size={14} className="text-[#16A34A]" />
                                                <span className="text-[#16A34A]">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <CopyIcon size={14} />
                                                <span>Copy Bullet</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <p className="text-[14.5px] font-medium text-[#050315] leading-relaxed bg-[#fbfbfe] p-4 rounded-2xl border border-[#dedcff]">
                                    {r.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Bullet Rewriter"
                        color="#2f27ce"
                        promptText={buildBulletPrompt({ bullet })}
                    />
                </div>
            )}
        </div>
    )
}
