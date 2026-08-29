'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@/components/ui/Icons'

const FAQ_ITEMS = [
    {
        q: 'How does LinkedInRank score my profile?',
        a: 'LinkedInRank evaluates your profile across 30+ signals that recruiters scan in seconds: headline positioning, keyword discoverability, About section structure, quantifiable experience metrics, and section completeness. Each category is weighted and totaled into a clear score out of 100.',
    },
    {
        q: 'Is my LinkedIn data stored or shared?',
        a: 'No. Your PDF is parsed in temporary browser memory for scoring and never written to a permanent database or shared with third parties. No login, password, or LinkedIn connection required.',
    },
    {
        q: 'What file do I need to upload?',
        a: 'Your LinkedIn profile PDF export. In LinkedIn, go to your profile, click "More" or the "..." icon under your headline, and select "Save to PDF". The resulting file is typically under 1MB and contains all your public profile sections.',
    },
    {
        q: 'Can I use AI to improve my profile after the analysis?',
        a: 'Yes. LinkedInRank gives you specific rewrites and diagnostic feedback. You can copy the recommendations directly or use our free prompt blocks with ChatGPT, Claude, or Gemini to rewrite any section while keeping your authentic voice.',
    },
    {
        q: 'Who is LinkedInRank built for?',
        a: 'Anyone looking to increase their professional visibility — job seekers optimizing for recruiter search filters, students crafting internship profiles, founders building industry credibility, and professionals auditing their personal brand.',
    },
    {
        q: 'How is LinkedInRank different from LinkedIn SSI?',
        a: 'LinkedIn\'s Social Selling Index (SSI) measures your sales engagement and outreach activity. LinkedInRank specifically audits your profile content, keyword density, and search discoverability from a recruiter or client perspective.',
    },
    {
        q: 'What is considered a good LinkedIn score?',
        a: 'Scores are structured into tiers: Bronze (0–54), Silver (55–69), Gold (70–84), and Platinum (85–100). Most unoptimized profiles score between 45–62. A score of 75+ puts your profile in the top tier for discoverability.',
    },
]

export default function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const toggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx)
    }

    return (
        <div className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
            {FAQ_ITEMS.map((item, i) => {
                const isOpen = openIndex === i
                return (
                    <div key={i} className="transition-colors">
                        <button
                            onClick={() => toggle(i)}
                            aria-expanded={isOpen}
                            className="w-full flex items-center justify-between py-4 sm:py-5 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] rounded-md"
                        >
                            <span className="text-[15px] sm:text-[16px] font-semibold text-[#0F172A] group-hover:text-[#0A66C2] transition-colors pr-4">
                                {item.q}
                            </span>
                            <ChevronDownIcon
                                size={18}
                                className={`text-[#64748B] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0A66C2]' : ''}`}
                            />
                        </button>
                        {isOpen && (
                            <div className="pb-5 pr-6 text-[14px] text-[#475569] leading-relaxed animate-fade-in">
                                {item.a}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
