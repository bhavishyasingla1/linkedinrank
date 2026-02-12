import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'LinkedInRank — Free LinkedIn Profile Scorer & Analyzer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #0A0F1C 0%, #0A2540 50%, #0A0F1C 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 6,
                        background: 'linear-gradient(90deg, #0A66C2, #4F46E5, #0A66C2)',
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        border: '4px solid #0A66C2',
                        marginBottom: 32,
                    }}
                >
                    <span style={{ fontSize: 48, fontWeight: 800, color: '#FFFFFF' }}>74</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <span style={{ fontSize: 48, fontWeight: 800, color: '#FFFFFF', letterSpacing: -1 }}>LinkedIn</span>
                    <span style={{ fontSize: 48, fontWeight: 800, color: '#0A66C2', letterSpacing: -1 }}>Rank</span>
                </div>
                <p style={{ fontSize: 24, color: 'rgba(255,255,255,0.7)', marginTop: 0, marginBottom: 32, maxWidth: 700, textAlign: 'center', lineHeight: 1.4 }}>
                    Score your LinkedIn profile across 30+ signals. Get a free, instant analysis with AI-powered recommendations.
                </p>
                <div style={{ display: 'flex', gap: 16 }}>
                    {['Free & Private', 'No Login Required', 'Under 60 Seconds'].map((text) => (
                        <div key={text} style={{ padding: '8px 20px', borderRadius: 999, border: '1px solid rgba(10,102,194,0.4)', background: 'rgba(10,102,194,0.15)', color: '#93C5FD', fontSize: 16, fontWeight: 600 }}>{text}</div>
                    ))}
                </div>
                <p style={{ position: 'absolute', bottom: 24, fontSize: 16, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>linkedinrank.com</p>
            </div>
        ),
        { ...size }
    )
}
