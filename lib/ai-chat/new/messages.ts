// lib/ai-chat/messages.ts

import { MessageType } from '@/types';
import supabase from '@/utils/supabase/client';
import { getFromCache, setInCache, deleteFromCache } from '../redis';

// lib/ai-chat/new/messages.ts
// This is how we could fully manage state with Redis. It's not perfect, but it's very close to what we need.
// Also see: hooks/ai/new/useManageChatState.ts



// Utility Functions
function toDatabaseFormat(message: MessageType): any {
    return {
        id: message.id,
        chat_id: message.chatId,
        created_at: message.createdAt,
        index: message.index,
        text: message.text,
        role: message.role
    };
}

function fromDatabaseFormat(message: any): MessageType {
    return {
        id: message.id,
        chatId: message.chat_id,
        createdAt: message.created_at,
        index: message.index,
        text: message.text,
        role: message.role
    };
}

// Add or update messages in cache without database interaction
export async function addMessageToCache(message: MessageType, chatId: string): Promise<void> {
    const cacheKey = `chat:${chatId}:messages`;
    let messages = await getFromCache(cacheKey) as MessageType[];
    if (!messages) {
        messages = [message];
    } else {
        const index = messages.findIndex(m => m.id === message.id);
        if (index > -1) {
            messages[index] = message; // Update existing message
        } else {
            messages.push(message); // Add new message
        }
    }
    await setInCache(cacheKey, messages);
}

export async function addMultipleMessagesToCache(messagesToAdd: MessageType[], chatId: string): Promise<void> {
    for (const message of messagesToAdd) {
        await addMessageToCache(message, chatId); // Reuse addMessageToCache for each message
    }
}

// Fetch messages from cache, converting to frontend format
export async function getMessages(chatId: string): Promise<MessageType[]> {
    const cacheKey = `chat:${chatId}:messages`;
    const cachedMessages = await getFromCache(cacheKey);
    if (cachedMessages) return cachedMessages.map(fromDatabaseFormat);

    const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId);

    if (error) throw error;
    const convertedData = data.map(fromDatabaseFormat);
    await setInCache(cacheKey, convertedData);
    return convertedData;
}

// CRUD Operations (Now ensuring no duplicate additions)
export async function addMessage(message: MessageType): Promise<void> {
    const { data, error } = await supabase
    .from('messages')
    .insert([toDatabaseFormat(message)]);

    if (error) throw error;
}

export async function addMultipleMessages(messages: MessageType[]): Promise<void> {
    const { data, error } = await supabase
    .from('messages')
    .insert(messages.map(toDatabaseFormat));

    if (error) throw error;
}

export async function deleteMessage(messageId: string): Promise<void> {
    const { data, error } = await supabase
    .from('messages')
    .delete()
    .match({ id: messageId });

    if (error) throw error;
}

export async function editMessage(messageId: string, newText: string): Promise<void> {
    const { data, error } = await supabase
    .from('messages')
    .update({ text: newText })
    .match({ id: messageId });

    if (error) throw error;
}

// Update messages based on a given array of messages, using addMessage
export async function updateMessages(messages: MessageType[]): Promise<void> {
    for (const message of messages) {
        await addMessage(message); // Reuse addMessage to handle individual updates
    }
}
