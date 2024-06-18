import { atom, selector, selectorFamily, atomFamily, useRecoilValue, useRecoilCallback } from 'recoil';
import supabase from '@/utils/supabase/client';
import { Database } from "@/types/supabase";
import { ChatSummary } from "@/types";
import { activeUserAtom } from "@/state/userAtoms";

export type Chats = Database['public']['Tables']['chats']['Row'];
export type ChatInsert = Database['public']['Tables']['chats']['Insert'];
export type ChatUpdate = Database['public']['Tables']['chats']['Update'];



// Selector for fetching chat summaries from Supabase - when the user logs in, we start with this, which shows all chats in the sidebar
export const chatSummariesSelector = selector<ChatSummary[]>({
    key: 'chatSummariesSelector',
    get: async ({get}) => {
        const userId = get(activeUserAtom)?.matrix_id;
        if (!userId) throw new Error('User not found');

        const { data, error } = await supabase
            .from('chats')
            .select('chat_id, chat_title')
            .eq('user_id', userId);

        if (error) throw error;

        return data.map(chat => ({
            chatId: chat.chat_id,
            chatTitle: chat.chat_title
        }));
    },
});



export const chatAtomFamily = atomFamily<Chats, string>({
    key: 'chatAtomFamily',
    default: async (chatId) => {
        const { data, error } = await supabase
            .from('chats')
            .select('*')
            .eq('chat_id', chatId)
            .single();

        if (error) {
            throw error;
        }

        return data as Chats;
    },
});



export const userChatsSelector = selectorFamily<Chats[], string>({
    key: 'userChatsSelector',
    get: (userId) => async ({ get }) => {
        const { data, error } = await supabase
            .from('chats')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            throw error;
        }

        return data as Chats[];
    },
});


export const chatSelector = selectorFamily<Chats, string>({
    key: 'chatSelector',
    get: (chatId) => ({ get }) => {
        return get(chatAtomFamily(chatId));
    },
});


export const createChat = async (chat: Omit<Chats, 'chat_id'>) => {
    const { data, error } = await supabase.from('chats').insert(chat).single();

    if (error) {
        throw error;
    }

    return data as Chats;
};


export const updateChat = async (chatId: string, updatedChat: Partial<Chats>) => {
    const { data, error } = await supabase
        .from('chats')
        .update(updatedChat)
        .eq('chat_id', chatId)
        .single();

    if (error) {
        throw error;
    }

    return data as Chats;
};


export const deleteChat = async (chatId: string) => {
    const { data, error } = await supabase.from('chats').delete().eq('chat_id', chatId);

    if (error) {
        throw error;
    }

    return data;
};


export const useUserChats = (userId: string) => {
    const chats = useRecoilValue(userChatsSelector(userId));
    const fetchChats = useRecoilCallback(({ set }) => async () => {
        const { data, error } = await supabase
            .from('chats')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            throw error;
        }

        set(chatIdsAtom, data.map((chats) => chats.chat_id));
    });

    return { chats, fetchChats };
};
