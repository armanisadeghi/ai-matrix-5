"use client";

import { AppShell, Breadcrumbs, Text, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useState, useEffect, ReactNode } from "react";
import { Navbar } from "@/layout/Main/Navbar";
import { Header } from "@/layout/Main/Header";
import Link from "next/link";

// sample breadcrumbs to help with navigation
const items = [
    { title: "Home", href: "#" },
    { title: "Nav #1", href: "#" },
    { title: "Nav #2", href: "#" },
].map((item, index) => (
    <Text component={Link} href={item.href} size="xs" key={index}>
        {item.title}
    </Text>
));

type Props = { children: ReactNode; forceBaseNavbar?: boolean };

export function MainLayout(props: Props) {
    const { children, forceBaseNavbar } = props;
    const [opened, { toggle }] = useDisclosure();
    const desktop_match = useMediaQuery("(min-width: 992px)");
    const tablet_match = useMediaQuery("(max-width: 992px)");
    const mobile_match = useMediaQuery("(min-width: 768px)");
    const theme = useMantineTheme();

    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        if (forceBaseNavbar) {
            setIsCollapsed(true);
        } else {
            setIsCollapsed(!desktop_match && !tablet_match);
        }
    }, [forceBaseNavbar, desktop_match, tablet_match]);

    return (
        <AppShell
            header={{ height: { base: 60, md: 60, lg: 70 } }}
            navbar={{
                width: { base: 60, md: 200, lg: 250 },
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="sm"
        >
            <AppShell.Header>
                <Header
                    opened={opened}
                    toggle={toggle}
                    desktopOpened={isCollapsed}
                    toggleDesktop={() => setIsCollapsed(!isCollapsed)}
                />
            </AppShell.Header>
            <AppShell.Navbar
                pt="md"
                style={{
                    width: isCollapsed ? "60px" : undefined,
                    transition: "width 0.3s",
                    paddingLeft: isCollapsed ? 0 : theme.spacing.xs,
                    paddingRight: isCollapsed ? 0 : theme.spacing.xs,
                }}
            >
                <Navbar
                    desktopOpened={desktop_match && !forceBaseNavbar}
                    tabletOpened={tablet_match && !forceBaseNavbar}
                    mobileOpened={mobile_match && !forceBaseNavbar}
                    isCollapsed={isCollapsed}
                />
            </AppShell.Navbar>
            <AppShell.Main>
                <Breadcrumbs mb="sm">{items}</Breadcrumbs>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}
