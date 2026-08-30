'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import QRCode from 'qrcode'
import { CheckIcon } from '@/components/ui/Icons'

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

const COLOR_PRESETS = ['#2f27ce', '#050315', '#433bff', '#059669', '#dc2626', '#d97706']

export default function QRCodeGeneratorTool() {
    const [url, setUrl] = useState('')
    const [pattern, setPattern] = useState<PatternType>('rounded')
    const [qrColor, setQrColor] = useState('#2f27ce')
    const [frame, setFrame] = useState<FrameType>('rounded')
    const [logo, setLogo] = useState<string | null>(null)
    const [logoType, setLogoType] = useState<'text' | 'emoji' | 'upload'>('text')
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [downloaded, setDownloaded] = useState(false)
    const [error, setError] = useState('')

    // Normalize URL input to proper LinkedIn format
    const getResolvedUrl = (input: string) => {
        const trimmed = input.trim()
        if (!trimmed) return ''
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
        if (trimmed.includes('linkedin.com')) return `https://${trimmed}`
        return `https://www.linkedin.com/in/${trimmed.replace(/^@/, '')}`
    }

    const resolvedUrl = getResolvedUrl(url)

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

        ctx.clearRect(0, 0, size, size)

        ctx.fillStyle = '#FFFFFF'
        if (frame === 'rounded') {
            roundRect(ctx, 0, 0, size, size, 24)
            ctx.fill()
        } else {
            ctx.fillRect(0, 0, size, size)
        }

        if (!resolvedUrl) {
            ctx.strokeStyle = '#dedcff'
            ctx.lineWidth = 2
            ctx.setLineDash([8, 8])
            roundRect(ctx, padding, padding, qrSize, qrSize, 16)
            ctx.stroke()
            ctx.setLineDash([])

            ctx.fillStyle = '#050315'
            ctx.font = 'bold 16px -apple-system, sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText('Enter your LinkedIn profile or vanity handle below', size / 2, size / 2)
            return
        }

        try {
            setError('')

            const qrData = QRCode.create(resolvedUrl, {
                errorCorrectionLevel: 'H',
            })

            const modules = qrData.modules
            const moduleCount = modules.size
            const moduleSize = qrSize / moduleCount
            const offset = padding

            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    if (!modules.get(row, col)) continue

                    const x = offset + col * moduleSize
                    const y = offset + row * moduleSize

                    ctx.fillStyle = qrColor

                    if (pattern === 'dots') {
                        ctx.beginPath()
                        ctx.arc(x + moduleSize / 2, y + moduleSize / 2, moduleSize / 2.3, 0, Math.PI * 2)
                        ctx.fill()
                    } else if (pattern === 'rounded') {
                        roundRect(ctx, x, y, moduleSize, moduleSize, moduleSize * 0.3)
                        ctx.fill()
                    } else if (pattern === 'smooth') {
                        roundRect(ctx, x, y, moduleSize, moduleSize, moduleSize * 0.45)
                        ctx.fill()
                    } else if (pattern === 'classy') {
                        roundRect(ctx, x, y, moduleSize, moduleSize, moduleSize * 0.15)
                        ctx.fill()
                    } else {
                        ctx.fillRect(x, y, moduleSize, moduleSize)
                    }
                }
            }

            // Draw Logo in center
            if (logo || logoType === 'text' || logoType === 'emoji') {
                const logoSize = qrSize * 0.22
                const logoX = size / 2 - logoSize / 2
                const logoY = size / 2 - logoSize / 2

                ctx.fillStyle = '#FFFFFF'
                roundRect(ctx, logoX - 4, logoY - 4, logoSize + 8, logoSize + 8, 14)
                ctx.fill()
                ctx.strokeStyle = '#dedcff'
                ctx.lineWidth = 2
                ctx.stroke()

                if (logoType === 'upload' && logo) {
                    const logoImg = new Image()
                    logoImg.crossOrigin = 'anonymous'
                    logoImg.onload = () => {
                        ctx.save()
                        roundRect(ctx, logoX, logoY, logoSize, logoSize, 10)
                        ctx.clip()
                        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)
                        ctx.restore()
                    }
                    logoImg.src = logo
                } else if (logoType === 'text') {
                    ctx.fillStyle = qrColor
                    ctx.font = `bold ${logoSize * 0.45}px -apple-system, sans-serif`
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillText('in', size / 2, size / 2)
                } else if (logoType === 'emoji') {
                    ctx.font = `${logoSize * 0.55}px -apple-system, sans-serif`
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillText('⚡', size / 2, size / 2)
                }
            }

            if (frame === 'badge') {
                const badgeHeight = 38
                const badgeY = size - padding - badgeHeight + 10
                const badgeWidth = 180
                const badgeX = size / 2 - badgeWidth / 2

                ctx.fillStyle = qrColor
                roundRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 19)
                ctx.fill()

                ctx.fillStyle = '#FFFFFF'
                ctx.font = 'bold 13px -apple-system, sans-serif'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText('Scan to connect', badgeX + badgeWidth / 2, badgeY + badgeHeight / 2)
            }

        } catch {
            setError('Please enter a valid URL (e.g. https://linkedin.com/in/username or username)')
        }
    }, [resolvedUrl, pattern, qrColor, frame, logo, logoType])

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
        if (!canvas || !resolvedUrl) return
        const link = document.createElement('a')
        link.download = 'linkedin-qr-code.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
        setDownloaded(true)
        setTimeout(() => setDownloaded(false), 3000)
    }

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dedcff]">
                <div>
                    <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        LinkedIn Profile QR Code Generator
                    </h2>
                    <p className="text-[13.5px] text-[#050315]/70 mt-1">
                        Create high-resolution QR codes to put on resumes, slide decks, business cards, and portfolios.
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3.5 py-1.5 rounded-full shadow-2xs whitespace-nowrap shrink-0">
                        Instant Vector / PNG
                    </span>
                </div>
            </div>

            {/* Canvas Preview Box */}
            <div className="p-6 rounded-3xl bg-[#fbfbfe] border border-[#dedcff] flex flex-col items-center justify-center">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#dedcff]">
                    <canvas ref={canvasRef} className="w-56 h-56 sm:w-64 sm:h-64 rounded-xl" />
                </div>
                {resolvedUrl && (
                    <p className="text-[12px] font-mono text-[#050315]/70 mt-3 truncate max-w-sm">
                        Target: {resolvedUrl}
                    </p>
                )}
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
                <div>
                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                        LinkedIn Profile URL or Vanity Handle <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="e.g. bhavishyasingla or https://linkedin.com/in/bhavishyasingla"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] bg-white text-[#050315]"
                    />
                    {error && <p className="text-[12px] text-[#DC2626] mt-1">{error}</p>}
                </div>

                {/* Pattern & Frame Customization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-2">
                            Pattern Style
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {PATTERN_OPTIONS.map((p) => (
                                <button
                                    key={p.value}
                                    onClick={() => setPattern(p.value)}
                                    className={`text-[12.5px] px-3.5 py-1.5 rounded-xl border font-bold transition-all cursor-pointer select-none ${
                                        pattern === p.value
                                            ? 'bg-[#2f27ce] text-white border-[#2f27ce] shadow-xs'
                                            : 'bg-white text-[#050315]/80 border-[#dedcff] hover:border-[#2f27ce]'
                                    }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-2">
                            Frame Style
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {FRAME_OPTIONS.map((f) => (
                                <button
                                    key={f.value}
                                    onClick={() => setFrame(f.value)}
                                    className={`text-[12.5px] px-3.5 py-1.5 rounded-xl border font-bold transition-all cursor-pointer select-none ${
                                        frame === f.value
                                            ? 'bg-[#2f27ce] text-white border-[#2f27ce] shadow-xs'
                                            : 'bg-white text-[#050315]/80 border-[#dedcff] hover:border-[#2f27ce]'
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Color & Logo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-2">
                            Brand Color Preset / Custom Hex
                        </label>
                        <div className="flex items-center gap-2">
                            {COLOR_PRESETS.map((c, i) => (
                                <button
                                    key={i}
                                    onClick={() => setQrColor(c)}
                                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                                        qrColor === c ? 'border-[#050315] scale-110 shadow-xs' : 'border-transparent'
                                    }`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                            <input
                                type="text"
                                value={qrColor}
                                onChange={(e) => setQrColor(e.target.value)}
                                className="w-24 px-2.5 py-1 text-[13px] border border-[#dedcff] rounded-xl font-mono text-[#050315] bg-white outline-none focus:border-[#2f27ce]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[13px] font-bold text-[#050315] mb-2">
                            Center Logo Badge
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => { setLogo(null); setLogoType('text') }}
                                className={`flex-1 py-1.5 px-2 text-[12.5px] font-bold rounded-xl border transition-all cursor-pointer ${
                                    !logo && logoType === 'text' ? 'bg-[#dedcff]/40 border-[#2f27ce] text-[#2f27ce]' : 'bg-white border-[#dedcff] text-[#050315]/70'
                                }`}
                            >
                                in Logo
                            </button>
                            <button
                                onClick={() => { setLogo('emoji'); setLogoType('emoji') }}
                                className={`flex-1 py-1.5 px-2 text-[12.5px] font-bold rounded-xl border transition-all cursor-pointer ${
                                    logoType === 'emoji' ? 'bg-[#dedcff]/40 border-[#2f27ce] text-[#2f27ce]' : 'bg-white border-[#dedcff] text-[#050315]/70'
                                }`}
                            >
                                ⚡ Badge
                            </button>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className={`flex-1 py-1.5 px-2 text-[12.5px] font-bold rounded-xl border transition-all cursor-pointer ${
                                    logoType === 'upload' ? 'bg-[#dedcff]/40 border-[#2f27ce] text-[#2f27ce]' : 'bg-white border-[#dedcff] text-[#050315]/70'
                                }`}
                            >
                                Upload
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleDownload}
                    disabled={!resolvedUrl}
                    className="w-full py-3.5 rounded-2xl bg-[#2f27ce] hover:bg-[#433bff] disabled:opacity-50 text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                    {downloaded ? (
                        <>
                            <CheckIcon size={18} />
                            <span>High-Res PNG Downloaded!</span>
                        </>
                    ) : (
                        <span>Download High-Res PNG (600x600)</span>
                    )}
                </button>
            </div>
        </div>
    )
}

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
