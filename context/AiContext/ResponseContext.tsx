// chat-app/nice-working/response/ResponseContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
    id: string;
    type: 'user' | 'ai';
    content: string;
}

interface ResponseContextType {
    messages: Message[];
    addMessage: (message: Message) => void;
    updateMessage: (id: string, content: string) => void;
}

const ResponseContext = createContext<ResponseContextType | undefined>(undefined);

export const useResponses = () => {
    const context = useContext(ResponseContext);
    if (!context) {
        throw new Error('useResponses must be used within a ResponseProvider');
    }
    return context;
};

export const ResponseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const updateMessage = (id: string, content: string) => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) => (msg.id === id ? { ...msg, content } : msg))
        );
    };

    return (
        <ResponseContext.Provider value={{ messages, addMessage, updateMessage }}>
            {children}
        </ResponseContext.Provider>
    );
};
