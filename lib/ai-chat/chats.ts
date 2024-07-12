// lib/ai-chat/chats.ts

import { ChatType, MessageType } from '@/types';
import supabase from '@/utils/supabase/client';
import { getFromCache, setInCache } from './redis';

export async function getUserChats(matrixId: string): Promise<ChatType[]> {
    const cacheKey = `user:${matrixId}:chats`;

    console.log('getUserChats');
    // Try to get from cache first
    const cachedChats = await getFromCache(cacheKey);
    if (cachedChats) return cachedChats;

    console.log('-------------------------------------------------------------- Fetching from database');

    // If not in cache, fetch from database
    const { data, error } = await supabase.rpc('fetch_user_chats', { user_matrix_id: matrixId });
    if (error) throw error;

    // Store in cache and return
    await setInCache(cacheKey, data);
    return data;
}

export async function getChatMessages(chatId: string): Promise<MessageType[]> {
    const cacheKey = `chat:${chatId}:messages`;

    console.log('getChatMessages');
    // Try to get from cache first
    const cachedMessages = await getFromCache(cacheKey);
    if (cachedMessages) return cachedMessages;

    console.log('-------------------------------------------------------------- Fetching from database');

    // If not in cache, fetch from database
    const { data, error } = await supabase.rpc('fetch_messages', { matrix_chat_id: chatId });
    if (error) throw error;

    // Store in cache and return
    await setInCache(cacheKey, data);
    return data;
}
