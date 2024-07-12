/*
import { ChatType, StartNewChatResponse } from '@/types';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import supabase from '@/utils/supabase/client';
import { activeUserAtom } from '@/state/userAtoms';
import { systemMessageAtom, userTextInputAtom, chatMessagesSelector, chatSummariesAtom, activeChatMessagesArrayAtom, activeChatIdAtom } from '@/state/aiAtoms/aiChatAtoms';



function useStartNewChat() {
    const systemMessage = useRecoilValue(systemMessageAtom);
    const userMessage = useRecoilValue(userTextInputAtom);
    const activeUser = useRecoilValue(activeUserAtom);
    const [tempMessageArray, setTempMessageArray] = useRecoilState(activeChatMessagesArrayAtom);
    const [chatSummaries, setChatSummaries] = useRecoilState(chatSummariesAtom);
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);

    console.log('This is DEACTIVATED useStartNewChat')
    console.log('User message:', userMessage)
    console.log('System message:', systemMessage)

    return useCallback(async () => {
        const newMessageArray = [
            { index: 0, role: 'system', text: systemMessage },
            { index: 1, role: 'user', text: userMessage }
        ];
        console.log('userStartNewChat just set new message array atom', newMessageArray)
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
            const newData = data[0] as StartNewChatResponse
            setActiveChatId(newData.chatId);
            const newChat: ChatType = {
                chatId: newData.chatId,
                chatTitle: newData.chatTitle,
                createdAt: newData.createdAt,
                lastEdited: newData.lastEdited,
                matrixId: newData.matrixId,
                metadata: newData.metadata,
                messages: newData.messages
            };
            setChatSummaries([...chatSummaries, newChat]);
            return newData;
        }
    }, [systemMessage, userMessage, activeUser, setTempMessageArray, chatSummaries, setChatSummaries]);
}

const useChatMessages = () => {
    const chatMessagesLoadable = useRecoilValueLoadable(chatMessagesSelector);

    switch (chatMessagesLoadable.state) {
        case 'hasValue':
            return chatMessagesLoadable.contents;
        case 'loading':
            return 'loading';
        case 'hasError':
            throw chatMessagesLoadable.contents;
        default:
            return null;
    }
};

export { useChatMessages };
*/
