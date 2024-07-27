// layout/Primary/Header/HeaderLogic.tsx
"use client";

import React, { useState, useEffect, useRef, ReactNode, useMemo, useCallback } from "react";
import { MantineSize } from "@mantine/core";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeUserAtom } from "@/state/userAtoms";
import { headerAtom, showLeftSidebarToggle, showRightSidebarToggle } from "@/state/layoutAtoms";
import useToggleSizes from "@/hooks/layout/useToggleSizes";

type HeaderLogicProps = {
    children: (props: {
        headerRef: React.RefObject<HTMLDivElement>;
        componentSize: MantineSize;
        showLeftSidebar: boolean;
        showRightSidebar: boolean;
        logoSize: number;
        isSearchHidden: boolean;
        toggleSize: (sidebarType: 'leftSidebar' | 'rightSidebar') => void;
    }) => ReactNode;
};

export function HeaderLogic({ children }: HeaderLogicProps) {
    const { user } = useUser();
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);
    const headerHeight = useRecoilValue(headerAtom);
    const showLeftSidebar = useRecoilValue(showLeftSidebarToggle);
    const showRightSidebar = useRecoilValue(showRightSidebarToggle);
    const { toggleSize } = useToggleSizes();
    const [isSearchHidden, setIsSearchHidden] = useState(true);
    const [logoSize, setLogoSize] = useState(200);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user && !activeUser) {
            setActiveUser(user as any);
        }
    }, [user, activeUser, setActiveUser]);

    const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
        const headerWidth = entries[0].contentRect.width;
        const hasEnoughSpace = headerWidth >= 700;
        setIsSearchHidden(!hasEnoughSpace);
        setLogoSize(hasEnoughSpace ? 200 : 100);
    }, []);

    useEffect(() => {
        if (headerRef.current) {
            const resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(headerRef.current);
            return () => resizeObserver.disconnect();
        }
    }, [handleResize]);

    const componentSize: MantineSize = useMemo(() => headerHeight > 100 ? "md" : "sm", [headerHeight]);

    const childrenProps = useMemo(() => ({
        headerRef,
        componentSize,
        showLeftSidebar,
        showRightSidebar,
        logoSize,
        isSearchHidden,
        toggleSize,
    }), [componentSize, showLeftSidebar, showRightSidebar, logoSize, isSearchHidden, toggleSize]);

    return children(childrenProps);
}
