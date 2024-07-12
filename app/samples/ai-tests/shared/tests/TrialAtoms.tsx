// /app/samples/ai-tests/shared/tests/TrialAtoms.tsx


import { atom } from 'recoil';
import { MessageEntry } from '@/types/chat.ts';

export const messageChunksAtom = atom<MessageEntry[]>({
    key: 'messageChunksAtom',
    default: [],
});


export const callbackFunctionAtom = atom<Function | null>({
    key: 'callbackFunctionAtom',
    default: null,
});
