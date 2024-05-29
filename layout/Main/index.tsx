'use client';
import { AppShell } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode } from 'react';
import { useLayout } from '@/context/LayoutContext';
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import Sidebar from "./Sidebar/Sidebar";
import { useSidebar } from "@/context/SidebarContext";

type Props = {
    children: ReactNode;
    initialNavbarState?: "full" | "compact" | "icons" | "hidden";
};

export function MainLayout({
                               children,
                               initialNavbarState = "full"
                           }: Props) {
    const {
        opened,
        navbarState
    } = useLayout();
    const { asideOpen } = useSidebar();
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

    const getAsideWidth = () => {
        return asideOpen ? 250 : 25;
    };

    const navbarWidth = getNavbarWidth();
    const asideWidth = getAsideWidth();

    return (
        <AppShell
            layout="default"
            header={{
                height: {
                    base: 50,
                }
            }}
            navbar={{
                width: navbarWidth,
                breakpoint: 'sm',
                collapsed: {mobile: !opened}
            }}
            aside={{
                width: {
                    base: 0,
                    md: asideWidth
                },
                breakpoint: 'md',
                collapsed: {
                    desktop: !asideOpen,
                    mobile: true
                }
            }}
            padding={{
                base: 'xs',
                sm: 'sm',
                lg: 'md'
            }}
        >
            <AppShell.Header withBorder={true}>
                <Header tabletMatch={mobileMatch}/>
            </AppShell.Header>
            {navbarState !== "hidden" && (
                <AppShell.Navbar p="xs">
                    <Navbar state={navbarState}/>
                </AppShell.Navbar>
            )}
            <AppShell.Main>
                {children}
            </AppShell.Main>
            <AppShell.Aside p="md">
                <Sidebar asideWidth={asideWidth} />
            </AppShell.Aside>
        </AppShell>
    );
}
