/*
import { activeChatIdAtom, activeChatMessagesArrayAtom, chatSummariesAtom, isNewChatAtom } from '@/state/aiAtoms/aiChatAtoms';
import { activeUserAtom } from '@/state/userAtoms';
import { ChatDetailsType, ChatId, ChatSummaryType, ChatType, MessageType } from '@/types';
import supabase from '@/utils/supabase/client';
import { atom, AtomEffect, atomFamily, DefaultValue, selector, selectorFamily, useRecoilCallback } from 'recoil';


const allChatSummariesAtom = atom<ChatType[]>({
    key: 'allChatSummariesAtom',
    default: selector({
        key: 'allChatSummariesDefault',
        get: async ({get}) => {
            const activeUser = get(activeUserAtom);
            if (!activeUser) return [];
            const {data, error} = await supabase.rpc('fetch_user_chats', {user_matrix_id: activeUser.matrixId});
            if (error) {
                console.error('Failed to fetch chat summaries:', error);
                return [];
            }
            return data || [];
        },
    }),
});

const chatMessagesAtomFamily = atomFamily<MessageType[], string>({
    key: 'chatMessagesAtomFamily',
    default: selectorFamily({
        key: 'chatMessagesDefault',
        get: (chatId: string) => async () => {
            const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: chatId});
            if (error) {
                console.error(`Failed to fetch messages for chat ${chatId}:`, error);
                return [];
            }
            return data || [];
        },
    }),
});

const activeChatMessagesSelector = selector<ChatDetailsType | null>({
    key: 'activeChatMessagesSelector',
    get: ({get}) => {
        const activeChatId = get(activeChatIdAtom);
        if (!activeChatId) return null;

        const allChats = get(allChatSummariesAtom);
        const chatSummary = allChats.find(chat => chat.chatId === activeChatId);
        if (!chatSummary) return null;

        const messages = get(chatMessagesAtomFamily(activeChatId));
        return {...chatSummary, messages};
    },
});

const liveChatsAtomFamily = atomFamily<ChatDetailsType, string>({
    key: 'liveChatsAtomFamily',
    default: {
        chatId: '',
        chatTitle: '',
        createdAt: '',
        lastEdited: '',
        matrixId: '',
        metadata: {},
        messages: [],
    },
});

type SetterInput =
    | DefaultValue
    | ChatDetailsType
    | ChatSummaryType
    | ChatSummaryType[]
    | MessageType
    | MessageType[];

const fetchMessagesIfNeeded = selector<any>({
    key: 'fetchMessagesIfNeeded',
    get: async ({get}) => {
        const isNewChat = get(isNewChatAtom);
        if (isNewChat) return [];
        const chatId = get(activeChatIdAtom);
        if (!chatId) return [];
        const chat = get(liveChatsAtomFamily(chatId));
        if (!chat) return [];
        if (chat.messages.length === 0) {
            const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: chatId});
            if (error) {
                console.error('Failed to fetch messages: ', error);
                return chat.messages;
            }
            return data || [];
        }
        return chat.messages;
    },
    set: ({get, set}, newValue: any) => {
        if (newValue instanceof DefaultValue) {
            return;
        }
        const chatId = get(activeChatIdAtom);
        if (!chatId) return;

        if (isChatDetailsType(newValue)) {
            set(liveChatsAtomFamily(newValue.chatId), newValue);
        } else if (isChatSummaryType(newValue)) {

        } else if (isChatSummaryType(newValue)) {
            set(liveChatsAtomFamily(newValue.chatId), (prevValue) => ({
                ...prevValue,
                ...newValue,
                messages: prevValue.messages,
            }));

        } else if (isArrayOfChatSummaryType(newValue)) {
            newValue.forEach((chatSummary) => {
                set(liveChatsAtomFamily(chatSummary.chatId), (prevValue) => ({
                    ...prevValue,
                    ...chatSummary,
                    messages: prevValue.messages,
                }));
            });
        } else if (isMessageType(newValue)) {
            set(liveChatsAtomFamily(chatId), (prevValue) => ({
                ...prevValue,
                messages: [...prevValue.messages, newValue],
            }));
        } else if (isArrayOfMessageType(newValue)) {
            set(liveChatsAtomFamily(chatId), (prevValue) => ({
                ...prevValue,
                messages: newValue,
            }));
        } else {
            console.error('Invalid value provided to fetchMessagesIfNeeded set method:', newValue);
        }
    },
});

function useSetFetchMessagesIfNeeded() {
    return useRecoilCallback(
        ({set}) =>
            (newValue: SetterInput) => {
                set(fetchMessagesIfNeeded, newValue);
            },
        []
    );
}

const messagesAtomFamily = atomFamily<MessageType[], string>({
    key: 'messagesAtomFamily',
    default: selectorFamily<MessageType[], string>({
        key: 'messagesDefault',
        get: chatId => async () => {
            const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: chatId});
            if (error) {
                console.error('Failed to fetch messages: ', error);
                return [];
            }
            return data || [];
        },
        set: chatId => ({set, get, reset}, newValue) => {
            if (newValue instanceof DefaultValue) {
                reset(messagesAtomFamily(chatId));
            } else {
                const currentMessages = get(messagesAtomFamily(chatId));
                const newMessages = Array.isArray(newValue) ? [...currentMessages, ...newValue] : [...currentMessages, newValue];
                set(messagesAtomFamily(chatId), newMessages);
            }
        }
    }),
});

const activeChatMessagesSelector = selector({
    key: 'activeChatMessagesSelector',
    get: async ({get}) => {
        const chatId = get(activeChatIdAtom);
        if (!chatId) return [];
        try {
            const messages = get(messagesAtomFamily(chatId));
            return messages;
        }
        catch (error) {
            console.error('Failed to fetch messages: ', error);
            return [];
        }
    }
});

const chatSummariesSelectorTwo = selector({
    key: 'chatSummariesSelectorTwo',
    get: async ({get}) => {
        const activeUser = get(activeUserAtom);
        const {data, error} = await supabase.rpc('fetch_user_chats', {user_matrix_id: activeUser.matrixId});
        if (error) {
            console.error('Error fetching chats:', error.message);
            return get(chatSummariesAtom);
        }
        return data;
    },
    set: ({get, set}, newValue) => {
        if (newValue instanceof DefaultValue) {
            set(chatSummariesAtom, newValue);
        } else if (isChatSummaryType(newValue)) {
            const currentSummaries = get(chatSummariesAtom);
            const updatedSummaries = [...currentSummaries, newValue];
            set(chatSummariesAtom, updatedSummaries);
        } else if (isArrayOfChatSummaryType(newValue)) {
            set(chatSummariesAtom, newValue);
        } else {
            console.error('Invalid value provided to chatSummariesSelector set method:', newValue);
        }
    },
});

const chatMessagesSelector = selector({
    key: 'chatMessagesSelector',
    get: async ({get}) => {
        const activeChatId = get(activeChatIdAtom);
        console.log('chatMessagesSelector get:', activeChatId)
        const chatSummaries = get(chatSummariesAtom);
        console.log('chatMessagesSelector chatSummaries:', chatSummaries)
        if (!activeChatId) {
            throw new Error('No active chat ID');
        }
        if (activeChatId === 'new--------------------------------------------------------chat') {
            return [];
        }
        const existingChat = chatSummaries.find(chat => chat.chatId === activeChatId);
        console.log('chatMessagesSelector existingChat:', existingChat)

        /!*
         if (existingChat && existingChat.messages) {
         console.log('Found chat and messages so returning existing chat messages:', existingChat.messages)
         return existingChat.messages;
         }
         *!/
        const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: activeChatId});
        if (error) {
            console.error('No chat messages to display:', error.message);
            return [];
        }
        console.log('chatMessagesSelector data:', data)
        return data;
    },
    set: ({set, get}, newValue) => {
        console.log('chatMessagesSelector set:', newValue)

        if (!(newValue instanceof DefaultValue)) {
            const chatSummaries = get(chatSummariesAtom);
            const updatedSummaries = chatSummaries.map(chat =>
                chat.chatId === (newValue as MessageType[])[0]?.chatId
                    ? {...chat, messages: newValue as MessageType[]}
                    : chat
            );
            set(chatSummariesAtom, updatedSummaries);
            set(activeChatMessagesArrayAtom, newValue as MessageType[]);
        }
    }
});

// Type guards
const isChatSummaryType = (value: any): value is ChatSummaryType => {
    return (
        typeof value === 'object' &&
        value !== null &&
        typeof value.chatId === 'string' &&
        typeof value.chatTitle === 'string' &&
        typeof value.createdAt === 'string' &&
        typeof value.lastEdited === 'string' &&
        typeof value.matrixId === 'string' &&
        typeof value.metadata === 'object'
    );
};

const isArrayOfChatSummaryType = (value: any): value is ChatSummaryType[] => {
    return Array.isArray(value) && value.every(isChatSummaryType);
};

const isMessageType = (value: any): value is MessageType => {
    return (
        typeof value === 'object' &&
        value !== null &&
        typeof value.chatId === 'string' &&
        typeof value.createdAt === 'string' &&
        typeof value.id === 'string' &&
        typeof value.index === 'number' &&
        typeof value.text === 'string' &&
        typeof value.role === 'string'
    );
};

const isArrayOfMessageType = (value: any): value is MessageType[] => {
    return Array.isArray(value) && value.every(isMessageType);
};

const isChatDetailsType = (value: any): value is ChatDetailsType => {
    return (
        typeof value === 'object' &&
        value !== null &&
        typeof value.chatId === 'string' &&
        typeof value.chatTitle === 'string' &&
        typeof value.createdAt === 'string' &&
        typeof value.lastEdited === 'string' &&
        typeof value.matrixId === 'string' &&
        typeof value.metadata === 'object' &&
        Array.isArray(value.messages) &&
        value.messages.every(isMessageType)
    );
};

/!*

 const localForageEffect = key => ({setSelf, onSet, trigger}) => {
 // If there's a persisted value - set it on load
 const loadPersisted = async () => {
 const {data} = await supabase.rpc('fetch_messages', {matrix_chat_id: key});
 if (data != null) {
 setSelf(data);
 }
 };
 const pushPersisted = async () => {
 const {data} = await supabase.rpc('push_messages_to_db', {messages: messages});
 if (data != null) {
 setSelf(data);
 }
 };

 if (trigger === 'get') {
 loadPersisted();
 }

 if (trigger === 'set') {
 loadPersisted();
 }

 // Subscribe to state changes and persist them to localForage
 onSet((newValue, _, isReset) => {
 isReset
 ? localForage.removeItem(key)
 : localForage.setItem(key, JSON.stringify(newValue));
 });
 };

 const currentUserIDState = atom({
 key: 'CurrentUserID',
 default: 1,
 effects: [
 localForageEffect('current_user'),
 ]
 });



 const updateChatStateEffect = (chatId: string) : AtomEffect<MessageType[]> => ({ setSelf, trigger }) => {
 if (trigger === 'get') {
 setSelf(activeChatIdAtom, chatId);
 setSelf(isNewChatAtom, false);
 }
 if (trigger === 'set') {
 setSelf(activeChatIdAtom, chatId);
 setSelf(isNewChatAtom, false);
 }
 };


 export const messagesFamily = atomFamily<MessageType[], string>({
 key: 'messagesFamily',
 default: selectorFamily({
 key: 'chatMessagesDefault',
 get: (chatId: string) => async () => {
 const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: chatId});
 if (error) {
 console.error(`Failed to fetch messages for chat ${chatId}:`, error);
 return [];
 }
 return data || [];
 },
 }),
 effects: (chatId) => [
 updateChatStateEffect(chatId),
 ],
 });
 *!/

const chatSummariesSelector = selector({
    key: 'chatSummariesSelector',
    get: async ({get}) => {
        const activeUser = get(activeUserAtom);
        if (!activeUser) {
            return [];
        }
        const {data, error} = await supabase.rpc('fetch_user_chats', {user_matrix_id: activeUser.matrixId});
        if (error) {
            console.error('Error fetching chats:', error.message);
            return [];
        }
        return data || [];
    }
});

const directMessagesFamily = atomFamily<MessageType[], string>({
    key: 'directMessagesFamily',
    default: selectorFamily({
        key: 'chatMessagesDefault',
        get: (chatId: string) => async () => {
            const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: chatId});
            if (error) {
                console.error(`Failed to fetch messages for chat ${chatId}:`, error);
                return [];
            }
            return data || [];
        },
    }),
});

const chatSummariesAtom = atom<ChatType[]>({
    key: 'chatSummariesAtom',
    default: [],
});

*/


