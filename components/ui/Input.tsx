import React, { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    helperText?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    wrapperClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            id,
            className = '',
            wrapperClassName = '',
            disabled,
            required,
            ...props
        },
        ref
    ) => {
        const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
        const errorId = inputId ? `${inputId}-error` : undefined
        const helperId = inputId ? `${inputId}-helper` : undefined

        return (
            <div className={`w-full ${wrapperClassName}`}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-[13px] font-semibold text-[#334155] tracking-tight mb-1.5"
                    >
                        {label}
                        {required && <span className="text-[#DC2626] ml-0.5">*</span>}
                    </label>
                )}
                <div className="relative flex items-center">
                    {leftIcon && (
                        <div className="absolute left-3.5 flex items-center pointer-events-none text-[#64748B]">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        disabled={disabled}
                        required={required}
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? errorId : helperText ? helperId : undefined}
                        className={`
                            w-full bg-white text-[#0F172A] text-[14px] leading-normal
                            border rounded-lg py-2.5 px-3.5
                            placeholder:text-[#94A3B8]
                            transition-colors duration-150 ease-out
                            focus:outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/15
                            disabled:bg-[#F8FAFC] disabled:text-[#94A3B8] disabled:cursor-not-allowed
                            ${leftIcon ? 'pl-10' : ''}
                            ${rightIcon ? 'pr-10' : ''}
                            ${error
                                ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/15'
                                : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                            }
                            ${className}
                        `.trim().replace(/\s+/g, ' ')}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3.5 flex items-center pointer-events-none text-[#64748B]">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p id={errorId} className="mt-1.5 text-[12px] font-medium text-[#DC2626] flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4m0 4h.01" />
                        </svg>
                        {error}
                    </p>
                )}
                {!error && helperText && (
                    <p id={helperId} className="mt-1.5 text-[12px] text-[#64748B]">
                        {helperText}
                    </p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'
