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
                console.log("User is authenticated. User AiContext:", userContext.userData);
                try {
                    const loadedHistory = await loadChatHistory(userContext.userData.userId, userContext.userData);
                    console.log("Loaded chat history:", loadedHistory);

                    // Log and process each chat entry
                    if (loadedHistory.chatHistory) {
                        Object.keys(loadedHistory.chatHistory).forEach((chatId: string) => {
                            loadedHistory.chatHistory[chatId].forEach((entry: ChatHistoryChat, index: number) => {
                                console.log(`Chat ID: ${chatId}, Entry ${index} - Role: ${entry.role}, Content: ${entry.content}`);
                            });
                        });
                    }

                    // Ensure state is updated with a new object
                    setChatHistory(prev => {
                        console.log("Previous chat history:", prev);
                        console.log("New chat history to set:", loadedHistory.chatHistory);
                        return { ...loadedHistory.chatHistory };
                    });
                } catch (error) {
                    console.error("Failed to load and transform chat history", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                console.log("User is not authenticated or user AiContext is missing:", userContext);
            }
        };

        if (userContext?.userData && userContext.userData.isAuthenticated) {
            loadAndTransformChatHistory();
        }
    }, [userContext?.userData]);

    const updateChatHistory = (newHistory: ChatHistoryChat[], chatId: string) => {
        console.log("Updating chat history with new history:", newHistory);
        setChatHistory(prev => ({
            ...prev,
            [chatId]: newHistory
        }));
    };

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
