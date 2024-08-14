"use client";

import useLayoutPresets from "@/hooks/layout/useLayoutPresets";
import { Footer } from "@/layout/Main/Footer";
import {
    deviceTypeAtom,
    footerAtom,
    headerAtom,
    leftSidebarAtom,
    rememberedLeftSidebarSizeAtom,
    rightSidebarAtom,
    windowHeightState,
    windowWidthState,
} from "@/state/layoutAtoms";
import { AppShell, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { ReactNode, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Header } from "./Header";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

type Props = {
    children: ReactNode;
};

export const MainLayout = React.memo(function MainLayout({ children }: Props) {
    const rightSideBarWidth = useRecoilValue(rightSidebarAtom);
    const [leftSideBarWidth, setLeftSideBarWidth] = useRecoilState(leftSidebarAtom);
    const footerHeight = useRecoilValue(footerAtom);
    const headerHeight = useRecoilValue(headerAtom);

    const mobileMatch = useMediaQuery("(max-width: 430px)");
    const tabletMatch = useMediaQuery("(min-width: 431px) and (max-width: 1024px)");
    const desktopMatch = useMediaQuery("(min-width: 1025px)");

    const [, setWindowWidth] = useRecoilState(windowWidthState);
    const [, setWindowHeight] = useRecoilState(windowHeightState);
    const [deviceType, setDeviceType] = useRecoilState(deviceTypeAtom);
    const [rememberedLeftSidebarSize, setRememberedLeftSidebarSize] = useRecoilState(rememberedLeftSidebarSizeAtom);

    useEffect(() => {
        if (deviceType === "mobile" && leftSideBarWidth !== 0) {
            setRememberedLeftSidebarSize((prevSize) => ({
                ...prevSize,
                tablet: leftSideBarWidth,
            }));
            setLeftSideBarWidth(rememberedLeftSidebarSize.mobile);
        }
        if (deviceType === "tablet" && leftSideBarWidth > 200) {
            setRememberedLeftSidebarSize((prevSize) => ({
                ...prevSize,
                desktop: leftSideBarWidth,
            }));
            setLeftSideBarWidth(rememberedLeftSidebarSize.tablet);
        }
        if (deviceType === "desktop" && leftSideBarWidth > 200) {
            setRememberedLeftSidebarSize((prevSize) => ({
                ...prevSize,
                tablet: leftSideBarWidth,
            }));
            setLeftSideBarWidth(rememberedLeftSidebarSize.desktop);
        }
    }, [deviceType]);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }, [setWindowWidth, setWindowHeight]);

    useEffect(() => {
        if (mobileMatch) {
            setDeviceType("mobile");
        } else if (tabletMatch) {
            setDeviceType("tablet");
        } else if (desktopMatch) {
            setDeviceType("desktop");
        }
    }, [mobileMatch, tabletMatch, desktopMatch, setDeviceType]);

    useLayoutPresets();

    const layoutContent = useMemo(
        () => (
            <AppShell
                layout="default"
                header={{
                    height: headerHeight,
                }}
                navbar={{
                    width: leftSideBarWidth,
                    breakpoint: 0,
                }}
                aside={{
                    width: rightSideBarWidth,
                    breakpoint: 0,
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
                    <Box p="md">{children}</Box>
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
        ),
        [headerHeight, leftSideBarWidth, rightSideBarWidth, footerHeight, children],
    );

    return layoutContent;
});
