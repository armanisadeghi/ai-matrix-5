import { ReactNode } from 'react';
import { RecoilState } from "recoil";
import { string } from "@recoiljs/refine";



interface CheckboxSettingAtom {
    atom: RecoilState<boolean>;
    label: string;
    componentType: 'Checkbox';
    options?: any;
}

interface SelectSettingAtom {
    atom: RecoilState<string>;
    label: string;
    componentType: 'Select';
    options: { value: string; label: string }[];
}

interface InputSettingAtom {
    atom: RecoilState<string>;
    label: string;
    componentType: 'Input';
    options?: any;
}

interface SliderSettingAtom {
    atom: RecoilState<number>;
    label: string;
    componentType: 'Slider';
    options: { min: number; max: number; step: number };
}

interface SliderPresetSettingAtom {
    atom: RecoilState<number>;
    label: string;
    componentType: 'SliderPreset';
    options: { value: number; label: string }[];
}


export type SettingAtom = CheckboxSettingAtom | SelectSettingAtom | InputSettingAtom | SliderSettingAtom | SliderPresetSettingAtom;

export type { CheckboxSettingAtom, SelectSettingAtom, InputSettingAtom, SliderSettingAtom, SliderPresetSettingAtom };



// Chat Settings
export interface ChatSettings {
    aiPreferencesMain: string;
    aiPreferencesSecond: string;
    makeSmallTalk: boolean;
    quickAnswer: boolean;
    improveQuestions: boolean;
    submitOnEnter: boolean;
}

// Variables Data
export interface VariablesData {
    [key: string]: any;
}

// Response Data
export interface ResponseData {
    [key: string]: any;
}

// Broker Data
export interface BrokerData {
    [key: string]: any;
}

// AI Model Settings
export interface AIModelSettings {
    [key: string]: any;
}

// Control Settings
export interface ControlSettings {
    [key: string]: any;
}

// Metadata Settings
export interface RequestSettings {
    chatSettings: ChatSettings;
    variablesData: VariablesData;
    responseData: ResponseData;
    brokerData: BrokerData;
    aiModelSettings: AIModelSettings;
    controlSettings: ControlSettings;
    pageSettings: PageSettings;
    userSettings: UserSettings;
    matrixSettings: MatrixSettings;
    clientSettings: ClientSettings;
    agencySettings: AgencySettings;
}

// Page Settings
export interface PageSettings {
    [key: string]: any;
}

// User Settings
export interface UserSettings {
    [key: string]: any;
}

// Matrix Settings
export interface MatrixSettings {
    [key: string]: any;
}

// Client Settings
export interface ClientSettings {
    [key: string]: any;
}

// Agency Settings
export interface AgencySettings {
    [key: string]: any;
}

// Global Settings
export interface GlobalSettings {
    requestSettings: RequestSettings;
    pageSettings: Record<string, any>;
    userSettings: Record<string, any>;
    matrixSettings: Record<string, any>;
    clientSettings: Record<string, any>;
    agencySettings: Record<string, any>;
}

export interface SettingsContextProps {
    settings: RequestSettings;
    updateSettings: (updates: Partial<RequestSettings>) => void;
}

export interface SettingsProviderProps {
    children: ReactNode;
}

export interface ChatSettingsProps {
    settings: ChatSettings;
    onChange: (field: keyof ChatSettings, value: boolean | string) => void;
    onSubmit: () => void;
}

// Need to consider if this should be used or not.
export interface SimpleChatSettingsProps {
    settings: ChatSettings;
    onChange: (field: keyof ChatSettings, value: boolean | string) => void;
    onSubmit: () => void;
}
