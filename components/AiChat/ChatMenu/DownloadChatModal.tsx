// DownloadChatModal.tsx
import ChatModalDisplay from '@/components/AiChat/ChatMenu/ChatModalDisplay';
import { useChatApi } from '@/hooks/ai/useChatApi';
import { chatWithMessagesSelector } from '@/state/aiAtoms/aiChatAtoms';
import React from 'react';
import { Modal, Button, Text } from '@mantine/core';
import { useChatMessages } from '@/hooks/ai/useChatMessages';
import { ChatType, MessageType } from '@/types';
import { useRecoilValue } from 'recoil';

interface DownloadChatModalProps {
    chatId: string;
    opened: boolean;
    onClose: () => void;
}

const DownloadChatModal: React.FC<DownloadChatModalProps> = ({ chatId, opened, onClose }) => {
    const chatWithMessages = useRecoilValue(chatWithMessagesSelector(chatId));
    const chatTitle = chatWithMessages?.chatTitle;
    const textContent = chatWithMessages?.messages.map(msg => `${msg.role}: ${msg.text}`).join('\n\n');

    const handleDownload = () => {
        if (!textContent) return;
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${chatTitle}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="xl"
            title="Download this chat..."
            transitionProps={{
                transition: 'fade',
                duration: 600,
                timingFunction: 'linear',
            }}
        >
            <>
                <ChatModalDisplay chatId={chatId}/>
                    <Text>Download this chat as a text file:</Text>
                    <Button onClick={handleDownload} style={{ marginTop: '10px' }}>Download Chat</Button>
                </>
        </Modal>
    );
};

export default DownloadChatModal;

