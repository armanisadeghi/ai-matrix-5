// ChatBotSettings.tsx
"use client";
import { Select } from '@mantine/core';
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

export interface ChatBotSettingsProps {
    settings: SettingsProps;
    onChange: (field: keyof SettingsProps, value: boolean | string) => void;
    onSubmit: () => void;
};

const ChatBotSettings: React.FC<ChatBotSettingsProps> = ({ settings, onChange, onSubmit }) => {
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
                onChange={(e) => onChange('submitOnEnter', e.currentTarget.checked)}
            />
            <AmeCheckbox
                label="Make Small Talk"
                checked={settings.makeSmallTalk}
                onChange={(e) => onChange('makeSmallTalk', e.currentTarget.checked)}
            />
            <AmeCheckbox
                label="Quick Answer"
                checked={settings.quickAnswer}
                onChange={(e) => onChange('quickAnswer', e.currentTarget.checked)}
            />
            <AmeCheckbox
                label="Improve Questions"
                checked={settings.improveQuestions}
                onChange={(e) => onChange('improveQuestions', e.currentTarget.checked)}
            />
            <Select
                label="AI Preferences"
                data={aiPreferencesMainOptions}
                value={settings.aiPreferencesMain}
                onChange={(value) => onChange('aiPreferencesMain', value || "")}
            />
            <Select
                label="Secondary Preference"
                data={aiPreferencesSecondOptions}
                value={settings.aiPreferencesSecond}
                onChange={(value) => onChange('aiPreferencesSecond', value || "")}
            />
        </AmeFieldset>
    );
}


export default ChatBotSettings;
