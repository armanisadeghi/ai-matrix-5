// app/dashboard/intelligence/aiChat/layout.tsx
"use client";

import React from "react";
import { Container, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import styles from './AiChat.module.css'; // Import the CSS module

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
    const isSmallScreen = useMediaQuery("(max-width: 600px)");

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
