import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Analyzing Your Profile | LinkedInRank',
    description: 'Your LinkedIn profile is being analyzed across 30+ signals. Please wait while we generate your personalized score and recommendations.',
}

export default function LoadingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
