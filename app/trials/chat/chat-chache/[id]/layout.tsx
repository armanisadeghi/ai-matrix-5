// app/trials/chat-cache/[id]/layout.tsx

import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <>
        {children}
    </>
);

export default Layout;
