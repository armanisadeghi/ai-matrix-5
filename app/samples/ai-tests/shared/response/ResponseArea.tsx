// app/samples/ai-tests/shared/response/ResponseArea.tsx

import React, { useEffect, useRef } from 'react';
import { Box, Grid, Text } from '@mantine/core';
import { activeChatMessagesArrayAtom, } from "@/context/atoms/chatAtoms";
import { useRecoilValue } from "recoil";
import { LoadingOverlay, Space } from '@mantine/core';
import AssistantMessage from './AssistantMessage';
import { RoleType, MessageEntry } from '@/types/chat';
import UserNew from "@/app/samples/ai-tests/shared/response/UserNew";
import { GiArtificialHive } from "react-icons/gi";

interface ResponseAreaProps {
    bottomPadding: number;
}

const ResponseArea: React.FC<ResponseAreaProps> = ({bottomPadding}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const activeChatMessages = useRecoilValue(activeChatMessagesArrayAtom);

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
            observer.observe(scrollRef.current, {
                childList: true,
                subtree: true
            });

            return () => {
                observer.disconnect();
            };
        }
    }, []);

    if (!activeChatMessages) {
        return <LoadingOverlay visible/>;
    }

    return (

        <Box style={{
            flexGrow: 1,
            overflow: 'hidden',
            position: 'relative'
        }}>
            <Box ref={scrollRef} style={{
                position: 'absolute',
                top: 0,
                left: -120,
                right: -25,
                bottom: -200,
                overflow: 'scroll'
            }}>
                <Grid>
                    <Grid.Col span={0.5}></Grid.Col>
                    <Grid.Col span={11}>
                        <div style={{paddingBottom: bottomPadding}}>
                            <Space h={10}/>

                            <div>
                            {activeChatMessages.map((entry: MessageEntry, entryIndex: number) => (
                                    <div key={entryIndex}>
                                        {entry.role === RoleType.assistant ? (
                                            <AssistantMessage messageId={entryIndex.toString()}/>
                                        ) : (
                                            <UserNew messageId={entryIndex.toString()}/>
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
    );
};

export default ResponseArea;
