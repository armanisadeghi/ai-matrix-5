// app/sample/page.tsx
'use client';

import React, { useState } from 'react';
import AmeChatHistoryEntry from './AmeChatHistoryEntry';
import { AppShell, Space, Stack, Text, ActionIcon } from '@mantine/core';
import { GoSidebarCollapse } from "react-icons/go";

const ChatSidebar = () => {
    const [opened, setOpened] = useState(true);

    return (
        <AppShell
            padding="md"
            asideOffsetBreakpoint="sm"
            breakpoints={{
                sm: 0,
                md: 600,
                lg: 900,
                xl: 1200,
            }}
            aside={{
                width: opened ? { base: 150, lg: 200 } : { base: 50 },
            }}
        >
            <AppShell.Aside p="xs" >
                <ActionIcon
                    onClick={() => setOpened(!opened)}
                    size="xs"
                    variant="outline"
                    style={{ marginBottom: '1rem' }}
                >
                    <GoSidebarCollapse />
                </ActionIcon>
                <Text size="xs">Recent Chats</Text>
                <Space h={10} />
                <Stack
                    h={300}
                    bg="var(--mantine-color-body)"
                    align="stretch"
                    justify="flex-start"
                    gap="xs"
                >
                    <AmeChatHistoryEntry initialValue="sample item 1" />
                    <AmeChatHistoryEntry initialValue="sample item 2" />
                    <AmeChatHistoryEntry initialValue="sample item 3" />
                    <AmeChatHistoryEntry initialValue="What is the capital of the United States?" />
                </Stack>
            </AppShell.Aside>
            <AppShell.Main>
                {/* Main content goes here */}
            </AppShell.Main>
        </AppShell>
    );
};

export default ChatSidebar;
