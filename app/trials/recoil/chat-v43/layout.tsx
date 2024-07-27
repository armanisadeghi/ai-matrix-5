'use client'

import LoadingPage from '@/app/trials/loading';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { ReactNode } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import ErrorBoundary from '@/components/ErrorManagement/ErrorBoundary';
import { PresetType } from '@/context/atoms/layoutAtoms';
import { useUser } from '@auth0/nextjs-auth0/client';
import { overrideFlagAtom, presetTypeAtom } from '@/state/layoutAtoms';


type Props = {
    children: ReactNode;
    preset: PresetType;
};

const LayoutGuard: React.FC<{ children: ReactNode }> = ({children}) => {
    const {user} = useUser();
    const [, setPresetType] = useRecoilState(presetTypeAtom);
    const [, setOverrideFlag] = useRecoilState(overrideFlagAtom);

    useLayoutEffect(() => {
        setOverrideFlag(true);
        setPresetType('minimalNav');  // Something is wrong with this.
    }, []);



    return <>{children}</>;
};

function Layout({children, preset}: Props) {
    return (
        <ErrorBoundary>
            <RecoilRoot>
                <LayoutGuard>
                    {children}
                </LayoutGuard>
            </RecoilRoot>
        </ErrorBoundary>
    );
}

export default Layout;
