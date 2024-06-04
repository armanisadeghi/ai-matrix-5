import axios from 'axios';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { allChatsAtom } from '@/context/atoms/chatAtoms';
import { activeUserIdSelector, activeUserTokenSelector } from '@/context/atoms/userAtoms';
import { ChatHistoryChat } from '@/types';
import { Chat, ChatManager } from "@/services/Chat";

export const loadChatHistory = async (): Promise<void> => {
    const userId = useRecoilValue(activeUserIdSelector);
    const userToken = useRecoilValue(activeUserTokenSelector);
    const setAllChats = useSetRecoilState(allChatsAtom);

    if (!userId || !userToken) {
        console.error('User ID or token is missing.');
        return;
    }

    try {
        const response = await axios.get(`/api/chat-history?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                'X-Custom-Origin': window.location.origin
            }
        });

        // Transform the API response to the expected structure
        const data = response.data;
        const chatHistory: { [key: string]: ChatHistoryChat[] } = {};

        data.chatHistory.forEach((chat: { chatId: string, msgArr: any[] }) => {
            chatHistory[chat.chatId] = chat.msgArr;
        });

        const chatManager = await ChatManager.getInstance();

        const chats: Chat[] = Object.keys(chatHistory).map(chatId => {
            const existingChat = chatManager.getChat(chatId);
            if (existingChat) {
                existingChat.importChatHistory(JSON.stringify(chatHistory[chatId]));
                return existingChat;
            } else {
                const newChat = new Chat(chatId, `Chat ${chatId}`, userId, {});
                newChat.importChatHistory(JSON.stringify(chatHistory[chatId]));
                chatManager.createChat(newChat.chatTitle, newChat.chatId, newChat.metadata);
                return newChat;
            }
        });

        setChatManager(chatManager);
        setAllChats(chats);

    } catch (error) {
        console.error('Error fetching chat history:', error);
    }
};
