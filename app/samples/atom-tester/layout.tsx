// app/samples/atom_tester/layout.tsx
"use client";

import { overrideFlagAtom, presetTypeAtom } from "@/state/layoutAtoms";
import React, { ReactNode, useEffect } from "react";
import { useSetRecoilState } from "recoil";

type Props = {
    children: ReactNode;
};

const LayoutContent: React.FC<Props> = ({ children }) => {
    const setOverrideFlag = useSetRecoilState(overrideFlagAtom);
    const setPresetType = useSetRecoilState(presetTypeAtom);

    useEffect(() => {
        setOverrideFlag(true);
        setPresetType("balanced");
    }, []);

    return <>{children}</>;
};

export default LayoutContent;
