import React from 'react'

export type ContainerSize = 'prose' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: ContainerSize
    as?: React.ElementType
}

const sizeStyles: Record<ContainerSize, string> = {
    prose: 'max-w-[680px]',
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
}

export function Container({
    children,
    className = '',
    size = 'lg',
    as: Component = 'div',
    ...props
}: ContainerProps) {
    return (
        <Component
            className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {children}
        </Component>
    )
}
