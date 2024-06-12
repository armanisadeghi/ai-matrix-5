// app/dashboard/layout.tsx
"use client";

import ErrorBoundary from "@/components/ErrorManagement/ErrorBoundry";
import { SidebarProvider } from "@/context/SidebarContext";
import { MainLayout } from "@/layout";
import { ReactNode } from "react";
import { HeaderProvider } from "@/context/HeaderContext";
import { FooterProvider } from "@/context/FooterContext";
import { NavbarProvider } from "@/context/NavbarContext";
import { RecoilRoot } from "recoil";

type Props = {
    children: ReactNode;
};

function Layout({ children }: Props) {
    return (
        <ErrorBoundary>
            <RecoilRoot>
                <NavbarProvider initialState="full">
                    <SidebarProvider initialState="icons">
                        <HeaderProvider initialState="medium">
                            <FooterProvider initialState="hidden">
                                <MainLayout>{children}</MainLayout>
                            </FooterProvider>
                        </HeaderProvider>
                    </SidebarProvider>
                </NavbarProvider>
            </RecoilRoot>
        </ErrorBoundary>
    );
}

export default Layout;
