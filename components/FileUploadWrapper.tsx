'use client'

import dynamic from 'next/dynamic'
import { UploadIcon } from '@/components/ui/Icons'

const FileUpload = dynamic(() => import('@/components/FileUpload'), {
    ssr: false,
    loading: () => (
        <div className="relative rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#FAFAFA] p-8 sm:p-10 text-center">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-center mx-auto mb-3.5 text-[#0A66C2]">
                <UploadIcon size={22} />
            </div>
            <p className="text-[16px] font-semibold text-[#0F172A] mb-1">Upload your LinkedIn PDF</p>
            <p className="text-[13px] text-[#64748B]">Drop file here or click to browse</p>
        </div>
    ),
})

export default function FileUploadWrapper() {
    return <FileUpload />
}
