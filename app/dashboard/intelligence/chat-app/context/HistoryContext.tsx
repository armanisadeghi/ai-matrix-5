// chat-app/context/HistoryContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { HistoryContextProps, HistoryProviderProps, ChatHistoryChat } from '@/types/chat';
import { loadChatHistory } from '../utils/loadChatHistory';
import { UserContext } from './UserContext';

export const HistoryContext = createContext<HistoryContextProps>({
    chatHistory: [],
    updateChatHistory: () => {},
});

export const HistoryProvider: React.FC<HistoryProviderProps> = ({ children }) => {
    const [chatHistory, setChatHistory] = useState<ChatHistoryChat[]>([]);
    const userContext = useContext(UserContext);

    useEffect(() => {
        async function loadAndTransformChatHistory() {
            if (userContext && userContext.userData.isAuthenticated) {
                console.log("User is authenticated. User context:", userContext.userData);
                try {
                    const loadedHistory = await loadChatHistory(userContext.userData.userId, userContext.userData);
                    console.log("Loaded chat history:", loadedHistory);
                    setChatHistory(loadedHistory.chatHistory);
                } catch (error) {
                    console.error("Failed to load and transform chat history", error);
                }
            } else {
                console.log("User is not authenticated or user context is missing:", userContext);
            }
        }

        if (userContext?.userData && userContext.userData.isAuthenticated) {
            loadAndTransformChatHistory();
        }
    }, [userContext?.userData]);

    const updateChatHistory = (newHistory: ChatHistoryChat[]) => {
        console.log("Updating chat history with new history:", newHistory);
        setChatHistory(newHistory);
    };

    return (
        <HistoryContext.Provider value={{
            chatHistory,
            updateChatHistory
        }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = (): HistoryContextProps => {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
};
