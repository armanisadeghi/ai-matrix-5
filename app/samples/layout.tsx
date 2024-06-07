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
import { DynamicSocketProvider } from "@/context/AiContext/socketContext";
import { HeaderProvider } from "@/context/HeaderContext";
import { FooterProvider } from "@/context/FooterContext";
import ErrorBoundary from "@/components/ErrorManagement/ErrorBoundry";
import { PresetType } from "@/context/atoms/layoutAtoms";

type Props = {
    children: ReactNode;
    preset: PresetType;
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

    return null;
};

function Layout({ children, preset }: Props) {
    return (
        <ErrorBoundary>
            <RecoilRoot>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <LayoutProvider initialNavbarState="icons">
                        <SidebarProvider initialAsideState="compact">
                            <HeaderProvider initialState="medium">
                                <FooterProvider initialState="hidden">
                                    <DynamicSocketProvider>
                                        <MainLayout>{children}</MainLayout>
                                    </DynamicSocketProvider>
                                </FooterProvider>
                            </HeaderProvider>
                        </SidebarProvider>
                    </LayoutProvider>
                </React.Suspense>
            </RecoilRoot>
        </ErrorBoundary>

    )
        ;
}

export default Layout;
