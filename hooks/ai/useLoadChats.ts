// hooks/ai/useLoadChats.ts

import { chatSummariesAtom } from '@/state/aiAtoms/aiChatAtoms';
import { ChatType } from '@/types';
import { useRecoilValueLoadable } from 'recoil';

export function useLoadChats() {
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesAtom);

    let chatSummaries: ChatType[] = [];
    let loading = false;
    let error: Error | null = null;

    switch (chatSummariesLoadable.state) {
        case 'hasValue':
            chatSummaries = chatSummariesLoadable.contents;
            break;
        case 'loading':
            loading = true;
            break;
        case 'hasError':
            error = chatSummariesLoadable.contents;
            break;
    }

    return { chatSummaries, loading, error };
}
