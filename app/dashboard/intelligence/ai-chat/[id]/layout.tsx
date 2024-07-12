// app/dashboard/intelligence/ai-chat/[id]/layout.tsx
'use client';

import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

    return (
        <>
            {children}
        </>
    );
}
