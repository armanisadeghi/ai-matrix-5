'use client';

import React, { ReactNode, useCallback, useEffect } from 'react';
import AnimatedSidebar from "@/ui/annimation/AnimatedSidebar";
import { MainLayout } from "@/layout";
import { useRecoilState } from "recoil";
import { overrideFlagAtom, presetTypeAtom } from "@/state/layoutAtoms";
import { useMediaQuery } from "@mantine/hooks";
import { activeUserAtom } from "@/state/userAtoms";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import ChatSidebar from "@/components/AiChat/Sidebar/ChatList";
import { Container, Grid } from "@mantine/core";
import styles from "@/app/dashboard/intelligence/ai-chat/AiChat.module.css";
import ChatLayout from "@/app/samples/chats/layout";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [presetType, setPresetType] = useRecoilState(presetTypeAtom);
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);
    const [overrideFlag, setOverrideFlag] = useRecoilState(overrideFlagAtom);
    const { setSidebarContent } = useSidebar();
    const memoizedSetSidebarContent = useCallback(setSidebarContent, []);

    useEffect(() => {
        setOverrideFlag(true);
        setPresetType('chat');

        if (activeUser) {
            memoizedSetSidebarContent(<ChatSidebar />);
        } else {
            memoizedSetSidebarContent(null);
        }

        return () => {
            memoizedSetSidebarContent(null);
        };
    }, [activeUser, memoizedSetSidebarContent]);

    return (
        <SidebarProvider>
            <MainLayout>
                <main>{children}</main>
            </MainLayout>
        </SidebarProvider>
    );
};

export default Layout;
