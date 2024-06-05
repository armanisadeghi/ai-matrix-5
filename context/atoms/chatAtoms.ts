// recoil/atoms/chatAtoms.ts

import { atom, selector } from 'recoil';
import Chat from '@/services/Chat';

type ChatArray = Chat[];

export type Role = 'system' | 'user' | 'assistant';

export interface MessageEntry {
    role: Role;
    text: string;
}


type systemEntry = {
    text: string;
    role: string;
};




type NewChatStart = {
    chatTitle: string;
    systemEntry: systemEntry;
};







export const messagesAtom = atom<{ text: string, role: Role }[]>({
    key: 'messagesAtom',
    default: [],
});


export const allChatsAtom = atom<Chat[]>({
    key: 'allChatsAtom',
    default: [],
});



export const detailsForAllChatsAtom = atom<ChatArray>({
    key: 'detailsForAllChatsAtom',
    default: [],
});

export const activeChatDetailsAtom = atom<Chat | undefined>({
    key: 'activeChatDetailsAtom',
    default: undefined,
});
export const activeChatTitleAtom = atom<string | undefined>({
    key: 'activeChatTitleAtom',
    default: undefined,
});



