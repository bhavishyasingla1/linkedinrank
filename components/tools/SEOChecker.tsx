'use client'

import { useState } from 'react'
import { analyzeSEO } from '@/lib/tools'
import ToolPromptBlock, { buildSEOPrompt } from './ToolPromptBlock'
import { UploadIcon, SparklesIcon, CheckCircleIcon } from '@/components/ui/Icons'

interface SEOResult {
    keyword_density: number
    found_keywords: string[]
    missing_keywords: string[]
    industry_match: string
    recruiter_score: number
    headline_score: number
    about_score: number
    skills_score: number
    recommendations: string[]
}

const INDUSTRIES = [
    { id: 'auto', label: '⚡ Auto-Detect from Profile' },
    { id: 'tech', label: '💻 Software, Engineering & AI' },
    { id: 'product', label: '🚀 Product Management' },
    { id: 'marketing', label: '📈 Marketing & Growth' },
    { id: 'design', label: '🎨 UI/UX & Product Design' },
    { id: 'sales', label: '🤝 B2B Sales & Business Development' },
    { id: 'finance', label: '📊 Finance, Accounting & Investment' },
    { id: 'hr', label: '👥 HR & Talent Acquisition' },
    { id: 'operations', label: '⚙️ Operations & Supply Chain' },
    { id: 'consulting', label: '💼 Strategy & Management Consulting' },
    { id: 'healthcare', label: '🏥 Healthcare & Medical' },
    { id: 'education', label: '🎓 Education & EdTech' },
    { id: 'legal', label: '⚖️ Legal & Compliance' },
]

function ScoreBar({ label, score, max, color }: { label: string; score: number; max: number; color: string }) {
    const pct = Math.min(100, Math.round((score / max) * 100))
    return (
        <div>
            <div className="flex justify-between items-center mb-1 text-[12px]">
                <span className="font-semibold text-[#050315]/80">{label}</span>
                <span className="font-bold tabular-nums font-mono" style={{ color }}>
                    {score}/{max} ({pct}%)
                </span>
            </div>
            <div className="w-full h-2.5 bg-[#fbfbfe] rounded-full overflow-hidden border border-[#dedcff]">
                <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                />
            </div>
        </div>
    )
}

