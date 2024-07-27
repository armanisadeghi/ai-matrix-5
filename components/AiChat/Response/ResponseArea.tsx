'use client';

import { autoscrollStateAtom } from '@/state/layoutAtoms';
import React, { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { Box, Space } from '@mantine/core';
import useOpenAiStreamer from '@/hooks/ai/useOpenAiStreamer';
import { activeChatIdAtom, assistantTextStreamAtom, chatMessagesAtomFamily, hasSubmittedMessageAtom, streamStatusAtom } from '@/state/aiAtoms/aiChatAtoms';
import { updateLastAssistantText } from '@/utils/supabase/chatDb';
import AssistantMessage from './AssistantMessage';
import UserMessage from './UserMessagePaper';
import styles from '@/components/AiChat/Response/ResponseArea.module.css';


const MessageWrapper = React.memo(({entry}: { entry: { role: string; text: string } }) => (
    <>
        {entry.role === 'assistant' ? (
            <AssistantMessage text={entry.text}/>
        ) : entry.role === 'user' ? (
            <UserMessage text={entry.text}/>
        ) : null}
        <Space h={30}/>
    </>
));

MessageWrapper.displayName = 'MessageWrapper';

export interface ResponseAreaProps {
    bottomPadding?: number;
    className?: string;
    chatId?: string;
}

const ResponseArea: React.FC<ResponseAreaProps> = (
    {
        bottomPadding = 0,
        className = '',
        chatId,
    }) => {
    const router = useRouter();
    const [activeChatId] = useRecoilState(activeChatIdAtom);
    const messages = useRecoilValue(chatMessagesAtomFamily(activeChatId));
    const [streamStatus, setStreamStatus] = useRecoilState(streamStatusAtom);
    const [userHasSubmitted, setUserHasSubmitted] = useRecoilState(hasSubmittedMessageAtom);
    const assistantTextStream = useRecoilValue(assistantTextStreamAtom);
    const setAutoScroll = useSetRecoilState(autoscrollStateAtom);

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
    }, [streamStatus, activeChatId, messages, userHasSubmitted, setUserHasSubmitted, router, setStreamStatus]);

    useOpenAiStreamer({chatId: activeChatId});

    useEffect(() => {
        if (streamStatus === 'streaming') {
            setAutoScroll(true);
        }
    }, [streamStatus]);

    const memoizedMessages = useMemo(() =>
            messages.filter(entry => entry.role === 'assistant' || entry.role === 'user').map((entry, index) => (
                <MessageWrapper key={entry.id || index} entry={entry}/>
            )),
        [messages]
    );

    return (
        <Box className={`${styles.container} ${className}`}>
            <div>
                <div style={{paddingBottom: bottomPadding}}>
                    <div>
                        {memoizedMessages}
                        {assistantTextStream && (
                            <div>
                                <AssistantMessage key="stream" text={assistantTextStream} stream={true}/>
                                <Space h={30}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default ResponseArea;
