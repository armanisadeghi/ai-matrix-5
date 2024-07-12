import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';
import { upsertFromAuth0 } from '@/hooks/users/upsertAuth0';
import { AuthProfile, MatrixUser } from '@/types/user.types';
import { cookies } from 'next/headers'

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const paths = ['/samples','/armani', '/dashboard', '/matrix-engine', '/trial', '/trial-cookie', '/app'];

    if (paths.some(path => pathname.startsWith(path))) {
        console.log('request.nextUrl.pathname and request url:', pathname, request.url);

        const res = NextResponse.next();
        const session = await getSession(request, res);

        if (session) {
            const user: AuthProfile = session.user as AuthProfile;
            console.log('got user');

            // TODO: Currently, we're actually calling the db twice. Once here by the server, and then again by the client.
            // I hope to find a good way to pass the information, but cookies doesn't appear to be the best solution.
            try {
                const matrixUser: MatrixUser | null = await upsertFromAuth0(user);
                console.log('matrixUser from middleware has the user from Auth0');

                if (matrixUser) {
                    // Add matrixUser to the cookies
                    res.cookies.set('matrix_user', JSON.stringify(matrixUser), { httpOnly: true, path: '/' });

                    const language = typeof user.language === 'string' ? user.language : '';
                    res.cookies.set('hl', language, { path: '/' });
                } else {
                    console.error('Failed to upsert user');
                }
            } catch (error) {
                console.error('Error upserting user:', error);
            }

            return res;
        } else {
            // Redirect to Auth0 login and set returnTo query param to the original URL
            return NextResponse.redirect(new URL(`/api/auth/login?returnTo=${encodeURIComponent(request.url)}`, request.url));
        }
    }
    return NextResponse.next();
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
