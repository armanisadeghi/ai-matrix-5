'use client';

import React, { ReactNode, useCallback, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { presetTypeAtom } from "@/state/layoutAtoms";
import { activeUserAtom } from "@/state/userAtoms";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import ChatSidebar from "@/components/AiChat/Sidebar/ChatSidebar";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [presetType, setPresetType] = useRecoilState(presetTypeAtom);
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);
    const { setSidebarContent } = useSidebar();
    const memoizedSetSidebarContent = useCallback(setSidebarContent, []);

    useEffect(() => {
        setPresetType('dashboard');
    }, []);
    useEffect(() => {
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
                <main>{children}</main>
        </SidebarProvider>
    );
};

export default Layout;
