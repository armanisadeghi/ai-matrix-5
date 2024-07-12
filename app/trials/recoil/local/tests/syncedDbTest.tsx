/*
import { activeChatIdAtom, chatStartSelector, hasSubmittedMessageAtom, isNewChatAtom, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import { activeUserAtom } from '@/state/userAtoms';
import { ChatDetailsType, ChatType, Json, MessageType } from '@/types';
import supabase from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, atomFamily, AtomEffect, DefaultValue, atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const chatsSyncEffect: AtomEffect<ChatType[]> = ({ setSelf, onSet, getPromise }) => {
    const loadChats = async () => {
        const activeUser = await getPromise(activeUserAtom);
        if (!activeUser) {
            return;
        }
        const { data, error } = await supabase.rpc('fetch_user_chats', { user_matrix_id: activeUser.matrixId });
        if (error) {
            console.error('Error fetching chats:', error.message);
            return;
        }
        setSelf(data || []);
    };

    const addChatToDB = async (newChat: ChatType) => {
        if (!newChat || Object.keys(newChat).length === 0) return console.error('Missing or empty new chat object');
        const { data, error } = await supabase.rpc('create_chat_and_messages', { start_chat: newChat as unknown as Json });
        if (error) {
            console.error('Error adding new chat:', error);
        } else {
            console.log('New chat added successfully:', data);
        }
    };

    loadChats();

    onSet((newValue, oldValue) => {
        if (!(newValue instanceof DefaultValue) && Array.isArray(newValue) && Array.isArray(oldValue)) {
            if (newValue.length > oldValue.length) {
                const newChat = newValue[newValue.length - 1];
                addChatToDB(newChat);
            }
        }
    });
};

const chatsAtom = atom<ChatType[]>({
    key: 'chatsAtom',
    default: [],
    effects: [chatsSyncEffect],
});

const dbSyncEffect = (chatId: string): AtomEffect<MessageType[]> => ({setSelf, onSet, trigger}) => {
    const loadFromDB = async () => {
        const {data, error} = await supabase.rpc('fetch_messages', {matrix_chat_id: chatId});
        if (error) {
            console.error(`Failed to fetch messages for chat ${chatId}:`, error);
            return;
        }
        if (data != null) {
            setSelf(data);
        }
    };
    const pushToDB = async (newMessages: MessageType[]) => {
        for (const message of newMessages) {
            await pushSingleMessage(message);
        }
    };

    const pushSingleMessage = async (newEntry: MessageType) => {
        console.log('Pushing message to DB:', newEntry);
        const {data, error} = await supabase.rpc('add_custom_message', {
            chat_id: chatId,
            id: newEntry.id,
            role: newEntry.role,
            text: newEntry.text,
            index: newEntry.index,
            created_at: newEntry.createdAt,
        });
        if (error) {
            console.error(`Failed to push message for chat ${chatId}:`, error);
        }
    };

    if (trigger === 'get') {
        loadFromDB();
    }

    onSet((newValue, oldValue, isReset) => {
        if (isReset) {
            return;
        }
        if (!(newValue instanceof DefaultValue)) {
            if (Array.isArray(newValue) && Array.isArray(oldValue)) {
                if (oldValue.length > 0) {
                    const newMessages = newValue.filter(message =>
                        !oldValue.some(oldMessage => oldMessage.id === message.id)
                    );
                    if (newMessages.length > 0) {
                        pushToDB(newMessages);
                    }
                }
            }
        }
    });
};

const messagesFamily = atomFamily<MessageType[], string>({
    key: 'messagesFamily',
    default: [],
    effects: (chatId) => [dbSyncEffect(chatId)],
});


// Components
const MessageInput: React.FC = () => {
    const [newMessage, setNewMessage] = useState('');
    const [newMessageRole, setNewMessageRole] = useState('user');
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);

    const [messages, setMessages] = useRecoilState(messagesFamily(activeChatId));

    const [userSubmit, setUserSubmit] = useRecoilState(hasSubmittedMessageAtom);
    const [isNewChat, setIsNewChat] = useRecoilState(isNewChatAtom);
    const [userMessage, setUserMessage] = useRecoilState(userTextInputAtom);
    const [chatSummaries, setChatSummaries] = useRecoilState(chatsAtom);

    const chatStartObject = useRecoilValue(chatStartSelector);

    useEffect(() => {
        if (userSubmit && chatStartObject) {
            //setActiveChatId(uuidv4());
            setUserSubmit(false);
            setIsNewChat(true);
            console.log('chatStartObject:', chatStartObject);
            setChatSummaries(prevSummaries => [...prevSummaries, chatStartObject]);

            setMessages(chatStartObject.messages);
        }
    }, [userSubmit, setMessages, chatStartObject, setUserSubmit, setIsNewChat, setActiveChatId, setChatSummaries]);


    const handleNewChat = () => {
        setUserSubmit(true);
    }

    const handleAddMessage = () => {
        const message: MessageType = {
            chatId: activeChatId,
            id: uuidv4(),
            role: newMessageRole,
            text: newMessage,
            index: messages.length,
            createdAt: new Date().toISOString(),
        };
        setMessages(prevMessages => [...prevMessages, message]);
        setNewMessage('');
    };


    return (
        <div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter message"
            />
            <select value={newMessageRole} onChange={(e) => setNewMessageRole(e.target.value)}>
                <option value="user">User</option>
                <option value="assistant">Assistant</option>
            </select>
            <button onClick={handleAddMessage}>Add Message</button>
            <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Enter message"
            />
            <button onClick={handleNewChat}>Start New Chat</button>
        </div>
    );
};

const MessageList: React.FC = () => {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const messages = useRecoilValue(messagesFamily(activeChatId));

    useEffect(() => {
        // Perform any side effects here
        console.log(`Active chat ID changed to: ${activeChatId}`);
        console.log('Messages:', messages);
    }, [activeChatId, messages]);

    return (
        <div>
            <h3>Messages for Chat ID: {activeChatId}</h3>
            {messages.map((message) => (
                <div key={message.id}>
                    <strong>{message.role}:</strong> {message.text}
                </div>
            ))}
        </div>
    );
};

const ChatSelector: React.FC = () => {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [newChatId, setNewChatId] = useState('');

    const handleSetChatId = () => {
        setActiveChatId(newChatId);
        setNewChatId('');
    };

    return (
        <div>
            <input
                type="text"
                value={newChatId}
                onChange={(e) => setNewChatId(e.target.value)}
                placeholder="Enter chat ID"
            />
            <button onClick={handleSetChatId}>Set Chat ID</button>
        </div>
    );
};

export const syncedDbTest: React.FC = () => {
    const activeChatId = useRecoilValue(activeChatIdAtom);

    return (
        <div>
            <h1>Test Page for Messages Family</h1>
            <ChatSelector/>
            {activeChatId && (
                <>
                    <MessageInput />
                    <MessageList />
                </>
            )}
        </div>
    );
};

*/
