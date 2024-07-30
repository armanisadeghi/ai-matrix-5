import { Group, Space } from '@mantine/core';
import { eRoleType, iMessage } from '../../types/types';
import AssistantMessage from './AssistantMessage';
import UserMessage from './UserMessage';

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

    const isLatestMessage = idx === msgHistory.length - 1;
    const displayContent = isLatestMessage && streamText.length > 0 ? streamText : chatMsg.content;

    return (
        <Group>
            {chatMsg.role === eRoleType.USER ? (
                <UserMessage
                    message={{ id: idx.toString(), content: displayContent }}
                />
            ) : (
                <AssistantMessage
                    content={displayContent}
                />
            )}
            <Space my={16}/>
        </Group>
    );
};

export default ChatMessage;
