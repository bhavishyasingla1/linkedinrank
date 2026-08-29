'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheckIcon, CheckCircleIcon } from '@/components/ui/Icons'

const STAGES = [
    { id: 1, label: 'Reading LinkedIn PDF structure', duration: 1200 },
    { id: 2, label: 'Evaluating headline & search positioning', duration: 1400 },
    { id: 3, label: 'Auditing experience depth & metrics', duration: 1600 },
    { id: 4, label: 'Checking keyword discoverability & skills', duration: 1800 },
    { id: 5, label: 'Calculating section scores and tier', duration: 2000 },
    { id: 6, label: 'Generating personalized roadmap', duration: 700 },
]

export default function LoadingAnalysisPage() {
    const [currentStage, setCurrentStage] = useState(0)
    const [progress, setProgress] = useState(0)
    const router = useRouter()

    useEffect(() => {
        const fileData = sessionStorage.getItem('uploadingFile')
        if (!fileData) {
            router.push('/')
            return
        }

        let mounted = true
        let stageIndex = 0
        const totalStages = STAGES.length
        let isAnalysisComplete = false

        const analyzeFile = async () => {
            try {
                const fileDataStr = sessionStorage.getItem('uploadingFile')
                if (!fileDataStr) throw new Error('No file data found')

                const { fileName, fileContent } = JSON.parse(fileDataStr)

                const byteCharacters = atob(fileContent)
                const byteNumbers = new Array(byteCharacters.length)
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i)
                }
                const byteArray = new Uint8Array(byteNumbers)
                const blob = new Blob([byteArray], { type: 'application/pdf' })
                const file = new File([blob], fileName, { type: 'application/pdf' })

                const formData = new FormData()
                formData.append('file', file)

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
                sessionStorage.removeItem('uploadingFile')
                isAnalysisComplete = true
                return true
            } catch (error: any) {
                console.error('Analysis error:', error)
                sessionStorage.setItem('analysisError', error.message)
                sessionStorage.removeItem('uploadingFile')
                isAnalysisComplete = true
                if (mounted) router.push('/')
                return false
            }
        }

        const runAllStages = async () => {
            for (let i = 0; i < totalStages; i++) {
                if (!mounted) return
                setCurrentStage(i)
                const stage = STAGES[i]

                const progressIncrement = 100 / totalStages
                const startProgress = i * progressIncrement
                const endProgress = i === totalStages - 1 ? 99 : (i + 1) * progressIncrement

                const steps = 20
                const stepDuration = stage.duration / steps
                const progressStep = (endProgress - startProgress) / steps

                for (let j = 0; j <= steps; j++) {
                    if (!mounted) return
                    if (isAnalysisComplete) {
                        setProgress(100)
                        setCurrentStage(totalStages - 1)
                        return
                    }
                    setProgress(startProgress + progressStep * j)
                    await new Promise((resolve) => setTimeout(resolve, stepDuration))
                }
            }

            while (!isAnalysisComplete && mounted) {
                setProgress((prev) => Math.min(prev + 0.1, 99.9))
                await new Promise((resolve) => setTimeout(resolve, 200))
            }

            if (mounted) {
                setProgress(100)
                setCurrentStage(totalStages - 1)
                await new Promise((resolve) => setTimeout(resolve, 100))
            }
        }

        const executeConcurrent = async () => {
            const analysisPromise = analyzeFile()
            await runAllStages()
            const analysisSuccess = await analysisPromise

            if (mounted && analysisSuccess) {
                router.push('/results')
            }
        }

        executeConcurrent()

        return () => {
            mounted = false
        }
    }, [router])

    return (
        <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4 sm:p-6">
            <div className="max-w-md w-full">
                {/* Brand Logo */}
                <div className="text-center mb-8">
                    <Link
                        href="/"
                        className="font-bold text-[20px] tracking-tight text-[#0F172A] no-underline inline-block"
                    >
                        <span>LinkedIn</span>
                        <span className="text-[#0A66C2]">Rank</span>
                    </Link>
                    <p className="text-[12px] font-medium text-[#64748B] mt-1">
                        Evaluating profile against 30+ recruiter search signals
                    </p>
                </div>

                {/* Progress Card */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-xs">
                    <div className="text-center mb-6">
                        <span className="text-[38px] font-bold text-[#0F172A] tabular-nums tracking-tight">
                            {Math.round(progress)}%
                        </span>
                        <p className="text-[13px] font-medium text-[#0A66C2] mt-1 animate-fade-in" key={currentStage}>
                            {STAGES[currentStage]?.label}
                        </p>
                    </div>

                    {/* Progress Track */}
                    <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden mb-6">
                        <div
                            className="h-full bg-[#0A66C2] rounded-full transition-all duration-150 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Stage Checklist */}
                    <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                        {STAGES.map((stage, index) => {
                            const isDone = index < currentStage
                            const isCurrent = index === currentStage

                            return (
                                <div
                                    key={stage.id}
                                    className={`flex items-center gap-2.5 text-[12px] transition-colors ${
                                        isDone
                                            ? 'text-[#64748B]'
                                            : isCurrent
                                            ? 'text-[#0F172A] font-semibold'
                                            : 'text-[#94A3B8]'
                                    }`}
                                >
                                    <div
                                        className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                                            isDone
                                                ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#16A34A]'
                                                : isCurrent
                                                ? 'bg-[#0A66C2] border-[#0A66C2] text-white'
                                                : 'bg-white border-[#E2E8F0]'
                                        }`}
                                    >
                                        {isDone && <CheckCircleIcon size={11} />}
                                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                                    </div>
                                    <span>{stage.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Privacy Badge */}
                <div className="flex items-center justify-center gap-1.5 mt-6 text-[12px] text-[#64748B]">
                    <ShieldCheckIcon size={14} className="text-[#16A34A]" />
                    <span>Processed in temporary memory • Deleted after analysis</span>
                </div>
            </div>
        </main>
    )
}
