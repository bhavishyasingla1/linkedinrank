'use client'

// Sticky Sidebar CTA - Desktop Conversion Component
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface StickySidebarCTAProps {
    title?: string
    description?: string
    ctaText?: string
    ctaHref?: string
    relatedTools?: Array<{ name: string; href: string }>
}

export default function StickySidebarCTA({
    title = 'Try It Free',
    description = 'Score your LinkedIn profile across 30+ signals.',
    ctaText = 'Get My Score →',
    ctaHref = '/',
    relatedTools = [
        { name: 'Headline Generator', href: '/tools/linkedin-headline-generator' },
        { name: 'About Generator', href: '/tools/linkedin-about-generator' },
        { name: 'Keyword Analyzer', href: '/tools/linkedin-profile-keyword-analyzer' },
    ]
}: StickySidebarCTAProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show after 25% scroll
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            setIsVisible(scrollPercent > 25)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!isVisible) return null

    return (
        <aside className="sticky top-24 hidden lg:block w-64 ml-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm mb-4 text-blue-50">{description}</p>
                <Link
                    href={ctaHref}
                    className="block w-full bg-white text-[#0A66C2] text-center px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                    {ctaText}
                </Link>
                <p className="text-xs mt-3 text-blue-100">No login • Under 60s • AI-powered</p>
            </div>

            {relatedTools.length > 0 && (
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="font-semibold mb-3 text-sm text-[#0A0F1C]">Popular Tools</h4>
                    <ul className="space-y-2">
                        {relatedTools.map((tool, i) => (
                            <li key={i}>
                                <Link
                                    href={tool.href}
                                    className="text-sm text-[#0A66C2] hover:text-[#084E96] hover:underline"
                                >
                                    {tool.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </aside>
    )
}
