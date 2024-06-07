'use client';
import React from 'react';
import { Container, Grid, Burger, Textarea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { GlobalChatProvider } from '@/context/AiContext/GlobalChatContext';
import { ChatProvider } from '@/context/AiContext/ChatContext';
import { UserProvider } from '@/context/AiContext/UserContext';
import { FormProvider } from '@/context/AiContext/FormContext';
import { RequestMetadataProvider } from '@/context/AiContext/RequestMetadataContext';
import { SettingsProvider } from '@/context/AiContext/SettingsContext';
import { HistoryProvider, HistoryContext } from '@/context/AiContext/HistoryContext';
import { AiResponseProvider } from '@/context/AiContext/AiResponseContext';
import { ResponseProvider } from '@/context/AiContext/ResponseContext';
import { LayoutProvider } from '@/context/LayoutContext';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
    const [opened, setOpened] = React.useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    return (
        <UserProvider>
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
        </UserProvider>
    );
};

export default ChatLayout;