import { atom, useRecoilState, useSetRecoilState, selector, useRecoilValue } from 'recoil';
import { Role, MessageEntry } from '@/types/chat';
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

    return {
        messages,
        addMessage,
        deleteMessage,
        resetToIndex,
        editMessage,
    };
};


const messageFilterState = atom({
    key: 'messageFilterState',
    default: 'all',
});

const filteredMessagesState = selector({
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
    get: ({ get }) => {
        const messages = get(activeChatMessagesArrayAtom);
        return messages.length;
    },
});






// Selector to get character count for all messages
export const totalCharacterCountSelector = selector<number>({
    key: 'totalCharacterCountSelector',
    get: ({ get }) => {
        const messages = get(activeChatMessagesArrayAtom);
        return messages.reduce((total, message) => total + message.text.length, 0);
    },
});

// Selector to get character count for messages of a specific role
export const characterCountByRoleSelector = (role: Role) =>
    selector<number>({
        key: `characterCountByRoleSelector-${role}`,
        get: ({ get }) => {
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


