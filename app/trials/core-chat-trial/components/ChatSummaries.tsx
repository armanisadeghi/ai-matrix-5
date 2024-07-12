'use client';

import React from 'react';
import useChangeActiveChat from '@/app/trials/core-chat-trial/hooks/useChangeActiveChat';
import useChatSummaries from '@/app/trials/core-chat-trial/hooks/useChatSummaries';
import { activeChatIdAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useRecoilState } from 'recoil';
import { Stack, Button, Skeleton } from '@mantine/core';

type ChatSummariesProps = {
    onChatSelect: (chatId: string) => void;
};

const ChatSummaries = () => {
    const chatSummaries = useChatSummaries();
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const changeActiveChat = useChangeActiveChat();

    const handleChatSelect = (chatId: string | undefined) => {
        if (!chatId) return;
        setActiveChatId(chatId);
        changeActiveChat();
    };

    const handleStartNewChat = () => {
        setActiveChatId('new--------------------------------------------------------chat');
        changeActiveChat();
    };

    if (chatSummaries && 'loading' in chatSummaries) {
        return (
            <Stack align="stretch" justify="center" gap="xs">
                <Skeleton height={40} radius="md" />
                <Skeleton height={40} radius="md" />
                <Skeleton height={40} radius="md" />
                <Skeleton height={40} radius="md" />
                <Skeleton height={40} radius="md" />
            </Stack>
        );
    }

    return (
        <Stack align="stretch" justify="center" gap="xs">
            <Button variant="filled" color="indigo" onClick={handleStartNewChat}>Start New Chat</Button>
            {chatSummaries && chatSummaries.length > 0 && (
                chatSummaries.map(({ chatId, chatTitle }) => (
                    <Button
                        key={chatId}
                        variant={activeChatId === chatId ? 'filled' : 'light'}
                        onClick={() => handleChatSelect(chatId)}
                        fullWidth
                    >
                        {chatTitle}
                    </Button>
                ))
            )}
        </Stack>
    );
};

export default ChatSummaries;
