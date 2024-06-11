// app/dashboard/layout.tsx
"use client";

import ErrorBoundary from "@/components/ErrorManagement/ErrorBoundry";
import { SidebarProvider } from "@/context/SidebarContext";
import { MainLayout } from "@/layout";
import React, { ReactNode } from "react";
import { HeaderProvider } from "@/context/HeaderContext";
import { FooterProvider } from "@/context/FooterContext";
import { NavbarProvider } from "@/context/NavbarContext";
import { RecoilRoot } from "recoil";
import { LayoutProvider } from "@/context/LayoutContext";
import { DynamicSocketProvider } from "@/context/AiContext/socketContext";
import Loading from "@/app/dashboard/loading";

type Props = {
    children: ReactNode;
};

function Layout({children}: Props) {
    return (

        <ErrorBoundary>
            <RecoilRoot>
                <React.Suspense fallback={<Loading/>}>
                    <LayoutProvider initialNavbarState="icons">
                        <NavbarProvider initialState="icons">
                            <SidebarProvider initialAsideState="icons">
                                <HeaderProvider initialState="medium">
                                    <FooterProvider initialState="hidden">
                                        <DynamicSocketProvider>
                                            <MainLayout>{children}</MainLayout>
                                        </DynamicSocketProvider>
                                    </FooterProvider>
                                </HeaderProvider>
                            </SidebarProvider>
                        </NavbarProvider>
                    </LayoutProvider>
                </React.Suspense>
            </RecoilRoot>
        </ErrorBoundary>

    );
}

export default Layout;

