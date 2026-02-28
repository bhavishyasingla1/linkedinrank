'use client'

// Post-Read Engagement Widget - Bottom Bar
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PostReadWidget() {
    const [isVisible, setIsVisible] = useState(false)
    const [isDismissed, setIsDismissed] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show at 90% scroll
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            setIsVisible(scrollPercent > 90 && !isDismissed)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isDismissed])

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t-2 border-blue-600 p-4 z-40 animate-slideUp">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                    <p className="font-semibold text-[#0A0F1C]">Finished reading?</p>
                    <p className="text-sm text-[#6B7280]">Put what you learned into action.</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/tools"
                        className="bg-[#0A66C2] text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-[#084E96] transition-colors whitespace-nowrap"
                    >
                        Try Free Tools
                    </Link>
                    <Link
                        href="/blogs"
                        className="bg-white border-2 border-gray-300 text-[#0A0F1C] px-5 py-2.5 rounded-lg font-medium text-sm hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors whitespace-nowrap"
                    >
                        Read More Guides
                    </Link>
                </div>
                <button
                    onClick={() => setIsDismissed(true)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 sm:relative sm:top-auto sm:right-auto"
                    aria-label="Dismiss"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <style jsx>{`
                @keyframes slideUp {
                    from {
                        transform: translateY(100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </div>
    )
}
