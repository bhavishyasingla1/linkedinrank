'use client'

import { CheckCircleIcon, ZapIcon, SearchIcon, FlameIcon, ShieldCheckIcon, TrendingUpIcon, UserCheckIcon } from '@/components/ui/Icons'

const SIGNALS = [
    { label: 'Target Job Title', value: 'Most Searched by Recruiters', icon: <SearchIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Numbers in Experience', value: '3x More Profile Views', icon: <FlameIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'First 120 Characters', value: 'What Recruiters See on Mobile', icon: <ZapIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Top 5 Core Skills', value: 'Matches Recruiter Filter Queries', icon: <TrendingUpIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Zero AI Buzzwords', value: 'Sounds Natural & Human', icon: <CheckCircleIcon size={13} className="text-[#2f27ce]" /> },
    { label: '100% Private Scan', value: 'Zero Data Saved or Stored', icon: <ShieldCheckIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'ATS Keyword Match', value: 'Passes Automated Screening', icon: <SearchIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Top 1% Benchmark', value: 'Scored Against Real Hires', icon: <UserCheckIcon size={13} className="text-[#2f27ce]" /> },
]

export default function LiveRecruiterSignalsMarquee() {
    return (
        <div className="relative w-full overflow-hidden py-3 border-y border-[#dedcff]/80 bg-gradient-to-r from-[#fbfbfe] via-[#dedcff]/20 to-[#fbfbfe] select-none">
            {/* Left & Right Gradient Fade Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#fbfbfe] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#fbfbfe] to-transparent z-10 pointer-events-none" />

            {/* Continuous Smooth Infinite Marquee */}
            <div className="flex w-max">
                {/* Track 1 */}
                <div className="flex shrink-0 items-center gap-3 pr-3 animate-marquee-scroll">
                    {SIGNALS.map((signal, i) => (
                        <div
                            key={`t1-${i}`}
                            className="inline-flex items-center justify-center text-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#dedcff] shadow-2xs text-[12px] font-bold whitespace-nowrap leading-none transition-all cursor-default"
                        >
                            <span className="w-5 h-5 rounded-full bg-[#dedcff] flex items-center justify-center shrink-0">
                                {signal.icon}
                            </span>
                            <span className="text-[#050315] font-semibold">{signal.label}</span>
                            <span className="w-1 h-1 rounded-full bg-[#2f27ce]/30" />
                            <span className="text-[#2f27ce] font-extrabold">{signal.value}</span>
                        </div>
                    ))}
                </div>

                {/* Track 2 (Exact Duplicate for Continuous Loop) */}
                <div className="flex shrink-0 items-center gap-3 pr-3 animate-marquee-scroll" aria-hidden="true">
                    {SIGNALS.map((signal, i) => (
                        <div
                            key={`t2-${i}`}
                            className="inline-flex items-center justify-center text-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#dedcff] shadow-2xs text-[12px] font-bold whitespace-nowrap leading-none transition-all cursor-default"
                        >
                            <span className="w-5 h-5 rounded-full bg-[#dedcff] flex items-center justify-center shrink-0">
                                {signal.icon}
                            </span>
                            <span className="text-[#050315] font-semibold">{signal.label}</span>
                            <span className="w-1 h-1 rounded-full bg-[#2f27ce]/30" />
                            <span className="text-[#2f27ce] font-extrabold">{signal.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
