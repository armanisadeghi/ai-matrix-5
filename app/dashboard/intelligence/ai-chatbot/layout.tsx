// ai-chatbot/layout.tsx
'use client'
import React, { useEffect } from 'react';
import { Container, Grid, Burger } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { GlobalChatProvider } from '@/context/AiContext/GlobalChatContext';
import { ChatProvider } from '@/context/AiContext/ChatContext';
import { UserProvider } from '@/context/AiContext/UserContext';
import { FormProvider } from '@/context/AiContext/FormContext';
import { RequestMetadataProvider } from '@/context/AiContext/RequestMetadataContext';
import { SettingsProvider } from '@/context/AiContext/SettingsContext';
import { HistoryProvider } from '@/context/AiContext/HistoryContext';
import { AiResponseProvider } from '@/context/AiContext/AiResponseContext';  // Need to eliminate one
import { ResponseProvider } from '@/context/AiContext/ResponseContext';  // Need to eliminate one
import ChatSidebar from './components/sidebar/ChatSidebar';
import { useSidebar } from '@/context/SidebarContext';
import { LayoutProvider } from '@/context/LayoutContext';
import { SidebarProvider } from '@/context/SidebarContext';



const ChatLayout = ({children}: { children: React.ReactNode }) => {
    const {setSidebarContent} = useSidebar();
    const [opened, setOpened] = React.useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    useEffect(() => {
        setSidebarContent(<ChatSidebar/>);
        return () => {
            setSidebarContent(null);
        };
    }, [setSidebarContent]);

    return (
        <UserProvider>
            <SidebarProvider>
                <LayoutProvider initialNavbarState="icons">
                    <ChatProvider>
                        <HistoryProvider>
                            <FormProvider>
                                <GlobalChatProvider>
                                    <RequestMetadataProvider>
                                        <SettingsProvider>
                                            <AiResponseProvider>
                                                <ResponseProvider>
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
                                                </ResponseProvider>
                                            </AiResponseProvider>
                                        </SettingsProvider>
                                    </RequestMetadataProvider>
                                </GlobalChatProvider>
                            </FormProvider>
                        </HistoryProvider>
                    </ChatProvider>
                </LayoutProvider>
            </SidebarProvider>
        </UserProvider>
    );
};

export default ChatLayout;
