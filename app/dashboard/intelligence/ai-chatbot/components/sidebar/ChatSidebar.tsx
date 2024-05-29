// app/dashboard/intelligence/ai-chatbot/components/sidebar/ChatSidebar.tsx
import AmeChatHistoryEntry from './AmeChatHistoryEntry';
import { Space, Stack, Text } from '@mantine/core';

const ChatSidebar: React.FC = () => {
    return (
        <>
            <Text size="xs">Recent Chats</Text>
            <Space h={10} />
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="flex-start"
                gap="xs"
            >
                <AmeChatHistoryEntry initialValue="sample item 1 - eliminate this" />
                <AmeChatHistoryEntry initialValue="sample item 2" />
                <AmeChatHistoryEntry initialValue="sample item 3" />
                <AmeChatHistoryEntry initialValue="What is the capital of the United States?" />
            </Stack>
        </>
    );
};

export default ChatSidebar;
