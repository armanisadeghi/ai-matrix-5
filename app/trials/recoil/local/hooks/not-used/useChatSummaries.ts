/*
import { useSetActiveChat } from '@/app/trials/racoil/local/hooks43/useSetActiveChat';
import { chatSummariesAtom, chatSummariesSelector } from '@/state/aiAtoms/aiChatAtoms';
import React from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';

const useChatSummaries = () => {

    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesSelector);
    const [chatSummaries, setChatSummaries] = useRecoilState(chatSummariesAtom);

    React.useEffect(() => {
        if (chatSummariesLoadable.state === 'hasValue' && chatSummaries.length === 0) {
            setChatSummaries(chatSummariesLoadable.contents);
        }
    }, [chatSummariesLoadable.state, chatSummariesLoadable.contents, chatSummaries.length, setChatSummaries]);

    return {
        chatSummaries,
        isLoading: chatSummariesLoadable.state === 'loading',
        error: chatSummariesLoadable.state === 'hasError' ? chatSummariesLoadable.contents : null,
    };
};

export default useChatSummaries;
*/
