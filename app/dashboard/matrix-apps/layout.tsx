// app/dashboard/matrix-apps/layout.tsx
'use client';

import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div>
        {children}
    </div>
);

export default Layout;
