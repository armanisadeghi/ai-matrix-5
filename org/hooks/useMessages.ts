// hooks/useMessages.ts
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MessageEntry, AllMessages, RoleType, MessageIDType, TimestampType, Chat, ChatIDType } from '../types/chatData';

export function useMessages() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [currentChatId, setCurrentChatId] = useState<ChatIDType>(uuidv4());
    const [allMessages, setAllMessages] = useState<AllMessages>([]);
    const [responseCount, setResponseCount] = useState(0);

    const addMessage = (text: string, role: RoleType) => {
        const newMessage: MessageEntry = {
            id: uuidv4() as MessageIDType,
            timestamp: Date.now() as TimestampType,
            text,
            role,
        };
        setAllMessages(prevMessages => [...prevMessages, newMessage]);

        if (role === 'user') {
            setResponseCount(prevCount => prevCount + 1);
            addAssistantResponse();
        }
    };

    const addAssistantResponse = () => {
        const responseText = `This is my response, but to confirm we are maintaining state, this is response number ${responseCount + 1}.`;
        const newMessage: MessageEntry = {
            id: uuidv4() as MessageIDType,
            timestamp: Date.now() as TimestampType,
            text: responseText,
            role: 'assistant',
        };
        setAllMessages(prevMessages => [...prevMessages, newMessage]);
    };

    const editMessage = (id: MessageIDType, newText: string) => {
        setAllMessages(prevMessages =>
            prevMessages.map(msg => (msg.id === id ? { ...msg, text: newText } : msg))
        );
    };

    const saveChat = () => {
        const title = allMessages.find(msg => msg.role === 'user')?.text.slice(0, 30) || 'Untitled Chat';
        const newChat: Chat = {
            chatId: currentChatId,
            title,
            messages: allMessages,
        };
        setChats(prevChats => [...prevChats, newChat]);
        setCurrentChatId(uuidv4());
        setAllMessages([]);
        setResponseCount(0);
    };

    const loadChat = (chatId: ChatIDType) => {
        const chat = chats.find(c => c.chatId === chatId);
        if (chat) {
            setCurrentChatId(chatId);
            setAllMessages(chat.messages);
            setResponseCount(chat.messages.filter(msg => msg.role === 'assistant').length);
        }
    };

    return {
        allMessages,
        chats,
        currentChatId,
        addMessage,
        editMessage,
        saveChat,
        loadChat,
    };
}
