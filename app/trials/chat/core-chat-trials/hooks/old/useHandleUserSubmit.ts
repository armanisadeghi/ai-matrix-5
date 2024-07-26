/*
import { ActiveChatMessagesType } from '@/types';
import { addUserMessage } from '@/utils/supabase/chatDb';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from 'recoil';
import { activeChatIdAtom, activeChatMessagesArrayAtom, isNewChatAtom, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import useSubmitMessage from '@/app/trials/core-chat-trial/hooks/useSubmitMessage';


const useHandleUserSubmit = () => {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const [isNewChat, setIsNewChat] = useRecoilState(isNewChatAtom);
    const [activeChatMessages, setActiveChatMessages] = useRecoilState(activeChatMessagesArrayAtom);

    const submitMessage = useSubmitMessage();

    const handleUserSubmit = useCallback(() => {
        if (!userTextInput) return;

        if (isNewChat) {
            const newChatId = uuidv4();
            setActiveChatId(newChatId);

            const startingMessages = useRecoilState(chatStarter(userTextInput));
            console.log('Starting Messages:', startingMessages);
            setActiveChatMessages(startingMessages);
            console.log('Active Chat Messages:', activeChatMessages);


            submitMessage();

        } else {
            const createdAt = new Date().toISOString();
            const newMessageId = uuidv4();

            const userMessageEntry: ActiveChatMessagesType = {
                chatId: activeChatId,
                createdAt: createdAt,
                id: newMessageId,
                index: activeChatMessages.length,
                text: userTextInput,
                role: 'user'
            };
            const updatedMessages = [...activeChatMessages, userMessageEntry];

            setActiveChatMessages(updatedMessages);
            setUserTextInput('');

            submitMessage();  // For some reason, the  updated array isn't there when the submitMessage function is called

            addUserMessage(activeChatId, userTextInput);

        }
    }, [activeChatId, userTextInput, setActiveChatId, activeChatMessages, setActiveChatMessages, submitMessage]);

    return handleUserSubmit;
}

export default useHandleUserSubmit;
*/
