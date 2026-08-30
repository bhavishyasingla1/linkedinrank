'use client'

import { useState } from 'react'
import { generateAbout } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildAboutPrompt } from './ToolPromptBlock'
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
    const [downloadedTxt, setDownloadedTxt] = useState(false)

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

    const handleDownloadTxt = (text: string, styleName: string) => {
        const element = document.createElement('a')
        const file = new Blob([text], { type: 'text/plain;charset=utf-8' })
        element.href = URL.createObjectURL(file)
        element.download = `linkedin-about-${styleName.toLowerCase().replace(/\s+/g, '-')}.txt`
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
        setDownloadedTxt(true)
        setTimeout(() => setDownloadedTxt(false), 2000)
    }

    const handleTextChange = (newText: string) => {
        setResults(prev => {
            const copy = [...prev]
            if (copy[activeStyle]) {
                copy[activeStyle] = {
                    ...copy[activeStyle],
                    text: newText,
                    char_count: newText.length,
                    word_count: newText.split(/\s+/).filter(Boolean).length
                }
            }
            return copy
        })
    }

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dedcff]">
                <div>
                    <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        AI LinkedIn About Section Generator
                    </h2>
                    <p className="text-[13.5px] text-[#050315]/70 mt-1">
                        Craft authentic, high-converting About sections in 3 distinct tones with natural keyword integration.
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3.5 py-1.5 rounded-full shadow-2xs whitespace-nowrap shrink-0">
                        3 Unique Styles
                    </span>
                </div>
            </div>

            {/* Optional Auto-Fill from PDF Strip */}
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
                            {pdfExtracted ? `Extracted: ${extractedFields.join(', ')}` : 'Upload your export to pre-fill all fields automatically'}
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
                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                        Your Role / Headline <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Senior Product Manager at Scale AI"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                        Experience Summary &amp; Scope
                    </label>
                    <textarea
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="e.g. 7+ years building enterprise SaaS and data pipelines. Led product from zero to $15M ARR."
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315] resize-none"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Core Focus &amp; Problems Solved
                        </label>
                        <input
                            type="text"
                            value={passion}
                            onChange={(e) => setPassion(e.target.value)}
                            placeholder="e.g. Scaling distributed search & developer workflows"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Key Quantified Achievement
                        </label>
                        <input
                            type="text"
                            value={achievement}
                            onChange={(e) => setAchievement(e.target.value)}
                            placeholder="e.g. Reduced search latency by 45% for 2M daily users"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Core Searchable Skills
                        </label>
                        <input
                            type="text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            placeholder="e.g. Product Strategy, LLMs, Python, System Architecture"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                            Target Audience / Stakeholders
                        </label>
                        <input
                            type="text"
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            placeholder="e.g. Founders, Engineering Leaders, Recruiters"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                        />
                    </div>
                </div>

                {currentAbout && (
                    <div className="p-4 rounded-2xl bg-[#fbfbfe] border border-[#dedcff] space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#050315]/70 uppercase tracking-wider">
                            <span>Current About (from PDF)</span>
                            <span>{currentAbout.length} chars</span>
                        </div>
                        <p className="text-[12.5px] text-[#050315]/80 leading-relaxed line-clamp-3">
                            {currentAbout}
                        </p>
                    </div>
                )}

                <button
                    onClick={handleGenerate}
                    disabled={!role.trim() || loading}
                    className="w-full py-3.5 rounded-2xl bg-[#2f27ce] hover:bg-[#433bff] disabled:opacity-50 text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                    {loading ? (
                        <span>Generating 3 Strategic About Sections...</span>
                    ) : (
                        <>
                            <span>Generate 3 About Sections</span>
                            <SparklesIcon size={18} />
                        </>
                    )}
                </button>
            </div>

            {/* Fallback Prompt Block if AI offline */}
            {error === 'ai_failed' && !loading && (
                <AIFailedPromptBlock
                    toolName="About Section Generator"
                    color="#2f27ce"
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
                <div className="space-y-4 pt-6 border-t border-[#dedcff] animate-fade-in">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <p className="text-[13px] font-extrabold text-[#050315] uppercase tracking-wider">
                                Generated Variations ({results.length})
                            </p>
                            {isAI && (
                                <span className="inline-flex items-center justify-center text-center leading-none text-[11px] font-bold text-[#2f27ce] bg-[#dedcff] px-2.5 py-1 rounded-full shadow-2xs">
                                    Anti-AI Validated
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Style Switcher Tabs */}
                    <div className="flex gap-2 p-1.5 bg-[#dedcff]/30 rounded-2xl border border-[#dedcff]">
                        {results.map((r, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveStyle(i)}
                                className={`flex-1 py-2.5 px-3 rounded-xl text-center transition-all cursor-pointer select-none ${
                                    activeStyle === i
                                        ? 'bg-[#2f27ce] text-white font-bold shadow-sm'
                                        : 'text-[#050315]/70 hover:text-[#050315] font-semibold'
                                }`}
                            >
                                <p className="text-[12.5px] capitalize">{r.style}</p>
                                <p className="text-[10.5px] opacity-80">{r.word_count} words · {r.char_count} chars</p>
                            </button>
                        ))}
                    </div>

                    {/* Active Result Card */}
                    {results[activeStyle] && (
                        <div className="p-6 rounded-3xl bg-white border border-[#dedcff] aside-card-shadow space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#dedcff]">
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3.5 py-1 rounded-full shadow-2xs">
                                        {results[activeStyle].style}
                                    </span>
                                    <span className="text-[12px] font-mono text-[#050315]/70">
                                        {results[activeStyle].char_count}/2,600 chars ({results[activeStyle].word_count} words)
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleDownloadTxt(results[activeStyle].text, results[activeStyle].style)}
                                        className="inline-flex items-center gap-1.5 text-[12.5px] font-bold px-3 py-1.5 rounded-xl border border-[#dedcff] text-[#050315]/80 hover:bg-[#fbfbfe] transition-colors cursor-pointer select-none"
                                    >
                                        {downloadedTxt ? '✓ Downloaded' : 'Download .txt'}
                                    </button>

                                    <button
                                        onClick={() => handleCopy(results[activeStyle].text, activeStyle)}
                                        className="inline-flex items-center gap-1.5 text-[12.5px] font-bold px-3.5 py-1.5 rounded-xl bg-[#2f27ce] text-white hover:bg-[#433bff] transition-colors cursor-pointer select-none shadow-xs"
                                    >
                                        {copiedIdx === activeStyle ? (
                                            <>
                                                <CheckIcon size={14} />
                                                <span>Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <CopyIcon size={14} />
                                                <span>Copy About Section</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <textarea
                                value={results[activeStyle].text}
                                onChange={(e) => handleTextChange(e.target.value)}
                                rows={10}
                                className="w-full text-[14.5px] text-[#050315] leading-relaxed font-sans bg-[#fbfbfe] p-4 rounded-2xl border border-[#dedcff] focus:border-[#2f27ce] outline-none resize-y"
                            />
                        </div>
                    )}

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="About Section Generator"
                        color="#2f27ce"
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
