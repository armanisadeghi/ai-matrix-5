// app/dashboard/layout.tsx
"use client";

import ErrorBoundary from "@/components/ErrorManagement/ErrorBoundry";
import { SidebarProvider } from "@/context/SidebarContext";
import { MainLayout } from "@/layout";
import React, { ReactNode } from "react";
import { HeaderProvider } from "@/context/HeaderContext";
import { FooterProvider } from "@/context/FooterContext";
import { NavbarProvider } from "@/context/NavbarContext";
import { RecoilRoot, useRecoilState } from "recoil";
import { LayoutProvider } from "@/context/LayoutContext";
import Loading from "@/app/dashboard/loading";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import { MatrixUser } from "@/services/Users";
import { PresetType } from "@/context/atoms/layoutAtoms";
import { activeUserAtom } from "@/state/userAtoms";

type Props = {
    children: ReactNode;
    preset: PresetType;
};

const LayoutContent: React.FC = () => {
    const {user, error, isLoading} = useUser();
    console.log(user);
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
            console.log(matrixUser);
        }
    }, [user, error, isLoading, setActiveUser, activeUser]);

    if (isLoading) return <Loading/>;
    return null;
};

function Layout({children, preset}: Props) {
    return (
        <UserProvider>
            <ErrorBoundary>
                <RecoilRoot>
                    <React.Suspense fallback={<Loading/>}>
                        <LayoutProvider initialNavbarState="icons">
                            <NavbarProvider initialState="icons">
                                <SidebarProvider initialAsideState="icons">
                                    <HeaderProvider initialState="medium">
                                        <FooterProvider initialState="hidden">
                                            <MainLayout>{children}</MainLayout>
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

