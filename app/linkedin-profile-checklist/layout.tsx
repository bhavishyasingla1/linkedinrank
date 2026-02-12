import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'LinkedIn Profile Checklist — 50+ Point Optimization Guide | LinkedInRank',
    description: 'A comprehensive 50+ point LinkedIn profile checklist covering photo, headline, about, experience, skills, education, recommendations, and more. Interactive, downloadable as PDF, and 100% free.',
}

export default function ChecklistLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
