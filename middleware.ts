import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/samples/sample-login')) {
        return NextResponse.rewrite(new URL('/api/auth/login', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/dashboard/sample-login')) {
        return NextResponse.rewrite(new URL('/api/auth/login', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/matrix-engine')) {
        return NextResponse.rewrite(new URL('/api/auth/login', request.url))
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },

        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            has: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },

        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            has: [{ type: 'header', key: 'x-present' }],
            missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
        },
    ],
};