"use client";
import { ActionIcon, Affix, AppShell, Transition } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode, useState } from "react";
import { useLayout } from "@/context/LayoutContext";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useSidebar } from "@/context/SidebarContext";
import { IconArrowBarLeft } from "@tabler/icons-react";

type Props = {
    children: ReactNode;
    initialNavbarState?: "full" | "compact" | "icons" | "hidden";
};

export function MainLayout({ children }: Props) {
    const { opened, navbarState, handleIconMouseover, handleEndIconMouseover } = useLayout();
    const { asideState, toggleAside } = useSidebar();
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

    const navbarWidth = getNavbarWidth();
    const asideWidth = getAsideWidth();

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
                    height: {
                        base: 50,
                    },
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
                padding={{
                    base: "xs",
                    sm: "sm",
                    lg: "md",
                    xl: "lg",
                }}
            >
                <AppShell.Header withBorder={true}>
                    <Header tabletMatch={tabletMatch} />
                </AppShell.Header>
                {navbarState !== "hidden" && (
                    <AppShell.Navbar p="xs" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <Navbar state={mobileMatch ? "hidden" : navbarState} />
                    </AppShell.Navbar>
                )}
                <AppShell.Main>{children}</AppShell.Main>
                <AppShell.Aside>
                    <Sidebar state={mobileMatch ? "hidden" : asideState} />
                </AppShell.Aside>
            </AppShell>
            {/*aside section button*/}
            <Affix position={{ bottom: 20, right: 0 }}>
                <Transition transition="slide-left" mounted={asideState === "hidden"}>
                    {(transitionStyles) => (
                        <ActionIcon onClick={() => toggleAside("full")} style={transitionStyles}>
                            <IconArrowBarLeft />
                        </ActionIcon>
                    )}
                </Transition>
            </Affix>
        </>
    );
}
