'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheckIcon, CheckCircleIcon, SparklesIcon } from '@/components/ui/Icons'

const STAGES = [
    { id: 1, label: 'Reading LinkedIn PDF structure' },
    { id: 2, label: 'Evaluating headline & search positioning' },
    { id: 3, label: 'Auditing experience depth & metrics' },
    { id: 4, label: 'Checking keyword discoverability & skills' },
    { id: 5, label: 'Calculating section scores and tier' },
    { id: 6, label: 'Generating personalized roadmap' },
]

// Progress thresholds per stage (0-88% is animated, 88-95% is slow crawl, 95-100 is instant on complete)
const STAGE_PROGRESS = [0, 14, 28, 44, 58, 74, 88]

import { getPendingFile, clearPendingFile } from '@/lib/uploadStore'

export default function LoadingAnalysisPage() {
    const [currentStage, setCurrentStage] = useState(0)
    const [progress, setProgress] = useState(0)
    const router = useRouter()
    const routerRef = useRef(router)
    routerRef.current = router

    useEffect(() => {
        let fileToUpload: File | null = getPendingFile()

        if (!fileToUpload) {
            const fileDataStr = sessionStorage.getItem('uploadingFile')
            if (fileDataStr) {
                try {
                    const { fileName, fileContent } = JSON.parse(fileDataStr)
                    const byteCharacters = atob(fileContent)
                    const byteArray = new Uint8Array(byteCharacters.length)
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteArray[i] = byteCharacters.charCodeAt(i)
                    }
                    const blob = new Blob([byteArray], { type: 'application/pdf' })
                    fileToUpload = new File([blob], fileName || 'linkedin_profile.pdf', { type: 'application/pdf' })
                } catch (e) {
                    console.error('Failed to reconstruct file from sessionStorage', e)
                }
            }
        }

        if (!fileToUpload) {
            routerRef.current.push('/')
            return
        }

        let mounted = true

        // Shared signal — API sets this when done
        const apiSignal = { done: false, success: false, error: null as string | null }

        // ── API call ─────────────────────────────────────────────────
        const analyzeFile = async () => {
            try {
                const formData = new FormData()
                formData.append('file', fileToUpload!)

                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    body: formData,
                })

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}))
                    throw new Error(errorData.error || `Analysis failed (${response.status})`)
                }

                const result = await response.json()
                const analysisData = result.data || result
                sessionStorage.setItem('analysisResult', JSON.stringify(analysisData))
                apiSignal.success = true
            } catch (error: any) {
                console.error('Analysis error:', error)
                apiSignal.error = error.message || 'Analysis failed. Please try again.'
            } finally {
                apiSignal.done = true
            }
        }

        // ── Smooth progress animation ────────────────────────────────
        //
        // Phase 1: Animate stage-by-stage from 0% → 88%
        //          Total duration ≈ 9s (covers most real API times)
        //          Each stage animates smoothly with easing.
        //
        // Phase 2: Slow crawl from 88% → 95% at ~0.4% per second
        //          This runs while we wait for the API to finish.
        //
        // Phase 3: API done → snap 95% → 100%, brief pause, redirect.
        //
        const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

        const animateToValue = async (
            from: number,
            to: number,
            durationMs: number,
            onTick: (v: number) => void,
        ) => {
            const steps = 40
            const stepMs = durationMs / steps
            for (let i = 1; i <= steps; i++) {
                if (!mounted) return
                // Ease-in-out cubic
                const t = i / steps
                const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
                onTick(from + (to - from) * eased)
                await sleep(stepMs)
            }
        }

        const runProgress = async () => {
            // Phase 1: Stage-by-stage animation (0 → 88%) over ~9 seconds
            // Per stage: 9000ms / 6 stages = 1500ms each
            const stageDuration = 1500

            for (let i = 0; i < STAGES.length; i++) {
                if (!mounted) return

                setCurrentStage(i)

                const fromPct = STAGE_PROGRESS[i]
                const toPct = STAGE_PROGRESS[i + 1]

                await animateToValue(fromPct, toPct, stageDuration, (v) => {
                    if (mounted) setProgress(v)
                })

                // If API already done before we finish stage animation, break out
                if (apiSignal.done) break
            }

            if (!mounted) return

            // Phase 2: Slow crawl 88% → 95% while waiting for API
            // Rate: 0.3% per second = ~23s to reach 95% (safe upper limit)
            const crawlFrom = Math.min(progress, 88)
            const crawlTo = 95
            const crawlRatePerMs = 0.3 / 1000 // 0.3% per second

            let crawlCurrent = crawlFrom
            while (!apiSignal.done && mounted && crawlCurrent < crawlTo) {
                await sleep(50)
                crawlCurrent = Math.min(crawlCurrent + crawlRatePerMs * 50, crawlTo)
                if (mounted) setProgress(crawlCurrent)
            }

            if (!mounted) return

            // Phase 3: API done — finish up
            if (apiSignal.error) {
                sessionStorage.setItem('analysisError', apiSignal.error)
                routerRef.current.push('/#upload')
                return
            }

            // Snap to 100% with a quick smooth animation
            const currentPct = crawlCurrent
            await animateToValue(currentPct, 100, 400, (v) => {
                if (mounted) setProgress(v)
            })

            // Brief hold at 100%
            await sleep(350)

            if (mounted) {
                routerRef.current.push('/results')
            }
        }

        analyzeFile()
        runProgress()

        return () => {
            mounted = false
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main className="min-h-screen bg-[#fbfbfe] text-[#050315] flex items-center justify-center p-4 sm:p-6 aside-hero-glow">
            <div className="max-w-md w-full">
                {/* Brand Logo */}
                <div className="text-center mb-8 space-y-2">
                    <Link
                        href="/"
                        className="font-bold text-[22px] tracking-tight text-[#050315] no-underline inline-flex items-center gap-2"
                    >
                        <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2f27ce] to-[#433bff] text-[#fbfbfe] flex items-center justify-center shadow-xs">
                            <SparklesIcon size={15} />
                        </span>
                        <span className="font-extrabold tracking-tight">
                            LinkedIn<span className="text-[#2f27ce]">Rank</span>
                        </span>
                    </Link>
                    <p className="text-[13px] font-medium text-[#050315]/65">
                        Evaluating profile against 30+ recruiter search signals
                    </p>
                </div>

                {/* Progress Card */}
                <div className="bg-white border-2 border-[#dedcff] rounded-3xl p-6 sm:p-8 aside-card-shadow space-y-6">
                    <div className="text-center space-y-1">
                        <span className="text-[44px] font-black text-[#050315] tabular-nums tracking-tight">
                            {Math.round(progress)}%
                        </span>
                        <p className="text-[13.5px] font-bold text-[#2f27ce] animate-fade-in" key={currentStage}>
                            {STAGES[currentStage]?.label}
                        </p>
                    </div>

                    {/* Progress Track */}
                    <div className="h-3 bg-[#dedcff]/50 rounded-full overflow-hidden p-0.5 border border-[#dedcff]">
                        <div
                            className="h-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] rounded-full shadow-sm shadow-[#2f27ce]/30 transition-none"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Stage Checklist */}
                    <div className="space-y-2.5 pt-4 border-t border-[#dedcff]">
                        {STAGES.map((stage, index) => {
                            const isDone = index < currentStage
                            const isCurrent = index === currentStage

                            return (
                                <div
                                    key={stage.id}
                                    className={`flex items-center gap-3 text-[12.5px] transition-colors ${
                                        isDone
                                            ? 'text-[#050315]/60'
                                            : isCurrent
                                            ? 'text-[#050315] font-bold'
                                            : 'text-[#050315]/30'
                                    }`}
                                >
                                    <div
                                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                                            isDone
                                                ? 'bg-[#dedcff] border-[#dedcff] text-[#2f27ce]'
                                                : isCurrent
                                                ? 'bg-[#2f27ce] border-[#2f27ce] text-white shadow-xs'
                                                : 'bg-white border-[#dedcff]'
                                        }`}
                                    >
                                        {isDone && <CheckCircleIcon size={12} />}
                                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                                    </div>
                                    <span>{stage.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Privacy Badge */}
                <div className="flex items-center justify-center gap-1.5 mt-6 text-[12.5px] text-[#050315]/60 font-medium">
                    <ShieldCheckIcon size={14} className="text-[#2f27ce]" />
                    <span>Processed in temporary memory • Zero persistent storage</span>
                </div>
            </div>
        </main>
    )
}
