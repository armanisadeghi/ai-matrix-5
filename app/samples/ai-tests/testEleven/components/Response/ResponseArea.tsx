import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Space, LoadingOverlay } from '@mantine/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import AssistantMessage from './AssistantMessage';
import UserMessage from "./UserMessagePaper";
import { activeChatMessagesArrayAtom, assistantTextStreamAtom } from "@/state/aiAtoms/chatAtoms";
import { MessageEntry } from '@/types/chat';
import styles from "./chat.module.css";


const ResponseArea: React.FC = ({  }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeChatMessages, setActiveChatMessages] = useRecoilState(activeChatMessagesArrayAtom);
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [bottomPadding, setBottomPadding] = useState(0);

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
        <Box style={{ flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
            <Box ref={scrollRef} >
                <Grid>
                    <Grid.Col span={0.5}></Grid.Col>
                    <Grid.Col span={11}>
                        <div style={{paddingBottom: bottomPadding}}>
                            <Space h={10}/>
                            <div>
                                {activeChatMessages.map((entry: MessageEntry, entryIndex: number) => {
                                    return (
                                        <div key={entryIndex}>
                                            {entry.role === 'assistant' ? (
                                                <AssistantMessage text={entry.text}/>
                                            ) : (
                                                <UserMessage text={entry.text}/>
                                            )}
                                            <Space h={10}/>
                                        </div>
                                    );
                                })}
                                    <div>
                                        <AssistantMessage text={assistantTextStream}/>
                                        <Space h={10}/>
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
