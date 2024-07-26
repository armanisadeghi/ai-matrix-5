// ShareChatModal.tsx
import React from 'react';
import { Modal, Button, Text } from '@mantine/core';
import ChatModalDisplay from '@/components/AiChat/ChatMenu/ChatModalDisplay';


interface ShareChatModalProps {
    chatId: string;
    opened: boolean;
    onClose: () => void;
}

const ShareChatModal: React.FC<ShareChatModalProps> = ({chatId, opened, onClose}) => {

    const handleShare = async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            alert('URL copied to clipboard');
            onClose();
        }
        catch (err) {
            console.error('Failed to copy URL', err);
        }
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
                <Text>Share this chat by copying the URL:</Text>
                <Button onClick={handleShare} style={{marginTop: '10px'}}>Copy URL to Clipboard</Button>
            </>
        </Modal>
    );
};

export default ShareChatModal;
