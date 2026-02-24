'use client'

import { useState } from 'react'
import { buildShareData } from '@/lib/viral'

interface ShareCardProps {
    toolName: string
    score: number
    resultSummary: string
    badge?: string
}

export default function ShareCard({ toolName, score, resultSummary, badge }: ShareCardProps) {
    const [copied, setCopied] = useState(false)
    const shareData = buildShareData(toolName, score, resultSummary)
    const captions = shareData.captions

    const tier = score >= 90 ? 'Platinum' : score >= 75 ? 'Gold' : score >= 60 ? 'Silver' : 'Bronze'
    const tierColors: Record<string, { gradient: string; glow: string; text: string }> = {
        Platinum: { gradient: 'from-slate-700 via-slate-500 to-slate-300', glow: 'shadow-slate-400/30', text: 'text-slate-100' },
        Gold: { gradient: 'from-amber-600 via-yellow-500 to-amber-400', glow: 'shadow-amber-400/30', text: 'text-amber-100' },
        Silver: { gradient: 'from-gray-500 via-gray-400 to-gray-300', glow: 'shadow-gray-400/20', text: 'text-gray-100' },
        Bronze: { gradient: 'from-orange-700 via-orange-600 to-orange-400', glow: 'shadow-orange-400/20', text: 'text-orange-100' },
    }
    const colors = tierColors[tier]

    const shareText = captions[0]?.text || `Just scored ${score}/100 on ${toolName} by LinkedIn Rank! 🚀`

    const handleCopy = () => {
        navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
    }

    const handleShareLinkedIn = () => {
        const url = encodeURIComponent('https://linkedinrank.com/tools')
        const text = encodeURIComponent(shareText)
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank')
    }

    return (
        <div className="mt-6">
            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">Share Your Result</p>

            {/* Premium Share Card */}
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.gradient} p-[1px] shadow-lg ${colors.glow}`}>
                <div className="relative overflow-hidden rounded-[15px] bg-gradient-to-br from-[#0A0F1C] to-[#1a1f36] px-5 py-5">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/3 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />

                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-[#0A66C2] flex items-center justify-center">
                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                </svg>
                            </div>
                            <span className="text-[11px] font-semibold text-white/60 tracking-wide">LinkedIn Rank</span>
                        </div>
                        <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${colors.gradient} text-white uppercase tracking-widest`}>
                            {tier}
                        </span>
                    </div>

                    {/* Score Circle */}
                    <div className="flex items-center gap-5 mb-4 relative z-10">
                        <div className="relative">
                            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                                <circle
                                    cx="40" cy="40" r="34" fill="none"
                                    stroke="url(#scoreGradient)"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeDasharray={`${(score / 100) * 213.63} 213.63`}
                                />
                                <defs>
                                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#0A66C2" />
                                        <stop offset="100%" stopColor="#38BDF8" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black text-white">{score}</span>
                                <span className="text-[8px] text-white/40 font-medium">/100</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-1">{toolName}</p>
                            <p className="text-sm text-white/80 leading-relaxed line-clamp-2">{resultSummary}</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 relative z-10">
                        <p className="text-[9px] text-white/30">linkedinrank.com/tools</p>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopy}
                                className="text-[10px] font-semibold text-white/60 hover:text-white transition-colors flex items-center gap-1"
                            >
                                {copied ? (
                                    <>
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                        </svg>
                                        Copy
                                    </>
                                )}
                            </button>
                            <button
                                onClick={handleShareLinkedIn}
                                className="text-[10px] font-semibold text-[#0A66C2] hover:text-[#38BDF8] transition-colors flex items-center gap-1"
                            >
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
