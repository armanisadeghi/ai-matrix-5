// pages/api/auth/github-status.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const githubToken = request.cookies.get("github_token")?.value;

    if (githubToken) {
        return NextResponse.json({
            isAuthenticated: true,
            token: githubToken,
        });
    } else {
        return NextResponse.json({
            isAuthenticated: false,
        });
    }
}
