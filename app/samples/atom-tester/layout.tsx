// app/dashboard/layout.tsx
'use client';
import React, { ReactNode } from 'react';
import VerticalSplitter from '@/ui/split/VerticalSplitter';

type Props = {
    children: ReactNode;
};

function Layout({ children }: Props) {
    return (
        <VerticalSplitter initialSizes={[70, 15, 15]}>
            {/* Left section (main content) */}
            <div>
                {children}
            </div>
            {/* Right section (plain text area 1) */}
            <div>
                {/* Add your plain text content here */}
                Plain Text Area 1
            </div>
            {/* Right section (plain text area 2) */}
            <div>
                {/* Add your plain text content here */}
                Plain Text Area 2
            </div>
        </VerticalSplitter>
    );
}

export default Layout;
