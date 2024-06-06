import {atom, useRecoilState, useSetRecoilState, selector, useRecoilValue} from 'recoil';
import {Role, MessageEntry} from '@/types/chat';
import Chat from "@/services/Chat";



export const userMessageAtom = atom<string>({
    key: 'userMessageAtom',
    default: '',
});

export const activeChatIdAtom = atom<string>({
    key: 'activeChatIdAtom',
    default: 'new-chat',
});

export const systemMessagesAtom = atom<{ text: string, role: Role }[]>({
    key: 'systemMessagesAtom',
    default: [{
        text: 'You are a helpful assistant.',
        role: 'system'
    }],
});

export const activeChatMessagesArrayAtom = atom<MessageEntry[]>({
    key: 'activeChatMessagesArrayAtom',
    default: [],
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

    const addMessage = (messageEntry: MessageEntry) => {
        setMessages([...messages, messageEntry]);
        console.log('useChatMessages messages', messages);
    };

    const deleteMessage = (index: number) => {
        setMessages(messages.filter((_, i) => i !== index));
    };

    const resetToIndex = (index: number) => {
        setMessages(messages.slice(0, index + 1));
    };

    const editMessage = (index: number, newMessage: MessageEntry) => {
        const newMessages = [...messages];
        newMessages[index] = newMessage;
        setMessages(newMessages);
    };

    const addMessageWithRole = (text: string, role: Role) => {
        const newMessageEntry: MessageEntry = {text, role};
        setMessages(currentMessages => [...currentMessages, newMessageEntry]);
        console.log ('useChatMessages newMessageEntry', newMessageEntry);
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
                messages.filter((message) => message.role === 'user');
            case 'assistant':
                messages.filter((message) => message.role === 'assistant');
            case 'system':
                messages.filter((message) => message.role === 'system');
            default:
                return messages;
        }
    },
});

const transformedMessagesState = selector<MessageEntry[]>({
    key: 'TransformedMessages',
    get: ({get}) => {
        const messages: MessageEntry[] = get(activeChatMessagesArrayAtom);
        const filter = get(messageFilterState); // Assumes a filter state that dictates the transformation

        switch (filter) {
            case 'matrix':
                // Directly map MessageEntry to ChatMessage without changing values
                return messages.map(message => ({
                    role: message.role,
                    content: message.text
                }));

            case 'openai':
                // Replace "text" key with "content"
                return messages.map(message => ({
                    role: message.role,
                    content: message.text
                }));

            case 'anthropic':
                // Remove entries with role 'system' and update systemMessageAtom
                const filteredMessages = messages.filter(message => message.role !== 'system');
                const systemMessages = messages.filter(message => message.role === 'system').map(message => ({
                    role: message.role,
                    content: message.text
                }));
                // set(systemMessageAtom, systemMessages); // Assuming `set` is part of a Recoil selectorFamily or other suitable structure
                return filteredMessages.map(message => ({
                    role: message.role,
                    content: message.text
                }));

            case 'google':
                // Placeholder for future implementation
                return messages.map(message => ({
                    role: message.role,
                    content: message.text
                }));

            case 'ollama':
                // Placeholder for future implementation
                return messages.map(message => ({
                    role: message.role,
                    content: message.text
                }));

            case 'hugging tree':
                // Placeholder for future implementation
                return messages.map(message => ({
                    role: message.role,
                    content: message.text
                }));

            default:
                // If no filter matches, return unchanged messages
                return messages.map(message => ({
                    role: message.role,
                    content: message.text
                }));
        }
    },
});



export const assistantTextStreamAtom = atom<string>({
    key: 'assistantTextStreamAtom',
    default: '',
});

export const assistantMessageEntryAtom = atom<MessageEntry>({
    key: 'assistantMessageEntryAtom',
    default: {
        text: '',
        role: 'assistant'
    },
});

export const userTextInputAtom = atom<string>({
    key: 'userTextInputAtom',
    default: '',
});

export const userMessageEntryAtom = atom<MessageEntry>({
    key: 'userMessageEntryAtom',
    default: {
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


