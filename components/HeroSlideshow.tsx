'use client'

import { useState, useEffect } from 'react'

const PREVIEW_SLIDES = [
    { type: 'score' as const },
    { type: 'recommendation' as const },
    { type: 'roadmap' as const },
]

export default function HeroSlideshow() {
    const [slideIndex, setSlideIndex] = useState(0)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const timer = setInterval(() => {
            setSlideIndex(prev => (prev + 1) % PREVIEW_SLIDES.length)
        }, 3500)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="hidden lg:block">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A66C2] to-[#4F46E5]" />

                {mounted ? (
                    <div key={slideIndex} className="animate-fade-in min-h-[340px]">
                        {/* Slide 1: Score + Category breakdown */}
                        {slideIndex === 0 && (
                            <div className="p-7">
                                <p className="text-[10px] font-bold text-[#4B5563] uppercase tracking-widest mb-5">Your Report</p>
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="relative w-28 h-28 shrink-0">
                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                                            <circle cx="60" cy="60" r="52" fill="none" stroke="#E5E7EB" strokeWidth="7" />
                                            <circle cx="60" cy="60" r="52" fill="none" stroke="#0A66C2" strokeWidth="7" strokeDasharray={2 * Math.PI * 52} strokeDashoffset={2 * Math.PI * 52 * (1 - 0.74)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease-out' }} />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-bold text-[#0A0F1C] tabular-nums">74</span>
                                            <span className="text-[10px] text-[#4B5563]">/ 100</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        {[
                                            { label: 'Headline', score: 14, max: 20, pct: 70 },
                                            { label: 'About', score: 16, max: 20, pct: 80 },
                                            { label: 'Experience', score: 18, max: 25, pct: 72 },
                                            { label: 'Skills', score: 11, max: 15, pct: 73 },
                                        ].map((c, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between text-[11px] mb-0.5">
                                                    <span className="font-semibold text-[#0A0F1C]">{c.label}</span>
                                                    <span className="text-[#4B5563] tabular-nums">{c.score}/{c.max}</span>
                                                </div>
                                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full bg-gradient-to-r from-[#0A66C2] to-[#4F46E5]" style={{ width: `${c.pct}%`, transition: 'width 0.7s ease-out' }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#92400E] bg-[#FEF3C7]">
                                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" /></svg>
                                        Gold
                                    </span>
                                    <span className="text-[11px] text-[#4B5563]">Top 30% of analyzed profiles</span>
                                </div>
                            </div>
                        )}

                        {/* Slide 2: Recommendation + AI Rewrite */}
                        {slideIndex === 1 && (
                            <div className="p-7">
                                <p className="text-[10px] font-bold text-[#4B5563] uppercase tracking-widest mb-4">AI Recommendations</p>
                                <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 mb-4">
                                    <div className="flex items-start gap-2.5 mb-3">
                                        <div className="w-6 h-6 rounded-md bg-[#FEF3C7] flex items-center justify-center shrink-0 mt-0.5">
                                            <svg className="w-3.5 h-3.5 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-[#0A0F1C]">Your headline is too generic</p>
                                            <p className="text-[11px] text-[#4B5563] mt-0.5">It doesn&apos;t include keywords recruiters search for</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                                            <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-0.5">Before</p>
                                            <p className="text-xs text-[#4B5563]">Marketing Manager at TechCorp</p>
                                        </div>
                                        <div className="bg-white border border-[#DBEAFE] rounded-lg px-3 py-2">
                                            <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-0.5">After</p>
                                            <p className="text-xs text-[#0A0F1C] font-medium">B2B SaaS Growth Marketer | Demand Gen &amp; Content Strategy | 3x Pipeline Growth</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">+6 pts</span>
                                    <span className="text-[11px] text-[#4B5563]">Expected score increase from this fix</span>
                                </div>
                            </div>
                        )}

                        {/* Slide 3: Improvement Roadmap */}
                        {slideIndex === 2 && (
                            <div className="p-7">
                                <p className="text-[10px] font-bold text-[#4B5563] uppercase tracking-widest mb-4">Improvement Roadmap</p>
                                <div className="space-y-2.5">
                                    {[
                                        { fix: 'Add metrics to experience bullets', pts: '+5', time: '10 min', done: false },
                                        { fix: 'Rewrite headline with keywords', pts: '+6', time: '5 min', done: false },
                                        { fix: 'Expand About to 200+ words', pts: '+4', time: '15 min', done: true },
                                        { fix: 'Add 5 more relevant skills', pts: '+3', time: '3 min', done: false },
                                    ].map((item, i) => (
                                        <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${item.done ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-gray-100'}`}>
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${item.done ? 'bg-emerald-500' : 'border-2 border-gray-200'}`}>
                                                {item.done && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                                            </div>
                                            <p className={`flex-1 text-xs font-medium ${item.done ? 'text-[#6B7280] line-through' : 'text-[#0A0F1C]'}`}>{item.fix}</p>
                                            <span className={`text-[11px] font-bold tabular-nums shrink-0 ${item.done ? 'text-emerald-500' : 'text-[#0A66C2]'}`}>{item.pts}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-[11px] text-[#4B5563]">Total potential gain</span>
                                    <span className="text-sm font-bold text-[#0A66C2]">+18 pts</span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="p-7 min-h-[340px] flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {/* Slide labels + indicators */}
                <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {['Score', 'AI Rewrite', 'Roadmap'].map((label, i) => (
                            <button key={i} onClick={() => setSlideIndex(i)} className={`text-[11px] font-semibold transition-colors cursor-pointer py-2 px-1 ${i === slideIndex ? 'text-[#0A66C2]' : 'text-[#6B7280] hover:text-[#0A0F1C]'}`}>{label}</button>
                        ))}
                    </div>
                    <div className="flex gap-0 items-center">
                        {PREVIEW_SLIDES.map((_, i) => (
                            <button key={i} onClick={() => setSlideIndex(i)} aria-label={`Go to slide ${i + 1}`} className="p-3 cursor-pointer">
                                <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === slideIndex ? 'bg-[#0A66C2] w-5' : 'bg-gray-200 w-1.5'}`} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
