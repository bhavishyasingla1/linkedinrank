'use client'

import { useState } from 'react'
import { generateComments as generateFallbackComments } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildCommentPrompt } from './ToolPromptBlock'
import { UploadIcon, CheckIcon, CopyIcon, SparklesIcon } from '@/components/ui/Icons'

type CommentStyle = 'insightful' | 'supportive' | 'question' | 'story' | 'contrarian'
type CommentLength = 'short' | 'medium' | 'detailed'

const STYLES: { id: CommentStyle; label: string; desc: string }[] = [
    { id: 'insightful', label: 'Add Insight', desc: 'Introduce an adjacent framework or workflow' },
    { id: 'supportive', label: 'Support & Ground', desc: 'Validate the premise with concrete context' },
    { id: 'question', label: 'Probing Question', desc: 'Ask a high-signal question to probe edge cases' },
    { id: 'story', label: 'Brief Story', desc: 'Share a concrete personal observation' },
    { id: 'contrarian', label: 'Respectful Counter', desc: 'Explore nuance or counter-perspective' },
]

const LENGTHS: { id: CommentLength; label: string; words: string }[] = [
    { id: 'short', label: 'Short', words: '~30-50 words' },
    { id: 'medium', label: 'Medium', words: '~50-100 words' },
    { id: 'detailed', label: 'Detailed', words: '~100-150 words' },
]

