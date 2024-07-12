'use client';

import { useEffect, ReactNode } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { activeChatIdAtom, chatMessagesAtomFamily, chatSummariesAtom, isNewChatAtom } from '@/state/aiAtoms/aiChatAtoms';
import { fetchChatMessages } from '@/utils/supabase/chatDb';
import { validate as uuidValidate } from 'uuid';

interface AutoFetchProps {
    children: ReactNode;
}

const AutoFetch: React.FC<AutoFetchProps> = ({ children }) => {
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const isNewChat = useRecoilValue(isNewChatAtom);
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesAtom);
    const [messages, setMessages] = useRecoilState(chatMessagesAtomFamily(activeChatId));

    useEffect(() => {
        switch (chatSummariesLoadable.state) {
            case 'loading':
                console.log('AutoFetch Loading chat summaries...');
                break;
            case 'hasError':
                console.error('AutoFetch Error fetching chat summaries:', chatSummariesLoadable.contents);
                break;
            case 'hasValue':
                break;
        }
    }, [chatSummariesLoadable.state, chatSummariesLoadable.contents]);

    useEffect(() => {
        async function fetchDatabaseMessages() {
            try {
                const fetchedMessages = await fetchChatMessages(activeChatId);
                if (fetchedMessages && fetchedMessages.length > 0) {
                    setMessages(fetchedMessages);
                }
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        }
        if (isNewChat !== false) return;
        if (activeChatId === 'matrix-ai' || !uuidValidate(activeChatId)) return;
        if (messages.length === 0) {
            console.log('DEBUG AutoFetch: Fetching messages for chatId:', activeChatId)
            console.log('DEBUG AutoFetch: isNewChat:', isNewChat)
            fetchDatabaseMessages();
        }
    }, [activeChatId, isNewChat, messages]);

    return <>{children}</>;
};

export default AutoFetch;
