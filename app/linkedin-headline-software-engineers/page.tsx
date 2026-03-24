import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'
import { guidePageJsonLd } from '@/lib/jsonLd'

export const metadata: Metadata = {
    title: '30+ LinkedIn Headlines for Software Engineers (2026 Guide)',
    description: 'Frontend, backend, DevOps, or full-stack? 30+ LinkedIn headline examples that recruiters actually search for.',
    keywords: 'linkedin headline software engineer, linkedin headline developer, best linkedin headline for programmers, linkedin headline for tech, software engineer linkedin profile, developer linkedin tips, linkedin headline examples tech 2026',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-software-engineers' },
    openGraph: {
        title: '30+ LinkedIn Headlines for Software Engineers (2026 Guide)',
        description: 'Frontend, backend, DevOps, or full-stack? 30+ LinkedIn headline examples that recruiters actually search for.',
        url: 'https://linkedinrank.com/linkedin-headline-software-engineers',
    },
}

const jsonLd = guidePageJsonLd({
    title: '30+ LinkedIn Headlines for Software Engineers',
    description: 'LinkedIn headline examples for frontend, backend, full-stack, DevOps, data engineers, and engineering managers.',
    url: 'https://linkedinrank.com/linkedin-headline-software-engineers',
    dateModified: '2026-03-24',
    breadcrumbs: [
        { name: 'Home', url: 'https://linkedinrank.com' },
        { name: 'Headline Guide', url: 'https://linkedinrank.com/linkedin-headline-guide' },
        { name: 'For Software Engineers', url: 'https://linkedinrank.com/linkedin-headline-software-engineers' },
    ],
    faqs: [
        { question: 'Should software engineers list technologies in their headline?', answer: 'Yes. Recruiters search by tech stack. Include your 2-3 primary technologies. "Full-Stack Engineer | React & Node.js" is more searchable than "Software Developer."' },
        { question: 'Should I include my company name?', answer: 'Only if it is a recognized company. "Senior SWE @ Google" adds credibility. If your company is not well-known, use the space for tech stack and specialization instead.' },
        { question: 'How should junior developers write their headline?', answer: 'Lead with your strongest skill, not your seniority. "React Developer | TypeScript | Building Accessible UIs" is better than "Junior Software Developer Looking for Opportunities."' },
        { question: 'Can LinkedInRank analyse engineering profiles?', answer: 'Yes. Upload your LinkedIn PDF for a free headline analysis with keyword scoring and AI-generated alternatives tailored to engineering roles.' },
    ],
})

export default function HeadlineSoftwareEngineersPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5 flex-wrap mb-8">
                    <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                    <span aria-hidden="true">/</span>
                    <Link href="/linkedin-headline-guide" className="hover:text-[#0A66C2] transition-colors no-underline">Headline Guide</Link>
                    <span aria-hidden="true">/</span>
                    <span className="text-[#0A0F1C] font-medium">For Software Engineers</span>
                </nav>
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
                                { q: 'Should I include my company name?', a: 'If your company is well-known, yes | it adds credibility. If not, use the space for your specialization or a value statement instead.' },
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
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Headline | It's Free</Link>
                    </div>

                    <RelatedPages currentSlug="linkedin-headline-software-engineers" />
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
