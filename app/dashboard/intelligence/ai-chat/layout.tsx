// app/dashboard/intelligence/aiChat/layout.tsx
"use client";

import React, { useCallback, useEffect } from "react";
import { Container, Grid } from "@mantine/core";
import styles from './AiChat.module.css';
import { useRecoilState, useRecoilValue } from "recoil";
import { activeUserAtom } from "@/state/userAtoms";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import ChatSidebar from "@/components/AiChat/Sidebar/ChatList";
import { deviceTypeAtom, overrideFlagAtom, presetTypeAtom } from "@/state/layoutAtoms";

const ChatLayout = ({children}: { children: React.ReactNode }) => {
    const [presetType, setPresetType] = useRecoilState(presetTypeAtom);
    const deviceType = useRecoilValue(deviceTypeAtom);
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);
    const [overrideFlag, setOverrideFlag] = useRecoilState(overrideFlagAtom);
    const {setSidebarContent} = useSidebar();
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
    }, [deviceType, activeUser, memoizedSetSidebarContent]);

    return (
        <SidebarProvider>
            {deviceType === 'mobile' ? (
                <Container fluid className={styles.container}>
                    <Grid grow className={styles.grid} columns={12} gutter={0}>
                        <Grid.Col span={1} className={styles.sideColumn}></Grid.Col>
                        <Grid.Col span={10} className={styles.mainColumn}>
                            {children}
                        </Grid.Col>
                        <Grid.Col span={1} className={styles.sideColumn}></Grid.Col>
                    </Grid>
                </Container>
            ) : (
                <Container fluid className={styles.container}>
                    <Grid grow className={styles.grid} columns={12} gutter={0}>
                        <Grid.Col span={2} className={styles.sideColumn}></Grid.Col>
                        <Grid.Col span={8} className={styles.mainColumn}>
                            {children}
                        </Grid.Col>
                        <Grid.Col span={2} className={styles.sideColumn}></Grid.Col>
                    </Grid>
                </Container>
            )}
        </SidebarProvider>
    );
};

export default ChatLayout;
