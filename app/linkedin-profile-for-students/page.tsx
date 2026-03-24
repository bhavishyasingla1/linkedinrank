import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'

export const metadata: Metadata = {
    title: 'LinkedIn for Students (2026): 31 Profile Examples That Land Internships',
    description: 'Students: Build a LinkedIn that gets internship offers. 31 examples, templates for 0-experience profiles. Free AI scoring tool.',
    keywords: 'linkedin profile for students, linkedin headline for students, student linkedin profile, how to build linkedin profile as student, linkedin for college students, linkedin profile tips for students, student linkedin headline examples, linkedin fresh graduate',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-profile-for-students' },
    openGraph: {
        title: 'LinkedIn Profile for Students: Complete Guide (2026)',
        description: 'Build a strong LinkedIn profile as a student. Headline examples, about section templates, and optimization tips for students with no experience.',
        url: 'https://linkedinrank.com/linkedin-profile-for-students',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'LinkedIn Profile for Students: Complete Guide to Stand Out in 2026',
            description: 'Step-by-step guide for students to build a professional LinkedIn profile that attracts recruiters and internship opportunities.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-profile-for-students',
            datePublished: '2026-02-01',
            dateModified: '2026-02-23',
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
                { '@type': 'ListItem', position: 2, name: 'For Students', item: 'https://linkedinrank.com/for-students' },
                { '@type': 'ListItem', position: 3, name: 'Student Profile Guide', item: 'https://linkedinrank.com/linkedin-profile-for-students' },
            ],
        },
        {
            '@type': 'HowTo',
            name: 'How to Build a LinkedIn Profile as a Student',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Set a professional headline', text: 'Use the formula: [Major] Student at [University] | [Interest/Skill Area]. Example: "Computer Science Student at MIT | Aspiring Software Engineer | Python, Java"' },
                { '@type': 'HowToStep', position: 2, name: 'Write a compelling About section', text: 'Write 150-200 words in first person covering what you study, what excites you, relevant coursework or projects, and what you are looking for.' },
                { '@type': 'HowToStep', position: 3, name: 'Fill the Experience section', text: 'Include internships, part-time jobs, volunteer work, and significant academic projects. Use action verbs and outcomes even for non-professional roles.' },
                { '@type': 'HowToStep', position: 4, name: 'Add Skills and Coursework', text: 'List 10-20 skills covering both technical (programming languages, tools) and transferable skills (leadership, communication). Add relevant coursework in your Education section.' },
                { '@type': 'HowToStep', position: 5, name: 'Get your LinkedIn score', text: 'Upload your LinkedIn PDF to LinkedInRank for a free score out of 100 with personalized recommendations adapted to student career stage.' },
            ],
        },
    ],
}

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'Should students have a LinkedIn profile?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. LinkedIn is the primary platform where recruiters search for interns and entry-level candidates. Having a strong profile before graduation positions you ahead of most peers. Start building your LinkedIn during your sophomore year at the latest.' } },
        { '@type': 'Question', name: 'What should a student put in their LinkedIn headline?', acceptedAnswer: { '@type': 'Answer', text: 'Use: [Major] Student at [University] | [Skill Area or Career Interest]. Example: "Marketing Student at NYU | Digital Strategy & Content Creation | Seeking Summer 2026 Internship". Avoid just putting "Student" — be specific about your field and goals.' } },
        { '@type': 'Question', name: 'How do I fill my LinkedIn profile with no work experience?', acceptedAnswer: { '@type': 'Answer', text: 'Use academic projects, volunteer work, student organizations, hackathons, competitions, and coursework. These all demonstrate skills and initiative. Frame each entry with action verbs and outcomes just like professional experience.' } },
        { '@type': 'Question', name: 'What skills should students add on LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: 'Add 10-20 skills including: technical skills from coursework (programming languages, design tools), research skills, and transferable skills (teamwork, public speaking, project management). Prioritize skills relevant to your target career.' } },
        { '@type': 'Question', name: 'Should students connect with recruiters on LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Send personalized connection requests mentioning shared interests, their company, or a specific job posting. Keep messages concise — 2-3 sentences maximum. Most recruiters on LinkedIn are open to connecting with engaged students.' } },
        { '@type': 'Question', name: 'When should students start building their LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: 'Start by sophomore year. This gives you time to build connections, share content, and develop a presence before internship recruiting begins. However, even starting as a senior or fresh graduate is valuable — it is never too late.' } },
        { '@type': 'Question', name: 'How is LinkedInRank different for students?', acceptedAnswer: { '@type': 'Answer', text: 'LinkedInRank automatically detects student career stage and calibrates scoring expectations accordingly. Students are not penalized for limited experience — instead, the tool evaluates how well students leverage their coursework, projects, and extracurriculars.' } },
        { '@type': 'Question', name: 'Do I need a professional photo for LinkedIn as a student?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Profiles with photos get 21x more views. You do not need a studio headshot — a well-lit photo against a clean background taken on your phone is sufficient. Dress in what you would wear to an internship interview.' } },
    ],
}

