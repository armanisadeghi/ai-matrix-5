// layout/Primary/Sidebar/SidebarLogic.tsx

"use client";

import React, { ReactNode, useMemo } from 'react';
import { useRecoilValue } from "recoil";
import { leftSidebarAtom } from "@/state/layoutAtoms";
import { useSidebar } from "@/context/SidebarContext";

interface SidebarLogicProps {
    children: (props: {
        sidebarWidth: number;
        sidebarContent: ReactNode;
    }) => ReactNode;
}

export function SidebarLogic({ children }: SidebarLogicProps) {
    const sidebarWidth = useRecoilValue(leftSidebarAtom);
    const { sidebarContent } = useSidebar();

    const childrenProps = useMemo(() => ({
        sidebarWidth,
        sidebarContent,
    }), [sidebarWidth, sidebarContent]);

    return useMemo(() => children(childrenProps), [children, childrenProps]);
}
