// /app/samples/ai-tests/shared/tests/TrialAtoms.tsx


import { MessageEntry } from '@/app/samples/chats/shared/types/chatData';
import { atom } from 'recoil';

export const messageChunksAtom = atom<MessageEntry[]>({
    key: 'messageChunksAtom',
    default: [],
});


export const callbackFunctionAtom = atom<Function | null>({
    key: 'callbackFunctionAtom',
    default: null,
});
