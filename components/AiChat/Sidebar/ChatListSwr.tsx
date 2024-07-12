'use client';
import SidebarAdmin from '@/components/AiChat/Sidebar/SidebarAdmin';
import React, { useCallback, useMemo, useState } from 'react';
import { useStartNewChat } from '@/hooks/ai/old/useStartNewChat';
import useSWR from 'swr';
import { fetcher } from '@/app/trials/chat-cache/fetcher';
import { activeChatIdAtom, isNewChatAtom } from '@/state/aiAtoms/aiChatAtoms';
import { activeUserAtom } from '@/state/userAtoms';
import { ChatType } from '@/types';
import { Stack, Text, ScrollArea, LoadingOverlay } from '@mantine/core';
import { IoCreateOutline } from 'react-icons/io5';
import ChatSummaryEntry from '@/components/AiChat/Sidebar/ChatSummaryEntry';
import AmeActionIcon from '@/ui/button/AmeActionIcon';
import { useRecoilState, useRecoilValue } from 'recoil';
import Link from 'next/link';


const ChatListSwr: React.FC = () => {
    const {matrixId} = useRecoilValue(activeUserAtom);
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [isNewChat, setIsNewChat] = useRecoilState(isNewChatAtom);
    const {startNewChat} = useStartNewChat();
    const [chatSelectCount, setChatSelectCount] = useState(0);
    const [newChatCount, setNewChatCount] = useState(0);

    const {data: chats, error} = useSWR<ChatType[]>(
        matrixId ? `/api/ai-chat/chats?matrixId=${matrixId}` : null,
        fetcher
    );

    const handleChatSelect = useCallback(
        (chatId: string, chatTitle: string) => {
            setChatSelectCount(prevCount => prevCount + 1);
            setIsNewChat(false);
            setActiveChatId(chatId);
        },
        [setIsNewChat, setActiveChatId]
    );

    const handleNewChat = useCallback(() => {
        setNewChatCount(prevCount => prevCount + 1);
        setIsNewChat(true);
        const newChatId = startNewChat();
        setActiveChatId(newChatId);
    }, [startNewChat, setIsNewChat, setActiveChatId]);


    const memoizedChatEntries = useMemo(() => {
        return chats?.map(({chatId, chatTitle}, index) => (
            <Link
                key={chatId}
                href={`/dashboard/intelligence/ai-chat/${encodeURIComponent(chatId)}?chatTitle=${encodeURIComponent(chatTitle)}`}
                prefetch={index < 5}
                style={{textDecoration: 'none'}}
            >
                <ChatSummaryEntry
                    chatId={chatId}
                    chatTitle={chatTitle}
                    isActive={chatId === activeChatId}
                    onClick={() => handleChatSelect(chatId, chatTitle)}
                />
            </Link>
        ));
    }, [chats, activeChatId, handleChatSelect]);

    if (error) return <div>Failed to load chats</div>;

    return (
        <Stack bg="var(--mantine-color-body)" align="stretch" justify="flex-start" gap="0">
            <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '10px'}}>
                <Link href="/dashboard/intelligence/ai-chat/matrix-ai" passHref>
                    <AmeActionIcon title="New Chat" onClick={handleNewChat}>
                        <IoCreateOutline size={18}/>
                    </AmeActionIcon>
                </Link>
            </div>
            <div style={{position: 'relative', height: '100%'}}>
                {!chats && (
                    <LoadingOverlay
                        visible={true}
                        zIndex={1000}
                        overlayProps={{radius: 'sm', blur: 1}}
                        loaderProps={{color: 'pink', type: 'bars'}}
                    />
                )}
                <Text size="xs" fw={700} style={{marginLeft: '0px', marginTop: '5px'}}>Recent Chats</Text>
                <ScrollArea h={500} scrollbarSize={4} scrollHideDelay={500}>
                    <Stack bg="var(--mantine-color-body)" align="stretch" justify="flex-start" gap="0">
                        {memoizedChatEntries}
                    </Stack>
                </ScrollArea>
                <ScrollArea h={500} scrollbarSize={4} scrollHideDelay={500}>
                    <SidebarAdmin chatSelectCount={chatSelectCount} newChatCount={newChatCount}/>
                </ScrollArea>
            </div>
        </Stack>
    );
};

export default ChatListSwr;
