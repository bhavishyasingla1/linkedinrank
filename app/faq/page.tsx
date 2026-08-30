'use client'

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import { ChevronDownIcon, ArrowRightIcon, SparklesIcon } from '@/components/ui/Icons'

const FAQ_SECTIONS = [
    {
        id: 'about',
        title: 'About LinkedInRank',
        faqs: [
            { q: 'What is LinkedInRank?', a: 'LinkedInRank shows you how your LinkedIn profile reads to recruiters — providing an objective score out of 100 with actionable fixes for every section. It is 100% free, privacy-first, and completes in under a minute.' },
            { q: 'Is LinkedInRank really free?', a: 'Yes. LinkedInRank is completely free. There are no paid tiers, hidden subscriptions, or paywalls. You receive the entire 30-signal analysis and AI-powered recommendations at zero cost.' },
            { q: 'What does LinkedInRank analyze?', a: 'We evaluate your Headline, About summary, Experience bullet descriptions, Skills, Education, and overall completeness across 30+ signals. We only analyze what is visible in a standard LinkedIn PDF export — not follower counts or vanity metrics.' },
            { q: 'Is LinkedInRank affiliated with LinkedIn?', a: 'No. LinkedInRank is an independent educational tool and is not affiliated with, endorsed by, or connected to LinkedIn Corporation. We analyze static PDF documents exported by users.' },
            { q: 'Who created LinkedInRank?', a: 'LinkedInRank was created by Bhavishya Singla after years of helping professionals, students, and founders optimize their online presence for recruiter search algorithms.' },
        ],
    },
    {
        id: 'how-it-works',
        title: 'How It Works & Usage',
        faqs: [
            { q: 'How do I use LinkedInRank?', a: 'Export your LinkedIn profile as a PDF (open your profile → click "More" → "Save to PDF"), then drop that PDF on our homepage. You will receive your complete diagnosis in under 60 seconds.' },
            { q: 'How do I export my LinkedIn PDF?', a: 'On your desktop or mobile browser, visit your LinkedIn profile page, click the "More" button (or three dots) next to your profile photo, and click "Save to PDF".' },
            { q: 'What is the scoring scale & tiers?', a: 'Profiles are scored from 0 to 100 across 6 categories: Headline (20 pts), About (20 pts), Experience (25 pts), Skills (15 pts), Education (10 pts), and Completeness (10 pts). Tiers are Bronze (0–54), Silver (55–69), Gold (70–84), and Platinum (85+).' },
            { q: 'How does the AI analysis work?', a: 'Our deterministic engine calculates rule-based scores first. Google Gemini AI then evaluates copy nuance, positioning clarity, and generates tailored before/after rewrite examples.' },
            { q: 'Can I save or print the report?', a: 'Yes. Click the "Save PDF Report" button on your results page to print or export your analysis as a clean PDF.' },
        ],
    },
    {
        id: 'scoring',
        title: 'Scoring & Accuracy',
        faqs: [
            { q: 'How accurate is the score?', a: 'Our scoring engine is calibrated across hundreds of recruiter search queries and ATS parameters. Average profiles score 55–69, strong profiles score 70–84, and 85+ is achieved by top-tier profiles.' },
            { q: 'What is a good LinkedIn score?', a: 'A score of 70+ (Gold Tier) places you in the top 25% of candidates and ensures high discoverability for recruiter search filters.' },
            { q: 'Does the score adapt to my career stage?', a: 'Yes. LinkedInRank automatically detects whether you are a student, early-career professional, mid-career operator, or senior leader and adjusts scoring expectations accordingly.' },
            { q: 'Can my score change if I re-upload?', a: 'Yes. As you update your profile on LinkedIn and export a new PDF, your score will improve to reflect your changes.' },
        ],
    },
    {
        id: 'privacy',
        title: 'Privacy & Security',
        faqs: [
            { q: 'Is my uploaded data stored?', a: 'No. Your PDF is processed entirely in temporary server RAM and immediately deleted once your analysis is rendered. We do not store, log, or share your profile data.' },
            { q: 'Do I need to create an account or provide an email?', a: 'No. LinkedInRank requires zero registration, no account creation, and no email address.' },
            { q: 'Do recruiters or employers see my score?', a: 'No. Your results are 100% private and only visible in your current browser session.' },
            { q: 'Does LinkedInRank access my LinkedIn account credentials?', a: 'Never. LinkedInRank does not connect to your LinkedIn account or request OAuth permissions. We only parse the static PDF document you export.' },
        ],
    },
    {
        id: 'optimization',
        title: 'Profile Optimization & Best Practices',
        faqs: [
            { q: 'How do I write an effective LinkedIn headline?', a: 'Combine your core target role, domain, and 2-3 searchable skill keywords (e.g. "Senior Product Manager | B2B SaaS & Growth | Ex-Stripe"). Keep the most important keywords in the first 120 characters.' },
            { q: 'How should I format my experience bullet points?', a: 'Start each bullet with an active verb (Engineered, Spearheaded, Reduced, Automated), specify the tools and technologies used, and include concrete outcomes where possible.' },
            { q: 'How do I use the report with ChatGPT or Claude?', a: 'Use our 1-click "Copy AI Prompt" button on the results dashboard. Paste the prompt directly into ChatGPT, Claude, or Gemini alongside your PDF to generate instant section rewrites.' },
        ],
    },
]

