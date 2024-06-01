// /atoms/chatDataAtoms.tsx

import { atom } from 'jotai';

// Primitive atoms for chat properties
export const chatIdAtom = atom<string>('');
export const chatTitleAtom = atom<string>('');

// Primitive atoms for message properties
export const messageIdAtom = atom<string>('');
export const messageTextAtom = atom<string>('');
export const timestampAtom = atom<string>('');

// Derived atom for system messages
export const systemMessageAtom = atom(
    (get) => ({
        messageId: get(messageIdAtom),
        messageText: get(messageTextAtom),
        timestamp: get(timestampAtom),
        role: 'system',
    })
);

// Derived atom for user messages
export const userMessageAtom = atom(
    (get) => ({
        messageId: get(messageIdAtom),
        messageText: get(messageTextAtom),
        timestamp: get(timestampAtom),
        role: 'user',
    })
);

// Derived atom for assistant messages
export const assistantMessageAtom = atom(
    (get) => ({
        messageId: get(messageIdAtom),
        messageText: get(messageTextAtom),
        timestamp: get(timestampAtom),
        role: 'assistant',
    })
);

// Derived atom for chat messages
export const chatMessagesAtom = atom((get) => [
    get(systemMessageAtom),
    get(userMessageAtom),
    get(assistantMessageAtom)
]);

// Derived atom for the entire chat data
export const chatDataAtom = atom(
    (get) => ({
        chatId: get(chatIdAtom),
        chatTitle: get(chatTitleAtom),
        chatMessages: get(chatMessagesAtom),
    })
);

// Primitive atoms for additional chat properties
export const currentChatAtom = atom<string>('');
export const isStreamingAtom = atom<boolean>(false);
export const submitOnEnterAtom = atom<boolean>(true);
