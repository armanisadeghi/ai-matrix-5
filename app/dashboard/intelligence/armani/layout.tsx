'use client'
import React from 'react';
import { Container, Grid, Burger, AppShell } from '@mantine/core';
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
import Sidebar from "@/layout/Main/Sidebar/Sidebar";
import { useSidebar } from "@/context/SidebarContext";

const ChatLayout = ({children}: { children: React.ReactNode }) => {
    const [opened, setOpened] = React.useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');


    return (
        <UserProvider>
                <HistoryProvider>
                    {children}
                </HistoryProvider>
        </UserProvider>
    );
};

export default ChatLayout;
