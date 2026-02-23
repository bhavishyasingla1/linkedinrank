'use client'

import { useState } from 'react'
import ToolPromptBlock, { buildStoryToPostPrompt } from './ToolPromptBlock'

type PostStyle = 'classic' | 'listicle' | 'micro'

const STYLES: { id: PostStyle; label: string; desc: string }[] = [
    { id: 'classic', label: 'Classic Story', desc: 'Hook → Story → Insight → CTA' },
    { id: 'listicle', label: 'Numbered Lessons', desc: 'Hook → 3-5 takeaways → CTA' },
    { id: 'micro', label: 'Micro Post', desc: 'Hook → One punch → CTA' },
]

// Fallback rule-based conversion
function convertStoryFallback(rawStory: string, style: PostStyle, lesson: string): { text: string; wordCount: number; label: string; tip: string }[] {
    const story = rawStory.trim()
    if (story.length < 10) return [{ text: story, wordCount: story.split(/\s+/).length, label: 'Raw Story', tip: 'Try adding more detail to your story for better results.' }]
    const takeaway = lesson.trim() || 'it changed my perspective completely'
    const sentences = story.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 5)
    const firstSentence = sentences[0] || story.slice(0, 80)
    const midContent = sentences.slice(1, -1).join('. ')
    const lastSentence = sentences.length > 1 ? sentences[sentences.length - 1] : ''
    const shortSummary = firstSentence.length > 50 ? firstSentence.slice(0, 47) + '...' : firstSentence

    const results: { text: string; wordCount: number; label: string; tip: string }[] = []

    if (style === 'classic') {
        const post = [
            `${shortSummary}.\n\nBut that's not the full story.`,
            '', midContent ? midContent + '.' : '', lastSentence ? lastSentence + '.' : '',
            '', `The lesson? ${takeaway}.`, '', `If you've experienced something similar, I'd love to hear your story.`, '', '♻️ Repost if this resonates.',
        ].filter(l => l.length > 0).join('\n')
        results.push({ text: post.trim(), wordCount: post.split(/\s+/).length, label: 'Classic Story Post', tip: 'Stories with a clear arc get 2x more engagement.' })
    }
    if (style === 'listicle') {
        const points = sentences.slice(0, 5)
        const numbered = points.map((s, i) => `${i + 1}. ${s}.`).join('\n')
        const post = [`Here's what ${takeaway} actually looks like in practice:`, '', numbered, '', `The biggest takeaway? ${takeaway}.`, '', `Which one resonates most with you?`].join('\n')
        results.push({ text: post.trim(), wordCount: post.split(/\s+/).length, label: 'Numbered Lessons', tip: 'Numbered posts are easy to scan and share.' })
    }
    if (style === 'micro') {
        const post = [`I didn't expect this to happen:\n\n${firstSentence}.`, '', `Lesson: ${takeaway}.`, '', `That's it. Sometimes the simplest lessons hit the hardest.`].join('\n')
        results.push({ text: post.trim(), wordCount: post.split(/\s+/).length, label: 'Micro Post', tip: 'Short posts (<100 words) often outperform long ones.' })
    }
    return results
}

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
    const [posts, setPosts] = useState<{ text: string; wordCount: number; label: string; tip: string }[]>([])
    const [aiPost, setAiPost] = useState<AIPost | null>(null)
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [isAI, setIsAI] = useState(false)
    const [error, setError] = useState('')


    const doConvert = async () => {
        if (!rawStory.trim()) return
        setLoading(true)
        setPosts([])
        setAiPost(null)
        setError('')

        try {
            // Try AI first
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
                const aiResult = data.data as AIPost
                setAiPost(aiResult)
                // Also display as a formatted post card
                setPosts([{
                    text: aiResult.body + (aiResult.hashtags?.length ? '\n\n' + aiResult.hashtags.map(t => `#${t.replace(/^#/, '')}`).join(' ') : ''),
                    wordCount: aiResult.word_count || aiResult.body.split(/\s+/).length,
                    label: `AI Post · ${aiResult.tone_used || style}`,
                    tip: `Core takeaway: ${aiResult.takeaway}`
                }])
                setIsAI(true)
                return
            }
        } catch {
            // Fall through to rule-based
        }

        // Fallback
        const results = convertStoryFallback(rawStory, style, lesson)
        setPosts(results)
        setIsAI(false)
    }

    const handleConvert = async () => {
        if (!rawStory.trim()) return
        try {
            await doConvert()
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const copyPost = (text: string, idx: number) => {
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

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#EC4899] to-[#BE185D] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="font-semibold text-[#0A0F1C] text-[15px]">Story-to-Post Writer</h2>
                        <p className="text-[11px] text-[#9CA3AF]">Paste a raw experience | AI structures it into a ready-to-publish post</p>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-4">
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1.5">Your raw story or experience</label>
                    <textarea
                        value={rawStory}
                        onChange={(e) => setRawStory(e.target.value)}
                        placeholder="Write it rough. e.g., 'Last week I had a meeting where the client rejected our proposal and I learned...'"
                        rows={5}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#EC4899] focus:ring-1 focus:ring-[#EC4899]/20 resize-none transition-all"
                    />
                    {error && !loading && (
                        <div className="mt-1.5 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                            <p className="text-[11px] text-red-600">{error}</p>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1.5">
                        Key lesson or takeaway <span className="text-[#9CA3AF] font-normal">(what did you learn?)</span>
                    </label>
                    <input
                        type="text"
                        value={lesson}
                        onChange={(e) => setLesson(e.target.value)}
                        placeholder="e.g., Always ask 'why' before reacting"
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#EC4899] focus:ring-1 focus:ring-[#EC4899]/20 transition-all"
                    />
                </div>

                {/* Post Style */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-2">Post Format</label>
                    <div className="flex gap-1 p-1 bg-[#F1F5F9] rounded-xl">
                        {STYLES.map(s => (
                            <button
                                key={s.id}
                                onClick={() => setStyle(s.id)}
                                className={`flex-1 py-2 rounded-lg transition-all text-center ${style === s.id
                                    ? 'bg-white shadow-sm'
                                    : 'hover:text-[#4B5563]'
                                    }`}
                            >
                                <p className={`text-[11px] font-semibold ${style === s.id ? 'text-[#0A0F1C]' : 'text-[#6B7280]'}`}>{s.label}</p>
                                <p className={`text-[9px] ${style === s.id ? 'text-[#9CA3AF]' : 'text-[#C4C9D4]'}`}>{s.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleConvert}
                    disabled={!rawStory.trim() || loading}
                    className="w-full py-3 bg-[#EC4899] text-white rounded-xl font-semibold text-sm hover:bg-[#BE185D] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            AI is writing your post...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                            </svg>
                            Convert to Post
                        </>
                    )}
                </button>

                {/* Results */}
                {posts.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">
                                {posts.length} version{posts.length > 1 ? 's' : ''} | pick and personalize
                            </p>
                            {isAI && (
                                <span className="text-[9px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                    </svg>
                                    AI-Written
                                </span>
                            )}
                        </div>

                        {/* AI hook highlight */}
                        {aiPost && (
                            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 rounded-xl p-3">
                                <p className="text-[9px] font-bold text-pink-500 uppercase tracking-wider mb-1">Hook</p>
                                <p className="text-sm font-medium text-[#0A0F1C] italic">&ldquo;{aiPost.hook}&rdquo;</p>
                            </div>
                        )}

                        {posts.map((p, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden group">
                                <div className="px-4 py-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-bold text-[#EC4899] bg-pink-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{p.label}</span>
                                            <span className="text-[9px] text-[#C4C9D4]">{p.wordCount} words</span>
                                        </div>
                                        <button
                                            onClick={() => copyPost(p.text, i)}
                                            className="text-[11px] text-[#EC4899] hover:underline font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            {copiedIdx === i ? '✓ Copied' : 'Copy'}
                                        </button>
                                    </div>
                                    <pre className="text-[13px] text-[#0A0F1C] leading-relaxed whitespace-pre-wrap font-sans mb-2">{p.text}</pre>
                                    <p className="text-[10px] text-[#9CA3AF] leading-relaxed">💡 {p.tip}</p>
                                </div>
                            </div>
                        ))}
                        {/* Copyable AI Prompt */}
                        <ToolPromptBlock
                            toolName="Story-to-Post Writer"
                            color="#EC4899"
                            promptText={buildStoryToPostPrompt({
                                story: rawStory,
                                tone: style,
                                goal: lesson || undefined,
                            })}
                        />
                    </div>
                )}


            </div>
        </div>
    )
}
