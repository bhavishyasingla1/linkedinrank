import React, { forwardRef } from 'react'
import Link from 'next/link'

export type ButtonVariant = 'primary' | 'navy' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    href?: string
    target?: string
    rel?: string
    isLoading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        'bg-[#0A66C2] text-white border border-[#0A66C2] hover:bg-[#004182] hover:border-[#004182] active:bg-[#003366] shadow-[0_1px_2px_0_rgba(15,23,42,0.06)]',
    navy:
        'bg-[#0F172A] text-white border border-[#0F172A] hover:bg-[#1E293B] hover:border-[#1E293B] active:bg-[#020617] shadow-[0_1px_2px_0_rgba(15,23,42,0.06)]',
    secondary:
        'bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] active:bg-[#F1F5F9] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]',
    ghost:
        'bg-transparent text-[#475569] border border-transparent hover:bg-[#F1F5F9] hover:text-[#0F172A] active:bg-[#E2E8F0]',
    destructive:
        'bg-[#DC2626] text-white border border-[#DC2626] hover:bg-[#B91C1C] hover:border-[#B91C1C] active:bg-[#991B1B] shadow-[0_1px_2px_0_rgba(15,23,42,0.06)]',
    outline:
        'bg-transparent text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] active:bg-[#F1F5F9]',
    link:
        'bg-transparent text-[#0A66C2] border-0 p-0 h-auto hover:text-[#004182] hover:underline underline-offset-4 shadow-none',
}

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-[13px] rounded-md gap-1.5 min-h-[34px]',
    md: 'px-4 py-2 text-[14px] rounded-lg gap-2 min-h-[40px]',
    lg: 'px-5 py-2.5 text-[15px] rounded-lg gap-2 min-h-[46px] font-semibold',
    xl: 'px-6 py-3.5 text-[16px] rounded-xl gap-2.5 min-h-[52px] font-semibold',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            className = '',
            variant = 'primary',
            size = 'md',
            href,
            target,
            rel,
            isLoading = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseClasses = `
            inline-flex items-center justify-center font-medium tracking-tight
            transition-all duration-150 ease-out select-none active:scale-[0.99]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2
            disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:transform-none
            ${variantStyles[variant]}
            ${variant !== 'link' ? sizeStyles[size] : ''}
            ${fullWidth ? 'w-full' : ''}
            ${className}
        `.trim().replace(/\s+/g, ' ')

        const content = (
            <>
                {isLoading && (
                    <svg
                        className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
                <span>{children}</span>
                {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
            </>
        )

        if (href) {
            const isExternal = href.startsWith('http') || href.startsWith('mailto:')
            if (isExternal) {
                return (
                    <a
                        href={href}
                        target={target || '_blank'}
                        rel={rel || 'noopener noreferrer'}
                        className={baseClasses}
                    >
                        {content}
                    </a>
                )
            }
            return (
                <Link href={href} className={baseClasses}>
                    {content}
                </Link>
            )
        }

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={baseClasses}
                {...props}
            >
                {content}
            </button>
        )
    }
)

Button.displayName = 'Button'
