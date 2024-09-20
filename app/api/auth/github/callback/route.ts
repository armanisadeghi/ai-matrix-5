// app/api/auth/github/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_SECRET;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    try {
        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code,
            },
            {
                headers: {
                    Accept: "application/json",
                },
            },
        );

        const { access_token } = tokenResponse.data;

        // Create a new response
        const response = NextResponse.redirect(new URL("/", request.url));

        // Set the token in a secure HTTP-only cookie
        response.cookies.set("github_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Error during GitHub OAuth:", error);
        return NextResponse.json({ error: "Failed to authenticate with GitHub" }, { status: 500 });
    }
}
