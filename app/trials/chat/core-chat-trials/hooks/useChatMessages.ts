import { useEffect } from 'react';
import { useRecoilValueLoadable, useRecoilState, useRecoilValue } from 'recoil';
import { activeChatIdAtom, activeChatMessagesArrayAtom, chatMessagesSelector } from '@/state/aiAtoms/aiChatAtoms';
import { MessageType } from '@/types';

export const useChatMessages = () => {
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const chatMessagesLoadable = useRecoilValueLoadable(chatMessagesSelector);
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);

    useEffect(() => {
        if (!activeChatId) {
            console.log('No active chat ID, returning early');
            return;
        }

        if (chatMessagesLoadable.state === 'hasValue') {
            const messages = chatMessagesLoadable.contents as MessageType[];
            console.log('Loaded chat messages:', messages);
            setActiveChatMessagesArray(messages);
        } else if (chatMessagesLoadable.state === 'loading') {
            console.log('Loading chat messages...');


        } else if (chatMessagesLoadable.state === 'hasError') {
            console.error('Error loading chat messages:', chatMessagesLoadable.contents);
        }
    }, [activeChatId, chatMessagesLoadable, setActiveChatMessagesArray]);

    return activeChatMessagesArray;
};

export default useChatMessages;
