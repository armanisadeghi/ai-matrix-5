// /ai-chatbot/components/response/UserMessage.tsx

import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Paper, Textarea, Button, ActionIcon } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { activeChatMessagesArrayAtom } from '@/context/atoms/chatAtoms';
import { MessageEntry } from '@/types/chat';

interface UserMessageProps {
    messageId: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ messageId }) => {
    const [activeChatMessages, setActiveChatMessages] = useRecoilState(activeChatMessagesArrayAtom);
    const message: MessageEntry | undefined = activeChatMessages[parseInt(messageId)];
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(message?.text || '');

    if (!message) {
        return null;
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (message) {
            const updatedMessage = { ...message, text: content };
            setActiveChatMessages(
                activeChatMessages.map((m, index) => index === parseInt(messageId) ? updatedMessage : m)
            );
            setIsEditing(false);
        }
    };

    return (
        <Paper shadow="sm" radius="md" withBorder p="xl" style={{
            width: '80%',
            marginLeft: '20%',
            position: 'relative',
            transition: 'transform 0.2s',
            transform: isEditing ? 'scale(1.05)' : 'none'
        }}>
            {isEditing ? (
                <>
                    <Textarea
                        minRows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Button onClick={handleSave}>Save</Button>
                </>
            ) : (
                <>
                    <Textarea
                        minRows={4}
                        readOnly
                        value={content}
                    />
                    <ActionIcon
                        variant="transparent"
                        style={{ position: 'absolute', top: 10, right: 10 }}
                        onClick={handleEdit}
                    >
                        <IconEdit />
                    </ActionIcon>
                </>
            )}
        </Paper>
    );
};

export default UserMessage;
