'use client'

import { CategoryScore, ProfileData, Recommendation } from '@/lib/types'
import { TrendingUpIcon } from '@/components/ui/Icons'

interface RecommendationCardsProps {
    recommendations: Recommendation[]
    careerStage?: string
    archetype?: string
    categoryScores?: CategoryScore[]
    profile?: ProfileData
}

function cleanBeforeText(rec: Partial<Recommendation>, profile?: ProfileData): string {
    if (rec.before && typeof rec.before === 'string' && rec.before.trim()) {
        return rec.before.trim()
    }

    if (rec.fix && typeof rec.fix === 'string') {
        const headlineQuoteMatch = rec.fix.match(/Your headline:\s*"([^"]+)"/i)
        if (headlineQuoteMatch && headlineQuoteMatch[1]) {
            return headlineQuoteMatch[1].trim()
        }
    }

    if (profile?.headline) {
        return profile.headline.trim()
    }

    return 'Generic phrasing without clear role keywords or metrics.'
}

function extractImprovementPoints(rec: Partial<Recommendation>): string[] {
    const points: string[] = []

    if (rec && typeof rec.fix === 'string' && rec.fix.trim()) {
        let fixStr = rec.fix
            .replace(/Your headline:\s*"[^"]*"/gi, '')
            .replace(/What to improve:\s*/gi, '')
            .trim()

        const rawLines = fixStr
            .split(/\n|(?=\(\d+\))|(?=\b\d+\.\s)/)
            .map(s => s.trim())
            .filter(Boolean)

        rawLines.forEach(line => {
            const clean = line.replace(/^\(\d+\)\s*|^\d+\.\s*|^[-•*]\s*/, '').trim()
            if (clean && !points.includes(clean) && !clean.toLowerCase().startsWith('your headline')) {
                points.push(clean)
            }
        })
    }

    if (rec && typeof rec.whyItMatters === 'string' && rec.whyItMatters.trim() && points.length < 3) {
        const cleanWhy = rec.whyItMatters.trim()
        if (cleanWhy && !points.some(p => p.includes(cleanWhy) || cleanWhy.includes(p))) {
            points.push(cleanWhy)
        }
    }

    if (points.length === 0) {
        points.push('Lead with your target role title rather than abstract buzzwords.')
        points.push('Add specific industry keywords in the first 60 characters for search filters.')
    }

    return points
}

function cleanAfterText(rec: Partial<Recommendation>, profile?: ProfileData): string {
    if (
        rec.after &&
        typeof rec.after === 'string' &&
        rec.after.trim() &&
        !rec.after.toLowerCase().includes('what to improve:') &&
        !rec.after.toLowerCase().includes('your headline:')
    ) {
        return rec.after.trim()
    }

    const title = (rec.title || '').toLowerCase()
    const firstRole = profile?.experience?.[0]?.title || 'Product Engineer & Strategist'
    const firstCompany = profile?.experience?.[0]?.company || ''
    const topSkills = profile?.skills?.slice(0, 3).join(', ') || 'Next.js, Python, LLMs'

    if (title.includes('headline')) {
        return `${firstRole} | ${firstCompany ? `${firstCompany} • ` : ''}${topSkills} | Growth & Impact`
    }
    if (title.includes('experience')) {
        return 'Architected core diagnostic systems, improving audit latency by 42% across 10,000+ candidate profiles.'
    }
    if (title.includes('about') || title.includes('summary')) {
        return `I am a ${firstRole} specializing in ${topSkills}. I focus on building high-impact platforms and scalable systems.`
    }
    if (title.includes('skill')) {
        return `Pinned: ${topSkills}`
    }

    return 'Target Role | Specific Industry Skill & Quantifiable Impact'
}

export default function RecommendationCards({
    recommendations,
    profile,
}: RecommendationCardsProps) {
    if (!recommendations || !Array.isArray(recommendations) || recommendations.length === 0) return null

    return (
        <div className="bg-white border-2 border-[#dedcff] rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 space-y-5 sm:space-y-6 aside-card-shadow overflow-hidden">
            <div className="space-y-1 border-b border-[#dedcff]/70 pb-3.5 sm:pb-4">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 shadow-2xs">
                        <TrendingUpIcon size={16} />
                    </div>
                    <h3 className="text-[17px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        Direct Improvements
                    </h3>
                </div>
                <p className="text-[13px] sm:text-[14.5px] text-[#050315]/75 leading-relaxed">
                    Actionable fixes with exact before vs. after upgrades for your profile.
                </p>
            </div>

            <div className="space-y-4 sm:space-y-5">
                {recommendations.slice(0, 4).map((rec, i) => {
                    const safeRec = rec || {}
                    const title = safeRec.title || 'Profile Section Improvement'
                    const impact = safeRec.impact || 'High'
                    const beforeText = cleanBeforeText(safeRec, profile)
                    const improvementPoints = extractImprovementPoints(safeRec)
                    const afterText = cleanAfterText(safeRec, profile)

                    return (
                        <div
                            key={i}
                            className="bg-[#fbfbfe] border border-[#dedcff] rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-hidden"
                        >
                            {/* Card Title & Priority Tag */}
                            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                                <h4 className="text-[14.5px] sm:text-[16.5px] font-extrabold text-[#050315] leading-snug break-words">
                                    {title}
                                </h4>
                                {impact && (
                                    <span className="text-[10.5px] sm:text-[11.5px] font-extrabold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#dedcff] text-[#2f27ce] shrink-0 uppercase tracking-wider shadow-2xs">
                                        {impact} Priority
                                    </span>
                                )}
                            </div>

                            {/* Before & After Comparison Blocks */}
                            <div className="space-y-3">
                                {/* Current Phrasing (Weak) */}
                                <div className="space-y-1">
                                    <span className="text-[10.5px] sm:text-[11px] font-extrabold text-[#050315]/60 uppercase tracking-wider">
                                        Current Phrasing:
                                    </span>
                                    <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-[12.5px] sm:text-[14px] text-[#050315]/70 line-through leading-relaxed break-words overflow-hidden">
                                        {beforeText}
                                    </div>
                                </div>

                                {/* What to improve (Structured Numbered Points) */}
                                <div className="space-y-1.5 pt-0.5">
                                    <span className="text-[10.5px] sm:text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider block">
                                        What to improve:
                                    </span>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        {improvementPoints.map((point, j) => (
                                            <div
                                                key={j}
                                                className="flex items-start gap-2 text-[12.5px] sm:text-[14px] text-[#050315]/85 leading-relaxed bg-white border border-[#dedcff]/70 p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow-2xs overflow-hidden"
                                            >
                                                <span className="font-extrabold text-[#2f27ce] shrink-0 text-xs sm:text-sm mt-0.5">
                                                    ({j + 1})
                                                </span>
                                                <span className="break-words min-w-0 flex-1">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recommended Upgrade (Strong) */}
                                <div className="space-y-1 pt-0.5">
                                    <span className="text-[10.5px] sm:text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                        Recommended Upgrade:
                                    </span>
                                    <div className="bg-[#dedcff]/35 border border-[#dedcff] rounded-lg sm:rounded-xl p-3 sm:p-4 text-[13px] sm:text-[14.5px] font-bold text-[#050315] leading-relaxed shadow-2xs break-words overflow-hidden">
                                        {afterText}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
