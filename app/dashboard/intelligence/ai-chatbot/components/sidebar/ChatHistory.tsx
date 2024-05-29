// app/dashboard/intelligence/ai-chatbot/components/sidebar/ChatHistory.tsx

'use client';

import React, { useEffect } from 'react';
import { useHistory } from '@/context/AiContext/HistoryContext';

const SingleHistoryEntry = () => {
    const { chatHistory, activeChat, isLoading } = useHistory();

    useEffect(() => {
        if (activeChat) {
            const history = chatHistory[activeChat];
            if (!history) {
            } else {
                const firstMessage = history[0];
            }
        }
    }, [activeChat, chatHistory]);

    if (!activeChat) {
        return <div>No chat history available.</div>;
    }


    return (
        <div className="chat-history">
            <h3>Chat History</h3>
            {chatHistory[activeChat].map((entry, index) => (
                <div key={index} className="chat-message">
                    <p><strong>Role:</strong> {entry.role}</p>
                    <p><strong>Message:</strong> {entry.content}</p>
                </div>
            ))}
        </div>
    );
};

export default SingleHistoryEntry;
