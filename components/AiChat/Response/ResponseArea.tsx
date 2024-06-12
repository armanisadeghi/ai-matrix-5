import React, { useEffect, useRef } from 'react';
import { Box, Grid, Space, LoadingOverlay } from '@mantine/core';
import { useRecoilState } from 'recoil';
import AssistantMessage from './AssistantMessage';
import UserMessage from "./UserMessagePaper";
import { activeChatMessagesArrayAtom, assistantTextStreamAtom } from "@/state/aiAtoms/chatAtoms";
import { MessageEntry } from '@/types/chat';
import styles from './ResponseArea.module.css';

interface ResponseAreaProps {
    bottomPadding: number;
    className?: string;
}

const ResponseArea: React.FC<ResponseAreaProps> = ({ bottomPadding, className }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeChatMessages] = useRecoilState(activeChatMessagesArrayAtom);
    const [assistantTextStream] = useRecoilState(assistantTextStreamAtom);

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

    if (!activeChatMessages) {
        return <LoadingOverlay visible />;
    }

    return (
        <Box className={`${styles.container} ${className}`}>
            <Box ref={scrollRef} className={styles.scrollable}>
                <Grid>
                    <Grid.Col span={0.5}></Grid.Col>
                    <Grid.Col span={11}>
                        <div style={{ paddingBottom: bottomPadding }}>
                            <Space h={10} />
                            <div>
                                {activeChatMessages.map((entry: MessageEntry, entryIndex: number) => (
                                    <div key={entryIndex}>
                                        {entry.role === 'assistant' ? (
                                            <AssistantMessage text={entry.text} />
                                        ) : (
                                            <UserMessage text={entry.text} />
                                        )}
                                        <Space h={10} />
                                    </div>
                                ))}
                                <div>
                                    <AssistantMessage text={assistantTextStream} />
                                    <Space h={10} />
                                </div>
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
