import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'LinkedIn Best Practices — LinkedInRank',
    description: 'Proven LinkedIn profile best practices for 2025. Optimize your headline, about section, experience, skills, and more to improve your LinkedInRank score and get noticed by recruiters.',
    keywords: 'linkedin best practices, linkedin profile tips, linkedin optimization, linkedinrank, linkedin profile score',
}

const PRACTICES = [
    {
        category: 'Headline',
        tips: [
            { title: 'Lead with your role, not your company', desc: 'Recruiters search by title, not employer. "Product Manager" is more searchable than "Working at Google".' },
            { title: 'Keep it under 120 characters', desc: 'LinkedIn truncates long headlines on mobile and in search results. Front-load your most important keywords.' },
            { title: 'Use pipe separators for structure', desc: 'Format like: "Role | Industry/Niche | Value Proposition". This is scannable and keyword-rich.' },
            { title: 'Avoid cliches', desc: 'Skip "passionate", "results-driven", "team player". Use specific terms: "B2B SaaS Growth" beats "Marketing Professional".' },
        ]
    },
    {
        category: 'About Section',
        tips: [
            { title: 'Write in first person', desc: 'First-person ("I build...") feels authentic. Third-person ("John is a...") reads like a press release.' },
            { title: 'Open with what you do, not who you are', desc: 'Start with value: "I help B2B companies reduce churn by 30%" is stronger than "I am a customer success manager".' },
            { title: 'Include 3-5 specific skills or tools', desc: 'Mentioning tools like "Figma, SQL, HubSpot" adds specificity and improves keyword matching.' },
            { title: 'Keep it between 200-400 words', desc: 'Long enough to tell your story, short enough to be read. Use short paragraphs and line breaks.' },
        ]
    },
    {
        category: 'Experience',
        tips: [
            { title: 'Start bullets with action verbs', desc: '"Led", "Built", "Delivered", "Scaled" — these signal ownership. Avoid "Responsible for" and "Helped with".' },
            { title: 'Show impact, not just duties', desc: '"Grew user base from 10K to 50K in 6 months" beats "Managed user growth initiatives".' },
            { title: 'Add metrics where possible (but don\'t force them)', desc: 'Numbers add credibility, but approximate or contextual metrics work too: "Led a team of 5" or "Launched 3 features".' },
            { title: 'Write 3-5 bullets per role', desc: 'Too few looks thin. Too many dilutes impact. Focus on your strongest contributions.' },
        ]
    },
    {
        category: 'Skills',
        tips: [
            { title: 'Pin your top 3 skills strategically', desc: 'LinkedIn prominently shows your top 3. Make sure they align with your target role and headline.' },
            { title: 'Be specific over generic', desc: '"Product Management" > "Management". "Python" > "Programming". Recruiters search for specific tools.' },
            { title: 'Align skills with your headline and experience', desc: 'If your headline says "Data Analyst", your top skills should include SQL, Tableau, Python — not generic terms.' },
            { title: 'Remove irrelevant skills', desc: 'Quality over quantity. Skills from a past career that don\'t serve your current direction add noise.' },
        ]
    },
    {
        category: 'Education & Certifications',
        tips: [
            { title: 'Include field of study, not just degree', desc: '"B.S. Computer Science" is more useful than just "Bachelor\'s Degree".' },
            { title: 'Add relevant certifications', desc: 'Industry certifications (AWS, PMP, Google Analytics) signal commitment to professional development.' },
            { title: 'List relevant coursework or projects', desc: 'Especially valuable for students and early-career professionals. Shows initiative beyond coursework.' },
        ]
    },
    {
        category: 'Profile Completeness',
        tips: [
            { title: 'Fill every section', desc: 'Profiles with all sections complete rank higher in LinkedIn search. Even brief content is better than empty sections.' },
            { title: 'Use a professional profile photo', desc: 'Profiles with photos get 14x more views. Use a clear headshot with good lighting and a neutral background.' },
            { title: 'Customize your LinkedIn URL', desc: 'Change it to linkedin.com/in/yourname. Looks professional on resumes and business cards.' },
        ]
    },
]

export default function LinkedInBestPracticesPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader navLinks={[{ href: '/', label: 'Analyze Your Profile' }]} />

            <div className="max-w-3xl mx-auto px-6 py-16">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0A66C2]"></div>
                    <span className="text-xs font-semibold text-[#0A66C2]">LinkedIn Profile Guide</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">
                    LinkedIn Best Practices for a Stronger Profile
                </h1>
                <p className="text-[16px] text-[#4B5563] leading-relaxed mb-12 max-w-2xl">
                    These are the practices that consistently lead to higher LinkedInRank scores. They are based on
                    evaluating thousands of profile signals across headline clarity, experience depth, keyword alignment, and structure.
                </p>

                <div className="space-y-12">
                    {PRACTICES.map((section, i) => (
                        <div key={i}>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">{i + 1}</div>
                                <h2 className="text-xl font-bold text-[#0A0F1C]">{section.category}</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {section.tips.map((tip, j) => (
                                    <div key={j} className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow">
                                        <h3 className="text-sm font-bold text-[#0A0F1C] mb-1.5">{tip.title}</h3>
                                        <p className="text-sm text-[#4B5563] leading-relaxed">{tip.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 text-center">
                    <h2 className="text-xl font-bold text-[#0A0F1C] mb-3">See how your profile measures up</h2>
                    <p className="text-sm text-[#4B5563] mb-6 max-w-md mx-auto leading-relaxed">
                        Upload your LinkedIn PDF to LinkedInRank and get a score across 30+ signals with personalized recommendations.
                    </p>
                    <Link href="/" className="btn-primary inline-block no-underline">Analyze Your Profile</Link>
                </div>

                <div className="mt-12 pt-6 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
                    <div className="flex flex-wrap gap-2">
                        <Link href="/linkedin-optimization-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Full Optimization Guide</Link>
                        <Link href="/linkedin-headline-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Headline Guide</Link>
                        <Link href="/linkedin-about-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">About Section Guide</Link>
                        <Link href="/linkedin-keywords-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Keywords Guide</Link>
                        <Link href="/linkedin-profile-checklist" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Profile Checklist</Link>
                        <Link href="/recruiter-psychology" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Recruiter Psychology</Link>
                        <Link href="/linkedin-mistakes" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Top 10 Mistakes</Link>
                        <Link href="/for-students" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">For Students</Link>
                        <Link href="/for-jobseekers" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">For Job Seekers</Link>
                        <Link href="/for-founders" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">For Founders</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
