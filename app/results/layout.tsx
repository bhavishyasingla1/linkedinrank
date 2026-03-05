import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Your LinkedIn Profile Analysis',
    description: 'Your personalized LinkedIn profile score and analysis. See your category breakdown, recommendations, and improvement roadmap.',
    robots: { index: false, follow: false },
}

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
