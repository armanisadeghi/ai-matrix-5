import { upsertFromAuth0 } from "@/hooks/users/upsertAuth0";
import { AuthProfile, MatrixUser } from "@/types/user.types";
import { getSession } from "@auth0/nextjs-auth0/edge";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/samples", "/armani", "/dashboard", "/matrix-engine", "/trial", "/trial-cookie", "/app"];

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const paths = PROTECTED_ROUTES;

    if (paths.some((path) => pathname.startsWith(path))) {
        console.log("request.nextUrl.pathname and request url:", pathname, request.url);

        const res = NextResponse.next();
        const session = await getSession(request, res);

        if (session) {
            const user: AuthProfile = session.user as AuthProfile;
            console.log("got user");

            try {
                const matrixUser: MatrixUser | null = await upsertFromAuth0(user);
                console.log("matrixUser from middleware has the user from Auth0");

                if (matrixUser) {
                    // Add matrixUser to the cookies
                    res.cookies.set("matrix_user", JSON.stringify(matrixUser), { httpOnly: true, path: "/" });

                    const language = typeof user.language === "string" ? user.language : "";
                    res.cookies.set("hl", language, { path: "/" });

                    // Get the Auth0 JWT and add it to cookies
                    const auth0Jwt = session.idToken;
                    if (auth0Jwt) {
                        res.cookies.set("auth0_jwt", auth0Jwt, { httpOnly: true, path: "/" });
                    }
                } else {
                    console.error("Failed to upsert user");
                }
            } catch (error) {
                console.error("Error upserting user:", error);
            }

            return res;
        } else {
            // Redirect to Auth0 login and set returnTo query param to the original URL
            return NextResponse.redirect(
                new URL(`/api/auth/login?returnTo=${encodeURIComponent(request.url)}`, request.url),
            );
        }
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        {
            source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },
        {
            source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
            has: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },
        {
            source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
            has: [{ type: "header", key: "x-present" }],
            missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
        },
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