/*

const chatStartAtom = atom<ChatDetailsType | null>({
    key: 'chatStartAtom',
    default: selector({
        key: 'chatStartSelector',
        get: ({get}) => {
            const userSubmit = get(hasSubmittedMessageAtom);
            if (!userSubmit) return null;
            const isNewChat = get(isNewChatAtom);
            if (!isNewChat) { return null; }
            const userMessage = get(userTextInputAtom);
            if (userMessage.length === 0) {return null;}

            const systemMessage = get(systemMessageAtom);
            const activeChatId = get(activeChatIdAtom);
            const userId = get(activeUserAtom).matrixId;

            const systemMessageEntry: MessageType = {
                chatId: activeChatId,
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                index: 0,
                role: 'system',
                text: systemMessage,
            };

            const userMessageEntry: MessageType = {
                chatId: activeChatId,
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                index: 1,
                role: 'user',
                text: userMessage,
            };

            const initialMessages: MessageType[] = [systemMessageEntry, userMessageEntry];
            const chatTitle = userMessage.length > 25 ? userMessage.substring(0, 25) + '...' : userMessage;
            const startChatObject: ChatDetailsType = {
                chatId: activeChatId,
                chatTitle: chatTitle,
                createdAt: new Date().toISOString(),
                lastEdited: new Date().toISOString(),
                matrixId: userId,
                metadata: {},
                messages: initialMessages,
            };
            return startChatObject;
        },
    })
});
*/


