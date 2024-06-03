import React from 'react';
import { Grid, Text } from '@mantine/core';
import { GiArtificialHive } from 'react-icons/gi';
import { MessageEntry } from '@/armaniLocal/org/types/chatData';

interface AssistantMessageProps {
    message: MessageEntry;
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({ message }) => {
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
