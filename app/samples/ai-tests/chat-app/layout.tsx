'use client'
import React, { useState, ReactNode } from 'react';
import { AppShell, ActionIcon } from '@mantine/core';
import { GoSidebarCollapse } from 'react-icons/go';
import { ChatProvider } from '@/context/AiContext/ChatContext';
import { UserProvider } from '@/context/AiContext/UserContext';
import { FormProvider } from '@/context/AiContext/FormContext';
import { GlobalChatProvider } from '@/context/AiContext/GlobalChatContext';
import { RequestMetadataProvider } from '@/context/AiContext/RequestMetadataContext';
import { SettingsProvider } from '@/context/AiContext/SettingsContext';
import { AiResponseProvider } from '@/context/AiContext/AiResponseContext';
import { ResponseProvider } from '../../../../context/AiContext/ResponseContext'; // Duplicate to address later
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
            </ChatProvider>
        </UserProvider>
    );
};

export default Layout;
