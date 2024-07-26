import React, { useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Text, Space, ScrollArea } from '@mantine/core';
import AssistantMessage from '@/components/AiChat/Response/AssistantMessage';
import UserMessagePaper from '@/components/AiChat/Response/UserMessagePaper';
import { chatWithMessagesSelector } from '@/state/aiAtoms/aiChatAtoms';

interface ChatModalDisplayProps {
    chatId: string;
}

const ChatModalDisplay: React.FC<ChatModalDisplayProps> = ({ chatId }) => {
    const chatWithMessages = useRecoilValue(chatWithMessagesSelector(chatId));
    const chatTitle = chatWithMessages?.chatTitle;
    const messages = chatWithMessages?.messages;

    const viewport = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (viewport.current) {
            viewport.current.scrollTo({ top: viewport.current.scrollHeight });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Box>
            <Text
                size="xl"
                fw={900}
                variant="gradient"
                gradient={{ from: 'cyan', to: 'lime', deg: 340 }}
                ta="center"
                mb={20}
            >
                {chatTitle ?? 'Chat Peak'}
            </Text>
            <ScrollArea h="60vh" scrollbarSize={4} viewportRef={viewport} type="always">
                <Box pr={10}>
                    {messages?.length === 0 && <Text>No messages found.</Text>}
                    {messages?.map((entry, entryIndex) => (
                        <Box key={entryIndex} mb={10}>
                            {entry.role === 'assistant' ? (
                                <AssistantMessage text={entry.text} />
                            ) : entry.role === 'user' ? (
                                <UserMessagePaper text={entry.text} />
                            ) : null}
                        </Box>
                    ))}
                </Box>
            </ScrollArea>
        </Box>
    );
};

export default React.memo(ChatModalDisplay);
