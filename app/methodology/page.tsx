import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'

export const metadata: Metadata = {
    title: 'LinkedIn Profile Scoring Methodology & Algorithm (2026)',
    description: 'Deep dive into the LinkedInRank scoring methodology: 6 categories, 30+ signals, AI + rule-based evaluation, career stage adaptation, and transparent fairness. See exactly how your LinkedIn profile score is calculated.',
    keywords: 'linkedinrank methodology, linkedin profile scoring algorithm, linkedin score calculation, linkedin profile evaluation criteria, linkedin scoring system, how linkedin score works, linkedin profile grading',
    alternates: { canonical: 'https://linkedinrank.com/methodology' },
    openGraph: {
        title: 'LinkedIn Profile Scoring Methodology & Algorithm (2026)',
        description: 'Transparent scoring: 6 categories, 30+ signals, AI + rule-based evaluation. See exactly how your LinkedIn profile score is calculated.',
        url: 'https://linkedinrank.com/methodology',
    },
}

export default function MethodologyPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            {/* Hero */}
            <section className="relative bg-gradient-to-b from-[#F8FAFC] to-white pt-16 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%20fill%3D%22%23E5E7EB%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
                <div className="max-w-3xl mx-auto px-6 text-center relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                        <div className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                        <span className="text-xs font-semibold text-[#0A66C2]">Methodology</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">How LinkedIn Rank Evaluates Profiles</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                        A combination of rule-based analysis and AI evaluation across six categories, 30+ signals, and transparent scoring.
                    </p>
                </div>
            </section>

            {/* Score overview bar */}
            <section className="border-b border-gray-100 bg-white">
                <div className="max-w-3xl mx-auto px-6 py-6">
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { num: '100', label: 'Total points', icon: <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
                            { num: '6', label: 'Categories', icon: <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
                            { num: '30+', label: 'Signals', icon: <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg> },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-100 rounded-xl p-4">
                                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">{item.icon}</div>
                                <div>
                                    <span className="text-xl font-bold text-[#0A0F1C]">{item.num}</span>
                                    <p className="text-[10px] text-[#6B7280] font-medium uppercase tracking-wide">{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <div className="space-y-12 text-sm text-[#4B5563] leading-relaxed">
                    {/* What we evaluate */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-[#0A0F1C]">What we evaluate</h2>
                        </div>
                        <p className="mb-4">
                            We only evaluate data that is present in a standard LinkedIn PDF export. This includes:
                            name, headline, about/summary, experience entries, education, skills, certifications,
                            languages, and honors.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-4">
                                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-wide mb-2.5">What we analyze</p>
                                <div className="space-y-1.5">
                                    {['Name & headline', 'About / summary', 'Experience entries', 'Education details', 'Skills & endorsements', 'Certifications & honors'].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-[#1E40AF]">
                                            <svg className="w-3.5 h-3.5 text-[#0A66C2] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4">
                                <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-2.5">Never penalized</p>
                                <div className="space-y-1.5">
                                    {['Profile picture or banner', 'Engagement metrics', 'Follower / connection count', 'Posting frequency', 'Creator mode status', 'Recommendations from others'].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-[#4B5563]">
                                            <svg className="w-3.5 h-3.5 text-[#6B7280] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Scoring categories */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-[#0A0F1C]">Scoring categories</h2>
                        </div>
                        <p className="mb-5">Total score is out of 100, distributed across six categories:</p>

                        {/* Visual score bar */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-6">
                            <div className="flex items-center gap-1 h-8 rounded-lg overflow-hidden">
                                {[
                                    { name: 'Headline', weight: 20, color: 'bg-[#0A66C2]' },
                                    { name: 'About', weight: 20, color: 'bg-[#2563EB]' },
                                    { name: 'Experience', weight: 25, color: 'bg-[#4F46E5]' },
                                    { name: 'Skills', weight: 15, color: 'bg-[#7C3AED]' },
                                    { name: 'Education', weight: 10, color: 'bg-[#9333EA]' },
                                    { name: 'Completeness', weight: 10, color: 'bg-[#A855F7]' },
                                ].map((cat, i) => (
                                    <div key={i} className={`${cat.color} h-full rounded-md flex items-center justify-center`} style={{ width: `${cat.weight}%` }}>
                                        <span className="text-[9px] font-bold text-white/90 hidden sm:block">{cat.weight}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-3 mt-3 flex-wrap justify-center">
                                {[
                                    { name: 'Headline', color: 'bg-[#0A66C2]' },
                                    { name: 'About', color: 'bg-[#2563EB]' },
                                    { name: 'Experience', color: 'bg-[#4F46E5]' },
                                    { name: 'Skills', color: 'bg-[#7C3AED]' },
                                    { name: 'Education', color: 'bg-[#9333EA]' },
                                    { name: 'Completeness', color: 'bg-[#A855F7]' },
                                ].map((cat, i) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                        <div className={`w-2.5 h-2.5 rounded-sm ${cat.color}`} />
                                        <span className="text-[10px] text-[#6B7280] font-medium">{cat.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-5">
                            {[
                                {
                                    name: 'Headline',
                                    weight: 20,
                                    color: '#0A66C2',
                                    criteria: [
                                        'Role clarity | does it state what you do?',
                                        'Keywords | are searchable, industry terms present?',
                                        'Specificity | is it differentiated from generic titles?',
                                        'Positioning | does it convey value or expertise?',
                                    ],
                                    high: 'Role + domain present, searchable keywords, not generic.',
                                    low: '"Student at XYZ" only, "Seeking opportunities", too vague.',
                                },
                                {
                                    name: 'About / Summary',
                                    weight: 20,
                                    color: '#2563EB',
                                    criteria: [
                                        'Clarity | does it explain what you do?',
                                        'Structure | is it readable and organized?',
                                        'Skills mention | are specific skills or tools referenced?',
                                        'Direction | does it show professional focus?',
                                    ],
                                    high: 'Shows expertise or direction, mentions skills/tools/domains.',
                                    low: 'Missing, 2-3 lines only, purely emotional language.',
                                },
                                {
                                    name: 'Experience',
                                    weight: 25,
                                    color: '#4F46E5',
                                    criteria: [
                                        'Number of roles relative to career stage',
                                        'Role descriptions | are responsibilities clear?',
                                        'Action verbs | Led, Built, Managed, Designed',
                                        'Impact shown | contributions and outcomes described',
                                        'Quantification | numbers are a bonus, not required',
                                    ],
                                    high: 'Responsibilities + outcomes shown, some metrics present.',
                                    low: 'Only job titles, no description.',
                                },
                                {
                                    name: 'Skills',
                                    weight: 15,
                                    color: '#7C3AED',
                                    criteria: [
                                        'Enough skills listed for career stage',
                                        'Relevance to stated role',
                                        'Specificity | tools and platforms vs generic terms',
                                    ],
                                    high: 'Domain-specific skills, tools/platforms included.',
                                    low: 'Very few skills, generic terms only.',
                                },
                                {
                                    name: 'Education & Credentials',
                                    weight: 10,
                                    color: '#9333EA',
                                    criteria: [
                                        'Degree and institution listed',
                                        'Field of study present',
                                        'Certifications listed (bonus)',
                                    ],
                                    high: 'Complete education details with field of study.',
                                    low: 'Missing or incomplete education section.',
                                },
                                {
                                    name: 'Completeness & Structure',
                                    weight: 10,
                                    color: '#A855F7',
                                    criteria: [
                                        'All major sections present',
                                        'Content depth across sections',
                                        'Logical profile structure and flow',
                                    ],
                                    high: 'All sections filled with substantive content.',
                                    low: 'Multiple key sections empty.',
                                },
                            ].map((cat, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: cat.color }} />
                                    <div className="flex items-center justify-between mb-3 pl-3">
                                        <h3 className="text-sm font-bold text-[#0A0F1C]">{cat.name}</h3>
                                        <span className="text-xs font-bold text-white px-2.5 py-0.5 rounded-full" style={{ backgroundColor: cat.color }}>{cat.weight} pts</span>
                                    </div>
                                    <div className="pl-3 space-y-1.5 mb-4">
                                        {cat.criteria.map((c, j) => (
                                            <div key={j} className="flex items-start gap-2 text-xs text-[#4B5563]">
                                                <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: cat.color }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                                <span>{c}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-xs pl-3">
                                        <div className="bg-[#ECFDF5] border border-emerald-100 rounded-lg p-3">
                                            <p className="font-bold text-emerald-700 mb-0.5 flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                                High score
                                            </p>
                                            <p className="text-emerald-800">{cat.high}</p>
                                        </div>
                                        <div className="bg-[#FEF2F2] border border-red-100 rounded-lg p-3">
                                            <p className="font-bold text-red-600 mb-0.5 flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>
                                                Low score
                                            </p>
                                            <p className="text-red-700">{cat.low}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Career stage adaptation */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-[#0A0F1C]">Career stage adaptation</h2>
                        </div>
                        <p className="mb-4">
                            LinkedIn Rank detects your career stage from your headline, job titles, and experience
                            duration. Expectations are adjusted accordingly:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { stage: 'Student', desc: 'Not penalized for fewer roles. Projects and internships are valued.', icon: '🎓', bg: 'from-blue-50 to-indigo-50', border: 'border-blue-200' },
                                { stage: 'Early-career', desc: '1-5 years. Focus on clear descriptions and skill alignment.', icon: '🚀', bg: 'from-emerald-50 to-teal-50', border: 'border-emerald-200' },
                                { stage: 'Mid-career', desc: '5-12 years. Expected to show progression and specialization.', icon: '📈', bg: 'from-amber-50 to-orange-50', border: 'border-amber-200' },
                                { stage: 'Senior / Founder', desc: 'Leadership roles, strategic language, and domain authority.', icon: '👑', bg: 'from-purple-50 to-violet-50', border: 'border-purple-200' },
                            ].map((item, i) => (
                                <div key={i} className={`bg-gradient-to-br ${item.bg} border ${item.border} rounded-xl p-4`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">{item.icon}</span>
                                        <p className="text-sm font-bold text-[#0A0F1C]">{item.stage}</p>
                                    </div>
                                    <p className="text-xs text-[#4B5563] leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* AI + Rule-based */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-[#0A0F1C]">Rule-based + AI analysis</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                                <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center mb-3">
                                    <svg className="w-4 h-4 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889" /></svg>
                                </div>
                                <p className="text-sm font-bold text-[#0A0F1C] mb-1">Rule-based engine</p>
                                <p className="text-xs text-[#4B5563] leading-relaxed">Consistent, deterministic scoring across all profiles. Evaluates structure, completeness, keywords, and section quality.</p>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                                <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center mb-3">
                                    <svg className="w-4 h-4 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                                </div>
                                <p className="text-sm font-bold text-[#0A0F1C] mb-1">AI layer (Google Gemini)</p>
                                <p className="text-xs text-[#4B5563] leading-relaxed">Content quality assessment, contextual recommendations, and archetype detection. Falls back gracefully if unavailable.</p>
                            </div>
                        </div>
                    </section>

                    {/* Tier system */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-[#0A0F1C]">Tier system</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                { tier: 'Platinum', range: '85-100', desc: 'Exceptionally well-crafted', color: '#5B21B6', bg: '#EDE9FE', border: 'border-purple-200' },
                                { tier: 'Gold', range: '70-84', desc: 'Strong professional presence', color: '#92400E', bg: '#FEF3C7', border: 'border-amber-200' },
                                { tier: 'Silver', range: '55-69', desc: 'Good foundation to build on', color: '#6B7280', bg: '#F3F4F6', border: 'border-gray-200' },
                                { tier: 'Bronze', range: '0-54', desc: 'Key sections need attention', color: '#9A3412', bg: '#FFF7ED', border: 'border-orange-200' },
                            ].map((item, i) => (
                                <div key={i} className={`rounded-xl p-4 border ${item.border} text-center`} style={{ backgroundColor: item.bg }}>
                                    <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: item.color }}>
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" /></svg>
                                    </div>
                                    <p className="text-sm font-bold" style={{ color: item.color }}>{item.tier}</p>
                                    <p className="text-xs font-mono text-[#6B7280] mt-0.5">{item.range}</p>
                                    <p className="text-[10px] text-[#4B5563] mt-1 leading-snug">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* CTA */}
                <div className="mt-12 bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                    <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">See your score breakdown</h2>
                    <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF and get scored across all 6 categories with personalized recommendations.</p>
                    <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It's Free</Link>
                </div>

                <RelatedPages currentSlug="methodology" />
            </div>

            <FooterLayout />
        </main>
    )
}
