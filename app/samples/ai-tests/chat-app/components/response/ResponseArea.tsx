// chat-app/nice-working/response/ResponseArea.tsx

import { ScrollArea } from '@mantine/core';
import { useResponses } from '../../../response/ResponseContext';
import AIResponse from './AIResponse';
import UserMessage from './UserMessage';
import React from "react";

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
