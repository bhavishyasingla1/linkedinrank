'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import QRCode from 'qrcode'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CheckIcon, ArrowRightIcon } from '@/components/ui/Icons'

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

const COLOR_PRESETS = ['#000000', '#0A66C2', '#4F46E5', '#059669', '#DC2626', '#D97706']

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

        ctx.clearRect(0, 0, size, size)

        ctx.fillStyle = '#FFFFFF'
        if (frame === 'rounded') {
            roundRect(ctx, 0, 0, size, size, 24)
            ctx.fill()
        } else {
            ctx.fillRect(0, 0, size, size)
        }

        if (!url.trim()) {
            ctx.strokeStyle = '#E2E8F0'
            ctx.lineWidth = 2
            ctx.setLineDash([8, 8])
            roundRect(ctx, padding, padding, qrSize, qrSize, 12)
            ctx.stroke()
            ctx.setLineDash([])

            ctx.fillStyle = '#94A3B8'
            ctx.font = 'bold 15px -apple-system, sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText('Enter your LinkedIn profile URL below', size / 2, size / 2)
            return
        }

        try {
            setError('')

            const qrData = QRCode.create(url, {
                errorCorrectionLevel: logo ? 'H' : 'M',
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
                roundRect(ctx, logoX - 4, logoY - 4, logoSize + 8, logoSize + 8, 12)
                ctx.fill()
                ctx.strokeStyle = '#E2E8F0'
                ctx.lineWidth = 1.5
                ctx.stroke()

                if (logoType === 'upload' && logo) {
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
                const badgeWidth = 170
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
            setError('Please enter a valid URL (e.g. https://linkedin.com/in/username)')
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

    return (
        <div className="space-y-6">
            {/* Tool Header */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
                <div>
                    <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                        LinkedIn Profile QR Code Generator
                    </h2>
                    <p className="text-[13px] text-[#64748B] mt-0.5">
                        Create beautiful, high-resolution QR codes to put on resumes, slide decks, business cards, and portfolios.
                    </p>
                </div>
                <Badge variant="brand" size="sm">
                    Instant Vector / PNG
                </Badge>
            </div>

            {/* Canvas Preview Box */}
            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col items-center justify-center">
                <div className="p-3 bg-white rounded-xl shadow-xs border border-[#E2E8F0]">
                    <canvas ref={canvasRef} className="w-56 h-56 sm:w-64 sm:h-64 rounded-lg" />
                </div>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
                <div>
                    <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                        LinkedIn Profile or Portfolio URL <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://www.linkedin.com/in/your-handle"
                        className="input-base"
                    />
                    {error && <p className="text-[12px] text-[#DC2626] mt-1">{error}</p>}
                </div>

                {/* Pattern & Frame Customization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1.5">
                            Pattern Style
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                            {PATTERN_OPTIONS.map((p) => (
                                <button
                                    key={p.value}
                                    onClick={() => setPattern(p.value)}
                                    className={`text-[12px] px-3 py-1.5 rounded-lg border transition-all cursor-pointer select-none ${
                                        pattern === p.value
                                            ? 'bg-[#0A66C2] text-white border-[#0A66C2] font-semibold shadow-xs'
                                            : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                                    }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1.5">
                            Frame Style
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                            {FRAME_OPTIONS.map((f) => (
                                <button
                                    key={f.value}
                                    onClick={() => setFrame(f.value)}
                                    className={`text-[12px] px-3 py-1.5 rounded-lg border transition-all cursor-pointer select-none ${
                                        frame === f.value
                                            ? 'bg-[#0A66C2] text-white border-[#0A66C2] font-semibold shadow-xs'
                                            : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
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
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1.5">
                            Brand Color
                        </label>
                        <div className="flex items-center gap-2">
                            {COLOR_PRESETS.map((c, i) => (
                                <button
                                    key={i}
                                    onClick={() => setQrColor(c)}
                                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                                        qrColor === c ? 'border-[#0F172A] scale-110 shadow-xs' : 'border-transparent'
                                    }`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                            <input
                                type="text"
                                value={qrColor}
                                onChange={(e) => setQrColor(e.target.value)}
                                className="w-24 px-2.5 py-1 text-[12px] border border-[#CBD5E1] rounded-lg font-mono text-[#0F172A]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-[#334155] mb-1.5">
                            Center Logo Badge
                        </label>
                        <div className="flex gap-1.5">
                            <button
                                onClick={() => { setLogo(null); setLogoType('text') }}
                                className={`flex-1 py-1.5 px-2 text-[12px] font-semibold rounded-lg border transition-all cursor-pointer ${
                                    !logo && logoType === 'text' ? 'bg-[#F0F7FF] border-[#0A66C2] text-[#0A66C2]' : 'bg-white border-[#E2E8F0] text-[#64748B]'
                                }`}
                            >
                                in Logo
                            </button>
                            <button
                                onClick={() => { setLogo('emoji'); setLogoType('emoji') }}
                                className={`flex-1 py-1.5 px-2 text-[12px] font-semibold rounded-lg border transition-all cursor-pointer ${
                                    logoType === 'emoji' ? 'bg-[#F0F7FF] border-[#0A66C2] text-[#0A66C2]' : 'bg-white border-[#E2E8F0] text-[#64748B]'
                                }`}
                            >
                                ⚡ Badge
                            </button>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className={`flex-1 py-1.5 px-2 text-[12px] font-semibold rounded-lg border transition-all cursor-pointer ${
                                    logoType === 'upload' ? 'bg-[#F0F7FF] border-[#0A66C2] text-[#0A66C2]' : 'bg-white border-[#E2E8F0] text-[#64748B]'
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

                <Button
                    onClick={handleDownload}
                    disabled={!url.trim()}
                    variant="primary"
                    size="lg"
                    fullWidth
                    leftIcon={downloaded ? <CheckIcon size={16} /> : undefined}
                >
                    {downloaded ? '✓ High-Res PNG Downloaded!' : 'Download High-Res PNG (600x600)'}
                </Button>
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
