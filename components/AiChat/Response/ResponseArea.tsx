import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Space, LoadingOverlay } from '@mantine/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import AssistantMessage from './AssistantMessage';
import UserMessage from "./UserMessagePaper";
import { activeChatMessagesArrayAtom } from "@/app/samples/ai-tests/shared/atoms/chatAtoms";
import { MessageEntry } from '@/types/chat';
import styles from "./chat.module.css";

// Memoize UserMessage and AssistantMessage components
const MemoizedUserMessage = React.memo(UserMessage);
const MemoizedAssistantMessage = React.memo(AssistantMessage);

interface ResponseAreaProps {
    bottomPadding: number;
}

const ResponseArea: React.FC<ResponseAreaProps> = ({ bottomPadding }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeChatMessages, setActiveChatMessages] = useRecoilState(activeChatMessagesArrayAtom);
    const [streamingMessage, setStreamingMessage] = useState<string>('');

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            const observer = new MutationObserver(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            });
            observer.observe(scrollRef.current, { childList: true, subtree: true });

            return () => {
                observer.disconnect();
            };
        }
    }, []);

    const clearMessages = () => {
        setActiveChatMessages([]);
    };

    // Function to handle new chunks
    const handleNewChunk = (chunk: string) => {
        setStreamingMessage((prev) => prev + chunk);
    };

    // Function to handle completion of the message
    const handleMessageComplete = () => {
        const newMessage = {
            index: activeChatMessages.length,
            role: 'assistant',
            text: streamingMessage,
        };
        setActiveChatMessages([...activeChatMessages, newMessage]);
        setStreamingMessage('');
    };

    if (!activeChatMessages) {
        return <LoadingOverlay visible />;
    }

    return (
        <Box style={{ flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
            <Box ref={scrollRef} style={{ position: 'absolute', top: 0, left: -120, right: -25, bottom: -200, overflow: 'scroll' }}>
                <Grid>
                    <Grid.Col span={0.5}></Grid.Col>
                    <Grid.Col span={11}>
                        <div style={{ paddingBottom: bottomPadding }}>
                            <Space h={10} />
                            <div>
                                {activeChatMessages.map((entry: MessageEntry, entryIndex: number) => (
                                    <div key={entryIndex}>
                                        {entry.role === 'assistant' ? (
                                            <MemoizedAssistantMessage text={entry.text}/>
                                        ) : (
                                            <MemoizedUserMessage text={entry.text}/>
                                        )}
                                        <Space h={10}/>
                                    </div>
                                ))}
                                {streamingMessage && (
                                    <div>
                                        <MemoizedAssistantMessage text={streamingMessage} />
                                        <Space h={10} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Grid.Col>
                    <Grid.Col span={0.5}></Grid.Col>
                </Grid>
            </Box>
        </Box>
    );
};

export default ResponseArea;