export default function CommentGenerator() {
    const [postContent, setPostContent] = useState('')
    const [style, setStyle] = useState<CommentStyle>('insightful')
    const [length, setLength] = useState<CommentLength>('medium')
    const [expertise, setExpertise] = useState('')
    const [comments, setComments] = useState<{ text: string; label: string }[]>([])
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [isAI, setIsAI] = useState(false)
    const [error, setError] = useState('')

    // PDF upload for expertise
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
                const parts: string[] = []
                if (profile.headline) parts.push(profile.headline)
                if (profile.experience?.[0]?.title) parts.push(profile.experience[0].title)
                if (profile.skills?.length) parts.push(profile.skills.slice(0, 5).join(', '))
                setExpertise(parts.join(' | '))
                setPdfExtracted(true)
            }
        } catch (err) {
            console.error('PDF upload failed:', err)
        } finally {
            setPdfUploading(false)
            if (e.target) e.target.value = ''
        }
    }

    const lengthMap: Record<CommentLength, string> = {
        'short': 'short (30-50 words)',
        'medium': 'medium (50-100 words)',
        'detailed': 'detailed (100-150 words)',
    }

    const handleGenerate = async () => {
        if (!postContent.trim()) return
        setLoading(true)
        setIsAI(false)
        setError('')
        setComments([])

        try {
            const res = await fetch('/api/tools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tool: 'comment',
                    input: {
                        postContent: postContent,
                        style,
                        expertise: expertise || undefined,
                        length: lengthMap[length],
                    }
                })
            })
            const data = await res.json()

            if (data.success && Array.isArray(data.data)) {
                setComments(data.data)
                setIsAI(true)
            } else {
                throw new Error('AI returned no data')
            }
        } catch {
            try {
                const fallback = generateFallbackComments({
                    postContent: postContent,
                    style,
                    expertise: expertise || undefined,
                    length: lengthMap[length],
                })
                if (fallback.length > 0) {
                    setComments(fallback)
                    setIsAI(false)
                } else {
                    setError('ai_failed')
                }
            } catch {
                setError('ai_failed')
            }
        } finally {
            setLoading(false)
        }
    }

    const copyComment = (text: string, idx: number) => {
        navigator.clipboard.writeText(text)
        setCopiedIdx(idx)
        setTimeout(() => setCopiedIdx(null), 2000)
    }

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dedcff]">
                <div>
                    <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        AI LinkedIn Comment Generator
                    </h2>
                    <p className="text-[13.5px] text-[#050315]/70 mt-1">
                        Generate thoughtful, reputation-building comments that demonstrate expertise and drive profile visits.
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3.5 py-1.5 rounded-full shadow-2xs whitespace-nowrap shrink-0">
                        High-Signal Engagement
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
                            {pdfExtracted ? '✓ Background loaded from PDF' : 'Auto-fill your background from PDF'}
                        </p>
                        <p className="text-[12px] text-[#050315]/60">
                            {pdfExtracted ? 'Comments will reflect your specific domain expertise' : 'Extract your headline & role so comments match your professional voice'}
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
                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                        Paste LinkedIn Post Text <span className="text-[#DC2626]">*</span>
                    </label>
                    <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="Paste the post you want to comment on..."
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315] resize-none"
                    />
                </div>

                {/* Comment Style Pills */}
                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-2">
                        Comment Strategy &amp; Angle
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

                {/* Target Length & Background */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Target Comment Length
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {LENGTHS.map((l) => (
                                <button
                                    key={l.id}
                                    onClick={() => setLength(l.id)}
                                    className={`py-2.5 px-3 rounded-xl border text-center text-[12.5px] font-bold transition-all cursor-pointer select-none ${
                                        length === l.id
                                            ? 'bg-[#2f27ce] text-white border-[#2f27ce] shadow-xs'
                                            : 'bg-white text-[#050315]/80 border-[#dedcff] hover:border-[#2f27ce]'
                                    }`}
                                >
                                    {l.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Your Background / Voice <span className="text-[#050315]/50 font-normal">(optional)</span>
                        </label>
                        <input
                            type="text"
                            value={expertise}
                            onChange={(e) => setExpertise(e.target.value)}
                            placeholder="e.g. 10 yrs in Distributed Systems / B2B SaaS Founder"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!postContent.trim() || loading}
                    className="w-full py-3.5 rounded-2xl bg-[#2f27ce] hover:bg-[#433bff] disabled:opacity-50 text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                    {loading ? (
                        <span>Analyzing Post &amp; Generating Comments...</span>
                    ) : (
                        <>
                            <span>Generate High-Signal Comments</span>
                            <SparklesIcon size={18} />
                        </>
                    )}
                </button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Comment Generator"
                    color="#2f27ce"
                    promptText={buildCommentPrompt({
                        postContent,
                        style,
                        expertise: expertise || undefined,
                        length: lengthMap[length],
                    })}
                />
            )}

            {/* Generated Results */}
            {comments.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#dedcff] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-[13px] font-extrabold text-[#050315] uppercase tracking-wider">
                            Generated Comments ({comments.length})
                        </p>
                        {isAI && (
                            <span className="inline-flex items-center justify-center text-center leading-none text-[11px] font-bold text-[#2f27ce] bg-[#dedcff] px-2.5 py-1 rounded-full shadow-2xs">
                                Anti-AI Validated
                            </span>
                        )}
                    </div>

                    <div className="space-y-3">
                        {comments.map((c, i) => (
                            <div
                                key={i}
                                className="p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow space-y-3 transition-all group"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center text-center leading-none text-[11.5px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3 py-1 rounded-full shadow-2xs">
                                            {c.label || `Option ${i + 1}`}
                                        </span>
                                        <span className="text-[11.5px] font-mono text-[#050315]/70">
                                            {c.text.split(/\s+/).filter(Boolean).length} words · {c.text.length} chars
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => copyComment(c.text, i)}
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
                                                <span>Copy Comment</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <p className="text-[14.5px] text-[#050315] leading-relaxed whitespace-pre-wrap bg-[#fbfbfe] p-4 rounded-2xl border border-[#dedcff]">
                                    {c.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Comment Generator"
                        color="#2f27ce"
                        promptText={buildCommentPrompt({
                            postContent,
                            style,
                            expertise: expertise || undefined,
                            length: lengthMap[length],
                        })}
                    />
                </div>
            )}
        </div>
    )
}
