'use client'

import { useState } from 'react'
import { generateComments as generateFallbackComments } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildCommentPrompt } from './ToolPromptBlock'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
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
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
                <div>
                    <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                        AI LinkedIn Comment Generator
                    </h2>
                    <p className="text-[13px] text-[#64748B] mt-0.5">
                        Generate thoughtful, reputation-building comments that demonstrate expertise and drive profile visits.
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
                            {pdfExtracted ? '✓ Background loaded from PDF' : 'Auto-fill your background from PDF'}
                        </p>
                        <p className="text-[12px] text-[#64748B]">
                            {pdfExtracted ? 'Comments will reflect your specific domain expertise' : 'Extract your headline & role so comments match your professional voice'}
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
                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                        Paste LinkedIn Post Text <span className="text-[#DC2626]">*</span>
                    </label>
                    <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="Paste the post you want to comment on..."
                        rows={4}
                        className="input-base resize-none"
                    />
                </div>

                {/* Comment Style Pills */}
                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-2">
                        Comment Angle / Strategy
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
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

                {/* Target Length & Background */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Target Comment Length
                        </label>
                        <div className="flex gap-2">
                            {LENGTHS.map((l) => (
                                <button
                                    key={l.id}
                                    onClick={() => setLength(l.id)}
                                    className={`flex-1 py-2 px-2.5 rounded-lg border text-center text-[12px] font-semibold transition-all cursor-pointer select-none ${
                                        length === l.id
                                            ? 'bg-[#0A66C2] text-white border-[#0A66C2]'
                                            : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                                    }`}
                                >
                                    {l.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Your Background / Voice <span className="text-[#64748B] font-normal">(optional)</span>
                        </label>
                        <input
                            type="text"
                            value={expertise}
                            onChange={(e) => setExpertise(e.target.value)}
                            placeholder="e.g. 10 yrs in Distributed Systems / B2B SaaS Founder"
                            className="input-base"
                        />
                    </div>
                </div>

                <Button
                    onClick={handleGenerate}
                    disabled={!postContent.trim() || loading}
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={loading}
                    rightIcon={<SparklesIcon size={16} />}
                >
                    Generate High-Signal Comments
                </Button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Comment Generator"
                    color="#0A66C2"
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
                <div className="space-y-4 pt-6 border-t border-[#F1F5F9] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wider">
                            Generated Comments ({comments.length})
                        </p>
                        {isAI && (
                            <Badge variant="brand" size="sm">
                                Anti-AI Writing Validated
                            </Badge>
                        )}
                    </div>

                    <div className="space-y-3">
                        {comments.map((c, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0A66C2] shadow-xs space-y-3 transition-all group"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="neutral" size="sm">
                                            {c.label || `Option ${i + 1}`}
                                        </Badge>
                                        <span className="text-[11px] text-[#64748B]">
                                            {c.text.split(/\s+/).length} words · {c.text.length} chars
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => copyComment(c.text, i)}
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
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <p className="text-[14px] text-[#0F172A] leading-relaxed whitespace-pre-wrap">
                                    {c.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Comment Generator"
                        color="#0A66C2"
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
