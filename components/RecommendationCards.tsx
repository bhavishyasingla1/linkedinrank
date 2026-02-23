'use client'

import { CategoryScore, ProfileData } from '@/lib/types'

interface RecommendationCardsProps {
    recommendations: any[]
    careerStage?: string
    archetype?: string
    categoryScores?: CategoryScore[]
    profile?: ProfileData
}

// Dynamic best practices based on actual user data
function getBestPractices(
    careerStage?: string,
    archetype?: string,
    categoryScores?: CategoryScore[],
    profile?: ProfileData,
): { title: string; desc: string }[] {
    const tips: { title: string; desc: string; priority: number }[] = []

    // Helper: find category score percentage
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

    // Headline tips | based on actual headline analysis
    if (headlinePct < 60) {
        tips.push({ title: 'Your headline needs a clear role + industry', desc: `"${headline.slice(0, 50)}${headline.length > 50 ? '...' : ''}" does not clearly signal what you do. Add your role, domain, and a differentiator.`, priority: 10 })
    } else if (headline.length > 120) {
        tips.push({ title: `Your headline is ${headline.length} characters | trim to 120`, desc: 'Only the first ~120 characters show in search results and connection requests. Front-load the most important keywords.', priority: 7 })
    } else if (headlinePct >= 80) {
        tips.push({ title: 'Your headline is strong | keep it updated', desc: 'Review it quarterly. As your role or goals change, your headline should reflect your current positioning.', priority: 2 })
    }

    // About tips | personalized based on actual about content and role
    const topRole = experience[0]?.title || ''
    const topCompany = experience[0]?.company || ''
    const roleContext = topRole ? ` as a ${topRole}${topCompany ? ` at ${topCompany}` : ''}` : ''
    if (!about || about.length < 50) {
        tips.push({ title: 'You need an About section', desc: topRole ? `As a ${topRole}, write 3-5 paragraphs about what you do, your expertise in ${skills.slice(0, 2).join(' and ') || 'your field'}, and where you're headed professionally.` : 'Your About section is missing or too short. Write 3-5 paragraphs covering what you do, your key skills, and what you are looking for.', priority: 10 })
    } else if (aboutPct < 60) {
        const aboutStart = about.slice(0, 40)
        tips.push({ title: 'Strengthen your About section', desc: `Your About starts with "${aboutStart}..." | ${about.match(/\b(I|my)\b/i) ? 'good use of first person' : 'consider rewriting in first person'}. Mention specific skills (${skills.slice(0, 2).join(', ') || 'your tools'}) and include a clear professional direction.`, priority: 8 })
    } else if (about && !about.match(/\b(I|my|me)\b/i)) {
        tips.push({ title: 'Rewrite your About in first person', desc: `Your About section is written in third person. Switching to first person ("I lead..." instead of "They lead...") feels more authentic and personal${roleContext}.`, priority: 5 })
    }

    // Experience tips | personalized based on actual experience data
    if (experience.length === 0) {
        tips.push({ title: 'Add at least one experience entry', desc: careerStage === 'student' ? 'Internships and part-time roles all count as experience. Describe what you did, the tools you used, and any outcomes.' : 'Even brief roles should be listed with clear descriptions of responsibilities and outcomes.', priority: 10 })
    } else {
        const emptyDescs = experience.filter(e => !e.description || e.description.length < 30).length
        const topRole = experience[0]
        if (emptyDescs > 0) {
            const emptyRoles = experience.filter(e => !e.description || e.description.length < 30).slice(0, 2).map(e => `"${e.title}"`).join(' and ')
            tips.push({ title: `${emptyDescs} of your ${experience.length} roles lack descriptions`, desc: `Your ${emptyRoles} role${emptyDescs > 1 ? 's' : ''} need${emptyDescs === 1 ? 's' : ''} 2-4 bullet points each. Start with action verbs and include what you delivered.`, priority: 9 })
        } else if (experiencePct >= 75 && topRole) {
            tips.push({ title: `Add a metric to your ${topRole.title} role`, desc: `Your ${topRole.title}${topRole.company ? ` at ${topRole.company}` : ''} description is solid. Adding even one number ("increased X by Y%", "managed team of Z") would make it stand out to recruiters.`, priority: 4 })
        }
    }

    // Skills tips | personalized based on actual skills and role
    const currentRole = experience[0]?.title || ''
    const currentCompany = experience[0]?.company || ''
    if (skills.length === 0) {
        tips.push({ title: 'Add skills relevant to your role', desc: currentRole ? `As a ${currentRole}${currentCompany ? ` at ${currentCompany}` : ''}, add skills that reflect your day-to-day expertise | specific tools, frameworks, and methods you actually use.` : 'LinkedIn uses skills for search matching. Without skills listed, recruiters searching for your expertise cannot find you.', priority: 9 })
    } else if (skills.length < 5) {
        // Check if skills match the role
        const roleWords = currentRole.toLowerCase().split(/\s+/)
        const skillsLower = skills.map(s => s.toLowerCase())
        const skillsMatchRole = roleWords.some(w => skillsLower.some(s => s.includes(w)))
        
        if (!skillsMatchRole && currentRole) {
            tips.push({ title: `Your skills don't clearly match your role as ${currentRole}`, desc: `Your visible skills (${skills.join(', ')}) don't directly reflect your ${currentRole} role. Pin skills that recruiters search for when hiring for this position.`, priority: 8 })
        } else {
            tips.push({ title: `Your PDF shows ${skills.length} skills | ensure your top ones are pinned`, desc: `LinkedIn PDFs only export your top 3-5 skills. Your visible ones: ${skills.join(', ')}. On LinkedIn, pin the skills most relevant to ${currentRole || 'your target role'} at the top of your skills list.`, priority: 7 })
        }
    } else if (skillsPct >= 70) {
        tips.push({ title: 'Your skills are well-aligned', desc: `Your top skills (${skills.slice(0, 3).join(', ')}) are visible in your PDF. Ensure these match the keywords in job descriptions you're targeting${currentRole ? ` as a ${currentRole}` : ''}.`, priority: 3 })
    }

    // Education / Certs tips
    if (educationPct < 50) {
        tips.push({ title: 'Complete your education details', desc: 'Add your degree, field of study, and institution. If you have relevant certifications, adding even one can boost credibility.', priority: 6 })
    } else if (certs.length === 0 && careerStage !== 'student') {
        tips.push({ title: 'Add a certification', desc: 'Even one relevant certification (Google Analytics, AWS, HubSpot, etc.) signals commitment to professional development and improves search visibility.', priority: 4 })
    }

    // Completeness tips
    if (completenessPct < 60) {
        tips.push({ title: 'Fill in your missing profile sections', desc: 'Your profile has gaps. Completing all major sections (headline, about, experience, skills, education) gives LinkedIn more data to surface you in recruiter searches.', priority: 8 })
    }

    // Career-stage specific tips
    if (careerStage === 'student') {
        tips.push({ title: 'Add detailed descriptions to your experience entries', desc: 'LinkedIn PDFs only show Experience and Education. Make each role count | add 2-3 bullet points describing what you did, tools you used, and outcomes you achieved.', priority: 5 })
    }
    if (careerStage === 'senior' || archetype?.toLowerCase().includes('founder')) {
        tips.push({ title: 'Show trajectory in your experience', desc: 'Demonstrate a logical path to your current role. Domain credibility builds trust with investors, partners, and senior hires.', priority: 5 })
    }

    // Sort by priority (highest first), take top 4
    return tips
        .sort((a, b) => b.priority - a.priority)
        .slice(0, 4)
        .map(({ title, desc }) => ({ title, desc }))
}

