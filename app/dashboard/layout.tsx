"use client";

import ErrorBoundary from "@/components/ErrorManagement/ErrorBoundry";
import { MainLayout } from "@/layout";
import React, { ReactNode, useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import Loading from "@/app/dashboard/loading";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import { PresetType } from "@/context/atoms/layoutAtoms";
import { useCompleteUserProfile } from "@/hooks/users/useMatrixUser";
import { LayoutProvider } from "@/context/LayoutContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { presetTypeAtom } from "@/state/layoutAtoms";

type Props = {
    children: ReactNode;
    preset: PresetType;
};

const LayoutContent: React.FC = () => {
    const { user, error, isLoading } = useUser();
    const { activeUser } = useCompleteUserProfile();
    const [presetType, setPresetType] = useRecoilState(presetTypeAtom);

    useEffect(() => {
        setPresetType('dashboard');
        if (isLoading) {
            return;
        } else if (user) {
        }
    }, [user, isLoading, activeUser]);

    if (isLoading) {
        return (
            <div className="page-layout">
                <Loading />
            </div>
        );
    }

    if (error) {
        console.error('Error loading user:', error);
        return null;
    }

    return null;
};

function Layout({ children, preset }: Props) {
    return (
        <UserProvider>
            <ErrorBoundary>
                <RecoilRoot>
                    <LayoutProvider>
                        <SidebarProvider>
                            <MainLayout>
                                {children}
                            </MainLayout>
                        </SidebarProvider>
                    </LayoutProvider>
                </RecoilRoot>
            </ErrorBoundary>
        </UserProvider>
    );
}

export default Layout;
