// app/samples/layout.tsx
'use client'

import React, { useEffect } from 'react';
import { LayoutProvider } from '@/context/LayoutContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { MainLayout } from '@/layout';
import { ReactNode } from 'react';
import { RecoilRoot, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { activeUserAtom, activeUserSelector } from "@/context/atoms/userAtoms";
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
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);
    const activeUserLoadable = useRecoilValueLoadable(activeUserSelector);

    useEffect(() => {
        if (activeUserLoadable.state === 'hasValue') {
            const user = activeUserLoadable.contents;
            console.log('app/samples/layout.tsx - Active user:', user);

            if (user) {
                setActiveUser(user);
                console.log('app/samples/layout.tsx After setActiveUser - Active user atom:', user);
            }
        }
    }, [activeUserLoadable, setActiveUser]);

    if (!activeUser) {
        return <div>Loading...</div>;
    }
    return <div>Active user loaded</div>;
};

function Layout({ children, preset }: Props) {
    return (
        <ErrorBoundary>
            <RecoilRoot>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <LayoutProvider initialNavbarState="compact">
                        <SidebarProvider initialAsideState="icons" initialTitle="Sample Pages">
                            <HeaderProvider initialState="medium">
                                <FooterProvider initialState="hidden">
                                    <DynamicSocketProvider>
                                        <LayoutContent />
                                        <MainLayout>{children}</MainLayout>
                                    </DynamicSocketProvider>
                                </FooterProvider>
                            </HeaderProvider>
                        </SidebarProvider>
                    </LayoutProvider>
                </React.Suspense>
            </RecoilRoot>
        </ErrorBoundary>
    );
}

export default Layout;
