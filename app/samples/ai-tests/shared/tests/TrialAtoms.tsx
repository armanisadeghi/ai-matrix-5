// /app/samples/ai-tests/shared/tests/TrialAtoms.tsx

import { atom } from 'recoil';
import { MessageEntry } from '../../../chats/shared/types/chatData';

export const messageChunksAtom = atom<MessageEntry[]>({
    key: 'messageChunksAtom',
    default: [],
});


export const callbackFunctionAtom = atom<Function | null>({
    key: 'callbackFunctionAtom',
    default: null,
});
