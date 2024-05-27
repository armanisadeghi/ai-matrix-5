// app/chat/response-display/ResponseArea.tsx
import React from 'react';
import { ScrollArea, Paper, Textarea } from '@mantine/core';

interface ResponseAreaProps {
    bottomPadding: number;
}

const ResponseArea: React.FC<ResponseAreaProps> = ({ bottomPadding }) => {
    return (
        <ScrollArea style={{ flexGrow: 1, width: '95%', paddingBottom: bottomPadding }}>
            <Paper shadow="sm" radius="md" withBorder p="xl">
                <Textarea minRows={4} placeholder="Another User question Sample..." />
            </Paper>
            <Paper shadow="sm" radius="md" withBorder p="xl">
                <Textarea minRows={10} placeholder="Assistant response sample..." />
            </Paper>
        </ScrollArea>
    );
}

export default ResponseArea;
