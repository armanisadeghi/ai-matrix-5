'use client'
import React, { ReactNode } from 'react';
import { Space } from '@mantine/core';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <main>{children}</main>
            <Space h="xl" />
            <footer>Build App Footer Here</footer>
        </div>
    );
};

export default Layout;
