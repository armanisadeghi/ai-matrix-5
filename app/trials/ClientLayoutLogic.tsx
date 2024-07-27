// app/dashboard/ClientLayoutLogic.tsx
'use client'

import React, { ReactNode, useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { LayoutProvider } from '@/context/LayoutContext';
import ErrorBoundary from '@/components/ErrorManagement/ErrorBoundary';
import { presetTypeAtom } from '@/state/layoutAtoms';
import { AuthWrapper } from '@/components/Auth/AuthWrapper';

const LayoutGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
    const setPresetType = useSetRecoilState(presetTypeAtom);

    useEffect(() => {
        setPresetType('dashboard');
    }, []);

    return <>{children}</>;
};

export default function ClientLayoutLogic({ children }: { children: ReactNode }) {
    return (
        <ErrorBoundary>
            <RecoilRoot>
                <AuthWrapper>
                    <LayoutGuard>
                        <LayoutProvider>
                            {children}
                        </LayoutProvider>
                    </LayoutGuard>
                </AuthWrapper>
            </RecoilRoot>
        </ErrorBoundary>
    );
}
