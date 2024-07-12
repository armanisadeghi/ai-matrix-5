import { useCreateNewChatObject, useUpdateChatLocalState } from '@/hooks/ai/chatUtils';
import { chatSummariesAtom } from '@/state/aiAtoms/aiChatAtoms';
import supabase from '@/utils/supabase/client';
import { ChatType } from '@/types';
import { useRecoilState } from 'recoil';


export const useChatApi = () => {
    const [chats, setChats] = useRecoilState(chatSummariesAtom);
    const createNewChatObject = useCreateNewChatObject();
    const updateChatLocalState = useUpdateChatLocalState();

    const createChat = async (chatId: string) => {
        const chatObject = createNewChatObject(chatId);
        const chatDataJson = JSON.stringify(chatObject);
        const {data, error} = await supabase.rpc('create_chat', {chat_data: chatDataJson});
        updateChatLocalState(chatObject);
        if (error) throw error;
    };

    const updateChat = async (chat: Partial<ChatType>) => {
        if (!chat.chatId) throw new Error('Chat ID is required for update');
        const updatedChat = {
            ...chat,
            lastEdited: new Date().toISOString(),
        };
        const {data, error} = await supabase.rpc('update_chat', {chat_data: updatedChat});
        if (error) throw error;
        updateChatLocalState(updatedChat);
    };

    const deleteChat = async (chatId: string) => {
        const {data, error} = await supabase.rpc('delete_chat', {input_chat_id: chatId});
        if (error) throw error;
        setChats(chats.filter(chat => chat.chatId !== chatId));
    };

    const updateTitle = async (chatId: string, chatTitle: string) => {
        const {data, error} = await supabase.rpc('update_chat_title', {input_chat_id: chatId, new_title: chatTitle});
        if (error) throw error;
        updateChatLocalState({ chatId, chatTitle });
    };

    return {
        createChat,
        updateChat,
        deleteChat,
        updateTitle,
    };
};