// Parse a paragraph into bullet points when it contains numbered patterns like (1)...(2)... or multiple sentences with clear structure
function formatAsStructuredContent(text: string): { type: 'paragraph' | 'list'; header?: string; items: string[] } {
    if (!text) return { type: 'paragraph', items: [] }

    // Pattern: "Best practices:" or "Key points:" followed by numbered content
    const numberedPattern = /\(\d+\)\s*/
    const colonMatch = text.match(/^(.+?:\s*)(?=\(\d)/)
    if (colonMatch) {
        const header = colonMatch[1].trim()
        const rest = text.slice(colonMatch[0].length)
        const items = rest.split(/\(\d+\)\s*/).filter(s => s.trim().length > 0).map(s => s.trim().replace(/\.$/, ''))
        if (items.length >= 2) return { type: 'list', header, items }
    }

    // Pattern: (1) ... (2) ... (3) ...
    if (numberedPattern.test(text)) {
        const items = text.split(/\(\d+\)\s*/).filter(s => s.trim().length > 0).map(s => s.trim().replace(/\.$/, ''))
        if (items.length >= 2) {
            // If first item looks like an intro (ends with colon or is much longer), separate it
            if (items[0].endsWith(':') || (items[0].length > 80 && items.length > 2)) {
                return { type: 'list', header: items[0], items: items.slice(1) }
            }
            return { type: 'list', items }
        }
    }

    // Pattern: numbered list "1. ... 2. ... 3. ..."
    const dotNumbered = /(?:^|\n)\d+\.\s/
    if (dotNumbered.test(text)) {
        const items = text.split(/(?:^|\n)\d+\.\s*/).filter(s => s.trim().length > 0).map(s => s.trim().replace(/\.$/, ''))
        if (items.length >= 2) return { type: 'list', items }
    }

    return { type: 'paragraph', items: [text] }
}

export default function RecommendationCards({ recommendations, careerStage, archetype, categoryScores, profile }: RecommendationCardsProps) {
    if (!recommendations || recommendations.length === 0) return null

    const bestPractices = getBestPractices(careerStage, archetype, categoryScores, profile)

    return (
        <div className="space-y-3">
            {/* Recommendations */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-5 pt-5 pb-1">
                    <h3 className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-4">Recommendations</h3>
                </div>

                {recommendations.map((rec, i) => {
                    const fixContent = formatAsStructuredContent(rec.fix)
                    const whyContent = rec.whyItMatters || rec.why_it_matters || ''
                    const impactDot = rec.impact === 'High' ? 'bg-red-400' : rec.impact === 'Medium' ? 'bg-amber-400' : 'bg-gray-300'

                    return (
                        <div key={i} className={`px-5 py-4 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                            <div className="flex items-start gap-3">
                                <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${impactDot}`} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h4 className="text-[13px] font-semibold text-[#0A0F1C] leading-snug">{rec.title}</h4>
                                        {rec.impact && (
                                            <span className={`text-[10px] font-semibold shrink-0 ${rec.impact === 'High' ? 'text-red-500' : rec.impact === 'Medium' ? 'text-amber-600' : 'text-gray-400'}`}>
                                                {rec.impact}
                                            </span>
                                        )}
                                    </div>

                                    {whyContent && (
                                        <p className="text-[11px] text-[#9CA3AF] mb-2 leading-relaxed">{whyContent}</p>
                                    )}

                                    {fixContent.type === 'list' ? (
                                        <div>
                                            {fixContent.header && (
                                                <p className="text-xs text-[#4B5563] leading-relaxed mb-1.5">{fixContent.header}</p>
                                            )}
                                            <ul className="space-y-1">
                                                {fixContent.items.map((item, j) => (
                                                    <li key={j} className="flex items-start gap-1.5">
                                                        <span className="text-[10px] font-bold text-[#0A66C2] mt-0.5 shrink-0">{j + 1}.</span>
                                                        <span className="text-xs text-[#4B5563] leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-[#4B5563] leading-relaxed">{rec.fix}</p>
                                    )}

                                    {(rec.before || rec.after) && (
                                        <div className="mt-3 bg-[#F8FAFC] rounded-lg p-3 space-y-1.5">
                                            {rec.before && (
                                                <div>
                                                    <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider">Before</span>
                                                    <p className="text-[11px] text-[#6B7280] line-through opacity-60">{rec.before}</p>
                                                </div>
                                            )}
                                            {rec.after && (
                                                <div>
                                                    <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">After</span>
                                                    <p className="text-[11px] text-[#0A0F1C] font-medium">{rec.after}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Tips */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-5 pt-5 pb-1">
                    <h3 className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Tips For Your Profile</h3>
                </div>
                <div className="px-5 pb-5 space-y-3">
                    {bestPractices.map((bp, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                            <svg className="w-3.5 h-3.5 text-[#0A66C2] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                            <div>
                                <p className="text-xs font-semibold text-[#0A0F1C] mb-0.5">{bp.title}</p>
                                <p className="text-[11px] text-[#6B7280] leading-relaxed">{bp.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
