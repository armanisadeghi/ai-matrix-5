// hooks/ai/chatUtils.ts
// higher-order functions for managing chat state

import { activeChatIdAtom, chatSummariesAtom, isNewChatAtom } from '@/state/aiAtoms/aiChatAtoms';
import { activeUserAtom } from '@/state/userAtoms';
import { ChatDetailsType, ChatType, MessageType } from '@/types';
import { createChatStartEntry } from '@/utils/supabase/chatDb';
import supabase from '@/utils/supabase/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 } from 'uuid';

export const formatDate = (date: Date): string => {
    const optionsDate: Intl.DateTimeFormatOptions = {month: '2-digit', day: '2-digit', year: '2-digit'};
    const optionsTime: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit'};

    return `${date.toLocaleDateString('en-US', optionsDate)} ${date.toLocaleTimeString('en-US', optionsTime)}`;
};


export const createNewChatObject = (matrixId: string, chatId: string): ChatType => {
    const chatObject: ChatType = {
        chatId: chatId,
        chatTitle: `new-chat-${chatId.slice(-5)}`,
        createdAt: new Date().toISOString(),
        lastEdited: new Date().toISOString(),
        matrixId: matrixId,
        metadata: {},
        fetchedMessages: false,
    };
    return chatObject;
};

export const chatStarterFunction = (
    matrixId: string,
    userMessage: string,
    chatId: string,
    systemMessage: string
): ChatDetailsType => {
    if (userMessage.length === 0) throw new Error('ERROR! chatStarter called with empty messages');

    const systemMessageEntry: MessageType = {
        chatId: chatId,
        id: v4(),
        createdAt: new Date().toISOString(),
        index: 0,
        role: 'system',
        text: systemMessage,
    };

    const userMessageEntry: MessageType = {
        chatId: chatId,
        id: v4(),
        createdAt: new Date().toISOString(),
        index: 1,
        role: 'user',
        text: userMessage,
    };

    const assistantEntry = {
        chatId: chatId,
        id: v4(),
        createdAt: new Date().toISOString(),
        index: 2,
        role: 'assistant',
        text: '',
    };

    const initialMessages: MessageType[] = [systemMessageEntry, userMessageEntry, assistantEntry];
    const chatTitle = userMessage.length > 25 ? userMessage.substring(0, 25) + '...' : userMessage;

    const chatStartObject = {
        chatId: chatId,
        chatTitle: chatTitle,
        createdAt: new Date().toISOString(),
        lastEdited: new Date().toISOString(),
        matrixId: matrixId,
        metadata: {},
        messages: initialMessages,
    };

    console.log('chatStarter: Chat Start Object:', chatStartObject);

    Promise.resolve().then(() => {
        createChatStartEntry(chatStartObject).catch(error => {
            console.error('Failed to add custom message:', error);
        });
    });

    return chatStartObject;
};



export const useAddChatToState = () => {
    const [chatSummaries, setChatSummaries] = useRecoilState(chatSummariesAtom);

    return (chat: ChatType) => {
        const updatedChats = [chat, ...chatSummaries];
        setChatSummaries(updatedChats);
        return updatedChats;
    };
};

export const useGetActiveChat = () => {
    const chatSummaries = useRecoilValue(chatSummariesAtom);

    return (ChatId: string) => {
        if (!ChatId) throw new Error('Active chat ID is required to get active chat');

        const activeChat = chatSummaries.find(chat => chat.chatId === ChatId);
        if (!activeChat) throw new Error(`Chat with id ${ChatId} not found`);

        return activeChat;
    };
};

export const useUpdateChatLocalState = () => {
    const [chatSummaries, setChatSummaries] = useRecoilState(chatSummariesAtom);

    return (updatedChat: Partial<ChatType>) => {
        const chatId = updatedChat.chatId;
        if (!chatId) throw new Error('chatId is required in the updatedChat object');

        const existingChat = chatSummaries.find(chat => chat.chatId === chatId);
        if (!existingChat) throw new Error(`Chat with chatId ${chatId} not found`);

        const mergedChat: ChatType = {
            ...existingChat,
            ...Object.keys(updatedChat).reduce((acc, key) => {
                const keyTyped = key as keyof ChatType;
                const value = updatedChat[keyTyped];
                if (value !== undefined && value !== '') {
                    (acc as any)[keyTyped] = value;
                }
                return acc;
            }, {} as ChatType),
            lastEdited: new Date().toISOString()
        };

        const updatedChats = [mergedChat, ...chatSummaries.filter(chat => chat.chatId !== chatId)];
        setChatSummaries(updatedChats);
        return updatedChats;
    };
};

export async function fetchActiveUserChats(): Promise<ChatType[]> {
    const matrixId = useRecoilValue(activeUserAtom).matrixId;
    if (!matrixId) return console.error('Missing userId'), [];

    const {data, error} = await supabase.rpc('fetch_user_chats', {user_matrix_id: matrixId});

    if (error) {
        console.error('Error fetching user chats:', error);
        return [];
    }
    return data;
}

export async function fetchActiveChatMessages(): Promise<MessageType[]> {
    const chatId = useRecoilValue(activeChatIdAtom);
    if (!chatId) throw new Error('Missing chatId');

    const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: chatId});
    console.log('fetchActiveChatMessages fetched Message data: ', data)

    if (error) {
        console.error('Error fetching chat messages:', error);
        throw error;
    }
    return data;
}


export const useCreateNewChatObject = () => {
    const isNewChat = useRecoilValue(isNewChatAtom);
    const activeUser = useRecoilValue(activeUserAtom);

    return (chatId: string): ChatType => {
        if (!isNewChat) throw new Error('Cannot get new chat object when isNewChat is false');
        const chatObject: ChatType = {
            chatId: chatId,
            chatTitle: `new-chat-${chatId.slice(-5)}`,
            createdAt: new Date().toISOString(),
            lastEdited: new Date().toISOString(),
            matrixId: activeUser.matrixId,
            metadata: {},
            fetchedMessages: false,
        };
        return chatObject;
    };
};
