'use client'
import React, { useState, ReactNode } from 'react';
import { AppShell, ActionIcon } from '@mantine/core';
import { GoSidebarCollapse } from 'react-icons/go';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const [asideOpen, setAsideOpen] = useState(true);

    const toggleAside = () => {
        setAsideOpen(!asideOpen);
    };

    return (
        <AppShell>
            <AppShell.Aside p="md" hidden={!asideOpen}>
                <ActionIcon
                    onClick={toggleAside}
                    size="xs"
                    variant="outline"
                    style={{marginBottom: '1rem'}}
                >
                    <GoSidebarCollapse/>
                </ActionIcon>
            </AppShell.Aside>
            <header>Chat App Layout (Layout) Testing test test test Chat App Layout (Layout) Testing test test test Chat App Layout (Layout) Testing test test test Chat App Layout (Layout) Testing test test test </header>
            <main></main>
        </AppShell>
    );
};

export default Layout;
