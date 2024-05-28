import { ActionIcon, AppShell, Burger, Group, Skeleton, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Navbar } from "@/layout/Main/Navbar";
import { Header } from "@/layout/Apps/Header";
import React, { ReactNode } from "react";
import { GoSidebarCollapse } from "react-icons/go";

type Props = { children: ReactNode };

export function ChatLayout({ children }: Props) {
    const [opened, { toggle }] = useDisclosure();
    const mobileMatch = useMediaQuery("(min-width: 768px)");

    return (
        <AppShell
            layout="alt"
            header={{ height: { base: 50, md: 60, lg: 70 } }}
            navbar={{
                width: 60,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="sm"
            footer={{ height: 60 }}
            aside={{ width: 200, breakpoint: 'sm', collapsed: { desktop: false, mobile: !opened } }}
        >
            <AppShell.Header>
                <Header opened={opened} toggle={toggle} />
            </AppShell.Header>
            <AppShell.Navbar
                px="xs"
                pt="md"
                style={{
                    width: mobileMatch ? (opened ? '200px' : '60px') : '60px',
                    transition: 'width 0.3s',
                }}
            >
                <Navbar mobileOpened={mobileMatch} isCollapsed={!opened} />
            </AppShell.Navbar>
            <AppShell.Main>
                {children}
            </AppShell.Main>
            <AppShell.Aside p="md">
                <ActionIcon
                    onClick={toggle}
                    size="xs"
                    variant="outline"
                    style={{ marginBottom: '1rem' }}
                >
                    <GoSidebarCollapse />
                </ActionIcon>
            </AppShell.Aside>
        </AppShell>
    );
}

export default ChatLayout;
