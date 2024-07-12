import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { activeChatIdAtom, chatStartSelector, chatSummariesAtom, messagesFamily, streamTriggerAtomFamily } from '@/state/aiAtoms/aiChatAtoms';
import useStreamChat from '@/app/trials/recoil/local/hooks/useSteamChat';

export const useHandleNewChat = () => {
    const startChatObject = useRecoilValue(chatStartSelector);
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const [streamTrigger, setStreamTrigger] = useRecoilState(streamTriggerAtomFamily({ hookId: 'OpenAiStream', index: 0 }));
    const setChatSummaries = useSetRecoilState(chatSummariesAtom);
    const setMessages = useSetRecoilState(messagesFamily(activeChatId));

    return useCallback(() => {
        if (!startChatObject) return;

        const { messages, ...chatSummary } = startChatObject;

        setChatSummaries((prevSummaries) => [...prevSummaries, chatSummary]);

        // setMessages(startChatObject.chatId)(messages);

        setStreamTrigger(true);

        useStreamChat({
            trigger: true,
            onComplete: () => {
                // Handle onComplete actions here if any
                console.log('Chat streaming completed');
            },
        });
    }, [startChatObject, setChatSummaries, setMessages]);
};

export default useHandleNewChat;

