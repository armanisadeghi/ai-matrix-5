// app/chat/response/AIResponse.tsx

import React from 'react';
import { Paper, Textarea } from '@mantine/core';

interface AIResponseProps {
    message: { id: string; text: string };
}

const AIResponse: React.FC<AIResponseProps> = ({ message }) => {
    return (
        <Paper
            shadow="sm"
            radius="md"
            withBorder
            p="xl"
            style={{ width: '100%', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
            <Textarea minRows={10} readOnly value={message.text} />
        </Paper>
    );
};

export default AIResponse;
