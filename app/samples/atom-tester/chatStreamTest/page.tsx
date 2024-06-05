'use client';

import React, { useState } from 'react';
import { submitChatRequest } from '@/app/samples/ai-tests/shared/services/SteamOpenAi';
import { Button, TextInput, Textarea } from "@mantine/core";
import { MessageEntry, Role } from "@/types";

const ChatComponent: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [responseText, setResponseText] = useState<string>('');

    const handleMessageSend = () => {
        // Create a message for 'user' based on the input text
        const userMessage: MessageEntry = { text: inputText, role: 'user' };

        // Call submitChatRequest with the user message and callback functions
        submitChatRequest([userMessage], updateCallback, finalizeCallback)
            .then(() => {
                console.log("Chat request submitted successfully");
            })
            .catch((error) => {
                console.error("Error submitting chat request:", error);
            });
    };

    // updateCallback function
    const updateCallback = (message: MessageEntry): void => {
        // Append the message text to the responseText
        setResponseText(prevResponse => {
            return prevResponse + message.text + '\n';
        });
    };

    // finalizeCallback function
    const finalizeCallback = (message: MessageEntry): void => {
        console.log("Full Message:", message);
    };

    return (
        <div>
            <TextInput
                placeholder="Enter your message..."
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
            />
            <Button onClick={handleMessageSend}>Send</Button>
            <Textarea
                placeholder="Streaming Response"
                value={responseText}
                onChange={() => {}}
                style={{ marginTop: '10px', minHeight: '100px' }}
            />
        </div>
    );
};

export default ChatComponent;
