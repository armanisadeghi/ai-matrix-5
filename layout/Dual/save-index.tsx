"use client";
import { ActionIcon, AppShell, Breadcrumbs, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { ReactNode, useState } from "react";
import { Navbar } from "@/layout/Apps/Navbar";
import { Header } from "@/layout/Apps/Header";
import { GoSidebarCollapse } from "react-icons/go";

type Props = { children: ReactNode };

export function DualLayout({ children }: Props) {
    const [opened, { toggle }] = useDisclosure();
    const mobile_match = useMediaQuery("(min-width: 768px)");
    const [asideOpen, setAsideOpen] = useState(false);

    const toggleAside = () => {
        setAsideOpen(!asideOpen);
    };

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
            <AppShell.Aside
                p="md"
                style={{
                    width: asideOpen ? '200px' : '60px',
                    transition: 'width 0.3s',
                    overflow: 'hidden',
                }}
            >
                <ActionIcon
                    onClick={toggleAside}
                    size="xs"
                    variant="outline"
                    style={{ marginBottom: '1rem' }}
                >
                    <GoSidebarCollapse />
                </ActionIcon>
                {asideOpen && (
                    <div>
                        {/* Your aside content here */}
                        <Text>Aside Content</Text>
                    </div>
                )}
            </AppShell.Aside>
        </AppShell>
    );
}
