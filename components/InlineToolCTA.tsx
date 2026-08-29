import React from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowRightIcon } from '@/components/ui/Icons'

export interface InlineToolCTAProps {
    toolHref: string
    toolName: string
    description: string
    ctaText?: string
    variant?: 'primary' | 'secondary' | 'gradient' | 'subtle' | 'editorial'
}

export default function InlineToolCTA({
    toolHref,
    toolName,
    description,
    ctaText = 'Try it free',
    variant = 'primary',
}: InlineToolCTAProps) {
    const variantStyles: Record<string, string> = {
        primary: 'bg-[#F0F7FF] border-[#BAE0FD] border-l-4 border-l-[#0A66C2]',
        secondary: 'bg-[#F8FAFC] border-[#E2E8F0] border-l-4 border-l-[#475569]',
        gradient: 'bg-[#F0F7FF] border-[#BAE0FD] border-l-4 border-l-[#0A66C2]',
        subtle: 'bg-[#F8FAFC] border-[#E2E8F0] border-l-4 border-l-[#475569]',
        editorial: 'bg-white border-[#E2E8F0] shadow-xs border-l-4 border-l-[#0A66C2]',
    }

    const appliedStyle = variantStyles[variant] || variantStyles.primary

    return (
        <div className={`p-5 sm:p-6 rounded-xl border my-8 transition-all ${appliedStyle}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="max-w-xl">
                    <p className="text-[15px] font-semibold text-[#0F172A] mb-1">
                        {toolName}
                    </p>
                    <p className="text-[13px] text-[#475569] leading-relaxed">
                        {description}
                    </p>
                </div>
                <div className="shrink-0">
                    <Button
                        href={toolHref}
                        variant="primary"
                        size="sm"
                        rightIcon={<ArrowRightIcon size={14} />}
                    >
                        {ctaText}
                    </Button>
                </div>
            </div>
        </div>
    )
}
