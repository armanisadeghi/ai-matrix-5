// app/dashboard/layout-small-nav.tsx

import { ReactNode } from 'react';
import { AppsLayout } from '@/layout';

type Props = {
    children: ReactNode;
};

function SmallSidebarLayout({ children }: Props) {
    return (
        <AppsLayout>
            {children}
        </AppsLayout>
    );
}

export default SmallSidebarLayout;
