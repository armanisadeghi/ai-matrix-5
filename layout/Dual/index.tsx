'use client';
import { AppShell, Group } from "@mantine/core";
import { ReactNode } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useLayout } from './LayoutContext';
import { Navbar } from "./Navbar";
import { Header } from "./Header";

type Props = {
    children: ReactNode;
    initialNavbarState?: "full" | "compact" | "icons" | "hidden";
};

export function DualLayout({ children, initialNavbarState = "full" }: Props) {
    const { opened, toggleOpened, navbarState } = useLayout();
    const mobileMatch = useMediaQuery("(min-width: 768px)");

    const getNavbarWidth = () => {
        if (!mobileMatch) return "100%";
        switch (navbarState) {
            case "full":
                return 250;
            case "compact":
                return 200;
            case "icons":
                return 70;
            default:
                return 0;
        }
    };

    const navbarWidth = getNavbarWidth();

    return (
        <AppShell
            layout="default"
            header={{ height: { base: 36, sm: 40, lg: 44 } }}
            navbar={{
                width: navbarWidth,
                breakpoint: 'sm',
                collapsed: { mobile: !opened }
            }}
            aside={{ width: { base: 0, md: 200 }, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
            padding={{ base: 'xs', sm: 'sm', lg: 'md' }}
        >
            <AppShell.Header withBorder={true}>
                <Header tabletMatch={mobileMatch} />
            </AppShell.Header>
            {navbarState !== "hidden" && (
                <AppShell.Navbar p="xs">
                    <Navbar state={navbarState} />
                </AppShell.Navbar>
            )}
            <AppShell.Main>
                {children}
            </AppShell.Main>
            <AppShell.Aside p="md">Right Sidebar</AppShell.Aside>
        </AppShell>
    );
}
