// Inline Tool CTA - Conversion Component
import Link from 'next/link'

interface InlineToolCTAProps {
    toolHref: string
    toolName: string
    description: string
    ctaText?: string
    variant?: 'primary' | 'secondary' | 'gradient'
}

export default function InlineToolCTA({
    toolHref,
    toolName,
    description,
    ctaText = 'Try it free →',
    variant = 'primary'
}: InlineToolCTAProps) {
    const variants = {
        primary: 'bg-blue-50 border-l-4 border-blue-600',
        secondary: 'bg-purple-50 border-l-4 border-purple-600',
        gradient: 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600'
    }

    return (
        <div className={`inline-cta ${variants[variant]} p-6 rounded-lg my-8`}>
            <p className="font-semibold text-[#0A0F1C] mb-2">{toolName}</p>
            <p className="text-sm text-[#4B5563] mb-4">{description}</p>
            <Link
                href={toolHref}
                className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-[#084E96] transition-colors"
            >
                {ctaText}
            </Link>
        </div>
    )
}
