"use client";

import {
    ActionIcon,
    Affix,
    AppShell,
    Breadcrumbs,
    CloseButton,
    rem,
    Text,
    Title,
    Tooltip,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useState, useEffect, ReactNode } from "react";
import { Navbar } from "@/layout/Main/Navbar";
import { Header } from "@/layout/Main/Header";
import Link from "next/link";
import { IconBubbleText } from "@tabler/icons-react";
import { GoSidebarCollapse } from "react-icons/go";

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

interface Props {
    children: ReactNode;
    forceBaseNavbar?: boolean;
    defaultNavCollapse?: boolean;
    showBreadcrumbs?: boolean;
}

export function MainLayout(props: Props) {
    const { children, forceBaseNavbar, defaultNavCollapse, showBreadcrumbs } = props;
    const [opened, { toggle }] = useDisclosure();
    const desktop_match = useMediaQuery("(min-width: 992px)");
    const tablet_match = useMediaQuery("(max-width: 992px)");
    const mobile_match = useMediaQuery("(min-width: 768px)");
    const theme = useMantineTheme();
    const [isCollapsed, setIsCollapsed] = useState(defaultNavCollapse);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [asideOpen, setAsideOpen] = useState(false);

    const toggleAside = () => {
        setAsideOpen(!asideOpen);
    };

    useEffect(() => {
        if (forceBaseNavbar) {
            setIsCollapsed(true);
        } else {
            setIsCollapsed(!desktop_match && !tablet_match);
        }
    }, [forceBaseNavbar, desktop_match, tablet_match]);

    return (
        <>
            <AppShell
                header={{ height: { base: 60, md: 60, lg: 70 } }}
                navbar={{
                    width: { base: 60, md: 200, lg: 250 },
                    breakpoint: "sm",
                    collapsed: { mobile: !opened },
                }}
                aside={{
                    width: isChatOpen ? 300 : 0,
                    breakpoint: "sm",
                }}
                padding="sm"
            >
                <AppShell.Header>
                    <Header
                        opened={opened}
                        toggle={toggle}
                        desktopOpened={isCollapsed}
                        toggleDesktop={() => setIsCollapsed(!isCollapsed)}
                        tabletMatch={mobile_match}
                    />
                </AppShell.Header>
                <AppShell.Navbar
                    pt="xs"
                >
                    <Navbar
                        desktopOpened={desktop_match && !forceBaseNavbar}
                        tabletOpened={tablet_match && !forceBaseNavbar}
                        mobileOpened={mobile_match && !forceBaseNavbar}
                        isCollapsed={isCollapsed}
                    />
                </AppShell.Navbar>
                <AppShell.Main
                    style={{
                        // quick hack: todo find a better solution
                        paddingInlineStart: isCollapsed
                            ? rem(80)
                            : `calc(var(--app-shell-navbar-offset, 0rem) + var(--app-shell-padding)`,
                    }}
                >
                    {showBreadcrumbs && <Breadcrumbs mb="sm">{items}</Breadcrumbs>}
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
                            <Text>Layout version: Main</Text>
                        </div>
                    )}
                </AppShell.Aside>
            </AppShell>
        </>
    );
}
