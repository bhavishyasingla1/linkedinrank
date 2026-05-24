'use client'

import { useState } from 'react'
import { generateConnectionMessages as generateFallbackMessages } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildConnectionPrompt } from './ToolPromptBlock'

type ConnectionType = 
    | 'cold' | 'same-industry' | 'alumni' | 'recruiter' | 'founder' 
    | 'liked-content' | 'mutual-connection' | 'event' | 'mentor'
    | 'collaboration' | 'followup-noreply' | 'followup-call' | 'followup-application' | 'followup-event'

const CONNECTION_TYPES: { id: ConnectionType; label: string; icon: string; category: string; hint: string }[] = [
    { id: 'cold', label: 'Cold Outreach', icon: '🤝', category: 'Initial Connection Request', hint: 'You don\'t know them but want to connect' },
    { id: 'same-industry', label: 'Same Industry', icon: '🏢', category: 'Initial Connection Request', hint: 'You work in the same field' },
    { id: 'alumni', label: 'Alumni / School', icon: '🎓', category: 'Initial Connection Request', hint: 'Same school, program, or cohort' },
    { id: 'recruiter', label: 'To a Recruiter', icon: '🎯', category: 'Initial Connection Request', hint: 'Reaching out about job opportunities' },
    { id: 'founder', label: 'Founder / CEO', icon: '🚀', category: 'Initial Connection Request', hint: 'Connecting with a company leader' },
    { id: 'liked-content', label: 'Liked Their Post', icon: '📝', category: 'Initial Connection Request', hint: 'You saw their content and want to connect' },
    { id: 'mutual-connection', label: 'Mutual Connection', icon: '👥', category: 'Initial Connection Request', hint: 'You share a common connection' },
    { id: 'event', label: 'Event / Conference', icon: '🎤', category: 'Initial Connection Request', hint: 'Met at or attended the same event' },
    { id: 'mentor', label: 'Seeking Mentorship', icon: '🧭', category: 'Initial Connection Request', hint: 'Asking for guidance or advice' },
    { id: 'collaboration', label: 'Collaboration', icon: '⚡', category: 'Initial Connection Request', hint: 'Proposing a project, podcast, collab' },
    { id: 'followup-noreply', label: 'No Reply Follow-Up', icon: '📩', category: 'Follow-Ups', hint: 'They didn\'t respond to your first message' },
    { id: 'followup-call', label: 'After a Call', icon: '📞', category: 'Follow-Ups', hint: 'Just had a phone/video call' },
    { id: 'followup-application', label: 'After Applying', icon: '📋', category: 'Follow-Ups', hint: 'Applied to a job at their company' },
    { id: 'followup-event', label: 'After an Event', icon: '🤲', category: 'Follow-Ups', hint: 'Met briefly at an event' },
]

interface MessageResult {
    tone: string
    message: string
    charCount: number
    tip: string
}

// ── Context hints per type ──────────────────────────────────
const CONTEXT_HINTS: Record<ConnectionType, string> = {
    'cold': 'What caught your eye about them? e.g., "Their post on AI ethics", "They work at Google on search"',
    'same-industry': 'What is your shared industry/space? e.g., "We both work in fintech", "Both in healthcare AI"',
    'alumni': 'Which school/program? e.g., "Stanford MBA 2022", "IIT Delhi CS batch"',
    'recruiter': 'What role/area are you interested in? e.g., "Senior PM roles in AI", "Frontend roles at Series B startups"',
    'founder': 'What about their company interests you? e.g., "Their product solves X", "Recently raised Series A"',
    'liked-content': 'Which post/article? e.g., "Their post about hiring mistakes", "Their carousel on sales frameworks"',
    'mutual-connection': 'Who is the mutual connection? e.g., "We both know Rahul from TechConf", "Connected through Sarah"',
    'event': 'Which event? e.g., "Web Summit 2025", "Local startup meetup last Friday"',
    'mentor': 'What guidance do you need? e.g., "Career transition to PM", "How they built their personal brand"',
    'collaboration': 'What is the collab idea? e.g., "Guest on my podcast", "Co-author a LinkedIn article", "Joint webinar"',
    'followup-noreply': 'What was your original message about?',
    'followup-call': 'What did you discuss on the call?',
    'followup-application': 'Which role did you apply for?',
    'followup-event': 'Where did you meet and what did you discuss?',
}

