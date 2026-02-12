import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'Best LinkedIn Headlines for MBA Students & Graduates — 25+ Examples (2026)',
    description: 'LinkedIn headline examples for MBA students, graduates, and professionals in 2026. Consulting, finance, product management, strategy, and marketing headlines. Free scoring with LinkedInRank.',
    keywords: 'linkedin headline mba, linkedin headline mba student 2026, linkedin for mba students, mba linkedin profile, linkedin headline for business students, mba linkedin tips, best mba linkedin headline',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-mba' },
    openGraph: {
        title: 'Best LinkedIn Headlines for MBA Students & Graduates — 25+ Examples',
        description: 'Consulting, finance, product management, strategy headlines for MBA professionals.',
        url: 'https://linkedinrank.com/linkedin-headline-mba',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'Best LinkedIn Headlines for MBA Students & Graduates',
            description: 'LinkedIn headline examples for MBA students, graduates, career switchers, and MBA alumni. By specialization: consulting, finance, tech, marketing, and entrepreneurship.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-headline-mba',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
            { '@type': 'ListItem', position: 2, name: 'Headline Guide', item: 'https://linkedinrank.com/linkedin-headline-guide' },
            { '@type': 'ListItem', position: 3, name: 'For MBA Students', item: 'https://linkedinrank.com/linkedin-headline-mba' },
        ] },
        { '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'Should MBA students include their school in their headline?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, if the school is well-known. "MBA Candidate @ Wharton" immediately signals credibility. Include your target function or industry alongside the school.' } },
            { '@type': 'Question', name: 'How should career switchers write their MBA headline?', acceptedAnswer: { '@type': 'Answer', text: 'Lead with your target role, not your past. "MBA Candidate | Transitioning to Product Management | Ex-Mechanical Engineer" shows clear intent while leveraging your background.' } },
        ] },
    ],
}

