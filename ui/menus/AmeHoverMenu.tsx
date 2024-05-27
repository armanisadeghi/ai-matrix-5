import React, { useState } from 'react';
import { Menu, ActionIcon, TextInput, useMantineTheme, MantineTheme } from '@mantine/core';
import { BsThreeDotsVertical } from "react-icons/bs";

interface AmeHoverMenuProps {
    placeholder: string;
    children: React.ReactNode;
    editable?: boolean;
}

const AmeHoverMenu: React.FC<AmeHoverMenuProps> = ({ placeholder, children, editable = true }) => {
    const theme = useMantineTheme() as MantineTheme & { colorScheme: 'light' | 'dark' };
    const iconColor = theme.colorScheme === 'dark' ? theme.colors.gray[6] : theme.colors.gray[7];
    const hoverBackgroundColor = theme.colorScheme === 'dark' ? '#7c0707' : theme.colors.gray[4]; // Custom dark color

    const [isHovered, setIsHovered] = useState(false);

    return (
        <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: isHovered ? hoverBackgroundColor : 'transparent',
                        transition: 'background-color 0.3s',
                        borderRadius: '8px',
                        padding: '4px'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <TextInput
                        placeholder={placeholder}
                        variant="unstyled"
                        radius="md"
                        size="xs"
                        readOnly={!editable}
                        style={{ flexGrow: 1, transition: 'background-color 0.3s' }}
                    />
                    <ActionIcon size="sm" style={{ color: iconColor }}>
                        <BsThreeDotsVertical />
                    </ActionIcon>
                </div>
            </Menu.Target>
            <Menu.Dropdown>
                {children}
            </Menu.Dropdown>
        </Menu>
    );
};

export default AmeHoverMenu;
