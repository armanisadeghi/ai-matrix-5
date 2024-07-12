// ChatWithMessagesModal.tsx
import React from 'react';
import { Modal, Box, Space, Text } from '@mantine/core';
import AssistantMessage from '@/components/AiChat/Response/AssistantMessage';
import UserMessage from '@/components/AiChat/Response/UserMessagePaper';
import { useRecoilValueLoadable } from 'recoil';
import { activeChatWithMessagesSelector } from '@/state/aiAtoms/aiChatAtoms';

interface ChatWithMessagesModalProps {
    chatId: string;
    opened: boolean;
    onClose: () => void;
}

const ChatWithMessagesModal: React.FC<ChatWithMessagesModalProps> = ({ chatId, opened, onClose }) => {
    const chatLoadable = useRecoilValueLoadable(activeChatWithMessagesSelector);

    let content;

    switch (chatLoadable.state) {
        case 'hasValue':
            const chat = chatLoadable.contents;
            if (chat) {
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
            break;
        case 'loading':
            content = <Text>Loading...</Text>;
            break;
        case 'hasError':
            content = <Text>Error: {chatLoadable.contents.message}</Text>;
            break;
    }

    const chatTitle = chatLoadable.state === 'hasValue' && chatLoadable.contents
        ? chatLoadable.contents.chatTitle
        : 'Chat Details';

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

export default ChatWithMessagesModal;
