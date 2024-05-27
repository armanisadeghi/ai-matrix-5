// app/dashboard/matrix-apps/layout.tsx
import React, { ReactNode } from 'react';
import DashboardPageLayout from '../layout-large-nav';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div>
        <DashboardPageLayout>{children}</DashboardPageLayout>
    </div>
);

export default Layout;
