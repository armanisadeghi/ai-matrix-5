'use client';

import React, { useEffect } from 'react';
import { Container, Grid, ScrollArea, Space } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { GlobalChatProvider } from '@/context/AiContext/GlobalChatContext';
import { ChatProvider } from '@/context/AiContext/ChatContext';
import { UserProvider } from '@/context/AiContext/UserContext';
import { FormProvider } from '@/context/AiContext/FormContext';
import { RequestMetadataProvider } from '@/context/AiContext/RequestMetadataContext';
import { SettingsProvider } from '@/context/AiContext/SettingsContext';
import { HistoryProvider } from '@/context/AiContext/HistoryContext';
import { AiResponseProvider } from '@/context/AiContext/AiResponseContext';
import { ResponseProvider } from '@/context/AiContext/ResponseContext';
import { LayoutProvider } from '@/context/LayoutContext';
import { useRecoilValue } from 'recoil';
import { activeUserAtom } from '@/context/atoms/userAtoms';
import { useSidebar, SidebarProvider } from "@/context/SidebarContext";
import ChatSidebar from '@/app/samples/ChatComponents/ChatList';

const ChatLayout = ({children}: { children: React.ReactNode }) => {
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const activeUser = useRecoilValue(activeUserAtom);
    const {setSidebarContent} = useSidebar();

    useEffect(() => {
        if (activeUser) {
            setSidebarContent(<ChatSidebar user_id={activeUser.id}/>);
        }

        return () => {
            setSidebarContent(null); // Clean up
        };
    }, [activeUser, setSidebarContent]);

    return (
        <UserProvider>
            <LayoutProvider initialNavbarState="icons">
                <ChatProvider>
                    <FormProvider>
                        <GlobalChatProvider>
                            <RequestMetadataProvider>
                                <SettingsProvider>
                                    <AiResponseProvider>
                                        <ResponseProvider>
                                            <SidebarProvider initialAsideState="icons">
                                                <Container fluid h={1200} bg="var(--mantine-color-dark-7)">

                                                    <Grid grow style={{flex: 1}} columns={12} gutter={0}>
                                                        {!isSmallScreen && (
                                                            <>
                                                                <Grid.Col span={1} style={{
                                                                    flexGrow: 1,
                                                                    flexShrink: 1,
                                                                    flexBasis: '0%',
                                                                    padding: '0'
                                                                }}></Grid.Col>
                                                            </>
                                                        )}
                                                        <Grid.Col span={12} style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            height: '106vh',
                                                            maxWidth: '800px',
                                                            padding: '0',
                                                            margin: '0 auto'
                                                        }}>
                                                            {children}

                                                        </Grid.Col>
                                                        {!isSmallScreen && (
                                                            <Grid.Col span={1} style={{
                                                                flexGrow: 1,
                                                                flexShrink: 1,
                                                                flexBasis: '0%',
                                                                padding: '0'
                                                            }}></Grid.Col>
                                                        )}
                                                    </Grid>

                                                </Container>
                                            </SidebarProvider>
                                        </ResponseProvider>
                                    </AiResponseProvider>
                                </SettingsProvider>
                            </RequestMetadataProvider>
                        </GlobalChatProvider>
                    </FormProvider>
                </ChatProvider>
            </LayoutProvider>
        </UserProvider>
    );
};

export default ChatLayout;
