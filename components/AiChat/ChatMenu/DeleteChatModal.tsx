// DeleteChatModal.tsx
import ChatModalDisplay from '@/components/AiChat/ChatMenu/new/ChatModalDisplay';
import { chatSelectorFamily } from '@/state/aiAtoms/aiChatAtoms';
import React, { useCallback } from 'react';
import { Modal, Button, Text } from '@mantine/core';
import { useChatApi } from '@/hooks/ai/useChatApi';
import { useRecoilValue } from 'recoil';


interface DeleteChatModalProps {
    chatId: string;
    opened: boolean;
    onClose: () => void;
}

const DeleteChatModal: React.FC<DeleteChatModalProps> = ({chatId, opened, onClose}) => {
    const {deleteChat} = useChatApi();

    const handleDelete = useCallback(async () => {
        try {
            await deleteChat(chatId);
            console.log(`Deleted chat ${chatId}`);
            onClose();
        }
        catch (error) {
            console.error('Error deleting chat:', error);
        }
    }, [chatId, deleteChat, onClose]);

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="xl"
            title="Do you want to delete this chat?"
            transitionProps={{
                transition: 'fade',
                duration: 600,
                timingFunction: 'linear',
            }}
        >
            <>
                <ChatModalDisplay chatId={chatId}/>
                <Text size="lg"
                      variant="gradient"
                      gradient={{from: 'blue', to: 'red', deg: 0}}

                >Are you sure you want to delete this chat?</Text>
                <Text size="sm">This action cannot be undone.</Text>
                <Button color="red" onClick={handleDelete} style={{marginTop: '10px'}}>Delete Chat</Button>
            </>

        </Modal>
    );
};

export default DeleteChatModal;
