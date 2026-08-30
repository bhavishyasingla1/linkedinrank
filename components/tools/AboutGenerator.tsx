'use client'

import { useState } from 'react'
import { generateAbout } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildAboutPrompt } from './ToolPromptBlock'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { UploadIcon, CheckIcon, CopyIcon, SparklesIcon } from '@/components/ui/Icons'

interface AIAbout {
    text: string
    style: string
    word_count: number
    char_count: number
}

export default function AboutGeneratorTool() {
    const [role, setRole] = useState('')
    const [experience, setExperience] = useState('')
    const [passion, setPassion] = useState('')
    const [achievement, setAchievement] = useState('')
    const [skills, setSkills] = useState('')
    const [audience, setAudience] = useState('')
    const [education, setEducation] = useState<string[]>([])
    const [currentAbout, setCurrentAbout] = useState('')

    // PDF extraction state
    const [pdfUploading, setPdfUploading] = useState(false)
    const [pdfExtracted, setPdfExtracted] = useState(false)
    const [extractedFields, setExtractedFields] = useState<string[]>([])

    const [results, setResults] = useState<AIAbout[]>([])
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [isAI, setIsAI] = useState(false)
    const [activeStyle, setActiveStyle] = useState<number>(0)
    const [error, setError] = useState('')

    const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setPdfUploading(true)
        setResults([])
        setIsAI(false)
        setActiveStyle(0)
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch('/api/analyze', { method: 'POST', body: formData })
            const data = await res.json()
            const profile = data?.data?.profile || data?.profile
            if (profile) {
                const filled: string[] = []

                const headlineText = (profile.headline || '').trim()
                const isUniversityName = /\b(university|institute|college|school|academy|iit|nit|bits|iiit|thapar|vit|srm|amity|manipal|lpu|chandigarh|delhi|mumbai|bangalore|chennai)\b/i.test(headlineText) && !/(student|intern|engineer|developer|manager|analyst|founder|researcher|professor|teacher|designer|consultant|freelanc)/i.test(headlineText)

                if (headlineText && !isUniversityName) {
                    setRole(headlineText)
                    filled.push('Role')
                } else if (profile.experience?.[0]?.title) {
                    setRole(`${profile.experience[0].title}${profile.experience[0].company ? ` at ${profile.experience[0].company}` : ''}`)
                    filled.push('Role')
                } else if (headlineText) {
                    setRole(`Student at ${headlineText}`)
                    filled.push('Role')
                }

                if (profile.experience?.length) {
                    const expItems = profile.experience.map((exp: any) => {
                        let item = exp.title || ''
                        if (exp.company) item += ` at ${exp.company}`
                        if (exp.duration) item += ` (${exp.duration})`
                        if (exp.description) item += ` | ${exp.description.slice(0, 120)}`
                        return item
                    }).slice(0, 4)
                    setExperience(expItems.join('\n'))
                    filled.push('Experience')
                }

                if (profile.skills?.length) {
                    setSkills(profile.skills.slice(0, 10).join(', '))
                    filled.push('Skills')
                }

                if (profile.education?.length) {
                    setEducation(profile.education)
                    filled.push('Education')
                }

                if (profile.about) {
                    setCurrentAbout(profile.about)
                    filled.push('Current About')
                }

                if (profile.certifications?.length) {
                    setAchievement(profile.certifications.slice(0, 3).join(', '))
                    filled.push('Achievements')
                } else if (profile.about) {
                    const numMatch = profile.about.match(/\d+[%+x]|\$[\d,]+|[\d,]+\s*(users|clients|customers|projects|teams|people)/gi)
                    if (numMatch?.length) {
                        setAchievement(numMatch.slice(0, 2).join('; '))
                        filled.push('Achievements')
                    }
                }

                if (profile.about) {
                    const passionMatch = profile.about.match(/(?:passionate about|care deeply about|driven by|focused on|dedicated to|committed to)\s+([^.]+)/i)
                    if (passionMatch) {
                        setPassion(passionMatch[1].trim().slice(0, 150))
                        filled.push('Focus Area')
                    }
                }

                setExtractedFields(filled)
                setPdfExtracted(true)
            }
        } catch (err) {
            console.error('PDF upload failed:', err)
        } finally {
            setPdfUploading(false)
            if (e.target) e.target.value = ''
        }
    }

    const handleGenerate = async () => {
        if (!role.trim()) return
        setLoading(true)
        setResults([])
        setError('')

        try {
            const res = await fetch('/api/tools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tool: 'about',
                    input: {
                        role: role.trim(),
                        experience_summary: experience.trim() || undefined,
                        passion: passion.trim() || undefined,
                        achievement: achievement.trim() || undefined,
                        skills: skills.trim() || undefined,
                        audience: audience.trim() || undefined,
                    }
                })
            })

            const data = await res.json()

            if (data.success && data.data) {
                setResults(data.data as AIAbout[])
                setIsAI(true)
                setLoading(false)
                return
            }
        } catch {
            // AI failed
        }

        try {
            const fallbackResults = generateAbout({
                role: role.trim(),
                experience_summary: experience.trim() || undefined,
                passion: passion.trim() || undefined,
                achievement: achievement.trim() || undefined,
                skills: skills.trim() || undefined,
                audience: audience.trim() || undefined,
            })
            if (fallbackResults.length > 0) {
                setResults(fallbackResults)
                setIsAI(false)
                setLoading(false)
                return
            }
        } catch {}

        setError('ai_failed')
        setLoading(false)
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
                        AI LinkedIn About Section Generator
                    </h2>
                    <p className="text-[13px] text-[#64748B] mt-0.5">
                        Craft authentic, high-converting About sections in 3 distinct tones with natural keyword integration.
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
                            {pdfExtracted ? `Extracted: ${extractedFields.join(', ')}` : 'Upload your export to pre-fill all fields automatically'}
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
                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                        Your Role / Headline <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Senior Product Manager at Scale AI"
                        className="input-base"
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                        Experience Summary &amp; Scope
                    </label>
                    <textarea
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="e.g. 7+ years building enterprise SaaS and data pipelines. Led product from zero to $15M ARR."
                        rows={3}
                        className="input-base resize-none"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Core Focus &amp; Problems Solved
                        </label>
                        <input
                            type="text"
                            value={passion}
                            onChange={(e) => setPassion(e.target.value)}
                            placeholder="e.g. Scaling distributed search & developer workflows"
                            className="input-base"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Key Quantified Achievement
                        </label>
                        <input
                            type="text"
                            value={achievement}
                            onChange={(e) => setAchievement(e.target.value)}
                            placeholder="e.g. Reduced search latency by 45% for 2M daily users"
                            className="input-base"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Core Searchable Skills
                        </label>
                        <input
                            type="text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            placeholder="e.g. Product Strategy, LLMs, Python, System Architecture"
                            className="input-base"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                            Target Audience / Stakeholders
                        </label>
                        <input
                            type="text"
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            placeholder="e.g. Founders, Engineering Leaders, Recruiters"
                            className="input-base"
                        />
                    </div>
                </div>

                {currentAbout && (
                    <div className="p-3.5 rounded-lg bg-[#FAFAFA] border border-[#E2E8F0] space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                            <span>Current About (from PDF)</span>
                            <span>{currentAbout.length} chars</span>
                        </div>
                        <p className="text-[12px] text-[#475569] leading-relaxed line-clamp-3">
                            {currentAbout}
                        </p>
                    </div>
                )}

                <Button
                    onClick={handleGenerate}
                    disabled={!role.trim() || loading}
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={loading}
                    rightIcon={<SparklesIcon size={16} />}
                >
                    Generate 3 About Sections
                </Button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="About Section Generator"
                    color="#0A66C2"
                    promptText={buildAboutPrompt({
                        role,
                        experience,
                        passion,
                        achievement,
                        skills,
                        audience,
                        currentAbout: currentAbout || undefined,
                        education: education.length ? education : undefined,
                    })}
                />
            )}

            {/* Generated Results */}
            {results.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#F1F5F9] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wider">
                            Generated Variations ({results.length})
                        </p>
                        {isAI && (
                            <Badge variant="brand" size="sm">
                                Anti-AI Writing Validated
                            </Badge>
                        )}
                    </div>

                    {/* Style Switcher Tabs */}
                    <div className="flex gap-2 p-1 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0]">
                        {results.map((r, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveStyle(i)}
                                className={`flex-1 py-2 px-3 rounded-lg text-center transition-all cursor-pointer select-none ${
                                    activeStyle === i
                                        ? 'bg-white text-[#0A66C2] font-bold shadow-xs border border-[#CBD5E1]'
                                        : 'text-[#64748B] hover:text-[#0F172A] font-medium'
                                }`}
                            >
                                <p className="text-[12px] capitalize">{r.style}</p>
                                <p className="text-[10px] opacity-75">{r.word_count} words · {r.char_count} chars</p>
                            </button>
                        ))}
                    </div>

                    {/* Active Result Card */}
                    {results[activeStyle] && (
                        <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
                            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
                                <div className="flex items-center gap-2">
                                    <Badge variant="brand" size="sm">
                                        {results[activeStyle].style}
                                    </Badge>
                                    <span className="text-[11px] text-[#64748B]">
                                        {results[activeStyle].word_count} words · {results[activeStyle].char_count}/2,600 chars
                                    </span>
                                </div>

                                <button
                                    onClick={() => handleCopy(results[activeStyle].text, activeStyle)}
                                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-[#F0F7FF] border border-[#BAE0FD] text-[#0A66C2] hover:bg-[#E0F2FE] transition-colors cursor-pointer select-none"
                                >
                                    {copiedIdx === activeStyle ? (
                                        <>
                                            <CheckIcon size={13} className="text-[#16A34A]" />
                                            <span className="text-[#16A34A]">Copied</span>
                                        </>
                                    ) : (
                                        <>
                                            <CopyIcon size={13} />
                                            <span>Copy About Section</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="text-[14px] text-[#0F172A] leading-relaxed whitespace-pre-wrap font-sans bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0] max-h-80 overflow-y-auto">
                                {results[activeStyle].text}
                            </div>
                        </div>
                    )}

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="About Section Generator"
                        color="#0A66C2"
                        promptText={buildAboutPrompt({
                            role,
                            experience,
                            passion,
                            achievement,
                            skills,
                            audience,
                            currentAbout: currentAbout || undefined,
                            education: education.length ? education : undefined,
                        })}
                    />
                </div>
            )}
        </div>
    )
}
