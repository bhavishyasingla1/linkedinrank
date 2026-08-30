'use client'

import { CategoryScore, ProfileData } from '@/lib/types'
import { Badge } from '@/components/ui/Badge'
import { AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, SparklesIcon, ZapIcon } from '@/components/ui/Icons'

interface RecommendationCardsProps {
    recommendations: any[]
    careerStage?: string
    archetype?: string
    categoryScores?: CategoryScore[]
    profile?: ProfileData
}

function getBestPractices(
    careerStage?: string,
    archetype?: string,
    categoryScores?: CategoryScore[],
    profile?: ProfileData,
): { title: string; desc: string }[] {
    const tips: { title: string; desc: string; priority: number }[] = []

    const catPct = (name: string) => categoryScores?.find(c => c.category === name)?.percentage ?? 50

    const headlinePct = catPct('Headline')
    const aboutPct = catPct('About')
    const experiencePct = catPct('Experience')
    const skillsPct = catPct('Skills')
    const educationPct = catPct('Education & Certifications')
    const completenessPct = catPct('Completeness & Structure')

    const headline = profile?.headline || ''
    const about = profile?.about || ''
    const skills = profile?.skills || []
    const experience = profile?.experience || []
    const certs = profile?.certifications || []

    if (headlinePct < 60) {
        tips.push({
            title: 'Your headline needs a clear role + core skills',
            desc: `"${headline.slice(0, 50)}${headline.length > 50 ? '...' : ''}" does not clearly signal what you do. Add your functional role, domain, and top technical strengths.`,
            priority: 10,
        })
    } else if (headline.length > 120) {
        tips.push({
            title: `Your headline is ${headline.length} characters • trim to 120`,
            desc: 'Only the first ~120 characters appear on mobile and recruiter search snippets. Front-load your highest-value keywords.',
            priority: 7,
        })
    }

    if (!about || about.length < 50) {
        tips.push({
            title: 'Add a structured About section',
            desc: 'Your About section is missing or too short. Write 2-3 concise paragraphs covering your background, key competencies, and current focus.',
            priority: 10,
        })
    } else if (aboutPct < 60) {
        tips.push({
            title: 'Strengthen your About section storytelling',
            desc: `Include concrete metrics and tools (${skills.slice(0, 2).join(', ') || 'your core skills'}) to give recruiters tangible proof of competence.`,
            priority: 8,
        })
    }

    if (experience.length === 0) {
        tips.push({
            title: 'Add at least one detailed experience role',
            desc: 'Include internships, projects, or full-time roles with 2-3 bullet points describing outcomes and tools used.',
            priority: 10,
        })
    } else {
        const emptyDescs = experience.filter(e => !e.description || e.description.length < 30).length
        if (emptyDescs > 0) {
            tips.push({
                title: `${emptyDescs} of your roles lack quantified descriptions`,
                desc: 'Add bullet points starting with action verbs (Built, Led, Engineered, Reduced) with specific metrics.',
                priority: 9,
            })
        }
    }

    if (skills.length === 0) {
        tips.push({
            title: 'Add high-intent skills to your profile',
            desc: 'LinkedIn uses skills for algorithmic search matching. Without skills listed, recruiters cannot find you for targeted searches.',
            priority: 9,
        })
    } else if (skills.length < 5) {
        tips.push({
            title: `Pin your top 5 skills for recruiter visibility`,
            desc: `Your profile exports ${skills.length} skills. Ensure your most important skills are pinned to the top on LinkedIn.`,
            priority: 7,
        })
    }

    return tips
        .sort((a, b) => b.priority - a.priority)
        .slice(0, 4)
        .map(({ title, desc }) => ({ title, desc }))
}

export default function RecommendationCards({
    recommendations,
    careerStage,
    archetype,
    categoryScores,
    profile,
}: RecommendationCardsProps) {
    if (!recommendations || recommendations.length === 0) return null

    const bestPractices = getBestPractices(careerStage, archetype, categoryScores, profile)

    return (
        <div className="space-y-6">
            {/* Core Recommendations List */}
            <div className="bg-white border-2 border-[#dedcff] rounded-3xl overflow-hidden aside-card-shadow">
                <div className="p-6 sm:p-8 border-b border-[#dedcff]/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ZapIcon size={16} className="text-[#2f27ce]" />
                        <h3 className="text-[12px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                            Prioritized Diagnostic Fixes
                        </h3>
                    </div>
                    <span className="text-[11.5px] font-bold text-[#050315]/60">
                        {recommendations.length} Action Items
                    </span>
                </div>

                <div className="divide-y divide-[#dedcff]/60">
                    {recommendations.map((rec, i) => {
                        const whyContent = rec.whyItMatters || rec.why_it_matters || ''
                        const isHigh = rec.impact === 'High'

                        return (
                            <div key={i} className="p-6 sm:p-8 space-y-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="space-y-1">
                                        <h4 className="text-[16px] font-bold text-[#050315] leading-snug">
                                            {rec.title}
                                        </h4>
                                        {whyContent && (
                                            <p className="text-[13.5px] text-[#050315]/70 leading-relaxed">
                                                {whyContent}
                                            </p>
                                        )}
                                    </div>
                                    {rec.impact && (
                                        <span className={`inline-flex items-center justify-center text-center leading-none text-[11px] font-bold px-3 py-1.5 rounded-full shadow-2xs ${
                                            isHigh
                                                ? 'bg-[#dedcff] text-[#2f27ce]'
                                                : 'bg-[#dedcff]/40 text-[#050315]/80'
                                        }`}>
                                            {rec.impact} Impact
                                        </span>
                                    )}
                                </div>

                                {rec.fix && (
                                    <div className="p-4 rounded-2xl bg-[#dedcff]/20 border border-[#dedcff] text-[13.5px] text-[#050315]/85 leading-relaxed">
                                        <strong className="text-[#050315]">Recommended Action:</strong> {rec.fix}
                                    </div>
                                )}

                                {(rec.before || rec.after) && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                        {rec.before && (
                                            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                                                <span className="text-[10.5px] font-extrabold text-rose-700 uppercase tracking-wider">
                                                    Original Phrasing
                                                </span>
                                                <p className="text-[12.5px] text-rose-900/70 line-through">
                                                    {rec.before}
                                                </p>
                                            </div>
                                        )}
                                        {rec.after && (
                                            <div className="p-4 rounded-2xl bg-[#dedcff]/35 border border-[#dedcff] space-y-1">
                                                <span className="text-[10.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider flex items-center gap-1">
                                                    <SparklesIcon size={12} /> Algorithmic Suggested Fix
                                                </span>
                                                <p className="text-[13px] font-bold text-[#050315]">
                                                    {rec.after}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Profile Specific Tips */}
            {bestPractices.length > 0 && (
                <div className="bg-white border-2 border-[#dedcff] rounded-3xl overflow-hidden aside-card-shadow">
                    <div className="p-6 sm:p-8 border-b border-[#dedcff]/70">
                        <h3 className="text-[12px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                            Profile Context &amp; Recruiter Signals
                        </h3>
                    </div>
                    <div className="p-6 sm:p-8 space-y-4">
                        {bestPractices.map((bp, i) => (
                            <div key={i} className="flex items-start gap-3 text-[13.5px]">
                                <div className="w-6 h-6 rounded-full bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                    <CheckCircleIcon size={14} />
                                </div>
                                <div>
                                    <p className="font-bold text-[#050315] mb-0.5">{bp.title}</p>
                                    <p className="text-[#050315]/70 leading-relaxed">{bp.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
