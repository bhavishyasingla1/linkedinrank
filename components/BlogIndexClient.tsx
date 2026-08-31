'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { BlogPost } from '@/lib/blogData'
import { SearchIcon, ArrowRightIcon, BookOpenIcon, ClockIcon, SparklesIcon, ShieldCheckIcon } from '@/components/ui/Icons'
import ArticleCarousel from '@/components/ArticleCarousel'

interface BlogIndexClientProps {
    allPosts: BlogPost[]
    categories: { slug: string; name: string }[]
}

export default function BlogIndexClient({ allPosts, categories }: BlogIndexClientProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')

    // Top 6 flagship articles for the carousel
    const carouselArticles = useMemo(() => {
        return allPosts.slice(0, 6)
    }, [allPosts])

    // 2 Highlighted Spotlight articles for the top of the directory
    const spotlightArticles = useMemo(() => {
        const pillar1 = allPosts.find(p => p.slug === 'linkedin-profile-score-guide') || allPosts[0]
        const pillar2 = allPosts.find(p => p.slug === 'linkedin-seo-complete-guide') || allPosts[1]
        return [pillar1, pillar2].filter(Boolean)
    }, [allPosts])

    const filteredPosts = useMemo(() => {
        return allPosts.filter((post) => {
            const matchesCat =
                selectedCategory === 'all' ||
                post.toolSlug === selectedCategory ||
                (selectedCategory === 'score' && (post.slug.includes('score') || post.slug.includes('rating') || post.slug.includes('rater') || post.slug.includes('rank') || post.slug.includes('level') || post.slug.includes('ssi') || post.slug.includes('percent'))) ||
                (selectedCategory === 'seo' && (post.slug.includes('seo') || post.slug.includes('keyword') || post.slug.includes('search') || post.toolSlug.includes('seo') || post.toolSlug.includes('keyword'))) ||
                (selectedCategory === 'branding' && (post.slug.includes('brand') || post.slug.includes('rule') || post.slug.includes('effective') || post.slug.includes('picture') || post.slug.includes('appropriate') || post.slug.includes('worth-it') || post.slug.includes('red-flag'))) ||
                (selectedCategory === 'hooks' && (post.slug.includes('hook') || post.toolSlug.includes('hook') || post.targetKeyword.toLowerCase().includes('hook'))) ||
                (selectedCategory === 'headline' && post.toolSlug.includes('headline')) ||
                (selectedCategory === 'about' && post.toolSlug.includes('about')) ||
                (selectedCategory === 'experience' && post.toolSlug.includes('experience')) ||
                (selectedCategory === 'faq' && (post.slug.includes('what-') || post.slug.includes('how-much-') || post.slug.includes('how-to-') || post.slug.includes('is-') || post.slug.includes('who-') || post.slug.includes('golden-hour') || post.slug.includes('4-1-1') || post.slug.includes('500-') || post.slug.includes('etiquette') || post.slug.includes('benefits') || post.slug.includes('leaving-linkedin') || post.slug.includes('followers') || post.slug.includes('job'))) ||
                (selectedCategory === 'privacy' && (post.slug.includes('private') || post.slug.includes('safe') || post.slug.includes('hide') || post.slug.includes('search-someone') || post.slug.includes('without-account') || post.slug.includes('suggest-people'))) ||
                (selectedCategory === 'students' && (post.slug.includes('student') || post.slug.includes('intern') || post.slug.includes('no-experience') || post.slug.includes('fresh-graduate') || post.slug.includes('resume-cv'))) ||
                (selectedCategory === 'linkedin-connection-message-generator' && (post.slug.includes('connection') || post.slug.includes('message') || post.toolSlug.includes('connection') || post.toolSlug.includes('message')))

            const q = searchQuery.toLowerCase().trim()
            const matchesSearch =
                !q ||
                post.title.toLowerCase().includes(q) ||
                post.summary.toLowerCase().includes(q) ||
                post.targetKeyword.toLowerCase().includes(q)

            return matchesCat && matchesSearch
        })
    }, [allPosts, selectedCategory, searchQuery])

    return (
        <div className="space-y-12">
            {/* ── 1. Top High-SEO Articles Carousel (5–7 Flagship Guides) ── */}
            {selectedCategory === 'all' && !searchQuery && (
                <ArticleCarousel articles={carouselArticles} autoPlayInterval={5500} />
            )}

            {/* ── 2. Top Highlighted Spotlight Guides (1–2 Flagship Cards) ── */}
            {selectedCategory === 'all' && !searchQuery && spotlightArticles.length > 0 && (
                <div className="space-y-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="p-1.5 rounded-full bg-[#dedcff] text-[#2f27ce]">
                                <SparklesIcon size={14} />
                            </span>
                            <h2 className="text-[14px] font-extrabold text-[#050315] uppercase tracking-wider">
                                Highlighted Master Blueprints
                            </h2>
                        </div>
                        <span className="text-[12px] font-bold text-[#2f27ce]">
                            Foundational Reading &rarr;
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {spotlightArticles.map((spotlight, idx) => {
                            const readTime = Math.max(4, Math.ceil((spotlight.h2Outline.length * 150 + 200) / 200))
                            const isPillar = spotlight.slug === 'linkedin-hooks'

                            return (
                                <div
                                    key={spotlight.slug}
                                    className={`
                                        p-7 rounded-3xl border-2 transition-all duration-200 flex flex-col justify-between
                                        ${isPillar
                                            ? 'bg-white border-[#2f27ce] shadow-xl shadow-[#2f27ce]/10'
                                            : 'bg-white border-[#dedcff] shadow-md shadow-[#050315]/5 hover:border-[#2f27ce]'
                                        }
                                    `}
                                >
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-[#dedcff] text-[#2f27ce] px-3 py-0.5 rounded-full">
                                                    {isPillar ? 'Pillar Guide' : 'Editor Spotlight'}
                                                </span>
                                                <span className="text-[12px] text-[#050315]/60 flex items-center gap-1">
                                                    <ClockIcon size={13} /> {readTime} min read
                                                </span>
                                            </div>

                                            <Link
                                                href={`/blogs/${spotlight.slug}`}
                                                className="block no-underline group"
                                            >
                                                <h3 className="text-[18px] sm:text-[21px] font-extrabold text-[#050315] group-hover:text-[#2f27ce] transition-colors leading-snug tracking-tight">
                                                    {spotlight.title}
                                                </h3>
                                            </Link>

                                            <p className="text-[13.5px] text-[#050315]/75 leading-relaxed line-clamp-2">
                                                {spotlight.summary}
                                            </p>
                                        </div>

                                        <div className="pt-3.5 border-t border-[#dedcff] mt-4 flex items-center justify-between text-[13px]">
                                            <span className="flex items-center gap-1 text-[#2f27ce] font-bold text-[12px]">
                                                <ShieldCheckIcon size={14} /> Complete Framework
                                            </span>
                                            <Link
                                                href={`/blogs/${spotlight.slug}`}
                                                className="font-bold text-[#2f27ce] hover:text-[#433bff] inline-flex items-center gap-1 transition-colors no-underline group"
                                            >
                                                <span>Read Guide</span>
                                                <ArrowRightIcon size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                            </Link>
                                        </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* ── 3. Controls: Search & Category Filter Tags ──── */}
            <div className="space-y-4 pt-2">
                {/* Search Bar */}
                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#050315]/50">
                        <SearchIcon size={16} />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search guides, hooks, copywriting formulas..."
                        className="w-full pl-11 pr-4 py-3 text-[14px] bg-white border-2 border-[#dedcff] rounded-full text-[#050315] placeholder-[#050315]/40 focus:outline-none focus:border-[#2f27ce] transition-all shadow-xs"
                    />
                </div>

                {/* Filter Pill Tags (Wrapped Naturally) */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                            selectedCategory === 'all'
                                ? 'bg-[#2f27ce] text-[#fbfbfe] shadow-xs'
                                : 'bg-white border border-[#dedcff] text-[#050315] hover:border-[#2f27ce] hover:bg-[#dedcff]/40'
                        }`}
                    >
                        All Guides ({allPosts.length})
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() => setSelectedCategory(cat.slug)}
                            className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                                selectedCategory === cat.slug
                                    ? 'bg-[#2f27ce] text-[#fbfbfe] shadow-xs'
                                    : 'bg-white border border-[#dedcff] text-[#050315] hover:border-[#2f27ce] hover:bg-[#dedcff]/40'
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── 4. Articles Grid ─────────────────────────────── */}
            <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="text-[12px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                        {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'} Found
                    </p>
                </div>

                {filteredPosts.length === 0 ? (
                    <div className="text-center py-16 bg-white border-2 border-[#dedcff] rounded-3xl">
                        <BookOpenIcon size={32} className="mx-auto text-[#050315]/40 mb-2" />
                        <h3 className="text-[17px] font-bold text-[#050315]">No articles found</h3>
                        <p className="text-[13.5px] text-[#050315]/65 mt-1">
                            Try searching for different keywords or clear the category filter.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('')
                                setSelectedCategory('all')
                            }}
                            className="mt-4 text-[13px] font-bold text-[#2f27ce] hover:underline cursor-pointer"
                        >
                            Reset filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredPosts.map((post) => {
                            const estReadingTime = Math.max(3, Math.ceil((post.h2Outline.length * 150 + 200) / 200))

                            return (
                                <Link
                                    key={post.slug}
                                    href={`/blogs/${post.slug}`}
                                    className="p-6 rounded-3xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow aside-card-hover flex flex-col justify-between no-underline group"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[10.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider truncate max-w-[170px] bg-[#dedcff] px-2.5 py-0.5 rounded-full">
                                                {post.toolName.replace('LinkedIn ', '')}
                                            </span>
                                            <span className="text-[11.5px] text-[#050315]/60 flex items-center gap-1 shrink-0">
                                                <ClockIcon size={12} />
                                                {estReadingTime} min
                                            </span>
                                        </div>

                                        <h3 className="text-[16px] font-bold text-[#050315] group-hover:text-[#2f27ce] transition-colors leading-snug">
                                            {post.title}
                                        </h3>

                                        <p className="text-[12.5px] text-[#050315]/70 leading-normal line-clamp-2">
                                            {post.summary}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-[#dedcff] mt-4 flex items-center justify-between text-[12.5px]">
                                        <span className="text-[#050315]/60 font-semibold truncate max-w-[180px]">
                                            {post.targetKeyword}
                                        </span>
                                        <span className="font-bold text-[#2f27ce] group-hover:translate-x-0.5 transition-transform inline-flex items-center shrink-0">
                                            Read &rarr;
                                        </span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
