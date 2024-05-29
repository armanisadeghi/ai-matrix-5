// chat-app/AiContext/AiResponseContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RespondData } from '@/types/chat';

interface AiResponseContextType {
    respondData: RespondData | null;
    triggerResponse: boolean; // Added boolean to track trigger
    setRespondData: (data: RespondData | null) => void;
    setTriggerResponse: (trigger: boolean) => void; // Setter for trigger
}

const AiResponseContext = createContext<AiResponseContextType | undefined>(undefined);

export const AiResponseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [respondData, setRespondData] = useState<RespondData | null>(null);
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
        throw new Error('useAiResponse must be used within an AiResponseProvider');
    }
    return context;
};
