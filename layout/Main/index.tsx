"use client";

import { AppShell, Box } from "@mantine/core";
import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "@/layout/Main/Footer";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    rightSidebarAtom,
    leftSidebarAtom,
    footerAtom,
    headerAtom,
    deviceTypeAtom,
} from "@/state/layoutAtoms";
import useLayoutPresets from "@/hooks/layout/useLayoutPresets";
import { useMediaQuery } from "@mantine/hooks";
import { PresetType } from "@/types/layout";

type Props = {
    children: ReactNode;
};

export function MainLayout({ children }: Props) {
    const rightSideBarWidth = useRecoilValue(rightSidebarAtom);
    const leftSideBarWidth = useRecoilValue(leftSidebarAtom);
    const footerHeight = useRecoilValue(footerAtom);
    const headerHeight = useRecoilValue(headerAtom);
    const [deviceType, setDeviceType] = useRecoilState(deviceTypeAtom);

    const mobileMatch = useMediaQuery("(max-width: 768px)");
    const tabletMatch = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
    const desktopMatch = useMediaQuery("(min-width: 1025px)");

    useEffect(() => {
        if (mobileMatch) {
            setDeviceType('mobile');
        } else if (tabletMatch) {
            setDeviceType('tablet');
        } else if (desktopMatch) {
            setDeviceType('desktop');
        }
    }, [mobileMatch, tabletMatch, desktopMatch, setDeviceType]);

    useLayoutPresets();

    return (
        <AppShell
            layout="default"
            header={{
                height: headerHeight,
            }}
            navbar={{
                width: leftSideBarWidth,
                breakpoint: "sm",
                collapsed: { mobile: leftSideBarWidth === 0 },
            }}
            aside={{
                width: rightSideBarWidth,
                breakpoint: "md",
                collapsed: {
                    desktop: false,
                    mobile: true,
                },
            }}
            footer={{
                height: footerHeight,
            }}
        >
            <AppShell.Header>
                <Header />
            </AppShell.Header>
            {leftSideBarWidth !== 0 && (
                <AppShell.Navbar pt="xs" pb="xs" pl={0} pr={0}>
                    <Navbar />
                </AppShell.Navbar>
            )}
            <AppShell.Main>
                <Box>{children}</Box>
            </AppShell.Main>
            {rightSideBarWidth !== 0 && (
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
