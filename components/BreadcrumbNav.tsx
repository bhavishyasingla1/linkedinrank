import Link from 'next/link'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbNavProps {
    items: BreadcrumbItem[]
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
            ...items.map((item, i) => ({
                '@type': 'ListItem',
                position: i + 2,
                name: item.label,
                ...(item.href ? { item: `https://linkedinrank.com${item.href}` } : {}),
            })),
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto px-6 pt-20 pb-2">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#6B7280]">
                    <li>
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">
                            Home
                        </Link>
                    </li>
                    {items.map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                            <svg className="w-3 h-3 text-[#D1D5DB]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                            {item.href && i < items.length - 1 ? (
                                <Link href={item.href} className="hover:text-[#0A66C2] transition-colors no-underline">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-[#0A0F1C] font-medium">{item.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    )
}
