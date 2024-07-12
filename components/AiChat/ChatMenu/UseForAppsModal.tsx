// UseForAppsModal.tsx
import ChatModalDisplay from '@/components/AiChat/ChatMenu/new/ChatModalDisplay';
import React from 'react';
import { Modal, Button, Text } from '@mantine/core';

interface UseForAppsModalProps {
    chatId: string;
    opened: boolean;
    onClose: () => void;
}

const UseForAppsModal: React.FC<UseForAppsModalProps> = ({ chatId, opened, onClose }) => {

    const handleUseForApps = () => {
        // TODO: Implement logic to use chat for apps
        console.log(`Using chat ${chatId} for apps`);
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
                    <Text>Use this chat for AI-powered apps:</Text>
                    <Button onClick={handleUseForApps} style={{ marginTop: '10px' }}>Use for Apps</Button>
                </>
        </Modal>
    );
};

export default UseForAppsModal;
