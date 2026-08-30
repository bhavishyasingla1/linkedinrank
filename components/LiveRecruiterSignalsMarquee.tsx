'use client'

import { SparklesIcon, CheckCircleIcon, ZapIcon, SearchIcon, FlameIcon, ShieldCheckIcon } from '@/components/ui/Icons'

const SIGNALS = [
    { label: 'Role Discoverability', value: '40% Search Weight', icon: <SearchIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'CAR Metric Density', value: '3.2x Recruiter Reach', icon: <FlameIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Mobile Snip Cutoff', value: '120 Chars Strict', icon: <ZapIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Boolean Skill Index', value: 'Top 5 Standardized', icon: <SparklesIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Anti-AI Tone Check', value: '0 Clichés Verified', icon: <CheckCircleIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Privacy Engine', value: '100% In-Memory Audit', icon: <ShieldCheckIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Recruiter Filter Sync', value: 'ATS Compliant', icon: <SearchIcon size={13} className="text-[#2f27ce]" /> },
    { label: 'Achievement Impact', value: 'Quantified Formulas', icon: <FlameIcon size={13} className="text-[#2f27ce]" /> },
]

export default function LiveRecruiterSignalsMarquee() {
    return (
        <div className="w-full overflow-hidden py-4 border-y border-[#dedcff]/70 bg-gradient-to-r from-[#fbfbfe] via-[#dedcff]/25 to-[#fbfbfe] select-none">
            <div className="animate-marquee flex items-center gap-4">
                {/* Duplicate list for seamless infinite loop */}
                {[...SIGNALS, ...SIGNALS, ...SIGNALS].map((signal, i) => (
                    <div
                        key={i}
                        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-[#dedcff] shadow-2xs text-[12.5px] whitespace-nowrap hover:border-[#2f27ce] hover:shadow-xs transition-all cursor-default group"
                    >
                        <span className="w-5 h-5 rounded-full bg-[#dedcff] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            {signal.icon}
                        </span>
                        <span className="font-bold text-[#050315]">{signal.label}</span>
                        <span className="w-1 h-1 rounded-full bg-[#2f27ce]/40" />
                        <span className="font-extrabold text-[#2f27ce]">{signal.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
