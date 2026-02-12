import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'Best LinkedIn Headlines for Software Engineers — 30+ Examples | LinkedInRank',
    description: 'LinkedIn headline examples and formulas for software engineers, developers, and tech professionals. Frontend, backend, full-stack, DevOps, data, and mobile engineering headlines that attract recruiters.',
    keywords: 'linkedin headline software engineer, linkedin headline developer, best linkedin headline for programmers, linkedin headline for tech, software engineer linkedin profile, developer linkedin tips',
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'Best LinkedIn Headlines for Software Engineers — 25+ Examples',
            description: 'LinkedIn headline examples for software engineers, frontend, backend, full-stack, DevOps, data engineers, and engineering managers.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-headline-software-engineers',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
            { '@type': 'ListItem', position: 2, name: 'Headline Guide', item: 'https://linkedinrank.com/linkedin-headline-guide' },
            { '@type': 'ListItem', position: 3, name: 'For Software Engineers', item: 'https://linkedinrank.com/linkedin-headline-software-engineers' },
        ] },
        { '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'Should software engineers list technologies in their headline?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Recruiters search by tech stack. Include your 2-3 primary technologies. "Full-Stack Engineer | React & Node.js" is more searchable than "Software Developer."' } },
            { '@type': 'Question', name: 'Should I include my company name?', acceptedAnswer: { '@type': 'Answer', text: 'Only if it is a recognized company. "Senior SWE @ Google" adds credibility. If your company is not well-known, use the space for tech stack and specialization instead.' } },
        ] },
    ],
}

