// app/samples/chat-sidebar/AmeMenu.tsx

import React, { ReactNode } from 'react';
import { Menu, rem } from '@mantine/core';
import { BsPencil, BsCloudDownload } from "react-icons/bs";
import { FaShareFromSquare } from "react-icons/fa6";
import { SiXdadevelopers, SiAppstore } from "react-icons/si";
import { CiViewList } from "react-icons/ci";
import { IconTrash } from '@tabler/icons-react';

interface AmeMenuProps {
    children: ReactNode;
}

const AmeMenu: React.FC<AmeMenuProps> & { Target: React.FC<{ children: ReactNode }> } = ({ children }) => {
    return (
        <Menu
            trigger="click"
            loop={false}
            withinPortal={false}
            trapFocus={false}
            shadow="md"
            width={200}
            position="bottom-end"
        >
            {children}
            <Menu.Dropdown>
                <Menu.Item leftSection={<CiViewList style={{ width: rem(14), height: rem(14) }}/>}>
                    Peak
                </Menu.Item>
                <Menu.Item leftSection={<FaShareFromSquare style={{ width: rem(14), height: rem(14) }}/>}>
                    Share
                </Menu.Item>
                <Menu.Item leftSection={<BsPencil style={{ width: rem(14), height: rem(14) }}/>}>
                    Rename
                </Menu.Item>
                <Menu.Item leftSection={<BsCloudDownload style={{ width: rem(14), height: rem(14) }}/>}>
                    Download
                </Menu.Item>

                <Menu.Divider/>

                <Menu.Label>Pro</Menu.Label>
                <Menu.Item leftSection={<SiXdadevelopers style={{ width: rem(14), height: rem(14) }}/>}>
                    Use in Playground
                </Menu.Item>

                <Menu.Divider/>

                <Menu.Label>Premium</Menu.Label>
                <Menu.Item leftSection={<SiAppstore style={{ width: rem(14), height: rem(14) }}/>}>
                    Use for Apps
                </Menu.Item>

                <Menu.Divider/>

                <Menu.Label>Danger Zone</Menu.Label>
                <Menu.Item color="red" leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }}/>}>
                    Delete
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

const Target: React.FC<{ children: ReactNode }> = ({ children }) => (
    <Menu.Target>{children}</Menu.Target>
);

AmeMenu.Target = Target;

export default AmeMenu;
