'use client';

import { Button, Stack } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import { useRecoilValue } from 'recoil';
import { activeUserAtom } from '@/state/userAtoms';
import { ChatType } from '@/types';
import { fetcher } from './fetcher';
import Link from 'next/link';

function ChatList() {
    const {matrixId} = useRecoilValue(activeUserAtom);
    const {data: chats, error} = useSWR<ChatType[]>(
        matrixId ? `/api/ai-chat/chats?matrixId=${matrixId}` : null,
        fetcher
    );

    if (error) return <div>Failed to load</div>;
    if (!chats) return <div>Loading...</div>;

    return (
        <Stack
            h={300}
            bg="var(--mantine-color-body)"
            align="flex-start"
            justify="center"
            gap="xs"
        >
            {chats.map((chat) => (
                <Link
                    key={chat.chatId}
                    href={`/trials/chat-cache/${encodeURIComponent(chat.chatId)}?chatTitle=${encodeURIComponent(chat.chatTitle)}`}
                    passHref
                    style={{ textDecoration: 'none' }}
                >
                    <Button component="a">
                        {chat.chatTitle}
                    </Button>
                </Link>
            ))}
        </Stack>
    )
}

export default ChatList;
