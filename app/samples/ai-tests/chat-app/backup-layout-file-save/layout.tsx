/*
'use client'
import React, { useState, ReactNode } from 'react';
import { AppShell, ActionIcon } from '@mantine/core';
import { GoSidebarCollapse } from 'react-icons/go';
import { ChatProvider } from './AiContext/ChatContext';
import { UserProvider } from './AiContext/UserContext';
import { FormProvider } from './AiContext/FormContext';
import { GlobalChatProvider } from './AiContext/GlobalChatContext';
import { RequestMetadataProvider } from './AiContext/RequestMetadataContext';
import { SettingsProvider } from './AiContext/SettingsContext';
import { HistoryProvider } from './AiContext/HistoryContext';
import { AiResponseProvider } from './AiContext/AiResponseContext';
import { ResponseProvider } from './nice-working/response/ResponseContext'; // Duplicate to address later
import ChatPage from './chatpage';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [asideOpen, setAsideOpen] = useState(false);

    const toggleAside = () => {
        setAsideOpen(!asideOpen);
    };

    return (
        <UserProvider>
            <ChatProvider>
                <HistoryProvider>
                    <FormProvider>
                        <GlobalChatProvider>
                            <RequestMetadataProvider>
                                <SettingsProvider>
                                    <AiResponseProvider>
                                        <ResponseProvider>
                                            <AppShell>
                                                <AppShell.Aside p="md" hidden={!asideOpen}>
                                                    <ActionIcon
                                                        onClick={toggleAside}
                                                        size="xs"
                                                        variant="outline"
                                                        style={{ marginBottom: '1rem' }}
                                                    >
                                                        <GoSidebarCollapse />
                                                    </ActionIcon>
                                                </AppShell.Aside>
                                                <header>Chat App Layout (Layout)</header>
                                                <ChatPage />
                                                <main>{children}</main>
                                            </AppShell>
                                        </ResponseProvider>
                                    </AiResponseProvider>
                                </SettingsProvider>
                            </RequestMetadataProvider>
                        </GlobalChatProvider>
                    </FormProvider>
                </HistoryProvider>
            </ChatProvider>
        </UserProvider>
    );
};

export default Layout;
*/