// /ai-chatbot/components/response/UserMessage.tsx

import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Paper, Textarea, Button, ActionIcon, Grid, Text } from '@mantine/core';
import { MessageEntry } from '@/types/chat';
import { LiaEditSolid } from "react-icons/lia";
import { FiEdit2 } from "react-icons/fi";
import { GiArtificialHive } from "react-icons/gi";
import { activeChatMessagesArrayAtom } from "@/app/samples/ai-tests/shared/servicees/chatAtoms";


interface UserMessageProps {
    entryIndex: string;
}

const UserMessage: React.FC<UserMessageProps> = ({entryIndex}) => {
    const [activeChatMessages, setActiveChatMessages] = useRecoilState(activeChatMessagesArrayAtom);
    const message: MessageEntry | undefined = activeChatMessages[parseInt(entryIndex)];
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
                activeChatMessages.map((m, index) => index === parseInt(entryIndex) ? updatedMessage : m)
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

export default UserMessage;
