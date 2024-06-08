import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import AmeChatHistoryEntry from '@/components/AiChat/Sidebar/AmeChatHistoryEntry';
import { Stack, Text } from '@mantine/core';
import { activeChatMessagesArrayAtom, ChatSidebarListAtom } from "@/app/samples/ai-tests/shared/atoms/chatAtoms";
import AmeActionIcon from "@/ui/button/AmeActionIcon";
import { BsFillPatchPlusFill } from "react-icons/bs";

interface ChatData {
    chatId: string;
    chatTitle: string;
}

const ChatSidebar = ({ user_id }: { user_id: string }) => {
    const [chats, setChats] = useRecoilState(ChatSidebarListAtom);
    const setActiveChatMessages = useSetRecoilState(activeChatMessagesArrayAtom);

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

    const handleNewChat = () => {
        // Clear the page of the current chat to start a new one
        setActiveChatMessages([]);
        // Additional logic to prepare for a new chat can be added here
    };

    return (
        <>
            <AmeActionIcon title="New Chat" onClick={handleNewChat}>
                <BsFillPatchPlusFill size={18} />
            </AmeActionIcon>

            <Text size="xs" fw={700} style={{ marginLeft: '5px', marginTop: '5px' }}>Recent Chats</Text>
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
