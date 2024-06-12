// recoil/aiAtoms/settingsAtoms.ts
import { atom, RecoilState } from 'recoil';
import { AIModel } from "@/utils/config/aiModels";

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

type SettingAtom = CheckboxSettingAtom | SelectSettingAtom | InputSettingAtom | SliderSettingAtom;

// Example for a select atom with options
export const aiPreferencesMainAtom: SelectSettingAtom = {
    atom: atom<string>({
        key: 'aiPreferencesMainAtom',
        default: 'direct_chat',
    }),
    label: 'AI Preferences',
    componentType: 'Select',
    options: [
        { value: 'direct_chat', label: 'Direct Chat' },
        { value: 'group_chat', label: 'Group Chat' }
    ]
};

export const aiPreferencesSecondAtom: SelectSettingAtom = {
    atom: atom<string>({
        key: 'aiPreferencesSecondAtom',
        default: 'one_ai_chat',
    }),
    label: 'Secondary Preference',
    componentType: 'Select',
    options: [
        { value: 'one_ai_chat', label: 'One AI Chat' },
        { value: 'multiple_ai_chat', label: 'Multiple AI Chat' }
    ]
};

export const makeSmallTalkAtom: CheckboxSettingAtom = {
    atom: atom<boolean>({
        key: 'makeSmallTalkAtom',
        default: false,
    }),
    label: 'Make Small Talk',
    componentType: 'Checkbox'
};

export const quickAnswerAtom: CheckboxSettingAtom = {
    atom: atom<boolean>({
        key: 'quickAnswerAtom',
        default: false,
    }),
    label: 'Quick Answer',
    componentType: 'Checkbox'
};

export const improveQuestionsAtom: CheckboxSettingAtom = {
    atom: atom<boolean>({
        key: 'improveQuestionsAtom',
        default: false,
    }),
    label: 'Improve Questions',
    componentType: 'Checkbox'
};

export const submitOnEnterAtom: CheckboxSettingAtom = {
    atom: atom<boolean>({
        key: 'submitOnEnterAtom',
        default: true,
    }),
    label: 'Submit on Enter',
    componentType: 'Checkbox'
};

export const aiModelAtom: SelectSettingAtom = {
    atom: atom<string>({
        key: 'modelAtom',
        default: 'gpt-4o',
    }),
    label: 'AI Model',
    componentType: 'Select',
    options: [
        { value: 'gpt-4o', label: 'GPT 4o' },
        { value: 'gpt-4', label: 'GPT 4' },
        { value: 'gpt-3-turbo', label: 'GPT 3 Turbo' }
    ]
};

export const temperatureAtom: SliderSettingAtom = {
    atom: atom<number>({
        key: 'temperatureAtom',
        default: 1,
    }),
    label: 'Temperature',
    componentType: 'Slider',
    options: { min: 0, max: 1, step: 0.1 }
};

export const maxTokensAtom: SliderSettingAtom = {
    atom: atom<number>({
        key: 'maxTokens',
        default: 500,
    }),
    label: 'Max Tokens',
    componentType: 'Slider',
    options: { min: 100, max: 2000, step: 100 }
};

export const topPAtom: SliderSettingAtom = {
    atom: atom<number>({
        key: 'topP',
        default: 1,
    }),
    label: 'Top P',
    componentType: 'Slider',
    options: { min: 0, max: 1, step: 0.1 }
};

export const frequencyPenaltyAtom: SliderSettingAtom = {
    atom: atom<number>({
        key: 'frequencyPenalty',
        default: 0,
    }),
    label: 'Frequency Penalty',
    componentType: 'Slider',
    options: { min: 0, max: 1, step: 0.1 }
};

export const stopSequenceAtom: InputSettingAtom = {
    atom: atom<string>({
        key: 'stopSequenceAtom',
        default: '',
    }),
    label: 'Stop Sequence',
    componentType: 'Input',
};

// Consolidated export of all setting atoms
export const settingsAtoms = {
    aiPreferencesMain: aiPreferencesMainAtom,
    aiPreferencesSecond: aiPreferencesSecondAtom,
    makeSmallTalk: makeSmallTalkAtom,
    quickAnswer: quickAnswerAtom,
    improveQuestions: improveQuestionsAtom,
    submitOnEnter: submitOnEnterAtom,
    aiModel: aiModelAtom,
    temperature: temperatureAtom,
    maxTokens: maxTokensAtom,
    topP: topPAtom,
    frequencyPenalty: frequencyPenaltyAtom,
    stopSequence: stopSequenceAtom,
};

// Optionally, export the atom names if needed for type checking or iteration
export type AtomName = keyof typeof settingsAtoms;



/*
        model: string;
        messages: OpenaiMessageEntry[];
        stream: boolean;
        temperature?: number;
        max_tokens?: number;
        top_p?: number;
        frequency_penalty?: number;
        presence_penalty?: number;
        stop?: string | string[];

 */
