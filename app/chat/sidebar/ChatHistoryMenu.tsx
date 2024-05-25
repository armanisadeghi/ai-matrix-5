import React from 'react';
import { Menu } from '@mantine/core';
import AmeHoverMenu from '../../../ui/menus/AmeHoverMenu';

const ChatHistoryMenu: React.FC<{ placeholder: string }> = ({ placeholder }) => {
    return (
        <AmeHoverMenu placeholder={placeholder}>
            <Menu.Item>Share</Menu.Item>
            <Menu.Item>Rename</Menu.Item>
            <Menu.Item>Download</Menu.Item>
            <Menu.Item>Delete</Menu.Item>
            <Menu.Item>Use in Playground</Menu.Item>
            <Menu.Item>Use for Apps</Menu.Item>
        </AmeHoverMenu>
    );
};

export default ChatHistoryMenu;
