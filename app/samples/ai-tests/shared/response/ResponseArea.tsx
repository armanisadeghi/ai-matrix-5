import React, { useEffect, useRef } from 'react';
import { Box, Grid } from '@mantine/core';
import HistoryEntries from "@/app/samples/ai-tests/shared/response/HistoryEntries";
import AssistantMessage from "@/app/samples/ai-tests/chat-app/components/response/AssistantMessage";
import { activeChatIdAtom, activeChatMessagesArrayAtom,} from "@/context/atoms/chatAtoms";
import { useRecoilState, useRecoilValue } from "recoil";

interface ResponseAreaProps {
    bottomPadding: number;
}

const ResponseArea: React.FC<ResponseAreaProps> = ({ bottomPadding }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const currentChatId = useRecoilValue(activeChatIdAtom);
    const [messages, setMessages] = useRecoilState(activeChatMessagesArrayAtom);

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

    return (
        <Box style={{ flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
            <Box ref={scrollRef} style={{ position: 'absolute', top: 0, left: -120, right: -25, bottom: -20, overflow: 'scroll' }}>
                <Grid>
                    <Grid.Col span={0.5}></Grid.Col>
                    <Grid.Col span={11}>
                        <div style={{ paddingBottom: bottomPadding }}>
                            <AssistantMessage content="Ask me anything!" />
                            <HistoryEntries chatId={currentChatId} />
                        </div>
                    </Grid.Col>
                    <Grid.Col span={0.5}></Grid.Col>
                </Grid>
            </Box>
        </Box>
    );
};

export default ResponseArea;
