'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ScoreHero from '@/components/ScoreHero'
import CategoryScores from '@/components/CategoryScores'
import RecommendationCards from '@/components/RecommendationCards'
import ImprovementPath from '@/components/ImprovementPath'
import HeadlineRewriter from '@/components/HeadlineRewriter'
import { AnalysisResult } from '@/lib/types'
import SiteHeader from '@/components/SiteHeader'

export default function ResultsPage() {
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
    const [isDownloading, setIsDownloading] = useState(false)
    const [promptCopied, setPromptCopied] = useState(false)

    const AI_PROMPT = 'Help me improve my LinkedIn profile based on this LinkedInRank analysis. Rewrite my headline, About section, and experience descriptions based on the scores and recommendations.'

    const copyPrompt = () => {
        navigator.clipboard.writeText(AI_PROMPT)
        setPromptCopied(true)
        setTimeout(() => setPromptCopied(false), 2000)
    }
    const router = useRouter()

    useEffect(() => {
        const stored = sessionStorage.getItem('analysisResult')
        if (!stored) {
            router.push('/')
            return
        }
        try {
            setAnalysis(JSON.parse(stored))
        } catch {
            router.push('/')
        }
    }, [router])

    const downloadFullReport = () => {
        setIsDownloading(true)
        window.print()
        setTimeout(() => setIsDownloading(false), 1000)
    }

    if (!analysis) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full"
                    style={{ animation: 'spin 0.8s linear infinite' }} />
            </div>
        )
    }

    const userName = analysis.profile?.name || 'LinkedIn User'
    const careerStage = (analysis as any).careerStage || ''
    const archetype = (analysis as any).archetype?.label || ''

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            {/* Header */}
            <SiteHeader />

            <div className="relative z-10 max-w-xl mx-auto px-6 py-10">
                {/* Score */}
                <ScoreHero
                    name={userName}
                    score={analysis.linkedInScore}
                    tier={analysis.tier}
                    peerContext={analysis.peerContext}
                />

                {/* Sections */}
                <div className="space-y-5 mt-6">
                    <CategoryScores categories={analysis.categoryScores} />

                    <ImprovementPath
                        steps={analysis.improvementPath}
                        currentScore={analysis.linkedInScore}
                    />

                    {analysis.profile?.headline && (
                        <HeadlineRewriter
                            currentHeadline={analysis.profile.headline}
                            rewrites={analysis.headlineRewrites || []}
                        />
                    )}

                    <RecommendationCards
                        recommendations={analysis.recommendations}
                        careerStage={careerStage}
                        archetype={archetype}
                        categoryScores={analysis.categoryScores}
                        profile={analysis.profile}
                    />

                    {/* AI Rewrite Prompt */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden no-print">
                        <div className="px-5 pt-5 pb-4">
                            <div className="flex items-center gap-2.5 mb-3">
                                <svg className="w-4 h-4 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                                <h3 className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">AI Profile Rewrite</h3>
                            </div>

                            <button
                                onClick={copyPrompt}
                                className={`w-full text-left rounded-lg p-3 border transition-all cursor-pointer ${
                                    promptCopied
                                        ? 'bg-emerald-50 border-emerald-200'
                                        : 'bg-[#F8FAFC] border-gray-100 hover:border-[#DBEAFE] hover:bg-[#EFF6FF]/50'
                                }`}
                            >
                                <div className="flex items-start gap-2">
                                    {promptCopied ? (
                                        <svg className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                    ) : (
                                        <svg className="w-3.5 h-3.5 text-[#0A66C2] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H6M15.75 18.75h-6" /></svg>
                                    )}
                                    <span className={`text-xs leading-relaxed ${promptCopied ? 'text-emerald-600 font-medium' : 'text-[#4B5563]'}`}>
                                        {promptCopied ? 'Copied to clipboard!' : `"${AI_PROMPT}"`}
                                    </span>
                                </div>
                            </button>

                            <div className="flex flex-wrap items-center gap-1.5 mt-3">
                                <span className="text-[10px] text-[#9CA3AF]">Paste into</span>
                                {['ChatGPT', 'Claude', 'Gemini'].map((name, i) => (
                                    <span key={i} className="text-[10px] font-medium text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded">{name}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2.5 no-print">
                        <button
                            onClick={downloadFullReport}
                            disabled={isDownloading}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white hover:bg-[#F8FAFC] transition-colors text-sm font-medium text-[#0A0F1C] cursor-pointer"
                        >
                            <svg className="w-4 h-4 text-[#6B7280]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                            {isDownloading ? 'Opening...' : 'Save PDF'}
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white hover:bg-[#F8FAFC] transition-colors text-sm font-medium text-[#0A0F1C] cursor-pointer"
                        >
                            <svg className="w-4 h-4 text-[#6B7280]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" /></svg>
                            New Analysis
                        </button>
                    </div>

                    {/* Privacy */}
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#C4C9D4] pb-4 no-print">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                        <p>Data processed in memory only — nothing stored.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
