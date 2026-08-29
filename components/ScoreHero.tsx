'use client'

import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { CheckCircleIcon, ShieldCheckIcon } from '@/components/ui/Icons'

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
        const lineWidth = 8

        // Clear
        ctx.clearRect(0, 0, size, size)

        // Background track
        ctx.beginPath()
        ctx.arc(center, center, radius, 0, Math.PI * 2)
        ctx.strokeStyle = '#F1F5F9'
        ctx.lineWidth = lineWidth
        ctx.stroke()

        // Progress track
        const progress = displayScore / 100
        const startAngle = -Math.PI / 2
        const endAngle = startAngle + Math.PI * 2 * progress

        ctx.beginPath()
        ctx.arc(center, center, radius, startAngle, endAngle)
        ctx.strokeStyle = '#0A66C2'
        ctx.lineWidth = lineWidth
        ctx.lineCap = 'round'
        ctx.stroke()
    }, [displayScore])

    const normalizedTier = tier.toLowerCase()
    const tierBadgeVariant =
        normalizedTier === 'platinum'
            ? 'brand'
            : normalizedTier === 'gold'
            ? 'warning'
            : normalizedTier === 'silver'
            ? 'neutral'
            : 'neutral'

    const displayTier = tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase()

    return (
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs animate-fade-in">
            <div className="p-6 sm:p-8 text-center border-b border-[#F1F5F9]">
                <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-4">
                    Profile Audit Score
                </p>

                <div className="relative inline-block mb-3">
                    <canvas ref={canvasRef} className="mx-auto" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[44px] font-bold text-[#0F172A] tracking-tight tabular-nums leading-none">
                            {displayScore}
                        </span>
                        <span className="text-[12px] font-medium text-[#64748B] mt-1">out of 100</span>
                    </div>
                </div>

                <div className="mt-2">
                    <Badge variant={tierBadgeVariant} size="lg" dot>
                        {displayTier} Tier
                    </Badge>
                </div>
            </div>

            {/* Peer context feedback */}
            <div className="px-6 py-4 bg-[#FAFAFA] border-b border-[#F1F5F9]">
                {revealed ? (
                    <p className="text-[13px] text-[#475569] text-center leading-relaxed animate-fade-in">
                        {peerContext}
                    </p>
                ) : (
                    <div className="h-4 bg-[#E2E8F0] rounded animate-pulse mx-auto w-3/4" />
                )}
            </div>

            {/* Signal Verification Footer */}
            <div className="px-6 py-3 bg-white flex items-center justify-center gap-2 text-[12px] text-[#64748B]">
                <ShieldCheckIcon size={15} className="text-[#16A34A]" />
                <span className="font-medium text-[#334155]">Evaluated across 30+ recruiter search signals</span>
            </div>
        </div>
    )
}
