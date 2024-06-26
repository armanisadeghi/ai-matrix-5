// chat-app/nice-working/response/ResponseArea.tsx

import React from 'react';
import { ScrollArea } from '@mantine/core';
import { useResponses } from '../../../../../../context/AiContext/ResponseContext';
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
                message.type === 'user' ? (
                    <UserMessage key={message.id} message={message} />
                ) : (
                    <AIResponse key={message.id} message={message} />
                )
            )}
        </ScrollArea>
    );
};

export default ResponseArea;
