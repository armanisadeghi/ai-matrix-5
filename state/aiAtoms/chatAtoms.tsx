// app/samples/ai-tests/shared/aiAtoms/chatAtoms.tsx

import {
    atom,
    atomFamily,
    selectorFamily,
    useRecoilCallback,
    useRecoilState,
    selector,
} from 'recoil';
import { syncEffect } from 'recoil-sync';
import { writableArray, writableObject, string, number } from '@recoiljs/refine';

import supabase from "@/utils/supabase/client";

import { ChatMessages, ChatSummary, MatrixMessage, Role } from '@/types/chat';
import Chat from "@/services/Chat";
import { activeUserAtom } from "@/state/userAtoms";

// Selectors for fetching chat summaries and details from Supabase
export const chatSummariesSelector = selector({
    key: 'chatSummariesSelector',
    get: async ({get}) => {
        const userId = get(activeUserAtom)?.sub;
        if (!userId) throw new Error('User not found');

        const {
            data,
            error
        } = await supabase
            .from('chats')
            .select('chat_id, chat_title')
            .eq('user_id', userId);

        if (error) throw error;

        return data.map(chat => ({
            chatId: chat.chat_id,
            chatTitle: chat.chat_title
        }));
    },
});

export const chatDetailsSelector = selector({
    key: 'chatDetailsSelector',
    get: async ({get}) => {
        const chatId = get(activeChatIdAtom);
        if (!chatId) throw new Error('Chat not selected');

        const {
            data,
            error
        } = await supabase
            .from('chats')
            .select('*')
            .eq('chat_id', chatId)
            .single();

        if (error) throw error;

        return {
            chatId: data.chat_id,
            createdAt: data.created_at,
            userId: data.user_id,
            chatTitle: data.chat_title,
            messagesArray: data.messages_array,
            lastEdited: data.last_edited,
            metadata: data.metadata,
        };
    },
});

// Checker for ChatMessages using writableArray and writableObject
const chatMessagesChecker = writableArray(
    writableObject({
        index: number(),
        role: string(),
        text: string(),
    })
);

export const chatMessagesAtomFamily = atomFamily<ChatMessages, string>({
    key: 'chatMessages',
    default: [],
    effects: (chatId) => [
        syncEffect({
            itemKey: `chatMessages-${chatId}`,
            refine: chatMessagesChecker,
        }),
    ],
});

export const useFetchAndStoreChatDetails = () => {
    return useRecoilCallback(({
                                  snapshot,
                                  set
                              }) => async (chatId: string) => {
        const chatDetails = await snapshot.getPromise(chatDetailsSelector);
        set(chatMessagesAtomFamily(chatId), chatDetails.messagesArray);
        set(activeChatMessagesArrayAtom, chatDetails.messagesArray);
        return chatDetails;
    });
};

export const allowSubmitMessageState = atom({
    key: 'allowSubmitMessageState',
    default: true,
});

export const activeChatIdAtom = atom<string | null>({
    key: 'activeChatId',
    default: null
});

export const selectedChatMessagesSelector = selectorFamily<ChatMessages, string>({
    key: 'selectedChatMessages',
    get: (chatId) => ({get}) => get(chatMessagesAtomFamily(chatId)),
});

export const assistantTextStreamAtom = atom<string>({
    key: 'assistantTextStreamAtom',
    default: '',
});

export const userTextInputAtom = atom<string>({
    key: 'userTextInputAtom',
    default: '',
});

export const systemMessagesAtom = atom<MatrixMessage>({
    key: 'systemMessagesAtom',
    default: {
        index: 0,
        text: 'You are a helpful assistant.',
        role: 'system'
    },
});

export const startingMessageArrayAtom = atom<MatrixMessage[]>({
    key: 'startingMessageArray',
    default: [{
        index: 0,
        text: 'You are a helpful assistant.',
        role: 'system'
    }],
});

export const activeChatMessagesArrayAtom = atom<MatrixMessage[]>({
    key: 'activeChatMessagesArrayAtom',
    default: [],
});

const chatSummaryChecker = writableArray(
    writableObject({
        chatId: string(),
        chatTitle: string(),
    })
);

export const chatSummaryAtom = atom<ChatSummary[]>({
    key: 'chatSummary',
    default: [],
    effects: [
        syncEffect({
            refine: chatSummaryChecker,
        }),
    ],
});

export const userMessageAtom = atom<string>({
    key: 'userMessageAtom',
    default: '',
});

export const ChatSidebarListAtom = atom<{ chatId: string, chatTitle: string }[]>({
    key: 'ChatSidebarListAtom',
    default: [],
});

