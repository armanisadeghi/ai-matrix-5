// HistoryAtoms.ts
import { atom } from 'jotai';
import { loadChatHistory } from '@/app/dashboard/intelligence/ai-chatbot/utils/loadChatHistory';
import { userAtom } from './userAtoms';

interface ChatHistoryChat {
    id: string;
    role: string;
    content: string;
}

interface ChatHistory {
    [chatId: string]: ChatHistoryChat[];
}

// Atoms
export const chatHistoryAtom = atom<ChatHistory>({});
export const statusAtom = atom<'pending' | 'loading' | 'loaded' | 'failed'>('pending');
export const activeChatAtom = atom<string | null>(null);

// Derived atom to handle chat history loading
export const loadChatHistoryAtom = atom(
    null,
    async (get, set) => {
        const user = get(userAtom);
        if (user.userId && user.userToken) {
            set(statusAtom, 'loading');
            try {
                const loadedHistory = await loadChatHistory(user.userId, user);
                set(chatHistoryAtom, loadedHistory.chatHistory); // Assuming the API returns the history in this shape
                set(statusAtom, 'loaded');
            } catch (error) {
                console.error("Failed to load chat history", error);
                set(statusAtom, 'failed');
            }
        }
    }
);

// Atom for individual chat entries
export const chatEntriesAtom = atom(
    (get) => {
        const activeChatId = get(activeChatAtom);
        const chatHistory = get(chatHistoryAtom);
        return activeChatId ? chatHistory[activeChatId] || [] : [];
    }
);

// Atom to update chat history
export const updateChatHistoryAtom = atom(
    null,
    (get, set, { newHistory, chatId }: { newHistory: ChatHistoryChat[]; chatId: string }) => {
        const currentHistory = get(chatHistoryAtom);
        set(chatHistoryAtom, {
            ...currentHistory,
            [chatId]: newHistory,
        });
    }
);

// Atom to add a new chat entry
export const addChatEntryAtom = atom(
    null,
    (get, set, { newEntry, chatId }: { newEntry: ChatHistoryChat; chatId: string }) => {
        const currentHistory = get(chatHistoryAtom);
        const chat = currentHistory[chatId] || [];
        set(chatHistoryAtom, {
            ...currentHistory,
            [chatId]: [...chat, newEntry],
        });
    }
);
