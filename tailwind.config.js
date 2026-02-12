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
                    DEFAULT: '#0A66C2',
                    dark: '#004182',
                    light: '#E8F4FD',
                    soft: '#F3F6F8',
                },
                surface: {
                    DEFAULT: '#ffffff',
                    soft: '#F3F2EF',
                    card: '#ffffff',
                },
                txt: {
                    DEFAULT: '#191919',
                    secondary: '#666666',
                    muted: '#999999',
                },
                success: '#057642',
                warning: '#E7A33E',
                error: '#CC1016',
            },
            fontFamily: {
                sans: ['-apple-system', 'system-ui', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.4s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(12px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
