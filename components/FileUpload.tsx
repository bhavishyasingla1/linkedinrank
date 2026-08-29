'use client'

import { useState, useRef, useEffect, DragEvent } from 'react'
import { useRouter } from 'next/navigation'
import { UploadIcon, ShieldCheckIcon, ClockIcon, AlertCircleIcon } from '@/components/ui/Icons'

export default function FileUpload() {
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    useEffect(() => {
        const savedError = sessionStorage.getItem('analysisError')
        if (savedError) {
            setError(savedError)
            sessionStorage.removeItem('analysisError')
        }
    }, [])

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) processFile(file)
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) processFile(file)
    }

    const processFile = async (file: File) => {
        setError('')

        if (file.type !== 'application/pdf') {
            setError('Please upload a PDF file. LinkedIn exports are in PDF format.')
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('File must be under 5MB. Standard LinkedIn PDFs are usually under 1MB.')
            return
        }

        setIsProcessing(true)

        try {
            const reader = new FileReader()
            reader.onload = (e) => {
                const base64 = e.target?.result as string
                const base64Data = base64.split(',')[1]

                try {
                    sessionStorage.setItem(
                        'uploadingFile',
                        JSON.stringify({
                            fileName: file.name,
                            fileContent: base64Data,
                        })
                    )
                    router.push('/loading-analysis')
                } catch (storageErr: any) {
                    setIsProcessing(false)
                    setError(
                        'File is too large for temporary browser memory. Try re-exporting a fresh PDF from your LinkedIn profile.'
                    )
                }
            }
            reader.onerror = () => {
                setIsProcessing(false)
                setError('Failed to read file. Please try selecting the file again.')
            }
            reader.readAsDataURL(file)
        } catch (err: any) {
            setIsProcessing(false)
            setError(err.message || 'Failed to read file. Please try again.')
        }
    }

    return (
        <div className="w-full">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        fileInputRef.current?.click()
                    }
                }}
                className={`
                    relative cursor-pointer rounded-xl border-2 border-dashed p-8 sm:p-10 text-center
                    transition-colors duration-150 ease-out select-none
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2
                    ${isDragging
                        ? 'border-[#0A66C2] bg-[#F0F7FF]'
                        : 'border-[#CBD5E1] bg-[#FAFAFA] hover:border-[#0A66C2] hover:bg-[#F0F7FF]/50'
                    }
                `}
            >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-center mx-auto mb-3.5 text-[#0A66C2]">
                    <UploadIcon size={22} />
                </div>

                <p className="text-[16px] font-semibold text-[#0F172A] mb-1">
                    {isProcessing ? 'Processing your profile...' : 'Drop your LinkedIn PDF export here'}
                </p>
                <p className="text-[13px] text-[#64748B] mb-5">
                    or <span className="text-[#0A66C2] font-semibold hover:underline">choose file</span> to browse
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 text-[12px] text-[#64748B] pt-3 border-t border-[#E2E8F0]">
                    <span className="flex items-center gap-1.5">
                        <ShieldCheckIcon size={14} className="text-[#16A34A]" />
                        Private &amp; Secure
                    </span>
                    <span className="text-[#CBD5E1]" aria-hidden="true">•</span>
                    <span className="flex items-center gap-1.5">
                        PDF Format Only
                    </span>
                    <span className="text-[#CBD5E1]" aria-hidden="true">•</span>
                    <span className="flex items-center gap-1.5">
                        <ClockIcon size={14} className="text-[#0A66C2]" />
                        Under 60 Seconds
                    </span>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                    aria-label="Upload LinkedIn profile PDF"
                />
            </div>

            {error && (
                <div className="mt-3.5 p-3.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] animate-fade-in flex items-start gap-2.5">
                    <AlertCircleIcon size={18} className="text-[#DC2626] shrink-0 mt-0.5" />
                    <p className="text-[13px] font-medium text-[#DC2626]">{error}</p>
                </div>
            )}
        </div>
    )
}
