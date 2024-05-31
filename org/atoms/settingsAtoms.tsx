import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { Settings, QuickChatSettings, AIModelSettings, API, Limitations, ControlSettings, Choice } from '../types/settings';
import { AI_PREFERENCES_MAIN, AI_PREFERENCES_SECOND } from '../config/aiRequestOptions';

// Atom for the entire settings
export const settingsAtom = atom<Settings | null>(null);

// Individual atoms for each property in Settings
export const quickChatSettingsAtom = atom((get) => get(settingsAtom)?.quickChatSettings || {} as QuickChatSettings);
export const aiModelSettingsAtom = atom((get) => get(settingsAtom)?.aiModelSettings || {} as AIModelSettings);
export const controlSettingsAtom = atom((get) => get(settingsAtom)?.controlSettings || {} as ControlSettings);
export const pageSettingsAtom = atom((get) => get(settingsAtom)?.pageSettings || {});
export const userSettingsAtom = atom((get) => get(settingsAtom)?.userSettings || {});
export const matrixSettingsAtom = atom((get) => get(settingsAtom)?.matrixSettings || {});
export const clientSettingsAtom = atom((get) => get(settingsAtom)?.clientSettings || {});
export const agencySettingsAtom = atom((get) => get(settingsAtom)?.agencySettings || {});
export const variablesSettingsAtom = atom((get) => get(settingsAtom)?.variablesSettings || {});
export const responseSettingsAtom = atom((get) => get(settingsAtom)?.responseSettings || {});
export const brokerSettingsAtom = atom((get) => get(settingsAtom)?.brokerSettings || {});

// Individual atoms for each property in QuickChatSettings
export const aiPreferencesMainAtom = atom((get) => get(quickChatSettingsAtom)?.aiPreferencesMain || AI_PREFERENCES_MAIN[0]);
export const aiPreferencesSecondAtom = atom((get) => get(quickChatSettingsAtom)?.aiPreferencesSecond || AI_PREFERENCES_SECOND[0]);
export const makeSmallTalkAtom = atom((get) => get(quickChatSettingsAtom)?.makeSmallTalk || false);
export const quickAnswerAtom = atom((get) => get(quickChatSettingsAtom)?.quickAnswer || true);
export const improveQuestionsAtom = atom((get) => get(quickChatSettingsAtom)?.improveQuestions || false);
export const submitOnEnterAtom = atom((get) => get(quickChatSettingsAtom)?.submitOnEnter || true);

// Individual atoms for each property in AIModelSettings
export const aiModelIdAtom = atom((get) => get(aiModelSettingsAtom)?.id || '');
export const aiModelApiAtom = atom((get) => get(aiModelSettingsAtom)?.api || {} as API);
export const aiModelAtom = atom((get) => get(aiModelSettingsAtom)?.model || '');
export const aiModelCommonNameAtom = atom((get) => get(aiModelSettingsAtom)?.commonName || '');
export const aiModelClassAtom = atom((get) => get(aiModelSettingsAtom)?.class || '');
export const aiModelTypeAtom = atom((get) => get(aiModelSettingsAtom)?.type || '');
export const aiModelLimitationsAtom = atom((get) => get(aiModelSettingsAtom)?.limitations || {} as Limitations);
export const aiModelControlsAtom = atom((get) => get(aiModelSettingsAtom)?.controls || {});

// Individual atoms for each property in ControlSettings
export const controlIdAtom = atom((get) => get(controlSettingsAtom)?.id || '');
export const componentTypeAtom = atom((get) => get(controlSettingsAtom)?.componentType || '');
export const controlLabelAtom = atom((get) => get(controlSettingsAtom)?.label || '');
export const controlHelpTextAtom = atom((get) => get(controlSettingsAtom)?.helpText || '');
export const controlTypeAtom = atom((get) => get(controlSettingsAtom)?.type || '');
export const controlValueAtom = atom((get) => get(controlSettingsAtom)?.value || 0);
export const controlMinAtom = atom((get) => get(controlSettingsAtom)?.min || 0);
export const controlMaxAtom = atom((get) => get(controlSettingsAtom)?.max || 100);
export const controlStepAtom = atom((get) => get(controlSettingsAtom)?.step || 1);
export const controlChoicesAtom = atom((get) => get(controlSettingsAtom)?.choices || [] as Choice[]);

// Atom families for dynamic elements in ControlSettings
export const choiceAtomFamily = atomFamily((index: number) =>
    atom((get) => get(controlChoicesAtom)?.[index] || {} as Choice)
);

// Derived atom for QuickChatSettings
export const derivedQuickChatSettingsAtom = atom<QuickChatSettings>((get) => ({
    aiPreferencesMain: get(aiPreferencesMainAtom),
    aiPreferencesSecond: get(aiPreferencesSecondAtom),
    makeSmallTalk: get(makeSmallTalkAtom),
    quickAnswer: get(quickAnswerAtom),
    improveQuestions: get(improveQuestionsAtom),
    submitOnEnter: get(submitOnEnterAtom),
}));

// Derived atom for AIModelSettings
export const derivedAIModelSettingsAtom = atom<AIModelSettings>((get) => ({
    id: get(aiModelIdAtom),
    api: get(aiModelApiAtom),
    model: get(aiModelAtom),
    commonName: get(aiModelCommonNameAtom),
    class: get(aiModelClassAtom),
    type: get(aiModelTypeAtom),
    limitations: get(aiModelLimitationsAtom),
    controls: get(aiModelControlsAtom),
}));

// Derived atom for ControlSettings
export const derivedControlSettingsAtom = atom<ControlSettings>((get) => ({
    id: get(controlIdAtom),
    componentType: get(componentTypeAtom),
    label: get(controlLabelAtom),
    helpText: get(controlHelpTextAtom),
    type: get(controlTypeAtom),
    value: get(controlValueAtom),
    min: get(controlMinAtom),
    max: get(controlMaxAtom),
    step: get(controlStepAtom),
    choices: get(controlChoicesAtom),
}));

// Derived atom for all settings
export const derivedSettingsAtom = atom<Settings>((get) => ({
    quickChatSettings: get(derivedQuickChatSettingsAtom),
    aiModelSettings: get(derivedAIModelSettingsAtom),
    controlSettings: get(derivedControlSettingsAtom),
    pageSettings: get(pageSettingsAtom),
    userSettings: get(userSettingsAtom),
    matrixSettings: get(matrixSettingsAtom),
    clientSettings: get(clientSettingsAtom),
    agencySettings: get(agencySettingsAtom),
    variablesSettings: get(variablesSettingsAtom),
    responseSettings: get(responseSettingsAtom),
    brokerSettings: get(brokerSettingsAtom),
}));
