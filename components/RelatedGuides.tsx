import Link from 'next/link'

export interface GuideLink {
    href: string
    title: string
    desc: string
}

interface RelatedGuidesProps {
    guides: GuideLink[]
    heading?: string
}

export default function RelatedGuides({ guides, heading = 'Related Guides' }: RelatedGuidesProps) {
    if (!guides.length) return null

    return (
        <section className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-lg font-bold text-[#0A0F1C] mb-6">{heading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {guides.map((guide, i) => (
                    <Link
                        key={i}
                        href={guide.href}
                        className="group bg-[#F8FAFC] border border-gray-200 rounded-xl p-5 no-underline hover:border-[#0A66C2] hover:shadow-md transition-all"
                    >
                        <h3 className="text-sm font-bold text-[#0A0F1C] mb-1.5 group-hover:text-[#0A66C2] transition-colors">
                            {guide.title}
                        </h3>
                        <p className="text-xs text-[#6B7280] leading-relaxed">{guide.desc}</p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A66C2] mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            Read guide
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    )
}
