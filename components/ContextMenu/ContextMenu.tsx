import { useContextMenu } from '@/context/ContextMenuProvider';
import React from 'react';
import { Menu, Button, Text, Divider, rem } from '@mantine/core';
import {
    IconSettings,
    IconDashboard,
    IconPhoto,
    IconMessageCircle,
    IconSearch,
    IconTrash,
    IconArrowsLeftRight,
} from '@tabler/icons-react';

// Define icon components with proper sizes
const IconDashboardStyled = <IconDashboard style={{ width: rem(14), height: rem(14) }} />;
const IconSettingsStyled = <IconSettings style={{ width: rem(14), height: rem(14) }} />;
const IconPhotoStyled = <IconPhoto style={{ width: rem(14), height: rem(14) }} />;
const IconMessageCircleStyled = <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />;
const IconSearchStyled = <IconSearch style={{ width: rem(14), height: rem(14) }} />;
const IconTrashStyled = <IconTrash style={{ width: rem(14), height: rem(14) }} />;
const IconArrowsLeftRightStyled = <IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />;

const ContextMenu: React.FC = () => {
    const { menuVisible, menuPosition, menuItems, hideMenu } = useContextMenu();

    if (!menuVisible) return null;

    return (
        <div style={{ position: 'fixed', top: menuPosition.y, left: menuPosition.x }}>
            <Menu opened={menuVisible} onClose={hideMenu} width={200} shadow="md">
                <Menu.Target>
                    <div /> {/* Dummy target, invisible, for menu positioning */}
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item leftSection={IconDashboardStyled} onClick={() => console.log('Dashboard')}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item leftSection={IconSettingsStyled} onClick={() => console.log('Settings')}>
                        Settings
                    </Menu.Item>

                    {menuItems.map((item, index) => (
                        <Menu.Item key={index} leftSection={item.icon} onClick={item.onClick}>
                            {item.label}
                        </Menu.Item>
                    ))}

                    <Divider />

                    <Menu.Label>Other actions</Menu.Label>
                    <Menu.Item leftSection={IconPhotoStyled} onClick={() => console.log('Gallery')}>
                        Gallery
                    </Menu.Item>
                    <Menu.Item
                        leftSection={IconSearchStyled}
                        rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
                        onClick={() => console.log('Search')}
                    >
                        Search
                    </Menu.Item>

                    <Divider />

                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item leftSection={IconArrowsLeftRightStyled} onClick={() => console.log('Transfer')}>
                        Transfer my data
                    </Menu.Item>
                    <Menu.Item leftSection={IconTrashStyled} color="red" onClick={() => console.log('Delete')}>
                        Delete my account
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    );
};

export default ContextMenu;
