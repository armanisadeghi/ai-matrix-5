// app/chat/UserMessage.tsx

'use client';
import { Paper, Text } from '@mantine/core';
import AmeCollapse from "@/ui/collapse/AmeCollapse";


interface UserMessageProps {
    content: string;
}
const UserMessage: React.FC<UserMessageProps> = ({ content }) => {
    return (
        <div style={{ width: '60%', marginLeft: 'auto' }}>
            <AmeCollapse
                activatorLabel=""
                hiddenText={content}
                width={600}
                justify='right'
            />
        </div>
    );
};


export default UserMessage;


/*
const UserMessage: React.FC<UserMessageProps> = ({ content }) => {
    return (
        <div style={{ width: '60%', marginLeft: 'auto' }}>
            <Paper
                shadow="sm"
                radius="lg"
                p="xl"
                withBorder={false}
                onMouseEnter={(e) => (e.currentTarget.style.border = '1px solid')}
                onMouseLeave={(e) => (e.currentTarget.style.border = '')}
            >
                <Text>{content}</Text>
            </Paper>
        </div>
    );
};

 */
