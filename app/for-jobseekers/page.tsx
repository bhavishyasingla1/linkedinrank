import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'
import { guidePageJsonLd } from '@/lib/jsonLd'

export const metadata: Metadata = {
    title: 'LinkedIn for Job Seekers: Recruiter-Ready Guide (2026)',
    description: 'Optimise your profile for recruiter searches in 30 minutes. Data-backed headline, keywords, and skills strategies.',
    keywords: 'linkedin for job seekers 2026, linkedin profile optimization job search, linkedin recruiter tips, linkedinrank job search, linkedin keywords job seekers, linkedin profile for job hunting',
    alternates: { canonical: 'https://linkedinrank.com/for-jobseekers' },
    openGraph: {
        title: 'LinkedIn for Job Seekers: Recruiter-Ready Guide (2026)',
        description: 'Optimise your profile for recruiter searches in 30 minutes. Data-backed strategies.',
        url: 'https://linkedinrank.com/for-jobseekers',
    },
}

const jsonLd = guidePageJsonLd({
    title: 'LinkedIn for Job Seekers: The Complete Optimization Checklist',
    description: 'Optimize your LinkedIn profile for recruiter searches. Headline, keywords, experience, skills — the complete checklist.',
    url: 'https://linkedinrank.com/for-jobseekers',
    dateModified: '2026-03-24',
    breadcrumbs: [
        { name: 'Home', url: 'https://linkedinrank.com' },
        { name: 'For Job Seekers', url: 'https://linkedinrank.com/for-jobseekers' },
    ],
    faqs: [
        { question: 'How long should my LinkedIn profile be for job searching?', answer: 'Every section should be filled. Aim for 800–1,500 characters in your About section, 3–5 bullet points per experience role with metrics, and 15–25 skills.' },
        { question: 'Should my LinkedIn match my resume exactly?', answer: 'They should be consistent but not identical. LinkedIn should be more conversational and include elements resumes lack: About narrative, Featured section, recommendations.' },
        { question: 'How do I handle a career gap on LinkedIn?', answer: 'Be honest. LinkedIn now supports career breaks as a section. Frame the gap positively — mention skills you learned, freelance work, or personal development.' },
        { question: 'Is LinkedIn Premium worth it for job seekers?', answer: 'Premium gives you InMail credits and shows who viewed your profile. However, the most impactful improvements (headline, keywords, experience, skills) are completely free.' },
        { question: 'How does LinkedInRank help with job searching?', answer: 'LinkedInRank evaluates the same signals recruiters scan: headline clarity, keyword presence, experience depth, and profile completeness. Upload your PDF for a free score.' },
        { question: 'How quickly can I improve my profile?', answer: 'A thorough overhaul takes 2–3 hours. Start with headline and About section. Most people see increased profile views within 1–2 weeks of optimization.' },
    ],
})

