// app/trials/layout.tsx
'use client'

import React, { useEffect } from 'react';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
        <RecoilRoot>
            <React.Suspense fallback={<div>Loading...</div>}>
                                {children}
            </React.Suspense>
        </RecoilRoot>
);

export default Layout;
