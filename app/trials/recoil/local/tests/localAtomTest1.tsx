import { Json } from '@/types';
import AmeJsonInput from '@/ui/json/AmeJsonInput';
import { fetchUserChats } from '@/utils/supabase/chatDb';
import supabase from '@/utils/supabase/client';
import { Button, Container, SimpleGrid, Space, Textarea, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { atom, atomFamily, DefaultValue, selector, selectorFamily, useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { MatrixUser } from '@/types/user.types';

type MessageType = {
    chatId: string;
    createdAt: string;
    id: string;
    index: number;
    text: string;
    role: string;
};

interface ChatType {
    chatId: string;
    chatTitle: string;
    createdAt: string;
    lastEdited: string;
    matrixId: string;
    metadata: Json;
    messages?: MessageType[];
}


const activeUserAtom = atom<MatrixUser>({
    key: 'activeUserAtom',
    default: undefined,
});

const isNewChatAtom = atom<boolean>({
    key: 'isNewChatAtom',
    default: false,
});

const activeChatIdAtom = atom<string>({
    key: 'activeChatIdAtom',
    default: '',
});

const chatsFetchedState = atom<boolean>({
    key: 'chatsFetchedState',
    default: false,
});

const fullChatAtomFamily = atomFamily<ChatType, string>({
    key: 'fullChatAtomFamily',
    default: (chatId) => ({
        chatId: chatId,
        chatTitle: '',
        createdAt: new Date().toISOString(),
        lastEdited: new Date().toISOString(),
        matrixId: '',
        metadata: {},
        messages: [],
    }),
});

const fullChatSelectorFamily = selectorFamily<ChatType[keyof ChatType], { chatId: string; field: keyof ChatType }>({
    key: 'fullChatSelectorFamily',
    get: ({chatId, field}) => ({get}) => get(fullChatAtomFamily(chatId))[field],
    set: ({chatId, field}) => ({set}, newValue) =>
        set(fullChatAtomFamily(chatId), (prevState) => {
            if (field === 'messages') {
                if (Array.isArray(newValue)) {
                    return {...prevState, [field]: newValue as MessageType[]};
                } else if (typeof newValue === 'object' && newValue !== null) {
                    return {
                        ...prevState,
                        [field]: [...(prevState.messages || []), newValue as MessageType]
                    };
                } else {
                    try {
                        const parsedValue = JSON.parse(newValue as string);
                        if (Array.isArray(parsedValue)) {
                            return {...prevState, [field]: parsedValue as MessageType[]};
                        } else if (typeof parsedValue === 'object' && parsedValue !== null) {
                            return {
                                ...prevState,
                                [field]: [...(prevState.messages || []), parsedValue as MessageType]
                            };
                        }
                    }
                    catch (e) {
                        console.error('Failed to parse newValue', e);
                        return prevState;
                    }
                }
            }
            return {...prevState, [field]: newValue as ChatType[keyof ChatType]};
        }),
});

const messagesSelector = selectorFamily<MessageType[], string>({
    key: 'messagesSelector',
    get: (chatId) => async ({get}) => {
        const messages = get(fullChatSelectorFamily({chatId, field: 'messages'})) as MessageType[];
        if (messages.length > 0) {
            return messages;
        }
        const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: chatId});
        if (error) {
            console.error('Failed to fetch messages: ', error);
            return [];
        }
        return data || [];
    },
    set: (chatId) => ({set}, newMessages) => {
        set(fullChatSelectorFamily({chatId, field: 'messages'}), newMessages);
    },
});

const chatSummariesSelector = selector<ChatType[]>({
    key: 'chatSummariesSelector-NotUsed2',
    get: async ({ get, getCallback }) => {
        const activeUser = get(activeUserAtom);
        const { data, error } = await supabase.rpc('fetch_user_chats', { user_matrix_id: activeUser.matrixId });

        if (error) {
            console.error('Error fetching chats:', error.message);
            return [];
        }
        const loadChats = getCallback(({ set }) => async (chats: ChatType[]) => {
            chats.forEach(chat => {
                set(fullChatAtomFamily(chat.chatId), chat);
            });
        });
        loadChats(data);
        return data || [];
    },
    set: ({ set }, newChatSummaries) => {
        if (!(newChatSummaries instanceof DefaultValue)) {
            newChatSummaries.forEach(chat => {
                set(fullChatAtomFamily(chat.chatId), chat);
            });
        }
    }
});

