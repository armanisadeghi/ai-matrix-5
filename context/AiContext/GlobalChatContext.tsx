// chat-app/AiContext/GlobalChatContext.tsx
"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface GlobalChatData {
    eventName: string;
    userToken: string;
    task: string;
    recipeId: string;
}

const defaultGlobalChatData: GlobalChatData = {
    eventName: "",
    userToken: "",
    task: "",
    recipeId: "",
};
interface GlobalChatContextProps {
    globalChatData: GlobalChatData;
    updateGlobalChatData: (data: Partial<GlobalChatData>) => void;
}

const GlobalChatContext = createContext<GlobalChatContextProps>({
    globalChatData: defaultGlobalChatData,
    updateGlobalChatData: () => {},
});

interface GlobalChatProviderProps {
    children: ReactNode;
}

export const GlobalChatProvider: React.FC<GlobalChatProviderProps> = ({ children }) => {
    const [globalChatData, setGlobalChatData] = useState<GlobalChatData>(defaultGlobalChatData);

    const updateGlobalChatData = (data: Partial<GlobalChatData>) => {
        setGlobalChatData((prev) => ({ ...prev, ...data }));
    };

    return (
        <GlobalChatContext.Provider value={{ globalChatData, updateGlobalChatData }}>
            {children}
        </GlobalChatContext.Provider>
    );
};

export const useGlobalChat = () => useContext(GlobalChatContext);
