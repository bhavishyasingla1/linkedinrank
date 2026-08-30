'use client'

import { useState } from 'react'
import { generateConnectionMessages as generateFallbackMessages } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildConnectionPrompt } from './ToolPromptBlock'
import { UploadIcon, CheckIcon, CopyIcon, SparklesIcon } from '@/components/ui/Icons'

type ConnectionType = 
    | 'cold' | 'same-industry' | 'alumni' | 'recruiter' | 'founder' 
    | 'liked-content' | 'mutual-connection' | 'event' | 'mentor'
    | 'collaboration' | 'followup-noreply' | 'followup-call' | 'followup-application' | 'followup-event'

const CONNECTION_TYPES: { id: ConnectionType; label: string; category: string; hint: string }[] = [
    { id: 'cold', label: 'Cold Outreach', category: 'Initial Connection', hint: 'Connect with someone new based on their specific work or post' },
    { id: 'same-industry', label: 'Same Industry Peer', category: 'Initial Connection', hint: 'Connect with a professional working in your industry' },
    { id: 'alumni', label: 'School / Alumni', category: 'Initial Connection', hint: 'Leverage shared university, college, or bootcamp background' },
    { id: 'recruiter', label: 'To a Recruiter', category: 'Initial Connection', hint: 'Reach out to talent partners or hiring managers' },
    { id: 'founder', label: 'Founder / Executive', category: 'Initial Connection', hint: 'Connect with startup founders or department leaders' },
    { id: 'liked-content', label: 'Liked Their Content', category: 'Initial Connection', hint: 'Reference an insightful post or article they shared' },
    { id: 'mutual-connection', label: 'Mutual Connection', category: 'Initial Connection', hint: 'Reference a shared mutual contact or community' },
    { id: 'event', label: 'Event / Conference', category: 'Initial Connection', hint: 'Connect with someone you met at a conference or meetup' },
    { id: 'mentor', label: 'Seeking Mentorship', category: 'Initial Connection', hint: 'Ask for career guidance with specific context' },
    { id: 'collaboration', label: 'Collaboration Idea', category: 'Initial Connection', hint: 'Propose a podcast, article, or joint project' },
    { id: 'followup-noreply', label: 'Follow-Up (No Reply)', category: 'Follow-Ups', hint: 'Polite follow-up after no response to your first note' },
    { id: 'followup-call', label: 'After a Call / Meeting', category: 'Follow-Ups', hint: 'Follow-up note referencing points discussed in a call' },
    { id: 'followup-application', label: 'After Job Application', category: 'Follow-Ups', hint: 'Follow-up note to hiring manager after applying' },
    { id: 'followup-event', label: 'After Meeting at Event', category: 'Follow-Ups', hint: 'Quick recap note after meeting in person' },
]

interface MessageResult {
    tone: string
    message: string
    charCount: number
    tip: string
}

