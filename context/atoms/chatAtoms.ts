// recoil/atoms/chatAtoms.ts

import { atom } from 'recoil';
import Chat, { Role } from '@/services/Chat';

type ChatArray = Chat[];

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

export const systemMessagesAtom = atom<{ text: string, role: Role }[]>({
    key: 'systemMessagesAtom',
    default: [{
        text: 'You are a helpful assistant.',
        role: 'system'
    }],
});

export const allChatsAtom = atom<Chat[]>({
    key: 'allChatsAtom',
    default: [],
});

export const activeChatIdAtom = atom<string>({
    key: 'activeChatIdAtom',
    default: 'new-chat',
});

export const activeChatMessagesArrayAtom = atom<any[]>({
    key: 'activeChatMessagesArrayAtom',
    default: [],
});

export const ChatSidebarListAtom = atom<{ chatId: string, chatTitle: string }[]>({
    key: 'ChatSidebarListAtom',
    default: [],
});



export const detailsForAllChatsAtom = atom<ChatArray>({
    key: 'detailsForAllChatsAtom',
    default: [],
});
export const chatTitlesAndIdsAtom = atom<{ chatId: string, chatTitle: string }[]>({
    key: 'chatTitlesAndIdsAtom',
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

