// app/dashboard/layout-small-nav.tsx
import { LayoutProvider } from '@/layout/Dual/LayoutContext';

import { ReactNode } from 'react';
import { DualLayout } from '@/layout';

type Props = {
    children: ReactNode;
};

function DualSideLayout({children}: Props) {
    return (
        <LayoutProvider initialNavbarState="compact">
            <DualLayout>
                {children}
            </DualLayout>
        </LayoutProvider>

    );
}

export default DualSideLayout;
