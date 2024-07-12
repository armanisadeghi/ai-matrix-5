// app/api/ai-chat/chats/route.ts

import { getUserChats } from '@/lib/ai-chat/chats';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const matrixId = searchParams.get('matrixId');
    if (!matrixId) return new Response('Missing matrixId', { status: 400 });

    const chats = await getUserChats(matrixId);
    return new Response(JSON.stringify(chats), { status: 200 });
}

