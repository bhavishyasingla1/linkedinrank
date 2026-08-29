import React from 'react'

export type BadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'outline'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant
    size?: BadgeSize
    dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
    neutral: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]',
    brand: 'bg-[#F0F7FF] text-[#0A66C2] border-[#BAE0FD]',
    success: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    warning: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    error: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]',
    outline: 'bg-transparent text-[#475569] border-[#CBD5E1]',
}

const dotStyles: Record<BadgeVariant, string> = {
    neutral: 'bg-[#64748B]',
    brand: 'bg-[#0A66C2]',
    success: 'bg-[#16A34A]',
    warning: 'bg-[#D97706]',
    error: 'bg-[#DC2626]',
    outline: 'bg-[#64748B]',
}

const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-[11px] rounded-md gap-1',
    md: 'px-2.5 py-0.5 text-[12px] rounded-md gap-1.5',
    lg: 'px-3 py-1 text-[13px] rounded-lg gap-2 font-medium',
}

export function Badge({
    children,
    className = '',
    variant = 'neutral',
    size = 'md',
    dot = false,
    ...props
}: BadgeProps) {
    return (
        <span
            className={`
                inline-flex items-center font-medium border tracking-tight select-none
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
