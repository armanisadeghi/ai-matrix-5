// context/socketContext.tsx
'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { SettingsProviderProps } from "@/types/settings";

interface DynamicSocketContextProps {
    handleRealTimeData: (data: string) => void;
    onStreamEnd: (streamBuffer: string) => void;
}

const SocketContext = createContext<DynamicSocketContextProps | undefined>(undefined);

export const useDynamicSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useDynamicSocketContext must be used within a DynamicSocketProvider');
    }
    return context;
};

export const DynamicSocketProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const handleRealTimeData = useCallback((data: string) => {
        // Default handleRealTimeData implementation
    }, []);

    const onStreamEnd = useCallback((streamBuffer: string) => {
        // Default onStreamEnd implementation
    }, []);

    return (
        <SocketContext.Provider value={{ handleRealTimeData, onStreamEnd }}>
            {children}
        </SocketContext.Provider>
    );
};