const ALL_FAQS = FAQ_SECTIONS.flatMap((s) => s.faqs)

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ALL_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
        },
    })),
}

export default function FaqPage() {
    const [openFaq, setOpenFaq] = useState<string | null>('about-0')

    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <SiteHeader />

            <main id="main-content" className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
                {/* ── Header ───────────────────────────────────── */}
                <div className="space-y-4">
                    <nav aria-label="Breadcrumb" className="text-[13px] text-[#050315]/60 flex items-center gap-2">
                        <Link href="/" className="hover:text-[#2f27ce] transition-colors no-underline">Home</Link>
                        <span>/</span>
                        <span className="text-[#050315] font-semibold">FAQ</span>
                    </nav>

                    <div className="max-w-2xl space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] text-[12px] font-extrabold text-[#2f27ce]">
                            <SparklesIcon size={13} /> Knowledge Base &amp; FAQ
                        </div>
                        <h1 className="text-[32px] sm:text-[44px] font-extrabold text-[#050315] tracking-tight leading-tight">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-[16px] sm:text-[17.5px] text-[#050315]/75 leading-relaxed">
                            Clear answers about scoring criteria, data privacy, PDF exports, and profile optimization strategies.
                        </p>
                    </div>
                </div>

                {/* ── Grouped FAQ Sections ──────────────────────── */}
                <div className="space-y-12">
                    {FAQ_SECTIONS.map((section) => (
                        <section
                            key={section.id}
                            id={`faq-section-${section.id}`}
                            className="scroll-mt-24 space-y-4"
                        >
                            <h2 className="text-[20px] font-extrabold text-[#050315] tracking-tight border-b border-[#dedcff] pb-2">
                                {section.title}
                            </h2>

                            <div className="space-y-3">
                                {section.faqs.map((item, fi) => {
                                    const key = `${section.id}-${fi}`
                                    const isOpen = openFaq === key

                                    return (
                                        <div
                                            key={key}
                                            className={`
                                                rounded-2xl transition-all duration-200 border
                                                ${isOpen
                                                    ? 'bg-[#dedcff]/30 border-[#2f27ce] shadow-sm'
                                                    : 'bg-white border-[#dedcff] hover:border-[#2f27ce]/60 shadow-xs'
                                                }
                                            `}
                                        >
                                            <button
                                                onClick={() => setOpenFaq(isOpen ? null : key)}
                                                className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f27ce] rounded-2xl"
                                                aria-expanded={isOpen}
                                            >
                                                <span className="text-[15.5px] font-bold text-[#050315] leading-snug">
                                                    {item.q}
                                                </span>
                                                <div className={`
                                                    w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shrink-0
                                                    ${isOpen
                                                        ? 'bg-[#2f27ce] text-[#fbfbfe] rotate-180 shadow-xs'
                                                        : 'bg-[#dedcff] text-[#2f27ce]'
                                                    }
                                                `}>
                                                    <ChevronDownIcon size={16} />
                                                </div>
                                            </button>

                                            {isOpen && (
                                                <div className="px-5 pb-5 pt-1 text-[14px] text-[#050315]/80 leading-relaxed animate-fade-in border-t border-[#dedcff]/70 mt-1">
                                                    {item.a}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    ))}
                </div>

                {/* ── Final Profile Score CTA (Aside Radiant Box) ─ */}
                <div className="bg-gradient-to-r from-[#dedcff]/60 via-white to-[#dedcff]/60 border-2 border-[#dedcff] rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-md shadow-[#2f27ce]/5">
                    <span className="inline-flex items-center gap-1.5 text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider bg-[#dedcff] px-3 py-1 rounded-full">
                        <SparklesIcon size={13} /> Instant Recruiter-Grade Audit
                    </span>
                    <h3 className="text-[22px] sm:text-[28px] font-extrabold text-[#050315] tracking-tight">
                        Get your free LinkedIn score &amp; roadmap
                    </h3>
                    <p className="text-[14.5px] text-[#050315]/75 max-w-md mx-auto leading-relaxed">
                        Upload your LinkedIn export to discover your profile rank and specific improvements in under 60 seconds.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/#upload"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[14.5px] font-bold shadow-lg shadow-[#2f27ce]/25 transition-all duration-150 no-underline cursor-pointer active:scale-95 whitespace-nowrap"
                        >
                            <span>Analyze Profile Free</span>
                            <ArrowRightIcon size={14} />
                        </Link>
                    </div>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}
