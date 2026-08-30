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
    { label: 'Mentor', color: '#2f27ce', textColor: '#FFFFFF', text: '#MENTOR' },
    { label: 'Custom', color: '#2f27ce', textColor: '#FFFFFF', text: '' },
]

const RING_STYLES = [
    { id: 'solid', label: 'Solid Color' },
    { id: 'gradient', label: 'Gradient Glow' },
    { id: 'dual', label: 'Two-Tone Gradient' },
]

export default function ProfileRingCreator() {
    const [image, setImage] = useState<string | null>(null)
    const [selectedPreset, setSelectedPreset] = useState(0)
    const [ringStyle, setRingStyle] = useState<'solid' | 'gradient' | 'dual'>('solid')
    const [customText, setCustomText] = useState('')
    const [customColor, setCustomColor] = useState('#2f27ce')
    const [customSecondaryColor, setCustomSecondaryColor] = useState('#433bff')
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

            // Draw circular clipped user photo
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

            // Style preparation
            let fillStyle: string | CanvasGradient = ringColor

            if (ringStyle === 'gradient') {
                const grad = ctx.createRadialGradient(center, center, innerR, center, center, outerR)
                grad.addColorStop(0, ringColor)
                grad.addColorStop(1, '#ffffff88')
                fillStyle = grad
            } else if (ringStyle === 'dual') {
                const grad = ctx.createLinearGradient(0, 0, size, size)
                grad.addColorStop(0, ringColor)
                grad.addColorStop(1, customSecondaryColor || '#433bff')
                fillStyle = grad
            }

            // Draw primary ring arc
            ctx.save()
            ctx.beginPath()
            ctx.arc(center, center, outerR, startRad, endRad)
            ctx.arc(center, center, innerR, endRad, startRad, true)
            ctx.closePath()
            ctx.fillStyle = fillStyle
            ctx.fill()
            ctx.restore()

            // Smooth start taper
            for (let i = 0; i < 20; i++) {
                const t = i / 20
                const a1 = startRad - fadeAngle * (1 - t)
                const a2 = startRad - fadeAngle * (1 - (i + 1) / 20)
                ctx.save()
                ctx.beginPath()
                ctx.arc(center, center, outerR, a1, a2)
                ctx.arc(center, center, innerR, a2, a1, true)
                ctx.closePath()
                ctx.fillStyle = fillStyle
                ctx.globalAlpha = t * 0.8
                ctx.fill()
                ctx.restore()
            }

            // Smooth end taper
            for (let i = 0; i < 20; i++) {
                const t = i / 20
                const a1 = endRad + fadeAngle * t
                const a2 = endRad + fadeAngle * ((i + 1) / 20)
                ctx.save()
                ctx.beginPath()
                ctx.arc(center, center, outerR, a1, a2)
                ctx.arc(center, center, innerR, a2, a1, true)
                ctx.closePath()
                ctx.fillStyle = fillStyle
                ctx.globalAlpha = (1 - t) * 0.8
                ctx.fill()
                ctx.restore()
            }

            // Draw curved text inside the ring
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
    }, [image, ringColor, ringText, ringThickness, ringPosition, ringLength, textPosition, textSize, showText, ringStyle, customSecondaryColor])

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dedcff]">
                <div>
                    <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#050315] tracking-tight">
                        LinkedIn Profile Photo Ring Creator
                    </h2>
                    <p className="text-[13.5px] text-[#050315]/70 mt-1">
                        Add a distinctive #OpenToWork, #Hiring, Creator, or custom branded ring to your profile photo.
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center justify-center text-center leading-none text-[12px] font-bold text-[#2f27ce] bg-[#dedcff]/70 border border-[#dedcff] px-3.5 py-1.5 rounded-full shadow-2xs whitespace-nowrap shrink-0">
                        100% Free · No Watermark
                    </span>
                </div>
            </div>

            {/* Photo Upload Area / Preview */}
            {!image ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-8 sm:p-14 border-2 border-dashed border-[#dedcff] hover:border-[#2f27ce] rounded-3xl bg-[#fbfbfe] hover:bg-white transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer space-y-4 shadow-sm hover:shadow-md"
                >
                    <div className="w-16 h-16 rounded-full bg-[#dedcff]/50 border border-[#dedcff] flex items-center justify-center text-[#2f27ce]">
                        <UploadIcon size={28} />
                    </div>
                    <div>
                        <p className="text-[16px] font-bold text-[#050315]">Upload your profile photo</p>
                        <p className="text-[13px] text-[#050315]/60 mt-1">JPEG, PNG, or WebP. 100% private, processed client-side in your browser.</p>
                    </div>
                    <button
                        type="button"
                        className="px-5 py-2.5 rounded-xl bg-[#2f27ce] hover:bg-[#433bff] text-white text-[14px] font-bold shadow-md hover:shadow-lg transition-all"
                    >
                        Choose Photo
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="p-8 rounded-3xl bg-[#fbfbfe] border border-[#dedcff] flex flex-col items-center justify-center shadow-sm">
                        <div className="relative p-2 bg-white rounded-full shadow-lg border border-[#dedcff]">
                            <canvas ref={canvasRef} className="w-48 h-48 sm:w-60 sm:h-60 rounded-full" />
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-4 text-[13px] font-bold text-[#2f27ce] hover:underline cursor-pointer"
                        >
                            Change Photo
                        </button>
                    </div>

                    {/* Presets */}
                    <div className="space-y-2">
                        <label className="block text-[13px] font-bold text-[#050315]">
                            Quick Ring Presets
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {RING_PRESETS.map((p, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedPreset(i)}
                                    className={`text-[12.5px] px-3.5 py-1.5 rounded-xl border font-bold transition-all cursor-pointer select-none ${
                                        selectedPreset === i
                                            ? 'bg-[#2f27ce] text-white border-[#2f27ce] shadow-sm'
                                            : 'bg-white text-[#050315]/80 border-[#dedcff] hover:border-[#2f27ce]'
                                    }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Ring Styles */}
                    <div className="space-y-2">
                        <label className="block text-[13px] font-bold text-[#050315]">
                            Ring Visual Style
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {RING_STYLES.map((st) => (
                                <button
                                    key={st.id}
                                    onClick={() => setRingStyle(st.id as any)}
                                    className={`text-[12.5px] px-3.5 py-1.5 rounded-xl border font-bold transition-all cursor-pointer select-none ${
                                        ringStyle === st.id
                                            ? 'bg-[#2f27ce] text-white border-[#2f27ce] shadow-sm'
                                            : 'bg-white text-[#050315]/80 border-[#dedcff] hover:border-[#2f27ce]'
                                    }`}
                                >
                                    {st.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Custom Color Selector */}
                    {isCustom && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#dedcff]/20 border border-[#dedcff]">
                            <div>
                                <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                                    Primary Ring Color
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={customColor}
                                        onChange={(e) => setCustomColor(e.target.value)}
                                        className="w-10 h-10 rounded-xl cursor-pointer border border-[#dedcff] p-1 bg-white"
                                    />
                                    <input
                                        type="text"
                                        value={customColor}
                                        onChange={(e) => setCustomColor(e.target.value)}
                                        className="px-3 py-1.5 rounded-xl bg-white border border-[#dedcff] text-[13px] font-mono text-[#050315] uppercase w-28"
                                    />
                                </div>
                            </div>

                            {ringStyle === 'dual' && (
                                <div>
                                    <label className="block text-[13px] font-bold text-[#050315] mb-1.5">
                                        Secondary Gradient Color
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={customSecondaryColor}
                                            onChange={(e) => setCustomSecondaryColor(e.target.value)}
                                            className="w-10 h-10 rounded-xl cursor-pointer border border-[#dedcff] p-1 bg-white"
                                        />
                                        <input
                                            type="text"
                                            value={customSecondaryColor}
                                            onChange={(e) => setCustomSecondaryColor(e.target.value)}
                                            className="px-3 py-1.5 rounded-xl bg-white border border-[#dedcff] text-[13px] font-mono text-[#050315] uppercase w-28"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Ring Adjustment Controls */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-2xl bg-white border border-[#dedcff]">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-[13px] font-bold text-[#050315]">Thickness</label>
                                <span className="text-[12px] font-bold text-[#2f27ce]">{ringThickness}px</span>
                            </div>
                            <input
                                type="range"
                                min={15}
                                max={60}
                                value={ringThickness}
                                onChange={(e) => setRingThickness(Number(e.target.value))}
                                className="w-full accent-[#2f27ce] cursor-pointer"
                            />
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-[#dedcff]">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-[13px] font-bold text-[#050315]">Arc Span</label>
                                <span className="text-[12px] font-bold text-[#2f27ce]">{ringLength}°</span>
                            </div>
                            <input
                                type="range"
                                min={60}
                                max={360}
                                value={ringLength}
                                onChange={(e) => setRingLength(Number(e.target.value))}
                                className="w-full accent-[#2f27ce] cursor-pointer"
                            />
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-[#dedcff]">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-[13px] font-bold text-[#050315]">Position Angle</label>
                                <span className="text-[12px] font-bold text-[#2f27ce]">{ringPosition}°</span>
                            </div>
                            <input
                                type="range"
                                min={0}
                                max={360}
                                value={ringPosition}
                                onChange={(e) => setRingPosition(Number(e.target.value))}
                                className="w-full accent-[#2f27ce] cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Ring Text Input */}
                    <div className="p-4 rounded-2xl bg-white border border-[#dedcff] space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-[13px] font-bold text-[#050315]">
                                Ring Badge Text
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowText(!showText)}
                                className="text-[12px] font-bold text-[#2f27ce] hover:underline"
                            >
                                {showText ? 'Hide Text' : 'Show Text'}
                            </button>
                        </div>
                        {showText && (
                            <input
                                type="text"
                                value={isCustom ? customText : ringText}
                                onChange={(e) => {
                                    setCustomText(e.target.value.toUpperCase())
                                    setSelectedPreset(RING_PRESETS.length - 1)
                                }}
                                placeholder="#OPENTOWORK"
                                className="w-full px-4 py-2.5 rounded-xl border border-[#dedcff] focus:border-[#2f27ce] outline-none text-[14px] font-mono uppercase bg-[#fbfbfe] text-[#050315]"
                            />
                        )}
                    </div>

                    <button
                        onClick={handleDownload}
                        className="w-full py-4 rounded-2xl bg-[#2f27ce] hover:bg-[#433bff] text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {downloaded ? (
                            <>
                                <CheckIcon size={18} />
                                <span>High-Res Photo Downloaded!</span>
                            </>
                        ) : (
                            <span>Download High-Res Profile Photo (800x800 PNG)</span>
                        )}
                    </button>
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
