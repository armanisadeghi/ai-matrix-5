'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUserMessage } from '../store/chatSlice'

export function ChatInput({ chatId }: { chatId: string }) {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            dispatch(addUserMessage({
                chatId,
                message: {
                    id: Date.now().toString(),
                    role: 'user',
                    text: input.trim(),
                    createdAt: new Date().toISOString(),
                }
            }))
            setInput('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="chat-input">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button type="submit">Send</button>
        </form>
    )
}
