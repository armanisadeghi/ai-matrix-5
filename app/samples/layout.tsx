// app/dashboard/layout.tsx
"use client";

import { LayoutProvider } from "@/context/LayoutContext";
import { SidebarProvider } from "@/context/SidebarContext";

import { MainLayout } from "@/layout";
import { ReactNode } from "react";
import { HeaderProvider } from "@/context/HeaderContext";
import { FooterProvider } from "@/context/FooterContext";

type Props = {
    children: ReactNode;
};

function Layout({ children }: Props) {
    return (
        <LayoutProvider initialNavbarState="icons">
            <SidebarProvider>
                <HeaderProvider>
                    <FooterProvider>
                        <MainLayout>{children}</MainLayout>
                    </FooterProvider>
                </HeaderProvider>
            </SidebarProvider>
        </LayoutProvider>
    );
}

export default Layout;
