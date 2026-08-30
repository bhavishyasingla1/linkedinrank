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
    ShieldCheckIcon,
} from '@/components/ui/Icons'

function buildFullAIPrompt(analysis: AnalysisResult): string {
    const profile = analysis.profile
    const scores = analysis.categoryScores || []
    const recommendations = analysis.recommendations || []
    const userName = profile?.name || 'LinkedIn User'
    const role = profile?.experience?.[0]?.title || profile?.headline?.split('|')?.[0]?.trim() || 'Professional'
    const archetype = (analysis as any).archetype?.label || (analysis as any).archetype?.description || ''
    const careerStage = (analysis as any).careerStage || 'professional'

    const weakAreas = scores.filter((c) => c.percentage < 70)

    let prompt = `You are an elite LinkedIn profile ghostwriter and personal branding strategist. Your writing is crisp, human, authoritative, and completely devoid of corporate fluff or AI clichés. You write like a seasoned executive advisor.

I analyzed my LinkedIn profile with LinkedInRank and scored ${analysis.linkedInScore}/100 (${analysis.tier.toUpperCase()} tier).

Please optimize and rewrite my LinkedIn profile using the audit diagnostics, candidate data, and strict writing rules below.

═══ CANDIDATE CONTEXT ═══
• Name: ${userName}
• Target / Current Role: ${role}
• Profile Archetype: ${archetype || 'Specialist'}
• Career Stage: ${careerStage}
• LinkedInRank Audit Score: ${analysis.linkedInScore}/100 (${analysis.tier} tier)
`

    if (profile?.headline) prompt += `• Current Headline: "${profile.headline}"\n`
    if (profile?.about) prompt += `\n• Current About Section:\n"${profile.about.trim()}"\n`

    if (profile?.experience && profile.experience.length > 0) {
        prompt += `\n• Experience History (${profile.experience.length} roles listed):\n`
        profile.experience.forEach((exp, i) => {
            prompt += `  ${i + 1}. ${exp.title || 'Role'}${exp.company ? ` at ${exp.company}` : ''} [${exp.duration || 'Not specified'}]\n`
            if (exp.description) {
                prompt += `     Details: ${exp.description.trim().slice(0, 350)}\n`
            }
        })
    }

    if (profile?.skills && profile.skills.length > 0) {
        prompt += `\n• Extracted Skills: ${profile.skills.join(', ')}\n`
    }
    if (profile?.education && profile.education.length > 0) {
        const eduStr = Array.isArray(profile.education) ? profile.education.join(' | ') : JSON.stringify(profile.education)
        prompt += `• Education: ${eduStr}\n`
    }
    if (profile?.certifications && profile.certifications.length > 0) {
        prompt += `• Certifications: ${profile.certifications.join(', ')}\n`
    }

    prompt += `\n═══ AUDIT DIAGNOSTICS & SCORE GAPS ═══\n`
    scores.forEach((cat) => {
        prompt += `- ${cat.category}: ${cat.earnedPoints}/${cat.maxPoints} pts (${Math.round(cat.percentage)}%)\n`
    })

    if (weakAreas.length > 0) {
        prompt += `\nPriority Fix Sections: ${weakAreas.map((c) => c.category).join(', ')}\n`
    }

    if (recommendations.length > 0) {
        prompt += `\nKey Recommended Fixes:\n`
        recommendations.slice(0, 4).forEach((rec, i) => {
            prompt += `${i + 1}. [${rec.impact}] ${rec.title}: ${rec.fix}\n`
        })
    }

    prompt += `\n═══ STRICT WRITING & ANTI-AI RULES (HUMANS & WORLD-BUILDING FRAMEWORK) ═══
1. BANNED VOCABULARY & PHRASE CLUSTERS (DO NOT use any of these words or stems):
   additionally, align with, boasts, bolstered, crucial, delve, delving, emphasize, emphasizing, enduring, enhance, enhancing, fostering, garner, highlight, highlighting, interplay, intricate, intricacies, key (as filler), landscape (abstract noun), meticulous, meticulously, pivotal, robust, showcase, showcasing, tapestry, testament, underscore, valuable, vibrant, rich, profound, exemplifies, commitment to, groundbreaking, renowned, diverse array, unlock, supercharge, transformative, innovative, passionate, results-driven, team player, go-getter, in today's fast-paced world, not only X but also Y.

2. SENTENCE CONSTRUCTION & COPULAS:
   - Use plain "is" and "has" constructions. Avoid dressed-up copula substitutes (serves as, stands as, marks, functions as, operates as, represents, boasts, features, maintains).
   - NEVER tack on a dangling "-ing" clause at sentence ends (e.g., "...creating a lively community", "...cementing its position").
   - Do NOT force contrast ("It's not X, it's Y", "X rather than Y").
   - Do NOT pad examples to three artificially.
   - Do NOT cycle synonyms to dodge natural word repetition.

3. FORMATTING, PUNCTUATION & TONE:
   - NEVER use em dashes (—) or en dashes (–). Use commas, periods, or | instead.
   - NO emojis, no motivational cheerleading, no inflated claims.
   - Sentence case for all titles and section headings.
   - Keep bold sparing; don't bold every buzzword.
   - Sound like a credible, accomplished human with high cognitive hospitality and low decoding cost.

4. SOURCING & TRUTH INTEGRITY:
   - Ground all suggestions in my actual experience.
   - Do NOT invent fake metrics, companies, or credentials.
   - Do NOT manufacture significance ("marks a turning point", "reflects broader trends").
   - Omit conversational asides ("I hope this helps", "Let me know"). Deliver deliverables directly.

═══ REQUIRED DELIVERABLES ═══

1. THREE HEADLINE OPTIONS (Strictly under 120 chars each, keyword-rich, no emojis, no em dashes):
   - Option 1 (Value Proposition): Who I help + specific outcome.
   - Option 2 (Authority & Expertise): Role + Core Domain + Key Technologies.
   - Option 3 (Builder / Operator): What I build/scale + unique differentiator.

2. COMPLETE ABOUT SECTION REWRITE:
   - First-person voice ("I").
   - 3-4 short, punchy paragraphs separated by line breaks for cognitive hospitality and mobile scanning.
   - Open with a scroll-stopping hook that states what I build or solve (no generic openers like "I am a...").
   - Weave in my core skills, methodologies, and specific domain tools naturally.
   - End with a clean, direct call-to-action to connect.

3. REVAMPED EXPERIENCE BULLET POINTS:
   - Provide 2-3 high-impact bullet points for my top experience role(s).
   - Format: [Active Power Verb] + [Specific Action/Scope] + [Measurable Outcome/Impact].
   - Active power verbs: Led, Built, Designed, Shipped, Automated, Scaled, Calibrated, Deployed.

4. TOP 5 STRATEGIC SEARCH TERMS / SKILLS:
   - Recommend 5 specific high-demand industry skills I should add to my profile for recruiter search visibility.`

    return prompt
}