export default function HeadlineMBAPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader navLinks={[{ href: '/linkedin-headline-guide', label: 'Headline Guide' }]} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Role-Specific Headlines</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">Best LinkedIn Headlines for MBA Students & Graduates</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    MBA candidates and graduates have a unique challenge on LinkedIn: positioning yourself for a career pivot while leveraging your pre-MBA experience. Your headline needs to signal your target function, industry interest, and the credibility your MBA adds. Here are <strong className="text-[#0A0F1C]">25+ proven examples</strong> by function and career stage.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The MBA Headline Formula</h2>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6 mb-4">
                            <p className="text-lg font-bold text-[#0A0F1C] mb-4 text-center">[Target Role] | MBA @ [School] | [Pre-MBA Expertise or Industry Focus]</p>
                            <p className="text-sm text-[#4B5563] text-center">Lead with where you are going, not where you have been.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">25+ MBA Headlines by Function</h2>
                        {[
                            { func: 'Consulting', examples: [
                                'MBA @ Kellogg | Strategy & Operations Consulting | Ex-Deloitte',
                                'Aspiring Management Consultant | MBA @ ISB | 5 Years in IT Services',
                                'Strategy Consultant | MBA @ IIMA | Data-Driven Problem Solving',
                                'MBA Candidate @ Wharton | Consulting & Corporate Strategy | Ex-EY',
                            ]},
                            { func: 'Product Management', examples: [
                                'Product Manager | MBA @ Stanford GSB | Building AI-First Products',
                                'Aspiring PM | MBA @ IIM Bangalore | Ex-Software Engineer at Flipkart',
                                'Product Strategy | MBA 2026 @ Booth | Marketplace & Platform Design',
                                'Senior PM | MBA @ Columbia | FinTech & Payments | Ex-Goldman Sachs',
                            ]},
                            { func: 'Finance & Investment Banking', examples: [
                                'Investment Banking | MBA @ Columbia | M&A and Capital Markets',
                                'Private Equity Associate | MBA @ HBS | Healthcare & Life Sciences',
                                'Corporate Finance | MBA @ IIM Ahmedabad | FP&A & Strategic Planning',
                                'Venture Capital | MBA @ INSEAD | Early-Stage SaaS Investing',
                            ]},
                            { func: 'Marketing & Brand Management', examples: [
                                'Brand Manager | MBA @ Kellogg | FMCG & Consumer Insights',
                                'Marketing Strategy | MBA @ ISB | Digital-First Brand Building',
                                'Growth Marketing | MBA @ Haas | B2B SaaS & Product-Led Growth',
                                'CMO Track | MBA @ IIM Lucknow | Ex-Unilever Brand Marketing',
                            ]},
                            { func: 'Entrepreneurship', examples: [
                                'Founder & MBA @ Stanford GSB | Building [Company] | EdTech',
                                'MBA @ IIM Kozhikode | Building a D2C Brand in Wellness',
                                'Serial Entrepreneur | MBA @ Babson | Marketplace & Logistics',
                                'Social Impact | MBA @ Oxford Said | Sustainable Business Models',
                            ]},
                            { func: 'Career Switchers', examples: [
                                'Career Pivot: Engineering → Product | MBA @ Ross | Ex-Amazon SDE',
                                'From Military to Business | MBA @ Darden | Operations & Leadership',
                                'Transitioning to Tech | MBA @ Tepper | Supply Chain → Product Ops',
                            ]},
                        ].map((section, i) => (
                            <div key={i} className="mb-10">
                                <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">{section.func}</h3>
                                <div className="space-y-2">
                                    {section.examples.map((ex, j) => (
                                        <div key={j} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium">{ex}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">MBA Headline Mistakes to Avoid</h2>
                        <div className="space-y-2">
                            {[
                                { bad: 'MBA Student', why: 'Says nothing about your target role, skills, or pre-MBA experience.' },
                                { bad: 'Aspiring Leader | MBA @ [School]', why: 'Vague and generic. Every MBA student aspires to lead. Be specific about your function.' },
                                { bad: 'Class of 2026 | Future Consultant', why: '"Future" suggests you are not there yet. Position as if you are already in the role.' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-3">
                                    <span className="text-red-500 shrink-0 mt-0.5 text-sm">✗</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C]">&ldquo;{item.bad}&rdquo;</p>
                                        <p className="text-xs text-[#4B5563]">{item.why}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">MBA Profile Optimization Tips</h2>
                        <ul className="space-y-2">
                            {[
                                'Lead with your target role, not your student status — recruiters search by function',
                                'Include your school name — it adds credibility and enables alumni search',
                                'Mention pre-MBA experience — it differentiates you from other MBA candidates',
                                'Add industry focus keywords — "FinTech," "Healthcare," "SaaS" help with search filtering',
                                'Use your About section to tell your career pivot story with clear motivation',
                                'Get recommendations from MBA professors and summer internship managers',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4">For a complete student guide, read our <Link href="/for-students" className="text-[#0A66C2] hover:underline">LinkedIn Guide for Students</Link>. For career stage optimization, see our <Link href="/linkedin-optimization-guide" className="text-[#0A66C2] hover:underline">Complete Optimization Guide</Link>.</p>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'Should I mention my pre-MBA company?', a: 'Yes, especially if it is well-known. "Ex-McKinsey" or "Ex-Google" adds significant credibility. If your company is less known, lead with your skills and target role instead.' },
                                { q: 'When should I update my headline during the MBA?', a: 'Update 3 times: when you start (add MBA and target role), after summer internship (add the internship), and before graduation (position for full-time role you want).' },
                                { q: 'Should I use "MBA Candidate" or "MBA Student"?', a: '"MBA Candidate" sounds slightly more professional. But the distinction is minor — what matters more is the rest of your headline communicating your target role and expertise.' },
                                { q: 'Can LinkedInRank help MBA students?', a: 'Yes. LinkedInRank detects student profiles and adjusts scoring expectations. You will get career-stage-appropriate recommendations for headline, About section, and skills.' },
                            ].map((item, i) => (
                                <div key={i} className="border-b border-gray-100 pb-4">
                                    <h3 className="text-sm font-bold text-[#0A0F1C] mb-1">{item.q}</h3>
                                    <p className="text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Get your MBA profile scored</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">LinkedInRank adapts to student and MBA profiles. Get your free analysis in under a minute.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile — It's Free</Link>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'For Software Engineers', href: '/linkedin-headline-software-engineers' },
                                { label: 'For Marketers', href: '/linkedin-headline-marketers' },
                                { label: 'For Designers', href: '/linkedin-headline-designers' },
                                { label: 'For Students', href: '/for-students' },
                                { label: 'About Section Guide', href: '/linkedin-about-guide' },
                                { label: 'Keywords Guide', href: '/linkedin-keywords-guide' },
                                { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <footer className="border-t border-gray-100 bg-[#F8FAFC] py-8">
                <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4"><Link href="/" className="font-bold text-sm text-[#0A0F1C] no-underline">LinkedIn<span className="text-gradient-brand">Rank</span></Link><a href="https://www.instagram.com/linkedinrank/" target="_blank" rel="noopener noreferrer" className="text-[#6B7280] hover:text-[#0A0F1C] transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a></div>
                    <nav className="flex flex-wrap gap-x-6 gap-y-2">
                        <Link href="/" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Home</Link>
                        <Link href="/linkedin-headline-guide" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Headline Guide</Link>
                        <Link href="/for-students" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">For Students</Link>
                    </nav>
                </div>
            </footer>
        </main>
    )
}
