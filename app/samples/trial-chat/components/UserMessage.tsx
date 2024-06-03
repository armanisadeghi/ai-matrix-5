import React, { useState } from 'react';
import { Paper, Textarea, Button, ActionIcon } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { MessageEntry } from '@/armaniLocal/org/types/chatData';

interface UserMessageProps {
    message: MessageEntry;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(message.text);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        // Update the message content (you might want to update the state or call an API here)
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
