// app/dashboard/intelligence/aiChat/layout.tsx
"use client";

import React, { useCallback, useEffect } from "react";
import { Container, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import styles from './AiChat.module.css';
import { useRecoilState } from "recoil";
import { activeUserAtom } from "@/state/userAtoms";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import ChatSidebar from "@/components/AiChat/Sidebar/ChatList";
import { overrideFlagAtom, presetTypeAtom } from "@/state/layoutAtoms";

const ChatLayout = ({children}: { children: React.ReactNode }) => {
    const [presetType, setPresetType] = useRecoilState(presetTypeAtom);
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);
    const [overrideFlag, setOverrideFlag] = useRecoilState(overrideFlagAtom);
    const {setSidebarContent} = useSidebar();
    const memoizedSetSidebarContent = useCallback(setSidebarContent, []);


    useEffect(() => {
        setOverrideFlag(true);
        setPresetType('chat');


        if (activeUser) {
            memoizedSetSidebarContent(<ChatSidebar/>);
        } else {
        }

        return () => {
            memoizedSetSidebarContent(null);
        };
    }, [activeUser, memoizedSetSidebarContent]);

    return (
        <SidebarProvider>
            <Container fluid className={styles.container}>
                <Grid grow className={styles.grid} columns={12} gutter={0}>
                    {!isSmallScreen && (
                        <Grid.Col span={1} className={styles.sideColumn}></Grid.Col>
                    )}
                    <Grid.Col span={12} className={styles.mainColumn}>
                        {children}
                    </Grid.Col>
                    {!isSmallScreen && (
                        <Grid.Col span={1} className={styles.sideColumn}></Grid.Col>
                    )}
                </Grid>
            </Container>
        </SidebarProvider>
    );
};

export default ChatLayout;
