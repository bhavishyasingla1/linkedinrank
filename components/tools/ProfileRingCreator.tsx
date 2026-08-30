'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { UploadIcon, CheckIcon } from '@/components/ui/Icons'

const RING_PRESETS = [
    { label: '#OpenToWork', color: '#5F8B3C', textColor: '#FFFFFF', text: '#OPENTOWORK' },
    { label: '#Hiring', color: '#7B3FA0', textColor: '#FFFFFF', text: '#HIRING' },
    { label: 'Creator', color: '#E7A33E', textColor: '#FFFFFF', text: '#CREATOR' },
    { label: 'Speaker', color: '#CC3333', textColor: '#FFFFFF', text: '#SPEAKER' },
    { label: 'Mentor', color: '#2563EB', textColor: '#FFFFFF', text: '#MENTOR' },
    { label: 'Custom', color: '#0A66C2', textColor: '#FFFFFF', text: '' },
]

function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 95, g: 139, b: 60 }
}

export default function ProfileRingCreator() {
    const [image, setImage] = useState<string | null>(null)
    const [selectedPreset, setSelectedPreset] = useState(0)
    const [customText, setCustomText] = useState('')
    const [customColor, setCustomColor] = useState('#0A66C2')
    const [ringThickness, setRingThickness] = useState(35)
    const [ringPosition, setRingPosition] = useState(120)
    const [ringLength, setRingLength] = useState(200)
    const [textPosition, setTextPosition] = useState(50)
    const [textSize, setTextSize] = useState(100)
    const [showText, setShowText] = useState(true)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [downloaded, setDownloaded] = useState(false)

    const preset = RING_PRESETS[selectedPreset]
    const isCustom = selectedPreset === RING_PRESETS.length - 1
    const ringColor = isCustom ? customColor : preset.color
    const ringText = isCustom ? customText : preset.text

    const drawRing = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas || !image) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
            const size = 800
            canvas.width = size
            canvas.height = size
            const center = size / 2
            const fullRadius = size / 2

            ctx.clearRect(0, 0, size, size)

            ctx.save()
            ctx.beginPath()
            ctx.arc(center, center, fullRadius, 0, Math.PI * 2)
            ctx.clip()
            const scale = Math.max(size / img.width, size / img.height)
            const dw = img.width * scale
            const dh = img.height * scale
            ctx.drawImage(img, center - dw / 2, center - dh / 2, dw, dh)
            ctx.restore()

            const ringW = ringThickness * (size / 400)
            const outerR = fullRadius
            const innerR = outerR - ringW

            const startRad = (ringPosition * Math.PI) / 180
            const endRad = ((ringPosition + ringLength) * Math.PI) / 180
            const fadeAngle = 0.3

            ctx.save()
            ctx.beginPath()
            ctx.arc(center, center, outerR, startRad, endRad)
            ctx.arc(center, center, innerR, endRad, startRad, true)
            ctx.closePath()
            ctx.fillStyle = ringColor
            ctx.fill()
            ctx.restore()

            for (let i = 0; i < 20; i++) {
                const t = i / 20
                const a1 = startRad - fadeAngle * (1 - t)
                const a2 = startRad - fadeAngle * (1 - (i + 1) / 20)
                ctx.save()
                ctx.beginPath()
                ctx.arc(center, center, outerR, a1, a2)
                ctx.arc(center, center, innerR, a2, a1, true)
                ctx.closePath()
                ctx.fillStyle = ringColor
                ctx.globalAlpha = t * 0.8
                ctx.fill()
                ctx.restore()
            }

            for (let i = 0; i < 20; i++) {
                const t = i / 20
                const a1 = endRad + fadeAngle * t
                const a2 = endRad + fadeAngle * ((i + 1) / 20)
                ctx.save()
                ctx.beginPath()
                ctx.arc(center, center, outerR, a1, a2)
                ctx.arc(center, center, innerR, a2, a1, true)
                ctx.closePath()
                ctx.fillStyle = ringColor
                ctx.globalAlpha = (1 - t) * 0.8
                ctx.fill()
                ctx.restore()
            }

            if (showText && ringText) {
                const midR = (innerR + outerR) / 2
                const baseFontSize = ringW * 0.42
                const fontSize = Math.max(10, baseFontSize * (textSize / 100))
                ctx.save()
                ctx.fillStyle = '#FFFFFF'
                ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'

                const textArcLen = (ringLength * Math.PI) / 180
                const normPos = textPosition / 100
                const centerAngle = startRad + textArcLen * normPos

                const chars = ringText.split('')
                const charWidths = chars.map(c => ctx.measureText(c).width)
                const totalTextW = charWidths.reduce((a, b) => a + b, 0)
                const letterSpacing = 2
                const totalWWithSpacing = totalTextW + (chars.length - 1) * letterSpacing
                const totalAngle = totalWWithSpacing / midR

                let curAngle = centerAngle - totalAngle / 2

                chars.forEach((char, idx) => {
                    const cWidth = charWidths[idx]
                    const charAngle = cWidth / midR
                    const charCenterAngle = curAngle + charAngle / 2

                    const charRadius = (charCenterAngle > Math.PI / 2 && charCenterAngle < (3 * Math.PI) / 2)
                        ? midR - fontSize * 0.05
                        : midR

                    const cx = center + charRadius * Math.cos(charCenterAngle)
                    const cy = center + charRadius * Math.sin(charCenterAngle)

                    ctx.save()
                    ctx.translate(cx, cy)
                    ctx.rotate(charCenterAngle + Math.PI / 2)
                    ctx.fillText(char, 0, 0)
                    ctx.restore()

                    curAngle += charAngle + letterSpacing / midR
                })

                ctx.restore()
            }
        }
        img.src = image
    }, [image, ringColor, ringText, ringThickness, ringPosition, ringLength, textPosition, textSize, showText])

    useEffect(() => {
        drawRing()
    }, [drawRing])

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => {
            setImage(ev.target?.result as string)
        }
        reader.readAsDataURL(file)
    }

    const handleDownload = () => {
        const canvas = canvasRef.current
        if (!canvas || !image) return
        const link = document.createElement('a')
        link.download = `linkedin-photo-ring.png`
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
                        LinkedIn Profile Photo Ring Creator
                    </h2>
                    <p className="text-[13px] text-[#64748B] mt-0.5">
                        Add a distinctive #OpenToWork, #Hiring, or custom branded ring to your profile photo to stand out in the feed.
                    </p>
                </div>
                <Badge variant="brand" size="sm">
                    No Watermark
                </Badge>
            </div>

            {/* Photo Upload Area / Preview */}
            {!image ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-8 sm:p-12 border-2 border-dashed border-[#CBD5E1] hover:border-[#0A66C2] rounded-2xl bg-[#F8FAFC] hover:bg-[#F0F7FF] transition-all flex flex-col items-center justify-center text-center cursor-pointer space-y-3"
                >
                    <div className="w-14 h-14 rounded-full bg-white shadow-xs border border-[#E2E8F0] flex items-center justify-center text-[#0A66C2]">
                        <UploadIcon size={24} />
                    </div>
                    <div>
                        <p className="text-[15px] font-bold text-[#0F172A]">Upload your profile photo</p>
                        <p className="text-[13px] text-[#64748B] mt-0.5">JPEG, PNG, or WebP. 100% processed in your browser.</p>
                    </div>
                    <Button variant="primary" size="md" className="pointer-events-none">
                        Choose Photo
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col items-center justify-center">
                        <div className="relative p-2 bg-white rounded-full shadow-xs border border-[#E2E8F0]">
                            <canvas ref={canvasRef} className="w-48 h-48 sm:w-56 sm:h-56 rounded-full" />
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-3 text-[12px] font-semibold text-[#0A66C2] hover:underline cursor-pointer"
                        >
                            Change Photo
                        </button>
                    </div>

                    {/* Presets */}
                    <div className="space-y-2">
                        <label className="block text-[13px] font-semibold text-[#334155]">
                            Quick Ring Presets
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                            {RING_PRESETS.map((p, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedPreset(i)}
                                    className={`text-[12px] px-3 py-1.5 rounded-lg border transition-all cursor-pointer select-none ${
                                        selectedPreset === i
                                            ? 'bg-[#0A66C2] text-white border-[#0A66C2] font-semibold shadow-xs'
                                            : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                                    }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Custom Controls */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                                Ring Thickness ({ringThickness}px)
                            </label>
                            <input
                                type="range"
                                min={15}
                                max={60}
                                value={ringThickness}
                                onChange={(e) => setRingThickness(Number(e.target.value))}
                                className="w-full accent-[#0A66C2] cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                                Arc Length ({ringLength}°)
                            </label>
                            <input
                                type="range"
                                min={60}
                                max={360}
                                value={ringLength}
                                onChange={(e) => setRingLength(Number(e.target.value))}
                                className="w-full accent-[#0A66C2] cursor-pointer"
                            />
                        </div>
                    </div>

                    {showText && (
                        <div>
                            <label className="block text-[13px] font-semibold text-[#334155] mb-1">
                                Ring Label Text
                            </label>
                            <input
                                type="text"
                                value={isCustom ? customText : ringText}
                                onChange={(e) => { setCustomText(e.target.value.toUpperCase()); setSelectedPreset(RING_PRESETS.length - 1) }}
                                placeholder="#OPENTOWORK"
                                className="input-base font-mono uppercase"
                            />
                        </div>
                    )}

                    <Button
                        onClick={handleDownload}
                        variant="primary"
                        size="lg"
                        fullWidth
                        leftIcon={downloaded ? <CheckIcon size={16} /> : undefined}
                    >
                        {downloaded ? '✓ High-Res PNG Downloaded!' : 'Download High-Res Profile Photo (800x800)'}
                    </Button>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
            />
        </div>
    )
}
