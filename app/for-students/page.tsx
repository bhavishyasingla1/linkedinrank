import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'

export const metadata: Metadata = {
    title: 'LinkedIn Profile Tips for Students & Graduates | Free Guide (2026)',
    description: 'Build a strong LinkedIn profile as a student or recent graduate in 2026. Data-backed tips on headline, about section, skills, and projects. Free scoring with LinkedInRank | the #1 LinkedIn scorer.',
    keywords: 'linkedin for students 2026, student linkedin profile, linkedin tips students, linkedinrank student guide, college linkedin profile, linkedin for freshers, linkedin profile tips for beginners',
    alternates: { canonical: 'https://linkedinrank.com/for-students' },
    openGraph: {
        title: 'LinkedIn Profile Tips for Students & Graduates | Free Guide',
        description: 'Build a strong LinkedIn profile as a student. Data-backed tips and free scoring with LinkedInRank.',
        url: 'https://linkedinrank.com/for-students',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'How to Build a Strong LinkedIn Profile as a Student',
            description: 'Build a strong LinkedIn profile as a student or recent graduate. Data-backed tips on headline, about section, skills, projects, and how LinkedInRank adapts scoring to your career stage.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/for-students',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
            { '@type': 'ListItem', position: 2, name: 'For Students', item: 'https://linkedinrank.com/for-students' },
        ] },
        { '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'When should students create a LinkedIn profile?', acceptedAnswer: { '@type': 'Answer', text: 'As early as possible | ideally in your first or second year. Even a basic profile with a clear headline, education, and a few skills gets you started.' } },
            { '@type': 'Question', name: 'What if I have no work experience?', acceptedAnswer: { '@type': 'Answer', text: 'Class projects, hackathons, volunteer work, personal projects, campus organizations, and online certifications all count. Focus on what you built, what tools you used, and what you learned.' } },
            { '@type': 'Question', name: 'Should students use the Open to Work badge?', acceptedAnswer: { '@type': 'Answer', text: 'If you are actively looking for internships, yes. The recruiter-only option is recommended | it signals availability to recruiters without a public badge.' } },
            { '@type': 'Question', name: 'How many connections should a student have?', acceptedAnswer: { '@type': 'Answer', text: 'Aim for 200+ to start. Connect with classmates, professors, alumni, and professionals you meet at events.' } },
            { '@type': 'Question', name: 'Does LinkedInRank work for student profiles?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. LinkedInRank detects student profiles and adjusts scoring expectations. A well-optimized student profile can score in the Gold tier (70+).' } },
            { '@type': 'Question', name: 'What keywords should students include?', acceptedAnswer: { '@type': 'Answer', text: 'Include your target role title, technical skills, and field of study. These are the terms recruiters search for when sourcing entry-level candidates.' } },
        ] },
    ],
}