function buildQuickAIPrompt(analysis: AnalysisResult): string {
    const role = analysis.profile?.experience?.[0]?.title || analysis.profile?.headline?.split('|')?.[0]?.trim() || 'Professional'
    return `Here is my LinkedIn PDF data and my LinkedInRank analysis report (Score: ${analysis.linkedInScore}/100, ${analysis.tier} tier, Role: ${role}). Rewrite my headline (under 120 chars), About section (first-person, 3 short paragraphs with hook), and experience bullets based on this feedback. Apply strict human writing rules: use plain "is"/"has" copulas, no dangling "-ing" clauses, no buzzwords (passionate, results-driven, delve, robust, pivotal, bolster, crucial, showcase), no emojis, no em dashes (use | or commas), and maintain my authentic voice.`
}

export default function ResultsPage() {
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
    const [promptMode, setPromptMode] = useState<'full' | 'quick'>('full')
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

    const getActivePrompt = () => {
        if (!analysis) return ''
        return promptMode === 'full' ? buildFullAIPrompt(analysis) : buildQuickAIPrompt(analysis)
    }

    const handleCopyPrompt = () => {
        if (!analysis) return
        const promptText = getActivePrompt()
        navigator.clipboard.writeText(promptText)
        setPromptCopied(true)
        setTimeout(() => setPromptCopied(false), 2500)
    }

    const handlePrint = () => {
        window.print()
    }

    if (!analysis) {
        return (
            <div className="min-h-screen bg-[#fbfbfe] flex items-center justify-center">
                <div className="w-9 h-9 rounded-full border-3 border-[#dedcff] border-t-[#2f27ce] animate-spin" />
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
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <SiteHeader />

            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
                {/* ── Top Bar: Navigation & Report Actions ──────── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[#050315]/70 hover:text-[#2f27ce] transition-colors no-underline group"
                    >
                        <ArrowLeftIcon size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Analyze Another Profile</span>
                    </Link>

                    <div className="flex items-center gap-2.5">
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
                <div className="bg-white border-2 border-[#dedcff] rounded-3xl p-6 sm:p-8 aside-card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <div className="inline-flex items-center justify-center gap-1.5 text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-3.5 py-1.5 rounded-full leading-none shadow-2xs">
                            <ShieldCheckIcon size={13} /> Verified Audit Report
                        </div>
                        <h1 className="text-[22px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                            {userName !== 'LinkedIn User' ? `${userName}'s Profile Score` : 'Your LinkedIn Profile Score'}
                        </h1>
                        {archetype && (
                            <p className="text-[13.5px] text-[#050315]/70">
                                Archetype: <strong className="text-[#050315]">{archetype}</strong>
                                {careerStage && <span> • {careerStage.replace('-', ' ')}</span>}
                            </p>
                        )}
                    </div>

                    <div className="inline-flex items-center justify-center gap-1.5 text-[12px] font-extrabold text-[#2f27ce] bg-[#dedcff] px-3.5 py-1.5 rounded-full shadow-2xs self-start sm:self-auto leading-none">
                        <span className="w-2 h-2 rounded-full bg-[#2f27ce]" />
                        <span>Audit Complete</span>
                    </div>
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
                    <div className="bg-white border-2 border-[#dedcff] rounded-3xl overflow-hidden aside-card-shadow">
                        <div className="p-6 sm:p-8 space-y-4">
                            <h3 className="text-[12px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                Parsed Profile Snapshot
                            </h3>

                            {profileHeadline && (
                                <div className="space-y-1">
                                    <p className="text-[11px] font-extrabold text-[#050315]/60 uppercase tracking-wider">
                                        Headline
                                    </p>
                                    <p className="text-[14.5px] font-semibold text-[#050315] leading-relaxed">
                                        {profileHeadline}
                                    </p>
                                </div>
                            )}

                            {profileAbout && (
                                <div className="space-y-1">
                                    <p className="text-[11px] font-extrabold text-[#050315]/60 uppercase tracking-wider">
                                        About Summary
                                    </p>
                                    <p className="text-[13.5px] text-[#050315]/75 leading-relaxed line-clamp-3">
                                        {profileAbout}
                                    </p>
                                </div>
                            )}

                            {skillsList.length > 0 && (
                                <div className="space-y-2 pt-1">
                                    <p className="text-[11px] font-extrabold text-[#050315]/60 uppercase tracking-wider">
                                        Extracted Skills ({skillsList.length})
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {skillsList.slice(0, 10).map((skill: string, i: number) => (
                                            <span
                                                key={i}
                                                className="inline-flex items-center justify-center text-center leading-none text-[12px] bg-[#dedcff] text-[#2f27ce] px-3.5 py-1.5 rounded-full font-bold shadow-2xs"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {skillsList.length > 10 && (
                                            <span className="inline-flex items-center text-[12px] text-[#050315]/60 px-2 py-1 font-semibold">
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
                        rewrites={
                            (analysis as any).headlineRewrites && (analysis as any).headlineRewrites.length > 0
                                ? (analysis as any).headlineRewrites
                                : [
                                    `${analysis.profile.headline.split('|')[0].trim()} | Building Scalable Systems & High-Impact Products`,
                                    `Engineering & Growth Specialist | ${analysis.profile.skills?.slice(0, 3).join(' • ') || 'System Design • Strategy'}`,
                                ]
                        }
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
                <div className="bg-[#050315] border-2 border-[#2f27ce] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-[#2f27ce]/15 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0">
                                <SparklesIcon size={20} />
                            </div>
                            <div>
                                <h3 className="text-[16px] font-extrabold tracking-tight text-white">
                                    AI Profile Rewrite Prompt
                                </h3>
                                <p className="text-[13px] text-[#dedcff]/80">
                                    Optimized for ChatGPT, Claude, and Gemini with anti-AI writing constraints
                                </p>
                            </div>
                        </div>

                        {/* Format Switcher */}
                        <div className="flex items-center gap-1.5 p-1 bg-white/10 rounded-full text-[12.5px] border border-white/10 self-start sm:self-auto">
                            <button
                                onClick={() => setPromptMode('full')}
                                className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                                    promptMode === 'full'
                                        ? 'bg-[#2f27ce] text-white shadow-xs'
                                        : 'text-white/70 hover:text-white'
                                }`}
                            >
                                Strategic Prompt
                            </button>
                            <button
                                onClick={() => setPromptMode('quick')}
                                className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                                    promptMode === 'quick'
                                        ? 'bg-[#2f27ce] text-white shadow-xs'
                                        : 'text-white/70 hover:text-white'
                                }`}
                            >
                                Quick Prompt
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
                        <span className="text-[12.5px] text-[#dedcff]/70">
                            {promptMode === 'full' 
                                ? 'Includes full candidate context, score diagnostics, anti-AI rules, and 4 deliverables'
                                : 'Concise 1-liner prompt with score and key constraints'}
                        </span>
                        <button
                            onClick={handleCopyPrompt}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-white text-[12.5px] font-bold transition-all cursor-pointer shrink-0 shadow-md shadow-[#2f27ce]/30 active:scale-95"
                        >
                            {promptCopied ? <CheckIcon size={14} className="text-emerald-300" /> : <CopyIcon size={14} />}
                            <span>{promptCopied ? 'Copied to Clipboard' : 'Copy Prompt'}</span>
                        </button>
                    </div>

                    <div className="p-4 bg-black/50 rounded-2xl border border-white/10 font-mono text-[12px] text-[#dedcff] max-h-56 overflow-y-auto leading-relaxed whitespace-pre-wrap selection:bg-[#2f27ce]/50">
                        {getActivePrompt()}
                    </div>
                </div>

                {/* ── Next Actions (Radiant Box) ───────────────── */}
                <div className="p-8 sm:p-10 bg-gradient-to-r from-[#dedcff]/60 via-white to-[#dedcff]/60 border-2 border-[#dedcff] rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md shadow-[#2f27ce]/5">
                    <div className="space-y-1">
                        <h4 className="text-[18px] sm:text-[20px] font-extrabold text-[#050315]">
                            Want to optimize a specific section now?
                        </h4>
                        <p className="text-[14px] text-[#050315]/75">
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
