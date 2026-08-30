import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'
import NewsletterCard from '@/components/NewsletterCard'
import { SparklesIcon, ShieldCheckIcon, ArrowRightIcon } from '@/components/ui/Icons'

export const metadata: Metadata = {
    title: 'About LinkedInRank | Free LinkedIn Profile Scorer (2026)',
    description: 'LinkedInRank is a free, privacy-first LinkedIn profile scoring tool. Score your profile across 30+ signals, get AI recommendations, and improve your LinkedIn ranking.',
    keywords: 'about linkedinrank, linkedin profile scorer, linkedin analysis tool, free linkedin profile review, linkedin optimization, who built linkedinrank',
    alternates: { canonical: 'https://linkedinrank.com/about' },
    openGraph: {
        title: 'About LinkedInRank | Free LinkedIn Profile Scorer (2026)',
        description: 'Learn why LinkedInRank was built and how it helps professionals optimize their LinkedIn profiles with data-driven scoring.',
        url: 'https://linkedinrank.com/about',
    },
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <SiteHeader />

            {/* Hero */}
            <section className="relative pt-16 pb-12 overflow-hidden aside-hero-glow">
                <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#dedcff] border border-[#dedcff] shadow-xs">
                        <SparklesIcon size={14} className="text-[#2f27ce]" />
                        <span className="text-[13px] font-bold text-[#2f27ce]">About LinkedInRank</span>
                    </div>
                    <h1 className="text-[36px] sm:text-[48px] font-extrabold text-[#050315] tracking-tight leading-tight">
                        Why LinkedInRank Exists
                    </h1>
                    <p className="text-[16px] sm:text-[18px] text-[#050315]/75 max-w-xl mx-auto leading-relaxed">
                        Honest, structured feedback on the most important career asset you own — your LinkedIn profile.
                    </p>
                </div>
            </section>

            <main id="main-content" className="max-w-3xl mx-auto px-6 py-12 sm:py-16 space-y-14">
                {/* The Problem */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 shadow-xs font-bold">
                            !
                        </div>
                        <h2 className="text-[22px] font-extrabold text-[#050315] tracking-tight">The Problem</h2>
                    </div>
                    <p className="text-[15.5px] text-[#050315]/80 leading-relaxed">
                        LinkedIn is the most important professional platform in the world — over 1 billion members, and recruiters spend an average of just 7.4 seconds scanning a profile before deciding to reach out or move on. Yet most people have no idea how their profile actually reads to recruiters, hiring managers, or potential collaborators.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        {[
                            { stat: '1B+', label: 'LinkedIn members worldwide' },
                            { stat: '7.4s', label: 'Average recruiter scan time' },
                            { stat: '87%', label: 'Of recruiters use LinkedIn' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-[#dedcff] rounded-2xl p-5 text-center shadow-xs">
                                <span className="text-[24px] font-black text-[#2f27ce]">{item.stat}</span>
                                <p className="text-[11px] text-[#050315]/60 font-bold mt-1 uppercase tracking-wider">{item.label}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[15.5px] text-[#050315]/80 leading-relaxed pt-2">
                        The feedback gap is real. Most professionals either get no feedback on their profile, or they get vague advice like &ldquo;make it more engaging&rdquo; — which is not actionable. LinkedIn itself gives you a profile strength meter, but it rewards completion, not quality.
                    </p>
                </section>

                {/* The Solution */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 shadow-xs font-bold">
                            ✓
                        </div>
                        <h2 className="text-[22px] font-extrabold text-[#050315] tracking-tight">The Solution</h2>
                    </div>
                    <p className="text-[15.5px] text-[#050315]/80 leading-relaxed">
                        LinkedInRank provides a structured, transparent evaluation of your LinkedIn profile based on what is actually visible in your exported PDF — not vanity metrics, not engagement data, not follower counts. It evaluates the exact signals that recruiters and ATS engines index.
                    </p>
                    <div className="bg-[#dedcff]/30 border-2 border-[#dedcff] rounded-3xl p-7 space-y-4">
                        <p className="text-[11.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">What You Get</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { title: 'Score out of 100', desc: 'Across 6 categories with 30+ signals evaluated' },
                                { title: 'Category breakdown', desc: 'Headline, About, Experience, Skills, Education' },
                                { title: 'Improvement path', desc: 'Specific next steps ranked by estimated point impact' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-[#dedcff] rounded-2xl p-4 space-y-1 shadow-xs">
                                    <p className="text-[14px] font-bold text-[#050315]">{item.title}</p>
                                    <p className="text-[12.5px] text-[#050315]/70 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Principles */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 shadow-xs font-bold">
                            ★
                        </div>
                        <h2 className="text-[22px] font-extrabold text-[#050315] tracking-tight">Our Core Principles</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { title: 'Transparency over mystery', desc: 'Every scoring criterion is documented. No hidden algorithms, no black boxes.' },
                            { title: 'Fairness across career stages', desc: 'A student is not judged by the same standards as a VP. LinkedInRank detects career stage.' },
                            { title: 'Privacy by design', desc: 'No accounts, no storage, no cookies. Your PDF is processed entirely in memory.' },
                            { title: 'Actionable, not aspirational', desc: 'Every recommendation is specific enough to implement today with ready rewrites.' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-[#dedcff] rounded-3xl p-6 aside-card-shadow space-y-2">
                                <p className="text-[15px] font-bold text-[#050315]">{item.title}</p>
                                <p className="text-[13px] text-[#050315]/70 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Who Built This */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center shrink-0 shadow-xs font-bold">
                            @
                        </div>
                        <h2 className="text-[22px] font-extrabold text-[#050315] tracking-tight">Who Built This</h2>
                    </div>
                    <div className="bg-[#050315] text-[#fbfbfe] rounded-3xl p-8 shadow-xl space-y-5">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#2f27ce] to-[#433bff] flex items-center justify-center text-white text-[18px] font-bold shrink-0 shadow-md">
                                BS
                            </div>
                            <div>
                                <h3 className="text-[18px] font-bold text-white">Bhavishya Singla</h3>
                                <p className="text-[13px] text-[#dedcff]/80">Founder, LinkedInRank</p>
                            </div>
                        </div>
                        <p className="text-[14px] text-[#dedcff]/80 leading-relaxed">
                            A few years ago I started reviewing LinkedIn profiles for friends and colleagues. Most of them had the same problem: the profile looked complete, but it wasn&apos;t convincing. After studying how recruiters search and index profiles, I decided to build LinkedInRank to give every ambitious professional instant, algorithmic feedback.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <a
                                href="https://www.linkedin.com/in/bhavishyasingla1/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[12.5px] font-bold text-white bg-[#2f27ce] hover:bg-[#433bff] px-4 py-2 rounded-full no-underline transition-colors shadow-sm"
                            >
                                Connect on LinkedIn &rarr;
                            </a>
                        </div>
                    </div>

                    <NewsletterCard variant="banner" />
                </section>

                {/* CTA */}
                <div className="bg-gradient-to-r from-[#dedcff]/60 via-white to-[#dedcff]/60 border-2 border-[#dedcff] rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-md shadow-[#2f27ce]/5">
                    <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#050315] tracking-tight">See How Your Profile Really Ranks</h2>
                    <p className="text-[14.5px] text-[#050315]/75 max-w-md mx-auto leading-relaxed">
                        Upload your LinkedIn PDF and get a data-backed score with personalized recommendations. Free, private, and instant.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/#upload"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[14.5px] font-bold shadow-lg shadow-[#2f27ce]/25 transition-all no-underline cursor-pointer active:scale-95"
                        >
                            <span>Analyze Your Profile Free</span>
                            <ArrowRightIcon size={14} />
                        </Link>
                    </div>
                </div>

                <RelatedPages currentSlug="about" />
            </main>

            <FooterLayout />
        </div>
    )
}
