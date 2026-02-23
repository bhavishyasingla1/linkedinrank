import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const host = request.headers.get('host') || ''
    const url = request.nextUrl.clone()

    // www -> non-www 301 redirect (fixes GSC "Alternative page with proper canonical tag")
    if (host.startsWith('www.')) {
        url.host = host.replace('www.', '')
        return NextResponse.redirect(url, 301)
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/:path*',
}
