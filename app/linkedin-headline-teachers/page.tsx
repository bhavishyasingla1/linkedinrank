import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
    title: 'Best LinkedIn Headlines for Educators & Teachers | 25+ Examples (2026)',
    description: 'LinkedIn headline examples for teachers, professors, instructional designers, and EdTech professionals in 2026. Headlines that showcase expertise. Free scoring with LinkedInRank.',
    keywords: 'linkedin headline teacher 2026, linkedin headline professor, best linkedin headline for educator, instructional designer linkedin headline, education linkedin profile, best educator linkedin headline',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-teachers' },
    openGraph: {
        title: 'Best LinkedIn Headlines for Educators & Teachers | 25+ Examples',
        description: 'Teacher, professor, and EdTech professional headline formulas that showcase expertise.',
        url: 'https://linkedinrank.com/linkedin-headline-teachers',
    },
}

export default function HeadlineTeachersPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

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
                            <p className="text-sm text-[#4B5563] text-center">Go beyond &ldquo;Teacher&rdquo; | highlight your subject, impact, and what you bring to the table.</p>
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
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Headline | It's Free</Link>
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

            <SiteFooter />
        </main>
    )
}