const CONTEXT_HINTS: Record<ConnectionType, string> = {
    'cold': 'e.g. Their post on AI infrastructure, or their engineering blog',
    'same-industry': 'e.g. Both working on fintech payment gateways or B2B SaaS',
    'alumni': 'e.g. Stanford CS batch 2022 or IIT Delhi alumni',
    'recruiter': 'e.g. Senior Frontend / Staff Distributed Systems roles',
    'founder': 'e.g. Their recent product launch or Series A announcement',
    'liked-content': 'e.g. Their recent post about database query optimization',
    'mutual-connection': 'e.g. We both know Alex Chen from Stripe',
    'event': 'e.g. Spoke briefly after the distributed systems panel at KubeCon',
    'mentor': 'e.g. Career advice on transitioning from IC engineer to engineering manager',
    'collaboration': 'e.g. Inviting them as a guest on our tech podcast or co-authoring a guide',
    'followup-noreply': 'e.g. Following up on my note about collaborating on open-source tools',
    'followup-call': 'e.g. Great discussing your team roadmap during our 20-min intro yesterday',
    'followup-application': 'e.g. Applied for the Senior Staff Engineer role at Stripe yesterday',
    'followup-event': 'e.g. Great meeting you at the networking dinner last night',
}

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

    // PDF uploads
    const [senderPdfUploading, setSenderPdfUploading] = useState(false)
    const [senderPdfDone, setSenderPdfDone] = useState(false)
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
                if (hl) setYourRole(hl)
                else if (profile.experience?.[0]?.title) setYourRole(`${profile.experience[0].title}${profile.experience[0].company ? ' at ' + profile.experience[0].company : ''}`)
                setSenderPdfDone(true)
            }
        } catch (err) {
            console.error('Sender PDF upload failed:', err)
        } finally {
            setSenderPdfUploading(false)
            if (e.target) e.target.value = ''
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
                if (profile.name) {
                    const clean = profile.name.replace(/^(dr|mr|mrs|ms|prof|sir)\.?\s+/i, '').trim()
                    setName(clean.split(/\s+/)[0])
                }
                const hl = (profile.headline || '').trim()
                if (hl) setRecipientRole(hl)
                else if (profile.experience?.[0]?.title) setRecipientRole(`${profile.experience[0].title}${profile.experience[0].company ? ' at ' + profile.experience[0].company : ''}`)
                setRecipientPdfDone(true)
            }
        } catch (err) {
            console.error('Recipient PDF upload failed:', err)
        } finally {
            setRecipientPdfUploading(false)
            if (e.target) e.target.value = ''
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
                        name: name.trim() || 'there',
                        context: context.trim() || undefined,
                        intent: intent.trim() || undefined,
                        yourRole: yourRole.trim() || undefined,
                        recipientRole: recipientRole.trim() || undefined,
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
            try {
                const fallback = generateFallbackMessages({
                    type,
                    name: name.trim() || 'there',
                    context: context.trim() || undefined,
                    yourRole: yourRole.trim() || undefined,
                    recipientRole: recipientRole.trim() || undefined,
                    intent: intent.trim() || undefined,
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
                        LinkedIn Connection Note Crafter
                    </h2>
                    <p className="text-[13.5px] text-[#050315]/70 mt-1">
                        Write personalized &quot;Add a note&quot; invitations strictly under LinkedIn&apos;s 300 character cutoff.
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3.5 py-1.5 rounded-full shadow-2xs whitespace-nowrap shrink-0">
                        14 Scenarios · 300-Char Safe
                    </span>
                </div>
            </div>

            {/* Scenario Pills */}
            <div className="space-y-2">
                <label className="block text-[13px] font-bold text-[#050315]">
                    Select Outreach Scenario (14 Formats)
                </label>
                <div className="flex flex-wrap gap-2">
                    {CONNECTION_TYPES.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => { setType(t.id); setMessages([]) }}
                            className={`text-[12.5px] px-3.5 py-1.5 rounded-xl border font-bold transition-all cursor-pointer select-none ${
                                type === t.id
                                    ? 'bg-[#2f27ce] border-[#2f27ce] text-white shadow-sm'
                                    : 'bg-white border-[#dedcff] text-[#050315]/80 hover:border-[#2f27ce]'
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
                <p className="text-[12.5px] text-[#2f27ce] bg-[#dedcff]/30 border border-[#dedcff] p-3 rounded-xl mt-1.5">
                    💡 <strong>Strategy:</strong> {CONNECTION_TYPES.find(t => t.id === type)?.hint}
                </p>
            </div>

            {/* Dual PDF Extraction & Info Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sender Info */}
                <div className="p-5 rounded-2xl bg-[#fbfbfe] border border-[#dedcff] space-y-2.5">
                    <div className="flex items-center justify-between">
                        <span className="text-[11.5px] font-bold text-[#050315]/70 uppercase tracking-wider">
                            About You (Sender)
                        </span>
                        <label className="cursor-pointer text-[11.5px] font-bold px-2.5 py-1 rounded-lg bg-white border border-[#dedcff] text-[#2f27ce] hover:border-[#2f27ce]">
                            {senderPdfUploading ? 'Extracting...' : senderPdfDone ? '✓ PDF Loaded' : 'Upload Your PDF'}
                            <input type="file" accept=".pdf" onChange={handleSenderPdf} className="hidden" disabled={senderPdfUploading} />
                        </label>
                    </div>
                    <input
                        type="text"
                        value={yourRole}
                        onChange={(e) => setYourRole(e.target.value)}
                        placeholder="Your role (e.g. Senior PM at Stripe)"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                    />
                </div>

                {/* Recipient Info */}
                <div className="p-5 rounded-2xl bg-[#fbfbfe] border border-[#dedcff] space-y-2.5">
                    <div className="flex items-center justify-between">
                        <span className="text-[11.5px] font-bold text-[#050315]/70 uppercase tracking-wider">
                            Recipient
                        </span>
                        <label className="cursor-pointer text-[11.5px] font-bold px-2.5 py-1 rounded-lg bg-white border border-[#dedcff] text-[#2f27ce] hover:border-[#2f27ce]">
                            {recipientPdfUploading ? 'Extracting...' : recipientPdfDone ? '✓ PDF Loaded' : 'Upload Their PDF'}
                            <input type="file" accept=".pdf" onChange={handleRecipientPdf} className="hidden" disabled={recipientPdfUploading} />
                        </label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="First name"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                        <input
                            type="text"
                            value={recipientRole}
                            onChange={(e) => setRecipientRole(e.target.value)}
                            placeholder="Their role / company"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                </div>
            </div>

            {/* Context & Intent */}
            <div className="space-y-4">
                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                        Specific Context / Shared Connection / Observation
                    </label>
                    <input
                        type="text"
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder={CONTEXT_HINTS[type]}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                        Your Intent / Goal <span className="text-[#050315]/50 font-normal">(optional)</span>
                    </label>
                    <input
                        type="text"
                        value={intent}
                        onChange={(e) => setIntent(e.target.value)}
                        placeholder="e.g. Chat about distributed cache patterns, Discuss engineering openings"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                    />
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-[#2f27ce] hover:bg-[#433bff] disabled:opacity-50 text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                    {loading ? (
                        <span>Crafting Personalized Notes...</span>
                    ) : (
                        <>
                            <span>Generate 3 Connection Notes</span>
                            <SparklesIcon size={18} />
                        </>
                    )}
                </button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Connection Note Crafter"
                    color="#2f27ce"
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

            {/* Generated Results */}
            {messages.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#dedcff] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-[13px] font-extrabold text-[#050315] uppercase tracking-wider">
                            Generated Notes ({messages.length})
                        </p>
                        {isAI && (
                            <span className="inline-flex items-center justify-center text-center leading-none text-[11px] font-bold text-[#2f27ce] bg-[#dedcff] px-2.5 py-1 rounded-full shadow-2xs">
                                Anti-AI Validated
                            </span>
                        )}
                    </div>

                    <div className="space-y-3">
                        {messages.map((m, i) => {
                            const charCount = m.charCount || m.message?.length || 0
                            const isOver = charCount > 300

                            return (
                                <div
                                    key={i}
                                    className="p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow space-y-3 transition-all group"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center text-center leading-none text-[11.5px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3 py-1 rounded-full shadow-2xs">
                                                {m.tone}
                                            </span>
                                            <span
                                                className={`inline-flex items-center justify-center text-center leading-none text-[11.5px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                                                    !isOver
                                                        ? 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]'
                                                        : 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
                                                }`}
                                            >
                                                {charCount}/300 chars {!isOver ? '✓ Safe' : '⚠ Over Limit'}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => copyMessage(m.message, i)}
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
                                                    <span>Copy Note</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <p className="text-[14.5px] text-[#050315] leading-relaxed bg-[#fbfbfe] p-4 rounded-2xl border border-[#dedcff]">
                                        {m.message}
                                    </p>

                                    {m.tip && (
                                        <p className="text-[12.5px] text-[#050315]/75">
                                            💡 <strong>Why this works:</strong> {m.tip}
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Connection Note Crafter"
                        color="#2f27ce"
                        promptText={buildConnectionPrompt({
                            type,
                            name: name || 'there',
                            context: context || undefined,
                            yourRole: yourRole || undefined,
                            recipientRole: recipientRole || undefined,
                            intent: intent || undefined,
                        })}
                    />
                </div>
            )}
        </div>
    )
}
