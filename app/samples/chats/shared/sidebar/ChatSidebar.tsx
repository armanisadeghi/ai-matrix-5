import React from 'react';
import { ChatHistoryChat } from '@/types/chat';
import AmeChatHistoryEntry from '@/components/AiChat/Sidebar/AmeChatHistoryEntry';
import { Space, Stack, Text, Container, LoadingOverlay } from '@mantine/core';

interface ChatSidebarProps {
    chatHistory?: Record<string, ChatHistoryChat[]>,
    isLoading?: boolean,
    user_id?: string
}

const ChatSidebar: React.FC<ChatSidebarProps> = (
    {
        chatHistory = {},
        isLoading = false,
        user_id
    }) => {
    if (isLoading) {
        console.log('Loading overlay is visible');
        return (
            <div>
                Chat Sidebar is loading...
            </div>
        )
    }

    return (
        <>
            <Text size="xs">Recent Chats here</Text>
            <Space h={10}/>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="flex-start"
                gap="xs"
            >
                {Object.keys(chatHistory).map((chatId) => {
                    const chatEntries = chatHistory[chatId];

                    if (chatEntries && chatEntries.length > 0) {
                        const firstEntry = chatEntries[0];
                        const truncatedContent = firstEntry.content.length > 100
                            ? firstEntry.content.substring(0, 100) + '...'
                            : firstEntry.content;

                        return (
                            <AmeChatHistoryEntry
                                key={chatId}
                                keyProp={chatId}
                                initialValue={truncatedContent}
                            />
                        );
                    } else {
                        console.log('No chat history found for chat ID:', chatId);
                        return null;
                    }
                })}
            </Stack>
        </>
    );
};

export default ChatSidebar;
