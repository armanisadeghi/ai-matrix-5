// app/samples/chats/layout.tsx

"use client";

import React from "react";
import { Container, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const ChatLayout = ({children}: { children: React.ReactNode }) => {
    const isSmallScreen = useMediaQuery("(max-width: 600px)");

    return (
            <Container fluid h={1200} bg="var(--mantine-color-dark-7)">
                <Grid grow style={{ flex: 1 }} columns={12} gutter={0}>
                    {!isSmallScreen && (
                        <Grid.Col span={1}
                                  style={{ flexGrow: 1, flexShrink: 1, flexBasis: "0%", padding: "0", }}
                        ></Grid.Col>
                    )}
                    <Grid.Col span={12}
                              style={{ display: "flex", flexDirection: "column", height: "106vh", maxWidth: "800px", padding: "0", margin: "0 auto", }}
                    >
                        {children}
                    </Grid.Col>
                    {!isSmallScreen && (
                        <Grid.Col span={1}
                                  style={{ flexGrow: 1, flexShrink: 1, flexBasis: "0%", padding: "0", }}
                        ></Grid.Col>
                    )}
                </Grid>
            </Container>
    );
};

export default ChatLayout;
