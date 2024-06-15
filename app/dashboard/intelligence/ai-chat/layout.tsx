// app/dashboard/intelligence/aiChat/layout.tsx
"use client";

import React, { useCallback, useEffect } from "react";
import { Container, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import styles from './AiChat.module.css';
import { useRecoilState } from "recoil";
import { activeUserAtom } from "@/state/userAtoms";
import { useSidebar } from "@/context/SidebarContext";
import ChatSidebar from "@/components/AiChat/Sidebar/ChatList";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);
    const { setSidebarContent, toggleAside } = useSidebar();
    const memoizedSetSidebarContent = useCallback(setSidebarContent, []);
    const memoizedToggleAside = useCallback(toggleAside, []);
    console.log("activeUser", activeUser);

    useEffect(() => {
        if (activeUser) {
            memoizedSetSidebarContent(<ChatSidebar />);
            memoizedToggleAside("full");
        } else {
        }

        return () => {
            memoizedSetSidebarContent(null);
        };
    }, [activeUser, memoizedSetSidebarContent, memoizedToggleAside]);

    return (
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
    );
};

export default ChatLayout;
