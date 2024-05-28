"use client";
import { AppShell, Breadcrumbs, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { ReactNode } from "react";
import { Navbar } from "@/layout/Apps/Navbar";
import { Header } from "@/layout/Apps/Header";

type Props = { children: ReactNode };

export function AppsLayout({ children }: Props) {
    const [opened, { toggle }] = useDisclosure();
    const mobile_match = useMediaQuery("(min-width: 768px)");

    return (
        <AppShell
            header={{ height: { base: 50, md: 60, lg: 70 } }}
            navbar={{
                width: opened ? 200 : 60,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="sm"
        >
            <AppShell.Header>
                <Header opened={opened} toggle={toggle} />
            </AppShell.Header>
            <AppShell.Navbar
                px="xs"
                pt="sm"
                style={{
                    width: opened ? '200px' : '60px',
                    transition: 'width 0.3s',
                }}
            >
                <Navbar mobileOpened={mobile_match} isCollapsed={!opened} toggle={toggle} />
            </AppShell.Navbar>
            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}
