//import { PrimaryLayout } from '@/layout';
import { MainLayout } from '@/layout';
import React, { ReactNode } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import ClientLayoutLogic from './ClientLayoutLogic';

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <UserProvider>
            <ClientLayoutLogic>
                <MainLayout>
                    {children}
                </MainLayout>
            </ClientLayoutLogic>
        </UserProvider>
    );
}
