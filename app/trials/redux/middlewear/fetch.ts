import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/utils/supabase/client";

export const fetchUserChats = createAsyncThunk("chat/fetchUserChats", async (userId: string) => {
    const { data, error } = await supabase.rpc("fetch_user_chats", { user_matrix_id: userId });
    if (error) throw error;
    return data as any[];
});

export const fetchChatMessages = createAsyncThunk("chat/fetchChatMessages", async (chatId: string) => {
    const { data, error } = await supabase.rpc("fetch_chat_messages", { p_chat_id: chatId });
    if (error) throw error;
    return { chatId, messages: data as any[] };
});
