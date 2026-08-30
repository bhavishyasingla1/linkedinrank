import { ImageResponse } from 'next/og'

export const alt = 'LinkedInRank — Free LinkedIn Profile Scorer & Algorithm Analyzer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#050315',
                    backgroundImage: 'radial-gradient(circle at 85% 15%, rgba(47, 39, 206, 0.45) 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(67, 59, 255, 0.25) 0%, transparent 50%)',
                    padding: '56px 64px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    position: 'relative',
                }}
            >
                {/* Top Accent Gradient Line */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 6,
                        display: 'flex',
                        background: 'linear-gradient(90deg, #2f27ce 0%, #7c75ff 50%, #dedcff 100%)',
                    }}
                />

                {/* Top Bar: Brand & Tag */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    {/* Brand Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 12,
                                background: 'linear-gradient(135deg, #2f27ce, #433bff)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 24px rgba(47, 39, 206, 0.5)',
                            }}
                        >
                            <span style={{ fontSize: 24, fontWeight: 900, color: '#ffffff' }}>in</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <span style={{ fontSize: 32, fontWeight: 900, color: '#ffffff', letterSpacing: -0.5 }}>
                                LinkedIn
                            </span>
                            <span
                                style={{
                                    fontSize: 32,
                                    fontWeight: 900,
                                    color: '#7c75ff',
                                    letterSpacing: -0.5,
                                    marginLeft: 2,
                                }}
                            >
                                Rank
                            </span>
                        </div>
                    </div>

                    {/* Category / Pill Badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '8px 20px',
                            borderRadius: 999,
                            background: 'rgba(222, 220, 255, 0.12)',
                            border: '1px solid rgba(222, 220, 255, 0.3)',
                        }}
                    >
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: '#10b981',
                                display: 'flex',
                            }}
                        />
                        <span style={{ fontSize: 14, fontWeight: 800, color: '#dedcff', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                            2026 Recruiter Algorithm Audit
                        </span>
                    </div>
                </div>

                {/* Main Middle Content Grid */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 48,
                        marginTop: 20,
                        marginBottom: 20,
                    }}
                >
                    {/* Left: Value Prop */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            maxWidth: 620,
                        }}
                    >
                        <h1
                            style={{
                                fontSize: 52,
                                fontWeight: 900,
                                color: '#ffffff',
                                lineHeight: 1.12,
                                letterSpacing: -1.5,
                                margin: 0,
                                marginBottom: 18,
                            }}
                        >
                            Score Your LinkedIn Profile Out of 100
                        </h1>
                        <p
                            style={{
                                fontSize: 21,
                                color: 'rgba(251, 251, 254, 0.75)',
                                lineHeight: 1.45,
                                margin: 0,
                                marginBottom: 28,
                            }}
                        >
                            Audit 30+ algorithmic signals. Discover missing recruiter keywords and get prioritized fixes in 60 seconds.
                        </p>

                        {/* Feature Badges */}
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {['30+ Ranking Signals', '100% Free & Private', 'Recruiter Search Ready'].map((pill) => (
                                <div
                                    key={pill}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '7px 16px',
                                        borderRadius: 12,
                                        background: 'rgba(255, 255, 255, 0.06)',
                                        border: '1px solid rgba(255, 255, 255, 0.12)',
                                        color: '#ffffff',
                                        fontSize: 14,
                                        fontWeight: 700,
                                    }}
                                >
                                    {pill}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Glassmorphic Score Card Mockup */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: 380,
                            padding: '28px 32px',
                            borderRadius: 28,
                            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03))',
                            border: '1px solid rgba(222, 220, 255, 0.25)',
                            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        {/* Score Header */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                paddingBottom: 16,
                                marginBottom: 18,
                            }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: 12, fontWeight: 800, color: '#dedcff', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    Recruiter Rank
                                </span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                                    <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#10b981', display: 'flex' }} />
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>
                                        Top 5% Candidate
                                    </span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                                <span style={{ fontSize: 48, fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                                    88
                                </span>
                                <span style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)' }}>
                                    /100
                                </span>
                            </div>
                        </div>

                        {/* Breakdown Metrics */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                                { name: 'Headline Keyword Match', score: '94%', width: '94%', color: '#10b981' },
                                { name: 'About Section Depth', score: '88%', width: '88%', color: '#7c75ff' },
                                { name: 'Quantified Bullets', score: '92%', width: '92%', color: '#2f27ce' },
                            ].map((m) => (
                                <div key={m.name} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: 'rgba(255, 255, 255, 0.75)' }}>
                                        <span>{m.name}</span>
                                        <span style={{ color: '#ffffff' }}>{m.score}</span>
                                    </div>
                                    <div style={{ width: '100%', height: 6, borderRadius: 999, background: 'rgba(255, 255, 255, 0.1)', display: 'flex', overflow: 'hidden' }}>
                                        <div style={{ width: m.width, height: '100%', borderRadius: 999, background: m.color, display: 'flex' }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Status Pill */}
                        <div
                            style={{
                                marginTop: 18,
                                padding: '8px 12px',
                                borderRadius: 10,
                                background: 'rgba(16, 185, 129, 0.12)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 6,
                            }}
                        >
                            <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#10b981', display: 'flex' }} />
                            <span style={{ fontSize: 12, fontWeight: 800, color: '#10b981' }}>
                                Recruiter Search Index Passed
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer Bar */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        paddingTop: 18,
                    }}
                >
                    <span style={{ fontSize: 15, color: 'rgba(251, 251, 254, 0.5)', fontWeight: 600 }}>
                        Free AI Profile Audit &amp; Standalone Generators
                    </span>
                    <span style={{ fontSize: 17, color: '#dedcff', fontWeight: 800, letterSpacing: 0.5 }}>
                        linkedinrank.com
                    </span>
                </div>
            </div>
        ),
        { ...size }
    )
}
