"use client";

import { AppShell, Box, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode, useState } from "react";
import { useLayout } from "@/context/LayoutContext";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useSidebar } from "@/context/SidebarContext";
import { IconArrowBarLeft, IconArrowBarToDown, IconArrowBarToRight, IconArrowBarToUp } from "@tabler/icons-react";
import { useFooter } from "@/context/FooterContext";
import { Footer } from "@/layout/Main/Footer";
import { useHeader } from "@/context/HeaderContext";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import AmeAffix from "@/ui/affix/AmeAffix";

type Props = {
    children: ReactNode;
    initialNavbarState?: "full" | "compact" | "icons" | "hidden";
};

export function MainLayout({ children }: Props) {
    const { opened, navbarState, handleIconMouseover, handleEndIconMouseover, toggleNavbar } = useLayout();
    const { asideState, toggleAside } = useSidebar();
    const { footerState, toggleFooter } = useFooter();
    const { headerState, toggleHeader } = useHeader();
    const [hovered, setHovered] = useState(false);
    const tabletMatch = useMediaQuery("(min-width: 768px)");
    const mobileMatch = useMediaQuery("(max-width: 768px)");
    const theme = useMantineTheme();

    const getNavbarWidth = () => {
        if (!tabletMatch) return "100%";
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
        if (!tabletMatch) return "100%";
        switch (asideState) {
            case "full":
                return 200;
            case "compact":
                return 150;
            case "icons":
                return 70;
            default:
                return 0;
        }
    };

    const getFooterHeight = () => {
        if (!tabletMatch) return 0;
        switch (footerState) {
            case "full":
                return 200;
            case "compact":
                return 150;
            case "icons":
                return 70;
            default:
                return 0;
        }
    };

    const getHeaderHeight = () => {
        if (!tabletMatch) return 0;
        switch (headerState) {
            case "large":
                return 80;
            case "medium":
                return 70;
            default:
                return 0;
        }
    };

    const navbarWidth = getNavbarWidth();
    const asideWidth = getAsideWidth();
    const footerHeight = getFooterHeight();
    const headerHeight = getHeaderHeight();

    const handleMouseEnter = () => {
        if (navbarState === "icons") {
            setHovered(true);
            handleIconMouseover();
        }
    };

    const handleMouseLeave = () => {
        if (navbarState === "compact") {
            setHovered(false);
            handleEndIconMouseover();
        }
    };

    return (
        <>
            <AppShell
                layout="default"
                header={{
                    height: headerHeight,
                }}
                navbar={{
                    width: navbarWidth,
                    breakpoint: "sm",
                    collapsed: { mobile: !opened },
                }}
                aside={{
                    width: asideWidth,
                    breakpoint: "md",
                    collapsed: {
                        desktop: false,
                        mobile: true,
                    },
                }}
                footer={{
                    height: footerHeight,
                }}
                padding={{
                    base: "xs",
                    sm: "sm",
                    lg: "md",
                    xl: "lg",
                }}
            >
                <AppShell.Header>
                    {headerState !== "hidden" && <Header state={headerState} tabletMatch={tabletMatch} />}
                </AppShell.Header>
                {navbarState !== "hidden" && (
                    <AppShell.Navbar p="xs" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <Navbar state={mobileMatch ? "hidden" : navbarState} />
                    </AppShell.Navbar>
                )}
                <AppShell.Main>
                    <Box>{children}</Box>
                    {/*toggle nav*/}
                    <AmeAffix
                        transition="slide-up"
                        position={{ top: headerHeight, left: 0 }}
                        mounted={navbarState === "hidden"}
                    >
                        <AmeActionIcon title="open nav" onClick={() => toggleNavbar("full")}>
                            <IconArrowBarToRight />
                        </AmeActionIcon>
                    </AmeAffix>
                    {/*toggle footer*/}
                    <AmeAffix
                        transition="slide-up"
                        position={{ bottom: 0, left: navbarWidth }}
                        mounted={footerState === "hidden"}
                    >
                        <AmeActionIcon title="open footer" onClick={() => toggleFooter("full")}>
                            <IconArrowBarToUp />
                        </AmeActionIcon>
                    </AmeAffix>
                    {/*toggle header*/}
                    <AmeAffix
                        transition="slide-down"
                        position={{ top: headerHeight, left: navbarWidth }}
                        mounted={headerState === "hidden"}
                    >
                        <AmeActionIcon title="open header" onClick={() => toggleHeader("medium")}>
                            <IconArrowBarToDown />
                        </AmeActionIcon>
                    </AmeAffix>
                    {/*toggle aside*/}
                    <AmeAffix
                        transition="slide-left"
                        position={{ top: headerHeight, right: 0 }}
                        mounted={asideState === "hidden"}
                    >
                        <AmeActionIcon title="open sidebar" onClick={() => toggleAside("full")} visibleFrom="md">
                            <IconArrowBarLeft />
                        </AmeActionIcon>
                    </AmeAffix>
                </AppShell.Main>
                <AppShell.Aside>
                    <Sidebar state={mobileMatch ? "hidden" : asideState} />
                </AppShell.Aside>
                <AppShell.Footer>
                    <Footer state={footerState} />
                </AppShell.Footer>
            </AppShell>
        </>
    );
}
