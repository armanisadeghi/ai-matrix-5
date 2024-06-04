// /ai-chatbot/components/response/UserMessage.tsx

import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Paper, Textarea, Button, ActionIcon, Grid, Text } from '@mantine/core';
import { FiEdit2 } from "react-icons/fi";
import { activeChatMessagesArrayAtom } from '@/context/atoms/chatAtoms';
import { MessageEntry } from '@/types/chat';
import { GiArtificialHive } from "react-icons/gi";
import { LiaEditSolid } from "react-icons/lia";

interface UserMessageProps {
    messageId: string;
}

const UserNew: React.FC<UserMessageProps> = ({messageId}) => {
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
            const updatedMessage = {
                ...message,
                text: content
            };
            setActiveChatMessages(
                activeChatMessages.map((m, index) => index === parseInt(messageId) ? updatedMessage : m)
            );
            setIsEditing(false);
        }
    };

    return (
        <Paper p="md"  >
            <Grid>
                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span="auto">
                    <Text style={{marginLeft: '150px'}}>
                        {message.text || "Loading..."}
                        <ActionIcon variant="light" size="md" aria-label="Edit Message">
                            <LiaEditSolid />
                        </ActionIcon>
                    </Text>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default UserNew;
