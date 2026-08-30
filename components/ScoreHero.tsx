'use client'

import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { CheckCircleIcon, ShieldCheckIcon, SparklesIcon } from '@/components/ui/Icons'

interface ScoreHeroProps {
    score: number
    name: string
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'bronze' | 'silver' | 'gold' | 'platinum'
    peerContext: string
}

export default function ScoreHero({
    score,
    name,
    tier,
    peerContext,
}: ScoreHeroProps) {
    const [displayScore, setDisplayScore] = useState(0)
    const [revealed, setRevealed] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const duration = 1000
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

        const size = 180
        const dpr = window.devicePixelRatio || 1
        canvas.width = size * dpr
        canvas.height = size * dpr
        canvas.style.width = `${size}px`
        canvas.style.height = `${size}px`
        ctx.scale(dpr, dpr)

        const center = size / 2
        const radius = 74
        const lineWidth = 10

        // Clear
        ctx.clearRect(0, 0, size, size)

        // Background track in soft lavender
        ctx.beginPath()
        ctx.arc(center, center, radius, 0, Math.PI * 2)
        ctx.strokeStyle = '#dedcff'
        ctx.lineWidth = lineWidth
        ctx.stroke()

        // Progress track with gradient
        const progress = displayScore / 100
        const startAngle = -Math.PI / 2
        const endAngle = startAngle + Math.PI * 2 * progress

        const gradient = ctx.createLinearGradient(0, 0, size, size)
        gradient.addColorStop(0, '#2f27ce')
        gradient.addColorStop(1, '#433bff')

        ctx.beginPath()
        ctx.arc(center, center, radius, startAngle, endAngle)
        ctx.strokeStyle = gradient
        ctx.lineWidth = lineWidth
        ctx.lineCap = 'round'
        ctx.stroke()
    }, [displayScore])

    const displayTier = tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase()

    return (
        <div className="bg-white border-2 border-[#dedcff] rounded-3xl overflow-hidden aside-card-shadow animate-fade-in">
            <div className="p-8 sm:p-10 text-center border-b border-[#dedcff]/70 space-y-6">
                <div className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-[#dedcff] text-[#2f27ce] text-[12px] font-extrabold shadow-2xs leading-none">
                    <SparklesIcon size={13} /> Algorithmic Recruiter Benchmark
                </div>

                <div className="relative inline-flex items-center justify-center my-2">
                    <canvas ref={canvasRef} className="block" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[44px] sm:text-[50px] font-black text-[#050315] tracking-tight tabular-nums leading-none">
                            {displayScore}
                        </span>
                        <span className="text-[12.5px] font-bold text-[#050315]/60 mt-0.5">
                            / 100
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-[18px] sm:text-[20px] font-extrabold text-[#050315]">
                            {displayTier} Profile Rank
                        </span>
                        <span className="inline-flex items-center justify-center gap-1 text-[11.5px] font-extrabold bg-[#dedcff] text-[#2f27ce] px-3.5 py-1.5 rounded-full shadow-2xs leading-none">
                            <ShieldCheckIcon size={13} /> Verified Audit
                        </span>
                    </div>
                    {peerContext && (
                        <p className="text-[14px] text-[#050315]/75 max-w-md mx-auto leading-relaxed">
                            {peerContext}
                        </p>
                    )}
                </div>
            </div>

            <div className="p-5 sm:p-6 bg-[#dedcff]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <p className="text-[13px] text-[#050315]/70">
                    Audit based on <strong className="text-[#050315]">30+ search matching signals</strong> &amp; real candidate benchmarks.
                </p>
                <div className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#2f27ce]">
                    <CheckCircleIcon size={15} />
                    <span>In-Memory Safe</span>
                </div>
            </div>
        </div>
    )
}
