// layout/Main/Sidebar/Sidebar.tsx
'use client';

import { ActionIcon } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useSidebar } from '@/context/SidebarContext';

type SidebarProps = {
    asideWidth: number;
};

const Sidebar = ({ asideWidth }: SidebarProps) => {
    const { asideOpen, toggleAside, sidebarContent } = useSidebar();
    const adjustedWidth = asideOpen ? asideWidth : 25;

    return (
        <aside>
            {asideOpen && (
                <>
                    {sidebarContent}
                    <ActionIcon onClick={toggleAside} style={{
                        position: 'absolute',
                        top: '50%',
                        right: adjustedWidth - 27,
                        transform: 'translateY(-50%)'
                    }}>
                        <IconChevronRight size={12}/>
                    </ActionIcon>
                </>
            )}
            {!asideOpen && (
                <ActionIcon
                    onClick={toggleAside}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: adjustedWidth,
                        transform: 'translateY(-50%)'
                    }}>
                    <IconChevronLeft size={12}/>
                </ActionIcon>
            )}
        </aside>
    );
};

export default Sidebar;