export const chatTitlesAndIdsAtom = atom<{ chatId: string, chatTitle: string }[]>({
    key: 'chatTitlesAndIdsAtom',
    default: [],
});

// Utility Functions
export const useChatMessages = () => {
    const [messages, setMessages] = useRecoilState(activeChatMessagesArrayAtom);

    const addMessage = (message: MatrixMessage) => {
        setMessages([...messages, message]);
        console.log('useChatMessages messages', messages);
    };

    const deleteMessage = (index: number) => {
        setMessages(messages.filter((_, i) => i !== index));
    };

    const resetToIndex = (index: number) => {
        setMessages(messages.slice(0, index + 1));
    };

    const editMessage = (index: number, newMessage: MatrixMessage) => {
        const newMessages = [...messages];
        newMessages[index] = newMessage;
        setMessages(newMessages);
    };

    const addMessageWithRole = (index: number, text: string, role: Role) => {
        const newMatrixMessage: MatrixMessage = {
            index,
            text,
            role
        };
        setMessages(currentMessages => [...currentMessages, newMatrixMessage]);
        console.log('useChatMessages newMatrixMessage', newMatrixMessage);
        console.log('useChatMessages updatedMessages', messages);
    };
    return {
        messages,
        addMessage,
        deleteMessage,
        resetToIndex,
        editMessage,
        addMessageWithRole,
    };
};

export const messageFilterState = atom({
    key: 'messageFilterState',
    default: 'all',
});

export const filteredMessagesState = selector({
    key: 'FilteredMessages',
    get: ({get}) => {
        const filter = get(messageFilterState);
        const messages = get(activeChatMessagesArrayAtom);

        switch (filter) {
            case 'user':
                return messages.filter((message) => message.role === 'user');
            case 'assistant':
                return messages.filter((message) => message.role === 'assistant');
            case 'system':
                return messages.filter((message) => message.role === 'system');
            default:
                return messages;
        }
    },
});

const transformedMessagesState = selector<MatrixMessage[]>({
    key: 'TransformedMessages',
    get: ({get}) => {
        const messages: MatrixMessage[] = get(activeChatMessagesArrayAtom);
        const filter = get(messageFilterState);

        switch (filter) {
            case 'matrix':
            case 'openai':
            case 'google':
            case 'ollama':
            case 'hugging tree':
                return messages.map(message => ({
                    ...message,
                    content: message.text // Replace "text" with "content" if needed
                }));

            case 'anthropic':
                const filteredMessages = messages.filter(message => message.role !== 'system');
                const systemMessages = messages.filter(message => message.role === 'system').map(message => ({
                    ...message,
                    content: message.text
                }));
                // set(systemMessagesAtom, systemMessages); // Assuming `set` is part of a Recoil selectorFamily or other suitable structure
                return filteredMessages.map(message => ({
                    ...message,
                    content: message.text
                }));

            default:
                return messages;
        }
    },
});

export const assistantMatrixMessageAtom = atom<MatrixMessage>({
    key: 'assistantMatrixMessageAtom',
    default: {
        index: 100,
        text: '',
        role: 'assistant'
    },
});

export const userMatrixMessageAtom = atom<MatrixMessage>({
    key: 'userMatrixMessageAtom',
    default: {
        index: 100,
        text: '',
        role: 'user'
    },
});

// Selector to get the count of all messages
export const messageCountSelector = selector<number>({
    key: 'messageCountSelector',
    get: ({get}) => {
        const messages = get(activeChatMessagesArrayAtom);

        return messages.length;
    },
});

// Selector to get character count for all messages
export const totalCharacterCountSelector = selector<number>({
    key: 'totalCharacterCountSelector',
    get: ({get}) => {
        const messages = get(activeChatMessagesArrayAtom);
        return messages.reduce((total, message) => total + message.text.length, 0);
    },
});

// Selector to get character count for messages of a specific role
export const characterCountByRoleSelector = (role: Role) =>
    selector<number>({
        key: `characterCountByRoleSelector-${role}`,
        get: ({get}) => {
            const messages = get(activeChatMessagesArrayAtom);
            return messages
                .filter((message) => message.role === role)
                .reduce((total, message) => total + message.text.length, 0);
        },
    });

export const formResponsesAtom = atom<{ [key: string]: string }>({
    key: 'formResponsesAtom',
    default: {},
});

export const customInputsAtom = atom<string[]>({
    key: 'customInputsAtom',
    default: [],
});

export const messagesAtom = atom<{ text: string, role: Role }[]>({
    key: 'messagesAtom',
    default: [],
});

export const allChatsAtom = atom<Chat[]>({
    key: 'allChatsAtom',
    default: [],
});

export const detailsForAllChatsAtom = atom<Chat[]>({
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


