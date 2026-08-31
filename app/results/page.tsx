'use client'

import { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import CategoryScores from '@/components/CategoryScores'
import RecommendationCards from '@/components/RecommendationCards'
import HeadlineRewriter from '@/components/HeadlineRewriter'
import { AnalysisResult, ProfileData } from '@/lib/types'
import { generateHeadlines } from '@/lib/tools'
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CopyIcon,
    CheckIcon,
    FileTextIcon,
    ShieldCheckIcon,
    ZapIcon,
    WandIcon,
} from '@/components/ui/Icons'

function buildFullAIPrompt(analysis: AnalysisResult): string {
    const profile = analysis?.profile
    const scores = Array.isArray(analysis?.categoryScores) ? analysis.categoryScores : []
    const recommendations = Array.isArray(analysis?.recommendations) ? analysis.recommendations : []
    const userName = profile?.name || 'LinkedIn User'
    const role = profile?.experience?.[0]?.title || profile?.headline?.split('|')?.[0]?.trim() || 'Professional'
    const archetype = (analysis as any)?.archetype?.label || (analysis as any)?.archetype?.description || 'Specialist'
    const careerStage = (analysis as any)?.careerStage || 'professional'
    const scoreVal = typeof analysis?.linkedInScore === 'number' ? analysis.linkedInScore : 90
    const tierVal = analysis?.tier ? String(analysis.tier).toUpperCase() : 'PLATINUM'

    const weakAreas = scores.filter((c) => (c?.percentage || 0) < 70)

    let prompt = `You are an elite LinkedIn profile ghostwriter and personal branding strategist. Your writing is crisp, human, authoritative, and completely devoid of corporate fluff or AI clichés. You write like a seasoned executive advisor.

I analyzed my LinkedIn profile with LinkedInRank and scored ${scoreVal}/100 (${tierVal} tier).

Please optimize and rewrite my LinkedIn profile using the audit diagnostics, candidate data, and strict writing rules below.

═══ CANDIDATE CONTEXT ═══
• Name: ${userName}
• Target / Current Role: ${role}
• Profile Archetype: ${archetype}
• Career Stage: ${careerStage}
• LinkedInRank Audit Score: ${scoreVal}/100 (${tierVal} tier)
`

    if (profile?.headline) prompt += `• Current Headline: "${profile.headline}"\n`
    if (profile?.about) prompt += `\n• Current About Section:\n"${String(profile.about).trim()}"\n`

    if (Array.isArray(profile?.experience) && profile.experience.length > 0) {
        prompt += `\n• Experience History (${profile.experience.length} roles listed):\n`
        profile.experience.forEach((exp: any, i: number) => {
            prompt += `  ${i + 1}. ${exp?.title || 'Role'}${exp?.company ? ` at ${exp.company}` : ''} [${exp?.duration || 'Not specified'}]\n`
            if (exp?.description) {
                prompt += `     Details: ${String(exp.description).trim().slice(0, 350)}\n`
            }
        })
    }

    if (Array.isArray(profile?.skills) && profile.skills.length > 0) {
        prompt += `\n• Extracted Skills: ${profile.skills.filter(Boolean).join(', ')}\n`
    }
    if (profile?.education) {
        const eduStr = Array.isArray(profile.education) ? profile.education.filter(Boolean).join(' | ') : String(profile.education)
        if (eduStr) prompt += `• Education: ${eduStr}\n`
    }
    if (Array.isArray(profile?.certifications) && profile.certifications.length > 0) {
        prompt += `• Certifications: ${profile.certifications.filter(Boolean).join(', ')}\n`
    }

    prompt += `\n═══ AUDIT DIAGNOSTICS & SCORE GAPS ═══\n`
    scores.forEach((cat) => {
        const catName = cat?.category || 'Section'
        const earned = cat?.earnedPoints ?? 0
        const max = cat?.maxPoints ?? 20
        const pct = Math.round(cat?.percentage ?? 0)
        prompt += `- ${catName}: ${earned}/${max} pts (${pct}%)\n`
    })

    if (weakAreas.length > 0) {
        prompt += `\nPriority Fix Sections: ${weakAreas.map((c) => c?.category || '').filter(Boolean).join(', ')}\n`
    }

    if (recommendations.length > 0) {
        prompt += `\nKey Recommended Fixes:\n`
        recommendations.slice(0, 4).forEach((rec, i) => {
            prompt += `${i + 1}. [${rec?.impact || 'High'}] ${rec?.title || 'Improvement'}: ${rec?.fix || ''}\n`
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

const DEFAULT_ANALYSIS: AnalysisResult = {
    linkedInScore: 90,
    tier: 'Platinum',
    archetype: {
        label: 'Multi-Potential Generalist',
        description: 'Cross-functional technologist and high-velocity builder'
    },
    peerContext: 'Your profile scores in the 96th percentile among Technical Product Strategists and Senior Builders.',
    categoryScores: [
        {
            category: 'Headline',
            percentage: 90,
            weight: 20,
            earnedPoints: 18,
            maxPoints: 20,
            breakdown: []
        },
        {
            category: 'About Summary',
            percentage: 90,
            weight: 20,
            earnedPoints: 18,
            maxPoints: 20,
            breakdown: []
        },
        {
            category: 'Work Experience',
            percentage: 92,
            weight: 25,
            earnedPoints: 23,
            maxPoints: 25,
            breakdown: []
        },
        {
            category: 'Skills & Keywords',
            percentage: 93,
            weight: 15,
            earnedPoints: 14,
            maxPoints: 15,
            breakdown: []
        },
        {
            category: 'Education & Certifications',
            percentage: 90,
            weight: 10,
            earnedPoints: 9,
            maxPoints: 10,
            breakdown: []
        },
        {
            category: 'Completeness & Structure',
            percentage: 80,
            weight: 10,
            earnedPoints: 8,
            maxPoints: 10,
            breakdown: []
        }
    ],
    recommendations: [
        {
            title: 'Include clear role keywords in your headline',
            whyItMatters: 'Recruiters filter profiles by target job titles in search dropdowns before clicking.',
            fix: '(1) It doesn\'t include a clear role. Lead with your target or current functional title.\n(2) Add primary technical keywords in the first 60 characters for mobile recruiter search cards.',
            impact: 'High',
            before: 'AI, Technology & Growth | Building, Experimenting & Sharing What I Learn',
            after: 'Product Engineer & AI Strategist | Building High-Velocity Growth Systems'
        },
        {
            title: 'Add quantified impact to your experience bullet points',
            whyItMatters: 'Concrete metrics make your competency believable and impressive to hiring managers.',
            fix: '(1) Lacks measurable metrics or scale. Add numbers like latency reduction or user adoption.\n(2) Start bullet points with strong action verbs (Architected, Built, Scaled).',
            impact: 'High',
            before: 'Worked on building LLM applications and improving dashboard frontend',
            after: 'Architected LLM diagnostic engine improving latency by 42% across 10k+ audits'
        },
        {
            title: 'Pin your top 3 core skills on your profile',
            whyItMatters: 'LinkedIn algorithms use pinned skills as the primary factor in search ranking.',
            fix: '(1) Unranked skills are buried in profile lists.\n(2) Pin your top 3 high-intent skills for 3x algorithmic search visibility.',
            impact: 'Medium',
            before: 'General list of 12 unranked skills',
            after: 'Pinned: Next.js, System Architecture, LLM Agents'
        }
    ],
    improvementPath: [
        {
            action: 'Add target senior role keyword to headline',
            gain: 3,
            area: 'Headline'
        },
        {
            action: 'Pin top 3 technical skills to featured section',
            gain: 3,
            area: 'Skills'
        },
        {
            action: 'Add 1 concrete metric to top experience role',
            gain: 4,
            area: 'Experience'
        }
    ],
    headlineRewrites: [
        {
            style: 'Role + Impact Focus',
            score: 94,
            text: 'Product Engineer & AI Strategist | Scaling High-Velocity LLM Systems & Growth Engines',
            tip: 'Features high-priority search terms recruiters filter for in candidate searches.'
        },
        {
            style: 'Industry Authority & Core Skills',
            score: 92,
            text: 'Senior Systems Architect | Next.js, Python & Scalable LLM Infrastructure',
            tip: 'Front-loads primary technical domain keywords that appear on recruiter boolean searches.'
        },
        {
            style: 'Builder & Hands-On Specialization',
            score: 91,
            text: 'Technical Product Lead | Building Scalable Web Platforms & AI Applications',
            tip: 'Demonstrates dual technical and product leadership credentials under 120 chars.'
        }
    ],
    potentialGain: 10,
    profile: {
        name: 'Bhavishya Singla',
        headline: 'Product Engineer & AI Strategist | Building High-Velocity Growth Systems | Next.js, Python, LLMs',
        about: 'Full-stack builder and technical strategist specializing in scalable web systems, LLM agent architectures, and conversion-optimized developer tooling.',
        experience: [
            {
                title: 'Founding Engineer & AI Strategist',
                company: 'Venture Lab',
                description: 'Architected LLM diagnostic engine improving latency by 42% across 10k+ audits.',
                duration: '2023 - Present'
            }
        ],
        skills: ['Next.js', 'TypeScript', 'Python', 'LLM Agents', 'Product Strategy', 'System Architecture'],
        education: ['B.S. in Computer Science'],
        certifications: ['AWS Certified Solutions Architect'],
        recommendations: 4,
        honors: []
    }
}

export default function ResultsPage() {
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
    const [promptCopied, setPromptCopied] = useState(false)
    const router = useRouter()
    const routerRef = useRef(router)
    routerRef.current = router

    useEffect(() => {
        let cancelled = false
        try {
            const stored = sessionStorage.getItem('analysisResult')
            if (stored) {
                const parsed = JSON.parse(stored)
                if (!cancelled) setAnalysis(parsed)
            } else {
                if (!cancelled) setAnalysis(DEFAULT_ANALYSIS)
            }
        } catch {
            if (!cancelled) setAnalysis(DEFAULT_ANALYSIS)
        }
        return () => { cancelled = true }
    }, [])

    const handleCopyPrompt = useCallback(() => {
        if (!analysis) return
        try {
            const promptText = buildFullAIPrompt(analysis)
            navigator.clipboard.writeText(promptText)
            setPromptCopied(true)
            setTimeout(() => setPromptCopied(false), 2500)
        } catch {
            setPromptCopied(true)
            setTimeout(() => setPromptCopied(false), 2500)
        }
    }, [analysis])

    const handlePrint = useCallback(() => {
        window.print()
    }, [])

    const headlineRewritesList = useMemo(() => {
        if (!analysis) return []
        if (Array.isArray(analysis.headlineRewrites) && analysis.headlineRewrites.length > 0) {
            return analysis.headlineRewrites
        }
        if (analysis.profile?.headline || analysis.profile?.experience?.[0]?.title) {
            const rawRole = analysis.profile.experience?.[0]?.title || analysis.profile.headline || ''
            const cleanRole = rawRole
                .split('|')[0]
                .split('•')[0]
                .split(' - ')[0]
                .split('@')[0]
                .split(' at ')[0]
                .trim() || 'Professional'
            const cleanCompany = analysis.profile.experience?.[0]?.company || ''
            const cleanSkills = (analysis.profile.skills || []).slice(0, 5)

            return generateHeadlines({
                role: cleanRole,
                company: cleanCompany,
                skills: cleanSkills,
                specialty: cleanSkills[0] || '',
            })
        }
        return []
    }, [analysis])

    if (!analysis) {
        return (
            <div className="min-h-screen bg-[#fbfbfe] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-3 border-[#dedcff] border-t-[#2f27ce] animate-spin" />
            </div>
        )
    }

    const rawScore = typeof analysis.linkedInScore === 'number' ? analysis.linkedInScore : 90
    const score = Math.max(0, Math.min(100, Math.round(rawScore)))
    const tierDisplay = analysis.tier ? analysis.tier.charAt(0).toUpperCase() + analysis.tier.slice(1).toLowerCase() : 'Platinum'

    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <SiteHeader />

            <main className="flex-1 w-full max-w-3xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10 space-y-5 sm:space-y-6 overflow-hidden">
                {/* ── 1. Top Bar: Navigation & PDF Save ────────────────── */}
                <div className="flex items-center justify-between gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 sm:gap-2 text-[13px] sm:text-[14.5px] font-bold text-[#050315]/80 hover:text-[#2f27ce] transition-colors no-underline group truncate"
                    >
                        <ArrowLeftIcon size={14} className="group-hover:-translate-x-0.5 transition-transform shrink-0" />
                        <span>Audit Another Profile</span>
                    </Link>

                    <button
                        onClick={handlePrint}
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-[#dedcff] hover:border-[#2f27ce] hover:text-[#2f27ce] text-[12.5px] sm:text-[14px] font-bold text-[#050315] transition-all cursor-pointer min-h-[36px] sm:min-h-[38px] shadow-2xs shrink-0"
                    >
                        <FileTextIcon size={13} />
                        <span>Save PDF</span>
                    </button>
                </div>

                {/* ── Score Hero Card ─────────────────────────────────── */}
                <div className="bg-white border-2 border-[#dedcff] rounded-2xl sm:rounded-3xl p-5 sm:p-9 text-center space-y-4 sm:space-y-5 aside-card-shadow overflow-hidden">
                    <div className="space-y-2.5 sm:space-y-3.5">
                        {/* Status Eyebrow Tag */}
                        <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] shadow-2xs leading-none">
                            <ShieldCheckIcon size={13} className="text-[#2f27ce]" />
                            <span className="text-[11px] sm:text-[12.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                {tierDisplay} Tier • Ready for Recruiters
                            </span>
                        </div>

                        {/* Big Centered Score Display */}
                        <div className="flex items-baseline justify-center gap-2">
                            <span className="text-[48px] sm:text-[66px] font-black text-[#2f27ce] tracking-tight tabular-nums leading-none">
                                {score}
                            </span>
                            <span className="text-[20px] sm:text-[26px] font-bold text-[#050315]/50">
                                / 100
                            </span>
                        </div>
                    </div>

                    {/* 1-Sentence Plain-English Summary */}
                    <p className="text-[13.5px] sm:text-[15.5px] text-[#050315]/80 max-w-lg mx-auto leading-relaxed font-normal break-words px-1">
                        Your profile is strong, but tweaking 2 key areas will double your visibility in recruiter search results.
                    </p>
                </div>

                {/* ── 2. High-Impact Fixes (Action Checklist) ─────────── */}
                <div className="bg-white border-2 border-[#dedcff] rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 space-y-4 sm:space-y-5 aside-card-shadow overflow-hidden">
                    <div className="space-y-1 border-b border-[#dedcff]/70 pb-3.5 sm:pb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 shadow-2xs">
                                <ZapIcon size={16} />
                            </div>
                            <h3 className="text-[17px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                                Top Priority Fixes
                            </h3>
                        </div>
                        <p className="text-[13px] sm:text-[14.5px] text-[#050315]/75 leading-relaxed">
                            Focus on these high-leverage adjustments to get the biggest boost in recruiter discovery.
                        </p>
                    </div>

                    {/* Simple Bulleted Checklist */}
                    <ul className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed">
                        <li className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#fbfbfe] border border-[#dedcff] overflow-hidden">
                            <span className="inline-flex items-center justify-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10.5px] sm:text-[11px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200 uppercase tracking-wider shrink-0 mt-0.5 shadow-2xs">
                                Headline
                            </span>
                            <div className="space-y-0.5 min-w-0 flex-1">
                                <strong className="text-[#050315] font-bold block text-[13.5px] sm:text-[15px] break-words">
                                    Add your specific target role title
                                </strong>
                                <span className="text-[#050315]/75 leading-relaxed break-words block text-[12.5px] sm:text-[13.5px]">
                                    Include your target position (e.g., &quot;Product Engineer&quot; or &quot;Marketing Specialist&quot;) rather than abstract buzzwords.
                                </span>
                            </div>
                        </li>

                        <li className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#fbfbfe] border border-[#dedcff] overflow-hidden">
                            <span className="inline-flex items-center justify-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10.5px] sm:text-[11px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider shrink-0 mt-0.5 shadow-2xs">
                                Experience
                            </span>
                            <div className="space-y-0.5 min-w-0 flex-1">
                                <strong className="text-[#050315] font-bold block text-[13.5px] sm:text-[15px] break-words">
                                    Quantify past achievements with numbers
                                </strong>
                                <span className="text-[#050315]/75 leading-relaxed break-words block text-[12.5px] sm:text-[13.5px]">
                                    Add at least 1 quantifiable outcome or metric (percentages, project scope, scale) to your past roles.
                                </span>
                            </div>
                        </li>

                        <li className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#fbfbfe] border border-[#dedcff] overflow-hidden">
                            <span className="inline-flex items-center justify-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10.5px] sm:text-[11px] font-extrabold bg-[#dedcff] text-[#2f27ce] border border-[#dedcff] uppercase tracking-wider shrink-0 mt-0.5 shadow-2xs">
                                Skills
                            </span>
                            <div className="space-y-0.5 min-w-0 flex-1">
                                <strong className="text-[#050315] font-bold block text-[13.5px] sm:text-[15px] break-words">
                                    Pin top 3 to 5 core industry skills
                                </strong>
                                <span className="text-[#050315]/75 leading-relaxed break-words block text-[12.5px] sm:text-[13.5px]">
                                    Ensure your primary domain competencies are pinned to the top of your profile for recruiter search filters.
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* ── 3. Profile Health Score Breakdown ───────────────── */}
                <CategoryScores categories={analysis.categoryScores} />

                {/* ── 4. Ready-to-Use Headline Ideas (Copy & Paste) ────── */}
                {headlineRewritesList.length > 0 && (
                    <HeadlineRewriter
                        currentHeadline={analysis.profile?.headline || ''}
                        rewrites={headlineRewritesList}
                    />
                )}

                {/* ── 5. Before & After Comparisons (Clear Fixes) ─────── */}
                <RecommendationCards
                    recommendations={analysis.recommendations}
                    profile={analysis.profile}
                />

                {/* ── 6. AI Auto-Rewrite Prompt (Spoon-Fed Instructions) ─ */}
                <div className="bg-white border-2 border-[#dedcff] rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 space-y-5 sm:space-y-6 aside-card-shadow overflow-hidden">
                    <div className="space-y-1 border-b border-[#dedcff]/70 pb-3.5 sm:pb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 shadow-2xs">
                                <WandIcon size={16} />
                            </div>
                            <h3 className="text-[17px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                                Auto-Rewrite Your Profile with AI
                            </h3>
                        </div>
                        <p className="text-[13px] sm:text-[14.5px] text-[#050315]/75 leading-relaxed">
                            Use our pre-written prompt to generate ready-to-use About sections and bullet points in seconds.
                        </p>
                    </div>

                    {/* Step-by-Step Instruction Box */}
                    <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#dedcff]/35 border border-[#dedcff] space-y-3 text-[13px] sm:text-[14px] overflow-hidden">
                        <span className="font-extrabold text-[#050315] uppercase tracking-wider text-[11px] sm:text-[11.5px] block">
                            How to use this in 3 easy steps:
                        </span>
                        <div className="space-y-2 sm:space-y-2.5 text-[#050315]/85">
                            <div className="flex items-center gap-2.5 sm:gap-3">
                                <span className="w-5 h-5 rounded-full bg-[#2f27ce] text-white text-[11px] font-black flex items-center justify-center shrink-0 shadow-2xs">
                                    1
                                </span>
                                <span>Click the <strong>Copy Prompt</strong> button below.</span>
                            </div>
                            <div className="flex items-center gap-2.5 sm:gap-3">
                                <span className="w-5 h-5 rounded-full bg-[#2f27ce] text-white text-[11px] font-black flex items-center justify-center shrink-0 shadow-2xs">
                                    2
                                </span>
                                <span>Open <strong>ChatGPT</strong>, <strong>Claude</strong>, or <strong>Gemini</strong>.</span>
                            </div>
                            <div className="flex items-center gap-2.5 sm:gap-3">
                                <span className="w-5 h-5 rounded-full bg-[#2f27ce] text-white text-[11px] font-black flex items-center justify-center shrink-0 shadow-2xs">
                                    3
                                </span>
                                <span>Paste the prompt to generate a full, custom rewrite of your profile automatically.</span>
                            </div>
                        </div>
                    </div>

                    {/* Prompt Preview & Large Copy Button */}
                    <div className="space-y-3 sm:space-y-3.5">
                        <div className="bg-[#fbfbfe] border border-[#dedcff] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 max-h-40 sm:max-h-44 overflow-y-auto font-mono text-[11.5px] sm:text-[12px] text-[#050315]/75 leading-relaxed whitespace-pre-wrap select-all break-words overflow-x-hidden">
                            {buildFullAIPrompt(analysis)}
                        </div>

                        <button
                            onClick={handleCopyPrompt}
                            className="w-full min-h-[48px] py-3.5 px-5 sm:px-6 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-white text-[13.5px] sm:text-[15.5px] font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#2f27ce]/20 active:scale-[0.98]"
                        >
                            {promptCopied ? (
                                <>
                                    <CheckIcon size={18} />
                                    <span>Prompt Copied! Paste into ChatGPT or Claude</span>
                                </>
                            ) : (
                                <>
                                    <CopyIcon size={18} />
                                    <span>Copy AI Prompt</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* ── 7. Bottom Action: Explore Free LinkedIn Tools ─────── */}
                <div className="pt-1 sm:pt-2">
                    <Link
                        href="/tools"
                        className="w-full min-h-[48px] sm:min-h-[50px] py-3.5 px-5 sm:px-6 rounded-full bg-white border-2 border-[#dedcff] hover:border-[#2f27ce] text-[#2f27ce] hover:text-[#433bff] text-[13.5px] sm:text-[15px] font-extrabold text-center flex items-center justify-center gap-2 transition-all no-underline shadow-xs group"
                    >
                        <span>🛠️ Explore Free LinkedIn Tools</span>
                        <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}
