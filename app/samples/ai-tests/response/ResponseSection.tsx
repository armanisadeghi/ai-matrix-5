import { Paper, Text, Space, Container } from '@mantine/core'
import { ChatMessage } from './ChatMessage'
import { iMessage } from '@/app/samples/ai-tests/chat-app/types/types'

interface ResponseSectionProps {
    msgHistory: iMessage[]
    streamText: string
}

export const ResponseSection = ({ msgHistory, streamText }: ResponseSectionProps) => {
    return (
        <Paper
            style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '16px'
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <Text size="md">Matrix Assistant</Text>
            </div>

            <Space my={16} />

            <ul
                style={{
                    flexGrow: 1,
                    overflowY: 'auto'
                }}
            >
                {msgHistory.map((chatMsg, idx) => (
                    <ChatMessage
                        key={idx}
                        chatMsg={chatMsg}
                        idx={idx}
                        msgHistory={msgHistory}
                        streamText={streamText}
                    />
                ))}
            </ul>
        </Paper>
    )
}

export default ResponseSection
