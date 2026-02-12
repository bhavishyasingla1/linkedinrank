'use client'

import { useState, useEffect } from 'react'
import { LOADING_STEPS } from '@/lib/constants'

export default function AnalysisLoading() {
    const [currentStep, setCurrentStep] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Rotate through steps every 2 seconds
        const stepInterval = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % LOADING_STEPS.length)
        }, 2000)

        // Animate progress bar (0-100% over 20 seconds)
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100
                return prev + 0.5 // Increment every 100ms = 100% in 20s
            })
        }, 100)

        return () => {
            clearInterval(stepInterval)
            clearInterval(progressInterval)
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-linkedin-primary/5 via-white to-linkedin-accent/5 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                {/* Main Card */}
                <div className="premium-card p-12 text-center">
                    {/* Animated Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="w-24 h-24 border-4 border-linkedin-light rounded-full"></div>
                            <div className="absolute top-0 left-0 w-24 h-24 border-4 border-linkedin-primary rounded-full border-t-transparent animate-spin"></div>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-linkedin-dark mb-4">
                        Analyzing your LinkedIn profile...
                    </h2>

                    {/* Current Step */}
                    <div className="mb-8">
                        <p className="text-lg text-gray-700 animate-pulse">
                            {LOADING_STEPS[currentStep]}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-linkedin-light rounded-full h-3 overflow-hidden mb-4">
                        <div
                            className="h-full bg-gradient-to-r from-linkedin-primary to-linkedin-accent transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    <p className="text-sm text-gray-500">
                        This usually takes 15-25 seconds
                    </p>
                </div>

                {/* Fun Facts */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        💡 <strong>Did you know?</strong> Profiles with quantified achievements get 40% more recruiter views
                    </p>
                </div>
            </div>
        </div>
    )
}
