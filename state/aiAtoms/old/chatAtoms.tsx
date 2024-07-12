/*
// state/aiAtoms/chatAtoms.tsx
import { ChatWithJsons } from '@/types';
import { Chat, ChatMessages, ChatSummary, Role } from '@/types/chat';
import { atom, atomFamily, selector, selectorFamily, useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { writableArray, writableObject, number, string } from '@recoiljs/refine';
import { syncEffect } from 'recoil-sync';
import supabase from '@/utils/supabase/client';
import { Message } from '@/types/chat.types';
import { Database, Json } from '@/types/database.types';


export type Chats = Database['public']['Tables']['chats']['Row'];
export type ChatInsert = Database['public']['Tables']['chats']['Insert'];
export type ChatUpdate = Database['public']['Tables']['chats']['Update'];
export type user = Database['public']['Tables']['user']['Row'];



// These were great before the last set of updates so it's just silly type errors because we're getting back a json.
// Selector for fetching detailed chat information from Supabase
/!*
export const chatDetailsSelector = selector<ChatWithJsons>({
    key: 'chatDetailsSelector',
    get: async ({get}) => {
        const chatId = get(activeChatIdAtom);
        if (!chatId) throw new Error('Chat not selected');

        const { data, error } = await supabase.rpc('fetch_chat_messages', { p_chat_id: chatId });

        if (error) throw error;

        if (!data) throw new Error('No data returned from fetch_chat_messages');

        return {
            matrixId: data.matrixId,
            chatId: data.chatId,
            createdAt: data.createdAt,
            chatTitle: data.chatTitle,
            lastEdited: data.lastEdited,
            metadata: data.metadata,
            messages: data.messages,
        } as ChatWithJsons;
    },
});


// Utility to fetch and store chat details
export const useFetchAndStoreChatDetails = () => {
    return useRecoilCallback((
        { snapshot, set }) => async (chatId: string) => {
        const chatDetails = await snapshot.getPromise(chatDetailsSelector);
        set(chatMessagesAtomFamily(chatId), chatDetails.messages_array);
        set(activeChatMessagesArrayAtom, chatDetails.messages_array);
        return chatDetails;
    });
};
 *!/

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









 export const selectedChatMessagesSelector = selectorFamily<ChatMessages, string>({
    key: 'selectedChatMessages',
    get: (chatId) => ({get}) => get(chatMessagesAtomFamily(chatId)),
});

export const allowSubmitMessageState = atom({
    key: 'allowSubmitMessageState',
    default: true,
});

export const systemMessagesAtom = atom<Message>({
    key: 'systemMessagesAtom',
    default: {
        index: 0,
        text: 'You are a helpful assistant.',
        role: 'system'
    },
});

export const startingMessageArrayAtom = atom<Message[]>({
    key: 'startingMessageArray',
    default: [{
        index: 0,
        text: 'You are a helpful assistant.',
        role: 'system'
    }],
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

    const addMessage = (message: Message) => {
        setMessages([...messages, message]);
        console.log('useChatMessages messages', messages);
    };

    const deleteMessage = (index: number) => {
        setMessages(messages.filter((_, i) => i !== index));
    };

    const resetToIndex = (index: number) => {
        setMessages(messages.slice(0, index + 1));
    };

    const editMessage = (index: number, newMessage: Message) => {
        const newMessages = [...messages];
        newMessages[index] = newMessage;
        setMessages(newMessages);
    };

    const addMessageWithRole = (index: number, text: string, role: Role) => {
        const newMatrixMessage: Message = {
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

const transformedMessagesState = selector<Message[]>({
    key: 'TransformedMessages',
    get: ({get}) => {
        const messages: Message[] = get(activeChatMessagesArrayAtom);
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
                return filteredMessages.map(message => ({
                    ...message,
                    content: message.text
                }));

            default:
                return messages;
        }
    },
});

export const assistantMatrixMessageAtom = atom<Message>({
    key: 'assistantMatrixMessageAtom',
    default: {
        index: 100,
        text: '',
        role: 'assistant'
    },
});

export const userMatrixMessageAtom = atom<Message>({
    key: 'userMatrixMessageAtom',
    default: {
        index: 100,
        text: '',
        role: 'user'
    },
});

export const messageCountSelector = selector<number>({
    key: 'messageCountSelector',
    get: ({get}) => {
        const messages = get(activeChatMessagesArrayAtom);

        return messages.length;
    },
});


export const totalCharacterCountSelector = selector<number>({
    key: 'totalCharacterCountSelector',
    get: ({get}) => {
        const messages = get(activeChatMessagesArrayAtom);
        return messages.reduce((total, message) => total + (message.text ?? '').length, 0);
    },
});

export const characterCountByRoleSelector = (role: Role) =>
    selector<number>({
        key: `characterCountByRoleSelector-${role}`,
        get: ({get}) => {
            const messages = get(activeChatMessagesArrayAtom);
            return messages
            .filter((message) => message.role === role)
            .reduce((total, message) => total + (message.text ?? '').length, 0);
        },
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

export const activeChatTitleAtom = atom<string | undefined>({
    key: 'activeChatTitleAtom',
    default: undefined,
});



export const updateChat = async (chatId: string, updatedChat: Partial<Chat>) => {
    const {data, error} = await supabase.from('chats').update(updatedChat).eq('chat_id', chatId).single();

    if (error) {
        throw error;
    }

    return data as Chat;
};

export const deleteChat = async (chatId: string) => {
    const {data, error} = await supabase.from('chats').delete().eq('chat_id', chatId);

    if (error) {
        throw error;
    }

    return data;
};



/!*


export const userChatsSelector = selectorFamily<Chat[], string>({
    key: 'userChatsSelector',
    get: (userId) => async ({get}) => {
        const {data, error} = await supabase.from('chats').select('*').eq('user_id', userId);

        if (error) {
            throw error;
        }

        return data as Chat[];
    },
});

export const chatSelector = selectorFamily<Chat, string>({
    key: 'chatSelector',
    get: (chatId) => ({get}) => {
        return get(chatAtomFamily(chatId));
    },
});


export const chatAtomFamily = atomFamily<Chat | null, string>({
    key: 'chatAtomFamily',
    default: null,
});

export const chatSelectorFamily = selectorFamily<Chat | null, string>({
    key: 'chatSelectorFamily',
    get: (chatId) => async ({ get }) => {
        const chat = get(chatAtomFamily(chatId));
        if (chat !== null) {
            return chat;
        }

        const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('chat_id', chatId)
        .single();

        if (error) {
            throw error;
        }

        return data as Chat;
    },
    set: (chatId) => ({ set, reset }, newValue) => {
        if (newValue === null) {
            reset(chatAtomFamily(chatId));
        } else {
            set(chatAtomFamily(chatId), newValue);
        }
    },
});



export const createChat = async (chat: Omit<Chat, 'chat_id'>) => {
    const {data, error} = await supabase.from('chats').insert(chat).single();

    if (error) {
        throw error;
    }

    return data as Chat;
};






export const useUserChats = (userId: string) => {
    const chats = useRecoilValue(userChatsSelector(userId));
    const fetchChats = useRecoilCallback(({ set }) => async () => {
        const { data, error } = await supabase.from('chats').select('*').eq('user_id', userId);

        if (error) {
            throw error;
        }

        set(userChatSummeriesAtom, data.map((chat) => chat.chat_id));
    });

    return { chats, fetchChats };
};


*!/
*/