const STUDENT_HEADLINE_EXAMPLES = [
    'Computer Science Student at MIT | Aspiring Software Engineer | Python, Java, Machine Learning',
    'Marketing Major at NYU | Digital Strategy & Content Creation | Seeking Summer 2026 Internship',
    'Finance Student at Wharton | Investment Banking & Financial Modeling | Bloomberg Terminal Certified',
    'Mechanical Engineering Student at Georgia Tech | Robotics & CAD Design | SolidWorks, MATLAB',
    'Data Science Student at UC Berkeley | Machine Learning & Analytics | Python, SQL, Tableau',
    'Business Administration Major at Michigan Ross | Entrepreneurship & Venture Capital | Startup Co-Founder',
    'Psychology Student at Stanford | UX Research & Human-Computer Interaction | Aspiring Product Researcher',
    'Communications Major at USC | Social Media Marketing & Brand Strategy | 10K+ Instagram Growth',
    'Biomedical Engineering Student at Johns Hopkins | Medical Device Innovation | Research Published',
    'Economics Student at LSE | Public Policy & Data Analysis | Goldman Sachs Incoming Intern',
    'Graphic Design Student at RISD | Brand Identity & UI/UX | Figma, Illustrator, Photoshop',
    'Chemical Engineering Student at UT Austin | Sustainable Energy & Process Optimization | Lab Research',
    'Pre-Med Student at UCLA | Healthcare Innovation & Global Health | Research Assistant',
    'Civil Engineering Major at Purdue | Structural Design & Project Management | AutoCAD, Revit',
    'English Literature Student at Columbia | Content Writing & Editorial | Published in 3 Publications',
    'Information Systems Major at CMU | Cybersecurity & Cloud Architecture | AWS Certified',
    'Political Science Student at Georgetown | International Relations & Policy Research | Fluent in Mandarin',
    'Supply Chain Management Student at Michigan State | Operations & Logistics | Six Sigma Green Belt',
    'Architecture Student at Cooper Union | Sustainable Design & Urban Planning | Rhino, AutoCAD',
    'Journalism Student at Northwestern | Investigative Reporting & Multimedia Storytelling | Podcast Creator',
]

