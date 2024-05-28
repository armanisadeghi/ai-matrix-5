// app/sample/page.tsx
'use client';

import React from 'react';
import AmeChatHistoryEntry from '@/app/dashboard/intelligence/ai-chatbot/components/sidebar/AmeChatHistoryEntry';
import { AppShell, CloseButton, Space, Stack, Text } from '@mantine/core';

const ChatSidebarSample = () => {
    return (
        <AppShell.Aside p="xs">
            <Text size="xs" >Recent Chats</Text>
            <Space h={10} />
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="flex-start"
                gap="xs">
                <AmeChatHistoryEntry initialValue='sample item 1' />
                <AmeChatHistoryEntry initialValue='sample item 2' />
                <AmeChatHistoryEntry initialValue='sample item 3' />
                <AmeChatHistoryEntry initialValue='What is the capital of the United States?' />
            </Stack>
        </AppShell.Aside>
    );
};

export default ChatSidebarSample;
