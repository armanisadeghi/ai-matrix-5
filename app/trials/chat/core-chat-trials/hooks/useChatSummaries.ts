import { chatSummariesAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useEffect } from 'react';
import { useRecoilValueLoadable, useRecoilState } from 'recoil';

const useChatSummaries = () => {
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesAtom);
    const [chatSummaries, setChatSummaries] = useRecoilState(chatSummariesAtom);

    useEffect(() => {
        if (chatSummariesLoadable.state === 'hasValue' && chatSummaries.length === 0) {
            setChatSummaries(chatSummariesLoadable.contents);
        }
    }, [chatSummariesLoadable.contents, chatSummariesLoadable.state, chatSummaries.length, setChatSummaries]);

    if (chatSummariesLoadable.state === 'loading') {
        return { loading: true };
    } else if (chatSummariesLoadable.state === 'hasError') {
        throw chatSummariesLoadable.contents;
    }

    return chatSummaries;
};

export default useChatSummaries;
