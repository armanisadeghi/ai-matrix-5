// app/sample/layout.tsx
'use client';

import React, { useEffect } from 'react';
import { SidebarProvider, useSidebar } from '@/context/SidebarContext';
import { Text, Space, Stack } from '@mantine/core';
import AmeChatHistoryEntry from '@/components/AiChat/AmeChatHistoryEntry';

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutContent = () => {
    const { setSidebarContent } = useSidebar();

    useEffect(() => {
        const chatSidebarContent = (
            <div>
                <Text size="xs">Recent Chats</Text>
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
            </div>
        );

        setSidebarContent(chatSidebarContent);
        return () => {
            setSidebarContent(null); // Cleanup on unmount
        };
    }, [setSidebarContent]);

    return null;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <SidebarProvider>
        <LayoutContent />
        <div>
            {children}
        </div>
    </SidebarProvider>
);

export default Layout;
