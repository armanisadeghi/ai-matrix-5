// recoil/aiAtoms/settingsAtoms.ts
import { atom, selector, RecoilState } from 'recoil';
import { AIModel } from "@/utils/config/aiModels";
import { string } from "@recoiljs/refine";
import {
    SettingAtom,
    CheckboxSettingAtom,
    SelectSettingAtom,
    InputSettingAtom,
    SliderSettingAtom,
    SliderPresetSettingAtom
} from '@/types/settings';

export const matrixLevelAtom = atom<number>({
    key: 'matrixLevelAtom',
    default: 0,
});

export const matrixLevelSetting: SliderPresetSettingAtom = {
    atom: matrixLevelAtom,
    label: 'Matrix Level',
    componentType: 'SliderPreset',
    options: [
        { value: 0, label: 'Matrix AI' },
        { value: 2, label: 'GPT-4o' },
        { value: 4, label: 'Conductor' },
        { value: 6, label: 'Lattice' },
        { value: 8, label: 'Cluster' },
        { value: 10, label: 'Hypercluster' },
    ],
};


export const submitOnEnterAtom = atom<boolean>({
    key: 'submitOnEnterAtom',
    default: true,
});

export const submitOnEnterSetting: CheckboxSettingAtom = {
    atom: submitOnEnterAtom,
    label: 'Submit on Enter',
    componentType: 'Checkbox'
};

export const aiPreferencesMainAtom = atom<string>({
    key: 'aiPreferencesMainAtom',
    default: 'direct_chat',
});

export const aiPreferencesMainSetting: SelectSettingAtom = {
    atom: aiPreferencesMainAtom,
    label: 'AI Preferences',
    componentType: 'Select',
    options: [
        { value: 'direct_chat', label: 'Direct Chat' },
        { value: 'group_chat', label: 'Group Chat' }
    ]
};

export const aiPreferencesSecondAtom = atom<string>({
    key: 'aiPreferencesSecondAtom',
    default: 'one_ai_chat',
});

export const aiPreferencesSecondSetting: SelectSettingAtom = {
    atom: aiPreferencesSecondAtom,
    label: 'Secondary Preference',
    componentType: 'Select',
    options: [
        { value: 'one_ai_chat', label: 'One AI Chat' },
        { value: 'multiple_ai_chat', label: 'Multiple AI Chat' }
    ]
};

export const makeSmallTalkAtom = atom<boolean>({
    key: 'makeSmallTalkAtom',
    default: false,
});

export const makeSmallTalkSetting: CheckboxSettingAtom = {
    atom: makeSmallTalkAtom,
    label: 'Make Small Talk',
    componentType: 'Checkbox'
};

export const quickAnswerAtom = atom<boolean>({
    key: 'quickAnswerAtom',
    default: false,
});

export const quickAnswerSetting: CheckboxSettingAtom = {
    atom: quickAnswerAtom,
    label: 'Quick Answer',
    componentType: 'Checkbox'
};

export const improveQuestionsAtom = atom<boolean>({
    key: 'improveQuestionsAtom',
    default: false,
});

export const improveQuestionsSetting: CheckboxSettingAtom = {
    atom: improveQuestionsAtom,
    label: 'Improve Questions',
    componentType: 'Checkbox'
};

export const aiModelAtom = atom<string>({
    key: 'aiModelAtom',
    default: 'gpt-4o',
});

export const aiModelSetting: SelectSettingAtom = {
    atom: aiModelAtom,
    label: 'AI Model',
    componentType: 'Select',
    options: [
        { value: 'gpt-4o', label: 'GPT 4o' },
        { value: 'gpt-4', label: 'GPT 4' },
        { value: 'gpt-3-turbo', label: 'GPT 3 Turbo' }
    ]
};

export const temperatureAtom = atom<number>({
    key: 'temperatureAtom',
    default: 1,
});

export const temperatureSetting: SliderSettingAtom = {
    atom: temperatureAtom,
    label: 'Temperature',
    componentType: 'Slider',
    options: { min: 0, max: 1, step: 0.1 }
};

