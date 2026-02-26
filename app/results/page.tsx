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
import SiteFooter from '@/components/SiteFooter'

function buildAIPrompt(analysis: AnalysisResult): string {
    const profile = analysis.profile
    const scores = analysis.categoryScores || []
    const recommendations = analysis.recommendations || []
    const improvementPath = analysis.improvementPath || []

    const weakAreas = scores.filter(c => c.percentage < 60)
    const headlineScore = scores.find(c => c.category === 'Headline')
    const aboutScore = scores.find(c => c.category === 'About')
    const expScore = scores.find(c => c.category === 'Experience')
    const skillsScore = scores.find(c => c.category === 'Skills')

    let prompt = `You are an elite LinkedIn profile strategist. You don't write profiles | you engineer perception. Every word you write must serve one goal: making the reader stop, remember, and act.

I analyzed my profile with LinkedInRank and scored ${analysis.linkedInScore}/100 (${analysis.tier} tier). I need you to completely rewrite and optimize my profile.

═══════════════════════════════════
CORE PRINCIPLES (FOLLOW STRICTLY)
═══════════════════════════════════

You are not writing to express. You are writing to engineer perception.

1. START WITH ATTENTION, NOT INFORMATION
   - Open every section with a pattern interrupt | something unexpected
   - The reader must immediately think "Wait, what?" or "That's interesting"
   - Avoid generic openings like "I am a..." or "Experienced professional..."

2. USE THE EMOTION FORMULA: Relevance + Tension + Identity = Engagement
   - Make it personal to the reader's world
   - Challenge an assumption they hold
   - Connect to how they see themselves professionally

3. WRITE FOR RECEPTION, NOT EXPRESSION
   - Focus on what the reader (recruiter, client, peer) will experience
   - Mirror their worldview first, then shift it
   - Never brute-force credentials | earn attention first

4. USE CONCRETE SPECIFICS OVER ABSTRACT CLAIMS
   - ❌ "Improved productivity across the organization"
   - ✅ "Reduced deployment time from 3 hours to 20 minutes for a team of 40"
   - Stories beat statistics. Specifics beat generalities.

5. ENGINEER COGNITIVE EASE
   - Short sentences. Simple words. One idea per paragraph.
   - No unnecessary jargon. Clarity scales. Complexity repels.

6. IDENTITY-BASED FRAMING
   - Instead of "Has experience in X" → "The person teams call when X breaks"
   - Frame achievements in terms of identity and positioning, not just tasks

7. AVOID GENERIC AI TONE
   - Never write: "It's not just X, it's Y" / "In today's fast-paced world..." / "Unlock your potential..."
   - Sound precise. Sound deliberate. Sound human. No corporate filler.

8. LINKEDIN SEO & DISCOVERABILITY
   - Weave high-search-volume keywords naturally into headline, about, and experience
   - Use exact phrases recruiters type into LinkedIn search
   - Front-load the most important keywords in each section

═══════════════════════════════════
MY CURRENT PROFILE DATA
═══════════════════════════════════

`

    if (profile?.name) prompt += `Name: ${profile.name}\n`
    if (profile?.headline) prompt += `Current Headline: ${profile.headline}\n`
    else prompt += `Current Headline: (empty)\n`

    if (profile?.about) {
        prompt += `\nCurrent About Section (${profile.about.split(/\s+/).length} words):\n"${profile.about}"\n\n`
    } else {
        prompt += `\nCurrent About Section: EMPTY | needs to be written from scratch.\n\n`
    }

    if (profile?.experience && profile.experience.length > 0) {
        prompt += `Experience (${profile.experience.length} roles):\n`
        profile.experience.forEach((exp, i) => {
            prompt += `\n  ${i + 1}. ${exp.title}${exp.company ? ` at ${exp.company}` : ''}${exp.duration ? ` (${exp.duration})` : ''}\n`
            if (exp.description) {
                prompt += `     Current description: "${exp.description.slice(0, 500)}${exp.description.length > 500 ? '...' : ''}"\n`
            } else {
                prompt += `     Current description: EMPTY | needs bullet points.\n`
            }
        })
        prompt += `\n`
    } else {
        prompt += `Experience: None listed.\n\n`
    }

    if (profile?.skills && profile.skills.length > 0) {
        prompt += `Current Skills: ${profile.skills.join(', ')}\n\n`
    } else {
        prompt += `Current Skills: None listed.\n\n`
    }

    if (profile?.education && profile.education.length > 0) {
        prompt += `Education: ${profile.education.join(' | ')}\n\n`
    }

    if ((profile as any)?.certifications && (profile as any).certifications.length > 0) {
        prompt += `Certifications: ${(profile as any).certifications.join(', ')}\n\n`
    }

    // === SCORES ===
    prompt += `═══════════════════════════════════\n`
    prompt += `MY SCORE BREAKDOWN\n`
    prompt += `═══════════════════════════════════\n\n`

    scores.forEach(cat => {
        const status = cat.percentage >= 70 ? '✅ Strong' : cat.percentage >= 45 ? '⚠️ Needs work' : '❌ Weak'
        prompt += `${cat.category}: ${cat.earnedPoints}/${cat.maxPoints} pts (${Math.round(cat.percentage)}%) | ${status}\n`
        if (cat.breakdown && cat.breakdown.length > 0) {
            cat.breakdown.slice(0, 4).forEach(b => {
                prompt += `   ${b}\n`
            })
        }
        prompt += `\n`
    })

    if (weakAreas.length > 0) {
        prompt += `PRIORITY FIX AREAS: ${weakAreas.map(c => c.category).join(', ')}\n\n`
    }

    if (recommendations.length > 0) {
        prompt += `Top recommendations from analysis:\n`
        recommendations.slice(0, 5).forEach((rec, i) => {
            prompt += `${i + 1}. [${rec.impact} impact] ${rec.title}`
            if (rec.fix) prompt += ` | ${rec.fix.slice(0, 200)}`
            prompt += `\n`
        })
        prompt += `\n`
    }

    // === REWRITE INSTRUCTIONS ===
    prompt += `═══════════════════════════════════\n`
    prompt += `WHAT I NEED YOU TO REWRITE\n`
    prompt += `═══════════════════════════════════\n\n`

    // 1. Headline
    prompt += `1. HEADLINE (rewrite this first)\n`
    prompt += `   Current: "${profile?.headline || '(empty)'}"${headlineScore ? ` | scored ${Math.round(headlineScore.percentage)}%` : ''}\n`
    prompt += `   Requirements:\n`
    prompt += `   - Write 3 options in these styles:\n`
    prompt += `     a) AUTHORITY: "[Role] at [Company] | [Expertise area]" | positions you as the go-to expert\n`
    prompt += `     b) VALUE: "Helping [audience] achieve [outcome] through [method]" | makes the reader the hero\n`
    prompt += `     c) BUILDER: "Building [what] | [Role] | [Key differentiator]" | signals momentum\n`
    prompt += `   - Each must be under 120 characters\n`
    prompt += `   - Front-load with exact keywords recruiters search for in my industry\n`
    prompt += `   - Create a curiosity gap | make them want to click and read more\n`
    prompt += `   - Zero clichés: no "passionate", "results-driven", "team player", "go-getter"\n`
    prompt += `   - The headline should make someone think "I need to talk to this person"\n\n`

    // 2. About
    prompt += `2. ABOUT SECTION\n`
    if (profile?.about && profile.about.split(/\s+/).length > 30) {
        prompt += `   Current length: ${profile.about.split(/\s+/).length} words${aboutScore ? ` | scored ${Math.round(aboutScore.percentage)}%` : ''}\n`
        prompt += `   Task: Rewrite to be more compelling while keeping the core message.\n`
    } else {
        prompt += `   Current: ${profile?.about ? 'Too brief' : 'Empty'}${aboutScore ? ` | scored ${Math.round(aboutScore.percentage)}%` : ''}\n`
        prompt += `   Task: Write from scratch.\n`
    }
    prompt += `   Requirements:\n`
    prompt += `   - 200-300 words, written in first person ("I")\n`
    prompt += `   - Structure using the HOOK → PROOF → AUTHORITY → CTA framework:\n`
    prompt += `     Para 1 (Hook): Open with a pattern interrupt. NOT "Hi, I'm [name]". Start with what you DO and why it MATTERS. Create tension or curiosity in the first sentence.\n`
    prompt += `     Para 2 (Proof): Concrete achievements with numbers. Specific tools, methods, frameworks. Make the reader think "this person has actually done the work."\n`
    prompt += `     Para 3 (Authority): Domain expertise, unique positioning. What makes you different from 10,000 other people with the same job title?\n`
    prompt += `     Para 4 (CTA): Clear, specific call-to-action. What should the reader do next? Be direct.\n`
    prompt += `   - Weave in 5+ industry keywords naturally for SEO\n`
    prompt += `   - Include at least 2 quantified achievements (numbers, percentages, scale)\n`
    prompt += `   - Use short paragraphs with line breaks for mobile readability\n`
    prompt += `   - The reader should finish thinking "I want to work with this person"\n\n`

    // 3. Experience
    prompt += `3. EXPERIENCE BULLET POINTS\n`
    if (profile?.experience && profile.experience.length > 0) {
        prompt += `   ${profile.experience.length} roles found${expScore ? ` | scored ${Math.round(expScore.percentage)}%` : ''}\n`
        prompt += `   Task: For EACH role, write 3-4 achievement-oriented bullet points.\n`
    } else {
        prompt += `   No roles found. Suggest what sections I should add based on my headline/about.\n`
    }
    prompt += `   Requirements:\n`
    prompt += `   - Start each bullet with a power verb (Led, Built, Designed, Shipped, Automated, Scaled, Negotiated)\n`
    prompt += `   - Format: "[Power verb] + [specific action] + [measurable result]"\n`
    prompt += `   - Include metrics: %, $, team size, user count, time saved, revenue impact\n`
    prompt += `   - If no metrics given, use realistic placeholders: "[X]% improvement"\n`
    prompt += `   - Show clear progression and increasing scope across roles\n`
    prompt += `   - Each bullet should make a recruiter think "I need to interview this person"\n`
    prompt += `   - ❌ "Responsible for managing team" → ✅ "Led a cross-functional team of 12 to ship [product] 3 weeks ahead of deadline"\n\n`

    // 4. Skills
    prompt += `4. SKILLS OPTIMIZATION\n`
    prompt += `   Current skills: ${profile?.skills?.length || 0}${skillsScore ? ` | scored ${Math.round(skillsScore.percentage)}%` : ''}\n`
    prompt += `   Requirements:\n`
    prompt += `   - Suggest 15 skills organized in 3 tiers:\n`
    prompt += `     Tier 1 (Pin these | top 3): The exact keywords recruiters type into LinkedIn search for my role\n`
    prompt += `     Tier 2 (Core | next 7): Technical and domain skills that validate expertise\n`
    prompt += `     Tier 3 (Supporting | 5 more): Broader skills that round out the profile\n`
    prompt += `   - Prioritize hard skills and specific tools over soft skills\n`
    prompt += `   - Mirror the exact language used in job postings for roles like mine\n\n`

    // 5. Additional
    prompt += `5. LINKEDIN SEO & VISIBILITY STRATEGY\n`
    prompt += `   Based on everything above, also provide:\n`
    prompt += `   - Custom LinkedIn URL recommendation (e.g., linkedin.com/in/firstname-role)\n`
    prompt += `   - Top 10 keywords I must include across my profile for maximum search visibility\n`
    prompt += `   - 3 post ideas I should publish to reinforce my positioning (with hooks)\n`
    prompt += `   - Sections I should add (Featured, Volunteer, Projects, Publications, etc.)\n`
    prompt += `   - Specific tips to get my profile ranking higher in recruiter searches\n`

    if (improvementPath.length > 0) {
        prompt += `\n\nQUICK WINS identified by the analysis (highest impact first):\n`
        improvementPath.forEach((step, i) => {
            prompt += `${i + 1}. ${step.action} (+${step.gain} pts potential)\n`
        })
    }

    prompt += `\n\nFormat your response with clear headings. For every rewrite, show BEFORE (current) and AFTER (improved) so I can compare. Make the AFTER version so good that the difference is immediately obvious.`

    return prompt
}

