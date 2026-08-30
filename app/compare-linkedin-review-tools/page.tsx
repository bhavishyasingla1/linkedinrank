import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'
import { SparklesIcon, ShieldCheckIcon, ArrowRightIcon, CheckIcon, XIcon, ClockIcon } from '@/components/ui/Icons'

export const metadata: Metadata = {
    title: 'Best LinkedIn Profile Review Tools Compared (2026)',
    description: 'Compare the best LinkedIn profile review and optimization tools in 2026. Side-by-side comparison of features, pricing, privacy, methodology, and accuracy.',
    keywords: 'linkedin profile review tools, best linkedin optimizer, linkedin profile tools comparison, linkedin scorer comparison, linkedinrank vs competitors, free linkedin profile review, linkedin profile audit tools',
    alternates: { canonical: 'https://linkedinrank.com/compare-linkedin-review-tools' },
    openGraph: {
        title: 'Best LinkedIn Profile Review Tools Compared (2026)',
        description: 'Side-by-side comparison of LinkedIn profile review tools. Features, pricing, privacy, and accuracy.',
        url: 'https://linkedinrank.com/compare-linkedin-review-tools',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best LinkedIn Profile Review Tools Compared (2026)',
    description: 'Comprehensive evaluation of LinkedIn profile scorers, AI rewriters, automation tools, and manual coach audits.',
    url: 'https://linkedinrank.com/compare-linkedin-review-tools',
    datePublished: '2026-02-01',
    dateModified: '2026-08-30',
    author: {
        '@type': 'Person',
        name: 'Bhavishya Singla',
        url: 'https://linkedinrank.com/about',
    },
    publisher: {
        '@type': 'Organization',
        name: 'LinkedInRank',
        url: 'https://linkedinrank.com',
    },
}

export default function CompareToolsPage() {
    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <SiteHeader />

            {/* Hero */}
            <section className="relative pt-16 pb-12 overflow-hidden aside-hero-glow">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#dedcff] border border-[#dedcff] shadow-xs">
                        <SparklesIcon size={14} className="text-[#2f27ce]" />
                        <span className="text-[13px] font-bold text-[#2f27ce]">2026 Tool Comparison</span>
                    </div>
                    <h1 className="text-[36px] sm:text-[48px] font-extrabold text-[#050315] tracking-tight leading-tight">
                        Comparing LinkedIn Profile Review Tools
                    </h1>
                    <p className="text-[16px] sm:text-[18px] text-[#050315]/75 max-w-2xl mx-auto leading-relaxed">
                        An objective, data-backed evaluation of profile scorers, AI rewriters, automation bots, and manual coaching services.
                    </p>
                    <div className="flex items-center justify-center gap-3 text-[13px] text-[#050315]/60 pt-2">
                        <Link href="/about" className="font-semibold text-[#050315] hover:text-[#2f27ce] transition-colors no-underline">
                            By Bhavishya Singla
                        </Link>
                        <span>•</span>
                        <span>Updated Aug 2026</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#2f27ce] font-bold">
                            <ShieldCheckIcon size={14} /> Tested Across 30+ ATS Signals
                        </span>
                    </div>
                </div>
            </section>

            <main id="main-content" className="max-w-4xl mx-auto px-6 py-12 sm:py-16 space-y-16">
                {/* ── Head-to-Head Comparison Matrix ─── */}
                <section className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                            Side-by-Side Comparison Matrix
                        </h2>
                        <p className="text-[15px] text-[#050315]/75">
                            How different LinkedIn profile optimization methods compare on turnaround, privacy, accuracy, and cost.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border-2 border-[#dedcff] bg-white aside-card-shadow">
                        <table className="w-full text-left border-collapse text-[14px]">
                            <thead>
                                <tr className="bg-[#dedcff]/30 border-b border-[#dedcff] text-[13px] font-extrabold text-[#050315]">
                                    <th className="p-4 sm:p-5">Evaluation Factor</th>
                                    <th className="p-4 sm:p-5 text-[#2f27ce] bg-[#dedcff]/50">LinkedInRank</th>
                                    <th className="p-4 sm:p-5">Generic AI Rewriters</th>
                                    <th className="p-4 sm:p-5">Automation Bots</th>
                                    <th className="p-4 sm:p-5">Manual Coach Audits</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#dedcff]/50 text-[#050315]/80">
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-[#050315]">Cost</td>
                                    <td className="p-4 sm:p-5 font-bold text-emerald-600 bg-[#dedcff]/20">100% Free</td>
                                    <td className="p-4 sm:p-5">$10–$30 / mo</td>
                                    <td className="p-4 sm:p-5">$40–$100 / mo</td>
                                    <td className="p-4 sm:p-5">$150–$500 per audit</td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-[#050315]">Turnaround Time</td>
                                    <td className="p-4 sm:p-5 font-bold text-[#2f27ce] bg-[#dedcff]/20">&lt; 60 seconds</td>
                                    <td className="p-4 sm:p-5">Instant</td>
                                    <td className="p-4 sm:p-5">Background</td>
                                    <td className="p-4 sm:p-5">3–7 business days</td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-[#050315]">Privacy &amp; Data Storage</td>
                                    <td className="p-4 sm:p-5 font-bold text-emerald-600 bg-[#dedcff]/20">Zero database storage</td>
                                    <td className="p-4 sm:p-5">Cloud prompt logs</td>
                                    <td className="p-4 sm:p-5 text-amber-700">Account login required</td>
                                    <td className="p-4 sm:p-5">Manual PDF inspection</td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-[#050315]">Recruiter ATS Signal Depth</td>
                                    <td className="p-4 sm:p-5 font-bold text-[#2f27ce] bg-[#dedcff]/20">30+ deterministic signals</td>
                                    <td className="p-4 sm:p-5">Superficial grammar</td>
                                    <td className="p-4 sm:p-5">None (focus on DMs)</td>
                                    <td className="p-4 sm:p-5">High (subjective)</td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-[#050315]">Account Ban Risk</td>
                                    <td className="p-4 sm:p-5 font-bold text-emerald-600 bg-[#dedcff]/20">Zero (no credentials)</td>
                                    <td className="p-4 sm:p-5 font-bold text-emerald-600">Zero</td>
                                    <td className="p-4 sm:p-5 font-bold text-rose-600">High (TOS violation)</td>
                                    <td className="p-4 sm:p-5 font-bold text-emerald-600">Zero</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ── Deep Breakdown by Tool Category ─── */}
                <section className="space-y-6">
                    <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                        Deep Dive: 4 Approaches to Profile Optimization
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            {
                                title: '1. Algorithmic Profile Scorers',
                                desc: 'Evaluates your exported profile PDF across keyword density, section completion, ATS discoverability, and structure. Best for identifying exact visibility bottlenecks without risking account credentials.',
                                pros: 'Fast, data-driven, privacy-preserving, transparent scoring.',
                                cons: 'Requires user to execute recommendations.',
                            },
                            {
                                title: '2. Generic AI Text Rewriters',
                                desc: 'Generates polished paragraphs for your about section and headline. Useful for overcoming writer\'s block, but often strips authentic human tone if published unedited.',
                                pros: 'Overcomes blank-page paralysis instantly.',
                                cons: 'Generic buzzwords ("passionate", "visionary"), no ATS keyword calibration.',
                            },
                            {
                                title: '3. Browser Automation Bots',
                                desc: 'Automates connection requests, endorsements, and direct messages. These tools operate on vanity engagement rather than profile quality and carry significant risk of LinkedIn account restriction.',
                                pros: 'Outbound outreach volume.',
                                cons: 'Violates LinkedIn Terms of Service, risks permanent account suspension.',
                            },
                            {
                                title: '4. Manual Career Coach Audits',
                                desc: 'A human recruiter or career coach manually reviews your resume and profile. Offers nuanced industry advice but comes with high pricing ($150–$500) and multi-day waiting periods.',
                                pros: 'Nuanced interpersonal advice for executive pivots.',
                                cons: 'Expensive, inconsistent quality, subjective scoring.',
                            },
                        ].map((cat, i) => (
                            <div key={i} className="p-6 rounded-3xl bg-white border-2 border-[#dedcff] aside-card-shadow space-y-3">
                                <h3 className="text-[17px] font-extrabold text-[#050315]">{cat.title}</h3>
                                <p className="text-[14px] text-[#050315]/75 leading-relaxed">{cat.desc}</p>
                                <div className="pt-2 space-y-1.5 text-[13px]">
                                    <p className="text-emerald-700 font-semibold"><span className="font-bold">Best For:</span> {cat.pros}</p>
                                    <p className="text-amber-800 font-semibold"><span className="font-bold">Trade-off:</span> {cat.cons}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Key Decision Criteria ─── */}
                <section className="space-y-6">
                    <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                        What to Look for in a Review Tool
                    </h2>

                    <div className="space-y-4">
                        {[
                            { label: 'Transparent Scoring Methodology', desc: 'Can you see exactly how your score is calculated across headline, about, experience, and keywords?' },
                            { label: 'Privacy & Zero-Storage Guarantee', desc: 'Does the tool store your personal resume or profile PDF in cloud databases, or evaluate it strictly client-side?' },
                            { label: 'Concrete, Copyable Fixes', desc: 'Does the tool provide copy-paste formulas and specific keyword suggestions, or just a generic numeric grade?' },
                            { label: 'Career-Stage Adaptive Calibration', desc: 'Does the scoring engine calibrate expectations between a student/fresher, mid-level engineer, and senior executive?' },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-white border border-[#dedcff] flex items-start gap-4 shadow-xs">
                                <div className="w-7 h-7 rounded-full bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                                    ✓
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-bold text-[#050315]">{item.label}</h4>
                                    <p className="text-[13.5px] text-[#050315]/70 mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Call to Action ─── */}
                <div className="dark-cta p-8 sm:p-10 rounded-3xl bg-gradient-to-tr from-[#2f27ce] to-[#433bff] text-white text-center space-y-5 shadow-xl shadow-[#2f27ce]/30">
                    <h3 className="text-[24px] sm:text-[30px] font-black tracking-tight leading-tight text-white">
                        Test Your Profile Against 30+ ATS Signals
                    </h3>
                    <p className="text-[15px] text-white/80 max-w-lg mx-auto leading-relaxed">
                        Upload your LinkedIn profile PDF for an instant, private evaluation. Free forever with zero sign-up required.
                    </p>
                    <Link
                        href="/#upload"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#2f27ce] font-extrabold text-[14px] shadow-md hover:bg-[#dedcff] transition-all no-underline active:scale-95 hover:-translate-y-0.5"
                    >
                        <span>Audit Your Profile for Free</span>
                        <ArrowRightIcon size={15} />
                    </Link>
                </div>
            </main>

            <RelatedPages currentSlug="compare-linkedin-review-tools" />
            <FooterLayout />
        </div>
    )
}
