import Link from 'next/link'
import { getRelatedPages, getPillarPage } from '@/lib/seoConfig'

interface RelatedPagesProps {
  currentSlug: string
  /** Additional hardcoded links to always include */
  extraLinks?: { label: string; href: string }[]
}

/**
 * Programmatic related pages component.
 * Automatically generates internal links based on keyword similarity.
 * Every page gets: homepage link + pillar guide link + 3 related pages.
 */
export default function RelatedPages({ currentSlug, extraLinks }: RelatedPagesProps) {
  const related = getRelatedPages(currentSlug, 3)
  const pillar = getPillarPage(currentSlug)

  // Build link list: homepage → pillar → related → extras
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
    <div className="pt-8 border-t border-gray-100">
      <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Related Guides</p>
      <div className="flex flex-wrap gap-2">
        {links.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="text-xs font-medium text-[#4B5563] bg-[#F8FAFC] border border-gray-200 px-3 py-1.5 rounded-lg no-underline hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
