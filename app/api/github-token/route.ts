// app/api/github-token/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const githubToken = request.cookies.get("github_token");

    if (githubToken) {
        return NextResponse.json({ accessToken: githubToken.value });
    } else {
        return NextResponse.json({ error: "No GitHub token found" }, { status: 401 });
    }
}
