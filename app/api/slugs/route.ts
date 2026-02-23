import { NextResponse } from 'next/server'
import { ALL_TOOLS, SITE_URL } from '@/lib/toolsConfig'
import { ALL_BLOG_POSTS } from '@/lib/blogData'

// GET /api/slugs | export all slugs and meta fields for monitoring (JSON/CSV)
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'

    const tools = ALL_TOOLS.map(t => ({
        type: 'tool',
        slug: t.slug,
        url: `${SITE_URL}/tools/${t.slug}`,
        title: t.seoTitle,
        metaDescription: t.metaDescription,
        primaryKeyword: t.primaryKeyword,
        category: t.categoryLabel,
    }))

    const blogs = ALL_BLOG_POSTS.map(b => ({
        type: 'blog',
        slug: b.slug,
        url: `${SITE_URL}/blogs/${b.slug}`,
        title: b.title,
        metaDescription: b.metaDescription,
        primaryKeyword: b.targetKeyword,
        toolSlug: b.toolSlug,
    }))

    const all = [...tools, ...blogs]

    if (format === 'csv') {
        const headers = ['type', 'slug', 'url', 'title', 'metaDescription', 'primaryKeyword']
        const rows = all.map(item =>
            headers.map(h => `"${(item as Record<string, string>)[h]?.replace(/"/g, '""') || ''}"`)
                .join(',')
        )
        const csv = [headers.join(','), ...rows].join('\n')
        return new NextResponse(csv, {
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename=linkedinrank-slugs.csv',
            },
        })
    }

    return NextResponse.json({
        totalTools: tools.length,
        totalBlogs: blogs.length,
        totalPages: all.length,
        tools,
        blogs,
    })
}
