'use client'

import Link from 'next/link'
import { useState } from 'react'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'

export default function ChecklistPage() {
    const [checked, setChecked] = useState<Record<string, boolean>>({})
    const toggle = (key: string) => setChecked(prev => ({ ...prev, [key]: !prev[key] }))

    return (
        <main className="min-h-screen bg-white">
            <div className="no-print">
                <SiteHeader />
            </div>

            {/* Hero */}
            <section className="relative bg-gradient-to-b from-[#F8FAFC] to-white pt-16 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%20fill%3D%22%23E5E7EB%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
                <div className="max-w-3xl mx-auto px-6 text-center relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                        <svg className="w-3.5 h-3.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-xs font-semibold text-[#0A66C2]">50+ Point Checklist</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">The Ultimate LinkedIn Profile Checklist</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-lg mx-auto leading-relaxed mb-6">
                        A comprehensive, section-by-section checklist to evaluate and optimize your LinkedIn profile. Based on the same 30+ signals LinkedInRank uses | plus expert tips on each item.
                    </p>
                    <div className="flex items-center justify-center gap-3 text-xs text-[#6B7280]">
                        <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> Interactive checkboxes</span>
                        <span className="text-gray-300">·</span>
                        <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> Downloadable as PDF</span>
                        <span className="text-gray-300">·</span>
                        <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> 100% Free</span>
                    </div>
                </div>
            </section>

            {/* Progress bar */}
            <section className="border-b border-gray-100 bg-white no-print">
                <div className="max-w-3xl mx-auto px-6 py-5">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-bold text-[#0A0F1C]">Your progress</p>
                        <p className="text-xs font-bold text-[#0A66C2]">{Object.values(checked).filter(Boolean).length} / 52 completed</p>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-gradient-to-r from-[#0A66C2] to-[#4F46E5] h-2 rounded-full transition-all duration-500" style={{ width: `${(Object.values(checked).filter(Boolean).length / 52) * 100}%` }} />
                    </div>
                </div>
            </section>

            <article className="max-w-3xl mx-auto px-6 py-12">
                <div className="space-y-8 text-sm text-[#4B5563] leading-relaxed">
                    {[
                        {
                            title: 'Profile Photo & Banner',
                            weight: 'First Impression',
                            color: '#059669',
                            tip: 'Profiles with a professional photo get 14x more views. Your banner is free real estate | use it.',
                            items: [
                                'Professional headshot with good lighting and neutral background',
                                'Face takes up 60-70% of the frame (not too far, not too close)',
                                'You look approachable and are dressed appropriately for your industry',
                                'Custom banner image (not the default blue) | shows your brand, company, or tagline',
                                'Photo is recent and recognizable (would someone recognize you at a meeting?)',
                            ]
                        },
                        {
                            title: 'Headline',
                            weight: '20 pts',
                            color: '#0A66C2',
                            tip: 'Your headline appears in search results, connection requests, and comments. It\'s your 120-character elevator pitch.',
                            items: [
                                'States your current role or professional identity clearly',
                                'Includes industry-relevant keywords recruiters actually search for',
                                'Is specific | not just "Student" or "Professional" or "Entrepreneur"',
                                'Uses pipe separators (|) for scannability: Role | Specialty | Value',
                                'Conveys what you do AND for whom or in what domain',
                                'Under 120 characters for full visibility in search results',
                                'Does not lead with "Seeking opportunities" or "Open to work"',
                            ]
                        },
                        {
                            title: 'About / Summary',
                            weight: '20 pts',
                            color: '#2563EB',
                            tip: 'Only the first 3 lines show before "see more". Your hook must be compelling enough to click.',
                            items: [
                                'First 2 lines hook the reader | state what you do and why it matters',
                                'Mentions specific skills, tools, or domains you work with',
                                'Shows professional direction or area of focus',
                                'Structured with short paragraphs (not a wall of text)',
                                'Written in first person ("I build..." not "John builds...")',
                                'Between 150-300 words | enough to tell your story, short enough to read',
                                'Includes a call to action ("Let\'s connect if...", "Reach out for...")',
                                'Avoids generic filler: "passionate", "hardworking", "team player", "motivated"',
                            ]
                        },
                        {
                            title: 'Experience',
                            weight: '25 pts',
                            color: '#4F46E5',
                            tip: 'This is the highest-weighted section. Recruiters spend 80% of their time here.',
                            items: [
                                'Each role has 2-4 bullet points (not just the title)',
                                'Bullets start with strong action verbs: Led, Built, Shipped, Reduced, Grew',
                                'Describes what you did, how you did it, and the result (Situation → Action → Result)',
                                'Includes at least one metric or number per role ("Increased X by Y%", "Managed team of Z")',
                                'Most recent role has the most detail | older roles can be brief',
                                'No unexplained gaps longer than 6 months',
                                'Company names include the company page link (not just text)',
                                'Date ranges are complete (month + year)',
                            ]
                        },
                        {
                            title: 'Skills & Endorsements',
                            weight: '15 pts',
                            color: '#7C3AED',
                            tip: 'LinkedIn\'s search algorithm heavily weights skills. Pinning the right 3 skills can 2x your search appearances.',
                            items: [
                                'At least 10+ skills listed (LinkedIn allows up to 50)',
                                'Top 3 pinned skills match your target role exactly',
                                'Skills include specific tools (Figma, Python, Salesforce) not just generic terms',
                                'Skills align with what\'s in your headline and experience',
                                'Has endorsements from colleagues on key skills (ask 5 people)',
                                'No outdated or irrelevant skills cluttering the list',
                            ]
                        },
                        {
                            title: 'Education & Certifications',
                            weight: '10 pts',
                            color: '#9333EA',
                            tip: 'Education is especially important for students and career changers. Certifications boost credibility for everyone.',
                            items: [
                                'Degree, institution, and field of study are listed',
                                'Graduation year is included',
                                'Relevant coursework, projects, or honors mentioned (for students)',
                                'Industry certifications listed (AWS, PMP, CPA, Google Analytics, etc.)',
                                'Online courses from credible platforms (Coursera, edX) included if relevant',
                                'Certifications link to the issuing organization',
                            ]
                        },
                        {
                            title: 'Recommendations',
                            weight: 'Social Proof',
                            color: '#DC2626',
                            tip: 'Recommendations are the most underused LinkedIn feature. 2-3 strong ones dramatically boost credibility.',
                            items: [
                                'Has at least 2-3 recommendations from managers, colleagues, or clients',
                                'Recommendations mention specific projects, skills, or outcomes',
                                'Given recommendations to others (reciprocity works)',
                                'Most recent recommendation is from the last 2 years',
                            ]
                        },
                        {
                            title: 'Profile URL & Settings',
                            weight: 'Basics',
                            color: '#F59E0B',
                            tip: 'A custom URL looks professional on resumes and email signatures. Default URLs with random numbers signal "I don\'t care."',
                            items: [
                                'Custom LinkedIn URL set (linkedin.com/in/yourname, not linkedin.com/in/john-doe-38573ab)',
                                'Profile is set to Public (visible to recruiters outside your network)',
                                'Contact info section has your email or website',
                                'Creator mode turned on if you post content regularly',
                            ]
                        },
                        {
                            title: 'Completeness & Consistency',
                            weight: '10 pts',
                            color: '#A855F7',
                            tip: 'LinkedIn\'s algorithm favors complete profiles. Incomplete profiles rank lower in search results.',
                            items: [
                                'All major sections filled: Photo, Headline, About, Experience, Skills, Education',
                                'Profile tells a coherent professional story from top to bottom',
                                'Consistent tone and language throughout',
                                'No placeholder text, lorem ipsum, or "TBD" entries',
                                'Profile reads well on mobile (check it on your phone)',
                                'LinkedIn PDF export looks clean and complete',
                                'Profile could be sent to a recruiter right now with confidence',
                            ]
                        },
                    ].map((section, i) => (
                        <section key={i} className="bg-white border border-gray-200 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: section.color }} />
                            <div className="p-5 pl-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-lg font-bold text-[#0A0F1C]">{section.title}</h2>
                                    </div>
                                    <span className="text-[10px] font-bold text-white px-2.5 py-0.5 rounded-full shrink-0" style={{ backgroundColor: section.color }}>{section.weight}</span>
                                </div>
                                <p className="text-xs text-[#6B7280] mb-4 leading-relaxed italic">{section.tip}</p>
                                <ul className="space-y-2.5">
                                    {section.items.map((item, j) => {
                                        const key = `${i}-${j}`
                                        return (
                                            <li key={j} className="flex items-start gap-3 cursor-pointer group" onClick={() => toggle(key)}>
                                                <div className={`w-5 h-5 rounded-md border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors ${checked[key] ? 'border-transparent' : ''}`} style={{ borderColor: checked[key] ? section.color : section.color + '40', backgroundColor: checked[key] ? section.color : 'transparent' }}>
                                                    {checked[key] && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                                                </div>
                                                <span className={`text-sm leading-relaxed transition-colors ${checked[key] ? 'text-[#6B7280] line-through' : 'text-[#4B5563] group-hover:text-[#0A0F1C]'}`}>{item}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </section>
                    ))}

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Done checking? Get your score</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF and let LinkedInRank score your profile automatically with personalized recommendations for every section.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It&apos;s Free</Link>
                    </div>

                    <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5 flex items-center justify-between no-print">
                        <div>
                            <p className="text-sm font-bold text-[#0A0F1C] mb-0.5">Save this checklist</p>
                            <p className="text-xs text-[#6B7280]">Download as PDF to reference offline</p>
                        </div>
                        <button onClick={() => window.print()} className="text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#084E96] px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                            Download PDF
                        </button>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/linkedin-optimization-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Full Optimization Guide</Link>
                            <Link href="/linkedin-headline-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Headline Guide</Link>
                            <Link href="/linkedin-about-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">About Section Guide</Link>
                            <Link href="/linkedin-keywords-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Keywords Guide</Link>
                            <Link href="/linkedin-profile-photo-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Profile Photo Guide</Link>
                            <Link href="/linkedin-mistakes" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Top 10 Mistakes</Link>
                            <Link href="/top-1-percent-profiles" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Top 1% Profiles</Link>
                            <Link href="/linkedin-profile-for-students" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">For Students</Link>
                        </div>
                    </div>
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
