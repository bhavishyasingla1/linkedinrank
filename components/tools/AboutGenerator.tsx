'use client'

import { useState } from 'react'
import { generateAbout } from '@/lib/tools'
import ToolPromptBlock, { AIFailedPromptBlock, buildAboutPrompt } from './ToolPromptBlock'

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
        // Clear previous results on re-upload
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

                // Role: headline or first experience
                // Detect if headline is actually a university/institution name (common for students)
                const headlineText = (profile.headline || '').trim()
                const isUniversityName = /\b(university|institute|college|school|academy|iit|nit|bits|iiit|thapar|vit|srm|amity|manipal|lpu|chandigarh|delhi|mumbai|bangalore|chennai)\b/i.test(headlineText) && !/(student|intern|engineer|developer|manager|analyst|founder|researcher|professor|teacher|designer|consultant|freelanc)/i.test(headlineText)

                if (headlineText && !isUniversityName) {
                    setRole(headlineText)
                    filled.push('Role')
                } else if (profile.experience?.[0]?.title) {
                    setRole(`${profile.experience[0].title}${profile.experience[0].company ? ` at ${profile.experience[0].company}` : ''}`)
                    filled.push('Role')
                } else if (headlineText) {
                    // If headline is university but no experience, use "Student at [University]"
                    setRole(`Student at ${headlineText}`)
                    filled.push('Role')
                }

                // Experience: all roles with details
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

                // Skills
                if (profile.skills?.length) {
                    setSkills(profile.skills.slice(0, 10).join(', '))
                    filled.push('Skills')
                }

                // Education
                if (profile.education?.length) {
                    setEducation(profile.education)
                    filled.push('Education')
                }

                // Current About
                if (profile.about) {
                    setCurrentAbout(profile.about)
                    filled.push('Current About')
                }

                // Certifications as achievements
                if (profile.certifications?.length) {
                    setAchievement(profile.certifications.slice(0, 3).join(', '))
                    filled.push('Achievements')
                } else if (profile.about) {
                    // Try to extract achievements from about
                    const numMatch = profile.about.match(/\d+[%+x]|\$[\d,]+|[\d,]+\s*(users|clients|customers|projects|teams|people)/gi)
                    if (numMatch?.length) {
                        setAchievement(numMatch.slice(0, 2).join('; '))
                        filled.push('Achievements')
                    }
                }

                // Passion from about
                if (profile.about) {
                    const passionMatch = profile.about.match(/(?:passionate about|care deeply about|driven by|focused on|dedicated to|committed to)\s+([^.]+)/i)
                    if (passionMatch) {
                        setPassion(passionMatch[1].trim().slice(0, 150))
                        filled.push('What drives you')
                    }
                }

                setExtractedFields(filled)
                setPdfExtracted(true)
            }
        } catch (err) {
            console.error('PDF upload failed:', err)
        } finally {
            setPdfUploading(false)
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

        // Fallback: use rule-based generator
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
        try { navigator.clipboard.writeText(text) } catch {
            const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'
            document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta)
        }
        setCopiedIdx(idx)
        setTimeout(() => setCopiedIdx(null), 2000)
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="font-semibold text-[#0A0F1C] text-[15px]">About Section Builder</h2>
                        <p className="text-[11px] text-[#6B7280]">Upload your PDF or enter your details | get 3 personalized About sections</p>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-4">
                {/* PDF Upload */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center border border-emerald-100">
                            <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-[#0A0F1C]">
                                {pdfExtracted ? '✓ Profile extracted' : 'Upload LinkedIn PDF'}
                            </p>
                            <p className="text-[11px] text-[#6B7280]">
                                {pdfExtracted
                                    ? `Extracted: ${extractedFields.join(', ')}`
                                    : 'Auto-fills role, experience, skills, education, and more'}
                            </p>
                        </div>
                        <label className={`cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${pdfExtracted
                            ? 'bg-green-100 text-green-700'
                            : 'bg-[#10B981] text-white hover:bg-[#059669]'
                            }`}>
                            {pdfUploading ? (
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Extracting...
                                </span>
                            ) : pdfExtracted ? 'Re-upload' : 'Upload'}
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

                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1">
                        Your Role / Headline <span className="text-red-400">*</span>
                        {pdfExtracted && role && <span className="text-[9px] text-emerald-500 ml-1.5 font-normal">auto-filled from PDF</span>}
                    </label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g., Senior Product Designer at Figma"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/20"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1">
                        Experience Summary
                        {pdfExtracted && experience && <span className="text-[9px] text-emerald-500 ml-1.5 font-normal">auto-filled from PDF</span>}
                    </label>
                    <textarea
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="e.g., 8 years in B2B SaaS, previously at Stripe and Notion"
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/20 resize-none max-h-28 overflow-y-auto"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-[#4B5563] mb-1">
                            What drives you
                            {pdfExtracted && passion && <span className="text-[9px] text-emerald-500 ml-1 font-normal">PDF</span>}
                        </label>
                        <textarea
                            value={passion}
                            onChange={(e) => setPassion(e.target.value)}
                            placeholder="e.g., Making complex tools simple"
                            rows={2}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/20 resize-none max-h-20 overflow-y-auto"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-[#4B5563] mb-1">
                            Key achievement
                            {pdfExtracted && achievement && <span className="text-[9px] text-emerald-500 ml-1 font-normal">PDF</span>}
                        </label>
                        <textarea
                            value={achievement}
                            onChange={(e) => setAchievement(e.target.value)}
                            placeholder="e.g., Led redesign that boosted adoption 40%"
                            rows={2}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/20 resize-none max-h-20 overflow-y-auto"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-[#4B5563] mb-1">
                            Core skills/tools
                            {pdfExtracted && skills && <span className="text-[9px] text-emerald-500 ml-1 font-normal">PDF</span>}
                        </label>
                        <textarea
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            placeholder="e.g., Design systems, Prototyping, User research"
                            rows={2}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/20 resize-none max-h-20 overflow-y-auto"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-[#4B5563] mb-1">Target audience</label>
                        <input
                            type="text"
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            placeholder="e.g., Startup founders, Product teams"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/20"
                        />
                    </div>
                </div>

                {/* Current About preview if extracted */}
                {currentAbout && (
                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1.5">
                            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Current About (from PDF)</p>
                            <span className="text-[9px] text-[#C4C9D4]">{currentAbout.length} chars</span>
                        </div>
                        <p className="text-[12px] text-[#6B7280] leading-relaxed max-h-20 overflow-y-auto whitespace-pre-wrap">{currentAbout}</p>
                    </div>
                )}

                <button
                    onClick={handleGenerate}
                    disabled={!role.trim() || loading}
                    className="w-full py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            AI is writing your About section...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                            </svg>
                            Generate About Sections
                        </>
                    )}
                </button>

                {/* AI Failed - show prompt */}
                {error === 'ai_failed' && !loading && (
                    <AIFailedPromptBlock
                        toolName="About Section Builder"
                        color="#10B981"
                        promptText={buildAboutPrompt({
                            role, experience, passion, achievement, skills, audience,
                            currentAbout: currentAbout || undefined,
                            education: education.length ? education : undefined,
                        })}
                    />
                )}

                {/* Results */}
                {results.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                                {results.length} Styles Generated
                            </p>
                            {isAI && (
                                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                    </svg>
                                    AI-Generated | review and personalize
                                </span>
                            )}
                        </div>

                        {/* Copyable AI Prompt */}
                        <ToolPromptBlock
                            toolName="About Section Builder"
                            color="#10B981"
                            promptText={buildAboutPrompt({
                                role, experience, passion, achievement, skills, audience,
                                currentAbout: currentAbout || undefined,
                                education: education.length ? education : undefined,
                            })}
                        />

                        {/* Style tabs */}
                        <div className="flex gap-1.5">
                            {results.map((r, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveStyle(i)}
                                    className={`flex-1 px-3 py-2 rounded-lg border text-center transition-all ${activeStyle === i
                                        ? 'border-[#10B981] bg-emerald-50 text-[#10B981]'
                                        : 'border-gray-200 text-[#6B7280] hover:border-gray-300'
                                        }`}
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-wider">{r.style}</p>
                                    <p className="text-[9px] mt-0.5 opacity-70">{r.word_count} words</p>
                                </button>
                            ))}
                        </div>

                        {/* Active result */}
                        {results[activeStyle] && (
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                                <div className="px-4 py-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{results[activeStyle].style}</span>
                                            <span className="text-[9px] text-[#C4C9D4]">{results[activeStyle].word_count} words · {results[activeStyle].char_count} chars</span>
                                            {results[activeStyle].char_count > 2600 && (
                                                <span className="text-[9px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">Over 2,600 char limit</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleCopy(results[activeStyle].text, activeStyle)}
                                            className="text-[11px] text-[#10B981] hover:underline font-semibold"
                                        >
                                            {copiedIdx === activeStyle ? '✓ Copied' : 'Copy'}
                                        </button>
                                    </div>
                                    <div className="text-[13px] text-[#0A0F1C] leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto pr-1">{results[activeStyle].text}</div>
                                </div>
                            </div>
                        )}

                        <p className="text-[10px] text-center text-[#C4C9D4]">
                            LinkedIn About limit: 2,600 characters. Review, personalize, then paste.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
