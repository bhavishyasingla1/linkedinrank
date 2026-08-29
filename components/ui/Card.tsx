import React from 'react'

export type CardVariant = 'default' | 'interactive' | 'flat' | 'subtle'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant
    as?: React.ElementType
}

const variantStyles: Record<CardVariant, string> = {
    default:
        'bg-white border border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(15,23,42,0.04),0_1px_2px_-1px_rgba(15,23,42,0.04)]',
    interactive:
        'bg-white border border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(15,23,42,0.04),0_1px_2px_-1px_rgba(15,23,42,0.04)] hover:border-[#CBD5E1] hover:shadow-[0_4px_12px_-2px_rgba(15,23,42,0.06),0_2px_4px_-2px_rgba(15,23,42,0.04)] transition-all duration-200 cursor-pointer',
    flat:
        'bg-white border border-[#E2E8F0]',
    subtle:
        'bg-[#F8FAFC] border border-[#E2E8F0]',
}

export function Card({
    children,
    className = '',
    variant = 'default',
    as: Component = 'div',
    ...props
}: CardProps) {
    return (
        <Component
            className={`rounded-xl ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </Component>
    )
}

export function CardHeader({
    children,
    className = '',
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`p-5 sm:p-6 border-b border-[#F1F5F9] ${className}`} {...props}>
            {children}
        </div>
    )
}

export function CardTitle({
    children,
    className = '',
    as: Component = 'h3',
    ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: React.ElementType }) {
    return (
        <Component
            className={`text-[16px] sm:text-[18px] font-semibold text-[#0F172A] tracking-tight ${className}`}
            {...props}
        >
            {children}
        </Component>
    )
}

export function CardDescription({
    children,
    className = '',
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className={`text-[13px] sm:text-[14px] text-[#64748B] mt-1 leading-relaxed ${className}`} {...props}>
            {children}
        </p>
    )
}

export function CardContent({
    children,
    className = '',
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`p-5 sm:p-6 ${className}`} {...props}>
            {children}
        </div>
    )
}

export function CardFooter({
    children,
    className = '',
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`p-4 sm:p-6 pt-0 sm:pt-0 flex items-center justify-between gap-4 ${className}`} {...props}>
            {children}
        </div>
    )
}
