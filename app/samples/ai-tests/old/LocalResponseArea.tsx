'use client';
import { useChatMessages } from '@/hooks/ai/useChatMessages';
import React, { useRef } from 'react';
import { Box, Grid, Space, LoadingOverlay } from '@mantine/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import UserMessagePaper from '@/components/AiChat/Response/UserMessagePaper';
import AssistantMessage from '@/components/AiChat/Response/AssistantMessage';
import { activeChatIdAtom, isNewChatAtom } from '@/state/aiAtoms/aiChatAtoms';


export interface ResponseAreaProps {
    bottomPadding?: number;
    className?: string;
    chatId: string;
}

const LocalResponseArea: React.FC<ResponseAreaProps> = ({bottomPadding = 0, className, chatId}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const [isNewChat, setIsNewChat] = useRecoilState(isNewChatAtom);

    const {messages, loading, error} = useChatMessages(chatId);

    if (loading) {
        return <LoadingOverlay visible={true}/>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Box>
                <Box>
                    <Grid>
                        <Grid.Col span={0.5}></Grid.Col>
                        <Grid.Col span={11}>
                            <div>
                                <Space h={10}/>
                                <div>
                                    {messages && messages.map((entry, entryIndex) => (
                                        <div key={entryIndex}>
                                            {entry.role === 'assistant' && (
                                                <AssistantMessage text={entry.text}/>
                                            )}
                                            {entry.role === 'user' && (
                                                <UserMessagePaper text={entry.text}/>
                                            )}
                                            <Space h={10}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Grid.Col>
                        <Grid.Col span={0.5}></Grid.Col>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default LocalResponseArea;
