// app/actions/ai-chat/actions.ts
'use server'

import { getFromCache, setInCache } from '@/lib/ai-chat/redis';
import { ChatDetailsType, MessageType } from '@/types';
import supabase from '@/utils/supabase/client';


type JsonCompatible = {
    [key: string]: any;
};

export async function createChat(startChatObject: ChatDetailsType) {
    const {data, error} = await supabase.rpc('create_chat_and_messages', {start_chat: startChatObject as unknown as JsonCompatible});
    if (error) throw error;
    if (!data) { throw new Error('No data returned from create_chat_and_messages RPC'); }

    // Update cache
    await setInCache(`user:${startChatObject.matrixId}:chats`, null); // Invalidate user's chats cache
    await setInCache(`chat:${(data as { chatId: string }).chatId}:messages`, (data as { messages: MessageType[] }).messages);

    return data;
}

export async function addMessage(chatId: string, newMessage: MessageType) {
    const {data, error} = await supabase.rpc('add_custom_message', {
        chat_id: chatId,
        id: newMessage.id,
        role: newMessage.role,
        text: newMessage.text,
        index: newMessage.index,
        created_at: newMessage.createdAt,
    });
    if (error) throw error;
    if (!data) { throw new Error('No data returned from add_custom_message RPC'); }

    // Update cache
    const cachedMessages = await getFromCache(`chat:${chatId}:messages`);
    if (cachedMessages) {
        cachedMessages.push(newMessage);
        await setInCache(`chat:${chatId}:messages`, cachedMessages);
    }

    return data;
}
