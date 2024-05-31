// HistoryEntries.tsx
import React from 'react';
import { useAtom } from 'jotai';
import { Container, LoadingOverlay, Space } from '@mantine/core';
import { promptDataAtom } from "@/app/dashboard/intelligence/ai-chatbot/store/promptDataAtom";
import AssistantMessage from "./assistantMessage";
import UserMessage from "./userMessage";

interface HistoryEntriesProps {
    chatId: string;
}

const HistoryEntries: React.FC<HistoryEntriesProps> = ({ chatId }) => {
    const [promptData] = useAtom(promptDataAtom);

    if (!promptData || promptData.chatId !== chatId) {
        return <LoadingOverlay visible />;
    }

    return (
        <div>
            {promptData.chatHistory.map((entry, entryIndex) => (
                <div key={entryIndex}>
                    {entry.role === 'assistant' ? (
                        <AssistantMessage messageId={entry.id} />
                    ) : (
                        <UserMessage messageId={entry.id} />
                    )}
                    <Space h={10} />
                </div>
            ))}
        </div>
    );
};

export default HistoryEntries;
