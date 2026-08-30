'use client'

import { useState, useRef, useEffect, DragEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
    UploadIcon,
    ShieldCheckIcon,
    AlertTriangleIcon,
    FileTextIcon,
    ArrowRightIcon,
    SparklesIcon,
} from '@/components/ui/Icons'
import { setPendingFile } from '@/lib/uploadStore'

export default function HeroUploaderStudio() {
    const [isDragging, setIsDragging] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    useEffect(() => {
        const savedError = sessionStorage.getItem('analysisError')
        if (savedError) {
            setError(savedError)
            sessionStorage.removeItem('analysisError')
        }

        if (typeof window !== 'undefined' && window.location.hash === '#upload') {
            const timer = setTimeout(() => {
                const el = document.getElementById('upload')
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) processFile(file)
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            processFile(file)
        }
        if (e.target) {
            e.target.value = ''
        }
    }

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                const res = (reader.result as string) || ''
                const base64 = res.includes(',') ? res.split(',')[1] : res
                resolve(base64)
            }
            reader.onerror = (err) => reject(err)
            reader.readAsDataURL(file)
        })
    }

    const processFile = async (file: File) => {
        setError('')

        const isPdf =
            file.type === 'application/pdf' ||
            file.type === 'application/x-pdf' ||
            file.type === 'application/octet-stream' ||
            file.name.toLowerCase().endsWith('.pdf')

        if (!isPdf) {
            setError('Please upload a PDF file. LinkedIn profile exports are in PDF format.')
            return
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('File must be under 10MB. Standard LinkedIn PDFs are usually under 1MB.')
            return
        }

        setIsProcessing(true)

        try {
            setPendingFile(file)

            try {
                const base64Data = await fileToBase64(file)
                if (base64Data) {
                    sessionStorage.setItem(
                        'uploadingFile',
                        JSON.stringify({
                            fileName: file.name,
                            fileContent: base64Data,
                        })
                    )
                }
            } catch (storageErr) {
                console.warn('sessionStorage serialization skipped:', storageErr)
            }

            router.push('/loading-analysis')
        } catch (err: any) {
            setIsProcessing(false)
            setError(err.message || 'Failed to process file. Please try again.')
        }
    }

    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        fileInputRef.current?.click()
    }

    return (
        <div id="upload" className="w-full max-w-3xl mx-auto scroll-mt-24 sm:scroll-mt-28">
            {/* Hidden File Input */}
            <input
                id="hero-pdf-file-input"
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf,application/x-pdf"
                onChange={handleFileSelect}
                className="sr-only"
                disabled={isProcessing}
                tabIndex={-1}
            />

            {/* ── Aside Floating Window Container with Palette Highlights ── */}
            <div className="rounded-3xl bg-white border-2 border-[#dedcff] shadow-2xl shadow-[#2f27ce]/8 overflow-hidden transition-all duration-300">
                {/* Window Header Strip in Soft Lavender (#dedcff) */}
                <div className="px-5 py-3.5 bg-[#dedcff]/60 border-b border-[#dedcff] flex items-center justify-between gap-4">
                    {/* Left macOS Window Dots */}
                    <div className="flex items-center gap-2" aria-hidden="true">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-2xs" />
                        <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-2xs" />
                        <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-2xs" />
                    </div>

                    {/* Center Document URL Pill */}
                    <div className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#dedcff] text-[12px] font-semibold text-[#050315] shadow-2xs leading-none">
                        <FileTextIcon size={13} className="text-[#2f27ce]" />
                        <span>profile-document.pdf</span>
                    </div>

                    {/* Right Security Pill */}
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center gap-1 text-[11px] font-bold text-[#2f27ce] bg-white border border-[#dedcff] px-3.5 py-1.5 rounded-full shadow-2xs leading-none">
                            <ShieldCheckIcon size={12} />
                            <span>100% Private</span>
                        </span>
                    </div>
                </div>

                {/* Main Window Dropzone Canvas */}
                <div className="p-6 sm:p-10">
                    <label
                        htmlFor="hero-pdf-file-input"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`
                            relative flex flex-col items-center justify-center cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-14 text-center
                            transition-all duration-200 select-none block group/drop
                            ${isDragging
                                ? 'border-[#433bff] bg-[#dedcff]/50 scale-[0.99] ring-4 ring-[#433bff]/20'
                                : 'border-[#dedcff] bg-[#fbfbfe] hover:border-[#2f27ce] hover:bg-[#dedcff]/20'
                            }
                            ${isProcessing ? 'pointer-events-none opacity-80' : ''}
                        `}
                    >
                        {/* Center Icon in Lavender Circle */}
                        <div className={`
                            w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-200
                            ${isDragging
                                ? 'bg-[#2f27ce] text-white scale-110 shadow-lg shadow-[#2f27ce]/30'
                                : 'bg-[#dedcff] text-[#2f27ce] group-hover/drop:bg-gradient-to-tr group-hover/drop:from-[#2f27ce] group-hover/drop:to-[#433bff] group-hover/drop:text-white shadow-xs'
                            }
                        `}>
                            {isProcessing ? (
                                <svg className="animate-spin w-7 h-7 text-[#2f27ce]" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                            ) : (
                                <UploadIcon size={26} />
                            )}
                        </div>

                        {/* Dropzone Headline */}
                        <h3 className="text-[20px] sm:text-[23px] font-extrabold text-[#050315] mb-1.5 tracking-tight">
                            {isProcessing ? 'Evaluating 30+ Recruiter Signals...' : 'Drop your LinkedIn PDF here'}
                        </h3>
                        <p className="text-[14px] text-[#050315]/70 mb-6 font-medium">
                            or click anywhere in this window to browse
                        </p>

                        {/* Primary Pill Button in Royal Blue & Electric Accent */}
                        <button
                            type="button"
                            onClick={handleButtonClick}
                            disabled={isProcessing}
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] text-[14.5px] font-bold shadow-lg shadow-[#2f27ce]/25 hover:shadow-xl hover:shadow-[#433bff]/35 transition-all duration-150 cursor-pointer group-hover/drop:scale-102 active:scale-95"
                        >
                            <UploadIcon size={16} />
                            <span>Upload LinkedIn PDF</span>
                            <ArrowRightIcon size={14} className="group-hover/drop:translate-x-0.5 transition-transform" />
                        </button>

                        {/* File Specs Metadata Pill */}
                        <div className="mt-5 inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dedcff]/70 border border-[#dedcff] text-[12px] font-semibold text-[#050315] leading-none">
                            <span>PDF format</span>
                            <span>•</span>
                            <span>Max 10MB</span>
                            <span>•</span>
                            <span>In-memory only</span>
                        </div>
                    </label>

                    {/* Error Banner */}
                    {error && (
                        <div className="mt-4 p-3.5 bg-[#FEF2F2] border border-[#FECACA] rounded-xl text-[13px] text-[#DC2626] flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <AlertTriangleIcon size={16} className="shrink-0 text-[#DC2626]" />
                                <span>{error}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setError('')}
                                className="text-[#DC2626] hover:text-[#991B1B] font-bold text-[16px] px-1 cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ── 3-Step Workflow Pipeline Connected Bar ── */}
            <div className="mt-6 p-2 sm:p-2.5 rounded-2xl bg-white/90 border border-[#dedcff] shadow-sm shadow-[#2f27ce]/5 backdrop-blur-md">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 relative">
                    {/* Step 1 */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#fbfbfe] border border-[#dedcff]/60 hover:border-[#2f27ce]/40 transition-all group">
                        <div className="w-8 h-8 rounded-lg bg-[#dedcff] text-[#2f27ce] font-extrabold text-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                            01
                        </div>
                        <div className="text-left min-w-0">
                            <span className="block text-[10px] font-extrabold text-[#2f27ce] uppercase tracking-wider leading-none">
                                Step 1
                            </span>
                            <span className="block text-[13px] font-bold text-[#050315] truncate mt-0.5">
                                Export LinkedIn PDF
                            </span>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#fbfbfe] border border-[#dedcff]/60 hover:border-[#2f27ce]/40 transition-all group">
                        <div className="w-8 h-8 rounded-lg bg-[#dedcff] text-[#2f27ce] font-extrabold text-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                            02
                        </div>
                        <div className="text-left min-w-0">
                            <span className="block text-[10px] font-extrabold text-[#2f27ce] uppercase tracking-wider leading-none">
                                Step 2
                            </span>
                            <span className="block text-[13px] font-bold text-[#050315] truncate mt-0.5">
                                Drop File Here
                            </span>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-white via-white to-[#dedcff]/30 border border-[#2f27ce]/40 hover:border-[#2f27ce] transition-all group relative overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-[#2f27ce] text-white font-extrabold text-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                            03
                        </div>
                        <div className="text-left min-w-0">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-[#2f27ce] uppercase tracking-wider leading-none">
                                <span className="relative flex h-1.5 w-1.5 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2f27ce] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2f27ce]" />
                                </span>
                                Step 3
                            </span>
                            <span className="block text-[13px] font-bold text-[#050315] truncate mt-0.5">
                                Instant Recruiter Audit
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
