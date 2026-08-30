import type { Metadata } from 'next'

// Never statically prerender this page — it reads from sessionStorage at runtime
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Your LinkedIn Profile Analysis',
    description: 'Your personalized LinkedIn profile score and analysis. See your category breakdown, recommendations, and improvement roadmap.',
    robots: { index: false, follow: false },
}

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
