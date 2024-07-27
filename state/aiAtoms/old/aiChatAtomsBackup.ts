/*
import { quickChatSettingsState } from '@/state/aiAtoms/settingsAtoms';
import { activeUserAtom } from '@/state/userAtoms';
import { ChatDetailsType, ChatType, MessageType } from '@/types';
import supabase from '@/utils/supabase/client';
import { atom, atomFamily, DefaultValue, selector, selectorFamily, useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { OpenaiMessageEntry } from '@/app/api/openai/route';
import { debounce } from 'lodash';


export const isNewChatAtom = atom<boolean>({
    key: 'isNewChatAtom',
    default: true,
});

export const activeChatIdAtom = atom<string>({
    key: 'activeChatId',
    default: undefined,
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

export const userInputAtomFamily = atomFamily<string, string>({
    key: 'userInputAtomFamily',
    default: '',
});

export const activeChatMessagesArrayAtom = atom<MessageType[]>({
    key: 'activeChatMessagesArrayAtom',
    default: [],
});

export const hookIdAtom = atom<string>({
    key: 'hookIdAtom',
    default: 'OpenAiStream',
});

export const hookIndexAtom = atom<number>({
    key: 'hookIndexAtom',
    default: 0,
});

export const streamTriggerAtomFamily = atomFamily<boolean, { hookId: string, index: number }>({
    key: 'streamTriggerAtomFamily',
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

export const chatSummariesAtom = atom<ChatType[]>({
    key: 'chatSummariesAtom',
    default: selector({
        key: 'chatSummariesAtomDefault',
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
});

export const messagesWithSideEffectsSelector = selectorFamily<{ messages: MessageType[]; updateAtoms: () => void }, string>({
    key: 'messagesWithSideEffectsSelector',
    get: (chatId: string) => ({get, getCallback}) => {
        const messages = get(messagesFamily(chatId));
        const updateAtoms = getCallback(({set}) => () => {
            set(activeChatIdAtom, chatId);
            set(isNewChatAtom, false);
            set(activeChatMessagesArrayAtom, messages);
        });
        return {
            messages,
            updateAtoms,
        };
    },
});

export const currentMessagesSelector = selector({
    key: 'currentMessagesSelector',
    get: ({get}) => {
        const activeChatId = get(activeChatIdAtom);
        return get(messagesWithUpdateSelector(activeChatId));
    },
});

export const onlyOnceFamily = atomFamily<boolean, { chatIdIndex: string, item: string, proceed: boolean }>({
    key: 'onlyOnceFamily',
    default: true,
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

        const index = activeMessages.length;
        const chatIdIndex = activeChatId + index;
        const onlyOnce = get(onlyOnceFamily({chatIdIndex, item: 'userMessage', proceed: true}));
        if (!onlyOnce) return activeMessages;

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
        const activeMessages = get(activeChatMessagesArrayAtom);
        const index = activeMessages.length;
        const chatIdIndex = activeChatId + index;
        const onlyOnce = get(onlyOnceFamily({chatIdIndex, item: 'assistantMessage', proceed: true}));
        if (!onlyOnce) return activeMessages;

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

export const openAiArraySelector = selector({
    key: 'openAiArraySelector',
    get: ({get}) => {
        const userSubmit = get(hasSubmittedMessageAtom);
        if (!userSubmit) return null;

        const activeMessages = get(activeChatMessagesArrayAtom);
        const index = activeMessages.length;
        const activeChatId = get(activeChatIdAtom);
        const chatIdIndex = activeChatId + index;
        const onlyOnce = get(onlyOnceFamily({chatIdIndex, item: 'assistantMessage', proceed: true}));
        if (!onlyOnce) return;
        const openAiArray = activeMessages.map(message => ({
            role: message.role as 'system' | 'user' | 'assistant',
            content: message.text,
        }));
        console.log('openAiArraySelector openAiArray:', openAiArray);
        return openAiArray as OpenaiMessageEntry[];
    },
});

export const chatStartSelector = selector({
    key: 'chatStartSelector',
    get: ({get}) => {
        const userSubmit = get(hasSubmittedMessageAtom);
        if (!userSubmit) return null;
        const isNewChat = get(isNewChatAtom);
        if (!isNewChat) { return null; }
        const userMessage = get(userTextInputAtom);
        if (userMessage.length === 0) {return null;}

        const userId = get(activeUserAtom).matrixId;

        const activeChatId = get(activeChatIdAtom);
        const systemMessage = get(systemMessageAtom);

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
        const chatSummaries = get(chatSummariesAtom);

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
            'chatSummaries': chatSummaries,
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

/!*

 export const activeMessagesAtom = atom<MessageType[]>({
 key: 'activeMessagesAtom',
 default: [],
 });
 *!/
*/
