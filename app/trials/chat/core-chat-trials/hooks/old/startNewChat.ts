/*
import { chatSummariesAtom, activeChatMessagesArrayAtom, systemMessageAtom, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useCallback } from 'react';
import { activeUserAtom } from '@/state/userAtoms';
import supabase from '@/utils/supabase/client';
import { useRecoilState, useRecoilValue } from 'recoil';

export function useStartNewChat() {
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

        // Make the API call to get the streaming response.
        // -----> API Call Here <-----

        // Update the database with the new chat.
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

export default useStartNewChat;
*/
