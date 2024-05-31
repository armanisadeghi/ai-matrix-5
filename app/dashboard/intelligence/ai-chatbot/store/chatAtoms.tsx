import { atom } from 'jotai';
import { ChatRequest } from '@/types/chat';
import { defaultChatRequest } from '@/app/dashboard/intelligence/chat-app/utils/defaults';

// Define atoms
export const chatDataAtom = atom<ChatRequest>(defaultChatRequest);
export const updateChatDataAtom = atom(
    null,
    (get, set, newData: Partial<ChatRequest>) => {
        const currentChatData = get(chatDataAtom);
        set(chatDataAtom, { ...currentChatData, ...newData });
    }
);
