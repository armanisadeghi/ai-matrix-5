import ChatModalDisplay from '@/components/AiChat/ChatMenu/new/ChatModalDisplay';
import React, { useEffect, useState, useCallback } from 'react';
import { Modal } from '@mantine/core';

interface ChatDetailsModalProps {
    chatId: string;
    opened: boolean;
    onClose: () => void;
}

const ChatDetailsModal: React.FC<ChatDetailsModalProps> = ({ chatId, opened, onClose }) => {
    const [modalOpened, setModalOpened] = useState(false);

    useEffect(() => {
        if (opened && !modalOpened) {
            setModalOpened(true);
            console.log('ChatDetailsModal opened, chatId:', chatId);
        } else if (!opened && modalOpened) {
            setModalOpened(false);
        }
    }, [opened, chatId, modalOpened]);

    const handleClose = useCallback(() => {
        setModalOpened(false);
        onClose();
    }, [onClose]);

    return (
        <Modal
            opened={modalOpened}
            onClose={handleClose}
            size="xl"
            title="Take a peak..."
            transitionProps={{
                transition: 'fade',
                duration: 600,
                timingFunction: 'linear',
            }}
        >
            <ChatModalDisplay chatId={chatId} />
        </Modal>
    );
};

export default React.memo(ChatDetailsModal);
