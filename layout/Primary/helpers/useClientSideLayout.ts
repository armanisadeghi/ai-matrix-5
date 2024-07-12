// layout/Primary/helpers/useClientSideLayout.ts
'use client';

import { useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useRecoilState } from "recoil";
import { deviceTypeAtom, windowHeightState, windowWidthState } from "@/state/layoutAtoms";
import useLayoutPresets from "@/hooks/layout/useLayoutPresets";

export function useClientSideLayout() {
    const mobileMatch = useMediaQuery("(max-width: 768px)");
    const tabletMatch = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
    const desktopMatch = useMediaQuery("(min-width: 1025px)");

    const [, setDeviceType] = useRecoilState(deviceTypeAtom);
    const [, setWindowWidth] = useRecoilState(windowWidthState);
    const [, setWindowHeight] = useRecoilState(windowHeightState);

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
}
