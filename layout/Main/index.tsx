"use client";

import { AppShell, Box, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode, useState } from "react";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useSidebar } from "@/context/SidebarContext";
import { IconChevronLeft, IconChevronRight, IconChevronUp } from "@tabler/icons-react";
import { useFooter } from "@/context/FooterContext";
import { Footer } from "@/layout/Main/Footer";
import { useHeader } from "@/context/HeaderContext";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import AmeAffix from "@/ui/affix/AmeAffix";
import { useNavbar } from "@/context/NavbarContext";

type Props = {
    children: ReactNode;
    initialNavbarState?: "full" | "compact" | "icons" | "hidden";
};

export function MainLayout({ children }: Props) {
    const { opened, navbarState, handleIconMouseover, handleEndIconMouseover, toggleNavbar } = useNavbar();
    const { asideState } = useSidebar();
    const { footerState } = useFooter();
    const { headerState } = useHeader();
    const [hovered, setHovered] = useState(false);
    const tabletMatch = useMediaQuery("(min-width: 768px)");
    const mobileMatch = useMediaQuery("(max-width: 768px)");

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
        if (!tabletMatch) return 70;
        switch (headerState) {
            case "large":
                return 80;
            case "medium":
                return 70;
            default:
                return 60;
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
                    <Header state={headerState} tabletMatch={tabletMatch} />
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
                        transition="slide-right"
                        position={{ top: "50%", left: 0 }}
                        mounted={navbarState === "hidden"}
                    >
                        <AmeActionIcon title="open nav" onClick={() => toggleNavbar("full")}>
                            <IconChevronRight />
                        </AmeActionIcon>
                    </AmeAffix>
                </AppShell.Main>
                <AppShell.Aside>
                    <Sidebar state={asideState} />
                </AppShell.Aside>
                <AppShell.Footer>
                    <Footer state={footerState} />
                </AppShell.Footer>
            </AppShell>
        </>
    );
}
