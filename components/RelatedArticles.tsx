// Related Articles Block - Conversion Component
import Link from 'next/link'

interface Article {
    href: string
    title: string
    excerpt: string
    readTime?: string
}

interface RelatedArticlesProps {
    articles: Article[]
    title?: string
}

export default function RelatedArticles({ articles, title = 'Keep Reading' }: RelatedArticlesProps) {
    return (
        <section className="related-articles py-12 bg-gray-50 border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.map((article, i) => (
                        <Link
                            key={i}
                            href={article.href}
                            className="block p-5 bg-white rounded-lg border border-gray-200 hover:border-[#0A66C2] hover:shadow-lg transition-all group"
                        >
                            <h3 className="font-semibold text-[#0A0F1C] mb-2 group-hover:text-[#0A66C2] transition-colors leading-snug">
                                {article.title}
                            </h3>
                            <p className="text-sm text-[#6B7280] mb-3 line-clamp-2">{article.excerpt}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-[#6B7280]">{article.readTime || '3 min read'}</span>
                                <span className="text-[#0A66C2] text-sm font-medium inline-flex items-center gap-1">
                                    Read more
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
