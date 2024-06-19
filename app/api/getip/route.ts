import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    let ip = request.headers.get('x-forwarded-for') || request.ip || 'Unknown IP'

    // Handle cases where 'x-forwarded-for' might contain a list of IP addresses
    if (ip.includes(',')) {
        ip = ip.split(',')[0]
    }

    return NextResponse.json({ ip })
}
