// ChatWithMessagesModal.tsx
import React from 'react';
import { Modal, Box, Space, Text } from '@mantine/core';
import AssistantMessage from '@/components/AiChat/Response/AssistantMessage';
import UserMessage from '@/components/AiChat/Response/UserMessagePaper';
import { useActiveChatWithMessages } from '@/hooks/ai/new/useActiveChatWithMessages';

interface ChatDetailsModalProps {
    opened: boolean;
    onClose: () => void;
}

const ChatDetailsModal: React.FC<ChatDetailsModalProps> = ({ opened, onClose }) => {
    const { chat, isLoading, error } = useActiveChatWithMessages();

    let content;

    if (isLoading) {
        content = <Text>Loading...</Text>;
    } else if (error) {
        content = <Text>Error: {error.message}</Text>;
    } else if (chat) {
        const filteredMessages = chat.messages.filter(
            message => message.role === 'user' || message.role === 'assistant'
        );
        content = (
            <Box>
                {filteredMessages.length === 0 ? (
                    <Text>No messages found.</Text>
                ) : (
                    filteredMessages.map((message, index) => (
                        <div key={index}>
                            {message.role === 'assistant' ? (
                                <AssistantMessage text={message.text} />
                            ) : (
                                <UserMessage text={message.text} />
                            )}
                            <Space h={10} />
                        </div>
                    ))
                )}
            </Box>
        );
    } else {
        content = <Text>No chat found.</Text>;
    }

    const chatTitle = chat ? chat.chatTitle : 'Chat Details';

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="xl"
            title={chatTitle}
            transitionProps={{
                transition: 'fade',
                duration: 600,
                timingFunction: 'linear'
            }}
        >
            {content}
        </Modal>
    );
};

export default ChatDetailsModal;
