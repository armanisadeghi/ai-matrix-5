// app/samples/atom_tester/layout.tsx
'use client'

import React, { ReactNode, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { overrideFlagAtom, presetTypeAtom } from "@/state/layoutAtoms";

type Props = {
    children: ReactNode;
};

const LayoutContent: React.FC<Props> = ({ children }) => {
    const setOverrideFlag = useSetRecoilState(overrideFlagAtom);
    const setPresetType = useSetRecoilState(presetTypeAtom);

    useEffect(() => {
        setOverrideFlag(true);
        setPresetType('balanced');

    }, []);

    return (
        <>
            {children}
        </>
    );
};

export default LayoutContent;
