import { activeChatIdAtom, activeChatMessagesArrayAtom, systemMessageAtom, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import { quickChatSettingsState } from '@/state/aiAtoms/settingsAtoms';
import { activeUserAtom } from '@/state/userAtoms';
import supabase from '@/utils/supabase/client';
import { atom, atomFamily, DefaultValue, selector, selectorFamily } from 'recoil';
import { ChatType, MessageType } from '@/types';
import { v4 as uuidv4 } from 'uuid';




/*

export const startChatSelector = selector({
    key: 'startChatSelector',
    get: ({ get }) => {
        return null;
    },
    set: ({ set, get }, newChat) => {
        if (newChat instanceof DefaultValue) return;

        const activeUser = get(activeUserAtom);
        const systemMessage = get(systemMessageAtom);
        const userMessage = get(userTextInputAtom);

        const chatTitle = userMessage.length > 25 ? userMessage.substring(0, 25) : userMessage;

        // Generate UUIDs
        const m_uuid1 = uuidv4();
        const m_uuid2 = uuidv4();

        // Construct the chat parameters
        const chatParams = {
            p_chat_id: uuidv4(),
            p_chat_title: chatTitle,
            p_created_at: new Date().toISOString(),
            p_last_edited: new Date().toISOString(),
            p_matrix_id: activeUser.matrixId,
            p_metadata: {},
            m_id_1: m_uuid1,
            m_role_1: 'system',
            m_text_1: systemMessage,
            m_index_1: 0,
            m_created_at_1: new Date().toISOString(),
            m_id_2: m_uuid2,
            m_role_2: 'user',
            m_text_2: userMessage,
            m_index_2: 1,
            m_created_at_2: new Date().toISOString()
        };

        supabase.rpc('start_ai_chat', chatParams).then(response => {
            if (response.error) throw response.error;

            const { data } = response;
            const chatData = data[0] as ChatType;
            set(chatsAtom, (oldChats) => [...oldChats, chatData]);
            set(activeChatIdAtom, chatData.chatId);
            // Load the messages into the messages atom family
            set(messagesAtomFamily(chatData.message), chatData.messages);
        });
    }
});

export const addMessageToSelector = selector({
    key: 'addMessageToSelector',
    get: ({get}) => {
        return null;
    },
    set: ({set, get}, newMessage) => {
        if (!newMessage) return;

        const activeChatId = get(activeChatIdAtom);
        if (!activeChatId) return;

        supabase.rpc('add_user_message', {
            chat_id: activeChatId,
            message: newMessage
        }).then(response => {
            if (response.error) throw response.error;

            // Update the messages atom family for the active chat
            set(messagesAtomFamily(activeChatId), oldMessages => [...oldMessages, response.data]);
        });
    }
});
*/