export const maxTokensAtom = atom<number>({
    key: 'maxTokensAtom',
    default: 500,
});

export const maxTokensSetting: SliderSettingAtom = {
    atom: maxTokensAtom,
    label: 'Max Tokens',
    componentType: 'Slider',
    options: { min: 100, max: 2000, step: 100 }
};

export const topPAtom = atom<number>({
    key: 'topPAtom',
    default: 1,
});

export const topPSetting: SliderSettingAtom = {
    atom: topPAtom,
    label: 'Top P',
    componentType: 'Slider',
    options: { min: 0, max: 1, step: 0.1 }
};

export const frequencyPenaltyAtom = atom<number>({
    key: 'frequencyPenaltyAtom',
    default: 0,
});

export const frequencyPenaltySetting: SliderSettingAtom = {
    atom: frequencyPenaltyAtom,
    label: 'Frequency Penalty',
    componentType: 'Slider',
    options: { min: 0, max: 1, step: 0.1 }
};

export const stopSequenceAtom = atom<string>({
    key: 'stopSequenceAtom',
    default: '',
});

export const stopSequenceSetting: InputSettingAtom = {
    atom: stopSequenceAtom,
    label: 'Stop Sequence',
    componentType: 'Input',
};


export const settingsAtoms = {
    submitOnEnter: submitOnEnterSetting,
    matrixLevel: matrixLevelSetting,
    aiPreferencesMain: aiPreferencesMainSetting,
    aiPreferencesSecond: aiPreferencesSecondSetting,
    makeSmallTalk: makeSmallTalkSetting,
    quickAnswer: quickAnswerSetting,
    improveQuestions: improveQuestionsSetting,
    aiModel: aiModelSetting,
    temperature: temperatureSetting,
    maxTokens: maxTokensSetting,
    topP: topPSetting,
    frequencyPenalty: frequencyPenaltySetting,
    stopSequence: stopSequenceSetting,
};

// Optionally, export the atom names if needed for type checking or iteration
export type AtomName = keyof typeof settingsAtoms;


export const quickChatSettingsState = selector({
    key: 'quickChatSettingsState',
    get: ({ get }) => {
        return {
            submitOnEnter: get(submitOnEnterAtom),
            aiPreferencesMain: get(aiPreferencesMainAtom),
            aiPreferencesSecond: get(aiPreferencesSecondAtom),
            makeSmallTalk: get(makeSmallTalkAtom),
            quickAnswer: get(quickAnswerAtom),
            improveQuestions: get(improveQuestionsAtom),
            matrixLevel: get(matrixLevelAtom),
            aiModel: get(aiModelAtom),
            temperature: get(temperatureAtom),
            maxTokens: get(maxTokensAtom),
            topP: get(topPAtom),
            frequencyPenalty: get(frequencyPenaltyAtom),
            stopSequence: get(stopSequenceAtom)
        };
    }
});

export const aiModelSettingsState = selector({
    key: 'aiModelSettingsState',
    get: ({ get }) => {
        return {
            aiModel: get(aiModelAtom),
            temperature: get(temperatureAtom),
            maxTokens: get(maxTokensAtom),
            topP: get(topPAtom),
            frequencyPenalty: get(frequencyPenaltyAtom),
            stopSequence: get(stopSequenceAtom)
        };
    }
});


export const combinedSettingsState = selector({
    key: 'combinedSettingsState',
    get: ({ get }) => {
        const quickChatSettings = get(quickChatSettingsState);
        const aiModelSettings = get(aiModelSettingsState);
        return {
            quickChatSettings,
            aiModelSettings,
        };
    },
});



export const simpleChatSettingsList = ['submitOnEnter', 'makeSmallTalk', 'quickAnswer', 'improveQuestions', 'aiPreferencesMain', 'stopSequence', 'aiPreferencesSecond', 'matrixLevel'] as AtomName[]
export const aiModelSettingsList = ['aiModel', 'temperature', 'maxTokens', 'topP', 'frequencyPenalty', 'stopSequence'] as AtomName[]
