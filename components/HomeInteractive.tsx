'use client'

import { useState, useEffect } from 'react'

const PREVIEW_SLIDES = [
    { type: 'score' as const },
    { type: 'recommendation' as const },
    { type: 'roadmap' as const },
]

export default function HomeInteractive() {
    const [slideIndex, setSlideIndex] = useState(0)
    const [copied, setCopied] = useState(false)
    const AI_PROMPT = 'Here is my LinkedIn PDF and my LinkedInRank analysis report. Rewrite my headline, About section, and all experience descriptions based on the scoring feedback. Keep my voice authentic.'

    const copyPrompt = () => {
        navigator.clipboard.writeText(AI_PROMPT)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex(prev => (prev + 1) % PREVIEW_SLIDES.length)
        }, 3500)
        return () => clearInterval(timer)
    }, [])

    return { slideIndex, setSlideIndex, copied, setCopied, copyPrompt, AI_PROMPT, PREVIEW_SLIDES }
}
