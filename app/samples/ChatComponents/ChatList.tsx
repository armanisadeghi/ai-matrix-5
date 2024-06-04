import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ChatSidebarListAtom } from "@/context/atoms/chatAtoms";
import AmeChatHistoryEntry from '@/components/AiChat/AmeChatHistoryEntry';
import { Space, Stack, Text } from '@mantine/core';

interface ChatData {
    chatId: string;
    chatTitle: string;
}

const ChatSidebar = ({ user_id }: { user_id: string }) => {
    const [chats, setChats] = useRecoilState(ChatSidebarListAtom);

    useEffect(() => {
        fetch(`/api/chats?user_id=${user_id}`)
            .then(res => res.json())
            .then((data: Record<string, string>) => {
                const chatList: ChatData[] = Object.entries(data).map(([chatId, chatTitle]) => ({
                    chatId,
                    chatTitle,
                }));
                setChats(chatList);
            })
            .catch(error => console.error('Error fetching chats:', error));
    }, [user_id, setChats]);

    return (
        <>
            <Text size="xs">Recent Chats</Text>
            <Space h={10}/>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="flex-start"
                gap="xs"
            >
                {chats.map(({ chatId, chatTitle }) => (
                    <AmeChatHistoryEntry
                        key={chatId}
                        keyProp={chatId}
                        initialValue={chatTitle}
                    />
                ))}
            </Stack>
        </>
    );
};

export default ChatSidebar;
