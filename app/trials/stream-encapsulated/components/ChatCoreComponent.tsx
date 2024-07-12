'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hookIdAtom, hookIndexAtom, streamTriggerAtomFamily } from '@/state/aiAtoms/aiChatAtoms';
import { activeChatMessagesArrayAtom } from '@/state/aiAtoms/aiChatAtoms';
import useMatrixStream from '@/app/trials/stream-encapsulated/hooks/useMatrixStream';
import useActiveMessages from '@/hooks/ai/old/useActiveMessages';
import { useActiveChat } from '@/hooks/ai/old/useActiveChat';


interface ChatCoreProviderProps {
    children: ReactNode;
}

const ChatCoreProvider: React.FC<ChatCoreProviderProps> = ({children}) => {
    const [activeMessages, setActiveMessages] = useRecoilState(activeChatMessagesArrayAtom);
    const {activeChatId, isNewChat, setActiveChat, activeChat, chatSummaries} = useActiveChat();
    const {messages, loading, error} = useActiveMessages();
    const messageArray = useMatrixStream();
    const hookId = useRecoilValue(hookIdAtom);
    const hookIndex = useRecoilValue(hookIndexAtom)
    const [streamTrigger, setStreamTrigger] = useRecoilState(streamTriggerAtomFamily({hookId: hookId, index: hookIndex}));

    useEffect(() => {
        setActiveChat('new--------------------------------------------------------chat');

    }, []);

    return <>{children}</>;
};

export default ChatCoreProvider;
