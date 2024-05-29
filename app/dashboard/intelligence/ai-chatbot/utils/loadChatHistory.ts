// chat-app/utils/loadChatHistory.ts
import axios from 'axios';
import { ChatHistoryChat } from "@/types";

interface UserContext {
    userId: string;
    isAuthenticated: boolean;
    userToken: string;
}

export const loadChatHistory = async (
    userId: string,
    userContext: UserContext
): Promise<any> => {
    try {
        const response = await axios.get(`/api/chat-history?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${userContext.userToken}`,
                'X-Custom-Origin': window.location.origin
            }
        });

        // Transform the API response to the expected structure
        const data = response.data;
        const chatHistory: { [key: string]: ChatHistoryChat[] } = {};

        data.chatHistory.forEach((chat: { chatId: string, msgArr: any[] }) => {
            chatHistory[chat.chatId] = chat.msgArr;
        });

        return {
            userId: data.userId,
            chatHistory
        };
    } catch (error) {
        console.error('Error fetching chat history:', error);
        return {};
    }
};

export default loadChatHistory;
