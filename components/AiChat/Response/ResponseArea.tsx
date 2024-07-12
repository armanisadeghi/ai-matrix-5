'use client';

import { useRecoilState, useRecoilValue } from 'recoil';
import useOpenAiStreamer from '@/hooks/ai/useOpenAiStreamer';
import { activeChatIdAtom, assistantTextStreamAtom, chatMessagesAtomFamily, hasSubmittedMessageAtom, streamStatusAtom } from '@/state/aiAtoms/aiChatAtoms';
import { updateLastAssistantText } from '@/utils/supabase/chatDb';
import React, { useEffect } from 'react';
import { Box, Grid, Space } from '@mantine/core';
import AssistantMessage from './AssistantMessage';
import UserMessage from './UserMessagePaper';
import styles from '@/components/AiChat/Response/ResponseArea.module.css';
import { useRouter } from 'next/navigation';


export interface ResponseAreaProps {
    bottomPadding?: number;
    className?: string;
    chatId?: string;
}

const ResponseArea: React.FC<ResponseAreaProps> = ({bottomPadding = 200, className = '', chatId}) => {
    const router = useRouter();
    const [activeChatId,] = useRecoilState(activeChatIdAtom);
    const messages = useRecoilValue(chatMessagesAtomFamily(activeChatId));
    const [streamStatus, setStreamStatus] = useRecoilState(streamStatusAtom);
    const [userHasSubmitted, setUserHasSubmitted] = useRecoilState(hasSubmittedMessageAtom);
    const assistantTextStream = useRecoilValue(assistantTextStreamAtom);

    useEffect(() => {
        if (streamStatus === 'success' && userHasSubmitted && messages && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.role === 'assistant' && lastMessage.id && lastMessage.text.length > 0) {

                updateLastAssistantText(messages);
                setUserHasSubmitted(false);
                setStreamStatus('idle');

                if (lastMessage.index < 3) {
                    router.push(`/dashboard/intelligence/ai-chat/${encodeURIComponent(activeChatId)}`);
                }
            }
        }
    }, [streamStatus, activeChatId, messages, userHasSubmitted, setUserHasSubmitted, router]);

    useOpenAiStreamer({chatId: activeChatId});

    useEffect(() => {
    }, [messages, activeChatId]);

    return (
        <Box className={`${styles.container} ${className}`}>
            <div>
                <div style={{paddingBottom: bottomPadding}}>
                    <Space h={10}/>
                    <div>
                        {messages.filter(entry => entry.role === 'assistant' || entry.role === 'user').map((entry, entryIndex) => (
                            <div key={entryIndex}>
                                {entry.role === 'assistant' ? (
                                    <AssistantMessage text={entry.text}/>
                                ) : entry.role === 'user' ? (
                                    <UserMessage text={entry.text}/>
                                ) : null}
                                <Space h={10}/>
                            </div>
                        ))}
                        {<div>
                            <AssistantMessage key={999} text={assistantTextStream}/>
                            <Space h={10}/>
                        </div>}
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default ResponseArea;
