import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { v4 as uuidv4 } from 'uuid';
import { Chat, MessageEntry, ChatIDType, MessageIDType, TimestampType, RoleType } from '../types/chatData';
import { submitChatRequest } from "@/app/samples/trial-chat/components/chatService";
import { atomWithStorage } from 'jotai/utils';

// Granular atoms for individual elements
export const chatIdAtom = atom<ChatIDType | null>(null);
export const chatTitleAtom = atom<string>('');
export const chatMessagesAtom = atom<MessageEntry[]>([]);

// Atom to store the streaming status, defaults to false
export const isStreamingAtom = atom(false);

// Atom to store the user's preference for "Submit on Enter"
export const submitOnEnterAtom = atomWithStorage('submitOnEnter', false);

// Atom family for messages
export const messageAtomFamily = atomFamily((messageId: MessageIDType) => atom<MessageEntry | null>(null), (a, b) => a === b);

// Atom to store the list of all chats
export const allChatsAtom = atom<Chat[]>([]);

// Derived atom to get current chat as an object
export const currentChatAtom = atom(
    (get) => {
        const chatId = get(chatIdAtom);
        if (chatId) {
            return get(allChatsAtom).find(chat => chat.chatId === chatId) || null;
        }
        return null;
    },
    (get, set, updatedChat: Chat) => {
        const existingChats = get(allChatsAtom);
        const chatIndex = existingChats.findIndex(chat => chat.chatId === updatedChat.chatId);
        if (chatIndex > -1) {
            const updatedChats = [...existingChats];
            updatedChats[chatIndex] = updatedChat;
            set(allChatsAtom, updatedChats);
        } else {
            set(allChatsAtom, [...existingChats, updatedChat]);
        }
        set(chatIdAtom, updatedChat.chatId);
        set(chatTitleAtom, updatedChat.title);
        set(chatMessagesAtom, updatedChat.messages);
    }
);

// Action atom to add a message to the current chat
export const addMessageAtom = atom(
    null,
    async (get, set, { text, role }: { text: string, role: RoleType }) => {
        const chatId = get(chatIdAtom);
        if (!chatId) {
            // Initialize new chat
            const newChatId = uuidv4() as ChatIDType;
            const newMessage: MessageEntry = {
                text,
                role,
            };
            const newChat: Chat = {
                chatId: newChatId,
                title: text,
                messages: [newMessage],
            };
            set(currentChatAtom, newChat);
        } else {
            // Add message to existing chat
            const newMessage: MessageEntry = {
                text,
                role,
            };
            const currentChat = get(currentChatAtom);
            if (currentChat) {
                const updatedChat: Chat = {
                    ...currentChat,
                    messages: [...currentChat.messages, newMessage],
                };
                set(currentChatAtom, updatedChat);

                if (role === 'user') {
                    const responseCount = currentChat.messages.filter(msg => msg.role === 'assistant').length;

                    set(isStreamingAtom, true);

                    await submitChatRequest(updatedChat, responseCount, (assistantMessage) => {
                        const currentMessages = get(chatMessagesAtom);
                        set(chatMessagesAtom, [...currentMessages, assistantMessage]);

                        const updatedChat = get(currentChatAtom);
                        if (updatedChat) {
                            set(currentChatAtom, {
                                ...updatedChat,
                                messages: [...updatedChat.messages, assistantMessage],
                            });
                        }
                    });

                    set(isStreamingAtom, false); // Turn off streaming icon after response is COMPLETELY DONE!
                }
            }
        }
    }
);

// Action atom to edit the title of the current chat
export const editChatTitleAtom = atom(
    null,
    (get, set, newTitle: string) => {
        const chatId = get(chatIdAtom);
        if (chatId) {
            const currentChat = get(currentChatAtom);
            if (currentChat) {
                const updatedChat: Chat = {
                    ...currentChat,
                    title: newTitle,
                };
                set(currentChatAtom, updatedChat);
            }
        }
    }
);

// Action atom to switch to a different chat by ID
export const switchChatAtom = atom(
    null,
    (get, set, chatId: ChatIDType) => {
        const chat = get(allChatsAtom).find(chat => chat.chatId === chatId);
        if (chat) {
            set(chatIdAtom, chat.chatId);
            set(chatTitleAtom, chat.title);
            set(chatMessagesAtom, chat.messages);
        } else {
            console.error('Chat not found. Cannot switch chat.');
        }
    }
);

// Action atom to start a new chat
export const startNewChatAtom = atom(
    null,
    (get, set) => {
        // Save the current chat before starting a new one if it's not empty
        const currentChat = get(currentChatAtom);
        if (currentChat && currentChat.messages.length > 0) {
            set(currentChatAtom, currentChat);
        }

        // Initialize a new chat with a placeholder ID and title
        const newChatId = uuidv4() as ChatIDType;
        const newChat: Chat = {
            chatId: newChatId,
            title: 'New Chat',
            messages: [],
        };

        set(currentChatAtom, newChat);
    }
);
