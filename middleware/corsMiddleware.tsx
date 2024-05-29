// middleware/corsMiddleware.ts

import { NextRequest, NextResponse } from 'next/server';

function setCorsHeaders(res: NextResponse, origin: string | null) {
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    res.headers.set('Access-Control-Allow-Origin', origin ?? '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
}

export default async function handleCorsMiddleware(req: NextRequest) {
    const origin = req.headers.get('origin') || req.headers.get('x-custom-origin') || '';

    if (!origin) {
        return new NextResponse('Origin header is missing', {status: 400});
    }

    const res = NextResponse.next();
    setCorsHeaders(res, origin);

    if (req.method === 'OPTIONS') {
        return new NextResponse(null, {status: 200});
    }

    return res;
}
