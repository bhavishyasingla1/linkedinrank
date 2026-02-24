'use client'

import { useState } from 'react'
import { analyzeSEO } from '@/lib/tools'
import ToolPromptBlock, { buildSEOPrompt } from './ToolPromptBlock'

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

function ScoreBar({ label, score, max, color }: { label: string; score: number; max: number; color: string }) {
    const pct = Math.round((score / max) * 100)
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-[#4B5563]">{label}</span>
                <span className="text-[11px] font-bold tabular-nums" style={{ color }}>
                    {score}/{max}
                </span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
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
        skills: ''
    })
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
                setFormData({
                    headline: profile.headline || '',
                    about: profile.about || '',
                    skills: (profile.skills || []).join(', ')
                })
                setPdfExtracted(true)
            }
        } catch (err) {
            console.error('PDF upload failed:', err)
        } finally {
            setPdfUploading(false)
        }
    }

    const handleAnalyze = () => {
        if (!formData.headline.trim() && !formData.about.trim()) return

        const skills = formData.skills
            ? formData.skills.split(/[,•·\n]+/).map(s => s.replace(/^Top skills?\s*/i, '').trim()).filter(s => s.length > 0)
            : []
        const analysis = analyzeSEO(formData.headline, formData.about, skills)
        setResult(analysis)
    }

    const scoreColor = (score: number) =>
        score >= 70 ? '#10B981' : score >= 45 ? '#F59E0B' : '#EF4444'

    const scoreLabel = (score: number) =>
        score >= 70 ? 'Strong' : score >= 45 ? 'Needs Work' : 'Weak'

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="font-semibold text-[#0A0F1C] text-[15px]">Profile Keyword Analyzer</h2>
                        <p className="text-[11px] text-[#9CA3AF]">Upload your PDF or paste your profile | find missing recruiter keywords</p>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-4">
                {/* PDF Upload */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center border border-purple-100">
                            <svg className="w-5 h-5 text-[#7C3AED]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-[#0A0F1C]">
                                {pdfExtracted ? '✓ Profile extracted' : 'Upload LinkedIn PDF'}
                            </p>
                            <p className="text-[11px] text-[#6B7280]">
                                {pdfExtracted ? 'Headline, About, and Skills populated' : 'Auto-fills all fields from your profile'}
                            </p>
                        </div>
                        <label className={`cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${pdfExtracted
                            ? 'bg-green-100 text-green-700'
                            : 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]'
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

                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1.5">Your Headline</label>
                    <input
                        type="text"
                        value={formData.headline}
                        onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                        placeholder='e.g., Software Engineer | Python | Cloud Architecture'
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1.5">About Section</label>
                    <textarea
                        value={formData.about}
                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                        placeholder="Paste your LinkedIn About section here..."
                        rows={4}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 resize-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1.5">
                        Skills <span className="text-[#9CA3AF] font-normal">(comma or bullet separated)</span>
                    </label>
                    <input
                        type="text"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        placeholder="e.g., Python, AWS, React, Machine Learning"
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all"
                    />
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={!formData.headline.trim() && !formData.about.trim()}
                    className="w-full py-3 bg-[#7C3AED] text-white rounded-xl font-semibold text-sm hover:bg-[#6D28D9] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                    Scan Profile SEO
                </button>

                {/* Results */}
                {result && (
                    <div className="space-y-5 pt-5 border-t border-gray-100">
                        {/* Copyable AI Prompt */}
                        <ToolPromptBlock
                            toolName="Keyword Analyzer"
                            color="#7C3AED"
                            promptText={buildSEOPrompt({
                                headline: formData.headline,
                                about: formData.about,
                                skills: formData.skills,
                            })}
                        />

                        {/* Overall Score */}
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Recruiter Visibility Score</p>
                            <div className="inline-flex items-center gap-3">
                                <span className={`text-4xl font-bold tabular-nums`} style={{ color: scoreColor(result.recruiter_score) }}>
                                    {result.recruiter_score}
                                </span>
                                <div className="text-left">
                                    <span className="text-sm text-[#9CA3AF]">/100</span>
                                    <p className="text-[11px] font-semibold" style={{ color: scoreColor(result.recruiter_score) }}>
                                        {scoreLabel(result.recruiter_score)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section Breakdown */}
                        <div className="bg-[#F8FAFC] rounded-xl p-4 space-y-3">
                            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Breakdown</p>
                            <ScoreBar label="Headline" score={result.headline_score} max={30} color={scoreColor(Math.round(result.headline_score / 30 * 100))} />
                            <ScoreBar label="About Section" score={result.about_score} max={30} color={scoreColor(Math.round(result.about_score / 30 * 100))} />
                            <ScoreBar label="Skills" score={result.skills_score} max={20} color={scoreColor(Math.round(result.skills_score / 20 * 100))} />
                            <ScoreBar label="Keyword Spread" score={Math.max(0, result.recruiter_score - result.headline_score - result.about_score - result.skills_score)} max={20} color={scoreColor(Math.round(Math.max(0, result.recruiter_score - result.headline_score - result.about_score - result.skills_score) / 20 * 100))} />
                        </div>

                        {/* Industry & Coverage */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 bg-[#F8FAFC] rounded-xl px-4 py-3">
                                <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-0.5">Industry</p>
                                <p className="text-sm font-semibold text-[#7C3AED] capitalize">{result.industry_match}</p>
                            </div>
                            <div className="flex-1 bg-[#F8FAFC] rounded-xl px-4 py-3">
                                <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-0.5">Keyword Coverage</p>
                                <p className="text-sm font-semibold" style={{ color: scoreColor(result.keyword_density) }}>
                                    {result.keyword_density}%
                                    <span className="text-[#9CA3AF] font-normal text-xs ml-1">
                                        ({result.found_keywords.length}/{result.found_keywords.length + result.missing_keywords.length})
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Found Keywords */}
                        {result.found_keywords.length > 0 && (
                            <div>
                                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">
                                    Keywords Found ({result.found_keywords.length})
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {result.found_keywords.map((kw, i) => (
                                        <span key={i} className="text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-100">
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Missing Keywords */}
                        {result.missing_keywords.length > 0 && (
                            <div>
                                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">
                                    Add These Keywords
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {result.missing_keywords.slice(0, 10).map((kw, i) => (
                                        <span key={i} className="text-[11px] font-medium bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg border border-amber-100">
                                            + {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recommendations */}
                        {result.recommendations.length > 0 && (
                            <div className="bg-[#F8FAFC] rounded-xl p-4">
                                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">How to Improve</p>
                                <div className="space-y-2.5">
                                    {result.recommendations.map((rec, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <span className="w-5 h-5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                                {i + 1}
                                            </span>
                                            <p className="text-xs text-[#4B5563] leading-relaxed">{rec}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                )}

            </div>
        </div>
    )
}