const PROFILE_SECTIONS = [
    {
        title: 'Headline',
        points: '20 pts',
        why: 'Your headline is the first thing recruiters see. As a student, it should communicate what you study, where, and what you are interested in.',
        template: '[Major] Student at [University] | [Skill/Interest Area] | [Goal or Credential]',
        tips: [
            'Include your major and university name for credibility',
            'Add 1-2 keywords related to your target career',
            'Mention specific skills or certifications if you have them',
            'Keep it under 120 characters for full search visibility',
        ],
    },
    {
        title: 'About Section',
        points: '20 pts',
        why: 'Your About section tells your story and helps recruiters understand your potential. This is where students can shine despite limited experience.',
        template: '[Who you are and what excites you] → [Relevant coursework, projects, or experiences] → [What you are looking for]',
        tips: [
            'Write in first person — "I am studying..." not "John is a student..."',
            'Open with a hook that shows passion or achievement',
            'Mention 2-3 specific projects, coursework, or skills',
            'End with what you are seeking (internship, full-time, mentorship)',
            'Target 150-200 words — concise but substantive',
        ],
    },
    {
        title: 'Experience',
        points: '25 pts',
        why: 'Even without full-time jobs, students can fill this section with internships, part-time work, volunteer roles, teaching assistantships, and leadership positions.',
        template: 'Not just "did tasks" — show impact: [Action verb] + [What you did] + [Outcome or scale]',
        tips: [
            'Include internships, part-time jobs, and volunteer work',
            'Add leadership roles in student organizations',
            'Include significant academic projects under "Projects"',
            'Frame everything with action verbs and outcomes',
            'Even small achievements count — "Organized a 50-person workshop" shows initiative',
        ],
    },
    {
        title: 'Skills',
        points: '15 pts',
        why: 'LinkedIn matches your skills to recruiter searches. Having the right skills listed is essential for being found.',
        template: 'Mix technical skills (from coursework) with transferable skills (from activities)',
        tips: [
            'Add 10-20 skills — enough to cover your profile but not so many they become unfocused',
            'Include programming languages, design tools, or other technical skills from coursework',
            'Add transferable skills: teamwork, public speaking, project management',
            'Ask classmates and professors for skill endorsements',
            'Prioritize skills that appear in job postings for your target role',
        ],
    },
    {
        title: 'Education',
        points: '10 pts',
        why: 'For students, this is your strongest section. Make the most of it.',
        template: '[University] → [Degree, Major] → [GPA if strong] → [Relevant Coursework] → [Activities & Societies]',
        tips: [
            'Include your GPA if it is 3.5+ (or equivalent)',
            'List relevant coursework — this helps with keyword matching',
            'Add honors, scholarships, and dean\'s list recognition',
            'Include student clubs, societies, and leadership positions',
            'Add study abroad experiences if applicable',
        ],
    },
]

const STUDENT_CHECKLIST = [
    { text: 'Professional-looking profile photo (clean background, good lighting, interview-appropriate attire)', done: false },
    { text: 'Headline includes your major, university, and target career area', done: false },
    { text: 'About section is 150-200 words in first person', done: false },
    { text: 'At least 2 entries in Experience (internships, volunteer, projects)', done: false },
    { text: '10-20 skills listed, mixing technical and transferable', done: false },
    { text: 'Education section is complete with degree, major, GPA (if strong), and coursework', done: false },
    { text: 'Custom LinkedIn URL is set (linkedin.com/in/yourname)', done: false },
    { text: 'At least 50 connections (classmates, professors, industry contacts)', done: false },
    { text: 'Banner image is uploaded (university, project, or professional theme)', done: false },
    { text: 'At least 1 recommendation from a professor, mentor, or supervisor', done: false },
]

const STUDENT_MISTAKES = [
    { mistake: 'Headline says only "Student at [University]"', fix: 'Add your major and target area: "Computer Science Student at MIT | Aspiring Software Engineer | Python, Java"' },
    { mistake: 'Empty About section', fix: 'Write 150-200 words about what you study, projects you have worked on, and what you are looking for.' },
    { mistake: 'No Experience section because "I have no experience"', fix: 'Include academic projects, volunteer work, student clubs, part-time jobs — they all count.' },
    { mistake: 'Profile photo is a selfie or party picture', fix: 'Use a well-lit, clean-background photo. Business casual or smart casual is fine for students.' },
    { mistake: 'Only connected with 10-20 people', fix: 'Connect with classmates, professors, alumni, and professionals in your target industry. Aim for 100+ connections.' },
    { mistake: 'Never posting or engaging on LinkedIn', fix: 'Share coursework insights, project learnings, or article reflections once a week. Comments count too.' },
]

export default function LinkedInProfileForStudentsPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />
            <Script id="jsonld-students" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Script id="jsonld-students-faq" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-8">
                    <Link href="/" className="hover:text-[#0A66C2] no-underline transition-colors">Home</Link>
                    <span>›</span>
                    <Link href="/linkedin-profile-for-students" className="hover:text-[#0A66C2] no-underline transition-colors">For Students</Link>
                    <span>›</span>
                    <span className="text-[#0A0F1C] font-medium">Student Profile Guide</span>
                </nav>

                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Student Guide</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">LinkedIn Profile for Students: Complete Guide (2026)</h1>

                {/* Intro */}
                <p className="text-[15px] text-[#4B5563] mb-12 leading-relaxed max-w-2xl">
                    Most students treat LinkedIn as an afterthought — something to set up weeks before graduation. That is a mistake. <strong className="text-[#0A0F1C]">76% of hiring managers say they check LinkedIn before interviewing a candidate</strong>, including for internships. The good news: you do not need years of work experience to build a strong LinkedIn profile. You need to know what to put where, how to frame your academic experience, and which sections matter most. This guide shows you exactly how, with specific examples, templates, and a checklist built for students. Plus, use <Link href="/" className="text-[#0A66C2] underline decoration-[#DBEAFE] hover:decoration-[#0A66C2] transition-colors">LinkedInRank&apos;s free profile scorer</Link> — it is calibrated for students and will not penalize you for limited professional experience.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    {/* Section 1: Why LinkedIn matters for students */}
                    <section aria-labelledby="why">
                        <h2 id="why" className="text-2xl font-bold text-[#0A0F1C] mb-6">Why LinkedIn Matters for Students</h2>
                        <div className="space-y-3">
                            {[
                                { title: 'Recruiters search LinkedIn for interns', desc: 'Over 90% of recruiters use LinkedIn to find candidates, including for internships and entry-level roles. If your profile does not exist or is incomplete, you are invisible to them.' },
                                { title: 'First impressions before interviews', desc: 'Hiring managers check your LinkedIn before meeting you. A polished profile builds credibility and shows professionalism before you walk in the door.' },
                                { title: 'Networking that compounds', desc: 'Every connection, comment, and interaction on LinkedIn builds your professional network. Starting in college gives you a 4-year head start over peers who wait until graduation.' },
                                { title: 'Alumni and mentor access', desc: 'LinkedIn is the best tool for finding alumni from your university who work at companies you target. These connections are more likely to respond to students from their alma mater.' },
                                { title: 'LinkedInRank adapts to students', desc: 'LinkedInRank automatically detects student career stage and adjusts expectations. You will not be evaluated the same as a 10-year professional — your score reflects how well you leverage what you have.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.title}</p>
                                    <p className="text-sm text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 2: Profile Sections Guide */}
                    <section aria-labelledby="sections">
                        <h2 id="sections" className="text-2xl font-bold text-[#0A0F1C] mb-6">Building Each Section of Your Profile</h2>
                        <div className="space-y-6">
                            {PROFILE_SECTIONS.map((section, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-bold text-[#0A0F1C]">{section.title}</h3>
                                        <span className="text-xs font-bold text-[#0A66C2] bg-[#EFF6FF] px-2 py-1 rounded-full">{section.points}</span>
                                    </div>
                                    <p className="text-sm text-[#4B5563] mb-3">{section.why}</p>
                                    <div className="bg-[#F8FAFC] rounded-lg px-3 py-2 mb-3">
                                        <p className="text-xs text-[#6B7280]"><span className="font-medium">Template:</span> {section.template}</p>
                                    </div>
                                    <ul className="space-y-1.5">
                                        {section.tips.map((tip, j) => (
                                            <li key={j} className="flex items-start gap-2">
                                                <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                                <span className="text-xs text-[#4B5563]">{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 3: Student Headline Examples */}
                    <section aria-labelledby="headlines">
                        <h2 id="headlines" className="text-2xl font-bold text-[#0A0F1C] mb-6">20 LinkedIn Headline Examples for Students</h2>
                        <div className="space-y-1.5">
                            {STUDENT_HEADLINE_EXAMPLES.map((h, i) => (
                                <div key={i} className="flex items-start gap-2.5 bg-[#F8FAFC] border border-gray-100 rounded-lg px-3.5 py-2.5">
                                    <span className="text-xs text-[#6B7280] font-mono tabular-nums shrink-0 mt-0.5 w-5 text-right">{i + 1}.</span>
                                    <p className="text-sm text-[#0A0F1C]">{h}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-[#6B7280] mt-4">Need more options? Use our <Link href="/tools/linkedin-headline-generator" className="text-[#0A66C2] underline decoration-[#DBEAFE] hover:decoration-[#0A66C2] transition-colors">free AI headline generator</Link> to create headlines tailored to your specific major and career goals.</p>
                    </section>

                    {/* Section 4: Student Checklist */}
                    <section aria-labelledby="checklist">
                        <h2 id="checklist" className="text-2xl font-bold text-[#0A0F1C] mb-6">Student LinkedIn Profile Checklist</h2>
                        <div className="space-y-2">
                            {STUDENT_CHECKLIST.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-[#F8FAFC] border border-gray-200 rounded-lg p-3">
                                    <div className="w-5 h-5 rounded border-2 border-gray-300 shrink-0 mt-0.5" />
                                    <p className="text-sm text-[#4B5563]">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 5: Common Mistakes */}
                    <section aria-labelledby="mistakes">
                        <h2 id="mistakes" className="text-2xl font-bold text-[#0A0F1C] mb-6">Mistakes Students Make on LinkedIn</h2>
                        <div className="space-y-3">
                            {STUDENT_MISTAKES.map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-4 h-4 text-red-400 shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                        <div>
                                            <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.mistake}</p>
                                            <p className="text-sm text-[#4B5563]"><span className="text-emerald-600 font-medium">Fix:</span> {item.fix}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Tool CTA */}
                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-3">Get your student LinkedIn score</h2>
                        <p className="text-sm text-[#4B5563] mb-2 max-w-md mx-auto">LinkedInRank is calibrated for students — you will not be penalized for limited experience. See exactly where to improve.</p>
                        <p className="text-xs text-[#6B7280] mb-5">Free · No login · Career-stage adaptive · Under 60 seconds</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Get Your Free Student Score</Link>
                    </div>

                    {/* FAQs */}
                    <section aria-labelledby="faq">
                        <h2 id="faq" className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                { q: 'Should students have a LinkedIn profile?', a: 'Absolutely. LinkedIn is the primary platform where recruiters search for interns and entry-level candidates. Start building during your sophomore year at the latest.' },
                                { q: 'What should a student put in their headline?', a: 'Use: [Major] Student at [University] | [Career Interest]. Example: "Marketing Student at NYU | Digital Strategy & Content Creation | Seeking Summer 2026 Internship"' },
                                { q: 'How do I fill my profile with no experience?', a: 'Use academic projects, volunteer work, student organizations, hackathons, and coursework. Frame each with action verbs and outcomes.' },
                                { q: 'What skills should students add?', a: 'Mix technical skills from coursework with transferable skills. 10-20 skills covering programming, tools, teamwork, and communication.' },
                                { q: 'Should I connect with recruiters?', a: 'Yes. Send personalized requests mentioning shared interests or specific roles. Keep it to 2-3 sentences.' },
                                { q: 'When should I start building my LinkedIn?', a: 'Sophomore year ideally. This gives you time to build connections before internship recruiting begins.' },
                                { q: 'How is LinkedInRank different for students?', a: 'It detects student career stage and calibrates expectations. You are evaluated on how well you leverage coursework and projects, not years of professional experience.' },
                                { q: 'Do I need a professional photo?', a: 'Yes — profiles with photos get 21x more views. A well-lit phone photo against a clean background is sufficient.' },
                            ].map((item, i) => (
                                <details key={i} className="group bg-white border border-gray-200 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-bold text-[#0A0F1C] list-none">
                                        {item.q}
                                        <svg className="w-4 h-4 text-[#6B7280] group-open:rotate-180 transition-transform shrink-0 ml-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                    </summary>
                                    <p className="px-4 pb-4 text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Internal Links */}
                    <RelatedPages currentSlug="linkedin-profile-for-students" />
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
