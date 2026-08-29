'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { BlogPost } from '@/lib/blogData'
import { Badge } from '@/components/ui/Badge'
import { SearchIcon, ArrowRightIcon, BookOpenIcon, ClockIcon } from '@/components/ui/Icons'

interface BlogIndexClientProps {
    allPosts: BlogPost[]
    categories: { slug: string; name: string }[]
}

export default function BlogIndexClient({ allPosts, categories }: BlogIndexClientProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')

    const filteredPosts = useMemo(() => {
        return allPosts.filter((post) => {
            const matchesCat =
                selectedCategory === 'all' ||
                post.toolSlug === selectedCategory ||
                (selectedCategory === 'headline' && post.toolSlug.includes('headline')) ||
                (selectedCategory === 'about' && post.toolSlug.includes('about')) ||
                (selectedCategory === 'experience' && post.toolSlug.includes('experience')) ||
                (selectedCategory === 'seo' && (post.toolSlug.includes('seo') || post.toolSlug.includes('keyword')))

            const q = searchQuery.toLowerCase().trim()
            const matchesSearch =
                !q ||
                post.title.toLowerCase().includes(q) ||
                post.summary.toLowerCase().includes(q) ||
                post.targetKeyword.toLowerCase().includes(q)

            return matchesCat && matchesSearch
        })
    }, [allPosts, selectedCategory, searchQuery])

    // Featured Article is the first high-value post
    const featuredPost = allPosts[0]

    return (
        <div className="space-y-10">
            {/* ── Featured Publication Hero ─────────────────── */}
            {selectedCategory === 'all' && !searchQuery && featuredPost && (
                <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#0A66C2] transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-3 max-w-2xl">
                            <div className="flex items-center gap-2">
                                <Badge variant="brand" size="sm">
                                    Featured Editorial
                                </Badge>
                                <span className="text-[12px] text-[#64748B] flex items-center gap-1">
                                    <ClockIcon size={13} />
                                    {Math.max(3, Math.ceil((featuredPost.h2Outline.length * 150 + 200) / 200))} min read
                                </span>
                            </div>

                            <Link
                                href={`/blogs/${featuredPost.slug}`}
                                className="block no-underline group"
                            >
                                <h2 className="text-[20px] sm:text-[24px] font-bold text-[#0F172A] group-hover:text-[#0A66C2] transition-colors tracking-tight leading-tight">
                                    {featuredPost.title}
                                </h2>
                            </Link>

                            <p className="text-[14px] sm:text-[15px] text-[#475569] leading-relaxed">
                                {featuredPost.summary}
                            </p>
                        </div>

                        <div className="shrink-0">
                            <Link
                                href={`/blogs/${featuredPost.slug}`}
                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white text-[13px] font-semibold transition-colors no-underline"
                            >
                                <span>Read Article</span>
                                <ArrowRightIcon size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Controls: Search & Category Filter Tags ──── */}
            <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                        <SearchIcon size={16} />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search guides, strategies, keyword formulas..."
                        className="w-full pl-10 pr-4 py-2 text-[14px] bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all"
                    />
                </div>

                {/* Filter Pill Row */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all shrink-0 cursor-pointer ${
                            selectedCategory === 'all'
                                ? 'bg-[#0F172A] text-white'
                                : 'bg-white border border-[#E2E8F0] text-[#475569] hover:border-[#0A66C2] hover:text-[#0A66C2]'
                        }`}
                    >
                        All Guides ({allPosts.length})
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() => setSelectedCategory(cat.slug)}
                            className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all shrink-0 cursor-pointer ${
                                selectedCategory === cat.slug
                                    ? 'bg-[#0F172A] text-white'
                                    : 'bg-white border border-[#E2E8F0] text-[#475569] hover:border-[#0A66C2] hover:text-[#0A66C2]'
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Articles Grid ─────────────────────────────── */}
            <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                    <p className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider">
                        {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'} Found
                    </p>
                </div>

                {filteredPosts.length === 0 ? (
                    <div className="text-center py-16 bg-white border border-[#E2E8F0] rounded-xl">
                        <BookOpenIcon size={32} className="mx-auto text-[#94A3B8] mb-2" />
                        <h3 className="text-[16px] font-semibold text-[#0F172A]">No articles found</h3>
                        <p className="text-[13px] text-[#64748B] mt-1">
                            Try searching for different keywords or clear the category filter.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('')
                                setSelectedCategory('all')
                            }}
                            className="mt-4 text-[13px] font-semibold text-[#0A66C2] hover:underline"
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
                                    className="p-5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0A66C2] shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between no-underline group"
                                >
                                    <div className="space-y-2.5">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-wider">
                                                {post.toolName.replace('LinkedIn ', '')}
                                            </span>
                                            <span className="text-[11px] text-[#94A3B8] flex items-center gap-1">
                                                <ClockIcon size={12} />
                                                {estReadingTime} min
                                            </span>
                                        </div>

                                        <h3 className="text-[15px] font-semibold text-[#0F172A] group-hover:text-[#0A66C2] transition-colors leading-snug">
                                            {post.title}
                                        </h3>

                                        <p className="text-[13px] text-[#475569] leading-relaxed line-clamp-3">
                                            {post.summary}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-[#F1F5F9] mt-4 flex items-center justify-between text-[12px]">
                                        <span className="text-[#64748B] font-medium">
                                            {post.targetKeyword}
                                        </span>
                                        <span className="font-semibold text-[#0A66C2] group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                                            Read →
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
