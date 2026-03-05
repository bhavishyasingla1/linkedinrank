'use client'

import { useState, useRef, useEffect, DragEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function FileUpload() {
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState('')
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
            setError('Please upload a PDF file.')
            return
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('File must be under 10MB.')
            return
        }

        try {
            // Convert file to base64 for storage
            const reader = new FileReader()
            reader.onload = (e) => {
                const base64 = e.target?.result as string
                const base64Data = base64.split(',')[1]

                sessionStorage.setItem('uploadingFile', JSON.stringify({
                    fileName: file.name,
                    fileContent: base64Data
                }))

                router.push('/loading-analysis')
            }
            reader.readAsDataURL(file)
        } catch (err: any) {
            setError(err.message || 'Failed to read file. Please try again.')
        }
    }

    return (
        <div>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                    relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center
                    transition-all duration-300
                    ${isDragging
                        ? 'border-[#0A66C2] bg-[#EFF6FF] shadow-[0_0_0_4px_rgba(10,102,194,0.12)] scale-[1.01]'
                        : 'border-[#0A66C2]/30 bg-gradient-to-b from-[#EFF6FF]/60 to-white hover:border-[#0A66C2]/60 hover:shadow-[0_8px_30px_rgba(10,102,194,0.1)] hover:scale-[1.005]'
                    }
                `}
            >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] flex items-center justify-center mx-auto mb-4 shadow-[0_4px_12px_rgba(10,102,194,0.3)]">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                </div>
                <p className="text-[16px] font-bold text-[#0A0F1C] mb-1">
                    Upload your LinkedIn PDF export
                </p>
                <p className="text-sm text-[#6B7280] mb-4">
                    Drop file here or click to browse
                </p>
                <div className="flex items-center justify-center gap-4 text-[11px] text-[#6B7280]">
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                        Private &amp; secure
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                        PDF only
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Under 1 min
                    </span>
                </div>
                <p className="text-[10px] text-[#9CA3AF] mt-3">Your PDF is processed instantly • No login required • File deleted after analysis</p>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>

            {error && (
                <div className="mt-3 p-3.5 rounded-xl bg-red-50 border border-red-200 animate-fade-in">
                    <p className="text-sm font-medium text-red-600 text-center">{error}</p>
                </div>
            )}
        </div>
    )
}
