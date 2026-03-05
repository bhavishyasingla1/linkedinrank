import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Analyzing Your Profile',
    description: 'Your LinkedIn profile is being analyzed across 30+ signals. Please wait while we generate your personalized score and recommendations.',
    robots: { index: false, follow: false },
}

export default function LoadingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
