// chat-app/nice-working/ChatInput.tsx
'use client';
import React, { useState, useContext } from 'react';
import { UserContext } from '@/context/AiContext/UserContext';
import { emitEvent } from '@/utils/socketio/socket';

const ChatInput = () => {
    const [input, setInput] = useState('');
    const userContext = useContext(UserContext);

    let chatContext: any = {}; // for build purposes

    const { chatData, updateChatData } = chatContext;
    const { userData } = userContext;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newPromptData = {
            role: 'user',
            message: input,
            formResponses: [],
            customInputs: []
        };

        const chatRequest = {
            ...chatData, // Spread existing data to maintain other properties (confirm this is the correct structure)
            promptData: [...chatData.promptData, newPromptData], // Ensure this is really what it should be. promptData needs to have role, message, formResponses, and customInputs.
            userToken: userData.userToken,


            // Currently hard-coded for ease of use, but needs to be dynamically determined based on the chat type
            task: 'streaming_chat',
        };

        // Send the message through the WebSocket
        emitEvent('socket_event', chatRequest, (response) => {
            console.log('Received response:', response);
            // Handle response, update AiContext or state as necessary
        });

        setInput('');
        updateChatData({ promptData: chatRequest.promptData });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={handleInputChange} />
            <button type="submit">ChatInput Send</button>
        </form>
    );
};

export default ChatInput;
