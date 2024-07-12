// layout/Primary/PrimaryLayout.tsx
'use client';

import { AppShell, Box } from "@mantine/core";
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "@/layout/Main/Footer";
import { useDynamicLayoutValues } from "./helpers/layoutDefaults";
import { useClientSideLayout } from "./helpers/useClientSideLayout";

type Props = {
    children: ReactNode;
};

export const defaultLayoutValues = {
    headerHeight: 60,
    leftSidebarWidth: 250,
    rightSidebarWidth: 0,
    footerHeight: 0,
    deviceType: 'desktop',
    windowHeight: 1080,
    windowWidth: 1920,
};

export function PrimaryLayout({ children }: Props) {
    // Invoke client-side layout logic conditionally
    if (typeof window !== 'undefined') {
        useClientSideLayout();
    }

    const dynamicValues = useDynamicLayoutValues() || defaultLayoutValues;

    const {
        rightSidebarWidth = defaultLayoutValues.rightSidebarWidth,
        leftSidebarWidth = defaultLayoutValues.leftSidebarWidth,
        footerHeight = defaultLayoutValues.footerHeight,
        headerHeight = defaultLayoutValues.headerHeight,
    } = dynamicValues;

    return (
        <AppShell
            layout="default"
            header={{ height: headerHeight }}
            navbar={{
                width: leftSidebarWidth,
                breakpoint: 0,
            }}
            aside={{
                width: rightSidebarWidth,
                breakpoint: 0,
            }}
            footer={{ height: footerHeight }}
        >
            <AppShell.Header>
                <Header />
            </AppShell.Header>
            {leftSidebarWidth !== 0 && (
                <AppShell.Navbar pt="xs" pb="xs" pl={0} pr={0}>
                    <Navbar />
                </AppShell.Navbar>
            )}
            <AppShell.Main>
                <Box>{children}</Box>
            </AppShell.Main>
            {rightSidebarWidth !== 0 && (
                <AppShell.Aside>
                    <Sidebar />
                </AppShell.Aside>
            )}
            {footerHeight !== 0 && (
                <AppShell.Footer>
                    <Footer />
                </AppShell.Footer>
            )}
        </AppShell>
    );
}
