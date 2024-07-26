import { createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '@/utils/supabase/client';

export const fetchUserChats = createAsyncThunk(
    'chat/fetchUserChats',
    async (userId: string) => {
        const { data, error } = await supabase.rpc('get_user_chats', { user_id: userId });
        if (error) throw error;
        return data as ChatType[];
    }
);

export const fetchChatMessages = createAsyncThunk(
    'chat/fetchChatMessages',
    async (chatId: string) => {
        const { data, error } = await supabase.rpc('get_chat_messages', { chat_id: chatId });
        if (error) throw error;
        return { chatId, messages: data as MessageType[] };
    }
);
