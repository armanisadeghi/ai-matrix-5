'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { HistoryContextProps, HistoryProviderProps, ChatHistoryChat } from '@/types/chat';
import { loadChatHistory } from '@/app/dashboard/intelligence/ai-chatbot/utils/loadChatHistory';
import { UserContext } from './UserContext';

interface ChatHistory {
    [index: string]: ChatHistoryChat[];
}

export const HistoryContext = createContext<HistoryContextProps>({
    chatHistory: {},
    updateChatHistory: () => {},
    setActiveChat: () => {},
    activeChat: null,
    isLoading: true,
});

export const HistoryProvider: React.FC<HistoryProviderProps> = ({ children }) => {
    const [chatHistory, setChatHistory] = useState<ChatHistory>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const userContext = useContext(UserContext);

    useEffect(() => {
        const loadAndTransformChatHistory = async () => {
            if (userContext && userContext.userData.isAuthenticated) {
                setIsLoading(true);
                try {
                    const loadedHistory = await loadChatHistory(userContext.userData.userId, userContext.userData);
                    setChatHistory(prev => ({ ...loadedHistory.chatHistory }));
                } catch (error) {
                    console.error("Failed to load and transform chat history", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        if (userContext?.userData && userContext.userData.isAuthenticated) {
            loadAndTransformChatHistory();
        }
    }, [userContext?.userData]);

    const updateChatHistory = (newHistory: ChatHistoryChat[], chatId: string) => {
        setChatHistory(prev => ({
            ...prev,
            [chatId]: newHistory
        }));
    };

    useEffect(() => {
        if (!isLoading) {
            console.log("HistoryContext is set:", {
                chatHistory,
                isLoading,
                userContext,
            });
        }
    }, [chatHistory, isLoading, userContext]);

    return (
        <HistoryContext.Provider value={{
            chatHistory,
            updateChatHistory,
            setActiveChat: () => {}, // No-op for now
            activeChat: null, // Ignored for now
            isLoading,
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
