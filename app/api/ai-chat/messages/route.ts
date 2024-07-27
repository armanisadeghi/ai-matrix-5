// app/api/ai-chat/messages/route.ts

import { getChatMessages } from '@/lib/ai-chat/chats';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get('chatId');
    if (!chatId) return new Response('Missing chatId', { status: 400 });

    const messages = await getChatMessages(chatId);

    return new Response(JSON.stringify(messages), { status: 200 });
}