import { activeChatIdAtom } from '@/state/aiAtoms/aiChatAtoms';
import { activeUserAtom } from '@/state/userAtoms';
import { ChatType } from '@/types';
import supabase from '@/utils/supabase/client';
import { atom, selector } from 'recoil';
/*
import { activeMessagesAtom } from '@/state/aiAtoms/aiChatAtoms';
import { MessageType } from '@/types';
import { atomFamily, selectorFamily, useRecoilState } from 'recoil';
import { OpenAiStream as asyncStreamer } from '@/app/api/openai/route';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

const uiDisplayCallback = (chunk: string) => {
    const [messageArray, setMessageArray] = useRecoilState(activeMessagesAtom);
    const newMessageEntry: MessageType = {
        chatId: 'new-response',
        role: 'assistant',
        index: 2,
        text: '',
        id: uuidv4(),
        createdAt: new Date().toISOString(),
    };
    const newMessageEntry.text = prev + chunk;
}


const asyncStreamSelector = atomFamily<Message[], string>({
    key: 'asyncStreamSelector',
    default: selectorFamily({
        key: 'chatMessagesDefault',
        get: (messageId: string) => async () => {
            const { chunk } = await asyncStreamer(messages, uiDisplayCallback);
            return chunk || [];
        },
    }),
});


const useAsyncStreamer = ({ initialMessages, chatId }: AsyncStreamerHookProps) => {
    const [messageArray, setMessageArray] = useRecoilState(activeMessagesAtom);

    useEffect(() => {
        const callback: AsyncStreamerCallback = async (chunk: string) => {
            setMessageArray((prevMessages) => {
                const updatedMessages = [...prevMessages];
                if (updatedMessages.length > 0) {
                    const lastMessage = updatedMessages[updatedMessages.length - 1];
                    lastMessage.text += chunk;
                } else {
                    // If there are no messages, add a new message entry
                    const newMessageEntry: MessageType = {
                        chatId: chatId,
                        role: 'assistant',
                        index: 2,
                        text: chunk,
                        id: uuidv4(),
                        createdAt: new Date().toISOString(),
                    };
                    updatedMessages.push(newMessageEntry);
                }
                return updatedMessages;
            });
        };

        asyncStreamer(initialMessages, callback).catch(console.error);
    }, [initialMessages, chatId, setMessageArray]);

    return messageArray;
};

export default useAsyncStreamer;


const activeMessageSelector = selector({
    key: 'activeMessageSelector',
    get: async ({get}) => {
        const activeChatId = get(activeChatIdAtom);
        if (activeChatId === null) { return []; }
        const activeMessages = get(allMessagesFamily(activeChatId));
        return activeMessages;
    },
    set: async ({set}, newValue) => {
        set(activeMessagesAtom, newValue);
    }
});
 */



/* Replaced with the family:
 export const triggerStreamChatAtom = atom<boolean>({
 key: 'triggerStreamChatAtom',
 default: false,
 });
 */

/*

function chatsSyncEffect({ setSelf }) {
    const syncChats = async () => {
        const { data, error } = await supabase.rpc('fetch_user_chats');
        if (error) {
            console.error('Error fetching chats:', error.message);
            return;
        }
        setSelf(data || []);
    };

    syncChats();
}
export const chatsAtom = atom<ChatType[]>({
    key: 'chatsAtom',
    default: [],
    effects: [chatsSyncEffect],
});



export const chatSummariesAtom = atom<ChatType[]>({
    key: 'chatSummariesAtom',
    default: [],
});


export const chatSummariesSelector = selector({
    key: 'chatSummariesSelector',
    get: async ({get}) => {
        const activeUser = get(activeUserAtom);
        if (!activeUser) {
            return [];
        }
        const {data, error} = await supabase.rpc('fetch_user_chats', {user_matrix_id: activeUser.matrixId});
        if (error) {
            console.error('Error fetching chats:', error.message);
            return [];
        }
        return data || [];
    }
});

 */
