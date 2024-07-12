// layout/Primary/Footer/FooterLogic.tsx

"use client";

import React, { ReactNode, useCallback, useMemo } from 'react';
import { useRecoilValue } from "recoil";
import { footerAtom } from "@/state/layoutAtoms";
import useToggleSizes from "@/hooks/layout/useToggleSizes";

interface FooterLogicProps {
    children: (props: {
        footerHeight: number;
        handleToggle: () => void;
    }) => ReactNode;
}

export function FooterLogic({ children }: FooterLogicProps) {
    const footerHeight = useRecoilValue(footerAtom);
    const { toggleSize } = useToggleSizes();

    const handleToggle = useCallback(() => {
        toggleSize('footer');
    }, [toggleSize]);

    const childrenProps = useMemo(() => ({
        footerHeight,
        handleToggle,
    }), [footerHeight, handleToggle]);

    return useMemo(() => children(childrenProps), [children, childrenProps]);
}
