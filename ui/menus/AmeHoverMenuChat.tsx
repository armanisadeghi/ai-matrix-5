// ui/menus/AmeHoverMenuChat.tsx
import React from 'react';
import AmeHoverMenu from '@/ui/menus/AmeHoverMenu';
import { Menu } from "@mantine/core";

interface AmeHoverMenuChatProps {
    placeholder: string;
}

const AmeHoverMenuChat: React.FC<AmeHoverMenuChatProps> = ({ placeholder }) => {
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

export default AmeHoverMenuChat;
