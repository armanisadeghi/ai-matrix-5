import ChatModalDisplay from '@/components/AiChat/ChatMenu/new/ChatModalDisplay';
import AssistantMessage from '@/components/AiChat/Response/AssistantMessage';
import UserMessagePaper from '@/components/AiChat/Response/UserMessagePaper';
import UserMessage from '@/components/AiChat/Response/UserMessagePaper';
import { useChatApi } from '@/hooks/ai/useChatApi';
import { chatWithMessagesSelector } from '@/state/aiAtoms/aiChatAtoms';
import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button, Text, Box, Space } from '@mantine/core';
import { useChatMessages } from '@/hooks/ai/useChatMessages';
import { ChatType, MessageType } from '@/types';
import { useRecoilValue } from 'recoil';


interface RenameChatModalProps {
    chatId: string;
    opened: boolean;
    onClose: () => void;
}

const RenameChatModal: React.FC<RenameChatModalProps> = ({chatId, opened, onClose}) => {
    const chatWithMessages = useRecoilValue(chatWithMessagesSelector(chatId));
    const chatTitle = chatWithMessages?.chatTitle;
    const {updateTitle,} = useChatApi();
    const [newTitle, setNewTitle] = useState('');
    const [currentTitle, setCurrentTitle] = useState('Chat Details');

    useEffect(() => {
        if (chatTitle) {
            setCurrentTitle(chatTitle);
        }
    }, [chatTitle]);

    console.log('RenameChatModal chatId', chatId);

    const handleRename = async () => {
        await updateTitle(chatId, newTitle);
        console.log(`Renaming chat ${chatId} to ${newTitle}`);
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="xl"
            title="Take a peak..."
            transitionProps={{
                transition: 'fade',
                duration: 600,
                timingFunction: 'linear',
            }}
        >
            <>
                <ChatModalDisplay chatId={chatId}/>
                <TextInput
                    label="New Chat Title"
                    placeholder="Enter new chat title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.currentTarget.value)}
                />
                <Button onClick={handleRename} style={{marginTop: '10px'}}>Rename</Button>


            </>
        </Modal>
    );
};

export default RenameChatModal;
