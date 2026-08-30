import React from 'react'

export type BadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'outline'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant
    size?: BadgeSize
    dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
    neutral: 'bg-[#dedcff]/50 text-[#050315]/80 border-[#dedcff]',
    brand: 'bg-[#dedcff] text-[#2f27ce] border-[#dedcff]',
    success: 'bg-[#dedcff]/60 text-[#2f27ce] border-[#dedcff]',
    warning: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    error: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]',
    outline: 'bg-transparent text-[#2f27ce] border-2 border-[#dedcff]',
}

const dotStyles: Record<BadgeVariant, string> = {
    neutral: 'bg-[#2f27ce]',
    brand: 'bg-[#2f27ce]',
    success: 'bg-[#2f27ce]',
    warning: 'bg-[#D97706]',
    error: 'bg-[#DC2626]',
    outline: 'bg-[#2f27ce]',
}

const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2.5 py-0.5 text-[11px] rounded-full gap-1 font-bold',
    md: 'px-3 py-1 text-[12px] rounded-full gap-1.5 font-bold',
    lg: 'px-4 py-1.5 text-[13px] rounded-full gap-2 font-extrabold',
}

export function Badge({
    children,
    className = '',
    variant = 'brand',
    size = 'md',
    dot = false,
    ...props
}: BadgeProps) {
    return (
        <span
            className={`
                inline-flex items-center font-bold border tracking-tight select-none
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${className}
            `.trim().replace(/\s+/g, ' ')}
            {...props}
        >
            {dot && (
                <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotStyles[variant]}`}
                    aria-hidden="true"
                />
            )}
            {children}
        </span>
    )
}
