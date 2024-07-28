"use client";
import { ActionIcon, AppShell } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { ReactNode, useState } from "react";
import { useLayout } from "../../context/LayoutContext";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

type Props = {
    children: ReactNode;
    initialNavbarState?: "full" | "compact" | "icons" | "hidden";
};

export function DualLayout({ children, initialNavbarState = "full" }: Props) {
    const { opened, navbarState } = useLayout();
    const mobileMatch = useMediaQuery("(min-width: 768px)");
    const [asideOpen, setAsideOpen] = useState(true);

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
    const asideWidth = asideOpen ? 250 : 25;

    const toggleAside = () => {
        setAsideOpen((prev) => !prev);
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
                    width: {
                        base: 0,
                        md: asideWidth,
                    },
                    breakpoint: "md",
                    collapsed: {
                        desktop: !asideOpen,
                        mobile: true,
                    },
                }}
                padding={{
                    base: "xs",
                    sm: "sm",
                    lg: "md",
                }}
            >
                <AppShell.Header withBorder={true}>
                    <Header tabletMatch={mobileMatch} />
                </AppShell.Header>
                {navbarState !== "hidden" && (
                    <AppShell.Navbar p="xs">
                        <Navbar state={navbarState} />
                    </AppShell.Navbar>
                )}
                <AppShell.Main>{children}</AppShell.Main>
                <AppShell.Aside p="md">
                    {asideOpen && (
                        <>
                            <div>Right Sidebar Content</div>
                            <ActionIcon
                                onClick={toggleAside}
                                style={{ position: "absolute", top: "50%", right: asideWidth - 27 }}
                            >
                                <IconChevronRight size={12} />
                            </ActionIcon>
                        </>
                    )}
                    {!asideOpen && (
                        <ActionIcon
                            onClick={toggleAside}
                            style={{ position: "absolute", top: "50%", right: asideWidth }}
                        >
                            <IconChevronLeft size={12} />
                        </ActionIcon>
                    )}
                </AppShell.Aside>
            </AppShell>
        </>
    );
}
