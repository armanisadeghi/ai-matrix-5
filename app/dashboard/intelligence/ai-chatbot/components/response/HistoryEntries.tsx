import React, { useContext } from 'react';
import { HistoryContext } from '@/context/AiContext/HistoryContext';
import { ChatHistoryChat } from '@/types/chat';
import { Text, Container, LoadingOverlay, Space, Paper } from '@mantine/core';

interface HistoryEntriesProps {
    chatId: string;
}

const HistoryEntries: React.FC<HistoryEntriesProps> = ({chatId}) => {
    const {
        chatHistory,
        isLoading
    } = useContext(HistoryContext);

    if (isLoading) {
        return <LoadingOverlay visible/>;
    }

    return (
        <div>
            {chatHistory[chatId]?.map((entry: ChatHistoryChat, entryIndex: number) => (
                <div key={entryIndex}>
                    <Paper radius="lg" >
                        <Text>{entry.role}: {entry.content}</Text>
                    </Paper>
                    <Space h={10}/>
                </div>
            ))}
        </div>
    );
};

export default HistoryEntries;
