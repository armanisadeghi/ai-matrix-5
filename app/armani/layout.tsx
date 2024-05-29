// app/dashboard/layout-small-nav.tsx
import { LayoutProvider } from '@/context/LayoutContext';
import { MainLayout } from '@/layout';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

function DualSideLayout({children}: Props) {
    return (
        <LayoutProvider initialNavbarState="compact">
            <MainLayout>
                {children}
            </MainLayout>
        </LayoutProvider>

    );
}

export default DualSideLayout;
