'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import QRCode from 'qrcode'

type PatternType = 'square' | 'dots' | 'rounded' | 'classy' | 'smooth'
type FrameType = 'none' | 'rounded' | 'badge'

const PATTERN_OPTIONS: { label: string; value: PatternType }[] = [
    { label: 'Square', value: 'square' },
    { label: 'Dots', value: 'dots' },
    { label: 'Rounded', value: 'rounded' },
    { label: 'Classy', value: 'classy' },
    { label: 'Smooth', value: 'smooth' },
]

const FRAME_OPTIONS: { label: string; value: FrameType }[] = [
    { label: 'None', value: 'none' },
    { label: 'Rounded', value: 'rounded' },
    { label: 'Badge', value: 'badge' },
]

const COLOR_PRESETS = ['#000000', '#0A66C2', '#7C3AED', '#10B981', '#EF4444', '#F59E0B']

export default function QRCodeGeneratorTool() {
    const [url, setUrl] = useState('')
    const [pattern, setPattern] = useState<PatternType>('rounded')
    const [qrColor, setQrColor] = useState('#000000')
    const [frame, setFrame] = useState<FrameType>('none')
    const [logo, setLogo] = useState<string | null>(null)
    const [logoType, setLogoType] = useState<'text' | 'emoji' | 'upload'>('text')
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [downloaded, setDownloaded] = useState(false)
    const [error, setError] = useState('')

    const generateQR = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const size = 600
        const padding = 40
        const qrSize = size - padding * 2
        canvas.width = size
        canvas.height = size

        // Clear
        ctx.clearRect(0, 0, size, size)

        // Draw white background
        ctx.fillStyle = '#FFFFFF'
        if (frame === 'rounded') {
            roundRect(ctx, 0, 0, size, size, 24)
            ctx.fill()
        } else {
            ctx.fillRect(0, 0, size, size)
        }

        if (!url.trim()) {
            // Draw placeholder
            ctx.strokeStyle = '#E5E7EB'
            ctx.lineWidth = 2
            ctx.setLineDash([8, 8])
            roundRect(ctx, padding, padding, qrSize, qrSize, 12)
            ctx.stroke()
            ctx.setLineDash([])

            // Placeholder icon
            ctx.fillStyle = '#D1D5DB'
            ctx.font = '48px -apple-system, sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText('⬡', size / 2, size / 2 - 15)

            ctx.fillStyle = '#9CA3AF'
            ctx.font = '14px -apple-system, sans-serif'
            ctx.fillText('Enter a URL to generate', size / 2, size / 2 + 30)
            return
        }

        try {
            setError('')

            // Generate QR code data (synchronous API)
            const qrData = QRCode.create(url, {
                errorCorrectionLevel: logo ? 'H' : 'M',
            })

            const modules = qrData.modules
            const moduleCount = modules.size
            const moduleSize = qrSize / moduleCount
            const offset = padding

            // Draw modules based on pattern
            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    if (!modules.get(row, col)) continue

                    const x = offset + col * moduleSize
                    const y = offset + row * moduleSize

                    ctx.fillStyle = qrColor

                    // Check if this is a finder pattern (top-left, top-right, bottom-left corners)
                    const isFinderPattern = (
                        (row < 7 && col < 7) ||
                        (row < 7 && col >= moduleCount - 7) ||
                        (row >= moduleCount - 7 && col < 7)
                    )

                    switch (pattern) {
                        case 'square':
                            ctx.fillRect(x, y, moduleSize, moduleSize)
                            break

                        case 'dots':
                            ctx.beginPath()
                            ctx.arc(
                                x + moduleSize / 2,
                                y + moduleSize / 2,
                                moduleSize * (isFinderPattern ? 0.5 : 0.4),
                                0, Math.PI * 2
                            )
                            ctx.fill()
                            break

                        case 'rounded':
                            if (isFinderPattern) {
                                ctx.fillRect(x, y, moduleSize, moduleSize)
                            } else {
                                roundRect(ctx, x + 0.5, y + 0.5, moduleSize - 1, moduleSize - 1, moduleSize * 0.3)
                                ctx.fill()
                            }
                            break

                        case 'classy':
                            if (isFinderPattern) {
                                // Rounded squares for finder patterns
                                roundRect(ctx, x, y, moduleSize, moduleSize, moduleSize * 0.2)
                                ctx.fill()
                            } else {
                                // Diamond-ish shape
                                const cx = x + moduleSize / 2
                                const cy = y + moduleSize / 2
                                const r = moduleSize * 0.45
                                ctx.beginPath()
                                ctx.moveTo(cx, cy - r)
                                ctx.lineTo(cx + r, cy)
                                ctx.lineTo(cx, cy + r)
                                ctx.lineTo(cx - r, cy)
                                ctx.closePath()
                                ctx.fill()
                            }
                            break

                        case 'smooth':
                            roundRect(ctx, x + 0.5, y + 0.5, moduleSize - 1, moduleSize - 1, moduleSize * 0.5)
                            ctx.fill()
                            break
                    }
                }
            }

            // Draw logo in center if provided
            if (logo) {
                const logoSize = qrSize * 0.2
                const logoX = size / 2 - logoSize / 2
                const logoY = size / 2 - logoSize / 2

                // White background behind logo
                ctx.fillStyle = '#FFFFFF'
                roundRect(ctx, logoX - 6, logoY - 6, logoSize + 12, logoSize + 12, 10)
                ctx.fill()

                if (logoType === 'upload') {
                    const logoImg = new Image()
                    logoImg.crossOrigin = 'anonymous'
                    logoImg.onload = () => {
                        ctx.save()
                        roundRect(ctx, logoX, logoY, logoSize, logoSize, 8)
                        ctx.clip()
                        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)
                        ctx.restore()
                    }
                    logoImg.src = logo
                } else if (logoType === 'text') {
                    ctx.fillStyle = qrColor
                    ctx.font = `bold ${logoSize * 0.4}px -apple-system, sans-serif`
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillText('in', size / 2, size / 2)
                } else if (logoType === 'emoji') {
                    ctx.font = `${logoSize * 0.6}px -apple-system, sans-serif`
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillText('😊', size / 2, size / 2)
                }
            }

            // Draw frame badge
            if (frame === 'badge') {
                const badgeHeight = 36
                const badgeY = size - padding - badgeHeight + 8
                const badgeWidth = 160
                const badgeX = size / 2 - badgeWidth / 2

                ctx.fillStyle = qrColor
                roundRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 18)
                ctx.fill()

                ctx.fillStyle = '#FFFFFF'
                ctx.font = 'bold 13px -apple-system, sans-serif'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText('Scan to connect', badgeX + badgeWidth / 2, badgeY + badgeHeight / 2)
            }

        } catch {
            setError('Invalid URL. Please enter a valid web address.')

            // Draw error state
            ctx.fillStyle = '#FEF2F2'
            roundRect(ctx, padding, padding, qrSize, qrSize, 12)
            ctx.fill()

            ctx.fillStyle = '#EF4444'
            ctx.font = '14px -apple-system, sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText('Invalid URL', size / 2, size / 2)
        }
    }, [url, pattern, qrColor, frame, logo, logoType])

    useEffect(() => {
        generateQR()
    }, [generateQR])

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => {
            setLogo(ev.target?.result as string)
            setLogoType('upload')
        }
        reader.readAsDataURL(file)
    }

    const handleDownload = () => {
        const canvas = canvasRef.current
        if (!canvas || !url.trim()) return
        const link = document.createElement('a')
        link.download = 'linkedin-qr-code.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
        setDownloaded(true)
        setTimeout(() => setDownloaded(false), 3000)
    }

    const handleReset = () => {
        setUrl('')
        setPattern('rounded')
        setQrColor('#000000')
        setFrame('none')
        setLogo(null)
        setLogoType('text')
        setError('')
    }

    // Derive display info
    const patternLabel = PATTERN_OPTIONS.find(p => p.value === pattern)?.label || 'Rounded'
    const frameLabel = FRAME_OPTIONS.find(f => f.value === frame)?.label || 'None'
    const logoLabel = logo ? (logoType === 'upload' ? 'Custom' : logoType === 'text' ? 'LinkedIn' : 'Emoji') : 'No logo'

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A0F1C] to-[#374151] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h2 className="font-semibold text-[#0A0F1C] text-[15px]">QR Code Generator</h2>
                        <p className="text-[11px] text-[#9CA3AF]">Create beautiful QR codes for your LinkedIn profile</p>
                    </div>
                    <button onClick={handleReset} className="text-[11px] text-[#9CA3AF] hover:text-[#6B7280] transition-colors">Reset</button>
                </div>
            </div>

            <div className="p-5 space-y-5">
                {/* Preview | prominent at the top */}
                <div className="flex flex-col items-center">
                    <div className="bg-[#F8FAFC] rounded-2xl p-6 w-full flex flex-col items-center">
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
                            <canvas
                                ref={canvasRef}
                                className="w-64 h-64"
                            />
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <span className="text-[10px] font-medium text-[#9CA3AF] bg-white px-2 py-0.5 rounded-full border border-gray-100">{patternLabel}</span>
                            <span className="text-[10px] font-medium text-[#9CA3AF] bg-white px-2 py-0.5 rounded-full border border-gray-100">{frameLabel}</span>
                            <span className="text-[10px] font-medium text-[#9CA3AF] bg-white px-2 py-0.5 rounded-full border border-gray-100">{logoLabel}</span>
                        </div>
                    </div>
                </div>

                {/* URL Input */}
                <div>
                    <label className="block text-xs font-medium text-[#4B5563] mb-1.5">LinkedIn URL</label>
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-6.364-6.364L4.757 8.25" />
                        </svg>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]/20 transition-all"
                        />
                    </div>
                    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>

                {/* Style Options */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-4 py-2.5 bg-[#F8FAFC] border-b border-gray-200">
                        <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Style</span>
                    </div>
                    <div className="p-4 space-y-4">
                        {/* Pattern */}
                        <div>
                            <label className="block text-xs font-medium text-[#4B5563] mb-2">Pattern</label>
                            <div className="flex flex-wrap gap-1.5">
                                {PATTERN_OPTIONS.map(p => (
                                    <button
                                        key={p.value}
                                        onClick={() => setPattern(p.value)}
                                        className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all ${pattern === p.value
                                                ? 'border-gray-800 bg-gray-900 text-white font-medium'
                                                : 'border-gray-200 text-[#6B7280] hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color */}
                        <div>
                            <label className="block text-xs font-medium text-[#4B5563] mb-2">Color</label>
                            <div className="flex items-center gap-2">
                                {COLOR_PRESETS.map((c, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setQrColor(c)}
                                        className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-105 ${qrColor === c ? 'border-gray-800 scale-110 shadow-sm' : 'border-gray-100'
                                            }`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                                <input
                                    type="text"
                                    value={qrColor}
                                    onChange={(e) => setQrColor(e.target.value)}
                                    className="w-20 px-2 py-1 text-[11px] border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A66C2] font-mono text-[#6B7280] ml-1"
                                />
                            </div>
                        </div>

                        {/* Frame */}
                        <div>
                            <label className="block text-xs font-medium text-[#4B5563] mb-2">Frame</label>
                            <div className="flex gap-1.5">
                                {FRAME_OPTIONS.map(f => (
                                    <button
                                        key={f.value}
                                        onClick={() => setFrame(f.value)}
                                        className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all ${frame === f.value
                                                ? 'border-gray-800 bg-gray-900 text-white font-medium'
                                                : 'border-gray-200 text-[#6B7280] hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logo Options */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-4 py-2.5 bg-[#F8FAFC] border-b border-gray-200">
                        <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Logo (Optional)</span>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => { setLogo(null); setLogoType('text') }}
                                className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all text-center ${!logo ? 'border-[#0A66C2] bg-[#F0F7FF] text-[#0A66C2]' : 'border-gray-200 text-[#6B7280] hover:border-gray-300'
                                    }`}
                            >
                                None
                            </button>
                            <button
                                onClick={() => { setLogo('linkedin'); setLogoType('text') }}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all text-center ${logoType === 'text' && logo ? 'border-[#0A66C2] bg-[#F0F7FF] text-[#0A66C2]' : 'border-gray-200 text-[#6B7280] hover:border-gray-300'
                                    }`}
                            >
                                in
                            </button>
                            <button
                                onClick={() => { setLogo('emoji'); setLogoType('emoji') }}
                                className={`flex-1 py-2 text-xs rounded-lg border transition-all text-center ${logoType === 'emoji' && logo ? 'border-[#0A66C2] bg-[#F0F7FF]' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                😊
                            </button>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all text-center ${logoType === 'upload' && logo ? 'border-[#0A66C2] bg-[#F0F7FF] text-[#0A66C2]' : 'border-gray-200 text-[#6B7280] hover:border-gray-300'
                                    }`}
                            >
                                Upload
                            </button>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Download */}
                <button
                    onClick={handleDownload}
                    disabled={!url.trim()}
                    className="w-full py-3 bg-[#0A66C2] text-white rounded-xl font-semibold text-sm hover:bg-[#004182] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                    {downloaded ? (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                            Downloaded!
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                            Download PNG
                        </>
                    )}
                </button>

                <p className="text-[10px] text-center text-[#C4C9D4] leading-relaxed">
                    QR codes with logos still work | error correction handles up to 30% obscured. Use high-contrast colors for best scanning.
                </p>


            </div>
        </div>
    )
}

// Helper: draw rounded rectangle
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
}
