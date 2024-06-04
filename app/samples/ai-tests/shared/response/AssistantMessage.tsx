// /ai-chatbot/components/response/AssistantMessage.tsx

import React from 'react';
import { useRecoilValue } from 'recoil';
import { Grid, Text } from '@mantine/core';
import { activeChatMessagesArrayAtom } from '@/context/atoms/chatAtoms';
import { MessageEntry } from '@/types/chat';
import { GiArtificialHive } from "react-icons/gi";

interface AssistantMessageProps {
    messageId: string;
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({ messageId }) => {
    const activeChatMessages = useRecoilValue(activeChatMessagesArrayAtom);
    const message: MessageEntry | undefined = activeChatMessages[parseInt(messageId)];

    if (!message) {
        return null;
    }

    return (
        <Grid>
            <Grid.Col span={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <GiArtificialHive size={22} style={{ color: 'gray' }}/>
            </Grid.Col>
            <Grid.Col span={10} style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ marginLeft: '10px' }}>
                    {message.text || "Loading..."}
                </Text>
            </Grid.Col>
        </Grid>
    );
};

export default AssistantMessage;
