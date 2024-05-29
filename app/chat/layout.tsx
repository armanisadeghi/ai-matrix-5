// app/chat/layout.tsx

"use client";
import React, { ReactNode } from 'react';
import { MainLayout } from '@/layout';
import { ChatProvider } from '@/context/chatContext';
import { ResponseProvider } from './response/ResponseContext';

type Props = {
    children: ReactNode;
};

export default function ChatLayout({ children }: Props) {
    return (
        <MainLayout>
            <ChatProvider>
                <ResponseProvider>
                    {children}
                </ResponseProvider>
            </ChatProvider>
        </MainLayout>
    );
}
