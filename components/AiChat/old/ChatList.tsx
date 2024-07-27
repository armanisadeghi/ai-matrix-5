/*
'use client';

import ChatSummaryEntry from '@/components/AiChat/old/ChatSummaryEntry';
import React, { useCallback, useMemo, useState } from 'react';
import { activeChatIdAtom, chatSummariesAtom, chatTransitionAtom, focusInputAtom, isNewChatAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Stack, Text, ScrollArea } from '@mantine/core';
import { IoCreateOutline } from 'react-icons/io5';
import AmeActionIcon from '@/ui/button/AmeActionIcon';
import Link from 'next/link';
import SidebarAdmin from '@/components/AiChat/Sidebar/SidebarAdmin';


const ChatSidebar: React.FC = () => {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [, setIsNewChat] = useRecoilState(isNewChatAtom);
    const [chatSelectCount, setChatSelectCount] = useState(0);
    const [newChatCount, setNewChatCount] = useState(0);
    const chatSummaries = useRecoilValue(chatSummariesAtom);
    const setTransitionState = useSetRecoilState(chatTransitionAtom);
    const setFocusInput = useSetRecoilState(focusInputAtom);

    const handleChatSelect = useCallback(
        (chatId: string, chatTitle: string) => {
            setChatSelectCount(prevCount => prevCount + 1);
            setIsNewChat(false);
            setActiveChatId(chatId);
            setTransitionState('idle')
        },
        [setIsNewChat, setActiveChatId]
    );

    const handleNewChat = useCallback(() => {
        setNewChatCount(prevCount => prevCount + 1);
        setIsNewChat(true);
        setFocusInput(true);
    }, [setIsNewChat, setActiveChatId, setFocusInput]);

    const memoizedChatEntries = useMemo(() => {
        return chatSummaries.map((chat) => (
            <Link
                key={chat.chatId}
                href={`/dashboard/intelligence/ai-chat/${encodeURIComponent(chat.chatId)}?chatTitle=${encodeURIComponent(chat.chatTitle)}`}
                prefetch={false}
                style={{ textDecoration: 'none' }}
            >
                <ChatSummaryEntry
                    chatId={chat.chatId}
                    chatTitle={chat.chatTitle}
                    isActive={chat.chatId === activeChatId}
                    onClick={() => handleChatSelect(chat.chatId, chat.chatTitle)}
                />
            </Link>
        ));
    }, [chatSummaries, activeChatId, handleChatSelect]);


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
                <Text size="xs" fw={700} style={{marginLeft: '0px', marginTop: '5px'}}>Recent Chats</Text>
                <ScrollArea h={500} scrollbarSize={4} scrollHideDelay={500}>
                    <Stack bg="var(--mantine-color-body)" align="stretch" justify="flex-start" gap="0">
                        {memoizedChatEntries}
                    </Stack>
                </ScrollArea>

                {/!* Sections will be here - 3 of them*!/}



                <ScrollArea h={500} scrollbarSize={4} scrollHideDelay={500}>
                    <SidebarAdmin chatSelectCount={chatSelectCount} newChatCount={newChatCount}/>
                </ScrollArea>
            </div>
        </Stack>
    );
};

export default ChatSidebar;
*/
