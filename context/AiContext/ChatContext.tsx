// chat-app/AiContext/ChatContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import { ChatRequest, ChatContextProps, ChatProviderProps } from '@/types/chat';
import { defaultChatRequest } from '../../app/dashboard/intelligence/chat-app/utils/defaults';

export const ChatContext = createContext<ChatContextProps>({
    chatData: defaultChatRequest,
    updateChatData: () => {},
});

export const ChatProvider: React.FC<ChatProviderProps> = ({children}) => {
    const [chatData, setChatData] = useState<ChatRequest>(defaultChatRequest);

    const updateChatData = (newData: Partial<ChatRequest>) => {
        setChatData(prev => ({...prev, ...newData}));
    };

    return (
        <ChatContext.Provider value={{
            chatData,
            updateChatData
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = (): ChatContextProps => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
