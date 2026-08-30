'use client'

import { useState } from 'react'
import { generateHeadlines } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildHeadlinePrompt } from './ToolPromptBlock'
import { UploadIcon, CheckIcon, CopyIcon, SparklesIcon } from '@/components/ui/Icons'

interface AIHeadline {
    text: string
    score: number
    style: string
    tip: string
}

export default function HeadlineGeneratorTool() {
    const [role, setRole] = useState('')
    const [company, setCompany] = useState('')
    const [industry, setIndustry] = useState('')
    const [specialty, setSpecialty] = useState('')
    const [skills, setSkills] = useState('')

    // PDF extraction state
    const [pdfUploading, setPdfUploading] = useState(false)
    const [pdfExtracted, setPdfExtracted] = useState(false)
    const [extractedAbout, setExtractedAbout] = useState('')
    const [extractedHeadline, setExtractedHeadline] = useState('')

    // Result state
    const [headlines, setHeadlines] = useState<AIHeadline[]>([])
    const [loading, setLoading] = useState(false)
    const [isAI, setIsAI] = useState(false)
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
    const [copiedAll, setCopiedAll] = useState(false)
    const [error, setError] = useState('')

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
            if (profile) {
                const p = profile
                setRole(p.experience?.[0]?.title || p.headline || '')
                setCompany(p.experience?.[0]?.company || '')

                // Clean specialty extraction
                const firstExp = p.experience?.[0]?.title || ''
                setSpecialty(firstExp)

                setSkills((p.skills || []).slice(0, 8).join(', '))
                setExtractedAbout(p.about || '')
                setExtractedHeadline(p.headline || '')

                const headlineText = (p.headline || '').toLowerCase()
                const aboutText = (p.about || '').toLowerCase()
                const industries = [
                    'technology', 'finance', 'healthcare', 'marketing', 'education',
                    'consulting', 'engineering', 'design', 'sales', 'legal', 'media',
                    'product', 'data science', 'ai', 'software'
                ]
                const found = industries.find((ind) => headlineText.includes(ind) || aboutText.includes(ind))
                if (found) setIndustry(found.charAt(0).toUpperCase() + found.slice(1))

                setPdfExtracted(true)
            }
        } catch (err) {
            console.error('PDF upload failed:', err)
        } finally {
            setPdfUploading(false)
            if (e.target) e.target.value = ''
        }
    }

    const doGenerate = async () => {
        if (!role.trim()) return
        setLoading(true)
        setHeadlines([])
        setError('')

        try {
            const res = await fetch('/api/tools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tool: 'headline',
                    input: {
                        role: role.trim(),
                        company: company.trim() || undefined,
                        industry: industry.trim() || undefined,
                        specialty: specialty.trim() || undefined,
                        skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
                        currentHeadline: extractedHeadline || undefined,
                        about: extractedAbout || undefined,
                    },
                }),
            })

            const data = await res.json()

            if (data.success && data.data) {
                setHeadlines(data.data)
                setIsAI(true)
                return
            }
        } catch {
            // AI fallback
        }

        try {
            const fallbackResults = generateHeadlines({
                role: role.trim(),
                company: company.trim() || undefined,
                industry: industry.trim() || undefined,
                specialty: specialty.trim() || undefined,
                skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
            })
            if (fallbackResults.length > 0) {
                setHeadlines(fallbackResults)
                setIsAI(false)
                return
            }
        } catch {}

        setError('ai_failed')
    }

    const handleGenerate = async () => {
        if (!role.trim()) return
        try {
            await doGenerate()
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = (text: string, idx: number) => {
        navigator.clipboard.writeText(text)
        setCopiedIdx(idx)
        setTimeout(() => setCopiedIdx(null), 2000)
    }

    const handleCopyAll = () => {
        const text = headlines.map((h, i) => `${i + 1}. [${h.style} - Score ${h.score}/100]\n${h.text}\nTip: ${h.tip}\n`).join('\n')
        navigator.clipboard.writeText(text)
        setCopiedAll(true)
        setTimeout(() => setCopiedAll(false), 2000)
    }

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dedcff]">
                <div>
                    <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        AI LinkedIn Headline Generator
                    </h2>
                    <p className="text-[13.5px] text-[#050315]/70 mt-1">
                        Generate 6 recruiter-optimized headlines scored for keyword visibility, positioning clarity, and search cutoff limits.
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3.5 py-1.5 rounded-full shadow-2xs whitespace-nowrap shrink-0">
                        6 Strategic Angles
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
                            {pdfExtracted ? '✓ Profile extracted successfully' : 'Auto-fill from LinkedIn PDF'}
                        </p>
                        <p className="text-[12px] text-[#050315]/60">
                            {pdfExtracted ? 'Inputs populated with your roles, specialty & skills' : 'Upload your LinkedIn profile PDF to automatically fill inputs'}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Target / Current Role <span className="text-[#DC2626]">*</span>
                        </label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g. Senior Software Engineer"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Company or Project
                        </label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="e.g. Stripe, Independent Builder"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Industry / Domain
                        </label>
                        <input
                            type="text"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            placeholder="e.g. FinTech, B2B SaaS, HealthTech"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Specialty / Core Focus
                        </label>
                        <input
                            type="text"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            placeholder="e.g. High-Scale Systems, Product Strategy"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                        Key Searchable Skills <span className="text-[#050315]/50 font-normal">(comma-separated)</span>
                    </label>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="e.g. Python, Kubernetes, System Architecture, Team Mentorship"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                    />
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!role.trim() || loading}
                    className="w-full py-3.5 rounded-2xl bg-[#2f27ce] hover:bg-[#433bff] disabled:opacity-50 text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                    {loading ? (
                        <span>Generating Optimized Headlines...</span>
                    ) : (
                        <>
                            <span>Generate Headlines</span>
                            <SparklesIcon size={18} />
                        </>
                    )}
                </button>
            </div>

            {/* AI Error / Fallback Prompt */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Headline Rewriter"
                    color="#2f27ce"
                    promptText={buildHeadlinePrompt({
                        role,
                        company: company || undefined,
                        industry: industry || undefined,
                        skills: skills.trim() ? skills.split(/[,;]+/).map((s) => s.trim()).filter(Boolean) : undefined,
                        currentHeadline: extractedHeadline || undefined,
                        about: extractedAbout || undefined,
                    })}
                />
            )}

            {/* Generated Results */}
            {headlines.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#dedcff] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <p className="text-[13px] font-extrabold text-[#050315] uppercase tracking-wider">
                                Generated Headlines ({headlines.length})
                            </p>
                            {isAI && (
                                <span className="inline-flex items-center justify-center text-center leading-none text-[11px] font-bold text-[#2f27ce] bg-[#dedcff] px-2.5 py-1 rounded-full shadow-2xs">
                                    AI Powered
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleCopyAll}
                            className="inline-flex items-center gap-1 text-[12.5px] font-bold text-[#2f27ce] hover:underline cursor-pointer"
                        >
                            {copiedAll ? '✓ All Copied' : 'Copy All'}
                        </button>
                    </div>

                    <div className="space-y-3">
                        {headlines.map((h, i) => {
                            const charLen = h.text.length
                            const isOverLimit = charLen > 120

                            return (
                                <div
                                    key={i}
                                    className="p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow transition-all space-y-2.5 group"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex items-center justify-center text-center leading-none text-[11.5px] font-bold text-[#2f27ce] bg-[#dedcff]/60 px-3 py-1 rounded-full border border-[#dedcff]">
                                                {h.style}
                                            </span>
                                            <span className="inline-flex items-center justify-center text-center leading-none text-[11.5px] font-bold text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-2.5 py-1 rounded-full">
                                                Score: {h.score}/100
                                            </span>
                                            <span className={`inline-flex items-center justify-center text-center leading-none text-[11.5px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                                                isOverLimit
                                                    ? 'text-[#DC2626] bg-[#FEF2F2] border-[#FECACA]'
                                                    : 'text-[#050315]/70 bg-[#fbfbfe] border-[#dedcff]'
                                            }`}>
                                                {charLen}/120 chars
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => handleCopy(h.text, i)}
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
                                                    <span>Copy</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <p className="text-[14.5px] font-bold text-[#050315] leading-relaxed">
                                        {h.text}
                                    </p>
                                    {h.tip && (
                                        <p className="text-[12.5px] text-[#050315]/70 leading-normal">
                                            💡 {h.tip}
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Headline Rewriter"
                        color="#2f27ce"
                        promptText={buildHeadlinePrompt({
                            role,
                            company: company || undefined,
                            industry: industry || undefined,
                            skills: skills.trim() ? skills.split(/[,;]+/).map((s) => s.trim()).filter(Boolean) : undefined,
                            currentHeadline: extractedHeadline || undefined,
                            about: extractedAbout || undefined,
                        })}
                    />
                </div>
            )}
        </div>
    )
}
