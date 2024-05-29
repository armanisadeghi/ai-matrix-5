// ai-chatbot/layout.tsx
'use client'
import React, { useEffect } from 'react';
import { Container, Grid, Burger } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import ChatSidebar from './components/sidebar/ChatSidebar';
import { useSidebar } from '@/context/SidebarContext';
import { LayoutProvider } from '@/context/LayoutContext';
import { SidebarProvider } from '@/context/SidebarContext';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
    const { setSidebarContent } = useSidebar();
    const [opened, setOpened] = React.useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    useEffect(() => {
        setSidebarContent(<ChatSidebar />);
        return () => {
            setSidebarContent(null); // Cleanup on unmount
        };
    }, [setSidebarContent]);

    return (
        <SidebarProvider>
            <LayoutProvider initialNavbarState="icons">

            <Container fluid style={{ height: '100vh', display: 'flex', padding: '0' }}>
            <Grid grow style={{ flex: 1 }} columns={12} gutter={0}>
                {!isSmallScreen && (
                    <>
                        <Grid.Col span={1} style={{ flexGrow: 1, flexShrink: 1, flexBasis: '0%', padding: '0' }}></Grid.Col>
                    </>
                )}
                <Grid.Col span={8} style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '800px', padding: '0', margin: '0 auto' }}>

                    {children}

                </Grid.Col>
                {!isSmallScreen && (
                    <Grid.Col span={1} style={{ flexGrow: 1, flexShrink: 1, flexBasis: '0%', padding: '0' }}></Grid.Col>
                )}
                {isSmallScreen && (
                    <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000 }}>
                        <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
                    </div>
                )}
            </Grid>
        </Container>
            </LayoutProvider>
        </SidebarProvider>

    );
};

export default ChatLayout;
