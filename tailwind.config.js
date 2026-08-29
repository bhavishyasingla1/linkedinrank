/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#F0F7FF',
                    100: '#E0EFFF',
                    200: '#BAE0FD',
                    500: '#0A66C2',
                    600: '#004182',
                    700: '#003366',
                    800: '#002244',
                    900: '#0A192F',
                    DEFAULT: '#0A66C2',
                    dark: '#004182',
                    light: '#E0EFFF',
                    soft: '#F0F7FF',
                },
                navy: {
                    DEFAULT: '#0F172A',
                    light: '#1E293B',
                    dark: '#020617',
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                    subtle: '#FAFAFA',
                    muted: '#F1F5F9',
                    card: '#FFFFFF',
                    border: '#E2E8F0',
                    'border-subtle': '#F1F5F9',
                    soft: '#F8FAFC',
                },
                txt: {
                    DEFAULT: '#0F172A',
                    primary: '#0F172A',
                    secondary: '#475569',
                    muted: '#64748B',
                    subtle: '#94A3B8',
                },
                success: {
                    DEFAULT: '#16A34A',
                    light: '#F0FDF4',
                    border: '#BBF7D0',
                    dark: '#15803D',
                },
                warning: {
                    DEFAULT: '#D97706',
                    light: '#FFFBEB',
                    border: '#FDE68A',
                    dark: '#B45309',
                },
                error: {
                    DEFAULT: '#DC2626',
                    light: '#FEF2F2',
                    border: '#FECACA',
                    dark: '#B91C1C',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
            },
            fontSize: {
                display: ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.035em', fontWeight: '700' }],
                h1: ['clamp(2rem, 3.5vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.03em', fontWeight: '700' }],
                h2: ['clamp(1.5rem, 2.25vw, 1.875rem)', { lineHeight: '1.25', letterSpacing: '-0.025em', fontWeight: '600' }],
                h3: ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.02em', fontWeight: '600' }],
                h4: ['1.0625rem', { lineHeight: '1.4', letterSpacing: '-0.015em', fontWeight: '600' }],
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
                sm: '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
                md: '0 4px 8px -2px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
                lg: '0 12px 24px -4px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.03)',
                card: '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
                'card-hover': '0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
                dropdown: '0 10px 30px -5px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.06)',
            },
            borderRadius: {
                xs: '3px',
                sm: '4px',
                md: '6px',
                lg: '8px',
                xl: '12px',
                '2xl': '16px',
            },
            animation: {
                'fade-in': 'fadeIn 0.2s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(8px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
