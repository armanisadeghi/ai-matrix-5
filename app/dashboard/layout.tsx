// app/dashboard/layout.tsx
"use client";

import ErrorBoundary from "@/components/ErrorManagement/ErrorBoundry";
import { SidebarProvider } from "@/context/SidebarContext";
import { MainLayout } from "@/layout";
import { ReactNode } from "react";
import { HeaderProvider } from "@/context/HeaderContext";
import { FooterProvider } from "@/context/FooterContext";
import { NavbarProvider } from "@/context/NavbarContext";

type Props = {
    children: ReactNode;
};

function Layout({ children }: Props) {
    return (
        <ErrorBoundary>
            <NavbarProvider initialState="icons">
                <SidebarProvider initialState="icons">
                    <HeaderProvider initialState="medium">
                        <FooterProvider initialState="hidden">
                            <MainLayout>{children}</MainLayout>
                        </FooterProvider>
                    </HeaderProvider>
                </SidebarProvider>
            </NavbarProvider>
        </ErrorBoundary>
    );
}

export default Layout;
