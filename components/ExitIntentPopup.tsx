'use client'

// Exit Intent Popup - Conversion Component
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false)
    const [hasShown, setHasShown] = useState(false)

    useEffect(() => {
        // Check if already shown in last 30 days
        const lastShown = localStorage.getItem('exitIntentShown')
        if (lastShown && Date.now() - parseInt(lastShown) < 30 * 24 * 60 * 60 * 1000) {
            setHasShown(true)
            return
        }

        let timeOnPage = 0
        const timer = setInterval(() => {
            timeOnPage += 1000
        }, 1000)

        const handleMouseLeave = (e: MouseEvent) => {
            // Trigger when mouse moves toward top of viewport (attempting to leave)
            if (e.clientY < 20 && timeOnPage > 45000 && !hasShown) {
                setIsVisible(true)
                setHasShown(true)
                localStorage.setItem('exitIntentShown', Date.now().toString())
            }
        }

        document.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            clearInterval(timer)
            document.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [hasShown])

    if (!isVisible) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn"
                onClick={() => setIsVisible(false)}
            />

            {/* Popup */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slideUp relative">
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-3">Wait! Before you go...</h2>
                        <p className="text-[#4B5563] mb-6">Get your free LinkedIn profile score in under 60 seconds.</p>

                        <ul className="text-left mb-6 space-y-2">
                            {[
                                'No login required',
                                '30+ signals analyzed',
                                'AI-powered recommendations',
                                'Files auto-deleted after analysis'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-[#4B5563]">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="space-y-3">
                            <Link
                                href="/#upload"
                                onClick={() => setIsVisible(false)}
                                className="block w-full bg-[#0A66C2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#084E96] transition-colors"
                            >
                                Score My Profile Free
                            </Link>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="block w-full text-sm text-[#6B7280] hover:text-[#4B5563]"
                            >
                                No thanks, I'll leave
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.4s ease-out;
                }
            `}</style>
        </>
    )
}
