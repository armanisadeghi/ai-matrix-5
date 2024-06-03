// chat-app/components/response/UserMessage.tsx

import React, { useState } from 'react';
import { Paper, Textarea, Button, ActionIcon } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useResponses } from '../../../../../../context/AiContext/ResponseContext';

interface UserMessageProps {
    message: { id: string; content: string };
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
    const { updateMessage } = useResponses();
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(message.content);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateMessage(message.id, content);
        setIsEditing(false);
    };

    return (
        <Paper
            shadow="sm"
            radius="md"
            withBorder
            p="xl"
            style={{
                width: '80%',
                marginLeft: '20%',
                position: 'relative',
                transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
            {isEditing ? (
                <>
                    <Textarea
                        minRows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Button onClick={handleSave}>Ask Again</Button>
                </>
            ) : (
                <>
                    <Textarea minRows={4} readOnly value={message.content} />
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
