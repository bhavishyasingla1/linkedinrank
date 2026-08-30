'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheckIcon, CheckCircleIcon, SparklesIcon } from '@/components/ui/Icons'

const STAGES = [
    { id: 1, label: 'Reading LinkedIn PDF structure', duration: 1200 },
    { id: 2, label: 'Evaluating headline & search positioning', duration: 1400 },
    { id: 3, label: 'Auditing experience depth & metrics', duration: 1600 },
    { id: 4, label: 'Checking keyword discoverability & skills', duration: 1800 },
    { id: 5, label: 'Calculating section scores and tier', duration: 2000 },
    { id: 6, label: 'Generating personalized roadmap', duration: 700 },
]

import { getPendingFile, clearPendingFile } from '@/lib/uploadStore'

export default function LoadingAnalysisPage() {
    const [currentStage, setCurrentStage] = useState(0)
    const [progress, setProgress] = useState(0)
    const router = useRouter()

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
            router.push('/')
            return
        }

        let mounted = true
        let isAnalysisComplete = false
        let analysisErrorOccurred: string | null = null

        const analyzeFile = async () => {
            try {
                if (!fileToUpload) throw new Error('No file provided')

                const formData = new FormData()
                formData.append('file', fileToUpload)

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
                isAnalysisComplete = true
                return true
            } catch (error: any) {
                console.error('Analysis error:', error)
                analysisErrorOccurred = error.message || 'Analysis failed. Please try again.'
                isAnalysisComplete = true
                return false
            }
        }

        const runSmoothProgress = async () => {
            const totalStages = STAGES.length
            const stageStepTime = 260

            for (let i = 0; i < totalStages; i++) {
                if (!mounted || analysisErrorOccurred) return
                setCurrentStage(i)

                const startPct = (i / totalStages) * 100
                const endPct = ((i + 1) / totalStages) * 100 - (i === totalStages - 1 ? 5 : 0)
                const subSteps = 10
                const subStepDuration = stageStepTime / subSteps
                const pctIncrement = (endPct - startPct) / subSteps

                for (let j = 1; j <= subSteps; j++) {
                    if (!mounted || analysisErrorOccurred) return
                    setProgress(startPct + pctIncrement * j)
                    await new Promise((r) => setTimeout(r, subStepDuration))
                }
            }

            const maxWaitTime = 25000
            const checkInterval = 200
            let waited = 0

            while (!isAnalysisComplete && waited < maxWaitTime) {
                if (!mounted) return
                await new Promise((r) => setTimeout(r, checkInterval))
                waited += checkInterval
            }

            if (!mounted) return

            if (analysisErrorOccurred) {
                sessionStorage.setItem('analysisError', analysisErrorOccurred)
                router.push('/#upload')
                return
            }

            setProgress(100)
            await new Promise((r) => setTimeout(r, 400))

            if (mounted) {
                router.push('/results')
            }
        }

        analyzeFile()
        runSmoothProgress()

        return () => {
            mounted = false
        }
    }, [router])

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
                            className="h-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] rounded-full transition-all duration-150 ease-out shadow-sm shadow-[#2f27ce]/30"
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