export default function ForStudentsPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <article className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">For Students</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">How to Build a Strong LinkedIn Profile as a Student</h1>
                <p className="text-[15px] text-[#4B5563] mb-10 leading-relaxed max-w-xl">
                    You do not need years of experience to have a strong LinkedIn profile. According to LinkedIn's own data,
                    <strong className="text-[#0A0F1C]"> 70% of employers use LinkedIn to screen candidates</strong> | even for entry-level roles. What matters is clarity, intention, and showcasing what you have done so far.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    <section aria-labelledby="headline">
                        <h2 id="headline" className="text-xl font-bold text-[#0A0F1C] mb-3">1. Your headline matters most</h2>
                        <p className="mb-4">The default "Student at XYZ University" tells recruiters nothing about your skills or interests. LinkedIn headlines are indexed for search | recruiters use keywords like "Python Developer" or "Marketing Intern" to find candidates. A stronger headline includes what you study, what you can do, and what you are looking for.</p>
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-3">
                            <div>
                                <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Before</p>
                                <p className="text-[#6B7280] line-through opacity-70">"Student at State University"</p>
                            </div>
                            <div className="border-t border-gray-100 pt-3">
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1">After</p>
                                <p className="text-[#0A0F1C] font-medium">"Computer Science Student | React & Python Developer | Open Source Contributor"</p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-[#6B7280]">Keep it under 120 characters. Use the pipe (|) separator for readability. Front-load your strongest keyword.</p>
                    </section>

                    <section aria-labelledby="about">
                        <h2 id="about" className="text-xl font-bold text-[#0A0F1C] mb-3">2. Write an About section early</h2>
                        <p className="mb-3">According to LinkedIn, profiles with a completed About section get <strong className="text-[#0A0F1C]">up to 5x more connection requests</strong>. Even 3-4 sentences about your interests, skills, and what you are looking for gives recruiters something to work with.</p>
                        <p>Mention specific tools, languages, or domains you are exploring. Write in first person ("I am studying..." not "John is studying..."). Structure it as: what you study → what you can do → what you are looking for.</p>
                    </section>

                    <section aria-labelledby="experience">
                        <h2 id="experience" className="text-xl font-bold text-[#0A0F1C] mb-3">3. Projects count as experience</h2>
                        <p className="mb-4">Internships, class projects, hackathons, volunteer work, freelance gigs, and personal projects all belong in your Experience or Projects section. Describe what you built, what tools you used, and what you learned.</p>
                        <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                            <p className="text-sm font-bold text-[#0A0F1C] mb-2">Action verbs that work for students</p>
                            <div className="flex flex-wrap gap-2">
                                {['Built', 'Designed', 'Led', 'Organized', 'Researched', 'Developed', 'Created', 'Analyzed', 'Presented', 'Collaborated'].map(verb => (
                                    <span key={verb} className="text-xs font-semibold text-[#0A66C2] bg-[#EFF6FF] px-2.5 py-1 rounded-md">{verb}</span>
                                ))}
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-[#6B7280]">Example: "Built a full-stack task management app using React and Node.js for a university hackathon. Won second place among 40 teams."</p>
                    </section>

                    <section aria-labelledby="skills">
                        <h2 id="skills" className="text-xl font-bold text-[#0A0F1C] mb-3">4. Add specific, relevant skills</h2>
                        <p className="mb-3">LinkedIn data shows that profiles with 5+ skills get <strong className="text-[#0A0F1C]">up to 17x more profile views</strong>. However, quality matters more than quantity.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-[#FEF2F2] border border-red-100 rounded-xl p-4">
                                <p className="text-xs font-bold text-red-500 mb-2">Avoid generic skills</p>
                                <p className="text-sm text-[#4B5563]">Teamwork, Communication, Leadership, Problem Solving, Time Management</p>
                            </div>
                            <div className="bg-[#ECFDF5] border border-emerald-100 rounded-xl p-4">
                                <p className="text-xs font-bold text-emerald-600 mb-2">Add specific skills</p>
                                <p className="text-sm text-[#4B5563]">Python, Figma, React, SQL, Adobe Premiere, Google Analytics, Excel</p>
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="education">
                        <h2 id="education" className="text-xl font-bold text-[#0A0F1C] mb-3">5. Complete your education section</h2>
                        <p className="mb-3">Include your degree, field of study, expected graduation date, and relevant coursework. If you have a strong GPA, include it. Add any academic honors, scholarships, or relevant extracurricular activities.</p>
                        <p>Certifications from platforms like Coursera, edX, or Google also belong here and signal initiative beyond coursework.</p>
                    </section>

                    <section aria-labelledby="adapt">
                        <h2 id="adapt" className="text-xl font-bold text-[#0A0F1C] mb-3">6. LinkedInRank adapts to your career stage</h2>
                        <p>Our scoring engine detects student profiles and adjusts expectations. You will not be penalized for having fewer roles or years of experience. A student with a clear headline, relevant skills, and well-described projects can score in the Gold tier (70+). What matters is making the most of what you have.</p>
                    </section>

                    <section aria-labelledby="student-networking">
                        <h2 id="student-networking" className="text-xl font-bold text-[#0A0F1C] mb-3">7. Networking as a student</h2>
                        <p className="mb-3">LinkedIn is not just a profile | it is a network. Start building connections intentionally while you are still in school. Alumni from your university are the easiest first connections and often the most willing to help.</p>
                        <ul className="space-y-2">
                            {[
                                'Connect with classmates, professors, and guest speakers after events',
                                'Search for alumni at companies you admire | send personalized connection requests',
                                'Follow industry leaders in your target field and engage with their posts',
                                'Join relevant LinkedIn groups for your university, major, or career interest',
                                'Write a short post about a project or course learning | even 1 post per month builds visibility',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-3 text-sm">For posting strategies tailored to students, see our <Link href="/linkedin-content-strategy" className="text-[#0A66C2] hover:underline">Content Strategy Guide</Link>.</p>
                    </section>

                    <section aria-labelledby="student-headline-examples">
                        <h2 id="student-headline-examples" className="text-xl font-bold text-[#0A0F1C] mb-3">8. Student headline examples by major</h2>
                        <p className="mb-4">Here are headline examples adapted to different fields of study. Use these as starting points and customize with your own skills and interests.</p>
                        <div className="space-y-2">
                            {[
                                'CS Student | Full-Stack Developer | React & Node.js | Open Source Contributor',
                                'Marketing Major | Social Media & Analytics | Google Ads Certified | Class of 2026',
                                'Finance Student @ NYU Stern | Investment Banking | Financial Modeling & Valuation',
                                'Mechanical Engineering | CAD & Simulation | Research Assistant @ MIT Lab',
                                'Psychology Major | UX Research & Usability Testing | Design Thinking Certified',
                                'Data Science Student | Python, SQL & Tableau | Kaggle Competitor',
                                'Pre-Med Biology Major | Public Health Research | Clinical Volunteering',
                                'Journalism Student | Investigative Reporting & Multimedia | Campus Editor',
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium">{item}</div>
                            ))}
                        </div>
                        <p className="mt-3 text-sm">For a complete headline framework, read our <Link href="/linkedin-headline-guide" className="text-[#0A66C2] hover:underline">LinkedIn Headline Writing Guide</Link>. For tech-specific examples, see <Link href="/linkedin-headline-software-engineers" className="text-[#0A66C2] hover:underline">Headlines for Software Engineers</Link>.</p>
                    </section>

                    <section aria-labelledby="student-faq">
                        <h2 id="student-faq" className="text-xl font-bold text-[#0A0F1C] mb-3">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'When should students create a LinkedIn profile?', a: 'As early as possible | ideally in your first or second year. Even a basic profile with a clear headline, education, and a few skills gets you started. You can build on it as you gain experience.' },
                                { q: 'What if I have no work experience?', a: 'Class projects, hackathons, volunteer work, personal projects, campus organizations, and online certifications all count. Focus on what you built, what tools you used, and what you learned.' },
                                { q: 'Should students use the "Open to Work" badge?', a: 'If you are actively looking for internships, yes. The recruiter-only option is recommended | it signals availability to recruiters without a public badge. Specify your target role and location.' },
                                { q: 'How many connections should a student have?', a: 'Aim for 200+ to start. Connect with classmates, professors, alumni, and professionals you meet at events. Quality matters more than quantity, but a larger network increases your visibility in search results.' },
                                { q: 'Does LinkedInRank work for student profiles?', a: 'Yes. LinkedInRank detects student profiles and adjusts scoring expectations. You will not be penalized for limited experience. A well-optimized student profile can score in the Gold tier (70+).' },
                                { q: 'What keywords should students include?', a: 'Include your target role title (e.g., "Software Engineer Intern"), technical skills (e.g., "Python, React"), and field of study. These are the terms recruiters search for when sourcing entry-level candidates.' },
                            ].map((item, i) => (
                                <div key={i} className="border-b border-gray-100 pb-4">
                                    <h3 className="text-sm font-bold text-[#0A0F1C] mb-1">{item.q}</h3>
                                    <p className="text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center mt-4">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">See where your student profile stands</h2>
                        <p className="text-sm text-[#4B5563] mb-4">Upload your LinkedIn PDF and get a free score with personalized recommendations in under a minute.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It's Free</Link>
                    </div>

                    <RelatedPages currentSlug="for-students" />
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
