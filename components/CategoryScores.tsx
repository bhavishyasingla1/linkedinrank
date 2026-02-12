'use client'

import { useState } from 'react'
import { CategoryScore } from '@/lib/types'

interface CategoryScoresProps {
    categories: CategoryScore[]
}

const categoryIcons: Record<string, JSX.Element> = {
    'Headline': <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>,
    'About': <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
    'Experience': <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>,
    'Skills': <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
    'Education & Certifications': <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>,
    'Completeness & Structure': <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
}

const categoryColors: Record<string, string> = {
    'Headline': '#0A66C2',
    'About': '#2563EB',
    'Experience': '#4F46E5',
    'Skills': '#7C3AED',
    'Education & Certifications': '#9333EA',
    'Completeness & Structure': '#A855F7',
}

export default function CategoryScores({ categories }: CategoryScoresProps) {
    const [expanded, setExpanded] = useState<number | null>(null)

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 pt-5 pb-4">
                <h3 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-4">Score Breakdown</h3>

                <div className="space-y-1">
                    {categories.map((cat, i) => {
                        const color = categoryColors[cat.category] || '#0A66C2'
                        const icon = categoryIcons[cat.category]
                        const isExpanded = expanded === i
                        const statusColor = cat.percentage >= 70 ? 'text-emerald-600' : cat.percentage >= 45 ? 'text-[#0A66C2]' : 'text-red-500'

                        return (
                            <div key={i}>
                                <button
                                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer text-left"
                                    onClick={() => setExpanded(isExpanded ? null : i)}
                                >
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: color + '10', color }}>
                                        {icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-[13px] font-semibold text-[#0A0F1C]">{cat.category}</span>
                                            <span className={`text-xs font-bold tabular-nums ${statusColor}`}>
                                                {cat.earnedPoints}/{cat.maxPoints}
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-700 ease-out"
                                                style={{ width: `${cat.percentage}%`, backgroundColor: color }}
                                            />
                                        </div>
                                    </div>
                                    <svg className={`w-3.5 h-3.5 text-[#9CA3AF] transition-transform duration-200 shrink-0 print:hidden ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                </button>

                                {cat.breakdown && cat.breakdown.length > 0 && (
                                    <div className={`ml-13 pl-3 pb-2 ${isExpanded ? 'animate-fade-in' : 'hidden print:block'}`}>
                                        <div className="space-y-1.5 ml-10">
                                            {cat.breakdown.map((item, j) => {
                                                const isPositive = item.startsWith('✓') || item.startsWith('✔')
                                                const isNegative = item.startsWith('○') || item.startsWith('✗') || item.startsWith('✘')
                                                const cleanItem = item.replace(/^[✓✔○✗✘]\s*/, '')
                                                return (
                                                    <div key={j} className="flex items-start gap-2">
                                                        {isPositive ? (
                                                            <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                                        ) : isNegative ? (
                                                            <svg className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                                                        ) : (
                                                            <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0 mt-0.5">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                                            </span>
                                                        )}
                                                        <p className="text-xs text-[#4B5563] leading-relaxed">{cleanItem}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
