/*
import { activeChatIdAtom, activeChatMessagesArrayAtom, isNewChatAtom, systemMessageAtom, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import { activeUserAtom } from '@/state/userAtoms';
import { ActiveChatMessagesType, ChatSummaryType, ChatType, Json, MessageType } from '@/types';
import { createChatStartEntry } from '@/utils/supabase/chatDb';
import supabase from '@/utils/supabase/client';
import { atom, atomFamily, DefaultValue, GetRecoilValue, Loadable, noWait, ResetRecoilState, selector, selectorFamily, SetRecoilState, useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState, waitForAll } from 'recoil';
import { v4 as uuidv4 } from 'uuid';




const chatsAtom = atom<ChatType[]>({
    key: 'chatsAtom',
    default: selector<ChatType[]>({
        key: 'chatsDefault',
        get: async ({get}) => {
            const activeUser = get(activeUserAtom);
            if (!activeUser) return [];

            const { data, error } = await supabase.rpc('fetch_user_chats', {
                user_matrix_id: activeUser.matrixId
            });
            if (error) throw error;

            return data;
        }
    }),
});















const chatStartSelector = selector({
    key: 'chatStartSelector',
    get: async ({get}) => {
        const isNewChat = get(isNewChatAtom);
        if (!isNewChat) {
            return null;
        }
        const userMessage = get(userTextInputAtom);
        if (userMessage.length === 0) {
            return null;
        }
        const systemMessage = get(systemMessageAtom);
        const activeChatId = get(activeChatIdAtom);

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

        const chatTitle = userMessage.length > 25 ? userMessage.substring(0, 25) + '...' : userMessage;
        const startChatObject: ChatType = {
            chatId: activeChatId,
            chatTitle: chatTitle,
            createdAt: new Date().toISOString(),
            lastEdited: new Date().toISOString(),
            matrixId: activeChatId,
            metadata: {},
            messages: [systemMessageEntry, userMessageEntry],
        };
        return startChatObject;
    },
});




const useLiveChat = () => {
    const setChat = useSetRecoilState;
    const getChat = useRecoilValue;
    const [chatState, setChatState] = useRecoilState;

    const addChat = (chatId: string, chatData: ChatType) => {
        const set = setChat(liveChatsAtomFamily(chatId));
        set(chatData);
    };

    const getChatData = (chatId: string) => {
        const chat = getChat(liveChatsAtomFamily(chatId));
        return chat;
    };

    const updateChat = (chatId: string, updatedData: Partial<ChatType>) => {
        const [chat, setChat] = chatState(liveChatsAtomFamily(chatId));
        const updatedChat = { ...chat, ...updatedData };
        setChat(updatedChat);
    };

    const updateTitle = (chatId: string, newTitle: string) => {
        updateChat(chatId, { chatTitle: newTitle });
    };

    return {
        addChat,
        getChatData,
        updateChat,
        updateTitle,
    };
};





const messagesAtomFamily = atomFamily<ActiveChatMessagesType[], string>({
    key: 'messagesAtomFamily',
    default: selectorFamily<ActiveChatMessagesType[], string>({
        key: 'messagesDefault',
        get: chatId => async () => {
            const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: chatId});
            if (error) {
                console.error('Failed to fetch messages: ', error);
                return [];
            }
            return data || [];
        }
    }),
});




function setMessagesForChat(messages: MessageType[]) {
    const [activeChatId, ] = useRecoilState(activeChatIdAtom);
    if (isNewChatAtom) {

    }

    if (!isNewChatAtom) {
        const setMessage = useSetRecoilState(messagesAtomFamily(activeChatId));
        setMessage(messages);
    }
}



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

export const chatSummariesAtom = atom<ChatSummaryType[]>({
    key: 'chatSummariesAtom',
    default: [],
});

// Selectors
const chatSummariesSelector = selector({
    key: 'chatSummariesSelector',
    get: async ({get}) => {
        const activeUser = get(activeUserAtom);
        const {data, error} = await supabase.rpc('fetch_user_chats', {user_matrix_id: activeUser.matrixId});
        if (error) {
            console.error('Error fetching chats:', error.message);
            return get(chatSummariesAtom);
        }
        return data;
    },
});

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

// Type guard to check if the value is an array of ChatSummaryType
const isArrayOfChatSummaryType = (value: any): value is ChatSummaryType[] => {
    return Array.isArray(value) && value.every(isChatSummaryType);
};

const chatSummariesSpecialSelector = selector({
    key: 'chatSummariesSpecialSelector',
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

const chatMessagesSelectorOld = selector({
    key: 'chatMessagesSelectorOld',
    get: async ({get}) => {
        const activeChatId = get(activeChatIdAtom);
        const chatSummaries = get(chatSummariesAtom);
        if (!activeChatId) {
            throw new Error('No active chat ID');
        }
        if (activeChatId === 'new--------------------------------------------------------chat') {
            return [];
        }
        const existingChat = chatSummaries.find(chat => chat.chatId === activeChatId);

        if (existingChat && existingChat.messages) {
            console.log('Found chat and messages so returning existing chat messages:', existingChat.messages)
            return existingChat.messages;
        }
        const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: activeChatId});
        if (error) {
            console.error('No chat messages to display:', error.message);
            return [];
        }
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

const systemMessageEntryAtom = atom<ActiveChatMessagesType>({
    key: 'systemMessageEntryAtom',
    default: {
        index: 0,
        text: '',
        role: 'system',
    },
});


/!*
 export const simpleMessageArrayAtom = atom<SimpleMessageType[]>({
 key: 'simpleMessageArrayAtom',
 default: [],
 });*!/


export const newAtomFamily = atomFamily<MessageType[], string>({
    key: 'messagesAtomFamily',
    default: selectorFamily<MessageType[], string>({
        set(param: string): (opts: { set: SetRecoilState; get: GetRecoilValue; reset: ResetRecoilState }, newValue: (DefaultValue | MessageType[])) => void {
            return (p1: { set: SetRecoilState; get: GetRecoilValue; reset: ResetRecoilState }, p2: DefaultValue | MessageType[]) => {};
        },
        key: 'messagesDefault',
        get: chatId => async ({get}) => {
            const activeChatId = get(activeChatIdAtom);
            if (!activeChatId) return [];
            const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: activeChatId});
            if (error) throw error;
            return data;
        }
    }),
});

const startingMessageArraySelector = selector<ActiveChatMessagesType[]>({
    key: 'startingMessageArraySelector',
    get: ({ get }) => {
        const [systemMessage, userMessage, activeChatId] = get(waitForAll([
            systemMessageAtom,
            userTextInputAtom,
            activeChatIdAtom,
        ]));

        if (!activeChatId) {
            throw new Error('No active chat ID');
        }
        if (userMessage.length === 0) {
            return [];
        }

        const systemMessageEntry: ActiveChatMessagesType = {
            chatId: activeChatId,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            index: 0,
            role: 'system',
            text: systemMessage,
        };

        const userMessageEntry: ActiveChatMessagesType = {
            chatId: activeChatId,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            index: 1,
            role: 'user',
            text: userMessage,
        };

        return [systemMessageEntry, userMessageEntry];
    },
    set: ({ set }, newValue) => {
        set(activeChatMessagesArrayAtom, newValue);
    },
});




const messagesAtomFamily = atomFamily<MessageType[], string>({
    key: 'messagesAtomFamily',
    default: selectorFamily<MessageType[], string>({
        key: 'messagesDefault',
        get: (chatId) => async () => {
            const { data, error } = await supabase.rpc('fetch_messages', { matrix_chat_id: chatId });
            if (error) {
                console.error('Failed to fetch messages: ', error);
                return [];
            }
            return data || [];
        },
    }),
    effects: (chatId) => [
        ({ setSelf }) => {
            // Perform initial setup
            setSelf(async () => {
                const { data, error } = await supabase.rpc('fetch_messages', { matrix_chat_id: chatId });
                if (error) {
                    console.error('Failed to fetch messages: ', error);
                    return [];
                }
                return data || [];
            });
        },
        ({ onSet }) => {
            // Save state to local storage
            onSet(newMessages => {
                localStorage.setItem(`messages-${chatId}`, JSON.stringify(newMessages));
            });
        },
    ],
});


interface ChatType {
    chatId: string;
    chatTitle: string;
    createdAt: string;
    lastEdited: string;
    matrixId: string;
    metadata: Json;
    messages?: MessageType[];
}

type MessageType = {
    chatId: string;
    createdAt: string;
    id: string;
    index: number;
    text: string;
    role: string;
};

const chatsAtomFamily = atomFamily<ChatType[], string>({
    key: 'chatsAtomFamily',
    default: selectorFamily<ChatType[], string>({
        key: 'chatsDefault',
        get: (matrixId: string) => async ({get}): Promise<ChatType[]> => {
            const chatLoadable: Loadable<ChatType[]> = get(noWait(chatsAtomFamily(matrixId)));
            if (chatLoadable.state === 'hasValue' &&
                chatLoadable.contents.length > 0 &&
                chatLoadable.contents[0].messages.length > 0) {
                return chatLoadable.contents;
            }
            const {data, error} = await supabase.rpc('fetch_chat_details', { user_matrix_id: matrixId });
            if (error) {
                console.error('Failed to fetch chat details: ', error);
                return [];
            }
            return data || [];
        }
    }),
});



const chatDetailsSelector = selector({
    key: 'chatDetailsSelector',
    get: async ({get}) => {
        const activeUser = get(activeUserAtom);
        const isNewChat = get(isNewChatAtom);
        const activeChatId = get(activeChatIdAtom);
        const activeChatMessages = messagesAtomFamily(activeChatId);

        if (chatId) {
            const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: activeChatId});
            if (error) {
                console.error('Error fetching messages:', error.message);
                return get(messagesAtomFamily(activeChatId));
            }
            return data;
        } else {
            // Fetch user chats
            const {data, error} = await supabase.rpc('fetch_user_chats', {user_matrix_id: activeUser.matrixId});
            if (error) {
                console.error('Error fetching chats:', error.message);
                return get(chatSummariesAtom);
            }
            return data;
        }
    },
});

const messagesAtomFamily = atomFamily<MessageType[], string>({
    key: 'messagesAtomFamily',
    default: selectorFamily<MessageType[], string>({
        key: 'messagesDefault',
        get: (chatId) => async () => {
            const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: chatId});
            if (error) {
                console.error('Failed to fetch messages: ', error);
                return [];
            }
            return data || [];
        },
        set: chatId => ({set, get, reset}, newValue) => {
            if (newValue instanceof DefaultValue) {
                // Resetting the messages to empty when DefaultValue is used
                reset(messagesAtomFamily(chatId));
            } else {
                // Appending new messages to the existing list
                const currentMessages = get(messagesAtomFamily(chatId));
                const newMessages = Array.isArray(newValue) ? [...currentMessages, ...newValue] : [...currentMessages, newValue];
                set(messagesAtomFamily(chatId), newMessages);
            }
        }
    }),
    effects: (chatId) => [
        // could put something here.
    ],

});

const syncWithDatabaseEffect = (key: string) => ({setSelf, onSet, trigger}: any) => {
    if (trigger === 'get') {
        // Initialize from database
        supabase.rpc('fetch_user_chats', {user_matrix_id: key}).then(({data, error}) => {
            if (error) {
                console.error('Error fetching chats:', error.message);
                return;
            }
            const chats: Record<string, ChatType> = {};
            data.forEach((chat: ChatType) => {
                chats[chat.chatId] = chat;
            });
            setSelf(chats);
        });
    }

    onSet((newValue: Record<string, ChatType>, oldValue: Record<string, ChatType>) => {
        // Sync changes to database
        Object.keys(newValue).forEach(chatId => {
            if (!oldValue[chatId] || JSON.stringify(newValue[chatId]) !== JSON.stringify(oldValue[chatId])) {
                // Chat is new or updated, sync to database
                supabase.from('chats').upsert(newValue[chatId]).then(({error}) => {
                    if (error) console.error('Error syncing chat:', error.message);
                });
            }
        });
    });
};

const allChatsAtom = atom<Record<string, ChatType>>({
    key: 'allChatsAtom',
    default: {},
    effects: [syncWithDatabaseEffect('activeUserMatrixId')] // Replace with actual user ID
});

const chatSelector = selectorFamily<ChatType | null, string>({
    key: 'chatSelector',
    get: (chatId: string) => ({get}) => {
        const allChats = get(allChatsAtom);
        return allChats[chatId] || null;
    },
    set: (chatId: string) => ({set}, newValue) => {
        set(allChatsAtom, (prevChats) => ({
            ...prevChats,
            [chatId]: newValue as ChatType,
        }));
    },
});

const chatSelectorFamily = selectorFamily<ChatType | null, string>({
    key: 'chatSelectorFamily',
    get: (chatId: string) => ({get}) => {
        const allChats = get(allChatsAtom);
        return allChats[chatId] || null;
    },
    set: (chatId: string) => ({set}, newValue) => {
        set(allChatsAtom, (prevChats) => ({
            ...prevChats,
            [chatId]: newValue as ChatType,
        }));
    },
});

const chatMessagesSelector = selectorFamily<MessageType[], string>({
    key: 'chatMessagesSelector',
    get: (chatId: string) => async ({get}) => {
        const chat = get(chatSelectorFamily(chatId));
        if (chat && chat.messages) {
            return chat.messages;
        }
        // Fetch messages from database if not available
        const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: chatId});
        if (error) {
            console.error('Failed to fetch messages: ', error);
            return [];
        }
        // Update the chat with fetched messages
        get(chatSelectorFamily(chatId))((prevChat) => ({
            ...prevChat,
            messages: data || [],
        }));
        return data || [];
    },
});

const syncChatEffect = (chatId: string) => ({setSelf, onSet, trigger}: any) => {
    if (trigger === 'get') {
        supabase.rpc('fetch_messages', {matrix_chat_id: chatId}).then(({data, error}) => {
            if (!error) {
                setSelf(data);
            }
        });
    }

    onSet((newMessages: MessageType[]) => {
        supabase.from('messages').upsert(newMessages);
    });
};

const activeChatIdAtom = atom<string>({
    key: 'activeChatIdAtom',
    default: '',
});

const newChatSelector = selector<ChatType>({
    key: 'newChatSelector',
    get: ({get}) => {
        const activeChatId = get(activeChatIdAtom);
        return get(chatSelectorFamily(activeChatId)) || {
            chatId: '',
            chatTitle: '',
            createdAt: '',
            lastEdited: '',
            matrixId: '',
            metadata: {},
            messages: [],
        };
    },
    set: ({set, get}, newValue) => {
        const activeChatId = get(activeChatIdAtom);
        set(chatSelectorFamily(activeChatId), newValue);
    },
});

const chatStartSelector = selector<ChatType | null>({
    key: 'chatStartSelector',
    get: async ({get}) => {
        const isNewChat = get(isNewChatAtom);
        if (!isNewChat) {
            return null;
        }
        const userMessage = get(userTextInputAtom);
        if (userMessage.length === 0) {
            return null;
        }
        const systemMessage = get(systemMessageAtom);
        const activeChatId = get(activeChatIdAtom);

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

        const chatTitle = userMessage.length > 25 ? userMessage.substring(0, 25) + '...' : userMessage;
        const startChatObject: ChatType = {
            chatId: activeChatId,
            chatTitle: chatTitle,
            createdAt: new Date().toISOString(),
            lastEdited: new Date().toISOString(),
            matrixId: activeChatId,
            metadata: {},
            messages: [systemMessageEntry, userMessageEntry],
        };

        // Update the allChatsAtom with the new chat
        get(chatSelectorFamily(activeChatId))(startChatObject);

        return startChatObject;
    },
});

const activeChatAtom = atom<ChatType>({
    key: 'activeChatAtom',
    default: {
        chatId: '',
        chatTitle: '',
        createdAt: '',
        lastEdited: '',
        matrixId: '',
        metadata: {},
        messages: [],
    },
    effects: [
        ({onSet, setSelf}) => {
            onSet((newChat, oldChat) => {
                if (newChat !== oldChat) {
                    supabase.rpc('fetch_messages', {matrix_chat_id: newChat.chatId}).then(({data, error}) => {
                        if (!error) {
                            setSelf((oldChat) => ({
                                ...oldChat,
                                messages: data,
                            }));
                        }
                    });
                }
            });
        },
    ],
});

const addMessage = (chatId: string, newMessage: MessageType) => {
    const updateChatMessages = useRecoilCallback(({set}) => () => {
        set(messagesAtomFamily(chatId), (oldMessages) => [...oldMessages, newMessage]);
        set(activeChatAtom, (oldChat) => {
            if (oldChat.chatId === chatId) {
                return {...oldChat, messages: [...oldChat.messages, newMessage]};
            }
            return oldChat;
        });
    });

    updateChatMessages();
    supabase.from('messages').insert(newMessage);
};

const fetchMessages = (chatId: string) => {
    const fetchChatMessages = useRecoilCallback(({set}) => async () => {
        const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: chatId});
        if (!error) {
            set(messagesAtomFamily(chatId), data);
        }
    });

    fetchChatMessages();
};

const chatStateFamily = atomFamily<ChatType, string>({
    key: 'chatStateFamily',
    default: selectorFamily<ChatType, string>({
        key: 'chatStateDefault',
        get: (chatId) => ({get}) => {
            const summaries = get(chatSummariesAtom);
            return summaries.find((chat) => chat.chatId === chatId) || null;
        },
    }),
    effects: (chatId) => [
        syncChatEffect(chatId),
    ],
});



export const chatSummariesState = atom<ChatType[]>({
    key: 'chatSummariesState',
    default: [],
    effects: [
        ({ setSelf }) => {
            // Fetch chat summaries from the database on initialization
            setSelf(fetchChatSummariesFromDB());
        }
    ],
});

// Atom to store messages for each chat
export const chatMessagesState = atomFamily<MessageType[], string>({
    key: 'chatMessagesState',
    default: [],
    effects: (chatId) => [
        ({ setSelf }) => {
            // Fetch messages for the chat from the database on initialization
            setSelf(fetchChatMessagesFromDB(chatId));
        }
    ],
});



const chatAtomFamily = atomFamily<ChatType[], string>({
    key: 'chatAtomFamily',
    default: selectorFamily<ChatType[], string>({
        key: 'chatsDefault',
        get: chatId => async () => {
            const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: chatId});
            if (error) {
                console.error('Failed to fetch messages: ', error);
                return [];
            }
            return data || [];
        }
    }),
});

*/
