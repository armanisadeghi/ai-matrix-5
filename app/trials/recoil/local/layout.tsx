'use client'

import React, { ReactNode } from 'react';
import ChatCoreProvider from '@/app/trials/stream-encapsulated/components/ChatCoreComponent';
import { MainLayout } from '@/layout';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import ClientLayoutLogic from 'app/trials/recoil/local/ClientLayoutLogic';

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <UserProvider>
            <ClientLayoutLogic>
                <MainLayout>
                    <ChatCoreProvider>
                        {children}
                    </ChatCoreProvider>
                </MainLayout>
            </ClientLayoutLogic>
        </UserProvider>
    );
}

