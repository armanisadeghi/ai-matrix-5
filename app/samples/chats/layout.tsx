"use client";

import React, { useEffect, useCallback } from "react";
import { Container, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRecoilState } from "recoil";
import { useSidebar } from "@/context/SidebarContext";
import ChatSidebar from "@/components/AiChat/Sidebar/ChatList";
import { UserProvider } from "@auth0/nextjs-auth0/client"
import { activeUserAtom } from "@/state/userAtoms";

const ChatLayout = ({children}: { children: React.ReactNode }) => {
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);
    console.log("ChatLayout activeUser:", activeUser);


    /*
 const { setSidebarContent, toggleAside } = useSidebar();

 const memoizedSetSidebarContent = useCallback(setSidebarContent, []);
 const memoizedToggleAside = useCallback(toggleAside, []);


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
 */

    return (
        <UserProvider>
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
        </UserProvider>
    );
};

export default ChatLayout;
