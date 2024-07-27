'use client';

import { useEffect } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { chatSummariesAtom } from '@/state/aiAtoms/aiChatAtoms';


const AutoFetchChats: React.FC = () => {
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesAtom);

    useEffect(() => {
        switch (chatSummariesLoadable.state) {
            case 'loading':
                console.log('AutoFetchChats Loading chat summaries...');
                break;
            case 'hasError':
                console.error('AutoFetchChats Error fetching chat summaries:', chatSummariesLoadable.contents);
                break;
            case 'hasValue':
                console.log('AutoFetchChats Chat summaries loaded. Count:', chatSummariesLoadable.contents.length);
                break;
        }
    }, [chatSummariesLoadable.state, chatSummariesLoadable.contents]);

    return null;
};

export default AutoFetchChats;
