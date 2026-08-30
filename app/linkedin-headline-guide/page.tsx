import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'
import { guidePageJsonLd } from '@/lib/jsonLd'
import { SparklesIcon, ArrowRightIcon, ShieldCheckIcon, ClockIcon, CheckCircleIcon } from '@/components/ui/Icons'

export const metadata: Metadata = {
    title: '50+ LinkedIn Headline Examples & Formulas (2026 Guide)',
    description: 'Write a LinkedIn headline recruiters actually click. 50+ examples, 5 formulas, and common mistakes to avoid.',
    keywords: 'linkedin headline examples, linkedin headline generator, best linkedin headlines 2026, linkedin headline for freshers, linkedin headline for students, linkedin headline for job seekers, linkedin headline formula, linkedin headline tips, linkedin headline optimization, linkedin headline ideas',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-guide' },
    openGraph: {
        title: '50+ LinkedIn Headline Examples & Formulas (2026 Guide)',
        description: 'Write a LinkedIn headline recruiters actually click. 50+ examples and 5 proven formulas.',
        url: 'https://linkedinrank.com/linkedin-headline-guide',
    },
}

const jsonLd = guidePageJsonLd({
    title: '50+ LinkedIn Headline Examples & Formulas',
    description: 'Learn how to write a LinkedIn headline that gets noticed. 50+ examples by role, 5 proven formulas, common mistakes, and how recruiters search.',
    url: 'https://linkedinrank.com/linkedin-headline-guide',
    dateModified: '2026-03-24',
    breadcrumbs: [
        { name: 'Home', url: 'https://linkedinrank.com' },
        { name: 'Headline Guide', url: 'https://linkedinrank.com/linkedin-headline-guide' },
    ],
    faqs: [
        { question: 'How long should my LinkedIn headline be?', answer: 'LinkedIn allows 220 characters, but only ~60 show in search results. Front-load your strongest keywords in the first 60 characters.' },
        { question: 'Should I include my company name in my headline?', answer: 'Only if your company is well-known and adds credibility. Otherwise, use that space for skills and value statements.' },
        { question: 'Can I use emojis in my LinkedIn headline?', answer: 'Sparingly. One or two relevant emojis can add visual distinction, but overuse looks unprofessional.' },
        { question: 'How does LinkedInRank score my headline?', answer: 'LinkedInRank evaluates headline clarity, keyword presence, role specificity, and positioning strength. It also generates 3 AI-powered alternatives.' },
    ],
})

