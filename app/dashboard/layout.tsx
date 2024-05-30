// app/dashboard/layout.tsx
"use client";

import ErrorBoundary from "@/components/ErrorManagement/ErrorBoundry";
import { LayoutProvider } from "@/context/LayoutContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { MainLayout } from "@/layout";
import { ReactNode } from "react";
import { FooterProvider } from "@/context/FooterContext";
import { HeaderProvider } from "@/context/HeaderContext";

type Props = {
    children: ReactNode;
};

function Layout({ children }: Props) {
    return (
        <ErrorBoundary>
            <LayoutProvider initialNavbarState="icons">
                <SidebarProvider initialAsideState="hidden">
                    <FooterProvider initialState="hidden">
                        <HeaderProvider initialState="medium">
                            <MainLayout>{children}</MainLayout>
                        </HeaderProvider>
                    </FooterProvider>
                </SidebarProvider>
            </LayoutProvider>
        </ErrorBoundary>
    );
}

export default Layout;
