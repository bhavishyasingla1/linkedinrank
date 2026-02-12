import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Your LinkedIn Profile Analysis — LinkedInRank',
    description: 'Your personalized LinkedIn profile score and analysis. See your category breakdown, recommendations, and improvement roadmap.',
}

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
