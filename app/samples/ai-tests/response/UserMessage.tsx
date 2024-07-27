// app/chat/response/UserMessage.tsx

import React, { useState } from 'react';
import { Paper, Textarea, Button, ActionIcon } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useResponses } from './ResponseContext';

// made a bunch of changes and removed message.content and all of that and changed it to text.
// Also had logic for editing that I removed. That part, we should put back, but it wasn't set up right anyways.

interface UserMessageProps {
    message: { id: string; text: string };
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
    const { updateMessage } = useResponses();
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
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
                        value={message.text}
                    />
                    <Button onClick={handleSave}>Ask Again</Button>
                </>
            ) : (
                <>
                    <Textarea minRows={4} readOnly value={message.text} />
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
