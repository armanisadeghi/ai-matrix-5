import { atom } from 'jotai';
import { GlobalChatData } from '@/types/chat';

// Initial default data setup
const defaultGlobalChatData: GlobalChatData = {
    eventName: '',
    userToken: '',
    eventTask: '',
    recipeId: ''
};

// Define atoms
export const globalChatDataAtom = atom<GlobalChatData>(defaultGlobalChatData);
export const updateGlobalChatDataAtom = atom(
    null,
    (get, set, newData: Partial<GlobalChatData>) => {
        const currentGlobalChatData = get(globalChatDataAtom);
        set(globalChatDataAtom, { ...currentGlobalChatData, ...newData });
    }
);
