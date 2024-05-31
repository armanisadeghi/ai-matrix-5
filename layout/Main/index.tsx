"use client";
import { ActionIcon, Affix, AppShell, Box, Transition, useMantineTheme } from "@mantine/core";
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
                    <Affix position={{ top: headerHeight, left: 0 }}>
                        <Transition transition="slide-up" mounted={navbarState === "hidden"}>
                            {(transitionStyles) => (
                                <ActionIcon onClick={() => toggleNavbar("full")} style={transitionStyles}>
                                    <IconArrowBarToRight />
                                </ActionIcon>
                            )}
                        </Transition>
                    </Affix>
                    <Affix position={{ bottom: 0, left: navbarWidth }}>
                        <Transition transition="slide-up" mounted={footerState === "hidden"}>
                            {(transitionStyles) => (
                                <ActionIcon onClick={() => toggleFooter("full")} style={transitionStyles}>
                                    <IconArrowBarToUp />
                                </ActionIcon>
                            )}
                        </Transition>
                    </Affix>
                    <Affix position={{ top: 0, left: navbarWidth }}>
                        <Transition transition="slide-down" mounted={headerState === "hidden"}>
                            {(transitionStyles) => (
                                <ActionIcon onClick={() => toggleHeader("large")} style={transitionStyles}>
                                    <IconArrowBarToDown />
                                </ActionIcon>
                            )}
                        </Transition>
                    </Affix>
                </AppShell.Main>
                <AppShell.Aside>
                    <Sidebar state={mobileMatch ? "hidden" : asideState} />
                </AppShell.Aside>
                <AppShell.Footer>
                    <Footer state={footerState} />
                </AppShell.Footer>
            </AppShell>
            {/*aside section buttons*/}
            <Affix position={{ top: headerHeight, right: 0 }}>
                <Transition transition="slide-left" mounted={asideState === "hidden"}>
                    {(transitionStyles) => (
                        <ActionIcon onClick={() => toggleAside("full")} visibleFrom="md" style={transitionStyles}>
                            <IconArrowBarLeft />
                        </ActionIcon>
                    )}
                </Transition>
            </Affix>
        </>
    );
}
