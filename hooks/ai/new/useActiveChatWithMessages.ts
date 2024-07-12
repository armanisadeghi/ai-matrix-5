// hooks/ai/useActiveChatWithMessages.ts
import { ChatDetailsType } from '@/types';
import { useRecoilValueLoadable } from 'recoil';
import { activeChatWithMessagesSelector } from '@/state/aiAtoms/aiChatAtoms';

interface UseActiveChatWithMessagesResult {
    chat: ChatDetailsType | null;
    isLoading: boolean;
    error: Error | null;
}

export function useActiveChatWithMessages(): UseActiveChatWithMessagesResult {
    const chatLoadable = useRecoilValueLoadable(activeChatWithMessagesSelector);

    switch (chatLoadable.state) {
        case 'hasValue':
            return {
                chat: chatLoadable.contents,
                isLoading: false,
                error: null,
            };
        case 'loading':
            return {
                chat: null,
                isLoading: true,
                error: null,
            };
        case 'hasError':
            return {
                chat: null,
                isLoading: false,
                error: chatLoadable.contents,
            };
    }
}
