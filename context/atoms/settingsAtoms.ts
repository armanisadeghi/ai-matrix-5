// recoil/atoms/settingsAtoms.ts
import { atom, selector } from 'recoil';

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
