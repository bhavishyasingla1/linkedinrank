'use client'

import { useState } from 'react'
import { convertStoryToPost } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildStoryToPostPrompt } from './ToolPromptBlock'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CheckIcon, CopyIcon, SparklesIcon } from '@/components/ui/Icons'

type PostStyle = 'classic' | 'listicle' | 'micro'

const STYLES: { id: PostStyle; label: string; desc: string }[] = [
    { id: 'classic', label: 'Classic Narrative', desc: 'Hook → Context → Concrete Lesson → CTA' },
    { id: 'listicle', label: 'Numbered Takeaways', desc: 'Hook → 3 Concrete Lessons → Discussion CTA' },
    { id: 'micro', label: 'Micro Insight', desc: 'Short Punchy Hook → Single Sharp Principle' },
]

interface AIPost {
    hook: string
    body: string
    takeaway: string
    hashtags: string[]
    word_count: number
    tone_used: string
}

export default function StoryToPost() {
    const [rawStory, setRawStory] = useState('')
    const [lesson, setLesson] = useState('')
    const [style, setStyle] = useState<PostStyle>('classic')
    const [aiPost, setAiPost] = useState<AIPost | null>(null)
    const [copied, setCopied] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isAI, setIsAI] = useState(false)
    const [error, setError] = useState('')

    const handleConvert = async () => {
        if (!rawStory.trim()) return
        setLoading(true)
        setAiPost(null)
        setError('')

        try {
            const res = await fetch('/api/tools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tool: 'story-to-post',
                    input: {
                        story: rawStory.trim(),
                        tone: style === 'micro' ? 'Concise and punchy' : style === 'listicle' ? 'Structured and educational' : 'Narrative and engaging',
                        goal: lesson.trim() || undefined,
                    }
                })
            })

            const data = await res.json()

            if (data.success && data.data) {
                setAiPost(data.data as AIPost)
                setIsAI(true)
                setLoading(false)
                return
            }
        } catch {}

        try {
            const fallback = convertStoryToPost({
                story: rawStory.trim(),
                tone: style,
                goal: lesson.trim() || undefined,
            })
            if (fallback && fallback.body) {
                setAiPost(fallback)
                setIsAI(false)
                setLoading(false)
                return
            }
        } catch {}

        setError('ai_failed')
        setLoading(false)
    }

    const copyFullPost = () => {
        if (!aiPost) return
        const fullText = aiPost.body + (aiPost.hashtags?.length ? '\n\n' + aiPost.hashtags.map(t => `#${t.replace(/^#/, '')}`).join(' ') : '')
        navigator.clipboard.writeText(fullText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
                <div>
                    <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                        LinkedIn Story-to-Post Converter
                    </h2>
                    <p className="text-[13px] text-[#64748B] mt-0.5">
                        Transform raw career moments into structured, high-engagement LinkedIn posts formatted for mobile readability.
                    </p>
                </div>
                <Badge variant="brand" size="sm">
                    Instant Ghostwriter
                </Badge>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                        Your Raw Story / Work Experience <span className="text-[#DC2626]">*</span>
                    </label>
                    <textarea
                        value={rawStory}
                        onChange={(e) => setRawStory(e.target.value)}
                        placeholder="Tell what happened: e.g. We migrated our core database last Friday and had an unexpected outage at 2 AM. Here is what we learned and how we fixed our failover system..."
                        rows={5}
                        className="input-base resize-none"
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                        Core Takeaway / Lesson <span className="text-[#64748B] font-normal">(optional)</span>
                    </label>
                    <input
                        type="text"
                        value={lesson}
                        onChange={(e) => setLesson(e.target.value)}
                        placeholder="e.g. Redundancy without automated drills is just wishful thinking."
                        className="input-base"
                    />
                </div>

                {/* Post Style Selector */}
                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-2">
                        Post Structure &amp; Format
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
                    onClick={handleConvert}
                    disabled={!rawStory.trim() || loading}
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={loading}
                    rightIcon={<SparklesIcon size={16} />}
                >
                    Format into LinkedIn Post
                </Button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Story to Post Converter"
                    color="#0A66C2"
                    promptText={buildStoryToPostPrompt({
                        story: rawStory,
                        goal: lesson || undefined,
                    })}
                />
            )}

            {/* Generated Post Result */}
            {aiPost && (
                <div className="space-y-4 pt-6 border-t border-[#F1F5F9] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Badge variant="brand" size="sm">
                                Ready to Post
                            </Badge>
                            <span className="text-[12px] text-[#64748B]">
                                {aiPost.word_count || aiPost.body.split(/\s+/).length} words
                            </span>
                        </div>

                        <button
                            onClick={copyFullPost}
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-[#F0F7FF] border border-[#BAE0FD] text-[#0A66C2] hover:bg-[#E0F2FE] transition-colors cursor-pointer select-none"
                        >
                            {copied ? (
                                <>
                                    <CheckIcon size={13} className="text-[#16A34A]" />
                                    <span className="text-[#16A34A]">Copied Post</span>
                                </>
                            ) : (
                                <>
                                    <CopyIcon size={13} />
                                    <span>Copy Full Post</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
                        <div className="text-[14px] text-[#0F172A] leading-relaxed whitespace-pre-wrap font-sans bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0]">
                            {aiPost.body}
                            {aiPost.hashtags && aiPost.hashtags.length > 0 && (
                                <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex flex-wrap gap-1.5">
                                    {aiPost.hashtags.map((tag, idx) => (
                                        <span key={idx} className="text-[12px] font-medium text-[#0A66C2]">
                                            #{tag.replace(/^#/, '')}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {aiPost.takeaway && (
                            <p className="text-[12px] text-[#475569]">
                                💡 <strong>Core Takeaway:</strong> {aiPost.takeaway}
                            </p>
                        )}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Story to Post Converter"
                        color="#0A66C2"
                        promptText={buildStoryToPostPrompt({
                            story: rawStory,
                            goal: lesson || undefined,
                        })}
                    />
                </div>
            )}
        </div>
    )
}
