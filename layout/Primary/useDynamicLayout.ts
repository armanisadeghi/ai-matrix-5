'use client';

import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMediaQuery } from "@mantine/hooks";
import {
    rightSidebarAtom,
    leftSidebarAtom,
    footerAtom,
    headerAtom,
    deviceTypeAtom,
    windowHeightState,
    windowWidthState,
} from "@/state/layoutAtoms";
import useLayoutPresets from "@/hooks/layout/useLayoutPresets";
import useToggleSizes from "@/hooks/layout/useToggleSizes";

export function useDynamicLayout() {
    const rightSideBarWidth = useRecoilValue(rightSidebarAtom);
    const [leftSideBarWidth, setLeftSideBarWidth] = useRecoilState(leftSidebarAtom);
    const footerHeight = useRecoilValue(footerAtom);
    const headerHeight = useRecoilValue(headerAtom);
    const [deviceType, setDeviceType] = useRecoilState(deviceTypeAtom);

    const mobileMatch = useMediaQuery("(max-width: 430px)");
    const tabletMatch = useMediaQuery("(min-width: 431px) and (max-width: 1024px)");
    const desktopMatch = useMediaQuery("(min-width: 1025px)");

    const [, setWindowWidth] = useRecoilState(windowWidthState);
    const [, setWindowHeight] = useRecoilState(windowHeightState);

    const toggleSize = useToggleSizes().toggleSize;

    console.log('Device Type:', deviceType);

    useEffect(() => {
        console.log('Device Type:', deviceType);
        if (deviceType === 'mobile') {
            console.log('Mobile');
            setLeftSideBarWidth(0);
            //toggleSize('leftSidebar');
        }
    }, [deviceType, setDeviceType]);



    useEffect(() => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }, [setWindowWidth, setWindowHeight]);

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

    return {
        rightSideBarWidth,
        leftSideBarWidth,
        footerHeight,
        headerHeight,
        deviceType,
    };
}
