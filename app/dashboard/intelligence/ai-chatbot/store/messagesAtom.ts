// chat-app/state/messagesAtom.ts
import { atom } from 'jotai';

interface Message {
    id: string;
    content: string;
}

export const messagesAtom = atom<Record<string, Message>>({});