export default function SEOCheckerTool() {
    const [formData, setFormData] = useState({
        headline: '',
        about: '',
        skills: '',
        experience: '',
    })
    const [selectedIndustry, setSelectedIndustry] = useState('auto')
    const [result, setResult] = useState<SEOResult | null>(null)
    const [pdfUploading, setPdfUploading] = useState(false)
    const [pdfExtracted, setPdfExtracted] = useState(false)

    const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setPdfUploading(true)
        try {
            const fd = new FormData()
            fd.append('file', file)
            const res = await fetch('/api/analyze', { method: 'POST', body: fd })
            const data = await res.json()
            const profile = data?.data?.profile || data?.profile
            if (profile) {
                const expSummary = (profile.experience || []).map((e: any) => `${e.title || ''} at ${e.company || ''} - ${e.description || ''}`).join('\n')
                setFormData({
                    headline: profile.headline || '',
                    about: profile.about || '',
                    skills: (profile.skills || []).join(', '),
                    experience: expSummary,
                })
                setPdfExtracted(true)
            }
        } catch (err) {
            console.error('PDF upload failed:', err)
        } finally {
            setPdfUploading(false)
            if (e.target) e.target.value = ''
        }
    }

    const handleAnalyze = () => {
        if (!formData.headline.trim() && !formData.about.trim()) return

        const skills = formData.skills
            ? formData.skills.split(/[,•·\n]+/).map(s => s.replace(/^Top skills?\s*/i, '').trim()).filter(s => s.length > 0)
            : []

        const industryParam = selectedIndustry === 'auto' ? undefined : selectedIndustry
        const analysis = analyzeSEO(formData.headline, `${formData.about} ${formData.experience}`, skills, industryParam)
        setResult(analysis)
    }

    const scoreColor = (score: number) =>
        score >= 75 ? '#16A34A' : score >= 50 ? '#D97706' : '#DC2626'

    const scoreLabel = (score: number) =>
        score >= 75 ? 'Optimal Visibility' : score >= 50 ? 'Moderate Coverage' : 'Needs Keyword Optimization'

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dedcff]">
                <div>
                    <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        Profile Keyword &amp; SEO Analyzer
                    </h2>
                    <p className="text-[13.5px] text-[#050315]/70 mt-1">
                        Audit keyword discoverability, recruiter search alignment, section-by-section breakdown, and missing industry terms.
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3.5 py-1.5 rounded-full shadow-2xs whitespace-nowrap shrink-0">
                        Recruiter Algorithm Scanner
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
                            {pdfExtracted ? 'Headline, About, Experience, and Skills loaded' : 'Extract your profile sections in one click to audit SEO'}
                        </p>
                    </div>
                </div>

                <label className="cursor-pointer inline-flex items-center justify-center gap-1.5 text-[12.5px] font-bold px-3.5 py-1.5 rounded-xl bg-white border border-[#dedcff] hover:border-[#2f27ce] text-[#2f27ce] shadow-xs transition-all shrink-0 select-none">
                    {pdfUploading ? 'Scanning...' : pdfExtracted ? 'Re-upload PDF' : 'Upload PDF'}
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfUpload}
                        className="hidden"
                        disabled={pdfUploading}
                    />
                </label>
            </div>

            {/* Target Industry Switcher */}
            <div>
                <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                    Target Recruiter Domain Benchmark
                </label>
                <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                >
                    {INDUSTRIES.map((ind) => (
                        <option key={ind.id} value={ind.id}>
                            {ind.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                        Headline
                    </label>
                    <input
                        type="text"
                        value={formData.headline}
                        onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                        placeholder="e.g. Senior Software Engineer | Python · AWS · Microservices"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                        About Section
                    </label>
                    <textarea
                        value={formData.about}
                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                        placeholder="Paste your LinkedIn About section here to scan for industry keyword coverage..."
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315] resize-none"
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                        Skills <span className="text-[#050315]/50 font-normal">(comma-separated)</span>
                    </label>
                    <input
                        type="text"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        placeholder="e.g. Python, AWS, React, Distributed Systems, Machine Learning"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                    />
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={!formData.headline.trim() && !formData.about.trim()}
                    className="w-full py-3.5 rounded-2xl bg-[#2f27ce] hover:bg-[#433bff] disabled:opacity-50 text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                    <span>Run Profile SEO Scan</span>
                    <SparklesIcon size={18} />
                </button>
            </div>

            {/* Scan Results */}
            {result && (
                <div className="space-y-5 pt-6 border-t border-[#dedcff] animate-fade-in">
                    {/* Overall Recruiter Score Hero */}
                    <div className="p-6 rounded-3xl bg-white border border-[#dedcff] aside-card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-[11.5px] font-extrabold text-[#050315]/60 uppercase tracking-wider mb-1">
                                Recruiter Visibility Index
                            </p>
                            <div className="flex items-baseline gap-2">
                                <span
                                    className="text-[38px] font-extrabold tabular-nums tracking-tight font-mono"
                                    style={{ color: scoreColor(result.recruiter_score) }}
                                >
                                    {result.recruiter_score}
                                </span>
                                <span className="text-[14px] text-[#050315]/60 font-bold">/ 100</span>
                                <span
                                    className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold px-3 py-1.5 rounded-full ml-2 border"
                                    style={{
                                        backgroundColor: `${scoreColor(result.recruiter_score)}15`,
                                        color: scoreColor(result.recruiter_score),
                                        borderColor: `${scoreColor(result.recruiter_score)}30`,
                                    }}
                                >
                                    {scoreLabel(result.recruiter_score)}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-3.5 rounded-2xl bg-[#fbfbfe] border border-[#dedcff] text-center min-w-[110px]">
                                <p className="text-[11px] font-bold text-[#050315]/60 uppercase">Industry</p>
                                <p className="text-[13.5px] font-bold text-[#2f27ce] capitalize mt-0.5">
                                    {result.industry_match || 'General'}
                                </p>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-[#fbfbfe] border border-[#dedcff] text-center min-w-[110px]">
                                <p className="text-[11px] font-bold text-[#050315]/60 uppercase">Coverage</p>
                                <p className="text-[13.5px] font-bold text-[#050315] font-mono mt-0.5">
                                    {result.keyword_density}%
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section Breakdown Bars */}
                    <div className="p-6 rounded-3xl bg-[#fbfbfe] border border-[#dedcff] space-y-4">
                        <p className="text-[12px] font-extrabold text-[#050315]/70 uppercase tracking-wider">
                            Section-by-Section Keyword Breakdown
                        </p>
                        <ScoreBar
                            label="Headline Keyword Placement"
                            score={result.headline_score}
                            max={30}
                            color={scoreColor(Math.round((result.headline_score / 30) * 100))}
                        />
                        <ScoreBar
                            label="About Section Keyword Depth"
                            score={result.about_score}
                            max={30}
                            color={scoreColor(Math.round((result.about_score / 30) * 100))}
                        />
                        <ScoreBar
                            label="Core Skills Section"
                            score={result.skills_score}
                            max={20}
                            color={scoreColor(Math.round((result.skills_score / 20) * 100))}
                        />
                    </div>

                    {/* Keywords Found vs Missing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Found */}
                        <div className="p-5 rounded-2xl bg-white border border-[#dedcff] aside-card-shadow space-y-2.5">
                            <p className="text-[12px] font-bold text-[#16A34A] uppercase tracking-wider flex items-center gap-1.5">
                                <CheckCircleIcon size={16} /> Keywords Found ({result.found_keywords.length})
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {result.found_keywords.length > 0 ? (
                                    result.found_keywords.map((kw, i) => (
                                        <span
                                            key={i}
                                            className="text-[12px] font-semibold bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0] px-2.5 py-1 rounded-xl"
                                        >
                                            {kw}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-[12px] text-[#050315]/60">No primary keywords matched yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Missing Keywords to Add */}
                        <div className="p-5 rounded-2xl bg-white border border-[#dedcff] aside-card-shadow space-y-2.5">
                            <p className="text-[12px] font-bold text-[#D97706] uppercase tracking-wider flex items-center gap-1.5">
                                <SparklesIcon size={16} /> High-Impact Keywords to Add ({result.missing_keywords.length})
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {result.missing_keywords.length > 0 ? (
                                    result.missing_keywords.slice(0, 10).map((kw, i) => (
                                        <span
                                            key={i}
                                            className="text-[12px] font-semibold bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A] px-2.5 py-1 rounded-xl"
                                        >
                                            + {kw}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-[12px] text-[#050315]/60">Full keyword coverage detected across all benchmark terms!</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recommendations */}
                    {result.recommendations.length > 0 && (
                        <div className="p-6 rounded-3xl bg-white border border-[#dedcff] aside-card-shadow space-y-3.5">
                            <p className="text-[12px] font-extrabold text-[#050315]/70 uppercase tracking-wider">
                                SEO Improvement Action Items
                            </p>
                            <div className="space-y-2.5">
                                {result.recommendations.map((rec, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="w-5 h-5 rounded-full bg-[#dedcff] text-[#2f27ce] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        <p className="text-[13.5px] text-[#050315]/80 leading-relaxed">{rec}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Keyword Analyzer"
                        color="#2f27ce"
                        promptText={buildSEOPrompt({
                            headline: formData.headline,
                            about: formData.about,
                            skills: formData.skills,
                        })}
                    />
                </div>
            )}
        </div>
    )
}
