import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'LinkedIn Profile Scoring FAQ | Common Questions Answered',
    description: 'Frequently asked questions about LinkedInRank, LinkedIn profile scoring, data privacy, PDF upload, AI recommendations, and how to improve your LinkedIn profile score to 100.',
    keywords: 'linkedinrank faq, linkedin profile score questions, linkedin scoring faq, how to improve linkedin score, linkedin profile tips faq, linkedin pdf upload help',
    alternates: { canonical: 'https://linkedinrank.com/faq' },
    openGraph: {
        title: 'LinkedIn Profile Scoring FAQ | Common Questions Answered',
        description: 'Everything you need to know about LinkedInRank scoring, privacy, and LinkedIn profile optimization.',
        url: 'https://linkedinrank.com/faq',
    },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