export function useUserChats() {
    const [chatsFetched, setChatsFetched] = useRecoilState(chatsFetchedState);
    const activeUser = useRecoilValue(activeUserAtom);
    const [chats, setChats] = useState([]);

    const fetchAndSetChats = useRecoilCallback(
        ({ set }) =>
            async () => {
                if (!activeUser || chatsFetched) return;

                try {
                    const fetchedChats = await fetchUserChats(activeUser.matrixId);
                    fetchedChats.forEach((chat) => {
                        set(fullChatAtomFamily(chat.chatId), chat);
                    });
                    // @ts-ignore
                    setChats(fetchedChats); // Store chats in local state
                    setChatsFetched(true);
                } catch (error) {
                    console.error('Error fetching and setting user chats:', error);
                }
            },
        [activeUser, chatsFetched]
    );

    useEffect(() => {
        fetchAndSetChats();
    }, [fetchAndSetChats]);

    return { chatsFetched, chats };
}

function useCurrentChat() {
    const [isNewChat] = useRecoilState(isNewChatAtom);
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [, setMessages] = useRecoilState(messagesSelector(activeChatId));

    const setCurrentChat = useRecoilCallback(
        ({ snapshot }) =>
            async (chatId: string) => {
                if (isNewChat) return;

                setActiveChatId(chatId);
                const messages = await snapshot.getPromise(messagesSelector(chatId));
                setMessages(messages);
            },
        [isNewChat]
    );

    return { activeChatId, setCurrentChat };
}



const RecoilTestForm = () => {
    const { chatsFetched, chats } = useUserChats();
    const { activeChatId, setCurrentChat } = useCurrentChat();

    const [currentId, setCurrentId] = useState('chat1');
    const [newItemValue, setNewItemValue] = useState('');
    const [title, setTitle] = useRecoilState(fullChatSelectorFamily({chatId: currentId, field: 'chatTitle'}));
    const [messages, setMessages] = useRecoilState(fullChatSelectorFamily({chatId: currentId, field: 'messages'}));
    const [fullChat, setFullChat] = useRecoilState(fullChatAtomFamily(currentId));
    const containerProps = {
        h: 500,
        mt: 'xl',
    };

    const handleAddItem = () => {
        if (newItemValue) {
            try {
                const parsedValue = JSON.parse(newItemValue);
                setMessages(parsedValue);
            }
            catch (e) {
                setMessages(newItemValue);
            }
            setNewItemValue('');
        }
    };

    return (
        <Container {...containerProps}>
            <h3 className="text-2xl font-bold mb-4">Recoil Chat Form Example</h3>

            {/* Chat List */}
            <div className="mb-4">
                <h4 className="text-xl font-bold mb-2">Chat List</h4>
                {chatsFetched ? (
                    <ul>
                        {chats.map((chat) => (
                            <li
                                // @ts-ignore
                                key={chat.chatId}
                                // @ts-ignore
                                onClick={() => setCurrentChat(chat.chatId)}
                                // @ts-ignore
                                className={`cursor-pointer ${activeChatId === chat.chatId ? 'font-bold' : ''}`}
                            >
                                {/* @ts-ignore */}
                                {chat.chatTitle}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading chats...</p>
                )}
            </div>

            <label className="block mb-2">
                Current Chat ID:
                <TextInput
                    value={currentId}
                    onChange={(e) => setCurrentId(e.target.value)}
                    className="border p-2 w-full"
                />
            </label>
            <Space h="xl"/>

            <SimpleGrid cols={2} spacing="sm" verticalSpacing="lg">
                <label className="block mb-2">Chat Title:</label>
                <TextInput
                    value={title as string}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full"
                />

                <label className="block mb-2">
                    New Message (JSON string):
                    <Button onClick={handleAddItem} className="bg-blue-500 text-white p-2 mt-2">
                        Add Message or Replace Messages
                    </Button>
                </label>
                <Textarea
                    value={newItemValue}
                    onChange={(e) => setNewItemValue(e.target.value)}
                    className="border p-2 w-full h-32"
                />

                <div className="mb-4">
                    <AmeJsonInput value={JSON.stringify(messages, null, 2)} label="Messages:"/>
                </div>
                <div className="mb-4">
                    <AmeJsonInput value={JSON.stringify(fullChat, null, 2)} label="Current Chat Details"/>
                </div>
            </SimpleGrid>
        </Container>
    );
};

export default RecoilTestForm;
