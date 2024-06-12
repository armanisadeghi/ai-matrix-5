// app/trials/layout.tsx
'use client'

import React, { useEffect } from 'react';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { DynamicSocketProvider } from "@/context/AiContext/socketContext";

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
        <RecoilRoot>
            <React.Suspense fallback={<div>Loading...</div>}>
                    <DynamicSocketProvider>
                                {children}
                    </DynamicSocketProvider>
            </React.Suspense>
        </RecoilRoot>
);

export default Layout;
