import { activeChatIdAtom, isNewChatAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useChatSummaries from './useChatSummaries';
import useStartNewChat from './useStartNewChat';
import useChatMessages from './useChatMessages';
import useChangeActiveChat from './useChangeActiveChat';
import useSubmitMessage from './useSubmitMessage';
import useHandleUserSubmit from 'app/trials/core-chat-trial/hooks/old/useHandleUserSubmit';
import useCleanUpResponse from './useCleanUpResponse';


function useChatOrchestrator() {
    const chatSummaries = useChatSummaries();
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const isNewChat = useRecoilValue(isNewChatAtom);

    useEffect(() => {
        if (isNewChat) {
            useStartNewChat();
        } else if (activeChatId) {
            useChatMessages();
        }
    }, [activeChatId, isNewChat]);

    const handleSubmitMessage = (message) => {
        useHandleUserSubmit();
        useSubmitMessage(message);
        useCleanUpResponse();
    };

    const handleChangeChat = (newChatId) => {
        useChangeActiveChat(newChatId);
        // Additional clean up or preparations for the new chat
        useCleanUpResponse();
    };

    return {
        chatSummaries,
        handleSubmitMessage,
        handleChangeChat,
    };
}
