// layout/Primary/helpers/layoutDefaults.ts
'use client';

import { useRecoilValue } from "recoil";
import {
    rightSidebarAtom,
    leftSidebarAtom,
    footerAtom,
    headerAtom,
    deviceTypeAtom,
    windowHeightState,
    windowWidthState,
} from "@/state/layoutAtoms";

export function useDynamicLayoutValues() {
    return {
        rightSidebarWidth: useRecoilValue(rightSidebarAtom),
        leftSidebarWidth: useRecoilValue(leftSidebarAtom),
        footerHeight: useRecoilValue(footerAtom),
        headerHeight: useRecoilValue(headerAtom),
        deviceType: useRecoilValue(deviceTypeAtom),
        windowHeight: useRecoilValue(windowHeightState),
        windowWidth: useRecoilValue(windowWidthState),
    };
}
