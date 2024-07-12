// chat-app/AiContext/SettingsContext.tsx
'use client';
import React, { createContext, useContext, useState } from 'react';
import { RequestSettings, SettingsContextProps, SettingsProviderProps } from '@/types/settings.types';
import { defaultRequestSettings } from "@/utils/config/chatDefaults";

export const SettingsContext = createContext<SettingsContextProps>({
    settings: defaultRequestSettings,  // Using the correct default settings
    updateSettings: () => {}  // Placeholder function
});

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const [settings, setSettings] = useState<RequestSettings>(defaultRequestSettings);

    const updateSettings = (updates: Partial<RequestSettings>) => {
        setSettings(prev => ({ ...prev, ...updates }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
