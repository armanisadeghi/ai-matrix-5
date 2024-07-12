/*
import { chatsAtom, messagesFamily } from '@/state/aiAtoms/aiChatAtoms';
import { cloneAndEditChat } from '@/utils/supabase/chatDb';
import { useRecoilCallback } from 'recoil';
import { ActiveChatMessagesType, ChatDetailsType, ChatType, Json, MessageType } from '@/types';
import supabase from '@/utils/supabase/client';

export function useChatOperations() {
    const editChatTitle = useRecoilCallback(({ set }) => async (chatId: string, newTitle: string) => {
        const { data, error } = await supabase.rpc('edit_chat_title', { chat_id: chatId, new_title: newTitle });
        if (error) throw error;
        set(chatsAtom, (chats) => chats.map(chat =>
            chat.chatId === chatId ? { ...chat, chatTitle: newTitle } : chat
        ));
    });

    const deleteChat = useRecoilCallback(({ set }) => async (chatId: string) => {
        const { error } = await supabase.rpc('delete_chat', { chat_id: chatId });
        if (error) throw error;
        set(chatsAtom, (chats) => chats.filter(chat => chat.chatId !== chatId));
    });

    const cloneChat = useRecoilCallback(({ set }) => async (originalChatId: string) => {
        const newChat = await cloneChat(originalChatId);
        set(chatsAtom, (chats) => [...chats, newChat]);
        return newChat;
    });

    const cloneAndResetMessages = useRecoilCallback(({ set }) => async (originalChatId: string, resetIndex: number) => {
        const newChat = await cloneAndEditChat(originalChatId, resetIndex, "", "");
        set(chatsAtom, (chats) => [...chats, newChat]);
        set(messagesFamily(newChat.chatId), newChat.messages);
        return newChat;
    });

    const deleteMessage = useRecoilCallback(({ set }) => async (chatId: string, messageId: string) => {
        const { error } = await supabase.rpc('delete_message', { chat_id: chatId, message_id: messageId });
        if (error) throw error;
        set(messagesFamily(chatId), (messages) => messages.filter(msg => msg.id !== messageId));
    });

    const resetToIndex = useRecoilCallback(({ set }) => async (chatId: string, index: number) => {
        const { data, error } = await supabase.rpc('reset_messages_to_index', { chat_id: chatId, reset_index: index });
        if (error) throw error;
        set(messagesFamily(chatId), data);
    });

    const editMessage = useRecoilCallback(({ set }) => async (chatId: string, messageId: string, newText: string) => {
        const { data, error } = await supabase.rpc('edit_message', { chat_id: chatId, message_id: messageId, new_text: newText });
        if (error) throw error;
        set(messagesFamily(chatId), (messages) => messages.map(msg =>
            msg.id === messageId ? { ...msg, text: newText } : msg
        ));
    });

    return {
        editChatTitle,
        deleteChat,
        cloneChat,
        cloneAndResetMessages,
        deleteMessage,
        resetToIndex,
        editMessage,
    };
}*/
