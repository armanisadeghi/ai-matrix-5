// /ai-chatbot/components/response/HistoryEntries.tsx

import React from 'react';
import { useRecoilValue } from 'recoil';
import { Container, LoadingOverlay, Space, Textarea } from '@mantine/core';
import { activeChatMessagesArrayAtom, chatTitlesAndIdsAtom } from '@/context/atoms/chatAtoms';
import AssistantMessage from '../shared/response/AssistantMessage';
import UserMessage from '../shared/response/UserMessage';
import { RoleType, MessageEntry } from '@/types/chat';

interface HistoryEntriesProps {
    chatId?: undefined | string
}

const HistoryEntries: React.FC = ({chatId}: HistoryEntriesProps) => {
    const activeChatMessages = useRecoilValue(activeChatMessagesArrayAtom);

    if (!activeChatMessages) {
        return <LoadingOverlay visible/>;
    }

    return (
        <div>
            {activeChatMessages.map((entry: MessageEntry, entryIndex: number) => (
                <div key={entryIndex}>
                    {entry.role === RoleType.assistant ? (
                        <AssistantMessage messageId={entryIndex.toString()}/>
                    ) : (
                        <UserMessage messageId={entryIndex.toString()}/>
                    )}
                    <Space h={10}/>
                </div>
            ))}
        </div>
    );
};

export default HistoryEntries;
