'use client'

import React from 'react'

const ChatHistory = () => {
    return <h3>Chat History</h3>

    /*    const { chatHistory } = useHistory();

        return (
            <div className="chat-history">
                <h3>Chat History</h3>
                {Object.entries(chatHistory).map(([chatId, messages]) => (
                    <div key={chatId}>
                        {messages.map((message, index) => (
                            <div key={`${chatId}-${index}`} className="chat-message">
                                <p><strong>Role:</strong> {message.role}</p>
                                <p><strong>Message:</strong> {message.content}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );*/
}

export default ChatHistory
