/*
import { activeChatIdAtom, activeChatMessagesArrayAtom, systemMessageAtom, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import { activeUserAtom } from '@/state/userAtoms';
import supabase from '@/utils/supabase/client';
import { useCallback } from 'react';
import { atom, DefaultValue, selector, selectorFamily, useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';


/!*


const chatSummariesSelector = selector({
    key: 'chatSummariesSelector',
    get: async ({get}) => {
        const activeUser = get(activeUserAtom);
        const {data, error} = await supabase.rpc('fetch_user_chats', {user_matrix_id: activeUser.matrixId});
        if (error) {
            console.error('Error fetching chats:', error.message);
            return [];
        }
        return data;
    }
});

*!/

/!*
const useChatSummaries = () => {
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesSelector);
    const [chatSummaries, setChatSummaries] = useRecoilState(chatSummariesAtom);

    switch (chatSummariesLoadable.state) {
        case 'hasValue':
            if (chatSummaries.length === 0) {
                setChatSummaries(chatSummariesLoadable.contents);
            }
            return chatSummaries;
        case 'loading':
            return 'loading';
        case 'hasError':
            throw chatSummariesLoadable.contents;
        default:
            return null;
    }
};*!/
/!*
const chatMessagesArrayAtom = atom<ChatWithMessages | undefined>({
    key: 'chatMessagesArrayAtom',
    default: undefined,
});

/!*

const chatMessagesSelector = selector({
    key: 'chatMessagesSelector',
    get: async ({get}) => {
        const activeChatId = get(activeChatIdAtom);
        if (!activeChatId) {
            return undefined;
        }
        const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: activeChatId});
        if (error) {
            console.error('No chat messages to display:', error.message);
            return undefined;
        }
        console.log('Chat messages:', data);
        return data;
    },
    set: ({set}, newValue) => {
        if (!(newValue instanceof DefaultValue)) {
            console.log('Setting chat messages:', newValue);
            set(chatMessagesArrayAtom, newValue as ChatWithMessages | undefined);
        }
    }
});

*!/



function useStartNewChat() {
    const systemMessage = useRecoilValue(systemMessageAtom);
    const userMessage = useRecoilValue(userTextInputAtom);
    const activeUser = useRecoilValue(activeUserAtom);
    const [tempMessageArray, setTempMessageArray] = useRecoilState(activeChatMessagesArrayAtom);
    const [chatSummaries, setChatSummaries] = useRecoilState(chatSummariesAtom);

    return useCallback(async () => {
        const newMessageArray = [
            { index: 0, role: 'system', text: systemMessage },
            { index: 1, role: 'user', text: userMessage }
        ];
        setTempMessageArray(newMessageArray);

        const { data, error } = await supabase.rpc('start_new_chat', {
            user_matrix_id: activeUser.matrixId,
            system_message: systemMessage,
            user_message: userMessage
        });

        if (error) {
            console.error('Error starting new chat:', error);
            throw error;
        } else {
            const newData = data[0]

            const newChatSummary = {
                chatId: newData.chatId,
                chatTitle: newData.chatTitle,
                createdAt: newData.createdAt,
                lastEdited: newData.lastEdited,
                matrixId: newData.matrixId,
                metadata: newData.metadata,
            };
            setChatSummaries([...chatSummaries, newChatSummary]);
            return newData;
        }
    }, [systemMessage, userMessage, activeUser, setTempMessageArray, chatSummaries, setChatSummaries]);
}
*/
