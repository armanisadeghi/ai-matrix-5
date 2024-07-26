// UseInPlaygroundModal.tsx
import ChatModalDisplay from '@/components/AiChat/ChatMenu/ChatModalDisplay';
import React from 'react';
import { Modal, Button, Text } from '@mantine/core';

interface UseInPlaygroundModalProps {
    chatId: string;
    opened: boolean;
    onClose: () => void;
}

const UseInPlaygroundModal: React.FC<UseInPlaygroundModalProps> = ({ chatId, opened, onClose }) => {

    const handleUseInPlayground = () => {
        // TODO: Implement logic to use chat in playground
        console.log(`Using chat ${chatId} in playground`);
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
                    <Text>Use this chat in the AI Playground:</Text>
                    <Button onClick={handleUseInPlayground} style={{ marginTop: '10px' }}>Use in Playground</Button>
                </>
        </Modal>
    );
};

export default UseInPlaygroundModal;

