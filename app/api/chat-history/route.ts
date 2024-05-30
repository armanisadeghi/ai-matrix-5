// app/api/chat-history/route.ts

import { NextRequest } from 'next/server';
import { routeGET, routePUT, routePOST, routeDELETE } from '@/middleware/routeMiddleware';

export async function GET(req: NextRequest) {
    return routeGET(req, "chat_ai", "chat");
}

export async function PUT(req: NextRequest) {
    return routePUT(req, "chat_ai", "chat");
}

export async function POST(req: NextRequest) {
    return routePOST(req, "chat_ai", "chat");
}

export async function DELETE(req: NextRequest) {
    return routeDELETE(req, "chat_ai", "chat");
}