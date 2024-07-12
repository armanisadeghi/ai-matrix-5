/*
import { chatMessagesAtomFamily } from '@/state/aiAtoms/chatMessagesState';
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

const MessageComponent = (chatId: string) => {
    const [messages, setMessages] = useRecoilState(chatMessagesAtomFamily(chatId));
    const [currentMessage, setCurrentMessage] = useState('');

    // Function to handle streaming
    const streamMessage = (newData) => {
        setCurrentMessage(prev => prev + newData);
    };

    // Commit the completed message to Recoil
    const commitMessage = () => {
        setMessages(oldMessages => [...oldMessages, currentMessage]);
        setCurrentMessage('');
    };

    // Example usage of streaming and committing
    useEffect(() => {
        const streamInterval = setInterval(() => {
            streamMessage("New part of the message ");
            if (currentMessage.length > 100) {
                clearInterval(streamInterval);
                commitMessage();
            }
        }, 100);

        return () => clearInterval(streamInterval);
    }, [currentMessage]);

    return (
        <div>
            {messages.map((msg, index) => <div key={index}>{msg}</div>)}
            <div>{currentMessage}</div>
        </div>
    );
};
*/
