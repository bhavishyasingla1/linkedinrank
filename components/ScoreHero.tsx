'use client'

import { useState, useEffect, useRef } from 'react'

interface ScoreHeroProps {
    score: number
    name: string
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
    peerContext: string
}

export default function ScoreHero({ score, name, tier, peerContext }: ScoreHeroProps) {
    const [displayScore, setDisplayScore] = useState(0)
    const [revealed, setRevealed] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const duration = 1200
        const start = performance.now()

        const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplayScore(Math.round(score * eased))

            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                setRevealed(true)
            }
        }

        requestAnimationFrame(animate)
    }, [score])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const size = 200
        const dpr = window.devicePixelRatio || 1
        canvas.width = size * dpr
        canvas.height = size * dpr
        canvas.style.width = `${size}px`
        canvas.style.height = `${size}px`
        ctx.scale(dpr, dpr)

        const center = size / 2
        const radius = 82
        const lineWidth = 8

        // Background ring
        ctx.beginPath()
        ctx.arc(center, center, radius, 0, Math.PI * 2)
        ctx.strokeStyle = '#E5E7EB'
        ctx.lineWidth = lineWidth
        ctx.stroke()

        // Progress ring
        const progress = displayScore / 100
        const startAngle = -Math.PI / 2
        const endAngle = startAngle + (Math.PI * 2 * progress)

        ctx.beginPath()
        ctx.arc(center, center, radius, startAngle, endAngle)
        ctx.strokeStyle = '#0A66C2'
        ctx.lineWidth = lineWidth
        ctx.lineCap = 'round'
        ctx.stroke()
    }, [displayScore])

    const tierConfig: Record<string, { color: string; bg: string }> = {
        Bronze: { color: '#8B6914', bg: '#FEF3C7' },
        Silver: { color: '#6B7280', bg: '#F3F4F6' },
        Gold: { color: '#92400E', bg: '#FEF3C7' },
        Platinum: { color: '#5B21B6', bg: '#EDE9FE' }
    }

    const { color, bg } = tierConfig[tier]

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-fade-in">
            <div className="relative px-6 py-8 text-center">
                <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-5">LinkedInRank Score</p>
                <div className="relative inline-block mb-4">
                    <canvas ref={canvasRef} className="score-ring" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold text-[#0A0F1C] tracking-tight tabular-nums">
                            {displayScore}
                        </span>
                        <span className="text-[11px] font-medium text-[#9CA3AF] mt-1">out of 100</span>
                    </div>
                </div>
                <div>
                    <span
                        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                        style={{ color, backgroundColor: bg }}
                    >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" /></svg>
                        {tier} Tier
                    </span>
                </div>
            </div>

            <div className="px-5 py-3.5 border-t border-gray-100">
                {revealed ? (
                    <p className="text-xs text-[#6B7280] text-center leading-relaxed animate-fade-in">
                        {peerContext}
                    </p>
                ) : (
                    <div className="h-4 bg-gray-100 rounded animate-pulse mx-auto w-3/4" />
                )}
            </div>
        </div>
    )
}
