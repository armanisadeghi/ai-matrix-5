import { atom, useRecoilState, useSetRecoilState, selector, useRecoilValue } from 'recoil';
import { Role, MessageEntry } from '@/types/chat';


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


// Selector to get the count of all messages
export const messageCountSelector = selector<number>({
    key: 'messageCountSelector',
    get: ({ get }) => {
        const messages = get(activeChatMessagesArrayAtom);
        return messages.length;
    },
});

// Selector to filter messages by role
export const filteredMessagesByRoleSelector = (role: Role) =>
    selector<MessageEntry[]>({
        key: `filteredMessagesByRoleSelector-${role}`,
        get: ({ get }) => {
            const messages = get(activeChatMessagesArrayAtom);
            return messages.filter((message) => message.role === role);
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
