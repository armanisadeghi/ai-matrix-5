// AssistantMessage.tsx
import React from 'react';
import { useAtom } from 'jotai';
import { Grid, Text } from '@mantine/core';
import { GiArtificialHive } from "react-icons/gi";
import { promptDataAtom } from "@/app/dashboard/intelligence/ai-chatbot/store/promptDataAtom";

const AssistantMessage: React.FC<{ messageId: number }> = ({ messageId }) => {
    const [promptData] = useAtom(promptDataAtom);
    const message = promptData.chatHistory.find(m => m.id === messageId && m.role === 'assistant');

    return (
        <Grid>
            <Grid.Col span={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <GiArtificialHive size={22} style={{ color: 'gray' }}/>
            </Grid.Col>
            <Grid.Col span={10} style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ marginLeft: '10px' }}>
                    {message?.content || "Loading..."}
                </Text>
            </Grid.Col>
        </Grid>
    );
};

export default AssistantMessage;
