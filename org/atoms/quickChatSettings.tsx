// /atoms/quickChatSettingsAtoms.tsx

import { atom } from 'jotai';
import { AI_PREFERENCES_MAIN, AI_PREFERENCES_SECOND } from '../config/aiRequestOptions';

// Individual atoms for each property in quickChatSettings
export const aiPreferencesMainAtom = atom<typeof AI_PREFERENCES_MAIN>(AI_PREFERENCES_MAIN);
export const aiPreferencesSecondAtom = atom<typeof AI_PREFERENCES_SECOND>(AI_PREFERENCES_SECOND);
export const makeSmallTalkAtom = atom<boolean>(true);
export const quickAnswerAtom = atom<boolean>(false);
export const improveQuestionsAtom = atom<boolean>(true);
export const submitOnEnterAtom = atom<boolean>(true);

// Derived atom for the entire quickChatSettings data
export const quickChatSettingsAtom = atom(
    (get) => ({
        aiPreferencesMain: get(aiPreferencesMainAtom),
        aiPreferencesSecond: get(aiPreferencesSecondAtom),
        makeSmallTalk: get(makeSmallTalkAtom),
        quickAnswer: get(quickAnswerAtom),
        improveQuestions: get(improveQuestionsAtom),
        submitOnEnter: get(submitOnEnterAtom),
    })
);
