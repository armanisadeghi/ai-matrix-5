'use client';

import React, { useState, MouseEvent, useCallback } from 'react';
import AmeChatMenu from '@/components/AiChat/ChatMenu/AmeChatMenu';
import { ActionIcon, Flex } from '@mantine/core';
import { BsThreeDotsVertical } from 'react-icons/bs';
import useColorUtils from '@/utils/colorUtils';
import AmeActionTextInput from '@/ui/input/AmeActionTextInput';


interface ChatSummaryEntryProps {
    chatId: string;
    chatTitle: string;
    isActive: boolean;
    onClick: () => void;
    editable?: boolean;
}

const ChatSidebarEntry: React.FC<ChatSummaryEntryProps> = React.memo(
    ({chatId, chatTitle, isActive, onClick, editable = false}) => {
        const {getDefaultBackgroundColor, getHoverBackgroundColor, getModerateTextColor} = useColorUtils();

        const backgroundColor = getDefaultBackgroundColor();
        const hoverBackgroundColor = getHoverBackgroundColor();
        const textColor = getModerateTextColor();
        const [menuOpened, setMenuOpened] = useState(false);
        const [hovered, setHovered] = useState(false);

        const handleIconClick = useCallback((event: MouseEvent) => {
            event.stopPropagation();
            event.preventDefault();
            setMenuOpened((prev) => !prev);
        }, []);

        const handleCloseMenu = useCallback(() => {
            setMenuOpened(false);
            setHovered(false);
        }, []);

        const handleMouseEnter = useCallback(() => setHovered(true), []);
        const handleMouseLeave = useCallback(() => setHovered(false), []);

        const handleItemClick = useCallback(() => {
            setHovered(false);
            setMenuOpened(false);
        }, []);

        return (
            <Flex
                mih={0}
                gap="0"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="nowrap"
                style={{width: '100%', margin: '0', padding: '0'}}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
            >
                <div style={{display: 'flex', alignItems: 'center', width: '100%', backgroundColor: hovered ? hoverBackgroundColor : backgroundColor, color: textColor, transition: 'background-color 0.3s', borderRadius: '2px', padding: '0 5px', position: 'relative'}}>
                    <div style={{flexGrow: 1, cursor: 'pointer', padding: '0', margin: '0'}}>
                        <AmeActionTextInput
                            initialValue={chatTitle}
                            editable={editable}
                            variant={'unstyled'}
                            style={{
                                ...(isActive ? {fontWeight: 'bold'} : {}),
                                textDecoration: 'none',
                                padding: '0',
                            }}
                            highlightOnClick={false}
                        />
                    </div>
                    {hovered && (
                        <AmeChatMenu
                            chatId={chatId}
                            open={menuOpened}
                            onClose={handleCloseMenu}
                            onItemClick={handleItemClick}
                        >
                            <AmeChatMenu.Target>
                                <ActionIcon
                                    variant="transparent"
                                    size="xs"
                                    style={{cursor: 'pointer', position: 'absolute', right: 0}}
                                    onClick={handleIconClick}
                                >
                                    <BsThreeDotsVertical/>
                                </ActionIcon>
                            </AmeChatMenu.Target>
                        </AmeChatMenu>
                    )}
                </div>
            </Flex>
        );
    }
);

export default ChatSidebarEntry;
