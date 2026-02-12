'use client'

interface TierBadgeProps {
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
}

export default function TierBadge({ tier }: TierBadgeProps) {
    const config: Record<string, { color: string; bg: string; border: string }> = {
        Bronze: { color: '#cd7f32', bg: 'rgba(205, 127, 50, 0.08)', border: 'rgba(205, 127, 50, 0.2)' },
        Silver: { color: '#c0c0c0', bg: 'rgba(192, 192, 192, 0.08)', border: 'rgba(192, 192, 192, 0.2)' },
        Gold: { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.2)' },
        Platinum: { color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.08)', border: 'rgba(167, 139, 250, 0.2)' }
    }

    const { color, bg, border } = config[tier]

    return (
        <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
            style={{ color, backgroundColor: bg, border: `1px solid ${border}` }}
        >
            {tier}
        </span>
    )
}
