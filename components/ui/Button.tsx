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
        'bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] border border-[#2f27ce] shadow-md shadow-[#2f27ce]/20 active:scale-95',
    navy:
        'bg-[#050315] text-[#fbfbfe] border border-[#050315] hover:bg-[#1a173b] hover:border-[#2f27ce] shadow-md shadow-[#050315]/10 active:scale-95',
    secondary:
        'bg-[#dedcff]/50 text-[#2f27ce] border border-[#dedcff] hover:bg-[#dedcff] hover:border-[#2f27ce] active:bg-[#dedcff] active:scale-95',
    ghost:
        'bg-transparent text-[#050315]/80 border border-transparent hover:bg-[#dedcff]/40 hover:text-[#2f27ce] active:scale-95',
    destructive:
        'bg-[#DC2626] text-white border border-[#DC2626] hover:bg-[#B91C1C] active:scale-95 shadow-xs',
    outline:
        'bg-white text-[#050315] border-2 border-[#dedcff] hover:border-[#2f27ce] hover:text-[#2f27ce] active:scale-95',
    link:
        'bg-transparent text-[#2f27ce] border-0 p-0 h-auto hover:text-[#433bff] hover:underline underline-offset-4 shadow-none',
}

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3.5 py-1.5 text-[13px] rounded-full gap-1.5 min-h-[34px] font-bold',
    md: 'px-5 py-2.5 text-[14px] rounded-full gap-2 min-h-[40px] font-bold',
    lg: 'px-6 py-3 text-[15px] rounded-full gap-2 min-h-[46px] font-bold',
    xl: 'px-7 py-3.5 text-[16px] rounded-full gap-2.5 min-h-[52px] font-extrabold',
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
            inline-flex items-center justify-center font-bold tracking-tight
            transition-all duration-150 ease-out select-none active:scale-[0.98]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f27ce] focus-visible:ring-offset-2
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
            return (
                <Link
                    href={href}
                    target={target}
                    rel={rel}
                    className={`${baseClasses} no-underline`}
                >
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
