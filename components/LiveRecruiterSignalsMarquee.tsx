'use client'

import { SparklesIcon, CheckCircleIcon, ZapIcon, SearchIcon, FlameIcon, ShieldCheckIcon } from '@/components/ui/Icons'

const SIGNALS = [
    { label: 'Role Discoverability', value: '40% Recruiter Weight', icon: <SearchIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'CAR Impact Metrics', value: '3.2x Search Reach', icon: <FlameIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Mobile Snip Limit', value: '120 Chars Strict', icon: <ZapIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Boolean Skill Index', value: 'Top 5 Stack Match', icon: <SparklesIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Anti-AI Tone Filter', value: '0 Robotic Clichés', icon: <CheckCircleIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Privacy Engine', value: '100% In-Memory Audit', icon: <ShieldCheckIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Recruiter Filter Sync', value: 'ATS Search Ready', icon: <SearchIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Benchmark Standard', value: 'Top 1% Profiles', icon: <FlameIcon size={13} className="text-[#2f27ce]" /> },
]

export default function LiveRecruiterSignalsMarquee() {
    return (
        <div className="relative w-full overflow-hidden py-3.5 border-y border-[#dedcff]/80 bg-gradient-to-r from-[#fbfbfe] via-[#dedcff]/20 to-[#fbfbfe] select-none group">
            {/* Left & Right Gradient Fade Masks for luxury edge blending */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#fbfbfe] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#fbfbfe] to-transparent z-10 pointer-events-none" />

            {/* Seamless Double Track Marquee Loop */}
            <div className="flex w-max">
                {/* Track 1 */}
                <div className="flex shrink-0 items-center gap-3.5 pr-3.5 animate-marquee-track">
                    {SIGNALS.map((signal, i) => (
                        <div
                            key={`t1-${i}`}
                            className="inline-flex items-center justify-center text-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#dedcff] shadow-2xs text-[12.5px] font-bold whitespace-nowrap leading-none transition-all hover:border-[#2f27ce] cursor-default"
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
                <div className="flex shrink-0 items-center gap-3.5 pr-3.5 animate-marquee-track" aria-hidden="true">
                    {SIGNALS.map((signal, i) => (
                        <div
                            key={`t2-${i}`}
                            className="inline-flex items-center justify-center text-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#dedcff] shadow-2xs text-[12.5px] font-bold whitespace-nowrap leading-none transition-all hover:border-[#2f27ce] cursor-default"
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
