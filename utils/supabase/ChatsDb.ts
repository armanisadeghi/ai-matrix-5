import supabase from "./client";
import { MessageManager, Chat as ChatClass } from '@/services/Chat';

// Define the Chat interface
interface Chat {
    chatId: string;
    chatTitle: string;
    userId: string;
    createdTimestamp: Date;
    lastEditedTimestamp: Date;
    messageManager: MessageManager;
    metadata: Record<string, any>;
}

// Define the Chats type as an array of Chat objects
type Chats = Chat[];

export class ChatsDb {
    private transformToChat(data: any): ChatClass {
        const chat = new ChatClass(
            data.id,
            data.title,
            data.user_id,
            data.metadata || {}
        );
        chat.createdTimestamp = new Date(data.created_at);
        chat.lastEditedTimestamp = new Date(data.last_edited);
        chat.importChatHistory(JSON.stringify(data.chat_messages || []));
        return chat;
    }

    async getChatById(chatId: string): Promise<ChatClass | null> {
        const { data, error } = await supabase
            .from('chats')
            .select('*')
            .eq('id', chatId)
            .single();

        if (error) {
            console.error('Error fetching chat:', error);
            return null;
        }

        if (!data) {
            console.log(`No chat found with ID ${chatId}`);
            return null;
        }

        return this.transformToChat(data);
    }

    async getAllChatByUserId(userId: string): Promise<ChatClass[] | null> {
        console.log('getAllChatByUserId Fetching chats for user ID:', userId);
        const { data, error } = await supabase
            .from('chats')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching chats:', error);
            return null;
        }

        if (!data || data.length === 0) {
            console.log(`No chats found for user ID ${userId}`);
            return null;
        }

        console.log('Fetched chats:', data);
        return data.map((chatData: any) => this.transformToChat(chatData));
    }

    /*
    async createChat(chat: ChatClass): Promise<void> {
        const { error } = await supabase
            .from('chats')
            .insert([{
                id: chat.chatId,
                title: chat.chatTitle,
                user_id: chat.userId,
                created_at: chat.createdTimestamp.toISOString(),
                last_edited: chat.lastEditedTimestamp.toISOString(),
                chat_messages: chat.messageManager.getMessagesArray(),
                metadata: chat.metadata
            }]);

        if (error) {
            console.error('Error creating chat:', error);
        }
    }

    async updateChat(chatId: string, updatedData: Partial<ChatClass>): Promise<void> {
        const { error } = await supabase
            .from('chats')
            .update({
                ...updatedData,
                last_edited: updatedData.lastEditedTimestamp?.toISOString(),
                chat_messages: updatedData.messageManager?.getMessagesArray()
            })
            .eq('id', chatId);

        if (error) {
            console.error('Error updating chat:', error);
        }
    }
    */
}
