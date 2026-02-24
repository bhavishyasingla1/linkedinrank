'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const STAGES = [
    { id: 1, label: 'Reading profile structure', duration: 1200 },
    { id: 2, label: 'Analyzing headline clarity', duration: 1400 },
    { id: 3, label: 'Reviewing experience depth', duration: 1600 },
    { id: 4, label: 'Checking skills relevance', duration: 1800 },
    { id: 5, label: 'Calculating profile strength', duration: 2000 },
    { id: 6, label: 'Preparing evaluation report', duration: 700 }
]

export default function LoadingAnalysisPage() {
    const [currentStage, setCurrentStage] = useState(0)
    const [progress, setProgress] = useState(0)
    const router = useRouter()

    useEffect(() => {
        // Check if we have data to process
        const fileData = sessionStorage.getItem('uploadingFile')
        if (!fileData) {
            router.push('/')
            return
        }

        let mounted = true
        let stageIndex = 0
        const totalStages = STAGES.length

        const analyzeFile = async () => {
            try {
                const fileDataStr = sessionStorage.getItem('uploadingFile')
                if (!fileDataStr) {
                    router.push('/')
                    return
                }

                const { fileName, fileContent } = JSON.parse(fileDataStr)

                // Convert base64 back to blob
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
                router.push('/results')
            } catch (error: any) {
                console.error('Analysis error:', error)
                sessionStorage.setItem('analysisError', error.message)
                sessionStorage.removeItem('uploadingFile')
                router.push('/')
            }
        }

        const runStage = async () => {
            if (!mounted || stageIndex >= totalStages) return

            setCurrentStage(stageIndex)
            const stage = STAGES[stageIndex]

            // Animate progress for this stage
            const progressIncrement = 100 / totalStages
            const startProgress = stageIndex * progressIncrement
            const endProgress = (stageIndex + 1) * progressIncrement

            const steps = 20
            const stepDuration = stage.duration / steps
            const progressStep = (endProgress - startProgress) / steps

            for (let i = 0; i <= steps; i++) {
                if (!mounted) return
                setProgress(startProgress + (progressStep * i))
                await new Promise(resolve => setTimeout(resolve, stepDuration))
            }

            stageIndex++
            if (stageIndex < totalStages) {
                runStage()
            } else {
                // All stages complete, now actually analyze
                if (mounted) {
                    await analyzeFile()
                }
            }
        }

        runStage()

        return () => {
            mounted = false
        }
    }, [router])

    return (
        <main className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="max-w-sm w-full">
                {/* Logo */}
                <div className="text-center mb-10">
                    <Link href="/" className="font-bold text-xl tracking-tight text-[#0A0F1C] no-underline">LinkedIn<span className="text-gradient-brand">Rank</span></Link>
                    <p className="text-xs text-[#6B7280] mt-1.5 tracking-widest uppercase font-semibold">Evaluating your profile across 30+ signals</p>
                </div>

                {/* Loading card */}
                <div className="bg-white border border-gray-200 rounded-xl p-7 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                    {/* Progress percentage */}
                    <div className="text-center mb-5">
                        <span className="text-4xl font-bold text-[#0A0F1C] tabular-nums">{Math.round(progress)}%</span>
                    </div>

                    {/* Progress bar */}
                    <div className="progress-bar mb-5">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>

                    {/* Current stage */}
                    <div className="text-center mb-6">
                        <p className="text-sm font-medium text-[#4B5563] animate-fade-in" key={currentStage}>
                            {STAGES[currentStage]?.label}
                        </p>
                    </div>

                    {/* All stages list */}
                    <div className="space-y-3 border-t border-gray-100 pt-5">
                        {STAGES.map((stage, index) => (
                            <div
                                key={stage.id}
                                className={`flex items-center gap-2.5 text-xs transition-all duration-300 ${index < currentStage
                                    ? 'text-[#6B7280]'
                                    : index === currentStage
                                        ? 'text-[#0A0F1C] font-semibold'
                                        : 'text-gray-300'
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${index < currentStage
                                    ? 'border-emerald-200 bg-emerald-50'
                                    : index === currentStage
                                        ? 'border-[#0A66C2] bg-[#0A66C2]'
                                        : 'border-gray-200'
                                    }`}>
                                    {index < currentStage && (
                                        <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {index === currentStage && (
                                        <div className="w-1.5 h-1.5 rounded-sm bg-white"></div>
                                    )}
                                </div>
                                <span>{stage.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Privacy note */}
                <p className="text-center text-xs text-[#6B7280] mt-5 font-medium">
                    Processed in memory. No data stored.
                </p>
            </div>
        </main>
    )
}
