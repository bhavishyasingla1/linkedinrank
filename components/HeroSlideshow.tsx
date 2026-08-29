'use client'

import { useState } from 'react'
import { CheckCircleIcon, SparklesIcon, AlertTriangleIcon } from '@/components/ui/Icons'

const TABS = [
    { id: 'score', label: 'Score Breakdown' },
    { id: 'rewrite', label: 'Headline Fix' },
    { id: 'roadmap', label: 'Priority Roadmap' },
]

export default function HeroSlideshow() {
    const [activeTab, setActiveTab] = useState<'score' | 'rewrite' | 'roadmap'>('score')

    return (
        <div className="w-full">
            {/* Main Product Frame */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-[0_4px_16px_-4px_rgba(15,23,42,0.08),0_1px_3px_0_rgba(15,23,42,0.04)] overflow-hidden">
                {/* Header bar mimicking real product window */}
                <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                        <span className="text-[12px] font-semibold text-[#475569] ml-2">
                            LinkedInRank Audit Report
                        </span>
                    </div>

                    <span className="text-[11px] font-medium text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 rounded">
                        ✓ 30 Signals Verified
                    </span>
                </div>

                {/* Main Content Area */}
                <div className="p-6 sm:p-7 min-h-[350px] flex flex-col justify-between">
                    {/* View 1: Score & Breakdown */}
                    {activeTab === 'score' && (
                        <div className="animate-fade-in space-y-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
                                        Overall Profile Score
                                    </p>
                                    <h3 className="text-[20px] font-bold text-[#0F172A] tracking-tight">
                                        Strong Foundation
                                    </h3>
                                    <p className="text-[13px] text-[#64748B] mt-0.5">
                                        3 key sections are limiting recruiter search visibility.
                                    </p>
                                </div>
                                <div className="flex items-baseline gap-1 bg-[#F0F7FF] border border-[#BAE0FD] px-3.5 py-2 rounded-lg">
                                    <span className="text-[28px] font-bold text-[#0A66C2] tabular-nums leading-none">
                                        74
                                    </span>
                                    <span className="text-[13px] font-medium text-[#64748B]">/100</span>
                                </div>
                            </div>

                            {/* Category Bars */}
                            <div className="space-y-3 pt-2">
                                {[
                                    { name: 'Headline & Positioning', score: 82, status: 'Strong', color: 'bg-[#0A66C2]' },
                                    { name: 'Experience & Impact', score: 77, status: 'Good', color: 'bg-[#0A66C2]' },
                                    { name: 'About Section Story', score: 68, status: 'Needs Polish', color: 'bg-[#D97706]' },
                                    { name: 'Keyword Discoverability', score: 61, status: 'Friction Point', color: 'bg-[#DC2626]' },
                                ].map((cat, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex items-center justify-between text-[13px]">
                                            <span className="font-medium text-[#334155]">{cat.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[11px] text-[#64748B]">{cat.status}</span>
                                                <span className="font-semibold text-[#0F172A] tabular-nums">{cat.score}</span>
                                            </div>
                                        </div>
                                        <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${cat.color}`}
                                                style={{ width: `${cat.score}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* View 2: Headline Fix / Rewrite */}
                    {activeTab === 'rewrite' && (
                        <div className="animate-fade-in space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="p-1 rounded bg-[#FFFBEB] text-[#D97706]">
                                        <AlertTriangleIcon size={16} />
                                    </span>
                                    <span className="text-[13px] font-semibold text-[#0F172A]">
                                        Priority Fix: Headline Optimization
                                    </span>
                                </div>
                                <span className="text-[12px] font-bold text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 rounded">
                                    +8 Points
                                </span>
                            </div>

                            <div className="space-y-3">
                                {/* Current / Weak */}
                                <div className="p-3.5 rounded-lg bg-[#FEF2F2]/50 border border-[#FECACA]">
                                    <p className="text-[11px] font-bold text-[#DC2626] uppercase tracking-wider mb-1">
                                        Current Headline (Low Recruiter Search Volume)
                                    </p>
                                    <p className="text-[13px] text-[#475569]">
                                        Computer Science Student | AI Enthusiast | Seeking Roles
                                    </p>
                                </div>

                                {/* Recommended */}
                                <div className="p-3.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0]">
                                    <p className="text-[11px] font-bold text-[#16A34A] uppercase tracking-wider mb-1 flex items-center gap-1">
                                        <SparklesIcon size={13} />
                                        Recommended Headline (Keyword &amp; Role Aligned)
                                    </p>
                                    <p className="text-[13px] font-medium text-[#0F172A]">
                                        Computer Science Student Building AI &amp; Automation Systems | Python · FastAPI · React
                                    </p>
                                </div>
                            </div>

                            <p className="text-[12px] text-[#64748B] pt-1">
                                <strong>Why this works:</strong> Adds searchable tech stacks recruiters query in LinkedIn Recruiter filters.
                            </p>
                        </div>
                    )}

                    {/* View 3: Priority Roadmap */}
                    {activeTab === 'roadmap' && (
                        <div className="animate-fade-in space-y-3.5">
                            <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
                                <span className="text-[13px] font-semibold text-[#0F172A]">
                                    Step-by-Step Improvement Plan
                                </span>
                                <span className="text-[12px] text-[#64748B]">
                                    Potential Gain: <strong className="text-[#0A66C2]">+18 Pts</strong>
                                </span>
                            </div>

                            <div className="space-y-2">
                                {[
                                    { task: 'Rewrite headline with searchable keywords', time: '3 min', gain: '+8 pts', high: true },
                                    { task: 'Quantify metrics in primary experience description', time: '10 min', gain: '+6 pts', high: true },
                                    { task: 'Add target skills to top 5 verified skills list', time: '2 min', gain: '+4 pts', high: false },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="p-3 rounded-lg border border-[#E2E8F0] bg-white flex items-center justify-between gap-3 shadow-xs"
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <CheckCircleIcon size={16} className="text-[#0A66C2] shrink-0" />
                                            <span className="text-[13px] text-[#334155] font-medium truncate">
                                                {item.task}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="text-[11px] text-[#64748B]">{item.time}</span>
                                            <span className="text-[12px] font-bold text-[#16A34A] bg-[#F0FDF4] px-1.5 py-0.5 rounded">
                                                {item.gain}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Interactive Tab Switcher */}
                    <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-lg overflow-x-auto scrollbar-none max-w-full">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`
                                        text-[12px] font-medium px-3 py-1.5 rounded-md transition-colors cursor-pointer select-none shrink-0 min-h-[36px] sm:min-h-0
                                        ${activeTab === tab.id
                                            ? 'bg-white text-[#0F172A] shadow-xs font-semibold'
                                            : 'text-[#64748B] hover:text-[#0F172A]'
                                        }
                                    `}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <span className="hidden sm:inline text-[11px] text-[#94A3B8] shrink-0">
                            Interactive Preview
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
