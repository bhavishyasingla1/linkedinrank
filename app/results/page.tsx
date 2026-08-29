'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import ScoreHero from '@/components/ScoreHero'
import CategoryScores from '@/components/CategoryScores'
import RecommendationCards from '@/components/RecommendationCards'
import ImprovementPath from '@/components/ImprovementPath'
import HeadlineRewriter from '@/components/HeadlineRewriter'
import { AnalysisResult } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
    ArrowLeftIcon,
    CopyIcon,
    CheckIcon,
    SparklesIcon,
    ArrowRightIcon,
    FileTextIcon,
} from '@/components/ui/Icons'

function buildAIPrompt(analysis: AnalysisResult): string {
    const profile = analysis.profile
    const scores = analysis.categoryScores || []
    const recommendations = analysis.recommendations || []

    const weakAreas = scores.filter((c) => c.percentage < 60)

    let prompt = `You are an elite LinkedIn profile strategist. I analyzed my profile with LinkedInRank and scored ${analysis.linkedInScore}/100 (${analysis.tier} tier).

Please optimize my profile using the diagnostics below.

═══ PROFILE DATA ═══
`

    if (profile?.name) prompt += `Name: ${profile.name}\n`
    if (profile?.headline) prompt += `Headline: ${profile.headline}\n`
    if (profile?.about) prompt += `About: ${profile.about}\n`

    if (profile?.experience && profile.experience.length > 0) {
        prompt += `\nExperience (${profile.experience.length} roles):\n`
        profile.experience.forEach((exp, i) => {
            prompt += `${i + 1}. ${exp.title}${exp.company ? ` at ${exp.company}` : ''} (${exp.duration || ''})\n`
            if (exp.description) prompt += `   Description: ${exp.description.slice(0, 300)}\n`
        })
    }

    if (profile?.skills && profile.skills.length > 0) {
        prompt += `\nSkills: ${profile.skills.join(', ')}\n`
    }

    prompt += `\n═══ SCORES & SIGNALS ═══\n`
    scores.forEach((cat) => {
        prompt += `- ${cat.category}: ${cat.earnedPoints}/${cat.maxPoints} pts (${Math.round(cat.percentage)}%)\n`
    })

    if (weakAreas.length > 0) {
        prompt += `\nPriority Fix Areas: ${weakAreas.map((c) => c.category).join(', ')}\n`
    }

    if (recommendations.length > 0) {
        prompt += `\nKey Recommendations:\n`
        recommendations.slice(0, 4).forEach((rec, i) => {
            prompt += `${i + 1}. [${rec.impact}] ${rec.title}: ${rec.fix}\n`
        })
    }

    prompt += `\nPlease generate:
1. Three high-converting headline options (Role + Industry + Core searchable skills).
2. A compelling, 3-paragraph first-person About summary with a strong hook.
3. Quantified bullet points for my most recent experience roles.`

    return prompt
}

