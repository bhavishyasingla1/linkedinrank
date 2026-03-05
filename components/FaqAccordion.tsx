'use client'

import { useState } from 'react'

const FAQ_ITEMS = [
    { q: 'How does LinkedInRank score my profile?', a: 'LinkedInRank looks at the same things recruiters scan quickly — your headline, about section, experience, skills, education, and overall completeness. Each section is scored individually across 30+ signals. Your total is out of 100.' },
    { q: 'Is my LinkedIn data stored or shared?', a: 'No. Your file is analyzed in memory and deleted right away. We don\'t store anything, don\'t create accounts, and don\'t track you. Your data stays yours — always.' },
    { q: 'What file do I need to upload?', a: 'Your LinkedIn profile PDF export. To get it: go to your LinkedIn profile → click "More" → select "Save to PDF." The file is usually under 1MB. We only accept PDF format.' },
    { q: 'Can I use AI to improve my profile after the analysis?', a: 'Yes! Download your LinkedInRank report and upload it alongside your LinkedIn PDF to ChatGPT, Claude, or Gemini. Ask the AI to rewrite your sections based on the scoring feedback. We also have 26 ready-to-use AI prompts for every profile section.' },
    { q: 'Who is LinkedInRank for?', a: 'Anyone with a LinkedIn profile — students building their first profile, job seekers optimizing for recruiters, founders establishing credibility, and experienced professionals auditing their presence. Scoring adapts to your career stage automatically.' },
    { q: 'How is this different from other LinkedIn tools?', a: 'Most tools give generic tips. LinkedInRank gives you a structured score with section-by-section breakdowns, specific improvements you can apply immediately, and concrete before/after rewrites. It\'s free, private, and takes under 60 seconds.' },
    { q: 'What\'s a good LinkedIn score?', a: 'Scores are tiered: Bronze (0-54), Silver (55-69), Gold (70-84), and Platinum (85-100). Most profiles score between 40-65. A score above 70 puts you in the top tier of optimized profiles.' },
]

export default function FaqAccordion() {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    return (
        <div className="space-y-0">
            {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="border-b border-gray-100">
                    <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between py-5 text-left"
                    >
                        <span className="text-[15px] font-semibold text-[#0A0F1C] pr-4">{item.q}</span>
                        <svg className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {openFaq === i && (
                        <p className="text-sm text-[#4B5563] pb-5 leading-relaxed animate-fade-in">{item.a}</p>
                    )}
                </div>
            ))}
        </div>
    )
}
