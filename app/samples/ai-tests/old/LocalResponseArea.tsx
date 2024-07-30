"use client";

import UserMessagePaper from "@/components/AiChat/Response/UserMessagePaper";
import { useChatMessages } from "@/hooks/ai/useChatMessages";
import { activeChatIdAtom, isNewChatAtom } from "@/state/aiAtoms/aiChatAtoms";
import { Box, Grid, LoadingOverlay, Space } from "@mantine/core";
import React, { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import AssistantMessage from "../response/AssistantMessage";

export interface ResponseAreaProps {
    bottomPadding?: number;
    className?: string;
    chatId: string;
}

const LocalResponseArea: React.FC<ResponseAreaProps> = ({ bottomPadding = 0, className, chatId }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const [isNewChat, setIsNewChat] = useRecoilState(isNewChatAtom);

    const { messages, loading, error } = useChatMessages(chatId);

    if (loading) {
        return <LoadingOverlay visible={true} />;
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
                                <Space h={10} />
                                <div>
                                    {messages &&
                                        messages.map((entry, entryIndex) => (
                                            <div key={entryIndex}>
                                                {entry.role === "assistant" && (
                                                    <AssistantMessage content={entry.text} />
                                                )}
                                                {entry.role === "user" && <UserMessagePaper text={entry.text} />}
                                                <Space h={10} />
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
