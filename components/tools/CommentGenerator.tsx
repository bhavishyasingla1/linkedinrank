'use client'

import { useState } from 'react'
import ToolPromptBlock, { buildCommentPrompt } from './ToolPromptBlock'

type CommentStyle = 'insightful' | 'supportive' | 'question' | 'story' | 'contrarian'
type CommentLength = 'short' | 'medium' | 'detailed'

const STYLES: { id: CommentStyle; label: string; desc: string }[] = [
    { id: 'insightful', label: 'Add Insight', desc: 'Share a new perspective' },
    { id: 'supportive', label: 'Support & Amplify', desc: 'Back their point strongly' },
    { id: 'question', label: 'Thoughtful Question', desc: 'Ask something smart' },
    { id: 'story', label: 'Share Experience', desc: 'Add a personal story' },
    { id: 'contrarian', label: 'Respectful Pushback', desc: 'Offer a different angle' },
]

const LENGTHS: { id: CommentLength; label: string; words: string }[] = [
    { id: 'short', label: 'Short', words: '~30-50 words' },
    { id: 'medium', label: 'Medium', words: '~50-100 words' },
    { id: 'detailed', label: 'Detailed', words: '~100-150 words' },
]

// ── Component ──────────────────────────────────────────────
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
                setError(data.error === 'AI not configured' ? 'AI is not configured. Please set GEMINI_API_KEY in your .env file.' : 'AI generation failed. Please try again with a different post or style.')
            }
        } catch {
            setError('Connection failed. Please check your internet and try again.')
        } finally {
            setLoading(false)
        }
    }

    const copyComment = (text: string, idx: number) => {
        try {
            navigator.clipboard.writeText(text)
        } catch {
            const ta = document.createElement('textarea')
            ta.value = text
            ta.style.position = 'fixed'
            ta.style.opacity = '0'
            document.body.appendChild(ta)
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
        }
        setCopiedIdx(idx)
        setTimeout(() => setCopiedIdx(null), 2000)
    }

    const wordCount = postContent.trim().split(/\s+/).filter(Boolean).length

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#004182] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="font-semibold text-[#0A0F1C] text-[15px]">Smart Comment Writer</h2>
                        <p className="text-[11px] text-[#6B7280]">Paste the actual post → get 3 authority-building comments</p>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-4">
                {/* Post content input */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1.5">
                        Paste the LinkedIn post <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="Copy & paste the entire LinkedIn post here | the AI reads the actual content to write specific, relevant comments"
                        rows={5}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]/20 resize-none transition-all"
                    />
                    {postContent.trim() && (
                        <p className="text-[10px] text-[#6B7280] mt-1">{wordCount} words pasted</p>
                    )}
                </div>

                {/* Your expertise | PDF or manual */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1.5">
                        Your expertise <span className="text-[#6B7280] font-normal">(optional | makes comments specific to your background)</span>
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={expertise}
                            onChange={(e) => setExpertise(e.target.value)}
                            placeholder="e.g., product management, startups, HR"
                            className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]/20 transition-all"
                        />
                        <label className={`cursor-pointer shrink-0 text-[11px] font-semibold px-3 py-2.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                            pdfExtracted
                                ? 'bg-green-50 border-green-200 text-green-700'
                                : 'border-gray-200 text-[#6B7280] hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-blue-50'
                        }`}>
                            {pdfUploading ? (
                                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                            )}
                            {pdfExtracted ? '✓ PDF' : 'PDF'}
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handlePdfUpload}
                                className="hidden"
                                disabled={pdfUploading}
                            />
                        </label>
                    </div>
                </div>

                {/* Comment Style */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-2">Comment Style</label>
                    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                        {STYLES.map(s => (
                            <button
                                key={s.id}
                                onClick={() => setStyle(s.id)}
                                className={`px-3 py-2 rounded-xl border text-left transition-all ${style === s.id
                                    ? 'border-[#0A66C2] bg-[#F0F7FF] text-[#0A66C2]'
                                    : 'border-gray-200 text-[#6B7280] hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <p className="text-[11px] font-semibold">{s.label}</p>
                                <p className="text-[9px] mt-0.5 opacity-70">{s.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comment Length */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-2">Comment Length</label>
                    <div className="flex gap-2">
                        {LENGTHS.map(l => (
                            <button
                                key={l.id}
                                onClick={() => setLength(l.id)}
                                className={`flex-1 px-3 py-2 rounded-xl border text-center transition-all ${length === l.id
                                    ? 'border-[#0A66C2] bg-[#F0F7FF] text-[#0A66C2]'
                                    : 'border-gray-200 text-[#6B7280] hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <p className="text-[11px] font-semibold">{l.label}</p>
                                <p className="text-[9px] mt-0.5 opacity-70">{l.words}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!postContent.trim() || loading}
                    className="w-full py-3 bg-[#0A66C2] text-white rounded-xl font-semibold text-sm hover:bg-[#004182] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            Generating…
                        </span>
                    ) : 'Generate Comments'}
                </button>

                {/* Error */}
                {error && !loading && (
                    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                        <p className="text-xs text-red-600">{error}</p>
                    </div>
                )}

                {/* Results */}
                {comments.length > 0 && (
                    <div className="space-y-2.5 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Pick your favorite | edit to add personal details</p>
                            {isAI && (
                                <span className="text-[9px] font-bold text-white bg-gradient-to-r from-[#0A66C2] to-[#7C3AED] px-2 py-0.5 rounded-full">AI</span>
                            )}
                        </div>
                        {/* Copyable AI Prompt */}
                        <ToolPromptBlock
                            toolName="Smart Comment Writer"
                            color="#0A66C2"
                            promptText={buildCommentPrompt({
                                postContent: postContent,
                                style: style,
                                expertise: expertise || undefined,
                                length: lengthMap[length],
                            })}
                        />
                        {comments.map((c, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all group">
                                <div className="px-4 py-3">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-bold text-[#0A66C2] bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{c.label}</span>
                                            <span className="text-[9px] text-[#C4C9D4]">{c.text.split(/\s+/).length} words</span>
                                        </div>
                                        <button
                                            onClick={() => copyComment(c.text, i)}
                                            className="text-[11px] text-[#0A66C2] hover:underline font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            {copiedIdx === i ? '✓ Copied' : 'Copy'}
                                        </button>
                                    </div>
                                    <p className="text-[13px] text-[#0A0F1C] leading-relaxed">{c.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
