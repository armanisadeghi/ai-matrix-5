// chat-app/AiContext/AiResponseContext.tsx
"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

interface AiResponseContextType {
    respondData: any | null;
    triggerResponse: boolean; // Added boolean to track trigger
    setRespondData: (data: any | null) => void;
    setTriggerResponse: (trigger: boolean) => void; // Setter for trigger
}

const AiResponseContext = createContext<AiResponseContextType | undefined>(undefined);

export const AiResponseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [respondData, setRespondData] = useState<any | null>(null);
    const [triggerResponse, setTriggerResponse] = useState<boolean>(false); // Default is false

    return (
        <AiResponseContext.Provider value={{ respondData, setRespondData, triggerResponse, setTriggerResponse }}>
            {children}
        </AiResponseContext.Provider>
    );
};

export const useAiResponse = (): AiResponseContextType => {
    const context = useContext(AiResponseContext);
    if (!context) {
        throw new Error("useAiResponse must be used within an AiResponseProvider");
    }
    return context;
};
