'use client'

import dynamic from 'next/dynamic'

const FileUpload = dynamic(() => import('@/components/FileUpload'), {
    ssr: false,
    loading: () => (
        <div className="relative rounded-2xl border-2 border-dashed border-[#0A66C2]/30 bg-gradient-to-b from-[#EFF6FF]/60 to-white p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] flex items-center justify-center mx-auto mb-4 shadow-[0_4px_12px_rgba(10,102,194,0.3)]">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
            </div>
            <p className="text-[16px] font-bold text-[#0A0F1C] mb-1">Upload your LinkedIn PDF</p>
            <p className="text-sm text-[#6B7280]">Drop file here or click to browse</p>
        </div>
    ),
})

export default function FileUploadWrapper() {
    return <FileUpload />
}
