import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'LinkedInRank — Free LinkedIn Profile Score & Analysis Tool',
    description: 'LinkedInRank scores your LinkedIn profile across 30+ signals. Upload your LinkedIn PDF for a free, instant analysis with personalized recommendations and an improvement roadmap. No login required.',
    keywords: 'linkedinrank, linkedin rank, linkedin profile score, linkedin profile analysis, linkedin optimization tool, linkedin profile review, linkedin score checker, linkedin profile strength, free linkedin analysis',
    authors: [{ name: 'LinkedInRank' }],
    openGraph: {
        title: 'LinkedInRank — See How Strong Your LinkedIn Profile Really Is',
        description: 'Free LinkedIn profile scoring tool. Upload your PDF, get a score out of 100 with personalized recommendations and an improvement roadmap. Used by students, job seekers, and professionals.',
        url: 'https://linkedinrank.com',
        siteName: 'LinkedInRank',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LinkedInRank — Free LinkedIn Profile Score & Analysis',
        description: 'Score your LinkedIn profile across 30+ signals. Get personalized recommendations and a clear improvement roadmap. No login required.',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className} suppressHydrationWarning>{children}</body>
        </html>
    )
}
