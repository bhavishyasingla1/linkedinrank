'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { BlogPost } from '@/lib/blogData'
import { ClockIcon, SparklesIcon, ArrowRightIcon, ArrowLeftIcon, ShieldCheckIcon } from '@/components/ui/Icons'

interface ArticleCarouselProps {
    articles: BlogPost[]
    autoPlayInterval?: number
}

export default function ArticleCarousel({ articles, autoPlayInterval = 6000 }: ArticleCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const touchStartX = useRef<number | null>(null)
    const touchEndX = useRef<number | null>(null)

    const total = articles.length
    if (total === 0) return null

    // Autoplay timer
    useEffect(() => {
        if (isHovered || total <= 1) return
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % total)
        }, autoPlayInterval)
        return () => clearInterval(interval)
    }, [isHovered, total, autoPlayInterval])

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + total) % total)
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % total)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX
    }

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return
        const distance = touchStartX.current - touchEndX.current
        if (distance > 50) {
            handleNext()
        } else if (distance < -50) {
            handlePrev()
        }
        touchStartX.current = null
        touchEndX.current = null
    }

    const currentArticle = articles[currentIndex]
    const readingTime = Math.max(4, Math.ceil((currentArticle.h2Outline.length * 150 + 200) / 200))

    return (
        <section
            className="relative w-full rounded-3xl bg-white border-2 border-[#dedcff] p-6 sm:p-8 lg:p-10 aside-card-shadow overflow-hidden group transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-roledescription="carousel"
            aria-label="High SEO LinkedIn Strategy Articles"
        >
            {/* Top Bar: Carousel Header & Circular Arrow Controls */}
            <div className="flex items-center justify-between gap-4 mb-6 border-b border-[#dedcff] pb-4">
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-3 py-1 rounded-full">
                        <SparklesIcon size={13} /> Flagship Playbook • {currentIndex + 1} of {total}
                    </span>
                </div>

                {/* Arrow Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrev}
                        aria-label="Previous article"
                        className="w-9 h-9 rounded-full bg-[#dedcff] hover:bg-[#2f27ce] text-[#2f27ce] hover:text-white transition-all duration-150 flex items-center justify-center cursor-pointer shadow-2xs active:scale-95"
                    >
                        <ArrowLeftIcon size={15} />
                    </button>
                    <button
                        onClick={handleNext}
                        aria-label="Next article"
                        className="w-9 h-9 rounded-full bg-[#dedcff] hover:bg-[#2f27ce] text-[#2f27ce] hover:text-white transition-all duration-150 flex items-center justify-center cursor-pointer shadow-2xs active:scale-95"
                    >
                        <ArrowRightIcon size={15} />
                    </button>
                </div>
            </div>

            {/* Main Carousel Slide Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[200px]">
                <div className="lg:col-span-8 space-y-3.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-[11px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff]/70 border border-[#dedcff] px-3 py-0.5 rounded-full">
                            {currentArticle.targetKeyword}
                        </span>
                        <span className="text-[12px] text-[#050315]/60 flex items-center gap-1">
                            <ClockIcon size={13} /> {readingTime} min read
                        </span>
                        <span className="text-[12px] text-[#2f27ce] flex items-center gap-1 font-semibold">
                            <ShieldCheckIcon size={13} /> Verified 2026 Strategy
                        </span>
                    </div>

                    <Link
                        href={`/blogs/${currentArticle.slug}`}
                        className="block group/link no-underline"
                    >
                        <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-extrabold text-[#050315] group-hover/link:text-[#2f27ce] transition-colors leading-tight tracking-tight">
                            {currentArticle.title}
                        </h2>
                    </Link>

                    <p className="text-[14.5px] sm:text-[15.5px] text-[#050315]/75 line-clamp-3 leading-relaxed max-w-3xl">
                        {currentArticle.summary}
                    </p>
                </div>

                {/* Right Call-To-Action Box */}
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 pt-2 lg:pt-0">
                    <div className="hidden lg:block text-right space-y-1.5">
                        <p className="text-[11.5px] font-bold text-[#050315]/50 uppercase tracking-wider">Key Frameworks:</p>
                        <div className="flex flex-wrap lg:justify-end gap-1.5">
                            {currentArticle.h2Outline.slice(0, 2).map((heading, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-0.5 rounded-full bg-[#dedcff]/50 border border-[#dedcff] text-[11.5px] font-medium text-[#050315]"
                                >
                                    {heading.length > 30 ? heading.slice(0, 30) + '...' : heading}
                                </span>
                            ))}
                        </div>
                    </div>

                    <Link
                        href={`/blogs/${currentArticle.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[14px] font-bold shadow-lg shadow-[#2f27ce]/25 hover:shadow-xl transition-all duration-150 no-underline shrink-0 group/btn active:scale-95"
                    >
                        <span>Read Complete Guide</span>
                        <ArrowRightIcon size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Bottom Progress Pill Indicators & Quick Selectors */}
            <div className="flex items-center justify-between gap-4 mt-8 pt-5 border-t border-[#dedcff]">
                {/* Dots */}
                <div className="flex items-center gap-2">
                    {articles.map((art, idx) => (
                        <button
                            key={art.slug}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}: ${art.title}`}
                            className={`
                                h-2.5 rounded-full transition-all duration-300 cursor-pointer
                                ${idx === currentIndex
                                    ? 'w-8 bg-[#2f27ce]'
                                    : 'w-2.5 bg-[#dedcff] hover:bg-[#2f27ce]/40'
                                }
                            `}
                        />
                    ))}
                </div>

                {/* Quick Slide Title Preview */}
                <span className="hidden sm:inline-block text-[12px] font-medium text-[#050315]/60 truncate max-w-xs">
                    Next: {articles[(currentIndex + 1) % total]?.title}
                </span>
            </div>
        </section>
    )
}
