'use client'

import { useState } from 'react'
import { generateHeadlines } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildHeadlinePrompt } from './ToolPromptBlock'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
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

                const allTitles = (p.experience || []).map((exp: any) => exp.title || '').join(', ')
                setSpecialty(allTitles)

                setSkills((p.skills || []).slice(0, 10).join(', '))
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

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
                <div>
                    <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                        AI LinkedIn Headline Generator
                    </h2>
                    <p className="text-[13px] text-[#64748B] mt-0.5">
                        Fill in your target details or auto-extract directly from your LinkedIn profile PDF.
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
                            {pdfExtracted ? '✓ Profile extracted successfully' : 'Auto-fill from LinkedIn PDF'}
                        </p>
                        <p className="text-[12px] text-[#64748B]">
                            {pdfExtracted ? 'Fields populated with your experience & skills' : 'Upload your export to pre-fill all inputs'}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Your Current / Target Role <span className="text-[#DC2626]">*</span>
                        </label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g. Senior Software Engineer"
                            className="input-base"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Current Company / Project
                        </label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="e.g. Stripe, Independent Consultant"
                            className="input-base"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Industry / Domain
                        </label>
                        <input
                            type="text"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            placeholder="e.g. B2B SaaS, FinTech, AI"
                            className="input-base"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Specialty / Core Focus
                        </label>
                        <input
                            type="text"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            placeholder="e.g. Distributed Systems, Growth Strategy"
                            className="input-base"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                        Key Searchable Skills <span className="text-[#64748B] font-normal">(comma-separated)</span>
                    </label>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="e.g. Python, Kubernetes, System Architecture, Technical Leadership"
                        className="input-base"
                    />
                </div>

                <Button
                    onClick={handleGenerate}
                    disabled={!role.trim() || loading}
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={loading}
                    rightIcon={<SparklesIcon size={16} />}
                >
                    Generate Headlines
                </Button>
            </div>

            {/* AI Error / Fallback Prompt */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="Headline Rewriter"
                    color="#0A66C2"
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
                <div className="space-y-4 pt-6 border-t border-[#F1F5F9] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wider">
                            Generated Headlines ({headlines.length})
                        </p>
                        {isAI && (
                            <Badge variant="brand" size="sm">
                                Recruiter Filter Aligned
                            </Badge>
                        )}
                    </div>

                    <div className="space-y-3">
                        {headlines.map((h, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0A66C2] shadow-xs hover:shadow-sm transition-all space-y-2 group"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="neutral" size="sm">
                                            {h.style}
                                        </Badge>
                                        <span className="text-[11px] font-semibold text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-1.5 py-0.5 rounded">
                                            Score: {h.score}/100
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleCopy(h.text, i)}
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

                                <p className="text-[14px] font-medium text-[#0F172A] leading-relaxed">
                                    {h.text}
                                </p>
                                {h.tip && (
                                    <p className="text-[12px] text-[#64748B]">
                                        💡 {h.tip}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Headline Rewriter"
                        color="#0A66C2"
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
