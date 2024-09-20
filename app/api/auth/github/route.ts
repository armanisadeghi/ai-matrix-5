// app/api/auth/github/route.ts
import { NextResponse } from "next/server";

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID;

export async function GET() {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo&redirect_url=http://localhost:3000/dashboard/code-editor`;
    return NextResponse.redirect(githubAuthUrl);
}
