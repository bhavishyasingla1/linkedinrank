'use client'

import { useState } from 'react'
import { analyzeSEO } from '@/lib/tools'
import ToolPromptBlock, { buildSEOPrompt } from './ToolPromptBlock'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
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

function ScoreBar({ label, score, max, color }: { label: string; score: number; max: number; color: string }) {
    const pct = Math.min(100, Math.round((score / max) * 100))
    return (
        <div>
            <div className="flex justify-between items-center mb-1 text-[12px]">
                <span className="font-medium text-[#475569]">{label}</span>
                <span className="font-bold tabular-nums" style={{ color }}>
                    {score}/{max} ({pct}%)
                </span>
            </div>
            <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden border border-[#E2E8F0]">
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
            if (e.target) e.target.value = ''
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
        score >= 75 ? '#16A34A' : score >= 50 ? '#D97706' : '#DC2626'

    const scoreLabel = (score: number) =>
        score >= 75 ? 'Optimal Visibility' : score >= 50 ? 'Moderate Coverage' : 'Needs Optimization'

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
                <div>
                    <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                        Profile Keyword &amp; SEO Analyzer
                    </h2>
                    <p className="text-[13px] text-[#64748B] mt-0.5">
                        Audit keyword discoverability, recruiter search alignment, and missing industry terms.
                    </p>
                </div>
                <Badge variant="brand" size="sm">
                    Instant Scanner
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
                            {pdfExtracted ? 'Headline, About, and Skills loaded' : 'Extract your headline, about, and skills in one click'}
                        </p>
                    </div>
                </div>

                <label className="cursor-pointer inline-flex items-center justify-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#BAE0FD] text-[#0A66C2] hover:bg-white/80 transition-colors shrink-0 select-none">
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

            {/* Form Inputs */}
            <div className="space-y-4">
                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                        Headline
                    </label>
                    <input
                        type="text"
                        value={formData.headline}
                        onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                        placeholder="e.g. Senior Software Engineer | Python · AWS · Microservices"
                        className="input-base"
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                        About Section
                    </label>
                    <textarea
                        value={formData.about}
                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                        placeholder="Paste your LinkedIn About section here to scan for industry keyword coverage..."
                        rows={4}
                        className="input-base resize-none"
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                        Skills <span className="text-[#64748B] font-normal">(comma-separated)</span>
                    </label>
                    <input
                        type="text"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        placeholder="e.g. Python, AWS, React, Distributed Systems, Machine Learning"
                        className="input-base"
                    />
                </div>

                <Button
                    onClick={handleAnalyze}
                    disabled={!formData.headline.trim() && !formData.about.trim()}
                    variant="primary"
                    size="lg"
                    fullWidth
                    rightIcon={<SparklesIcon size={16} />}
                >
                    Run Profile SEO Scan
                </Button>
            </div>

            {/* Scan Results */}
            {result && (
                <div className="space-y-5 pt-6 border-t border-[#F1F5F9] animate-fade-in">
                    {/* Overall Recruiter Score Hero */}
                    <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-0.5">
                                Recruiter Visibility Index
                            </p>
                            <div className="flex items-baseline gap-2">
                                <span
                                    className="text-[36px] font-extrabold tabular-nums tracking-tight"
                                    style={{ color: scoreColor(result.recruiter_score) }}
                                >
                                    {result.recruiter_score}
                                </span>
                                <span className="text-[14px] text-[#64748B]">/ 100</span>
                                <span
                                    className="text-[12px] font-bold px-2 py-0.5 rounded-full ml-2"
                                    style={{
                                        backgroundColor: `${scoreColor(result.recruiter_score)}15`,
                                        color: scoreColor(result.recruiter_score),
                                    }}
                                >
                                    {scoreLabel(result.recruiter_score)}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-[#FAFAFA] border border-[#E2E8F0] text-center min-w-[100px]">
                                <p className="text-[10px] font-bold text-[#64748B] uppercase">Industry</p>
                                <p className="text-[13px] font-bold text-[#0A66C2] capitalize mt-0.5">
                                    {result.industry_match || 'General'}
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-[#FAFAFA] border border-[#E2E8F0] text-center min-w-[100px]">
                                <p className="text-[10px] font-bold text-[#64748B] uppercase">Coverage</p>
                                <p className="text-[13px] font-bold text-[#0F172A] mt-0.5">
                                    {result.keyword_density}%
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section Breakdown Bars */}
                    <div className="p-5 rounded-xl bg-[#FAFAFA] border border-[#E2E8F0] space-y-3.5">
                        <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                            Section Breakdown
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
                        <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
                            <p className="text-[11px] font-bold text-[#16A34A] uppercase tracking-wider flex items-center gap-1.5">
                                <CheckCircleIcon size={14} /> Keywords Found ({result.found_keywords.length})
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {result.found_keywords.length > 0 ? (
                                    result.found_keywords.map((kw, i) => (
                                        <span
                                            key={i}
                                            className="text-[12px] font-medium bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0] px-2.5 py-1 rounded-md"
                                        >
                                            {kw}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-[12px] text-[#64748B]">No primary keywords matched.</p>
                                )}
                            </div>
                        </div>

                        {/* Missing Keywords to Add */}
                        <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
                            <p className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider flex items-center gap-1.5">
                                <SparklesIcon size={14} /> Missing Keywords to Target
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {result.missing_keywords.length > 0 ? (
                                    result.missing_keywords.slice(0, 10).map((kw, i) => (
                                        <span
                                            key={i}
                                            className="text-[12px] font-medium bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A] px-2.5 py-1 rounded-md"
                                        >
                                            + {kw}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-[12px] text-[#64748B]">Full keyword coverage detected!</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recommendations */}
                    {result.recommendations.length > 0 && (
                        <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
                            <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                                SEO Improvement Action Items
                            </p>
                            <div className="space-y-2">
                                {result.recommendations.map((rec, i) => (
                                    <div key={i} className="flex items-start gap-2.5">
                                        <span className="w-5 h-5 rounded-full bg-[#F0F7FF] text-[#0A66C2] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        <p className="text-[13px] text-[#475569] leading-relaxed">{rec}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Pre-formatted Prompt Block */}
                    <ToolPromptBlock
                        toolName="Keyword Analyzer"
                        color="#0A66C2"
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
