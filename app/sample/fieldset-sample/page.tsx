"use client";
import { Select } from '@mantine/core';
import { useState } from 'react';
import { aiPreferencesMainOptions, aiPreferencesSecondOptions } from '@/app/data/chatSettingsOptions';
import AmeFieldset from "@/ui/fieldset/AmeFieldset";
import AmeCheckbox from "@/ui/checkbox/AmeCheckbox";

export interface SettingsProps {
    aiPreferencesMain: string;
    aiPreferencesSecond: string;
    makeSmallTalk: boolean;
    quickAnswer: boolean;
    improveQuestions: boolean;
    submitOnEnter: boolean;
}

const defaultSettings: SettingsProps = {
    aiPreferencesMain: 'direct_chat',
    aiPreferencesSecond: 'one_ai_chat',
    makeSmallTalk: false,
    quickAnswer: true,
    improveQuestions: false,
    submitOnEnter: true
};

export interface ChatBotSettingsProps {
    onSubmit: (settings: SettingsProps) => void;
    onSettingsChange?: (settings: SettingsProps) => void;
};

const ChatBotSettings: React.FC<ChatBotSettingsProps> = ({ onSubmit, onSettingsChange }) => {
    const [settings, setSettings] = useState<SettingsProps>(defaultSettings);

    const updateSettings = (updatedSettings: SettingsProps) => {
        setSettings(updatedSettings);
        if (onSettingsChange) {
            onSettingsChange(updatedSettings);
        }
    };

    const handleCheckboxChange = (field: keyof SettingsProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.currentTarget.checked;
        updateSettings({ ...settings, [field]: newChecked });
    };

    const handleSelectChange = (field: 'aiPreferencesMain' | 'aiPreferencesSecond', value: string | null) => {
        updateSettings({ ...settings, [field]: value || "" });
    };

    return (
        <AmeFieldset
            legend="Settings"
            layout="quad"
            fieldsetWidth="95%"
            showButton={false}
        >
            <AmeCheckbox
                label="Submit on Enter"
                checked={settings.submitOnEnter}
                onChange={handleCheckboxChange('submitOnEnter')}
            />
            <AmeCheckbox
                label="Make Small Talk"
                checked={settings.makeSmallTalk}
                onChange={handleCheckboxChange('makeSmallTalk')}
            />
            <AmeCheckbox
                label="Quick Answer"
                checked={settings.quickAnswer}
                onChange={handleCheckboxChange('quickAnswer')}
            />
            <AmeCheckbox
                label="Improve Questions"
                checked={settings.improveQuestions}
                onChange={handleCheckboxChange('improveQuestions')}
            />
            <Select
                label="AI Preferences"
                data={aiPreferencesMainOptions}
                value={settings.aiPreferencesMain}
                onChange={(value) => handleSelectChange('aiPreferencesMain', value)}
            />
            <Select
                label="Secondary Preference"
                data={aiPreferencesSecondOptions}
                value={settings.aiPreferencesSecond}
                onChange={(value) => handleSelectChange('aiPreferencesSecond', value)}
            />
        </AmeFieldset>
    );
}

export default ChatBotSettings;
