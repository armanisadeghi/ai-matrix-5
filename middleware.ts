import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const paths = ['/samples', '/dashboard', '/matrix-engine']

    if (paths.some((path) => pathname.startsWith(path))) {
        console.log('request.nextUrl.pathname', pathname)
        console.log('request.url', request.url)

        const res = NextResponse.next()
        const session = await getSession(request, res)

        if (session) {
            const user: any = session.user
            console.log('user', user)
            res.cookies.set('hl', user?.language)
            return res
        } else {
            // Redirect to Auth0 login and set returnTo query param to the original URL
            return NextResponse.redirect(
                new URL(`/api/auth/login?returnTo=${encodeURIComponent(request.url)}`, request.url)
            )
        }
    }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
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
                { type: 'header', key: 'purpose', value: 'prefetch' }
            ]
        },

        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            has: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' }
            ]
        },

        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            has: [{ type: 'header', key: 'x-present' }],
            missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }]
        }
    ]
}
