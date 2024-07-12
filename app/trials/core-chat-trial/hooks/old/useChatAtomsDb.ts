/*
// hooks43/ai/useChatAtomsDb.ts
import { activeChatIdAtom, systemMessageAtom, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import supabase from '@/utils/supabase/client';
import { atom, DefaultValue, selector, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { activeUserAtom } from '@/state/userAtoms';


export interface User {
    matrixId: string;
}

export interface NewChat {
    user_matrix_id: string | null;
    system_message: string | null;
    user_message: string | null;
}

export const newChatSelector = selector<NewChat>({
    key: 'newChatSelector',
    get: ({ get }) => {
        const systemMessage = get(systemMessageAtom);
        const userMessage = get(userTextInputAtom);
        const activeUser = get(activeUserAtom);

        return {
            user_matrix_id: activeUser.matrixId,
            system_message: systemMessage,
            user_message: userMessage,
        };
    },
});



export const chatSummariesAtom = atom<>({
    key: 'chatSummariesAtom',
    default: [],
});

export const chatSummariesSelector = selector({
    key: 'chatSummariesSelector',
    get: async ({get}) => {
        const activeUser = get(activeUserAtom);
        const {data, error} = await supabase.rpc('fetch_user_chats', {user_matrix_id: activeUser.matrixId});
        if (error) {
            console.error('Error fetching chats:', error.message);
            return [];
        }
        return data;
    }
});


export const chatMessagesArrayAtom = atom({
    key: 'chatMessagesArrayAtom',
    default: undefined,
});



export const chatMessagesSelector = selector({
    key: 'chatMessagesSelector',
    get: async ({get}) => {
        const activeChatId = get(activeChatIdAtom);
        if (!activeChatId) {
            return undefined;
        }
        const {data, error} = await supabase.rpc('fetch_chat_messages', {p_chat_id: activeChatId});
        if (error) {
            console.error('No chat messages to display:', error.message);
            return undefined;
        }
        console.log('Chat messages:', data);
        return data as unknown as ChatWithMessages;
    },
    set: ({set}, newValue) => {
        if (!(newValue instanceof DefaultValue)) {
            console.log('Setting chat messages:', newValue);
            set(chatMessagesArrayAtom, newValue as ChatWithMessages | undefined);
        }
    }
});




export const addSystemMessage = async (chatId: string, message: string) => {
    const {data, error} = await supabase.rpc('add_system_message', {chat_id: chatId, message});
    if (error) {
        console.error('Error adding system message:', error.message);
        return;
    }
    console.log('System message added:', data);
};




async function fetchCompleteChatMessages(chatId: string): Promise<FullChatWithMessages[]> {
    const {data, error} = await supabase.rpc('fetch_complete_chat_with_messages', {p_chat_id: chatId});

    if (error) {
        console.error('Error fetching chat messages:', error);
        throw error;
    } else {
        console.log('Chat messages:', data);
        return data as any;
    }
}


// Not in use at this time.

export const chatSummaryUpdateSelector = selector<Chat[]>({
    key: 'chatSummaryUpdateSelector',
    get: ({get}) => get(chatSummariesAtom),
    set: ({set, get}, newChats) => {
        const currentChats = get(chatSummariesAtom);
        const updatedChats = [...currentChats, ...(newChats as Chat[])];
        set(chatSummariesAtom, updatedChats);

        // Add chats update here
        // e.g., supabase.from('chats').upsert(updatedChats);
    },
});

export const useChatAtomsDb = () => {
    const setChats = useSetRecoilState(chatSummaryUpdateSelector);
    const user = useRecoilValueLoadable(activeUserAtom);
    const chatsLoadable = useRecoilValueLoadable(chatSummariesSelector);

    const addChat = (newChat: Chat) => {
        setChats((prevChats) => [...prevChats, newChat]);
        // Add logic to update the database if needed
        // e.g., supabase.from('chats').insert(newChat);
    };

    const refreshChats = async () => {
        if (user.state === 'hasValue' && user.contents) {
            if (chatsLoadable.state === 'hasValue') {
                setChats(chatsLoadable.contents);
            }
        }
    };

    return {
        chats: chatsLoadable.state === 'hasValue' ? chatsLoadable.contents : [],
        addChat,
        refreshChats,
        loading: chatsLoadable.state === 'loading',
        error: chatsLoadable.state === 'hasError' ? chatsLoadable.contents : null,
    };
};


// This atom could hold the results for fetch_complete_chat_with_messages
export const activeChatDetailsAtom = atom<ChatWithMessages | undefined>({
    key: 'activeChatDetailsAtom',
    default: undefined,
});




export const useAddMessage = (chatId: string) => {
    const addMessage = useRecoilCallback(({ set }) => async (message: Message) => {
        if (!message.message) {
            console.error('Message content cannot be null or empty');
            return;
        }

        set(chatWithMessagesFamily(chatId), oldChat => ({
            ...oldChat,
            messages: [...oldChat.messages, message],
        }));

        try {
            await addUserMessage(chatId, message.message);
        } catch (error) {
            console.error('Failed to add message:', error);
            set(chatWithMessagesFamily(chatId), oldChat => ({
                ...oldChat,
                messages: oldChat.messages.filter(m => m.id !== message.id),
            }));
        }
    });
    return addMessage;
};

 */
