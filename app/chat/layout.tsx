// app/chat/layout.tsx

"use client";
import React, { ReactNode } from "react";
import { MainLayout } from "@/layout";
import { ChatProvider } from "@/context/chatContext";
import { ResponseProvider } from "./response/ResponseContext";
import { LayoutProvider } from "@/context/LayoutContext";
import ErrorBoundary from "@/components/ErrorManagement/ErrorBoundry";
import { SidebarProvider } from "@/context/SidebarContext";
import { FooterProvider } from "@/context/FooterContext";
import { HeaderProvider } from "@/context/HeaderContext";
import { NavbarProvider } from "@/context/NavbarContext";

type Props = {
    children: ReactNode;
};

export default function ChatLayout({ children }: Props) {
    return (
        <ErrorBoundary>
            <LayoutProvider initialNavbarState="hidden">
                <NavbarProvider initialState="hidden">
                    <SidebarProvider initialState="compact">
                    <FooterProvider initialState="hidden">
                        <HeaderProvider initialState="medium">
                            <MainLayout>
                                <ChatProvider>
                                    <ResponseProvider>{children}</ResponseProvider>
                                </ChatProvider>
                            </MainLayout>
                        </HeaderProvider>
                    </FooterProvider>
                </SidebarProvider>
                </NavbarProvider>
            </LayoutProvider>
        </ErrorBoundary>
    );
}
