import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'LinkedIn Profile FAQ — LinkedInRank',
    description: 'Frequently asked questions about LinkedInRank, LinkedIn profile scoring, data privacy, and how to improve your LinkedIn profile. Get answers to common questions.',
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