export default function ResultsPage() {
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
    const [isDownloading, setIsDownloading] = useState(false)
    const [promptCopied, setPromptCopied] = useState(false)
    const [showFullPrompt, setShowFullPrompt] = useState(false)

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
    const archetype = (analysis as any).archetype?.label || (analysis as any).archetype?.description || ''

    // Profile summary for the hero section
    const profileHeadline = analysis.profile?.headline || ''
    const profileAbout = analysis.profile?.about || ''
    const skillsList = analysis.profile?.skills || (analysis as any).profile?.skills || []

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            {/* Header */}
            <SiteHeader />

            <div className="relative z-10 max-w-xl mx-auto px-6 py-10">

                {/* Back to home */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6B7280] hover:text-[#0A66C2] transition-colors mb-5 no-underline group"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    Analyze New Profile
                </Link>

                {/* Greeting & Profile Context */}
                <div className="mb-6 animate-fade-in">
                    <h1 className="text-xl font-bold text-[#0A0F1C] mb-1">
                        {userName !== 'LinkedIn User' ? `${userName}'s Profile Report` : 'Your Profile Report'}
                    </h1>
                    {archetype && (
                        <p className="text-sm text-[#6B7280]">
                            Profile Archetype: <span className="font-medium text-[#0A66C2]">{archetype}</span>
                            {careerStage && <span className="text-[#6B7280]"> · {careerStage.replace('-', ' ')}</span>}
                        </p>
                    )}
                </div>

                {/* Score */}
                <ScoreHero
                    name={userName}
                    score={analysis.linkedInScore}
                    tier={analysis.tier}
                    peerContext={analysis.peerContext}
                />

                {/* Profile Snapshot */}
                {(profileHeadline || skillsList.length > 0) && (
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-5 animate-fade-in">
                        <div className="px-5 pt-5 pb-4">
                            <h3 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">What We Parsed</h3>

                            {profileHeadline && (
                                <div className="mb-3">
                                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">Headline</p>
                                    <p className="text-sm text-[#0A0F1C] font-medium leading-relaxed">{profileHeadline}</p>
                                </div>
                            )}

                            {profileAbout && (
                                <div className="mb-3">
                                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">About</p>
                                    <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-3">
                                        {profileAbout.length > 200 ? profileAbout.slice(0, 200) + '...' : profileAbout}
                                    </p>
                                </div>
                            )}

                            {analysis.profile?.experience && analysis.profile.experience.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1.5">Experience</p>
                                    <div className="space-y-1.5">
                                        {analysis.profile.experience.slice(0, 3).map((exp, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#0A66C2] shrink-0" />
                                                <p className="text-xs text-[#0A0F1C]">
                                                    <span className="font-medium">{exp.title}</span>
                                                    {exp.company && <span className="text-[#6B7280]"> at {exp.company}</span>}
                                                </p>
                                            </div>
                                        ))}
                                        {analysis.profile.experience.length > 3 && (
                                            <p className="text-[11px] text-[#6B7280] ml-3.5">+{analysis.profile.experience.length - 3} more roles</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {skillsList.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1.5">Skills</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skillsList.slice(0, 8).map((skill: string, i: number) => (
                                            <span key={i} className="text-[11px] bg-[#F0F7FF] text-[#0A66C2] px-2 py-0.5 rounded-md font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                        {skillsList.length > 8 && (
                                            <span className="text-[11px] text-[#6B7280] px-2 py-0.5">
                                                +{skillsList.length - 8} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {analysis.profile?.education && analysis.profile.education.length > 0 && (
                                <div>
                                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">Education</p>
                                    <p className="text-xs text-[#4B5563]">
                                        {analysis.profile.education.slice(0, 2).join(' · ')}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Quick stats bar */}
                        <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <p className="text-sm font-bold text-[#0A0F1C]">{analysis.profile?.experience?.length || 0}</p>
                                    <p className="text-[9px] text-[#6B7280] uppercase">Roles</p>
                                </div>
                                <div className="w-px h-6 bg-gray-100" />
                                <div className="text-center">
                                    <p className="text-sm font-bold text-[#0A0F1C]">{skillsList.length}</p>
                                    <p className="text-[9px] text-[#6B7280] uppercase">Skills</p>
                                </div>
                                <div className="w-px h-6 bg-gray-100" />
                                <div className="text-center">
                                    <p className="text-sm font-bold text-[#0A0F1C]">{analysis.profile?.education?.length || 0}</p>
                                    <p className="text-[9px] text-[#6B7280] uppercase">Education</p>
                                </div>
                                <div className="w-px h-6 bg-gray-100" />
                                <div className="text-center">
                                    <p className="text-sm font-bold text-[#0A0F1C]">{analysis.profile?.certifications?.length || 0}</p>
                                    <p className="text-[9px] text-[#6B7280] uppercase">Certs</p>
                                </div>
                            </div>
                            <div className="text-[10px] text-[#6B7280]">
                                {profileAbout ? `${profileAbout.split(/\s+/).length} words in About` : 'No About section'}
                            </div>
                        </div>
                    </div>
                )}

                {/* === SCORE ANALYSIS === */}
                <div className="mt-6 mb-2">
                    <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Score Analysis</span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>
                </div>

                <div className="space-y-5">
                    <CategoryScores categories={analysis.categoryScores} />

                    <ImprovementPath
                        steps={analysis.improvementPath}
                        currentScore={analysis.linkedInScore}
                    />
                </div>

                {/* === ACTION ITEMS === */}
                <div className="mt-8 mb-2">
                    <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">What to Fix</span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>
                </div>

                <div className="space-y-5">
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
                </div>

                {/* === NEXT STEPS === */}
                <div className="mt-8 mb-2">
                    <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Next Steps</span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>
                </div>

                <div className="space-y-5">
                    {/* AI Rewrite Prompt */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden no-print">
                        <div className="px-5 pt-5 pb-5">
                            <div className="flex items-center gap-2.5 mb-2">
                                <svg className="w-4 h-4 text-[#7C3AED]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                                <h3 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Rewrite with AI</h3>
                            </div>

                            <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">
                                We built a personalized prompt with your profile data, scores, and weak areas. Copy it and paste into any AI to get a complete profile rewrite.
                            </p>

                            {/* Steps */}
                            <div className="space-y-2.5 mb-4">
                                <div className="flex items-start gap-3">
                                    <span className="w-5 h-5 rounded-full bg-[#7C3AED] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                                    <div>
                                        <p className="text-xs font-semibold text-[#0A0F1C]">Copy the prompt below</p>
                                        <p className="text-[11px] text-[#6B7280]">It includes your headline, about, experience, scores, and what to fix</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="w-5 h-5 rounded-full bg-[#7C3AED] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                                    <div>
                                        <p className="text-xs font-semibold text-[#0A0F1C]">Open ChatGPT, Claude, or Gemini</p>
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded hover:bg-[#E5E7EB] transition-colors">chat.openai.com</a>
                                            <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded hover:bg-[#E5E7EB] transition-colors">claude.ai</a>
                                            <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded hover:bg-[#E5E7EB] transition-colors">gemini.google.com</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="w-5 h-5 rounded-full bg-[#7C3AED] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                                    <div>
                                        <p className="text-xs font-semibold text-[#0A0F1C]">Paste and send</p>
                                        <p className="text-[11px] text-[#6B7280]">You'll get rewritten headline, about, experience bullets, and skill suggestions</p>
                                    </div>
                                </div>
                            </div>

                            {/* Copy button */}
                            <button
                                onClick={() => {
                                    if (!analysis) return
                                    navigator.clipboard.writeText(buildAIPrompt(analysis))
                                    setPromptCopied(true)
                                    setTimeout(() => setPromptCopied(false), 3000)
                                }}
                                className={`w-full py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${promptCopied
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]'
                                    }`}
                            >
                                {promptCopied ? (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                        Copied! Now paste into ChatGPT or Claude
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H6M15.75 18.75h-6" /></svg>
                                        Copy AI Prompt to Clipboard
                                    </>
                                )}
                            </button>

                            {/* Preview toggle */}
                            <button
                                onClick={() => setShowFullPrompt(!showFullPrompt)}
                                className="flex items-center gap-1.5 text-[11px] text-[#6B7280] hover:text-[#6B7280] transition-colors mt-3 mx-auto"
                            >
                                <svg className={`w-3 h-3 transition-transform ${showFullPrompt ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                                {showFullPrompt ? 'Hide prompt preview' : 'Preview what gets copied'}
                            </button>

                            {showFullPrompt && analysis && (
                                <div className="mt-3 bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 max-h-72 overflow-y-auto">
                                    <pre className="text-[11px] text-[#4B5563] whitespace-pre-wrap font-sans leading-relaxed">
                                        {buildAIPrompt(analysis)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Free Tools CTA */}
                    <Link href="/tools" className="block bg-gradient-to-r from-[#0A66C2] to-[#004182] rounded-xl p-5 text-center no-underline no-print hover:opacity-95 transition-opacity">
                        <h3 className="text-white font-semibold text-sm mb-1">Optimize further with free tools</h3>
                        <p className="text-blue-200 text-xs">Headline Studio · Profile Ring Creator · Profile SEO Scanner · Post Hooks</p>
                    </Link>

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
                        <p>Data processed in memory only | nothing stored.</p>
                    </div>
                </div>
            </div>

            <SiteFooter />
        </main>
    )
}
