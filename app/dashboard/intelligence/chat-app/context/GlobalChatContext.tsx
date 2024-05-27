// chat-app/context/GlobalChatContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GlobalChatData, GlobalChatContextProps, GlobalChatProviderProps } from '@/types/chat';

const defaultGlobalChatData: GlobalChatData = {
    eventName: "",
    userToken: "",
    task: "",
    recipeId: ""
};

const GlobalChatContext = createContext<GlobalChatContextProps>({
    globalChatData: defaultGlobalChatData,
    updateGlobalChatData: () => {}
});

export const GlobalChatProvider: React.FC<GlobalChatProviderProps> = ({ children }) => {
    const [globalChatData, setGlobalChatData] = useState<GlobalChatData>(defaultGlobalChatData);

    const updateGlobalChatData = (data: Partial<GlobalChatData>) => {
        setGlobalChatData(prev => ({ ...prev, ...data }));
    };

    return (
        <GlobalChatContext.Provider value={{ globalChatData, updateGlobalChatData }}>
            {children}
        </GlobalChatContext.Provider>
    );
};

export const useGlobalChat = () => useContext(GlobalChatContext);
