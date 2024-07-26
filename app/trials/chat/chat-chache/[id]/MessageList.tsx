'use client';

import { Button, Stack } from '@mantine/core';
import React, { useCallback } from 'react';
import useSWR from 'swr';
import { MessageType } from '@/types';
import { fetcher } from '../fetcher';

interface MessageListProps {
    chatId: string;
}

function MessageList({ chatId }: MessageListProps) {
    const {data: messages, error} = useSWR<MessageType[]>(
        chatId ? `/api/ai-chat/messages?chatId=${chatId}` : null,
        fetcher
    );

    const handleChatSelect = useCallback(
        (id: string) => (e: React.MouseEvent) => {
            e.preventDefault();
            window.location.href = `/dashboard/intelligence/ai-chat/${chatId}/${encodeURIComponent(id)}`;
        },
        [chatId]
    );

    if (error) return <div>Failed to load</div>;
    if (!messages) return <div>Loading...</div>;

    return (
        <Stack
            h={300}
            bg="var(--mantine-color-body)"
            align="flex-start"
            justify="center"
            gap="xs"
        >

            {messages.map((message) => (
                <Button
                    key={message.id}
                    onClick={handleChatSelect(message.id)}
                >
                    {message.text}
                </Button>
            ))}
        </Stack>
    );
}

export default MessageList;
