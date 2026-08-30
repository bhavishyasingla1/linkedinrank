'use client'

import { useState } from 'react'
import { convertStoryToPost } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildStoryToPostPrompt } from './ToolPromptBlock'
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

    // Calculate feed preview before the "see more" cutoff (~210 chars / 3 lines)
    const feedPreview = aiPost?.body ? (aiPost.body.length > 210 ? aiPost.body.slice(0, 210) + '...' : aiPost.body) : ''

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dedcff]">
                <div>
                    <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        LinkedIn Story-to-Post Converter
                    </h2>
                    <p className="text-[13.5px] text-[#050315]/70 mt-1">
                        Transform raw career moments into structured, high-engagement LinkedIn posts formatted for mobile readability.
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3.5 py-1.5 rounded-full shadow-2xs whitespace-nowrap shrink-0">
                        Mobile Fold Optimized
                    </span>
                </div>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                        Your Raw Story / Work Experience <span className="text-[#DC2626]">*</span>
                    </label>
                    <textarea
                        value={rawStory}
                        onChange={(e) => setRawStory(e.target.value)}
                        placeholder="Tell what happened: e.g. We migrated our core database last Friday and had an unexpected outage at 2 AM. Here is what we learned and how we fixed our failover system..."
                        rows={5}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315] resize-none"
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                        Core Takeaway / Lesson <span className="text-[#050315]/50 font-normal">(optional)</span>
                    </label>
                    <input
                        type="text"
                        value={lesson}
                        onChange={(e) => setLesson(e.target.value)}
                        placeholder="e.g. Redundancy without automated drills is just wishful thinking."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                    />
                </div>

                {/* Post Style Selector */}
                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-2">
                        Post Structure &amp; Format
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
                    onClick={handleConvert}
                    disabled={!rawStory.trim() || loading}
                    className="w-full py-3.5 rounded-2xl bg-[#2f27ce] hover:bg-[#433bff] disabled:opacity-50 text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                    {loading ? (
                        <span>Structuring into LinkedIn Post...</span>
                    ) : (
                        <>
                            <span>Format into Viral LinkedIn Post</span>
                            <SparklesIcon size={18} />
                        </>
                    )}
                </button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Story to Post Converter"
                    color="#2f27ce"
                    promptText={buildStoryToPostPrompt({
                        story: rawStory,
                        goal: lesson || undefined,
                    })}
                />
            )}

            {/* Generated Post Result */}
            {aiPost && (
                <div className="space-y-5 pt-6 border-t border-[#dedcff] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3.5 py-1 rounded-full shadow-2xs">
                                Ready to Post
                            </span>
                            <span className="text-[12px] font-mono text-[#050315]/70">
                                {aiPost.word_count || aiPost.body.split(/\s+/).filter(Boolean).length} words · {aiPost.body.length} chars
                            </span>
                        </div>

                        <button
                            onClick={copyFullPost}
                            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold px-3.5 py-1.5 rounded-xl bg-[#2f27ce] text-white hover:bg-[#433bff] transition-colors cursor-pointer select-none shadow-xs"
                        >
                            {copied ? (
                                <>
                                    <CheckIcon size={14} />
                                    <span>Copied Post</span>
                                </>
                            ) : (
                                <>
                                    <CopyIcon size={14} />
                                    <span>Copy Full Post</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Feed "See More" Cutoff Simulator */}
                    <div className="p-4 rounded-2xl bg-[#dedcff]/20 border border-[#dedcff] space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#2f27ce] uppercase tracking-wider">
                            <span>📱 Mobile Feed Preview (Before &quot;...see more&quot;)</span>
                            <span className="font-mono">Top ~210 chars</span>
                        </div>
                        <p className="text-[13.5px] text-[#050315] font-medium leading-relaxed bg-white p-3 rounded-xl border border-[#dedcff]">
                            {feedPreview} <span className="text-[#2f27ce] font-bold">...see more</span>
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-white border border-[#dedcff] aside-card-shadow space-y-4">
                        <label className="block text-[12px] font-bold text-[#050315]/70 uppercase tracking-wider">
                            Full Formatted Post (Editable)
                        </label>
                        <textarea
                            value={aiPost.body}
                            onChange={(e) => setAiPost({ ...aiPost, body: e.target.value })}
                            rows={10}
                            className="w-full text-[14.5px] text-[#050315] leading-relaxed font-sans bg-[#fbfbfe] p-4 rounded-2xl border border-[#dedcff] focus:border-[#2f27ce] outline-none resize-y"
                        />

                        {aiPost.hashtags && aiPost.hashtags.length > 0 && (
                            <div className="pt-2 flex flex-wrap gap-2">
                                {aiPost.hashtags.map((tag, idx) => (
                                    <span key={idx} className="text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/40 px-2.5 py-1 rounded-xl border border-[#dedcff]">
                                        #{tag.replace(/^#/, '')}
                                    </span>
                                ))}
                            </div>
                        )}

                        {aiPost.takeaway && (
                            <div className="p-3.5 rounded-xl bg-[#fbfbfe] border border-[#dedcff]">
                                <p className="text-[12.5px] text-[#050315]/80">
                                    💡 <strong>Core Takeaway:</strong> {aiPost.takeaway}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Story to Post Converter"
                        color="#2f27ce"
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