export default function HeadlineSoftwareEngineersPage() {
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
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">Best LinkedIn Headlines for Software Engineers</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Software engineering is one of the most competitive fields on LinkedIn. Recruiters search for specific technologies, frameworks, and specializations. A generic headline like &ldquo;Software Engineer&rdquo; gets lost in millions of similar profiles. This guide provides <strong className="text-[#0A0F1C]">30+ proven headline examples</strong> organized by specialization, plus the formula to write your own.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The Software Engineer Headline Formula</h2>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6 mb-4">
                            <p className="text-lg font-bold text-[#0A0F1C] mb-4 text-center">[Specialization] Engineer | [Top 2-3 Technologies] | [Company or Focus Area]</p>
                            <p className="text-sm text-[#4B5563] text-center">Include the technologies recruiters actually search for.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">30+ Headlines by Specialization</h2>

                        {[
                            { spec: 'Frontend Engineers', examples: [
                                'Frontend Engineer | React & TypeScript | Building Fast, Accessible UIs',
                                'Frontend Developer | Next.js & Tailwind CSS | Performance Optimization',
                                'UI Engineer | React, Vue.js & Design Systems | Ex-Shopify',
                                'Frontend Lead | JavaScript & Web Performance | Scaling B2B SaaS Products',
                                'Senior Frontend Engineer | React & GraphQL | FinTech',
                            ]},
                            { spec: 'Backend Engineers', examples: [
                                'Backend Engineer | Python & Django | API Design & Microservices',
                                'Backend Developer | Node.js & PostgreSQL | Scalable Systems',
                                'Senior Backend Engineer | Go & Kubernetes | High-Throughput Systems',
                                'Backend Engineer | Java & Spring Boot | Enterprise SaaS',
                                'API Developer | REST & GraphQL | Node.js & AWS',
                            ]},
                            { spec: 'Full-Stack Engineers', examples: [
                                'Full-Stack Engineer | React + Node.js | Building SaaS Products',
                                'Full-Stack Developer | TypeScript & PostgreSQL | Startup Builder',
                                'Full-Stack Engineer | Next.js & Python | AI-Powered Applications',
                                'Senior Full-Stack Developer | MERN Stack | E-Commerce & Payments',
                            ]},
                            { spec: 'DevOps & Infrastructure', examples: [
                                'DevOps Engineer | AWS & Terraform | Infrastructure as Code',
                                'Site Reliability Engineer | Kubernetes & Prometheus | 99.99% Uptime',
                                'Platform Engineer | Docker, K8s & CI/CD | Developer Experience',
                                'Cloud Engineer | AWS & GCP | Cost Optimization & Security',
                            ]},
                            { spec: 'Data & ML Engineers', examples: [
                                'Data Engineer | Python, Spark & Airflow | Building Data Pipelines',
                                'ML Engineer | PyTorch & TensorFlow | NLP & Computer Vision',
                                'Data Scientist | Python & SQL | Predictive Analytics in HealthTech',
                                'AI Engineer | LLMs & RAG Systems | Building AI-First Products',
                            ]},
                            { spec: 'Mobile Engineers', examples: [
                                'iOS Developer | Swift & SwiftUI | Building Consumer Apps',
                                'Android Engineer | Kotlin & Jetpack Compose | FinTech',
                                'Mobile Engineer | React Native & Flutter | Cross-Platform Apps',
                                'Senior iOS Engineer | ARKit & CoreML | Ex-Apple',
                            ]},
                            { spec: 'Students & Early Career', examples: [
                                'CS Student | Full-Stack Developer | React & Node.js | Open Source Contributor',
                                'Software Engineering Intern @ Google | Python & ML | Stanford CS 2026',
                                'Junior Developer | TypeScript & React | Building Side Projects',
                                'Computer Science Graduate | Backend Developer | Python, Django & AWS',
                            ]},
                        ].map((section, i) => (
                            <div key={i} className="mb-10">
                                <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">{section.spec}</h3>
                                <div className="space-y-2">
                                    {section.examples.map((ex, j) => (
                                        <div key={j} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium">{ex}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Headlines to Avoid as a Software Engineer</h2>
                        <div className="space-y-2">
                            {[
                                { bad: 'Software Engineer', why: 'Too generic. 5M+ people share this exact headline. Add your specialization and tech stack.' },
                                { bad: 'Coder | Tech Enthusiast | Problem Solver', why: 'Buzzwords without specificity. Recruiters search for technologies, not personality traits.' },
                                { bad: 'SDE-2 at [Company]', why: 'Internal levels mean nothing to external recruiters. Use industry-standard titles.' },
                                { bad: 'Passionate about building things', why: 'Describes every engineer. State what you build and with what tools.' },
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
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Tech Keywords Recruiters Search For</h2>
                        <p className="mb-4">Include at least 2–3 of these in your headline and skills section based on your stack:</p>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'TypeScript', 'Node.js', 'Python', 'Java', 'Go', 'Rust', 'AWS', 'Kubernetes', 'Docker', 'PostgreSQL', 'GraphQL', 'Next.js', 'Django', 'Spring Boot', 'TensorFlow', 'PyTorch', 'CI/CD', 'Terraform', 'Swift', 'Kotlin', 'Flutter', 'Vue.js', 'MongoDB', 'Redis'].map((tech, i) => (
                                <span key={i} className="text-xs bg-[#F8FAFC] border border-gray-200 px-2.5 py-1 rounded-md text-[#0A0F1C] font-medium">{tech}</span>
                            ))}
                        </div>
                        <p className="mt-4">For a complete keyword strategy, read our <Link href="/linkedin-keywords-guide" className="text-[#0A66C2] hover:underline">LinkedIn Keywords Guide</Link>.</p>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'Should I list my tech stack in my headline?', a: 'Yes, include your top 2–3 technologies. Recruiters filter by specific technologies. "React & TypeScript" in your headline directly impacts whether you appear in search results.' },
                                { q: 'Should I include my company name?', a: 'If your company is well-known, yes — it adds credibility. If not, use the space for your specialization or a value statement instead.' },
                                { q: 'How specific should I be?', a: 'As specific as possible while remaining accurate. "Frontend Engineer | React & TypeScript" is far more effective than "Software Developer" for recruiter searches.' },
                                { q: 'Can LinkedInRank score my engineering headline?', a: 'Yes. LinkedInRank evaluates headline clarity, keyword presence, and professional positioning. Upload your LinkedIn PDF for a free analysis.' },
                            ].map((item, i) => (
                                <div key={i} className="border-b border-gray-100 pb-4">
                                    <h3 className="text-sm font-bold text-[#0A0F1C] mb-1">{item.q}</h3>
                                    <p className="text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Get your headline scored</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF for a free headline analysis plus 3 AI-generated alternatives.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Headline — It's Free</Link>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'For MBA Students', href: '/linkedin-headline-mba' },
                                { label: 'For Marketers', href: '/linkedin-headline-marketers' },
                                { label: 'For Designers', href: '/linkedin-headline-designers' },
                                { label: 'Keywords Guide', href: '/linkedin-keywords-guide' },
                                { label: 'For Students', href: '/for-students' },
                                { label: 'Recruiter Psychology', href: '/recruiter-psychology' },
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
                        <Link href="/linkedin-optimization-guide" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Optimization Guide</Link>
                    </nav>
                </div>
            </footer>
        </main>
    )
}