export default function ForJobSeekersPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <article className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
                <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5 flex-wrap mb-8">
                    <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                    <span aria-hidden="true">/</span>
                    <span className="text-[#0A0F1C] font-medium">For Job Seekers</span>
                </nav>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">For Job Seekers</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">How to Optimize Your LinkedIn Profile for Recruiters</h1>
                <p className="text-[15px] text-[#4B5563] mb-10 leading-relaxed max-w-xl">
                    Research shows recruiters spend an average of <strong className="text-[#0A0F1C]">7.4 seconds scanning a LinkedIn profile</strong>. Over 87% of recruiters use LinkedIn as their primary sourcing tool. These are the signals that matter most when you are actively looking.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    <section aria-labelledby="js-headline">
                        <h2 id="js-headline" className="text-xl font-bold text-[#0A0F1C] mb-3">1. Headline: your search ranking factor</h2>
                        <p className="mb-4">Your headline is the single most important field for LinkedIn search visibility. Recruiters use Boolean searches with job titles, skills, and industry terms. If those keywords are not in your headline, you will not appear in their results. LinkedIn's own algorithm weights the headline heavily in search ranking.</p>
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-3">
                            <div>
                                <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Before</p>
                                <p className="text-[#6B7280] line-through opacity-70">"Open to new opportunities"</p>
                            </div>
                            <div className="border-t border-gray-100 pt-3">
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1">After</p>
                                <p className="text-[#0A0F1C] font-medium">"Senior Product Manager | B2B SaaS | Growth & Retention Strategy"</p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-[#6B7280]">Include your target job title exactly as recruiters would search for it. Use pipes (|) to add industry and specialization. Keep under 120 characters.</p>
                    </section>

                    <section aria-labelledby="js-experience">
                        <h2 id="js-experience" className="text-xl font-bold text-[#0A0F1C] mb-3">2. Experience: show impact, not duties</h2>
                        <p className="mb-4">Recruiters want to see what you accomplished, not just what you were responsible for. According to a LinkedIn study, profiles with quantified achievements get <strong className="text-[#0A0F1C]">40% more InMails from recruiters</strong>.</p>
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-3">
                            <div>
                                <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Weak</p>
                                <p className="text-[#6B7280] line-through opacity-70">"Responsible for managing the marketing team and campaigns"</p>
                            </div>
                            <div className="border-t border-gray-100 pt-3">
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1">Strong</p>
                                <p className="text-[#0A0F1C] font-medium">"Led a 6-person marketing team, increasing qualified leads by 40% through targeted content campaigns"</p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-[#6B7280]">Start every bullet with an action verb. Add context (team size, budget, scope). Include outcomes even if approximate.</p>
                    </section>

                    <section aria-labelledby="js-about">
                        <h2 id="js-about" className="text-xl font-bold text-[#0A0F1C] mb-3">3. About section: your elevator pitch</h2>
                        <p className="mb-3">Your About section should answer three questions in under 300 words:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                            <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-4 text-center">
                                <p className="text-sm font-bold text-[#0A66C2]">What do you do?</p>
                            </div>
                            <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-4 text-center">
                                <p className="text-sm font-bold text-[#0A66C2]">What are you good at?</p>
                            </div>
                            <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-4 text-center">
                                <p className="text-sm font-bold text-[#0A66C2]">What are you looking for?</p>
                            </div>
                        </div>
                        <p>Write in first person, mention specific tools and skills, and include keywords from your target job descriptions. The first two lines are visible before "see more" | make them count.</p>
                    </section>

                    <section aria-labelledby="js-skills">
                        <h2 id="js-skills" className="text-xl font-bold text-[#0A0F1C] mb-3">4. Skills: align with target roles</h2>
                        <p className="mb-3">LinkedIn uses your skills section for search matching. Profiles with skills listed are <strong className="text-[#0A0F1C]">27x more likely to be discovered by recruiters</strong>. Prioritize tools and platforms recruiters search for over generic terms.</p>
                        <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                            <p className="text-sm font-bold text-[#0A0F1C] mb-2">Pro tip</p>
                            <p className="text-sm text-[#4B5563]">Look at 5-10 job descriptions for your target role. Extract the most common skills and tools mentioned. Add those exact terms to your skills section and pin the top 3.</p>
                        </div>
                    </section>

                    <section aria-labelledby="js-keywords">
                        <h2 id="js-keywords" className="text-xl font-bold text-[#0A0F1C] mb-3">5. Keyword consistency matters</h2>
                        <p>LinkedIn's search algorithm favors profiles where the same keywords appear across multiple sections. If your headline says "Data Analyst," your About should mention data analysis, your experience should describe analytical work, and your skills should include SQL, Python, and Tableau. This consistency signals relevance to the algorithm.</p>
                    </section>

                    <section aria-labelledby="js-opentowork">
                        <h2 id="js-opentowork" className="text-xl font-bold text-[#0A0F1C] mb-3">6. Open to Work: use it strategically</h2>
                        <p>LinkedIn's "Open to Work" feature can be visible only to recruiters (private mode). This increases InMail responses significantly without broadcasting your search to your current employer. Specify your target roles, locations, and work types clearly.</p>
                    </section>

                    <section aria-labelledby="js-recommendations">
                        <h2 id="js-recommendations" className="text-xl font-bold text-[#0A0F1C] mb-3">7. Get recommendations before you need them</h2>
                        <p className="mb-3">Recommendations are the most underused feature on LinkedIn. A profile with 3+ recommendations signals credibility that no self-written section can match. Request them from managers, colleagues, or clients who can speak to specific results you delivered.</p>
                        <p>When asking for recommendations, make it easy: suggest what they might mention (a specific project, skill, or outcome). Most people want to help but do not know what to write.</p>
                        <p className="mt-3">For more on how recruiters evaluate these signals, read our <Link href="/recruiter-psychology" className="text-[#0A66C2] hover:underline">Recruiter Psychology Guide</Link>.</p>
                    </section>

                    <section aria-labelledby="js-activity">
                        <h2 id="js-activity" className="text-xl font-bold text-[#0A0F1C] mb-3">8. Stay active during your job search</h2>
                        <p className="mb-3">Recruiters check your recent activity. A completely inactive profile suggests you are not engaged with your industry. You do not need to post daily | even minimal engagement signals that you are current and professional.</p>
                        <ul className="space-y-2">
                            {[
                                'Comment thoughtfully on 3–5 industry posts per week',
                                'Share an article with your perspective once a week',
                                'Post about your job search learnings (these perform well and build empathy)',
                                'Engage with posts from recruiters at your target companies',
                                'Congratulate connections on new roles | it keeps you visible in their feeds',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-3 text-sm">For a complete content playbook, read our <Link href="/linkedin-content-strategy" className="text-[#0A66C2] hover:underline">Content Strategy Guide</Link>.</p>
                    </section>

                    <section aria-labelledby="js-faq">
                        <h2 id="js-faq" className="text-xl font-bold text-[#0A0F1C] mb-3">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'How long should my LinkedIn profile be for job searching?', a: 'Every section should be filled. Aim for 800–1,500 characters in your About section, 3–5 bullet points per experience role with metrics, and 15–25 skills. Completeness directly impacts search visibility.' },
                                { q: 'Should my LinkedIn match my resume exactly?', a: 'They should be consistent (same job titles and dates) but not identical. LinkedIn should be more conversational, include your full career story, and have elements resumes lack: About narrative, Featured section, recommendations.', },
                                { q: 'How do I handle a career gap on LinkedIn?', a: 'Be honest. LinkedIn now supports career breaks as a section. Frame the gap positively | mention skills you learned, freelance work you did, or personal development. Recruiters respect transparency.' },
                                { q: 'Is LinkedIn Premium worth it for job seekers?', a: 'Premium gives you InMail credits and shows who viewed your profile. The ROI depends on your industry. However, the most impactful improvements (headline, keywords, experience, skills) are completely free.' },
                                { q: 'How does LinkedInRank help with job searching?', a: 'LinkedInRank evaluates the same signals recruiters scan: headline clarity, keyword presence, experience depth, and profile completeness. Upload your PDF for a free score with specific recommendations to improve each section.' },
                                { q: 'How quickly can I improve my profile?', a: 'A thorough overhaul takes 2–3 hours. Start with headline and About section, then add metrics to experience. Most people see increased profile views within 1–2 weeks of optimization.' },
                            ].map((item, i) => (
                                <div key={i} className="border-b border-gray-100 pb-4">
                                    <h3 className="text-sm font-bold text-[#0A0F1C] mb-1">{item.q}</h3>
                                    <p className="text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center mt-4">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">See how your profile reads to recruiters</h2>
                        <p className="text-sm text-[#4B5563] mb-4">LinkedInRank evaluates the same signals recruiters look for. Get your free score and improvement roadmap.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It's Free</Link>
                    </div>

                    <RelatedPages currentSlug="for-jobseekers" />
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
