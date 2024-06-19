// app/samples/new-db/ChatMessage.tsx

import React from 'react'

interface ChatMessageProps {
    index: number
    role: string
    text: string
}

const ChatMessage: React.FC<ChatMessageProps> = ({ index, role, text }) => {
    return (
        <div>
            <p>
                <strong>{role}:</strong> {text}
            </p>
        </div>
    )
}

export default ChatMessage