export default function ResultsPage() {
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
    const [promptCopied, setPromptCopied] = useState(false)
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

    const handleCopyPrompt = () => {
        if (!analysis) return
        const promptText = buildAIPrompt(analysis)
        navigator.clipboard.writeText(promptText)
        setPromptCopied(true)
        setTimeout(() => setPromptCopied(false), 2500)
    }

    const handlePrint = () => {
        window.print()
    }

    if (!analysis) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="spinner w-8 h-8" />
            </div>
        )
    }

    const userName = analysis.profile?.name || 'LinkedIn User'
    const careerStage = (analysis as any).careerStage || ''
    const archetype = (analysis as any).archetype?.label || (analysis as any).archetype?.description || ''

    const profileHeadline = analysis.profile?.headline || ''
    const profileAbout = analysis.profile?.about || ''
    const skillsList = analysis.profile?.skills || (analysis as any).profile?.skills || []

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <SiteHeader />

            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
                {/* ── Top Bar: Navigation & Report Actions ──────── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#64748B] hover:text-[#0A66C2] transition-colors no-underline group"
                    >
                        <ArrowLeftIcon size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                        <span>Analyze New Profile</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handlePrint}
                            leftIcon={<FileTextIcon size={14} />}
                        >
                            Save PDF Report
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleCopyPrompt}
                            leftIcon={promptCopied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
                        >
                            {promptCopied ? 'Prompt Copied' : 'Copy AI Prompt'}
                        </Button>
                    </div>
                </div>

                {/* ── Report Intro Header ───────────────────────── */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-wider">
                            Verified Audit Report
                        </span>
                        <h1 className="text-[20px] sm:text-[24px] font-bold text-[#0F172A] tracking-tight mt-0.5">
                            {userName !== 'LinkedIn User' ? `${userName}'s Profile Score` : 'Your LinkedIn Profile Score'}
                        </h1>
                        {archetype && (
                            <p className="text-[13px] text-[#64748B] mt-1">
                                Archetype: <strong className="text-[#0F172A]">{archetype}</strong>
                                {careerStage && <span> · {careerStage.replace('-', ' ')}</span>}
                            </p>
                        )}
                    </div>

                    <Badge variant="brand" size="md" dot>
                        Analysis Complete
                    </Badge>
                </div>

                {/* ── Score Hero ────────────────────────────────── */}
                <ScoreHero
                    score={analysis.linkedInScore}
                    name={userName}
                    tier={analysis.tier}
                    peerContext={analysis.peerContext}
                />

                {/* ── Parsed Profile Snapshot ───────────────────── */}
                {(profileHeadline || skillsList.length > 0) && (
                    <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs">
                        <div className="p-5 sm:p-6 border-b border-[#F1F5F9]">
                            <h3 className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-3">
                                Parsed Profile Data
                            </h3>

                            {profileHeadline && (
                                <div className="mb-4">
                                    <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
                                        Headline
                                    </p>
                                    <p className="text-[14px] font-medium text-[#0F172A] leading-relaxed">
                                        {profileHeadline}
                                    </p>
                                </div>
                            )}

                            {profileAbout && (
                                <div className="mb-4">
                                    <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
                                        About Summary
                                    </p>
                                    <p className="text-[13px] text-[#475569] leading-relaxed line-clamp-3">
                                        {profileAbout}
                                    </p>
                                </div>
                            )}

                            {skillsList.length > 0 && (
                                <div>
                                    <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-2">
                                        Extracted Skills ({skillsList.length})
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skillsList.slice(0, 10).map((skill: string, i: number) => (
                                            <span
                                                key={i}
                                                className="text-[12px] bg-[#F0F7FF] text-[#0A66C2] border border-[#BAE0FD] px-2.5 py-0.5 rounded-md font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {skillsList.length > 10 && (
                                            <span className="text-[12px] text-[#64748B] px-2 py-0.5">
                                                +{skillsList.length - 10} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── Category Scores Breakdown ─────────────────── */}
                <CategoryScores categories={analysis.categoryScores} />

                {/* ── Priority Improvement Roadmap ─────────────── */}
                <ImprovementPath
                    steps={analysis.improvementPath}
                    currentScore={analysis.linkedInScore}
                />

                {/* ── Headline Alternatives ─────────────────────── */}
                {analysis.profile?.headline && (
                    <HeadlineRewriter
                        currentHeadline={analysis.profile.headline}
                        rewrites={(analysis as any).headlineRewrites || [
                            `${analysis.profile.headline} | Python · System Architecture · Growth`,
                            `Building scalable digital products | Software Engineer & Technical Strategist`,
                        ]}
                    />
                )}

                {/* ── Detailed Recommendations ─────────────────── */}
                <RecommendationCards
                    recommendations={analysis.recommendations}
                    careerStage={careerStage}
                    archetype={archetype}
                    categoryScores={analysis.categoryScores}
                    profile={analysis.profile}
                />

                {/* ── AI Prompt Monospace Copy Box ─────────────── */}
                <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-5 sm:p-6 text-white shadow-sm space-y-3">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <SparklesIcon size={16} className="text-[#38BDF8]" />
                            <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#38BDF8]">
                                AI Rewrite Prompt (ChatGPT / Claude / Gemini)
                            </h3>
                        </div>
                        <button
                            onClick={handleCopyPrompt}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1E293B] hover:bg-[#334155] text-white text-[12px] font-medium transition-colors cursor-pointer"
                        >
                            {promptCopied ? <CheckIcon size={13} className="text-[#16A34A]" /> : <CopyIcon size={13} />}
                            <span>{promptCopied ? 'Copied' : 'Copy Prompt'}</span>
                        </button>
                    </div>
                    <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                        Copy this pre-formatted prompt into ChatGPT or Claude alongside your PDF to generate fully rewritten profile sections tailored to your score feedback.
                    </p>
                    <div className="p-3.5 bg-[#020617] rounded-lg border border-[#1E293B] font-mono text-[12px] text-[#CBD5E1] max-h-36 overflow-y-auto leading-relaxed">
                        {buildAIPrompt(analysis).slice(0, 450)}...
                    </div>
                </div>

                {/* ── Next Actions ─────────────────────────────── */}
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                    <div>
                        <h4 className="text-[15px] font-semibold text-[#0F172A]">
                            Want to optimize a specific section now?
                        </h4>
                        <p className="text-[13px] text-[#475569] mt-0.5">
                            Use our free generators for headlines, about sections, and experience descriptions.
                        </p>
                    </div>
                    <Button
                        href="/tools"
                        variant="primary"
                        size="md"
                        rightIcon={<ArrowRightIcon size={14} />}
                    >
                        Explore Free Tools
                    </Button>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}
