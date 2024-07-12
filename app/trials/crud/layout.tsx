import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (

    <div>
        <main>{children}</main>
    </div>
);

export default Layout;
