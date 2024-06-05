import React, { ReactNode, useState, MouseEvent } from 'react';
import { ActionIcon, Paper } from '@mantine/core';
import { BsThreeDotsVertical } from 'react-icons/bs';
import AmeMenu from './AmeMenu';
import useColorUtils from '@/utils/colorUtils';
import AmeActionTextInput from '../../ui/input/AmeActionTextInput';
import { useRecoilState, useRecoilValue } from "recoil";
import { activeUserAtom } from "@/context/atoms/userAtoms";
import { activeChatIdAtom, activeChatMessagesArrayAtom } from "@/app/samples/ai-tests/shared/atoms/chatAtoms";

interface AmeHoverMenuChatProps {
    initialValue: string;
    editable?: boolean;
    keyProp: string;
    context?: React.Context<any>;
    onPeak?: () => void;
    onShare?: () => void;
    onRename?: () => void;
    onDownload?: () => void;
    onUseInPlayground?: () => void;
    onUseForApps?: () => void;
    onDelete?: () => void;
    onClick?: () => void; // New prop for onClick event
}

const AmeHoverMenuChat: React.FC<AmeHoverMenuChatProps> = (
    {
        initialValue, // Pass this value as the text for "on peak" action
        editable = true,
        keyProp,
        context,
        onPeak,
        onShare,
        onRename,
        onDownload,
        onUseInPlayground,
        onUseForApps,
        onDelete,
        onClick // New prop for onClick event
    }) => {
    const {
        getDefaultBackgroundColor,
        getHoverBackgroundColor,
        getModerateTextColor
    } = useColorUtils();

    const backgroundColor = getDefaultBackgroundColor();
    const hoverBackgroundColor = getHoverBackgroundColor();
    const textColor = getModerateTextColor();

    const showConversationDetails = (chatId: string) => {
        console.log(`${chatId} - Conversation details`);
        if (onPeak) {
            onPeak();
        }
    };

    const [currentChatId, setCurrentChatId] = useRecoilState(activeChatIdAtom);
    const activeUser = useRecoilValue(activeUserAtom);
    const [messages, setMessages] = useRecoilState(activeChatMessagesArrayAtom);

    const [menuOpened, setMenuOpened] = useState(false);

    const handlePaperClick = () => {
        if (activeUser) {
            setCurrentChatId(keyProp);
            fetch(`/api/chats?user_id=${activeUser.id}&chat_id=${keyProp}`)
                .then(res => res.json())
                .then(data => {
                    setMessages(data);
                });
        }
    };

    const handleIconClick = (event: MouseEvent) => {
        event.stopPropagation();
        setMenuOpened((prev) => !prev);
    };

    const handleCloseMenu = () => {
        setMenuOpened(false);
    };

    return (
        <AmeMenu
            key={keyProp}
            initialValue={initialValue} // Pass initialValue to AmeMenu
            onPeak={() => showConversationDetails(initialValue)} // Pass initialValue to showConversationDetails
            context={context}
            onShare={onShare}
            onRename={onRename}
            onDownload={onDownload}
            onUseInPlayground={onUseInPlayground}
            onUseForApps={onUseForApps}
            onDelete={onDelete}
            open={menuOpened} // Control menu open state
            onClose={handleCloseMenu} // Handle menu close
        >
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
                    onClick={handlePaperClick} // Add onClick event to trigger setCurrentChatId and fetch messages
                >
                    <AmeActionTextInput initialValue={initialValue} editable={editable}/>
                    <ActionIcon variant="transparent" size="sm" style={{cursor: 'pointer'}} onClick={handleIconClick}>
                        <BsThreeDotsVertical/>
                    </ActionIcon>
                </Paper>
            </AmeMenu.Target>
        </AmeMenu>
    );
};

export default AmeHoverMenuChat;
