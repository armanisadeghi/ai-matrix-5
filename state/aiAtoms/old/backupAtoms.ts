/*
import { atom, atomFamily, selector, selectorFamily, DefaultValue, AtomEffect, waitForAllSettled, RecoilState } from 'recoil';
import { quickChatSettingsState } from '@/state/aiAtoms/settingsAtoms';
import { activeUserAtom } from '@/state/userAtoms';
import supabase from '@/utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { ActiveChatMessagesType, ChatDetailsType, ChatType, Json, MessageType } from '@/types';
import { OpenaiMessageEntry } from '@/app/api/openai/route';
import { debounce } from 'lodash';

export const isNewChatAtom = atom<boolean>({
    key: 'isNewChatAtom',
    default: true,
});

export const activeChatIdAtom = atom<string>({
    key: 'activeChatId',
    default: uuidv4(),
});

export const hasSubmittedMessageAtom = atom({
    key: 'hasSubmittedMessage',
    default: false,
});

export const systemMessageAtom = atom<string>({
    key: 'systemMessageAtom',
    default: 'You are a helpful assistant',
});

export const userTextInputAtom = atom<string>({
    key: 'userTextInputAtom',
    default: '',
});

export const triggerStreamChatAtom = atom<boolean>({
    key: 'triggerStreamChatAtom',
    default: false,
});

export const fetchStatusAtom = atom<'idle' | 'fetching' | 'success' | 'error' | 'dbError'>({
    key: 'fetchStatusAtom',
    default: 'idle',
});

export const remainingCountAtom = atom<number>({
    key: 'remainingCountAtom',
    default: 1,
});




const ensureUniqueChats = (chats: ChatType[]): ChatType[] => {
    const chatMap = new Map<string, ChatType>();
    chats.forEach(chat => chatMap.set(chat.chatId, chat));
    return Array.from(chatMap.values());
};

const chatsSyncEffect: AtomEffect<ChatType[]> = ({setSelf, onSet, getPromise}) => {
    const loadChats = async () => {
        const activeUser = await getPromise(activeUserAtom);
        if (!activeUser) { return; }
        const {data, error} = await supabase.rpc('fetch_user_chats', {user_matrix_id: activeUser.matrixId});
        if (error) {
            console.error('Error fetching chats:', error.message);
            return;
        }
        setSelf(ensureUniqueChats(data || []));
    };

    const addChatToDB = async (newChat: ChatType) => {
        if (!newChat || Object.keys(newChat).length === 0) return console.error('Missing or empty new chat object');
        const {data, error} = await supabase.rpc('create_chat_and_messages', {start_chat: newChat as unknown as Json});
        if (error) {
            if (error.message === 'DUPLICATE_ENTRY') {
                console.log(`Chat with id ${newChat.chatId} already exists in the database. Skipping.`);
            } else if (error.message === 'MISSING_REQUIRED_FIELD') {
                console.error(`Failed to add chat: Missing required field`);
            } else {
                console.error('Error adding new chat:', error);
            }
        } else {
            console.log('New chat added successfully:', data);
        }
    };

    loadChats();

    onSet((newValue, oldValue) => {
        if (!(newValue instanceof DefaultValue) && Array.isArray(newValue) && Array.isArray(oldValue)) {
            const uniqueNewValue = ensureUniqueChats(newValue);
            if (uniqueNewValue.length !== newValue.length) {
                setSelf(uniqueNewValue);
            }

            if (uniqueNewValue.length > oldValue.length) {
                const newChats = uniqueNewValue.filter(chat =>
                    !oldValue.some(oldChat => oldChat.chatId === chat.chatId)
                );
                newChats.forEach(addChatToDB);
            }
        }
    });
};


export const chatsAtom = atom<ChatType[]>({
    key: 'chatsAtom',
    default: [],
    effects: [chatsSyncEffect],
});




export const isStreamingAtom = atom<boolean>({
    key: 'isStreamingAtom',
    default: false,
});






export const regularUpdateEffect = (chatId: string): AtomEffect<MessageType[]> => ({setSelf, onSet, trigger, getPromise}) => {
    let initialFetchDone = false;

    if (trigger === 'get') {
        supabase.rpc('fetch_messages', {matrix_chat_id: chatId}).then(({data, error}) => {
            if (error) console.error(`Failed to fetch messages for chat ${chatId}:`, error);
            else {
                setSelf(data || []);
                initialFetchDone = true;
            }
        });
    }

    onSet(async (newValue, oldValue) => {
        if (!(newValue instanceof DefaultValue) && Array.isArray(oldValue)) {
            const isStreaming = await getPromise(isStreamingAtom);
            // Only process new messages after the initial fetch and if not streaming
            if (initialFetchDone && !isStreaming) {
                const oldMessageIds = new Set(oldValue.map(msg => msg.id));
                const newMessages = newValue.filter(msg => !oldMessageIds.has(msg.id));

                // Log messages to see what's happening
                console.log("Old Messages: ", oldValue);
                console.log("New Messages: ", newValue);
                console.log("Messages to Add: ", newMessages);

                newMessages.forEach(msg => {
                    supabase.rpc('add_custom_message', {
                        chat_id: chatId,
                        id: msg.id,
                        role: msg.role,
                        message: msg.text,
                        index: msg.index,
                        created_at: msg.createdAt,
                    }).then(({error}) => {
                        if (error) console.error(`Failed to push message for chat ${chatId}:`, error);
                    });
                });
            }
        }
    });
};


export const streamingUpdateEffect = (chatId: string): AtomEffect<MessageType[]> => ({setSelf, onSet}) => {
    const debouncedUpdate = debounce((message: MessageType) => {
        supabase.rpc('add_custom_message', {
            chat_id: chatId,
            id: message.id,
            role: message.role,
            message: message.text,
            index: message.index,
            created_at: message.createdAt,
        }).then(({error}) => {
            if (error) console.error(`Failed to push streamed message for chat ${chatId}:`, error);
        });
    }, 2000);

    onSet((newValue, oldValue) => {
        if (!(newValue instanceof DefaultValue) && Array.isArray(oldValue) && newValue.length > oldValue.length) {
            const lastMessage = newValue[newValue.length - 1];
            if (lastMessage.role === 'assistant') {
                debouncedUpdate(lastMessage);
            }
        }
    });
};

export const messagesFamily = atomFamily<MessageType[], string>({
    key: 'messagesFamily',
    default: [],
    effects: (chatId: string) => [
        regularUpdateEffect(chatId),
        streamingUpdateEffect(chatId),
    ],
});



const ensureUniqueMessages = (messages: MessageType[]): MessageType[] => {
    const messageMap = new Map<string, MessageType>();
    messages.forEach(message => messageMap.set(message.id, message));
    return Array.from(messageMap.values());
};

export const fullChatSelectorFamilyOutOfOrder = selectorFamily<ChatDetailsType | null, string>({
    key: 'fullChatSelectorFamilyOutOfOrder',
    get: (chatId: string) => ({get}) => {
        const {chats, messages} = get(
            waitForAllSettled({
                chats: chatsAtom,
                messages: messagesFamily(chatId),
            })
        );
        const chatSummary = chats.state === 'hasValue'
            ? (chats.contents as ChatType[]).find((chat) => chat.chatId === chatId)
            : null;

        if (!chatSummary) return null;

        return {
            ...chatSummary,
            messages: messages.state === 'hasValue' ? messages.contents : [],
        };
    },
});


export const fullActiveChat = selector({
    key: 'allChatsDataSelector',
    get: ({get}) => {
        const activeChatId = get(activeChatIdAtom);
        const chats = get(chatsAtom);
        const activeChatMessages = get(messagesFamily(activeChatId));
        const fullChat = {
            ...chats.find(chat => chat.chatId === activeChatId),
            messages: activeChatMessages,
        };
        return fullChat;
    },
});

export const userUpdatedArraySelector = selector<MessageType[] | null>({
    key: 'userUpdatedArraySelector',
    get: ({get}) => {
        const userSubmit = get(hasSubmittedMessageAtom);
        if (!userSubmit) return null;

        const isNewChat = get(isNewChatAtom);
        if (isNewChat) return get(chatStartSelector)?.messages || null;

        const userMessage = get(userTextInputAtom);
        if (userMessage.length === 0) {return null}
        ;

        const activeChatId = get(activeChatIdAtom);
        if (!activeChatId) return null;

        const activeMessages = get(messagesFamily(activeChatId));

        if (activeMessages.length > 0 && activeMessages[activeMessages.length - 1].role === 'user') {
            console.log('ERROR! userUpdatedArraySelector User message already exists');
            return activeMessages;
        }

        const index = activeMessages.length;

        const userEntry = {
            chatId: activeChatId,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            index,
            role: 'user',
            text: userMessage,
        };
        return [...activeMessages, userEntry];
    },
});

export const blankAssistantTextSelector = selector<MessageType[] | null>({
    key: 'blankAssistantTextSelector',
    get: ({get}) => {
        const userSubmit = get(hasSubmittedMessageAtom);
        if (!userSubmit) return null;
        const activeChatId = get(activeChatIdAtom);
        if (activeChatId === null) return null;
        const activeMessages = get(messagesFamily(activeChatId));
        const index = activeMessages.length;
        const assistantEntry = {
            chatId: activeChatId,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            index,
            role: 'assistant',
            text: '',
        };
        const updatedArray = [...activeMessages, assistantEntry];
        return updatedArray;
    },
});

// hasSubmittedMessageAtom
// messagesFamily


export const openAiArraySelector = selector({
    key: 'openAiArraySelector',
    get: ({get}) => {
        const userSubmit = get(hasSubmittedMessageAtom);
        if (!userSubmit) return null;

        const activeChatId = get(activeChatIdAtom);
        if (activeChatId === null) return [];

        const activeMessages = get(messagesFamily(activeChatId));
        const openAiArray = activeMessages.map(chat => ({
            role: chat.role as 'system' | 'user' | 'assistant',
            content: chat.text,
        }));
        return openAiArray as OpenaiMessageEntry[];
    },
});
``
export const chatStartSelector = selector({
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
});

export const assistantTextStreamAtom = atom<string>({
    key: 'assistantTextStreamAtom',
    default: '',
});

export const activeChatMessagesArrayAtom = atom<ActiveChatMessagesType[]>({
    key: 'activeChatMessagesArrayAtom',
    default: [],
});

export const fullAssistantTextAtom = atom<string>({
    key: 'fullAssistantTextAtom',
    default: '',
});

const chatDataSelector = selector({
    key: 'chatDataSelector',
    get: ({get}) => {
        const userSubmit = get(hasSubmittedMessageAtom);
        const isNewChat = get(isNewChatAtom);
        const activeChatId = get(activeChatIdAtom);
        const activeUser = get(activeUserAtom);
        const systemMessage = get(systemMessageAtom);
        const userMessage = get(userTextInputAtom);
        const activeChatMessagesArray = get(activeChatMessagesArrayAtom);
        const chatSettings = get(quickChatSettingsState);
        const userInput = get(userTextInputAtom);
        const fetchStatus = get(fetchStatusAtom);
        const allChats = get(chatsAtom);
        const activeChatMessages = get(messagesFamily(activeChatId));
        const openAiArray = get(openAiArraySelector);
        const chatStart = get(chatStartSelector);
        const assistantTextStream = get(assistantTextStreamAtom);
        const userUpdatedArray = get(userUpdatedArraySelector);
        const blankAssistantText = get(blankAssistantTextSelector);

        return {
            'userSubmit': userSubmit,
            'isNewChat': isNewChat,
            'activeChatId': activeChatId,
            'activeUser': activeUser,
            'systemMessage': systemMessage,
            'userMessage': userMessage,
            'activeChatMessagesArray': activeChatMessagesArray,
            'chatSettings': chatSettings,
            'userInput': userInput,
            'fetchStatus': fetchStatus,
            'allChats': allChats,
            'activeChatMessages': activeChatMessages,
            'openAiArray': openAiArray,
            'chatStart': chatStart,
            'assistantTextStream': assistantTextStream,
            'userUpdatedArray': userUpdatedArray,
            'blankAssistantText': blankAssistantText,
        };
    }
});

export const messagesWithUpdateSelector = selectorFamily<MessageType[], string>({
    key: 'messagesWithUpdateSelector',
    get: (chatId: string) => ({get, getCallback}) => {
        const updateAtomsCallback = getCallback(({set}) => () => {
            set(activeChatIdAtom, chatId);
            set(isNewChatAtom, false);
        });
        updateAtomsCallback();
        return get(messagesFamily(chatId));
    },
});



export const activeMessagesAtom = atom<MessageType[]>({
    key: 'activeMessagesAtom',
    default: [],
});

export const streamTriggerAtomFamily = atomFamily<boolean, { hookId: string, index: number }>({
    key: 'streamTriggerAtomFamily',
    default: false,
});

*/
