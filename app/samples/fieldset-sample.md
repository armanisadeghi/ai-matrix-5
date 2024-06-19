was having issues with the build so I just deleted the folder:

fieldset-sample

-   page.tsx:
    "use client";
-   '''tsx

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
settings: SettingsProps;
onChange: (field: keyof SettingsProps, value: boolean | string) => void;
onSubmit: (settings: SettingsProps) => void;
}

const ChatBotSettings: React.FC<ChatBotSettingsProps> = ({ settings, onChange, onSubmit }) => {
const handleCheckboxChange = (field: keyof SettingsProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
const newChecked = event.currentTarget.checked;
onChange(field, newChecked);
};

    const handleSelectChange = (field: 'aiPreferencesMain' | 'aiPreferencesSecond', value: string | null) => {
        onChange(field, value || "");
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
'''
