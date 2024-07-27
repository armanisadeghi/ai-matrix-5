// app/chat/response/ResponseArea.tsx

import { MessageType } from '@/types';
import React from 'react';
import { ScrollArea } from '@mantine/core';
import { useResponses } from './ResponseContext';
import UserMessage from './UserMessage';
import AIResponse from './AIResponse';

interface ResponseAreaProps {
    bottomPadding: number;
}

const ResponseArea: React.FC<ResponseAreaProps> = ({ bottomPadding }) => {
    const { messages } = useResponses();

    return (
        <ScrollArea style={{ flexGrow: 1, width: '95%', paddingBottom: bottomPadding }}>
            {messages.map((message) =>
                //@ts-ignore
                message.role === 'user' ? (
                    //@ts-ignore
                    <UserMessage key={message.id} message={message} />
                ) : (
                    //@ts-ignore
                    <AIResponse key={message.id} message={message} />
                )
            )}
        </ScrollArea>
    );
};

export default ResponseArea;
