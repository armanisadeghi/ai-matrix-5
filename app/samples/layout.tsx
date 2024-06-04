// app/samples/layout.tsx
'use client'

import React, { useEffect } from 'react';
import { LayoutProvider } from '@/context/LayoutContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { MainLayout } from '@/layout';
import { ReactNode } from 'react';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { UserManager } from '@/services/Users';
import { activeUserAtom } from "@/context/atoms/userAtoms";

type Props = {
    children: ReactNode;
};

const LayoutContent: React.FC = () => {
    const [activeUser, setActiveUser] = useRecoilState(UserManager.ActiveUser);
    const setActiveUserAtom = useSetRecoilState(activeUserAtom);

    useEffect(() => {
        const fetchActiveUser = async () => {
            const userManager = UserManager.getInstance();
            const user = await userManager.getActiveUser();
            if (user) {
                setActiveUser(user);
                setActiveUserAtom(user);
            }
        };

        fetchActiveUser();
    }, [setActiveUser, setActiveUserAtom]);

    if (!activeUser) {
        return <div>Loading...</div>;
    }

    return (
        <>
        </>
    );
};

function Layout({children}: Props) {
    return (
        <RecoilRoot>
            <React.Suspense fallback={<div>Loading...</div>}>
                <LayoutProvider initialNavbarState="icons">
                    <SidebarProvider>
                        <MainLayout>
                            <LayoutContent/>
                            {children}
                        </MainLayout>
                    </SidebarProvider>
                </LayoutProvider>
            </React.Suspense>
        </RecoilRoot>
    );
}

export default Layout;

/*
            <p>ID: {activeUser.id} Name: {activeUser.firstName}</p>

 */