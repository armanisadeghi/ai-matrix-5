// app/samples/layout.tsx
'use client'

import React from 'react';
import { LayoutProvider } from '@/context/LayoutContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { MainLayout } from '@/layout';
import { ReactNode } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { activeUserAtom } from "@/state/userAtoms";
import { HeaderProvider } from "@/context/HeaderContext";
import { FooterProvider } from "@/context/FooterContext";
import ErrorBoundary from "@/components/ErrorManagement/ErrorBoundry";
import { PresetType } from "@/context/atoms/layoutAtoms";
import { NavbarProvider } from "@/context/NavbarContext";
import Loading from "@/app/dashboard/loading";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import { MatrixUser } from "@/services/Users";

type Props = {
    children: ReactNode;
    preset: PresetType;
};

const LayoutContent: React.FC = () => {
    const { user, error, isLoading } = useUser();
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);

    React.useEffect(() => {
        if (isLoading) return;
        if (error) {
            console.error('Error loading user:', error);
            return;
        }

        if (user) {
            setActiveUser(user);
            const matrixUser = new MatrixUser(user);
        }
    }, [user, error, isLoading, setActiveUser, activeUser]);

    if (isLoading) return <Loading />;
    return null;
};

function Layout({ children, preset }: Props) {
    return (
        <UserProvider>
            <ErrorBoundary>
                <RecoilRoot>
                    <React.Suspense fallback={<Loading />}>
                        <LayoutProvider initialNavbarState="icons">
                            <NavbarProvider initialState="icons">
                                <SidebarProvider initialAsideState="compact">
                                    <HeaderProvider initialState="medium">
                                        <FooterProvider initialState="hidden">
                                                <MainLayout>
                                                    <LayoutContent />
                                                    {children}
                                                </MainLayout>
                                        </FooterProvider>
                                    </HeaderProvider>
                                </SidebarProvider>
                            </NavbarProvider>
                        </LayoutProvider>
                    </React.Suspense>
                </RecoilRoot>
            </ErrorBoundary>
        </UserProvider>
    );
}

export default Layout;
