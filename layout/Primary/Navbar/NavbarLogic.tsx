// layout/Primary/Navbar/NavbarLogic.tsx

"use client";

import { ReactNode, useMemo, useCallback } from 'react';
import { useRecoilValue } from "recoil";
import { leftSidebarAtom } from "@/state/layoutAtoms";
import { usePathname } from "next/navigation";
import { NavItem } from './navItems';

type NavbarLogicProps = {
    navItems: NavItem[];
    children: (props: {
        leftSideBarWidth: number;
        isActive: (link: string) => boolean;
    }) => ReactNode;
};

export function NavbarLogic({ children }: NavbarLogicProps) {
    const pathname = usePathname();
    const leftSideBarWidth = useRecoilValue(leftSidebarAtom);

    const isActive = useCallback((link: string) => link === pathname, [pathname]);

    const childrenProps = useMemo(() => ({
        leftSideBarWidth,
        isActive,
    }), [leftSideBarWidth, isActive]);

    return children(childrenProps);
}
