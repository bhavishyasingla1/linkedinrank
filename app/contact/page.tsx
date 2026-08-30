import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import { SparklesIcon, LinkedInIcon, MailIcon } from '@/components/ui/Icons'

export const metadata: Metadata = {
    title: 'Contact LinkedInRank | Get in Touch',
    description: 'Have questions about LinkedInRank, LinkedIn profile scoring, or need help? Email us at hello@linkedinrank.com or connect via LinkedIn. We respond to every message.',
    keywords: 'contact linkedinrank, linkedinrank support, linkedin profile help, linkedinrank feedback',
    alternates: { canonical: 'https://linkedinrank.com/contact' },
    openGraph: {
        title: 'Contact LinkedInRank',
        description: 'Get in touch with the LinkedInRank team. We respond to every message.',
        url: 'https://linkedinrank.com/contact',
    },
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <SiteHeader />

            {/* Hero */}
            <section className="relative pt-16 pb-14 sm:pt-20 sm:pb-16 overflow-hidden aside-hero-glow">
                <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#dedcff] border border-[#dedcff] text-[12px] font-extrabold text-[#2f27ce] shadow-2xs leading-none">
                        <SparklesIcon size={13} />
                        <span>Direct Channel</span>
                    </div>
                    <h1 className="text-[32px] sm:text-[44px] font-extrabold text-[#050315] tracking-tight leading-tight">
                        Get in Touch
                    </h1>
                    <p className="text-[15px] sm:text-[16.5px] text-[#050315]/75 max-w-lg mx-auto leading-relaxed">
                        For questions, algorithmic feedback, or collaboration inquiries—we respond to every note.
                    </p>
                </div>
            </section>

            <main id="main-content" className="flex-1 max-w-2xl mx-auto px-6 py-12 sm:py-20 space-y-8 w-full">
                {/* Founder Card */}
                <div className="bg-white border border-[#dedcff] rounded-3xl p-8 text-center shadow-xs space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2f27ce] to-[#433bff] flex items-center justify-center mx-auto text-white shadow-md shadow-[#2f27ce]/25">
                        <LinkedInIcon size={28} />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-[20px] font-extrabold text-[#050315] tracking-tight">
                            Connect with the Founder
                        </h2>
                        <p className="text-[13.5px] text-[#050315]/70">Bhavishya Singla</p>
                    </div>
                    <p className="text-[14px] text-[#050315]/75 max-w-md mx-auto leading-relaxed">
                        Have a feature idea or technical feedback on your profile scan? Message directly on LinkedIn.
                    </p>
                    <div className="pt-2">
                        <a
                            href="https://www.linkedin.com/in/bhavishyasingla1/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white text-[13.5px] font-bold shadow-sm transition-all no-underline cursor-pointer active:scale-95"
                        >
                            <LinkedInIcon size={16} />
                            <span>Message on LinkedIn</span>
                        </a>
                    </div>
                </div>

                {/* Company & Email Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white border border-[#dedcff] rounded-2xl p-6 text-center shadow-xs space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center mx-auto">
                            <LinkedInIcon size={20} />
                        </div>
                        <h3 className="text-[16px] font-bold text-[#050315]">Company Updates</h3>
                        <p className="text-[12.5px] text-[#050315]/70">Follow LinkedInRank for algorithm updates and new tools.</p>
                        <a
                            href="https://www.linkedin.com/company/linkedin-rank/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#2f27ce] hover:text-[#433bff] no-underline"
                        >
                            <span>Follow on LinkedIn &rarr;</span>
                        </a>
                    </div>

                    <div className="bg-white border border-[#dedcff] rounded-2xl p-6 text-center shadow-xs space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-[#dedcff] text-[#2f27ce] flex items-center justify-center mx-auto">
                            <MailIcon size={20} />
                        </div>
                        <h3 className="text-[16px] font-bold text-[#050315]">Email Support</h3>
                        <p className="text-[12.5px] text-[#050315]/70">For business inquiries, partnerships, and bug reports.</p>
                        <a
                            href="mailto:hello@linkedinrank.com"
                            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#2f27ce] hover:text-[#433bff] no-underline"
                        >
                            <span>hello@linkedinrank.com &rarr;</span>
                        </a>
                    </div>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}
