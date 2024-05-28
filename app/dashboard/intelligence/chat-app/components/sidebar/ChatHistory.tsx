// app/dashboard/intelligence/chat-app/components/ChatHistory.tsx

'use client';

import React, { useEffect } from 'react';
import { useHistory } from '../../context/HistoryContext';

const ChatHistory = () => {
    const { chatHistory } = useHistory();

    useEffect(() => {
        if (!chatHistory) {
            console.error('chatHistory is undefined or null');
        } else {
            console.log('chatHistory loaded:', chatHistory);
        }
    }, [chatHistory]);

    if (!chatHistory || chatHistory.length === 0) {
        return <div>No chat history available.</div>;
    }

    return (
        <div className="chat-history">
            <h3>Chat History</h3>
            {chatHistory.map((entry, index) => (
                <div key={index} className="chat-message">
                    <p><strong>Role:</strong> {entry.role}</p>
                    <p><strong>Message:</strong> {entry.message}</p>
                </div>
            ))}
        </div>
    );
};

export default ChatHistory;
