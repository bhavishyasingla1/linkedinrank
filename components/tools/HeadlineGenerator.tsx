'use client'

import { useState } from 'react'
import { generateHeadlines, HeadlineInput } from '@/lib/tools'
import ToolPromptBlock, { buildHeadlinePrompt } from './ToolPromptBlock'

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

            // The analyze API wraps response in { success, data: { profile, ... } }
            const profile = data?.data?.profile || data?.profile
            if (profile) {
                const p = profile
                // Extract rich data from the PDF
                setRole(p.experience?.[0]?.title || p.headline || '')
                setCompany(p.experience?.[0]?.company || '')

                // Infer industry from all experience
                const allTitles = (p.experience || []).map((e: any) => e.title || '').join(', ')
                setSpecialty(allTitles)

                // Skills
                setSkills((p.skills || []).slice(0, 10).join(', '))

                // Store about and headline for AI context
                setExtractedAbout(p.about || '')
                setExtractedHeadline(p.headline || '')

                // Try to infer industry from headline or about
                const headlineText = (p.headline || '').toLowerCase()
                const aboutText = (p.about || '').toLowerCase()
                const industries = ['technology', 'finance', 'healthcare', 'marketing', 'education', 'consulting', 'engineering', 'design', 'sales', 'legal', 'media', 'product', 'data science', 'ai', 'software']
                const found = industries.find(i => headlineText.includes(i) || aboutText.includes(i))
                if (found) setIndustry(found.charAt(0).toUpperCase() + found.slice(1))

                setPdfExtracted(true)
            } else {
                console.error('PDF extraction: no profile data in response', data)
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
            // Try AI generation first
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
                        skills: skills.split(',').map(s => s.trim()).filter(Boolean),
                        currentHeadline: extractedHeadline || undefined,
                        about: extractedAbout || undefined,
                    }
                })
            })

            const data = await res.json()

            if (data.success && data.data) {
                setHeadlines(data.data)
                setIsAI(true)
                return
            }
        } catch {
            // AI failed, fall through to rule-based
        }

        // Fallback: rule-based generation
        const input: HeadlineInput = {
            role: role.trim(),
            company: company.trim(),
            industry: industry.trim(),
            skills: skills.split(',').map(s => s.trim()).filter(Boolean)
        }
        const generated = generateHeadlines(input)
        setHeadlines(generated.map(h => ({
            text: h.text,
            score: h.score,
            style: h.style,
            tip: h.tip
        })))
        setIsAI(false)
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
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#004182] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="font-semibold text-[#0A0F1C] text-[15px]">Headline Rewriter</h2>
                        <p className="text-[11px] text-[#6B7280]">Upload your PDF or enter your role | get 6 recruiter-optimized headlines</p>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-4">
                {/* PDF Upload */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center border border-blue-100">
                            <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-[#0A0F1C]">
                                {pdfExtracted ? '✓ Profile extracted' : 'Upload LinkedIn PDF'}
                            </p>
                            <p className="text-[11px] text-[#6B7280]">
                                {pdfExtracted ? 'Fields populated from your profile' : 'Auto-fills all fields from your profile'}
                            </p>
                        </div>
                        <label className={`cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${pdfExtracted
                            ? 'bg-green-100 text-green-700'
                            : 'bg-[#0A66C2] text-white hover:bg-[#004182]'
                            }`}>
                            {pdfUploading ? (
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Extracting...
                                </span>
                            ) : pdfExtracted ? '✓ Done' : 'Upload'}
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

                {/* Manual inputs */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-[#4B5563] mb-1">Your Role *</label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g., Product Manager"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]/20"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-[#4B5563] mb-1">Company</label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="e.g., Google"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]/20"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-[#4B5563] mb-1">Industry</label>
                        <input
                            type="text"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            placeholder="e.g., SaaS, Healthcare"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]/20"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-[#4B5563] mb-1">Specialty</label>
                        <input
                            type="text"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            placeholder="e.g., Growth, B2B"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]/20"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1">Key Skills <span className="text-[#6B7280] font-normal">(comma-separated)</span></label>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="e.g., Strategy, Analytics, Leadership"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]/20"
                    />
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!role.trim() || loading}
                    className="w-full py-3 bg-gradient-to-r from-[#0A66C2] to-[#004182] text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Generating with AI...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                            </svg>
                            Generate Headlines
                        </>
                    )}
                </button>

                {/* Results */}
                {headlines.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                                {headlines.length} Headlines Generated
                            </p>
                            {isAI && (
                                <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                    </svg>
                                    AI-Powered
                                </span>
                            )}
                        </div>

                        {/* Copyable AI Prompt */}
                        <ToolPromptBlock
                            toolName="Headline Rewriter"
                            color="#0A66C2"
                            promptText={buildHeadlinePrompt({
                                role: role,
                                company: company || undefined,
                                industry: industry || undefined,
                                skills: skills.trim() ? skills.split(/[,;]+/).map(s => s.trim()).filter(Boolean) : undefined,
                                currentHeadline: extractedHeadline || undefined,
                                about: extractedAbout || undefined,
                            })}
                        />

                        {headlines.map((h, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl p-4 group hover:border-[#0A66C2]/30 hover:shadow-sm transition-all">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[9px] font-bold text-[#0A66C2] bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{h.style}</span>
                                            <div className="flex items-center gap-1">
                                                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all"
                                                        style={{
                                                            width: `${h.score}%`,
                                                            background: h.score >= 90 ? '#10B981' : h.score >= 80 ? '#0A66C2' : h.score >= 70 ? '#F59E0B' : '#EF4444'
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-[9px] font-bold text-[#6B7280]">{h.score}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-[#0A0F1C] leading-relaxed">{h.text}</p>
                                        <p className="text-[10px] text-[#6B7280] mt-1.5">💡 {h.tip}</p>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(h.text, i)}
                                        className="shrink-0 text-[11px] text-[#0A66C2] hover:underline font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        {copiedIdx === i ? '✓ Copied' : 'Copy'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


            </div>
        </div>
    )
}
