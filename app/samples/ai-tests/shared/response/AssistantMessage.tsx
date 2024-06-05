import React from 'react';
import { useRecoilValue } from 'recoil';
import { Grid, Text } from '@mantine/core';
import { MessageEntry } from '@/types/chat';
import { GiArtificialHive } from "react-icons/gi";
import { activeChatMessagesArrayAtom } from "@/app/samples/ai-tests/shared/atoms/chatAtoms";

interface AssistantMessageProps {
    entryIndex?: string;
    text?: string;  // Add this prop for direct text
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({ entryIndex, text }) => {
    const activeChatMessages = useRecoilValue(activeChatMessagesArrayAtom);
    const message: MessageEntry | undefined = entryIndex ? activeChatMessages[parseInt(entryIndex)] : { text: text || "", role: 'assistant' };

    if (!message) {
        return null;
    }

    return (
        <Grid>
            <Grid.Col span={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <GiArtificialHive size={22} style={{ color: 'gray' }} />
            </Grid.Col>
            <Grid.Col span={10} style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ marginLeft: '10px' }}>{message.text || "Loading..."}</Text>
            </Grid.Col>
        </Grid>
    );
};

export default AssistantMessage;
