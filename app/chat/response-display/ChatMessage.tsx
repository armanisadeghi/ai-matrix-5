import { Group, Space } from '@mantine/core';
import UserMessage from '@/app/chat/user/UserMessage';
import AssistantMessage from '@/app/chat/response-display/AssistantMessage';
import { eRoleType, iMessage } from "@/utils/types";

interface ChatMessageProps {
    chatMsg: iMessage;
    idx: number;
    msgHistory: iMessage[];
    streamText: string;
}

export const ChatMessage = (
    {
        chatMsg,
        idx,
        msgHistory,
        streamText
    }: ChatMessageProps) => {

    return (
        <Group>
            {chatMsg.role === eRoleType.USER ? (
                <UserMessage
                    content={idx === msgHistory.length - 1 && streamText.length > 0 ? streamText : chatMsg.content}/>
            ) : (
                <AssistantMessage
                    content={idx === msgHistory.length - 1 && streamText.length > 0 ? streamText : chatMsg.content}/>
            )}
            <Space my={16}/>
        </Group>
    );
};

export default ChatMessage;
