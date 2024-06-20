import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import AmeChatHistoryEntry from "@/components/AiChat/Sidebar/AmeChatHistoryEntry";
import { Stack, Text } from "@mantine/core";
import {
    activeChatMessagesArrayAtom,
    chatDetailsSelector,
    ChatSidebarListAtom,
    chatSummariesSelector,
    activeChatIdAtom,
    selectedChatMessagesSelector,
    useFetchAndStoreChatDetails,
} from "@/state/aiAtoms/chatAtoms";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import { ChatSummary } from "@/types";
import { activeUserAtom } from "@/state/userAtoms";
import { IoCreateOutline } from "react-icons/io5";

const ChatSidebar = () => {
    const [chats, setChats] = useRecoilState(ChatSidebarListAtom);
    const setActiveChatMessages = useSetRecoilState(activeChatMessagesArrayAtom);
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesSelector);
    const chatDetailsLoadable = useRecoilValueLoadable(chatDetailsSelector);
    const [activeChatId, setSelectedChatId] = useRecoilState(activeChatIdAtom);
    const chatMessages = useRecoilValue(selectedChatMessagesSelector(activeChatId || ""));
    const userId = activeUser?.matrix_id ?? "";
    const fetchAndStoreChatDetails = useFetchAndStoreChatDetails();

    const handleChatSelect = async (chatId: string) => {
        setSelectedChatId(chatId);
        await fetchAndStoreChatDetails(chatId);
    };

    const handleNewChat = () => {
        // Clear the page of the current chat to start a new one
        setActiveChatMessages([]);
        // Additional logic to prepare for a new chat can be added here
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "10px" }}>
                <AmeActionIcon tooltip="New Chat" onClick={handleNewChat}>
                    <IoCreateOutline size={18} />
                </AmeActionIcon>
            </div>

            <Text
                size="xs"
                fw={700}
                style={{
                    marginLeft: "5px",
                    marginTop: "5px",
                }}
            >
                Recent Chats
            </Text>
            <Stack h={300} bg="var(--mantine-color-body)" align="stretch" justify="flex-start" gap="xs">
                {chatSummariesLoadable.state === "hasValue" &&
                    chatSummariesLoadable.contents.map(({ chatId, chatTitle }) => (
                        <AmeChatHistoryEntry key={chatId} keyProp={chatId} initialValue={chatTitle} />
                    ))}
            </Stack>
        </>
    );
};

export default ChatSidebar;
