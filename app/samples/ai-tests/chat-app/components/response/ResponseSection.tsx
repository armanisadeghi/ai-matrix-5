// chat-app/nice-working/response/ResponseSection.tsx
'use client'

import { Paper, Space, Text } from '@mantine/core';
import { iMessage } from '../../types/types';
import { ChatMessage } from './ChatMessage';

interface ResponseSectionProps {
    msgHistory: iMessage[];
    streamText: string;
}

export const ResponseSection = ({ msgHistory, streamText }: ResponseSectionProps) => {
    return (
        <Paper style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px'
        }}>
            <div style={{textAlign: 'center'}}>
                <Text size="md">Matrix Assistant</Text>
            </div>

            <Space my={16}/>

            <ul style={{
                flexGrow: 1,
                overflowY: 'auto'
            }}>
                {msgHistory.map((chatMsg, idx) => (
                    <ChatMessage key={idx} chatMsg={chatMsg} idx={idx} msgHistory={msgHistory}
                                 streamText={streamText}/>
                ))}
            </ul>
        </Paper>
    );
};

export default ResponseSection;
