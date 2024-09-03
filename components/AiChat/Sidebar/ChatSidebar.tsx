"use client";

import ChatSidebarEntry from "@/components/AiChat/Sidebar/ChatSidebarEntry";
import React, { useCallback, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Stack, Text, ScrollArea, Divider } from "@mantine/core";
import { IoCreateOutline } from "react-icons/io5";
import Link from "next/link";

import SidebarSection from "@/components/AiChat/Response/concepts-not-used/SidebarSection";
import AmeActionIcon from "@/ui/button/AmeActionIcon";
import SidebarAdmin from "@/components/AiChat/Sidebar/SidebarAdmin";
import {
    activeChatIdAtom,
    chatSummariesAtom,
    chatTransitionAtom,
    focusInputAtom,
    isNewChatAtom,
} from "@/state/aiAtoms/aiChatAtoms";
import AmePaper from "@/ui/surfaces/AmePaper";
import AmeText from "@/ui/typography/AmeText";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeButton from "@/ui/buttons/AmeButton";

const fileManagerItems = [
    { id: "1", name: "Text", value: "15" },
    { id: "2", name: "PDF", value: "8" },
    { id: "3", name: "Slides", value: "3" },
    { id: "4", name: "Spreadsheets", value: "5" },
    { id: "5", name: "Documents", value: "12" },
    { id: "6", name: "Code", value: "7" },
    { id: "7", name: "Images", value: "20" },
    { id: "8", name: "Videos", value: "4" },
    { id: "9", name: "Audio", value: "6" },
    { id: "10", name: "Other", value: "2" },
];

const matrixManagerItems = [
    { id: "1", name: "Agents", value: "10" },
    { id: "2", name: "Recipes", value: "5" },
    { id: "3", name: "Workflows", value: "8" },
    { id: "4", name: "Apps", value: "3" },
    { id: "5", name: "Custom", value: "12" },
];

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
            setChatSelectCount((prevCount) => prevCount + 1);
            setIsNewChat(false);
            setActiveChatId(chatId);
            setTransitionState("idle");
        },
        [setIsNewChat, setActiveChatId, setTransitionState],
    );

    const handleItemAction = useCallback((itemId: string) => {
        console.log(`Action for item ${itemId}`);
    }, []);

    const handleItemClick = useCallback((itemId: string) => {
        console.log(`Item ${itemId} clicked`);
    }, []);

    const handleSectionAction = useCallback(() => {
        console.log("Section action clicked");
    }, []);

    const handleNewChat = useCallback(() => {
        setNewChatCount((prevCount) => prevCount + 1);
        setIsNewChat(true);
        setFocusInput(true);
    }, [setIsNewChat, setFocusInput]);

    const memoizedChatEntries = useMemo(() => {
        return chatSummaries.map((chat) => (
            <Link
                key={chat.chatId}
                href={`/dashboard/intelligence/ai-chat/${encodeURIComponent(chat.chatId)}?chatTitle=${encodeURIComponent(chat.chatTitle)}`}
                prefetch={false}
                style={{ textDecoration: "none" }}
            >
                <ChatSidebarEntry
                    chatId={chat.chatId}
                    chatTitle={chat.chatTitle}
                    isActive={chat.chatId === activeChatId}
                    onClick={() => handleChatSelect(chat.chatId, chat.chatTitle)}
                />
            </Link>
        ));
    }, [chatSummaries, activeChatId, handleChatSelect]);

    return (
        <ScrollArea h="90vh" style={{ paddingRight: "8px", maxHeight: "90hv", overflowX: "auto" }}>
            <Stack
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="flex-start"
                gap="xs"
                style={{ position: "relative", height: "100%", marginLeft: "0px" }}
            >
                <Link href="/dashboard/intelligence/ai-chat/matrix-ai" passHref>
                    <AmeButton title="New chat" leftSection={<IoCreateOutline size={18} />} fullWidth primary>
                        New chat
                    </AmeButton>
                </Link>
                <AmePaper withBorder p="sm">
                    <AmeTitle order={6} mb="xs">
                        Recent Chats
                    </AmeTitle>
                    <ScrollArea h={150} scrollbarSize={4} scrollHideDelay={500}>
                        <Stack align="stretch" justify="flex-start" gap={4}>
                            {memoizedChatEntries}
                        </Stack>
                    </ScrollArea>
                </AmePaper>
                <SidebarSection
                    title="Manage Your Data"
                    actionTitle={"Data Manager"}
                    sectionItems={fileManagerItems}
                    onItemClick={handleItemClick}
                    onItemAction={handleItemAction}
                    onSectionAction={handleSectionAction}
                />
                <SidebarSection
                    title="Manage The Matrix"
                    actionTitle={"Matrix Manager"}
                    sectionItems={matrixManagerItems}
                    onItemClick={handleItemClick}
                    onItemAction={handleItemAction}
                    onSectionAction={handleSectionAction}
                />
                <ScrollArea h={500} scrollbarSize={4} scrollHideDelay={500}>
                    <SidebarAdmin chatSelectCount={chatSelectCount} newChatCount={newChatCount} />
                </ScrollArea>
            </Stack>
        </ScrollArea>
    );
};

export default ChatSidebar;
