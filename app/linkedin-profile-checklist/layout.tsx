import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'LinkedIn Profile Checklist | 50+ Point Optimization Guide (2026)',
    description: 'A comprehensive 50+ point LinkedIn profile checklist for 2026 covering photo, headline, about, experience, skills, education, recommendations, and more. Interactive and 100% free. Score your profile with LinkedInRank.',
    keywords: 'linkedin profile checklist 2026, linkedin optimization checklist, linkedin profile audit checklist, linkedin profile review checklist, linkedin checklist free, linkedin profile tips checklist',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-profile-checklist' },
    openGraph: {
        title: 'LinkedIn Profile Checklist | 50+ Point Optimization Guide',
        description: '50+ point checklist covering every section of your LinkedIn profile. Interactive and free.',
        url: 'https://linkedinrank.com/linkedin-profile-checklist',
    },
}

export default function ChecklistLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
