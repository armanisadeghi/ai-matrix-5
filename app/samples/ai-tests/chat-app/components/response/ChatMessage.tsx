import { Group, Space } from '@mantine/core'
import AssistantMessage from '@/app/samples/ai-tests/response/AssistantMessage'
import { eRoleType, iMessage } from '@/app/samples/ai-tests/chat-app/types/types'
import UserMessage from '@/app/samples/ai-tests/chat-app/components/response/UserMessage'

interface ChatMessageProps {
    chatMsg: iMessage
    idx: number
    msgHistory: iMessage[]
    streamText: string
}

export const ChatMessage = ({ chatMsg, idx, msgHistory, streamText }: ChatMessageProps) => {
    const isLatestMessage = idx === msgHistory.length - 1
    const displayContent = isLatestMessage && streamText.length > 0 ? streamText : chatMsg.content

    return (
        <Group>
            {chatMsg.role === eRoleType.USER ? (
                <UserMessage message={{ id: idx.toString(), content: displayContent }} />
            ) : (
                <AssistantMessage content={displayContent} />
            )}
            <Space my={16} />
        </Group>
    )
}

export default ChatMessage
