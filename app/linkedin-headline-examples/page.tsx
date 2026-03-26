import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import { guidePageJsonLd } from '@/lib/jsonLd'

export const metadata: Metadata = {
    title: 'LinkedIn Headline Examples: 100+ Templates for Every Role (2026 Guide)',
    description: 'Copy-paste LinkedIn headline examples for all industries. 100+ proven templates for software engineers, marketers, finance, HR, students, and job seekers. Free headline analyzer included.',
    keywords: 'linkedin headline examples, best linkedin headlines, linkedin headline templates, how to write linkedin headline, linkedin headline for students, linkedin headline for job seekers, professional linkedin headline examples',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-examples' },
    openGraph: {
        title: 'LinkedIn Headline Examples: 100+ Templates for Every Role (2026 Guide)',
        description: 'Copy-paste LinkedIn headline examples for all industries. 100+ proven templates for software engineers, marketers, finance, HR, students, and job seekers.',
        url: 'https://linkedinrank.com/linkedin-headline-examples',
    },
}

const jsonLd = guidePageJsonLd({
    title: 'LinkedIn Headline Examples: 100+ Templates for Every Role',
    description: 'Comprehensive guide with 100+ LinkedIn headline examples for all roles, industries, and career stages. Includes formulas, templates, and best practices.',
    url: 'https://linkedinrank.com/linkedin-headline-examples',
    dateModified: '2026-03-26',
    breadcrumbs: [
        { name: 'Home', url: 'https://linkedinrank.com' },
        { name: 'LinkedIn Headline Examples', url: 'https://linkedinrank.com/linkedin-headline-examples' },
    ],
    faqs: [
        { question: 'What is a good LinkedIn headline?', answer: 'A good LinkedIn headline clearly states your role, includes 2-3 keywords recruiters search for, and shows your value or specialization. It should be under 120 characters for full visibility in search results. Avoid generic titles like "Looking for opportunities" and instead use specific, keyword-rich descriptions like "Full-Stack Engineer | React & Node.js | Building SaaS Products".' },
        { question: 'How do I write a LinkedIn headline?', answer: 'Use this formula: [Role] | [Key Skills/Technologies] | [Industry or Value]. Start with your core role, add 2-3 specific skills or technologies recruiters search for, and finish with your industry focus or the value you deliver. Keep it under 120 characters for maximum visibility.' },
        { question: 'What should a student put in their LinkedIn headline?', answer: 'Students should lead with their area of study and career direction, not just "Student at [University]". Example: "Computer Science Student | ML & Data Science | Python, TensorFlow | Stanford 2026". Include your graduation year, key skills, and the type of roles you are targeting.' },
        { question: 'Should I include keywords in my LinkedIn headline?', answer: 'Yes, absolutely. Recruiters search LinkedIn by keywords. Include 2-3 specific keywords related to your role, skills, or industry. "Frontend Engineer | React & TypeScript" will appear in more relevant searches than just "Software Developer".' },
        { question: 'How long should a LinkedIn headline be?', answer: 'LinkedIn allows up to 220 characters, but only the first 120 characters are visible in search results without clicking. Keep your most important information in the first 120 characters.' },
        { question: 'Can I use emojis in my LinkedIn headline?', answer: 'While LinkedIn allows emojis, they are generally not recommended for professional headlines. They can look unprofessional and may not display correctly across all devices. Focus on clear, keyword-rich text instead.' },
    ],
})

export default function LinkedInHeadlineExamplesPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <article className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
                <div className="mb-12">
                    <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Ultimate Guide</p>
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#0A0F1C] leading-tight mb-6">100+ LinkedIn Headline Examples for Every Role</h1>
                    <p className="text-lg text-[#4B5563] leading-relaxed max-w-3xl">
                        Your LinkedIn headline is the first thing recruiters see in search results. A strong headline can increase profile views by <strong>40%</strong> and inbound messages by <strong>3x</strong>. This guide provides <strong>100+ copy-paste headline examples</strong> organized by role, industry, and career stage.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-2xl p-8 mb-16">
                    <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The Perfect LinkedIn Headline Formula</h2>
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl p-6 border border-[#DBEAFE]">
                            <p className="text-xl font-bold text-[#0A0F1C] mb-3 text-center">[Your Role] | [2-3 Key Skills/Technologies] | [Industry or Value Delivered]</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <h3 className="font-bold text-[#0A0F1C] mb-2">Part 1: Your Role</h3>
                                <p className="text-[#4B5563]">Software Engineer, Marketing Manager, Financial Analyst</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#0A0F1C] mb-2">Part 2: Key Skills</h3>
                                <p className="text-[#4B5563]">React & Node.js, SEO & Content, M&A & Valuation</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#0A0F1C] mb-2">Part 3: Industry/Value</h3>
                                <p className="text-[#4B5563]">FinTech, SaaS Growth, Healthcare</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-20 text-[15px] text-[#4B5563] leading-relaxed">
                    
                    <section id="tech">
                        <h2 className="text-3xl font-bold text-[#0A0F1C] mb-8">Software Engineers & Developers</h2>
                        <p className="mb-6">Tech recruiters search by specific technologies and frameworks. Generic titles like "Software Developer" get lost in millions of profiles.</p>
                        
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-[#0A0F1C] mb-4">Frontend Engineers</h3>
                                <div className="space-y-2">
                                    {[
                                        'Frontend Engineer | React & TypeScript | Building Fast, Accessible UIs',
                                        'Senior Frontend Developer | Next.js & Tailwind CSS | E-Commerce & FinTech',
                                        'UI Engineer | React, Vue.js & Design Systems | Ex-Shopify',
                                        'Frontend Lead | JavaScript & Web Performance | Scaling B2B SaaS Products',
                                        'Frontend Developer | Angular & RxJS | Enterprise Applications',
                                    ].map((ex, i) => (
                                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium hover:border-[#DBEAFE] transition-colors">{ex}</div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0A0F1C] mb-4">Backend Engineers</h3>
                                <div className="space-y-2">
                                    {[
                                        'Backend Engineer | Python & Django | API Design & Microservices',
                                        'Backend Developer | Node.js & PostgreSQL | Building Scalable Systems',
                                        'Senior Backend Engineer | Go & Kubernetes | High-Throughput Systems',
                                        'API Developer | REST & GraphQL | Node.js & AWS',
                                        'Backend Engineer | Java & Spring Boot | Enterprise SaaS',
                                    ].map((ex, i) => (
                                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium hover:border-[#DBEAFE] transition-colors">{ex}</div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0A0F1C] mb-4">Full-Stack Engineers</h3>
                                <div className="space-y-2">
                                    {[
                                        'Full-Stack Engineer | React + Node.js | Building SaaS Products',
                                        'Full-Stack Developer | TypeScript & PostgreSQL | Startup Builder',
                                        'Full-Stack Engineer | Next.js & Python | AI-Powered Applications',
                                        'Senior Full-Stack Developer | MERN Stack | E-Commerce & Payments',
                                        'Full-Stack Engineer | Vue.js & Django | Healthcare Tech',
                                    ].map((ex, i) => (
                                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium hover:border-[#DBEAFE] transition-colors">{ex}</div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0A0F1C] mb-4">DevOps & Cloud Engineers</h3>
                                <div className="space-y-2">
                                    {[
                                        'DevOps Engineer | AWS & Terraform | Infrastructure as Code',
                                        'Site Reliability Engineer | Kubernetes & Prometheus | 99.99% Uptime',
                                        'Platform Engineer | Docker, K8s & CI/CD | Developer Experience',
                                        'Cloud Engineer | AWS & GCP | Cost Optimization & Security',
                                        'DevOps Lead | Azure & Jenkins | Enterprise Infrastructure',
                                    ].map((ex, i) => (
                                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium hover:border-[#DBEAFE] transition-colors">{ex}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link href="/linkedin-headline-software-engineers" className="text-[#0A66C2] font-medium hover:underline text-sm">→ View 50+ more software engineer headline examples</Link>
                        </div>
                    </section>

                    <section id="marketing">
                        <h2 className="text-3xl font-bold text-[#0A0F1C] mb-8">Marketing & Growth</h2>
                        <p className="mb-6">Marketing recruiters search by channel and specialization. Specify whether you do SEO, paid ads, content, or growth marketing.</p>
                        
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-[#0A0F1C] mb-4">Digital & Performance Marketing</h3>
                                <div className="space-y-2">
                                    {[
                                        'Digital Marketing Manager | SEO & Performance Marketing | Google Ads Certified',
                                        'Performance Marketing Manager | Meta Ads & Google Ads | E-Commerce',
                                        'Paid Media Specialist | PPC & Programmatic | 3x ROAS Average',
                                        'Digital Marketing Lead | SEM, Display & Social | B2B SaaS',
                                        'Growth Marketer | Paid Acquisition & Analytics | Scaled ARR 10x',
                                    ].map((ex, i) => (
                                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium hover:border-[#DBEAFE] transition-colors">{ex}</div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0A0F1C] mb-4">Content & SEO Marketing</h3>
                                <div className="space-y-2">
                                    {[
                                        'Content Marketing Manager | SEO & Editorial Strategy | B2B SaaS',
                                        'SEO Specialist | Technical SEO & Content Strategy | Grew Traffic 300%',
                                        'Content Strategist | Blog, Email & Social | FinTech & Startups',
                                        'Copywriter & Content Marketer | Conversion-Focused Copy | SaaS',
                                        'SEO Manager | Link Building & On-Page Optimization | E-Commerce',
                                    ].map((ex, i) => (
                                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium hover:border-[#DBEAFE] transition-colors">{ex}</div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0A0F1C] mb-4">Product & Growth Marketing</h3>
                                <div className="space-y-2">
                                    {[
                                        'Growth Marketing Manager | PLG & Lifecycle Marketing | Series B SaaS',
                                        'Product Marketing Manager | Go-to-Market Strategy | Enterprise Software',
                                        'Growth Lead | Experimentation & CRO | Scaled User Base 10x',
                                        'PMM | Competitive Intelligence & Positioning | Cloud Infrastructure',
                                        'Product Marketing Lead | Launch Strategy & Messaging | B2B Tech',
                                    ].map((ex, i) => (
                                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium hover:border-[#DBEAFE] transition-colors">{ex}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link href="/linkedin-headline-marketers" className="text-[#0A66C2] font-medium hover:underline text-sm">→ View 50+ more marketing headline examples</Link>
                        </div>
                    </section>

                    <section id="finance">
                        <h2 className="text-3xl font-bold text-[#0A0F1C] mb-8">Finance & Accounting</h2>
                        <p className="mb-6">Finance recruiters search for specific certifications (CPA, CFA, CA) and specializations. Always include your credentials.</p>
                        
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-[#0A0F1C] mb-4">Corporate Finance & FP&A</h3>
                                <div className="space-y-2">
                                    {[
                                        'FP&A Manager | Financial Planning & Budgeting | SaaS & Tech',
                                        'Senior Financial Analyst | Revenue Forecasting & Business Intelligence | $500M+ Portfolio',
                                        'Director of Finance | Strategic Planning & Cash Flow Optimization | Series C Startup',
                                        'Finance Manager | FP&A & Investor Relations | Scaling from Seed to IPO',
                                        'Corporate Finance Lead | M&A Integration & Financial Modeling | Fortune 500',
                                    ].map((ex, i) => (
                                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium hover:border-[#DBEAFE] transition-colors">{ex}</div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0A0F1C] mb-4">Accounting & Audit</h3>
                                <div className="space-y-2">
                                    {[
                                        'CPA | Audit Manager @ Deloitte | Financial Services & Insurance',
                                        'Senior Accountant | Tax Planning & Compliance | CPA Licensed',
                                        'Chartered Accountant | Statutory Audit & Internal Controls | Big 4 Trained',
                                        'Tax Manager | International Tax & Transfer Pricing | KPMG Alum',
                                        'Controller | Financial Reporting & SOX Compliance | Public Company',
                                    ].map((ex, i) => (
                                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium hover:border-[#DBEAFE] transition-colors">{ex}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link href="/linkedin-headline-finance" className="text-[#0A66C2] font-medium hover:underline text-sm">→ View 40+ more finance headline examples</Link>
                        </div>
                    </section>

                    <section id="hr">
                        <h2 className="text-3xl font-bold text-[#0A0F1C] mb-8">HR & Recruiting</h2>
                        <p className="mb-6">Candidates want to know what roles you recruit for and what industries you specialize in.</p>
                        
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-[#0A0F1C] mb-4">Recruiters & Talent Acquisition</h3>
                                <div className="space-y-2">
                                    {[
                                        'Tech Recruiter | Hiring Engineers, PMs & Designers | 500+ Hires Made',
                                        'Senior Talent Acquisition Partner | FinTech & SaaS | Building World-Class Teams',
                                        'Executive Recruiter | C-Suite & VP-Level Search | Healthcare & Biotech',
                                        'Campus Recruiter | University Relations & Early Career Programs | Fortune 100',
                                        'Technical Recruiter | Full-Stack, Backend & DevOps Roles | Startup to Scale-Up',
                                    ].map((ex, i) => (
                                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium hover:border-[#DBEAFE] transition-colors">{ex}</div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0A0F1C] mb-4">HR Business Partners & People Ops</h3>
                                <div className="space-y-2">
                                    {[
                                        'HR Business Partner | Supporting Engineering & Product Teams | 500+ Employees',
                                        'Senior HRBP | Organizational Design & Change Management | Tech Industry',
                                        'Head of People | Building Culture at Scale | Series B–D Startups',
                                        'People Operations Manager | Onboarding, Engagement & Retention | 200+ Team',
                                        'Chief People Officer | Talent Strategy, DEI & Culture | Public Company',
                                    ].map((ex, i) => (
                                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium hover:border-[#DBEAFE] transition-colors">{ex}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link href="/linkedin-headline-hr" className="text-[#0A66C2] font-medium hover:underline text-sm">→ View 40+ more HR headline examples</Link>
                        </div>
                    </section>

                    <section id="students">
                        <h2 className="text-3xl font-bold text-[#0A0F1C] mb-8">Students & Recent Graduates</h2>
                        <p className="mb-6">Never use just "Student at [University]". Lead with your skills, career direction, and what you are building.</p>
                        
                        <div className="space-y-2">
                            {[
                                'Computer Science Student | ML & Data Science | Python, TensorFlow | Stanford 2026',
                                'Software Engineering Intern @ Google | Full-Stack Developer | React & Node.js',
                                'Marketing Major | Social Media & Content Strategy | Google Ads Certified | Class of 2026',
                                'Finance Student | Investment Banking Aspirant | Financial Modeling & Valuation | NYU Stern',
                                'Mechanical Engineering Graduate | CAD & Product Design | SolidWorks, AutoCAD',
                                'Business Analytics Student | Data Visualization & SQL | Tableau Certified | MIT 2025',
                                'Junior Developer | TypeScript & React | Building Side Projects | CS Graduate',
                                'MBA Candidate | Strategy Consulting | Ex-Analyst @ McKinsey | Wharton 2026',
                                'Design Student | UI/UX & Product Design | Figma & Adobe XD | Parsons 2025',
                                'Economics Student | Data Analysis & Research | R, Python | Seeking Summer Internship',
                            ].map((ex, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium hover:border-[#DBEAFE] transition-colors">{ex}</div>
                            ))}
                        </div>
                    </section>

                    <section id="job-seekers">
                        <h2 className="text-3xl font-bold text-[#0A0F1C] mb-8">Job Seekers & Career Changers</h2>
                        <p className="mb-6">Never say "Looking for opportunities" or "Open to work". Lead with your expertise and target role.</p>
                        
                        <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-6">
                            <h3 className="text-lg font-bold text-[#0A0F1C] mb-3">Headlines to Avoid</h3>
                            <div className="space-y-2 text-sm text-[#4B5563]">
                                <p>❌ "Experienced professional seeking new opportunities"</p>
                                <p>❌ "Open to work | Looking for my next role"</p>
                                <p>❌ "Passionate about technology and innovation"</p>
                                <p>❌ "Actively job searching"</p>
                            </div>
                        </div>

                        <div className="bg-green-50 border border-green-100 rounded-xl p-6 mb-6">
                            <h3 className="text-lg font-bold text-[#0A0F1C] mb-3">Better Headlines for Job Seekers</h3>
                            <div className="space-y-2">
                                {[
                                    'Product Manager | B2B SaaS & Mobile Apps | Ex-Amazon',
                                    'Data Analyst | SQL, Python & Tableau | Healthcare Analytics',
                                    'UX Designer | User Research & Prototyping | SaaS & FinTech',
                                    'Project Manager | Agile & Scrum | Leading Cross-Functional Teams',
                                    'Sales Manager | B2B Enterprise Sales | $5M+ Closed | Tech Industry',
                                ].map((ex, i) => (
                                    <div key={i} className="bg-white border border-green-200 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium">{ex}</div>
                                ))}
                            </div>
                        </div>

                        <p className="text-sm text-[#4B5563]">
                            <strong>Pro tip:</strong> Use LinkedIn&apos;s Open to Work feature (visible only to recruiters) instead of mentioning job search in your headline.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-[#0A0F1C] mb-8">Headline Writing Best Practices</h2>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-[#EFF6FF] to-white border border-[#DBEAFE] rounded-xl p-6">
                                <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">✅ Do This</h3>
                                <ul className="space-y-2 text-sm text-[#4B5563]">
                                    <li>• Include 2-3 specific keywords recruiters search</li>
                                    <li>• Mention your specialization or tech stack</li>
                                    <li>• Keep it under 120 characters for full visibility</li>
                                    <li>• Use separators like | or • for readability</li>
                                    <li>• Include certifications (CPA, CFA, etc.)</li>
                                    <li>• Add industry context (SaaS, FinTech, Healthcare)</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">❌ Avoid This</h3>
                                <ul className="space-y-2 text-sm text-[#4B5563]">
                                    <li>• Generic buzzwords (passionate, innovative, motivated)</li>
                                    <li>• Just your company name without role context</li>
                                    <li>• Internal job codes (SDE-2, L5, etc.)</li>
                                    <li>• Emojis and special characters</li>
                                    <li>• "Looking for opportunities" or "Open to work"</li>
                                    <li>• Vague titles like "Professional" or "Expert"</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-[#0A0F1C] mb-8">FAQ: LinkedIn Headlines</h2>
                        <div className="space-y-4">
                            {[
                                { 
                                    q: 'What is a good headline for LinkedIn?', 
                                    a: 'A good LinkedIn headline clearly communicates your role, includes 2-3 keywords recruiters search for, and shows your specialization or value. It should be under 120 characters for full visibility in search results. Example: "Frontend Engineer | React & TypeScript | Building Accessible UIs".' 
                                },
                                { 
                                    q: 'How do I write a LinkedIn headline?', 
                                    a: 'Use the formula: [Role] | [2-3 Key Skills] | [Industry/Value]. Start with your core role, add specific skills or technologies, and finish with your industry focus. Keep it under 120 characters and avoid generic buzzwords.' 
                                },
                                { 
                                    q: 'Should students include their university in the headline?', 
                                    a: 'Yes, but not as the main focus. Lead with your skills and career direction first: "CS Student | ML & Python | Stanford 2026" is better than "Student at Stanford University".' 
                                },
                                { 
                                    q: 'Can I mention that I am looking for a job in my headline?', 
                                    a: 'No. Never use "Looking for opportunities" or "Open to work" in your headline. Instead, position yourself as an expert in your field. Use LinkedIn\'s Open to Work badge instead, which is visible only to recruiters.' 
                                },
                                { 
                                    q: 'How often should I update my LinkedIn headline?', 
                                    a: 'Update your headline whenever you change roles, gain new certifications, or shift your career focus. Also update it when you start a job search to include more targeted keywords for your desired role.' 
                                },
                                { 
                                    q: 'Should I include my company name in my headline?', 
                                    a: 'Only if your company is well-known and adds credibility (e.g., "Software Engineer @ Google"). Otherwise, use that space for your specialization, skills, or industry instead.' 
                                },
                            ].map((item, i) => (
                                <details key={i} className="group bg-[#F8FAFC] border border-gray-200 rounded-xl overflow-hidden">
                                    <summary className="cursor-pointer text-sm font-semibold text-[#0A0F1C] list-none flex items-center justify-between gap-3 p-5 hover:bg-white transition-colors">
                                        {item.q}
                                        <svg className="w-4 h-4 text-[#6B7280] shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                    </summary>
                                    <p className="px-5 pb-5 text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                    <div className="bg-gradient-to-br from-[#0A66C2] to-[#0077B5] text-white rounded-2xl p-10 text-center">
                        <h2 className="text-2xl font-bold mb-4">Get Your LinkedIn Headline Scored</h2>
                        <p className="text-white/90 mb-6 max-w-xl mx-auto">
                            Upload your LinkedIn PDF and get a free headline analysis with keyword scoring, positioning feedback, and 6 AI-generated headline alternatives tailored to your role.
                        </p>
                        <Link href="/" className="inline-block bg-white text-[#0A66C2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors no-underline">
                            Analyze Your Headline Free →
                        </Link>
                    </div>

                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
