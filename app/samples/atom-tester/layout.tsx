// app/samples/atom_tester/layout.tsx
'use client'

import React, { useEffect } from 'react';
import { ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';
import { overrideFlagAtom, presetTypeAtom } from "@/state/layoutAtoms";
import Loading from "@/app/dashboard/loading";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Box, LoadingOverlay } from "@mantine/core";

type Props = {
    children: ReactNode;
};

const LayoutContent: React.FC<{  }> = ({}) => {
    const setOverrideFlag = useSetRecoilState(overrideFlagAtom);
    const setPresetType = useSetRecoilState(presetTypeAtom);
    const {user, error, isLoading} = useUser();


    useEffect(() => {
        setOverrideFlag(true)
        setPresetType('balanced');

    }, [setPresetType]);

    if (isLoading) {
        return (
            <div className="page-layout">
                <Box pos="relative">
                    <LoadingOverlay
                        visible={true}
                        zIndex={1000}
                        overlayProps={{ radius: 'sm', blur: 2 }}
                        loaderProps={{ color: 'pink', type: 'bars' }}
                    />
                    {/* ...other content */}
                </Box>
            </div>
        );
    }


    return null;
};


const Layout: React.FC<Props> = ({children}) => {
    return (
        <>
            <LayoutContent/>
            {children}
        </>
    );
};

export default Layout;
