/*
'use client'

import { useSelector } from 'react-redux'
import { selectChatMessages } from '../store/chatSlice'

export function ChatMessages({ chatId }: { chatId: string }) {
    const messages = useSelector((state) => selectChatMessages(state, chatId))

    return (
        <div className="chat-messages">
            {messages.map((message) => (
                <div key={message.id} className={`message ${message.role}`}>
                    {message.text}
                </div>
            ))}
        </div>
    )
}
*/
