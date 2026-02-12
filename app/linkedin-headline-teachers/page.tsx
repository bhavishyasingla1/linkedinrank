import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'Best LinkedIn Headlines for Educators & Teachers — 25+ Examples (2026)',
    description: 'LinkedIn headline examples for teachers, professors, instructional designers, and EdTech professionals in 2026. Headlines that showcase expertise. Free scoring with LinkedInRank.',
    keywords: 'linkedin headline teacher 2026, linkedin headline professor, best linkedin headline for educator, instructional designer linkedin headline, education linkedin profile, best educator linkedin headline',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-teachers' },
    openGraph: {
        title: 'Best LinkedIn Headlines for Educators & Teachers — 25+ Examples',
        description: 'Teacher, professor, and EdTech professional headline formulas that showcase expertise.',
        url: 'https://linkedinrank.com/linkedin-headline-teachers',
    },
}

export default function HeadlineTeachersPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader navLinks={[{ href: '/linkedin-headline-guide', label: 'Headline Guide' }]} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Role-Specific Headlines</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">Best LinkedIn Headlines for Educators & Teachers</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Educators are increasingly using LinkedIn for career growth, consulting, speaking, EdTech transitions, and thought leadership. Whether you&apos;re a classroom teacher, professor, or instructional designer, your headline should signal your expertise and aspirations. Here are <strong className="text-[#0A0F1C]">25+ proven examples</strong>.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The Educator Headline Formula</h2>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6 mb-4">
                            <p className="text-lg font-bold text-[#0A0F1C] mb-4 text-center">[Role] | [Subject/Specialty] | [What Makes You Unique]</p>
                            <p className="text-sm text-[#4B5563] text-center">Go beyond &ldquo;Teacher&rdquo; — highlight your subject, impact, and what you bring to the table.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">25+ Headlines by Role</h2>
                        {[
                            { spec: 'K-12 Teachers', examples: [
                                'High School Math Teacher | AP Calculus & Statistics | Curriculum Developer',
                                'Elementary STEM Educator | Project-Based Learning | Google Certified Educator',
                                'English Teacher | Creative Writing & AP Literature | Published Author',
                                'Special Education Teacher | Inclusive Classroom Design | Autism Spectrum Specialist',
                                'Middle School Science Teacher | NGSS & Inquiry-Based Learning | National Board Certified',
                            ]},
                            { spec: 'University Professors & Researchers', examples: [
                                'Associate Professor of Computer Science | AI & Machine Learning Research | 40+ Publications',
                                'Professor of Marketing | Consumer Behavior & Digital Strategy | MBA Faculty',
                                'Assistant Professor | Organizational Psychology | Published in HBR & AMJ',
                                'Adjunct Professor & Industry Practitioner | Finance & Entrepreneurship | MBA, CFA',
                            ]},
                            { spec: 'Instructional Designers & L&D', examples: [
                                'Instructional Designer | E-Learning & Curriculum Development | Articulate & Canvas',
                                'Senior L&D Specialist | Leadership Development & Employee Training | Fortune 500',
                                'Learning Experience Designer | Gamification & Microlearning | EdTech',
                                'Corporate Trainer | Sales Enablement & Onboarding | Trained 5,000+ Employees',
                                'Curriculum Developer | K-12 STEM Programs | Aligning Standards to Real-World Skills',
                            ]},
                            { spec: 'Education Leadership', examples: [
                                'School Principal | Transforming Student Outcomes Through Data-Driven Leadership',
                                'Superintendent | K-12 District Leadership | Equity & Innovation in Education',
                                'Dean of Students | Student Success & Retention | Higher Education',
                                'Director of Academic Programs | Online & Hybrid Learning | University Level',
                            ]},
                            { spec: 'EdTech & Education Entrepreneurs', examples: [
                                'Founder @ [EdTech Company] | Making STEM Accessible to Every Student',
                                'EdTech Product Manager | Building Tools Teachers Actually Use | Ex-Educator',
                                'Education Consultant | Helping Schools Adopt Technology Effectively',
                                'Online Course Creator | Teaching Data Science to 50,000+ Students | Udemy & Coursera',
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
                                { bad: 'Teacher', why: 'What subject? What level? What makes you different from millions of other teachers?' },
                                { bad: 'Educator | Lifelong Learner | Passionate about kids', why: 'All educators are lifelong learners. State your subject, level, and unique expertise.' },
                                { bad: 'Professor at [University]', why: 'Add your field, research focus, and what students or readers should know you for.' },
                                { bad: 'Looking to transition out of education', why: 'Never lead with what you\'re leaving. Lead with the skills you bring to your next role.' },
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
                                { label: 'For Students', href: '/for-students' },
                                { label: 'For Healthcare', href: '/linkedin-headline-healthcare' },
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
                    </nav>
                </div>
            </footer>
        </main>
    )
}
