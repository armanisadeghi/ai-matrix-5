'use client'

import React from 'react';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from '@/components/ErrorManagement/ErrorBoundary';
import { PresetType } from '@/context/atoms/layoutAtoms';


type Props = {
    children: ReactNode;
    preset: PresetType;
};

const LayoutGuard: React.FC<{ children: ReactNode }> = ({children}) => {

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
