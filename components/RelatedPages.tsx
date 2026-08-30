import Link from 'next/link'
import { getRelatedPages, getPillarPage } from '@/lib/seoConfig'

interface RelatedPagesProps {
  currentSlug: string
  extraLinks?: { label: string; href: string }[]
}

export default function RelatedPages({ currentSlug, extraLinks }: RelatedPagesProps) {
  const related = getRelatedPages(currentSlug, 3)
  const pillar = getPillarPage(currentSlug)

  const links: { label: string; href: string }[] = [
    { label: 'LinkedInRank Home', href: '/' },
  ]

  if (pillar) {
    links.push({ label: pillar.label, href: `/${pillar.slug}` })
  }

  related.forEach(page => {
    links.push({ label: page.label, href: `/${page.slug}` })
  })

  if (extraLinks) {
    extraLinks.forEach(link => {
      if (!links.some(l => l.href === link.href)) {
        links.push(link)
      }
    })
  }

  return (
    <div className="pt-10 border-t-2 border-[#dedcff] space-y-4">
      <p className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
        Related Strategy Guides
      </p>
      <div className="flex flex-wrap gap-2.5">
        {links.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="text-[13px] font-bold text-[#050315] bg-white border border-[#dedcff] px-4 py-2 rounded-full no-underline hover:border-[#2f27ce] hover:text-[#2f27ce] hover:bg-[#dedcff]/30 transition-all shadow-xs"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
