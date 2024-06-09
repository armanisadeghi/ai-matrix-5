// recoil/atoms/settingsAtoms.ts
import { atom, selector } from 'recoil';
import {AIModel} from "@/app/samples/ai-tests/shared/config/aiModels";

export const aiPreferencesMainAtom = atom<string>({
    key: 'aiPreferencesMainAtom',
    default: 'direct_chat',
});

export const aiPreferencesSecondAtom = atom<string>({
    key: 'aiPreferencesSecondAtom',
    default: 'one_ai_chat',
});

export const makeSmallTalkAtom = atom<boolean>({
    key: 'makeSmallTalkAtom',
    default: false,
});

export const quickAnswerAtom = atom<boolean>({
    key: 'quickAnswerAtom',
    default: false,
});

export const improveQuestionsAtom = atom<boolean>({
    key: 'improveQuestionsAtom',
    default: false,
});

export const submitOnEnterAtom = atom<boolean>({
    key: 'submitOnEnterAtom',
    default: true,
});

export const quickChatSettingsAtom = selector({
    key: 'quickChatSettingsAtom',
    get: ({ get }) => ({
        aiPreferencesMain: get(aiPreferencesMainAtom),
        aiPreferencesSecond: get(aiPreferencesSecondAtom),
        makeSmallTalk: get(makeSmallTalkAtom),
        quickAnswer: get(quickAnswerAtom),
        improveQuestions: get(improveQuestionsAtom),
        submitOnEnter: get(submitOnEnterAtom),
    }),
});

export const aiModelAtom = atom<AIModel>({
    key: 'modelAtom',
    default:     {
        "id": "gpt-4o",
        "created": "1715367049",
        "object": "model",
        "owned_by": "system"
    },
});

export const temperatureAtom = atom<number>({
    key: 'temperatureAtom',
    default: 1,
});

export const maxTokensAtom = atom<number>({
    key: 'maxTokens',
    default: 500,
});
