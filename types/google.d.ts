import 'react'

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        'google-add-preferred-source-btn'?: string | boolean
        'data-theme'?: 'light' | 'dark' | string
        'data-lang'?: string
    }
}

declare global {
    interface Window {
        PREFERRED_SOURCE?: Array<(preferredSource: {
            init: (options: { theme?: 'light' | 'dark'; lang?: string }) => void
            addPreferredSource: () => void
        }) => void>
        preferredSource?: {
            init: (options: { theme?: 'light' | 'dark'; lang?: string }) => void
            addPreferredSource: () => void
        }
    }
}
