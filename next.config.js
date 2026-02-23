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
    async redirects() {
        return [
            // 301 redirects: root-level tool slugs → canonical /tools/<slug>/
            { source: '/linkedin-headline-generator', destination: '/tools/linkedin-headline-generator', permanent: true },
            { source: '/linkedin-about-generator', destination: '/tools/linkedin-about-generator', permanent: true },
            { source: '/linkedin-experience-generator', destination: '/tools/linkedin-experience-generator', permanent: true },
            { source: '/linkedin-profile-photo-ring', destination: '/tools/linkedin-profile-photo-ring', permanent: true },
            { source: '/linkedin-profile-keyword-analyzer', destination: '/tools/linkedin-profile-keyword-analyzer', permanent: true },
            { source: '/linkedin-post-idea-generator', destination: '/tools/linkedin-post-idea-generator', permanent: true },
            { source: '/linkedin-story-to-post-converter', destination: '/tools/linkedin-story-to-post-converter', permanent: true },
            { source: '/linkedin-post-hook-generator', destination: '/tools/linkedin-post-hook-generator', permanent: true },
            { source: '/linkedin-content-planner', destination: '/tools/linkedin-content-planner', permanent: true },
            { source: '/linkedin-comment-generator', destination: '/tools/linkedin-comment-generator', permanent: true },
            { source: '/linkedin-connection-message-generator', destination: '/tools/linkedin-connection-message-generator', permanent: true },
            { source: '/linkedin-qr-code-generator', destination: '/tools/linkedin-qr-code-generator', permanent: true },
        ]
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
                    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                ],
            },
            {
                source: '/api/:path*',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
                ],
            },
            {
                source: '/:path*.svg',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                source: '/_next/static/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                source: '/robots.txt',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=86400' },
                ],
            },
            {
                source: '/llm.txt',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=86400' },
                ],
            },
        ]
    },
}

module.exports = nextConfig
