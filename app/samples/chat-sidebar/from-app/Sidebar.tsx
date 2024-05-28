// app/chat/sidebar/Sidebar.tsx
import React from 'react';
import { Stack, ScrollArea, Divider, Container } from '@mantine/core';
import ChatHistoryMenu from './ChatHistoryMenu';

const Sidebar: React.FC = () => {
    return (
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="flex-start"
            gap="xl"
            style={{ height: '100vh', position: 'relative' }}
        >
            <ScrollArea style={{ height: '100%' }}>
                <Container>
                    <ChatHistoryMenu placeholder="Input 1" />
                    <ChatHistoryMenu placeholder="Input 2" />
                    <ChatHistoryMenu placeholder="Input 3" />
                    <ChatHistoryMenu placeholder="Input 4" />
                    <ChatHistoryMenu placeholder="Input 5" />
                    <ChatHistoryMenu placeholder="Input 6" />
                    <ChatHistoryMenu placeholder="Input 7" />
                    <ChatHistoryMenu placeholder="Input 8" />
                    <ChatHistoryMenu placeholder="Input 9" />
                    <ChatHistoryMenu placeholder="Input 10" />
                </Container>
            </ScrollArea>
            <Divider orientation="vertical" style={{ height: '100%', position: 'absolute', right: -20 }} />
        </Stack>
    );
}

export default Sidebar;
