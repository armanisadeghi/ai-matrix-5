// app/dashboard/layout.tsx
'use client'

import ErrorBoundary from '@/components/ErrorManagement/ErrorBoundry';
import { LayoutProvider } from '@/context/LayoutContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { MainLayout } from '@/layout';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

function Layout({children}: Props) {
    return (
        <ErrorBoundary>
            <LayoutProvider initialNavbarState="icons">
                <SidebarProvider>
                    <MainLayout>
                        {children}
                    </MainLayout>
                </SidebarProvider>
            </LayoutProvider>
        </ErrorBoundary>
    );
}

export default Layout;