// ── Component ──────────────────────────────────────────────
export default function ConnectionMessageGenerator() {
    const [type, setType] = useState<ConnectionType>('cold')
    const [name, setName] = useState('')
    const [recipientRole, setRecipientRole] = useState('')
    const [context, setContext] = useState('')
    const [intent, setIntent] = useState('')
    const [yourRole, setYourRole] = useState('')
    const [messages, setMessages] = useState<MessageResult[]>([])
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [isAI, setIsAI] = useState(false)
    const [error, setError] = useState('')

    // PDF upload for sender info
    const [senderPdfUploading, setSenderPdfUploading] = useState(false)
    const [senderPdfDone, setSenderPdfDone] = useState(false)
    // PDF upload for recipient info
    const [recipientPdfUploading, setRecipientPdfUploading] = useState(false)
    const [recipientPdfDone, setRecipientPdfDone] = useState(false)

    const handleSenderPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setSenderPdfUploading(true)
        try {
            const fd = new FormData()
            fd.append('file', file)
            const res = await fetch('/api/analyze', { method: 'POST', body: fd })
            const data = await res.json()
            const profile = data?.data?.profile || data?.profile
            if (profile) {
                const hl = (profile.headline || '').trim()
                const isUni = /\b(university|institute|college|school|academy|iit|nit|bits|iiit|thapar|vit|srm|amity|manipal|lpu)\b/i.test(hl) && !/(student|intern|engineer|developer|manager|analyst|founder|researcher|professor|designer|consultant|freelanc)/i.test(hl)
                if (hl && !isUni) setYourRole(hl)
                else if (profile.experience?.[0]?.title) setYourRole(`${profile.experience[0].title}${profile.experience[0].company ? ' at ' + profile.experience[0].company : ''}`)
                else if (hl) setYourRole(`Student at ${hl}`)
                setSenderPdfDone(true)
            }
        } catch (err) {
            console.error('Sender PDF upload failed:', err)
        } finally {
            setSenderPdfUploading(false)
        }
    }

    const handleRecipientPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setRecipientPdfUploading(true)
        try {
            const fd = new FormData()
            fd.append('file', file)
            const res = await fetch('/api/analyze', { method: 'POST', body: fd })
            const data = await res.json()
            const profile = data?.data?.profile || data?.profile
            if (profile) {
                if (profile.name) setName(profile.name)
                const hl = (profile.headline || '').trim()
                const isUni = /\b(university|institute|college|school|academy|iit|nit|bits|iiit|thapar|vit|srm|amity|manipal|lpu)\b/i.test(hl) && !/(student|intern|engineer|developer|manager|analyst|founder|researcher|professor|designer|consultant|freelanc)/i.test(hl)
                if (hl && !isUni) setRecipientRole(hl)
                else if (profile.experience?.[0]?.title) setRecipientRole(`${profile.experience[0].title}${profile.experience[0].company ? ' at ' + profile.experience[0].company : ''}`)
                else if (hl) setRecipientRole(`Student at ${hl}`)
                setRecipientPdfDone(true)
            }
        } catch (err) {
            console.error('Recipient PDF upload failed:', err)
        } finally {
            setRecipientPdfUploading(false)
        }
    }

    const handleGenerate = async () => {
        setLoading(true)
        setIsAI(false)
        setError('')
        setMessages([])

        try {
            const res = await fetch('/api/tools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tool: 'connection-message',
                    input: {
                        type,
                        name: name || 'there',
                        context: context || undefined,
                        intent: intent || undefined,
                        yourRole: yourRole || undefined,
                        recipientRole: recipientRole || undefined,
                    }
                })
            })
            const data = await res.json()

            if (data.success && Array.isArray(data.data)) {
                setMessages(data.data.map((m: MessageResult) => ({ ...m, charCount: m.charCount || m.message?.length || 0 })))
                setIsAI(true)
            } else {
                throw new Error('AI returned no data')
            }
        } catch {
            // Fallback: use rule-based generator
            try {
                const fallback = generateFallbackMessages({
                    type,
                    name: name || 'there',
                    context: context || undefined,
                    yourRole: yourRole || undefined,
                    recipientRole: recipientRole || undefined,
                    intent: intent || undefined,
                })
                if (fallback.length > 0) {
                    setMessages(fallback)
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

    const copyMessage = (text: string, idx: number) => {
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

    const categories = [...new Set(CONNECTION_TYPES.map(t => t.category))]

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="font-semibold text-[#0A0F1C] text-[15px]">Connection Request Crafter</h2>
                        <p className="text-[11px] text-[#6B7280]">Personalized messages under 300 chars | for cold outreach, recruiters, alumni</p>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-4">
                {/* Message Type */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-2">What kind of message?</label>
                    {categories.map(cat => (
                        <div key={cat} className="mb-3">
                            <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider mb-1.5">{cat}</p>
                            <div className="flex flex-wrap gap-1.5">
                                {CONNECTION_TYPES.filter(t => t.category === cat).map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => { setType(t.id); setMessages([]) }}
                                        className={`text-[11px] px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1 ${type === t.id
                                            ? 'border-[#10B981] bg-emerald-50 text-emerald-800 font-medium'
                                            : 'border-gray-200 text-[#6B7280] hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="text-xs">{t.icon}</span> {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    {/* Show hint for selected type */}
                    <p className="text-[10px] text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg mt-1">
                        {CONNECTION_TYPES.find(t => t.id === type)?.hint}
                    </p>
                </div>

                {/* Step 1: Your Info */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider">Step 1: About You (Sender)</p>
                        <label className={`cursor-pointer text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                            senderPdfDone ? 'bg-green-100 border-green-200 text-green-700' : 'border-emerald-200 text-emerald-600 hover:bg-emerald-100'
                        }`}>
                            {senderPdfUploading ? (
                                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            ) : (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                            )}
                            {senderPdfDone ? '✓ Extracted' : 'Upload Your PDF'}
                            <input type="file" accept=".pdf" onChange={handleSenderPdf} className="hidden" disabled={senderPdfUploading} />
                        </label>
                    </div>
                    <input
                        type="text"
                        value={yourRole}
                        onChange={(e) => setYourRole(e.target.value)}
                        placeholder="Your role or headline (e.g., Product Manager at Acme, CS student at Stanford)"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/20 bg-white"
                    />
                </div>

                {/* Step 2: Recipient Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider">Step 2: Who Are You Connecting With?</p>
                        <label className={`cursor-pointer text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                            recipientPdfDone ? 'bg-green-100 border-green-200 text-green-700' : 'border-blue-200 text-blue-600 hover:bg-blue-100'
                        }`}>
                            {recipientPdfUploading ? (
                                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            ) : (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                            )}
                            {recipientPdfDone ? '✓ Extracted' : 'Upload Their PDF'}
                            <input type="file" accept=".pdf" onChange={handleRecipientPdf} className="hidden" disabled={recipientPdfUploading} />
                        </label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Their first name"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]/20 bg-white"
                        />
                        <input
                            type="text"
                            value={recipientRole}
                            onChange={(e) => setRecipientRole(e.target.value)}
                            placeholder="Their role (e.g., VP Engineering at Google)"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]/20 bg-white"
                        />
                    </div>
                </div>

                {/* Step 3: Context */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1.5">
                        Step 3: Context <span className="text-[#6B7280] font-normal">(the more detail, the better the message)</span>
                    </label>
                    <textarea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder={CONTEXT_HINTS[type] || 'Add any relevant context...'}
                        rows={2}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/20 transition-all resize-none"
                    />
                </div>

                {/* Step 4: Intent (optional) */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1.5">
                        What do you want from this connection? <span className="text-[#6B7280] font-normal">(optional but helps a lot)</span>
                    </label>
                    <input
                        type="text"
                        value={intent}
                        onChange={(e) => setIntent(e.target.value)}
                        placeholder="e.g., Get on their podcast, Ask about their hiring process, Learn about their career path"
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/20 transition-all"
                    />
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full py-3 bg-[#10B981] text-white rounded-xl font-semibold text-sm hover:bg-[#059669] transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            Generating…
                        </span>
                    ) : 'Generate Messages'}
                </button>

                {/* AI Failed - show prompt */}
                {error === 'ai_failed' && !loading && (
                    <AIFailedPromptBlock
                        toolName="Connection Crafter"
                        color="#10B981"
                        promptText={buildConnectionPrompt({
                            type,
                            name: name || 'there',
                            context: context || undefined,
                            yourRole: yourRole || undefined,
                            recipientRole: recipientRole || undefined,
                            intent: intent || undefined,
                        })}
                    />
                )}

                {/* Results */}
                {messages.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">{messages.length} versions generated</p>
                            {isAI && (
                                <span className="text-[9px] font-bold text-white bg-gradient-to-r from-[#10B981] to-[#7C3AED] px-2 py-0.5 rounded-full">AI</span>
                            )}
                        </div>
                        {/* Copyable AI Prompt */}
                        <ToolPromptBlock
                            toolName="Connection Crafter"
                            color="#10B981"
                            promptText={buildConnectionPrompt({
                                type,
                                name: name || 'there',
                                context: context || undefined,
                                yourRole: yourRole || undefined,
                                recipientRole: recipientRole || undefined,
                                intent: intent || undefined,
                            })}
                        />
                        {messages.map((m, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all group">
                                <div className="px-4 py-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                {m.tone}
                                            </span>
                                            <span className="text-[9px] text-[#C4C9D4]">{m.charCount || m.message?.length} chars</span>
                                            {(m.charCount || m.message?.length || 0) <= 300 && (
                                                <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Under limit</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => copyMessage(m.message, i)}
                                            className="text-[11px] text-[#10B981] hover:underline font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            {copiedIdx === i ? '✓ Copied' : 'Copy'}
                                        </button>
                                    </div>
                                    <p className="text-[13px] text-[#0A0F1C] leading-relaxed mb-2">{m.message}</p>
                                    <p className="text-[10px] text-[#6B7280] leading-relaxed">💡 {m.tip}</p>
                                </div>
                            </div>
                        ))}
                        {/* Char count warning */}
                        {messages.some(m => (m.charCount || m.message?.length || 0) > 300) && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                                <p className="text-[10px] text-amber-700">⚠️ LinkedIn connection notes have a 300 character limit. Messages over 300 chars may need trimming.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
