const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
        serverComponentsExternalPackages: ['pdf-parse'],
        optimizeCss: true,
        optimizePackageImports: ['@google/generative-ai'],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            const emptyPolyfill = path.resolve(__dirname, 'lib/empty-polyfill.js')
            config.resolve.alias = {
                ...config.resolve.alias,
                [path.resolve(__dirname, 'node_modules/next/dist/build/polyfills/polyfill-module.js')]: emptyPolyfill,
            }
        }
        return config
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                ],
            },
            {
                source: '/api/:path*',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
                ],
            },
        ]
    },
}

module.exports = nextConfig
