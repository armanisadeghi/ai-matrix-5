// app/chat/sidebar/AmeChatHistoryEntry.tsx

import React from 'react';
import { ActionIcon, Paper } from '@mantine/core';
import { BsThreeDotsVertical } from 'react-icons/bs';
import AmeMenu from './AmeMenu';
import useColorUtils from '@/utils/colorUtils';
import AmeActionTextInput from '../../../../../../ui/input/AmeActionTextInput';

interface AmeHoverMenuChatProps {
    initialValue: string;
    editable?: boolean;
}

const AmeHoverMenuChat: React.FC<AmeHoverMenuChatProps> = ({
                                                               initialValue,
                                                               editable = true,
                                                           }) => {
    const {
        getDefaultBackgroundColor,
        getHoverBackgroundColor,
        getModerateTextColor
    } = useColorUtils();

    const backgroundColor = getDefaultBackgroundColor();
    const hoverBackgroundColor = getHoverBackgroundColor();
    const textColor = getModerateTextColor();

    return (
        <AmeMenu>
            <AmeMenu.Target>
                <Paper
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        cursor: 'pointer',
                        backgroundColor: backgroundColor,
                        color: textColor,
                        paddingLeft: '3px',
                        transition: 'background-color 0.3s',
                    }}
                    radius="md"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBackgroundColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = backgroundColor)}
                >
                    <AmeActionTextInput initialValue={initialValue} editable={editable} />
                    <ActionIcon variant="transparent" size="sm" style={{ cursor: 'pointer' }}>
                        <BsThreeDotsVertical />
                    </ActionIcon>
                </Paper>
            </AmeMenu.Target>
        </AmeMenu>
    );
};

export default AmeHoverMenuChat;
