'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

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
    const [ringPosition, setRingPosition] = useState(120)  // start at bottom-left (~120°)
    const [ringLength, setRingLength] = useState(200)       // covers bottom arc
    const [textPosition, setTextPosition] = useState(50)    // 0-100% along the ring arc
    const [textSize, setTextSize] = useState(100)             // 50-200% font size multiplier
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

            // Draw profile photo filling the circle
            ctx.save()
            ctx.beginPath()
            ctx.arc(center, center, fullRadius, 0, Math.PI * 2)
            ctx.clip()
            const scale = Math.max(size / img.width, size / img.height)
            const dw = img.width * scale
            const dh = img.height * scale
            ctx.drawImage(img, center - dw / 2, center - dh / 2, dw, dh)
            ctx.restore()

            // Ring dimensions
            const ringW = ringThickness * (size / 400)
            const outerR = fullRadius
            const innerR = outerR - ringW
            const rgb = hexToRgb(ringColor)

            // Arc angles (0° = 3 o'clock, goes clockwise)
            const startRad = (ringPosition * Math.PI) / 180
            const endRad = ((ringPosition + ringLength) * Math.PI) / 180
            const fadeAngle = 0.3 // radians

            // Main solid ring arc
            ctx.save()
            ctx.beginPath()
            ctx.arc(center, center, outerR, startRad, endRad)
            ctx.arc(center, center, innerR, endRad, startRad, true)
            ctx.closePath()
            ctx.fillStyle = ringColor
            ctx.fill()
            ctx.restore()

            // Fade at start edge (20 micro-slices going backwards)
            for (let i = 0; i < 20; i++) {
                const t = i / 20
                const a1 = startRad - fadeAngle * (1 - t)
                const a2 = startRad - fadeAngle * (1 - (i + 1) / 20)
                ctx.save()
                ctx.beginPath()
                ctx.arc(center, center, outerR, a1, a2)
                ctx.arc(center, center, innerR, a2, a1, true)
                ctx.closePath()
                ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${t * 0.9})`
                ctx.fill()
                ctx.restore()
            }

            // Fade at end edge (20 micro-slices going forwards)
            for (let i = 0; i < 20; i++) {
                const t = i / 20
                const a1 = endRad + fadeAngle * t
                const a2 = endRad + fadeAngle * (i + 1) / 20
                ctx.save()
                ctx.beginPath()
                ctx.arc(center, center, outerR, a1, a2)
                ctx.arc(center, center, innerR, a2, a1, true)
                ctx.closePath()
                ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${(1 - t) * 0.9})`
                ctx.fill()
                ctx.restore()
            }

            // Draw text along the ring
            if (ringText && showText) {
                const textR = (outerR + innerR) / 2
                const baseFontSize = Math.max(14, ringW * 0.45)
                const fontSize = baseFontSize * (textSize / 100)
                ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
                ctx.fillStyle = preset.textColor || '#FFFFFF'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'

                const charW = fontSize * 0.65
                const anglePerChar = charW / textR
                const totalTextAngle = ringText.length * anglePerChar

                // textPosition (0-100) maps along the ring arc
                const arcSpan = endRad - startRad
                const availableArc = arcSpan - totalTextAngle
                const textStartRad = startRad + (textPosition / 100) * Math.max(0, availableArc)

                // Determine if text center is on the top half of the circle
                const textMidRad = textStartRad + totalTextAngle / 2
                let normMid = textMidRad % (2 * Math.PI)
                if (normMid < 0) normMid += 2 * Math.PI
                const isTopHalf = normMid > Math.PI

                for (let i = 0; i < ringText.length; i++) {
                    const charAngle = textStartRad + (i + 0.5) * anglePerChar

                    // On bottom half, clockwise goes right-to-left visually,
                    // so reverse character indices to keep text reading L-to-R
                    const charIdx = isTopHalf ? i : (ringText.length - 1 - i)

                    const x = center + Math.cos(charAngle) * textR
                    const y = center + Math.sin(charAngle) * textR

                    ctx.save()
                    ctx.translate(x, y)

                    if (isTopHalf) {
                        // Top: tops away from center, reads L-to-R clockwise
                        ctx.rotate(charAngle + Math.PI / 2)
                    } else {
                        // Bottom: tops away from center, chars reversed so reads L-to-R
                        ctx.rotate(charAngle - Math.PI / 2)
                    }

                    ctx.fillText(ringText[charIdx], 0, 0)
                    ctx.restore()
                }
            }
        }
        img.src = image
    }, [image, ringColor, ringText, ringThickness, ringPosition, ringLength, textPosition, textSize, showText, preset.textColor])

    useEffect(() => {
        drawRing()
    }, [drawRing])

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => setImage(ev.target?.result as string)
        reader.readAsDataURL(file)
    }

    const handleDownload = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const link = document.createElement('a')
        link.download = 'linkedin-profile-ring.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
        setDownloaded(true)
        setTimeout(() => setDownloaded(false), 3000)
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#004182] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                        <h2 className="font-semibold text-[#0A0F1C] text-[15px]">Profile Ring Creator</h2>
                        <p className="text-[11px] text-[#9CA3AF]">Add #OpenToWork, #Hiring, or custom rings</p>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-5">
                {!image ? (
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-56 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-[#0A66C2] hover:bg-[#F0F7FF]/50 transition-all cursor-pointer group"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-[#F0F7FF] flex items-center justify-center group-hover:bg-[#0A66C2]/10 transition-colors">
                            <svg className="w-7 h-7 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-[#0A0F1C]">Upload your profile photo</p>
                            <p className="text-xs text-[#9CA3AF] mt-1">PNG or JPG | square photos work best</p>
                        </div>
                    </button>
                ) : (
                    <div className="space-y-5">
                        {/* Preview */}
                        <div className="flex justify-center">
                            <div className="relative group">
                                <div className="rounded-full shadow-lg ring-1 ring-black/5 overflow-hidden">
                                    <canvas ref={canvasRef} className="w-56 h-56" />
                                </div>
                                <button
                                    onClick={() => { setImage(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                                    className="absolute -top-1 -right-1 w-7 h-7 bg-white border border-gray-200 text-gray-400 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-300 transition-colors shadow-md"
                                    title="Remove photo"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Change Photo */}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full py-2 text-xs font-medium text-[#0A66C2] hover:bg-[#F0F7FF] rounded-lg transition-colors"
                        >
                            Change photo
                        </button>

                        {/* Presets */}
                        <div>
                            <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Quick Presets</p>
                            <div className="flex flex-wrap items-center gap-1.5">
                                {RING_PRESETS.filter((_, i) => i < RING_PRESETS.length - 1).map((p, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedPreset(i)}
                                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${selectedPreset === i
                                                ? 'border-gray-800 bg-gray-900 text-white font-medium shadow-sm'
                                                : 'border-gray-200 text-[#6B7280] hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ring Settings */}
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <div className="px-4 py-2.5 bg-[#F8FAFC] border-b border-gray-200">
                                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Ring</span>
                            </div>
                            <div className="p-4 space-y-3.5">
                                {/* Color */}
                                <div>
                                    <label className="block text-xs font-medium text-[#4B5563] mb-2">Color</label>
                                    <div className="flex items-center gap-2">
                                        {['#5F8B3C', '#7B3FA0', '#0A66C2', '#E7A33E', '#CC3333'].map((c, i) => (
                                            <button
                                                key={i}
                                                onClick={() => { setCustomColor(c); setSelectedPreset(RING_PRESETS.length - 1) }}
                                                className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-105 ${ringColor === c ? 'border-gray-800 scale-110 shadow-sm' : 'border-gray-100'}`}
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                        <div className="relative ml-1">
                                            <input
                                                type="color"
                                                value={isCustom ? customColor : ringColor}
                                                onChange={(e) => { setCustomColor(e.target.value); setSelectedPreset(RING_PRESETS.length - 1) }}
                                                className="w-7 h-7 rounded-full border border-gray-200 cursor-pointer"
                                                style={{ padding: 0 }}
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            value={ringColor.toUpperCase()}
                                            onChange={(e) => { setCustomColor(e.target.value); setSelectedPreset(RING_PRESETS.length - 1) }}
                                            className="w-20 px-2 py-1 text-[11px] border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A66C2] font-mono text-[#6B7280]"
                                        />
                                    </div>
                                </div>

                                {/* Thickness */}
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs font-medium text-[#4B5563]">Thickness</label>
                                        <span className="text-[11px] text-[#9CA3AF] tabular-nums">{ringThickness}px</span>
                                    </div>
                                    <input type="range" min={10} max={80} value={ringThickness}
                                        onChange={(e) => setRingThickness(Number(e.target.value))}
                                        className="w-full accent-[#0A66C2] h-1.5 cursor-pointer rounded-full" />
                                </div>

                                {/* Position */}
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs font-medium text-[#4B5563]">Position</label>
                                        <span className="text-[11px] text-[#9CA3AF] tabular-nums">{ringPosition}&deg;</span>
                                    </div>
                                    <input type="range" min={0} max={360} value={ringPosition}
                                        onChange={(e) => setRingPosition(Number(e.target.value))}
                                        className="w-full accent-[#0A66C2] h-1.5 cursor-pointer rounded-full" />
                                </div>

                                {/* Arc Length */}
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs font-medium text-[#4B5563]">Arc Length</label>
                                        <span className="text-[11px] text-[#9CA3AF] tabular-nums">{ringLength}&deg;</span>
                                    </div>
                                    <input type="range" min={30} max={360} value={ringLength}
                                        onChange={(e) => setRingLength(Number(e.target.value))}
                                        className="w-full accent-[#0A66C2] h-1.5 cursor-pointer rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* Text Settings */}
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <div className="px-4 py-2.5 bg-[#F8FAFC] border-b border-gray-200 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Text</span>
                                <button
                                    onClick={() => setShowText(!showText)}
                                    className={`relative w-9 h-5 rounded-full transition-colors ${showText ? 'bg-[#0A66C2]' : 'bg-gray-300'}`}
                                >
                                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${showText ? 'left-[18px]' : 'left-0.5'}`} />
                                </button>
                            </div>
                            {showText && (
                                <div className="p-4 space-y-3.5">
                                    <div>
                                        <label className="block text-xs font-medium text-[#4B5563] mb-1.5">Text</label>
                                        <input
                                            type="text"
                                            value={isCustom ? customText : ringText}
                                            onChange={(e) => { setCustomText(e.target.value.toUpperCase()); setSelectedPreset(RING_PRESETS.length - 1) }}
                                            placeholder="#OPENTOWORK"
                                            maxLength={50}
                                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]/20 font-mono transition-all"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="text-xs font-medium text-[#4B5563]">Font Size</label>
                                            <span className="text-[11px] text-[#9CA3AF] tabular-nums">{textSize}%</span>
                                        </div>
                                        <input type="range" min={50} max={200} value={textSize}
                                            onChange={(e) => setTextSize(Number(e.target.value))}
                                            className="w-full accent-[#0A66C2] h-1.5 cursor-pointer rounded-full" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="text-xs font-medium text-[#4B5563]">Text Position</label>
                                            <span className="text-[11px] text-[#9CA3AF] tabular-nums">{textPosition}%</span>
                                        </div>
                                        <input type="range" min={0} max={100} value={textPosition}
                                            onChange={(e) => setTextPosition(Number(e.target.value))}
                                            className="w-full accent-[#0A66C2] h-1.5 cursor-pointer rounded-full" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Download */}
                        <button
                            onClick={handleDownload}
                            className="w-full py-3 bg-[#0A66C2] text-white rounded-xl font-semibold text-sm hover:bg-[#004182] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98]"
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
                            Default matches LinkedIn&apos;s #OpenToWork style. Drag sliders to customize.
                        </p>
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
        </div>
    )
}
