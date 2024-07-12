import { activeChatIdAtom, messagesFamily } from '@/state/aiAtoms/aiChatAtoms';
import { MessageType } from '@/types';
import { useRecoilCallback, useRecoilValue } from 'recoil';

export const useMessageActions = () => {
    const activeChatId = useRecoilValue(activeChatIdAtom);

    const extractLastMessageAddReturnOne = useRecoilCallback(({set}) => (newMessages: MessageType[]): MessageType | undefined => {
        if (newMessages.length === 0) return undefined;
        const lastMessage = newMessages[newMessages.length - 1];
        set(messagesFamily(activeChatId), (currentMessages) => [...currentMessages, lastMessage]);
        return lastMessage;
    });

    const addOneMessageReturnAll = useRecoilCallback(({set}) => (newMessage: MessageType): MessageType[] => {
        let updatedMessages: MessageType[] = [];
        set(messagesFamily(activeChatId), (currentMessages) => {
            updatedMessages = [...currentMessages, newMessage];
            return updatedMessages;
        });
        return updatedMessages;
    });

    const replaceMessages = useRecoilCallback(({set}) => (newMessages: MessageType[]) => {
        set(messagesFamily(activeChatId), newMessages);
    });

    return {
        extractLastMessageAddReturnOne,
        addOneMessageReturnAll,
        replaceMessages
    };
};