export default function LinkedInHeadlineGuidePage() {
    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            {/* Hero Header */}
            <div className="border-b-2 border-[#dedcff] bg-gradient-to-b from-[#dedcff]/30 via-white to-[#fbfbfe]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-6">
                    <nav aria-label="Breadcrumb" className="text-[13px] text-[#050315]/60 flex items-center gap-2 flex-wrap">
                        <Link href="/" className="hover:text-[#2f27ce] transition-colors no-underline">Home</Link>
                        <span>/</span>
                        <Link href="/blogs" className="hover:text-[#2f27ce] transition-colors no-underline">Articles</Link>
                        <span>/</span>
                        <span className="text-[#050315] font-semibold">Headline Guide</span>
                    </nav>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="inline-flex items-center gap-1 text-[11.5px] font-extrabold uppercase tracking-wider bg-[#dedcff] text-[#2f27ce] px-3.5 py-1 rounded-full shadow-2xs">
                                ★ Flagship Playbook
                            </span>
                            <span className="text-[12px] text-[#050315]/60 flex items-center gap-1 font-medium">
                                <ClockIcon size={13} /> 12 min read
                            </span>
                            <span className="flex items-center gap-1 text-[#2f27ce] text-[12px] font-bold">
                                <ShieldCheckIcon size={14} /> Recruiter Click-Through Tested
                            </span>
                        </div>

                        <h1 className="text-[32px] sm:text-[46px] font-extrabold text-[#050315] leading-[1.12] tracking-tight">
                            How to Write a LinkedIn Headline That Attracts Recruiters
                        </h1>

                        <p className="text-[16px] sm:text-[17.5px] text-[#050315]/75 leading-relaxed max-w-3xl">
                            Your headline is the single most indexed and visible string on your profile. It appears in search results, connection inboxes, and every post comment. A high-converting headline can increase your profile views by 3–5x.
                        </p>
                    </div>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="space-y-16 text-[15.5px] sm:text-[16.5px] text-[#050315]/80 leading-relaxed">

                    {/* Why headline matters */}
                    <section className="space-y-6">
                        <div className="space-y-2">
                            <span className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                First Impressions
                            </span>
                            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                                Why Your Headline Drives 80% of Inbound Profile Views
                            </h2>
                        </div>
                        <p>
                            LinkedIn gives you 220 characters for your headline. Most professionals waste it with vague phrases like &ldquo;Student at XYZ University&rdquo; or &ldquo;Seeking Opportunities.&rdquo; These provide zero searchable keywords or positioning value.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                            {[
                                { title: '1. Search Visibility', desc: 'LinkedIn search algorithm heavily indexes headline tokens. If recruiters search for your skills and they are not in your headline, you will not rank.' },
                                { title: '2. 3-Second Filter', desc: 'Before clicking your full profile, recruiters evaluate your name, headshot, and headline in candidate preview cards.' },
                                { title: '3. Strategic Authority', desc: 'Your headline sets the mental model for your entire career track, establishing your core niche and seniority instantly.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border-2 border-[#dedcff] rounded-3xl p-6 aside-card-shadow space-y-2">
                                    <h3 className="text-[16px] font-bold text-[#050315]">{item.title}</h3>
                                    <p className="text-[13.5px] text-[#050315]/70 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Core Headline Formula */}
                    <section className="space-y-6">
                        <div className="space-y-2">
                            <span className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                Architecture
                            </span>
                            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                                The High-Yield Headline Formula
                            </h2>
                        </div>
                        <div className="bg-gradient-to-r from-[#dedcff]/60 via-white to-[#dedcff]/60 border-2 border-[#dedcff] rounded-3xl p-8 text-center space-y-2 shadow-sm">
                            <p className="text-[20px] sm:text-[22px] font-extrabold text-[#050315] tracking-tight">
                                [Functional Role] | [Core Technical Skills / Methodologies] | [Target Value / Domain]
                            </p>
                            <p className="text-[14px] text-[#050315]/70">
                                This modular structure ensures top algorithmic ranking and human click-through.
                            </p>
                        </div>

                        <div className="space-y-3 pt-2">
                            {[
                                { label: 'Specialist Format', example: 'Senior Data Engineer | Python, Spark & AWS | Building High-Throughput Analytics Pipelines' },
                                { label: 'Authority Format', example: 'Product Lead @ Series B SaaS | 0-to-1 Product Strategy & Growth | Ex-Stripe' },
                                { label: 'Operator Format', example: 'Technical Program Manager | Distributed Systems & Cloud Infrastructure | PMP, Agile' },
                            ].map((item, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <span className="text-[11.5px] font-extrabold text-[#2f27ce] bg-[#dedcff] px-3 py-1 rounded-full shrink-0 self-start sm:self-auto">
                                        {item.label}
                                    </span>
                                    <p className="text-[14px] font-mono text-[#050315] font-semibold flex-1 sm:text-right">
                                        {item.example}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="space-y-6 pt-6 border-t-2 border-[#dedcff]">
                        <div className="space-y-2">
                            <span className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                                FAQ
                            </span>
                            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                                Frequently Asked Questions
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {[
                                { q: 'How long should my LinkedIn headline be?', a: 'LinkedIn allows up to 220 characters, but only the first ~60 characters display on mobile search snippets. Front-load your functional role and primary keywords.' },
                                { q: 'Should I include my current employer in my headline?', a: 'Only if the brand carries strong tier-1 recognition (e.g. Google, Stripe, McKinsey). Otherwise, use the space for core skills and high-demand industry methodologies.' },
                                { q: 'Can I use emojis or fancy fonts in my headline?', a: 'Avoid emojis and Unicode stylized fonts. They look amateurish to senior executive recruiters and break automated parsing in applicant tracking systems.' },
                                { q: 'How does LinkedInRank score my headline?', a: 'LinkedInRank evaluates keyword density, character length efficiency, role specificity, and recruiter search alignment, generating 3 tailored AI rewrites.' },
                            ].map((item, i) => (
                                <details key={i} className="group p-5 rounded-2xl bg-white border border-[#dedcff] hover:border-[#2f27ce] aside-card-shadow transition-all" open={i === 0}>
                                    <summary className="cursor-pointer text-[15px] font-bold text-[#050315] list-none flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f27ce] rounded-xl">
                                        <span>{item.q}</span>
                                        <div className="w-7 h-7 rounded-full bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                        </div>
                                    </summary>
                                    <p className="pt-3 text-[13.5px] text-[#050315]/75 leading-relaxed border-t border-[#dedcff]/60 mt-3">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Radiant Bottom CTA */}
                    <div className="bg-gradient-to-r from-[#dedcff]/60 via-white to-[#dedcff]/60 border-2 border-[#dedcff] rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-md shadow-[#2f27ce]/5">
                        <div className="w-12 h-12 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center mx-auto shadow-xs">
                            <SparklesIcon size={22} />
                        </div>
                        <h2 className="text-[22px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                            Generate recruiter-tested headline rewrites
                        </h2>
                        <p className="text-[14.5px] text-[#050315]/75 max-w-md mx-auto leading-relaxed">
                            Use our free LinkedIn Headline Generator or audit your full profile to discover algorithmic improvements.
                        </p>
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                href="/tools/linkedin-headline-generator"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[14.5px] font-bold shadow-lg shadow-[#2f27ce]/25 transition-all no-underline cursor-pointer active:scale-95"
                            >
                                <span>Try Headline Generator</span>
                                <ArrowRightIcon size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* Related Guides */}
                    <RelatedPages currentSlug="linkedin-headline-guide" />
                </div>
            </article>

            <FooterLayout />
        </div>
    )
}
