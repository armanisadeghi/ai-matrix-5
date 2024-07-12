// components/SystemMessageComponent.tsx
'use client';

import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Textarea, Button, Space } from '@mantine/core';
import { IoCreateOutline } from 'react-icons/io5';
import { systemMessageAtom, chatMessagesSelectorFamily, activeChatIdAtom } from '@/state/aiAtoms/aiChatAtoms';

type Message = {
    role: 'user' | 'assistant' | 'system';
    text: string;
};

export const SystemMessageComponent: React.FC = () => {
    const [systemMessage, setSystemMessage] = useRecoilState(systemMessageAtom);
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const messages = useRecoilValue(chatMessagesSelectorFamily(activeChatId));

    const formattedText = messages

    //.filter(message => message.role === 'user' || message.role === 'assistant')
    //.map(message => `${message.role}: ${message.text}`)
    //.join('\n\n');

    const handleNewChat = () => {
        // Functionality to be implemented
    };

    return (
        <>
            <Textarea
                value={systemMessage}
                readOnly
                autosize
            />
            <Space h="md" />
            <Textarea
                value={formattedText}
                readOnly
                minRows={15}
                autosize
            />
            <Space h="md" />
            <Button
                leftSection={<IoCreateOutline size={14} />}
                onClick={handleNewChat}>
                New Chat
            </Button>
        </>
    );
};
