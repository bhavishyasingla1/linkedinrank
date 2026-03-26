import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'
import { guidePageJsonLd } from '@/lib/jsonLd'

export const metadata: Metadata = {
    title: 'LinkedIn Headlines for Data Scientists (50+ Examples for ML, AI & Analytics)',
    description: 'Copy-paste LinkedIn headline templates for data scientists, ML engineers, data analysts, and AI researchers. 50+ proven examples with tools and domain expertise recruiters search for.',
    keywords: 'linkedin headline data scientist 2026, linkedin headline data analyst, best linkedin headline for ml engineer, linkedin headline ai researcher, data science linkedin profile, best data scientist linkedin headline',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-data-scientists' },
    openGraph: {
        title: '25+ LinkedIn Headlines for Data Scientists (2026 Guide)',
        description: 'ML, NLP, or analytics? Copy 25+ LinkedIn headlines data science recruiters actually search for.',
        url: 'https://linkedinrank.com/linkedin-headline-data-scientists',
    },
}

const jsonLd = guidePageJsonLd({
    title: '25+ LinkedIn Headlines for Data Scientists',
    description: 'LinkedIn headline examples for data scientists, data analysts, ML engineers, and AI researchers.',
    url: 'https://linkedinrank.com/linkedin-headline-data-scientists',
    dateModified: '2026-03-24',
    breadcrumbs: [
        { name: 'Home', url: 'https://linkedinrank.com' },
        { name: 'Headline Guide', url: 'https://linkedinrank.com/linkedin-headline-guide' },
        { name: 'For Data Scientists', url: 'https://linkedinrank.com/linkedin-headline-data-scientists' },
    ],
    faqs: [
        { question: 'Should data scientists list all tools in their headline?', answer: 'No. Pick 2-3 core tools and pair them with your domain. "Data Scientist | Python & NLP | FinTech" is more effective than listing 10 tools.' },
        { question: 'How should ML engineers differentiate from data scientists?', answer: 'ML engineers should emphasise production systems and deployment. Mention MLOps, model serving, and system design rather than EDA and analysis.' },
        { question: 'Should I mention "PhD" in my headline?', answer: 'Yes, if in research-oriented roles. For industry, only if the PhD is in a directly relevant field and you are early career.' },
        { question: 'Can LinkedInRank evaluate data science profiles?', answer: 'Yes. Upload your LinkedIn PDF for a free headline analysis with keyword scoring and 3 AI-generated alternatives tailored to data science roles.' },
    ],
})

