import { activeChatIdAtom, chatMessagesAtomFamily } from '@/state/aiAtoms/aiChatAtoms';
import { MessageType } from '@/types';
import { useRecoilCallback, useRecoilValue } from 'recoil';

export const useChatMessagesManager = () => {
    const activeChatId = useRecoilValue(activeChatIdAtom);

    const checkActiveChatId = (chatId: string) => {
        if (chatId !== activeChatId) {
            throw new Error(`Chat ID ${chatId} does not match the active chat ID ${activeChatId}.`);
        }
    };

    const addOneMessage = useRecoilCallback(
        ({ set }) =>
            (chatId: string, message: MessageType) => {
                checkActiveChatId(chatId);
                set(chatMessagesAtomFamily(chatId), (prevMessages) => [...prevMessages, message]);
            },
        [activeChatId]
    );

    const addMultipleMessages = useRecoilCallback(
        ({ set }) =>
            (chatId: string, messages: MessageType[]) => {
                checkActiveChatId(chatId);
                set(chatMessagesAtomFamily(chatId), (prevMessages) => [...prevMessages, ...messages]);
            },
        [activeChatId]
    );

    const replaceAllMessages = useRecoilCallback(
        ({ set }) =>
            (chatId: string, messages: MessageType[]) => {
                checkActiveChatId(chatId);
                set(chatMessagesAtomFamily(chatId), messages);
            },
        [activeChatId]
    );

    return {
        addOneMessage,
        addMultipleMessages,
        replaceAllMessages,
    };
};
