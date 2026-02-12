'use client'

import { useState, useEffect } from 'react'

const STAGES = [
    'Reading your profile',
    'Scoring each section',
    'Generating recommendations',
    'Building your improvement roadmap',
    'Preparing your results'
]

export default function LoadingScreen() {
    const [currentStage, setCurrentStage] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStage(prev => {
                if (prev < STAGES.length - 1) return prev + 1
                return prev
            })
        }, 2500)

        return () => clearInterval(interval)
    }, [])

    return (
        <main className="min-h-screen bg-white flex items-center justify-center">
            <div className="relative z-10 text-center px-5 max-w-sm mx-auto">
                <div className="w-10 h-10 mx-auto mb-8 relative">
                    <div
                        className="w-full h-full border-2 border-brand/30 border-t-brand rounded-full"
                        style={{ animation: 'spin 0.8s linear infinite' }}
                    />
                </div>

                <p className="text-sm font-medium text-txt mb-2 animate-fade-in" key={currentStage}>
                    {STAGES[currentStage]}
                </p>

                <div className="flex items-center justify-center gap-1.5 mb-8">
                    {STAGES.map((_, i) => (
                        <div
                            key={i}
                            className="h-1 rounded-full transition-all duration-500"
                            style={{
                                width: i <= currentStage ? '20px' : '6px',
                                backgroundColor: i <= currentStage ? '#0A66C2' : '#E8E8E8'
                            }}
                        />
                    ))}
                </div>

                <p className="text-xs text-txt-muted">
                    Your data is processed in memory and never stored.
                </p>
            </div>
        </main>
    )
}
