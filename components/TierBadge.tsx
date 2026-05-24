'use client'

interface TierBadgeProps {
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'bronze' | 'silver' | 'gold' | 'platinum'
}

export default function TierBadge({ tier }: TierBadgeProps) {
    // Normalize to Title Case to handle both 'gold' and 'Gold'
    const normalizedTier = tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase()

    const config: Record<string, { color: string; bg: string; border: string }> = {
        Bronze: { color: '#cd7f32', bg: 'rgba(205, 127, 50, 0.08)', border: 'rgba(205, 127, 50, 0.2)' },
        Silver: { color: '#c0c0c0', bg: 'rgba(192, 192, 192, 0.08)', border: 'rgba(192, 192, 192, 0.2)' },
        Gold: { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.2)' },
        Platinum: { color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.08)', border: 'rgba(167, 139, 250, 0.2)' }
    }

    const styles = config[normalizedTier] || config['Bronze']
    const { color, bg, border } = styles

    return (
        <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
            style={{ color, backgroundColor: bg, border: `1px solid ${border}` }}
        >
            {normalizedTier}
        </span>
    )
}
