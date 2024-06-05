// UserMessage.tsx
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Paper, Textarea, Button, ActionIcon } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { promptDataAtom } from "@/app/dashboard/intelligence/ai-chatbot/store/promptDataAtom";

const UserMessage: React.FC<{ messageId: number }> = ({ messageId }) => {
    const [promptData, setPromptData] = useAtom(promptDataAtom);
    const message = promptData.chatHistory.find(m => m.id === messageId);
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(message?.content || '');

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (message) {
            const updatedMessage = { ...message, content };
            setPromptData({
                ...promptData,
                chatHistory: promptData.chatHistory.map(m => m.id === messageId ? updatedMessage : m)
            });
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
