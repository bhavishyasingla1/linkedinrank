'use client'

import { useState } from 'react'
import { generateConnectionMessages as generateFallbackMessages } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildConnectionPrompt } from './ToolPromptBlock'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
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
                if (profile.name) setName(profile.name.split(/\s+/)[0])
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
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
                <div>
                    <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                        LinkedIn Connection Note Crafter
                    </h2>
                    <p className="text-[13px] text-[#64748B] mt-0.5">
                        Write personalized &quot;Add a note&quot; invitations strictly under LinkedIn&apos;s 300 character cutoff.
                    </p>
                </div>
                <Badge variant="brand" size="sm">
                    300-Char Safe
                </Badge>
            </div>

            {/* Scenario Pills */}
            <div className="space-y-2">
                <label className="block text-[13px] font-semibold text-[#334155]">
                    Select Outreach Scenario
                </label>
                <div className="flex flex-wrap gap-1.5">
                    {CONNECTION_TYPES.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => { setType(t.id); setMessages([]) }}
                            className={`text-[12px] px-3 py-1.5 rounded-lg border transition-all cursor-pointer select-none ${
                                type === t.id
                                    ? 'bg-[#F0F7FF] border-[#0A66C2] text-[#0A66C2] font-bold shadow-xs'
                                    : 'bg-white border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1]'
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
                <p className="text-[12px] text-[#0A66C2] bg-[#F0F7FF] border border-[#BAE0FD] p-2.5 rounded-lg mt-1">
                    💡 {CONNECTION_TYPES.find(t => t.id === type)?.hint}
                </p>
            </div>

            {/* Dual PDF Extraction & Info Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sender Info */}
                <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E2E8F0] space-y-2.5">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                            About You (Sender)
                        </span>
                        <label className="cursor-pointer text-[11px] font-semibold px-2 py-0.5 rounded bg-white border border-[#CBD5E1] text-[#0A66C2] hover:bg-[#F8FAFC]">
                            {senderPdfUploading ? 'Extracting...' : senderPdfDone ? '✓ PDF Loaded' : 'Upload Your PDF'}
                            <input type="file" accept=".pdf" onChange={handleSenderPdf} className="hidden" disabled={senderPdfUploading} />
                        </label>
                    </div>
                    <input
                        type="text"
                        value={yourRole}
                        onChange={(e) => setYourRole(e.target.value)}
                        placeholder="Your role (e.g. Senior PM at Stripe)"
                        className="input-base bg-white"
                    />
                </div>

                {/* Recipient Info */}
                <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E2E8F0] space-y-2.5">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                            Recipient
                        </span>
                        <label className="cursor-pointer text-[11px] font-semibold px-2 py-0.5 rounded bg-white border border-[#CBD5E1] text-[#0A66C2] hover:bg-[#F8FAFC]">
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
                            className="input-base bg-white"
                        />
                        <input
                            type="text"
                            value={recipientRole}
                            onChange={(e) => setRecipientRole(e.target.value)}
                            placeholder="Their role / company"
                            className="input-base bg-white"
                        />
                    </div>
                </div>
            </div>

            {/* Context & Intent */}
            <div className="space-y-4">
                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                        Specific Context / Shared Connection / Observation
                    </label>
                    <input
                        type="text"
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder={CONTEXT_HINTS[type]}
                        className="input-base"
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                        Your Intent / Goal <span className="text-[#64748B] font-normal">(optional)</span>
                    </label>
                    <input
                        type="text"
                        value={intent}
                        onChange={(e) => setIntent(e.target.value)}
                        placeholder="e.g. Chat about distributed cache patterns, Discuss engineering openings"
                        className="input-base"
                    />
                </div>

                <Button
                    onClick={handleGenerate}
                    disabled={loading}
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={loading}
                    rightIcon={<SparklesIcon size={16} />}
                >
                    Generate Connection Notes
                </Button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Connection Note Crafter"
                    color="#0A66C2"
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
                <div className="space-y-4 pt-6 border-t border-[#F1F5F9] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wider">
                            Generated Notes ({messages.length})
                        </p>
                        {isAI && (
                            <Badge variant="brand" size="sm">
                                Anti-AI Writing Validated
                            </Badge>
                        )}
                    </div>

                    <div className="space-y-3">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0A66C2] shadow-xs space-y-2.5 transition-all group"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="brand" size="sm">
                                            {m.tone}
                                        </Badge>
                                        <span
                                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                                (m.charCount || m.message?.length || 0) <= 300
                                                    ? 'bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]'
                                                    : 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]'
                                            }`}
                                        >
                                            {m.charCount || m.message?.length}/300 chars
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => copyMessage(m.message, i)}
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
                                                <span>Copy Note</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <p className="text-[14px] text-[#0F172A] leading-relaxed bg-[#F8FAFC] p-3.5 rounded-lg border border-[#E2E8F0]">
                                    {m.message}
                                </p>

                                {m.tip && (
                                    <p className="text-[12px] text-[#64748B]">
                                        💡 {m.tip}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Connection Note Crafter"
                        color="#0A66C2"
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
