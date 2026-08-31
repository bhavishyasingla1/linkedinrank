'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getPendingFile } from '@/lib/uploadStore'
import { CheckIcon, ShieldCheckIcon, SparklesIcon } from '@/components/ui/Icons'

const STAGES = [
    { id: 1, label: 'Reading LinkedIn PDF structure' },
    { id: 2, label: 'Evaluating headline & search positioning' },
    { id: 3, label: 'Auditing experience depth & metrics' },
    { id: 4, label: 'Checking keyword discoverability & skills' },
    { id: 5, label: 'Calculating section scores and tier' },
    { id: 6, label: 'Generating personalized roadmap' },
]

// Progress thresholds per stage (0-88% is animated across ~4 seconds to match AI speed)
const STAGE_PROGRESS = [0, 15, 30, 48, 64, 78, 90]

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

        // ── Smooth progress animation calibrated for 4-5s AI response ──
        const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

        const animateToValue = async (
            from: number,
            to: number,
            durationMs: number,
            onTick: (v: number) => void,
        ) => {
            const steps = 25
            const stepMs = durationMs / steps
            for (let i = 1; i <= steps; i++) {
                if (!mounted) return
                const t = i / steps
                const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
                onTick(from + (to - from) * eased)
                await sleep(stepMs)
            }
        }

        const runProgress = async () => {
            // Phase 1: Dynamic stage-by-stage progression (~680ms per stage = ~4.0s total)
            const stageDuration = 680

            for (let i = 0; i < STAGES.length; i++) {
                if (!mounted) return

                setCurrentStage(i)

                const fromPct = STAGE_PROGRESS[i]
                const toPct = STAGE_PROGRESS[i + 1]

                await animateToValue(fromPct, toPct, stageDuration, (v) => {
                    if (mounted) setProgress(v)
                })

                if (apiSignal.done && i >= 4) break
            }

            if (!mounted) return

            // Phase 2: If API is still processing, gently crawl 90% → 96%
            const crawlFrom = Math.min(progress, 90)
            const crawlTo = 96
            const crawlRatePerMs = 1.5 / 1000

            let crawlCurrent = crawlFrom
            while (!apiSignal.done && mounted && crawlCurrent < crawlTo) {
                await sleep(40)
                crawlCurrent = Math.min(crawlCurrent + crawlRatePerMs * 40, crawlTo)
                if (mounted) setProgress(crawlCurrent)
            }

            if (!mounted) return

            // Phase 3: API done — finish up
            if (apiSignal.error) {
                sessionStorage.setItem('analysisError', apiSignal.error)
                routerRef.current.push('/#upload')
                return
            }

            // Set final stage active and snap to 100%
            setCurrentStage(STAGES.length - 1)
            const currentPct = Math.max(crawlCurrent, 92)
            await animateToValue(currentPct, 100, 260, (v) => {
                if (mounted) setProgress(v)
            })

            // Brief hold at 100%
            await sleep(220)

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
        <main className="min-h-screen bg-[#fbfbfe] text-[#050315] flex items-center justify-center p-4 sm:p-6 select-none aside-hero-glow">
            <div className="max-w-md w-full">
                {/* Brand Logo Header */}
                <div className="text-center mb-6 sm:mb-8 space-y-2.5 sm:space-y-3">
                    <Link
                        href="/"
                        className="font-extrabold text-[20px] sm:text-[26px] tracking-tight text-[#050315] no-underline inline-flex items-center gap-2 sm:gap-2.5"
                    >
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#2f27ce] to-[#433bff] text-white flex items-center justify-center shadow-xs shrink-0">
                            <SparklesIcon size={15} />
                        </span>
                        <span>
                            LinkedIn<span className="text-[#2f27ce]">Rank</span>
                        </span>
                    </Link>
                    <p className="text-[12.5px] sm:text-[14px] text-[#050315]/75 max-w-sm mx-auto leading-relaxed px-2">
                        Evaluating profile against 30+ recruiter search signals
                    </p>
                </div>

                {/* Main Progress Card */}
                <div className="bg-white border-2 border-[#dedcff] rounded-2xl sm:rounded-3xl p-5 sm:p-9 aside-card-shadow space-y-5 sm:space-y-6">
                    {/* Big Centered Metric */}
                    <div className="text-center space-y-1.5 sm:space-y-2">
                        <span className="text-[48px] sm:text-[64px] font-black text-[#2f27ce] tracking-tight tabular-nums leading-none block">
                            {Math.round(progress)}%
                        </span>
                        <div className="text-[13px] sm:text-[15px] font-extrabold text-[#050315] animate-fade-in truncate px-1" key={currentStage}>
                            {STAGES[currentStage]?.label}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2.5 sm:h-3 bg-[#dedcff]/50 rounded-full p-0.5 border border-[#dedcff] overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] rounded-full shadow-xs transition-none"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Stage Checklist */}
                    <div className="space-y-2.5 sm:space-y-3 pt-3.5 sm:pt-4 border-t border-[#dedcff]/70">
                        {STAGES.map((stage, index) => {
                            const isDone = index < currentStage
                            const isCurrent = index === currentStage

                            return (
                                <div
                                    key={stage.id}
                                    className={`flex items-center gap-2.5 sm:gap-3 text-[12.5px] sm:text-[14px] transition-colors ${
                                        isDone
                                            ? 'text-[#050315]/60'
                                            : isCurrent
                                            ? 'text-[#050315] font-bold'
                                            : 'text-[#050315]/30'
                                    }`}
                                >
                                    <div
                                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                            isDone
                                                ? 'bg-[#dedcff] border-[#dedcff] text-[#2f27ce]'
                                                : isCurrent
                                                ? 'bg-[#2f27ce] border-[#2f27ce] text-white shadow-2xs'
                                                : 'bg-white border-[#dedcff]'
                                        }`}
                                    >
                                        {isDone && <CheckIcon size={12} />}
                                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                                    </div>
                                    <span className="leading-snug flex-1">{stage.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Privacy Badge */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6 text-[11.5px] sm:text-[13px] text-[#050315]/65 font-medium text-center px-2">
                    <ShieldCheckIcon size={14} className="text-[#2f27ce] shrink-0" />
                    <span>Processed in temporary memory • Zero persistent storage</span>
                </div>
            </div>
        </main>
    )
}
