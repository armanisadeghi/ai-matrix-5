import useChatSummaries from "@/app/trials/recoil/local/tests/chatAtomTest2";
import React, { useEffect } from "react";
import { Space, Stack, Text, Skeleton } from "@mantine/core";

interface ChatSidebarProps {
    isLoading?: boolean;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ isLoading = false }) => {
    const chatSummaries = useChatSummaries();

    useEffect(() => {
        if (chatSummaries && chatSummaries !== "loading" && chatSummaries.length > 0) {
            console.log("Chat summaries updated:", chatSummaries);
        }
    }, [chatSummaries]);

    if (isLoading || chatSummaries === "loading") {
        console.log("Loading overlay is visible");
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
        <>
            <Text size="xs">Recent Chats here</Text>
            <Space h={10} />
            <Stack h={300} bg="var(--mantine-color-body)" align="stretch" justify="flex-start" gap="xs">
                {chatSummaries && chatSummaries.length > 0 ? (
                    chatSummaries.map(({ chatId, chatTitle }) => {
                        const truncatedContent =
                            chatTitle.length > 100 ? chatTitle.substring(0, 100) + "..." : chatTitle;

                        // TODO: removed AmeChatHistory.tsx
                        /* 
                        return (
                            <AmeChatHistoryEntry
                                key={chatId}
                                keyProp={chatId}
                                initialValue={truncatedContent}
                            />
                        );
 */
                        return <div key={chatId}>{truncatedContent}</div>;
                    })
                ) : (
                    <Text size="sm">No Chats Found</Text>
                )}
            </Stack>
        </>
    );
};

export default ChatSidebar;