export default function HeadlineDataScientistsPage() {
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
                    <span className="text-[#0A0F1C] font-medium">For Data Scientists</span>
                </nav>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Role-Specific Headlines</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">50+ LinkedIn Headline Examples for Data Scientists</h1>
                <p className="text-[15px] text-[#4B5563] mb-6 leading-relaxed max-w-2xl">
                    Data science is one of the fastest-growing fields on LinkedIn. Recruiters search for specific tools, techniques, and domain expertise. A headline like &ldquo;Data Scientist&rdquo; blends in with hundreds of thousands of similar profiles. This guide provides <strong className="text-[#0A0F1C]">50+ proven headline examples</strong> by specialization, plus the formula to write your own.
                </p>
                <div className="bg-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-4 mb-14">
                    <p className="text-sm text-[#4B5563] mb-2">Looking for examples from other industries?</p>
                    <Link href="/linkedin-headline-examples" className="text-sm font-semibold text-[#0A66C2] hover:underline">→ View 100+ headline examples for all roles (software engineers, marketers, finance, students, and more)</Link>
                </div>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The Data Scientist Headline Formula</h2>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6 mb-4">
                            <p className="text-lg font-bold text-[#0A0F1C] mb-4 text-center">[Role] | [Tools & Methods] | [Domain or Impact]</p>
                            <p className="text-sm text-[#4B5563] text-center">Specify your methods AND the industry you apply them in.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">25+ Headlines by Specialization</h2>
                        {[
                            { spec: 'Data Scientists', examples: [
                                'Data Scientist | Python, SQL & Machine Learning | FinTech',
                                'Senior Data Scientist | NLP & Deep Learning | Building Search Systems',
                                'Data Scientist | A/B Testing & Causal Inference | E-Commerce Growth',
                                'Lead Data Scientist | Computer Vision & PyTorch | Autonomous Systems',
                                'Data Scientist | Recommendation Systems & ML Ops | Spotify Alum',
                            ]},
                            { spec: 'Data Analysts', examples: [
                                'Data Analyst | SQL, Tableau & Python | Turning Data into Business Decisions',
                                'Senior Data Analyst | Power BI & Advanced Excel | SaaS Metrics',
                                'Business Intelligence Analyst | SQL & Looker | Revenue Analytics',
                                'Data Analyst | Python & Statistical Modeling | Healthcare Analytics',
                            ]},
                            { spec: 'ML & AI Engineers', examples: [
                                'ML Engineer | PyTorch & TensorFlow | Deploying Models at Scale',
                                'AI Engineer | LLMs, RAG & Vector Databases | Building AI Products',
                                'Machine Learning Engineer | Computer Vision & Edge AI | Robotics',
                                'Applied Scientist | NLP & Transformers | Conversational AI',
                                'AI/ML Engineer | MLOps & Feature Stores | Production ML Systems',
                            ]},
                            { spec: 'Research & Academia', examples: [
                                'AI Researcher | Deep Learning & Reinforcement Learning | Published 15+ Papers',
                                'Research Scientist | NLP & Knowledge Graphs | Ex-Google DeepMind',
                                'Ph.D. Candidate | Machine Learning & Causal Inference | Stanford AI Lab',
                                'Postdoctoral Researcher | Computational Biology & ML | Nature Published',
                            ]},
                            { spec: 'Analytics Leadership', examples: [
                                'Head of Data Science | Building Analytics Teams | Series B–D Startups',
                                'Director of Analytics | Product Analytics & Experimentation | 50M+ Users',
                                'VP of Data | Strategy, ML & BI | Scaling Data Orgs from 5 to 50',
                                'Chief Data Officer | Data Strategy & Governance | Fortune 500',
                            ]},
                            { spec: 'Students & Career Changers', examples: [
                                'Data Science Student | Python, SQL & ML | Building Portfolio Projects',
                                'Aspiring Data Scientist | MS Analytics @ Georgia Tech | Python & Tableau',
                                'Career Changer → Data Analyst | SQL, Python & Tableau | Ex-Finance Professional',
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
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Headlines to Avoid</h2>
                        <div className="space-y-2">
                            {[
                                { bad: 'Data Scientist', why: 'Too generic. Hundreds of thousands share this headline. Add your tools, methods, and domain.' },
                                { bad: 'Data Enthusiast | Lifelong Learner', why: 'Describes interest, not capability. Recruiters want to know what you can deliver.' },
                                { bad: 'Python | R | SQL | Tableau | Power BI | Excel | TensorFlow', why: 'A list of tools without context. Explain what you do with them.' },
                                { bad: 'Aspiring Data Scientist', why: 'Undersells your skills. Even as a student, lead with what you can do: "Data Analyst | Python & SQL | Building ML Models"' },
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
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Keywords Recruiters Search For</h2>
                        <div className="flex flex-wrap gap-2">
                            {['Python', 'SQL', 'R', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'Spark', 'Tableau', 'Power BI', 'NLP', 'Computer Vision', 'Deep Learning', 'Machine Learning', 'A/B Testing', 'MLOps', 'Airflow', 'AWS SageMaker', 'LLMs', 'Statistics'].map((tech, i) => (
                                <span key={i} className="text-xs bg-[#F8FAFC] border border-gray-200 px-2.5 py-1 rounded-md text-[#0A0F1C] font-medium">{tech}</span>
                            ))}
                        </div>
                    </section>

                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Get your headline scored</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF for a free headline analysis plus 3 AI-generated alternatives.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Headline | It's Free</Link>
                    </div>

                    <RelatedPages currentSlug="linkedin-headline-data-scientists" />
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
