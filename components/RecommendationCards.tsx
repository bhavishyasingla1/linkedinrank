'use client'

import { CategoryScore, ProfileData } from '@/lib/types'
import { Badge } from '@/components/ui/Badge'
import { AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, SparklesIcon } from '@/components/ui/Icons'

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
        <div className="space-y-4">
            {/* Core Recommendations List */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs">
                <div className="p-5 sm:p-6 border-b border-[#F1F5F9]">
                    <h3 className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider">
                        Actionable Recommendations
                    </h3>
                </div>

                <div className="divide-y divide-[#F1F5F9]">
                    {recommendations.map((rec, i) => {
                        const whyContent = rec.whyItMatters || rec.why_it_matters || ''
                        const isHigh = rec.impact === 'High'
                        const isMed = rec.impact === 'Medium'

                        const badgeVariant = isHigh ? 'error' : isMed ? 'warning' : 'neutral'

                        return (
                            <div key={i} className="p-5 sm:p-6 space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="space-y-1">
                                        <h4 className="text-[14px] font-semibold text-[#0F172A] leading-snug">
                                            {rec.title}
                                        </h4>
                                        {whyContent && (
                                            <p className="text-[12px] text-[#64748B] leading-relaxed">
                                                {whyContent}
                                            </p>
                                        )}
                                    </div>
                                    {rec.impact && (
                                        <Badge variant={badgeVariant} size="sm">
                                            {rec.impact} Impact
                                        </Badge>
                                    )}
                                </div>

                                {rec.fix && (
                                    <div className="p-3 rounded-lg bg-[#FAFAFA] border border-[#E2E8F0] text-[13px] text-[#334155] leading-relaxed">
                                        {rec.fix}
                                    </div>
                                )}

                                {(rec.before || rec.after) && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                        {rec.before && (
                                            <div className="p-3 rounded-lg bg-[#FEF2F2]/50 border border-[#FECACA] space-y-1">
                                                <span className="text-[10px] font-bold text-[#DC2626] uppercase tracking-wider">
                                                    Original
                                                </span>
                                                <p className="text-[12px] text-[#64748B] line-through">
                                                    {rec.before}
                                                </p>
                                            </div>
                                        )}
                                        {rec.after && (
                                            <div className="p-3 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] space-y-1">
                                                <span className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider flex items-center gap-1">
                                                    <SparklesIcon size={11} /> Suggested Fix
                                                </span>
                                                <p className="text-[12px] font-medium text-[#0F172A]">
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
                <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs">
                    <div className="p-5 sm:p-6 border-b border-[#F1F5F9]">
                        <h3 className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider">
                            Profile Context &amp; Best Practices
                        </h3>
                    </div>
                    <div className="p-5 sm:p-6 space-y-3.5">
                        {bestPractices.map((bp, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-[13px]">
                                <CheckCircleIcon size={16} className="text-[#0A66C2] shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-[#0F172A] mb-0.5">{bp.title}</p>
                                    <p className="text-[#475569] leading-relaxed">{bp.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
